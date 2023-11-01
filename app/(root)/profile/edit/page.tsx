import Profile from "@/components/forms/Profile";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
const Page = async () => {
  const { userId } = auth();
  const user = await getUserById({ userId });
  const userProfile = {
    clerkId: userId,
    name: user.name,
    username: user.username,
    portfolioLink: user.portfolioLink || "",
    location: user.location || "",
    bio: user.bio || "",
  };
  return (
    <div>
      <Profile user={JSON.stringify(userProfile)} />
    </div>
  );
};

export default Page;
