/*
  Capa de persistencia, aislada a propósito.

  Habla directamente con la API REST de Supabase usando solo la clave
  pública ANON: no hay servidor, no hay endpoints propios y no hay
  ninguna clave privilegiada en el cliente. Si las variables de entorno
  no están puestas, todo aquí queda inerte y la experiencia sigue
  funcionando sin guardar nada.

  Requiere en Supabase:
    · tabla `responses` con UNIQUE (session_id) y RLS activo
    · política de INSERT y UPDATE para el rol anon
    · SIN política de SELECT sobre `responses`: las respuestas
      individuales no deben poder leerse desde la landing
    · vista `q2_agregado (opcion, total)` con SELECT para anon, que es lo
      único que el contador lee
*/

const URL_BASE = import.meta.env.VITE_SUPABASE_URL as string | undefined
const CLAVE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

const CLAVE_SESION = 'simple.session'

export const hayPersistencia = () => Boolean(URL_BASE && CLAVE_ANON)

/** Un id por persona, generado una sola vez y guardado en el navegador.
    Es lo que une las tres respuestas y lo que evita que una misma sesión
    infle el contador: en la base hay como mucho una fila por sesión. */
export function idDeSesion(): string {
  try {
    const guardado = localStorage.getItem(CLAVE_SESION)
    if (guardado) return guardado
    const nuevo = crypto.randomUUID()
    localStorage.setItem(CLAVE_SESION, nuevo)
    return nuevo
  } catch {
    return crypto.randomUUID()
  }
}

const cabeceras = () => ({
  'Content-Type': 'application/json',
  apikey: CLAVE_ANON as string,
  Authorization: `Bearer ${CLAVE_ANON}`,
})

/** Guarda o actualiza la fila de esta sesión. Silencioso a propósito:
    un fallo al guardar no es problema de quien está respondiendo. */
export async function guardarRespuestas(
  sessionId: string,
  campos: Record<string, string>,
): Promise<void> {
  if (!hayPersistencia()) return
  try {
    await fetch(`${URL_BASE}/rest/v1/responses?on_conflict=session_id`, {
      method: 'POST',
      headers: { ...cabeceras(), Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({ session_id: sessionId, ...campos }),
    })
  } catch {
    /* sin conexión: la experiencia continúa igual */
  }
}

export type Agregado = { opcion: string; total: number }

/** Lee la distribución agregada de la pregunta 2. Nunca respuestas
    individuales: la vista solo devuelve recuentos. */
export async function leerAgregado(): Promise<Agregado[] | null> {
  if (!hayPersistencia()) return null
  try {
    const r = await fetch(`${URL_BASE}/rest/v1/q2_agregado?select=opcion,total`, {
      headers: cabeceras(),
    })
    if (!r.ok) return null
    const filas = (await r.json()) as Agregado[]
    return Array.isArray(filas) ? filas : null
  } catch {
    return null
  }
}
