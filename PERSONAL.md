# Personal Details — Fill Before Launch

Single source of truth for all personal data. Update each field, then enter it in Supabase
(`personal_info` table) or the relevant file.

---

## Identity

| Field        | Value                                      | Status   |
|--------------|--------------------------------------------|----------|
| Full name    | Mohammad Jihad Alsmadi (MHD Jihad Alsmadi) | ✅ filled |
| Short name   | Jihad Al-Smadi                             | ✅ filled |
| Initials     | JS                                         | ✅ filled |
| Location     | Syria, Damascus                            | ✅ filled |
| Tagline      | Full-stack engineer · .NET & Angular       | edit me  |

---

## Contact

| Field        | Value                                               | Status   |
|--------------|-----------------------------------------------------|----------|
| Email        | jihadsmadi41@gmail.com                              | ✅ filled |
| GitHub       | https://github.com/jihadsmadi                       | ✅ filled |
| LinkedIn     | https://www.linkedin.com/in/jihad-smadi-902250226/  | ✅ filled |
| Twitter / X  | —                                                   | fill me  |

---

## Hero Section (`personal_info` table)

| Field             | Value / Note                                                         | Status   |
|-------------------|----------------------------------------------------------------------|----------|
| `open_to_work`    | true / false                                                         | set in DB |
| `availability_note` | e.g. `Available for work — Q2 2026`                                | set in DB — run migration #4 in DB_CHANGES.md |
| `title`           | Sub-headline under the hero heading (from `personal_info.title`)     | set in DB |
| `years_experience`| Integer, shown in About stats strip                                  | set in DB |

---

## About Section (`personal_info` table)

| Field               | Note                                                       | Status   |
|---------------------|------------------------------------------------------------|----------|
| `bio`               | 2–3 paragraphs separated by `\n\n`                        | fill in DB |
| `avatar_url`        | URL to your photo (Supabase Storage or external)          | fill in DB |
| `cv_url`            | URL to your PDF resume                                     | fill in DB |
| `work_engagement`   | `fulltime` / `parttime` / `freelance`                     | set in DB |
| `work_location_type`| `remote` / `hybrid` / `onsite`                            | set in DB |
| `location_city`     | `Damascus`                                                 | ✅ set    |
| `location_country`  | `SY`                                                       | ✅ set    |

---

## Resume / CV

| Field     | Note                                                  | Status  |
|-----------|-------------------------------------------------------|---------|
| CV file   | Upload to Supabase Storage or `/public/cv.pdf`        | pending |
| cv_url    | Set `personal_info.cv_url` in Supabase after upload   | pending |

---

## Projects (Supabase `projects` table)

Replace dummy data in `DUMMY_DATA.sql` with real projects before launch.
Each project needs: `title`, `slug`, `summary`, `description`, `category_id`, `featured`, `order`.
Optional: `live_url`, `github_url`.
Images: insert into `project_images` with `is_cover = true` for the thumbnail.

---

## Blog Posts (Supabase `blog_posts` + `/content/blog/`)

Each post needs:
1. A row in `blog_posts` (title, slug, excerpt, published_at, reading_time, category_id)
2. A matching MDX file at `/content/blog/[slug].mdx`

Current placeholder posts (replace content with real writing):
- `ef-core-change-tracker`
- `realtime-board-engine-post`
- `multitenant-saas-decisions`
- `refresh-token-rotation`

---

## Environment Variables (`.env.local`)

| Variable                        | Value                  | Status   |
|---------------------------------|------------------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL`      | from Supabase dashboard | set      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | from Supabase dashboard | set      |
| `RESEND_API_KEY`                | from resend.com         | **missing** |

---

## SEO / Open Graph (Phase 9)

| Field           | Value                                             | Status  |
|-----------------|---------------------------------------------------|---------|
| Site URL        | https://yourdomain.com                            | fill me |
| OG title        | Jihad Al-Smadi · Full-stack Engineer              | edit me |
| OG description  | Building production-grade .NET & React systems    | edit me |
| Twitter handle  | —                                                 | fill me |
