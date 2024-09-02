import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { useLocation } from 'react-router-dom';

const SectionContainer = ({
	id,
	children,
	className,
	...rest
}) => {
	const location = useLocation();
	const sectionRef = useRef(null);

	useEffect(() => {
		if (location.hash === '#' + id)
		{
			sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, [location]);

	return (
		<section 
			ref={sectionRef}
			id={id}
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
	id: PropTypes.string,
	children: PropTypes.any,
	className: PropTypes.string,
};

export default SectionContainer;