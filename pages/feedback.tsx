import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import BasicLayout from "@/layouts/BasicLayout";

const meta = {
  title: "Robond - Feedback",
  description: "Give your valuable feedback to us!",
  image: "https://robond.vercel.app/static/Home.jpg",
};

const Feedback: NextPage = () => {
  const router = useRouter();

  const [inputValue, setInputValue] = useState({
    name: "",
    feedback: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    // @ts-ignore
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    window.localStorage.setItem(
      "3638da96-aea7-4d16-ab8f-0ea9309f78ce",
      inputValue.name
    );
    router.push("/");
  };

  return (
    <BasicLayout meta={meta}>
      <div className="layout">
        <h3 className="mb-6 font-bold">Feedback</h3>
        <div className="w-full h-80">
          <form onSubmit={handleSubmit}>
            <div className="mb-10">
              <h4 className="font-bold text-gray-600 dark:text-gray-300">
                Name
              </h4>
              <input
                type="text"
                onChange={handleChange}
                name="name"
                className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              />
            </div>
            <div className="mb-10">
              <h4 className="font-bold text-gray-600 dark:text-gray-300">
                Feedback
              </h4>
              <textarea
                onChange={handleChange}
                name="feedback"
                className="w-full p-3 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900"
              />
            </div>
            <button className="px-4 py-2 border" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Feedback;
