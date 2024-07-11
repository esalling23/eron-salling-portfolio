import { useEffect } from 'react';
import * as Tone from 'tone';

const synth = new Tone.Synth().toDestination();
const useTone = (sound) => {
	useEffect(() => {
		const awaitTone = async () => {
			await Tone.start();
		};
		awaitTone();
	}, []);

	const playTone = () => {
		const now = Tone.now();
		synth.triggerAttackRelease(sound, 0.2, now);
	};

	return playTone;
};

export default useTone;