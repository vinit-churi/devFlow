"use server";

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  GetSavedQuestionsParams,
  QuestionVoteParams,
  ToggleSaveQuestionParams,
} from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import Answer from "@/database/answer.model";

export async function createQuestion(params: CreateQuestionParams) {
  try {
    await connectToDatabase();
    const { title, tags, content, author, path } = params;
    console.log(path);
    const question = await Question.create({
      title,
      content,
      author,
    });
    const tagDocuments = [];
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag);
    }
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });
    revalidatePath(path);
    console.log("revalidatePath", path);
  } catch (error) {
    console.log(error);
  }
}

export async function getQuestions(params: GetQuestionsParams) {
  try {
    await connectToDatabase();
    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });
    return {
      questions,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    await connectToDatabase();
    const { questionId } = params;
    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });
    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    await connectToDatabase();
    const { questionId, userId, hasdownVoted, hasupVoted, path } = params;

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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });
    if (!question) throw new Error("Question not found");
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    await connectToDatabase();
    const { questionId, userId, hasdownVoted, hasupVoted, path } = params;

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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });
    if (!question) throw new Error("Question not found");
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    await connectToDatabase();
    const { questionId, userId, path } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error("user not found");
    const hasSaved = user.saved.includes(questionId);
    if (hasSaved) {
      user.saved.pull(questionId);
      await user.save();
    } else {
      user.saved.push(questionId);
      await user.save();
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// https://mongoosejs.com/docs/populate.html#populate_an_existing_mongoose_document
export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    await connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      model: Question,
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User },
        { path: "upvotes", model: User },
        { path: "downvotes", model: User },
        { path: "answers", model: Answer },
      ],
      select: "_id title tags createdAt views",
    });
    if (!user) throw new Error("user not found");
    return { questions: user.saved };
    // revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
