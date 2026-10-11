import Link from "next/link";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const ProductDetails = async ({ params }) => {
  const { slug } = await params;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${slug}`,
  );
  const data = await res.json();

  //
  const minPrice = Math.min(...data.markets.map((m) => m.min));
  const maxPrice = Math.max(...data.markets.map((m) => m.max));

  //
  const minMarketObj = data.markets.find((m) => m.min === minPrice);
  const maxMarketObj = data.markets.find((m) => m.max === maxPrice);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 font-sans">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#047F39]">
          হোম
        </Link>

        <span>›</span>
        <span className="text-gray-800 font-medium">{data.nameBn}</span>
      </div>

      {/* Top Banner Card */}
      <div className="bg-[#FAFCFA] border border-[#E1E8E1] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#F0F5F0] flex items-center justify-center text-3xl shadow-inner">
            {data.image}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{data.nameBn}</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              প্রতি{" "}
              {data.unit === "kg"
                ? "কেজি"
                : data.unit === "litre"
                  ? "লিটার"
                  : "কেজি"}{" "}
              • {data.categoryNameBn}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              গতকালের তুলনায় আজ দাম{" "}
              {data.change.dir === "up"
                ? "বেড়েছে"
                : data.change.dir === "down"
                  ? "কমেছে"
                  : "অপরিবর্তিত"}{" "}
              - {Math.abs(data.change.pct)} টাকা
            </p>
          </div>
        </div>

        {/* Price Badge */}
        <div className="bg-white border border-[#E1E8E1] rounded-xl px-6 py-4 text-center min-w-[160px] shadow-sm">
          <span className="text-xs text-gray-500 block mb-1">আজকের দাম</span>
          <div className="text-3xl font-extrabold text-gray-900 flex items-center justify-center gap-1">
            {data.today.toLocaleString("bn-BD")}
          </div>
          <span className="text-xs text-gray-500 block mt-0.5">
            টাকা /
            {data.unit === "kg"
              ? "কেজি"
              : data.unit === "litre"
                ? "লিটার"
                : data.unit === "piece"
                  ? "পিস"
                  : data.unit === "dozen"
                    ? "ডজন"
                    : data.unit}
          </span>
          {/* All Product */}
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              data.change.pct === 0
                ? "text-[#1D271F] bg-[#F0F5F0]"
                : data.change.dir === "up"
                  ? "bg-[#FEE2E2] text-red-600"
                  : "bg-[#DCFCE7] text-green-600"
            }`}
          >
            {data.change.pct === 0 ? "-" : data.change.dir === "up" ? "▲" : "▼"}
            <span className="ml-1">
              {Math.abs(data.change.pct).toLocaleString("bn-BD", {
                minimumFractionDigits: 1,
              })}
              %
            </span>
          </span>
        </div>
      </div>

      {/* Price Summary Cards */}
      <div className="bg-[#FAFCFA] border border-[#E1E8E1] rounded-2xl p-6 shadow-sm mb-8">
        <h2 className="font-bold text-lg text-gray-900 mb-4">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Min Price Card */}
          <div className="border border-[#E1E8E1] rounded-xl p-4 bg-white shadow-sm">
            <span className="text-xs text-gray-500">সর্বনিম্ন দাম</span>
            <div className="text-2xl font-bold text-[#047F39] my-1">
              {minPrice.toLocaleString("bn-BD")} টাকা
            </div>
            <span className="text-xs text-gray-400">
              সবচেয়ে কম দামের বাজার ({minMarketObj?.market})
            </span>
          </div>

          {/* Max Price Card */}
          <div className="border border-[#E1E8E1] rounded-xl p-4 bg-white shadow-sm">
            <span className="text-xs text-gray-500">সর্বাধিক দাম</span>
            <div className="text-2xl font-bold text-red-600 my-1">
              {maxPrice.toLocaleString("bn-BD")} টাকা
            </div>
            <span className="text-xs text-gray-400">
              সবচেয়ে বেশি দামের বাজার ({maxMarketObj?.market})
            </span>
          </div>

          {/* Today / Avg Price Card */}
          <div className="border border-[#E1E8E1] rounded-xl p-4 bg-white shadow-sm">
            <span className="text-xs text-gray-500">গড় দাম</span>
            <div className="text-2xl font-bold text-gray-800 my-1">
              {data.today.toLocaleString("bn-BD")} টাকা
            </div>
            <span className="text-xs text-gray-400">প্রতি কেজি-এর হিসাব</span>
          </div>
        </div>
      </div>

      {/* Markets Table */}
      <div className="bg-[#FAFCFA] border border-[#E1E8E1] rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-lg text-gray-900 mb-6">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E1E8E1] text-sm text-gray-500">
                <th className="pb-3 font-medium">বাজার</th>
                <th className="pb-3 font-medium">বিভাগ</th>
                <th className="pb-3 font-medium">সর্বনিম্ন</th>
                <th className="pb-3 font-medium">সর্বাধিক</th>
                <th className="pb-3 font-medium">গড়</th>
              </tr>
            </thead>
            {/* টেবিলের সারিগুলোর বর্ডার কালার #E1E8E1 করে দেওয়া হলো */}
            <tbody className="divide-y divide-[#E1E8E1] text-sm text-gray-800">
              {data.markets.map((item, index) => {
                // প্রতিটি বাজারের জন্য min ও max এর গড় হিসাব করা
                const avgMarketPrice = ((item.min + item.max) / 2).toFixed(1);

                return (
                  <tr
                    key={index}
                    className="hover:bg-white/80 transition-colors"
                  >
                    <td className="py-3.5 font-medium">{item.market}</td>
                    <td className="py-3.5 text-gray-500">{item.division}</td>
                    <td className="py-3.5">
                      {item.min.toLocaleString("bn-BD")} টাকা
                    </td>
                    <td className="py-3.5">
                      {item.max.toLocaleString("bn-BD")} টাকা
                    </td>
                    <td className="py-3.5 font-semibold">
                      {Number(avgMarketPrice).toLocaleString("bn-BD")} টাকা
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
