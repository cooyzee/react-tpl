// Polyfill may be needed
// map, set, object, promise (core-js)
import ReactDOM from 'react-dom/client'
import App from './app'

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />)
