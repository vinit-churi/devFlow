import { getUserQuestions } from "@/lib/actions/question.action";
import { getUserInfo } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import Paginate from "./Paginate";

const QuestionTab = async ({
  searchParams,
}: {
  searchParams: { [Key: string]: string | undefined };
}) => {
  const { userId: clerkId } = auth();
  const userInfo = await getUserInfo({ userId: clerkId as string });
  const result = await getUserQuestions({
    userId: userInfo.user.id as string,
    page: Number(searchParams.page),
    pageSize: 2,
  });
  console.log(result);
  return (
    <div>
      {result.questions.map((question) => {
        return (
          <div key={question._id.toString()}>
            <h2>{question.title}</h2>
            <p>{question.description}</p>
          </div>
        );
      })}
      <Paginate pageSize={2} total={result.totalQuestions} />
    </div>
  );
};

export default QuestionTab;
