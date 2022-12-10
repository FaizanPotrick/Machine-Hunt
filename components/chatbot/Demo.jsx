import React, { useState } from "react";
import axios from "axios";
import Head from "next/head";

const Demo = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState({
    response: "all",
    loading: false,
  });

  const Input_Chat = async (e) => {
    e.preventDefault();
    setChats({ response: chats.response, loading: true });
    setMessage("");
    const { data } = await axios.get(`/api/chatbot/454556/${message}`);
    setChats({
      response: data,
      loading: false,
    });
  };

  return (
    <div className="py-5 flex flex-col justify-center items-center my-auto w-full">
      <Head>
        <title>Chatbot | Demonstration</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="This page will demonstrate how the chatbot will function or respond to the messages."
        />
      </Head>
      <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#00553a] text-center">
        Hi, KIWI here, How may I help you :)
      </div>
      <form
        className="text-sm flex items-center justify-center w-full h-full max-w-xl sm:text-base mt-5 sm:mt-8"
        onSubmit={Input_Chat}
      >
        <input
          type="text"
          className="pl-5 p-1.5 sm:p-2 bg-white text-[#00553a] rounded-l-lg border-2 border-r-0 border-[#0e8f66]/80 focus:outline-none w-full shadow-md placeholder:text-[#00553a]/50"
          placeholder="Enter your message....."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button
          type="submit"
          className="text-white px-5 py-1.5 bg-[#0e8f66]/80 rounded-r-xl text-sm sm:text-lg duration-300 hover:bg-[#0e8f66] shadow-md h-full border-2 border-l-0 border-[#0e8f66]/80"
        >
          Send
        </button>
      </form>
      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mt-4 md:mt-6 lg:mt-8 w-full max-w-xl mb-10 md:mb-12 lg:mb-16">
        {[
          "Hello",
          "Hey",
          "Good Morning",
          "Bye",
          "Who are you?",
          "What is your name?",
        ].map((title, index) => (
          <button
            key={index}
            onClick={() => setMessage(title)}
            className="flex flex-shrink-0 h-full border-2 border-[#0e8f66]/20 shadow-lg hover:scale-95 duration-500 rounded-xl bg-[#0e8f66]/[0.15] px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-lg font-medium text-[#00553a]"
          >
            {title}
          </button>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="text-lg sm:text-xl md:text-2xl font-semibold text-[#00553a] text-center mb-4">
          Response
        </div>
        {!chats.loading ? (
          <div
            className={`${
              chats.response !== "all" ? "opacity-100" : "opacity-0"
            } border-2 border-[#0e8f66]/20 shadow-lg duration-500 rounded-xl bg-[#0e8f66]/[0.15] px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-lg font-medium text-[#00553a]`}
          >
            {chats.response}
          </div>
        ) : (
          <div className="text-[#00553a] py-[16px] sm:py-5 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-[#00553a] rounded-full delay-75 animate-bounce" />
            <div
              className="w-2 h-2 bg-[#00553a] rounded-full animate-bounce"
              style={{
                animationDelay: "0.1s",
              }}
            />
            <div
              className="w-2 h-2 bg-[#00553a] rounded-full animate-bounce"
              style={{
                animationDelay: "0.2s",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Demo;
