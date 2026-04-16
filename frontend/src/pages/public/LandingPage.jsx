import { ArrowRight, BriefcaseBusiness, Globe2, Rocket, Sparkles, Trophy, Users2 } from "lucide-react";
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

const visualStories = [
  {
    title: "Learn with energy, not friction",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
    meta: "Courses + guided momentum",
  },
  {
    title: "Build proof people can actually see",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    meta: "Projects + portfolio outcomes",
  },
  {
    title: "Connect ambition to opportunities",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    meta: "Mentors + teams + gigs",
  },
];

export function LandingPage() {
  const carouselSlides = useMemo(
    () => [
      {
        title: "Momentum Streaks",
        description: "Keep your weekly streak alive with tiny wins that stack into visibility.",
        meta: "7-day streaks + XP bursts",
      },
      {
        title: "Proof-First Projects",
        description: "Ship real builds with milestones, mentor feedback, and portfolio-ready outcomes.",
        meta: "Build studio + submissions",
      },
      {
        title: "Opportunity Radar",
        description: "Track internships, gigs, and competitions without leaving your growth hub.",
        meta: "Gigs + competitions",
      },
    ],
    []
  );
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [carouselSlides.length]);

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
          title="A carousel of real momentum"
          description="A quick glance at how Best Version keeps growth visible, playful, and high-signal."
        />
        <div className="landing-carousel">
          <div className="landing-carousel-track">
            {carouselSlides.map((slide, index) => (
              <Card
                key={slide.title}
                className={`landing-carousel-card ${index === activeSlide ? "landing-carousel-card-active" : ""}`}
              >
                <strong>{slide.title}</strong>
                <p>{slide.description}</p>
                <span>{slide.meta}</span>
              </Card>
            ))}
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

      <section className="landing-section animate-on" style={{ "--delay": "0.18s" }}>
        <SectionHeader
          eyebrow="Visual energy"
          title="A platform that looks alive because the people inside it are building in public"
          description="We designed the visual language around momentum, collaboration, and visible progress instead of generic startup minimalism."
        />
        <div className="visual-story-grid">
          {visualStories.map((story) => (
            <Card key={story.title} className="visual-story-card">
              <img src={story.image} alt={story.title} className="visual-story-image" />
              <div className="visual-story-copy">
                <span className="pill">{story.meta}</span>
                <h3>{story.title}</h3>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="landing-section animate-on" style={{ "--delay": "0.24s" }}>
        <SectionHeader
          eyebrow="Journey"
          title="From self-discovery to paid work"
          description="Every major step is connected, so users always know what to do next."
        />
        <div className="journey-grid">
          {[
            "Take a strengths assessment and unlock recommended paths.",
            "Enroll in a focused course and keep a visible progress streak.",
            "Build portfolio-ready projects and submit your work.",
            "Join competitions, connect with mentors, and earn through gigs.",
            "Package your proof into a profile recruiters actually want to open.",
          ].map((step, index) => (
            <Card key={step} className="journey-card">
              <span className="step-badge">0{index + 1}</span>
              <p>{step}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="landing-section social-proof animate-on" style={{ "--delay": "0.32s" }}>
        <Card className="testimonial-card">
          <p>
            "Best Version gave me a clear sequence: assess, build, compete, earn. It finally felt like my growth had a
            system."
          </p>
          <strong>Aarav, frontend learner</strong>
        </Card>
        <Card className="testimonial-card">
          <p>
            "The mix of portfolio, mentoring, and startup-style opportunities makes this feel much closer to real
            career momentum than a normal course platform."
          </p>
          <strong>Neha, product mentor</strong>
        </Card>
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
