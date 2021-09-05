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

// const getNextMonth = () => {
//   const now = new Date();
//   let current;
//   if (now.getMonth() === 11) {
//     current = new Date(now.getFullYear() + 1, 0, 1);
//   } else {
//     current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
//   }
//   return current.toLocaleString("en-us", {
//     month: "short",
//     year: "numeric",
//   });
// };
interface Props {
  result: DataType[];
}

type DataType = {
  "STOCK CODE": string;
  "ISIN CODE": string;
  "STOCK NAME": string;
  RATING: string;
  "EVAL MID PRICE": string;
  PREDICTION: string;
  "BOND RETURN": string;
};

const Home: NextPage<Props> = ({ result }) => {
  return (
    <BasicLayout meta={meta}>
      <div className="layout">
        <div className="w-full grid-cols-5 gap-5 mb-6 sm:grid">
          <div className="col-span-3">
            <div className="flex justify-between mb-3">
              <h4 className="font-bold">
                Trending Bond{" "}
                <span className="text-gray-300 dark:text-gray-600">
                  in Nov 2020
                </span>
              </h4>
            </div>
            {result.map((res, index) => (
              <Link
                href={`/analytics/${res?.["ISIN CODE"]}`}
                key={res?.["ISIN CODE"]}
              >
                <a>
                  <div className="p-5 mb-5 border rounded-md dark:border-gray-700">
                    <h1 className="mb-3">Top {index + 1}</h1>
                    <h3 className="mb-4 text-gray-400 dark:text-gray-300">
                      {res["STOCK CODE"]}: {res["ISIN CODE"]}
                    </h3>
                    <div className="flex">
                      <h4 className="pr-4">Bond Price:</h4>
                      <h4>
                        RM
                        {Math.round(
                          (Number(res?.PREDICTION) + Number.EPSILON) * 100
                        ) / 100}
                      </h4>
                    </div>
                    <div className="flex">
                      <h4 className="pr-4">Bond Return:</h4>
                      <h4>
                        {Math.round(
                          (Number(res?.["BOND RETURN"]) + Number.EPSILON) * 100
                        ) / 100}{" "}
                        %
                      </h4>
                    </div>
                    <div className="flex">
                      <h4 className="pr-4">Eval Mid Price:</h4>
                      <h4>
                        RM{" "}
                        {Math.round(
                          (Number(res?.["EVAL MID PRICE"]) + Number.EPSILON) *
                            100
                        ) / 100}
                      </h4>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>

          <div className="col-span-2 mb-6">
            <h4 className="mb-3 font-bold">Announcement</h4>
            <div>
              <OPRCard />
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
      month: "Nov 2020",
      returnType: "5",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { result } = await data.json();
  // eslint-disable-next-line no-console
  console.log(result);

  return {
    props: { result },
  };
};
