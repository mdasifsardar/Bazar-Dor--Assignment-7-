import React from "react";

const DecreaseProduct = async () => {
  //
  // Product Data Fetch & Decrease Product Filter
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const data = await res.json();

  const filterProduct = data.filter((product) => product.change.dir === "down");

  const decreaseRate = [...filterProduct]
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="mt-10">
      {/* Increase Product */}
      <div className="mb-4 flex items-center gap-2 ">
        <h2 className="text-xl font-bold">
          <span className="text-green-500 mr-2">▼</span>
          আজ দাম কমেছে
        </h2>
      </div>

      {/* Decrease Product Map */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {decreaseRate.map((product) => (
          <div
            key={product.id}
            className="card border border-base-300 bg-[#FAFDFA] transition hover:border-[#008A40] hover:shadow-md  focus-visible:outline-[#008A40] cursor-pointer rounded-2xl"
          >
            <div className="card-body gap-3 p-4 ">
              {/* Product Heading Div*/}
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

              {/* Product Details Div*/}
              <div className="flex items-end justify-between gap-2">
                {/* Price */}
                <div>
                  <p className="text-xs text-[#1D271F]/60">আজকের দাম</p>
                  <p className="text-xl font-bold ">
                    {product.today.toLocaleString("bn-BD")}
                    <span className="text-sm font-medium ml-1">টাকা</span>
                  </p>
                </div>

                {/* Pct */}
                <span
                  className={`bg-[#F0F5F0] px-2 py-1 rounded-full text-xs font-semibold ${product.change.dir === "down" ? "text-green-500" : ""}`}
                >
                  {product.change.dir === "down" ? "▼" : ""}
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
    </div>
  );
};

export default DecreaseProduct;
