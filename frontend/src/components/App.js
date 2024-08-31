import React, { useState, useEffect } from 'react';
import { Route,  Routes, useLocation} from 'react-router-dom';
import '../styles/index.scss';
import axios from 'axios';

import Layout from './shared/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import PixelLoader from './shared/PixelLoader';
import Arcade from './pages/Arcade';

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
	const [appLoaded, setAppLoaded] = useState(false);

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
			.then(() => axios.get('/categories'))
			.then(res => setCategories(res.data.categories))
			.then(() => axios.get('/arcade/games'))
			.then(res => setGames(res.data.games))
			.then(() => axios.get('/content'))
			.then(res => {
				setContentData(res.data.content);
				// Pre-load About Page Image
				const img = new Image;
				img.src = res.data.content.about_img;
			})
			.catch(console.error);
	}, []);

	const getRoutes = () => (
		<Routes location={location} key={location.key}>
			<Route path='/about' element={(
				<About img={contentData.about_img} description={contentData.about_description} />
			)} />
			<Route
				path='/portfolio'
				element={<Portfolio projects={projects} categories={categories} />}
			/>
			<Route path='/arcade/*' element={(
				<Arcade games={games} />
			)} />
			<Route path='/' element={(
				<Home
					isTyping={loadingComplete}
					typewriterTexts={contentData.typewriter_texts} 
					title={contentData.home_title}
				/>
			)} />
		</Routes>
	);
	
	return (
		<>
			<Layout>{getRoutes()}</Layout>
			{!loadingComplete && <PixelLoader 
				isLoading={!appLoaded}
				onAnimationExited={() => {
					setLoadingComplete(true);
				}}
				onAnimationComplete={() => {
					if (contentData && projects && categories) {
						setAppLoaded(true);
					}
				}} 
			/>}
		</>
	);
};

export default App;
