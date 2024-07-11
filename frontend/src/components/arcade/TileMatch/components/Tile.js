
import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Howl } from 'howler';

import incorrectSfx from '../../../../../assets/audio/incorrect.mp3';
import correctSfx from '../../../../../assets/audio/correct.mp3';

import { GAME_STAGE } from '../lib';
import FadeMotion from '../../shared/FadeMotion';
import TileButton from './TileButton';
import { Badge } from 'react-bootstrap';
import TileMotion from './TileMotion';
import useTone from '../../hooks/useTone';

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

	const playTone = useTone(tile.sound);

	// individual tile correct sounds
	const incorrectSound = new Howl({
		src: incorrectSfx
	});
	const correctSound = new Howl({
		src: correctSfx
	});
	// level fail extended sound
	// const failSound = new Howl({
	// 	src: failSfx
	// });

	const handleSelect = useCallback(() => {
		onSelect();

		const result = correctTileIndex === tile.delay;
		setIsCorrect(result);

		if (result) {
			// correctSound.play();
			playTone();
		} else {
			incorrectSound.play();
		}
		// console.log(`Tile ${tile.delay} selected! ${result ? 'Correct' : 'Incorrect'}`);
	}, [correctTileIndex, tile, onSelect, correctSound, incorrectSound]);

	const handleComplete = useCallback((variant) => {
		// console.log(variant);
		console.log(`Completed ${variant} animation`);

		if (variant === 'enter') {
			onReady();
		} else if (variant === 'success' || variant === 'fail') {
			// console.log('gone!');
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

	return (
		<TileMotion
			tile={tile}
			animVariant={animVariant}
			handleComplete={handleComplete}
			key={`tile-${tile.delay}`}
		>
			{gameStage === GAME_STAGE.PLAY && (
				<FadeMotion
					duration={0.3}
					className="h-100 w-100 flex-col-center"
				>
					{isCorrect === null && !isFail && (
						<TileButton onClick={handleSelect} disabled={isDisabled}>
							Select <Badge>{tile.delay}</Badge>
						</TileButton>
					)}
				</FadeMotion>
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