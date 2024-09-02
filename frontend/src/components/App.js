import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Route,  Routes, useLocation} from 'react-router-dom';
import '../styles/index.scss';
import axios from 'axios';

import SinglePageLayout from './shared/Layout/SinglePageLayout';
import Layout from './shared/Layout/Layout';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Arcade from './pages/Arcade';
import HomeSection from './pages/Home/HomeSection';

const App = () => {
	const location = useLocation();

	const [projects, setProjects] = useState(null);
	const [categories, setCategories] = useState(null);
	const [contentData, setContentData] = useState({
		about_img: null,
		about_description: null,
		home_title: null,
		typewriter_texts: null,
	});
	const [games, setGames] = useState(null);

	const [loadingComplete, setLoadingComplete] = useState(true);

	useEffect(() => {
		axios.get('/projects')
			.then(res => {
				setProjects(res.data.projects);
				// Pre-load images
				for (const proj of res.data.projects) {
					const img = new Image();
					img.src = proj.main_img;
				}
			})
			.catch(console.error);

		axios.get('/categories')
			.then(res => setCategories(res.data.categories))
			.catch(console.error);

		axios.get('/arcade/games')
			.then(res => setGames(res.data.games))
			.catch(console.error);

		axios.get('/content')
			.then(res => {
				setContentData(res.data.content);
				// Pre-load About Page Image
				const img = new Image;
				img.src = res.data.content.about_img;
			})
			.catch(console.error);
	}, []);

	useEffect(() => {
		if (contentData && categories && games && projects) {
			setLoadingComplete(true);
		}
	}, [contentData, categories, games, projects]);

	const getRoutes = useCallback(() => (
		<Routes location={location} key={location.key}>
			<Route path='/arcade/*' element={(
				<Arcade games={games} />
			)} />
			<Route path='/' element={(
				<SinglePageLayout>
					<HomeSection
						isTyping={loadingComplete}
						typewriterTexts={contentData.typewriter_texts} 
						title={contentData.home_title}
					/>
					<About img={contentData.about_img} description={contentData.about_description} />
					<Portfolio projects={projects} categories={categories} />
				</SinglePageLayout>
			)} />
		</Routes>
	), [contentData, projects, categories, games]);

	const content = useMemo(getRoutes, [getRoutes]);
	
	return (
		<>
			<Layout>{content}</Layout>
		</>
	);
};

export default App;
