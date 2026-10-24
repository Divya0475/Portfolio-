import VideoIntro from '../components/VideoIntro/VideoIntro';
import Navbar from '../components/Navbar/Navbar';
import About from '../components/Sections/About';
import Skills from '../components/Sections/Skills';
import Experience from '../components/Sections/Experience';
import Projects from '../components/Projects/Projects';
import Contact from '../components/Contact/Contact';
import {
  profile,
  projects,
  nav,
  about,
  skills,
  experience,
  education,
  certifications,
  location,
} from '../lib/data';

export default function Home() {
  return (
    <>
      <Navbar items={nav} name={`${profile.firstName} ${profile.lastName}`} />
      <main id="top">
        <VideoIntro
          videoSrc="/videos/intro.mp4"
          posterSrc="/videos/poster.jpg"
          tagline={profile.tagline}
          firstName={profile.firstName}
          lastName={profile.lastName}
          subtitle={profile.subtitle}
          nextSectionId="about"
        />
        {/* Everything below slides up over the sticky hero. */}
        <div className="sheet">
          <About about={about} />
          <Skills skills={skills} />
          <Experience experience={experience} education={education} certifications={certifications} />
          <Projects id="work" projects={projects} />
          <Contact id="contact" profile={profile} location={location} />
        </div>
      </main>
    </>
  );
}
