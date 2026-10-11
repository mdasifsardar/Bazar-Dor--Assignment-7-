import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#FAFCFA] border-t border-[#E1E8E1] py-5 px-4 sm:px-8 mt-auto font-sans">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-gray-600 text-center sm:text-left">
        {/* Bam pasher lekha */}
        <p className="font-medium text-gray-800">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        {/* Dan pasher lekha */}
        <p className="text-gray-500">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
