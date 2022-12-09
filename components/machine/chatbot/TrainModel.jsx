import React, { useState } from "react";
import Head from "next/head";

const TrainModel = () => {
  const steps = ["Customer Info", "Shipping Info", "Payment"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  return (
    <div className="py-5 flex flex-col justify-center items-center my-auto">
      <Head>
        <title>Chatbot | Train Model</title>
        <meta
          name="description"
          content="Machine Hunt provides different programming languages to build your model. build your model with your preferred language."
        />
      </Head>
      <div className="flex justify-center items-start gap-16 border-2 p-10">
        <div>
          <div className="flex flex-col items-center justify-center bg-gray-700 border-gray-500 min-w-[16rem] h-[5rem] rounded-lg">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            {/* <input id="dropzone-file" type="file" className="hidden" /> */}
          </div>
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              JSON Format (MAX. 1MB)
            </p>
          </div>
        </div>
        <div>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center bg-gray-700 border-gray-500 min-w-[16rem] h-[5rem] rounded-lg"
          >
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Training is in the process</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Do not reload the page or back button
            </p>
          </div>
        </div>
        <div>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center bg-gray-700 border-gray-500 min-w-[16rem] h-[5rem] rounded-lg"
          >
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Training is Completed</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Download the zip folder
            </p>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-between flex-col">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>
      {!complete && (
        <button
          className="btn"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      )} */}
    </div>
  );
};

export default TrainModel;
