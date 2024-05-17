import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './pixelBlocks.module.scss';
import useWindowSize from '../../../lib/hooks/useWindowSize';
import Pixels from './Pixels';

const pixelCount = 20;

const PixelBackground = ({
	startVisible = false,
	handleAnimComplete = () => {}
}) => {
	const [completedAnimCount, setCompletedAnimCount] = useState(0);

	const [ width, height ] = useWindowSize();
	const blockSize = useMemo(() => innerWidth * 0.05, [width]);
	const blockCount = useMemo(() => Math.ceil(height / blockSize), [height, blockSize]);

	useEffect(() => {
		if (blockCount === 0) return;
		if (completedAnimCount >= blockCount * pixelCount) {
			handleAnimComplete();
		}
	}, [completedAnimCount, handleAnimComplete, blockCount]);

	const onBlockAnimComplete = () => {
		setCompletedAnimCount(curr => curr + 1);
	};

	return (
		<div 
			className={`${styles.pixelBlocks}`}
		>
			<Pixels
				startVisible={startVisible}
				blockCount={blockCount}
				pixelCount={pixelCount}
				onBlockAnimComplete={onBlockAnimComplete}
			/>
		</div>
	);
};

PixelBackground.propTypes = {
	startVisible: PropTypes.bool,
	isRepeating: PropTypes.bool,
	handleAnimComplete: PropTypes.function
};

export default PixelBackground;