/*
  La narrativa que sigue a la experiencia central:

    PROBLEMA  →  CÓMO FUNCIONA SIMPLE  →  BENEFICIO

  Tres composiciones construidas con la gramática del producto —círculo,
  arco, punto y halo— y no con bloques de texto.

  - El problema es un bloqueo: un anillo con halos en el centro y las
    cuatro dudas como burbujas alrededor, a distintas escalas.
  - El recorrido se agrupa en tres fases —inicio, comprensión, acción—
    cada una con su propio peso de color y su conexión con la siguiente.
  - El beneficio son tres piezas con glifo grande y un cierre profundo
    en azul oscuro: el control.

  Nada se mueve mientras se lee.
*/

import './Narrativa.css'

const VOCES = [
  '“¿Dónde tengo que tocar?”',
  '“Tengo miedo de equivocarme.”',
  '“No sé qué sigue.”',
  '“¿Y si hago algo mal?”',
]

const FASES = [
  {
    etiqueta: 'Inicio',
    pasos: [
      { glifo: 'presiona', titulo: 'Presiona', linea: 'Cuando no sepas qué hacer.' },
      { glifo: 'habla', titulo: 'Habla', linea: 'Dile qué necesitas, con tus palabras.' },
    ],
  },
  {
    etiqueta: 'Comprensión',
    pasos: [
      { glifo: 'entiende', titulo: 'Simple entiende', linea: 'Sin aprender ninguna orden especial.' },
      { glifo: 'confirma', titulo: 'Confirma', linea: 'Comprueba que entendió bien.' },
    ],
  },
  {
    etiqueta: 'Acción',
    pasos: [
      { glifo: 'guia', titulo: 'Guía', linea: 'Una sola acción a la vez.' },
      { glifo: 'muestra', titulo: 'Muestra', linea: 'Y señala dónde tocar.' },
    ],
  },
]

const BENEFICIOS = [
  { glifo: 'dudas', titulo: 'Menos dudas', linea: 'Sabes cuál es el siguiente paso.' },
  { glifo: 'claridad', titulo: 'Más claridad', linea: 'Una acción a la vez, siempre señalada.' },
  { glifo: 'autonomia', titulo: 'Más autonomía', linea: 'Terminas la tarea sin pedírselo a nadie.' },
  { glifo: 'control', titulo: 'Mantienes el control', linea: 'Simple te muestra dónde tocar. Tocas tú.' },
]

/* Un solo vocabulario para todos los glifos: círculo, arco, punto y
   halo. Trazo de 2, extremos redondos, sin relleno salvo el punto. */
function Glifo({ tipo }: { tipo: string }) {
  return (
    <svg className="glifo" viewBox="0 0 32 32" aria-hidden="true" role="presentation">
      {tipo === 'presiona' && (
        <>
          <circle className="g-trazo" cx="16" cy="16" r="13" />
          <circle className="g-punto" cx="16" cy="16" r="5" />
        </>
      )}
      {tipo === 'habla' && (
        <>
          <circle className="g-punto" cx="9" cy="16" r="3.5" />
          <path className="g-trazo" d="M16 9.5a9 9 0 0 1 0 13" />
          <path className="g-trazo" d="M22 5a15 15 0 0 1 0 22" />
        </>
      )}
      {tipo === 'entiende' && (
        <>
          <circle className="g-trazo" cx="16" cy="16" r="13" />
          <circle className="g-trazo" cx="16" cy="16" r="7" />
          <circle className="g-punto" cx="16" cy="16" r="2.5" />
        </>
      )}
      {tipo === 'confirma' && (
        <>
          <circle className="g-trazo" cx="16" cy="16" r="13" />
          <path className="g-trazo" d="M10.5 16.5 14.5 20.5 21.5 12.5" />
        </>
      )}
      {tipo === 'guia' && (
        <>
          <path className="g-trazo" d="M22.8 8.4A12 12 0 1 0 22.8 23.6" />
          <circle className="g-punto" cx="27" cy="16" r="3.5" />
        </>
      )}
      {tipo === 'muestra' && (
        <>
          <rect className="g-trazo" x="11" y="11" width="10" height="10" rx="2.5" />
          <circle className="g-halo" cx="16" cy="16" r="14" />
          <circle className="g-punto" cx="26.5" cy="6" r="3" />
        </>
      )}
      {tipo === 'dudas' && (
        <>
          <circle className="g-tenue" cx="5.5" cy="16" r="3" />
          <circle className="g-tenue" cx="15" cy="16" r="3" />
          <circle className="g-punto" cx="26" cy="16" r="5.5" />
        </>
      )}
      {tipo === 'claridad' && (
        <>
          <circle className="g-halo" cx="16" cy="16" r="14" />
          <circle className="g-trazo" cx="16" cy="16" r="9" />
          <circle className="g-punto" cx="16" cy="16" r="3.5" />
        </>
      )}
      {tipo === 'autonomia' && (
        <>
          <path className="g-trazo" d="M20 6.6A11 11 0 1 0 20 25.4" />
          <circle className="g-punto" cx="26" cy="16" r="3.5" />
        </>
      )}
      {tipo === 'control' && (
        <>
          <path className="g-trazo" d="M23.1 7.5A12 12 0 1 1 16 4" />
          <circle className="g-punto" cx="16" cy="16" r="4.5" />
        </>
      )}
    </svg>
  )
}

