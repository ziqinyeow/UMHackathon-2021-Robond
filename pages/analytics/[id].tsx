import type { GetServerSideProps, NextPage } from "next";
import {
  // getBond,
  getBondByStockCode,
} from "lib/data";
import BasicLayout from "@/layouts/BasicLayout";
import CircularProgressBar from "@/components/CircularProgressBar";
import BarChart from "@/components/BarChart";

interface Props {
  result: DataType;
  bondPriceHistory: {
    bondPriceMonth?: string[];
    bondPriceValue?: number[];
  };
  bondReturnHistory: {
    bondReturnMonth?: string[];
    bondReturnValue?: number[];
  };
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

const Analytics: NextPage<Props> = ({
  result,
  // @ts-ignore
  bondPriceHistory,
  // @ts-ignore
  bondReturnHistory,
}) => {
  const meta = {
    title: `Robond - ${result?.["STOCK CODE"]}`,
    description: `Rank ${result?.RANK} bond with insightful and relavant information display to you dynamically`,
    image: "https://robond.vercel.app/static/Home.jpg",
  };

  return (
    <BasicLayout meta={meta}>
      <div className="layout">
        <div className="flex items-center justify-between w-full">
          <h1 className="mb-2 font-bold">
            {result?.["STOCK NAME"]?.split(" ").slice(0, 2).join(" ")}
          </h1>
          <h4 className="px-4 py-2 font-semibold border-2 rounded dark:border-gray-700">
            Rank {result?.RANK}
          </h4>
        </div>
        <h4 className="mb-2 font-medium">
          Stock Code: {result?.["STOCK CODE"]}
        </h4>
        <h4 className="mb-2 font-medium">Isin Code: {result?.["ISIN CODE"]}</h4>
        <h4 className="mb-10 font-medium">Rating: {result?.RATING}</h4>
        <div className="grid w-full gap-3 mb-4 md:gap-4 sm:grid-cols-3">
          <div className="flex flex-col justify-between p-6 border rounded-md theme_card sm:col-span-2 dark:border-gray-700">
            <h3 className="mb-3 font-semibold">Bond Price:</h3>
            <h1>
              <span className="text-2xl font-bold md:text-3xl">RM </span>
              {Math.round((Number(result?.PREDICTION) + Number.EPSILON) * 100) /
                100}
            </h1>
            <h6>
              {Math.round(
                (Number(result?.PREDICTION) -
                  Number(result?.["EVAL MID PRICE"]) +
                  Number.EPSILON) *
                  100
              ) / 100}{" "}
              compared to last month
            </h6>
          </div>
          <div className="flex flex-col justify-between p-6 text-white border rounded-md dark:border-gray-700 from-primary-100 to-primary-200 dark:from-primary-400 dark:to-primary-300 bg-gradient-to-l">
            <h3 className="font-semibold">Bond Return:</h3>
            <h2>
              {Math.round(
                (Number(result?.["BOND RETURN"]) + Number.EPSILON) * 100000
              ) / 100000}
              <span className="text-xl md:text-2xl">%</span>
            </h2>
          </div>
          <div className="flex flex-col justify-between p-6 border rounded-md dark:border-gray-700">
            <h3 className="font-semibold">Volatility:</h3>
            <h2>
              {Math.round(
                (Number(result?.VOLATILITY) + Number.EPSILON) * 100000
              ) / 100000}
            </h2>
          </div>
          <div className="flex flex-col justify-between p-6 border rounded-md dark:border-gray-700">
            <h3 className="mb-3 font-semibold">
              Bond Return Per Volatility Ratio:
            </h3>
            <h2>
              {Math.round((Number(result?.RATIO) + Number.EPSILON) * 100000) /
                100000}
            </h2>
          </div>
          <div className="p-6 border rounded-md dark:border-gray-700">
            <h3 className="mb-3 font-semibold text-center">Maturity Date</h3>
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center justify-center p-3 rounded">
                <h1>
                  {
                    // @ts-ignore
                    new Date(result?.["MATURITY DATE"]).getDate()
                  }
                </h1>
                <h5>
                  {new Date(
                    // @ts-ignore
                    result?.["MATURITY DATE"].toString()
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-3 md:gap-4 sm:grid-cols-3">
          <div className="p-6 border rounded-md sm:col-span-2 dark:border-gray-700">
            <h3 className="mb-4 font-semibold">Bond Price & Return History</h3>
            <div className="w-full h-64">
              <BarChart
                title1=" Bond Price (RM) "
                xAxis={bondPriceHistory?.bondPriceMonth}
                yAxis1={bondPriceHistory?.bondPriceValue}
                title2=" Bond Return (%) "
                yAxis2={bondReturnHistory?.bondReturnValue}
              />
            </div>
          </div>
          <div className="p-6 border rounded-md dark:border-gray-700">
            <h3 className="mb-4 font-semibold text-center">Next Coupon Rate</h3>
            <div className="flex items-center justify-center w-full mt-5 dark:text-gray-50">
              <div className="flex items-center justify-center w-48">
                <CircularProgressBar
                  percentage={
                    Math.round(
                      (Number(result?.["NEXT COUPON RATE"]) + Number.EPSILON) *
                        100
                    ) / 100
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Analytics;

// export const getStaticPaths: GetStaticPaths = async () => {
//   const { result }: any = await getBond(100);

//   return {
//     // @ts-ignore
//     paths: result.map((res) => ({
//       // eslint-disable-next-line prefer-template
//       params: { id: res["STOCK CODE"]?.toString() },
//     })),
//     fallback: true,
//   };
// };

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { result, bondPriceHistory, bondReturnHistory }: any =
    // @ts-ignore
    await getBondByStockCode(params?.id);

  return {
    props: { result, bondPriceHistory, bondReturnHistory },
  };
};
