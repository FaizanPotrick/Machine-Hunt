import numpy as np
from tensorflow.keras.models import load_model
import json
from de_contract import *


def bag_of_words(message):
    with open("words.json", encoding='utf-8') as file:
        words = json.load(file)
    message = replace(message)
    message_words = message.split()
    bag = [0] * len(words)

    for word in message_words:
        for i, w in enumerate(words):
            if word == w:
                bag[i] = 1

    return np.array(bag)


def predict_class(message):
    model = load_model("model.h5")
    with open("classes.json", encoding='utf-8') as file:
        classes = json.load(file)
    
    response = model.predict(np.array([bag_of_words(message)]))[0]
    results = [[i, r] for i, r in enumerate(response)]
    results.sort(key=lambda x: x[1], reverse=True)

    return [classes[r[0]] for r in results[:5]]
