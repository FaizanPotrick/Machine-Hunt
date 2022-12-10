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
        <meta
          name="description"
          content="Machine Hunt is a website to build machine learning based models with steps that are easy to understand and implement."
        />
      </Head>
      <div className="flex flex-col gap-2 sm:gap-4 justify-center items-center">
        <Image
          src={logo}
          alt="logo"
          className="w-fit h-16 sm:h-[4.5rem] md:h-[5rem] lg:h-24"
        />
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#00553a]">
          Machine Hunt
        </div>
      </div>
      <div className="mt-3 text-lg sm:text-xl md:text-2xl text-center font-medium text-[#00553a]/90">
        Here is the place to stop hunting and get the solution
      </div>
      <div className="mt-6 max-w-5xl sm:text-lg md:text-xl text-center text-gray-800">
        Here is a one stop solution to all your hunting for{" "}
        <b className="text-[#00553a]/80">Machine Learning Models</b>. You can
        build your own model with few steps which are easy to understand and
        implement. We will provide you with adequate{" "}
        <b className="text-[#00553a]/80">Documentation</b> and{" "}
        <b className="text-[#00553a]/80">Demonstration</b>. You can use our{" "}
        <b className="text-[#00553a]/80">API</b> and also train the model here.
      </div>
      <div className="flex flex-wrap justify-center gap-4 lg:gap-6 mt-8 md:mt-12 lg:mt-14 max-w-7xl">
        {Machines.map(({ title, description, link }, index) => (
          <Link
            key={index}
            href={link}
            className="flex flex-col justify-around min-h-full w-full max-w-xs sm:max-w-sm border-2 border-[#0e8f66]/20 shadow-lg hover:scale-95 duration-500 rounded-xl bg-[#0e8f66]/[0.15] p-4 md:p-6"
          >
            <div className="text-xl md:text-2xl font-semibold text-[#00553a] mb-3">
              {title}
            </div>
            <div className="text-sm md:text-base text-gray-500/80">
              {description}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;