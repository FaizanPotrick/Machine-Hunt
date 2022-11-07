import json

with open('machine/chatbot/dataset/bots.json', encoding='utf-8') as file:
    bots = json.load(file)

with open('machine/chatbot/dataset/college.json', encoding='utf-8') as file:
    college = json.load(file)

with open('machine/chatbot/dataset/depression.json', encoding='utf-8') as file:
    depression = json.load(file)

with open('machine/chatbot/dataset/entertainment.json', encoding='utf-8') as file:
    entertainment = json.load(file)

with open('machine/chatbot/dataset/general.json', encoding='utf-8') as file:
    general = json.load(file)

with open('machine/chatbot/dataset/healthcare.json', encoding='utf-8') as file:
    healthcare = json.load(file)

with open('machine/chatbot/dataset/swears.json', encoding='utf-8') as file:
    swears = json.load(file)

dataset = [*bots, *college, *depression,
            *entertainment, *general, *healthcare, *swears]
