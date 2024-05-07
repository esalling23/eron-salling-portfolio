import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'styled-components';
import Typewriter from 'typewriter-effect';

const StyledTypewriter = styled(Typewriter)`
  font-family: 'Ubuntu Mono', monospace;
`;

const TextAnimation = ({ textArray, isRepeating = true }) => {
	// const initTypewriter = t => console.log(t)
	return <StyledTypewriter
		options={{
			strings: textArray,
			autoStart: true,
			loop: isRepeating,
			skipAddStyles: true
		}}
		// onInit={initTypewriter}
	/>;
};

TextAnimation.propTypes = {
	textArray: PropTypes.arrayOf(PropTypes.string), 
	isRepeating: PropTypes.bool
};

export default TextAnimation;