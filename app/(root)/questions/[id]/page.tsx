import { getQuestionDetail } from "@/lib/actions/question.action";
import { auth } from "@clerk/nextjs";
const page = async ({ params }: { params: { id: string } }) => {
  const { userId }: { userId: string | null } = auth();
  console.log(params.id);
  const result = await getQuestionDetail({
    questionId: params.id,
    userId: userId || undefined,
  });
  console.log(result.question);
  return (
    <div>
      <h1 className="text-dark100_light900">{result.question.title}</h1>
    </div>
  );
};

export default page;
