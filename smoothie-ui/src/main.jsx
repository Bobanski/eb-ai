import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Tailwind CSS
import './styles.css' // Custom styling
import './chat-styles.css' // Standalone styling without Tailwind
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
