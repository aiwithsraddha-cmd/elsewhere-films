export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables?: string[];
}

export interface FilmJourneyStage {
  id: string;
  number: string;
  title: string;
  description: string;
  badge?: string;
  isAlternative?: boolean;
  image?: string;
}

export interface FilmstripFrame {
  number: string;
  code: string;
  title: string;
  subtitle: string;
  aspect: string;
  edgeCode: string;
  summary: string;
  image: string;
}

export interface WayOfWorking {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  details: string;
  primary?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  filmTitle: string;
  stage: string;
  oneLineSummary: string;
  screenerLink?: string;
}

export type ActiveTheme = 'dark' | 'ivory';
