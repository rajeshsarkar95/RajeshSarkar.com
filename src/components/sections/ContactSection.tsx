'use client'

import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react'
import type { IconType } from 'react-icons'
import {
  FiAlertTriangle,
  FiArrowUpRight,
  FiCheck,
  FiCheckCircle,
  FiCopy,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiSend,
} from 'react-icons/fi'
import type { ContactForm } from '@/types'

const API_ENDPOINT = '/api/contact' 
const MESSAGE_MAX = 1000
const EMPTY_FORM: ContactForm = { name: '', email: '', subject: '', message: '' }
const FIELD_ORDER: (keyof ContactForm)[] = ['name', 'email', 'subject', 'message']

interface ContactLink {
  label: string
  value: string
  href: string | null
  icon: IconType
  bg: string
  color: string
  copyable?: boolean
}

const LINKS: ContactLink[] = [
  {
    label: 'Email',
    value: 'prorajeshsarakar@gmail.com',
    href: 'mailto:prorajeshsarakar@gmail.com',
    icon: FiMail,
    bg: 'rgba(108,99,255,0.14)',
    color: '#8b84ff',
    copyable: true,
  },
  {
    label: 'LinkedIn',
    value: 'Rajesh Sarkar',
    href: 'https://www.linkedin.com/in/rajesh-sarkar-9777b0302/',
    icon: FiLinkedin,
    bg: 'rgba(56,189,248,0.14)',
    color: '#38bdf8',
  },
  {
    label: 'GitHub',
    value: 'rajeshsarkar95',
    href: 'https://github.com/rajeshsarkar95',
    icon: FiGithub,
    bg: 'rgba(167,139,250,0.14)',
    color: '#a78bfa',
  },
  {
    label: 'Location',
    value: 'Uttar Pradesh, India',
    href: null,
    icon: FiMapPin,
    bg: 'rgba(52,211,153,0.14)',
    color: '#34d399',
  },
]

/* ---------------------------- Validation ---------------------------- */

function validate(data: ContactForm): Partial<ContactForm> {
  const errors: Partial<ContactForm> = {}
  if (data.name.trim().length < 2) errors.name = 'Please enter your name (min 2 characters).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = 'Please enter a valid email address.'
  if (data.subject.trim().length < 3) errors.subject = 'Subject must be at least 3 characters.'
  if (data.message.trim().length < MESSAGE_MAX) errors.message = `Message must be at least ${MESSAGE_MAX} characters.`
  return errors
}

/* ----------------------------- Component ---------------------------- */

