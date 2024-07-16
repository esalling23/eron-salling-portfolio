import { AnimatePresence } from 'framer-motion';
import React, { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Button } from 'react-bootstrap';
import { Howl } from 'howler';

import successSfx from '../../../../assets/audio/success.mp3';
import styles from './tileMatch.module.scss';

import { GAME_STAGE, MAX_BOARD_SIZE, MIN_BOARD_SIZE } from './lib';
import Board from './components/Board';
// import StreakProgress from './components/StreakProgress';
import StartScreen from './screens/StartScreen';

const TileMatch = () => {
	const [streak, setStreak] = useState(null);
	const [size, setSize] = useState(MIN_BOARD_SIZE);
	const [gameStage, setGameStage] = useState(GAME_STAGE.ENTRY);
	const [isSuccess, setIsSuccess] = useState(null);

	// Instructions
	const [instructionCopy, setInstructionCopy] = useState('Note the order of the tiles as they appear');

	// SFX for level success
	const successSound = new Howl({
		src: successSfx
	});

	const currLevel = useMemo(() => size - MIN_BOARD_SIZE + 1);

	const initGame = useCallback((initLevel) => {
		// initialize game
		setStreak(0);
		setSize((initLevel - 1) + MIN_BOARD_SIZE);
		setGameStage(GAME_STAGE.START);
	}, []);
	// should perform an animation, highlighting tiles in an random order
	
	// END stage -- 
	// should show the user total streak
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
		setInstructionCopy('Select the tiles in the order they appeared');
	};

	const onSuccess = () => {
		successSound.play();
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
				<StartScreen 
					initGame={initGame}
					levels={[...new Array(MAX_BOARD_SIZE - MIN_BOARD_SIZE)].map((_c, i) => i + 1)}
				/>
			);
		}
		
		if (gameStage === GAME_STAGE.END) {
			return <div className="d-flex flex-column h-100 justify-content-between align-items-center">
				<h2 className={styles.feedbackBanner}>{isSuccess ? 'Success!' : 'Not Quite...'}</h2>
				<div className="flex-col-center">
					{/* Show a Circle progress bar depicting where the current streak lands in level difficulty stage */}
					<h4>Your {!isSuccess && 'final '}streak: {streak}</h4>
				</div>
				<Button onClick={continueGame}>Continue</Button>
			</div>;
		}

		// PLAY stage --
		// should allow user to click on the tiles to repeat the order
		// should provide feedback if incorrect tile is clicked or tile sequence is completed successfully
		return <div className={classNames('flex-col-center', styles.boardContainer)}>
			<h2>Level {currLevel}</h2>
			<h6>{gameStage === GAME_STAGE.PLAY || gameStage === GAME_STAGE.START ? instructionCopy : ''}</h6>
			<Board
				size={size}
				gameStage={gameStage}
				onReady={onReady}
				onSuccess={onSuccess}
				onFail={onFail}
			/>
		</div>;
	}, [
		instructionCopy,
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
			<h1 key="tile-match-title" className="w-100 text-center">Tune Tiles - A Memory Game</h1>
			<div key="tile-match-content" className={classNames('d-flex justify-content-start align-items-center', styles.gameContainer)}>
				{content}
			</div>
		</AnimatePresence>
	);
};

export default TileMatch;