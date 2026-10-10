"use client";

import { signOut, useSession } from "../../lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
  //
  const { data: session } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    const userSignOut = await signOut();
    return userSignOut;
  };

  return (
    <div className="absolute right-4 top-4  text-sm font-medium">
      {user ? (
        <div className="flex items-center gap-3">
          <Link
            href="/profile"
            className="font-semibold text-gray-800 hover:text-[#047F39] transition-colors"
          >
            {user?.name}
          </Link>
          <button
            onClick={handleSignOut}
            className="btn btn-error btn-xs text-white"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {/* Sign In Link */}
          <Link
            href="/sign-in"
            className="text-gray-900 font-bold hover:bg-gray-200 transition-colors duration-200 px-4 py-2 rounded-[10px]"
          >
            সাইন ইন
          </Link>

          {/* Sign Up Button */}
          <Link
            href="/sign-up"
            className="bg-[#05893E] hover:bg-[#057234] border border-[#047F39] text-white font-medium px-4 py-2 rounded-[10px] shadow-md hover:shadow-lg transition-all duration-200 inline-block"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
