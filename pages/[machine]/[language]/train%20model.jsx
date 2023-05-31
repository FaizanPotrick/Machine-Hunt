import React, { useState, useContext } from "react";
import Head from "next/head";
import chatbot_train_model from "../../../machine/chatbot/react/create_model";
import recommendation_system_train_model from "../../../machine/recommendation system/react/create_model";
import sentiment_analysis_train_model from "../../../machine/sentiment analysis/react/create_model";
import { StateContext } from "../../../context/StateContext";
import { useRouter } from "next/router";
import PageNotFound from "../../404";

const Training = () => {
  const { setLoading, setAlert, Machines } = useContext(StateContext);
  const { machine, language } = useRouter().query;

  const [isProcessing, setIsProcessing] = useState(false);

  const PageData = {
    chatbot: {
      train_model: chatbot_train_model,
      file_format: `{\n\ttag: "...",\n\tpatterns: [...],\n}`,
    },
    "recommendation system": {
      train_model: recommendation_system_train_model,
      file_format: `{\n\ttitle: "...",\n\tgenres: [...],\n\tkeywords: [...],\n}`,
    },
    "sentiment analysis": {
      train_model: sentiment_analysis_train_model,
      file_format: `{\n\tsentiment: "...",\n\tcontent: "...",\n}`,
    },
  };

  const DownloadObject = (data, fileName) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.setAttribute("href", URL.createObjectURL(blob));
    a.setAttribute("download", fileName);
    a.click();
  };

  const Tain_Model = async (e) => {
    const { files } = e.target;
    if (files[0].size > 500000) {
      e.target.value = "";
      setLoading(false);
      return setAlert({
        isAlert: true,
        type: "error",
        message: "File size should be less than 500KB",
      });
    }
    if (files[0].type !== "application/json") {
      e.target.value = "";
      setLoading(false);
      return setAlert({
        isAlert: true,
        type: "error",
        message: "Invalid file type",
      });
    }
    const fileReader = new FileReader();
    fileReader.readAsText(files[0], "UTF-8");
    fileReader.onload = async (f) => {
      const dataset = JSON.parse(f.target.result);
      try {
        const dataset_verify = dataset.every((parameter) => {
          if (machine === "chatbot") {
            return (
              parameter.tag &&
              parameter.patterns &&
              parameter.patterns.length > 0
            );
          } else if (machine === "recommendation system") {
            return (
              parameter.title &&
              parameter.genres &&
              parameter.genres.length > 0 &&
              parameter.keywords &&
              parameter.keywords.length > 0
            );
          } else if (machine === "sentiment analysis") {
            return parameter.sentiment && parameter.content;
          } else {
            return false;
          }
        });
        if (!dataset_verify) {
          e.target.value = "";
          setLoading(false);
          return setAlert({
            isAlert: true,
            type: "error",
            message: "Invalid Parameters",
          });
        }
      } catch (err) {
        e.target.value = "";
        setLoading(false);
        return setAlert({
          isAlert: true,
          type: "error",
          message: "Invalid Parameters",
        });
      }
      setLoading(false);
      setIsProcessing(true);
      try {
        const { words, classes } = await PageData[machine]["train_model"](
          dataset
        );
        DownloadObject(words, "words.json");
        DownloadObject(classes, "classes.json");
        setIsProcessing(false);
      } catch (err) {
        e.target.value = "";
        setIsProcessing(false);
        return setAlert({
          isAlert: true,
          type: "error",
          message: "Some error occurred while training the model",
        });
      }
    };
  };

  return Machines.find(
    (e) => e.tag === machine && e.language.includes(language)
  ) ? (
    <div className="py-5 flex flex-col justify-center items-center my-auto w-full">
      <Head>
        <title>
          {Machines.map(({ title, tag }) => {
            if (tag === machine) {
              return "Training | " + title;
            }
          })}
        </title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="The model will be trained here. The dataset files will be uploaded, the model will be trained accordingly and then the processed file can be downloaded."
        />
      </Head>
      <div className="flex flex-col items-center justify-center w-full">
        <label
          htmlFor="drop-file"
          className="flex flex-col items-center justify-center w-full max-w-2xl py-5 sm:py-8 px-4 rounded-lg cursor-pointer bg-[#0e8f66]/20 shadow-inner drop-shadow-md text-[#00553a] duration-300 hover:scale-95"
        >
          <svg
            className="w-12 sm:w-14 h-12 sm:h-14 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <div className="text-lg sm:text-xl font-semibold text-center uppercase">
            click here to upload your dataset
          </div>
          <div className="text-xs sm:text-sm uppercase">JSON (MAX 500KB)</div>
          <div className="mt-10 sm:text-lg font-semibold">File Format</div>
          <pre className="text-sm sm:text-base">
            <code>{PageData[machine]["file_format"]}</code>
          </pre>
          <input
            id="drop-file"
            type="file"
            onChange={(e) => {
              setLoading(true);
              Tain_Model(e);
            }}
            accept="application/json"
            hidden
            required
          />
        </label>
      </div>
      {isProcessing && (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center bg-white/80">
          <svg
            className="w-12 sm:w-16 h-12 sm:h-16 animate-spin fill-[#00553a]"
            viewBox="0 0 100 101"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="none"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <div className="text-center text-[#00553a] mt-10 sm:mt-12">
            <div className="text-2xl sm:text-3xl font-semibold">
              Model training in process...
            </div>
            <div className="sm:text-lg font-medium text-[#00553a]/70 mt-3">
              <div>It will take some time. Please be patient.</div>
              <div>Do not reload or leave the page.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <PageNotFound />
  );
};

export default Training;
