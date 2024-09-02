import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';

import styles from './pixelBlocks.module.scss';
import DotDotDotAnim from './DotDotDotAnim';



const PixelLoader = ({
	isLoading
}) => {
	const [shouldAnimate, setShouldAnimate] = useState(true);

	useEffect(() => {
		if (!shouldAnimate && isLoading) {
			setShouldAnimate(true);
		}
		else if (shouldAnimate && !isLoading)
		{
			setShouldAnimate(false);
		}
	}, [shouldAnimate, isLoading]);

	return (
		<AnimatePresence className={styles.loaderContainer}>
			<DotDotDotAnim shouldAnimate={shouldAnimate} />
		</AnimatePresence>
	);
};

PixelLoader.propTypes = {
	onAnimationComplete: PropTypes.function,
	onAnimationExited: PropTypes.function,
	isLoading: PropTypes.bool
};

export default PixelLoader;