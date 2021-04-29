import React from 'react'
import { Image, Row, Col } from 'react-bootstrap'

const About = () => (
	<section id='about'>
		<Row>
			<Col md={6}>
				<Image src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' fluid/>
			</Col>
			<Col md={6}>
				<p>
					Hey there, I'm Eron Salling (he/him). I'm a game developer who specializes in
					educational experiences and civic engagement.
				</p>
			</Col>
		</Row>
	</section>
)

export default About