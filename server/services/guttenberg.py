import requests
from fastcore.foundation import L

def search_gutenberg_book(book_title):
    url = f'https://gutendex.com/books/?search={book_title}'
    response = requests.get(url)

    if response.status_code == 200:
        search_results = response.json()["results"]
        return search_results
    print(f"Error: Unable to search for the book '{book_title}'")

def get_gutenberg_book(book_id):
    url = f'http://www.gutenberg.org/cache/epub/{book_id}/pg{book_id}.txt'
    response = requests.get(url)

    if response.status_code == 200:
        it = response.iter_lines()
        lines = L([])
        while True:
            try:
                lines.append(next(it).decode('utf-8-sig'))
            except StopIteration:
                break
        return lines
    print(f"Error: Unable to download book with ID {book_id}")