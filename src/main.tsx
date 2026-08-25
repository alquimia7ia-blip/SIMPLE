import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ExperienciaCentral } from './experiencia/ExperienciaCentral'
import { Hero } from './hero/Hero'
import { Narrativa } from './secciones/Narrativa'
import { Validacion } from './validacion/Validacion'
import './estilos/tokens.css'
import './estilos/base.css'

const EXPERIENCIA = 'experiencia'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main>
      <Hero destino={EXPERIENCIA} />
      <section id={EXPERIENCIA} className="pagina">
        <ExperienciaCentral />
      </section>
      <Narrativa />
      <Validacion />
    </main>
  </StrictMode>,
)
