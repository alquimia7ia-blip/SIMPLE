import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LandingB } from './LandingB'
import '../estilos/tokens.css'
import '../estilos/base.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LandingB />
  </StrictMode>,
)
