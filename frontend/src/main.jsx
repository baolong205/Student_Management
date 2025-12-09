import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { useAuthStore } from './store/authStore';
import { Toaster } from 'sonner'
useAuthStore.getState().initAuth();
createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Toaster
      position="top-right"
      richColors
      closeButton
      expand
    />
    <App />
  </StrictMode>,
)
