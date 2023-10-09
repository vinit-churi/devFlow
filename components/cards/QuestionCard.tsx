import React from "react";

type TQuestionCard = {
  _id: number;
  title: string;
  tags: { _id: number; name: string }[];
  answers: Array<object>;
  upvotes: number;
  views: number;
  author: {
    _id: number;
    name: string;
    avatar: string;
  };
  createdAt: Date;
};

const QuestionCard = ({
  _id,
  title,
  tags,
  answers,
  upvotes,
  views,
  author,
  createdAt,
}: TQuestionCard) => {
  return <div>QuestionCard</div>;
};

export default QuestionCard;
