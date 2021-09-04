interface Props {
  title: string;
  description: string;
  publishedAt?: Date;
}

const SmallCard: React.FC<Props> = ({ title, description, publishedAt }) => {
  return (
    <div className="p-4 border-2 rounded-md dark:border-gray-700">
      <h5 className="font-semibold">{title}</h5>
      <h6>{description}</h6>
      <h6>{publishedAt?.toISOString().split("T")[0]}</h6>
    </div>
  );
};

export default SmallCard;
