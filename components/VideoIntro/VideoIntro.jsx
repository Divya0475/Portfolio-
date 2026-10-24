'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import CinematicLayer from '../CinematicLayer/CinematicLayer';
import styles from './VideoIntro.module.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const HINT_VISIBLE_SECONDS = 7;

/* Inline icons keep the bundle free of icon libraries. */
const Icon = {
  Play: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M8 5.6v12.8a1 1 0 0 0 1.5.86l10.2-6.4a1 1 0 0 0 0-1.72L9.5 4.74A1 1 0 0 0 8 5.6Z" />
    </svg>
  ),
  Pause: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1.2" />
      <rect x="14" y="5" width="4" height="14" rx="1.2" />
    </svg>
  ),
  Muted: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" stroke="none" />
      <path d="m16 9.5 5 5M21 9.5l-5 5" />
    </svg>
  ),
  Sound: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" stroke="none" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  ),
};

export default function VideoIntro({
  videoSrc,
  posterSrc,
  tagline,
  firstName,
  lastName,
  subtitle,
  nextSectionId = 'work',
}) {
  const rootRef = useRef(null);
  const fgRef = useRef(null);
  const ambientRef = useRef(null);
  const layerRef = useRef(null);
  const hintRef = useRef(null);

  // Only the two control icons depend on React state.
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  /* ---------------------------- video control ---------------------------- */
  const hideHint = useCallback(() => {
    if (!hintRef.current) return;
    gsap.to(hintRef.current, {
      autoAlpha: 0,
      y: 8,
      duration: 0.9,
      ease: 'power2.inOut',
      overwrite: true,
    });
  }, []);

  const toggleMute = useCallback(() => {
    const v = fgRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) {
      hideHint();
      if (v.paused) v.play().catch(() => {});
    }
  }, [hideHint]);

  const togglePlay = useCallback(() => {
    const v = fgRef.current;
    const a = ambientRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      a?.play().catch(() => {});
    } else {
      v.pause();
      a?.pause();
    }
  }, []);

  const scrollToNext = useCallback(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.to(window, {
      duration: reduce ? 0 : 1.6,
      ease: 'power3.inOut',
      scrollTo: { y: `#${nextSectionId}`, autoKill: true },
    });
  }, [nextSectionId]);

  /* Autoplay (muted), keep the blurred duplicate in sync with the foreground. */
  useEffect(() => {
    const v = fgRef.current;
    const a = ambientRef.current;
    if (!v || !a) return;

    v.muted = true;
    a.muted = true;
    const start = v.play();
    a.play().catch(() => {});
    if (start) start.catch(() => setPlaying(false)); // autoplay blocked (e.g. low-power mode)

    const onTime = () => {
      if (Math.abs(a.currentTime - v.currentTime) > 0.3) a.currentTime = v.currentTime;
    };
    v.addEventListener('timeupdate', onTime);
    return () => v.removeEventListener('timeupdate', onTime);
  }, []);

  /* ------------------------------ animation ------------------------------ */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      /* Page-load sequence: one slow, orchestrated reveal. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to('[data-anim="veil"]', { opacity: 0, duration: 2.6, ease: 'power2.inOut' }, 0)
        .fromTo(
          '[data-anim="stage"]',
          { scale: 1.09 },
          { scale: 1, duration: 4, ease: 'power2.out' },
          0
        )
        .fromTo(
          '[data-anim="tagline"]',
          { autoAlpha: 0, y: 14, letterSpacing: '0.55em' },
          { autoAlpha: 1, y: 0, letterSpacing: '0.32em', duration: 1.8 },
          1.2
        )
        .fromTo(
          '[data-anim="line"]',
          { yPercent: 115 },
          { yPercent: 0, duration: 1.7, stagger: 0.2, ease: 'power4.out' },
          1.5
        )
        .fromTo(
          '[data-anim="subtitle"]',
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 1.6 },
          2.4
        )
        .fromTo(
          '[data-anim="control"]',
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.12 },
          2.9
        )
        .fromTo(
          '[data-anim="cue"]',
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1.6 },
          3.3
        )
        .fromTo(
          '[data-anim="hint"]',
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 1.2 },
          3.5
        )
        // Sound hint fades itself away after a few seconds.
        .call(
          () => {
            gsap.delayedCall(HINT_VISIBLE_SECONDS, hideHint);
          },
          null,
          3.5
        );

      if (reduce) tl.progress(1);

      /* Scroll: the hero is sticky, so we ease content out and push the film back. */
      if (!reduce) {
        const trigger = { trigger: root, start: 'top top', scrub: 0.6 };

        gsap.to('[data-anim="content"]', {
          yPercent: -12,
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: { ...trigger, end: '+=70%' },
        });
        gsap.to('[data-anim="media"]', {
          scale: 1.07,
          ease: 'none',
          scrollTrigger: { ...trigger, end: '+=100%' },
        });
        gsap.to('[data-anim="dim"]', {
          opacity: 1,
          ease: 'none',
          scrollTrigger: { ...trigger, end: '+=100%' },
        });
      }

      /* Stop rendering particles once the next section fully covers the hero. */
      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: '+=100%',
        onLeave: () => layerRef.current?.setActive(false),
        onEnterBack: () => layerRef.current?.setActive(true),
      });
    }, root);

    return () => ctx.revert();
  }, [hideHint]);

  /* -------------------------------- markup -------------------------------- */
  return (
    <section ref={rootRef} className={styles.hero} aria-label="Introduction">
      <div className={styles.media} data-anim="media">
        <div className={styles.stage} data-anim="stage">
          {/* Blurred duplicate: ambient light behind the sharp video. */}
          <video
            ref={ambientRef}
            className={styles.ambient}
            src={videoSrc}
            poster={posterSrc}
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            disablePictureInPicture
          />
          <video
            ref={fgRef}
            className={styles.fg}
            src={videoSrc}
            poster={posterSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            aria-label="Moka Divya introducing herself"
          />
        </div>
      </div>

      <div className={styles.grade} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.dim} data-anim="dim" aria-hidden="true" />

      <CinematicLayer ref={layerRef} />

      <div className={styles.content} data-anim="content">
        {tagline && (
          <p className={styles.tagline} data-anim="tagline">
            {tagline}
          </p>
        )}
        <h1 className={styles.name}>
          <span className={styles.line}>
            <span className={styles.lineInner} data-anim="line">
              {firstName}
            </span>
          </span>
          <span className={styles.line}>
            <span className={styles.lineInner} data-anim="line">
              {lastName}
            </span>
          </span>
        </h1>
        <p className={styles.subtitle} data-anim="subtitle">
          {subtitle}
        </p>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          ref={hintRef}
          className={styles.hint}
          data-anim="hint"
          onClick={toggleMute}
          aria-label="Turn sound on"
        >
          <span className={styles.hintDot} aria-hidden="true" />
          Tap for sound
        </button>

        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.glass}
            data-anim="control"
            onClick={togglePlay}
            aria-label={playing ? 'Pause video' : 'Play video'}
            aria-pressed={!playing}
          >
            {playing ? <Icon.Pause /> : <Icon.Play />}
          </button>
          <button
            type="button"
            className={styles.glass}
            data-anim="control"
            onClick={toggleMute}
            aria-label={muted ? 'Unmute video' : 'Mute video'}
            aria-pressed={!muted}
          >
            {muted ? <Icon.Muted /> : <Icon.Sound />}
          </button>
        </div>
      </div>

      <button
        type="button"
        className={styles.cue}
        data-anim="cue"
        onClick={scrollToNext}
        aria-label="Scroll down to the next section"
      >
        <span className={styles.cueLabel}>Scroll</span>
        <span className={styles.cueLine} aria-hidden="true" />
      </button>

      <div className={styles.veil} data-anim="veil" aria-hidden="true" />
    </section>
  );
}
