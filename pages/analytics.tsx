import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import BasicLayout from "@/layouts/BasicLayout";

const meta = {
  type: "",
  title: "Analytics",
  description: "",
  image: "",
};

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

const Analytics: NextPage = () => {
  const [searchValue, setSearchValue] = useState("");

  const filterData = data.filter(
    (d) =>
      d.type.toLowerCase().includes(searchValue.toLowerCase()) ||
      d.code.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <BasicLayout meta={meta}>
      <div className="layout">
        <h3 className="mb-6 font-bold">Statistics</h3>
        <input
          className="w-full p-3 mb-6 border dark:border-gray-700 dark:bg-gray-900"
          type="text"
          placeholder="Search stock code or bond type"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="grid w-full grid-cols-6 py-3 text-center">
          <h4 className="px-3">Rank</h4>
          <h4 className="px-3">Bond Type</h4>
          <h4 className="px-3">Stock Code</h4>
          <h4 className="px-3">Bond Price</h4>
          <h4 className="px-3">Bond Return</h4>
          <h4 className="px-3">Volatility</h4>
        </div>

        {filterData.map((d, index) => (
          <Link key={d.code} href={`/analytics/${d.code}`}>
            <a className="grid w-full grid-cols-6 py-3 text-center hover:bg-gray-100 dark:hover:bg-gray-700">
              <h5 className="px-3 overflow-hidden">{index + 1}</h5>
              <h5 className="px-3 overflow-hidden">{d.type}</h5>
              <h5 className="px-3 overflow-hidden">{d.code}</h5>
              <h5 className="px-3 overflow-hidden">{d.bond_price}</h5>
              <h5 className="px-3 overflow-hidden">{d.bond_return}</h5>
              <h5 className="px-3 overflow-hidden">{d.volatility}</h5>
            </a>
          </Link>
        ))}
      </div>
    </BasicLayout>
  );
};

export default Analytics;
