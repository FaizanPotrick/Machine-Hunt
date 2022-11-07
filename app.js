const express = require("express");
const app = express();
const port = 8000;
const get_response = require("./machine/chatbot/javascript/test_model");
const train_model = require("./machine/chatbot/javascript/create_model");
const dataset = require("./machine/chatbot/javascript/dataset");

app.get("/", async (req, res) => {
  // const data = await train_model(dataset);
  res.send(await get_response("hello"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
