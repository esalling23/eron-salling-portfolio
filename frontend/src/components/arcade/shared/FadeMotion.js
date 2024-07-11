import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const FadeMotion = ({
	children,
	as,
	duration,
	...rest
}) => {

	return <motion.div 
		as={as}
		initial={{
			opacity: 0,
		}}
		animate={{
			opacity: '100%'
		}}
		transition={{
			duration
		}}
		{...rest}
	>
		{children}
	</motion.div>;
};

FadeMotion.propTypes = {
	children: PropTypes.any,
	as: PropTypes.element,
	duration: PropTypes.number,
};

export default FadeMotion;