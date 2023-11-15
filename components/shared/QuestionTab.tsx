import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import QuestionCard from "../cards/QuestionCard";
import Pagination from "./Pagination";

interface IProps extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}
const QuestionTab = async ({ searchParams, userId, clerkId }: IProps) => {
  const result = await getUserQuestions({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });
  console.log(result);

  return (
    <>
      {result.questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId as string}
          title={question.title}
          tags={question.tags}
          answers={question.answers}
          upvotes={question.upvotes}
          views={question.views}
          author={question.author}
          createdAt={question.createdAt}
        />
      ))}
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default QuestionTab;
