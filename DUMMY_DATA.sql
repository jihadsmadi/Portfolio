-- ─── Categories ──────────────────────────────────────────────────────────────
INSERT INTO categories (name, slug, type) VALUES
  ('Full Stack',   'full-stack',   'project'),
  ('Backend',      'backend',      'project'),
  ('Frontend',     'frontend',     'project'),
  ('.NET',         'dotnet',       'blog'),
  ('Architecture', 'architecture', 'blog')
ON CONFLICT (slug) DO NOTHING;

-- ─── Tags ─────────────────────────────────────────────────────────────────────
INSERT INTO tags (name, slug) VALUES
  ('C#',           'csharp'),
  ('.NET',         'dotnet'),
  ('ASP.NET Core', 'aspnet-core'),
  ('Angular',      'angular'),
  ('React',        'react'),
  ('Next.js',      'nextjs'),
  ('TypeScript',   'typescript'),
  ('PostgreSQL',   'postgresql'),
  ('SignalR',      'signalr'),
  ('Redis',        'redis'),
  ('Supabase',     'supabase'),
  ('Docker',       'docker'),
  ('EF Core',      'ef-core'),
  ('JWT',          'jwt'),
  ('SaaS',         'saas')
ON CONFLICT (slug) DO NOTHING;

-- ─── Projects ─────────────────────────────────────────────────────────────────
INSERT INTO projects (category_id, title, slug, summary, description, live_url, github_url, featured, "order", status) VALUES
  (
    (SELECT id FROM categories WHERE slug = 'full-stack'),
    'SaaS ERP Platform',
    'saas-erp-platform',
    'Multi-tenant ERP system for SMBs with real-time sync and role-based access.',
    'A production-grade multi-tenant ERP system serving 30+ business clients. Built with ASP.NET Core, Angular, and PostgreSQL with row-level security. Includes real-time notifications via SignalR, CQRS pattern, and full audit logging.',
    NULL, NULL, true, 1, 'published'
  ),
  (
    (SELECT id FROM categories WHERE slug = 'backend'),
    'Real-Time Board Engine',
    'realtime-board-engine',
    'Collaborative task board with real-time sync using SignalR and Redis.',
    'A real-time collaborative board engine with sub-100ms sync across clients. Uses SignalR hubs with Redis backplane for horizontal scaling. Built a custom conflict resolution algorithm for simultaneous edits.',
    NULL, NULL, true, 2, 'published'
  ),
  (
    (SELECT id FROM categories WHERE slug = 'backend'),
    'Auth Microservice',
    'auth-microservice',
    'JWT + refresh-token rotation service with Redis session store.',
    'A standalone authentication microservice implementing PKCE, refresh-token rotation, and device management. Stores sessions in Redis with configurable TTL. Drop-in replacement compatible with any .NET service.',
    NULL, NULL, true, 3, 'published'
  ),
  (
    (SELECT id FROM categories WHERE slug = 'full-stack'),
    'Inventory Management System',
    'inventory-management',
    'Real-time inventory tracking with barcode scanning and Excel reporting.',
    'End-to-end inventory system with barcode scanning, stock alerts, and Excel reporting. Angular frontend with .NET backend, deployed on-premise for a manufacturing client.',
    NULL, NULL, false, 4, 'published'
  ),
  (
    (SELECT id FROM categories WHERE slug = 'frontend'),
    'Portfolio Website',
    'portfolio-website',
    'This portfolio — built with Next.js, Supabase, and MDX.',
    'The very site you are reading. Next.js 16 App Router, Supabase for data, MDX for blog content, and Resend for contact form delivery. ISR for performance, zero layout shift.',
    NULL, 'https://github.com/jihadsmadi', false, 5, 'published'
  ),
  (
    (SELECT id FROM categories WHERE slug = 'backend'),
    'API Gateway Boilerplate',
    'api-gateway-boilerplate',
    'Production-ready ASP.NET Core API gateway with rate limiting and structured logging.',
    'Opinionated ASP.NET Core API gateway with rate limiting, structured logging via Serilog, health checks, and OpenAPI. Used as the base for 4 internal production services.',
    NULL, NULL, false, 6, 'published'
  )
ON CONFLICT (slug) DO NOTHING;

