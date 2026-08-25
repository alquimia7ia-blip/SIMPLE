/*
  La narrativa que sigue a la experiencia central:

    PROBLEMA  →  CÓMO FUNCIONA SIMPLE  →  BENEFICIO

  Tres composiciones distintas, construidas con la gramática del propio
  producto: círculos, trazos, nodos, recorrido y señalamiento.

  - El problema es un vacío: un anillo grande y abierto, sin punto dentro
    —todavía no hay siguiente paso— con las cuatro dudas orbitándolo a
    distintas escalas y pesos.
  - El recorrido es un camino con nodos numerados. El trazo entra en azul
    de acción justo en «Confirma»: ahí empieza lo que diferencia a Simple.
  - El beneficio son cuatro marcas geométricas que crecen hasta el cierre.

  Nada se mueve. La jerarquía la hacen escala, peso, posición y trazo.
*/

import './Narrativa.css'

const VOCES = [
  '“¿Dónde tengo que tocar?”',
  '“Tengo miedo de equivocarme.”',
  '“No sé qué sigue.”',
  '“¿Y si hago algo mal?”',
]

const PASOS = [
  { titulo: 'Presiona', linea: 'Cuando no sepas qué hacer, toca el botón.' },
  { titulo: 'Habla', linea: 'Dile qué necesitas, con tus palabras.' },
  { titulo: 'Simple entiende', linea: 'No hay que aprender ninguna orden especial.' },
  { titulo: 'Confirma', linea: 'Antes de guiarte, comprueba que entendió bien.' },
  { titulo: 'Guía', linea: 'Te dice una sola acción a la vez.' },
  { titulo: 'Muestra', linea: 'Y al mismo tiempo señala dónde tocar.' },
]

const BENEFICIOS = [
  { titulo: 'Menos dudas', linea: 'Sabes cuál es el siguiente paso.' },
  { titulo: 'Más claridad', linea: 'Una acción a la vez, siempre señalada.' },
  { titulo: 'Más autonomía', linea: 'Terminas la tarea sin pedírselo a nadie.' },
  { titulo: 'Mantienes el control', linea: 'Simple te muestra dónde tocar. Tocas tú.' },
]

/* El diferencial empieza en «Confirma». */
const DIFERENCIAL = 3

/* Cuatro marcas geométricas, construidas con el mismo vocabulario:
   un punto que es el paso, un trazo que acompaña y un halo que señala. */
const MARCAS = ['dudas', 'claridad', 'autonomia', 'control'] as const

function Marca({ tipo }: { tipo: (typeof MARCAS)[number] }) {
  return (
    <svg className="marca" viewBox="0 0 32 32" aria-hidden="true" role="presentation">
      {tipo === 'dudas' && (
        <>
          <circle className="marca__tenue" cx="5" cy="16" r="2.5" />
          <circle className="marca__tenue" cx="14" cy="16" r="2.5" />
          <circle className="marca__punto" cx="25" cy="16" r="5" />
        </>
      )}
      {tipo === 'claridad' && (
        <>
          <circle className="marca__halo" cx="16" cy="16" r="14" />
          <circle className="marca__trazo" cx="16" cy="16" r="9" />
          <circle className="marca__punto" cx="16" cy="16" r="3.5" />
        </>
      )}
      {tipo === 'autonomia' && (
        <>
          <path className="marca__trazo" d="M20 6.6A11 11 0 1 0 20 25.4" />
          <circle className="marca__punto" cx="26" cy="16" r="3.5" />
        </>
      )}
      {tipo === 'control' && (
        <>
          <path className="marca__trazo" d="M23.1 7.5A12 12 0 1 1 16 4" />
          <circle className="marca__punto" cx="16" cy="16" r="4.5" />
        </>
      )}
    </svg>
  )
}

export function Narrativa() {
  return (
    <>
      {/* ---------- PROBLEMA · el vacío ---------- */}
      <section className="seccion seccion--problema" aria-labelledby="problema">
        <div className="seccion__interior">
          <h2 className="seccion__titular" id="problema">
            Todos hemos tenido ese momento.
          </h2>

          <div className="bloqueo">
            <svg className="bloqueo__anillo" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="45" />
            </svg>
            {VOCES.map((voz, i) => (
              <p key={voz} className="bloqueo__voz" data-voz={i + 1}>
                {voz}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CÓMO FUNCIONA · el recorrido ---------- */}
      <section className="seccion seccion--como" aria-labelledby="como">
        <div className="seccion__interior">
          <h2 className="seccion__titular" id="como">
            No tienes que buscar cómo hacerlo. Solo decir qué necesitas.
          </h2>

          <ol className="camino">
            {PASOS.map((paso, i) => (
              <li
                key={paso.titulo}
                className="camino__paso"
                data-peso={i < DIFERENCIAL ? 'suave' : 'fuerte'}
                data-inicio={i === DIFERENCIAL || undefined}
                data-final={i === PASOS.length - 1 || undefined}
              >
                <span className="camino__nodo" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="camino__titulo">{paso.titulo}</span>
                <span className="camino__linea">{paso.linea}</span>
              </li>
            ))}
          </ol>

          <p className="principio">Simple no hace las cosas por ti. Te ayuda a hacerlas tú.</p>
        </div>
      </section>

      {/* ---------- BENEFICIO · el cierre ---------- */}
      <section className="seccion seccion--beneficio" aria-labelledby="beneficio">
        <div className="seccion__interior">
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
                <Marca tipo={MARCAS[i]} />
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
