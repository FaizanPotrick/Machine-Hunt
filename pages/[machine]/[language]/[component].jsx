import React from "react";
import { useRouter } from "next/router";
import PageNotFound from "../../404";
import ChatbotDocs from "../../../components/chatbot/Docs";

const Component = () => {
  const { machine } = useRouter().query;
  const Components = {
    chatbot: <ChatbotDocs />,
  };

  return Components[machine] !== undefined ? (
    Components[machine]
  ) : (
    <PageNotFound />
  );
};

export default Component;
