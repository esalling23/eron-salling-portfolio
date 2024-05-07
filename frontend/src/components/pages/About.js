import React from 'react';
import PropTypes from 'prop-types';
import { Image, Row, Col } from 'react-bootstrap';
import { Github, Linkedin } from 'react-bootstrap-icons';

import BadgeLink from '../shared/BadgeLink';
import PageContainer from '../shared/PageContainer';

const About = ({
	description,
	img,
}) => (
	<PageContainer id="about">
		<Row className="justify-content-center">
			<Col className="pb-3" md={6} sm={12}>
				<Image
					src={img}
					fluid
				/>
			</Col>
			<Col md={6} sm={12}>
				<p>{description}</p>

				<div>
					<BadgeLink variant="primary" url="https://github.com/esalling23">
						<Github /> Github
					</BadgeLink>
					<BadgeLink className="ml-3" url="https://www.linkedin.com/in/eron-salling/">
						<Linkedin /> Linkedin
					</BadgeLink>
				</div>
			</Col>
		</Row>
	</PageContainer>
);

About.propTypes = {
	description: PropTypes.string,
	img: PropTypes.string
};

export default About;
