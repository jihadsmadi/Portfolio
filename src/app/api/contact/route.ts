import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message } = body as { name?: string; email?: string; message?: string }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }
    if (message.length > 2000) {
      return NextResponse.json({ error: 'Message too long.' }, { status: 400 })
    }

    const db = createServerClient()
    await db.from('contact_msgs').insert({ name: name.trim(), email: email.trim(), message: message.trim() })

    const resend = new Resend(process.env.RESEND_API_KEY)
    const fromEmail = process.env.RESEND_FROM ?? 'Portfolio Contact <onboarding@resend.dev>'
    await resend.emails.send({
      from: fromEmail,
      to: process.env.CONTACT_TO_EMAIL ?? 'jihadsmadi41@gmail.com',
      replyTo: email.trim(),
      subject: `New message from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
