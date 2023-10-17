import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import QuestionCard from "../cards/QuestionCard";

interface IProps extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}
const QuestionTab = async ({ searchParams, userId, clerkId }: IProps) => {
  const result = await getUserQuestions({ userId, page: 1 });
  console.log(result);

  return (
    <>
      {result.questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId}
          title={question.title}
          tags={question.tags}
          answers={question.answers}
          upvotes={question.upvotes}
          views={question.views}
          author={question.author}
          createdAt={question.createdAt}
        />
      ))}
    </>
  );
};

export default QuestionTab;
