import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-6">
      <div className="hero rounded-3xl border border-base-300 bg-base-100">
        <div className="hero-content w-full flex-col items-start gap-6 py-10 lg:flex-row lg:justify-between">
          {/* Left Text */}
          <div className="max-w-xl">
            <p className="mb-2 inline-flex rounded-full bg-[#05893E]/10 px-3 py-1 text-sm font-medium text-[#05893E]">
              বৃহস্পতিবার, ৮ অক্টোবর, ২০২৬
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="mt-3 text-sm text-[#1D271F]">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <button className="btn bg-[#05893E] text-white px-4 py-6 rounded-xl">
                সব পণ্য দেখুন
              </button>
            </div>
          </div>

          {/* Right Image */}
          <Image
            src={"/bazar-hero.png"}
            alt="hero"
            width={360}
            height={288}
            loading="eager"
            className="h-auto w-full max-w-xs shrink-0 sm:max-w-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
