import { SkillAssessment } from "../models/SkillAssessment.js";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/response.js";

const assessmentQuestions = [
  {
    id: "q1",
    category: "technical",
    prompt: "Which work feels most energizing to you?",
    options: [
      { label: "Building systems and solving technical puzzles", score: 5 },
      { label: "Turning vague ideas into polished visuals", score: 3 },
      { label: "Leading a team to align on execution", score: 2 },
      { label: "Explaining ideas and helping others improve", score: 1 },
    ],
  },
  {
    id: "q2",
    category: "creative",
    prompt: "What do people usually praise you for?",
    options: [
      { label: "Creative thinking and originality", score: 5 },
      { label: "Calm decision-making under pressure", score: 3 },
      { label: "Analytical reasoning and pattern spotting", score: 2 },
      { label: "Reliable follow-through", score: 1 },
    ],
  },
  {
    id: "q3",
    category: "leadership",
    prompt: "When working in a group, what role do you naturally take?",
    options: [
      { label: "I organize people and drive momentum", score: 5 },
      { label: "I keep quality high and solve blockers", score: 3 },
      { label: "I bring bold ideas and energy", score: 2 },
      { label: "I support wherever the team needs help", score: 1 },
    ],
  },
  {
    id: "q4",
    category: "analytical",
    prompt: "Which challenge sounds most satisfying?",
    options: [
      { label: "Finding hidden patterns in data", score: 5 },
      { label: "Designing an engaging experience for users", score: 3 },
      { label: "Pitching a strong vision to stakeholders", score: 2 },
      { label: "Mentoring someone to reach a goal", score: 1 },
    ],
  },
  {
    id: "q5",
    category: "communication",
    prompt: "What kind of impact do you want to be known for?",
    options: [
      { label: "Helping people understand, connect, and grow", score: 5 },
      { label: "Creating systems that quietly scale", score: 3 },
      { label: "Launching fresh ideas people remember", score: 2 },
      { label: "Owning execution from start to finish", score: 1 },
    ],
  },
];

function deriveRecommendations(categoryScores) {
  const ordered = Object.entries(categoryScores).sort((a, b) => b[1] - a[1]);
  const top = ordered.slice(0, 2).map(([key]) => key);

  const catalog = {
    technical: {
      title: "Full-Stack Builder Path",
      type: "career",
      reason: "You scored highly in technical problem solving and system thinking.",
    },
    creative: {
      title: "Product Design Sprint Path",
      type: "skill",
      reason: "Your creative profile suggests strength in visual and experience-led work.",
    },
    leadership: {
      title: "Startup Operator Path",
      type: "career",
      reason: "You naturally move teams forward and make decisions under ambiguity.",
    },
    analytical: {
      title: "Data & Strategy Path",
      type: "career",
      reason: "You show a strong bias toward insight, measurement, and structured thinking.",
    },
    communication: {
      title: "Community and Growth Path",
      type: "career",
      reason: "Your strongest signal is helping people connect, learn, and take action.",
    },
  };

  return top.map((key) => catalog[key]);
}

export const getAssessmentQuestions = asyncHandler(async (_req, res) => {
  return sendResponse(res, {
    message: "Assessment questions fetched",
    data: { questions: assessmentQuestions },
  });
});

export const submitAssessment = asyncHandler(async (req, res) => {
  const { answers = [] } = req.body;
  const categoryScores = {
    technical: 0,
    creative: 0,
    leadership: 0,
    analytical: 0,
    communication: 0,
  };

  const normalizedAnswers = answers.map((entry) => {
    categoryScores[entry.category] += Number(entry.score || 0);
    return {
      questionId: entry.questionId,
      prompt: entry.prompt,
      category: entry.category,
      answer: entry.answer,
      score: Number(entry.score || 0),
    };
  });

  const topStrengths = Object.entries(categoryScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1));

  const recommendations = deriveRecommendations(categoryScores);
  const summary = `You lead with ${topStrengths[0]}, backed by ${topStrengths[1]} and ${topStrengths[2]}. Focus on opportunities that reward momentum, collaboration, and proof of work.`;

  const assessment = await SkillAssessment.create({
    user: req.user._id,
    answers: normalizedAnswers,
    categoryScores,
    topStrengths,
    recommendations,
    summary,
  });

  await User.findByIdAndUpdate(req.user._id, { strengths: topStrengths });

  return sendResponse(res, {
    statusCode: 201,
    message: "Assessment submitted successfully",
    data: assessment,
  });
});

export const getLatestAssessment = asyncHandler(async (req, res) => {
  const latestAssessment = await SkillAssessment.findOne({ user: req.user._id }).sort({ createdAt: -1 });
  return sendResponse(res, {
    message: "Latest assessment fetched",
    data: latestAssessment,
  });
});
