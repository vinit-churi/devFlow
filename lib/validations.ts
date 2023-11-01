import * as z from "zod";
export const QuestionsSchema = z.object({
  title: z.string().min(2).max(130),
  tags: z.array(z.string().min(1).max(20)).min(1).max(5),
  explanation: z.string().min(10),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100),
});

export const ProfileSchema = z.object({
  name: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  portfolioWebsite: z.string().url().optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
});
