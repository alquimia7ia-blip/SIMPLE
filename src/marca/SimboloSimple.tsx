/*
  El símbolo de Simple · cap. 09 del Manual.

  Construido desde su geometría publicada: una sola unidad x gobierna la
  forma.

    caja 10x · trazo 1x · radio del anillo 4x · punto ø 1,5x · abertura 60°

  La abertura ocupa 60° centrados en la diagonal superior derecha —la
  dirección de avance en la lectura occidental— y por eso el arco recorre
  los 300° restantes, de −15° a −75°. El punto va dentro de esa abertura,
  a 4,25x del centro: está fuera del trazo porque todavía no se ha dado.

  El anillo no se cierra, no se rota y no se deforma. Este es el único
  lugar donde el símbolo se dibuja: nunca se redibuja en otro sitio.
*/

export function SimboloSimple({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 10 10" aria-hidden="true" role="presentation">
      <path
        d="M 8.8637 3.9647 A 4 4 0 1 1 6.0353 1.1363"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="8.0052" cy="1.9948" r="0.75" fill="currentColor" />
    </svg>
  )
}
