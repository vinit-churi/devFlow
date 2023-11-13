"use server";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types.d";
import { connectToDatabase } from "../mongoose";
import Tag, { ITag } from "@/database/tag.model";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";
import User from "@/database/user.model";

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
    const { searchQuery } = params;
    let query: FilterQuery<ITag> = {};
    if (searchQuery && searchQuery.length > 0) {
      query = { name: { $regex: searchQuery, $options: "i" } };
    }
    const tags = await Tag.find(query);
    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    await connectToDatabase();
    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        skip: (page - 1) * pageSize,
        limit: pageSize,
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });
    if (!tag) throw new Error("tag not found");
    return {
      tagTitle: tag.name,
      questions: tag.questions,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getHotTags() {
  try {
    await connectToDatabase();
    const hotTags = await Tag.aggregate([
      {
        $project: {
          name: 1,
          numberOfQuestions: { $size: "$questions" },
        },
      },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);

    return hotTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
