import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import styles from './styles.module.scss';

// Text element that can see more or see less
const SeeMoreText = ({
	extras,
	text,
	onToggle = () => {}
}) => {
	const [isSeeingMore, setIsSeeingMore] = useState(false);

	const seenText = useMemo(() => {
		if (isSeeingMore) {
			return text;
		}

		// Show first sentence
		return text.split(/\.(\s|\w)/)[0] + '.';
	}, [text, isSeeingMore]);

	const handleToggleTextLength = () => {
		setIsSeeingMore(curr => !curr);
	};

	useEffect(() => {
		onToggle();
	}, [seenText]);

	return (
		<>
			<p>{seenText}</p>
			{isSeeingMore && (
				<div className="mb-3">{extras}</div>
			)}
			<Nav.Link
				className={styles.seeMoreTextButton}
				onClick={handleToggleTextLength}
			>{`See ${isSeeingMore ? 'Less' : 'More'}`}</Nav.Link>
		</>
	);
};

SeeMoreText.propTypes = {
	extras: PropTypes.any,
	text: PropTypes.string,
	onToggle: PropTypes.function
};

export default SeeMoreText;
