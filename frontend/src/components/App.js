import React, { useState, useEffect } from 'react'
import '../styles/index.scss'

const App = () => {
  const [projects, setProjects] = useState(null)
  
  useEffect(() => {
    fetch('/projects')
      .then(res => res.json())
      .then(res => setProjects(res.projects))
      .catch(console.error)
  }, [])

  return (
    <main>
      <section>
        <h2>About Me</h2>
        <p>Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic.</p>
      </section>
      <section>
        <h2>Work</h2>
        { projects ? projects.map(project => (
          <div key={project.id}>
            <h3>{project.title}</h3>
            <h5>{project.date_started} - {project.date_ended ? project.date_ended : 'Current'}</h5>
            <p>{project.description}</p>
          </div>
        )) : 'Loading...' }
      </section>
    </main>
  )
}

export default App
