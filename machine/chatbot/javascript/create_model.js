const tf = require("@tensorflow/tfjs-node-gpu");
const { split_sentences, words_to_binary } = require("./de_contract");
const fs = require("fs");

const train_model = async (dataset, words_path, classes_path, model_path) => {
  const { words, classes, documents } = split_sentences(dataset);

  const { train_x, train_y } = words_to_binary(words, classes, documents);
  fs.writeFileSync(
    "machine/chatbot/javascript/words.json",
    JSON.stringify(words)
  );
  fs.writeFileSync(
    "machine/chatbot/javascript/classes.json",
    JSON.stringify(classes)
  );
  const model = tf.sequential();
  model.add(
    tf.layers.dense({
      units: 128,
      inputShape: [train_x[0].length],
      activation: "relu",
    })
  );
  model.add(tf.layers.dropout({ rate: 0.5 }));
  model.add(
    tf.layers.dense({
      units: 64,
      activation: "relu",
    })
  );
  model.add(tf.layers.dropout({ rate: 0.5 }));
  model.add(
    tf.layers.dense({
      units: train_y[0].length,
      activation: "softmax",
    })
  );
  model.compile({
    loss: "categoricalCrossentropy",
    optimizer: "adam",
    metrics: ["accuracy"],
  });

  const history = await model.fit(tf.tensor(train_x), tf.tensor(train_y), {
    epochs: train_x[0].length,
    batchSize: 15,
  });

  model.save("file://machine/chatbot/javascript", history);
};

module.exports = train_model;
