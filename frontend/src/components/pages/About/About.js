import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import { Github, Linkedin } from 'react-bootstrap-icons';

import BadgeLink from '../../shared/Badge/BadgeLink';
import SectionContainer from '../../shared/SectionContainer';
import SectionBox from '../../shared/SectionContainer/SectionBox';

import styles from './styles.module.scss';
import classNames from 'classnames';

const About = ({
	description,
	img,
}) => (
	<SectionContainer id="about">
		<SectionBox 
			className={classNames(
				'p-0 justify-content-center background-color-dark',
			)}
		>
			<Image
				src={img}
				fluid
				className={styles.aboutImg}
			/>
		</SectionBox>
		<SectionBox className="p-3 p-md-5 background-color-main justify-content-end align-items-end">
			<p className={styles.aboutDescription}>{description}</p>
 
			<div className="d-flex flex-row justify-content-start flex-wrap">
				<BadgeLink 
					className="mr-3"
					url="https://github.com/esalling23"
					icon={Github}
					text="Github"
				/>
				<BadgeLink 
					url="https://www.linkedin.com/in/eron-salling/"
					icon={Linkedin}
					text="LinkedIn"
				/>
			</div>
		</SectionBox>
	</SectionContainer>
);

About.propTypes = {
	description: PropTypes.string,
	img: PropTypes.string
};

export default About;
