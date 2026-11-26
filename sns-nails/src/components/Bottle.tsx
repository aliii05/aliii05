/** Coded glossy nail-polish bottle — placeholder for the future 3D render. */
export default function Bottle({ hue = '#D3A3AC', deep = '#A77C69', className = '' }: { hue?: string; deep?: string; className?: string }) {
  const id = hue.slice(1) + deep.slice(1)
  return (
    <svg viewBox="0 0 120 240" className={className} aria-hidden>
      <defs>
        <linearGradient id={`cap${id}`} x1="0" x2="1"><stop offset="0" stopColor="#2c1f1a" /><stop offset=".45" stopColor="#6b4c41" /><stop offset=".6" stopColor="#3a2923" /><stop offset="1" stopColor="#1f1612" /></linearGradient>
        <linearGradient id={`liq${id}`} x1="0" x2="1"><stop offset="0" stopColor={deep} /><stop offset=".5" stopColor={hue} /><stop offset="1" stopColor={deep} /></linearGradient>
        <linearGradient id={`glass${id}`} x1="0" x2="1"><stop offset="0" stopColor="#fff" stopOpacity=".5" /><stop offset=".25" stopColor="#fff" stopOpacity=".05" /><stop offset=".8" stopColor="#fff" stopOpacity=".1" /><stop offset="1" stopColor="#fff" stopOpacity=".4" /></linearGradient>
      </defs>
      <rect x="38" y="4" width="44" height="96" rx="8" fill={`url(#cap${id})`} />
      <rect x="46" y="10" width="5" height="84" rx="2.5" fill="#fff" opacity=".28" />
      <rect x="42" y="98" width="36" height="14" fill="#cdb7ab" opacity=".8" />
      <rect x="10" y="110" width="100" height="124" rx="26" fill={`url(#liq${id})`} />
      <rect x="10" y="110" width="100" height="124" rx="26" fill={`url(#glass${id})`} />
      <rect x="22" y="124" width="9" height="90" rx="4.5" fill="#fff" opacity=".55" />
      <ellipse cx="82" cy="130" rx="10" ry="5" fill="#fff" opacity=".35" />
    </svg>
  )
}
