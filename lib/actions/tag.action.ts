"use server";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types.d";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import Question from "@/database/question.model";

export async function GetTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase();
    // const { userId, limit = 3 } = params;
    // const users = await User.findById(userId);
    // if (!users) throw new Error("User not found");
    // TODO: find interactions for the user and group by tags...
    // TODO: interactions model
    return [
      { name: "javascript", _id: "10" },
      { name: "react", _id: "5" },
      { name: "node", _id: "3" },
    ];
    // return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    await connectToDatabase();
    const tags = await Tag.find();
    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    await connectToDatabase();
    const { tagId } = params;
    const questions = await Question.find({ tags: [tagId] })
      .populate("tags")
      .populate("author");
    console.log(questions);
    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
