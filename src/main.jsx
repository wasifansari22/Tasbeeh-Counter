import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'
import { BrowserRouter } from 'react-router-dom'
import { DhikrProvider } from './context/DhikrContext.jsx'
import { registerSW } from "virtual:pwa-register";

registerSW({
    immediate: true,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <DhikrProvider>
        <App />
      </DhikrProvider>
    </BrowserRouter>
  </StrictMode>,
)
