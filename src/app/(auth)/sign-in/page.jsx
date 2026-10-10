"use client";

import { signIn } from "../../../lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await signIn.email({
        ...user,
        callbackURL: "/",
      });

      if (error) {
        toast.error("এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট খোলা নেই!");
        return;
      }
      if (data) {
        toast.success("সফলভাবে সাইন ইন হয়েছে!");
      }
    } catch (error) {
      toast.error("কোথাও কোনো সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    }
  };

  // Social Login Handle
  const handleGoogle = async () => {
    try {
      const userGoogleLogin = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      if (userGoogleLogin?.error) {
        toast.error("গুগল দিয়ে সাইন ইন করতে সমস্যা হয়েছে!");
        return;
      }
    } catch (error) {
      toast.error("কোথাও কোনো সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 px-4">
      {/* Sign In Heading */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">সাইন ইন</h1>
        <p className="text-sm text-gray-500 mt-1">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="card border border-base-300 bg-base-100 shadow-sm rounded-2xl">
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <fieldset className="fieldset p-2 flex flex-col gap-3">
              <label className="label text-gray-700 font-medium">ইমেইল</label>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full rounded-xl"
                placeholder="you@example.com"
              />

              <label className="label text-gray-700 font-medium">
                পাসওয়ার্ড
              </label>
              <input
                name="password"
                type="password"
                className="input input-bordered w-full rounded-xl"
                placeholder="কমপক্ষে ৮ অক্ষর"
              />

              {/* Create Accout Button */}
              <button className="btn bg-[#047F39] hover:bg-[#057234] text-white mt-4 w-full border-none rounded-[10px]">
                সাইন ইন
              </button>
            </fieldset>
          </form>

          {/* Divider */}
          <div className="divider text-xs text-gray-400 my-2">অথবা</div>

          {/* Social Log-In */}
          <div className="flex gap-2">
            <button
              onClick={handleGoogle}
              className="btn btn-outline flex-1 text-xs font-normal rounded-xl"
            >
              <FcGoogle size={18} />
              Google দিয়ে চালিয়ে যান
            </button>
            <button className="btn btn-outline flex-1 text-xs font-normal rounded-xl">
              <FaGithub size={18} />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          {/* Sign Up Page Button */}
          <p className="text-center text-sm mt-4 text-gray-600">
            অ্যাকাউন্ট নেই?
            <Link
              href="/sign-up"
              className="text-[#047857] font-medium hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>
      </div>

      {/* Home Page Return Button */}
      <div className="text-center mt-4">
        <Link href="/" className="text-sm text-gray-500 hover:underline">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
