# Care Collaborator — Full Project Setup Prompt for Cursor

> Paste this entire prompt into Cursor's AI chat at the start of the project.
> Use Claude (Sonnet) as your model inside Cursor for best results.

---

## 🧠 Project Context

You are a senior full-stack engineer helping build **Care Collaborator** — a healthcare/care management website for TechnoCity. This is a content-driven static website.

**Stack:**
- **Frontend:** Next.js (TypeScript) — Pages Router, Static Site Generation (SSG)
- **CMS:** Strapi v5 — hosted on Fly.io (sleeps when idle to minimise cost)
- **Database:** Supabase (PostgreSQL)
- **Image CDN:** Cloudinary
- **Styling:** Tailwind CSS + BEM naming for custom CSS
- **Deployment:** Vercel (frontend), Fly.io (CMS)

**Repository structure (monorepo):**
```
care-collaborator/
├── web/          ← Next.js frontend
├── cms/          ← Strapi CMS
├── .gitignore
└── README.md
```

**Design reference:** Figma file — Care Collaborator Designs
Node ID: 424-448 (starting page)

---

## 📐 Engineering Standards (Non-Negotiable)

Apply ALL of the following across every file you generate:

### General
- SOLID, DRY, KISS, YAGNI at all times
- Meaningful, self-documenting names — no `data`, `item`, `temp` etc.
- Single responsibility per module/function/component
- Edge cases, error boundaries, and failure states must always be considered
- Input validation and sanitisation on all entry points
- No hardcoded secrets, credentials, or environment-specific values — always use `.env.local` / `.env` with `process.env`

### Security (OWASP Top 10)
- Sanitise and validate all inputs (client + server)
- Use parameterised queries for all DB operations (Supabase client handles this — use it correctly)
- Rate limit any API routes
- Protect against XSS — never use `dangerouslySetInnerHTML` without explicit sanitisation
- Least-privilege access: never expose Supabase service role key to the client
- Use `NEXT_PUBLIC_` prefix only for values safe to expose publicly

### Frontend — Atomic Design
Structure all components following Atomic Design:
```
web/src/components/
├── atoms/        ← Button, Icon, Badge, Input, Label
├── molecules/    ← FormField, Card, NavItem, SearchBar
├── organisms/    ← Header, Footer, HeroSection, ContentSection
├── templates/    ← PageLayout, ArticleLayout
└── pages/        ← Full page compositions (in Next.js pages/ dir)
```

- CSS: Tailwind utility-first. For custom CSS use **BEM** (`block__element--modifier`)
- Accessibility: WCAG 2.1 AA — semantic HTML, ARIA roles, keyboard navigation, visible focus states
- Responsive: **mobile-first** — design for 320px up, break at sm/md/lg/xl
- Performance: `next/image` for all images (Cloudinary URLs), dynamic imports for heavy components, no render-blocking scripts

### Backend / API Routes
- Clean Architecture: controller (route handler) → service (business logic) → repository (data access)
- Consistent API response shape:
  ```typescript
  // Success
  { success: true, data: T }
  // Error
  { success: false, error: { code: string, message: string } }
  ```
- Proper HTTP status codes: 200, 201, 400, 401, 403, 404, 422, 500
- DTOs only — never expose raw Supabase/Strapi model shapes to the client
- Idempotent endpoints where applicable

### Code Quality
- No `console.log` in committed code — use a logger utility
- No commented-out code blocks
- No unresolved TODOs
- All business logic must have unit tests (Jest + React Testing Library)
- API routes must have integration tests
- Target: 80% test coverage minimum
- Lint must pass before code is considered complete (`eslint`, `prettier`)
- Commit messages must follow **Conventional Commits**: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`

---

## 🚀 Phase 1 — Project Scaffolding

### Step 1: Initialise the monorepo

```bash
mkdir care-collaborator && cd care-collaborator
git init
```

Create root `.gitignore`:
```
node_modules/
.env
.env.local
.env*.local
.DS_Store
*.log
dist/
.next/
build/
```

Create root `README.md` documenting the monorepo structure, tech stack, and setup instructions for each sub-project.

---

### Step 2: Scaffold the Next.js frontend

```bash
cd care-collaborator
npx create-next-app@latest web \
  --typescript \
  --tailwind \
  --eslint \
  --app-router=false \
  --src-dir \
  --import-alias "@/*"
