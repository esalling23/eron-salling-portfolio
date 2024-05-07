import React, { useState, useRef, useMemo, useEffect } from 'react'
import { Spinner, Row } from 'react-bootstrap'
import Isotope from 'isotope-layout'
import styled from 'styled-components'

import MetaProject from '../shared/MetaProject'
import CategoriesFilter from '../shared/CategoriesFilter'
import { StyledToggleDisplay } from '../../styles/SharedComponents'

const StyledProjectsDisplay = styled(StyledToggleDisplay)`
	padding-bottom: 10em;
	display: grid;
`

// Arcade like way of interacting with projects
const Meta = ({ projects, categories }) => {
	// init one ref to store the future isotope object
	const isotope = useRef(null);

	// store the filter keyword in a state
	const [filterKey, setFilterKey] = useState('*')

	// Loading support
	const [loadedProjectCount, setLoadedProjectCount] = useState(0);

	const isLoaded = useMemo(
		() => projects && categories && loadedProjectCount === projects.length,
		[projects, categories, loadedProjectCount],
	)
	
	// initialize an Isotope object with configs
	useEffect(() => {
		if (!isLoaded) {
			return;
		}
		isotope.current = new Isotope('.filter-container', {
			itemSelector: '.project-container',
			layout: 'vertical'
		})

		return () => isotope.current.destroy()
	}, [isLoaded])

	// handling filter key change
	useEffect(() => {
		if (!isotope.current) {
			return;
		}

		filterKey === '*'
			? isotope.current.arrange({filter: `*`})
			: isotope.current.arrange({filter: `.${filterKey}`})
	}, [filterKey])

	const handleFilterKeyChange = key => setFilterKey(key)

	const projectList = projects?.map((project) => (
		<MetaProject
			key={project.id}
			title={project.title}
			dateStarted={project.date_started}
			dateEnded={project.date_ended}
			description={project.description}
			moreLink={project.more_link}
			mainImg={project.main_img}
			thumbnailImg={project.thumbnailImg}
			categories={project.categories}
			handleContentLoaded={() => setLoadedProjectCount(curr => curr + 1)}
			handleResize={() => isotope.current?.layout()}
		/>
	))

	const categoriesDisplay = <CategoriesFilter
		as={Row}
		categories={categories}
		handleFilter={handleFilterKeyChange}
	/>

	const loadingSpinner = <StyledToggleDisplay
		className="d-flex justify-content-center h-100 w-100"
		isHidden={isLoaded}
	>
		<Spinner animation="border" variant="dark" />
	</StyledToggleDisplay>

	return (
		<section>
			{isLoaded ? categoriesDisplay : loadingSpinner}
			{/* Render projects hidden to wait for images to load */}
			<StyledProjectsDisplay
				as={Row}
				isHidden={!isLoaded}
				className="justify-content-center filter-container"
			>
				{projectList || ''}
			</StyledProjectsDisplay>
		</section>
	)
}

export default Meta
