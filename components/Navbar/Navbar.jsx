'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import styles from './Navbar.module.css';

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar({ items, name, email }) {
  const ref = useRef(null);

  // Show the bar once the hero is mostly scrolled away. Class toggle only, no re-render.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      ref.current?.classList.toggle(styles.visible, window.scrollY > window.innerHeight * 0.55);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.to(window, { duration: reduce ? 0 : 1.4, ease: 'power3.inOut', scrollTo: { y: `#${id}`, offsetY: 0 } });
  };

  return (
    <header ref={ref} className={styles.bar}>
      <a href="#top" className={styles.brand} onClick={(e) => { e.preventDefault(); gsap.to(window, { duration: 1.4, ease: 'power3.inOut', scrollTo: 0 }); }}>
        {name}
      </a>
      <nav className={styles.links} aria-label="Primary">
        {items.map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={(e) => go(e, item.id)}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className={styles.cta} href={`#contact`} onClick={(e) => go(e, 'contact')}>
        Hire me
      </a>
    </header>
  );
}
