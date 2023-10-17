import { SearchParamsProps } from "@/types";

interface IProps extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}
const AnswersTab = ({ searchParams, userId, clerkId }: IProps) => {
  return <div>AnswersTab</div>;
};

export default AnswersTab;
