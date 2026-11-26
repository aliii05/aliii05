import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { business, hours, allServices } from './src/config/site'

// Builds LocalBusiness structured data from the central config at build time,
// so it is present in the static HTML for search engines.
const dayMap: Record<string, string> = { Sun: 'Sunday', Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday' }
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NailSalon',
  name: business.name,
  url: business.url,
  telephone: business.phone,
  image: `${business.url}/og-image.jpg`,
  logo: `${business.url}/logo.svg`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress', streetAddress: business.address.street, addressLocality: business.address.suburb,
    addressRegion: business.address.state, postalCode: business.address.postcode, addressCountry: business.address.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng },
  areaServed: ['Kalkallo', 'Donnybrook', 'Mickleham', 'Beveridge', 'Craigieburn', 'Wollert'],
  openingHoursSpecification: hours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: dayMap[h.short], opens: h.open, closes: h.close })),
  hasOfferCatalog: {
    '@type': 'OfferCatalog', name: 'Nail & beauty services',
    itemListElement: allServices.map((s) => ({ '@type': 'Offer', priceCurrency: 'AUD', price: s.price, itemOffered: { '@type': 'Service', name: s.name } })),
  },
}

export default defineConfig({
  plugins: [
    react(),
    { name: 'json-ld', transformIndexHtml: (html) => html.replace('<!--JSONLD-->', `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`) },
  ],
  build: { cssCodeSplit: false },
})
