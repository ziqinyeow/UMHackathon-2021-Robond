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
    bond_price: 20,
    bond_return: 0.56,
    volatility: 0.0067,
  },
  {
    type: "Fixed Bond",
    code: "MYBMH1700051",
    bond_price: 20,
    bond_return: 0.56,
    volatility: 0.0067,
  },
  {
    type: "Fixed Bond",
    code: "MYBMH1700051",
    bond_price: 20,
    bond_return: 0.56,
    volatility: 0.0067,
  },
  {
    type: "Fixed Bond",
    code: "MYBMH1700051",
    bond_price: 20,
    bond_return: 0.56,
    volatility: 0.0067,
  },
  {
    type: "Fixed Bond",
    code: "MYBMH1700051",
    bond_price: 20,
    bond_return: 0.56,
    volatility: 0.0067,
  },
  {
    type: "Callable Bond",
    code: "MYBMH1700052",
    bond_price: 20,
    bond_return: 0.56,
    volatility: 0.0067,
  },
  {
    type: "Callable Bond",
    code: "MYBMH1700053",
    bond_price: 20,
    bond_return: 0.56,
    volatility: 0.0067,
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
        <h3 className="font-bold mb-6">Statistics</h3>
        <input
          className="w-full p-3 border mb-6 dark:border-gray-700 dark:bg-gray-900"
          type="text"
          placeholder="Search stock code or bond type"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <h4 className="py-3 grid grid-cols-6 w-full text-center">
          <h5 className="px-3">Rank</h5>
          <h5 className="px-3">Bond Type</h5>
          <h5 className="px-3">Stock Code</h5>
          <h5 className="px-3">Bond Price</h5>
          <h5 className="px-3">Bond Return</h5>
          <h5 className="px-3">Volatility</h5>
        </h4>

        {filterData.map((d, index) => (
          <Link key={d.code} href={`/analytics/${d.code}`}>
            <a className="py-3 grid grid-cols-6 w-full hover:bg-gray-100 dark:hover:bg-gray-700 text-center">
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
