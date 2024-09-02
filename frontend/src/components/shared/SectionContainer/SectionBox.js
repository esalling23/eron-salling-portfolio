import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.module.scss';

const SectionBox = ({
	children,
	className,
	...rest
}) => {
	return <section 
		className={classNames(
			className, 
			styles.sectionBox,
			'col-sm-12 col-md-6 d-flex flex-column'
		)}
		{...rest}
	>
		{children}
	</section>;
};

SectionBox.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string
};

export default SectionBox;