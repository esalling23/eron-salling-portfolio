/**
 * (Site name here)
 * Developed by Engagement Lab, 2016
 * ==============
 * About page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class About
 * @author 
 *
 * ==========
 */
var keystone = require('keystone'),
    About = keystone.list('About'),
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'about';

    view.on('init', function(next) {

        var query = About.model.findOne({}, {}, {});

        query.exec(function(err, result) {
            if (err) throw err;

            locals.about = result;
                
            next();

        });
    });

    // Render the view
    view.render('about');

};
