import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LandingD } from './LandingD'
import '../estilos/tokens.css'
import '../estilos/base.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LandingD />
  </StrictMode>,
)
