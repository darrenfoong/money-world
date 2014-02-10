#!/usr/bin/env python2

from __future__ import print_function
import argparse
import re
import sys

# Takes a input file, reads line by line, and does regex match for 2 characters parenthesised by "" and replace them with the uppercase
# For example, if "ab" was found, this will find it and change it to "AB"
# TODO: Currently output is printed and not saved to the original file

# for regex replacement

def replace(matchobj):
    return matchobj.group(0).upper()


def hidden():
    fh = open(args.file)
    for line in fh.readlines():
        print (re.sub('"(..)"', replace, line))
        # print (line)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    # parser.add_argument(
    #     "-q", "--quality",
    #     help='"low", "medium", "high", or an itag',
    #     default="medium",
    # )
    parser.add_argument(
        "file",
        metavar="<file location>",
        help="location of file",
    )
    args = parser.parse_args()
    hidden()
