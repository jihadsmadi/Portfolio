import { getPersonalInfo, getSocialLinks } from '@/lib/services/personal'
import { getWorkExperience, getEducation } from '@/lib/services/about'
import { getCapabilities } from '@/lib/services/capabilities'
import { getSkills } from '@/lib/services/skills'
import { getFeaturedProjects } from '@/lib/services/projects'
import HeroSection from '@/components/home/HeroSection'
import CapabilityStrip from '@/components/home/CapabilityStrip'
import AboutSection from '@/components/home/AboutSection'
import ExperienceEducationSection from '@/components/home/ExperienceEducationSection'
import SkillsSection from '@/components/home/SkillsSection'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import ContactCTA from '@/components/home/ContactCTA'

export const revalidate = 3600

export default async function HomePage() {
  const [personal, socialLinks, capabilities, skills, featuredProjects, experience, education] =
    await Promise.all([
      getPersonalInfo(),
      getSocialLinks(),
      getCapabilities(),
      getSkills(),
      getFeaturedProjects(),
      getWorkExperience(),
      getEducation(),
    ])

  return (
    <>
      <HeroSection personal={personal} socialLinks={socialLinks} />
      <CapabilityStrip capabilities={capabilities} />
      <AboutSection personal={personal} />
      <ExperienceEducationSection experience={experience} education={education} />
      <SkillsSection skills={skills} />
      <FeaturedProjects projects={featuredProjects} />
      <ContactCTA />
    </>
  )
}
