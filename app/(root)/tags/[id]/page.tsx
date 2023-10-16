import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { TagFilters } from "@/constants/filters";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";

const page = async ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  const { questions } = await getQuestionsByTagId({ tagId: params.id });
  console.log(questions);
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">All tags</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          <>
            {questions.map((question) => (
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
    </div>
  );
};

export default page;
