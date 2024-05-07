import React, { useState, useEffect } from 'react';
import { Route,  Routes, useLocation} from 'react-router-dom';
import '../styles/index.scss';
import axios from 'axios';

import Layout from './shared/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import LoadingSpinner from './shared/LoadingSpinner';
// import ReduxExample from './pages/ReduxExample';
// import RPGCanvas from './rpg-canvas/RPGCanvas';

const App = () => {
	const location = useLocation();

	const [projects, setProjects] = useState(null);
	const [categories, setCategories] = useState(null);
	const [contentData, setContentData] = useState(null);

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
			.then(() => axios.get('/content'))
			.then(res => {
				setContentData(res.data.content);
				// Pre-load About Page Image
				const img = new Image;
				console.log(res.data.content.about_img);
				img.src = res.data.content.about_img;
			})
			.catch(console.error);
	}, []);

	if (!contentData) {
		return <Layout>
			<LoadingSpinner isLoaded={false} />
		</Layout>;
	}

	return (
		<Layout>
			<Routes location={location} key={location.key}>
				<Route path='/about' element={(
					<About img={contentData.about_img} description={contentData.about_description} />
				)} />
				<Route
					path='/portfolio'
					element={<Portfolio projects={projects} categories={categories} />}
				/>
				<Route path='/' element={(
					<Home 
						typewriterTexts={contentData.typewriter_texts} 
						title={contentData.home_title}
					/>
				)} />
			</Routes>
		</Layout>
	);
};

export default App;
