import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion, useAnimate, animate, stagger, AnimatePresence } from 'framer-motion';

import styles from './pixelBlocks.module.scss';
import PixelBackground from '../PixelBackground';

const containerAnim = {
	start: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
	end: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const loadingCircleTransition = {
	duration: 0.5,
	repeatType: 'reverse',
	repeat: 1,
	ease: 'easeInOut',
	repeatDelay: 1,
	delay: stagger(0.2)
};

const PixelLoader = ({
	onAnimationComplete,
	onAnimationExited,
	isLoading
}) => {
	const [containerScope, animateContainer] = useAnimate();

	const [blocksReady, setBlocksReady] = useState(false);
	const [shouldAnimate, setShouldAnimate] = useState(true);
	const [animateBackground, setAnimateBackground] = useState(false);

	useEffect(() => {
		if (isLoading) {
			const enterAnimation = async () => {
				await animate('.block', { opacity: ['0%', '100%'] }, { 
					duration: 0.5, 
					delay: stagger(0.6),
					transition: { ease: 'easeInOut', delay: 0.2 }
				});
				setBlocksReady(true);
			};
			enterAnimation();
		} else {
			const exitAnimation = async () => {
				await animate('.block', { y: '0%' }, {
					duration: 0.5,
				});
				await animate('.block', { opacity: 0 }, { duration: 0.5 });
				setAnimateBackground(true);
				await animateContainer(containerScope.current, { opacity: 0 }, { duration: 1 });
			};
			
			exitAnimation();
		}
	}, [isLoading]);

	useEffect(() => {
		if (isLoading && blocksReady && shouldAnimate) {
			const loadBlocks = async () => {
				console.log('playing block animation');
				await animate('.block', { y: ['0%', '-50%'] }, loadingCircleTransition);
				setShouldAnimate(false);
				onAnimationComplete();
			};
			loadBlocks();
		}
	}, [blocksReady, isLoading, shouldAnimate]);

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
			<motion.div 
				key={'loadingBlocks'}
				ref={containerScope}
				variants={containerAnim}
				initial="start"
				animate="end"
				className={styles.pixelBlocks}
			>
				{[...new Array(3)].map(b => (
					<div
						key={b}
						className={`block ${styles.block}`}
					/>
				))}
			</motion.div>
			
		</AnimatePresence>
	);
};

PixelLoader.propTypes = {
	onAnimationComplete: PropTypes.function,
	onAnimationExited: PropTypes.function,
	isLoading: PropTypes.bool
};

export default PixelLoader;