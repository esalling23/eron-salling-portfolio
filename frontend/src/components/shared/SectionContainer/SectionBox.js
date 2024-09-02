import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { motion } from 'framer-motion';

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
		<motion.div
			initial={{ opacity: 0, }}
			whileInView={{ opacity: 1, transition: { duration: 1, ease: 'easeInOut' } }}
			viewport={{ once: true, amount: .25 }}
			className={classNames(styles.content, 'd-flex flex-column')}
		>
			{children}
		</motion.div>
	</section>;
};

SectionBox.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string
};

export default SectionBox;