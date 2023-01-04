import React, { useState, createContext } from "react";
import { getCookie } from "cookies-next";

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ isAlert: false, type: "", message: "" });

  const [isLogin, setIsLogin] = useState(
    getCookie("token") === undefined || getCookie("token") === "" ? false : true
  );

  const Machines = [
    {
      title: "ChatBot",
      tag: "chatbot",
      language: ["node", "python"],
      description:
        "A chatbot that simulates human conversation through text or voice interactions.",
      link: "/chatbot",
    },
    {
      title: "Recommendation System",
      tag: "recommendation system",
      language: ["node", "python"],
      description:
        "An approach to filtering or predicting the user's preferences based on their choices.",
      link: "/recommendation system",
    },
    {
      title: "Sentiment Analysis",
      tag: "sentiment analysis",
      language: ["node", "python"],
      description:
        "A technique that uses NLP to identify positive, negative or neutral sentiment in a text.",
      link: "/sentiment analysis",
    },
  ];

  return (
    <StateContext.Provider
      value={{
        loading,
        setLoading,
        alert,
        setAlert,
        isLogin,
        setIsLogin,
        Machines,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
