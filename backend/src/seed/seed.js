import { pathToFileURL } from "url";
import { connectDatabase, disconnectDatabase } from "../config/db.js";
import { Application } from "../models/Application.js";
import { Competition } from "../models/Competition.js";
import { Connection } from "../models/Connection.js";
import { Course } from "../models/Course.js";
import { Enrollment } from "../models/Enrollment.js";
import { FeedPost } from "../models/FeedPost.js";
import { FreelanceJob } from "../models/FreelanceJob.js";
import { LeaderboardEntry } from "../models/LeaderboardEntry.js";
import { Mentor } from "../models/Mentor.js";
import { MentorshipRequest } from "../models/MentorshipRequest.js";
import { Notification } from "../models/Notification.js";
import { Portfolio } from "../models/Portfolio.js";
import { Project } from "../models/Project.js";
import { Resume } from "../models/Resume.js";
import { SkillAssessment } from "../models/SkillAssessment.js";
import { StartupIdea } from "../models/StartupIdea.js";
import { Submission } from "../models/Submission.js";
import { User } from "../models/User.js";
import { Wallet } from "../models/Wallet.js";

async function clearDatabase() {
  await Promise.all([
    Application.deleteMany({}),
    Competition.deleteMany({}),
    Connection.deleteMany({}),
    Course.deleteMany({}),
    Enrollment.deleteMany({}),
    FeedPost.deleteMany({}),
    FreelanceJob.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Mentor.deleteMany({}),
    MentorshipRequest.deleteMany({}),
    Notification.deleteMany({}),
    Portfolio.deleteMany({}),
    Project.deleteMany({}),
    Resume.deleteMany({}),
    SkillAssessment.deleteMany({}),
    StartupIdea.deleteMany({}),
    Submission.deleteMany({}),
    User.deleteMany({}),
    Wallet.deleteMany({}),
  ]);
}

