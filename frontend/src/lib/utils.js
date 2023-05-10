import format from 'date-fns/format'

export const getCategoryId = id => `category-${id}`

// Formats date into "Month NumYear"
export const formatDate = (date) => {
	return format(new Date(date), 'MMM yyyy')
}