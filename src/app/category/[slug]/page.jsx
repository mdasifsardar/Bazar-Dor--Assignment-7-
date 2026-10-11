import SortSelect from "../../components/SortSelect";
import React from "react";

const ProductCategory = async ({ params, searchParams }) => {
  //
  const { slug } = await params;
  const { sort } = await searchParams;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`,
  );
  const data = await res.json();

  //
  const sorted = [...data].sort((a, b) => {
    if (sort === "low-to-high") {
      return a.today - b.today;
    }
    if (sort === "high-to-low") {
      return b.today - a.today;
    }
    return 0;
  });

  return (
    <section className="mt-6 max-w-6xl mx-auto">
      {/* Heading */}
      <div className="rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] not-visited:not-only-of-type:p-5 flex items-center gap-2">
        <p className="text-4xl">{data[0]?.categoryIcon}</p>
        <div>
          <h1 className="text-2xl font-bold">{data[0]?.categoryNameBn}</h1>
          <p className="text-sm text-[#1D271F]/70">
            {data.length.toLocaleString("bn-BD")}
            <span>টি পণ্যের আজকের দাম ও পরিবর্তন</span>
          </p>
        </div>
      </div>

      {/*  */}
      <div className="bg-[#FAFCFA] rounded-2xl border border-[#E1E8E1] p-5 my-4 flex items-center justify-end gap-3">
        {/* সাজান ড্রপডাউন অংশ */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">সাজান</span>

          <div className="relative">
            <SortSelect />
          </div>
        </div>
      </div>

      {/* Product Length */}
      <div className="my-4">
        <p className="text-sm text-[#1D271F]/70">
          মোট {data.length.toLocaleString("bn-BD")}
          <span>টি পণ্য দেখানো হচ্ছে</span>
        </p>
      </div>

      {/* Product Map*/}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((product) => (
          <div
            key={product.id}
            className="card border border-base-300 bg-[#FAFDFA] transition hover:border-[#008A40] hover:shadow-md  focus-visible:outline-[#008A40] cursor-pointer rounded-2xl"
          >
            <div className="card-body gap-3 p-4 ">
              {/* Product Heading */}
              <div className="flex items-start gap-3">
                {/* Image  */}
                <div>
                  <p className=" grid size-12 shrink-0 place-items-center rounded-xl bg-[#F0F5F0] text-2xl">
                    {product.image}
                  </p>
                </div>

                {/* Text */}
                <div>
                  <h3 className="truncate text-base font-semibold">
                    {product.nameBn}
                  </h3>
                  <p className="text-xs text-[#1D271F]/60 mt-0.5">
                    <span> প্রতি </span>
                    {product.unit === "kg"
                      ? "কেজি"
                      : product.unit === "litre"
                        ? "লিটার"
                        : product.unit === "piece"
                          ? "পিস"
                          : product.unit === "dozen"
                            ? "ডজন"
                            : product.unit}
                  </p>
                </div>
              </div>

              {/* Product Details */}
              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="text-xs text-[#1D271F]/60">আজকের দাম</p>
                  <p className="text-xl font-bold ">
                    {product.today.toLocaleString("bn-BD")}
                    <span className="text-sm font-medium ml-1">টাকা</span>
                  </p>
                </div>

                {/* All Product */}
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCategory;