```

> We use Pages Router (not App Router) for clean SSG + ISR compatibility with Strapi webhooks.

Then install additional dependencies:
```bash
cd web
npm install next-seo @cloudinary/url-gen cloudinary @supabase/supabase-js axios zod
npm install -D @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom @types/jest
```

**Directory structure to create inside `web/src/`:**
```
web/src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── hooks/
├── lib/
│   ├── cloudinary.ts      ← Cloudinary URL builder (no secrets)
│   ├── supabase.ts        ← Supabase client (public key only)
│   └── strapi.ts          ← Strapi fetch helpers
├── services/              ← Business logic (pure functions, testable)
├── repositories/          ← Data access wrappers
├── types/                 ← TypeScript interfaces and DTOs
├── utils/                 ← Pure utility functions
└── styles/
    └── globals.css
```

**Environment variables — create `web/.env.local`:**
```env
# Strapi CMS
STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_NEVER_expose_to_client

# Cloudinary (public config only — no API secret on frontend)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=yyuznnk7

# Revalidation
REVALIDATE_SECRET=generate_a_random_secret_here
```

**Create `web/src/lib/cloudinary.ts`:**
```typescript
/**
 * Cloudinary URL builder — client-safe (no API secret).
 * Uses @cloudinary/url-gen for type-safe transformations.
 */
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto as autoFormat } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
});

export interface CloudinaryImageOptions {
  width?: number;
  height?: number;
}

/**
 * Returns an optimised Cloudinary URL with f_auto and q_auto applied.
 */
export function getOptimisedImageUrl(
  publicId: string,
  options: CloudinaryImageOptions = {}
): string {
  const image = cloudinary.image(publicId);

  image.delivery(format(autoFormat())).delivery(quality(autoQuality()));

  if (options.width || options.height) {
    image.resize(auto().width(options.width).height(options.height));
  }

  return image.toURL();
}

export default cloudinary;
```

**Create `web/src/lib/strapi.ts`:**
```typescript
/**
 * Strapi fetch helpers.
 * All requests are server-side only (getStaticProps / getServerSideProps).
 * Never call Strapi directly from client components.
 */

const STRAPI_API_URL = process.env.STRAPI_API_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_API_URL || !STRAPI_API_TOKEN) {
  throw new Error('Missing required Strapi environment variables.');
}

async function strapiGet<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${STRAPI_API_URL}/api${endpoint}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    // No caching at fetch level — Next.js ISR controls revalidation
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(
      `Strapi fetch failed: ${response.status} ${response.statusText} — ${endpoint}`
    );
  }

  return response.json() as Promise<T>;
}

