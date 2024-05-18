import React from 'react';
import PropTypes from 'prop-types';
import TextAnimation from '../shared/TextAnimation';
import PageContainer from '../shared/PageContainer';

const Home = ({
	title,
	typewriterTexts,
	isTyping = true
}) => {
	return (
		<PageContainer className='d-flex justify-content-center'>
			<section className="full-screen d-flex" style={{ width: 'fit-content' }}>
				<h1>{title}</h1>
				<div className="d-flex typing-cursor">
					<div className="pt-1 pr-3">{'>'}</div>
					{typewriterTexts?.length > 0
						&& isTyping
						&& <TextAnimation textArray={typewriterTexts}/>}
				</div>
			</section>
		</PageContainer>
	);
};

Home.propTypes = {
	title: PropTypes.string,
	typewriterTexts: PropTypes.arrayOf(PropTypes.string),
	isTyping: PropTypes.bool
};

export default Home;
