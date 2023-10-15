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
  const [isDownVoted, setIsDownVoted] = useState(votesData.isDownVoted);
  const [isVoting, setIsVoting] = useState(false);

  async function handleVote(voteType: string) {
    try {
      setIsVoting(true);
      const data = await updateVote({
        voteType,
        mongoUserId,
        voteObject,
      });
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
      setIsVoting(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={`${isVoting && "opacity-50"}`}>
      {isUpVoted ? <p>Upvoted</p> : <p>not Upvoted</p>}
      <button disabled={isVoting} onClick={() => handleVote("upvote")}>
        Upvote {voteCount.upvotes}
      </button>
      {isDownVoted ? <p>DowVoted</p> : <p>not DownVoted</p>}
      <button disabled={isVoting} onClick={() => handleVote("downvote")}>
        DownVote {voteCount.downvotes}
      </button>
    </div>
  );
};

export default Votes;
