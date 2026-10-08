import Image from "next/image";
import React from "react";
import NavLinks from "./NavLinks";

const Header = () => {
  const currentDate = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className=" bg-[#FAFCFA]">
      <div className="flex flex-col gap-1 max-w-6xl mx-auto w-full  px-4 py-4">
        {/* Logo & Text */}
        <div className="flex gap-2 items-center">
          <div className="bg-[#05893E] size-11 flex items-center justify-center rounded-lg">
            <Image
              src={"/logo-icon.png"}
              alt="header-logo"
              width={20}
              height={20}
              priority
            />
          </div>

          <div>
            <h2 className="block text-xl font-bold ">বাজার দর</h2>
            <span className="block text-xs text-base-content/60">
              {currentDate}
            </span>
          </div>
        </div>
      </div>

      {/* Border */}
      <div className="border border-[#F0F5F0]" />

      <NavLinks />
    </header>
  );
};

export default Header;
