import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import Modal from '../../../shared/Layout/Modal';

const howToPlaySteps = [
	'Watch as the tiles appear one-by-one',
	'Select each tile in the order they appeared',
	'Complete the sequence in the correct order to win',
];
const StartScreen = ({
	initGame,
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
			<Button
				key="start-btn"
				size="lg"
				onClick={initGame}
			>
				Start
			</Button>
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
	initGame: PropTypes.func
};

export default StartScreen;