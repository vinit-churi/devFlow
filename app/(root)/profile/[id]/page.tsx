import { Button } from "@/components/ui/button";
import { getUserById } from "@/lib/actions/user.action";
import Image from "next/image";

const page = async ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  const user = await getUserById({ userId: params.id });
  console.log(user);
  return (
    <div>
      <div className="flex gap-4">
        <Image
          src={user?.picture}
          alt={user?.name}
          width={200}
          height={200}
          className="rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold leading-7">{user?.name}</h1>
          <p>@{user?.username}</p>
          <p className="mt-4 flex items-center gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              alt="calendar"
              height={24}
              width={24}
            />
            {new Date(user?.joinedAt).toLocaleDateString("en-us", {
              year: "numeric",
              month: "long",
            })}
          </p>
        </div>
        <Button className="ml-auto block bg-slate-400">Edit Profile</Button>
      </div>
    </div>
  );
};

export default page;
