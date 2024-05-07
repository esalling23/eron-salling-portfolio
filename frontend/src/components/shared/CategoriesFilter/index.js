import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';

import { getCategoryId } from '../../../lib/utils';
import styles from './styles.module.scss';

const CategoriesFilter = ({
	categories,
	handleFilter
}) => {
	const displayCategoryButton = ({ name, id }) => (
		<Dropdown.Item 
			as={Button}
			onClick={() => handleFilter(id)}
			key={id}
		>
			{name}
		</Dropdown.Item>
	);
	const categoryTags = categories.map(({ name, id }) => 
		displayCategoryButton({ name, id: getCategoryId(id) }));
	
	return (
		<DropdownButton 
			title="Filter Projects"
			className={styles.filterButton}
		>
			{displayCategoryButton({ name: 'All Projects', id: '*' })}
			{categoryTags}
		</DropdownButton>
	);
};

CategoriesFilter.propTypes = {
	categories: PropTypes.array,
	handleFilter: PropTypes.function
};

export default CategoriesFilter;
