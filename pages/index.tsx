import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
// eslint-disable-next-line @typescript-eslint/no-redeclare
import Image from "next/image";
import { getBond } from "lib/data";
import Dell from "@/public/static/Dell.jpg";
import Fusionex from "@/public/static/Fusionex.png";
import Swift from "@/public/static/Swift.jpg";
import BasicLayout from "@/layouts/BasicLayout";
import OPRCard from "@/components/OPRCard";
import Banner from "@/components/Banner";

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
  Rank?: string;
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

const Home: NextPage<Props> = ({ processedMonth, result }) => {
  return (
    <div>
      <BasicLayout meta={meta}>
        <Banner />
        <div className="layout">
          <div className="w-full grid-cols-5 gap-6 mb-6 xl:gap-8 sm:grid">
            <div className="col-span-3 mb-10">
              <div className="flex justify-between mb-5">
                <h4 className="font-bold text-primary-100 dark:text-primary-300">
                  Trending Bond{" "}
                  <span className="text-gray-300 dark:text-gray-500">
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
                    <div className="relative group">
                      <div className="absolute transition duration-1000 rounded-md -inset-1 bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-400 dark:to-primary-300 opacity-20 group-hover:duration-200 group-hover:opacity-100 blur" />
                      <div className="relative p-5 mb-5 transition duration-200 bg-white border rounded-md group-hover:text-white group-hover:bg-gradient-to-r dark:group-hover:from-primary-400 dark:group-hover:to-primary-300 group-hover:from-primary-100 group-hover:to-primary-200 bg-gradient-to-r dark:bg-black dark:border-gray-700">
                        <h1 className="absolute text-6xl font-bold transform opacity-20 right-12 rotate-12 bottom-12 sm:text-7xl md:text-8xl">
                          Top {index + 1}
                        </h1>
                        <h1 className="mb-2">
                          {res?.["STOCK NAME"]
                            ?.split(" ")
                            .slice(0, 2)
                            .join(" ")}
                        </h1>
                        <h3 className="mb-4 font-medium">
                          {res["STOCK CODE"]}: {res["ISIN CODE"]}
                        </h3>
                        <div className="flex">
                          <h4 className="pr-4">Bond Price:</h4>
                          <h4>
                            {res?.PREDICTION ? (
                              <span>
                                RM{" "}
                                {Math.round(
                                  (Number(res?.PREDICTION) + Number.EPSILON) *
                                    100
                                ) / 100}
                              </span>
                            ) : (
                              <span>--</span>
                            )}
                          </h4>
                        </div>
                        <div className="flex">
                          <h4 className="pr-4">Bond Return:</h4>
                          <h4>
                            {res?.["BOND RETURN"] ? (
                              <span>
                                {Math.round(
                                  (Number(res?.["BOND RETURN"]) +
                                    Number.EPSILON) *
                                    100000
                                ) / 100000}{" "}
                                %
                              </span>
                            ) : (
                              <span>--</span>
                            )}
                          </h4>
                        </div>
                        <div className="flex">
                          <h4 className="pr-4">Volatility:</h4>
                          <h4>
                            {res?.VOLATILITY ? (
                              Math.round(
                                (Number(res?.VOLATILITY) + Number.EPSILON) *
                                  100000
                              ) / 100000
                            ) : (
                              <span>--</span>
                            )}{" "}
                            %
                          </h4>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>

            <div className="col-span-2 mb-6">
              <div className="mb-16">
                <h4 className="mb-4 font-bold text-primary-100 dark:text-primary-300">
                  Announcement
                </h4>
                <div>
                  <OPRCard />
                </div>
              </div>
              <div className="mb-16">
                <h4 className="mb-4 font-bold text-primary-100 dark:text-primary-300">
                  About Pages
                </h4>
                <div className="space-y-4">
                  <div className="p-4 border-2 rounded-md dark:border-gray-700">
                    <h5 className="font-medium">
                      <strong>/</strong> - Displaying Top 5 Bond based on
                      volatility
                    </h5>
                  </div>
                  <div className="p-4 border-2 rounded-md dark:border-gray-700">
                    <h5 className="font-medium">
                      <strong>/analytics</strong> - Displaying Top 100 Bond
                      based on volatility
                    </h5>
                  </div>
                  <div className="p-4 border-2 rounded-md dark:border-gray-700">
                    <h5 className="font-medium">
                      <strong>/analytics/[Stock Code]</strong> - Displaying the
                      relevant info based on the stock code
                    </h5>
                  </div>
                  <div className="p-4 border-2 rounded-md dark:border-gray-700">
                    <h5 className="font-medium">
                      <strong>/predict</strong> - Predict the next month bond
                      price based on user input
                    </h5>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="mb-3 font-bold text-primary-100 dark:text-primary-300">
                  Sponsors
                </h4>
                <a
                  href="https://www.dell.com/en-my"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="relative w-full h-32 mb-3 border-2 rounded-md dark:border-opacity-10">
                    <Image
                      className="rounded-md"
                      src={Dell}
                      alt="Dell"
                      objectFit="cover"
                      layout="fill"
                    />
                  </div>
                </a>
              </div>
              <div>
                <a
                  href="https://www.fusionex-international.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="relative w-full h-32 mb-3 border-2 rounded-md dark:border-opacity-10">
                    <Image
                      className="rounded-md"
                      src={Fusionex}
                      alt="Fusionex"
                      objectFit="cover"
                      layout="fill"
                    />
                  </div>
                </a>
              </div>
              <div>
                <a
                  href="https://www.swift.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="relative w-full mb-3 border-2 rounded-md h-28 dark:border-opacity-10">
                    <Image
                      className="rounded-md"
                      src={Swift}
                      alt="Swift"
                      objectFit="cover"
                      layout="fill"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </BasicLayout>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { processedMonth, result }: any = await getBond(5);

  return {
    props: { processedMonth, result },
  };
};
