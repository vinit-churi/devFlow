import Image from "next/image";
import Link from "next/link";
import RenderTag from "@/components/shared/RenderTag";
import { getTopQuestions } from "@/lib/actions/question.action";

type TTag = {
  _id: string;
  name: string;
  totalQuestions: number;
};

const popularTags: TTag[] = [
  {
    _id: "1",
    name: "React",
    totalQuestions: 5,
  },
  {
    _id: "2",
    name: "Next.js",
    totalQuestions: 2,
  },
  {
    _id: "3",
    name: "Javascript",
    totalQuestions: 3,
  },
  {
    _id: "4",
    name: "Typescript",
    totalQuestions: 1,
  },
];

const RightSidebar = async () => {
  const { questions } = await getTopQuestions({});
  console.log(questions);
  return (
    <section className="background-light900_dark200 light-border sticky right-0 top-0 flex h-screen flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[350px]">
      <div className="h3-bold text-dark200_light900">Top questions</div>
      <div className="mt-7 flex w-full flex-col gap-[30px]">
        {questions.map((item) => (
          <Link
            key={item._id}
            href={`/question/${item._id}`}
            className="flex cursor-pointer items-center justify-between gap-7"
          >
            <p className="text-dark500_light700 body-medium">{item.title}</p>
            <Image
              src="/assets/icons/chevron-right.svg"
              alt="arrow"
              width={20}
              height={20}
              className="invert-colors"
            />
          </Link>
        ))}
      </div>
      <div className="h3-bold text-dark200_light900 mt-12">Top questions</div>
      <div className="mt-7 flex flex-col gap-4">
        {popularTags.map((item) => (
          <RenderTag
            key={item._id}
            _id={item._id}
            name={item.name}
            totalQuestions={item.totalQuestions}
            showCount={true}
          />
        ))}
      </div>
    </section>
  );
};

export default RightSidebar;
