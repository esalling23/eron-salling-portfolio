/**
 * (Site name here) 
 * 
 * Tag page Model
 * @module Tag
 * @class Tag
 * @author Erica Salling
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Tag model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Tag = new keystone.List('Tag', 
	{
		label: 'Tags',
		singular: 'Tag',
		autokey: { path: 'key', from: 'name', unique: true },
		sortable: true
	});

/**
 * Model Fields
 * @main Tag
 */
Tag.add({

	name: { type: String, label: 'Name', required: true, initial: true }, 
	category: { type: Types.Select, label: 'Category', options: 'Role, Format, Skill'}
	
});

/**
 * Model Registration
 */
Tag.defaultSort = '-createdAt';
Tag.defaultColumns = 'name, updatedAt';
Tag.register();
