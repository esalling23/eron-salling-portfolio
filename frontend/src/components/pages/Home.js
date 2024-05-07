import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextAnimation from '../shared/TextAnimation';
import PageContainer from '../shared/PageContainer';

const Home = ({
	title,
	typewriterTexts
}) => {
	const [isPageLoaded, setIsPageLoaded] = useState(false);
	return (
		<PageContainer onPageLoaded={() => setIsPageLoaded(true)}>
			<section className="full-screen d-flex">
				<h1>{title}</h1>
				<div className="d-flex typing-cursor">
					<div className="pt-1 pr-3">{'>'}</div>
					{typewriterTexts?.length > 0 
						&& isPageLoaded
						&& <TextAnimation textArray={typewriterTexts}/>}
				</div>
			</section>
		</PageContainer>
	);
};

Home.propTypes = {
	title: PropTypes.string,
	typewriterTexts: PropTypes.arrayOf(PropTypes.string)
};

export default Home;
