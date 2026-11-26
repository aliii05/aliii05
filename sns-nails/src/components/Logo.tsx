type Props = { className?: string; animate?: boolean; tone?: string }

/** Handwritten SNS Nails wordmark — pure SVG + web font, no image asset. */
export default function Logo({ className = '', animate = false, tone = '#49332C' }: Props) {
  const a = animate ? 'draw fill-in' : ''
  return (
    <svg viewBox="0 0 360 150" className={className} role="img" aria-label="SNS Nails">
      <text x="180" y="92" textAnchor="middle" fontFamily="'Pinyon Script', cursive" fontSize="96"
        fill={tone} stroke={tone} strokeWidth={animate ? 0.9 : 0} className={a}>SNS</text>
      <path d="M70 108 C 130 96, 210 126, 300 100 C 318 95, 326 90, 332 84" fill="none" stroke="#D3A3AC"
        strokeWidth="1.6" strokeLinecap="round" className={animate ? 'draw' : ''} style={animate ? { animationDelay: '.6s' } : undefined} />
      <text x="180" y="138" textAnchor="middle" fontFamily="Jost, sans-serif" fontSize="15" letterSpacing="11"
        fill={tone} className={animate ? 'fill-in' : ''} style={animate ? { animationDelay: '1.4s' } : undefined}>NAILS</text>
    </svg>
  )
}
