import Reveal from '../Reveal/Reveal';
import styles from './Sections.module.css';

export default function Experience({ experience, education, certifications }) {
  return (
    <section id="experience" className={styles.section} aria-labelledby="exp-h">
      <div className={styles.inner}>
        <Reveal>
          <h2 id="exp-h" className={styles.title}>Experience and education</h2>
        </Reveal>

        <div className={styles.expGrid}>
          <ol className={styles.timeline}>
            {experience.map((job, i) => (
              <Reveal as="li" key={job.role} delay={i * 140} className={styles.job}>
                <span className={styles.node} aria-hidden="true" />
                <p className={styles.period}>
                  {job.period} <span>{job.note}</span>
                </p>
                <h3 className={styles.role}>{job.role}</h3>
                <p className={styles.org}>{job.org}</p>
                <ul className={styles.points}>
                  {job.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>

          <div className={styles.side}>
            <Reveal className={styles.panel}>
              <h3 className={styles.panelTitle}>Education</h3>
              <p className={styles.role}>{education.degree}</p>
              <p className={styles.org}>{education.school}</p>
              <p className={styles.period}>
                {education.period} <span>{education.score}</span>
              </p>
            </Reveal>
            <Reveal className={styles.panel} delay={140}>
              <h3 className={styles.panelTitle}>Certifications</h3>
              <ul className={styles.certs}>
                {certifications.map((c) => (
                  <li key={c.name}>
                    <span>{c.name}</span>
                    <small>{c.by}</small>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
