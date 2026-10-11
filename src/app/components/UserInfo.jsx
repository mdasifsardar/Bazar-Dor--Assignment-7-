"use client";

import { signOut, useSession } from "../../lib/auth-client";
import Link from "next/link";
import { ImUser } from "react-icons/im";
import { PiArrowBendDownLeft } from "react-icons/pi";

const UserInfo = () => {
  //
  const { data: session } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
  };

  //
  const userFastLetter = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="absolute right-4 top-4  text-sm font-medium">
      {user ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {/* Sobuj Circle Avatar */}
            <div className="w-9 h-9 rounded-full bg-[#05893E] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              {userFastLetter}
            </div>
            <span className="font-semibold text-gray-800">{user?.name}</span>
            <span className="text-xs text-gray-500">▾</span>
          </div>

          {/* Dropdown Menu Box */}
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-white rounded-2xl z-[50] w-64 p-3 shadow-xl border border-gray-100 mt-2"
          >
            {/* User Info Header */}
            <div className="px-3 py-2 border-b border-gray-100 mb-1">
              <p className="font-bold text-gray-800 text-sm">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>

            {/* Profile Link */}
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-2 py-2.5 font-medium text-gray-700 hover:bg-gray-100 rounded-xl "
              >
                <ImUser size={17} />
                আমার প্রোফাইল
              </Link>
            </li>

            {/* Sign Out Button */}
            <li>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 py-2.5 font-medium text-red-600 hover:bg-red-50 rounded-xl w-full text-left "
              >
                <PiArrowBendDownLeft size={17} /> সাইন আউট
              </button>
            </li>
          </ul>
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
