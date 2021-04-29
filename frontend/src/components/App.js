import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import '../styles/index.scss'

import Layout from './shared/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'

const App = () => {
  const [projects, setProjects] = useState(null)
  
  useEffect(() => {
    fetch('/projects')
      .then(res => res.json())
      .then(res => setProjects(res.projects))
      .catch(console.error)
  }, [])

  return (
		<Layout>
			<Switch>
				<Route path='/about' component={About} />
				<Route
					path='/portfolio'
					render={() => <Portfolio projects={projects} />}
				/>
				<Route path='/' component={Home} />
			</Switch>
		</Layout>
	)
}

export default App
