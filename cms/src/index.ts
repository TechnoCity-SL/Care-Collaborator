import type { Core } from '@strapi/strapi';

const globalSeed = {
  nav_links: [
    { label: 'About', url: '/about', is_external: false },
    { label: 'Insights', url: '/insights', is_external: false },
    { label: 'ROI Calculator', url: '/roi-calculator', is_external: false },
  ],
  nav_cta: { label: 'Book Demo', url: '/book-demo', variant: 'primary' as const },
  footer_tagline:
    'Digital onboarding for Australian aged care and disability providers. Built for compliance, designed for people.',
  footer_columns: [
    {
      title: 'PRODUCT',
      links: [
        { label: 'Features', url: '/features', is_external: false },
        { label: 'Integrations', url: '/integrations', is_external: false },
        { label: 'Pricing', url: '/pricing', is_external: false },
        { label: 'Sign up', url: '/sign-up', is_external: false },
      ],
    },
    {
      title: 'COMPANY',
      links: [
        { label: 'About', url: '/about', is_external: false },
        { label: 'Clients', url: '/clients', is_external: false },
        { label: 'Insights', url: '/insights', is_external: false },
        { label: 'FAQs', url: '/faqs', is_external: false },
      ],
    },
    {
      title: 'SUPPORT',
      links: [
        { label: 'Book a demo', url: '/book-demo', is_external: false },
        { label: 'Book training', url: '/book-training', is_external: false },
        { label: 'Partner with us', url: '/partner', is_external: false },
        { label: 'Privacy policy', url: '/privacy', is_external: false },
      ],
    },
  ],
  footer_email: 'hello@carecollaborator.com.au',
  footer_phone: '1300 664 130',
  footer_address: 'Melbourne, Australia',
};

const homePageSeed = {
  hero_banner: {
    badge: 'Trusted by Australian home care providers',
    title: 'See every unsigned contract. Onboard clients without leaving the office.',
    title_highlight: 'Onboard clients',
    subtitle:
      'Care Collaborator turns home care onboarding into a digital, audit-ready process — so managers know exactly which contracts are outstanding, and clients are billable from day one.',
    primary_cta: { label: 'Book a 30-minute demo', url: '/book-demo', variant: 'primary' as const },
    secondary_cta: { label: 'See how it works', url: '#video', variant: 'secondary' as const },
  },
  video_section_label: 'SEE IT IN ACTION',
  video_heading: 'Watch how Care Collaborator works.',
  video_subtext:
    'Two minutes from referral to billable client – the same flow a coordinator runs every day.',
  video_url: 'https://www.youtube.com/embed/placeholder',
  features_label: 'WHY CARE COLLABORATOR',
  features_heading: 'Everything your team needs, from day one',
  features_subtext:
    "Home care onboarding is complex. We've built one tool that handles every step so your advisors focus on people, not paperwork.",
  features: [
    {
      title: 'Australian data sovereignty',
      description:
        'Data stored on Australian servers, fully compliant with aged care privacy legislation and the Privacy Act 1988.',
    },
    {
      title: 'Integrated e-signature',
      description:
        'Finalise agreements on the spot with built-in e-signature. No return visits, no printing, no chasing signatures.',
    },
    {
      title: 'Russell Kennedy agreements',
      description:
        'Legal agreements and updates from aged care specialists, automatically updated with every legislative change.',
    },
    {
      title: '"What-if" budget scenarios',
      description:
        'Let care recipients see how budget decisions affect their care – live, on the first visit.',
    },
    {
      title: 'Seamless integrations',
      description:
        'Connect to your rostering, scheduling, and finance systems via secure API – one source of truth.',
    },
    {
      title: 'Risks & alerts tracking',
      description:
        "Track categories, and note each care recipient's risks – audit ready at all times.",
    },
  ],
  stats_banner: {
    label: 'THE NUMBERS',
    heading: 'Digital onboarding delivers measurable savings',
    stats: [
      { value: '30%', label: 'Reduction in onboarding costs' },
      { value: '2×', label: 'Fewer return visits per client' },
      { value: '1', label: 'Visit to complete full onboarding' },
      { value: '0', label: 'Paper forms. Fully digital.' },
    ],
  },
  steps_label: 'HOW IT WORKS',
  steps_heading: 'First visit to fully onboarded, in four steps',
  steps: [
    {
      title: 'Collect consumer info',
      description:
        'Capture all details digitally during the home visit using a guided, intuitive form.',
    },
    {
      title: 'Build the budget',
      description:
        'Run live "what-if" scenarios to find the right balance of care and cost.',
    },
    {
      title: 'Sign the agreement',
      description:
        'Generate and e-sign a Russell Kennedy compliant agreement on the spot.',
    },
    {
      title: 'Start delivering care',
      description:
        'Sync with your systems and begin claiming government subsidies that same day.',
    },
  ],
  cta_banner: {
    heading: 'Ready to transform your onboarding?',
    subtext: 'See Care Collaborator in action with a personalised 30-minute demo.',
    primary_cta: { label: 'Book a demo', url: '/book-demo', variant: 'primary' as const },
    secondary_cta: { label: 'Call 1300 664 130', url: 'tel:1300664130', variant: 'secondary' as const },
  },
  seo: {
    title: 'Care Collaborator — Digital Onboarding for Home Care',
    description:
      'Care Collaborator turns home care onboarding into a digital, audit-ready process. See every unsigned contract and onboard clients without leaving the office.',
    no_index: false,
  },
};

