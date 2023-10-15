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
  try {
    await connectToDatabase();
    if (voteObject.voteFor === "question") {
      const question = await Question.findById(voteObject.voteObjectId);
      if (voteType === "upvote") {
        if (question.upvotes.includes(mongoUserId)) {
          question.upvotes.pull(mongoUserId);
          const result = await question.save();
          return {
            isUpVoted: result.upvotes.includes(mongoUserId),
            isDownVoted: result.downvotes.includes(mongoUserId),
            upvotes: result.upvotes.length,
            downvotes: result.downvotes.length,
          };
        } else {
          question.upvotes.push(mongoUserId);
          const result = await question.save();
          return {
            isUpVoted: result.upvotes.includes(mongoUserId),
            isDownVoted: result.downvotes.includes(mongoUserId),
            upvotes: result.upvotes.length,
            downvotes: result.downvotes.length,
          };
        }
      } else {
        if (question.downvotes.includes(mongoUserId)) {
          // remove downvote
          question.downvotes.pull(mongoUserId);
          const result = await question.save();
          return {
            isUpVoted: result.upvotes.includes(mongoUserId),
            isDownVoted: result.downvotes.includes(mongoUserId),
            upvotes: result.upvotes.length,
            downvotes: result.downvotes.length,
          };
        } else {
          // add downvote
          question.downvotes.push(mongoUserId);
          const result = await question.save();
          return {
            isUpVoted: result.upvotes.includes(mongoUserId),
            isDownVoted: result.downvotes.includes(mongoUserId),
            upvotes: result.upvotes.length,
            downvotes: result.downvotes.length,
          };
        }
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
