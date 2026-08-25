/*
  Las tres preguntas de validación.

  Todo el contenido vive aquí, separado de la interfaz: durante la
  validación se reescriben opciones, no componentes.

  Ninguna pregunta admite texto libre. «Otra situación» también es una
  opción cerrada: la persona nunca escribe.
*/

export type Opcion = {
  /** Valor que se guarda. Estable: cambiar un texto no rompe los datos. */
  id: string
  texto: string
}

export type Pregunta = {
  campo: 'q1_comprension' | 'q2_dolor' | 'q3_interes'
  enunciado: string
  opciones: Opcion[]
}

export const PREGUNTAS: Pregunta[] = [
  {
    campo: 'q1_comprension',
    enunciado: 'Después de ver cómo funciona Simple, ¿qué dirías que hace?',
    opciones: [
      { id: 'busca_tutorial', texto: 'Me busca un tutorial o un video para ver después.' },
      { id: 'guia_y_muestra', texto: 'Me guía paso a paso y me muestra dónde tocar.' },
      { id: 'hace_por_mi', texto: 'Hace la tarea por mí desde mi celular.' },
      { id: 'ensena_cursos', texto: 'Me enseña a usar el celular con lecciones.' },
    ],
  },
  {
    campo: 'q2_dolor',
    enunciado: '¿En cuál de estas situaciones te cuesta más continuar?',
    opciones: [
      { id: 'pagar', texto: 'Pagar algo desde el celular.' },
      { id: 'tramite', texto: 'Hacer un trámite.' },
      { id: 'banco', texto: 'Usar una aplicación bancaria.' },
      { id: 'que_sigue', texto: 'Entender qué debo hacer después.' },
      { id: 'otra', texto: 'Otra situación.' },
    ],
  },
  {
    campo: 'q3_interes',
    enunciado: 'Si pudieras probar Simple, ¿te gustaría hacerlo?',
    opciones: [
      { id: 'si', texto: 'Sí, quiero probarlo.' },
      { id: 'tal_vez', texto: 'Tal vez.' },
      { id: 'no_ahora', texto: 'No por ahora.' },
    ],
  },
]

export const TITULAR = 'Ayúdanos a entender qué necesitas.'

export const APOYO =
  'Tres preguntas, sin escribir nada. Solo toca la respuesta que más se parezca a ti.'

export const GRACIAS = 'Gracias. Acabas de ayudar a Simple a entender mejor cómo ayudarte.'

export const APRENDIENDO =
  'Estoy aprendiendo qué necesitan las personas para poder ayudar mejor.'

export const POCAS_RESPUESTAS = 'Sé de las primeras personas en responder.'

export const ENCABEZADO_AGREGADO = 'Esto es lo que más cuesta a quienes ya respondieron.'

/** Por debajo de este número no se muestran barras: no hay nada real que contar. */
export const UMBRAL_AGREGADO = 10