const roiCalculatorPageSeed = {
  hero_banner: {
    badge: 'CALCULATE YOUR SAVINGS',
    title: 'See how much Care Collaborator saves your organisation',
    title_highlight: 'saves your organisation',
    subtitle:
      "Enter your organisation's details below and see your projected savings — in time, in return visits, and in onboarding cost — within 60 seconds.",
  },
  calculator_label: 'YOUR NUMBERS',
  calculator_heading: 'Adjust the sliders to match your organisation',
  calculator_subtext:
    'All figures are estimates based on industry averages. Your actual savings will vary based on your current workflows, team size, and participant volume.',
  cta_banner: {
    heading: 'Ready to see your actual savings?',
    subtext: 'Book a personalised demo and we\'ll walk through the numbers with your real figures.',
    primary_cta: { label: 'Book a demo', url: '/book-demo', variant: 'primary' as const },
    secondary_cta: { label: 'Call 1300 664 130', url: 'tel:1300664130', variant: 'secondary' as const },
  },
  seo: {
    title: 'ROI Calculator — Care Collaborator',
    description:
      'Calculate how much time and money your organisation saves by switching to digital onboarding with Care Collaborator.',
    no_index: false,
  },
};

const insightsPageSeed = {
  hero_banner: {
    badge: 'OUR BLOG',
    title: 'Resources for Home care professionals',
    title_highlight: 'Home care professionals',
    subtitle:
      'Aged care news, onboarding tips, compliance updates, and practical guides — written for coordinators, managers, and care teams across Australia.',
  },
  sidebar_cta_heading: 'SEE IT IN ACTION',
  sidebar_cta_body:
    'Watch how coordinators onboard participants in a single visit — e-signature, budget scenarios and all.',
  sidebar_cta_primary: { label: 'Book a 30-minute demo', url: '/book-demo', variant: 'primary' as const },
  sidebar_cta_secondary: { label: 'Watch 2-min video', url: '#video', variant: 'secondary' as const },
  cta_banner: {
    heading: 'Ready to transform your onboarding?',
    subtext: 'See Care Collaborator in action with a personalised 30-minute demo.',
    primary_cta: { label: 'Book a demo', url: '/book-demo', variant: 'primary' as const },
    secondary_cta: { label: 'Call 1300 664 130', url: 'tel:1300664130', variant: 'secondary' as const },
  },
  seo: {
    title: 'Insights — Care Collaborator',
    description:
      'Aged care news, onboarding tips, compliance updates and practical guides for coordinators and managers across Australia.',
    no_index: false,
  },
};

