import Image from "next/image";
import Hero from "./components/Hero";
import ProductHome from "./components/ProductHome";

export default function Home() {
  return (
    <div>
      <Hero />
      <ProductHome />
    </div>
  );
}
