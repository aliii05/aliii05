import { bandVideo } from '../config/site'
import { useReducedMotion } from '../lib'
import SmartVideo from './SmartVideo'

export default function Band() {
  const reduced = useReducedMotion()
  if (!bandVideo.desktop) return null
  return (
    <section aria-label="Every detail, considered" className="relative h-[62vh] min-h-[380px] overflow-hidden bg-nude">
      <SmartVideo v={bandVideo} reduced={reduced} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-ivory/90 via-ivory/40 to-transparent" />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-8" data-reveal>
        <p className="eyebrow">The SNS standard</p>
        <h2 className="h-display mt-4 max-w-md text-[clamp(2.6rem,6vw,5rem)]">Every detail, <span className="font-script text-rose">considered.</span></h2>
        <p className="mt-5 max-w-sm text-espresso/75">Patient prep, precise shaping and a flawless, glossy finish, every appointment.</p>
      </div>
    </section>
  )
}