const articlesSeed = [
  {
    title: 'Stop double-handling data and wasting precious time',
    slug: 'stop-double-handling-data',
    excerpt: 'When your systems don\'t talk to each other, your team pays the price.',
    body: "When your systems don't talk to each other, your team is forced to rekey the same data across multiple platforms — burning hours every week on avoidable admin. Care Collaborator eliminates the problem at the source with deep integrations that create one source of truth from intake to claim.\n\nThe result? Coordinators spend their time on care, not copy-paste.",
    category: 'technology' as const,
    author: 'Sarah Rendell',
    read_time: 5,
    featured: true,
    popular: true,
  },
  {
    title: 'Are you double handling data and wasting precious time?',
    slug: 'double-handling-data-wasting-time',
    excerpt: 'When your systems don\'t talk to each other, your team pays the price.',
    body: "Double-handling data is one of the most common — and costly — inefficiencies in home care administration. Every time a coordinator enters the same information into two systems, you're paying twice: once in time, once in risk.\n\nThe solution isn't working harder. It's working smarter with the right integrations.",
    category: 'technology' as const,
    author: 'Sarah Rendell',
    read_time: 5,
    featured: false,
    popular: true,
  },
  {
    title: 'How to prepare for a seamless participant sign-up',
    slug: 'seamless-participant-sign-up',
    excerpt: 'The secret to a seamless participant sign-up isn\'t just in the preparation.',
    body: "A seamless participant sign-up starts before the first home visit. It starts with having the right tools — ones that guide coordinators through every step, prompt for missing information, and capture signatures on the spot.\n\nHere's what the best providers do differently.",
    category: 'onboarding' as const,
    author: 'Sarah Rendell',
    read_time: 4,
    featured: false,
    popular: true,
  },
  {
    title: 'Managing margins: stop unapproved service leakage hurting your bottom line',
    slug: 'stop-unapproved-service-leakage',
    excerpt: 'When a participant receives care that wasn\'t officially approved, the provider is often left holding the bill.',
    body: "Unapproved service leakage is a silent margin killer. It happens when care is delivered beyond the approved plan — often with good intentions — but without the documentation to back it up.\n\nThe fix is visibility: real-time budget tracking and automated alerts that flag risk before it becomes a loss.",
    category: 'operations' as const,
    author: 'Priya L.',
    read_time: 6,
    featured: false,
    popular: false,
  },
  {
    title: 'Time to change to a digital landscape?',
    slug: 'time-to-go-digital',
    excerpt: 'Many home care providers are unintentionally sabotaging their own growth by clinging to manual processes.',
    body: "The home care sector is at a digital inflection point. Providers who cling to paper-based processes are paying a hidden tax — in time, in errors, in staff frustration, and in slower growth.\n\nDigital transformation doesn't have to be overwhelming. It starts with one workflow.",
    category: 'digital' as const,
    author: 'James M.',
    read_time: 5,
    featured: false,
    popular: false,
  },
  {
    title: 'Rising fuel costs: a direct threat to aged care sustainability',
    slug: 'rising-fuel-costs-aged-care',
    excerpt: 'With petrol prices surging, Support at Home providers are facing a logistical crisis.',
    body: "Every 'quick trip' for a signature is costing providers more than they think. When fuel prices rise, the hidden cost of return visits becomes impossible to ignore.\n\nProviders who eliminate unnecessary travel through digital onboarding aren't just saving time — they're protecting their margins.",
    category: 'fuel_and_costs' as const,
    author: 'Sarah R.',
    read_time: 4,
    featured: false,
    popular: true,
  },
  {
    title: 'Eliminating on-site visits with built-in e-signature functionality',
    slug: 'eliminate-on-site-visits-e-signature',
    excerpt: 'Tired of driving to get participant signatures? Care Collaborator\'s built-in e-signature means agreements are finalised on the spot.',
    body: "The wet signature is the single biggest bottleneck in home care onboarding. It forces return visits, delays activation, and frustrates coordinators.\n\nBuilt-in e-signature changes everything. Agreements are signed on a tablet, on the spot, on the first visit — and stored securely in the audit trail.",
    category: 'e_signature' as const,
    author: 'Priya L.',
    read_time: 3,
    featured: false,
    popular: false,
  },
  {
    title: 'Stop making do with clunky onboarding — go smooth, save money',
    slug: 'stop-clunky-onboarding',
    excerpt: 'Are you making do with manual onboarding and paying for expensive add-on e-signature functionality?',
    body: "Bolting e-signature onto a spreadsheet workflow is like putting a jet engine on a bicycle. It's faster, sure — but the fundamental problem remains.\n\nSmooth onboarding isn't about adding tools to a broken process. It's about replacing the process entirely with one that's built for the first visit.",
    category: 'onboarding' as const,
    author: 'Sarah R.',
    read_time: 4,
    featured: false,
    popular: false,
  },
];

