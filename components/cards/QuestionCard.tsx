import Link from "next/link";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { getTimestamp, shortenNumber } from "@/lib/utils";
import { getUserById } from "@/lib/actions/user.action";
import Image from "next/image";
import DeleteQuestion from "../shared/DeleteQuestion";

type TQuestionCard = {
  _id: string;
  title: string;
  tags: { _id: string; name: string }[];
  answers: Array<object>;
  upvotes: string[];
  views: number;
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  createdAt: Date;
  clerkId?: string;
};

const QuestionCard = async ({
  _id,
  title,
  tags,
  answers,
  upvotes,
  views,
  author,
  createdAt,
  clerkId,
}: TQuestionCard) => {
  let userId: undefined | string;
  let userIsAuthor: boolean = false;
  if (clerkId) {
    const { _id } = await getUserById({ userId: clerkId });
    userId = _id;
  }
  if (userId?.toString() === author._id.toString()) {
    userIsAuthor = true;
  }
  return (
    <div className="card-wrapper relative rounded-[10px] p-9 sm:px-11">
      <div className="absolute right-4 top-4 flex gap-2">
        {userIsAuthor && (
          <>
            <DeleteQuestion _id={_id.toString()} />
            <Link href={`/edit-question/${_id}`}>
              <Image
                src="/assets/icons/edit.svg"
                alt="edit"
                width={16}
                height={16}
                className="cursor-pointer"
              />
            </Link>
          </>
        )}
      </div>
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-medium text-dark400_light700 line-clamp-1 flex sm:hidden">
            asked {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-bold base-semibold text-dark100_light900 line-clamp-2 flex-1 cursor-pointer">
              {title}
            </h3>
          </Link>
        </div>
        {/* is signed in add edit delete action */}
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            showCount={false}
            name={tag.name}
          />
        ))}
      </div>
      <div className="flex-between mt-6 flex w-full flex-wrap gap-3 ">
        <Metric
          imgUrl={author.picture}
          alt="user"
          title={` - asked ${getTimestamp(createdAt)}`}
          href={`/users/${author._id}`}
          value={author.name}
          isAuthor={true}
          textStyles="text-dark400_light700 body-medium"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="upvotes"
          title="Votes"
          value={shortenNumber(upvotes.length)}
          textStyles="text-dark400_light800 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          title="answers"
          value={shortenNumber(answers.length)}
          textStyles="text-dark400_light800 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          title="Views"
          value={shortenNumber(views)}
          textStyles="text-dark400_light800 small-medium"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
