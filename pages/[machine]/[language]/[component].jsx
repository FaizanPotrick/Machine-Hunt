import React from "react";
import { useRouter } from "next/router";
import PageNotFound from "../../404";
import ChatbotDocs from "../../../components/machine/chatbot/Docs";
import ChatbotDemo from "../../../components/machine/chatbot/Demo";
import ChatbotApi from "../../../components/machine/chatbot/Api";
import ChatbotTrainModel from "../../../components/machine/chatbot/TrainModel";

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
