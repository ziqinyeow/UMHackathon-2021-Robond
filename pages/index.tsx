import type { NextPage } from "next";
import Link from "next/link";
import BasicLayout from "@/layouts/BasicLayout";
import OPRCard from "@/components/OPRCard";

const meta = {
  type: "",
  title: "Home",
  description: "",
  image: "",
};

const data = [
  {
    type: "Fixed Bond",
    code: "MYBMH1700051",
    bond_price: 13,
    bond_return: 0.59,
    volatility: 0.0345,
    history: [10, 3, 23, 30, 5, 9, 10],
  },
  {
    type: "Fixed Bond",
    code: "MYBMH1700052",
    bond_price: 20,
    bond_return: 0.56,
    volatility: 0.0067,
    history: [10, 3, 23, 30, 5, 9, 10],
  },
  {
    type: "Fixed Bond",
    code: "MYBMH1700053",
    bond_price: 14,
    bond_return: 0.37,
    volatility: 0.0267,
    history: [10, 3, 23, 30, 5, 9, 10],
  },
  {
    type: "Fixed Bond",
    code: "MYBMH1700054",
    bond_price: 8,
    bond_return: 0.22,
    volatility: 0.037,
    history: [10, 3, 23, 30, 5, 9, 10],
  },
  {
    type: "Fixed Bond",
    code: "MYBMH1700055",
    bond_price: 26,
    bond_return: 0.48,
    volatility: 0.0767,
    history: [10, 3, 23, 30, 5, 9, 10],
  },
];

const getNextMonth = () => {
  const now = new Date();
  let current;
  if (now.getMonth() === 11) {
    current = new Date(now.getFullYear() + 1, 0, 1);
  } else {
    current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  }
  return current.toLocaleString("en-us", {
    month: "short",
    year: "numeric",
  });
};
interface Props {
  OprLevel: number;
  OPRLevelLastUpdated: Date;
}

const Home: NextPage<Props> = () => {
  return (
    <BasicLayout meta={meta}>
      <div className="layout">
        <div className="w-full grid-cols-5 gap-5 mb-6 sm:grid">
          <div className="col-span-3">
            <div className="flex justify-between mb-3">
              <h4 className="font-bold">
                Trending Bond{" "}
                <span className="text-gray-300 dark:text-gray-600">
                  in {getNextMonth()}
                </span>
              </h4>
            </div>
            {data.map((d, index) => (
              <Link href={`/analytics/${d.code}`} key={d.code}>
                <a>
                  <div className="p-5 mb-5 border rounded-md dark:border-gray-700">
                    <h1 className="mb-3">Top {index + 1}</h1>
                    <h3 className="mb-4 text-gray-400 dark:text-gray-300">
                      {d.type}: {d.code}
                    </h3>
                    <div className="flex">
                      <h4 className="pr-4">Bond Price:</h4>
                      <h4>RM {d.bond_price}</h4>
                    </div>
                    <div className="flex">
                      <h4 className="pr-4">Bond Return:</h4>
                      <h4>{d.bond_return} %</h4>
                    </div>
                    <div className="flex">
                      <h4 className="pr-4">Volatility:</h4>
                      <h4>{d.volatility} %</h4>
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
