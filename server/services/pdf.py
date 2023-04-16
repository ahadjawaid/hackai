import requests
import PyPDF2
from io import BytesIO
import re

def remove_non_printable(text):
    text = re.sub(r'[^\x20-\x7E]', ' ', text)
    text = re.sub(r'<[^>]+>', '', text)
    return text

def get_pdf(pdf_url):
    response = requests.get(pdf_url)
    return response.content

def pdf_to_text(pdf_content):
    pdf = PyPDF2.PdfReader(BytesIO(pdf_content))
    page_text = ""
    for page in pdf.pages:
        page_text += remove_non_printable(page.extract_text())
    return page_text