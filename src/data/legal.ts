import { deLegalDocuments } from './legal.de';
import { enLegalDocuments } from './legal.en';
import { frLegalDocuments } from './legal.fr';
import { nlLegalDocuments } from './legal.nl';
import { zhLegalDocuments } from './legal.zh';

export type LegalLang = 'en' | 'zh' | 'fr' | 'de' | 'nl';
export type LegalPageKey = 'privacy' | 'contact' | 'editorialPolicy';

export interface LegalLink {
  href: string;
  label: string;
  description?: string;
}

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  links?: LegalLink[];
}

export interface LegalDocument {
  title: string;
  description: string;
  eyebrow: string;
  lead: string;
  updatedLabel: string;
  updatedDate: string;
  sections: LegalSection[];
  relatedHeading: string;
  backHome: string;
}

export type LegalDocuments = Record<LegalPageKey, LegalDocument>;

export const legalDocuments: Record<LegalLang, LegalDocuments> = {
  en: enLegalDocuments,
  zh: zhLegalDocuments,
  fr: frLegalDocuments,
  de: deLegalDocuments,
  nl: nlLegalDocuments,
};

export const legalPagePaths: Record<LegalPageKey, string> = {
  privacy: 'privacy',
  contact: 'contact',
  editorialPolicy: 'editorial-policy',
};
