import React from 'react'
import { Image, Col, Row, Collapse } from 'react-bootstrap'

const Project = ({
	title,
	dateStarted,
	dateEnded,
	description,
	mainImg,
	thumbnailImg,
}) => (
	<Row>
		<Col md={10}>
			<h3>{title}</h3>
			<Row>
				<Col md={6} className='my-5'>
					<Image src={mainImg} alt='Main project image' fluid />
				</Col>
				<Col md={6} className='my-5'>
					<h5>
						{dateStarted} - {dateEnded ? dateEnded : 'Current'}
					</h5>
					<p>{description}</p>
				</Col>
			</Row>
		</Col>
	</Row>
)

export default Project