import type { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import BasicLayout from "@/layouts/BasicLayout";

const meta = {
  type: "",
  title: "Robot",
  description: "",
  image: "",
};

const Robot: NextPage = () => {
  const [form, setForm] = useState({
    rating: "",
    maturity_date: null,
    coupon_rate: null,
    accrued_interest: null,
    frequency_of_interest: null,
    current_price: null,
    yield_to_maturity: null,
    maturity: null,
    duration: null,
  });

  const handleChange = (e: ChangeEvent<HTMLElement>) => {
    // @ts-ignore
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    e.target.reset();
  };

  return (
    <BasicLayout meta={meta}>
      <div className="layout">
        <h3 className="font-bold mb-6">Predict your next month bond price</h3>
        <form onSubmit={handleSubmit} className="w-full grid grid-cols-2 gap-4">
          <div className="mb-10">
            <h4 className="text-gray-600 dark:text-gray-300 font-bold">
              Rating
            </h4>
            <select
              className="w-full border mt-3 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              name="rating"
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
          <div className="mb-10">
            <h4 className="text-gray-600 dark:text-gray-300 font-bold">
              Maturity Date
            </h4>
            <input
              className="w-full border mt-3 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="date"
              name="maturity_date"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="text-gray-600 dark:text-gray-300 font-bold">
              Coupon Rate
            </h4>
            <input
              className="w-full border mt-3 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="coupon_rate"
              step=".0001"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="text-gray-600 dark:text-gray-300 font-bold">
              Accrued Interest
            </h4>
            <input
              className="w-full border mt-3 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="accrued_interest"
              step=".01"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="text-gray-600 dark:text-gray-300 font-bold">
              Frequency of Interest
            </h4>
            <input
              className="w-full border mt-3 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="frequency_of_interest"
              step=".01"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="text-gray-600 dark:text-gray-300 font-bold">
              Current Price
            </h4>
            <input
              className="w-full border mt-3 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="current_price"
              step=".0001"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="text-gray-600 dark:text-gray-300 font-bold">
              Yield-To-Maturity
            </h4>
            <input
              className="w-full border mt-3 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="yield_to_maturity"
              step=".01"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="text-gray-600 dark:text-gray-300 font-bold">
              Maturity
            </h4>
            <input
              className="w-full border mt-3 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="date"
              name="maturity"
              onChange={handleChange}
            />
          </div>
          <div className="mb-10">
            <h4 className="text-gray-600 dark:text-gray-300 font-bold">
              Duration
            </h4>
            <input
              className="w-full border mt-3 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="duration"
              step=".001"
              onChange={handleChange}
              required
            />
          </div>
        </form>
        <div className="w-full">
          <button
            className="py-2 w-full px-4 rounded-md border dark:border-gray-700"
            type="submit"
          >
            Predict
          </button>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Robot;
