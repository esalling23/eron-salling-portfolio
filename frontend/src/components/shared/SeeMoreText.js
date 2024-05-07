import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledSeeMoreButton = styled(Button)`
	background: none;
	border: none;
	padding: 0;

	&:hover, &:active, &:focus {
		background: none;
		background-color: none !important;
	}

	&:hover {
		text-decoration: underline;
	}
`;

// Text element that can see more or see less
const SeeMoreText = ({
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
			<StyledSeeMoreButton
				onClick={handleToggleTextLength}
			>{`See ${isSeeingMore ? 'Less' : 'More'}`}</StyledSeeMoreButton>
		</>
	);
};

SeeMoreText.propTypes = {
	text: PropTypes.string,
	onToggle: PropTypes.function
};

export default SeeMoreText;
