
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styles from '../styles.module.scss';

const getFillPercent = (percent, circumference) => {
	return Math.abs(
		Math.ceil((circumference / 100) * (percent - 100))
	);
};

const viewBoxSize = 100;
const viewBoxMid = viewBoxSize / 2;
const viewBox = `0 0 ${viewBoxSize} ${viewBoxSize}`;

const StreakProgress = ({
	children,
	start = 0,
	end = 100,
	stroke = 'blue',
	emptyStroke = stroke,
	emptyStrokeOpacity = 0.25,
	duration = 1,
	delay = 0.5,
	size = 200,
	strokeWidth = 20,
}) => {
	
	const radius = viewBoxMid - (strokeWidth / 2);
	const circumference = Math.ceil(2 * Math.PI * radius);
	const startFill = useMemo(() => getFillPercent(start, circumference), [start, circumference]);
	const animatedFill = useMemo(() => getFillPercent(end, circumference), [start, circumference]);

	const transition = {
		duration: duration,
		delay: delay,
		ease: 'easeInOut'
	};

	const variants = {
		hidden: {
			strokeDashoffset: startFill,
			transition
		},
		show: {
			strokeDashoffset: animatedFill,
			transition
		}
	};
	return (
		<div height={size} className="position-relative">
			{children && <div
				className={styles.progressCircleText}
			>
				{children}
			</div>}
			<svg
				key="background"
				viewBox={viewBox}
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
			>
				<circle
					cx={viewBoxMid}
					cy={viewBoxMid}
					r={radius}
					className="circle"
					strokeWidth={strokeWidth}
					stroke={emptyStroke}
					strokeOpacity={emptyStrokeOpacity}
					fill="transparent"
				/>
			</svg>
			<svg
				key="fill"
				viewBox={viewBox}
				width={size}
				height={size}
				style={{
					position: 'absolute',
					transform: 'rotate(-90deg)',
					overflow: 'visible',
					marginLeft: -size
				}}
			>
				<motion.circle
					cx={viewBoxMid}
					cy={viewBoxMid}
					r={radius}
					strokeWidth={strokeWidth}
					stroke={stroke}
					fill="transparent"
					strokeDashoffset={animatedFill}
					strokeDasharray={circumference}
					variants={variants}
					initial="hidden"
					animate={'show'}
				/>
			</svg>
		</div>
      
	);
};

StreakProgress.propTypes = {
	start: PropTypes.number,
	end: PropTypes.number,
	stroke: PropTypes.string,
	// emptyStroke = "#e2e2e2",
	emptyStroke: PropTypes.string,
	emptyStrokeOpacity: PropTypes.number,
	// emptyStrokeOpacity = 1,
	duration: PropTypes.number,
	delay: PropTypes.number,
	size: PropTypes.number,
	strokeWidth: PropTypes.number,
	children: PropTypes.any,
};

export default StreakProgress;