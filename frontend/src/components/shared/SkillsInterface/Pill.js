import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';
import classNames from 'classnames';

const Pill = ({ name }) => {
	return (
		<motion.div 
			className={classNames(styles.pill, 'd-flex align-items-center text-color-black background-color-bright')}
			whileHover={{ 
				scale: 1.1, 
				duration: 0.5,
				transition: {
					duration: 0.5,
					repeat: Infinity, 
					repeatType: 'reverse',
					repeatDelay: 0.3
				}
			}}
		>
			{name}
		</motion.div>
	);
};

Pill.propTypes = {
	name: PropTypes.string,
};

export default Pill;