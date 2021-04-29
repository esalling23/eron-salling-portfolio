import React from 'react'
import { Spinner, Row, Col } from 'react-bootstrap'

import Project from '../shared/Project'

const Portfolio = ({ projects }) => (
	<section>
		<h2>Work</h2>
		{!projects && (
			<Row className='justify-content-md-center'>
				<Col>
					<Spinner animation='border' variant='dark' />
				</Col>
			</Row>
		)}
		{projects &&
			projects.map((project) => (
				<Project
					key={project.id}
					title={project.title}
					dateStarted={project.date_started}
					dateEnded={project.date_ended}
					description={project.description}
					mainImg={project.main_img}
					thumbnailImg={project.thumbnailImg}
				/>
			))}
	</section>
)

export default Portfolio