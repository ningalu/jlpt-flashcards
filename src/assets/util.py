import os
from itertools import chain


def get_script_dir() -> str:
    # idk if this works when you import it from a script
    # in a different dir but it doesnt really matter
    script_path = os.path.realpath(__file__)
    return "/".join(script_path.split(os.sep)[0:-1])


def flatten(input: list) -> list:
    return list(chain.from_iterable(input))
