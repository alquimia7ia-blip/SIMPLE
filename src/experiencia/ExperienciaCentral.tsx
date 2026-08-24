/*
  Experiencia central de Simple.

  El único componente que sabe del tiempo. Recorre `secuencia` beat a beat
  y traduce cada estado a una señal visual, según el cap. 18 del Manual.

  Reglas que se cumplen aquí:
  - La demo nunca arranca sola: solo la inicia el botón flotante.
  - Una sola señal de guía a la vez.
  - Los objetivos señalados son tocables. Simple nunca toca por la persona,
    ni siquiera en una demostración: quien quiera actuar, actúa; quien no,
    ve la secuencia igual.
  - Sin cuenta atrás visible.
*/

import { useCallback, useEffect, useState } from 'react'
import { AnilloPresencia, type VarianteGuia, type VariantePresencia } from './AnilloGuia'
import { BotonFlotante } from './BotonFlotante'
import { Telefono } from './Telefono'
import { empezarDeNuevo, invitacion, secuencia, situacion } from './guion'
import './ExperienciaCentral.css'

const CONVERSACION = ['escuchando', 'personaHabla', 'entendiendo', 'confirmando']
const GUIA = ['guiando', 'pasoCompletado', 'terminado']

export function ExperienciaCentral() {
  const [indice, setIndice] = useState<number | null>(null)

  const beat = indice === null ? null : secuencia[indice]
  const estado = beat?.estado ?? 'reposo'

  const iniciar = useCallback(() => setIndice(0), [])

  const avanzar = useCallback(() => {
    setIndice((i) => (i === null || i + 1 >= secuencia.length ? null : i + 1))
  }, [])

  const reiniciar = useCallback(() => setIndice(null), [])

  useEffect(() => {
    if (indice === null) return
    const temporizador = window.setTimeout(avanzar, secuencia[indice].duracion)
    return () => window.clearTimeout(temporizador)
  }, [indice, avanzar])

  const enConversacion = CONVERSACION.includes(estado)
  const enGuia = GUIA.includes(estado)

  const variantePresencia: VariantePresencia =
    estado === 'entendiendo' ? 'recorriendo' : estado === 'confirmando' ? 'quieto' : 'respirando'

  const varianteAnillo: VarianteGuia =
    estado === 'pasoCompletado' ? 'completado' : estado === 'terminado' ? 'terminado' : 'guiando'

  /* Una cosa a la vez: la superficie muestra el mensaje del momento y no
     una conversación que crece hasta tapar la pantalla de la persona.
     «Déjame ver…» no es un mensaje sino una espera, y se retira cuando
     llega la pregunta. */
  const mensajes =
    indice === null
      ? []
      : secuencia
          .slice(0, indice + 1)
          .filter(
            (b) =>
              b.quienHabla &&
              (b.estado === 'escuchando' ||
                b.estado === 'personaHabla' ||
                b.estado === 'confirmando'),
          )
          .slice(-1)

  return (
    <section className="experiencia" aria-label="Cómo funciona Simple">
      <p className="experiencia__situacion" data-visible={estado === 'reposo'}>
        {situacion}
      </p>

      <Telefono
        objetivoActivo={enGuia ? beat?.objetivoId : undefined}
        varianteAnillo={varianteAnillo}
        objetivoTocable={estado === 'guiando'}
        paso={enGuia ? beat?.paso : undefined}
        onTocarObjetivo={avanzar}
        inferiorAbierta={indice !== null}
        botonFlotante={
          <BotonFlotante
            visible={estado === 'reposo'}
            presionado={estado === 'activando'}
            onPresionar={iniciar}
          />
        }
        zonaInferior={
          <div className="inferior" aria-live="polite">
            {enConversacion && (
              <>
                <div className="conversacion">
                  <AnilloPresencia variante={variantePresencia} />
                  <ul className="conversacion__mensajes">
                    {mensajes.map((m) => (
                      <li key={m.id} className="burbuja" data-de={m.quienHabla}>
                        {m.texto}
                      </li>
                    ))}
                  </ul>
                </div>

                {estado === 'entendiendo' && <p className="espera">{beat?.texto}</p>}

                {estado === 'confirmando' && beat?.opciones && (
                  <div className="opciones">
                    <button type="button" className="opcion" onClick={avanzar}>
                      {beat.opciones[0]}
                    </button>
                    <button type="button" className="opcion" onClick={reiniciar}>
                      {beat.opciones[1]}
                    </button>
                  </div>
                )}
              </>
            )}

            {enGuia && (
              <>
                <p className="instruccion">{beat?.texto}</p>
                {beat?.consecuencia && <p className="consecuencia">{beat.consecuencia}</p>}
              </>
            )}

            {estado === 'cierre' && <p className="instruccion">{beat?.texto}</p>}

          </div>
        }
      />

      <div className="experiencia__pie">
        {estado === 'reposo' ? (
          <p className="experiencia__invitacion">{invitacion}</p>
        ) : (
          <button type="button" className="salida" onClick={reiniciar}>
            {empezarDeNuevo}
          </button>
        )}
      </div>
    </section>
  )
}
