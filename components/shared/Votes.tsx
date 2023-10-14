"use client";
import { updateVote } from "@/lib/actions/vote.action";
import { useState } from "react";
interface Props {
  voteObject: {
    voteFor: string;
    voteObjectId: string;
  };
  votesData: {
    isUpVoted: boolean;
    isDownVoted: boolean;
    upvotes: number;
    downvotes: number;
  };
  mongoUserId: string;
}
const Votes = ({ voteObject, votesData, mongoUserId }: Props) => {
  const [voteCount, setVoteCount] = useState({
    upvotes: votesData.upvotes,
    downvotes: votesData.downvotes,
  });
  const [isUpVoted, setIsUpVoted] = useState(votesData.isUpVoted);
  const [isDownVoted, setIsDownVoted)] = useState(votesData.isDownVoted);
  const [isVoting, setIsVoting] = useState(false);

  async function handleVote(voteType: string) {
    try {
      const data = await updateVote({
        voteType,
        mongoUserId,
        voteObject,
      });

      /*
       * data object will be like this
       * {
       *  isUpVoted: boolean;
       *  isDownVoted: boolean;
       *  upvotes: number;
       *  downvotes: number;
       * }
       */
      if (voteType === "upvote") {
        setIsUpVoted(data.isUpVoted);
        setVoteCount({
          upvotes: data.upvotes,
          downvotes: data.downvotes,
        });
      } else {
        setIsDownVoted(data.isDownVoted);
        setVoteCount({
          upvotes: data.upvotes,
          downvotes: data.downvotes,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return <div>
    {isUpVoted ? <p>Upvoted</p> : "not upvoted"}
    <button disabled={isVoting} onClick={() => handleVote("upvote")}>Upvote {voteCount.upvotes}</button>
    {isDownVoted ? <p>Downvoted</p> : "not downvoted"}
    <button disabled={isVoting} onClick={() => handleVote("downvote")}>Downvote {voteCount.downvotes}</button>
  </div>;
};

export default Votes;
