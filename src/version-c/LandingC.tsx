/*
  Versión C · «El siguiente paso».

  La página no habla *sobre* una guía: está guiada. Un hilo de 1px —el
  mismo grosor del anillo— baja por toda la página y se cierra en anillo
  justo en los momentos que importan. Cada momento es una parada colgada
  de ese hilo.

  El hilo dice quién habla:
    firme   · narra la página          → 1px, Blue 100
    dudosa  · habla la persona         → 1px discontinuo
    activa  · actúa Simple             → 2px, azul a media fuerza

  Los anillos son el único Blue 500 a plena fuerza de toda la página.

  La jerarquía está invertida a propósito: lo más grande no es un eslogan
  sino una frase del producto. Una landing cuyo titular mayor fuera
  publicidad contradiría a un producto que se define por decir una línea
  corta a la vez.

  Se reutilizan sin tocar: ExperienciaCentral, Validacion, SimboloSimple,
  tokens.css y base.css. La Versión A y la Versión B no se rozan.
*/

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ExperienciaCentral } from '../experiencia/ExperienciaCentral'
import { secuencia } from '../experiencia/guion'
import { Validacion } from '../validacion/Validacion'
import { SimboloSimple } from '../marca/SimboloSimple'
import { CTA_CONTACTO, WHATSAPP } from '../marca/enlaces'
import './LandingC.css'

const DEMO = 'demo-c'

/* Las frases de «Cómo lo hace» no se inventan para publicidad: se leen
   del mismo guion que ejecuta la demo, para que la página y el producto
   digan exactamente lo mismo. */
const frase = (id: string) => secuencia.find((b) => b.id === id)?.texto ?? ''

/* Copias locales de los textos de la Versión A. Se copian en vez de
   importarse porque aquellos módulos no los exportan y no se tocan. */
const VOCES = [
  '“¿Dónde tengo que tocar?”',
  '“Tengo miedo de equivocarme.”',
  '“No sé qué sigue.”',
  '“¿Y si hago algo mal?”',
]

const MOMENTOS = [
  'Pagar una factura',
  'Hacer una transferencia',
  'Realizar un trámite',
  'Acceder a una cuenta',
  'Recuperar una contraseña',
  'Entender un código de seguridad',
]

const NO_ES = [
  'Un chatbot genérico.',
  'Soporte técnico.',
  'Un curso de tecnología.',
  'Una app que hace todo por ti.',
  'Una app solo para adultos mayores.',
]

/* --- El gesto único ---------------------------------------------------
   Los anillos se cierran una vez, cuando su parada entra en pantalla.
   Nada más se mueve en toda la página. Con `prefers-reduced-motion`,
   base.css sustituye la transición y el anillo aparece ya cerrado. */
function useCierreEnVista() {
  const ref = useRef<SVGSVGElement | null>(null)
  const [cerrado, setCerrado] = useState(false)

  useEffect(() => {
    const nodo = ref.current
    if (!nodo) return
    if (typeof IntersectionObserver === 'undefined') {
      setCerrado(true)
      return
    }
    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          setCerrado(true)
          observador.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    observador.observe(nodo)
    return () => observador.disconnect()
  }, [])

  return { ref, cerrado }
}

/* El anillo: la línea que volvió sobre sí misma. Se dibuja con el mismo
   trazo que el hilo y se rellena con el fondo de su sección para
   interrumpirlo, igual que el anillo del producto interrumpe la pantalla. */
function Anillo({ tono }: { tono?: 'confirma' }) {
  const { ref, cerrado } = useCierreEnVista()
  return (
    <svg
      ref={ref}
      className="c-anillo"
      data-tono={tono}
      data-cerrado={cerrado || undefined}
      viewBox="0 0 22 22"
      aria-hidden="true"
      role="presentation"
    >
      <circle cx="11" cy="11" r="8" />
    </svg>
  )
}

/* El punto: todavía no se ha dado. */
function Punto() {
  return <span className="c-punto" aria-hidden="true" />
}

/* El punto hueco: la duda. Aparece solo donde habla la persona bloqueada. */
function Hueco() {
  return <span className="c-hueco" aria-hidden="true" />
}

function Emblema() {
  return (
    <span className="c-emblema" aria-hidden="true">
      <span className="c-emblema__halo" data-capa="2" />
      <span className="c-emblema__halo" data-capa="1" />
      <SimboloSimple className="c-emblema__simbolo" />
    </span>
  )
}

