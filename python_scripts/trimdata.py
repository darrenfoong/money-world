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
    fneedle = open(args.needle, 'r')
    fhaystack = open(args.haystack, 'r')
    fout = open(args.output, "w")
    for line in fhaystack.readlines():
        match = re.search('"[A-Z]{2}"', line)
        if (match):
            print (match.group(0))
            fneedle.seek(0)
            for needle in fneedle.readlines():
                # print (needle)
                ncountry = re.search('"[A-Z]{2}"', needle)
                if (ncountry):
                    if (ncountry.group(0) == match.group(0)):
                        fout.writelines(line)
                        break
        else:
            fout.writelines(line)
        # print (re.sub('"(..)"', replace, line))
        # print (line)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "-o", "--output",
        help='output location',
        default="result.txt",
    )
    parser.add_argument(
        "haystack",
        metavar="<haystack location>",
        help="location of haystack",
    )

    parser.add_argument(
        "needle",
        metavar="<needle location>",
        help="location of needle",
    )
    args = parser.parse_args()
    # print(args)
    hidden()
