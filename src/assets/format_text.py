import os
import re
import json
import gzip
import base64

from util import get_script_dir

re_jp = "[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]"
re_kanji = "[一-龯]"


def clean_misc(raw: str) -> str:
    raw = raw.replace("\f", "")
    raw = raw.replace("\r", "")
    raw = raw.replace("\n", "")
    raw = raw.replace("\t", "")

    # replace some problematic formatting
    raw = raw.replace("（", "(")
    raw = raw.replace("）", ")")
    raw = raw.replace(",", ", ")
    raw = raw.replace(" /", "/").replace("/ ", "/")

    # specific known fixes
    raw = raw.replace("TODO same as いいえ ?", "no")

    # remove link and page numbers
    raw = re.sub(
        r"JLPT Resource s – http://www\.tanos\.co\.uk/jlpt/[ ]+\d+", "", raw)

    # remove excessive whitespace between words
    raw = re.sub(" +", " ", raw)

    # remove everything up to first japanese character
    start_pos = re.search(re_jp, raw).start()
    raw = raw[start_pos:]
    return raw


def format_vocab():
    text_dir = get_script_dir() + "/raw/"
    vocab_text_raw = ["{0}/{1}".format(text_dir, f)
                      for f in os.listdir(text_dir) if "Vocab" in f and "Raw" in f]

    for f in vocab_text_raw:
        with open(f, "r", encoding="utf-8") as raw_file:
            print("Processing " + f)

            raw = raw_file.read()
            raw = clean_misc(raw)

            # split the string at every instance where there is some ascii character
            # (english + punctuation) followed by a space and a japanese character
            re_vocab_borders = "{1} {0}".format(
                re_jp, "(?![/])[ -~]")
            boundary_matches = list(re.finditer(re_vocab_borders, raw))
            starts = [0] + [b.end() - 1 for b in boundary_matches]
            ends = [b.start() + 1 for b in boundary_matches]
            intervocab_split = [raw[i:j] for i, j in zip(starts, ends)]

            re_jp_to_en = "{0} {1}".format(
                re_jp[0:-1] + ")]", "[a-zA-Z0-9(\?,\-#\~]")

            intervocab_borders = [re.search(re_jp_to_en, p)
                                  for p in intervocab_split]

            intravocab_split = []
            for p, b in zip(intervocab_split, intervocab_borders):
                try:

                    # split the borders found between jp and en characters
                    # within the unit of vocab
                    jp = p[0:b.start() + 2]
                    en = p[b.end() - 1:]

                    # filter out words containing kanji from the jp section of the vocab
                    jp = jp.split()
                    kanji = [w for w in jp if re.search(re_kanji, w)]
                    kanji_set = set(kanji)
                    jp_set = set(jp)

                    # any word that doesn't contain kanji is kana
                    kana = list(jp_set - kanji_set)

                    kanji = (" ".join(kanji)).strip()
                    kana = (" ".join(kana)).strip()
                    en = en.strip()

                    vocab_dict = {}
                    if kanji != "":
                        vocab_dict["kanji"] = kanji

                    if kana != "":
                        vocab_dict["kana"] = kana

                    if en != "":
                        vocab_dict["english"] = en

                    intravocab_split.append(vocab_dict)
                except:
                    print("Part:", p)

            filename = ".".join(f.split("/")[-1].split(".")[0:-1])
            out_name = filename.replace("_Raw", "_Formatted")

            with open(get_script_dir() + "/formatted/" + out_name + ".txt", "w", encoding="utf-8") as formatted:
                # formatted.write("\n".join(intravocab_split))
                for s in intravocab_split:
                    formatted.write("\n".join(list(s.values())))
                    formatted.write("\n\n")

            json_str = json.dumps(
                intravocab_split, ensure_ascii=False)

            with open(get_script_dir() + "/json/" + out_name + ".json", "w", encoding="utf-8") as json_out:
                json_out.write(json_str)

            # with open(get_script_dir() + "/zip/" + out_name + ".zip", "wb") as zip_out:
            #     zip_out.write(base64.b64encode("{ \"d\": \"".encode("utf-8")))
            #     zip_out.write(base64.b64encode(
            #         gzip.compress(json_str.encode("utf-8"))))
            #     zip_out.write(base64.b64encode("\"}".encode("utf-8")))


