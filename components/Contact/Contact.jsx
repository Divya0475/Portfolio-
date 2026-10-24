'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Reveal from '../Reveal/Reveal';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollToPlugin);

const Icon = {
  Mail: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7.5 8 6 8-6" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.54h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.55 4.77 5.87V21h-4v-5.1c0-1.22-.02-2.78-1.75-2.78-1.75 0-2.02 1.32-2.02 2.69V21h-4V9.75Z" />
    </svg>
  ),
  Github: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  ),
  Pin: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  ),
};

export default function Contact({ id, profile, location }) {
  const formRef = useRef(null);
  const [status, setStatus] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(formRef.current);
    const name = data.get('name');
    const from = data.get('email');
    const message = data.get('message');
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${from}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus('Opening your email app with the message ready to send.');
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus('Email address copied.');
    } catch {
      setStatus(`Copy failed. My email is ${profile.email}.`);
    }
  };

  const toTop = () =>
    gsap.to(window, { duration: 1.6, ease: 'power3.inOut', scrollTo: 0 });

  const cards = [
    { icon: Icon.Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: Icon.LinkedIn, label: 'LinkedIn', value: 'linkedin.com/in/moka-divya', href: profile.linkedin, external: true },
    { icon: Icon.Github, label: 'GitHub', value: 'github.com/Divya0475', href: profile.github, external: true },
    { icon: Icon.Pin, label: 'Based in', value: location },
  ];

  return (
    <section id={id} className={styles.section} aria-labelledby="contact-h">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.grid}>
          <Reveal className={styles.left}>
            <p className={styles.available}>
              <span className={styles.dot} aria-hidden="true" />
              Open to AI Engineer and Developer roles
            </p>
            <h2 id="contact-h" className={styles.title}>Let&rsquo;s build something together</h2>
            <p className={styles.lede}>
              Hiring for an AI team, or have a project in mind? Send a message and I will reply by email.
            </p>

            <ul className={styles.cards}>
              {cards.map((c) => (
                <li key={c.label}>
                  {c.href ? (
                    <a
                      className={styles.card}
                      href={c.href}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      <span className={styles.icon}>{c.icon}</span>
                      <span className={styles.cardText}>
                        <small>{c.label}</small>
                        {c.value}
                      </span>
                    </a>
                  ) : (
                    <div className={styles.card}>
                      <span className={styles.icon}>{c.icon}</span>
                      <span className={styles.cardText}>
                        <small>{c.label}</small>
                        {c.value}
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140}>
            <form ref={formRef} className={styles.form} onSubmit={onSubmit}>
              <h3 className={styles.formTitle}>Send a message</h3>
              <label>
                Your name
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label>
                Your email
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                Message
                <textarea name="message" rows="5" required />
              </label>
              <div className={styles.actions}>
                <button type="submit" className={styles.send}>Send message</button>
                <button type="button" className={styles.ghost} onClick={copyEmail}>Copy email</button>
              </div>
              <p className={styles.status} role="status" aria-live="polite">{status}</p>
            </form>
          </Reveal>
        </div>

        <footer className={styles.footer}>
          <p>&copy; 2026 {profile.firstName} {profile.lastName}. Built with Next.js, Three.js and GSAP.</p>
          <button type="button" className={styles.top} onClick={toTop}>Back to top</button>
        </footer>
      </div>
    </section>
  );
}
