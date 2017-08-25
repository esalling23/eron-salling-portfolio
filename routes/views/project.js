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
    locals.section = 'project-page';

    view.on('init', function(next) {

        var queryProj = Project.model.findOne({ 'key': req.params.key })
        .populate('tags');

        queryProj.exec(function(err, result) {
            if (err) throw err;

            var project = result;

            // Do stuff to project

            var tags = [];
            if (project.tags !== null && project.tags !== undefined){
                _.each(project.tags, function(tag) {
                    tags.push(tag);
                });
            }

            locals.tags = tags;
            locals.project = project;

            next();

        });
    });

    // Render the view
    view.render('project');

};
