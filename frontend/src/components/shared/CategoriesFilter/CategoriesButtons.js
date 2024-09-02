import React from 'react';
import PropTypes from 'prop-types';

import { getCategoryId } from '../../../lib/utils';
import styles from './styles.module.scss';
import SectionContainer from '../SectionContainer';
import classNames from 'classnames';
import BadgeButton from '../Badge/BadgeButton';

const CategoriesButtons = ({
	categories,
	handleFilter,
	activeKeys
}) => {
	const displayCategoryButton = ({ name, id }) => (
		<BadgeButton 
			className="mx-1"
			onClick={() => {
				document.activeElement.blur();
				handleFilter(id);
			}}
			key={id}
			text={name}
			isSelected={activeKeys.includes(id)}
			// icon={}
		/>
	);
	const displayTagButtons = tags => tags?.map(({ name, id }) => 
		displayCategoryButton({ 
			name, 
			id: getCategoryId(id)
		}));
	
	const categoryButtons = displayTagButtons(categories);
	
	return (
		<SectionContainer className={classNames(
			'background-color-accent-2 py-3 flex-column justify-content-center align-content-center',
			styles.categoryButtonContainer
		)}>
			<div className="d-flex flex-column">
				<h2 className="text-center text-color-accent-light text-title">Projects</h2>
				<div className="p-2 d-flex flex-wrap justify-content-center">
					{categoryButtons}
				</div>
			</div>
		</SectionContainer>
	);
};

CategoriesButtons.propTypes = {
	categories: PropTypes.array,
	activeKeys: PropTypes.arrayOf(PropTypes.string),
	handleFilter: PropTypes.function
};

export default CategoriesButtons;