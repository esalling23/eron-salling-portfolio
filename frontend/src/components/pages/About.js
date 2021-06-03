import React from 'react'
import { Image, Row, Col } from 'react-bootstrap'

const About = () => (
	<section id='about'>
		<Row className='justify-content-center'>
			<Col className='pb-3' xs={8} md={6}>
				<Image src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' fluid/>
			</Col>
			<Col xs={8} md={6}>
				<p>
					Hey there, I'm Eron Salling (he/him). I'm a game developer who specializes in
					educational experiences and civic engagement. 
				</p>
				<p>
					When building games I tend to lean on Unity and C#, but I also enjoy building web applications using Django and ReactJS as well as the MERN stack. 
				</p>
			</Col>
		</Row>
	</section>
)

export default About
