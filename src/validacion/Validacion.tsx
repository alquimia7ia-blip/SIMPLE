/*
  Validación · tres preguntas táctiles.

  Una pregunta por momento, una sola acción: tocar una respuesta. Sin
  botón de siguiente, sin confirmación adicional y sin nada que escribir
  —no hay un solo campo de texto en toda la sección—.

  Recorrido:
    P1 → confirma → avanza
    P2 → confirma → guarda → contador agregado
    P3 → confirma → guarda → cierre

  El contador solo aparece cuando hay respuestas reales suficientes.
  Nunca se muestran datos simulados ni respuestas individuales.
*/

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  APOYO,
  APRENDIENDO,
  ENCABEZADO_AGREGADO,
  GRACIAS,
  POCAS_RESPUESTAS,
  PREGUNTAS,
  TITULAR,
  UMBRAL_AGREGADO,
} from './preguntas'
import { guardarRespuestas, idDeSesion, leerAgregado, type Agregado } from './persistencia'
import './Validacion.css'

/* Lo respondido se recuerda en el navegador: quien ya participó vuelve al
   cierre en lugar de responder otra vez. */
const CLAVE_RESPUESTAS = 'simple.validacion'

type Respuestas = Record<string, string>

type Momento = 0 | 1 | 2 | 'agregado' | 'cierre'

function leerGuardadas(): Respuestas {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_RESPUESTAS) || '{}') as Respuestas
  } catch {
    return {}
  }
}

export function Validacion() {
  const [respuestas, setRespuestas] = useState<Respuestas>({})
  const [momento, setMomento] = useState<Momento>(0)
  const [elegida, setElegida] = useState<string | null>(null)
  const [agregado, setAgregado] = useState<Agregado[] | null>(null)
  const temporizador = useRef<number>()

  useEffect(() => {
    const previas = leerGuardadas()
    if (previas.q3_interes) {
      setRespuestas(previas)
      setMomento('cierre')
    }
    return () => window.clearTimeout(temporizador.current)
  }, [])

  const guardarLocal = useCallback((siguientes: Respuestas) => {
    try {
      localStorage.setItem(CLAVE_RESPUESTAS, JSON.stringify(siguientes))
    } catch {
      /* sin almacenamiento: la experiencia continúa */
    }
  }, [])

  const responder = useCallback(
    (indice: 0 | 1 | 2, opcionId: string) => {
      if (elegida) return
      setElegida(opcionId)

      const pregunta = PREGUNTAS[indice]
      const siguientes = { ...respuestas, [pregunta.campo]: opcionId }
      setRespuestas(siguientes)
      guardarLocal(siguientes)

      const sesion = idDeSesion()

      if (indice === 1) {
        void guardarRespuestas(sesion, {
          q1_comprension: siguientes.q1_comprension,
          q2_dolor: opcionId,
        })
        void leerAgregado().then(setAgregado)
      }
      if (indice === 2) {
        void guardarRespuestas(sesion, { q3_interes: opcionId })
      }

      /* Confirmación visual breve, y después el momento siguiente. */
      temporizador.current = window.setTimeout(() => {
        setElegida(null)
        setMomento(indice === 0 ? 1 : indice === 1 ? 'agregado' : 'cierre')
      }, 900)
    },
    [elegida, respuestas, guardarLocal],
  )

  const totalAgregado = agregado?.reduce((s, f) => s + f.total, 0) ?? 0
  const hayVolumen = totalAgregado >= UMBRAL_AGREGADO

  const paso =
    typeof momento === 'number' ? momento : momento === 'agregado' ? 1 : PREGUNTAS.length - 1

  return (
    <section className="validacion" aria-labelledby="validacion">
      <div className="validacion__interior">
        <header className="validacion__cabecera">
          <h2 className="validacion__titular" id="validacion">
            {TITULAR}
          </h2>
          <p className="validacion__apoyo">{APOYO}</p>
        </header>

        {/* Dónde estamos: tres nodos, el mismo vocabulario del recorrido. */}
        <ol className="avance" aria-hidden="true">
          {PREGUNTAS.map((p, i) => (
            <li
              key={p.campo}
              className="avance__nodo"
              data-estado={
                momento === 'cierre' || i < paso ? 'hecho' : i === paso ? 'actual' : 'pendiente'
              }
            />
          ))}
        </ol>

        <div className="momento" aria-live="polite">
          {typeof momento === 'number' && (
            <div className="pregunta" key={momento}>
              <h3 className="pregunta__enunciado">{PREGUNTAS[momento].enunciado}</h3>
              <div className="opciones" role="group" aria-label={PREGUNTAS[momento].enunciado}>
                {PREGUNTAS[momento].opciones.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    className="opcion"
                    data-elegida={elegida === o.id || undefined}
                    data-apagada={elegida && elegida !== o.id ? true : undefined}
                    aria-pressed={elegida === o.id}
                    onClick={() => responder(momento, o.id)}
                  >
                    <span className="opcion__punto" aria-hidden="true" />
                    <span className="opcion__texto">{o.texto}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {momento === 'agregado' && (
            <div className="agregado">
              {hayVolumen && agregado ? (
                <>
                  <p className="agregado__encabezado">{ENCABEZADO_AGREGADO}</p>
                  <ul className="barras">
                    {PREGUNTAS[1].opciones.map((o) => {
                      const total = agregado.find((f) => f.opcion === o.id)?.total ?? 0
                      const pct = Math.round((total / totalAgregado) * 100)
                      const propia = respuestas.q2_dolor === o.id
                      return (
                        <li key={o.id} className="barra" data-propia={propia || undefined}>
                          <span className="barra__etiqueta">{o.texto}</span>
                          <span className="barra__pista">
                            <span className="barra__relleno" style={{ width: `${pct}%` }} />
                          </span>
                          <span className="barra__cifra">{pct}%</span>
                        </li>
                      )
                    })}
                  </ul>
                </>
              ) : (
                <p className="agregado__pocas">{POCAS_RESPUESTAS}</p>
              )}

              <button
                type="button"
                className="opcion opcion--continuar"
                onClick={() => setMomento(2)}
              >
                <span className="opcion__punto" aria-hidden="true" />
                <span className="opcion__texto">Sigamos</span>
              </button>
            </div>
          )}

          {momento === 'cierre' && (
            <div className="cierre">
              <p className="cierre__gracias">{GRACIAS}</p>
              <p className="cierre__aprendiendo">{APRENDIENDO}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
