import { AnimatePresence } from 'framer-motion';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
// import styles from './tileMatch.module.scss';
import Board from './components/Board';
import { GAME_STAGE, MIN_BOARD_SIZE } from './lib';
import SizedGrid from './components/SizedGrid';

const TileMatch = () => {
	const [streak, setStreak] = useState(null);
	const [nextStreakStep, setNextStreakStep] = useState(MIN_BOARD_SIZE * 2);
	const [size, setSize] = useState(MIN_BOARD_SIZE);
	const [gameStage, setGameStage] = useState(GAME_STAGE.ENTRY);
	const [isSuccess, setIsSuccess] = useState(null);

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
		if (streak === nextStreakStep) {
			setNextStreakStep(curr => curr + (size * 2));
			setSize(curr => curr + 1);
		}
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

		return <SizedGrid
			as={Board}
			size={size}
			gameStage={gameStage}
			onReady={onReady}
			onSuccess={onSuccess}
			onFail={onFail}
		/>;
	}, [
		size,
		gameStage,
		initGame,
		isSuccess,
		continueGame,
		onSuccess,
		onFail,
		onReady,
	]);

	return (
		<AnimatePresence>
			{content}
		</AnimatePresence>
	);
};

export default TileMatch;