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
    Project = keystone.list('Project'),
    Tag = keystone.list('Tag'),
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'portfolio';

    view.on('init', function(next) {

      var categorize = function(val, cat) {
          return val.filter(function(item) {
              return item.category == cat;
          });
      };

        var queryProj = Project.model.find({})
        .populate('tags');

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

            locals.projects = projects;

            next();

        });
    });

    // Render the view
    view.render('portfolio');

};
