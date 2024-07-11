import { AnimatePresence } from 'framer-motion';
import React, { useCallback, useMemo, useState } from 'react';

import styles from './tileMatch.module.scss';
import Board from './components/Board';
import { GAME_STAGE, MIN_BOARD_SIZE } from './lib';
import StreakProgress from './components/StreakProgress';
import classNames from 'classnames';
import Modal from '../../shared/Layout/Modal';
import { Button } from 'react-bootstrap';
import { Howl } from 'howler';

import successSfx from '../../../../assets/audio/success.mp3';

const TileMatch = () => {
	const [streak, setStreak] = useState(null);
	const [nextStreakStep, setNextStreakStep] = useState(MIN_BOARD_SIZE * 2);
	const [size, setSize] = useState(MIN_BOARD_SIZE);
	const [gameStage, setGameStage] = useState(GAME_STAGE.ENTRY);
	const [isSuccess, setIsSuccess] = useState(null);

	// Instructions
	const [instructionCopy, setInstructionCopy] = useState('Note the order of the tiles as they appear');
	const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);

	// SFX for level success
	const successSound = new Howl({
		src: successSfx
	});

	const currLevel = useMemo(() => size - MIN_BOARD_SIZE + 1);

	const initGame = useCallback(() => {
		// initialize game
		setStreak(0);
		setGameStage(GAME_STAGE.START);
	}, []);
	// should perform an animation, highlighting tiles in an random order
	
	// END stage -- 
	// should show the user total streak
	// should prompt the user to continue
	const continueGame = () => {
		// if we've unlocked the next level
		if (streak === nextStreakStep) {
			// increment level
			setSize(currLevel => {
				// increment streak count required for next level unlock
				setNextStreakStep(curr => curr + (currLevel * 2));

				return currLevel + 1;
			});
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

	const showHowToPlay = () => {
		setIsHowToPlayOpen(true);
	};
	const closeHowToPlay = () => {
		setIsHowToPlayOpen(false);
	};

	const content = useMemo(() => {
		if (gameStage === GAME_STAGE.ENTRY) {
			return (
				<div className="h-100 w-100 flex-col-center">
					<Modal
						title="How To Play"
						bodyContent={(<ol className="text-left">
							<li key="steps-0">Watch as the tiles appear one-by-one</li>
							<li key="steps-1">Select each tile in the order they appeared</li>
							<li key="steps-2">Complete the sequence in the correct order to win</li>
							<li key="steps-3">For each win in a row, your streak will increase</li>
							<li key="steps-4">As your streak increases you will unlock higher difficulty levels</li>
						</ol>)}
						isModalOpen={isHowToPlayOpen}
						closeModal={closeHowToPlay}
					/>
					<Button key="start-btn" onClick={initGame}>Start</Button>
					<Button key="how-to-play-btn" size="sm" className="my-2" onClick={showHowToPlay}>How To Play</Button>
				</div>
			);
		}
		
		if (gameStage === GAME_STAGE.END) {
			return <div className="d-flex flex-column h-100 justify-content-between align-items-center">
				<h2 className={styles.feedbackBanner}>{isSuccess ? 'Success!' : 'Not Quite...'}</h2>
				<div className="flex-col-center">
					{/* Show a Circle progress bar depicting where the current streak lands in level difficulty stage */}
					<h4>Your {!isSuccess && 'final '}streak: {streak}</h4>
					{isSuccess && (
						<>
							<StreakProgress
								start={((streak - 1) / nextStreakStep) * 100}
								end={((isSuccess ? streak : streak - 1) / nextStreakStep) * 100}
							>
								<p className="p-0 m-0" key="streak-fraction">{streak} / {nextStreakStep}</p>
								<p className="p-0 m-0" key="next-level">Next level: {currLevel + 1}</p>
							</StreakProgress>
						</>
					)}
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
		isHowToPlayOpen,
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
			<h1 className="w-100 text-center">TileMatch - A Memory Game</h1>
			<div className={classNames('d-flex justify-content-start align-items-center', styles.gameContainer)}>
				{content}
			</div>
		</AnimatePresence>
	);
};

export default TileMatch;