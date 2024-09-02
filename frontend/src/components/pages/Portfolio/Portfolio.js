import React, { useState, useRef, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import Isotope from 'isotope-layout';
import styled from 'styled-components';

import Project from '../../shared/Project';
import CategoriesFilter from '../../shared/CategoriesFilter';
import { StyledToggleDisplay } from '../../../styles/SharedComponents';
import SectionContainer from '../../shared/SectionContainer';
import PixelLoader from '../../shared/Pixels/PixelLoader';

const StyledProjectsDisplay = styled(StyledToggleDisplay)`
	padding-bottom: 10em;
	display: block;
	
	${({ isHidden }) => isHidden && `
		height: 60vh !important;
		overflow: hidden;
	`}
`;

const asterisk = '*';

const Portfolio = ({ projects, categories }) => {
	// init one ref to store the future isotope object
	const isotope = useRef(null);
	const categoriesDisplayRef = useRef(null);

	// store the filter keyword in a state
	const [filterKey, setFilterKey] = useState(asterisk);

	// Loading support
	const [displayContent, setDisplayContent] = useState(false);
	const [loadingAnimComplete, setLoadingAnimComplete] = useState(false);
	const [loadedProjectCount, setLoadedProjectCount] = useState(0);

	const isLoaded = useMemo(
		() => {
			return projects 
				&& categories
				&& loadedProjectCount === projects.length;
		},
		[projects, categories, loadedProjectCount],
	);
	
	// initialize an Isotope object with configs
	useEffect(() => {
		isotope.current = new Isotope('.filter-container', {
			itemSelector: '.filter-item',
			layout: 'vertical'
		});

		return () => isotope.current.destroy();
	}, [isLoaded]);

	// handling filter key change
	useEffect(() => {
		if (!isotope.current) {
			return;
		}

		filterKey === asterisk
			? isotope.current.arrange({filter: asterisk})
			: isotope.current.arrange({filter: `.${filterKey}`});
	}, [filterKey]);

	const handleFilterKeyChange = key => {
		categoriesDisplayRef.current?.scrollIntoView({ behavior: 'smooth' });

		setFilterKey(curr => {
			if (key === asterisk) return asterisk;

			let keys = curr.split('.');
			if (curr === asterisk) keys = [];

			if (keys.includes(key))
			{
				keys = keys.filter(k => k != key);
			} else {
				keys.push(key);
			}

			if (keys.length == 0) return asterisk;

			return keys.join('.');
		});
	};

	const projectList = projects?.map((project, i) => (
		<Project
			key={project.id}
			index={i}
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
		activeKeys={filterKey.split('.')}
		categories={categories}
		handleFilter={handleFilterKeyChange}
		ref={categoriesDisplayRef}
	/>;
	
	return (
		<SectionContainer 
			// className="position-relative"
			id="portfolio"
		>
			{categoriesDisplay} 
			{/* Render projects hidden to wait for images to load */}
			<StyledProjectsDisplay
				isHidden={!displayContent}
				className="w-100 h-100 d-flex justify-content-center filter-container h-section"
			>
				<PixelLoader
					isLoading={!isLoaded || !loadingAnimComplete}
					handleAnimComplete={() => setLoadingAnimComplete(true)}
					handleAnimExited={() => setDisplayContent(true)}
				/>
				{projectList || ''}
			</StyledProjectsDisplay>
		</SectionContainer>
	);
};

Portfolio.propTypes = {
	projects: PropTypes.array,
	categories: PropTypes.array,
};


export default Portfolio;
