import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';
import classNames from 'classnames';

const BadgeButton = ({
	icon: IconComponent,
	text,
	onClick,
	isSelected,
	className,
	...rest
}) => {
	return (
		<button
			onClick={onClick}
			className={classNames(
				className, 
				styles.badge,
				isSelected ? styles.isActive : ''
			)}
			{...rest}
		>
			{IconComponent && <IconComponent className="mr-2" />} <span>{text}</span>
		</button>
	);
};

BadgeButton.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any,
	text: PropTypes.string,
	isSelected: PropTypes.bool,
	icon: PropTypes.func,
	onClick: PropTypes.func
};

export default BadgeButton;
