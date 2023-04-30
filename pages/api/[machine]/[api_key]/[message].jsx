import get_chatbot_response from "../../../../machine/chatbot/react/test_model";
import get_recommendation_system_response from "../../../../machine/recommendation system/react/test_model";
import get_sentiment_analysis_response from "../../../../machine/sentiment analysis/react/test_model";
import db from "../../../../db";
import ApiKey from "../../../../db/ApiKeySchema";

db();
const MachineModel = {
  chatbot: get_chatbot_response,
  "recommendation system": get_recommendation_system_response,
  "sentiment analysis": get_sentiment_analysis_response,
};

const Message = async (req, res) => {
  const { method } = req;
  const { machine, api_key, message } = req.query;
  if (method !== "GET") {
    return res.status(400).send("Bad Request");
  }
  try {
    if (!message) {
      return res.status(400).send("Bad Request");
    }
    if (MachineModel[machine] === undefined) {
      return res.status(404).send("Not Found");
    }
    const api_response = await ApiKey.find({
      api_key: api_key,
    }).lean();
    if (api_response === []) {
      return res.status(400).send("Invalid API Key");
    }
    if (!api_response.find((e) => e.machine.toLowerCase() === machine)) {
      return res.status(400).send("Invalid API Key");
    }
    const response = await MachineModel[machine](message);
    res.status(200).send(response);
  } catch (err) {
    res.status(404).send("Not Found");
  }
};

export default Message;
