import type { Schema, Struct } from '@strapi/strapi';

export interface SharedBadge extends Struct.ComponentSchema {
  collectionName: 'components_shared_badges';
  info: {
    description: 'A text label used for pills, checklist items and comparison rows';
    displayName: 'Badge';
    icon: 'tag';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCtaBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta_banners';
  info: {
    description: 'Call-to-action banner used at the bottom of pages';
    displayName: 'CTA Banner';
    icon: 'megaphone';
  };
  attributes: {
    bg_image: Schema.Attribute.Media<'images'>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    primary_cta: Schema.Attribute.Component<'shared.cta-button', false>;
    secondary_cta: Schema.Attribute.Component<'shared.cta-button', false>;
    subtext: Schema.Attribute.String;
  };
}

export interface SharedCtaButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta_buttons';
  info: {
    description: 'A call-to-action button with label, URL and style variant';
    displayName: 'CTA Button';
    icon: 'cursor';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<['primary', 'secondary']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_feature_items';
  info: {
    description: 'Icon, title and description \u2014 used in feature grids and value cards';
    displayName: 'Feature Item';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_columns';
  info: {
    description: 'A titled group of links in the footer';
    displayName: 'Footer Column';
    icon: 'layout';
  };
  attributes: {
    links: Schema.Attribute.Component<'shared.link', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedHeroBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_hero_banners';
  info: {
    description: 'Page hero section with title, optional CTAs, images, and badge chips';
    displayName: 'Hero Banner';
    icon: 'layout';
  };
  attributes: {
    badge: Schema.Attribute.String;
    badges: Schema.Attribute.Component<'shared.badge', true>;
    bg_image: Schema.Attribute.Media<'images'>;
    image: Schema.Attribute.Media<'images'>;
    primary_cta: Schema.Attribute.Component<'shared.cta-button', false>;
    secondary_cta: Schema.Attribute.Component<'shared.cta-button', false>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    title_highlight: Schema.Attribute.String;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    description: 'A navigation or footer link';
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    is_external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedPartnerLogosSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_partner_logos_sections';
  info: {
    description: 'Infinite-scroll partner logo marquee with CMS-controlled behaviour';
    displayName: 'Partner Logos Section';
    icon: 'apps';
  };
  attributes: {
    direction: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.DefaultTo<'left'>;
    heading: Schema.Attribute.String;
    logos: Schema.Attribute.Media<'images', true>;
    pause_on_hover: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    speed: Schema.Attribute.Enumeration<['slow', 'normal', 'fast']> &
      Schema.Attribute.DefaultTo<'normal'>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'SEO metadata for any page';
    displayName: 'Seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    no_index: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    og_image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStatItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_stat_items';
  info: {
    description: "A single statistic \u2014 value (e.g. '30%') and label";
    displayName: 'Stat Item';
    icon: 'chartBubble';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStatsBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats_banners';
  info: {
    description: 'Statistics section with heading, stat items, and optional background image';
    displayName: 'Stats Banner';
    icon: 'chartBubble';
  };
  attributes: {
    bg_image: Schema.Attribute.Media<'images'>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String;
    stats: Schema.Attribute.Component<'shared.stat-item', true>;
  };
}

export interface SharedStepItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_step_items';
  info: {
    description: 'A numbered process step with title and description';
    displayName: 'Step Item';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.badge': SharedBadge;
      'shared.cta-banner': SharedCtaBanner;
      'shared.cta-button': SharedCtaButton;
      'shared.feature-item': SharedFeatureItem;
      'shared.footer-column': SharedFooterColumn;
      'shared.hero-banner': SharedHeroBanner;
      'shared.link': SharedLink;
      'shared.partner-logos-section': SharedPartnerLogosSection;
      'shared.seo': SharedSeo;
      'shared.stat-item': SharedStatItem;
      'shared.stats-banner': SharedStatsBanner;
      'shared.step-item': SharedStepItem;
    }
  }
}