def format_kanji():
    text_dir = get_script_dir() + "/raw/"
    kanji_text_raw = ["{0}/{1}".format(text_dir, f)
                      for f in os.listdir(text_dir) if "Kanji" in f and "Raw" in f]

    for f in kanji_text_raw:
        with open(f, "r", encoding="utf-8") as raw_file:
            print("Processing " + f)

            raw = raw_file.read()
            raw = clean_misc(raw)

            # these files seem slightly better behaved than the vocab ones
            re_kanji_borders = "{0} {1}".format("[a-zA-Z0-9)]", re_kanji)
            interkanji_boundaries = list(re.finditer(re_kanji_borders, raw))
            starts = [0] + [b.end() - 1 for b in interkanji_boundaries]
            ends = [b.start() + 1 for b in interkanji_boundaries]
            interkanji_split = [raw[i:j] for i, j in zip(starts, ends)]

            intrakanji_split = []
            for s in interkanji_split:
                words = s.split(" ")
                kanji = set([w for w in words if re.search(re_kanji, w)])
                english = set([w for w in words if re.search("[a-zA-Z]", w)])

                readings = [
                    w for w in words if w not in kanji and w not in english]
                onyomi = [w for w in readings if re.search("[ァ-ン]", w)]
                kunyomi = [w for w in readings if re.search("[ぁ-ん]", w)]

                kanji = (" ".join(list(kanji))).strip()
                english = (" ".join(list(english))).strip()
                onyomi = (" ".join(onyomi)).strip()
                kunyomi = (" ".join(kunyomi)).strip()

                kanji_dict = {}
                if kanji != "":
                    kanji_dict["kanji"] = kanji
                if onyomi != "":
                    kanji_dict["onyomi"] = onyomi
                if kunyomi != "":
                    kanji_dict["kunyomi"] = kunyomi
                if english != "":
                    kanji_dict["english"] = english

                intrakanji_split.append(kanji_dict)

            filename = ".".join(f.split("/")[-1].split(".")[0:-1])
            out_name = filename.replace("_Raw", "_Formatted")

            json_str = json.dumps(intrakanji_split, ensure_ascii=False)

            with open(get_script_dir() + "/formatted/" + out_name + ".txt", "w", encoding="utf-8") as formatted:
                for s in intrakanji_split:
                    formatted.write("\n".join(list(s.values())))
                    formatted.write("\n\n")

            with open(get_script_dir() + "/json/" + out_name + ".json", "w", encoding="utf-8") as json_out:
                json_out.write(json_str)

            zip_content = gzip.compress(json_str.encode("utf-8"))
            b64_content = base64.b64encode(zip_content)
            # print(b64_content)

            # with open("{0}/base64/{1}".format(get_script_dir(), out_name), "wb") as b64_out:
            #     b64_out.write(b64_content)

            # with open(get_script_dir() + "/zip/" + out_name + ".zip", "w") as zip_out:
            #     zip_out.write("{ \"d\": \"")
            #     zip_out.write("\"}")
            # zip_out.write(base64.b64encode("{ \"d\": \"".encode("utf-8") + base64.b64encode(gzip.compress(
            #     json_str.encode("utf-8"))) + base64.b64encode("\"}".encode("utf-8"))))
            # zip_out.write(base64.b64encode(
            #     gzip.compress(json_str.encode("utf-8"))))
            # zip_out.write(base64.b64encode("\"}".encode("utf-8")))


def format_text():
    format_kanji()
    format_vocab()


if (__name__ == "__main__"):
    format_text()
