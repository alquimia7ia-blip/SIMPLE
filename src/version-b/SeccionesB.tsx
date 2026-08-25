/*
  Las cuatro secciones intermedias de la Versión B: problema, solución
  (con la experiencia central real embebida), diferencia y para quién.

  Condensan lo que en la Versión A ocupa cinco secciones completas
  (identificación, cómo funciona, beneficio, cuándo ayuda, la diferencia,
  para quién / qué no es) en una fracción del texto, reutilizando el
  mismo sistema visual: tokens, tipografía y el componente real de la
  demo — nunca una explicación sustituye a la demostración.
*/

import { ExperienciaCentral } from '../experiencia/ExperienciaCentral'
import { CTA_CONTACTO, WHATSAPP } from '../marca/enlaces'
import './SeccionesB.css'

export function ProblemaB() {
  return (
    <section className="seccionB seccionB--problema" aria-labelledby="problema-b">
      <div className="seccionB__interior">
        <p className="seccionB__eyebrow">Te entendemos</p>
        <h2 className="seccionB__titular" id="problema-b">
          Todos hemos tenido ese momento.
        </h2>
        <p className="fraseB">“¿Dónde tengo que tocar?”</p>
        <p className="fraseB fraseB--fuerte">“¿Y si hago algo mal?”</p>
        <p className="seccionB__apoyo">Ese momento en el que una tarea importante te hace dudar.</p>
      </div>
    </section>
  )
}

const PASOS = [
  { n: '1', t: 'Presiona' },
  { n: '2', t: 'Habla' },
  { n: '3', t: 'Te guía' },
]

export function SolucionB({ id }: { id: string }) {
  return (
    <>
      <section
        className="seccionB seccionB--solucion"
        aria-labelledby="solucion-b"
      >
        <div className="seccionB__interior">
          <h2 className="seccionB__titular" id="solucion-b">
            Presiona. Habla. Te muestra dónde tocar.
          </h2>
          <p className="seccionB__apoyo">
            Sin tutoriales ni instrucciones genéricas. Dices qué necesitas y Simple te señala el
            siguiente paso.
          </p>
          <ol className="pasosB" aria-label="Presiona, habla, te guía">
            {PASOS.map((p) => (
              <li key={p.n} className="pasosB__item">
                <span className="pasosB__n" aria-hidden="true">
                  {p.n}
                </span>
                {p.t}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* La demostración real: la prueba es la propia experiencia, no un
          texto que la describa. */}
      <div id={id} className="pagina">
        <ExperienciaCentral />
      </div>
    </>
  )
}

export function DiferenciaB() {
  return (
    <section className="seccionB seccionB--diferencia" aria-labelledby="diferencia-b">
      <div className="seccionB__interior">
        <h2 className="seccionB__titular" id="diferencia-b">
          No es un tutorial. Es alguien guiándote en el momento.
        </h2>
        <div className="contrasteB" aria-hidden="true">
          <span className="contrasteB__chip">Instrucción genérica</span>
          <span className="contrasteB__linea" />
          <span className="contrasteB__chip contrasteB__chip--activo">Guía en el momento</span>
        </div>
        <p className="seccionB__apoyo">
          Las instrucciones genéricas se leen antes. Simple te acompaña mientras lo haces.
        </p>
      </div>
    </section>
  )
}

const ESCENARIOS = ['Pagos', 'Trámites', 'Contraseñas', 'Códigos de seguridad']

export function OfertaB() {
  return (
    <section className="seccionB seccionB--oferta" aria-labelledby="oferta-b">
      <div className="seccionB__interior">
        <h2 className="seccionB__titular" id="oferta-b">
          Para quien usa el celular todos los días, y a veces se enreda.
        </h2>
        <p className="seccionB__apoyo">
          No es cuestión de edad. Es cuestión del momento: un pago, un trámite, una contraseña.
        </p>
        <ul className="chipsB">
          {ESCENARIOS.map((e) => (
            <li key={e} className="chipsB__item">
              {e}
            </li>
          ))}
        </ul>
        <p className="noesB">
          No es un curso ni un chatbot. Es alguien que te muestra el siguiente paso.
        </p>
        <a className="ctaB" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
          {CTA_CONTACTO}
        </a>
      </div>
    </section>
  )
}
