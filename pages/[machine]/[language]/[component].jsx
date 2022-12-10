import React from "react";
import { useRouter } from "next/router";
import PageNotFound from "../../404";
import ChatbotDocs from "../../../components/chatbot/Docs";
import ChatbotDemo from "../../../components/chatbot/Demo";
import ChatbotApi from "../../../components/chatbot/Api";
import ChatbotTrainModel from "../../../components/chatbot/TrainModel";

const Component = () => {
  const { machine, component } = useRouter().query;
  const Components = {
    chatbot: {
      docs: <ChatbotDocs />,
      demo: <ChatbotDemo />,
      api: <ChatbotApi />,
      training: <ChatbotTrainModel />,
    },
  };

  return Components[machine] !== undefined &&
    Components[machine][component] !== undefined ? (
    Components[machine][component]
  ) : (
    <PageNotFound />
  );
};

export default Component;
