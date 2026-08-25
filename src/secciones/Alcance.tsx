/*
  Cuatro momentos que cierran el posicionamiento de Simple:

    CUÁNDO PUEDE AYUDAR  ·  LA DIFERENCIA  ·  PARA QUIÉN  ·  QUÉ NO ES

  Mismo vocabulario visual que el resto de la landing —círculo, arco,
  punto, halo y el anillo como sistema de señalamiento—, sin flechas y
  sin nada que se mueva mientras se lee.
*/

import './Alcance.css'

const MOMENTOS = [
  { icono: 'factura', texto: 'Pagar una factura' },
  { icono: 'transferencia', texto: 'Hacer una transferencia' },
  { icono: 'tramite', texto: 'Realizar un trámite' },
  { icono: 'cuenta', texto: 'Acceder a una cuenta' },
  { icono: 'clave', texto: 'Recuperar una contraseña' },
  { icono: 'codigo', texto: 'Entender un código de seguridad' },
]

const PRINCIPIOS = [
  'Te guía paso a paso',
  'Te ayuda a entender',
  'No hace las cosas por ti',
  'Mantienes el control',
]

const NO_ES = [
  'Un chatbot genérico.',
  'Soporte técnico.',
  'Un curso de tecnología.',
  'Una app que hace todo por ti.',
  'Una app solo para adultos mayores.',
]

function Icono({ tipo }: { tipo: string }) {
  return (
    <svg className="glifo" viewBox="0 0 32 32" aria-hidden="true" role="presentation">
      {tipo === 'factura' && (
        <>
          <rect className="g-trazo" x="8" y="4" width="16" height="24" rx="3" />
          <path className="g-trazo" d="M12.5 11h7M12.5 16h7" />
          <circle className="g-punto" cx="16" cy="22.5" r="2.5" />
        </>
      )}
      {tipo === 'transferencia' && (
        <>
          <path className="g-trazo" d="M7 20a11 11 0 0 1 18 0" />
          <circle className="g-tenue" cx="7" cy="23" r="4.5" />
          <circle className="g-punto" cx="25" cy="23" r="4.5" />
        </>
      )}
      {tipo === 'tramite' && (
        <>
          <rect className="g-trazo" x="5" y="6" width="17" height="20" rx="3" />
          <circle className="g-trazo" cx="23" cy="22" r="6" />
          <circle className="g-punto" cx="23" cy="22" r="2" />
        </>
      )}
      {tipo === 'cuenta' && (
        <>
          <rect className="g-trazo" x="4" y="8" width="24" height="16" rx="4" />
          <circle className="g-punto" cx="11" cy="16" r="3" />
          <path className="g-trazo" d="M18 16h6" />
        </>
      )}
      {tipo === 'clave' && (
        <>
          <path className="g-trazo" d="M11 14v-3a5 5 0 0 1 10 0v3" />
          <rect className="g-trazo" x="7" y="14" width="18" height="13" rx="3.5" />
          <circle className="g-punto" cx="16" cy="20.5" r="2.5" />
        </>
      )}
      {tipo === 'codigo' && (
        <>
          <rect className="g-trazo" x="3" y="11" width="7" height="11" rx="2.5" />
          <rect className="g-trazo" x="12.5" y="11" width="7" height="11" rx="2.5" />
          <rect className="g-punto-rect" x="22" y="11" width="7" height="11" rx="2.5" />
        </>
      )}
    </svg>
  )
}

/* Dos pantallas abstractas: la misma tarea, con y sin señalamiento. */
function Pantalla({ senalada }: { senalada?: boolean }) {
  return (
    <svg className="contraste__pantalla" viewBox="0 0 120 150" aria-hidden="true" role="presentation">
      <rect className="p-marco" x="1" y="1" width="118" height="148" rx="14" />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          className="p-fila"
          data-activa={senalada && i === 2 ? true : undefined}
          x="14"
          y={26 + i * 27}
          width="92"
          height="18"
          rx="6"
        />
      ))}
      {senalada && (
        <>
          <rect className="p-halo" x="8" y="74" width="104" height="30" rx="11" />
          <rect className="p-anillo" x="10" y="76" width="100" height="26" rx="9" />
        </>
      )}
    </svg>
  )
}

export function Alcance() {
  return (
    <>
      {/* ---------- CUÁNDO PUEDE AYUDAR ---------- */}
      <section className="seccion seccion--momentos" aria-labelledby="momentos">
        <div className="seccion__interior">
          <p className="seccion__eyebrow">Cuándo</p>
          <h2 className="seccion__titular" id="momentos">
            Tareas importantes que no haces todos los días.
          </h2>

          <ul className="momentos">
            {MOMENTOS.map((m, i) => (
              <li key={m.texto} className="momento" data-momento={i + 1}>
                <span className="momento__nodo">
                  <Icono tipo={m.icono} />
                </span>
                <span className="momento__texto">{m.texto}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- LA DIFERENCIA ---------- */}
      <section className="seccion seccion--diferencia" aria-labelledby="diferencia">
        <div className="seccion__interior">
          <p className="seccion__eyebrow">La diferencia</p>
          <h2 className="seccion__titular" id="diferencia">
            No te explican qué hacer. Te lo señalan mientras lo haces.
          </h2>

          <div className="contraste">
            <div className="contraste__lado">
              <Pantalla />
              <h3 className="contraste__titulo">Una instrucción general</h3>
              <p className="contraste__linea">La lees, la recuerdas y vuelves sola a tu pantalla.</p>
            </div>
            <div className="contraste__lado" data-simple="true">
              <Pantalla senalada />
              <h3 className="contraste__titulo">Una guía en el momento</h3>
              <p className="contraste__linea">Aparece sobre tu pantalla y rodea el paso que toca.</p>
            </div>
          </div>

          <ul className="principios">
            {PRINCIPIOS.map((p) => (
              <li key={p} className="principios__item">
                <span className="principios__punto" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- PARA QUIÉN ---------- */}
      <section className="seccion seccion--quien" aria-labelledby="quien">
        <div className="seccion__interior">
          <p className="seccion__eyebrow">Para quién</p>
          <h2 className="seccion__titular" id="quien">
            Para quien usa el celular todos los días y a veces se enreda.
          </h2>
          <p className="quien__linea">
            No es cuestión de edad. Es cuestión del momento: una tarea importante, poco frecuente y
            con consecuencias.
          </p>

          {/* Cualquiera puede ser el siguiente: anillos de distinto tamaño,
              y solo uno lleva el punto. */}
          <ul className="banda" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <li key={i} className="banda__anillo" data-i={i} data-activo={i === 4 || undefined} />
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- QUÉ NO ES ---------- */}
      <section className="seccion seccion--noes" aria-labelledby="noes">
        <div className="seccion__interior">
          <p className="seccion__eyebrow">Para que no haya dudas</p>
          <h2 className="seccion__titular" id="noes">
            Lo que Simple no es.
          </h2>

          <div className="noes">
            <ul className="noes__lista">
              {NO_ES.map((n) => (
                <li key={n} className="noes__item">
                  {n}
                </li>
              ))}
            </ul>
            <p className="noes__si">
              Simple es un copiloto: te escucha, confirma qué necesitas y te señala el siguiente
              paso.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
