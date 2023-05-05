import React from 'react'
import { Image, Row, Col, Badge } from 'react-bootstrap'
import { Github, Linkedin } from 'react-bootstrap-icons'

const About = () => (
	<section id="about">
		<Row className="justify-content-center">
			<Col className="pb-3" xs={8} md={6}>
				<Image
					src="https://eron-portfolio.s3.amazonaws.com/Eron+Headshot+Big"
					fluid
				/>
			</Col>
			<Col xs={8} md={6}>
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
					<Badge variant="primary">
						<a target="_blank" href="https://github.com/esalling23">
							<Github /> Github
						</a>
					</Badge>
					<Badge variant="primary" className="ml-3">
						<a target="_blank" href="https://www.linkedin.com/in/eron-salling/">
							<Linkedin /> Linkedin
						</a>
					</Badge>
				</div>
			</Col>
		</Row>
	</section>
)

export default About
