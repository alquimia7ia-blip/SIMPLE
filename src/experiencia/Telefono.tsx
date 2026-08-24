/*
  El teléfono es un contenedor, no el protagonista · cap. 17 del Manual.
  Marco plano, sin bisel, sin reflejos y sin sombra: nada en la identidad
  puede atarse a un dispositivo.

  Anatomía fija de la pantalla de guía:
    Arriba  · dónde estamos: «Paso 1 de 2», nunca en porcentaje.
    Medio   · la pantalla de la persona, intacta, con un solo anillo.
    Abajo   · la instrucción y la salida, siempre a mano.
  La zona inferior es la única que cambia entre pasos.
*/

import type { ReactNode } from 'react'
import { AnilloGuia, type VarianteGuia } from './AnilloGuia'
import { pantallaApp } from './guion'

type Props = {
  objetivoActivo?: string
  varianteAnillo: VarianteGuia
  objetivoTocable: boolean
  paso?: { actual: number; total: number }
  onTocarObjetivo: () => void
  botonFlotante: ReactNode
  zonaInferior: ReactNode
  inferiorAbierta: boolean
}

export function Telefono({
  objetivoActivo,
  varianteAnillo,
  objetivoTocable,
  paso,
  onTocarObjetivo,
  botonFlotante,
  zonaInferior,
  inferiorAbierta,
}: Props) {
  const objetivo = (id: string) => ({
    className: 'app__objetivo',
    'data-senalado': objetivoActivo === id || undefined,
    tabIndex: objetivoActivo === id && objetivoTocable ? 0 : -1,
    onClick: objetivoActivo === id && objetivoTocable ? onTocarObjetivo : undefined,
  })

  return (
    <div className="telefono">
      <div className="telefono__estado" aria-hidden="true">
        <span>9:41</span>
        <span>100%</span>
      </div>

      <div className="telefono__pantalla">
        <p className="telefono__paso" data-visible={Boolean(paso)}>
          {paso ? `Paso ${paso.actual} de ${paso.total}` : ' '}
        </p>

        <h2 className="app__titulo">{pantallaApp.titulo}</h2>

        <ul className="app__lista">
          {pantallaApp.elementos.map((elemento) => (
            <li key={elemento.id}>
              <button type="button" {...objetivo(elemento.id)}>
                <span className="app__item-titulo">{elemento.titulo}</span>
                <span className="app__item-detalle">{elemento.detalle}</span>
                {objetivoActivo === elemento.id && <AnilloGuia variante={varianteAnillo} />}
              </button>
            </li>
          ))}
        </ul>

        <button type="button" {...objetivo(pantallaApp.boton.id)} data-principal="true">
          <span className="app__item-titulo">{pantallaApp.boton.etiqueta}</span>
          {objetivoActivo === pantallaApp.boton.id && <AnilloGuia variante={varianteAnillo} />}
        </button>

        {botonFlotante}

        <div className="telefono__inferior" data-abierta={inferiorAbierta}>
          {zonaInferior}
        </div>
      </div>
    </div>
  )
}
