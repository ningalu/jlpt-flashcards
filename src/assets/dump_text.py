import os
import pypdf

from util import get_script_dir, flatten

re_jp = "[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]"
re_kanji = "[一-龯]"


def extract_text(pdf: str) -> list[str]:
    with open(pdf, 'rb') as f:
        pdf = pypdf.PdfReader(f)

        return [page.extract_text() for page in pdf.pages]


def parse_vocab():
    pdf_dir = get_script_dir() + "/pdfs"
    vocab_paths = ["{0}/{1}".format(pdf_dir, f)
                   for f in os.listdir(pdf_dir) if "Vocab" in f]

    for f in reversed(vocab_paths):
        name = "_".join(f.split("/")[-1].split(".")[0:-1])
        with open("{0}/text/{1}_Raw.txt".format(get_script_dir(), name), "w", encoding="utf-8") as text_out:
            text_out.write("\f".join(extract_text(f)))


if (__name__ == "__main__"):
    parse_vocab()
