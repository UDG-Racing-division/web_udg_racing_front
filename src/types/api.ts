export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string | null;
  date: string;
  image: string | null;
  images: NewsImage[];
}

export interface NewsImage {
  id: number;
  image: string;
  order: number;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string | null;
  active: boolean;
  order: number;
}

export interface Sponsor {
  id: number;
  name: string;
  logo: string;
  website: string | null;
  type: string | null;
  order: number;
}

export interface Stat {
  id: number;
  label: string;
  value: string;
  unit: string;
  link: string | null;
  is_external: boolean;
}

export interface SiteSettings {
  [key: string]: any;
}

export interface HomeData {
  stats: Stat[];
  team: TeamMember[];
  news: NewsItem[];
  sponsors: Sponsor[];
  settings: SiteSettings;
}