const aboutPageSeed = {
  hero_banner: {
    badge: 'OUR STORY',
    title: 'Empowering care, one digital signature at a time.',
    title_highlight: 'digital signature',
    subtitle:
      'Founded in 2015, Care Collaborator was born from a simple observation: home care providers were drowning in paperwork while participants waited for care. We set out to change that — forever.',
    badges: [
      { label: 'Founded 2015' },
      { label: 'Australian-owned' },
      { label: 'Melbourne HQ' },
      { label: 'Russell Kennedy partner' },
    ],
  },
  stats_banner: {
    theme: 'plain' as const,
    stats: [
      { value: '500+', label: 'Providers using Care Collaborator' },
      { value: '30%', label: 'Average reduction in onboarding costs' },
      { value: '1', label: 'Single visit to complete onboarding' },
      { value: '10+', label: 'Years building for Australian care' },
    ],
  },
  origin_label: 'OUR ORIGIN',
  origin_heading: 'Born from a real problem in aged care',
  origin_body:
    "In 2015, our founders watched care coordinators leave first home visits carrying stacks of partially-filled forms — only to return days later with the right paperwork. Participants waited. Providers paid. Nobody won.\n\nThe insight was simple: **the tools being used for onboarding were designed for an era before cloud software, mobile devices, and digital signatures existed.** Spreadsheets. Word docs. Wet ink. Repeat home visits just to get a signature.\n\nWe built Care Collaborator to replace that entire workflow with a single, seamless platform — one that handles everything from care planning and individualised budgets through to the legally compliant final signature, right there in the participant's home, on the first visit.\n\nToday we partner with providers of all sizes across Australia — from small community operators to large national organisations — and we're still guided by that original mission: **handle the compliance and calculations so your team can focus on the person in the room.**",
  problem_heading: 'The problem we solved',
  problem_badge: 'Founded 2015',
  problem_subtitle: 'What we kept seeing in the field',
  problem_items: [
    {
      title: 'Multiple return visits',
      description:
        'Coordinators driving back just to collect a signature — wasting hours and fuel every week.',
    },
    {
      title: 'Outdated paper forms',
      description:
        'Care plans and budgets handwritten, scanned, filed — and nearly impossible to audit.',
    },
    {
      title: 'Delayed revenue',
      description:
        "Providers couldn't claim subsidies until paperwork was signed — sometimes weeks later.",
    },
    {
      title: 'Double-handling data',
      description:
        'The same participant details entered into 3, 4, sometimes 5 different systems.',
    },
  ],
  mission_label: 'OUR MISSION',
  mission_quote:
    '"We handle the compliance so your team can focus on the person in the room."',
  mission_body:
    'Care Collaborator exists to give back time — time that coordinators spend on paperwork, on return visits, on re-entering data — and redirect it to the people who need care most. We build software that makes the hard parts easy, the slow parts fast, and the risky parts compliant.\n\nEvery feature we build, every integration we develop, every legal template we maintain is guided by one question: does this help a care recipient get better care sooner?',
  mission_values: [
    {
      icon_key: 'people' as const,
      title: 'People first',
      description:
        'Every decision starts with the participant. Technology should serve care, not the other way around.',
    },
    {
      icon_key: 'australia' as const,
      title: 'Built for Australia',
      description:
        'Australian servers, Australian legislation, Australian care sector. We\'re local and we stay local.',
    },
    {
      icon_key: 'scales' as const,
      title: 'Compliance without compromise',
      description:
        'Russell Kennedy agreements, automatic legislative updates, full audit trails. Compliance built in, not bolted on.',
    },
    {
      icon_key: 'speed' as const,
      title: 'Speed that matters',
      description:
        'Faster onboarding means participants get care sooner and providers start billing sooner. Win-win.',
    },
  ],
  diff_label: 'WHY WE\'RE DIFFERENT',
  diff_heading: 'Not just software. A complete onboarding ecosystem.',
  diff_subtext:
    "We've built one tool that handles every step so your advisors focus on people, not paperwork.",
  diff_features: [
    {
      icon_key: 'star' as const,
      title: 'Legal agreements built in, not add-ons',
      description:
        'Russell Kennedy service agreements are embedded in the platform and auto-update with every legislative change. No legal bills, no manual updates, no risk.',
    },
    {
      icon_key: 'check_circle' as const,
      title: 'One visit, fully onboarded',
      description:
        'From intake to signed agreement in a single appointment. No return trips. No waiting. Participants can start receiving care — and providers can start claiming — same day.',
    },
    {
      icon_key: 'shield' as const,
      title: 'Australian servers & data sovereignty',
      description:
        'All data is stored and processed on Australian servers. Full compliance with the Privacy Act 1988 and aged care legislation. No overseas data transfers.',
    },
    {
      icon_key: 'heart_care' as const,
      title: 'Built specifically for aged care & NDIS',
      description:
        "Not a generic CRM or document tool adapted for care. Care Collaborator is purpose-built for HCP and NDIS onboarding workflows, by people who understand the sector.",
    },
  ],
  comparison_without: [
    { label: '3–6 return visits per client' },
    { label: 'Paper forms & wet signatures' },
    { label: 'Weeks before claiming' },
    { label: 'Manual data re-entry' },
    { label: 'No audit trail' },
    { label: 'Legal templates outdated' },
  ],
  comparison_with: [
    { label: '1 visit, fully onboarded' },
    { label: 'Digital & e-signed same day' },
    { label: 'Start claiming same day' },
    { label: 'One source of truth' },
    { label: 'Full digital audit trail' },
    { label: 'Auto-updated agreements' },
  ],
  diff_card_badge: 'Before vs After',
  diff_card_heading: 'The old way vs Care Collaborator',
  average_saving_heading: 'Average saving',
  average_saving_body: '30% reduction in onboarding costs. Hundreds of hours saved per year.',
  cta_banner: {
    heading: 'Ready to transform your onboarding?',
    subtext: 'See Care Collaborator in action with a personalised 30-minute demo.',
    primary_cta: { label: 'Book a demo', url: '/book-demo', variant: 'primary' as const },
    secondary_cta: { label: 'Call 1300 664 130', url: 'tel:1300664130', variant: 'secondary' as const },
  },
  seo: {
    title: 'About Care Collaborator — Our Story',
    description:
      'Founded in 2015 to fix home care onboarding. Learn how Care Collaborator became Australia\'s leading digital onboarding platform for aged care and NDIS providers.',
    no_index: false,
  },
};

