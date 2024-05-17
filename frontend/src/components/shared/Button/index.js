import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';
import { Badge, Button } from 'react-bootstrap';

const AppButton = ({
	children,
	className,
}) => {

	return (
		<Badge
			as={Button}
			className={`${styles.button} ${className}`}
		>
			{children}
		</Badge>
	);
};

AppButton.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string
};

export default AppButton;
