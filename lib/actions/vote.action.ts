"use server";

import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";

interface ParamsType {
  voteType: string;
  mongoUserId: string;
  voteObject: {
    voteFor: string;
    voteObjectId: string;
  };
}

export async function updateVote(params: ParamsType) {
  const { voteType, mongoUserId, voteObject } = params;
  console.log(voteType, mongoUserId, voteObject);
  try {
    await connectToDatabase();
    if (voteObject.voteFor === "question") {
      // question
      const question = await Question.findById(voteObject.voteObjectId);
      console.log(question);
      if (voteType === "upvote") {
        // check if user has already upvoted
        // if yes, remove upvote, else add upvote
      } else {
        // downvote
        // check if user has already upvoted
        // if yes, remove upvote, else add upvote
      }
    } else {
      // answer
      const answer = await Answer.findById(voteObject.voteObjectId);
      console.log(answer);
      if (voteType === "upvote") {
        // check if user has already upvoted
        // if yes, remove upvote, else add upvote
      } else {
        // downvote
        // check if user has already upvoted
        // if yes, remove upvote, else add upvote
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
