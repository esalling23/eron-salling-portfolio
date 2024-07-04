import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useMemo, useState } from 'react';

import styles from './tileMatch.module.scss';
import { shuffle } from '../../lib/utils';

const MIN_BOARD_SIZE = 3;
const GAME_STAGE = {
	ENTRY: 'ENTRY',
	START: 'START',
	PLAY: 'PLAY',
	END: 'END'
};

const tileAnim = {
	pulse: ({ backgroundColor, delay }) => ({
		backgroundColor: `#${backgroundColor}`,
		transition: {
			duration: 0.3,
			delay: 1 + (0.3 * delay),
		}
	}),
	enter: {
		backgroundColor: 'white',
		duration: 0.5
	}
};

const TileMatch = () => {
	const [streak, setStreak] = useState(null);
	const [gameStage, setGameStage] = useState(GAME_STAGE.ENTRY);
	const [isSuccess, setIsSuccess] = useState(null);

	const boardSize = useMemo(() => MIN_BOARD_SIZE, [streak]);

	// START stage --
	// should display a NxN board of colored tiles
	const generateBoard = () => {
		// todo - increase board size based on level
		const delays = shuffle([...new Array(boardSize * boardSize)].map((_, i) => i));

		return [...new Array(boardSize)].map((_e, y) => 
			[...new Array(boardSize)].map((_e, x) => ({
				x,
				y,
				color: Math.random().toString(16).substr(-6),
				delay: delays[(x * boardSize) + y]
			}))
		);
	};

	const board = useMemo(() => streak !== null ? generateBoard() : [], [streak]);

	const initGame = useCallback(() => {
		// initialize game
		setStreak(0);
		setGameStage(GAME_STAGE.START);
	}, []);
	// should perform an animation, highlighting tiles in an random order
	
	// PLAY stage --
	// should allow user to click on the tiles to repeat the order
	// should provide feedback if incorrect tile is clicked or tile sequence is completed successfully
	
	// END stage -- 
	// should show the user total score
	// should prompt the user to continue
	const continueGame = () => {
		if (isSuccess === true) {
			setGameStage(GAME_STAGE.START);
		} else if (isSuccess === false) {
			setGameStage(GAME_STAGE.ENTRY);
		}
		setIsSuccess(null);
	};

	const content = useMemo(() => {
		if (gameStage === GAME_STAGE.ENTRY) {
			return (
				<button onClick={initGame}>Start</button>
			);
		}
		
		if (gameStage === GAME_STAGE.END) {
			return <div>
				<h3>{isSuccess ? 'Success!' : 'Not Quite...'}</h3>
				<h4>Streak: {streak}</h4>
				<button onClick={continueGame}>Continue</button>
			</div>;
		}

		return <motion.div className={styles.tileBoard}
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
							return <motion.div
								className={styles.tile}
								key={`tile-${tileI}`}
								custom={{
									backgroundColor: tile.color,
									delay: tile.delay
								}}
								variants={tileAnim}
								initial={'enter'}
								animate={'pulse'}
							/>;
						})}
					</div>
				);
			})}
		</motion.div>;
	}, [gameStage, initGame, isSuccess, continueGame]);

	console.log(board);

	return (
		<AnimatePresence>
			{content}
		</AnimatePresence>
	);
};

export default TileMatch;