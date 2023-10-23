import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { ObjectId } from "mongoose";

const Page = async ({ params }: URLProps) => {
  const { userId: clerkId } = auth();
  const mongoUser = await getUserById({ userId: clerkId });
  const mongoUserId = mongoUser._id.toString();
  const { id: questionId } = params;
  const data = await getQuestionById({ questionId });
  console.log(data);
  return (
    <div>
      <Question
        mongoUserId={mongoUserId}
        type="edit"
        prevData={{
          title: data.title,
          explanation: data.content,
          tags: data.tags.map(
            (tag: { _id: ObjectId; name: String }) => tag?.name
          ),
          _id: data._id.toString(),
        }}
      />
    </div>
  );
};

export default Page;
