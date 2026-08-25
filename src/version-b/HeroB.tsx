/*
  Hero de la Versión B.

  Reutiliza la geometría y el CSS del hero de la Versión A (mismo
  emblema, mismos halos, mismo símbolo) para no duplicar sistema visual.
  Lo único que cambia es el contenido: un subtítulo que la Versión A no
  tenía, y un único CTA — sin una segunda acción compitiendo.
*/

import { SimboloSimple } from '../marca/SimboloSimple'
import '../hero/Hero.css'
import './HeroB.css'

const HEADLINE = 'Cuando no sepas qué hacer con el celular, pregúntale a Simple.'
const SUBHEAD = 'Un copiloto de voz que te guía paso a paso y te muestra dónde tocar.'
const CTA = 'Ver cómo funciona'

export function HeroB({ destino }: { destino: string }) {
  return (
    <section className="hero">
      <div className="hero__interior">
        <span className="hero__emblema" aria-hidden="true">
          <span className="hero__halo" data-anillo="3" />
          <span className="hero__halo" data-anillo="2" />
          <span className="hero__halo" data-anillo="1" />
          <span className="hero__disco" />
          <SimboloSimple className="hero__simbolo" />
        </span>

        <h1 className="hero__titular">{HEADLINE}</h1>
        <p className="heroB__subhead">{SUBHEAD}</p>

        <a className="hero__cta" href={`#${destino}`}>
          {CTA}
        </a>

        <span className="hero__descenso" aria-hidden="true">
          <span className="hero__descenso-punto" />
        </span>
      </div>
    </section>
  )
}
