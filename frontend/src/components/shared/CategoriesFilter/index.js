import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, DropdownButton, Spinner } from 'react-bootstrap';

import { getCategoryId } from '../../../lib/utils';
import styles from './styles.module.scss';

const CategoriesFilter = ({
	categories,
	isLoading = false,
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
	const categoryTags = categories?.map(({ name, id }) => 
		displayCategoryButton({ name, id: getCategoryId(id) }));
	
	return (
		<DropdownButton 
			title={isLoading ? <Spinner
				as="span"
				animation="border"
				size="sm"
				role="status"
				aria-hidden="true"
			/> : 'Filter Projects'}
			className={styles.filterButton}
			disabled={isLoading}
		>
			{!isLoading && (
				<>
					{displayCategoryButton({ name: 'All Projects', id: '*' })}
					{categoryTags}
				</>
			)}
		</DropdownButton>
	);
};

CategoriesFilter.propTypes = {
	categories: PropTypes.array,
	isLoading: PropTypes.bool,
	handleFilter: PropTypes.function
};

export default CategoriesFilter;