export default function ContactSection() {
  const [form, setForm] = useState<ContactForm>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<ContactForm>>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [copied, setCopied] = useState(false)
  const [honeypot, setHoneypot] = useState('') // bots fill this, humans never see it

  const successTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(
    () => () => {
      clearTimeout(successTimer.current)
      clearTimeout(copyTimer.current)
    },
    [],
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name as keyof ContactForm]) setErrors((er) => ({ ...er, [name]: undefined }))
    if (submitError) setSubmitError('')
  }

  // validate a single field when the user leaves it
  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof ContactForm
    if (!form[name].trim()) return // don't nag on untouched, empty fields
    const fieldError = validate(form)[name]
    setErrors((er) => ({ ...er, [name]: fieldError }))
  }

  const showSuccess = useCallback(() => {
    setSuccess(true)
    setForm(EMPTY_FORM)
    setErrors({})
    clearTimeout(successTimer.current)
    successTimer.current = setTimeout(() => setSuccess(false), 6000)
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (submitting) return

    const errs = validate(form)
    if (Object.keys(errs).length) {
      setErrors(errs)
      const first = FIELD_ORDER.find((k) => errs[k])
      if (first) document.getElementById(first)?.focus()
      return
    }

    // honeypot filled → pretend success, send nothing
    if (honeypot) {
      showSuccess()
      return
    }

    setSubmitting(true)
    setSubmitError('')
    setSuccess(false)

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
        signal: controller.signal,
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
      showSuccess()
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setSubmitError('The request timed out. Please check your connection and try again.')
      } else {
        setSubmitError(err instanceof Error ? err.message : 'Failed to send message. Please try again.')
      }
    } finally {
      clearTimeout(timeout)
      setSubmitting(false)
    }
  }

  const copyEmail = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      clearTimeout(copyTimer.current)
      copyTimer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked — the mailto link still works */
    }
  }

  const messageLength = form.message.length
  const fieldClass = (name: keyof ContactForm, extra = '') =>
    `c-input ${extra} ${errors[name] ? 'c-input-error' : ''}`.trim()

  return (
    <section id="contact" aria-labelledby="contact-heading" className="c-section relative overflow-hidden">
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[var(--accent)]/10 blur-[140px]"
      />

      <div className="c-container">
        <div className="reveal mb-16 text-center">
          <span className="c-section-tag">06 — Contact</span>
          <h2 id="contact-heading" className="c-section-title">
            Let&apos;s <span className="c-gradient-text">Work Together</span>
          </h2>
          <p className="c-section-desc">Have a project in mind? I&apos;d love to hear about it.</p>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-5 lg:gap-14">
          {/* ------------------------ Left: info ------------------------ */}
          <div className="reveal lg:col-span-2">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border2)] bg-[var(--surface)]/50 px-4 py-2 text-sm text-[var(--text2)] backdrop-blur-md">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--green)] opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--green)]" />
              </span>
              Open to new opportunities
            </div>

            <h3 className="font-syne mb-4 text-2xl font-black text-[var(--text)]">Get in Touch</h3>
            <p className="mb-8 text-[15px] leading-relaxed text-[var(--text2)]">
              Whether you have a job opportunity, a project idea, or just want to connect — my inbox is always open.
              I&apos;ll get back to you within 24 hours.
            </p>

            <ul className="flex flex-col gap-3">
              {LINKS.map((l) => {
                const Icon = l.icon
                const external = !!l.href && l.href.startsWith('http')

                const body = (
                  <>
                    <span
                      className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-[11px] transition-transform duration-300 group-hover:scale-110"
                      style={{ background: l.bg, color: l.color }}
                      aria-hidden="true"
                    >
                      <Icon size={18} />
                    </span>
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="font-mono text-[10px] uppercase tracking-[1px] text-[var(--text3)]">{l.label}</span>
                      <span className="truncate text-sm font-medium text-[var(--text)]">{l.value}</span>
                    </span>
                  </>
                )

                return (
                  <li key={l.label} className="group relative">
                    {l.href ? (
                      <a
                        href={l.href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        className={`c-contact-link ${l.copyable ? 'pr-14' : 'pr-11'} transition-transform duration-300 hover:-translate-y-0.5`}
                        aria-label={`${l.label}: ${l.value}${external ? ' (opens in a new tab)' : ''}`}
                      >
                        {body}
                        {!l.copyable && (
                          <FiArrowUpRight
                            aria-hidden="true"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text3)] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                            size={16}
                          />
                        )}
                      </a>
                    ) : (
                      <div className="c-contact-link cursor-default">{body}</div>
                    )}

                    {l.copyable && (
                      <button
                        type="button"
                        onClick={() => copyEmail(l.value)}
                        aria-label={copied ? 'Email address copied' : 'Copy email address'}
                        className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg border border-[var(--border2)] bg-[var(--surface)]/70 text-[var(--text3)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        {copied ? <FiCheck size={14} className="text-[var(--green)]" /> : <FiCopy size={14} />}
                      </button>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* ------------------------ Right: form ----------------------- */}
          <div className="reveal reveal-d2 lg:col-span-3">
            <div className="relative rounded-3xl border border-[var(--border2)] bg-[var(--surface)]/60 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-[var(--accent2)]/10"
              />

              <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[13px] font-medium text-[var(--text2)]">
                      Full Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="John Doe"
                      required
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={fieldClass('name')}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'err-name' : undefined}
                    />
                    {errors.name && (
                      <span id="err-name" role="alert" className="text-[12px] text-red-400">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[13px] font-medium text-[var(--text2)]">
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="john@example.com"
                      required
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={fieldClass('email')}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'err-email' : undefined}
                    />
                    {errors.email && (
                      <span id="err-email" role="alert" className="text-[12px] text-red-400">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-[13px] font-medium text-[var(--text2)]">
                    Subject <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Project opportunity..."
                    required
                    value={form.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={fieldClass('subject')}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'err-subject' : undefined}
                  />
                  {errors.subject && (
                    <span id="err-subject" role="alert" className="text-[12px] text-red-400">
                      {errors.subject}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <label htmlFor="message" className="text-[13px] font-medium text-[var(--text2)]">
                      Message <span aria-hidden="true">*</span>
                    </label>
                    <span
                      className={`font-mono text-[11px] tabular-nums transition-colors ${
                        messageLength > 0 && messageLength < MESSAGE_MAX ? 'text-[var(--text3)]' : 'text-[var(--text2)]'
                      }`}
                      aria-live="off"
                    >
                      {messageLength}/{MESSAGE_MAX}
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    maxLength={MESSAGE_MAX}
                    placeholder="Tell me about your project..."
                    required
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={fieldClass('message', 'resize-none')}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'err-message' : undefined}
                  />
                  {errors.message && (
                    <span id="err-message" role="alert" className="text-[12px] text-red-400">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Honeypot: hidden from people and screen readers, bots tend to fill it */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  aria-busy={submitting}
                  className="c-btn-primary group relative w-full justify-center overflow-hidden py-4 disabled:cursor-not-allowed disabled:opacity-60 disabled:transform-none"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {submitting ? (
                      <>
                        <span
                          className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                          aria-hidden="true"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <FiSend
                          aria-hidden="true"
                          size={15}
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </>
                    )}
                  </span>
                </button>

                <p className="text-center text-[12px] text-[var(--text3)]">
                  Your details are only used to reply to this message.
                </p>

                {/* live regions stay mounted so screen readers announce changes reliably */}
                <div role="status" aria-live="polite">
                  {success && (
                    <div
                      className="flex items-center gap-3 rounded-xl p-4 text-sm font-medium"
                      style={{
                        background: 'rgba(52,211,153,0.1)',
                        border: '1px solid rgba(52,211,153,0.3)',
                        color: 'var(--green)',
                      }}
                    >
                      <FiCheckCircle size={18} aria-hidden="true" className="flex-shrink-0" />
                      Message sent! I&apos;ll get back to you within 24 hours.
                    </div>
                  )}
                </div>
                <div role="alert" aria-live="assertive">
                  {submitError && (
                    <div
                      className="flex items-center gap-3 rounded-xl p-4 text-sm font-medium"
                      style={{
                        background: 'rgba(248,113,113,0.1)',
                        border: '1px solid rgba(248,113,113,0.3)',
                        color: '#f87171',
                      }}
                    >
                      <FiAlertTriangle size={18} aria-hidden="true" className="flex-shrink-0" />
                      {submitError}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}