/*
  El sistema de guía visual · cap. 18 del Manual.

  Dos formas del mismo elemento, nunca las dos a la vez:

  - AnilloGuia     rodea el objetivo real dentro de la pantalla.
                   Trazo Blue 500 de 2px, halo Blue 100 de 6px,
                   radio 4px mayor que el elemento. Nunca lo tapa,
                   nunca lo mueve, nunca parpadea.

  - AnilloPresencia  es Simple en la conversación: respira mientras
                     escucha y el punto lo recorre mientras entiende.
                     Sustituye al avatar, que el Manual retiró.

  Aquí no hay flechas. El anillo es la única señal de «aquí».
*/

export type VarianteGuia = 'guiando' | 'completado' | 'terminado'
export type VariantePresencia = 'respirando' | 'recorriendo' | 'quieto'

export function AnilloGuia({ variante }: { variante: VarianteGuia }) {
  return (
    <span className="anillo-guia" data-variante={variante} aria-hidden="true">
      {variante === 'terminado' && (
        <svg className="anillo-guia__listo" viewBox="0 0 24 24" role="presentation">
          <path
            d="M5 12.5 10 17.5 19 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  )
}

export function AnilloPresencia({ variante }: { variante: VariantePresencia }) {
  return (
    <span className="anillo-presencia" data-variante={variante} aria-hidden="true">
      <svg viewBox="0 0 40 40" role="presentation">
        <circle
          className="anillo-presencia__trazo"
          cx="20"
          cy="20"
          r="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      <span className="anillo-presencia__punto" />
    </span>
  )
}
