import React, { useState } from "react";

const CmdSnippet = ({ command }) => {
  const [isCopy, setIsCopy] = useState(false);

  return (
    <div className="my-1 bg-[#0F1B17]/90 w-full max-w-7xl rounded-lg text-white overflow-y-auto flex justify-between items-center py-2.5 px-5 shadow-md text-sm sm:text-base lg:text-[17px]">
      <pre>
        <code>{command}</code>
      </pre>
      <button
        onClick={() => {
          navigator.clipboard.writeText(command);
          setIsCopy(true);
          setTimeout(() => {
            setIsCopy(false);
          }, 3000);
        }}
        disabled={isCopy}
        className={`${
          isCopy && "text-[#c5c8c6]/80"
        } flex justify-center items-center duration-300 hover:text-[#c5c8c6]/80`}
      >
        {!isCopy ? (
          <svg
            className="h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        ) : (
          <span>copied!</span>
        )}
      </button>
    </div>
  );
};

export default CmdSnippet;
