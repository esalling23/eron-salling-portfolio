import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.scss';

const SectionContainer = ({
	children,
	className,
	...rest
}) => {
	return (
		<section 
			className={classNames(
				'w-100 m-0 row flex-row align-items-stretch flex-wrap',
				className,
				styles.sectionContainer
			)} 
			{...rest}
		>
			{children}
		</section>
	);
};

SectionContainer.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
};

export default SectionContainer;