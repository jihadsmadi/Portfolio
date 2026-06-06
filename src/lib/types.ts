// ─── Row types ────────────────────────────────────────────────────────────────

export type PersonalInfo = {
  id: string
  full_name: string
  title: string
  bio: string | null
  location_city: string | null
  location_country: string | null
  email: string | null
  avatar_url: string | null
  cv_url: string | null
  open_to_work: boolean
  work_location_type: string | null
  work_engagement: string | null
  years_experience: number | null
  availability_note: string | null
  updated_at: string
}

export type SocialLink = {
  id: string
  platform: string
  url: string
  icon_name: string | null
  order: number
}

export type WorkExperience = {
  id: string
  company: string
  role: string
  start_date: string
  end_date: string | null
  description: string | null
  current: boolean
  order: number
}

export type Education = {
  id: string
  institution: string
  degree: string
  field: string | null
  start_date: string
  end_date: string | null
  order: number
}

export type Category = {
  id: string
  name: string
  slug: string
  type: 'project' | 'blog'
  created_at: string
}

export type Tag = {
  id: string
  name: string
  slug: string
  created_at: string
}

export type ProjectStatus = 'draft' | 'published' | 'archived'

export type Project = {
  id: string
  category_id: string | null
  title: string
  slug: string
  summary: string | null
  description: string | null
  live_url: string | null
  github_url: string | null
  featured: boolean
  order: number
  status: ProjectStatus
  created_at: string
  updated_at: string
}

export type ProjectImage = {
  id: string
  project_id: string
  url: string
  alt: string | null
  is_cover: boolean
  order: number
  created_at: string
}

export type ProjectTag = {
  project_id: string
  tag_id: string
}

export type BlogPost = {
  id: string
  category_id: string | null
  title: string
  slug: string
  excerpt: string | null
  published: boolean
  published_at: string | null
  reading_time: number | null
  created_at: string
  updated_at: string
}

export type BlogPostTag = {
  post_id: string
  tag_id: string
}

export type SkillCategory = 'frontend' | 'backend' | 'tools'

export type Skill = {
  id: string
  name: string
  category: SkillCategory
  proficiency: number
  description: string | null
  icon_name: string | null
  order: number
  created_at: string
}

export type TechStack = {
  id: string
  name: string
  abbr: string
  category: string
  color: string
  description: string | null
  order: number
  created_at: string
}

export type Capability = {
  id: string
  title: string
  body: string
  icon_name: string
  order: number
  created_at: string
}

export type ContactMsg = {
  id: string
  name: string
  email: string
  message: string
  read: boolean
  created_at: string
}

// ─── Extended / joined types ──────────────────────────────────────────────────

export type ProjectWithMeta = Project & {
  category: Category | null
  tags: Tag[]
  cover_image: string | null
}

export type BlogPostWithMeta = BlogPost & {
  category: Category | null
  tags: Tag[]
}

// ─── Database type (for createClient<Database>) ───────────────────────────────

export type Database = {
  public: {
    Tables: {
      personal_info: {
        Row: PersonalInfo
        Insert: Omit<PersonalInfo, 'id' | 'updated_at'> & { id?: string; updated_at?: string }
        Update: Partial<Omit<PersonalInfo, 'id'>>
        Relationships: []
      }
      tech_stack: {
        Row: TechStack
        Insert: Omit<TechStack, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<TechStack, 'id'>>
        Relationships: []
      }
      social_links: {
        Row: SocialLink
        Insert: Omit<SocialLink, 'id'> & { id?: string }
        Update: Partial<Omit<SocialLink, 'id'>>
        Relationships: []
      }
      work_experience: {
        Row: WorkExperience
        Insert: Omit<WorkExperience, 'id'> & { id?: string }
        Update: Partial<Omit<WorkExperience, 'id'>>
        Relationships: []
      }
      education: {
        Row: Education
        Insert: Omit<Education, 'id'> & { id?: string }
        Update: Partial<Omit<Education, 'id'>>
        Relationships: []
      }
      categories: {
        Row: Category
        Insert: Omit<Category, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<Category, 'id'>>
        Relationships: []
      }
      tags: {
        Row: Tag
        Insert: Omit<Tag, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<Tag, 'id'>>
        Relationships: []
      }
      projects: {
        Row: Project
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string }
        Update: Partial<Omit<Project, 'id'>>
        Relationships: []
      }
      project_images: {
        Row: ProjectImage
        Insert: Omit<ProjectImage, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<ProjectImage, 'id'>>
        Relationships: []
      }
      project_tags: {
        Row: ProjectTag
        Insert: ProjectTag
        Update: ProjectTag
        Relationships: []
      }
      blog_posts: {
        Row: BlogPost
        Insert: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string }
        Update: Partial<Omit<BlogPost, 'id'>>
        Relationships: []
      }
      blog_post_tags: {
        Row: BlogPostTag
        Insert: BlogPostTag
        Update: BlogPostTag
        Relationships: []
      }
      skills: {
        Row: Skill
        Insert: Omit<Skill, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<Skill, 'id'>>
        Relationships: []
      }
      capabilities: {
        Row: Capability
        Insert: Omit<Capability, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<Capability, 'id'>>
        Relationships: []
      }
      contact_msgs: {
        Row: ContactMsg
        Insert: Omit<ContactMsg, 'id' | 'created_at' | 'read'> & { id?: string; created_at?: string; read?: boolean }
        Update: Partial<Omit<ContactMsg, 'id'>>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