export function Narrativa() {
  return (
    <>
      {/* ---------- PROBLEMA · el bloqueo ---------- */}
      <section className="seccion seccion--problema" aria-labelledby="problema">
        <div className="seccion__interior">
          <p className="seccion__eyebrow">Te entendemos</p>
          <h2 className="seccion__titular" id="problema">
            Todos hemos tenido ese momento.
          </h2>

          <div className="bloqueo">
            <span className="bloqueo__nucleo" aria-hidden="true">
              <span className="bloqueo__halo" data-capa="2" />
              <span className="bloqueo__halo" data-capa="1" />
              <svg className="bloqueo__anillo" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" />
              </svg>
            </span>
            {VOCES.map((voz, i) => (
              <p key={voz} className="burbuja-duda" data-voz={i + 1}>
                {voz}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CÓMO FUNCIONA · el recorrido en tres fases ---------- */}
      <section className="seccion seccion--como" aria-labelledby="como">
        <div className="seccion__interior">
          <p className="seccion__eyebrow">Un camino simple</p>
          <h2 className="seccion__titular" id="como">
            No tienes que buscar cómo hacerlo. Solo decir qué necesitas.
          </h2>

          <div className="recorrido">
            {FASES.map((fase, f) => (
              <section className="fase" key={fase.etiqueta} data-fase={f + 1}>
                <p className="fase__etiqueta">{fase.etiqueta}</p>
                <div className="fase__pasos">
                  {fase.pasos.map((paso, i) => (
                    <div className="hito" key={paso.titulo}>
                      {i === 1 && <span className="hito__enlace" aria-hidden="true" />}
                      <span className="hito__nodo">
                        <Glifo tipo={paso.glifo} />
                      </span>
                      <h3 className="hito__titulo">{paso.titulo}</h3>
                      <p className="hito__linea">{paso.linea}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="principio">Simple no hace las cosas por ti. Te ayuda a hacerlas tú.</p>
        </div>
      </section>

      {/* ---------- BENEFICIO · el cierre ---------- */}
      <section className="seccion seccion--beneficio" aria-labelledby="beneficio">
        <div className="seccion__interior">
          <p className="seccion__eyebrow">Lo que ganas</p>
          <h2 className="seccion__titular" id="beneficio">
            Menos dudas. Más claridad para continuar.
          </h2>

          <ul className="consecuencias">
            {BENEFICIOS.map((b, i) => (
              <li
                key={b.titulo}
                className="consecuencias__item"
                data-cierre={i === BENEFICIOS.length - 1 || undefined}
              >
                <span className="consecuencias__glifo">
                  <Glifo tipo={b.glifo} />
                </span>
                <span className="consecuencias__titulo">{b.titulo}</span>
                <span className="consecuencias__linea">{b.linea}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
