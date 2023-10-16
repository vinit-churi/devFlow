"use server";

import Interaction from "@/database/interaction.model";
import { ViewQuestionParams } from "./shared.types";
import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";

export async function viewQuestion(params: ViewQuestionParams) {
  await connectToDatabase();
  const { userId, questionId } = params;

  await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  const interaction = await Interaction.findOneAndUpdate(
    {
      user: userId,
      action: "view",
      question: questionId,
    },
    {
      user: userId,
      action: "view",
      question: questionId,
    },
    options
  ).exec();
  return interaction;
}
