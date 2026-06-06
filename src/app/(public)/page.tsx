import { getPersonalInfo, getSocialLinks } from '@/lib/services/personal'
import { getCapabilities } from '@/lib/services/capabilities'
import { getSkills } from '@/lib/services/skills'
import { getFeaturedProjects } from '@/lib/services/projects'
import HeroSection from '@/components/home/HeroSection'
import CapabilityStrip from '@/components/home/CapabilityStrip'
import AboutSection from '@/components/home/AboutSection'
import SkillsSection from '@/components/home/SkillsSection'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import ContactCTA from '@/components/home/ContactCTA'

export const revalidate = 3600

export default async function HomePage() {
  const [personal, socialLinks, capabilities, skills, featuredProjects] = await Promise.all([
    getPersonalInfo(),
    getSocialLinks(),
    getCapabilities(),
    getSkills(),
    getFeaturedProjects(),
  ])

  console.log("Personal Info: ",personal)
  return (
    <>
      <HeroSection personal={personal} socialLinks={socialLinks} />
      <CapabilityStrip capabilities={capabilities} />
      <AboutSection personal={personal} />
      <SkillsSection skills={skills} />
      <FeaturedProjects projects={featuredProjects} />
      <ContactCTA />
    </>
  )
}
