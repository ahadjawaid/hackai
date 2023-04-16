import re

def remove_non_printable(text):
    text = re.sub(r'[^\x20-\x7E]', ' ', text)
    text = re.sub(r'<[^>]+>', '', text)
    return text