/* Una parada: marcador en el raíl, contenido colgando de él. */
function Parada({ marca, children }: { marca?: ReactNode; children: ReactNode }) {
  return (
    <div className="c-parada">
      <div className="c-parada__rail">{marca}</div>
      <div className="c-parada__cuerpo">{children}</div>
    </div>
  )
}

/* Dos pantallas abstractas: la misma tarea, con y sin señalamiento.
   Copia local de la de la Versión A, recoloreada para fondo claro. */
function PantallaC({ senalada }: { senalada?: boolean }) {
  return (
    <svg className="c-pantalla" viewBox="0 0 120 150" aria-hidden="true" role="presentation">
      <rect className="c-p-marco" x="1" y="1" width="118" height="148" rx="14" />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          className="c-p-fila"
          data-activa={senalada && i === 2 ? true : undefined}
          x="14"
          y={26 + i * 27}
          width="92"
          height="18"
          rx="6"
        />
      ))}
      {senalada && (
        <>
          <rect className="c-p-halo" x="8" y="74" width="104" height="30" rx="11" />
          <rect className="c-p-anillo" x="10" y="76" width="100" height="26" rx="9" />
        </>
      )}
    </svg>
  )
}

/* --- Los cuatro momentos del producto ---------------------------------
   Rótulos con nombre en lugar de 01/02/03: el orden es real, pero
   «Escucha» dice más que un número. */
const PASOS = [
  {
    rotulo: 'Escucha',
    dice: frase('escuchando'),
    narra: 'Hablas con tus palabras. No hay comandos que aprender.',
    marca: 'anillo',
  },
  {
    rotulo: 'Entiende',
    dice: frase('entendiendo'),
    narra: 'Lee la pantalla en la que ya estás.',
    marca: 'punto',
  },
  {
    rotulo: 'Confirma',
    dice: frase('confirmando'),
    narra: 'Antes de señalar nada, comprueba que entendió bien.',
    marca: 'confirma',
  },
  {
    rotulo: 'Señala',
    dice: frase('guiando-2'),
    narra: 'Un paso a la vez, rodeado en tu propia pantalla.',
    marca: 'anillo',
  },
] as const

