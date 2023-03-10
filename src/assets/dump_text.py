import os
import pypdf

from util import get_script_dir

re_jp = "[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]"
re_kanji = "[一-龯]"


def extract_text(pdf: str) -> list[str]:
    with open(pdf, 'rb') as f:
        r = pypdf.PdfReader(f)
        print("Extracting text from " + pdf)
        return [page.extract_text() for page in r.pages]


def dump_pdf(pdfs: list[str]):
    for f in reversed(pdfs):
        name = "_".join(f.split("/")[-1].split(".")[0:-1])
        out = "{0}/raw/{1}_Raw.txt".format(get_script_dir(), name)

        # doing this here means the dump can be interrupted
        # without clearing the output of the last usage
        text = extract_text(f)

        with open(out, "w", encoding="utf-8") as text_out:

            text_out.write("\f".join(text))
            print("Text dumped from " + f + " to " + out)


def dump_vocab():
    pdf_dir = get_script_dir() + "/pdfs"
    vocab_paths = ["{0}/{1}".format(pdf_dir, f)
                   for f in os.listdir(pdf_dir) if "Vocab" in f]
    dump_pdf(vocab_paths)


def dump_kanji():
    pdf_dir = get_script_dir() + "/pdfs"
    kanji_paths = ["{0}/{1}".format(pdf_dir, f)
                   for f in os.listdir(pdf_dir) if "Kanji" in f]
    dump_pdf(kanji_paths)


def dump():
    dump_kanji()
    dump_vocab()


if (__name__ == "__main__"):
    dump()
