"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetUserByIdParams,
  GetUserStatsParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";
import Tag from "@/database/tag.model";

export async function getUserById(params: any) {
  try {
    await connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    await connectToDatabase();
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(userData: UpdateUserParams) {
  try {
    await connectToDatabase();

    const { clerkId, updateData, path } = userData;
    const user = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function deleteUser(params: DeleteUserParams) {
  try {
    await connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOne({ clerkId });
    if (!user) throw new Error("User not found");
    // delete everything related to the user
    // const userQuestionIds = await Question.find({ "author": user._id }).distinct("_id");
    // delete all questions
    await Question.deleteMany({ author: user._id });
    const deletedUser = await User.findOneAndDelete({ clerkId });
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers(props: GetAllUsersParams) {
  try {
    await connectToDatabase();
    // const { page=1, pageSize=20, filter, searchQuery } = props;
    const users = await User.find({}).sort({ createdAt: -1 });
    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfo(props: GetUserByIdParams) {
  try {
    await connectToDatabase();
    const { userId } = props;

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    return { user, totalQuestions, totalAnswers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;
    console.log(page, pageSize);
    const totalQuestions = await Question.countDocuments({ author: userId });
    const userQuestions = await Question.find({ author: userId })
      .sort({ views: -1, upvotes: -1 })
      .populate("author", "clerkId name picture")
      .populate("tags", "_id name");
    return { totalQuestions, questions: userQuestions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface IGetUserAnswersProps {
  userId: string;
  page?: number;
  pageSize?: number;
}

export async function getUserAnswers(params: IGetUserAnswersProps) {
  try {
    await connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;
    console.log(page, pageSize);
    const totalAnswers = await Answer.countDocuments({ author: userId });
    const userAnswers = await Answer.find({ author: userId })
      .populate({
        path: "question",
        model: Question,
        populate: [
          { path: "author", model: User },
          { path: "tags", model: Tag },
        ],
      })
      .sort({ upvotes: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return {
      totalAnswers,
      answers: userAnswers,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
