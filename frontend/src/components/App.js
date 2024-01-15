import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import '../styles/index.scss'

import Layout from './shared/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Meta from './pages/Meta'

import { socket } from '../socket';
// import Redux from './pages/ReduxExample'

const App = () => {
  const [projects, setProjects] = useState(null)
  const [categories, setCategories] = useState(null)

	const [userCount, setUserCount] = useState(0)

	// const connect = () => {
	// 	socket.connect()
	// }

	// const disconnect = () => {
	// 	socket.disconnect()
	// }

  useEffect(() => {		
		const onConnect = () => {
			setUserCount(curr => curr + 1)
			console.log('connected')
		}
		const onDisconnect = () => {
			console.log('disconnect')
		}
		const onCustom = () => {
			console.log('custom')
		}
		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
		socket.on('custom', onCustom);

		const connect = () => socket.connect();
		const disconnect = () => socket.disconnect();

		connect();

    fetch('/projects')
			.then(res => res.json())
			.then(res => setProjects(res.projects))
			.then(() => fetch('/categories'))
			.then(res => res.json())
			.then(res => setCategories(res.categories))
      .catch(console.error)

		return () => {
			// socket.off('connect', onConnect)
			// socket.off('disconnect', onDisconnect);
			// socket.off('custom', onCustom);
			disconnect();
		}
  }, [])

  return (
		<Layout>
			<header>
				<h2>Users connected: {userCount}</h2>
			</header>
			<Switch>
				<Route path='/about' component={About} />
				<Route
					path='/portfolio'
					render={() => <Portfolio projects={projects} categories={categories} />}
				/>
				<Route
					path='/meta'
					render={() => <Meta projects={projects} categories={categories} />}
				/>
				{/* <Route
					path='/redux'
					render={() => <Redux />}
				/> */}
				<Route path='/' component={Home} />
			</Switch>
		</Layout>
	)
}

export default App
