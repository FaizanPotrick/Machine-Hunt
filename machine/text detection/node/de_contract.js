const replace = (message) => {
  message = message
    .replaceAll("'t", "")
    .replaceAll("'re", "")
    .replaceAll("'s", "")
    .replaceAll("'d", "")
    .replaceAll("'ll", "")
    .replaceAll("'ve", "")
    .replaceAll("'m", "")
    .replaceAll(/[&\/\\#`,+()$~%.'":*!?<>{}^]/g, " ")
    .replaceAll(/^\s+|\s+$/g, " ");
  message = message.toLowerCase();
  return message;
};

const split_sentences = (dataset) => {
  let words = [];
  let classes = [];
  const documents = [];
  for (data of dataset) {
    let pattern = replace(data.content);
    pattern = pattern.split(" ");
    const new_pattern = [];
    for (p of pattern) {
      if (/^[A-Za-z]+$/.test(p)) {
        new_pattern.push(p);
      }
    }
    words.push(...new_pattern);
    documents.push([pattern, data.sentiment]);
    if (!classes.includes(data.sentiment)) {
      classes.push(data.sentiment);
    }
  }
  words = [...new Set(words)];
  classes = [...new Set(classes)];

  words.sort();
  classes.sort();
  return { words, classes, documents };
};

const words_to_binary = (words, classes, documents) => {
  const training = [];
  const output_empty = Array(classes.length).fill(0);

  for (document of documents) {
    const bag = [];
    const word_patterns = document[0];
    for (word of words) {
      bag.push(word_patterns.includes(word) ? 1 : 0);
    }
    let output_row = [...output_empty];
    output_row[classes.indexOf(document[1])] = 1;
    training.push([bag, output_row]);
  }

  training.sort(() => Math.random() - 0.5);

  const train_x = training.map((a) => a[0]);
  const train_y = training.map((a) => a[1]);

  return { train_x, train_y };
};

module.exports = { replace, split_sentences, words_to_binary };
