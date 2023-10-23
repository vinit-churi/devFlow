"use client";
import { deleteUserQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { useRouter } from "next/navigation";
const DeleteQuestion = ({ _id }: { _id: string }) => {
  const router = useRouter();
  async function handleDelete() {
    console.log("delete", _id);
    await deleteUserQuestion({ questionId: _id });
    router.refresh();
  }
  return (
    <>
      <Image
        src="/assets/icons/trash.svg"
        alt="delete"
        width={16}
        height={16}
        onClick={handleDelete}
        className="cursor-pointer"
      />
    </>
  );
};

export default DeleteQuestion;
