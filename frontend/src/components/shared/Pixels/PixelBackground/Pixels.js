import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

import styles from './pixelBlocks.module.scss';
import { shuffle } from '../../../../lib/utils';

const anim = {
	enter: ({ startVisible, delay }) => ({
		opacity: startVisible ? 0 : 1,
		transition: {
			duration: 0.05,
			delay: 0.1 * delay,
		}
	}),
	exit: ({ startVisible, delay }) => ({
		opacity: startVisible ? 1 : 0,
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
	repeat: Infinity,
	yoyo: Infinity,
	ease: 'easeInOut',
};

const Pixels = ({
	pixelCount,
	blockCount,
	onBlockAnimComplete,
	startVisible,
}) => {
	const getBlocks = useCallback((col) => {
		const delays = shuffle([...new Array(blockCount)].map((_, i) => i));

		return delays.map((randomDelay, i) => {
			return <motion.div 
				key={`${col}${i}`}
				className={styles.block}
				variants={anim}
				initial={{
					opacity: startVisible ? 1 : 0
				}}
				animate={anim.enter}
				transition={transitionOptions}
				custom={{
					delay: randomDelay,
					startVisible
				}}
				onAnimationComplete={onBlockAnimComplete}
			></motion.div>;
		});
	}, [blockCount]);

	const getPixels = useCallback(() => [...new Array(pixelCount)].map((_p, i) => {
		return (
			<div
				className={styles.column}
				key={i}
			>
				{ getBlocks(i) }
			</div>
		);
	}), [pixelCount, getBlocks]);

	const pixels = useMemo(() => getPixels(), [getPixels]);

	return pixels;
};

export default Pixels;