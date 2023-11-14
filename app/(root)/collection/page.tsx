import Filter from "@/components/shared/Filter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { QuestionFilters } from "@/constants/filters";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import { getSavedQuestions } from "@/lib/actions/question.action";
import { auth } from "@clerk/nextjs";
import { SearchParamsProps } from "@/types";
export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId } = auth();
  const result = await getSavedQuestions({
    clerkId: userId as string,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/collection"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="flex"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          <>
            {/* @ts-ignore */}
            {result.questions.map((question) => (
              <QuestionCard
                key={question._id}
                _id={question._id}
                title={question.title}
                tags={question.tags}
                answers={question.answers}
                upvotes={question.upvotes}
                views={question.views}
                author={question.author}
                createdAt={question.createdAt}
              />
            ))}
          </>
        ) : (
          <NoResult
            title="There`s no question to show"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium lorem15
            laudantium architecto blanditiis ut impedit deleniti voluptates. Temporibus libero"
            link="/ask-question"
            linkText="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
