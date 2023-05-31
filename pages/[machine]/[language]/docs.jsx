import React, { useContext } from "react";
import { useRouter } from "next/router";
import FileSnippet from "../../../components/FileSnippet";
import CmdSnippet from "../../../components/CmdSnippet";
import Head from "next/head";
import DocsContext from "../../../context/DocsContext";
import { StateContext } from "../../../context/StateContext";
import PageNotFound from "../../404";

const Docs = () => {
  const { Machines } = useContext(StateContext);
  const { machine, language } = useRouter().query;
  const extension =
    (language === "node" && "js") || (language === "python" && "py");

  const Prerequisite = {
    node: [
      {
        title: "Install Node.js",
        link: "https://nodejs.org/en/download/",
      },
      {
        title: "Install NPM Package",
      },
    ],
    python: [
      {
        title: "Install Python",
        link: "https://www.python.org/downloads/",
      },
      {
        title: "Install Pip",
      },
    ],
  };

  const Setup = {
    node: [
      {
        title: "Initialize the project",
        cmd: "npm init -y",
      },
      {
        title: "Install Express",
        cmd: "npm i express",
      },
      {
        title: "Install Tensorflow.js",
        cmd: "npm i -D @tensorflow/tfjs-node",
      },
      {
        title: "Install File System",
        cmd: "npm i fs",
      },
    ],
    python: [
      {
        title: "Install Tensorflow",
        cmd: "pip install tensorflow",
      },
      {
        title: "Install Numpy",
        cmd: "pip install numpy",
      },
      {
        title: "Install FastApi",
        cmd: "pip install fastapi",
      },
      {
        title: "Install Uvicorn",
        cmd: "pip install uvicorn",
      },
      {
        title: "Install Gunicorn",
        cmd: "pip install gunicorn",
      },
    ],
  };

  return Machines.find(
    (e) => e.tag === machine && e.language.includes(language)
  ) ? (
    <div className="my-5 p-5 sm:p-6 md:p-8 flex flex-col justify-center items-start w-full max-w-7xl shadow-inner border-2 border-gray-300/60 rounded-lg">
      <Head>
        <title>
          {Machines.map(({ title, tag }) => {
            if (tag === machine) {
              return "Documentation | " + title;
            }
          })}
        </title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Machine Hunt helps you build your machine learning based models. We have documented all the instructions that are easy to understand along with sample files and code."
        />
      </Head>
      <div className="sm:text-lg md:text-2xl font-semibold text-[#00553a]/90">
        Getting Started
      </div>
      <div className="mt-5 sm:text-lg md:text-xl font-semibold text-[#00553a]/70">
        {DocsContext[machine] !== undefined && DocsContext[machine]["title"]}
      </div>
      <div className="mt-2 text-sm sm:text-base font-medium text-gray-600">
        Most people feel intimidated by the process. It looks like a complex
        task, and it is unclear how or where to start.
      </div>
      <div className="mt-1 text-sm sm:text-base font-medium text-gray-600">
        {DocsContext[machine] !== undefined &&
          DocsContext[machine]["description"]}
      </div>
      <div className="sm:text-lg md:text-xl font-semibold text-[#00553a]/70 pt-5">
        Prerequisites
      </div>
      <ul className="list-disc pl-5 my-2 w-full text-sm sm:text-base font-medium text-gray-600">
        {Prerequisite[language].map((item, index) => (
          <li key={index}>
            {item.title}
            {item.link !== undefined && (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex"
              >
                <svg
                  className="h-3 sm:h-4 ml-1 cursor-pointer text-[#00553a]/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  ></path>
                </svg>
              </a>
            )}
          </li>
        ))}
      </ul>
      {(language === "node" && (
        <CmdSnippet command={"npm i npm@latest\r\nnpm i -g npm"} />
      )) ||
        (language === "python" && (
          <CmdSnippet command={"pip install --upgrade pip"} />
        ))}
      <div className="sm:text-lg md:text-xl font-semibold text-[#00553a]/70 pt-5">
        Setup
      </div>
      <div className="my-2 text-sm sm:text-base font-medium text-gray-600">
        To begin with, create a new directory and open it in your terminal.
      </div>
      <CmdSnippet command={"mkdir project-name\r\ncd project-name"} />
      {Setup[language].map((item, index) => (
        <div key={index} className="w-full">
          <ul className="list-disc pl-5 mt-2 w-full text-sm sm:text-base font-medium text-gray-600">
            <li>{item.title}</li>
          </ul>
          <CmdSnippet command={item.cmd} />
        </div>
      ))}
      <div className="sm:text-lg md:text-xl font-semibold text-[#00553a]/70 pt-5">
        Create Dataset
      </div>
      <div className="mt-2 text-sm sm:text-base font-medium text-gray-600">
        Before you start to create a {machine} model, it is important to
        understand what you want your {machine} to do. On this basis, you have
        to create a dataset. We have provided you a sample data set.
      </div>
      <FileSnippet file={`${machine}/dataset/dataset.json`} />
      <div className="sm:text-lg md:text-xl font-semibold text-[#00553a]/70 pt-5">
        Create Files
      </div>
      <ul className="list-disc pl-5 mt-2 w-full text-sm sm:text-base font-medium text-gray-600">
        <li>Create de_contract.{extension}</li>
      </ul>
      <FileSnippet file={`${machine}/${language}/de_contract.${extension}`} />
      <ul className="list-disc pl-5 mt-2 w-full text-sm sm:text-base font-medium text-gray-600">
        <li>Create create_model.{extension} </li>
      </ul>
      <FileSnippet file={`${machine}/${language}/create_model.${extension}`} />
      <ul className="list-disc pl-5 mt-2 w-full text-sm sm:text-base font-medium text-gray-600">
        <li>Create test_model.{extension}</li>
      </ul>
      <FileSnippet file={`${machine}/${language}/test_model.${extension}`} />
      <ul className="list-disc pl-5 mt-2 w-full text-sm sm:text-base font-medium text-gray-600">
        <li>Create server.{extension}</li>
      </ul>
      <FileSnippet file={`server.${extension}`} />
      <div className="mt-2 text-sm sm:text-base font-medium text-gray-600">
        Run server.{extension}
      </div>
      {(language === "node" && <CmdSnippet command={"node server.js"} />) ||
        (language === "python" && (
          <>
            <CmdSnippet command={"python -m venv fastml"} />
            <CmdSnippet command={"uvicorn server:app --reload"} />
          </>
        ))}
      <div className="mt-2 text-sm sm:text-base font-medium text-gray-600">
        Send an API request through Thunder Client or Postman
      </div>
      {(language === "node" && (
        <>
          <CmdSnippet command={"http://localhost:8000/api/create/model"} />
          <CmdSnippet
            command={"http://localhost:8000/api/test/model/MESSAGE"}
          />
        </>
      )) ||
        (language === "python" && (
          <>
            <CmdSnippet command={"http://127.0.0.1:8000/api/create/model"} />
            <CmdSnippet
              command={"http://127.0.0.1:8000/api/test/model/MESSAGE"}
            />
          </>
        ))}
    </div>
  ) : (
    <PageNotFound />
  );
};

export default Docs;
