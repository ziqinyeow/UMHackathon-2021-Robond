import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import BasicLayout from "@/layouts/BasicLayout";

const meta = {
  type: "",
  title: "Analytics",
  description: "",
  image: "",
};

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

const Analytics: NextPage<Props> = ({ result }) => {
  const [searchValue, setSearchValue] = useState("");

  const filterData = result.filter(
    (d) =>
      d?.["ISIN CODE"]?.toLowerCase().includes(searchValue.toLowerCase()) ||
      d?.["STOCK CODE"]?.toLowerCase().includes(searchValue.toLowerCase()) ||
      d?.["STOCK NAME"]?.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <BasicLayout meta={meta}>
      <div className="layout">
        <h3 className="mb-6 font-bold">Statistics</h3>
        <input
          className="w-full p-3 mb-6 border dark:border-gray-700 dark:bg-gray-900"
          type="text"
          placeholder="Search stock code or bond type"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {filterData.length === 0 ? (
          <div>Not found</div>
        ) : (
          <div className="grid w-full grid-cols-6 py-3 text-center">
            <h4 className="px-3">Rank</h4>
            <h4 className="px-3">Rating</h4>
            <h4 className="px-3">Isin Code</h4>
            <h4 className="px-3">Stock Code</h4>
            <h4 className="px-3">Bond Price</h4>
            <h4 className="px-3">Bond Return</h4>
          </div>
        )}

        {filterData.map((d, index) => (
          <Link key={d?.["ISIN CODE"]} href={`/analytics/${d?.["ISIN CODE"]}`}>
            <a className="grid w-full grid-cols-6 py-3 text-center hover:bg-gray-100 dark:hover:bg-gray-700">
              <h5 className="px-3 overflow-hidden">{index + 1}</h5>
              <h5 className="px-3 overflow-hidden">{d?.RATING}</h5>
              <h5 className="px-3 overflow-hidden">{d?.["ISIN CODE"]}</h5>
              <h5 className="px-3 overflow-hidden">{d?.["STOCK CODE"]}</h5>
              <h5 className="px-3 overflow-hidden">
                {Math.round((Number(d?.PREDICTION) + Number.EPSILON) * 100) /
                  100}
              </h5>
              <h5 className="px-3 overflow-hidden">
                {Math.round(
                  (Number(d?.["BOND RETURN"]) + Number.EPSILON) * 100
                ) / 100}
              </h5>
            </a>
          </Link>
        ))}
      </div>
    </BasicLayout>
  );
};

export default Analytics;

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch("http://localhost:3000/api/data", {
    method: "POST",
    body: JSON.stringify({
      month: "Nov 2020",
      returnType: "All",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { result } = await data.json();

  return {
    props: { result },
  };
};
