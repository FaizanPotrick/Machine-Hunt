import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.png";
import React, { useContext } from "react";
import { StateContext } from "../context/StateContext";

const Index = () => {
  const { Machines } = useContext(StateContext);
  return (
    <div className="py-5 flex flex-col justify-center items-center my-auto">
      <Head>
        <title>Machine Hunt</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Machine Hunt is a website to build machine learning based models.You can
          build your own model with few steps which are easy to understand and
          implement. We will provide you with appropriate Documentation and Demonstration. You can use our API key
          and also train the model here"
        />
      </Head>
      <style jsx>
        {`
          b {
            color: rgb(0 85 58 / 0.8);
          }
        `}
      </style>
      <div className="flex flex-col gap-2 sm:gap-3 justify-center items-center">
        <Image
          src={logo}
          alt="logo"
          className="w-fit h-16 sm:h-[4.5rem] md:h-[5rem]"
        />
        <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#00553a]">
          Machine Hunt
        </div>
      </div>
      <div className="mt-2 text-lg sm:text-xl text-center font-medium text-[#00553a]/90">
        Here is the place to stop hunting and get the solution
      </div>
      <div className="mt-4 max-w-5xl sm:text-lg text-center text-gray-900">
        One stop solution to all the hunting for <b>Machine Learning Models</b>.
        You can build your own model with few steps which are easy to understand
        and implement. We will provide you with adequate <b>Documentation</b>{" "}
        and <b>Demonstration</b>. You can use our <b>API KEY</b> and also train
        the model here.
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-6 max-w-6xl">
        {Machines.map(({ title, description, link }, index) => (
          <Link
            key={index}
            href={link}
            className="flex flex-col justify-around min-h-full w-full max-w-xs sm:max-w-sm border-2 border-[#0e8f66]/20 shadow-lg hover:scale-95 duration-500 rounded-lg bg-[#0e8f66]/[0.15] p-4 md:p-5"
          >
            <div className="text-lg md:text-xl font-semibold text-[#00553a] mb-3">
              {title}
            </div>
            <div className="text-sm text-gray-500/80">{description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;
