import React, { useContext } from "react";
import { StateContext } from "../../../context/StateContext";
import CmdSnippet from "../../../components/CmdSnippet";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import PageNotFound from "../../404";

const Api = () => {
  const { Machines } = useContext(StateContext);
  const { machine, language } = useRouter().query;

  return Machines.find(
    (e) => e.tag === machine && e.language.includes(language)
  ) ? (
    <div className="my-5 p-8 sm:mb-auto flex flex-col justify-center items-start w-full max-w-7xl border-2 border-gray-300/60 shadow-inner rounded-lg">
      <Head>
        <title>
          {Machines.map(({ title, tag }) => {
            if (tag === machine) {
              return "API | " + title;
            }
          })}
        </title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Machine Hunt helps you build your machine learning based models. The website will provide you API key for selected machine."
        />
      </Head>
      <div className="mt-5 sm:text-lg md:text-2xl font-semibold text-[#00553a]/90">
        API-Key Setup
      </div>
      <div className="my-3 text-sm sm:text-base font-medium text-gray-600">
        To begin with, Register with our website or simply login with your
        registered email address.
      </div>
      <ul className="list-disc pl-5 w-full text-sm sm:text-base font-medium text-gray-600">
        <li>
          <div className="flex items-center">
            Go to the Dashboard
            <Link href="/dashboard">
              <svg
                className="h-4 sm:h-5 ml-1 cursor-pointer text-[#00553a]/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
            </Link>
            .
          </div>
        </li>
      </ul>
      <ul className="list-disc pl-5 mt-3 w-full text-sm sm:text-base font-medium text-gray-600">
        <li>
          Select{" "}
          <span className="text-[#00553a]/80 capitalize font-bold">
            {Machines.map(({ title, tag }) => {
              if (tag === machine) {
                return title;
              }
            })}
          </span>{" "}
          option from Machine.
        </li>
      </ul>
      <ul className="list-disc pl-5 mt-3 w-full text-sm sm:text-base font-medium text-gray-600">
        <li>
          Proceed by clicking the generate button. An API-Key will be generated
          for the selected machine.
        </li>
      </ul>
      <div className="mt-5 sm:text-lg md:text-2xl font-semibold text-[#00553a]">
        How to use?
      </div>
      <ul className="list-disc pl-5 mt-3 w-full text-sm sm:text-base font-medium text-gray-600">
        <li>Copy the generated machine API-Key from the Dashboard.</li>
      </ul>
      <ul className="list-disc pl-5 mt-3 w-full text-sm sm:text-base font-medium text-gray-600">
        <li>Replace &quot;API_KEY&quot; with the copied key.</li>
      </ul>
      <ul className="list-disc pl-5 mt-3 mb-2 w-full text-sm sm:text-base font-medium text-gray-600">
        <li>Enter your own &quot;MESSAGE&quot; and get a response.</li>
      </ul>
      <CmdSnippet
        command={`https://machinehunt.vercel.app/api/${machine}/API_KEY/MESSAGE`}
      />
      <div className="mt-5 text-sm sm:text-base md:text-lg font-medium text-gray-600">
        Send an API request through Thunder Client or Postman
      </div>
    </div>
  ) : (
    <PageNotFound />
  );
};

export default Api;
