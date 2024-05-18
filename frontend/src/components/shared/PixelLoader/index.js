import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion, useAnimate, animate, stagger, AnimatePresence } from 'framer-motion';

import styles from './pixelBlocks.module.scss';
import PixelBackground from '../PixelBackground';

const containerAnim = {
	start: {
		x: '-50%',
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

const speed = 0.2;

const loadingCircleTransition = {
	duration: speed,
	repeatType: 'reverse',
	repeat: 1,
	ease: 'easeInOut',
	repeatDelay: speed,
	delay: stagger(speed)
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
				const rollingAnim = animate('.block', 
					{ rotate: 360 }, 
					{ duration: speed * 2, ease: 'backIn' },
				);
				await animateContainer(containerScope.current, { x: ['-50%', 0], width: '100vw' }, { 
					duration: speed * 2,
					delay: stagger(0.1),
					transition: { ease: 'easeInOut', delay: speed }
				});
				rollingAnim.cancel();
				setBlocksReady(true);
			};
			enterAnimation();
		} else {
			const exitAnimation = async () => {
				await animate('.block', { opacity: 0 }, { duration: speed });
				setAnimateBackground(true);
				await animateContainer(containerScope.current, 
					{ opacity: 0 }, 
					{ delay: 0.2, duration: 0.5, ease: 'easeOut' },
				);
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