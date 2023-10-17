import Link from "next/link";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { getTimestamp, shortenNumber } from "@/lib/utils";

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

const QuestionCard = ({
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
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
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
