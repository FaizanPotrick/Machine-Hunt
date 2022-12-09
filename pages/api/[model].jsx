import fs from "fs";

const Model = async (req, res) => {
  const { method } = req;
  const { model } = req.query;
  if (method !== "GET") {
    return res.status(400).send("Bad Request");
  }
  try {
    const model_json = fs.readFileSync(`./machine/chatbot/react/${model}`);
    res.setHeader("Content-Type", "application/json").send(model_json);
  } catch (err) {
    res.status(404).send("Not Found");
  }
};

export default Model;