export { strapiGet };
```

**Create `web/src/lib/supabase.ts`:**
```typescript
/**
 * Supabase client — uses anon key only (safe for client-side).
 * For server-side operations requiring elevated privileges,
 * use the service role key in API routes only, never in components.
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

### Step 3: ISR Webhook Route

When Strapi content changes, it triggers a webhook to revalidate only the affected static pages. This keeps Fly.io usage minimal — the CMS only needs to be running during edits and at build time.

**Create `web/src/pages/api/revalidate.ts`:**
```typescript
import type { NextApiRequest, NextApiResponse } from 'next';

type RevalidateResponse = {
  success: boolean;
  revalidated?: string[];
  error?: string;
};

/**
 * ISR Revalidation endpoint.
 * Called by Strapi webhooks when content is published/updated.
 *
 * Request body shape: { secret: string, paths: string[] }
 * Example: { secret: "...", paths: ["/", "/about", "/services/care"] }
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RevalidateResponse>
): Promise<void> {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { secret, paths } = req.body as { secret?: string; paths?: string[] };

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ success: false, error: 'Invalid revalidation secret' });
  }

  if (!Array.isArray(paths) || paths.length === 0) {
    return res.status(422).json({ success: false, error: 'paths must be a non-empty array' });
  }

  // Sanitise paths — only allow relative paths starting with /
  const validPaths = paths.filter(
    (p) => typeof p === 'string' && p.startsWith('/') && !p.includes('..')
  );

  if (validPaths.length === 0) {
    return res.status(422).json({ success: false, error: 'No valid paths provided' });
  }

  try {
    await Promise.all(validPaths.map((path) => res.revalidate(path)));
    return res.status(200).json({ success: true, revalidated: validPaths });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Revalidation failed';
    return res.status(500).json({ success: false, error: message });
  }
}
```

---

### Step 4: Scaffold Strapi CMS

```bash
cd care-collaborator
npx create-strapi-app@latest cms \
  --quickstart=false \
  --dbclient=postgres \
  --dbhost=YOUR_SUPABASE_DB_HOST \
  --dbport=5432 \
  --dbname=postgres \
  --dbusername=postgres \
  --dbpassword=YOUR_SUPABASE_DB_PASSWORD \
  --dbssl=true
```

> You can also `npx create-strapi-app@latest cms` and configure the database via the admin UI on first launch.

**Create `cms/.env`:**
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=generate_random_app_keys_comma_separated
API_TOKEN_SALT=generate_random_salt
ADMIN_JWT_SECRET=generate_random_secret
JWT_SECRET=generate_random_secret

# Supabase DB
DATABASE_CLIENT=postgres
DATABASE_HOST=your_supabase_db_host
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_supabase_db_password
DATABASE_SSL=true

# Cloudinary (for media uploads in admin)
CLOUDINARY_NAME=yyuznnk7
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret_after_rotating
```

**Install Cloudinary provider for Strapi media uploads:**
```bash
cd cms
npm install @strapi/provider-upload-cloudinary
```

**Create `cms/config/plugins.ts`:**
```typescript
export default ({ env }: { env: (key: string) => string }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
```

---

### Step 5: Fly.io deployment for Strapi CMS

**Create `cms/fly.toml`:**
```toml
app = "care-collaborator-cms"
primary_region = "sin"  # Singapore — closest to Sri Lanka

[build]

[env]
  PORT = "1337"
  NODE_ENV = "production"

[http_service]
  internal_port = 1337
  force_https = true
  auto_stop_machines = "stop"       # ← Stops when idle = zero cost when not in use
  auto_start_machines = true        # ← Wakes up on webhook or admin access
  min_machines_running = 0          # ← Allows full scale-to-zero

[[vm]]
  memory = "512mb"
  cpu_kind = "shared"
  cpus = 1
```

> `auto_stop_machines = "stop"` with `min_machines_running = 0` means the CMS will sleep when idle and only wake when a request comes in. This is the key to keeping Fly.io costs near zero.

**Strapi webhook config (do this in Strapi Admin → Settings → Webhooks):**
- Name: `ISR Revalidation`
- URL: `https://your-vercel-domain.vercel.app/api/revalidate`
- Events: `Entry.publish`, `Entry.update`, `Entry.delete`
- Headers: `Content-Type: application/json`
- Body: Map to the shape `{ "secret": "your_REVALIDATE_SECRET", "paths": ["/"] }`

---

### Step 6: Base page structure (from Figma)

Based on the Figma design (Care Collaborator Designs, node 424-448), create the following pages. Each page uses `getStaticProps` for SSG:

**Pages to create in `web/src/pages/`:**
```
index.tsx          ← Home page
about.tsx          ← About / Who we are
services/
  index.tsx        ← Services overview
  [slug].tsx       ← Individual service detail (dynamic SSG with getStaticPaths)
contact.tsx        ← Contact page
404.tsx            ← Custom 404
_app.tsx           ← Global layout, fonts, SEO defaults
_document.tsx      ← Custom document (font preloading etc.)
api/
  revalidate.ts    ← ISR webhook endpoint (already created above)
```

**Template for a standard static page (e.g. `about.tsx`):**
```typescript
import type { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { PageLayout } from '@/components/templates/PageLayout';
import { strapiGet } from '@/lib/strapi';
import type { AboutPageDTO } from '@/types/pages';

interface AboutPageProps {
  pageData: AboutPageDTO;
}

const AboutPage: NextPage<AboutPageProps> = ({ pageData }) => {
  return (
    <>
      <NextSeo
        title={pageData.seo.title}
        description={pageData.seo.description}
      />
      <PageLayout>
        {/* Page content here */}
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  try {
    const response = await strapiGet<{ data: AboutPageDTO }>('/about-page?populate=*');
    return {
      props: {
        pageData: response.data,
      },
      // Fallback revalidation every 24h — ISR webhook handles on-demand revalidation
      revalidate: 86400,
    };
  } catch (error) {
    console.error('Failed to fetch about page data:', error);
    return { notFound: true };
  }
};

