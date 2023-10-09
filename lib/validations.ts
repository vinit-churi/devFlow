import * as z from "zod";
export const QuestionsSchema = z.object({
    title: z.string().min(2).max(130),
    tags: z.array(z.string().min(10).max(20)).min(1).max(5),
    explanation: z.string().min(10).max(500),
  });