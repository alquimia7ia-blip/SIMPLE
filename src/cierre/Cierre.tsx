/*
  El cierre de la landing.

  Recupera el concepto central, firma con el tagline de marca y lleva a
  WhatsApp. Un solo camino, una sola acción.
*/

import { SimboloSimple } from '../marca/SimboloSimple'
import './Cierre.css'

const WHATSAPP = 'https://wa.link/23wjuh'

export function Cierre() {
  return (
    <section className="cierre-final" aria-labelledby="cierre-final">
      <div className="cierre-final__interior">
        <span className="cierre-final__emblema" aria-hidden="true">
          <span className="cierre-final__halo" />
          <SimboloSimple className="cierre-final__simbolo" />
        </span>

        {/* La transformación, dicha con dos estados y el punto entre ellos. */}
        <div className="transformacion">
          <p className="transformacion__estado" data-momento="antes">
            “No sé qué hacer.”
          </p>
          <span className="transformacion__paso" aria-hidden="true" />
          <p className="transformacion__estado" data-momento="despues">
            “Ya sé cuál es el siguiente paso.”
          </p>
        </div>

        <h2 className="cierre-final__titular" id="cierre-final">
          No necesitas saberlo todo. Necesitas saber cuál es el siguiente paso.
        </h2>

        <a className="cierre-final__cta" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
          Quiero conocer Simple
        </a>

        <p className="cierre-final__firma">Siempre hay un siguiente paso.</p>
      </div>
    </section>
  )
}
