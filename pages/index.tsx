import type { NextPage } from "next";
import BasicLayout from "@/layouts/BasicLayout";

const meta = {
  type: "",
  title: "Home",
  description: "",
  image: "",
};

const data = [
  {
    rank: "Top 1",
    type: "Fixed Bond",
    code: "MYBMH1700051",
    bond_price: 20,
    bond_return: 0.56,
    volatility: 0.0067,
  },
  {
    rank: "Top 2",
    type: "Fixed Bond",
    code: "MYBMH1700051",
    bond_price: 20,
    bond_return: 0.56,
    volatility: 0.0067,
  },
  {
    rank: "Top 3",
    type: "Fixed Bond",
    code: "MYBMH1700051",
    bond_price: 20,
    bond_return: 0.56,
    volatility: 0.0067,
  },
  {
    rank: "Top 4",
    type: "Fixed Bond",
    code: "MYBMH1700051",
    bond_price: 20,
    bond_return: 0.56,
    volatility: 0.0067,
  },
  {
    rank: "Top 5",
    type: "Fixed Bond",
    code: "MYBMH1700051",
    bond_price: 20,
    bond_return: 0.56,
    volatility: 0.0067,
  },
];

const Home: NextPage = () => {
  const now = new Date();
  let current;
  if (now.getMonth() === 11) {
    current = new Date(now.getFullYear() + 1, 0, 1);
  } else {
    current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  }
  return (
    <BasicLayout meta={meta}>
      <div className="layout">
        <div className="sm:grid grid-cols-5 gap-5 w-full mb-6">
          <div className="col-span-3">
            <div className="flex justify-between">
              <h4 className="font-bold mb-3">Trending</h4>
              <h4 className="text-gray-500">
                {current.toLocaleString("en-us", {
                  month: "short",
                  year: "numeric",
                })}
              </h4>
            </div>
            {data.map((d) => (
              <div
                key={d.code}
                className="mb-5 p-5 border rounded-md dark:border-gray-700"
              >
                <h1 className="mb-3">{d.rank}</h1>
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
            ))}
          </div>
          <div className="col-span-2 mb-6">
            <h4 className="font-bold mb-3">News</h4>
            <div className="border-2 rounded-md dark:border-gray-700">
              <div className="p-4">
                <h5 className="font-semibold">Fixed Bond Rate roses 15%</h5>
                <h6>Recently</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Home;
