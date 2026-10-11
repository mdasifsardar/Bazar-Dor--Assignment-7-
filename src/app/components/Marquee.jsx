import React from "react";
import Marquee from "react-fast-marquee";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const PriceMarquee = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const products = await res.json();

  const getUnitName = (unit) => {
    switch (unit) {
      case "kg":
        return "কেজি";
      case "litre":
        return "লিটার";
      case "piece":
        return "পিস";
      case "dozen":
        return "ডজন";
      default:
        return unit;
    }
  };

  return (
    <div className="bg-[#FAFCFA] overflow-hidden">
      <Marquee gradient={false} speed={150} pauseOnHover={true}>
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="flex items-center border border-[#E1E8E1]/60 px-5 gap-1 py-2"
            >
              <span className="text-base">{product.image}</span>
              <span className="font-medium text-sm text-[#1D271F]">
                {product.nameBn}
              </span>

              <span className="font-bold text-sm text-[#1D271F]">
                {product.today.toLocaleString("bn-BD")} টাকা/
                {getUnitName(product.unit)}
              </span>

              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  product.change.pct === 0
                    ? "text-[#1D271F] bg-[#F0F5F0]"
                    : product.change.dir === "up"
                      ? "text-red-600"
                      : " text-green-600"
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
          );
        })}
      </Marquee>
    </div>
  );
};

export default PriceMarquee;
