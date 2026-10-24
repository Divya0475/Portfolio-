import Reveal from '../Reveal/Reveal';
import styles from './Projects.module.css';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true">
    <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
    <path d="M2 3.75A.75.75 0 0 1 2.75 3h9.5a.75.75 0 0 1 0 1.5h-9.5A.75.75 0 0 1 2 3.75Z" />
  </svg>
);

export default function Projects({ id, projects }) {
  return (
    <section id={id} className={styles.section} aria-labelledby="work-heading">
      <div className={styles.inner}>
        <Reveal>
          <h2 id="work-heading" className={styles.heading}>Selected projects</h2>
          <p className={styles.lede}>
            Full-stack development, retrieval-augmented generation and computer vision. Each card
            opens the code on GitHub.
          </p>
        </Reveal>

        <div className={styles.grid}>
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 130} className={styles.cell}>
              <article
                className={styles.card}
                style={{ '--a': p.tint[0], '--b': p.tint[1] }}
              >
                <div className={styles.art} aria-hidden="true">
                  <span className={styles.monogram}>{p.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                  {p.status ? <span className={styles.status}>{p.status}</span> : null}
                </div>
                <div className={styles.body}>
                  <h3 className={styles.name}>{p.name}</h3>
                  <p className={styles.kind}>{p.kind}</p>
                  <p className={styles.description}>{p.description}</p>
                  <ul className={styles.stack}>
                    {p.stack.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <div className={styles.ctaRow}>
                    <a
                      className={`${styles.cta} ${styles.stretchedLink}`}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.name}, view source on GitHub (opens in a new tab)`}
                    >
                      <GithubIcon /> View on GitHub
                    </a>
                    {p.liveUrl && (
                      <a
                        className={`${styles.cta} ${styles.liveLink}`}
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.name}, open live demo (opens in a new tab)`}
                      >
                        <ExternalIcon /> Live demo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
