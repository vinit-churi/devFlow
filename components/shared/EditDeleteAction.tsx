"use client";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
interface IProps {
  type: string;
  itemId: string;
}
const EditDeleteAction = ({ type, itemId }: IProps) => {
  const pathName = usePathname();
  const router = useRouter();
  async function handleEdit() {
    router.push(`/question/edit/${itemId}`);
  }
  async function handleDelete() {
    if (type === "Question") {
      await deleteQuestion({
        questionId: itemId,
        path: pathName,
      });
    } else {
      await deleteAnswer({
        answerId: itemId,
        path: pathName,
      });
    }
  }
  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "Question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="Edit"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}
      <Image
        src="/assets/icons/trash.svg"
        alt="delete"
        width={14}
        height={14}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;
