import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LandingC } from './LandingC'
import '../estilos/tokens.css'
import '../estilos/base.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LandingC />
  </StrictMode>,
)
