"use server";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";
import Answer from "@/database/answer.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    await connectToDatabase();
    const { content, author, path, question } = params;
    console.log(path);
    const answer = await Answer.create({
      content,
      author,
      question,
      upvotes: [],
      downvotes: [],
    });
    // revalidatePath(path);
    return answer;
  } catch (error) {
    console.log(error);
  }
}
