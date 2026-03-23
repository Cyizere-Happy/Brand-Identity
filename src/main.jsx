import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const rootElement = document.getElementById('root');
if (!rootElement._root) {
  rootElement._root = createRoot(rootElement);
}

rootElement._root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
