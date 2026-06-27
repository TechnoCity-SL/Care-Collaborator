# Care Collaborator

Healthcare/care management website for TechnoCity. Content-driven static site with a headless CMS.

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (TypeScript, Pages Router) — Vercel |
| CMS | Strapi v5 — Fly.io (scale-to-zero) |
| Database | Supabase (PostgreSQL) |
| Image CDN | Cloudinary (`cloud_name: yyuznnk7`) |
| Styling | Tailwind CSS v4 + BEM for custom CSS |

## Monorepo Structure

```
care-collaborator/
├── web/          ← Next.js frontend
├── cms/          ← Strapi CMS
├── .gitignore
├── CLAUDE.md     ← Claude Code context and engineering standards
└── README.md
```

---

## Setup

### Prerequisites

- Node.js 20+
- npm 10+
- A Supabase project
- A Cloudinary account (`cloud_name: yyuznnk7`)
- Fly.io CLI (`flyctl`) for CMS deployment

---

### Frontend (`web/`)

```bash
cd web
cp .env.example .env.local
# Fill in .env.local with your values
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Environment variables** — copy `web/.env.example` to `web/.env.local` and fill in:

| Variable | Description |
|---|---|
| `STRAPI_API_URL` | Strapi base URL (e.g. `http://localhost:1337`) |
| `STRAPI_API_TOKEN` | Strapi API token (create in Strapi Admin → API Tokens) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (safe for client) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (API routes only) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `REVALIDATE_SECRET` | Random secret for ISR webhook — generate with `openssl rand -hex 32` |

**Scripts:**

```bash
npm run dev          # development server
npm run build        # production build
npm run lint         # ESLint
npm run test         # Jest unit tests
npm run test:coverage  # tests with coverage report
```

---

### CMS (`cms/`)

The CMS uses Strapi v5. You must initialise it with `create-strapi-app` before the config files in `cms/` take effect.

**First-time setup:**

```bash
# From the monorepo root — this creates the cms/ Strapi project
npx create-strapi-app@latest cms \
  --dbclient=postgres \
  --dbhost=YOUR_SUPABASE_DB_HOST \
  --dbport=5432 \
  --dbname=postgres \
  --dbusername=postgres \
  --dbpassword=YOUR_SUPABASE_DB_PASSWORD \
  --dbssl=true
```

> **Note:** If you ran `create-strapi-app` and it replaced the `cms/config/plugins.ts` file, copy it back from git.

Then install the Cloudinary upload provider:

```bash
cd cms
npm install @strapi/provider-upload-cloudinary
cp .env.example .env
# Fill in cms/.env with your values
npm run develop
```

**Strapi webhook** — configure in Strapi Admin → Settings → Webhooks:

| Field | Value |
|---|---|
| Name | ISR Revalidation |
| URL | `https://your-vercel-domain.vercel.app/api/revalidate` |
| Events | Entry.publish, Entry.update, Entry.delete |
| Headers | `Content-Type: application/json` |
| Body | `{ "secret": "<your REVALIDATE_SECRET>", "paths": ["/"] }` |

---

### CMS Deployment (Fly.io)

The CMS is configured to **scale to zero** — it sleeps when idle and wakes on incoming requests. This keeps costs near zero.

```bash
cd cms
flyctl launch --config fly.toml
flyctl secrets set \
  APP_KEYS="..." \
  API_TOKEN_SALT="..." \
  ADMIN_JWT_SECRET="..." \
  JWT_SECRET="..." \
  DATABASE_HOST="..." \
  DATABASE_PASSWORD="..." \
  CLOUDINARY_KEY="..." \
  CLOUDINARY_SECRET="..."
flyctl deploy
```

---

### Cloudinary Integration Verification

```bash
cd web
CLOUDINARY_CLOUD_NAME=yyuznnk7 \
CLOUDINARY_API_KEY=your_api_key \
CLOUDINARY_API_SECRET=your_rotated_secret \
node scripts/test-cloudinary.mjs
```

---

## Strapi Content Types

| Content Type | Key Fields |
|---|---|
| `HomePage` | hero_title, hero_subtitle, hero_image, seo (component) |
| `AboutPage` | intro_text, team (repeatable), values (repeatable), seo |
| `Service` | title, slug, description, icon, hero_image, content, seo |
| `ContactPage` | intro_text, email, phone, address, seo |
| `SEO` (component) | title, description, og_image |
| `Navigation` | links (repeatable: label, url, is_external) |

---

## Security Notes

- `SUPABASE_SERVICE_ROLE_KEY` must **never** be imported in client components — API routes only.
- `STRAPI_API_TOKEN` must **never** be prefixed with `NEXT_PUBLIC_`.
- Rotate your Cloudinary API Secret if it was ever committed or shared. Generate a new one at Cloudinary → Settings → API Keys.
- Generate `REVALIDATE_SECRET` with: `openssl rand -hex 32`
