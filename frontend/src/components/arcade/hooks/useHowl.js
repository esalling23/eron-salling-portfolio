import { Howl } from 'howler';
import { useEffect, useRef } from 'react';


const useHowl = (src, options = {}) => {
	const soundRef = useRef(null);

	useEffect(() => {
		soundRef.current = new Howl({
			src,
			...options
		});
		return () => {
			stopSound();
		};
	}, []);

	const playSound = () => {
		soundRef.current?.play();
	};

	const stopSound = () => {
		soundRef.current?.stop();
	};

	return [playSound, stopSound];
};

export default useHowl;