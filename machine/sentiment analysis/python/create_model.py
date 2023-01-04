import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
import json
from de_contract import *


def train_model(dataset):
    words, classes, documents = split_sentences(dataset)

    train_x, train_y = words_to_binary(words, classes, documents)

    with open("words.json", "w") as f:
        json.dump(words, f)

    with open("classes.json", "w") as f:
        json.dump(classes, f)

    model = Sequential()
    model.add(Dense(128, input_shape=(len(train_x[0]),), activation="relu"))
    model.add(Dropout(0.5))
    model.add(Dense(64, activation="relu"))
    model.add(Dropout(0.5))
    model.add(Dense(len(train_y[0]), activation="softmax"))

    model.compile(loss="categorical_crossentropy",
                  optimizer="adam", metrics=["accuracy"])

    history = model.fit(np.array(train_x), np.array(
        train_y), epochs=100, batch_size=15)

    model.save("model.h5", history)