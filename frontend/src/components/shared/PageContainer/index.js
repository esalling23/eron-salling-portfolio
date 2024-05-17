import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

const PageContainer = ({
	children,
}) => {
	return (
		<Col sm={12} lg={8}>
			<motion.div
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