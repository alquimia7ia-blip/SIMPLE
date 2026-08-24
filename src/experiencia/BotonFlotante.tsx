/*
  Botón flotante · cap. 11 y 19 del Manual.
  56px, área táctil 64px, Blue 500, respira al 4% cada 2600ms.
  Nunca salta, nunca vibra, nunca llama la atención por su cuenta.

  ┌──────────────────────────────────────────────────────────────────┐
  │ MARCADOR DE POSICIÓN                                             │
  │ El símbolo de Simple NO está dibujado aquí. El Manual exige usar  │
  │ el archivo maestro y prohíbe redibujarlo, y ese archivo no está   │
  │ en el proyecto. Hasta que llegue `simple-simbolo.svg`, el botón   │
  │ se renderiza como un disco Blue 500 sin marca.                    │
  │ Para ponerlo: sustituir el contenido de <span className="marca">. │
  └──────────────────────────────────────────────────────────────────┘
*/

type Props = {
  visible: boolean
  presionado: boolean
  onPresionar: () => void
}

export function BotonFlotante({ visible, presionado, onPresionar }: Props) {
  return (
    <button
      type="button"
      className="boton-flotante"
      data-visible={visible}
      data-presionado={presionado}
      aria-label="Simple"
      onClick={onPresionar}
      disabled={!visible}
    >
      <span className="boton-flotante__marca" aria-hidden="true" />
    </button>
  )
}
