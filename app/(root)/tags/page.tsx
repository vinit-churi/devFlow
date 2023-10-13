import LocalSearch from "@/components/shared/search/LocalSearch";
import Filter from "@/components/shared/Filter";
import { UserFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import NoResult from "@/components/shared/NoResult";
import Link from "next/link";
const page = async () => {
  const result = await getAllTags({});

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for Tags"
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {result.tags.length > 0 ? (
          result.tags.map((tag) => (
            <Link key={tag._id} href={`/tags/${tag._id}`}>
              <article className="background-light900_dark200 light-border flex w-full flex-col items-center rounded-2xl border px-8 py-10 sm:w-[260px]">
                <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
                  <p className="paragraph-semibold text-dark300_light900">
                    {tag.name}
                  </p>
                </div>
                <p className="small-medium text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.questions.length}+
                  </span>{" "}
                  Questions
                </p>
              </article>
            </Link>
          ))
        ) : (
          <NoResult
            title="No Tags Found"
            description="No Tags Found"
            link="/ask-question"
            linkText="Ask Question"
            // imgSrc="/assets/illustrations/no-result.svg"
          />
        )}
      </section>
    </>
  );
};

export default page;
