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
      description:
        "A chatbot that simulates human conversation through text or voice interactions.",
      link: "/chatbot",
    },
    {
      title: "Image Recognition",
      tag: "image-recognition",
      description:
        "The ability of model to identify objects, places, people and actions in images.",
      link: "/chatbots",
    },
    {
      title: "Movie Recommendation",
      tag: "movie-recommendation",
      description:
        "An approach to filtering or predicting the user's preferences based on their choices.",
      link: "/chatbots",
    },
    {
      title: "Text Recognition",
      tag: "text-recognition",
      description:
        "A system that recognizes text inside images and converts it into an electronic form.",
      link: "/chatbots",
    },
    {
      title: "Book Recommendation",
      tag: "book-recommendation",
      description:
        "A system that filters books by predicting ratings or preferences of readers.",
      link: "/chatbots",
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
