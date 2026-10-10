"use client";

import { useRouter } from "next/navigation";
import { signIn, signUp } from "../../../lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  // Redirect Router
  const router = useRouter();

  // Sign Up Onsubmit
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    // Confirm Password
    if (user.password !== user.confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না! আবার চেষ্টা করুন।");
      return;
    }

    // Email Sign Up
    try {
      const { data, error } = await signUp.email({
        ...user,
        callbackURL: "/",
      });

      if (error) {
        toast.error("এই ইমেইল একটি অ্যাকাউন্ট রয়েছে!");
        return;
      }
      if (data) {
        toast.success("সফলভাবে একাউন্ট তৈরি হয়েছে!");
        router.push("/");
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
      });
      if (userGoogleLogin?.error) {
        toast.error("গুগল দিয়ে সাইন ইন করতে সমস্যা হয়েছে!");
        return;
      }
    } catch (error) {
      toast.error("কোথাও কোনো সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    }
  };

  const handleGithub = async () => {
    try {
      const userGithubLogin = await signIn.social({
        provider: "github",
      });
      if (userGithubLogin?.error) {
        toast.error("গিটহাব দিয়ে সাইন ইন করতে সমস্যা হয়েছে!");
        return;
      }
    } catch (error) {
      toast.error("কোথাও কোনো সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">
      {/* Sign Up Heading */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-1 text-sm text-[#1D271F]/70">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Sign Up Card */}
      <div className="max-w-md mx-auto my-10">
        <div className="card border border-base-300 bg-base-100 shadow-sm rounded-2xl">
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <fieldset className="fieldset p-2 flex flex-col gap-3">
                <label className="label text-gray-700 font-medium">নাম</label>
                <input
                  name="name"
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="যেমন: রহিম উদ্দিন"
                />

                <label className="label text-gray-700 font-medium">ইমেইল</label>
                <input
                  name="email"
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="you@example.com"
                />

                <label className="label text-gray-700 font-medium">
                  পাসওয়ার্ড
                </label>
                <input
                  name="password"
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                />

                <label className="label text-gray-700 font-medium">
                  পাসওয়ার্ড নিশ্চিত করুন
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="আবার লিখুন"
                />

                {/* Create Accout Button */}
                <button className="btn bg-[#047F39] hover:bg-[#057234] text-white mt-4 w-full border-none  rounded-[10px]">
                  অ্যাকাউন্ট তৈরি করুন
                </button>
              </fieldset>
            </form>

            {/* Divider */}
            <div className="divider text-xs text-gray-400 my-2">অথবা</div>

            {/* Social Log-In */}
            <div className="flex gap-2">
              <button
                onClick={handleGoogle}
                className="btn btn-outline flex-1 text-xs font-normal rounded-[10px]"
              >
                <FcGoogle size={18} />
                Google দিয়ে চালিয়ে যান
              </button>
              <button
                onClick={handleGithub}
                className="btn btn-outline flex-1 text-xs font-normal rounded-[10px]"
              >
                <FaGithub size={18} />
                GitHub দিয়ে চালিয়ে যান
              </button>
            </div>

            {/* Sign In Page Button */}
            <p className="text-center text-sm mt-4 text-gray-600">
              অ্যাকাউন্ট আছে?{" "}
              <Link
                href="/sign-in"
                className="text-[#047857] font-medium hover:underline"
              >
                সাইন ইন করুন
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
    </section>
  );
};

export default SignUp;
