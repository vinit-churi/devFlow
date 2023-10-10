import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const { userId } = auth();
  console.log(userId);
  if (!userId) return redirect("/sign-in");
  const userObj = await getUserById({ userId });
  console.log(userObj);
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(userObj._id)} />
      </div>
    </div>
  );
};

export default page;
