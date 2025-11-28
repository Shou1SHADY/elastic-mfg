export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  details?: string[];
}

export interface ContactFormState {
  name: string;
  email: string;
  company: string;
  details: string;
}

export const SectionId = {
  HERO: 'hero',
  ABOUT: 'about',
  PROCESS: 'process',
  SHOWCASE: 'showcase',
  PORTFOLIO: 'portfolio',
  CONTACT: 'contact',
} as const;