# Portfolio Build — Context & Phases

## Who I am

**Name:** Mohammad Jihad Alsmadi (MHD Jihad Alsmadi / Jihad Al-Smadi)
**Role:** Full-stack developer · 7+ years experience building production SaaS & ERP systems
**Stack:** .NET + React / Angular
**Location:** Syria, Damascus
**Looking for:** Jobs & freelance clients

**Contact:**
- Email: jihadsmadi41@gmail.com
- GitHub: https://github.com/jihadsmadi
- LinkedIn: https://www.linkedin.com/in/jihad-smadi-902250226/

---

## Project Goal

A portfolio that feels like a serious engineer built it — not a template.
Shows projects, writing, skills, and makes it easy to contact me.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16.2.6 (App Router, TypeScript) |
| Styling | Tailwind CSS v4.3.0 |
| Animations | Framer Motion (Phase 8) |
| Database | Supabase (Postgres) |
| Blog content | MDX files in `/content/blog/` |
| Email | Resend |
| Auth | NextAuth v5 + GitHub OAuth — **skip for now** |
| Hosting | Vercel |

**Runtime:** React 19.2.4, Node 23, npm 11

---

## Design Reference

File: `d:\Work Space\Programming\Portofolio\portfolio-enhanced (1).html`
→ Single source of truth for ALL colors, fonts, spacing, components, interactions.
→ Treat it as the Figma file. Never deviate without a reason.

**Design tokens (already extracted to `globals.css`):**
- Fonts: Space Grotesk (display/headings) + Inter (body) + JetBrains Mono (code)
- Colors: `--primary` `--secondary` `--tint` `--surface-*` `--on-surface*` etc.
- Dark mode via `[data-theme="dark"]` on `<html>`
- Border radii: `--radius-sm` → `--radius-xl` → `--radius-full`
- Shadows: `--shadow-card` `--shadow-card-hover` `--shadow-btn` `--shadow-nav`

---

## Pages & Routes

| Route | Status | Description |
|-------|--------|-------------|
| `/` | ✅ Live | Hero → Capabilities → About → Skills → Featured Projects |
| `/projects` | ✅ Live | All projects grid — featured full-width, rest 2-col |
| `/projects/[slug]` | ✅ Live | Project detail — description, tech stack sidebar, links |
| `/blog` | ✅ Live | Post list from Supabase, metadata-driven |
| `/blog/[slug]` | ✅ Live | Full post rendered from MDX file, tags sidebar |
| `/contact` | ✅ Live | Working form (Resend + Supabase) + social links |
| `/debug` | ✅ Dev only | Table inspector — remove before deploy |

---

## Data Strategy

- **Projects, skills, blog metadata** → Supabase, fetched in Server Components with ISR 1h
- **Blog content** → MDX files in `/content/blog/[slug].mdx`
- **Contact form** → `POST /api/contact` → saves to `contact_msgs` + sends email via Resend
- **GitHub stats** → hardcoded in `HARDCODED.md` (TODO: connect real API later)

---

## Key Files

