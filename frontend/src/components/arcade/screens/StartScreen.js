import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import Modal from '../../shared/Layout/Modal';

const StartScreen = ({
	initGame,
	levels = [],
	howToPlaySteps,
}) => {
	const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);

	const showHowToPlay = () => {
		setIsHowToPlayOpen(true);
	};
	const closeHowToPlay = () => {
		setIsHowToPlayOpen(false);
	};

	const howToPlayItems = howToPlaySteps.map(step => (
		<li key={step}>{step}</li>
	));

	const levelButtons = levels.map(lvl => (
		<Button
			key="start-btn"
			size="lg"
			className="mx-2"
			onClick={() => initGame(lvl)}
		>
			Play Level {lvl}
		</Button>
	));

	return (
		<div className="h-100 w-100 flex-col-center">
			<Modal
				title="How To Play"
				bodyContent={(<ol className="text-left">
					{howToPlayItems}
				</ol>)}
				isModalOpen={isHowToPlayOpen}
				closeModal={closeHowToPlay}
			/>
			<div className="d-flex justify-content-center align-items-center">
				{levelButtons}
			</div>
			<Button
				key="how-to-play-btn"
				size="sm"
				className="my-2"
				onClick={showHowToPlay}
			>
				How To Play
			</Button>
		</div>
	);
};

StartScreen.propTypes = {
	initGame: PropTypes.func,
	levels: PropTypes.arrayOf(PropTypes.number),
	howToPlaySteps: PropTypes.arrayOf(PropTypes.string),
};

export default StartScreen;