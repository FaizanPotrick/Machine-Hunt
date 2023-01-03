import React, { useState, useEffect } from "react";
import axios from "axios";
import Prism from "prismjs";
import "../styles/snippet.module.css";

const FileSnippet = ({ file }) => {
  const [code, setCode] = useState("Loading...");
  const [fileName] = useState(() => {
    return file.split("/").pop();
  });
  const [isCopy, setIsCopy] = useState(false);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const { data } = await axios.post("/api/file", { file });
        setCode(data);
      } catch (err) {
        setCode(err.response.data);
      }
    };
    fetchCode();
  }, []);

  return (
    <div className="my-2 bg-[#0E1915]/[0.92] w-full max-w-7xl rounded-lg text-white overflow-hidden shadow-md">
      <div className="flex justify-between items-center p-2.5 pl-5 bg-[#0F1B17]/90 shadow-md sm:text-lg">
        <div className="font-semibold">{fileName}</div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code);
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
      <pre className="py-2 px-5 overflow-y-auto text-sm sm:text-base lg:text-[17px]">
        <code
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(code, Prism.languages.js, "js"),
          }}
        />
      </pre>
    </div>
  );
};

export default FileSnippet;
