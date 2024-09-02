import React from 'react';
import PropTypes from 'prop-types';
import TextAnimation from '../../shared/TextAnimation';
import SectionContainer from '../../shared/SectionContainer';

import styles from './styles.module.scss';
import classNames from 'classnames';
import SectionBox from '../../shared/SectionContainer/SectionBox';

const HomeSection = ({
	typewriterTexts,
	isTyping = true
}) => {
	return (
		// <PageContainer className='flex-col-center'>
		<SectionContainer id="home">
			<SectionBox className={classNames(
				'background-color-light p-3 p-lg-5 justify-content-center',
				styles.homeBanner
			)}>
				<div className="text-color-black text-title">
					Hello,<br/>
					{'I\'m '}
					<span className="text-color-dark">Eron Salling</span>
				</div>
			</SectionBox>
			<SectionBox className="text-color-light justify-content-center">
				<div className={classNames(
					'd-flex flex-column background-color-black', 
					styles.terminal
				)}>
					<div className={styles.appBar}>
						<div className={styles.appBarButton} />
					</div>
					<div className={classNames(
						'd-flex', 
						styles.typewriter
					)}>
						<span className="pr-3">{'%'}</span>
						{typewriterTexts?.length > 0
							&& isTyping
							&& <TextAnimation textArray={typewriterTexts}/>}
					</div>
				</div>
				{/* 3D model */}
			</SectionBox>
		</SectionContainer>
		// </PageContainer>
	);
};

HomeSection.propTypes = {
	title: PropTypes.string,
	typewriterTexts: PropTypes.arrayOf(PropTypes.string),
	isTyping: PropTypes.bool
};

export default HomeSection;
