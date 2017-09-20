/**
 * (Site name here) 
 * 
 * Project page Model
 * @module Project
 * @class Project
 * @author Erica Salling
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Project model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Project = new keystone.List('Project', 
	{
		label: 'Projects',
		singular: 'Project',
		autokey: { path: 'key', from: 'name', unique: true },
		sortable: true

	});

/**
 * Model Fields
 * @main Project
 */
Project.add({
	name: { type: String, label: 'Project Name', required: true, initial: true },
	intro: { type: Types.Markdown, label: "Intro Text", note: 'Displays on grid.', initial: true, required: true }, 
	body: { type: Types.Markdown, label: "Body Text", note: 'Displays on individual page.', initial: true, required: true },

	icon: { type: Types.CloudinaryImage, label: 'Project Icon'}, 
	images: { type: Types.CloudinaryImages, label: 'Project Images'}, 
	imageCaps: { type: Types.TextArray, label: 'Project Captions', note: 'Must be one for each project image'}, 
	
	tags: { 
		type: Types.Relationship, 
		ref: 'Tag', 
		label: 'Project Tags', 
		many: true
	},

	url: { type: String, label: 'Project Url'},

	startDate: { type: Date, label: 'Start Date', note: 'Only month and year will be used'}, 
	endDate: { type: Date, label: 'End Date', note: 'Only month and year will be used'}

});

/**
 * Hooks
 * =============
 */
Project.schema.pre('save', function(next) {

    if (this.images.length > 0 && (this.images.length < this.imageCaps.length)) {
        var err = new Error('You cannot have more images than their respective captions.');
        next(err);
    }

    next();

});

/**
 * Model Registration
 */
Project.defaultSort = '-createdAt';
Project.defaultColumns = 'name, updatedAt';
Project.register();
