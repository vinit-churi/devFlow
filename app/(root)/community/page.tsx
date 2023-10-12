import LocalSearch from "@/components/shared/search/LocalSearch";
import Filter from "@/components/shared/Filter";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import NoResult from "@/components/shared/NoResult";
import UserCard from "@/components/community/UserCard";
const page = async () => {
  const usersData = await getAllUsers();
  //   TODO: correct the type after actually fetching data of user top tags
  const topTags: { name: string; _id: string }[] = [
    {
      _id: "1",
      name: "JavaScript",
    },
    {
      _id: "2",
      name: "ReactJs",
    },
    {
      _id: "3",
      name: "Typescipt",
    },
  ];
  console.log(usersData, "getAllUsers");
  return (
    <>
      <div>
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <div className="my-8 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2">
        {usersData.length > 0 ? (
          <UserCard user={usersData[0]} topTags={topTags} />
        ) : (
          <NoResult
            title="There`s no user to show"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium lorem15
                    laudantium architecto blanditiis ut impedit deleniti voluptates. Temporibus libero"
            link="/sign-up"
            linkText="sign up"
          />
        )}
      </div>
    </>
  );
};

export default page;
