import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';

import styles from './pixelBlocks.module.scss';
import PixelBackground from '../PixelBackground';
import DotDotDotAnim from './DotDotDotAnim';

const PixelLoaderWithBackground = ({
	onAnimationExited,
	isLoading
}) => {
	const [shouldAnimate, setShouldAnimate] = useState(true);
	const [animateBackground, setAnimateBackground] = useState(false);

	const onDotsExit = () => {
		setAnimateBackground(true);
	};

	useEffect(() => {
		if (!shouldAnimate && isLoading) {
			setShouldAnimate(true);
		}
	}, [shouldAnimate, isLoading]);

	return (
		<AnimatePresence className={styles.loaderContainer}>
			{animateBackground && <PixelBackground 
				key={'pixelBackground'}
				startVisible 
				handleAnimComplete={onAnimationExited}
			/>}
			<DotDotDotAnim 
				shouldAnimate={isLoading}
				handleAnimComplete={onDotsExit}
			/>
			
		</AnimatePresence>
	);
};

PixelLoaderWithBackground.propTypes = {
	onAnimationComplete: PropTypes.func,
	onAnimationExited: PropTypes.func,
	isLoading: PropTypes.bool
};

export default PixelLoaderWithBackground;