export default AboutPage;
```

---

### Step 7: Cloudinary Onboarding (verify integration)

Run this once to verify Cloudinary is working. Create `web/scripts/test-cloudinary.mjs`:

```javascript
/**
 * Cloudinary integration test script.
 * Run with: node scripts/test-cloudinary.mjs
 * 
 * Uses your actual credentials — rotate the secret before using.
 * Do NOT commit this file with real credentials.
 */
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // set in shell before running
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function run() {
  console.log('→ Uploading test image...');
  const uploadResult = await cloudinary.uploader.upload(
    'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    { public_id: 'care-collaborator-test' }
  );

  console.log('✓ Uploaded:', uploadResult.secure_url);
  console.log('  Public ID:', uploadResult.public_id);

  const details = await cloudinary.api.resource(uploadResult.public_id);
  console.log('✓ Dimensions:', details.width, 'x', details.height);
  console.log('  Format:', details.format);
  console.log('  File size:', details.bytes, 'bytes');

  // f_auto: serves best format per browser (WebP, AVIF, etc.)
  // q_auto: adjusts quality to balance visual fidelity and file size
  const transformedUrl = cloudinary.url(uploadResult.public_id, {
    fetch_format: 'auto',
    quality: 'auto',
  });

  console.log('\n✅ Done! Open the optimised URL below and check size + format:');
  console.log(transformedUrl);
}

run().catch(console.error);
```

Run it:
```bash
CLOUDINARY_CLOUD_NAME=yyuznnk7 \
CLOUDINARY_API_KEY=your_api_key \
CLOUDINARY_API_SECRET=your_rotated_secret \
node web/scripts/test-cloudinary.mjs
```

> After confirming it works, delete or gitignore this script.

---

## 📋 Checklist Before First Commit

- [ ] All `.env*` files are in `.gitignore` (root, `web/`, `cms/`)
- [ ] No API secrets in source code
- [ ] Cloudinary API Secret rotated (it was exposed — see note below)
- [ ] `REVALIDATE_SECRET` is a strong random string (use `openssl rand -hex 32`)
- [ ] Strapi webhook configured to call `/api/revalidate`
- [ ] `fly.toml` has `auto_stop_machines = "stop"` and `min_machines_running = 0`
- [ ] `next/image` used for ALL image rendering (not `<img>` tags)
- [ ] All pages use `getStaticProps` (no `getServerSideProps` unless unavoidable)
- [ ] ESLint passes with zero errors
- [ ] TypeScript strict mode is enabled in `tsconfig.json`

---

## ⚠️ IMPORTANT: Rotate Your Cloudinary Secret

Your Cloudinary API Secret was included in the project brief. Rotate it immediately:
1. Go to: https://console.cloudinary.com/app/settings/api-keys
2. Generate a new API secret
3. Update your `.env` files with the new secret
4. Never include secrets in prompts, documents, or commits

---

## 🗂 Suggested Content Types in Strapi

Based on the Care Collaborator design, create these content types:

| Content Type | Fields |
|---|---|
| `HomePage` | hero_title, hero_subtitle, hero_image (Cloudinary), sections (component) |
| `AboutPage` | intro_text, team (repeatable component), values (repeatable) |
| `Service` | title, slug, description, icon, hero_image, content (rich text) |
| `ContactPage` | intro_text, email, phone, address, map_embed |
| `SEO` (component) | title, description, og_image |
| `Navigation` | links (repeatable: label, url, is_external) |

All image fields should use Strapi's media library, which uploads directly to Cloudinary via the provider configured above.

---

## 📌 Notes for Cursor Workflow

- Ask Cursor to work on **one component or one page at a time**
- Always say: *"Follow the Atomic Design structure defined in the project prompt"*
- After generating a component, ask: *"Does this component have a corresponding test file?"*
- Use: *"Ensure this uses `next/image` with the `getOptimisedImageUrl` helper from `@/lib/cloudinary`"*
- When generating new API routes: *"Follow the controller → service → repository pattern and return the standard response shape defined in the project prompt"*
