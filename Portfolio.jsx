import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:       #0a0f0d;
    --surface:  #111710;
    --border:   #1f2b23;
    --accent:   #5fc97e;
    --accent2:  #2d6a4f;
    --text:     #e8f0ea;
    --muted:    #6b7f70;
    --serif:    'Playfair Display', Georgia, serif;
    --mono:     'DM Mono', 'Courier New', monospace;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--mono);
    font-size: 14px;
    line-height: 1.7;
    overflow-x: hidden;
  }

  ::selection { background: var(--accent); color: var(--bg); }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; } 50% { opacity: 0; }
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(95,201,126,0.3); }
    50%       { box-shadow: 0 0 0 8px rgba(95,201,126,0); }
  }
`;

/* ─────────────────────────────────────────────
   DATA — Anselm Munango
───────────────────────────────────────────── */
const DATA = {
  name:    "Anselm Munango",
  title:   "Aspiring Software Developer",
  tagline: "Python enthusiast and BYU-Idaho student building purposeful software — one project at a time.",
  about: `I'm a student at Brigham Young University–Idaho pursuing a Bachelor of Science in
Professional Studies. My programming journey started with Python, HTML5, and CSS,
and I've been building hands-on projects ever since to sharpen my skills.

Before university, I served a two-year mission for The Church of Jesus Christ of
Latter-day Saints in Kumasi, Ghana — an experience that shaped my discipline,
cross-cultural communication, and heart for service. I bring that same dedication
to every line of code I write.

I'm actively seeking entry-level developer roles, internships, and collaborative
projects where I can grow, contribute, and deliver real value.`,
  skills: [
    {
      category: "Languages",
      items: ["Python", "HTML5", "CSS"],
    },
    {
      category: "Tools & Platforms",
      items: ["Git & GitHub", "VS Code", "Command Line (CLI)"],
    },
    {
      category: "Currently Learning",
      items: ["JavaScript", "SQL / Databases", "Flask (Python Web)"],
    },
    {
      category: "Soft Skills",
      items: ["Cross-Cultural Communication", "Self-Directed Learning", "Problem Solving", "Team Collaboration"],
    },
  ],
  projects: [
    {
      title: "WWR — Web Project",
      tech:  ["HTML5", "CSS"],
      desc:  "A front-end project demonstrating semantic HTML layout, responsive CSS design, and clean visual organisation principles.",
      link:  "https://github.com/f-anselm88",
    },
    {
      title: "Simple Calculator",
      tech:  ["Python"],
      desc:  "A command-line calculator built in Python supporting addition, subtraction, multiplication, and division with input validation and error handling.",
      link:  "https://github.com/f-anselm88",
    },
    {
      title: "Number Guessing Game",
      tech:  ["Python"],
      desc:  "An interactive Python game that generates a random number and guides the player with directional hints, tracking attempts per round.",
      link:  "https://github.com/f-anselm88",
    },
    {
      title: "MadLibs",
      tech:  ["Python"],
      desc:  "A Python word-substitution story generator. The user supplies nouns, verbs, and adjectives; the program composes a personalised narrative on the fly.",
      link:  "https://github.com/f-anselm88",
    },
    {
      title: "Hangman Game",
      tech:  ["Python"],
      desc:  "Classic terminal Hangman in Python with a randomised word bank, letter-tracking, and progressive ASCII art drawn for each missed guess.",
      link:  "https://github.com/f-anselm88",
    },
  ],
  contact: {
    email:    "anselm.mu@gmail.com",
    github:   "github.com/f-anselm88",
    linkedin: "linkedin.com/in/anselm-munango-bs",
  },
};

/* ─────────────────────────────────────────────
   HOOK: useInView
   Fires once when an element enters the viewport.
   Returns { ref, visible } — attach ref to the
   element you want to animate on scroll.
───────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ─────────────────────────────────────────────
   HOOK: useTypewriter
   Cycles through an array of strings with a
   realistic typing + deleting cursor effect.
───────────────────────────────────────────── */
function useTypewriter(words, speed = 90, pause = 1800) {
  const [display,  setDisplay]  = useState("");
  const [wordIdx,  setWordIdx]  = useState(0);
  const [charIdx,  setCharIdx]  = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const tick = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx(c => c + 1);
        }
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx(i => (i + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx(c => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(tick);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

/* ─────────────────────────────────────────────
   HOOK: useActiveSection
   Listens to scroll events and returns the id
   of whichever section is currently in focus,
   used to highlight the correct nav link.
───────────────────────────────────────────── */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const onScroll = () => {
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          setActive(ids[i]);
          return;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);

  return active;
}

/* ─────────────────────────────────────────────
   COMPONENT: Navbar
───────────────────────────────────────────── */
function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["about", "skills", "projects", "contact"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? "12px 40px" : "22px 40px",
      background: scrolled ? "rgba(10,15,13,0.94)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "none",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      transition: "all 0.3s ease",
    }}>
      <span style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--accent)", fontWeight: 700, letterSpacing: 1 }}>
        AM<span style={{ color: "var(--muted)" }}>.</span>
      </span>

      <div style={{ display: "flex", gap: 32 }}>
        {links.map(id => (
          <a key={id} href={`#${id}`} style={{
            color: active === id ? "var(--accent)" : "var(--muted)",
            textDecoration: "none", fontSize: 12,
            letterSpacing: 2, textTransform: "uppercase",
            transition: "color 0.2s",
          }}>
            {id}
          </a>
        ))}
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0,
        height: 2, width: `${progress}%`,
        background: "var(--accent)",
        transition: "width 0.1s linear",
      }} />
    </nav>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT: Hero
