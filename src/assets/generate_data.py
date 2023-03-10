import sys

from get_jlpt_resources import get_jlpt_resources
from dump_text import dump
from format_text import format_text


if __name__ == "__main__":
    if "--skip-download" not in sys.argv:
        get_jlpt_resources()
    if "--skip-dump" not in sys.argv:
        dump()
    if "--skip-format" not in sys.argv:
        format_text()
