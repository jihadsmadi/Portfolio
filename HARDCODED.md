# Hardcoded Items — Migration Backlog

Things currently hardcoded in the codebase that should eventually come from the database or
configuration. Ordered by priority.

---

## High Priority

### 1 — About bio fallback paragraphs (`AboutSection.tsx`)

**What:** Bio text used when `personal_info.bio` is null.
**File:** `src/components/home/AboutSection.tsx`
**Migration:** Fill `personal_info.bio` in Supabase (separate paragraphs with `\n\n`).
No code change needed — component already reads from DB.
**Effort:** 10 min data entry.

---

## Medium Priority

### 2 — Hero "What I build" card (`HeroSection.tsx`)

**What:** Card 2 bullet list (4 items describing what you build).
**File:** `src/components/home/HeroSection.tsx`
**Note:** Low value to migrate. Could reuse the `capabilities` table.
**Effort:** Low value, low priority.

---

### 3 — About section heading copy (`AboutSection.tsx`)

**What:** `"Architecture is craft. I treat it that way."` (h2) and sub paragraph.
**File:** `src/components/home/AboutSection.tsx`
**Migration:** Add `about_headline` / `about_sub` to `personal_info`, or keep as-is.
**Effort:** Low value — these rarely change.

---

### 4 — Blog MDX syntax highlighting

**What:** Code blocks in MDX posts render as plain `<pre>/<code>` with no token coloring.
**Fix:** Install `rehype-pretty-code` + `shiki` and wire into `MDXRemote` options in
`src/app/blog/[slug]/page.tsx`.
**Effort:** ~1h. Phase 8 candidate.

---

### 5 — Contact page social links (`contact/page.tsx`)

**What:** `SOCIAL_LINKS` array hardcoded at top of file (email, GitHub, LinkedIn).
**File:** `src/app/contact/page.tsx`
**Migration:** Pass `socialLinks` from `getSocialLinks()` as a server prop — same pattern
as Navbar and Footer which already read from DB.
**Effort:** 30 min.

---

## Low Priority / Keep Hardcoded

### 6 — Nav links (`src/lib/constants.ts`)

Routes are dictated by Next.js file structure. Keeping this hardcoded is correct.

### 7 — Footer column structure (`Footer.tsx`)

Social icons come from DB. The nav links and CTA copy are static — fine to keep hardcoded.

### 8 — Design tokens (`globals.css`)

CSS custom properties are design-system constants. They belong in code, not a DB.

### 9 — FeaturedProjects descriptor chips (`Footer.tsx`)

`['Problem Solver', 'Clean Code', 'Full-Stack', 'Systems Thinker']` in the footer brand col.
These are identity tags that rarely change — fine as-is.

---

## Already Dynamic (No Action Needed)

| Item | Source |
|------|--------|
| Hero badge open/closed state | `personal_info.open_to_work` |
| Hero badge availability text | `personal_info.availability_note` |
| Hero sub-headline | `personal_info.title` |
| About photo | `personal_info.avatar_url` |
| About bio paragraphs | `personal_info.bio` |
| About location | `personal_info.location_city` / `location_country` |
| About availability status | `personal_info.open_to_work` |
| About work engagement | `personal_info.work_engagement` |
| About years experience | `personal_info.years_experience` |
| CV download button | `personal_info.cv_url` (grayed when null) |
| Capability strip | `capabilities` table |
| Skills grid | `skills` table |
| Social links (navbar, footer) | `social_links` table |
| Navbar brand name | `personal_info.full_name` |
| Projects grid | `projects` + `project_tags` + `project_images` tables |
| Blog list | `blog_posts` + `blog_post_tags` + `categories` tables |
| Blog content | MDX files in `/content/blog/` |
| Contact messages | saved to `contact_msgs` table |
| Footer "Open to work" badge | `personal_info.open_to_work` |
