// ─────────────────────────────────────────────────────────────
//  VR Barber Shop — all editable site content lives here.
//  Replace the logo/video files in /public, or edit text below.
// ─────────────────────────────────────────────────────────────

export const business = {
  name: 'VR Barber Shop',
  rating: 4.8,
  reviewCount: 126,
  address: '43 Baltrum Dr, Wollert VIC 3750',
  phoneDisplay: '(03) 9438 2442',
  phoneHref: 'tel:+61394382442',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=VR+Barber+Shop+43+Baltrum+Dr+Wollert+VIC+3750',
  mapEmbedUrl: 'https://www.google.com/maps?q=VR+Barber+Shop,+43+Baltrum+Dr,+Wollert+VIC+3750&output=embed',
  reviewsUrl: 'https://www.google.com/maps/search/?api=1&query=VR+Barber+Shop+43+Baltrum+Dr+Wollert+VIC+3750',
  // Set this when a real online booking link is available; until then, calls are used.
  bookingUrl: null,
};

export const media = {
  logo: '/logo.svg', // replace with the original gold VR logo (svg/png)
  heroVideo: '/media/walkthrough.mp4',
  heroVideoMobile: '/media/walkthrough-mobile.mp4',
  heroPoster: '/media/poster.jpg',
  interior: '/media/interior.jpg',
  entrance: '/media/entrance.jpg',
};

export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Our Team', href: '#team' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Visit Us', href: '#visit' },
];

export const services = [
  { group: 'Haircuts & Styling', items: ['Fade cuts', 'Buzz cuts', 'Scissor cuts', 'Curly hair', 'Long haircuts', 'Hair shape-ups', 'Children’s cuts'] },
  { group: 'Beard & Grooming', items: ['Beard trimming', 'Beard maintenance', 'Beard conditioning', 'Beard dyeing', 'Razor cuts', 'Head shaves', 'Traditional shaves'] },
  { group: 'Additional Services', items: ['Hair colouring', 'Shampoo and conditioning', 'Waxing'] },
];

// Add real barbers here. `photo` is a path in /public (e.g. '/media/team/sandy.jpg') or null.
export const team = [
  {
    name: 'Sandy',
    role: 'Barber',
    photo: null,
    bio: 'Named again and again in our Google reviews, Sandy is known for her professionalism, skill and genuinely welcoming service — the kind of care that turns a first visit into a regular appointment.',
  },
];

// Set `fiveStarConfirmed: true` only once the individual Google rating is verified as 5 stars.
export const reviews = [
  { name: 'Ameen', text: 'Best barber in the area. The whole team is professional, skilled and really knows what they’re doing.', fiveStarConfirmed: false },
  { name: 'Russ', text: 'Sandy was amazing! The shop looks 🔥 and their prices were great.', fiveStarConfirmed: false },
  { name: 'Amrit', text: 'She is welcoming and very professional and talented. She is highly skilled and price is really reasonable.', fiveStarConfirmed: false },
  { name: 'Vivek', text: 'They are professional and do a fantastic job. Nice and patience with kids. Highly recommended.', fiveStarConfirmed: false },
  { name: 'Rix', text: 'Fantastic barber shop with great service and attention to detail.', fiveStarConfirmed: false },
  { name: 'Satnam', text: 'The stylist was knowledgeable and attentive, and the salon was clean and well-organized.', fiveStarConfirmed: false },
];
