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

def remove_gutenberg_metadata(input_text):
    # Define regex patterns for Gutenberg header and footer
    header_pattern = r"[\s\S]*?START OF (?:THE|THIS) PROJECT GUTENBERG EBOOK.*?\n(?:-{2,}\n)?"
    footer_pattern = r"\n-{2,}\nEND OF (?:THE|THIS) PROJECT GUTENBERG EBOOK[\s\S]*"
    toc_pattern = r"(\nCONTENTS\n(?:\n[- \w]*\n)+)"
    
    # Remove Gutenberg header, footer, and table of contents
    output_text = re.sub(header_pattern, "", input_text, flags=re.IGNORECASE)
    output_text = re.sub(footer_pattern, "", output_text, flags=re.IGNORECASE)
    output_text = re.sub(toc_pattern, "", output_text, flags=re.IGNORECASE)

    return output_text