───────────────────────────────────────────── */
function Hero() {
  const roles = [
    "Aspiring Software Developer",
    "Python Enthusiast",
    "BYU-Idaho Student",
    "Future Full-Stack Engineer",
  ];
  const typed = useTypewriter(roles);

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "0 40px", position: "relative", overflow: "hidden",
    }}>
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(var(--border) 1px, transparent 1px),
          linear-gradient(90deg, var(--border) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        opacity: 0.4,
      }} />

      {/* Glowing orb */}
      <div style={{
        position: "absolute", top: "15%", right: "8%",
        width: 480, height: 480, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(95,201,126,0.07) 0%, transparent 70%)",
        filter: "blur(60px)", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 820 }}>
        {/* Open-to-work badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: "var(--surface)", border: "1px solid var(--border)",
          padding: "8px 16px", marginBottom: 28,
          animation: "fadeUp 0.5s ease forwards",
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "var(--accent)",
            animation: "pulse 2s infinite",
            display: "inline-block",
          }} />
          <span style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--accent)" }}>
            Open to Opportunities
          </span>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(46px, 7.5vw, 92px)",
          fontWeight: 900, lineHeight: 1.05,
          color: "var(--text)", marginBottom: 14,
          animation: "fadeUp 0.7s 0.1s ease forwards", opacity: 0,
        }}>
          {DATA.name}
        </h1>

        {/* Typewriter role */}
        <h2 style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(20px, 3.5vw, 38px)",
          fontWeight: 400, fontStyle: "italic",
          color: "var(--accent)", marginBottom: 24,
          animation: "fadeUp 0.7s 0.2s ease forwards", opacity: 0,
          minHeight: 52,
        }}>
          {typed}
          <span style={{ animation: "blink 1s infinite", marginLeft: 2 }}>|</span>
        </h2>

        {/* Tagline */}
        <p style={{
          fontSize: 15, color: "var(--muted)", maxWidth: 560, lineHeight: 1.9,
          animation: "fadeUp 0.7s 0.3s ease forwards", opacity: 0, marginBottom: 44,
        }}>
          {DATA.tagline}
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: "flex", gap: 16, flexWrap: "wrap",
          animation: "fadeUp 0.7s 0.4s ease forwards", opacity: 0,
        }}>
          <a href="#projects" style={btnStyle("filled")}>View My Projects</a>
          <a href="#contact"  style={btnStyle("outline")}>Hire Me</a>
        </div>
      </div>
    </section>
  );
}

function btnStyle(variant) {
  const base = {
    padding: "12px 28px", textDecoration: "none",
    fontFamily: "var(--mono)", fontSize: 12,
    letterSpacing: 2, textTransform: "uppercase",
    transition: "all 0.2s ease", cursor: "pointer",
  };
  return variant === "filled"
    ? { ...base, background: "var(--accent)", color: "var(--bg)", border: "1px solid var(--accent)" }
    : { ...base, background: "transparent", color: "var(--text)", border: "1px solid var(--border)" };
}

