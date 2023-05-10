import React from "react"
import { styled } from "styled-components";
import Typewriter from 'typewriter-effect';

const StyledTypewriter = styled(Typewriter)`
  font-family: 'Ubuntu Mono', monospace;
`

const TextAnimation = ({ textArray, isRepeating = true }) => {
  const initTypewriter = (typewriter) => {
    // typewriter.typeString(text)
    //   .callFunction(() => {
    //     console.log('String typed out!');
    //   })
    //   .pauseFor(2500)
    //   .deleteAll()
    //   .callFunction(() => {
    //     console.log('All strings were deleted');
    //   })
    //   .start();
  }

  return <StyledTypewriter
    options={{
      strings: textArray,
      autoStart: true,
      loop: isRepeating,
      skipAddStyles: true
    }}
    onInit={initTypewriter}
  />
}

export default TextAnimation