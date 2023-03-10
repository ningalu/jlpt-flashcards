import os
import requests

from util import get_script_dir

vocab_pdf_urls = [
    "http://www.tanos.co.uk/jlpt/jlpt5/vocab/VocabList.N5.pdf",
    "http://www.tanos.co.uk/jlpt/jlpt4/vocab/VocabList.N4.pdf",
    "http://www.tanos.co.uk/jlpt/jlpt3/vocab/VocabList.N3.pdf",
    "http://www.tanos.co.uk/jlpt/jlpt2/vocab/VocabList.N2.pdf",
    "http://www.tanos.co.uk/jlpt/jlpt1/vocab/VocabList.N1.pdf"
]

kanji_pdf_urls = [
    "http://www.tanos.co.uk/jlpt/jlpt1/kanji/KanjiList.N1.pdf",
    "http://www.tanos.co.uk/jlpt/jlpt2/kanji/KanjiList.N2.pdf",
    "http://www.tanos.co.uk/jlpt/jlpt3/kanji/KanjiList.N3.pdf",
    "http://www.tanos.co.uk/jlpt/jlpt4/kanji/KanjiList.N4.pdf",
    "http://www.tanos.co.uk/jlpt/jlpt5/kanji/KanjiList.N5.pdf"
]


def get_jlpt_resources():

    pdf_dir = get_script_dir() + "/pdfs/"

    existing_pdfs = os.listdir(pdf_dir)
    for u in (kanji_pdf_urls + vocab_pdf_urls):
        name = u.split("/")[-1]
        if name not in existing_pdfs:
            print("Downloading {0} to {1}".format(name, pdf_dir))
            pdf_res = requests.get(u)
            with open(pdf_dir + name, "wb") as pdf_out:
                pdf_out.write(pdf_res.content)


if (__name__ == "__main__"):
    get_jlpt_resources()