```
src/
  app/
    page.tsx                  ← Home (server component, ISR)
    projects/
      page.tsx                ← Projects list (server)
      [slug]/page.tsx         ← Project detail (server)
    blog/
      page.tsx                ← Blog list (server)
      [slug]/page.tsx         ← MDX post page (server)
    contact/
      page.tsx                ← Contact form (client)
    api/
      contact/route.ts        ← POST handler — Resend + Supabase
    globals.css               ← Design system tokens
    layout.tsx                ← Root layout — fonts, theme, navbar, footer
  components/
    home/
      HeroSection.tsx
      CapabilityStrip.tsx
      AboutSection.tsx
      SkillsSection.tsx
      FeaturedProjects.tsx
    projects/
      ProjectCard.tsx         ← Client component (hover effects)
    blog/
      BlogPostRow.tsx         ← Client component (hover effects)
    layout/
      Navbar.tsx
      Footer.tsx              ← Contact CTA in third column
      ThemeProvider.tsx
  lib/
    types.ts                  ← All DB row types + ProjectWithMeta, BlogPostWithMeta
    constants.ts              ← NAV_LINKS, PERSONAL
    mdx.ts                    ← getMdxContent(), getAllBlogSlugs()
    services/
      personal.ts             ← getPersonalInfo(), getSocialLinks()
      skills.ts               ← getSkills()
      capabilities.ts         ← getCapabilities()
      projects.ts             ← getProjects(), getFeaturedProjects(), getProjectBySlug()
      blog.ts                 ← getBlogPosts(), getLatestBlogPosts(), getBlogPostBySlug()
      about.ts                ← getWorkExperience(), getEducation()
      stack.ts                ← getTechStack() (unused on home — StackGrid removed)
content/
  blog/
    ef-core-change-tracker.mdx
    realtime-board-engine-post.mdx
    multitenant-saas-decisions.mdx
    refresh-token-rotation.mdx
DUMMY_DATA.sql                ← Run in Supabase to seed all placeholder data
PHASES.md                     ← this file
PERSONAL.md                   ← fill before launch
DB_CHANGES.md                 ← schema migration log
HARDCODED.md                  ← items to eventually move to DB
```

---

## Phases

### ✅ Phase 1 — Design System
**Status: COMPLETE**

- Installed: `tailwindcss@4.3.0`, `@tailwindcss/postcss`, `clsx`
- Created `postcss.config.mjs`
- Rewrote `globals.css`: `@import "tailwindcss"` + `@theme`, `:root` light, `[data-theme="dark"]` dark, base reset
- Updated `layout.tsx`: removed Geist fonts, set `data-theme="light"`, wired globals.css

---

### ✅ Phase 2 — Supabase
**Status: COMPLETE**

- Installed `@supabase/supabase-js` v2
- TypeScript types for all tables → `src/lib/types.ts`
- Browser singleton → `src/lib/supabase/client.ts`
- Server factory → `src/lib/supabase/server.ts`
- Schema: personal_info, social_links, work_experience, education, categories, tags, projects, project_images, project_tags, blog_posts, blog_post_tags, skills, capabilities, contact_msgs, tech_stack

---

### ✅ Phase 3 — Layout
**Status: COMPLETE**

- `src/lib/constants.ts` — NAV_LINKS (Home, Projects, Blog, Contact) + PERSONAL constants
- `src/components/layout/ThemeProvider.tsx` — no-FOUC theme via DOM attribute
- `src/components/layout/Navbar.tsx` — sticky, blur backdrop, scroll border, liquid nav pill, active link
- `src/components/layout/Footer.tsx` — brand col, nav col, contact CTA col; social icons from DB
- `src/app/layout.tsx` — Space Grotesk + Inter via `next/font/google`
- `ScrollReset`, `ScrollIndicator` scroll-to-top button

**Key decisions:**
- All Navbar scroll effects use direct DOM refs — no React re-renders
- Theme toggle reads from `document.documentElement` attribute — fixed first-click no-op bug
- EN/AR language toggle removed

---

### ✅ Phase 4 — Home Page
**Status: COMPLETE**

**Current sections (in order):**
1. `HeroSection` — badge, headline, sub, two CTAs, TiltCard with 3D mouse effect + shine
2. `CapabilityStrip` — scrolling strip from `capabilities` table
3. `AboutSection` — bio, photo, stats strip (Location, Experience, Status, Mode), CV button
4. `SkillsSection` — 3-col panel grid, each panel has 2-col skill cards with ring + progress bar
5. `FeaturedProjects` — 3-col preview cards linking to `/projects/[slug]`

Services:
- `skills.ts`, `capabilities.ts`, `projects.ts` (getFeaturedProjects) — all `unstable_cache` 1h

**Note:** `StackGrid` (Tech Stack marquee) was built but removed per user decision.

---

### ✅ Phase 5 — Projects Page
**Status: COMPLETE**

