import { AnswerFilters } from "@/constants/filters";
import Filter from "./Filter";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";
import Pagination from "./Pagination";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const result = await getAnswers({ questionId, sortBy: filter, page });
  console.log(filter);
  const { userId: clerkId } = auth();
  // @ts-ignore
  let mongoUser: null | any;
  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  return (
    <div className="mt-11 w-full">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>
      <div>
        {result?.answers.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="mb-8 flex items-center justify-between">
              <div className=" flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.picture}
                    className="rounded-full object-cover max-sm:mt-0.5"
                    alt="profile"
                    width={18}
                    height={18}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {answer.author.name}
                    </p>
                    <p className="small-regular text-dark400_light500 ml-0.5 mt-0.5 line-clamp-1">
                      &nbsp;-&nbsp;
                      <span className="max-sm:hidden">
                        answered&nbsp;{getTimestamp(answer.createdAt)}
                      </span>
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">Voting</div>
              </div>
              <Votes
                type="Answer"
                itemId={answer._id.toString()}
                userId={mongoUser?._id.toString()}
                upvotes={answer.upvotes.length}
                downvotes={answer.downvotes.length}
                hasUpVoted={
                  answer.upvotes.includes(mongoUser?._id.toString()) ?? false
                }
                hasDownVoted={
                  answer.downvotes.includes(mongoUser?._id.toString()) ?? false
                }
              />
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={page ? +page : 1}
          isNext={result?.isNext as boolean}
        />
      </div>
    </div>
  );
};

export default AllAnswers;
