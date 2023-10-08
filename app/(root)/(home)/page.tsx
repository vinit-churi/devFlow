import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import QuestionCard from "@/components/shared/question/QuestionCard";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

type TQuestions = {
  _id: string;
  title: string;
  tags: string[];
  votes: number;
  answerCount: number;
  createdAt: string;
  views: number;
}[];

const questions: TQuestions = [
  {
    _id: "1",
    title: "How to use React?",
    tags: ["react", "javascript"],
    votes: 10,
    answerCount: 2,
    createdAt: "2021-08-12T19:04:28.809Z",
    views: 100,
  },
  {
    _id: "2",
    title: "ReduxJs Basics",
    tags: ["redux", "javascript", "firebase"],
    votes: 70,
    answerCount: 7,
    createdAt: "2021-08-12T19:04:28.809Z",
    views: 86,
  },
];
export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-8 flex flex-wrap gap-6">
        {questions.map((question) => (
          <QuestionCard
            key={question._id}
            question={question}
            otherClasses="mb-5"
          />
        ))}
      </div>
    </>
  );
}
