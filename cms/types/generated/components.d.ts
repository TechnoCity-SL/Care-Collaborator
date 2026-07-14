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

export interface SharedChecklistItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_checklist_items';
  info: {
    description: 'A titled checklist row with a supporting description';
    displayName: 'Checklist Item';
    icon: 'check';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface SharedDiffSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_diff_sections';
  info: {
    description: 'Differentiator features with a before/after comparison card';
    displayName: 'Difference Section';
    icon: 'puzzle';
  };
  attributes: {
    average_saving_body: Schema.Attribute.Text;
    average_saving_heading: Schema.Attribute.String;
    bg_image: Schema.Attribute.Media<'images'>;
    card_badge: Schema.Attribute.String;
    card_heading: Schema.Attribute.String;
    comparison_with: Schema.Attribute.Component<'shared.badge', true>;
    comparison_without: Schema.Attribute.Component<'shared.badge', true>;
    features: Schema.Attribute.Component<'shared.feature-item', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String;
    subtext: Schema.Attribute.Text;
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
    icon_key: Schema.Attribute.Enumeration<
      [
        'data_sovereignty',
        'e_signature',
        'russell_kennedy',
        'budget_scenarios',
        'integrations',
        'risks_alerts',
        'people',
        'australia',
        'scales',
        'speed',
        'star',
        'check_circle',
        'shield',
        'heart_care',
      ]
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFeaturesSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_features_sections';
  info: {
    description: 'Feature grid with heading and repeatable feature cards';
    displayName: 'Features Section';
    icon: 'grid';
  };
  attributes: {
    features: Schema.Attribute.Component<'shared.feature-item', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    heading_highlight: Schema.Attribute.String;
    label: Schema.Attribute.String;
    subtext: Schema.Attribute.Text;
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
    badge_style: Schema.Attribute.Enumeration<['current', 'figma']> &
      Schema.Attribute.DefaultTo<'current'>;
    badges: Schema.Attribute.Component<'shared.badge', true>;
    bg_image: Schema.Attribute.Media<'images'>;
    clouds: Schema.Attribute.Component<'shared.parallax-cloud', true>;
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

export interface SharedMissionSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_mission_sections';
  info: {
    description: 'Mission quote, body copy, and repeatable value cards';
    displayName: 'Mission Section';
    icon: 'star';
  };
  attributes: {
    bg_image: Schema.Attribute.Media<'images'>;
    body: Schema.Attribute.Text;
    clouds: Schema.Attribute.Component<'shared.parallax-cloud', true>;
    label: Schema.Attribute.String;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
    values: Schema.Attribute.Component<'shared.feature-item', true>;
  };
}

export interface SharedOriginSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_origin_sections';
  info: {
    description: 'Company origin story with a problem-solved checklist card';
    displayName: 'Origin Section';
    icon: 'book';
  };
  attributes: {
    bg_image: Schema.Attribute.Media<'images'>;
    body: Schema.Attribute.RichText;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String;
    problem_badge: Schema.Attribute.String;
    problem_heading: Schema.Attribute.String;
    problem_items: Schema.Attribute.Component<'shared.checklist-item', true>;
    problem_subtitle: Schema.Attribute.String;
  };
}

export interface SharedParallaxCloud extends Struct.ComponentSchema {
  collectionName: 'components_shared_parallax_clouds';
  info: {
    description: 'A decorative cloud image layered over a hero banner that drifts at its own speed on scroll';
    displayName: 'Parallax Cloud';
    icon: 'cloud';
  };
  attributes: {
    bottom: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    left: Schema.Attribute.String;
    right: Schema.Attribute.String;
    speed: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<0.3>;
    top: Schema.Attribute.String;
    z_index: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
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
    heading: Schema.Attribute.String;
    label: Schema.Attribute.String;
    stats: Schema.Attribute.Component<'shared.stat-item', true>;
    theme: Schema.Attribute.Enumeration<['gradient', 'plain']> &
      Schema.Attribute.DefaultTo<'gradient'>;
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

export interface SharedStepsSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_steps_sections';
  info: {
    description: 'How-it-works section with heading and repeatable numbered steps';
    displayName: 'Steps Section';
    icon: 'bulletList';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    heading_highlight: Schema.Attribute.String;
    label: Schema.Attribute.String;
    steps: Schema.Attribute.Component<'shared.step-item', true>;
  };
}

export interface SharedVideoSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_video_sections';
  info: {
    description: 'Product demo video with heading and optional YouTube or self-hosted file';
    displayName: 'Video Section';
    icon: 'play';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    heading_highlight: Schema.Attribute.String;
    label: Schema.Attribute.String;
    subtext: Schema.Attribute.Text;
    video_file: Schema.Attribute.Media<'videos' | 'images'>;
    video_url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.badge': SharedBadge;
      'shared.checklist-item': SharedChecklistItem;
      'shared.cta-banner': SharedCtaBanner;
      'shared.cta-button': SharedCtaButton;
      'shared.diff-section': SharedDiffSection;
      'shared.feature-item': SharedFeatureItem;
      'shared.features-section': SharedFeaturesSection;
      'shared.footer-column': SharedFooterColumn;
      'shared.hero-banner': SharedHeroBanner;
      'shared.link': SharedLink;
      'shared.mission-section': SharedMissionSection;
      'shared.origin-section': SharedOriginSection;
      'shared.parallax-cloud': SharedParallaxCloud;
      'shared.partner-logos-section': SharedPartnerLogosSection;
      'shared.seo': SharedSeo;
      'shared.stat-item': SharedStatItem;
      'shared.stats-banner': SharedStatsBanner;
      'shared.step-item': SharedStepItem;
      'shared.steps-section': SharedStepsSection;
      'shared.video-section': SharedVideoSection;
    }
  }
}
