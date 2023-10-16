"use server";
import { ViewQuestionParams } from "./shared.types";
import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";
import Interaction from "@/database/interaction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  await connectToDatabase();
  const { userId, questionId } = params;

  await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });
  if (userId) {
    const existingInteraction = await Interaction.findOne({
      user: userId,
      question: questionId,
      action: "view",
    });
    if (!existingInteraction) {
      await Interaction.create({
        user: userId,
        question: questionId,
        action: "view",
      });
    } else {
      // await Interaction.findByIdAndUpdate(existingInteraction._id, { $inc: { views: 1 } });
      console.log("already viewed");
    }
  }
}
