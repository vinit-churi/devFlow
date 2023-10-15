"use client";

import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { shortenNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
interface IProps {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  hasSaved?: boolean;
}
const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  downvotes,
  hasUpVoted,
  hasDownVoted,
  hasSaved,
}: IProps) => {
  const pathname = usePathname();
  async function handleVote(action: string) {
    console.log("handleVote", action);
    if (!userId) return console.log("not logged in");
    if (action === "upvote") {
      if (type === "Question") {
        await upvoteQuestion({
          questionId: itemId,
          userId,
          hasupVoted: hasUpVoted,
          hasdownVoted: hasDownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await upvoteAnswer({
          answerId: itemId,
          userId,
          hasupVoted: hasUpVoted,
          hasdownVoted: hasDownVoted,
          path: pathname,
        });
      }
      // TODO: show a toast
      return null;
    } else if (action === "downvote") {
      if (type === "Question") {
        await downvoteQuestion({
          questionId: itemId,
          userId,
          hasupVoted: hasUpVoted,
          hasdownVoted: hasDownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await downvoteAnswer({
          answerId: itemId,
          userId,
          hasupVoted: hasUpVoted,
          hasdownVoted: hasDownVoted,
          path: pathname,
        });
      }
      // TODO: show a toast
      return null;
    }
  }
  function handleSave() {
    console.log("handleSave");
  }
  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasUpVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            alt="upvotes"
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px]">
            <p className="subtle-medium text-dark400_light900">
              {shortenNumber(upvotes)}
            </p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasDownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            alt="downvotes"
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px]">
            <p className="subtle-medium text-dark400_light900">
              {shortenNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>
      {type === "Question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          width={18}
          height={18}
          alt="star"
          className="cursor-pointer"
          onClick={() => handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
