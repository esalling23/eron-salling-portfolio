
import React from 'react';
import PropTypes from 'prop-types';

import styles from '../tileMatch.module.scss';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';


const TileButton = ({ onClick, disabled = false, children }) => {
	// console.log(`disabled? ${disabled}`)

	return (
		<Button
			className={classNames(styles.button, { disabled })}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</Button>
	);
};

TileButton.propTypes = {
	children: PropTypes.any,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

export default TileButton;