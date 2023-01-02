import React from "react";
import { useRouter } from "next/router";
import FileSnippet from "../FileSnippet";
import CmdSnippet from "../CmdSnippet";
import Head from "next/head";

const Docs = () => {
  const { language } = useRouter().query;

  return (
    <div className="my-5 p-5 sm:p-6 md:p-8 flex flex-col justify-center items-start w-full max-w-7xl shadow-inner border-2 border-gray-200/60 rounded-xl">
      <Head>
        <title>Chatbot | Documentation</title>
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
        Want to build a Chatbot?
      </div>
      <div className="mt-2 text-sm sm:text-base font-medium text-gray-600">
        Most people feel intimidated by the process. It looks like a complex
        task, and it is unclear how or where to start.
      </div>
      <div className="mt-1 text-sm sm:text-base font-medium text-gray-600">
        Well, you can start right here and now. We will show you that making
        your own chatbot is actually very fast and easy. You’ll learn how to
        test your brand-new bot and find out how you can easily add it to your
        website.
      </div>
      <div className="sm:text-lg md:text-xl font-semibold text-[#00553a]/70 pt-5">
        Prerequisites
      </div>
      {language === "node" ? (
        <ul className="list-disc pl-5 my-2 w-full text-sm sm:text-base font-medium text-gray-600">
          <li>
            Install{" "}
            <a
              href="https://nodejs.org/en/download/"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Node.js
            </a>
          </li>
          <li>Install NPM Package</li>
        </ul>
      ) : (
        <ul className="list-disc pl-5 my-2 w-full text-sm sm:text-base font-medium text-gray-600">
          <li>
            Install{" "}
            <a
              href="https://www.python.org/downloads/"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Python
            </a>
          </li>
          <li>Install Pip</li>
        </ul>
      )}
      {language === "node" ? (
        <CmdSnippet command={"npm i npm@latest\r\nnpm i -g npm"} />
      ) : (
        <CmdSnippet command={"pip install --upgrade pip"} />
      )}
      <div className="sm:text-lg md:text-xl font-semibold text-[#00553a]/70 pt-5">
        Setup
      </div>
      <div className="my-2 text-sm sm:text-base font-medium text-gray-600">
        To begin with, create a new directory and open it in your terminal.
      </div>
      <CmdSnippet command={"mkdir project-name\r\ncd project-name"} />
      {language === "node" ? (
        <>
          <ul className="list-disc pl-5 mt-2 w-full text-sm sm:text-base font-medium text-gray-600">
            <li>Initialize the project</li>
          </ul>
          <CmdSnippet command={"npm init -y"} />
          <ul className="list-disc pl-5 mt-2 w-full text-sm sm:text-base font-medium text-gray-600">
            <li>Install Express</li>
          </ul>
          <CmdSnippet command={"npm i express"} />
          <ul className="list-disc pl-5 mt-2 w-full text-sm sm:text-base font-medium text-gray-600">
            <li>Install Tensorflow.js</li>
          </ul>
          <CmdSnippet command={"npm i -D @tensorflow/tfjs-node"} />
          <ul className="list-disc pl-5 mt-2 w-full text-sm sm:text-base font-medium text-gray-600">
            <li>Install File System</li>
          </ul>
          <CmdSnippet command={"npm i fs"} />
        </>
      ) : (
        <>
          <ul className="list-disc pl-5 mt-2 w-full text-sm sm:text-base font-medium text-gray-600">
            <li>Install Tensorflow</li>
          </ul>
          <CmdSnippet command={"pip install tensorflow"} />
          <ul className="list-disc pl-5 mt-2 w-full text-sm sm:text-base font-medium text-gray-600">
            <li>Install Numpy</li>
          </ul>
          <CmdSnippet command={"pip install numpy"} />
          <ul className="list-disc pl-5 mt-2 w-full text-sm sm:text-base font-medium text-gray-600">
            <li>Install FastApi</li>
          </ul>
          <CmdSnippet command={"pip install fastapi"} />
          <ul className="list-disc pl-5 mt-2 w-full text-sm sm:text-base font-medium text-gray-600">
            <li>Install Uvicorn</li>
          </ul>
          <CmdSnippet command={"pip install uvicorn"} />
          <ul className="list-disc pl-5 mt-2 w-full text-sm sm:text-base font-medium text-gray-600">
            <li>Install Gunicorn</li>
          </ul>
          <CmdSnippet command={"pip install gunicorn"} />
        </>
      )}
      <div className="sm:text-lg md:text-xl font-semibold text-[#00553a]/70 pt-5">
        Create Dataset
      </div>
      <div className="mt-2 text-sm sm:text-base font-medium text-gray-600">
        Before you start to create a chatbot, it is important to understand what
        you want your chatbot to do. On this basis, you have to create a
        dataset. We have provided you a sample data set.
      </div>
      <FileSnippet file={"chatbot/dataset/dataset.json"} />
      <div className="sm:text-lg md:text-xl font-semibold text-[#00553a]/70 pt-5">
        Create Files
      </div>
      {language === "node" ? (
        <>
          <ul className="list-disc pl-5 mt-2 w-full text-sm sm:text-base font-medium text-gray-600">
            <li>Create de_contract.js</li>
          </ul>
          <FileSnippet file={"chatbot/node/de_contract.js"} />
          <ul className="list-disc pl-5 mt-2 w-full text-sm sm:text-base font-medium text-gray-600">
            <li>Create create_model.js </li>
          </ul>
          <FileSnippet file={"chatbot/node/create_model.js"} />
          <ul className="list-disc pl-5 mt-2 w-full text-sm sm:text-base font-medium text-gray-600">
            <li>Create test_model.js</li>
          </ul>
          <FileSnippet file={"chatbot/node/test_model.js"} />
          <ul className="list-disc pl-5 mt-2 w-full text-sm sm:text-base font-medium text-gray-600">
            <li>Create server.js</li>
          </ul>
          <FileSnippet file={"server.js"} />
          <div className="mt-2 text-sm sm:text-base font-medium text-gray-600">
            Run the server
          </div>
          <CmdSnippet command={"node server.js"} />
        </>
      ) : (
        <>
          <ul className="list-disc pl-5 mt-2 w-full text-sm sm:text-base font-medium text-gray-600">
            <li>Create de_contract.py</li>
          </ul>
          <FileSnippet file={"chatbot/python/de_contract.py"} />
          <ul className="list-disc pl-5 mt-2 w-full text-sm sm:text-base font-medium text-gray-600">
            <li>Create create_model.py</li>
          </ul>
          <FileSnippet file={"chatbot/python/create_model.py"} />
          <ul className="list-disc pl-5 mt-2 w-full text-sm sm:text-base font-medium text-gray-600">
            <li>Create test_model.py</li>
          </ul>
          <FileSnippet file={"chatbot/python/test_model.py"} />
          <ul className="list-disc pl-5 mt-2 w-full text-sm sm:text-base font-medium text-gray-600">
            <li>Create main.py</li>
          </ul>
          <FileSnippet file={"main.py"} />
          <div className="mt-2 text-sm sm:text-base font-medium text-gray-600">
            Run main.py
          </div>
          <CmdSnippet command={"python -m venv fastml"} />
          <CmdSnippet command={"uvicorn main:app --reload"} />
        </>
      )}
      <div className="mt-2 text-sm sm:text-base font-medium text-gray-600">
        Send an API request through Thunder Client or Postman
      </div>
      {language === "node" ? (
        <>
          <CmdSnippet command={"http://localhost:8000/api/create/model"} />
          <CmdSnippet command={"http://localhost:8000/api/test/model/hello"} />
        </>
      ) : (
        <>
          <CmdSnippet command={"http://127.0.0.1:8000/api/create/model"} />
          <CmdSnippet command={"http://127.0.0.1:8000/api/test/model/hello"} />
        </>
      )}
    </div>
  );
};

export default Docs;
