"use client";

import Link from "next/link";
import { useState } from "react";

const SortSelect = ({ data }) => {
  const [sort, setSort] = useState("default");

  const sorted = [...data];

  if (sort === "low-to-high") {
    sorted.sort((a, b) => a.today - b.today);
  } else if (sort === "high-to-low") {
    sorted.sort((a, b) => b.today - a.today);
  }

  const translateUnit = (unit) => {
    const units = {
      kg: "কেজি",
      gram: "গ্রাম",
      litre: "লিটার",
      piece: "পিস",
      dozen: "ডজন",
    };

    return units[unit] || unit;
  };

  return (
    <>
      {/* Sort Dropdown */}
      <div className="bg-[#FAFCFA] rounded-2xl border border-[#E1E8E1] p-5 my-4 flex items-center justify-end gap-3">
        <span className="text-sm font-medium text-gray-700">সাজান</span>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-white border border-[#E1E8E1] rounded-xl px-2 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:border-[#047F39] cursor-pointer shadow-sm"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low-to-high">কম দাম থেকে বেশি</option>
          <option value="high-to-low">বেশি দাম থেকে কম</option>
        </select>
      </div>

      {/* Product Count */}
      <div className="my-4">
        <p className="text-sm text-[#1D271F]/70">
          মোট {sorted.length.toLocaleString("bn-BD")}
          <span> টি পণ্য দেখানো হচ্ছে</span>
        </p>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((product) => (
          <Link
            href={`/product-details/${product.id}`}
            key={product.id}
            className="card border border-base-300 bg-[#FAFDFA] transition hover:border-[#008A40] hover:shadow-md focus-visible:outline-[#008A40] cursor-pointer rounded-2xl"
          >
            <div className="card-body gap-3 p-4">
              {/* Product Heading */}
              <div className="flex items-start gap-3">
                <div>
                  <p className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#F0F5F0] text-2xl">
                    {product.image}
                  </p>
                </div>

                <div>
                  <h3 className="truncate text-base font-semibold">
                    {product.nameBn}
                  </h3>

                  <p className="text-xs text-[#1D271F]/60 mt-0.5">
                    প্রতি {translateUnit(product.unit)}
                  </p>
                </div>
              </div>

              {/* Product Details */}
              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="text-xs text-[#1D271F]/60">আজকের দাম</p>

                  <p className="text-xl font-bold">
                    {product.today.toLocaleString("bn-BD")}
                    <span className="text-sm font-medium ml-1">টাকা</span>
                  </p>
                </div>

                {/* Change Badge */}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    product.change.pct === 0
                      ? "text-[#1D271F] bg-[#F0F5F0]"
                      : product.change.dir === "up"
                        ? "bg-[#FEE2E2] text-red-600"
                        : "bg-[#DCFCE7] text-green-600"
                  }`}
                >
                  {product.change.pct === 0
                    ? "-"
                    : product.change.dir === "up"
                      ? "▲"
                      : "▼"}

                  <span className="ml-1">
                    {Math.abs(product.change.pct).toLocaleString("bn-BD", {
                      minimumFractionDigits: 1,
                    })}
                    %
                  </span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SortSelect;
