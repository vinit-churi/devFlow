import Link from "next/link";

interface TagCardProps {
  tag: {
    _id: string;
    name: string;
  };
}

const TagCard = async ({ tag }: TagCardProps) => {
  return (
    <Link
      href={`/tags/${tag._id}`}
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900">{tag.name}</h3>
          <p className="body-regular text-dark500_light500 mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            dolorem laudantium praesentium hic deleniti!
          </p>
        </div>
      </article>
    </Link>
  );
};

export default TagCard;
