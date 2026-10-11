import SortSelect from "../../components/SortSelect";
import { notFound } from "next/navigation";

const ProductCategory = async ({ params }) => {
  const { slug } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`,
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  if (!data || data.length === 0) {
    notFound();
  }

  return (
    <section className="mt-6 max-w-6xl mx-auto px-4">
      {/* Heading */}
      <div className="rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-5 flex items-center gap-2">
        <p className="text-4xl">{data[0]?.categoryIcon}</p>

        <div>
          <h1 className="text-2xl font-bold">{data[0]?.categoryNameBn}</h1>

          <p className="text-sm text-[#1D271F]/70">
            {data.length.toLocaleString("bn-BD")}
            <span> টি পণ্যের আজকের দাম ও পরিবর্তন</span>
          </p>
        </div>
      </div>

      {/* Client Component */}
      <SortSelect data={data} />
    </section>
  );
};

export default ProductCategory;