/* ─────────────────────────────────────────────
   COMPONENT: About
───────────────────────────────────────────── */
function About() {
  const { ref, visible } = useInView();

  const stats = [
    { label: "Mission Service",  value: "2 Yrs"  },
    { label: "Projects Built",   value: "5+"     },
    { label: "Languages Known",  value: "3"      },
    { label: "University",       value: "BYU-I"  },
  ];

  const highlights = [
    { icon: "🎓", title: "Brigham Young University – Idaho", sub: "BSc Professional Studies · In Progress" },
    { icon: "🌍", title: "Ghana Kumasi Mission", sub: "2-Year Service · The Church of Jesus Christ of Latter-day Saints" },
  ];

  return (
    <section id="about" ref={ref} style={{ padding: "120px 40px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionLabel label="01 — About" />

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}>
        {/* Bio + highlights */}
        <div>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: 36, fontWeight: 700, marginBottom: 24, lineHeight: 1.2 }}>
            Coding with<br />
            <span style={{ color: "var(--accent)", fontStyle: "italic" }}>purpose & drive.</span>
          </h3>

          <p style={{ color: "var(--muted)", lineHeight: 2, whiteSpace: "pre-line", marginBottom: 36 }}>
            {DATA.about}
          </p>

          {/* Education & Mission cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {highlights.map(({ icon, title, sub }) => (
              <div key={title} style={{
                display: "flex", alignItems: "flex-start", gap: 14,
                background: "var(--surface)", border: "1px solid var(--border)",
                padding: "16px 20px",
              }}>
                <span style={{ fontSize: 22 }}>{icon}</span>
                <div>
                  <div style={{ color: "var(--text)", fontWeight: 500, fontSize: 14 }}>{title}</div>
                  <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 2 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>

          <a href={`https://${DATA.contact.github}`} target="_blank" rel="noreferrer" style={{
            display: "inline-block", marginTop: 28,
            color: "var(--accent)", fontSize: 12,
            letterSpacing: 2, textTransform: "uppercase",
            textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 3,
          }}>
            View My GitHub →
          </a>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          {stats.map(({ label, value }) => (
            <div key={label} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              padding: "32px 24px",
            }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: 44, fontWeight: 900, color: "var(--accent)" }}>
                {value}
              </div>
              <div style={{ color: "var(--muted)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginTop: 8 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT: Skills
───────────────────────────────────────────── */
function Skills() {
  const { ref, visible } = useInView();

  return (
    <section id="skills" ref={ref} style={{
      padding: "120px 40px",
      background: "var(--surface)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel label="02 — Skills" />
        <h3 style={{ fontFamily: "var(--serif)", fontSize: 38, fontWeight: 700, marginBottom: 56 }}>
          Technical Toolkit
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
          {DATA.skills.map(({ category, items }, idx) => (
            <div key={category} style={{
              background: "var(--bg)", border: "1px solid var(--border)",
              padding: "32px 28px",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(20px)",
              transition: `opacity 0.6s ${idx * 0.1}s ease, transform 0.6s ${idx * 0.1}s ease`,
            }}>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "var(--accent)", marginBottom: 20, fontWeight: 500 }}>
                {category}
              </div>
              <ul style={{ listStyle: "none" }}>
                {items.map(skill => (
                  <li key={skill} style={{
                    color: "var(--text)", fontSize: 13, padding: "9px 0",
                    borderBottom: "1px solid var(--border)",
                    display: "flex", alignItems: "center", gap: 10,
                  }}>
                    <span style={{ color: "var(--accent)", fontSize: 10 }}>▸</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT: Projects
───────────────────────────────────────────── */
function Projects() {
  const { ref, visible } = useInView();
  const [hovered, setHovered] = useState(null);

  return (
    <section id="projects" ref={ref} style={{ padding: "120px 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel label="03 — Work" />
        <h3 style={{ fontFamily: "var(--serif)", fontSize: 38, fontWeight: 700, marginBottom: 16 }}>
          Selected Projects
        </h3>
        <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 52 }}>
          Built with Python, HTML5 & CSS — source available on GitHub.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {DATA.projects.map(({ title, tech, desc, link }, idx) => (
            <a key={title} href={link} target="_blank" rel="noreferrer"
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "block", textDecoration: "none",
                background: hovered === idx ? "var(--surface)" : "transparent",
                border: `1px solid ${hovered === idx ? "var(--accent)" : "var(--border)"}`,
                padding: "36px 32px",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(20px)",
                transition: `opacity 0.6s ${idx * 0.08}s ease, transform 0.6s ${idx * 0.08}s ease, background 0.2s, border-color 0.2s`,
                gridColumn: idx === 3 ? "1 / 2" : idx === 4 ? "2 / 3" : "auto",
              }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: 44, fontWeight: 900, color: "var(--border)", marginBottom: 10 }}>
                {String(idx + 1).padStart(2, "0")}
              </div>
              <h4 style={{
                fontFamily: "var(--serif)", fontSize: 20, fontWeight: 700,
                color: hovered === idx ? "var(--accent)" : "var(--text)",
                marginBottom: 10, transition: "color 0.2s",
              }}>
                {title}
              </h4>
              <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.8, marginBottom: 20 }}>{desc}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {tech.map(t => (
                  <span key={t} style={{
                    background: "var(--border)", color: "var(--muted)",
                    padding: "3px 10px", fontSize: 10, letterSpacing: 1,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
              <div style={{
                marginTop: 20, fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
                color: hovered === idx ? "var(--accent)" : "var(--border)",
                transition: "color 0.2s",
              }}>
                View on GitHub ↗
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT: Contact
───────────────────────────────────────────── */
function Contact() {
  const { ref, visible } = useInView();
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(DATA.contact.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section id="contact" ref={ref} style={{
      padding: "120px 40px",
      background: "var(--surface)",
      borderTop: "1px solid var(--border)",
      textAlign: "center",
    }}>
      <div style={{
        maxWidth: 700, margin: "0 auto",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}>
        <SectionLabel label="04 — Contact" centered />
        <h3 style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(34px, 5vw, 60px)",
          fontWeight: 900, lineHeight: 1.1, marginBottom: 20,
        }}>
          Let's Connect &<br />
          <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Build Together.</span>
        </h3>
        <p style={{ color: "var(--muted)", lineHeight: 1.9, marginBottom: 44 }}>
          I'm actively seeking entry-level developer roles, internships, and freelance projects.
          Whether you're a recruiter, collaborator, or fellow student — reach out, I'd love to connect.
        </p>

        {/* Click-to-copy email */}
        <button onClick={copyEmail} style={{
          background: "none", border: "none", cursor: "pointer",
          fontFamily: "var(--serif)", fontSize: "clamp(16px, 3vw, 26px)",
          color: "var(--accent)",
          borderBottom: "2px solid var(--accent)", paddingBottom: 4,
          transition: "opacity 0.2s",
        }}>
          {copied ? "✓  Copied to clipboard!" : DATA.contact.email}
        </button>

        <p style={{ color: "var(--border)", fontSize: 10, letterSpacing: 2, marginTop: 10 }}>
          CLICK TO COPY
        </p>

        {/* Social links */}
        <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 52 }}>
          {[
            { label: "GitHub",   url: `https://${DATA.contact.github}`   },
            { label: "LinkedIn", url: `https://${DATA.contact.linkedin}` },
          ].map(({ label, url }) => (
            <a key={label} href={url} target="_blank" rel="noreferrer" style={{
              color: "var(--muted)", textDecoration: "none",
              fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
              transition: "color 0.2s",
            }}>
              {label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT: Footer
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      padding: "24px 40px",
      borderTop: "1px solid var(--border)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <span style={{ color: "var(--border)", fontSize: 12 }}>
        © {new Date().getFullYear()} Anselm Munango
      </span>
      <span style={{ color: "var(--border)", fontSize: 11, letterSpacing: 2 }}>
        BUILT WITH REACT · BYU-IDAHO
      </span>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT: SectionLabel
───────────────────────────────────────────── */
function SectionLabel({ label, centered }) {
  return (
    <div style={{
      fontSize: 10, letterSpacing: 4,
      textTransform: "uppercase", color: "var(--muted)",
      marginBottom: 16, textAlign: centered ? "center" : "left",
    }}>
      {label}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT: App
───────────────────────────────────────────── */
export default function App() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const sectionIds = ["about", "skills", "projects", "contact"];
  const active = useActiveSection(sectionIds);

  return (
    <>
      <Navbar active={active} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
