import fetcher from "lib/fetcher";
import useSWR from "swr";

const OPRCard: React.FC = () => {
  const { data } = useSWR("/api/opr", fetcher);

  return (
    <div className="p-4 border-2 rounded-md dark:border-gray-700">
      <h5 className="font-semibold">Malaysia OPR Level</h5>
      <h2>{data?.OprLevel ? data?.OprLevel : "--"}</h2>
      <h6 className="text-gray-400">
        {/* Updated at {data?.OPRLevelLastUpdated?.split(" ")[0]} from{" "} */}
        Retrieved from{" "}
        <a
          href="https://api.bnm.gov.my/explorer?category=Rates%20and%20Volumes"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bank Negara Malaysia API
        </a>
      </h6>
    </div>
  );
};

export default OPRCard;
