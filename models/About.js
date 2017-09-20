/**
 * (Site name here) 
 * 
 * About page Model
 * @module About
 * @class About
 * @author Erica Salling
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * About model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var About = new keystone.List('About', 
	{
		label: 'About Page',
		singular: 'About Page',
		nodelete: true
	});

/**
 * Model Fields
 * @main About
 */
About.add({
	name: { type: String, default: "About Page", hidden: true, required: true, initial: true },
	intro: { type: Types.Markdown, label: "Intro Text",  initial: true, required: true }, 
	body: { type: Types.Markdown, label: "Body Text",  initial: true, required: true },

	image: { type: Types.CloudinaryImage, label: "About Image" },

	twitterURL: { type: Types.Url, label: 'Twitter'},	
	fbURL: { type: Types.Url, label: 'Facebook'},	
	linkedInURL: { type: Types.Url, label: 'LinkedIn'},	
	githubURL: { type: Types.Url, label: 'Github'},

	email: { type: String, label: 'Email'},
	phone: { type: String, label: 'Phone'},
	
	backgroundImg: { type: Types.CloudinaryImage, label: 'Background Image', note: 'If blank, will use hex color'}, 
	backgroundClr: { type: Types.Color, label: 'Background Color', note: 'Will be overridden by background image'}
	
});

/**
 * Model Registration
 */
About.defaultSort = '-createdAt';
About.defaultColumns = 'name, updatedAt';
About.register();
