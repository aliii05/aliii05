import { business, hours, mapsDirections, mapsEmbed } from '../config/site'
import { fmtHour } from '../lib'

export default function Contact() {
  const today = new Date().getDay()
  const order = [1, 2, 3, 4, 5, 6, 0]
  const a = business.address
  return (
    <section id="visit" className="section bg-nude/35">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div data-reveal>
          <p className="eyebrow">Visit the studio</p>
          <h2 className="h-display mt-4 text-[clamp(2.6rem,6vw,4.6rem)]">Find us in <span className="font-script text-rose">Kalkallo</span></h2>
          <address className="mt-6 not-italic text-lg leading-relaxed">{a.street}<br />{a.suburb} {a.state} {a.postcode}</address>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <a className="btn-dark col-span-2" href={mapsDirections} target="_blank" rel="noopener">Get Directions</a>
            <a className="btn-light" href={`tel:${business.phone}`}>Call</a>
            <a className="btn-light" href={`sms:${business.phone}`}>Text</a>
          </div>
          <table className="mt-10 w-full max-w-sm text-[15px]">
            <caption className="eyebrow mb-3 text-left">Opening hours</caption>
            <tbody>
              {order.map((d) => (
                <tr key={d} className={`border-b border-espresso/10 ${d === today ? 'font-medium text-rose' : ''}`}>
                  <th scope="row" className="py-2.5 text-left font-normal">{hours[d].day}{d === today && <span className="ml-2 text-[11px] uppercase tracking-widest">today</span>}</th>
                  <td className="py-2.5 text-right tabular-nums">{fmtHour(hours[d].open)} – {fmtHour(hours[d].close)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="min-h-[360px] overflow-hidden rounded-[2rem] border border-espresso/10 bg-nude" data-reveal style={{ ['--d' as string]: '150ms' }}>
          <iframe title="Map to SNS Nails, 30 Stilt St Kalkallo" src={mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full min-h-[360px] w-full grayscale-[.35] sepia-[.15]" />
        </div>
      </div>
    </section>
  )
}
