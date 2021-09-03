import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
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

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // eslint-disable-next-line no-console
    console.log(form);

    e.target.reset();
  };

  return (
    <BasicLayout meta={meta}>
      <div className="layout">
        <h3 className="mb-6 font-bold">Predict your next month bond price</h3>
        <form onSubmit={handleSubmit} className="grid w-full grid-cols-2 gap-4">
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              Rating
            </h4>
            <select
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
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
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              Maturity Date
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="date"
              name="maturity_date"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              Coupon Rate
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="coupon_rate"
              step=".0001"
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
              name="accrued_interest"
              step=".01"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              Frequency of Interest
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="frequency_of_interest"
              step=".01"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              Current Price
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="current_price"
              step=".0001"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              Yield-To-Maturity
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="number"
              name="yield_to_maturity"
              step=".01"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              Maturity
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              type="date"
              name="maturity"
              onChange={handleChange}
            />
          </div>
          <div className="mb-10">
            <h4 className="font-bold text-gray-600 dark:text-gray-300">
              Duration
            </h4>
            <input
              className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
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
            className="w-full px-4 py-2 border rounded-md dark:border-gray-700"
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
