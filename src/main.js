// Polyfill may be needed
// map, set, object, promise (core-js)
import React from 'react'
import { render } from 'react-dom'
import App from './app'

render(
  <App />,
  document.getElementById('app')
)
