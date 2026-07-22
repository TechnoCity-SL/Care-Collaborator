import type { Core } from '@strapi/strapi';

interface FieldMeta {
  label: string;
  description?: string;
  placeholder?: string;
}

type FieldMetaMap = Record<string, FieldMeta>;

/**
 * Content-manager "Configure the view" labels/descriptions/placeholders for every
 * reusable component, keyed by component uid (`<category>.<component-name>`).
 */
const componentFieldMeta: Record<string, FieldMetaMap> = {
  'shared.badge': {
    label: {
      label: 'Badge Text',
      description: 'Short pill text shown in badge lists, checklists, and comparison rows.',
      placeholder: 'e.g. No paperwork',
    },
  },
  'shared.checklist-item': {
    title: {
      label: 'Title',
      description: "The checklist row's headline.",
      placeholder: 'e.g. Faster onboarding',
    },
    description: {
      label: 'Description',
      description: 'Supporting detail shown under the title.',
      placeholder: 'Add a short explanation...',
    },
  },
  'shared.cta-banner': {
    heading: {
      label: 'Heading',
      description: 'Main headline of the call-to-action banner.',
      placeholder: 'e.g. Ready to get started?',
    },
    subtext: {
      label: 'Subtext',
      description: 'Supporting line shown under the heading.',
      placeholder: 'Add a short supporting sentence...',
    },
    primary_cta: {
      label: 'Primary Button',
      description: 'Main call-to-action button (e.g. Book Demo).',
    },
    secondary_cta: {
      label: 'Secondary Button',
      description: 'Optional secondary button shown next to the primary one.',
    },
    bg_image: {
      label: 'Background Image',
      description: 'Optional full-bleed background image for the banner. Leave empty for the default light background.',
    },
  },
  'shared.cta-button': {
    label: {
      label: 'Button Label',
      description: 'Text shown on the button.',
      placeholder: 'e.g. Book Demo',
    },
    url: {
      label: 'Button URL',
      description: 'Where the button links to. Use a relative path (/book-demo) or full URL, or tel:/mailto: for calls and emails.',
      placeholder: '/book-demo',
    },
    variant: {
      label: 'Style Variant',
      description: 'Visual style of the button — Primary is the solid/filled style, Secondary is outlined.',
    },
  },
  'shared.diff-section': {
    label: {
      label: 'Eyebrow Label',
      description: 'Small uppercase label shown above the heading.',
      placeholder: 'e.g. WHY CARE COLLABORATOR',
    },
    heading: {
      label: 'Heading',
      description: 'Main headline of the section.',
      placeholder: 'e.g. The difference is clear',
    },
    subtext: {
      label: 'Subtext',
      description: 'Supporting paragraph shown under the heading.',
      placeholder: 'Add a short supporting paragraph...',
    },
    features: {
      label: 'Differentiator Features',
      description: 'List of feature rows shown on the left, each with an icon, title and description.',
    },
    comparison_without: {
      label: '"Without" Items',
      description: 'Badges listed under the "without Care Collaborator" side of the comparison card.',
    },
    comparison_with: {
      label: '"With" Items',
      description: 'Badges listed under the "with Care Collaborator" side of the comparison card.',
    },
    card_badge: {
      label: 'Comparison Card Badge',
      description: 'Small badge shown at the top of the comparison card.',
      placeholder: 'e.g. Side by side',
    },
    card_heading: {
      label: 'Comparison Card Heading',
      description: 'Headline shown at the top of the comparison card.',
      placeholder: 'e.g. See the difference',
    },
    average_saving_heading: {
      label: 'Average Saving Heading',
      description: 'Headline for the average-savings callout at the bottom of the comparison card.',
      placeholder: 'e.g. Average time saved',
    },
    average_saving_body: {
      label: 'Average Saving Body',
      description: 'Supporting text for the average-savings callout.',
      placeholder: 'e.g. 12 hours per week',
    },
    bg_image: {
      label: 'Background Image',
      description: 'Optional full-bleed background image for the section. Leave empty for a plain white background.',
    },
  },
  'shared.feature-item': {
    icon_key: {
      label: 'Icon',
      description: "Icon shown next to the title. Choose the closest match to the feature's meaning.",
    },
    title: {
      label: 'Title',
      description: "The feature's headline.",
      placeholder: 'e.g. Bank-grade security',
    },
    description: {
      label: 'Description',
      description: 'Supporting detail shown under the title.',
      placeholder: 'Add a short explanation...',
    },
  },
  'shared.features-section': {
    label: {
      label: 'Eyebrow Label',
      description: 'Small uppercase label shown above the heading.',
      placeholder: 'e.g. WHY TEAMS CHOOSE US',
    },
    heading: {
      label: 'Heading',
      description: 'Main headline of the section.',
      placeholder: 'e.g. Everything you need to onboard faster',
    },
    heading_highlight: {
      label: 'Highlighted Words',
      description: 'A word or phrase from the Heading to underline in the wavy accent colour. Must match text in the Heading exactly.',
      placeholder: 'e.g. onboard faster',
    },
    subtext: {
      label: 'Subtext',
      description: 'Supporting paragraph shown under the heading.',
      placeholder: 'Add a short supporting paragraph...',
    },
    features: {
      label: 'Feature Cards',
      description: 'Repeatable grid of feature cards, each with an icon, title and description.',
    },
  },
  'shared.footer-column': {
    title: {
      label: 'Column Title',
      description: 'Uppercase heading for this footer link group.',
      placeholder: 'e.g. PRODUCT',
    },
    links: {
      label: 'Links',
      description: 'Links listed under this footer column.',
    },
  },
  'shared.hero-banner': {
    badge: {
      label: 'Trust Badge Text',
      description: 'Small pill shown above the title (e.g. a trust or social-proof statement).',
      placeholder: 'e.g. Trusted by Australian home care providers',
    },
    title: {
      label: 'Title',
      description: 'Main hero headline.',
      placeholder: 'e.g. Onboard clients without leaving the office',
    },
    title_highlight: {
      label: 'Highlighted Words',
      description: 'A word or phrase from the Title to render in the bold accent colour. Must match text in the Title exactly.',
      placeholder: 'e.g. without leaving the office',
    },
    subtitle: {
      label: 'Subtitle',
      description: 'Supporting paragraph shown under the title.',
      placeholder: 'Add a short supporting paragraph...',
    },
    primary_cta: {
      label: 'Primary Button',
      description: 'Main call-to-action button shown in the hero.',
    },
    secondary_cta: {
      label: 'Secondary Button',
      description: 'Optional secondary button shown next to the primary one.',
    },
    image: {
      label: 'Product Image',
      description: 'Screenshot or illustration shown beside the hero text. When set, the hero switches to a two-column layout.',
    },
    bg_image: {
      label: 'Background Image',
      description: 'Optional full-bleed background image for the hero. Leave empty to use the plain or gradient background instead.',
    },
    badges: {
      label: 'Trust Badge Chips',
      description: 'Row of small badge chips shown under the CTA buttons (e.g. certifications or guarantees).',
    },
    badge_style: {
      label: 'Trust Badge Style',
      description: "Visual style used for the trust badge chips when a background image isn't set.",
    },
    use_gradient: {
      label: 'Use Gradient Background',
      description: 'Render the deep blue gradient background instead of the light theme. Ignored if a Background Image is set.',
    },
    clouds: {
      label: 'Parallax Clouds',
      description: 'Decorative cloud graphics layered over the hero that drift on scroll.',
    },
  },
  'shared.link': {
    label: {
      label: 'Link Text',
      description: 'Text shown for this link.',
      placeholder: 'e.g. About',
    },
    url: {
      label: 'URL',
      description: 'Where the link points to. Use a relative path (/about) for internal pages or a full URL for external sites.',
      placeholder: '/about',
    },
    is_external: {
      label: 'Opens Externally',
      description: 'Turn on if this link points to another site — opens in a new tab with rel="noopener noreferrer".',
    },
  },
  'shared.mission-section': {
    label: {
      label: 'Eyebrow Label',
      description: 'Small uppercase label shown above the quote.',
      placeholder: 'e.g. OUR MISSION',
    },
    quote: {
      label: 'Quote',
      description: 'The mission statement, shown as a large pull-quote.',
      placeholder: 'Enter the mission quote...',
    },
    quote_highlight: {
      label: 'Highlighted Words',
      description: 'A word or phrase from the Quote to highlight in green. Must match text in the Quote exactly.',
      placeholder: 'e.g. the person in the room',
    },
    body: {
      label: 'Body Text',
      description: 'Supporting paragraph shown beside the quote. Line breaks are preserved.',
      placeholder: 'Add supporting body copy...',
    },
    values: {
      label: 'Value Cards',
      description: 'Repeatable grid of value/principle cards shown below the quote, each with an icon, title and description.',
    },
    bg_image: {
      label: 'Background Image',
      description: 'Optional full-bleed background image for the section. Leave empty for a plain background.',
    },
    clouds: {
      label: 'Parallax Clouds',
      description: 'Decorative cloud graphics layered over the section that drift on scroll.',
    },
  },
  'shared.origin-section': {
    label: {
      label: 'Eyebrow Label',
      description: 'Small uppercase label shown above the heading.',
      placeholder: 'e.g. OUR STORY',
    },
    heading: {
      label: 'Heading',
      description: 'Main headline of the section.',
      placeholder: 'e.g. Why we built Care Collaborator',
    },
    body: {
      label: 'Body Text',
      description: 'Origin story copy, rendered as Markdown (supports **bold** text and paragraphs).',
      placeholder: 'Tell the origin story...',
    },
    bg_image: {
      label: 'Background Image',
      description: 'Optional full-bleed background image for the section. Leave empty for a plain white background.',
    },
    problem_heading: {
      label: 'Problem Card Heading',
      description: 'Headline shown at the top of the checklist card.',
      placeholder: 'e.g. Problems we solved',
    },
    problem_badge: {
      label: 'Problem Card Badge',
      description: 'Small badge shown floating above the checklist card.',
      placeholder: 'e.g. Then vs now',
    },
    problem_subtitle: {
      label: 'Problem Card Subtitle',
      description: 'Supporting line shown under the checklist card heading.',
      placeholder: 'e.g. What used to slow teams down',
    },
    problem_items: {
      label: 'Checklist Items',
      description: 'Repeatable list of problem/solution rows shown in the checklist card.',
    },
  },
  'shared.parallax-cloud': {
    image: {
      label: 'Cloud Image',
      description: 'Decorative cloud graphic. Use a transparent PNG or SVG for best results.',
    },
    top: {
      label: 'Top Offset',
      description: 'CSS `top` position (e.g. 10%, 40px). Leave blank if using Bottom Offset instead.',
    },
    bottom: {
      label: 'Bottom Offset',
      description: 'CSS `bottom` position (e.g. 10%, 40px). Leave blank if using Top Offset instead.',
    },
    left: {
      label: 'Left Offset',
      description: 'CSS `left` position (e.g. 5%, -20px). Leave blank if using Right Offset instead.',
    },
    right: {
      label: 'Right Offset',
      description: 'CSS `right` position (e.g. 5%, -20px). Leave blank if using Left Offset instead.',
    },
    speed: {
      label: 'Parallax Speed',
      description:
        'How fast the cloud drifts as the page scrolls. 0 = stays still, 1 = moves at normal scroll speed. Typical range 0.1-0.6; negative values drift upward instead of down.',
    },
    z_index: {
      label: 'Stacking Order',
      description: 'Controls layering when clouds overlap other elements — higher numbers appear on top. Default 0.',
    },
  },
  'shared.partner-logos-section': {
    heading: {
      label: 'Heading',
      description: 'Optional small uppercase label shown above the logo marquee.',
      placeholder: 'e.g. TRUSTED BY LEADING PROVIDERS',
    },
    logos: {
      label: 'Partner Logos',
      description: 'Logo images shown in the scrolling marquee. Leave empty to show placeholder logos.',
    },
    speed: {
      label: 'Scroll Speed',
      description: 'How fast the logo marquee scrolls.',
    },
    direction: {
      label: 'Scroll Direction',
      description: 'Direction the logo marquee scrolls.',
    },
    pause_on_hover: {
      label: 'Pause On Hover',
      description: "Pause the scrolling marquee while a visitor's cursor is over it.",
    },
  },
  'shared.seo': {
    title: {
      label: 'Meta Title',
      description: 'Title shown in the browser tab and search engine results. Keep it under ~60 characters.',
      placeholder: 'e.g. Care Collaborator — Digital onboarding for aged care',
    },
    description: {
      label: 'Meta Description',
      description: 'Summary shown in search engine results. Keep it under ~160 characters.',
      placeholder: 'Add a search-friendly summary of this page...',
    },
    og_image: {
      label: 'Social Share Image',
      description: 'Image shown when this page is shared on social media (Open Graph / Twitter card). Recommended size 1200×630.',
    },
    no_index: {
      label: 'Hide From Search Engines',
      description: 'Turn on to stop this page being indexed by search engines (adds a noindex tag).',
    },
    canonicalURL: {
      label: 'Canonical URL',
      description: 'Overrides the canonical link for this page. Leave empty unless this content is duplicated elsewhere.',
      placeholder: 'https://carecollaborator.com.au/...',
    },
  },
  'shared.stat-item': {
    value: {
      label: 'Stat Value',
      description: 'The headline figure.',
      placeholder: 'e.g. 30%',
    },
    label: {
      label: 'Stat Label',
      description: 'Short caption shown under the value.',
      placeholder: 'e.g. faster onboarding',
    },
  },
  'shared.stats-banner': {
    label: {
      label: 'Eyebrow Label',
      description: 'Small uppercase label shown above the heading.',
      placeholder: 'e.g. THE NUMBERS',
    },
    heading: {
      label: 'Heading',
      description: 'Headline shown above the stat row.',
      placeholder: 'e.g. Results that speak for themselves',
    },
    stats: {
      label: 'Stat Items',
      description: 'Repeatable row of statistics, each with a value and a label.',
    },
    bg_image: {
      label: 'Background Image',
      description: 'Optional full-bleed background image. Only used when the Theme is set to Gradient.',
    },
    theme: {
      label: 'Theme',
      description: 'Gradient uses the background image/colour theme; Plain uses a white background with a bottom border.',
    },
  },
  'shared.step-item': {
    title: {
      label: 'Step Title',
      description: "The step's headline.",
      placeholder: 'e.g. Send the referral',
    },
    description: {
      label: 'Description',
      description: 'Supporting detail shown under the step title.',
      placeholder: 'Add a short explanation...',
    },
  },
  'shared.steps-section': {
    label: {
      label: 'Eyebrow Label',
      description: 'Small uppercase label shown above the heading.',
      placeholder: 'e.g. HOW IT WORKS',
    },
    heading: {
      label: 'Heading',
      description: 'Main headline of the section.',
      placeholder: 'e.g. From referral to billable client in minutes',
    },
    heading_highlight: {
      label: 'Highlighted Words',
      description: 'A word or phrase from the Heading to underline in the wavy accent colour. Must match text in the Heading exactly.',
      placeholder: 'e.g. in minutes',
    },
    steps: {
      label: 'Steps',
      description: 'Repeatable, numbered list of process steps shown left to right.',
    },
  },
  'shared.video-section': {
    label: {
      label: 'Eyebrow Label',
      description: 'Small uppercase label shown above the heading.',
      placeholder: 'e.g. SEE IT IN ACTION',
    },
    heading: {
      label: 'Heading',
      description: 'Main headline of the section.',
      placeholder: 'e.g. Watch how Care Collaborator works',
    },
    heading_highlight: {
      label: 'Highlighted Words',
      description: 'A word or phrase from the Heading to underline in the wavy accent colour. Must match text in the Heading exactly.',
      placeholder: 'e.g. Care Collaborator',
    },
    subtext: {
      label: 'Subtext',
      description: 'Supporting line shown under the heading.',
      placeholder: 'e.g. Two minutes from referral to billable client',
    },
    video_url: {
      label: 'YouTube URL',
      description: 'A YouTube video URL to embed. Ignored if a Video File is uploaded instead.',
      placeholder: 'https://youtu.be/...',
    },
    video_file: {
      label: 'Video File',
      description: 'Self-hosted video file to play instead of a YouTube embed. Takes priority over the YouTube URL.',
    },
  },
};