export async function runSeed({ connect = true } = {}) {
  if (connect) {
    await connectDatabase();
  }
  await clearDatabase();

  const users = await User.create([
    {
      name: "Aarav Mehta",
      email: "aarav@student.best",
      password: "Password123",
      role: "student",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      headline: "Frontend learner turning ideas into shipped interfaces.",
      bio: "Exploring product design, React, and hackathon culture.",
      location: "Bengaluru, India",
      strengths: ["Creative", "Communication", "Leadership"],
      skills: ["React", "UI Design", "Storytelling"],
      interests: ["Hackathons", "Product", "Community"],
      badges: ["Hackathon Starter", "7 Day Streak"],
      stats: { xp: 1240, streak: 7, completedCourses: 3, projectsBuilt: 2, competitionWins: 1, earnings: 220 },
    },
    {
      name: "Neha Kapoor",
      email: "neha@mentor.best",
      password: "Password123",
      role: "mentor",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      headline: "Product leader helping early builders find signal faster.",
      bio: "Mentor for product strategy, portfolios, and startup execution.",
      location: "Mumbai, India",
      strengths: ["Leadership", "Analytical", "Communication"],
      skills: ["Product Strategy", "Mentoring", "Go-to-Market"],
      interests: ["Startups", "Careers", "Leadership"],
      badges: ["Top Mentor", "Community Builder"],
      stats: { xp: 5320, streak: 21, completedCourses: 8, projectsBuilt: 9, competitionWins: 2, earnings: 1300 },
    },
    {
      name: "Rohan D'Souza",
      email: "rohan@freelance.best",
      password: "Password123",
      role: "freelancer",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      headline: "Full-stack freelancer building fast MVPs for startups.",
      bio: "Focused on shipping productized web experiences for early teams.",
      location: "Pune, India",
      strengths: ["Technical", "Analytical", "Leadership"],
      skills: ["Node.js", "React", "MongoDB", "APIs"],
      interests: ["Freelancing", "SaaS", "Startups"],
      badges: ["Top Earner", "MVP Closer"],
      stats: { xp: 4120, streak: 14, completedCourses: 6, projectsBuilt: 12, competitionWins: 0, earnings: 5400 },
    },
    {
      name: "Maya Rao",
      email: "maya@recruit.best",
      password: "Password123",
      role: "recruiter",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
      headline: "Talent partner connecting young builders to startup teams.",
      bio: "Hiring for internships, associate roles, and freelance pods.",
      location: "Delhi, India",
      strengths: ["Communication", "Leadership", "Creative"],
      skills: ["Hiring", "Talent Branding", "Portfolio Review"],
      interests: ["Recruiting", "Youth Talent", "Ecosystems"],
      badges: ["Talent Scout"],
      stats: { xp: 2890, streak: 10, completedCourses: 1, projectsBuilt: 1, competitionWins: 0, earnings: 0 },
    },
    {
      name: "Admin User",
      email: "admin@bestversion.com",
      password: "Password123",
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
      headline: "Platform administrator",
      bio: "Managing the Best Version experience.",
      location: "Remote",
      strengths: ["Leadership", "Analytical"],
      skills: ["Operations", "Growth"],
      interests: ["Community", "Platform"],
      badges: ["Core Team"],
      stats: { xp: 9999, streak: 30, completedCourses: 12, projectsBuilt: 15, competitionWins: 4, earnings: 0 },
    },
  ]);

  const [student, mentorUser, freelancer, recruiter, admin] = users;

  const courses = await Course.create([
    {
      title: "Build Your First Startup-Grade React Product",
      slug: "startup-grade-react-product",
      category: "Development",
      level: "Intermediate",
      durationHours: 18,
      rating: 4.9,
      studentsCount: 1620,
      instructorName: "Neha Kapoor",
      instructorRole: "Product Mentor",
      description: "Learn how to go from idea to polished full-stack product with opinionated design and delivery standards.",
      outcomes: ["Ship a polished interface", "Structure scalable components", "Deploy a product narrative"],
      tags: ["React", "Product", "Frontend"],
      coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      featured: true,
      lessons: [
        { title: "Designing the user journey", durationMinutes: 35 },
        { title: "Building reusable UI systems", durationMinutes: 52 },
        { title: "Shipping the MVP", durationMinutes: 48 },
      ],
    },
    {
      title: "Freelance Systems for Young Builders",
      slug: "freelance-systems-for-young-builders",
      category: "Career",
      level: "Beginner",
      durationHours: 12,
      rating: 4.8,
      studentsCount: 920,
      instructorName: "Rohan D'Souza",
      instructorRole: "Freelance Engineer",
      description: "Create service offers, win clients, and manage delivery with confidence.",
      outcomes: ["Package your skills", "Write winning proposals", "Track client delivery"],
      tags: ["Freelance", "Business", "Career"],
      coverImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
      featured: true,
      lessons: [
        { title: "Offer design", durationMinutes: 30 },
        { title: "Proposal writing", durationMinutes: 40 },
        { title: "Delivery and retention", durationMinutes: 45 },
      ],
    },
    {
      title: "Career Launchpad: Portfolio, Resume, Interviews",
      slug: "career-launchpad",
      category: "Career",
      level: "Beginner",
      durationHours: 10,
      rating: 4.7,
      studentsCount: 1980,
      instructorName: "Maya Rao",
      instructorRole: "Recruiter",
      description: "Turn scattered achievements into a career story that lands interviews.",
      outcomes: ["Refine your resume", "Strengthen your portfolio", "Prepare for interviews"],
      tags: ["Resume", "Portfolio", "Jobs"],
      coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      featured: true,
      lessons: [
        { title: "Resume signal", durationMinutes: 28 },
        { title: "Portfolio proof", durationMinutes: 42 },
        { title: "Interview storytelling", durationMinutes: 33 },
      ],
    },
  ]);

  await Enrollment.create([
    {
      user: student._id,
      course: courses[0]._id,
      progress: 68,
      completedLessons: ["Designing the user journey", "Building reusable UI systems"],
      status: "active",
      lastAccessedAt: new Date(),
    },
    {
      user: student._id,
      course: courses[1]._id,
      progress: 24,
      completedLessons: ["Offer design"],
      status: "active",
      lastAccessedAt: new Date(),
    },
  ]);

  const projects = await Project.create([
    {
      user: student._id,
      title: "Campus Creator Hub",
      brief: "A social platform that helps students find collaborators for startup ideas.",
      description: "Focused on project discovery, profiles, and sprint-style collaboration.",
      category: "Product",
      status: "building",
      tags: ["React", "Community", "Startup"],
      completion: 72,
      milestones: [
        { title: "Research top student pain points", status: "done", dueDate: new Date() },
        { title: "Design onboarding and discovery screens", status: "done", dueDate: new Date() },
        { title: "Build MVP collaboration board", status: "active", dueDate: new Date(Date.now() + 86400000 * 5) },
      ],
      repoUrl: "https://github.com/example/campus-creator-hub",
      liveUrl: "https://campus-creator-hub.example.com",
    },
    {
      user: freelancer._id,
      title: "Startup Sprint OS",
      brief: "An operating system for founders to plan launches and recruit execution pods.",
      description: "Combines launch checklists, hiring, and async collaboration updates.",
      category: "SaaS",
      status: "completed",
      tags: ["Node", "SaaS", "Growth"],
      completion: 100,
      milestones: [
        { title: "Define MVP scope", status: "done", dueDate: new Date() },
        { title: "Launch beta", status: "done", dueDate: new Date() },
      ],
      repoUrl: "https://github.com/example/startup-sprint-os",
      liveUrl: "https://startup-sprint-os.example.com",
    },
  ]);

  await Submission.create([
    {
      project: projects[1]._id,
      user: freelancer._id,
      notes: "Submitted for portfolio review and mentor feedback.",
      submissionUrl: "https://startup-sprint-os.example.com",
      score: 92,
      feedback: "Strong positioning and polished execution.",
      status: "reviewed",
    },
  ]);

  const jobs = await FreelanceJob.create([
    {
      title: "Build a Gen Z creator portfolio web app",
      company: "Nova Studio",
      type: "freelance",
      location: "Remote",
      remote: true,
      budget: "$700 - $1,200",
      experienceLevel: "Intermediate",
      description: "Looking for a React builder who can craft a bold, responsive portfolio platform for student creators.",
      skills: ["React", "UI Design", "Responsive Design"],
      postedBy: recruiter._id,
      deadline: new Date(Date.now() + 86400000 * 9),
    },
    {
      title: "Product Intern for AI Learning Startup",
      company: "PulseLearn",
      type: "internship",
      location: "Hybrid",
      remote: false,
      budget: "₹20,000 / month",
      experienceLevel: "Beginner",
      description: "Support user research, onboarding flows, and product experiments.",
      skills: ["Research", "Notion", "Product Thinking"],
      postedBy: recruiter._id,
      deadline: new Date(Date.now() + 86400000 * 12),
    },
    {
      title: "Junior Full-Stack Engineer",
      company: "SprintFoundry",
      type: "job",
      location: "Remote",
      remote: true,
      budget: "₹8L - ₹12L",
      experienceLevel: "Intermediate",
      description: "Join a fast-moving startup team shipping internal workflow products.",
      skills: ["Node.js", "React", "MongoDB"],
      postedBy: recruiter._id,
      deadline: new Date(Date.now() + 86400000 * 16),
    },
  ]);

  await Application.create([
    {
      user: student._id,
      job: jobs[0]._id,
      proposal: "I can build a vibrant, responsive experience and already have portfolio-focused UI work in progress.",
      bidAmount: "$850",
      portfolioLink: "https://portfolio.example.com/aarav",
      status: "shortlisted",
    },
  ]);

  await Competition.create([
    {
      title: "Build in Public Product Sprint",
      host: "Best Version",
      description: "Ship a meaningful youth-focused MVP in 10 days and share your build story publicly.",
      category: "Product",
      prize: "₹50,000 + mentor showcase",
      deadline: new Date(Date.now() + 86400000 * 10),
      startDate: new Date(),
      status: "active",
      participants: [student._id, freelancer._id],
      rules: ["Submit a live demo", "Explain your user problem", "Share proof of execution"],
      coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Career Storytelling Challenge",
      host: "Talent Futures",
      description: "Design a standout portfolio and resume package for early-career roles.",
      category: "Career",
      prize: "Portfolio review from 10 recruiters",
      deadline: new Date(Date.now() + 86400000 * 18),
      startDate: new Date(Date.now() + 86400000 * 2),
      status: "upcoming",
      participants: [student._id],
      rules: ["Include 2 proof-of-work projects", "Attach resume snapshot"],
      coverImage: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Summer Hack Relay",
      host: "HackVerse",
      description: "Teams raced to build civic-tech tools for young communities.",
      category: "Hackathon",
      prize: "Closed",
      deadline: new Date(Date.now() - 86400000 * 14),
      startDate: new Date(Date.now() - 86400000 * 21),
      status: "past",
      participants: [student._id, freelancer._id],
      rules: ["Built in 48 hours"],
      coverImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
    },
  ]);

  await LeaderboardEntry.create([
    {
      user: student._id,
      points: 1280,
      achievements: 6,
      competitionWins: 1,
      skillGrowth: 82,
      earnings: 220,
      rank: 3,
    },
    {
      user: mentorUser._id,
      points: 5410,
      achievements: 14,
      competitionWins: 2,
      skillGrowth: 93,
      earnings: 1300,
      rank: 1,
    },
    {
      user: freelancer._id,
      points: 4180,
      achievements: 10,
      competitionWins: 0,
      skillGrowth: 88,
      earnings: 5400,
      rank: 2,
    },
  ]);

  const mentorDoc = await Mentor.create({
    user: mentorUser._id,
    expertise: ["Product Strategy", "Portfolio Reviews", "Startup Validation"],
    bio: "I help young builders sharpen their story, strategy, and product sense.",
    ratePerSession: 45,
    availability: ["Mon 7 PM", "Wed 8 PM", "Sat 11 AM"],
    featured: true,
    menteesCount: 132,
  });

  await MentorshipRequest.create({
    mentor: mentorDoc._id,
    user: student._id,
    message: "I want help structuring my portfolio and choosing my next project for internship applications.",
    goals: ["Clarify portfolio story", "Pick one high-signal project"],
    preferredSlot: "Sat 11 AM",
    status: "requested",
  });

  await Portfolio.create([
    {
      user: student._id,
      summary: "Frontend-focused builder with a growing track record across hackathons and student communities.",
      featuredProjects: [
        {
          title: "Campus Creator Hub",
          description: "Community platform for student startup collaboration.",
          link: "https://campus-creator-hub.example.com",
          tech: ["React", "Node.js", "MongoDB"],
        },
      ],
      links: ["https://portfolio.example.com/aarav", "https://github.com/aarav"],
    },
    {
      user: freelancer._id,
      summary: "Freelance full-stack engineer specializing in early-stage product builds.",
      featuredProjects: [
        {
          title: "Startup Sprint OS",
          description: "Founders' workflow and execution command center.",
          link: "https://startup-sprint-os.example.com",
          tech: ["React", "Express", "MongoDB"],
        },
      ],
      links: ["https://portfolio.example.com/rohan", "https://github.com/rohan"],
    },
    {
      user: mentorUser._id,
      summary: "Operator and mentor supporting product-led youth careers and startups.",
      featuredProjects: [],
      links: ["https://linkedin.com/in/nehakapoor"],
    },
    {
      user: recruiter._id,
      summary: "Talent partner helping young builders find high-signal opportunities.",
      featuredProjects: [],
      links: ["https://linkedin.com/in/mayarao"],
    },
    {
      user: admin._id,
      summary: "Platform ops.",
      featuredProjects: [],
      links: [],
    },
  ]);

  await Resume.create([
    {
      user: student._id,
      headline: "Frontend builder seeking internships and product design opportunities.",
      experience: ["Student Design Club lead", "Hackathon participant"],
      education: ["B.Tech in Information Science"],
      achievements: ["Won Summer Hack Relay", "Built 2 live web products"],
      resumeUrl: "https://example.com/resume/aarav.pdf",
    },
    {
      user: freelancer._id,
      headline: "Full-stack freelancer delivering MVPs for startup teams.",
      experience: ["Freelance engineer for 12 startup builds"],
      education: ["B.Sc. Computer Science"],
      achievements: ["$5K+ freelance revenue", "Delivered 12 products"],
      resumeUrl: "https://example.com/resume/rohan.pdf",
    },
    {
      user: mentorUser._id,
      headline: "Product leader and mentor.",
      experience: ["Head of Product at growth-stage startup"],
      education: ["MBA"],
      achievements: ["Mentored 100+ builders"],
      resumeUrl: "https://example.com/resume/neha.pdf",
    },
    {
      user: recruiter._id,
      headline: "Recruiter focused on early-career talent.",
      experience: ["Talent partner for seed-stage companies"],
      education: ["BBA"],
      achievements: ["Placed 70+ interns"],
      resumeUrl: "https://example.com/resume/maya.pdf",
    },
    {
      user: admin._id,
      headline: "Admin",
      experience: ["Platform admin"],
      education: [],
      achievements: [],
      resumeUrl: "",
    },
  ]);

  await Wallet.create([
    {
      user: student._id,
      balance: 220,
      pending: 150,
      transactions: [
        { label: "UI prototype sprint", amount: 220, type: "credit", occurredAt: new Date(Date.now() - 86400000 * 4) },
      ],
    },
    {
      user: freelancer._id,
      balance: 5400,
      pending: 1200,
      transactions: [
        { label: "MVP build payout", amount: 2400, type: "credit", occurredAt: new Date(Date.now() - 86400000 * 7) },
        { label: "SaaS dashboard sprint", amount: 3000, type: "credit", occurredAt: new Date(Date.now() - 86400000 * 14) },
      ],
    },
    {
      user: mentorUser._id,
      balance: 1300,
      pending: 90,
      transactions: [{ label: "Mentor sessions", amount: 1300, type: "credit", occurredAt: new Date(Date.now() - 86400000 * 5) }],
    },
    { user: recruiter._id, balance: 0, pending: 0, transactions: [] },
    { user: admin._id, balance: 0, pending: 0, transactions: [] },
  ]);

  await Notification.create([
    {
      user: student._id,
      title: "You were shortlisted",
      body: "Nova Studio shortlisted your proposal for the creator portfolio app.",
      type: "success",
      ctaLabel: "View applications",
      ctaPath: "/earn",
    },
    {
      user: student._id,
      title: "Competition closes in 10 days",
      body: "Build in Public Product Sprint is heating up. Submit your MVP before the deadline.",
      type: "info",
      ctaLabel: "Open competitions",
      ctaPath: "/competitions",
    },
    {
      user: student._id,
      title: "Mentor recommendation unlocked",
      body: "Based on your strengths, Neha Kapoor is a strong mentor match for product strategy.",
      type: "info",
      ctaLabel: "See mentors",
      ctaPath: "/mentorship",
    },
  ]);

  await SkillAssessment.create({
    user: student._id,
    answers: [
      { questionId: "q1", prompt: "Which work feels most energizing to you?", category: "technical", answer: "Building systems and solving technical puzzles", score: 5 },
      { questionId: "q2", prompt: "What do people usually praise you for?", category: "creative", answer: "Creative thinking and originality", score: 5 },
      { questionId: "q3", prompt: "When working in a group, what role do you naturally take?", category: "leadership", answer: "I organize people and drive momentum", score: 5 },
    ],
    categoryScores: { technical: 5, creative: 5, leadership: 5, analytical: 3, communication: 4 },
    topStrengths: ["Creative", "Leadership", "Communication"],
    recommendations: [
      { title: "Full-Stack Builder Path", type: "career", reason: "Strong technical and execution signals." },
      { title: "Product Design Sprint Path", type: "skill", reason: "High creative energy and storytelling ability." },
    ],
    summary: "You combine creativity with execution, which makes you well-suited for product-building roles and competitions.",
  });

  await StartupIdea.create([
    {
      title: "SkillSwap Campus",
      sector: "EdTech",
      summary: "Peer-to-peer marketplace where students trade micro-skills and portfolio feedback.",
      lookingFor: ["Frontend builder", "Growth marketer", "Campus ambassador"],
      stage: "Idea validation",
      postedByName: "Aarav Mehta",
      traction: "90 waitlist signups",
    },
    {
      title: "SprintPods for Freelancers",
      sector: "Future of Work",
      summary: "Pop-up talent squads that help startups buy execution instead of hiring slowly.",
      lookingFor: ["Operations cofounder", "BD lead"],
      stage: "Pilot",
      postedByName: "Rohan D'Souza",
      traction: "3 paying startups",
    },
  ]);

  await Connection.create([
    { follower: student._id, following: mentorUser._id },
    { follower: student._id, following: freelancer._id },
  ]);

  await FeedPost.create([
    {
      author: mentorUser._id,
      content: "Quick reminder: a messy shipped project beats a polished idea that never leaves your notes app.",
      tags: ["mentorship", "shipping"],
      likes: 84,
    },
    {
      author: freelancer._id,
      content: "Turned a 2-page brief into a paid dashboard sprint this week. Clear proposals still win.",
      tags: ["freelance", "execution"],
      likes: 57,
    },
    {
      author: student._id,
      content: "My goal this month is to finish Campus Creator Hub and publish a public build log every week.",
      tags: ["buildinpublic", "projects"],
      likes: 38,
    },
  ]);

  console.log("Database seeded successfully.");
  console.log("Sample credentials:");
  console.log("student => aarav@student.best / Password123");
  console.log("mentor  => neha@mentor.best / Password123");
  console.log("admin   => admin@bestversion.com / Password123");
}

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  runSeed()
    .catch((error) => {
      console.error("Seed failed", error);
    })
    .finally(async () => {
      await disconnectDatabase();
    });
}
