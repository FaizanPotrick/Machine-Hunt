import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";

const Machine_Card = ({ item: { title, type, description, link } }) => {
  return (
    <Link
      to={link}
      className="h-full w-full max-w-xs sm:max-w-sm border-2 border-[#0e8f66]/20 shadow-lg hover:scale-95 duration-500 rounded-xl bg-[#0e8f66]/[0.15] p-4 md:p-6"
    >
      <div className="flex justify-between items-center mb-3">
        <div className="text-xl md:text-2xl font-semibold text-[#00553a]">
          {title}
        </div>
        <div className="md:text-lg font-medium text-[#00553a]/60">{type}</div>
      </div>
      <div className="text-sm md:text-base text-gray-800">{description}</div>
    </Link>
  );
};

function App() {
  const [card] = useState([
    {
      title: "Chatbot",
      type: "Model",
      description:
        "A chatbot that simulates human conversation through text or voice interactions.",
      link: "/chatbot",
    },
  ]);
  return (
    <div className="py-5 flex flex-col justify-center items-center my-auto">
      <div className="flex flex-col gap-2 sm:gap-4 justify-center items-center">
        <img src={logo} className="h-16 sm:h-[4.5rem] md:h-[5rem] lg:h-24" />
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
      <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-6 mt-8 md:mt-12 lg:mt-14">
        {card.map((item, index) => (
          <Machine_Card item={item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default App;
