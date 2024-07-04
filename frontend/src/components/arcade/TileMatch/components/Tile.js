
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import classnames from 'classnames';

import styles from '../tileMatch.module.scss';
import { GAME_STAGE } from '../lib';
import { Badge } from 'react-bootstrap';


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

const Tile = ({ tile, onReady, onSelect, gameStage }) => {

	const [isSelected, setIsSelected] = useState(false);

	const handleSelect = () => {
		onSelect(tile, () => {
			setIsSelected(true);
		});
	};

	return (
		<motion.div
			className={classnames(styles.tile, { [styles.selected]: isSelected })}
			custom={{
				backgroundColor: tile.color,
				delay: tile.delay
			}}
			variants={tileAnim}
			initial={'enter'}
			animate={'pulse'}
			onAnimationComplete={onReady}
		>
			{(gameStage === GAME_STAGE.PLAY && !isSelected) && (
				<>
					<Badge variant={'light'}>{tile.delay}</Badge>
					<button onClick={handleSelect}>Select</button>
				</>
			)}
		</motion.div>
	);
};

export default Tile;