import React, { useState, useRef, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import Isotope from 'isotope-layout';
import styled from 'styled-components';

import Project from '../shared/Project';
import CategoriesFilter from '../shared/CategoriesFilter';
import { StyledToggleDisplay } from '../../styles/SharedComponents';
// import LoadingSpinner from '../shared/LoadingSpinner';
import PageContainer from '../shared/PageContainer';

const StyledProjectsDisplay = styled(StyledToggleDisplay)`
	padding-bottom: 10em;
	display: block;
`;

const Portfolio = ({ projects, categories }) => {
	// init one ref to store the future isotope object
	const isotope = useRef(null);

	// store the filter keyword in a state
	const [filterKey, setFilterKey] = useState('*');

	// Loading support
	const [loadedProjectCount, setLoadedProjectCount] = useState(0);

	const isLoaded = useMemo(
		() => {
			// console.log(loadedProjectCount, projects.length)
			return projects 
				&& categories
				&& loadedProjectCount === projects.length;
		},
		[projects, categories, loadedProjectCount],
	);
	
	// initialize an Isotope object with configs
	useEffect(() => {
		if (!isLoaded) {
			return;
		}
		isotope.current = new Isotope('.filter-container', {
			itemSelector: '.project-container',
			layout: 'vertical'
		});

		return () => isotope.current.destroy();
	}, [isLoaded]);

	// handling filter key change
	useEffect(() => {
		if (!isotope.current) {
			return;
		}

		filterKey === '*'
			? isotope.current.arrange({filter: '*'})
			: isotope.current.arrange({filter: `.${filterKey}`});
	}, [filterKey]);

	const handleFilterKeyChange = key => setFilterKey(key);

	const projectList = projects?.map((project) => (
		<Project
			key={project.id}
			title={project.title}
			subtitle={project.subtitle}
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
	));

	const categoriesDisplay = <CategoriesFilter
		as={Row}
		isLoading={!isLoaded}
		categories={categories}
		handleFilter={handleFilterKeyChange}
	/>;
	
	return (
		<PageContainer isPageLoading={!isLoaded}>
			{categoriesDisplay} 
			{/* Render projects hidden to wait for images to load */}
			<StyledProjectsDisplay
				as={Row}
				isHidden={!isLoaded}
				className="w-100 d-flex justify-content-center filter-container"
			>
				{projectList || ''}
			</StyledProjectsDisplay>
		</PageContainer>
	);
};

Portfolio.propTypes = {
	projects: PropTypes.array,
	categories: PropTypes.array,
};


export default Portfolio;
