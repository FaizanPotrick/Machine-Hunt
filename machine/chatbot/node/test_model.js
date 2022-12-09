const tf = require("@tensorflow/tfjs-node");
const { replace } = require("./de_contract");
const dataset = require("./dataset.json");

const bag_of_words = (message) => {
  const words = require("./words.json");
  message = replace(message);
  message = message.split(" ");
  let bag = Array(words.length).fill(0);
  for (word of message) {
    if (words.includes(word)) {
      bag[words.indexOf(word)] = 1;
    }
  }
  return bag;
};

const predict_class = async (message) => {
  const classes = require("./classes.json");
  const model = await tf.loadLayersModel("file://model.json");
  const predict = model.predict(tf.tensor([bag_of_words(message)]));
  const result = await predict.argMax(1).dataSync()[0];
  return classes[result];
};

const get_response = async (message) => {
  const tag = await predict_class(message);
  for (data of dataset) {
    if (data.tag === tag) {
      return data.responses[Math.floor(Math.random() * data.responses.length)];
    }
  }
};

module.exports = get_response;
