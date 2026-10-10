import Link from "next/link";
import React from "react";

const NavLinks = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );
  const navLinksData = await res.json();

  return (
    <section className="py-3 bg-[#FAFCFA] border-b border-[#E1E8E1]">
      <div className="flex gap-7 max-w-6xl mx-auto overflow-x-auto px-6 text-sm ">
        {navLinksData.map((nav) => (
          <Link href={`/category/${nav.id}`} key={nav.id} className="shrink-0">
            <h2 className="flex gap-1 whitespace-nowrap">
              <span className="w-[21px] ">{nav.icon}</span>
              {nav.nameBn}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NavLinks;
