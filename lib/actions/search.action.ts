"use server";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import Tag, { ITag } from "@/database/tag.model";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";

export async function searchAll({ searchQuery }: { searchQuery: string }) {
  let tagQuery: FilterQuery<ITag> = {};
  let userQuery: FilterQuery<typeof User> = {};
  let answerQuery: FilterQuery<typeof Answer> = {};
  let questionQuery: FilterQuery<typeof Question> = {};
  if (searchQuery && searchQuery.length > 0) {
    tagQuery = { name: { $regex: searchQuery, $options: "i" } };
    userQuery = {
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { username: { $regex: searchQuery, $options: "i" } },
      ],
    };
    answerQuery = { content: { $regex: searchQuery, $options: "i" } };
    questionQuery = { title: { $regex: searchQuery, $options: "i" } };
  }
  const tags = await Tag.find(tagQuery).limit(5);
  const users = await User.find(userQuery).limit(5);
  const answers = await Answer.find(answerQuery).limit(5);
  const questions = await Question.find(questionQuery).limit(5);
  const result = [
    ...tags.map((item) => ({ type: "tag", id: item._id, title: item.name })),
    ...users.map((item) => ({ type: "user", id: item._id, title: item.name })),
    ...answers.map((item) => ({
      type: "answer",
      id: item._id,
      title: item.content.substring(0, 12) + "...",
    })),
    ...questions.map((item) => ({
      type: "question",
      id: item._id,
      title: item.title,
    })),
  ];
  return {
    result,
  };
}
