import type { Metadata } from 'next'
import { getSocialLinks } from '@/lib/services/personal'
import ContactForm from './ContactForm'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Contact',
  description: "Let's build something solid. Reach out for project inquiries, architecture reviews, or freelance engagements.",
}

export default async function ContactPage() {
  const socialLinks = await getSocialLinks()
  return <ContactForm socialLinks={socialLinks} />
}
