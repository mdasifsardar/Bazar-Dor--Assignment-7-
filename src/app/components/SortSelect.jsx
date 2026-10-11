"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const SortSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Direct URL theke current sort value niye neya holo (No useState / useEffect)
  const currentSort = searchParams.get("sort") || "default";

  const handleSortChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "default") {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      value={currentSort}
      onChange={handleSortChange}
      className="bg-white border border-[#E1E8E1] rounded-xl px-2 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:border-[#047F39] cursor-pointer shadow-sm transition-all"
    >
      <option value="default">ডিফল্ট</option>
      <option value="low-to-high">কম দাম থেকে বেশি</option>
      <option value="high-to-low">বেশি দাম থেকে কম</option>
    </select>
  );
};

export default SortSelect;
