import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { getBond } from "lib/data";
import BasicLayout from "@/layouts/BasicLayout";

const meta = {
  title: "Robond - Analytics",
  description:
    "This page display the TOP 100 bond predicted by our artificial intelligence machine learning model. Users can search the bond to identify the next month trend",
  image: "https://robond.vercel.app/static/Home.jpg",
};

interface Props {
  processedMonth: string;
  result: DataType[];
}

type DataType = {
  RANK?: string;
  "STOCK CODE"?: string;
  "ISIN CODE"?: string;
  "STOCK NAME"?: string;
  RATING?: string;
  "EVAL MID PRICE"?: string;
  "MATURITY DATE"?: string;
  "NEXT COUPON RATE"?: string;
  PREDICTION?: string;
  "BOND RETURN"?: string;
  VOLATILITY?: string;
  RATIO?: string;
};

const Analytics: NextPage<Props> = ({ processedMonth, result }) => {
  const [searchValue, setSearchValue] = useState("");

  const filterData = result.filter(
    (d) =>
      d?.RATING?.toLowerCase().includes(searchValue.toLowerCase()) ||
      d?.["STOCK CODE"]?.toLowerCase().includes(searchValue.toLowerCase()) ||
      d?.["STOCK NAME"]?.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <BasicLayout meta={meta}>
      <div className="layout">
        <h3 className="mb-6 font-bold">Statistics for {processedMonth}</h3>
        <div className="relative w-full mb-4 group">
          <div className="absolute transition duration-500 rounded-md -inset-0.5 bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-400 dark:to-primary-300 opacity-20 group-hover:duration-200 group-hover:opacity-100 blur" />
          <input
            className="relative w-full p-3 bg-white rounded-md dark:bg-gray-900 focus:outline-none focus:ring focus:ring-primary-100"
            type="text"
            placeholder="Search bond rating, stock code or stock name"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="flex justify-end w-full mb-10 text-gray-500">
          {filterData.length} {filterData.length <= 1 ? "bond" : "bonds"}
        </div>
        {filterData.length === 0 ? (
          <div>
            <div>Bond not found.</div>
            <div>
              You can try to type your stock code in the url.
              (/analytics/your_stock_code)
            </div>
          </div>
        ) : (
          <div className="relative w-full mb-10">
            <div className="absolute transition duration-500 rounded-md -inset-0.5 bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-400 dark:to-primary-300 opacity-10 blur" />
            <div className="grid w-full grid-cols-11 py-3 text-center">
              <h4 className="col-span-1 font-bold">Rank</h4>
              <h4 className="col-span-2 font-bold">Rating</h4>
              <h4 className="col-span-2 font-bold">Stock Name</h4>
              <h4 className="col-span-2 font-bold">Stock Code</h4>
              <h4 className="col-span-2 font-bold">Bond Price</h4>
              <h4 className="col-span-2 font-bold">Bond Return</h4>
            </div>
          </div>
        )}

        {filterData.map((d) => (
          <Link
            key={d?.["STOCK CODE"]}
            href={`/analytics/${d?.["STOCK CODE"]}`}
          >
            <a className="relative w-full mb-4 group">
              <div className="absolute transition duration-500 rounded-md -inset-0.5 bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-400 dark:to-primary-300 opacity-20 group-hover:duration-200 group-hover:opacity-100 blur" />
              <div className="relative grid w-full grid-cols-11 py-5 text-center bg-white rounded-md dark:bg-gray-900">
                <h5 className="break-all">{d?.RANK}</h5>
                <h5 className="col-span-2 break-all">
                  <span className="px-2 py-1 text-sm border rounded dark:border-gray-700">
                    {d?.RATING}
                  </span>
                </h5>
                <h5 className="col-span-2 break-all">
                  {d?.["STOCK NAME"]?.split(" ").slice(0, 2).join(" ")}
                </h5>
                <h5 className="col-span-2 break-all">{d?.["STOCK CODE"]}</h5>
                <h5 className="col-span-2 break-all">
                  {Math.round((Number(d?.PREDICTION) + Number.EPSILON) * 100) /
                    100}
                </h5>
                <h5 className="col-span-2 break-all">
                  {Math.round(
                    (Number(d?.["BOND RETURN"]) + Number.EPSILON) * 10000
                  ) / 10000}
                </h5>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </BasicLayout>
  );
};

export default Analytics;

export const getServerSideProps: GetServerSideProps = async () => {
  const { processedMonth, result }: any = await getBond(100);
  return {
    props: { processedMonth, result },
  };
};
