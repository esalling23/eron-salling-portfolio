import React from 'react'
import { Image, Row, Col, Badge } from 'react-bootstrap'
import { Github, Linkedin } from 'react-bootstrap-icons'

import BadgeLink from '../shared/BadgeLink'

const About = () => (
	<section id="about">
		<Row className="justify-content-center">
			<Col className="pb-3" md={6} sm={12}>
				<Image
					src="https://eron-portfolio.s3.amazonaws.com/Eron+Headshot+Big"
					fluid
				/>
			</Col>
			<Col md={6} sm={12}>
				<p>
					Hey there, I'm Eron Salling (he/him). I'm a game developer who
					specializes in educational experiences and civic engagement.
				</p>
				<p>
					When building games I tend to lean on Unity and C#, but I also enjoy
					building web applications using Django and ReactJS as well as the MERN
					stack.
				</p>

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
	</section>
)

export default About
