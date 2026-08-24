import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ExperienciaCentral } from './experiencia/ExperienciaCentral'
import './estilos/tokens.css'
import './estilos/base.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="pagina">
      <ExperienciaCentral />
    </main>
  </StrictMode>,
)
