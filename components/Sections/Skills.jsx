import Reveal from '../Reveal/Reveal';
import styles from './Sections.module.css';

export default function Skills({ skills }) {
  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-h">
      <div className={styles.inner}>
        <Reveal>
          <h2 id="skills-h" className={styles.title}>Tools I build with</h2>
          <p className={styles.lede}>From retrieval and embeddings to APIs and the interfaces on top.</p>
        </Reveal>
        <div className={styles.skillGrid}>
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={(i % 3) * 120} className={styles.panel}>
              <h3 className={styles.panelTitle}>{g.group}</h3>
              <ul className={styles.chips}>
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
