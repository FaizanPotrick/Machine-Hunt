from fastapi import FastAPI
from create_model import train_model
from test_model import get_response # or import test_model as get_response 
from fastapi.middleware.cors import CORSMiddleware
import json

with open('dataset.json', encoding='utf-8') as file:
    dataset = json.load(file)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/api/create/model")
async def create_model():
    return train_model(dataset)


@app.get("/api/test/model/{message}")
async def test_model(message: str):
    return get_response(message, dataset)
