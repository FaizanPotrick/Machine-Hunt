import React, { useContext } from "react";
import Link from "next/link";
import { StateContext } from "../../context/StateContext";
import { useRouter } from "next/router";
import PageNotFound from "../404";
import Head from "next/head";

const Machine = () => {
  const { Machines } = useContext(StateContext);
  const { machine } = useRouter().query;

  return Machines.find((e) => e.tag === machine) ? (
    <div className="py-5 flex flex-col justify-center items-center my-auto w-full">
      <Head>
        <title>Select Language</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Machine Hunt provides different programming languages to build your model. Build the model with your preferred language."
        />
      </Head>
      <div className="text-3xl lg:text-4xl font-semibold text-[#00553a] mb-3 sm:mb-4 capitalize">
        {Machines.map(({ title, tag }) => {
          if (tag === machine) {
            return title;
          }
        })}
      </div>
      <div className="text-lg sm:text-xl md:text-2xl text-center font-medium text-[#00553a]/90">
        These are your two options:
      </div>
      <div className="max-w-5xl text-sm sm:text-base text-center text-gray-800">
        Choose your Preferred Coding Language to construct the Model.
      </div>
      <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-6 mt-6 w-full">
        {[
          {
            title: "Node",
            description: `function MachineHunt( ) {\r\n\tconsole.log("Welcome to Machine Hunt");\r\n}`,
            link: `/${machine}/node/docs`,
          },
          {
            title: "Python",
            description: `def MachineHunt( user ):\r\n\tprint("Hello"+" "+user)\r\n\tprint("Welcome to Machine Hunt")`,
            link: `/${machine}/python/docs`,
          },
        ].map(({ title, description, link }, index) => (
          <Link
            href={link}
            key={index}
            className="h-full w-full max-w-xs sm:max-w-[21rem] border-2 border-[#0e8f66]/20 shadow-lg hover:scale-95 duration-500 rounded-lg bg-[#0e8f66]/[0.15] p-4 md:p-5"
          >
            <div className="text-xl md:text-2xl font-semibold text-[#00553a] mb-3">
              {title}
            </div>
            <div className="text-sm text-gray-500/80 whitespace-pre-wrap">
              {description}
            </div>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <PageNotFound />
  );
};

export default Machine;