-- ─── Project tags ─────────────────────────────────────────────────────────────
INSERT INTO project_tags (project_id, tag_id)
SELECT p.id, t.id FROM projects p, tags t
WHERE p.slug = 'saas-erp-platform'   AND t.slug IN ('csharp','aspnet-core','angular','postgresql','ef-core','signalr')
UNION ALL
SELECT p.id, t.id FROM projects p, tags t
WHERE p.slug = 'realtime-board-engine' AND t.slug IN ('csharp','aspnet-core','signalr','redis')
UNION ALL
SELECT p.id, t.id FROM projects p, tags t
WHERE p.slug = 'auth-microservice'    AND t.slug IN ('csharp','dotnet','jwt','redis')
UNION ALL
SELECT p.id, t.id FROM projects p, tags t
WHERE p.slug = 'inventory-management' AND t.slug IN ('angular','dotnet','ef-core','postgresql')
UNION ALL
SELECT p.id, t.id FROM projects p, tags t
WHERE p.slug = 'portfolio-website'    AND t.slug IN ('nextjs','typescript','supabase')
UNION ALL
SELECT p.id, t.id FROM projects p, tags t
WHERE p.slug = 'api-gateway-boilerplate' AND t.slug IN ('csharp','aspnet-core','docker')
ON CONFLICT DO NOTHING;

-- ─── Work experience ──────────────────────────────────────────────────────────
INSERT INTO work_experience (company, role, start_date, end_date, description, current, "order") VALUES
  (
    'Freelance',
    'Full-Stack Developer',
    '2022-01-01', NULL,
    'Building SaaS products and ERP systems for clients. Delivered 10+ production applications using .NET, Angular, React, and PostgreSQL. Responsible for architecture, implementation, and deployment.',
    true, 1
  ),
  (
    'Software House',
    'Backend Developer',
    '2019-06-01', '2021-12-31',
    'Led backend development for a multi-tenant HR platform. Designed the database schema, implemented CQRS with MediatR, and built the reporting pipeline that reduced query time by 60%.',
    false, 2
  ),
  (
    'Local Agency',
    'Junior Full-Stack Developer',
    '2017-03-01', '2019-05-31',
    'Built and maintained web applications for local clients. First production exposure to ASP.NET MVC, Angular, and SQL Server in a team environment.',
    false, 3
  )
ON CONFLICT DO NOTHING;

-- ─── Education ────────────────────────────────────────────────────────────────
INSERT INTO education (institution, degree, field, start_date, end_date, "order") VALUES
  ('University of Damascus', 'Bachelor of Science', 'Computer Science', '2013-09-01', '2017-06-30', 1)
ON CONFLICT DO NOTHING;

-- ─── Blog posts ───────────────────────────────────────────────────────────────
INSERT INTO blog_posts (category_id, title, slug, excerpt, published, published_at, reading_time) VALUES
  (
    (SELECT id FROM categories WHERE slug = 'dotnet'),
    'Why I stopped fighting EF Core''s change tracker',
    'ef-core-change-tracker',
    'After two years of fighting EF Core''s change tracker I finally understood what it was actually for — and it changed how I model every domain since.',
    true, '2026-04-12', 9
  ),
  (
    (SELECT id FROM categories WHERE slug = 'architecture'),
    'Building a real-time board engine that doesn''t lie',
    'realtime-board-engine-post',
    'SignalR is easy. Consistent state across 50 concurrent users editing the same board is not. Here is what I learned building one that actually works.',
    true, '2026-03-03', 14
  ),
  (
    (SELECT id FROM categories WHERE slug = 'architecture'),
    'Multi-tenant SaaS: the seven boring decisions you must make first',
    'multitenant-saas-decisions',
    'Before you write a line of code for your SaaS product, you need to make seven architectural decisions that will haunt or save you for years.',
    true, '2026-01-22', 7
  ),
  (
    (SELECT id FROM categories WHERE slug = 'dotnet'),
    'Refresh-token rotation, demystified',
    'refresh-token-rotation',
    'JWT refresh-token rotation sounds simple until you handle concurrent requests, mobile clients, and Redis failover. Here is the full implementation.',
    true, '2025-11-18', 11
  )
ON CONFLICT (slug) DO NOTHING;

-- ─── Blog post tags ───────────────────────────────────────────────────────────
INSERT INTO blog_post_tags (post_id, tag_id)
SELECT p.id, t.id FROM blog_posts p, tags t
WHERE p.slug = 'ef-core-change-tracker'   AND t.slug IN ('dotnet','ef-core')
UNION ALL
SELECT p.id, t.id FROM blog_posts p, tags t
WHERE p.slug = 'realtime-board-engine-post' AND t.slug IN ('signalr','dotnet')
UNION ALL
SELECT p.id, t.id FROM blog_posts p, tags t
WHERE p.slug = 'multitenant-saas-decisions' AND t.slug IN ('saas','dotnet')
UNION ALL
SELECT p.id, t.id FROM blog_posts p, tags t
WHERE p.slug = 'refresh-token-rotation'   AND t.slug IN ('jwt','dotnet','redis')
ON CONFLICT DO NOTHING;
