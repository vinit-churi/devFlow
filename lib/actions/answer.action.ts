"use server";
import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import Interaction from "@/database/interaction.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();
    const { content, author, question, path } = params;
    const newAnswer = new Answer({
      content,
      author,
      question,
    });
    await newAnswer.save();
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });
    revalidatePath(path);
  } catch (err) {
    console.log(err);
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();
    const { questionId, sortBy, page = 1, pageSize = 2 } = params;

    const skipAmount = (page - 1) * pageSize;

    let sortQuery = {};
    switch (sortBy) {
      case "highestUpvotes":
        sortQuery = { upvotes: 1 };
        break;
      case "lowestUpvotes":
        sortQuery = { upvotes: -1 };
        break;
      case "recent":
        sortQuery = { createdAt: -1 };
        break;
      case "old":
        sortQuery = { createdAt: 1 };
        break;
      default:
        sortQuery = { createdAt: -1 };
        break;
    }

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .skip(skipAmount)
      .limit(pageSize + 1)
      .sort(sortQuery);

    const isNext = answers.length > pageSize;
    if (isNext) answers.pop();
    return { answers, isNext };
  } catch (err) {
    console.log(err);
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    await connectToDatabase();
    const { answerId, userId, hasdownVoted, hasupVoted, path } = params;

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
      };
    } else if (hasdownVoted) {
      updateQuery = {
        $push: { upvotes: userId },
        $pull: { downvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { upvotes: userId },
      };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });
    if (!answer) throw new Error("answer not found");
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    await connectToDatabase();
    const { answerId, userId, hasdownVoted, hasupVoted, path } = params;

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
      };
    } else if (hasupVoted) {
      updateQuery = {
        $push: { downvotes: userId },
        $pull: { upvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { downvotes: userId },
      };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });
    if (!answer) throw new Error("answer not found");
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    await connectToDatabase();
    const { answerId, path } = params;
    const answer = await Answer.findById(answerId);
    if (!answer) throw new Error("Answer not found");
    await answer.deleteOne({ _id: answerId });

    await Question.updateMany(
      { _id: answer.question },
      {
        $pull: { answers: answerId },
      }
    );
    await Interaction.deleteMany({ answer: answerId });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
