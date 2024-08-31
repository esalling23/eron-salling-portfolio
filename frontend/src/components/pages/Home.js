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
		<PageContainer className='flex-col-center'>
			<section className="d-flex flex-column justify-content-start" style={{ width: 'fit-content' }}>
				<div className="d-flex flex-column typing-cursor codeblock">
					<div className="text-white">{title} {'~'}</div>
					<div className="pt-1 d-flex">
						<span className="pr-3">{'>'}</span>
						{typewriterTexts?.length > 0
							&& isTyping
							&& <TextAnimation textArray={typewriterTexts}/>}
					</div>
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
