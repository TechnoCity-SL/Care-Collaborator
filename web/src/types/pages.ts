export interface SeoDTO {
  title: string;
  description: string;
  og_image?: {
    url: string;
    alternativeText?: string;
  };
}

export interface CloudinaryMediaDTO {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: Record<string, { url: string; width: number; height: number }>;
}

export interface TeamMemberDTO {
  id: number;
  name: string;
  role: string;
  bio?: string;
  photo?: CloudinaryMediaDTO;
}

export interface ValueDTO {
  id: number;
  title: string;
  description: string;
}

export interface ServiceDTO {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon?: CloudinaryMediaDTO;
  hero_image?: CloudinaryMediaDTO;
  content?: string;
  seo?: SeoDTO;
}

export interface HomePageDTO {
  hero_title: string;
  hero_subtitle?: string;
  hero_image?: CloudinaryMediaDTO;
  seo: SeoDTO;
}

export interface AboutPageDTO {
  intro_text: string;
  team?: TeamMemberDTO[];
  values?: ValueDTO[];
  seo: SeoDTO;
}

export interface ContactPageDTO {
  intro_text: string;
  email: string;
  phone?: string;
  address?: string;
  map_embed?: string;
  seo: SeoDTO;
}

export interface NavigationLinkDTO {
  id: number;
  label: string;
  url: string;
  is_external: boolean;
}

export interface NavigationDTO {
  links: NavigationLinkDTO[];
}
