import Image from "next/image";

interface IProps {
  totalQuestions: number;
  totalAnswers: number;
}
const Stats = ({ totalQuestions, totalAnswers }: IProps) => {
  return (
    <div className=" grid w-full grid-cols-1 gap-6 md:grid-cols-2  lg:grid-cols-4">
      <div className="flex flex-wrap items-center justify-start gap-4 rounded-lg p-5 shadow-md">
        <div>
          <p>{totalQuestions}</p>
          <p className="text-sm">Questions</p>
        </div>
        <div>
          <p>{totalAnswers}</p>
          <p className="text-sm">Answers</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-start gap-4 rounded-lg p-5 shadow-md">
        <Image
          src="/assets/icons/gold-medal.svg"
          alt="answer"
          width={32}
          height={32}
        />
        <div className="w-auto">
          <p className="text-sm">0</p>
          <p className="text-sm">Gold Badges</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-start gap-4 rounded-lg p-5 shadow-md">
        <Image
          src="/assets/icons/silver-medal.svg"
          alt="answer"
          width={24}
          height={24}
        />
        <div>
          <p className="text-sm">0</p>
          <p className="text-sm">Silver Badges</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-start gap-4 rounded-lg p-5 shadow-md">
        <Image
          src="/assets/icons/bronze-medal.svg"
          alt="answer"
          width={24}
          height={24}
        />
        <div>
          <p className="text-sm">0</p>
          <p className="text-sm">Bronze Badges</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
