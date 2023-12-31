import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { getTimestamp, shortenNumber } from "@/lib/utils";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: SearchParamsProps & { filter: string; page: string };
}) => {
  const result = await getQuestionById({ questionId: params.id });
  const { userId: clerkId } = auth();
  let mongoUser;
  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  return (
    <div className="flex-start w-full flex-col">
      <div className="flex-start w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2 ">
        <Link
          href={`/profile/${result.author.clerkId}`}
          className="flex items-center justify-start gap-1"
        >
          <Image
            src={result.author.picture}
            className="rounded-full"
            alt="profile"
            width={22}
            height={22}
          />
          <p className="paragraph-semibold text-dark300_light700">
            {result.author.name}
          </p>
        </Link>
        <div className="flex justify-end">
          <Votes
            type="Question"
            itemId={result._id.toString()}
            userId={mongoUser?._id.toString()}
            upvotes={result.upvotes.length}
            downvotes={result.downvotes.length}
            hasUpVoted={
              result.upvotes.includes(mongoUser?._id.toString()) ?? false
            }
            hasDownVoted={
              result.downvotes.includes(mongoUser?._id.toString()) ?? false
            }
            hasSaved={mongoUser?.saved.includes(result._id.toString())}
          />
        </div>
      </div>
      <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
        {result.title}
      </h2>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="asked"
          title="Asked"
          value={` asked ${getTimestamp(result.createdAt)}`}
          textStyles="text-dark400_light800 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          title="answers"
          value={shortenNumber(result.answers.length)}
          textStyles="text-dark400_light800 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          title="Views"
          value={shortenNumber(result.views)}
          textStyles="text-dark400_light800 small-medium"
        />
      </div>
      <ParseHTML data={result.content} />
      <div className="mt-8 flex w-full flex-wrap gap-2">
        {/* @ts-ignore */}
        {result.tags.map((tag) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>
      <AllAnswers
        totalAnswers={result.answers.length}
        // questionId={JSON.stringify(result._id)}
        page={searchParams.page ? +searchParams.page : 1}
        filter={searchParams.filter}
        questionId={result._id.toString()}
        userId={mongoUser._id.toString()}
      />
      <Answer
        question={result.content}
        questionId={result._id.toString()}
        authorId={mongoUser._id.toString()}
      />
    </div>
  );
};

export default page;
