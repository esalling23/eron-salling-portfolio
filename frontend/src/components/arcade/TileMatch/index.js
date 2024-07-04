import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useMemo, useState } from 'react';

// import styles from './tileMatch.module.scss';
import { shuffle } from '../../../lib/utils';
import Board from './components/Board';
import { GAME_STAGE, MIN_BOARD_SIZE } from './lib';

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

	const onReady = () => {
		setGameStage(GAME_STAGE.PLAY);
	};

	const onSuccess = () => {
		setIsSuccess(true);
		setStreak(curr => curr + 1);
		setGameStage(GAME_STAGE.END);
	};

	const onFail = () => {
		setIsSuccess(false);
		setGameStage(GAME_STAGE.END);
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

		return <Board
			board={board}
			gameStage={gameStage}
			onReady={onReady}
			onSuccess={onSuccess}
			onFail={onFail}
		/>;
	}, [
		streak,
		gameStage,
		initGame,
		isSuccess,
		continueGame,
		onSuccess,
		onFail,
		onReady,
	]);

	console.log(board);

	return (
		<AnimatePresence>
			{content}
		</AnimatePresence>
	);
};

export default TileMatch;