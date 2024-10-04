import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { animate, motion, stagger, useAnimate } from 'framer-motion';
import styles from './pixelBlocks.module.scss';

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

const transition = {
	duration: speed * 2,
	repeatType: 'reverse',
	repeat: 3,
	ease: 'easeInOut',
	repeatDelay: speed,
	delay: stagger(speed)
};

const DotDotDotAnim = ({
	shouldAnimate, 
	handleAnimComplete = () => {},
	handleAnimExited = () => {},
}) => {
	const [shouldRepeat, setShouldRepeat] = useState(shouldAnimate);
	const [containerScope, animateContainer] = useAnimate();
	const [blocksReady, setBlocksReady] = useState(false);

	useEffect(() => {
		if (shouldAnimate) {
			const enterAnimation = async () => {
				const rollingAnim = animate('.block', 
					{ rotate: 360 }, 
					{ duration: speed * 2, ease: 'easeOut' },
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
				await animate('.block', { opacity: 0 }, { duration: speed * 2, ease: 'easeOut' });
				await animateContainer(containerScope.current, 
					{ opacity: 0 }, 
					{ delay: 0, duration: 0.5, ease: 'easeOut' },
				);
				handleAnimExited();
			};
			
			exitAnimation();
		}
	}, [shouldAnimate]);
	
	useEffect(() => {
		if (blocksReady && shouldAnimate) {
			const loadBlocks = async () => {
				console.log('playing block animation');
				await animate('.block', { y: ['0%', '-50%'] }, transition);
				
				if (shouldRepeat) loadBlocks();
				else {
					handleAnimComplete();
				}
			};
			loadBlocks();
		} else {
			setShouldRepeat(false);
		}
	}, [shouldAnimate, blocksReady, shouldRepeat]);

	const blocks = [1, 2, 3].map((n) => (
		<div
			key={`block-${n}`}
			className={`block ${styles.block}`}
		/>
	));

	return (
		<motion.div 
			key={'loadingBlocks'}
			ref={containerScope}
			variants={containerAnim}
			initial="start"
			animate="end"
			className={styles.pixelBlocks}
		>
			{blocks}
		</motion.div>
	);
};

DotDotDotAnim.propTypes = {
	shouldAnimate: PropTypes.bool,
	handleAnimComplete: PropTypes.func,
	handleAnimExited: PropTypes.func,
};

export default DotDotDotAnim;