/*
  La narrativa que sigue a la experiencia central:

    PROBLEMA  →  CÓMO FUNCIONA SIMPLE  →  BENEFICIO

  Cada sección tiene una composición distinta, y ninguna es una lista.

  - El problema desciende: las dudas se van haciendo más grandes y más
    oscuras hasta la que de verdad frena, y el sangrado crece con ellas.
  - El recorrido usa el lenguaje del propio producto: un trazo continuo
    que acompaña, nodos que ganan peso, y el anillo de guía —el mismo de
    la demostración— posándose sobre el último paso.
  - El beneficio es una escalera de consecuencias que termina en el
    control, y cierra con el principio rector.

  Nada se mueve. La jerarquía la hacen el espacio, la escala y el peso.
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

/* El diferencial empieza aquí: confirmar, guiar y mostrar. */
const DIFERENCIAL = 3

export function Narrativa() {
  return (
    <>
      <section className="seccion seccion--problema" aria-labelledby="problema">
        <div className="seccion__interior">
          <h2 className="seccion__titular" id="problema">
            Todos hemos tenido ese momento.
          </h2>
          <ul className="voces">
            {VOCES.map((voz) => (
              <li key={voz} className="voces__frase">
                {voz}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="seccion seccion--como" aria-labelledby="como">
        <div className="seccion__interior">
          <h2 className="seccion__titular" id="como">
            No tienes que buscar cómo hacerlo. Solo decir qué necesitas.
          </h2>
          <ol className="recorrido">
            {PASOS.map((paso, i) => (
              <li
                key={paso.titulo}
                className="recorrido__paso"
                data-peso={i < DIFERENCIAL ? 'suave' : 'fuerte'}
                data-final={i === PASOS.length - 1 || undefined}
              >
                <span className="recorrido__nodo" aria-hidden="true" />
                <span className="recorrido__titulo">{paso.titulo}</span>
                <span className="recorrido__linea">{paso.linea}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

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
                <span className="consecuencias__titulo">{b.titulo}</span>
                <span className="consecuencias__linea">{b.linea}</span>
              </li>
            ))}
          </ul>
          <p className="principio">Simple no hace las cosas por ti. Te ayuda a hacerlas tú.</p>
        </div>
      </section>
    </>
  )
}
