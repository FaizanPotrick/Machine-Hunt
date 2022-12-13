import React, { useContext } from "react";
import { StateContext } from "../context/StateContext";

const Alert = () => {
  const { alert, setAlert } = useContext(StateContext);

  return (
    <>
      {alert.isAlert && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-[9999] p-4 flex justify-center items-center bg-white/90">
          <div className="bg-white w-full max-w-xs sm:max-w-sm">
            <div className="relative py-4 shadow-inner rounded-xl border-2 border-[#0e8f66]/10 bg-[#0e8f66]/[0.15] flex flex-col justify-center items-center w-full">
              <button
                className="absolute top-3 right-3 text-[#00553a]/70 hover:text-[#00553a]/50"
                onClick={() => {
                  setAlert({
                    isAlert: false,
                    message: "",
                    type: "",
                  });
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                </svg>
              </button>
              <svg
                className="w-12 sm:w-14 h-12 sm:h-14 text-[#00553a]/30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mt-5 sm:text-xl font-medium text-[#00553a] text-center">
                {alert.message}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
