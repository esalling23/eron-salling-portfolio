
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, useAnimate, useAnimation } from 'framer-motion';
import classnames from 'classnames';
import Color from 'color';
import styled from 'styled-components';

import failSfx from '../../../assets/audio/fail.mp3';

import styles from '../styles.module.scss';
import useTone from '../../../hooks/useTone';
import useHowl from '../../../hooks/useHowl';

const StyledMotion = styled(motion.div)`
	${({ $baseColor, $isDisabled }) => `
		border: 4px solid ${Color(`#${$baseColor}`).darken(0.4)};
		transition: border-width 0.2s linear;

		${!$isDisabled && `
			&:hover, &:focus {
				border-width: 8px;
			}
		`}
	`}
`;

function easeOutBounce(x) {
	const n1 = 7.5625;
	const d1 = 2.75;
	
	if (x < 1 / d1) {
		return n1 * x * x;
	} else if (x < 2 / d1) {
		return n1 * (x -= 1.5 / d1) * x + 0.75;
	} else if (x < 2.5 / d1) {
		return n1 * (x -= 2.25 / d1) * x + 0.9375;
	} else {
		return n1 * (x -= 2.625 / d1) * x + 0.984375;
	}
}
const easingFunc = (x) => {
	return x < 0.5
		? (1 - easeOutBounce(1 - 2 * x)) / 2
		: (1 + easeOutBounce(2 * x - 1)) / 2;
};

const getRandomDelay = () => -(Math.random() * 0.7 + 0.05);

const randomDuration = () => Math.random() * 0.07 + 0.23;

const TILE_ANIM_DURATION = 1.2;
const TILE_DELAY_MOD = 0.8;
const tileAnim = {
	// Initial
	start: ({ backgroundColor }) => ({
		opacity: 0,
		backgroundColor: `#${backgroundColor}`,
		duration: TILE_ANIM_DURATION
	}),
	// Become visible on board
	enter: ({ delay }) => ({
		opacity: 1,
		transition: {
			duration: TILE_ANIM_DURATION,
			delay: TILE_DELAY_MOD * (delay * TILE_ANIM_DURATION),
			ease: easingFunc
		}
	}),
	// Individual tile success
	success: {
		scale: 0,
		opacity: 1,
		duration: 1,
	},
	// Individual tile failure
	fail: {
		opacity: 0.3,
		duration: 1,
		rotate: [0, -30, 30.3, 0],
		transition: {
			delay: getRandomDelay(),
			repeat: 2,
			repeatType: 'reverse',
			duration: randomDuration(),
		}
	},
	// Board all fail
	prepareHang: {
		// top left
		transformOrigin: '0px 0px',
		opacity: 1,
		// set starting rotation to support hang anim
		rotate: 0,
	},
	hang: {
		rotate: [0, 30, 50, 40, 48, 43, 45],
	},
	exit: {
		y: '200%',
		// first value should match last value from 'hang' anim
		rotate: [45, 0, -180], 
		scale: 0,
		transition: {
			delay: 0.1,
			duration: 1,
			type: 'spring'
		}
	},
};

const TileMotion = ({
	tile,
	animVariant,
	disabled,
	handleComplete,
	children,
}) => {
	const [scope, animate] = useAnimate();
	const controls = useAnimation();

	const [playTone, stopTone] = useTone(tile.sound);

	const [playFailSound] = useHowl(failSfx, {
		volume: 0.5,
	});

	useEffect(() => {
		return () => {
			stopTone();
		};
	}, []);

	useEffect(() => {
		let timeout;
		const playAnim = async () => {
			if (animVariant === 'exit' && scope.current) {
				await animate(scope.current, tileAnim.prepareHang, {
					duration: 0.1
				});
				const hangDelay = Math.random() * 0.3;
				const moveDurr = 0.5;
				animate(scope.current, {
					x: '50%',
				}, { delay: hangDelay, duration: moveDurr });
				await animate(scope.current, tileAnim.hang, { 
					delay: hangDelay,
					duration: 0.8,
					onComplete: () => playFailSound()
				});
			}

			if (animVariant === 'enter') {
				timeout = setTimeout(() => {
					playTone();
				}, tile.delay * 1000);
			}

			if (Object.keys(tileAnim).includes(animVariant)) {
				await controls.start(animVariant);
			}
		};

		playAnim();

		return () => {
			if (timeout) clearTimeout(timeout);
		};
	}, [animVariant]);

	return (
		<StyledMotion
			ref={scope}
			className={classnames(styles.tile)}
			custom={{
				backgroundColor: tile.color,
				delay: tile.delay,
			}}
			$baseColor={tile.color}
			$isDisabled={disabled}
			animate={controls}
			variants={tileAnim}
			initial={'start'}
			onAnimationComplete={handleComplete}
			key={`tile-${tile.delay}`}
		>
			{children}
		</StyledMotion>
	);
};

TileMotion.propTypes = {
	tile: PropTypes.shape({
		color: PropTypes.string.isRequired,
		delay: PropTypes.number.isRequired,
		sound: PropTypes.string.isRequired,
	}), 
	animVariant: PropTypes.string,
	handleComplete: PropTypes.func,
	children: PropTypes.any,
	disabled: PropTypes.bool
};

export default React.memo(TileMotion);