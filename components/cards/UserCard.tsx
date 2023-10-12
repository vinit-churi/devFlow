import { GetTopInteractedTags } from "@/lib/actions/tag.action";
import Image from "next/image";
import Link from "next/link";
import RenderTag from "../shared/RenderTag";
import { Badge } from "../ui/badge";

interface UserCardProps {
  user: {
    _id: string;
    name: string;
    picture: string;
    username: string;
    clerkId: string;
  };
}

const UserCard = async ({ user }: UserCardProps) => {
  const interactedTags = await GetTopInteractedTags({ userId: user._id });
  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.picture}
          alt="user profile"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900">{user.name}</h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>
        <div className="mt-5 flex gap-2">
          {interactedTags.length > 0 ? (
            interactedTags.map((tag) => (
              <RenderTag
                key={tag._id}
                _id={tag._id}
                showCount={false}
                name={tag.name}
              />
            ))
          ) : (
            <Badge>No tags yet</Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
