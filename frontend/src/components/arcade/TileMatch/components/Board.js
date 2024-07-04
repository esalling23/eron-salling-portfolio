import { motion } from 'framer-motion';
import React, { useCallback, useMemo, useState } from 'react';
import styles from '../tileMatch.module.scss';
import Tile from './Tile';

const Board = ({ board, gameStage, onReady, onSuccess, onFail }) => {
	const [sequenceIndex, setSequenceIndex] = useState(0);
	const [currentTileCount, setCurrentTileCount] = useState(0);

	const boardSize = useMemo(() => board.length ** 2, [board]);

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
		<motion.div className={styles.tileBoard}
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
					<div 
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
					</div>
				);
			})}
		</motion.div>
	);
};

export default Board;