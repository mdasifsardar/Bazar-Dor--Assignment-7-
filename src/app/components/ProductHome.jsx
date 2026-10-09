import React from "react";
import IncreaseProduct from "./product/IncreaseProduct";
import DecreaseProduct from "./product/DecreaseProduct";
import AllProduct from "./product/AllProduct";

const ProductHome = async () => {
  return (
    <section className="mx-auto my-[40px] w-full max-w-6xl px-4">
      {/* Increase Product */}
      <IncreaseProduct />

      {/* Decrease Product */}
      <DecreaseProduct />

      {/* All Product */}
      <AllProduct />
    </section>
  );
};

export default ProductHome;
