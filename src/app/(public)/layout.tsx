import { getPersonalInfo, getSocialLinks } from '@/lib/services/personal'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollReset from '@/components/layout/ScrollReset'
import ScrollIndicator from '@/components/layout/ScrollIndicator'
import PageTransition from '@/components/motion/PageTransition'

export const revalidate = 3600

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const [personal, socials] = await Promise.all([
    getPersonalInfo(),
    getSocialLinks(),
  ])

  return (
    <>
      <ScrollReset />
      <Navbar personal={personal} />
      <main><PageTransition>{children}</PageTransition></main>
      <Footer personal={personal} socials={socials} />
      <ScrollIndicator />
    </>
  )
}