export function LandingC() {
  return (
    <main className="landing-c">
      {/* ================= HERO · habla Simple ================= */}
      <header className="c-tramo c-hero" data-voz="firme">
        <div className="c-tramo__interior">
          <Parada marca={<Emblema />}>
            <p className="c-rotulo">Copiloto de voz</p>
            <p className="c-persona">“No sé qué hacer aquí.”</p>
            <h1 className="c-simple">Dime qué necesitas y te señalo dónde tocar.</h1>
            <p className="c-consecuencia">Tú decides. Tú tocas. Simple solo señala.</p>

            <div className="c-acciones">
              <a className="c-cta" href={`#${DEMO}`}>
                Ver cómo funciona
              </a>
              <a
                className="c-cta c-cta--secundario"
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
              >
                {CTA_CONTACTO}
              </a>
            </div>
          </Parada>
        </div>
      </header>

      {/* ============ EL MOMENTO · habla la persona ============ */}
      <section className="c-tramo" data-voz="dudosa" aria-labelledby="c-momento">
        <div className="c-tramo__interior">
          <Parada marca={<Hueco />}>
            <h2 className="c-rotulo" id="c-momento">
              El momento
            </h2>
            <p className="c-lead">Pasa con las tareas que importan y no haces todos los días.</p>

            <ul className="c-voces">
              {VOCES.map((voz) => (
                <li key={voz} className="c-persona">
                  {voz}
                </li>
              ))}
            </ul>

            <p className="c-remate">
              No es falta de práctica. Es que nadie te está mostrando el siguiente paso.
            </p>
          </Parada>
        </div>
      </section>

      {/* ================= PRUÉBALO · el hilo se activa ================= */}
      <section
        className="c-tramo c-tramo--sale"
        data-voz="activa"
        aria-labelledby="c-pruebalo"
      >
        <div className="c-tramo__interior">
          <Parada marca={<Anillo />}>
            <h2 className="c-rotulo" id="c-pruebalo">
              Pruébalo
            </h2>
            <p className="c-simple">Mira lo que pasa cuando pides ayuda.</p>
            <p className="c-narra">Toca el botón azul. La secuencia dura menos de un minuto.</p>
          </Parada>
        </div>
      </section>

      {/* ================= LA DEMO · a sangre completa =================
          Se envuelve en `.pagina`, la misma clase que usa la Versión A,
          para que la experiencia central se vea exactamente igual. */}
      <section className="pagina" id={DEMO}>
        <ExperienciaCentral />
      </section>

      {/* ================= CÓMO LO HACE ================= */}
      <section className="c-tramo c-tramo--entra" data-voz="activa" aria-labelledby="c-como">
        <div className="c-tramo__interior">
          <Parada>
            <h2 className="c-rotulo" id="c-como">
              Cómo lo hace
            </h2>
            <p className="c-lead">Cuatro momentos, siempre en el mismo orden.</p>
          </Parada>

          {PASOS.map((paso) => (
            <Parada
              key={paso.rotulo}
              marca={
                paso.marca === 'punto' ? (
                  <Punto />
                ) : paso.marca === 'confirma' ? (
                  <Anillo tono="confirma" />
                ) : (
                  <Anillo />
                )
              }
            >
              <h3 className="c-rotulo">{paso.rotulo}</h3>
              <p className="c-simple c-simple--paso">“{paso.dice}”</p>
              <p className="c-narra">{paso.narra}</p>
            </Parada>
          ))}

          <Parada>
            <p className="c-remate">Simple no hace las cosas por ti. Te ayuda a hacerlas tú.</p>
          </Parada>
        </div>
      </section>

      {/* ================= LA DIFERENCIA ================= */}
      <section className="c-tramo" data-voz="firme" aria-labelledby="c-diferencia">
        <div className="c-tramo__interior">
          <Parada marca={<Punto />}>
            <h2 className="c-rotulo" id="c-diferencia">
              La diferencia
            </h2>
            <p className="c-lead">No te explican qué hacer. Te lo señalan mientras lo haces.</p>

            <div className="c-contraste">
              <figure className="c-contraste__lado">
                <PantallaC />
                <figcaption>
                  <h3 className="c-contraste__titulo">Una instrucción general</h3>
                  <p className="c-contraste__linea">
                    La lees, la recuerdas y vuelves por tu cuenta a la pantalla.
                  </p>
                </figcaption>
              </figure>

              <figure className="c-contraste__lado" data-simple="true">
                <PantallaC senalada />
                <figcaption>
                  <h3 className="c-contraste__titulo">Una guía en el momento</h3>
                  <p className="c-contraste__linea">
                    Aparece sobre tu pantalla y rodea el paso que toca.
                  </p>
                </figcaption>
              </figure>
            </div>
          </Parada>
        </div>
      </section>

      {/* ================= CUÁNDO Y PARA QUIÉN ================= */}
      <section
        className="c-tramo c-tramo--sale"
        data-voz="firme"
        aria-labelledby="c-cuando"
      >
        <div className="c-tramo__interior">
          <Parada marca={<Punto />}>
            <h2 className="c-rotulo" id="c-cuando">
              Cuándo y para quién
            </h2>
            <p className="c-lead">Tareas importantes que no haces todos los días.</p>

            <ul className="c-chips">
              {MOMENTOS.map((m) => (
                <li key={m} className="c-chip">
                  {m}
                </li>
              ))}
            </ul>

            <p className="c-narra">
              No es cuestión de edad. Es cuestión del momento: una tarea importante, poco frecuente
              y con consecuencias.
            </p>

            <div className="c-noes">
              <p className="c-noes__rotulo">Simple no es:</p>
              <ul className="c-noes__lista">
                {NO_ES.map((n) => (
                  <li key={n} className="c-noes__item">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </Parada>
        </div>
      </section>

      {/* ================= VALIDACIÓN · reutilizada sin cambios ========= */}
      <Validacion />

      {/* ================= CIERRE · a sangre, Blue 700 profundo =========
          El segundo y último momento a sangre de la página. Aquí la
          jerarquía se invierte otra vez: la frase mayor ya no es la de
          Simple, es la de la persona. */}
      <section
        className="c-tramo c-cierre"
        data-voz="firme"
        data-fondo="profundo"
        aria-labelledby="c-cierre"
      >
        <div className="c-tramo__interior">
          <div className="c-cierre__hilo">
            <Parada marca={<Emblema />}>
              <h2 className="c-rotulo" id="c-cierre">
                El siguiente paso
              </h2>
              <p className="c-persona">“No sé qué hacer.”</p>
            </Parada>
          </div>

          <Parada marca={<Anillo />}>
            <p className="c-persona c-persona--resuelta">“Ya sé cuál es el siguiente paso.”</p>

            <div className="c-acciones">
              <a
                className="c-cta c-cta--claro"
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
              >
                {CTA_CONTACTO}
              </a>
            </div>

            <p className="c-firma">Siempre hay un siguiente paso.</p>
          </Parada>
        </div>
      </section>
    </main>
  )
}
