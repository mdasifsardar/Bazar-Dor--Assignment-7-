import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-[#FAFCFA] px-4">
      <div className="max-w-lg text-center">
        <div className="text-8xl font-extrabold text-[#047F39]">404</div>

        <div className="mx-auto my-5 grid size-20 place-items-center rounded-2xl bg-[#F0F5F0] text-4xl">
          🛒
        </div>

        <h1 className="text-2xl font-bold text-[#1D271F]">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#1D271F]/70">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে অথবা ঠিকানাটি
          ভুল হয়েছে।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#047F39] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#03632D]"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
