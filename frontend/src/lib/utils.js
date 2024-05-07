import format from 'date-fns/format';

export const getCategoryId = id => `category-${id}`;

// Formats date into "Month NumYear"
export const formatDate = (date) => {
	return format(new Date(date), 'MMM yyyy');
};

export const shuffle = (arr) => {
	var rand, temp, i;

	for (i = arr.length - 1; i > 0; i -= 1) {
		rand = Math.floor((i + 1) * Math.random());//get random between zero and i (inclusive)
		temp = arr[rand];
		arr[rand] = arr[i]; //swap i (last element) with random element.
		arr[i] = temp;
	}
	return arr;
};
