import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

const PageContainer = ({
	children,
	...rest
}) => {
	return (
		<Col xs={11} lg={10} {...rest}>
			<motion.div
				className="w-100 flex-col-center"
				initial={{
					opacity: '0%'
				}}
				animate={{
					opacity: '100%',
				}}
				transition={{
					duration: 0.5,
					ease: 'easeInOut'
				}}
			>
				{children}
			</motion.div>
		</Col>
	);
};

PageContainer.propTypes = {
	children: PropTypes.any,
};

export default PageContainer;