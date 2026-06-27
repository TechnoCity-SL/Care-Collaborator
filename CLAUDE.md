# Care Collaborator — Claude Code Context

## Project Overview

**Care Collaborator** is a healthcare/care management static website built for TechnoCity.

**Stack:**
- Frontend: Next.js (TypeScript, Pages Router) — deployed on Vercel
- CMS: Strapi v5 — deployed on Fly.io (scale-to-zero to minimise cost)
- Database: Supabase (PostgreSQL)
- Image CDN: Cloudinary (`cloud_name: yyuznnk7`)
- Styling: Tailwind CSS + BEM for custom CSS

**Monorepo layout:**
```
care-collaborator/
├── CLAUDE.md        ← you are here
├── web/             ← Next.js frontend
├── cms/             ← Strapi CMS
└── README.md
```

---

## Architecture Decisions

### Static-first with ISR
All pages use `getStaticProps` (SSG). When CMS content changes, Strapi fires a webhook
to `/api/revalidate` which triggers Next.js ISR for only the affected paths.
This means Fly.io only needs to run during content edits and at build time — then it sleeps.
Do not use `getServerSideProps` unless there is an explicit, justified reason.

### Cloudinary for all images
- Frontend uses `@cloudinary/url-gen` (client-safe, no secret)
- Strapi uses `@strapi/provider-upload-cloudinary` for media uploads (server-side, secret in env)
- Always use `next/image` with Cloudinary URLs — never raw `<img>` tags
- Always apply `f_auto` and `q_auto` transformations

### Supabase access tiers
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → safe for client components
- `SUPABASE_SERVICE_ROLE_KEY` → API routes only, never imported in components

---

## Engineering Standards

### Non-negotiable rules
- SOLID, DRY, KISS, YAGNI on every file
- No hardcoded secrets, credentials, or environment-specific values — ever
- No `console.log` in committed code — use the logger utility at `web/src/utils/logger.ts`
- No commented-out code blocks
- No unresolved TODOs
- TypeScript strict mode — no `any`, no `!` non-null assertions without comment justification
- All inputs validated with `zod` on both client and server

### Security (OWASP — non-negotiable)
- Parameterised queries only (Supabase client enforces this — use it correctly)
- Rate-limit all API routes
- Never use `dangerouslySetInnerHTML` without explicit DOMPurify sanitisation
- `NEXT_PUBLIC_` prefix only for values safe to expose to the browser
- Least-privilege: components never touch service role keys

### Commit messages — Conventional Commits
```
feat: add hero section component
fix: correct ISR path validation in revalidate endpoint
chore: update dependencies
docs: add setup instructions to README
refactor: extract image helpers into cloudinary lib
test: add unit tests for service page getStaticProps
```

---

## Frontend Structure (web/)

### Atomic Design — strict hierarchy
```
web/src/components/
├── atoms/        ← Button, Icon, Badge, Input, Label, Tag
├── molecules/    ← FormField, Card, NavItem, SearchBar, ImageCard
├── organisms/    ← Header, Footer, HeroSection, ServiceGrid, ContactForm
└── templates/    ← PageLayout, ArticleLayout
```

When building a new UI element, ask: what is the smallest reusable unit?
Build that atom first, compose up.

### CSS rules
- Tailwind utility classes for layout, spacing, colour, typography
- BEM naming for any custom CSS classes: `block__element--modifier`
- Mobile-first always: start at 320px, use `sm:` `md:` `lg:` `xl:` breakpoints
- No inline styles

### Accessibility — WCAG 2.1 AA minimum
- Semantic HTML elements (`<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`)
- Every interactive element must be keyboard-navigable
- Visible focus states — never `outline: none` without a custom replacement
- Images: meaningful `alt` text, decorative images get `alt=""`
- ARIA roles only when semantic HTML is insufficient

### Performance
- `next/image` for every image — configure `remotePatterns` in `next.config.ts` for `res.cloudinary.com`
- Dynamic imports (`next/dynamic`) for heavy components (maps, charts, rich text editors)
- No render-blocking scripts

---

## Backend / API Routes (web/src/pages/api/)

### Layered architecture — never mix concerns
```
Handler (pages/api/*.ts)     ← validate request, call service, return response
    ↓
Service (src/services/*.ts)  ← business logic, pure functions, testable
    ↓
Repository (src/repositories/*.ts) ← data access only, wraps Supabase/Strapi calls
```

### Standard response shape — always use this
```typescript
// Success
{ success: true, data: T }

// Error
{ success: false, error: { code: string, message: string } }
```

### HTTP status codes to use
- `200` OK, `201` Created, `400` Bad Request, `401` Unauthorised,
  `403` Forbidden, `404` Not Found, `422` Unprocessable Entity, `500` Internal Server Error

### DTOs — never expose raw DB models
Create TypeScript interfaces in `web/src/types/` for all data that crosses boundaries.
What Supabase or Strapi returns internally is never the shape sent to the client.

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `web/src/lib/cloudinary.ts` | URL builder — client-safe, uses `@cloudinary/url-gen` |
| `web/src/lib/strapi.ts` | Server-side Strapi fetch helper |
| `web/src/lib/supabase.ts` | Supabase client — anon key only |
| `web/src/pages/api/revalidate.ts` | ISR webhook endpoint called by Strapi |
| `web/src/utils/logger.ts` | Logger utility — use instead of `console.log` |
| `web/src/types/` | All TypeScript DTOs and interfaces |
| `cms/config/plugins.ts` | Strapi Cloudinary upload provider config |
| `cms/fly.toml` | Fly.io config — scale-to-zero enabled |

---

## Environment Variables

### web/.env.local
```
STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=yyuznnk7
REVALIDATE_SECRET=
```

### cms/.env
```
HOST=0.0.0.0
PORT=1337
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
JWT_SECRET=
DATABASE_CLIENT=postgres
DATABASE_HOST=
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=
DATABASE_SSL=true
CLOUDINARY_NAME=yyuznnk7
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
```

---

## Strapi Content Types to Create

| Content Type | Key Fields |
|---|---|
| `HomePage` | hero_title, hero_subtitle, hero_image, sections (component) |
| `AboutPage` | intro_text, team (repeatable component), values (repeatable) |
| `Service` | title, slug, description, icon, hero_image, content (rich text) |
| `ContactPage` | intro_text, email, phone, address |
| `SEO` (component) | title, description, og_image |
| `Navigation` | links (repeatable: label, url, is_external) |

---

## Fly.io CMS — Scale to Zero

`cms/fly.toml` must always have:
```toml
[http_service]
  auto_stop_machines = "stop"
  auto_start_machines = true
  min_machines_running = 0
```

This is what keeps costs near zero. The CMS wakes on incoming requests (webhook or admin access)
and sleeps after inactivity. Never change `min_machines_running` above `0` without a cost justification.

---

## Testing Requirements

- Unit tests for all service-layer functions (Jest)
- Integration tests for all API routes (Jest + Supertest or Next.js test utils)
- Component tests for organisms and templates (React Testing Library)
- Target: 80% coverage minimum
- Test files live alongside source: `ComponentName.test.tsx`, `service.test.ts`

---

## What to Do When Starting a New Task

1. Identify which layer the task belongs to (atom / molecule / organism / service / repository / API route)
2. Check if a lower-level primitive exists before building something new
3. Create the TypeScript interface/DTO in `src/types/` first
4. Write the implementation
5. Write the test file alongside it
6. Verify: no hardcoded values, no console.logs, types are strict, accessibility is correct
