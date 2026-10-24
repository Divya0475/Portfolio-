# Moka Divya, cinematic portfolio

Next.js (App Router), React, Three.js, GSAP and CSS Modules.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure

```
app/                       layout, global tokens, page
components/VideoIntro/     hero: video, grade, GSAP timeline, controls
components/CinematicLayer/ Three.js particle / bokeh overlay (GPU shader)
components/Navbar/         floating glass nav (appears after the hero)
components/Sections/       About, Skills, Experience + Education + Certifications
components/Projects/       project cards linking to GitHub
components/Contact/        contact cards, message form, footer
components/Reveal/         one-time scroll fade-in wrapper
lib/data.js                profile + project data (edit copy and links here)
public/videos/             intro.mp4 and poster.jpg
```

## Notes

- The contact form opens the visitor's email app with the message filled in (no backend needed). To receive messages directly, point `onSubmit` in `Contact.jsx` at a service such as Formspree or a Next.js route handler.
- Swap the video by replacing `public/videos/intro.mp4` and `poster.jpg`.
- Browsers only autoplay muted video, so sound starts off; the hint badge hides after 7 seconds.
- Particles pause when the hero is off-screen, the tab is hidden, or it is covered by the next section.
- `prefers-reduced-motion` is respected (no scrub, slower particles, instant scroll).
