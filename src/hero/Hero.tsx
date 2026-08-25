/*
  Hero de la landing.

  Una sola frase, un solo camino. El emblema de Simple es el único
  elemento visual: sin mockup, sin captura de producto, sin ilustración
  y sin personas — el Manual pide abrir sin enseñar todavía el producto.

  El enlace es una ancla real: funciona sin JavaScript y el desplazamiento
  suave se apaga solo cuando el visitante pide menos movimiento.
*/

import { SimboloSimple } from '../marca/SimboloSimple'
import { CTA_CONTACTO, WHATSAPP } from '../marca/enlaces'
import './Hero.css'

const HEADLINE = 'Cuando no sepas qué hacer con el celular, pregúntale a Simple.'
const CTA = 'Ver cómo funciona'

export function Hero({ destino }: { destino: string }) {
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

        <div className="hero__acciones">
          <a className="hero__cta" href={`#${destino}`}>
            {CTA}
          </a>
          {/* Contactar no exige recorrer toda la página. */}
          <a
            className="hero__contacto"
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
          >
            {CTA_CONTACTO}
          </a>
        </div>

        {/* El trazo que baja: Simple siempre señala hacia el siguiente paso. */}
        <span className="hero__descenso" aria-hidden="true">
          <span className="hero__descenso-punto" />
        </span>
      </div>
    </section>
  )
}
