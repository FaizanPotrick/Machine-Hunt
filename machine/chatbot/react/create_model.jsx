import * as tf from "@tensorflow/tfjs";
import { split_sentences, words_to_binary } from "./de_contract";
import fs from "fs";

const train_model = async (
  dataset,
  words_path = "",
  classes_path = "",
  model_path = ""
) => {
  const { words, classes, documents } = split_sentences(dataset);

  const { train_x, train_y } = words_to_binary(words, classes, documents);
  fs.writeFile(words_path + "words.json", JSON.stringify(words), (err) => {
    if (err) {
      console.log(err);
    }
  });
  fs.writeFile(
    classes_path + "classes.json",
    JSON.stringify(classes),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
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

  model.save("file://" + model_path, history);
};

export default train_model;
