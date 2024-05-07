import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

import styles from './pixelBlocks.module.scss';
import { shuffle } from '../../../lib/utils';
import useWindowSize from '../../../lib/hooks/useWindowSize';

const anim = {
	initial: {
		opacity: 1,
	},
	enter: (delay) => ({
		opacity: 0,
		transition: {
			duration: 0.05,
			delay: 0.1 * delay,
		}
	}),
	exit: (delay) => ({
		opacity: 0,
		transition: {
			duration: 0.05,
			delay: 0.1 * delay,
		}
	})
};

const transitionOptions = {
	type: 'spring',
	stiffness: 260,
	damping: 20,
	duration: 0.05,
};

const pixelCount = 20;

const PixelBackground = ({
	isRepeating,
	handleAnimComplete
}) => {
	const [completedAnimCount, setCompletedAnimCount] = useState(0);
	const [isAnimComplete, setIsAnimComplete] = useState(false);

	const [ width, height ] = useWindowSize();
	const blockSize = useMemo(() => innerWidth * 0.05, [width]);
	const blockCount = useMemo(() => Math.ceil(height / blockSize), [height, blockSize]);

	useEffect(() => {
		if (blockCount === 0) return;
		if (completedAnimCount >= blockCount * pixelCount) {
			setIsAnimComplete(true);
			handleAnimComplete();
		}
	}, [completedAnimCount, handleAnimComplete, blockCount]);

	useEffect(() => {
		if (isRepeating && isAnimComplete) {
			setIsAnimComplete(false);
		}
	}, [isRepeating, isAnimComplete]);

	const onBlockAnimComplete = () => {
		setCompletedAnimCount(state => state + 1);
	};

	const getBlocks = (col) => {
		const delays = shuffle([...new Array(blockCount)].map((_, i) => i));
		return delays.map((randomDelay, i) => {
			return <motion.div 
				key={`${col}${i}`}
				className={styles.block}
				variants={anim}
				custom={randomDelay}
				animate={anim.enter}
				transition={transitionOptions}
				onAnimationComplete={onBlockAnimComplete}
			></motion.div>;
		});
	};

	const getPixels = () => [...new Array(pixelCount)].map((_p, i) => {
		return (
			<div className={styles.column} key={i}>
				{ getBlocks(i) }
			</div>
		);
	});

	return (
		<div 
			className={`${styles.pixelBlocks} ${isAnimComplete ? 'invisible' : ''}`}
		>
			{ getPixels() }</div>
	);
};

PixelBackground.propTypes = {
	isRepeating: PropTypes.bool,
	handleAnimComplete: PropTypes.function
};

export default PixelBackground;