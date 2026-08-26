/*
  Versión B: la misma marca, muchísimo menos texto.

  Estructura — 6 momentos en vez de los 10 de la Versión A:

    HERO → PROBLEMA → SOLUCIÓN (con la demo real) → DIFERENCIA → PARA
    QUIÉN (con el primer contacto) → VALIDACIÓN (las 3 preguntas
    táctiles, reutilizadas sin cambios) → CIERRE (con el contacto final)

  Se fusionan deliberadamente "cómo funciona" dentro de "solución" —la
  demo interactiva ya demuestra el mecanismo, explicarlo aparte era
  redundante— y se sustituye una sección de "evidencia" por el propio
  contraste de mecanismo: el proyecto no tiene testimonios ni cifras
  reales, y no se inventan.
*/

import { HeroB } from './HeroB'
import { ProblemaB, SolucionB, DiferenciaB, OfertaB } from './SeccionesB'
import { Validacion } from '../validacion/Validacion'
import { Cierre } from '../cierre/Cierre'

const DEMO = 'demo-b'

export function LandingB() {
  return (
    <main>
      <HeroB destino={DEMO} />
      <ProblemaB />
      <SolucionB id={DEMO} />
      <DiferenciaB />
      <OfertaB />
      <Validacion />
      <Cierre />
    </main>
  )
}
