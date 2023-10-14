"use server";
import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();
    const { content, author, question, path } = params;
    const newAnswer = new Answer({
      content,
      author,
      question,
    });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });
    revalidatePath(path);
  } catch (err) {
    console.log(err);
  }
}

export async function getAllAnswer(params: GetAnswersParams) {
  try {
    connectToDatabase();
    const { questionId } = params;
    const answers = Answer.find({ question: questionId });
    console.log(answers);
    return answers;
  } catch (err) {
    console.log(err);
  }
}
