import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Tailwind CSS
import './layout.css' // Layout variables and utilities
import './styles.css' // Custom styling
import './chat-styles.css' // Standalone styling without Tailwind
import './ios-fixes.css' // iOS Safari specific fixes
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
