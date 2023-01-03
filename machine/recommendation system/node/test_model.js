const tf = require("@tensorflow/tfjs-node");
const { replace } = require("./de_contract");

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
  const result = await predict.dataSync();
  const array = Object.entries(result)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return array.map((item) => classes[item[0]]);
};

module.exports = predict_class;
