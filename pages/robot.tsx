import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import BasicLayout from "@/layouts/BasicLayout";

const meta = {
  type: "",
  title: "Robot",
  description: "",
  image: "",
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
  const [form, setForm] = useState<Form>();

  const handleChange = (e: ChangeEvent<HTMLElement>) => {
    // @ts-ignore
    const { name, value } = e.target;
    // @ts-ignore
    setForm({
      ...form,
      [name]:
        name === "RATING" || name === "STOCK CODE" ? value : Number(value),
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const fetcher = await fetch("/api/data", {
      method: "POST",
      body: JSON.stringify([form]),
    });
    const predictedResult = await fetcher.json();

    const result = JSON.parse(predictedResult?.result)[0].FUTURE;
    // eslint-disable-next-line no-console
    console.log("predicted result", result);

    e.target.reset();
  };

  return (
    <BasicLayout meta={meta}>
      <div className="layout">
        <h3 className="mb-6 font-bold">Predict your next month bond price</h3>
        <form onSubmit={handleSubmit} className="grid w-full grid-cols-2 gap-4">
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              STOCK CODE
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="text"
              name="STOCK CODE"
              onChange={handleChange}
              required
            />
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
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              EVAL MID PRICE
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="EVAL MID PRICE"
              step=".1"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              EVAL MID YIELD
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="EVAL MID YIELD"
              step=".1"
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
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              NEXT COUPON RATE
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="NEXT COUPON RATE"
              step=".1"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              DAYS TO MATURITY
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="DAYS TO MATURITY"
              step="1"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              CREDIT SPREAD
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="CREDIT SPREAD"
              step=".1"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              OPR MOVEMENT
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="OPR MOVEMENT"
              step=".1"
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
              <option value="NR(LT)">NR(LT)</option>
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
          <div className="w-full col-span-2">
            <button
              className="w-full px-4 py-2 border rounded-md dark:border-gray-700"
              type="submit"
            >
              Predict
            </button>
          </div>
        </form>
      </div>
    </BasicLayout>
  );
};

export default Robot;
