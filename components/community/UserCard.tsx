import Image from "next/image";
import React from "react";
import RenderTag from "../shared/RenderTag";
// TODO: correct the type after actually fetching data of user top tags
// TODO: make the optional fields required
interface ITag {
  name: string;
  _id: string;
  description?: string;
  questions?: string[];
  followers?: object[];
  createdOn?: Date;
}

interface IUser {
  _id: string;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
  reputation: number;
  saved: string[];
  joinedAt: Date;
  __v: number;
}

interface UserCardProps {
  user: IUser;
  topTags: ITag[];
}

const UserCard = ({ user, topTags }: UserCardProps) => {
  return (
    <div className="rounded-lg p-6 shadow-xl">
      <Image
        src={user.picture}
        alt={user.name}
        width={100}
        height={100}
        className="mx-auto mt-4 block rounded-full"
      />
      <h3 className="mt-4 text-center text-2xl font-bold">{user.name}</h3>
      <p className="text-center text-base text-gray-500">@{user.username}</p>
      <div className="mt-4 flex gap-2">
        {topTags.length > 0 &&
          topTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              showCount={false}
              otherClasses="text-sm max-w-[60px] clamp-1 truncate inline-block"
            />
          ))}
      </div>
    </div>
  );
};

export default UserCard;
