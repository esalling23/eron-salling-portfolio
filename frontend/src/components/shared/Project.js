import React from 'react'
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
					{formatDate(dateStarted)} - {dateEnded ? formatDate(dateEnded) : 'Current'}
				</h5>
				<p>{description}</p>
			</Col>
		</Row>
	</Col>
)

export default Project