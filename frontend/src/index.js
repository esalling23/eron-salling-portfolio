import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './components/App'

const appJsx = (
  <HashRouter>
    <App/>
  </HashRouter>
)

render(appJsx, document.getElementById('app'))
