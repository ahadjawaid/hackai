from flask import Flask, request, jsonify, send_file
import json
import os
from services.arxiv import search_papers
from services.guttenberg import search_gutenberg_book, get_gutenberg_book
from services.pdf import get_pdf, pdf_to_text
from services.synthesize import synthesize_speech_amzn, get_text_within_limit
from fastcore.foundation import L
import base64
from io import BytesIO
from pydub import AudioSegment
import numpy as np


app = Flask(__name__)

char_limit = 3000
sample_rate = 22050

def syntheize_encode(text):
    wav, _ = synthesize_speech_amzn(text[:char_limit])
    base64_audio = wav_to_bytes(wav)

    res = {
        'audio': base64_audio
    }
    return jsonify(res)

def wav_to_bytes(wav):
    byte_wav = (wav * np.iinfo(np.int16).max).astype(np.int16).tobytes()

    audio = AudioSegment(byte_wav, sample_width=2, frame_rate=sample_rate, channels=1)

    output_buffer = BytesIO()
    audio.export(output_buffer, format="wav")
    output_buffer.seek(0)

    base64_audio = base64.b64encode(output_buffer.read()).decode('utf-8')
    return base64_audio

@app.route('/search-guttenberg', methods=['POST'])
def search_guttenberg():
    query = request.json['query']
    search_results = L(search_gutenberg_book(query))

    res_obj = search_results.map(lambda res: {
        "id": res["id"],
        "title": res["title"],
        "author": res["authors"][0]["name"]
    })
    
    res_json = jsonify(list(res_obj))
    return res_json

@app.route('/get-guttenberg-audio', methods=['POST'])
def get_guttenberg_audio():
    book_id = request.json['id']
    lines = get_gutenberg_book(book_id)
    text = get_text_within_limit(lines, char_limit)

    return syntheize_encode(text)

@app.route('/search-arxiv', methods=['POST'])
def search_arxiv():
    query = request.json['query']
    search_results = L(search_papers(query))

    res_obj = search_results.map(lambda res: {
        "id": res[1],
        "title": res[0],
        "author": res[2][0]
    })
    
    res_json = jsonify(list(res_obj))
    return res_json

@app.route('/get-arxiv-audio', methods=['POST'])
def get_arxiv_audio():
    pdf_url = request.json['id']
    pdf = get_pdf(pdf_url)
    text = pdf_to_text(pdf)

    return syntheize_encode(text)

if __name__ == "__main__":
    app.run(port=5000, debug=True)