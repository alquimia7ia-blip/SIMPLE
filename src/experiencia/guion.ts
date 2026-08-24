/*
  Guion de la experiencia central.

  Todo el contenido de la demo vive aquí: ningún texto está escrito dentro
  de un componente. Cambiar el caso de uso, ajustar una frase o alargar una
  pausa no toca código de interfaz.

  Qué manda sobre qué:
  - Especificación Final del MVP -> qué momentos existen y en qué orden.
  - Manual de Marca, cap. 08     -> las palabras exactas de cada momento.
  - Manual de Marca, cap. 18     -> la señal visual de cada estado.
  - Manual de Marca, cap. 19     -> las duraciones.
*/

export type Estado =
  | 'reposo'
  | 'activando'
  | 'escuchando'
  | 'personaHabla'
  | 'entendiendo'
  | 'confirmando'
  | 'guiando'
  | 'pasoCompletado'
  | 'terminado'
  | 'cierre'

export type Beat = {
  id: string
  estado: Estado
  /** Quién dice el texto. Ausente = no es un mensaje de la conversación. */
  quienHabla?: 'simple' | 'persona'
  texto?: string
  /** Media línea en Slate. Elimina el miedo a tocar. Cap. 18. */
  consecuencia?: string
  /** Id del elemento de la app que el anillo rodea. */
  objetivoId?: string
  /** Dos opciones del mismo tamaño. La primera confirma. */
  opciones?: string[]
  paso?: { actual: number; total: number }
  /** Milisegundos hasta el beat siguiente. */
  duracion: number
}

/* --- Duraciones · cap. 19 --------------------------------------------- */

export const duraciones = {
  toque: 120,
  aparicion: 240,
  paso: 320,
  anillo: 480,
  instruccionTrasAnillo: 200,
  respiracion: 2600,
} as const

/* --- La app simulada ---------------------------------------------------
   Contenedor neutro. No imita a ninguna entidad real y no usa azul: el
   único azul de la pantalla es el de Simple, para que al entornar los ojos
   lo primero que aparezca sea exactamente lo que hay que tocar. */

export type ElementoApp = {
  id: string
  titulo: string
  detalle: string
}

export const pantallaApp: {
  titulo: string
  elementos: ElementoApp[]
  boton: { id: string; etiqueta: string }
} = {
  titulo: 'Mis recibos',
  elementos: [
    {
      id: 'factura-luz',
      titulo: 'Factura de la luz',
      detalle: 'Vence el 3 de septiembre',
    },
    {
      id: 'factura-agua',
      titulo: 'Factura del agua',
      detalle: 'Vence el 12 de septiembre',
    },
  ],
  boton: { id: 'boton-pagar', etiqueta: 'Pagar' },
}

/** Lo que la persona está pensando antes de pedir ayuda. Escena 1 y 2 de
    la Especificación, dichas con palabras y no ilustradas: el Manual pide
    ilustrar el instante anterior a actuar, nunca la impotencia. */
export const situacion = 'Necesito pagar esto… pero no sé qué hacer.'

export const invitacion = 'Toca el botón de Simple para empezar.'

export const empezarDeNuevo = 'Empezar de nuevo'

/* --- La secuencia ------------------------------------------------------ */

export const secuencia: Beat[] = [
  {
    id: 'activando',
    estado: 'activando',
    duracion: duraciones.paso,
  },
  {
    id: 'escuchando',
    estado: 'escuchando',
    quienHabla: 'simple',
    texto: 'Te escucho. Cuéntame qué necesitas hacer.',
    duracion: duraciones.respiracion,
  },
  {
    id: 'persona-habla',
    estado: 'personaHabla',
    quienHabla: 'persona',
    texto: 'Quiero pagar esta factura.',
    duracion: 1600,
  },
  {
    id: 'entendiendo',
    estado: 'entendiendo',
    quienHabla: 'simple',
    texto: 'Déjame ver…',
    duracion: 1800,
  },
  {
    id: 'confirmando',
    estado: 'confirmando',
    quienHabla: 'simple',
    texto: '¿Quieres pagar esta factura?',
    opciones: ['Sí', 'No es eso'],
    duracion: 2400,
  },
  {
    id: 'guiando-1',
    estado: 'guiando',
    texto: 'Ahora toca la factura de la luz.',
    consecuencia: 'Se abrirá el detalle para pagarla.',
    objetivoId: 'factura-luz',
    paso: { actual: 1, total: 2 },
    duracion: duraciones.anillo + duraciones.instruccionTrasAnillo + duraciones.respiracion,
  },
  {
    id: 'paso-completado',
    estado: 'pasoCompletado',
    texto: 'Bien.',
    objetivoId: 'factura-luz',
    paso: { actual: 1, total: 2 },
    duracion: 800,
  },
  {
    id: 'guiando-2',
    estado: 'guiando',
    texto: 'Ahora toca aquí, donde dice Pagar.',
    consecuencia: 'Podrás revisar el valor antes de enviar.',
    objetivoId: 'boton-pagar',
    paso: { actual: 2, total: 2 },
    duracion: duraciones.anillo + duraciones.instruccionTrasAnillo + duraciones.respiracion,
  },
  {
    id: 'terminado',
    estado: 'terminado',
    texto: 'Listo. Ya quedó.',
    objetivoId: 'boton-pagar',
    duracion: 2000,
  },
  {
    id: 'cierre',
    estado: 'cierre',
    texto: 'Si te enredas otra vez, aquí estoy.',
    duracion: 1600,
  },
]
