# Database Changes Log

Schema changes and seed operations applied to Supabase.
Add pending changes here, then move to "Applied" once run.

---

## Applied Changes

### ✅ 1 — Skills: add `proficiency` and `description` columns
**Applied:** 2026-05-09

```sql
ALTER TABLE skills
  ADD COLUMN IF NOT EXISTS proficiency smallint CHECK (proficiency BETWEEN 1 AND 5),
  ADD COLUMN IF NOT EXISTS description text;
```

**Where used:** `SkillsSection.tsx` — `proficiency` renders as ring/progress percentage.

---

### ✅ 2 — Tech stack table
**Applied:** 2026-05-09

```sql
CREATE TABLE IF NOT EXISTS tech_stack (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  abbr        text NOT NULL,
  category    text NOT NULL CHECK (category IN ('backend', 'frontend', 'tools')),
  color       text NOT NULL,
  description text,
  "order"     smallint NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE tech_stack ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON tech_stack FOR SELECT USING (true);
```

**Note:** `StackGrid` component was later removed from the home page. The `tech_stack` table
and `stack.ts` service still exist but are not rendered anywhere currently.

---

### ✅ 3 — personal_info: add location + experience columns
**Applied:** 2026-05-09

```sql
ALTER TABLE personal_info
  ADD COLUMN IF NOT EXISTS years_experience  smallint,
  ADD COLUMN IF NOT EXISTS location_city     text,
  ADD COLUMN IF NOT EXISTS location_country  text,
  DROP COLUMN IF EXISTS location;
```

**Where used:** `AboutSection.tsx` stats strip — Location and Experience tiles.

---

### ✅ 4 — personal_info: add `availability_note` column
**Applied:** 2026-05-16 (pending — run before launch)

```sql
ALTER TABLE personal_info
  ADD COLUMN IF NOT EXISTS availability_note text;

UPDATE personal_info SET availability_note = 'Available for work — Q2 2026';
```

**Where used:** `HeroSection.tsx` — badge text when `open_to_work` is true.
Falls back to `'Available for work'` if null.

---

### ✅ 5 — Seed dummy data (all new pages)
**File:** `DUMMY_DATA.sql` — run in Supabase SQL editor
**Applied:** pending — run before testing Projects and Blog pages

Seeds the following tables:
- `categories` — 5 rows (3 project, 2 blog)
- `tags` — 15 rows (C#, .NET, ASP.NET Core, Angular, React, etc.)
- `projects` — 6 rows (3 featured, 3 regular)
- `project_tags` — junction rows for all projects
- `work_experience` — 3 rows (freelance current, 2 past)
- `education` — 1 row (University of Damascus, BSc Computer Science)
- `blog_posts` — 4 rows matching the MDX files in `/content/blog/`
- `blog_post_tags` — junction rows for all posts

**Note:** All tables already have RLS + public read policy from Phase 2 schema setup.
If queries return empty, check RLS policies and re-run grants.

---

## Pending Changes

None currently. All schema is up to date.

---

## RLS + Grant Reminder

Any new table created via the SQL editor needs:
```sql
ALTER TABLE <table_name> ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON <table_name> FOR SELECT USING (true);
GRANT SELECT ON <table_name> TO anon;
```
Also clear `.next` cache after schema changes: delete the `.next` folder and restart dev server.
