/*
  La narrativa que sigue a la experiencia central:

    PROBLEMA  →  CÓMO FUNCIONA SIMPLE  →  BENEFICIO

  Tres secciones, un mensaje cada una y nada que se mueva mientras se lee.
  El bloqueo se dice con palabras y nunca se ilustra: el Manual pide
  dibujar el instante anterior a actuar, jamás la impotencia.
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
          <ol className="pasos">
            {PASOS.map((paso, i) => (
              <li key={paso.titulo} className="pasos__paso">
                <span className="pasos__orden" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="pasos__titulo">{paso.titulo}</span>
                <span className="pasos__linea">{paso.linea}</span>
              </li>
            ))}
          </ol>
          <p className="seccion__cierre">Simple no hace las cosas por ti. Te ayuda a hacerlas tú.</p>
        </div>
      </section>

      <section className="seccion seccion--beneficio" aria-labelledby="beneficio">
        <div className="seccion__interior">
          <h2 className="seccion__titular" id="beneficio">
            Menos dudas. Más claridad para continuar.
          </h2>
          <ul className="beneficios">
            {BENEFICIOS.map((b) => (
              <li key={b.titulo} className="beneficios__item">
                <span className="beneficios__titulo">{b.titulo}</span>
                <span className="beneficios__linea">{b.linea}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
