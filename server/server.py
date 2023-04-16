from flask import Flask, request, jsonify, send_file
import json
import os

app = Flask(__name__)

@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

@app.route('/search', methods=['POST'])
def search():
    query = request.get_json()['query']
    with open('books.json', 'r') as f:
        books = json.load(f)
    # Filter the list of books based on the user's search query
    results = [book for book in books if query.lower() in book['title'].lower()]
    return jsonify(results)

@app.route('/get-audio', methods=['POST'])
def get_audio():
    book_id = request.json.get('book_id', '')
    # Generate audio file based on the selected book
    audio_file_path = os.path.join('static', 'audio', f'{book_id}.mp3')
    return send_file(audio_file_path)

if __name__ == "__main__":
    app.run(debug=True)