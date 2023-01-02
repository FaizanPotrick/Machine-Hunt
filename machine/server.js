const express = require("express");
const server = express();
const port = 8000;
const get_response = require("./test_model.js");
const train_model = require("./create_model.js");
const dataset = require("./dataset.json");

server.use(express.json());

server.get("/api/create/model", async (req, res) => {
  const response = await train_model(dataset);
  res.json(response);
});

server.get("/api/test/model/:message", async (req, res) => {
  const { message } = req.params;
  const response = await get_response(message);
  res.json(response);
});

server.listen(port, () => console.log(`Example app listening on port ${port}!`));
