import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import BasicLayout from "@/layouts/BasicLayout";
import CircularProgressBar from "@/components/CircularProgressBar";
import BarChart from "@/components/BarChart";

const meta = {
  type: "",
  title: "Analytics",
  description: "",
  image: "",
};

interface Props {
  result: DataType;
  bondPriceHistory: {
    bondPriceMonth: string[];
    bondPriceValue: number[];
  };
  bondReturnHistory: {
    bondReturnMonth: string[];
    bondReturnValue: number[];
  };
}

type DataType = {
  "STOCK CODE": string;
  "ISIN CODE": string;
  "STOCK NAME": string;
  RATING: string;
  "EVAL MID PRICE": string;
  "MATURITY DATE": string;
  PREDICTION: string;
  "BOND RETURN": string;
  VOLATILITY: string;
  RATIO: string;
};

const Analytics: NextPage<Props> = ({
  result,
  bondPriceHistory: { bondPriceMonth, bondPriceValue },
  bondReturnHistory: { bondReturnValue },
}) => {
  return (
    <BasicLayout meta={meta}>
      <div className="layout">
        <h3 className="mb-2 font-bold">
          {result?.["STOCK NAME"].split(" ").slice(0, 2).join(" ")}
        </h3>
        <h4 className="mb-6 font-bold">
          {result?.["ISIN CODE"]}: {result?.["STOCK CODE"]}
        </h4>
        <div className="grid w-full gap-3 mb-4 md:gap-4 sm:grid-cols-3">
          <div className="flex flex-col justify-between p-6 border rounded-md dark:border-gray-700">
            <h3 className="font-semibold">Bond Price:</h3>
            <h3>
              RM{" "}
              {Math.round((Number(result?.PREDICTION) + Number.EPSILON) * 100) /
                100}
            </h3>
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
          <div className="flex flex-col justify-between p-6 border rounded-md dark:border-gray-700">
            <h3 className="font-semibold">Bond Return:</h3>
            <h3>
              {Math.round(
                (Number(result?.["BOND RETURN"]) + Number.EPSILON) * 100
              ) / 100}{" "}
              %
            </h3>
          </div>
          <div className="flex flex-col justify-between p-6 border rounded-md dark:border-gray-700">
            <h3 className="font-semibold">Volatility:</h3>
            <h3>
              {Math.round(
                (Number(result?.VOLATILITY) + Number.EPSILON) * 100000
              ) / 100000}{" "}
              %
            </h3>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-3 md:gap-4 sm:grid-cols-3">
          <div className="p-6 border rounded-md sm:col-span-2 dark:border-gray-700">
            <h3 className="mb-4 font-semibold">Bond Price & Return History</h3>
            <div className="w-full h-64">
              <BarChart
                title1=" Bond Price (RM) "
                xAxis={bondPriceMonth}
                yAxis1={bondPriceValue}
                title2=" Bond Return (%) "
                yAxis2={bondReturnValue}
              />
            </div>
          </div>
          <div className="p-6 border rounded-md dark:border-gray-700">
            <h3 className="mb-4 font-semibold">Volatility Ratio</h3>
            <div className="flex items-center justify-center w-full mt-5 dark:text-gray-50">
              <div className="flex items-center justify-center w-48">
                <CircularProgressBar
                  percentage={
                    Math.round((Number(result?.RATIO) + Number.EPSILON) * 100) /
                    100
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

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetch("http://localhost:3000/api/data", {
    method: "POST",
    body: JSON.stringify({
      returnType: "100",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { result } = await data.json();

  return {
    // @ts-ignore
    paths: result.map((res) => ({
      // eslint-disable-next-line prefer-template
      params: { id: res["STOCK CODE"]?.toString() },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await fetch("http://localhost:3000/api/data", {
    method: "POST",
    body: JSON.stringify({
      returnType: params?.id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { result, bondPriceHistory, bondReturnHistory } = await data.json();

  return {
    props: { result, bondPriceHistory, bondReturnHistory },
  };
};
