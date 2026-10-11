import Image from "next/image";
import Hero from "./components/Hero";
import ProductHome from "./components/ProductHome";
import PriceMarquee from "./components/Marquee";

export default function Home() {
  return (
    <div>
      <PriceMarquee />
      <Hero />
      <ProductHome />
    </div>
  );
}
