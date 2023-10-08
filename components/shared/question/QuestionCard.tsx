import React from "react";

type TQuestionCardProps = {
  otherClasses?: string;
  question: {
    _id: string;
    title: string;
    tags: string[];
    votes: number;
    answerCount: number;
    createdAt: string;
    views: number;
  };
};

const QuestionCard = ({ otherClasses, question }: TQuestionCardProps) => {
  return (
    <div className="text-dark300_light900 h-auto flex-[1_1_100%] rounded-md bg-white p-5 shadow-sm dark:bg-slate-800">
      <h2 className="line-clamp-1 truncate text-2xl font-bold">
        {question.title}
      </h2>
      <div className="my-3 flex gap-2">
        {question.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-gray-100 px-2 py-1 text-xs dark:bg-slate-700"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {question.votes} votes
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {question.answerCount} answers
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {question.views} views
        </span>
      </div>
    </div>
  );
};

export default QuestionCard;
