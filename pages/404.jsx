import React from "react";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="py-5 flex flex-col justify-center items-center my-auto w-full">
      <div className="mb-5 sm:mb-8 font-extrabold text-7xl sm:text-9xl text-[#00553a]/70">
        404
      </div>
      <div className="text-lg sm:text-3xl text-center text-gray-800">
        Sorry, we couldn&apos;t find this page.
      </div>
      <div className="mt-2 text-sm sm:text-base mb-5 sm:mb-8 text-[#00553a]/80 text-center">
        But don&apos;t worry, you can find plenty of other things on our
        homepage.
      </div>
      <Link
        href="/"
        className="border-2 border-[#0e8f66]/20 shadow-lg hover:scale-95 duration-500 rounded-xl bg-[#0e8f66]/[0.15] flex flex-shrink-0 items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 text-gray-800 font-medium text-sm sm:text-base"
      >
        <svg
          className="h-4 sm:h-5 w-4 sm:w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to home page</span>
      </Link>
    </div>
  );
};

export default PageNotFound;
