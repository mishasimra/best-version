import { ArrowLeft, ArrowRight, BriefcaseBusiness, Globe2, Play, Quote, Rocket, Sparkles, Trophy, Users2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../../components/layout/Footer";
import { BrandLogo } from "../../components/ui/BrandLogo";
import { Button, Card, SectionHeader, Stat } from "../../components/ui/UI";

const stats = [
  { label: "Learners growing weekly", value: "15k+" },
  { label: "Freelance and job opportunities", value: "320+" },
  { label: "Mentors and experts", value: "120+" },
  { label: "Projects shipped through the platform", value: "2.1k+" },
];

const features = [
  {
    title: "Discover strengths that actually matter",
    description: "Interactive assessments convert raw ambition into practical learning, career, and project recommendations.",
    icon: Rocket,
  },
  {
    title: "Build proof, not just plans",
    description: "Create projects, join sprints, and keep a live portfolio that evolves as fast as you do.",
    icon: Trophy,
  },
  {
    title: "Earn and get hired from the same hub",
    description: "Freelance gigs, internships, jobs, mentors, and recruiter-ready profiles all connect in one loop.",
    icon: BriefcaseBusiness,
  },
];

const youtubeVideos = [
  // Replace these titles and embed URLs with your own YouTube videos later.
  {
    title: "Momentum that survives low-motivation days",
    description: "A sharper reset on consistency, habit loops, and staying visible over time.",
    embedUrl: "https://www.youtube.com/embed/C0XISfVYt78",
    theme: "Momentum / consistency",
  },
  {
    title: "Projects that become proof",
    description: "Why strong work samples beat vague ambition when you want people to notice.",
    embedUrl: "https://www.youtube.com/embed/Vhh_GeBPOhs",
    theme: "Projects / proof / portfolio",
  },
  {
    title: "Opportunity readiness for internships and beyond",
    description: "A practical watch on standing out for internships, early roles, and growth openings.",
    embedUrl: "https://www.youtube.com/embed/3sK3wJAxGfs",
    theme: "Internships / opportunities",
  },
];

const journeySteps = [
  "Discover your strengths and unlock your next path.",
  "Start a focused course and build a visible progress streak.",
  "Ship portfolio-ready projects and submit your work.",
  "Join competitions, find mentors, and earn through gigs.",
  "Turn your work into a profile recruiters want to open.",
];

const journeyTestimonials = [
  {
    quote: "Best Version gave me a clear sequence: assess, build, compete, earn. It finally felt like my growth had a system.",
    name: "Aarav",
    role: "Frontend learner",
    initials: "AA",
  },
  {
    quote: "The mix of portfolio, mentoring, and startup-style opportunities feels much closer to real career momentum than a normal course platform.",
    name: "Neha",
    role: "Product mentor",
    initials: "NP",
  },
];

function getYouTubeThumbnail(embedUrl) {
  const videoId = embedUrl.split("/embed/")[1]?.split("?")[0];
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
}

export function LandingPage() {
  const carouselSlides = useMemo(
    () => [
      {
        title: "Momentum That Compounds",
        description: "Turn small weekly wins into a streak recruiters can actually feel.",
        meta: "Streaks + visible progress",
        image: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80",
        accent: "7 day climb",
      },
      {
        title: "Projects That Prove It",
        description: "Ship real work with milestones, demos, and portfolio-ready receipts.",
        meta: "Build studio + proof loops",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
        accent: "3 live builds",
      },
      {
        title: "Opportunities Find Signal",
        description: "Surface internships, gigs, and competitions the moment your profile gets sharper.",
        meta: "Internships + gigs + visibility",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
        accent: "41 fresh openings",
      },
    ],
    []
  );
  const [activeSlide, setActiveSlide] = useState(0);
  const [playingVideos, setPlayingVideos] = useState({});

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, behavior: "auto" });

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, []);

  function goToPreviousSlide() {
    setActiveSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  }

  function goToNextSlide() {
    setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
  }

  return (
    <div className="landing">
      <header className="landing-nav">
        <Link className="brand" to="/">
          <BrandLogo compact />
        </Link>
        <div>
          <Link to="/login" className="text-link">
            Log in
          </Link>
          <Link to="/signup">
            <Button>Get started</Button>
          </Link>
        </div>
      </header>

      <section className="hero">
        <div className="hero-pattern" aria-hidden="true" />
        <div className="hero-copy">
          <span className="eyebrow">Youth growth, shipped beautifully</span>
          <h1>Become the strongest version of your career, skillset, and proof of work.</h1>
          <p>
            Best Version helps ambitious people aged 16 to 33 discover strengths, level up skills, build projects,
            join competitions, earn through freelance work, find mentors, and land real opportunities.
          </p>
          <div className="hero-actions">
            <Link to="/signup">
              <Button>Start free</Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary">
                Explore the product <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
          <div className="hero-highlights">
            <span>
              <Sparkles size={16} /> Skill paths that feel personal
            </span>
            <span>
              <Users2 size={16} /> Mentors, teams, and recruiters in one loop
            </span>
            <span>
              <Globe2 size={16} /> Startup-grade proof of work
            </span>
          </div>
          <div className="hero-stats">
            {stats.map((item) => (
              <Stat key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-stage">
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />
            <div className="hero-glow" />
            <div className="hero-constellation" />
            <div className="hero-photo hero-photo-main">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                alt="Builders learning and planning together"
              />
            </div>
            <div className="hero-photo hero-photo-top">
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80"
                alt="Mentor-led discussion with an ambitious youth team"
              />
            </div>
            <div className="hero-photo hero-photo-side">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
                alt="Creative collaborators working on a real project"
              />
            </div>
            <Card className="hero-floating-card hero-floating-card-left">
              <p>Weekly growth pulse</p>
              <strong>+28% skill growth</strong>
              <span>Momentum compounds when projects and opportunities connect.</span>
            </Card>
            <Card className="hero-floating-card hero-floating-card-right">
              <p>Live ecosystem</p>
              <strong>41 open roles</strong>
              <span>18 competitions and mentor matches ready this week.</span>
            </Card>
            <div className="hero-badge-cluster">
              <span>Portfolio-ready builds</span>
              <span>Freelance momentum</span>
              <span>Career signal</span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section animate-on" style={{ "--delay": "0.06s" }}>
        <SectionHeader
          eyebrow="Spotlight"
          title="Momentum you can actually show"
          description="A faster look at how Best Version turns effort into proof, signal, and real opportunities."
        />
        <div className="landing-carousel">
          <div className="landing-carousel-header">
            <div className="landing-carousel-status">
              <span className="landing-carousel-kicker">Now surfacing</span>
              <strong>{carouselSlides[activeSlide].meta}</strong>
            </div>
            <div className="landing-carousel-controls">
              <button type="button" className="landing-carousel-arrow" onClick={goToPreviousSlide} aria-label="Previous spotlight">
                <ArrowLeft size={16} />
              </button>
              <button type="button" className="landing-carousel-arrow" onClick={goToNextSlide} aria-label="Next spotlight">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <div className="landing-carousel-viewport">
          <div className="landing-carousel-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
            {carouselSlides.map((slide, index) => (
              <Card
                key={slide.title}
                className={`landing-carousel-card ${index === activeSlide ? "landing-carousel-card-active" : ""}`}
              >
                <div className="landing-carousel-visual">
                  <img src={slide.image} alt={slide.title} className="landing-carousel-image" />
                  <span className="landing-carousel-badge">{slide.accent}</span>
                </div>
                <div className="landing-carousel-copy">
                  <span>{slide.meta}</span>
                  <strong>{slide.title}</strong>
                  <p>{slide.description}</p>
                </div>
              </Card>
            ))}
          </div>
          </div>
          <div className="landing-carousel-dots">
            {carouselSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                className={index === activeSlide ? "active" : ""}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to ${slide.title}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section animate-on" style={{ "--delay": "0.1s" }}>
        <SectionHeader
          eyebrow="Why it works"
          title="A single platform for learning, building, earning, and getting discovered"
          description="The product experience is designed to feel like a growth engine, not a dashboard graveyard."
        />
        <div className="feature-grid">
          {features.map((feature) => (
            <Card key={feature.title} className="feature-card">
              <feature.icon size={22} />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="landing-section animate-on" style={{ "--delay": "0.21s" }}>
        <SectionHeader
          eyebrow="Watch"
          title="See the Best Version mindset in motion"
          description="Three quick videos that fit the same growth-first energy: momentum, projects, and opportunity readiness."
        />
        <div className="youtube-grid">
          {youtubeVideos.map((video, index) => (
            <Card key={video.title} className="youtube-card">
              <div className="youtube-frame">
                {playingVideos[index] ? (
                  <iframe
                    src={`${video.embedUrl}?autoplay=1&rel=0`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : (
                  <button
                    type="button"
                    className="youtube-preview"
                    onClick={() => setPlayingVideos((current) => ({ ...current, [index]: true }))}
                    aria-label={`Play ${video.title}`}
                  >
                    <img src={getYouTubeThumbnail(video.embedUrl)} alt={video.title} className="youtube-thumbnail" loading="lazy" />
                    <span className="youtube-overlay" />
                    <span className="youtube-play">
                      <Play size={18} fill="currentColor" />
                    </span>
                  </button>
                )}
              </div>
              <div className="youtube-copy">
                <span className="pill">{video.theme}</span>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="landing-section journey-section animate-on" style={{ "--delay": "0.24s" }}>
        <SectionHeader
          eyebrow="Journey"
          title="From self-discovery to paid work"
          description="Every major step is connected, so users always know what to do next."
        />
        <div className="journey-grid">
          {journeySteps.map((step, index) => (
            <Card
              key={step}
              className={`journey-card animate-on ${index === 2 ? "journey-card-featured" : ""}`}
              style={{ "--delay": `${0.28 + index * 0.04}s` }}
            >
              <span className="step-badge">0{index + 1}</span>
              <p>{step}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="landing-section social-proof journey-proof animate-on" style={{ "--delay": "0.32s" }}>
        {journeyTestimonials.map((testimonial) => (
          <Card
            key={testimonial.name}
            className="journey-testimonial-card"
            style={{
              padding: "1.2rem 1.25rem",
              borderRadius: "22px",
              border: "1px solid rgba(19, 33, 23, 0.08)",
              background: "rgba(255, 255, 255, 0.94)",
              boxShadow: "0 14px 28px rgba(19, 33, 23, 0.06)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "40px minmax(0, 1fr)",
                columnGap: "0.9rem",
                rowGap: "0.9rem",
                alignItems: "start",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  borderRadius: "999px",
                  background: "rgba(31, 143, 95, 0.12)",
                  color: "var(--brand-dark)",
                  flexShrink: 0,
                }}
              >
                <Quote size={18} />
              </div>

              <div
                style={{
                  display: "grid",
                  gap: "0.85rem",
                  minWidth: 0,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.97rem",
                    lineHeight: 1.65,
                    color: "var(--text)",
                    width: "100%",
                    maxWidth: "none",
                  }}
                >
                  "{testimonial.quote}"
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7rem",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: "linear-gradient(135deg, rgba(255, 184, 77, 0.88), rgba(31, 143, 95, 0.88))",
                      color: "#173627",
                      fontSize: "0.76rem",
                      fontWeight: 800,
                      letterSpacing: "0.03em",
                    }}
                  >
                    {testimonial.initials}
                  </span>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "0.08rem",
                      minWidth: 0,
                    }}
                  >
                    <strong
                      style={{
                        fontSize: "0.94rem",
                        lineHeight: 1.15,
                        color: "var(--text)",
                        fontWeight: 800,
                      }}
                    >
                      {testimonial.name}
                    </strong>
                    <span
                      style={{
                        fontSize: "0.82rem",
                        lineHeight: 1.2,
                        color: "var(--text-soft)",
                      }}
                    >
                      {testimonial.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </section>

      <footer className="landing-footer">
        <h2>Build your next chapter with proof, momentum, and support.</h2>
        <Link to="/signup">
          <Button>Join Best Version</Button>
        </Link>
      </footer>
      <Footer />
    </div>
  );
}
