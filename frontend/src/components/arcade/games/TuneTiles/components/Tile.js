
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import incorrectSfx from '../../../assets/audio/incorrect.mp3';

import { GAME_STAGE } from '../lib';
import TileButton from './TileButton';
import TileMotion from './TileMotion';
import useTone from '../../../hooks/useTone';
import useHowl from '../../../hooks/useHowl';

const Tile = ({
	tile,
	correctTileIndex,
	isDisabled,
	gameStage,
	isFail,
	onReady,
	onSelect,
	onFinishSelect,
	onFinishFail,
}) => {
	const [isCorrect, setIsCorrect] = useState(null);

	const [playTone, stopTone] = useTone(tile.sound);

	// individual tile correct sounds
	const [playIncorrectSound] = useHowl(incorrectSfx, {
		volume: 1.4
	});

	const handleSelect = useCallback(() => {
		onSelect();

		const result = correctTileIndex === tile.delay;
		setIsCorrect(result);

		if (result) {
			playTone();
		} else {
			playIncorrectSound();
		}
		// console.log(`Tile ${tile.delay} selected! ${result ? 'Correct' : 'Incorrect'}`);
	}, [correctTileIndex, tile, onSelect, playIncorrectSound]);

	const handleComplete = useCallback((variant) => {
		// console.log(variant);
		console.log(`Completed ${variant} animation`);

		if (variant === 'enter') {
			onReady();
		} else if (variant === 'success' || variant === 'fail') {
			onFinishSelect(isCorrect);
		} else if (variant === 'exit') {
			onFinishFail();
		}
	}, [isCorrect]);

	const animVariant = useMemo(() => {
		if (isFail) return 'exit';
		if (isCorrect === null) return 'enter';
		if (isCorrect) return 'success';
		else return 'fail';
	}, [isCorrect, isFail]);

	useEffect(() => {
		return () => {
			stopTone();
		};
	}, []);

	return (
		<TileMotion
			tile={tile}
			disabled={isDisabled || gameStage !== GAME_STAGE.PLAY}
			animVariant={animVariant}
			handleComplete={handleComplete}
			key={`tile-${tile.delay}`}
		>
			{isCorrect === null && !isFail && gameStage === GAME_STAGE.PLAY && (
				<TileButton 
					onClick={handleSelect} 
					disabled={isDisabled} 
				/>
			)}
		</TileMotion>
	);
};

Tile.propTypes = {
	tile: PropTypes.shape({
		color: PropTypes.string.isRequired,
		delay: PropTypes.number.isRequired,
		sound: PropTypes.string.isRequired,
	}), 
	correctTileIndex: PropTypes.number.isRequired,
	isDisabled: PropTypes.bool,
	isFail: PropTypes.bool,
	onReady: PropTypes.func, 
	onSelect: PropTypes.func, 
	onFinishSelect: PropTypes.func, 
	onFinishFail: PropTypes.func, 
	gameStage: PropTypes.string.isRequired
};

export default Tile;