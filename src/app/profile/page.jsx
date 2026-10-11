"use client";

import { useSession, signOut, updateUser } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { PiArrowBendDownLeft } from "react-icons/pi";

const ProfilePage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  //
  const handleSignOut = async () => {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে!");
    router.push("/");
  };

  //
  const handleUpdateName = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newName = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await updateUser({
        ...newName,
      });

      if (error) {
        toast.error("নাম হালনাগাদ করতে সমস্যা হয়েছে!");
        return;
      }

      if (data) {
        toast.success("নাম সফলভাবে হালনাগাদ করা হয়েছে!");
      }
    } catch (err) {
      toast.error("কোথাও কোনো সমস্যা হয়েছে!");
    }
  };

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/*  */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/*  */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#047F39] text-white flex items-center justify-center font-bold text-lg shadow-md">
            {userInitial}
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-800">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="border border-red-500 text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 cursor-pointer"
        >
          <PiArrowBendDownLeft size={17} /> সাইন আউট
        </button>
      </div>

      {/*  */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-base text-gray-800 mb-4">
          নাম হালনাগাদ করুন
        </h3>

        <form onSubmit={handleUpdateName} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              নাম
            </label>
            <input
              name="name"
              defaultValue={user?.name || ""}
              type="text"
              placeholder={"আপনার নাম লিখুন"}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#047F39]/50 focus:border-[#047F39] text-sm text-gray-800"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#047F39] hover:bg-[#03662e] text-white font-medium px-5 py-2.5 rounded-xl shadow-md transition-all text-sm cursor-pointer"
          >
            নাম হালনাগাদ করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
