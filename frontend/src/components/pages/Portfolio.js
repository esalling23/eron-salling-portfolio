import React from 'react'
import { Spinner, Row } from 'react-bootstrap'

import Project from '../shared/Project'

const Portfolio = ({ projects }) => {
	const content = useMemo(() => {
		if (!projects) {
			return (
				<Row className="justify-content-md-center">
					<Spinner animation="border" variant="dark" />
				</Row>
			)
		}

		return (
			<Row className="justify-content-center" style={{ paddingBottom: '10em' }}>
				{projects.map((project) => (
					<Project
						key={project.id}
						title={project.title}
						dateStarted={project.date_started}
						dateEnded={project.date_ended}
						description={project.description}
						moreLink={project.more_link}
						mainImg={project.main_img}
						thumbnailImg={project.thumbnailImg}
					/>
				))}
			</Row>
		)
	}, [projects])

	return (
		<section>
			{content}
		</section>
	)
}

export default Portfolio
