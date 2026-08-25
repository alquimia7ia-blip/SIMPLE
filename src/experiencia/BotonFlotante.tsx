/*
  Botón flotante · cap. 11 y 19 del Manual.
  56px, área táctil 64px, Blue 500, respira al 4% cada 2600ms.
  Nunca salta, nunca vibra, nunca llama la atención por su cuenta.

  El símbolo vive en src/marca/SimboloSimple: aquí solo se usa. Y aunque
  el botón respira, el símbolo no: la respiración vive en el disco, y la
  geometría del símbolo permanece estable. El anillo del producto puede
  girar, respirar y cerrarse; este nunca hace ninguna de las tres cosas.
*/

import { SimboloSimple } from '../marca/SimboloSimple'

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
      <span className="boton-flotante__disco" aria-hidden="true" />
      <SimboloSimple className="boton-flotante__simbolo" />
    </button>
  )
}
