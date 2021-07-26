import React from 'react'
import { Image, Col, Row, Badge } from 'react-bootstrap'
import format from 'date-fns/format'

// Formats date into "Month NumYear"
const formatDate = (date) => {
	return format(new Date(date), 'MMM yyyy')
}

const Project = ({
	title,
	dateStarted,
	dateEnded,
	description,
	moreLink,
	mainImg,
	thumbnailImg,
}) => (
	<Col md={12}>
		<h2>{title}</h2>
		<Row>
			<Col md={6} className='my-2'>
				<Image src={mainImg} alt='Main project image' fluid />
			</Col>
			<Col md={6} className='my-2'>
				<h5>
					{formatDate(dateStarted)} - {dateEnded ? formatDate(dateEnded) : 'Current'}
				</h5>
				{moreLink && <Badge variant="primary"><a target="_blank" href={moreLink}>See more</a></Badge>}
				<p className="pt-3">{description}</p>
			</Col>
		</Row>
	</Col>
)

export default Project
