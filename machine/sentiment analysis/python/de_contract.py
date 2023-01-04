import re
import random
import numpy as np

def replace(message):
    message = re.sub(r"['t,'re,'s,'d,'ll,'ve,'m]", "", message)
    message = re.sub( r"[?,:,|,!,\",',(,),*,+,\,,\-,.,/,;,[,\],^,_,{,}]", " ", message)
    message = re.sub("\s\s+", " ", message)
    message = message.lower()
    return message


def split_sentences(dataset):
    words = []
    classes = []
    documents = []

    for data in dataset:
        pattern = replace(data["content"])
        pattern = pattern.split()
        compile = re.compile("[A-Za-z]+")
        pattern = [p for p in pattern if compile.fullmatch(p) is not None]
        words.extend(pattern)
        documents.append((pattern, data["sentiment"]))
        if data["sentiment"] not in classes:
            classes.append(data["sentiment"])

    words = sorted(set(words))
    classes = sorted(set(classes))

    return words, classes, documents


def words_to_binary(words, classes, documents):
    training = []
    output_empty = [0] * len(classes)

    for document in documents:
        bag = []
        for word in words:
            bag.append(1) if word in document[0] else bag.append(0)

        output_row = list(output_empty)
        output_row[classes.index(document[1])] = 1
        training.append([bag, output_row])

    random.shuffle(training)
    training = np.array(training)

    train_x = list(training[:, 0])
    train_y = list(training[:, 1])

    return train_x, train_y
