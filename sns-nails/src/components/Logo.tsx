type Props = { className?: string; animate?: boolean; tone?: string; accent?: string }

/** SNS Nails wordmark: legible serif "SNS" with a handwritten "Nails" accent. Pure SVG + web fonts. */
export default function Logo({ className = '', animate = false, tone = '#49332C', accent = '#A77C69' }: Props) {
  return (
    <svg viewBox="0 0 360 150" className={className} role="img" aria-label="SNS Nails">
      <text x="186" y="80" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight="500"
        fontSize="88" letterSpacing="12" fill={tone} stroke={tone} strokeWidth={animate ? 0.8 : 0}
        className={animate ? 'draw fill-in' : ''}>SNS</text>
      <line x1="62" y1="112" x2="128" y2="112" stroke={accent} strokeWidth="1.2" className={animate ? 'draw' : ''} style={animate ? { animationDelay: '.9s' } : undefined} />
      <line x1="232" y1="112" x2="298" y2="112" stroke={accent} strokeWidth="1.2" className={animate ? 'draw' : ''} style={animate ? { animationDelay: '.9s' } : undefined} />
      <text x="180" y="128" textAnchor="middle" fontFamily="'Pinyon Script', cursive" fontSize="50" fill={accent}
        className={animate ? 'fill-in' : ''} style={animate ? { animationDelay: '1.2s' } : undefined}>Nails</text>
    </svg>
  )
}