- `src/app/projects/page.tsx` — server component, ISR 1h; featured projects full-width, rest 2-col 12-grid
- `src/app/projects/[slug]/page.tsx` — detail page: description, tech stack sidebar, live/GitHub links; `generateStaticParams` from DB
- `src/components/projects/ProjectCard.tsx` — client component; hover: border color, shadow, translateY
- `src/lib/services/projects.ts` — `getProjects()`, `getFeaturedProjects()`, `getProjectBySlug()`; Supabase nested select with category + tags + cover image

**Data needed:** Run `DUMMY_DATA.sql` in Supabase SQL editor.

---

### ✅ Phase 6 — Blog
**Status: COMPLETE**

- `src/app/blog/page.tsx` — server component; post list with date, reading time, category, excerpt
- `src/app/blog/[slug]/page.tsx` — server component; metadata from Supabase, content from MDX via `next-mdx-remote/rsc`
- `src/components/blog/BlogPostRow.tsx` — client component; slide-left hover with accent bar
- `src/lib/mdx.ts` — `getMdxContent(slug)` reads `/content/blog/[slug].mdx`
- `src/lib/services/blog.ts` — `getBlogPosts()`, `getLatestBlogPosts()`, `getBlogPostBySlug()`
- `content/blog/` — 4 placeholder MDX posts with real technical content

**MDX components:** styled `h2`, `h3`, `p`, `ul`, `li`, `strong`, `pre`, `code`, `hr` — no syntax highlighter yet (Phase 8 candidate).

---

### ✅ Phase 7 — Contact Page + Route Handler
**Status: COMPLETE**

- `src/app/contact/page.tsx` — client component; name/email/message fields with focus states, character counter on message, loading spinner, success/error states
- `src/app/api/contact/route.ts` — validates input, saves to `contact_msgs`, sends email via Resend
- Footer third column replaced with Contact CTA — headline, description, "Start a conversation" button, email link

**Needs before going live:**
- Add `RESEND_API_KEY` to `.env.local` (get from resend.com)
- Verify sender domain in Resend dashboard (currently sends from `onboarding@resend.dev`)

---

### ⏳ Phase 8 — Animations
- Install `framer-motion`
- Scroll-reveal on all sections (stagger children)
- Page transition (fade/slide on route change)
- Skill ring + progress bar animate on scroll entry (replace current IntersectionObserver impl)
- Hero card float + rotate
- Counter animation in About stats strip

---

### ⏳ Phase 9 — SEO
- `metadata` export on every page (title, description, OG tags)
- `app/opengraph-image.tsx` — dynamic OG image
- `app/sitemap.ts` — auto-generated from DB slugs
- `app/robots.ts`
- JSON-LD structured data (Person, WebSite)

**Needs before SEO:** fill `PERSONAL.md` OG fields + set site URL in `.env.local`.

---

### ⏳ Phase 10 — Deploy
- Vercel project setup + `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `RESEND_API_KEY` env vars
- Run `DUMMY_DATA.sql` in production Supabase (or replace with real data)
- Remove `/debug` page
- Custom domain + DNS
- Final ISR smoke test

---

## Key Decisions Made

| Decision | Reason |
|----------|--------|
| Tailwind v4 (not v3) | Latest stable, CSS-first `@theme`, no config file needed |
| `clsx` only, no `tailwind-merge` | Portfolio controls its own classes — no conflicts |
| No `cn()` wrapper | Unnecessary abstraction at this scale |
| CSS vars for theming, Tailwind for layout | Design system is CSS-var based |
| `unstable_cache` on all services | Eliminates navigation latency — ISR 1h |
| Server Components fetch, Client Components interact | Event handlers only in `'use client'` files |
| MDX content + Supabase metadata for blog | Metadata is queryable/filterable; content stays in version control |
| StackGrid removed | Redundant with SkillsSection; user decision |
| No /about page | About content lives on home page |
| Footer contact form → CTA | Drives traffic to full /contact page; simpler footer |
