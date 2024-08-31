
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';


const TileButton = ({ onClick, disabled = false, children }) => {
	// console.log(`disabled? ${disabled}`)
	const [isHover, setIsHover] = useState(false);

	return (
		<Button
			className={classNames(styles.button, { disabled })}
			onClick={onClick}
			onMouseEnter={() => setIsHover(true)}
			onMouseExit={() => setIsHover(false)}
			disabled={disabled}
		>
			{isHover && children}
		</Button>
	);
};

TileButton.propTypes = {
	children: PropTypes.any,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

export default TileButton;