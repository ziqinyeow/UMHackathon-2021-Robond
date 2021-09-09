import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import BasicLayout from "@/layouts/BasicLayout";

const meta = {
  title: "Robond - Predict",
  description:
    "Test our artificial intelligence model with machine learning model running at the background to serve you accurate result",
  image: "https://robond.vercel.app/static/Home.jpg",
};

interface Form {
  "STOCK CODE": string;
  AINTEREST: number;
  "COUPON FREQUENCY": number;
  "EVAL MID PRICE": number;
  "EVAL MID YIELD": number;
  "MODIFIED DURATION": number;
  "NEXT COUPON RATE": number;
  "DAYS TO MATURITY": number;
  "CREDIT SPREAD": number;
  "OPR MOVEMENT": number;
  RATING: string;
}

const Robot: NextPage = () => {
  const now = new Date();
  let current;
  if (now.getMonth() === 11) {
    current = new Date(now.getFullYear() + 1, 0, 1 + 1);
  } else {
    current = new Date(now.getFullYear(), now.getMonth() + 1, 1 + 1);
  }

  const [form, setForm] = useState<Form>();
  const [nextMonthBondPrice, setNextMonthBondPrice] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLElement>) => {
    // @ts-ignore
    const { name, value } = e.target;
    // @ts-ignore
    setForm({
      ...form,
      [name]:
      // eslint-disable-next-line no-nested-ternary
        name === "RATING" || name === "STOCK CODE"
          ? value
          : name !== "DAYS TO MATURITY"
          ? Number(value)
          : (new Date().getTime() - new Date(value).getTime()) / 86400000,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const fetcher = await fetch("/api/predict", {
      method: "POST",
      body: JSON.stringify([form]),
    });
    const predictedResult = await fetcher.json();
    const result = JSON.parse(predictedResult?.result)[0].FUTURE;

    setNextMonthBondPrice(result);

    e.target.reset();
  };

  return (
    <BasicLayout meta={meta}>
      <div className="relative layout">
        <h3 className="font-bold">Predict</h3>
        <h4 className="mb-10">
          your next month{" "}
          <span className="text-primary-100 dark:text-primary-300">
            bond price
          </span>
        </h4>
        <form onSubmit={handleSubmit} className="grid w-full grid-cols-2 gap-4">
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              Stock Code
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="text"
              name="STOCK CODE"
              placeholder="This is just for reference"
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              Rating
            </h4>
            <select
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              name="RATING"
              onChange={handleChange}
            >
              <option value="A+IS">A+IS</option>
              <option value="A1">A1</option>
              <option value="AA+">AA+</option>
              <option value="AA1">AA1</option>
              <option value="AA2">AA2</option>
              <option value="AA3">AA3</option>
              <option value="AAA">AAA</option>
              <option value="AAA IS">AAA IS</option>
            </select>
          </div>
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              Accrued Interest
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="AINTEREST"
              step=".1"
              placeholder="Input a number"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              Coupon Frequency
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="COUPON FREQUENCY"
              step=".1"
              placeholder="Input a number"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              Eval Mid Price
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="EVAL MID PRICE"
              step=".1"
              placeholder="Input a number"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              Eval Mid Yield
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="EVAL MID YIELD"
              step=".1"
              placeholder="Input a number"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              Modified Duration
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="MODIFIED DURATION"
              step=".1"
              placeholder="Input a number"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              Next Coupon Rate
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="NEXT COUPON RATE"
              step=".1"
              placeholder="Input a number"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              Maturity Date
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="date"
              name="DAYS TO MATURITY"
              min={`${current.toISOString().slice(0, 10)}`}
              defaultValue={`${current.toISOString().slice(0, 10)}`}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              Credit Spread
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="CREDIT SPREAD"
              step=".1"
              placeholder="Input a number"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              OPR Movement
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="OPR MOVEMENT"
              step=".01"
              placeholder="1.75"
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full col-span-2">
            <button
              className="w-full px-4 py-2 text-white border rounded-md dark:border-gray-700 bg-primary-100 hover:bg-primary-300 hover:text-black"
              type="submit"
            >
              Predict
            </button>
          </div>
        </form>
        {nextMonthBondPrice !== 0 && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-200 bg-opacity-30 dark:bg-black dark:bg-opacity-25">
            <div className="relative flex items-center justify-center p-20 text-center bg-black rounded-lg shadow-2xl text-gray-50 dark:bg-gray-50 dark:text-black">
              <h3>
                {nextMonthBondPrice > 0
                  ? `Next Month Bond Price: RM ${
                      Math.round(
                        (Number(nextMonthBondPrice) + Number.EPSILON) * 100
                      ) / 100
                    }`
                  : "Please input a valid data"}
              </h3>
              <button
                type="button"
                onClick={() => setNextMonthBondPrice(0)}
                className="absolute top-0 right-0 px-3 py-1 bg-primary-100 hover:bg-primary-300 text-gray-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </BasicLayout>
  );
};

export default Robot;