/**
 * Content-manager "Configure the view" labels/descriptions/placeholders for every
 * page (content type), keyed by content-type uid (`api::<name>.<name>`).
 */
const contentTypeFieldMeta: Record<string, FieldMetaMap> = {
  'api::about-page.about-page': {
    hero_banner: { label: 'Hero Banner', description: 'Top hero section of the About page.' },
    stats_banner: { label: 'Stats Banner', description: 'Statistics row shown below the hero.' },
    origin_section: { label: 'Origin Story Section', description: 'Company origin story and problem-solved checklist.' },
    mission_section: { label: 'Mission Section', description: 'Mission quote and value cards.' },
    diff_section: { label: 'Difference Section', description: 'Differentiator features and before/after comparison card.' },
    cta_banner: { label: 'Call-To-Action Banner', description: 'Closing call-to-action banner at the bottom of the page.' },
    seo: { label: 'SEO', description: 'Search engine and social sharing metadata for this page.' },
  },
  'api::article.article': {
    title: {
      label: 'Title',
      description: 'Article headline shown in listings and at the top of the article.',
      placeholder: 'e.g. 5 ways digital onboarding cuts admin time',
    },
    slug: {
      label: 'URL Slug',
      description: "Auto-generated from the Title. Used in the article's URL (/insights/[slug]).",
    },
    excerpt: {
      label: 'Excerpt',
      description: 'Short summary shown in article listings and cards.',
      placeholder: 'Add a one- or two-sentence summary...',
    },
    body: {
      label: 'Body',
      description: 'Full article content, rendered as rich text.',
    },
    cover_image: {
      label: 'Cover Image',
      description: 'Hero image shown at the top of the article and in listing cards.',
    },
    category: {
      label: 'Category',
      description: 'Topic used to group and filter articles.',
    },
    author: {
      label: 'Author Name',
      description: "Name of the article's author.",
      placeholder: 'e.g. Jane Smith',
    },
    author_role: {
      label: 'Author Role',
      description: "Job title shown next to the author's name.",
      placeholder: 'e.g. Head of Product',
    },
    read_time: {
      label: 'Read Time (minutes)',
      description: 'Estimated reading time shown on the article page.',
      placeholder: 'e.g. 5',
    },
    read_count: {
      label: 'Read Count',
      description: 'Number of reads shown on the popular-articles list (e.g. "1,204 reads"). Leave empty to hide.',
      placeholder: 'e.g. 1200',
    },
    featured: {
      label: 'Featured',
      description: 'Shows this article as the single highlighted article at the top of the Insights page. Only one article should be featured at a time.',
    },
    popular: {
      label: 'Popular',
      description: 'Includes this article in the "Popular" list on the Insights page (up to 4 shown, most recent first).',
    },
    seo: { label: 'SEO', description: 'Search engine and social sharing metadata for this article.' },
  },
  'api::global.global': {
    nav_links: {
      label: 'Navigation Links',
      description: 'Links shown in the main header navigation.',
    },
    nav_cta: {
      label: 'Navigation Button',
      description: 'Call-to-action button shown at the right of the header (e.g. Book Demo).',
    },
    footer_logo: {
      label: 'Footer Logo',
      description: 'Logo image shown in the footer. Leave empty to fall back to the "Care Collaborator" text mark.',
    },
    footer_tagline: {
      label: 'Footer Tagline',
      description: 'Short description shown next to the logo in the footer.',
      placeholder: 'Add a one-sentence company tagline...',
    },
    footer_columns: {
      label: 'Footer Link Columns',
      description: 'Grouped columns of links shown in the footer.',
    },
    footer_email: {
      label: 'Footer Email',
      description: 'Contact email shown in the footer.',
      placeholder: 'hello@carecollaborator.com.au',
    },
    footer_phone: {
      label: 'Footer Phone',
      description: 'Contact phone number shown in the footer.',
      placeholder: '1300 664 130',
    },
    footer_address: {
      label: 'Footer Address',
      description: 'Physical/mailing address shown in the footer.',
      placeholder: 'Melbourne, Australia',
    },
  },
  'api::home-page.home-page': {
    hero_banner: { label: 'Hero Banner', description: 'Top hero section of the homepage.' },
    partner_logos_section: { label: 'Partner Logos Section', description: 'Scrolling marquee of partner/client logos.' },
    video_section: { label: 'Video Section', description: 'Product demo video section.' },
    features_section: { label: 'Features Section', description: 'Feature grid section.' },
    stats_banner: { label: 'Stats Banner', description: 'Statistics row.' },
    steps_section: { label: 'Steps Section', description: '"How it works" numbered steps section.' },
    cta_banner: { label: 'Call-To-Action Banner', description: 'Closing call-to-action banner at the bottom of the page.' },
    seo: { label: 'SEO', description: 'Search engine and social sharing metadata for this page.' },
  },
  'api::insights-page.insights-page': {
    hero_banner: { label: 'Hero Banner', description: 'Top hero section of the Insights (blog listing) page.' },
    sidebar_cta_heading: {
      label: 'Sidebar CTA Heading',
      description: 'Headline shown in the call-to-action card in the article sidebar.',
      placeholder: 'e.g. Ready to see it in action?',
    },
    sidebar_cta_body: {
      label: 'Sidebar CTA Body',
      description: 'Supporting text shown under the sidebar CTA heading.',
      placeholder: 'Add a short supporting sentence...',
    },
    sidebar_cta_primary: {
      label: 'Sidebar CTA Primary Button',
      description: 'Main button shown in the sidebar call-to-action card.',
    },
    sidebar_cta_secondary: {
      label: 'Sidebar CTA Secondary Button',
      description: 'Optional secondary button shown in the sidebar call-to-action card.',
    },
    seo: { label: 'SEO', description: 'Search engine and social sharing metadata for this page.' },
  },
  'api::privacy-page.privacy-page': {
    hero_banner: { label: 'Hero Banner', description: 'Top hero section of the Privacy Policy page.' },
    body: { label: 'Body', description: 'Full privacy policy content, rendered as rich text.' },
    seo: { label: 'SEO', description: 'Search engine and social sharing metadata for this page.' },
  },
  'api::roi-calculator-page.roi-calculator-page': {
    hero_banner: { label: 'Hero Banner', description: 'Top hero section of the ROI Calculator page.' },
    seo: { label: 'SEO', description: 'Search engine and social sharing metadata for this page.' },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyFieldMeta(configuration: any, fieldMeta: FieldMetaMap): boolean {
  let changed = false;

  for (const [field, meta] of Object.entries(fieldMeta)) {
    const edit = configuration.metadatas?.[field]?.edit;
    if (!edit) continue;

    if (edit.label !== meta.label) {
      edit.label = meta.label;
      changed = true;
    }
    if (meta.description !== undefined && edit.description !== meta.description) {
      edit.description = meta.description;
      changed = true;
    }
    if (meta.placeholder !== undefined && edit.placeholder !== meta.placeholder) {
      edit.placeholder = meta.placeholder;
      changed = true;
    }
  }

  return changed;
}

export async function configureContentManagerView(strapi: Core.Strapi) {
  const componentsService = strapi
    .plugin('content-manager')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .service('components') as any;
  const contentTypesService = strapi
    .plugin('content-manager')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .service('content-types') as any;

  for (const [uid, fieldMeta] of Object.entries(componentFieldMeta)) {
    const component = componentsService.findComponent(uid);
    if (!component) {
      strapi.log.warn(`[config] Component "${uid}" not found — skipping view configuration.`);
      continue;
    }
    const configuration = await componentsService.findConfiguration(component);
    if (applyFieldMeta(configuration, fieldMeta)) {
      await componentsService.updateConfiguration(component, configuration);
      strapi.log.info(`[config] Updated view labels for component "${uid}".`);
    }
  }

  for (const [uid, fieldMeta] of Object.entries(contentTypeFieldMeta)) {
    const contentType = contentTypesService.findContentType(uid);
    if (!contentType) {
      strapi.log.warn(`[config] Content type "${uid}" not found — skipping view configuration.`);
      continue;
    }
    const configuration = await contentTypesService.findConfiguration(contentType);
    if (applyFieldMeta(configuration, fieldMeta)) {
      await contentTypesService.updateConfiguration(contentType, configuration);
      strapi.log.info(`[config] Updated view labels for content type "${uid}".`);
    }
  }
}
