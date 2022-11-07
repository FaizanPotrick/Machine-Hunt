import numpy as np
import random
from tensorflow.keras.models import load_model
import json
from dataset import *
from de_contract import *

model = load_model("machine/chatbot/python/chatbot.h5")

with open('machine/chatbot/python/words.json', encoding='utf-8') as file:
    words = json.load(file)

with open('machine/chatbot/python/classes.json', encoding='utf-8') as file:
    classes = json.load(file)


def bag_of_words(message):
    message = replace(message)
    message_words = message.split()
    bag = [0] * len(words)

    for word in message_words:
        for i, w in enumerate(words):
            if word == w:
                bag[i] = 1

    return np.array(bag)


def predict_class(message):
    response = model.predict(np.array([bag_of_words(message)]))[0]
    results = [[i, r] for i, r in enumerate(response) if r > 0.05]
    results.sort(key=lambda x: x[1], reverse=True)

    if len(results) == 0:
        return 'no_answer'

    return classes[results[0][0]]


def get_response(message):
    tag = predict_class(message)
    for data in datasets:
        if data['tag'] == tag:
            return random.choice(data['responses'])
