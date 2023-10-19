import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import QuestionCard from "../cards/QuestionCard";

interface IProps extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}
const AnswerTab = async ({ searchParams, userId, clerkId }: IProps) => {
  const result = await getUserAnswers({ userId, page: 1 });
  console.log(result.answers);

  return (
    <>
      {result.answers.map((answer) => (
        <QuestionCard
          key={answer.question._id}
          _id={answer.question._id}
          clerkId={clerkId}
          title={answer.question.title}
          tags={answer.question.tags}
          answers={answer.question.answers}
          upvotes={answer.question.upvotes}
          views={answer.question.views}
          author={answer.question.author}
          createdAt={answer.question.createdAt}
          goTo={`/question/${answer.question._id.toString()}/${answer._id.toString()}`}
        />
      ))}
    </>
  );
};

export default AnswerTab;
