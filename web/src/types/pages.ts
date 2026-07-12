// ─── Strapi media ────────────────────────────────────────────────────────────

export interface CloudinaryMediaDTO {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: Record<string, { url: string; width: number; height: number }>;
}

// ─── Shared components (mirror cms/src/components/shared/) ───────────────────

export interface SeoDTO {
  title: string;
  description?: string;
  og_image?: CloudinaryMediaDTO;
  no_index?: boolean;
  canonicalURL?: string;
}

export type CtaButtonVariant = 'primary' | 'secondary';

export interface CtaButtonDTO {
  label: string;
  url: string;
  variant: CtaButtonVariant;
}

export type FeatureIconKey =
  | 'data_sovereignty'
  | 'e_signature'
  | 'russell_kennedy'
  | 'budget_scenarios'
  | 'integrations'
  | 'risks_alerts'
  | 'people'
  | 'australia'
  | 'scales'
  | 'speed'
  | 'star'
  | 'check_circle'
  | 'shield'
  | 'heart_care';

export interface FeatureItemDTO {
  id: number;
  icon_key?: FeatureIconKey;
  title: string;
  description?: string;
}

export interface ChecklistItemDTO {
  id: number;
  title: string;
  description?: string;
}

export interface StatItemDTO {
  id: number;
  value: string;
  label: string;
}

export interface LinkDTO {
  id: number;
  label: string;
  url: string;
  is_external: boolean;
}

// ─── Global single type ───────────────────────────────────────────────────────

export interface FooterColumnDTO {
  id: number;
  title: string;
  links: LinkDTO[];
}

export interface GlobalDTO {
  nav_links: LinkDTO[];
  nav_cta: CtaButtonDTO;
  footer_tagline: string;
  footer_columns: FooterColumnDTO[];
  footer_email: string;
  footer_phone: string;
  footer_address: string;
}

export interface CtaBannerDTO {
  heading: string;
  subtext?: string;
  primary_cta: CtaButtonDTO;
  secondary_cta?: CtaButtonDTO;
  bg_image?: CloudinaryMediaDTO;
}

export interface ParallaxCloudDTO {
  id: number;
  image: CloudinaryMediaDTO;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  speed: number;
  z_index?: number;
}

export type TrustBadgeStyle = 'current' | 'figma';

export interface HeroBannerDTO {
  badge?: string;
  title: string;
  title_highlight?: string;
  subtitle?: string;
  primary_cta?: CtaButtonDTO;
  secondary_cta?: CtaButtonDTO;
  image?: CloudinaryMediaDTO;
  bg_image?: CloudinaryMediaDTO;
  badges?: BadgeDTO[];
  badge_style?: TrustBadgeStyle;
  clouds?: ParallaxCloudDTO[];
}

export type StatsBannerTheme = 'gradient' | 'plain';

export interface StatsBannerDTO {
  label?: string;
  heading?: string;
  stats: StatItemDTO[];
  bg_image?: CloudinaryMediaDTO;
  theme?: StatsBannerTheme;
}

// ─── Partner logos marquee ────────────────────────────────────────────────────

export type MarqueeSpeed = 'slow' | 'normal' | 'fast';
export type MarqueeDirection = 'left' | 'right';

export interface PartnerLogosSectionDTO {
  heading?: string;
  logos: CloudinaryMediaDTO[];
  speed: MarqueeSpeed;
  direction: MarqueeDirection;
  pause_on_hover: boolean;
}

// ─── Page types ───────────────────────────────────────────────────────────────

export interface VideoSectionDTO {
  label?: string;
  heading: string;
  heading_highlight?: string;
  subtext?: string;
  video_url?: string;
  video_file?: CloudinaryMediaDTO;
}

export interface FeaturesSectionDTO {
  label?: string;
  heading: string;
  heading_highlight?: string;
  subtext?: string;
  features: FeatureItemDTO[];
}

export interface StepsSectionDTO {
  label?: string;
  heading: string;
  heading_highlight?: string;
  steps: StepItemDTO[];
}

export interface HomePageDTO {
  hero_banner?: HeroBannerDTO;
  partner_logos_section?: PartnerLogosSectionDTO;
  video_section?: VideoSectionDTO;
  features_section: FeaturesSectionDTO;
  stats_banner?: StatsBannerDTO;
  steps_section: StepsSectionDTO;
  cta_banner?: CtaBannerDTO;
  seo: SeoDTO;
}

export interface StepItemDTO {
  id: number;
  title: string;
  description?: string;
}

export interface OriginSectionDTO {
  label?: string;
  heading: string;
  body: string;
  bg_image?: CloudinaryMediaDTO;
  problem_heading?: string;
  problem_badge?: string;
  problem_subtitle?: string;
  problem_items: ChecklistItemDTO[];
}

export interface MissionSectionDTO {
  label?: string;
  quote: string;
  body?: string;
  values: FeatureItemDTO[];
  bg_image?: CloudinaryMediaDTO;
}

export interface DiffSectionDTO {
  label?: string;
  heading: string;
  subtext?: string;
  features: FeatureItemDTO[];
  comparison_without: BadgeDTO[];
  comparison_with: BadgeDTO[];
  card_badge?: string;
  card_heading?: string;
  average_saving_heading?: string;
  average_saving_body?: string;
  bg_image?: CloudinaryMediaDTO;
}

export interface AboutPageDTO {
  hero_banner?: HeroBannerDTO;
  stats_banner?: StatsBannerDTO;
  origin_section: OriginSectionDTO;
  mission_section: MissionSectionDTO;
  diff_section: DiffSectionDTO;
  cta_banner?: CtaBannerDTO;
  seo: SeoDTO;
}

export interface BadgeDTO {
  id: number;
  label: string;
}

export type ArticleCategory =
  | 'technology'
  | 'onboarding'
  | 'fuel_and_costs'
  | 'e_signature'
  | 'digital_transformation'
  | 'operations'
  | 'digital';

export interface ArticleDTO {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  body: string;
  cover_image?: CloudinaryMediaDTO;
  category: ArticleCategory;
  author?: string;
  read_time?: number;
  featured: boolean;
  popular: boolean;
  publishedAt: string;
  seo?: SeoDTO;
}

export interface InsightsPageDTO {
  hero_banner?: HeroBannerDTO;
  sidebar_cta_heading?: string;
  sidebar_cta_body?: string;
  sidebar_cta_primary?: CtaButtonDTO;
  sidebar_cta_secondary?: CtaButtonDTO;
  cta_banner?: CtaBannerDTO;
  seo: SeoDTO;
}

export interface RoiCalculatorPageDTO {
  hero_banner?: HeroBannerDTO;
  calculator_label?: string;
  calculator_heading?: string;
  calculator_subtext?: string;
  cta_banner?: CtaBannerDTO;
  seo: SeoDTO;
}

export interface ContactPageDTO {
  intro_text: string;
  email: string;
  phone?: string;
  address?: string;
  seo: SeoDTO;
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
