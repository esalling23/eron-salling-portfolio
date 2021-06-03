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
	<Col md={12}>
		<h4>{title}</h4>
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
)

export default Project