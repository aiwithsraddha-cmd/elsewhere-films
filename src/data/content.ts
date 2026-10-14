import { ServiceItem, FilmJourneyStage, WayOfWorking, FilmstripFrame } from '../types';
import { asset } from '../utils/assets';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'festival-scheduling',
    number: '01',
    title: 'Festival Scheduling & Entries',
    shortDesc: 'A festival calendar built around the film, its profile, timeline and eligibility.',
    fullDesc:
      'A festival calendar built around the film, its profile, timeline and eligibility. Premiere rules, windows and submission costs are mapped before anything is filed, with complete entry management.',
    deliverables: [
      'Eligibility & premiere rule audit',
      'Strategic festival calendar & timeline',
      'Submission budget & fee optimization',
      'Direct handling of all entry filings',
    ],
  },
  {
    id: 'pathway-recommendation',
    number: '02',
    title: 'Full Pathway Recommendation',
    shortDesc: 'A clear route from premiere to markets, distribution and audiences.',
    fullDesc:
      'A clear route from premiere to markets, distribution and audiences, with scenarios, opportunities and the industry connections that can help move the film forward.',
    deliverables: [
      'Comprehensive premiere-to-market roadmap',
      'Scenario modeling & contingency planning',
      'Targeted industry buyer & curator connections',
      'Advocacy strategy for critical rooms',
    ],
  },
  {
    id: 'positioning-packaging',
    number: '03',
    title: 'Positioning & Packaging',
    shortDesc: 'The words and materials that travel with the film.',
    fullDesc:
      'The words and materials that travel with the film: loglines, synopses, director’s statements, decks and buyer-facing materials. Everything aligned, so the film is presented clearly and consistently wherever it goes.',
    deliverables: [
      'Curated loglines & synopsis variations',
      'Director’s artistic statement crafting',
      'International sales & festival decks',
      'Buyer-facing press notes & one-sheets',
    ],
  },
  {
    id: 'distribution-audience',
    number: '04',
    title: 'Distribution & Audience',
    shortDesc: 'Finding the right sales agents, distributors, platforms and buyers.',
    fullDesc:
      'Finding the right sales agents, distributors, platforms and buyers, then supporting the introductions and conversations that follow. Looking beyond the home market to diaspora, cinephile and crossover audiences where the film can travel.',
    deliverables: [
      'Sales agent & international distributor matching',
      'Platform negotiation advisory',
      'Diaspora & niche cinephile audience mapping',
      'Crossover theatrical & institutional screenings',
    ],
  },
  {
    id: 'co-production',
    number: '05',
    title: 'Co-production',
    shortDesc: 'Shaping films aligned with our vision from early development.',
    fullDesc:
      'We also co-produce films aligned with our vision, actively involved in development, international positioning and shaping the film’s route into the world.',
    deliverables: [
      'Script & narrative development feedback',
      'International co-financing pathways',
      'Pre-production market alignment',
      'Full lifecycle distribution stewardship',
    ],
  },
];

export const JOURNEY_STAGES: FilmJourneyStage[] = [
  {
    id: 'nearing-completion',
    number: '01',
    title: 'Nearing Completion',
    description:
      'The locked cut is in sight. This is the moment to make key decisions that shape what comes next, including premiere strategy, eligibility, timing and the right route for the film.',
    badge: 'Post-Production',
    image: asset('/images/35mm-film-strip.jpg'),
  },
  {
    id: 'festival-ready',
    number: '02',
    title: 'Festival Ready',
    description:
      'The film is done. Now come the bigger questions: which premiere, in what sequence, and toward which rooms? Or whether the festival route is the right one at all!',
    badge: 'Completed Cut',
    image: asset('/images/frame-02-premiere.jpg'),
  },
  {
    id: 'in-circulation',
    number: '03',
    title: 'In Circulation',
    description:
      'The premiere is behind you. Now it is about building sustained momentum across markets, distributors and audiences, giving the film a lasting life beyond its first screening.',
    badge: 'Post-Premiere',
    image: asset('/images/film-market-architecture.jpg'),
  },
  {
    id: 'before-the-cut',
    number: '04',
    title: 'Before the Cut',
    description:
      'Elsewhere’s work usually begins with finished films. For a small number of projects, the relationship starts earlier at the script stage. See Creative Partnership below.',
    badge: 'Early Development',
    isAlternative: true,
    image: asset('/images/analog-reels.jpg'),
  },
];

export const WAYS_OF_WORKING: WayOfWorking[] = [
  {
    id: 'pathway-partnership',
    number: '01',
    title: 'Pathway Partnership',
    tagline: 'The primary route for completed works',
    description:
      'You’ve made the film. We help work out what comes next, whether that means an international festival premiere and a wider journey beyond it, or a more direct route to platforms and distributors at home.',
    details:
      'This is how most filmmakers work with us: the engagement is shaped around the film, from a single scheduling brief to a full pathway plan.',
    primary: true,
  },
  {
    id: 'creative-partnership',
    number: '02',
    title: 'Creative Partnership',
    tagline: 'Selective co-production from inception',
    description: 'Sometimes, the relationship starts earlier.',
    details:
      'We co-produce, working through development, international positioning, and the film’s path into the world.',
    primary: false,
  },
];

export const FILMSTRIP_FRAMES: FilmstripFrame[] = [
  {
    number: '01',
    code: 'FRAME 01',
    title: 'THE FINAL CUT',
    subtitle: 'The picture locks. The journey begins.',
    aspect: '2.39:1',
    edgeCode: '35MM KODAK 5219 • 24 FPS',
    summary: 'The creative craft is complete. The strategic challenge begins.',
    image: asset('/images/35mm-film-strip.jpg'),
  },
  {
    number: '02',
    code: 'FRAME 02',
    title: 'THE PREMIERE',
    subtitle: 'Choosing the right room, the right moment.',
    aspect: '2.39:1',
    edgeCode: 'EASTMAN SAFETY FILM • EXP 02A',
    summary: 'A premiere is not simply a calendar date, but your film’s introduction to the global industry.',
    image: asset('/images/frame-02-premiere.jpg'),
  },
  {
    number: '03',
    code: 'FRAME 03',
    title: 'FESTIVALS & MARKETS',
    subtitle: 'Navigating international circuit momentum.',
    aspect: '2.39:1',
    edgeCode: 'CIRCULATION MATRIX • A-LIST WINDOWS',
    summary: 'Connecting critical praise with buyers, programmers, and festival directors.',
    image: asset('/images/film-market-architecture.jpg'),
  },
  {
    number: '04',
    code: 'FRAME 04',
    title: 'DISTRIBUTION',
    subtitle: 'Beyond the festival bubble into the marketplace.',
    aspect: '2.39:1',
    edgeCode: 'SALES & TERRITORY • MULTI-PLATFORM',
    summary: 'Securing sales agents, theatrical partners, and digital distribution tailored to the work.',
    image: asset('/images/cinema-screen-audience.jpg'),
  },
  {
    number: '05',
    code: 'FRAME 05',
    title: 'AUDIENCES',
    subtitle: 'Reaching diaspora, cinephiles, and the world.',
    aspect: '2.39:1',
    edgeCode: 'BEYOND THE FINAL FRAME • SUSTAINED LIFE',
    summary: 'Ensuring your story finds the viewers who will remember and champion it.',
    image: asset('/images/frame-03-festivals.jpg'),
  },
];
