import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import BasicLayout from "@/layouts/BasicLayout";
import OPRCard from "@/components/OPRCard";

const meta = {
  type: "",
  title: "Home",
  description: "",
  image: "",
};
interface Props {
  processedMonth: string;
  result: DataType[];
}

type DataType = {
  "STOCK CODE"?: string;
  "ISIN CODE"?: string;
  "STOCK NAME"?: string;
  RATING?: string;
  "EVAL MID PRICE"?: string;
  "MATURITY DATE"?: string;
  PREDICTION?: string;
  "BOND RETURN"?: string;
  VOLATILITY?: string;
  RATIO?: string;
};

const Home: NextPage<Props> = ({ processedMonth, result }) => {
  return (
    <BasicLayout meta={meta}>
      <div className="layout">
        <div className="w-full grid-cols-5 gap-5 mb-6 sm:grid">
          <div className="col-span-3">
            <div className="flex justify-between mb-3">
              <h4 className="font-bold text-primary-100 dark:text-primary-300">
                Trending Bond{" "}
                <span className="text-gray-300 dark:text-gray-600">
                  in {processedMonth}
                </span>
              </h4>
            </div>
            {result.map((res, index) => (
              <Link
                href={`/analytics/${res?.["STOCK CODE"]}`}
                key={res?.["STOCK CODE"]}
              >
                <a>
                  <div className="relative p-5 mb-5 border rounded-md dark:border-gray-700">
                    <h1 className="absolute text-6xl font-bold transform opacity-10 right-12 rotate-12 bottom-12 sm:text-7xl md:text-8xl">
                      Top {index + 1}
                    </h1>
                    <h1 className="mb-2">
                      {res?.["STOCK NAME"]?.split(" ").slice(0, 2).join(" ")}
                    </h1>
                    <h3 className="mb-4 font-medium">
                      {res["STOCK CODE"]}: {res["ISIN CODE"]}
                    </h3>
                    <div className="flex">
                      <h4 className="pr-4">Bond Price:</h4>
                      <h4>
                        RM{" "}
                        {Math.round(
                          (Number(res?.PREDICTION) + Number.EPSILON) * 100
                        ) / 100}
                      </h4>
                    </div>
                    <div className="flex">
                      <h4 className="pr-4">Bond Return:</h4>
                      <h4>
                        {Math.round(
                          (Number(res?.["BOND RETURN"]) + Number.EPSILON) *
                            100000
                        ) / 100000}{" "}
                        %
                      </h4>
                    </div>
                    <div className="flex">
                      <h4 className="pr-4">Volatility:</h4>
                      <h4>
                        {Math.round(
                          (Number(res?.VOLATILITY) + Number.EPSILON) * 100000
                        ) / 100000}{" "}
                        %
                      </h4>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>

          <div className="col-span-2 mb-6">
            <div className="mb-16">
              <h4 className="mb-3 font-bold text-primary-100 dark:text-primary-300">
                Announcement
              </h4>
              <div>
                <OPRCard />
              </div>
            </div>
            <div>
              <h4 className="mb-3 font-bold text-primary-100 dark:text-primary-300">
                Collaborator
              </h4>
              <div className="w-full h-32 mb-3 border-2 rounded-md">asdf</div>
              <div className="w-full h-32 mb-3 border-2 rounded-md">asdf</div>
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch("http://localhost:3000/api/data", {
    method: "POST",
    body: JSON.stringify({
      returnType: "5",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { month, result } = await data.json();

  const monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const processedMonth = `${
    monthList[Number(month.slice(11, 13)) - 1]
  }  ${month.slice(7, 11)}`;

  return {
    props: { processedMonth, result },
  };
};
