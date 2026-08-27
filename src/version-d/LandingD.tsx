/*
  Versión D · una sola pantalla.

  Toma la arquitectura del hero cinematográfico —viewport completo, barra
  superior, contenido anclado abajo, dos tarjetas de cristal a la
  derecha— y la traduce entera al Manual de Marca de Simple.

  Lo que cambia respecto de esa referencia, y por qué:

  - Fondo a sangre, pero sin vídeo ni personas: el Manual prohíbe
    ilustraciones y figuras humanas. En su lugar, el propio símbolo a
    escala de campo, dibujado desde SimboloSimple y nunca redibujado.
  - Modo claro, no oscuro. El Manual lo bloquea. El cristal se hace con
    Cloud translúcido sobre el campo teñido, no con blanco sobre negro.
  - Sin captura de correo. Regla dura del proyecto: el usuario nunca
    escribe. No hay un solo input en la página; el contacto es WhatsApp.
  - Las dos tarjetas no traen cifras ni testimonios porque Simple no los
    tiene y no se inventan. Traen las dos mitades reales del producto: lo
    que dice la persona y lo que hace Simple.

  Un solo gesto de movimiento: el anillo de la segunda tarjeta se cierra
  una vez al cargar. Nada más se mueve.
*/

import { useEffect, useState } from 'react'
import { SimboloSimple } from '../marca/SimboloSimple'
import { CTA_CONTACTO, WHATSAPP } from '../marca/enlaces'
import './LandingD.css'

export function LandingD() {
  const [cerrado, setCerrado] = useState(false)

  /* El anillo se cierra una vez, en cuanto la página está en pantalla.
     Con `prefers-reduced-motion`, base.css neutraliza la transición y el
     anillo aparece ya cerrado. */
  useEffect(() => {
    const t = window.setTimeout(() => setCerrado(true), 260)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <main className="landing-d">
      <section className="d-pantalla">
        {/* --- Campo a sangre · el símbolo a escala de fondo ------------ */}
        <div className="d-campo" aria-hidden="true">
          <span className="d-campo__halo" data-capa="2" />
          <span className="d-campo__halo" data-capa="1" />
          <SimboloSimple className="d-campo__simbolo" />
        </div>

        <div className="d-capa">
          {/* --- Barra superior ---------------------------------------- */}
          <header className="d-barra">
            <div className="d-marca">
              <span className="d-marca__emblema" aria-hidden="true">
                <SimboloSimple className="d-marca__simbolo" />
              </span>
              <span className="d-marca__nombre">Simple</span>
              <span className="d-cristal d-chip">Copiloto de voz</span>
            </div>

            <a
              className="d-cta d-cta--barra"
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
            >
              {CTA_CONTACTO}
            </a>
          </header>

          {/* --- Contenido anclado abajo ------------------------------- */}
          <div className="d-cuerpo">
            <div className="d-dicho">
              <p className="d-persona">“No sé qué hacer aquí.”</p>
              <h1 className="d-simple">Dime qué necesitas y te señalo dónde tocar.</h1>
              <p className="d-consecuencia">Tú decides. Tú tocas. Simple solo señala.</p>

              <div className="d-acciones">
                <a
                  className="d-cta"
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {CTA_CONTACTO}
                </a>
                <a className="d-cta d-cta--secundario" href="/c/">
                  Ver cómo funciona
                </a>
              </div>
            </div>

            {/* Las dos mitades del producto: lo que dice la persona y lo
                que hace Simple. */}
            <div className="d-tarjetas">
              {/* Misma estructura en las dos: marcador, frase, media línea.
                  Lo único que cambia es quién habla —y el marcador lo dice
                  sin una palabra: la pregunta abierta frente al anillo
                  cerrado. */}
              <article className="d-cristal d-tarjeta">
                <svg className="d-marcador" viewBox="0 0 44 44" aria-hidden="true">
                  <circle className="d-marcador__abierto" cx="22" cy="22" r="17" />
                </svg>
                <p className="d-tarjeta__voz">“¿Dónde tengo que tocar?”</p>
                <p className="d-tarjeta__linea">
                  Pasa con las tareas que importan y no haces todos los días.
                </p>
              </article>

              <article className="d-cristal d-tarjeta">
                <svg
                  className="d-marcador"
                  data-cerrado={cerrado || undefined}
                  viewBox="0 0 44 44"
                  aria-hidden="true"
                >
                  <circle className="d-marcador__anillo" cx="22" cy="22" r="17" />
                </svg>
                <p className="d-tarjeta__dice">“Ahora toca aquí, donde dice Pagar.”</p>
                <p className="d-tarjeta__linea">
                  Un paso a la vez, rodeado en tu propia pantalla.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