async function revalidateFrontend(strapi: Core.Strapi, paths: string[]) {
  const frontendUrl = process.env.FRONTEND_URL?.replace(/\/$/, '');
  const secret = process.env.REVALIDATE_SECRET;

  if (!frontendUrl || !secret) {
    strapi.log.warn('[isr] FRONTEND_URL or REVALIDATE_SECRET not set — skipping revalidation.');
    return;
  }

  try {
    const res = await fetch(`${frontendUrl}/api/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, paths }),
    });

    if (!res.ok) {
      strapi.log.error(`[isr] Revalidation failed — HTTP ${res.status}: ${await res.text()}`);
      return;
    }

    strapi.log.info(`[isr] Revalidated: ${paths.join(', ')}`);
  } catch (err) {
    strapi.log.error(`[isr] Could not reach frontend: ${err}`);
  }
}

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (strapi.documents as any).use(async (ctx: any, next: () => Promise<any>) => {
      const result = await next();
      if (ctx.uid === 'api::home-page.home-page' && ctx.action === 'publish') {
        // Defer past current request cycle so Strapi's entity cache flushes first
        setImmediate(() => {
          revalidateFrontend(strapi, ['/']).catch((err) => {
            strapi.log.error(`[isr] Deferred revalidation error: ${err}`);
          });
        });
      }
      return result;
    });
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await seedGlobal(strapi);
    await seedHomePage(strapi);
    await seedAboutPage(strapi);
    await seedInsightsPage(strapi);
    await seedArticles(strapi);
    await seedRoiCalculatorPage(strapi);
  },
};

const force = process.env.FORCE_RESEED === 'true';

async function upsertSingle<T extends object>(
  strapi: Core.Strapi,
  uid: string,
  data: T,
  label: string,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const docs = strapi.documents(uid as any);

  // Find without status filter — avoids missing documents created in a different schema state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const existing = await docs.findFirst({} as any);

  if (existing) {
    if (!force) {
      strapi.log.info(`[seed] ${label} already exists — skipping (set FORCE_RESEED=true to overwrite).`);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await docs.delete({ documentId: existing.documentId } as any);
    strapi.log.info(`[seed] Deleted existing ${label}.`);
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await docs.create({ data: data as any, status: 'published' });
    strapi.log.info(`[seed] ${label} created and published.`);
  } catch (err) {
    strapi.log.error(`[seed] Failed to create ${label}: ${err}`);
  }
}

async function seedGlobal(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::global.global').findFirst();

  if (existing) {
    if (!force) {
      strapi.log.info('[seed] Global already exists — skipping.');
      return;
    }
    await strapi.documents('api::global.global').delete({ documentId: existing.documentId });
    strapi.log.info('[seed] Deleted existing Global.');
  }

  try {
    await strapi.documents('api::global.global').create({ data: globalSeed });
    strapi.log.info('[seed] Global created.');
  } catch (err) {
    strapi.log.error(`[seed] Failed to create Global: ${err}`);
  }
}

async function seedHomePage(strapi: Core.Strapi) {
  await upsertSingle(strapi, 'api::home-page.home-page', homePageSeed, 'Home Page');
}

async function seedAboutPage(strapi: Core.Strapi) {
  await upsertSingle(strapi, 'api::about-page.about-page', aboutPageSeed, 'About Page');
}

async function seedInsightsPage(strapi: Core.Strapi) {
  await upsertSingle(strapi, 'api::insights-page.insights-page', insightsPageSeed, 'Insights Page');
}

async function seedRoiCalculatorPage(strapi: Core.Strapi) {
  await upsertSingle(strapi, 'api::roi-calculator-page.roi-calculator-page', roiCalculatorPageSeed, 'ROI Calculator Page');
}

async function seedArticles(strapi: Core.Strapi) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const docs = strapi.documents('api::article.article' as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const existing = await docs.findFirst({} as any);

  if (existing) {
    if (!force) {
      strapi.log.info('[seed] Articles already exist — skipping.');
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const all = await docs.findMany({} as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const doc of all as any[]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await docs.delete({ documentId: doc.documentId } as any);
    }
    strapi.log.info(`[seed] Deleted ${(all as any[]).length} existing Articles.`);
  }

  try {
    for (const article of articlesSeed) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await docs.create({ data: article as any, status: 'published' });
    }
    strapi.log.info(`[seed] ${articlesSeed.length} Articles created and published.`);
  } catch (err) {
    strapi.log.error(`[seed] Failed to create Articles: ${err}`);
  }
}
