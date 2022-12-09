import get_response from "../../../../machine/chatbot/react/test_model";

const Message = async (req, res) => {
  const { method } = req;
  const { message } = req.query;
  if (method !== "GET") {
    return res.status(400).send("Bad Request");
  }
  try {
    if (!message) {
      return res.status(400).send("Bad Request");
    }
    const response = await get_response(message);
    res.status(200).send(response);
  } catch (err) {
    res.status(404).send("Not Found");
  }
};

export default Message;
