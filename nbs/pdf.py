import requests
import PyPDF2
from io import BytesIO
from preprocess import remove_non_printable

def download_pdf(pdf_url):
    response = requests.get(pdf_url)
    return response.content

def pdf_to_text(pdf_content):
    pdf = PyPDF2.PdfReader(BytesIO(pdf_content))
    page_text = ""
    for page in pdf.pages:
        page_text += remove_non_printable(page.extract_text())
    return page_text