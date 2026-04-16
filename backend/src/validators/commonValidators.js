import { body } from "express-validator";

export const projectValidator = [
  body("title").trim().notEmpty().withMessage("Project title is required"),
  body("brief").trim().notEmpty().withMessage("Project brief is required"),
];

export const applicationValidator = [
  body("proposal").trim().notEmpty().withMessage("Proposal is required"),
];

export const mentorshipValidator = [
  body("message").trim().notEmpty().withMessage("Message is required"),
  body("preferredSlot").trim().notEmpty().withMessage("Preferred slot is required"),
];
