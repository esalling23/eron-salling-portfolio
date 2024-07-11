import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import styles from '../tileMatch.module.scss';
import { shuffle } from '../../../../lib/utils';
import FadeMotion from '../../shared/FadeMotion';
import Tile from './Tile';
import SizedGrid from './SizedGrid';
import generateNote from '../generateNote';

const Board = ({ size, gameStage, onReady, onSuccess, onFail }) => {
	const [sequenceIndex, setSequenceIndex] = useState(0);
	const [currentTileCount, setCurrentTileCount] = useState(0);
	const [tilesDisabled, setTilesDisabled] = useState(false);
	
	// Fail animation effects all remaining tiles
	const [isFail, setIsFail] = useState(false);
	const [finishFailAnimCount, setFinishFailAnimCount] = useState(0);
	
	const boardSize = useMemo(() => size ** 2, [size]);

	// START stage --
	// should display a NxN board of colored tiles
	const generateBoard = () => {
		// todo - increase board size based on level
		const delays = shuffle([...new Array(boardSize)].map((_, i) => i));

		return [...new Array(size)].map((_e, y) => 
			[...new Array(size)].map((_e, x) => ({
				x,
				y,
				color: Math.random().toString(16).substr(-6),
				delay: delays[(x * size) + y],
				sound: generateNote()
			}))
		);
	};

	const board = useMemo(() => generateBoard(), []);

	const onTileReady = () => {
		setSequenceIndex(curr => curr + 1);
	};

	useEffect(() => {
		if (sequenceIndex + 1 === boardSize) {
			onReady();
		}
	}, [sequenceIndex, boardSize, onReady]);

	const onSelect = useCallback(() => {
		setTilesDisabled(true);
	}, []);

	const onFinishSelect = useCallback((isCorrect) => {
		if (isCorrect) {
			setCurrentTileCount(curr => curr + 1);
		} else {
			setIsFail(true);
		}
	}, [onSuccess, onFail]);

	const onFinishFailAnim = () => {
		setFinishFailAnimCount(curr => curr + 1);
	};

	useEffect(() => {
		if (!isFail) return;
		if (finishFailAnimCount === (boardSize - currentTileCount)) {
			onFail();
		}
	}, [isFail, finishFailAnimCount, currentTileCount, boardSize, onFail]);

	useEffect(() => {
		if (currentTileCount === boardSize) {
			// end
			onSuccess();
		}
		setTilesDisabled(false);
	}, [currentTileCount, boardSize]);

	const boardDisplay = useMemo(() => board.map((col, i) => {
		return (
			<SizedGrid
				size={size} 
				className={styles.column}
				key={`column-${i}`}
			>
				{col.map((tile, tileI) => {
					return <Tile
						tile={tile}
						correctTileIndex={currentTileCount}
						isDisabled={tilesDisabled}
						gameStage={gameStage}
						isFail={isFail}
						onReady={onTileReady}
						onSelect={onSelect}
						onFinishSelect={onFinishSelect}
						onFinishFail={onFinishFailAnim}
						key={`tile-${tileI}`}
					/>;
				})}
			</SizedGrid>
		);
	}), [
		board, 
		size, 
		currentTileCount, 
		tilesDisabled, 
		gameStage, 
		isFail,
		onFinishSelect,
		onFinishFailAnim,
		onTileReady,
		onSelect
	]);

	return (
		<FadeMotion
			as={SizedGrid}
			size={size}
			className={styles.tileBoard}
			duration={0.1}
		>
			{boardDisplay}
		</FadeMotion>
	);
};

Board.propTypes = {
	size: PropTypes.number.isRequired, 
	gameStage: PropTypes.string.isRequired, 
	onReady: PropTypes.func.isRequired, 
	onSuccess: PropTypes.func.isRequired, 
	onFail: PropTypes.func.isRequired
};

export default Board;