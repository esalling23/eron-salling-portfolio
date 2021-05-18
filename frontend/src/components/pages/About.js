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

					I've built games and applications in React, "vanilla" JS, C#, and Python. One of my favorite tools is Unity, 
					but I've also tinkered with Unreal Engine and PhaserJS. 
				</p>
			</Col>
		</Row>
	</section>
)

export default About
