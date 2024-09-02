import React from 'react';
import PropTypes from 'prop-types';
import TextAnimation from '../../shared/TextAnimation';
import PageContainer from '../../shared/PageContainer';

const Home = ({
	title,
	typewriterTexts,
	isTyping = true
}) => {
	return (
		<PageContainer className='flex-col-center'>
			<section className="d-flex flex-row justify-content-start" style={{ width: 'fit-content' }}>
				<div className="d-flex flex-column w-50 typing-cursor codeblock">
					<div className="text-main">{title}</div>
					<div className="pt-1 d-flex">
						<span className="pr-3">{'>'}</span>
						{typewriterTexts?.length > 0
							&& isTyping
							&& <TextAnimation textArray={typewriterTexts}/>}
					</div>
				</div>
				<div className="w-50">
					{/* 3D model */}
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
