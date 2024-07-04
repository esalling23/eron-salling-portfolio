import { motion } from 'framer-motion';
import React, { useCallback, useMemo, useState } from 'react';
import styles from '../tileMatch.module.scss';
import Tile from './Tile';
import { MIN_BOARD_SIZE } from '../lib';
import { shuffle } from '../../../../lib/utils';
import SizedGrid from './SizedGrid';

const Board = ({ size, gameStage, onReady, onSuccess, onFail }) => {
	const [sequenceIndex, setSequenceIndex] = useState(0);
	const [currentTileCount, setCurrentTileCount] = useState(0);

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
				delay: delays[(x * size) + y]
			}))
		);
	};

	const board = useMemo(() => generateBoard(), []);


	const onTileReady = useCallback(() => {
		setSequenceIndex(curr => curr + 1);
		if (sequenceIndex + 1 === boardSize) {
			onReady();
		}
	}, [onReady, sequenceIndex, boardSize]);

	const onSelect = useCallback((tile, cb) => {
		//compare correct tile delay w/ selected tile delay
		const isCorrect = currentTileCount === tile.delay;
		console.log(`Tile selected! ${isCorrect ? 'Correct' : 'Incorrect'}`);
		if (isCorrect) {
			//correct!
			setCurrentTileCount(curr => curr + 1);
			cb();
			if (currentTileCount + 1 === boardSize) {
				// end
				onSuccess();
			}
		} else {
			//incorrect
			onFail();
		}
	}, [currentTileCount, boardSize, onSuccess, onFail]);

	return (
		<motion.div 
			as={SizedGrid}
			size={size}
			className={styles.tileBoard}
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: '100%'
			}}
			transition={{
				duration: 0.1
			}}
		>
			{board.map((col, i) => {
				return (
					<SizedGrid
						size={size} 
						className={styles.column}
						key={`column-${i}`}
					>
						{col.map((tile, tileI) => {
							return <Tile
								tile={tile}
								correctTile={tileI}
								onReady={onTileReady}
								onSelect={onSelect}
								gameStage={gameStage}
								key={`tile-${tileI}`}
							/>;
						})}
					</SizedGrid>
				);
			})}
		</motion.div>
	);
};

export default Board;