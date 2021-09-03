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
  details: {
    type: string;
    code: string;
    bond_price: number;
    bond_return: number;
    volatility: number;
    history: number[];
  };
}

const Analytics: NextPage<Props> = ({ details }) => {
  return (
    <BasicLayout meta={meta}>
      <div className="layout">
        <h3 className="mb-6 font-bold">
          {details.type}: {details.code}
        </h3>
        <div className="grid w-full gap-3 mb-4 md:gap-4 sm:grid-cols-3">
          <div className="flex flex-col justify-between p-6 border rounded-md dark:border-gray-700">
            <h3 className="font-semibold">Bond Price:</h3>
            <h3>RM {details.bond_price}</h3>
          </div>
          <div className="flex flex-col justify-between p-6 border rounded-md dark:border-gray-700">
            <h3 className="font-semibold">Bond Return:</h3>
            <h3>{details.bond_return} %</h3>
          </div>
          <div className="flex flex-col justify-between p-6 border rounded-md dark:border-gray-700">
            <h3 className="font-semibold">Volatility:</h3>
            <h3>{details.volatility} %</h3>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-3 md:gap-4 sm:grid-cols-3">
          <div className="p-6 border rounded-md sm:col-span-2 dark:border-gray-700">
            <h3 className="mb-4 font-semibold">History</h3>
            <div className="w-full h-64">
              <BarChart history={details.history} />
            </div>
          </div>
          <div className="p-6 border rounded-md dark:border-gray-700">
            <h3 className="mb-4 font-semibold">Accurued Interest</h3>
            <div className="flex items-center justify-center w-full mt-5 dark:text-gray-50">
              <div className="flex items-center justify-center w-40">
                <CircularProgressBar percentage={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Analytics;

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
  {
    type: "Callable Bond",
    code: "MYBMH1700056",
    bond_price: 3,
    bond_return: 0.56,
    volatility: 0.0064,
    history: [10, 3, 23, 30, 5, 9, 10],
  },
  {
    type: "Callable Bond",
    code: "MYBMH1700057",
    bond_price: 7,
    bond_return: 0.52,
    volatility: 0.0022,
    history: [10, 3, 23, 30, 5, 9, 10],
  },
];

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: data.map((d) => ({
      params: { id: d.code },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const details = data.find((d) => d.code === params?.id);
  return { props: { details } };
};
