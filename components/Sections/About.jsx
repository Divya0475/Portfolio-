import Reveal from '../Reveal/Reveal';
import styles from './Sections.module.css';

export default function About({ about }) {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-h">
      <div className={styles.inner}>
        <Reveal>
          <h2 id="about-h" className={styles.title}>Building AI that people can actually use</h2>
        </Reveal>
        <div className={styles.aboutGrid}>
          <Reveal className={styles.prose} delay={120}>
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <div className={styles.stats}>
            {about.stats.map((s, i) => (
              <Reveal key={s.label} delay={160 + i * 110} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
