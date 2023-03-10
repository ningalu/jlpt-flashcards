from pypdf import PdfReader
import pypdf
import re
from itertools import chain
import requests

def flatten(input: list) -> list:
    return list(chain.from_iterable(input))

def extract_information(pdf_path: str) -> list[str]:
    with open(pdf_path, 'rb') as f:
        pdf = PdfReader(f)

        return [page.extract_text() for page in pdf.pages]

def process_information(text: list[str]) -> list[str]:
    # RegEx for any JP character
    re_jp = "[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]"
    re_jp_nl = "[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]\s*\r?\n"

    
    nl_split = flatten([line.split("\n") for line in text])
    jp_filtered = [line for line in nl_split if re.search(re_jp, line)]

    # Filter out page numbers and empty strings
    remove_page_number = []
    for line in jp_filtered:
        check_page_number = line.strip().split(" ")
        number_removed = [part for part in check_page_number if not part.strip().isnumeric() and part != ""]
        if len(number_removed) != len(check_page_number):
            print(check_page_number, "\n", number_removed)
        remove_page_number.append(" ".join(number_removed))

    for i in range(len(remove_page_number)-1):
        if len(jp_filtered[i]) <= 6:
            print("\n***\n", jp_filtered[i-1], jp_filtered[i], jp_filtered[i+1], "\n***\n")
            
    with open("C:/Users/Public/Desktop/temp1.txt", "w", encoding="utf8") as temp:
        for page in remove_page_number:
            temp.write(page)
            temp.write("\n")
    
    return remove_page_number
    

def structure_information(text: list[str]) -> list[str]:
    re_kanji = "[一-龯]"
    re_jp = "[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]"
    

    json_text = [];
    for line in text:

        check_kanji = line.strip().split(" ", 1)

        if len(check_kanji) > 1:
            if re.search(re_kanji, check_kanji[0]):
                rest = check_kanji[1].split(" ", 1);

                
                if len(rest) > 1:
                    eng = ", ".join([w.strip() for w in rest[l].split(",")])
                    json_line = "\t{\n\t\t\"kanji\": \"" + check_kanji[0] + "\",\n\t\t\"kana\": \"" + rest[0] + "\",\n\t\t\"english\": \"" + eng + "\"\n\t}"
                    json_text.append(json_line)
                # There is either no Kana or no English column
                # This is technically a valid state but also happens on errors
                else:
                    if re.search(re_jp, rest[0]):
                        print("English missing")
                        print("line: ", line)
                        json_line = "\t{\n\t\t\"kanji\": \"" + check_kanji[0] + "\",\n\t\t\"kana\": \"" + rest[0] + "\"\n\t}"
                        json_text.append(json_line)
                    else:
                        #print("Kana missing")
                        #print("line: ", line)
                        eng = ", ".join([w.strip() for w in rest[1].split(",")])
                        json_line = "\t{\n\t\t\"kanji\": \"" + check_kanji[0] + "\",\n\t\t\"english\": \"" + eng + "\"\n\t}"
                        json_text.append(json_line)
                    
            else:
                #print("No kanji component")
                #print("line: ", line)
                eng = ", ".join([w.strip() for w in check_kanji[1].split(",")])
                json_line = "\t{\n\t\t\"kana\": \"" + check_kanji[0] + "\",\n\t\t\"english\": \"" + eng + "\"\n\t}"
                json_text.append(json_line)
        else:
            print("The line was only split into one part")
            print("line: ", line)
    return json_text

if __name__ == '__main__':

    output_dir = "C:/Dev/JLPT_Extraction/out/"
    
    vocab_pdfs = [
        #"http://www.tanos.co.uk/jlpt/jlpt5/vocab/VocabList.N5.pdf",
        #"http://www.tanos.co.uk/jlpt/jlpt4/vocab/VocabList.N4.pdf",
        "http://www.tanos.co.uk/jlpt/jlpt3/vocab/VocabList.N3.pdf",
        "http://www.tanos.co.uk/jlpt/jlpt2/vocab/VocabList.N2.pdf",
        "http://www.tanos.co.uk/jlpt/jlpt1/vocab/VocabList.N1.pdf"
    ]

    for url in vocab_pdfs:
        print("Downloading " + url)
        res = requests.get(url)
        print("Download finished")

        print("Writing to temp local file")
        local_path = output_dir + url.split("/")[-1]
        with open(local_path, "wb") as temp:
            temp.write(res.content)

        print("Starting processing")
        pages = extract_information(local_path)
        processed = process_information(pages)
        structured = structure_information(processed)
        with open(local_path + ".json", "w", encoding="utf8") as out:
            out.write("[\n")
            out.write(",\n".join(structured))
            out.write("]")
        print("Created JSON of " + url)
        

##    n1 = requests.get(vocab_pdfs[0])
##    with open("./temp.pdf", "w") as temp
##        temp.write(n1.content)
##    
##    input_path = 'C:/Users/OKC/Downloads/N1VocabList.pdf'
##    output_dir = "C:/Users/Public/Desktop/"
##    pages = extract_information(input_path)
##    with open(output_dir + "N1pages.txt", "w", encoding="utf8") as pages_out:
##        pages_out.write("\n".join(pages))
##
##        
##    processed = process_information(pages)
##    with open(output_dir + "N1proc.txt", "w", encoding="utf8") as proc_out:
##        proc_out.write("\n".join(processed))
##        
##    structured = structure_information(processed)
##
##    with open(output_dir + "N1vocab.json", "w", encoding="utf8") as out:
##        out.write(",\n".join(structured))
    
    
