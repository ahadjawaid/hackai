import arxiv
from fastcore.foundation import L

def search_papers(title, max_results = 10):
    search_query = f'ti:"{title}"'
    results = arxiv.Search(query=search_query, max_results=max_results).results()
    content =  L(results).map(lambda x: (x.title, x.pdf_url, L(x.authors).map(
                             lambda x: x.name)))
    return content