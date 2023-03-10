import os

from util import get_script_dir

re_jp = "[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]"
re_kanji = "[一-龯]"


def format_text():
    text_dir = get_script_dir() + "/text/"
    vocab_text_raw = ["{0}/{1}".format(text_dir, f)
                      for f in os.listdir(text_dir) if "Vocab" in f]

    for f in vocab_text_raw:
        with open(f, "r", encoding="utf-8") as raw_file:
            raw = raw_file.read()
            raw.replace("\f", "")
            raw.replace("\r", "")
            raw.replace("\n", "")
            raw.replace(" ", "")
            with open("_".join(f.split("_")[0:1]) + "_Formatted.txt", "w", encoding="utf-8") as formatted:
                formatted.write(raw)


if (__name__ == "__main__"):
    format_text()
