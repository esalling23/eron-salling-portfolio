/**
 * (Site name here)
 * Developed by Engagement Lab, 2016
 * ==============
 * Index page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class Index
 * @author
 *
 * ==========
 */
var keystone = require('keystone'),
    Index = keystone.list('Index'),
    About = keystone.list('About'),
    Project = keystone.list('Project'),
    _ = require('underscore');

var categorize = function(val, cat) {
    return val.filter(function(item) {
        return item.category == cat;
    });
};

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'index';

    view.on('init', function(next) {

        var queryIndex = Index.model.findOne({}, {}, {
            sort: {
                'createdAt': -1
            }
        });

        var queryAbout = About.model.findOne({}, {}, {});

        var queryProj = Project.model.find({}).populate('tags');

        queryIndex.exec(function(err, resultIndex) {
            if (err) throw err;

            locals.index = resultIndex;

            queryAbout.exec(function(err, result) {
                if (err) throw err;

                locals.about = result;

                queryProj.exec(function(err, result) {
                    if (err) throw err;

                    var projects = result;

                    // Do stuff to projects

                    var tags = [];
                    for(var i = 0; i < projects.length; i++) {
                        if (projects[i].tags !== null && projects[i].tags !== undefined){
                            _.each(projects[i].tags, function(tag) {
                                tags.push(tag);
                            });
                        }
                    };

                    tags = _.uniq(tags);

                    locals.tags = {
                        roles: categorize(tags, 'Role'),
                        formats: categorize(tags, 'Format'),
                        skills: categorize(tags, 'Skill')
                    };

                    projects = _.map(projects, function(p) {
                      p.start = p.startDate.toDateString();
                      p.end = p.endDate.toDateString();
                      console.log(p.endDate.toDateString());
                      return p;
                    });
                    // console.log(projects);
                    locals.projects = _.sortBy(projects, function(p) {
                      console.log(p.endDate);
                      return Date.parse(p.endDate);
                    });
                    // console.log(_.sortBy(projects, "endDate"));

                    next();

                });

            });

        });
    });

    // Render the view
    view.render('index');

};
