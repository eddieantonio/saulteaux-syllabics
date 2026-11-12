#!/usr/bin/env python3

"""
Generate RegExps for use in saulteaux-syllabics.js

Requires at least Python 3.6.

Derived from https://github.com/eddieantonio/cree-sro-syllabics.js
"""

import re

CONSONANT = "[ptkcsšhmnwy]"
STRICT_VOWEL = "[êioaîôâ]"
VOWEL = f"{STRICT_VOWEL}|[eēī'’ōā]"

# Match an SRO syllable.
sro_pattern = re.compile(
    rf"""
    ((?:{CONSONANT})w?)-({STRICT_VOWEL}) |

    # Listing all of the syllables.
    # NOTE: List the longer syllable first, since
    # the regular expression will match the first alternative that will
    # work—which must be the longest match!
    wê |wi |wo |wa |wî |wô |wâ                                    |w |
    pê |pi |po |pa |pî |pô |pâ |pwê |pwi |pwo |pwa |pwî |pwô |pwâ |p |
    tê |ti |to |ta |tî |tô |tâ |twê |twi |two |twa |twî |twô |twâ |t |
    kê |ki |ko |ka |kî |kô |kâ |kwê |kwi |kwo |kwa |kwî |kwô |kwâ |k |
    cê |ci |co |ca |cî |cô |câ |cwê |cwi |cwo |cwa |cwî |cwô |cwâ |c |
    sê |si |so |sa |sî |sô |sâ |swê |swi |swo |swa |swî |swô |swâ |s |
    šê |ši |šo |ša |šî |šô |šâ |šwê |šwi |šwo |šwa |šwî |šwô |šwâ |š |
    mê |mi |mo |ma |mî |mô |mâ |mwê |mwi |mwo |mwa |mwî |mwô |mwâ |m |
    nê |ni |no |na |nî |nô |nâ |nwê |nwa           |nwâ           |n |
    yê |yi |yo |ya |yî |yô |yâ |ywê |ywi |ywo |ywa |ywî |ywô |ywâ |y |
    h|l|r|
    ê|i|î|o|ô|a|â|
    -
""",
    re.VERBOSE,
)

# Arok gave me a handout; not sure where to find it on the internet...
WORD_INITIAL = r"""
    # "Onset Clusters
    [ptkcsš]w |         # CwV
    [ptkcsšhmnwy] |     # CV
                        # V
"""

WORD_MEDIAL = r"""
    h[ptkcsš]w? |       # -hC(w)-
    š[ptkc]w? |         # -šC(w)-
    skw? |              # -sC(w)-
    mpw? |              # -mC(w)-
    n[tkcsš]w? |        # -nC(w)-
    [ptkcsšhmn]w? |     # -C(w)-
    [yw]                # -C-
"""

WORD_FINAL = r"""
    [ptkcswy] |  # -C
    h[ptkcsš]? | # -hC
    š[ptkc]? |   # -šC
    mp? |        # -mC
    n[tkcsš]? |  # -nC
                 # - (open syllable)
"""

# NOTE: VOWEL is defined way near the top of the file.

CODA = WORD_FINAL

MORPHEME = rf"""
    (?:{WORD_INITIAL}) (?:{VOWEL})
        (?: (?:{WORD_MEDIAL}) (?:{VOWEL}) )*
    (?:{WORD_FINAL})
"""

# TODO: DRY these up!
# TODO: I can use negative lookbehind now!
BEGIN_WORD = r"""
(?:
        ^  # Either the start of a string; or,
        |  # at the edge of "letters".
        ([^a-zšêîôâēī'’ōā])
)
"""
END_WORD = r"""
(?:
        (?=[^a-zšêioaîôâeēī'’ōā]) |  # edge of letters
        $ # end of string
)
"""

WORD = rf"""
    # CODA before the hyphen to account for Sandhi.
    # It's possible to accept TWO codas using this formulation, but
    # I think that loss of precision is okay.
    {BEGIN_WORD} ({MORPHEME} (?: (?:{CODA})?-{MORPHEME})*) {END_WORD}
"""
word_pattern = re.compile(WORD, re.IGNORECASE | re.VERBOSE)

# This regex prevents matching EVERY period, instead only matching periods
# after Cree words, or, as an exception, as the only item in a string.
full_stop_pattern = re.compile(
    r"""
    ([\u1400-\u167F])[.] |  # Match a full-stop after syllabics
    ^[.]$                   # or match as the only item.
""",
    re.VERBOSE,
)

# For use when converting SYLLABIC + FINAL MIDDLE DOT into the syllabic
# with a 'w'
SYLLABIC_WITH_DOT = {
    "ᐁ": "ᐍ",
    "ᐃ": "ᐏ",
    "ᐄ": "ᐑ",
    "ᐅ": "ᐓ",
    "ᐆ": "ᐕ",
    "ᐊ": "ᐘ",
    "ᐋ": "ᐚ",
    "ᐯ": "ᐻ",
    "ᐱ": "ᐽ",
    "ᐲ": "ᐿ",
    "ᐳ": "ᑁ",
    "ᐴ": "ᑃ",
    "ᐸ": "ᑅ",
    "ᐹ": "ᑇ",
    "ᑌ": "ᑘ",
    "ᑎ": "ᑚ",
    "ᑏ": "ᑜ",
    "ᑐ": "ᑞ",
    "ᑑ": "ᑠ",
    "ᑕ": "ᑢ",
    "ᑖ": "ᑤ",
    "ᑫ": "ᑵ",
    "ᑭ": "ᑷ",
    "ᑮ": "ᑹ",
    "ᑯ": "ᑻ",
    "ᑰ": "ᑽ",
    "ᑲ": "ᑿ",
    "ᑳ": "ᒁ",
    "ᒉ": "ᒓ",
    "ᒋ": "ᒕ",
    "ᒌ": "ᒗ",
    "ᒍ": "ᒙ",
    "ᒎ": "ᒛ",
    "ᒐ": "ᒝ",
    "ᒑ": "ᒟ",
    "ᒣ": "ᒭ",
    "ᒥ": "ᒯ",
    "ᒦ": "ᒱ",
    "ᒧ": "ᒳ",
    "ᒨ": "ᒵ",
    "ᒪ": "ᒷ",
    "ᒫ": "ᒹ",
    "ᓀ": "ᓊ",
    "ᓇ": "ᓌ",
    "ᓈ": "ᓎ",
    "ᓭ": "ᓷ",
    "ᓯ": "ᓹ",
    "ᓰ": "ᓻ",
    "ᓱ": "ᓽ",
    "ᓲ": "ᓿ",
    "ᓴ": "ᔁ",
    "ᓵ": "ᔃ",
    "ᔐ": "ᔘ",
    "ᔑ": "ᔚ",
    "ᔒ": "ᔜ",
    "ᔓ": "ᔞ",
    "ᔔ": "ᔠ",
    "ᔕ": "ᔢ",
    "ᔖ": "ᔤ",
    "ᔦ": "ᔰ",
    "ᔨ": "ᔲ",
    "ᔩ": "ᔴ",
    "ᔪ": "ᔶ",
    "ᔫ": "ᔸ",
    "ᔭ": "ᔺ",
    "ᔮ": "ᔼ",
}


final_dot_pattern = re.compile(
    r"([{without_dot}])ᐧ".format(without_dot="".join(SYLLABIC_WITH_DOT.keys()))
)


def print_javascript_regexp(name: str, python_regex: re.Pattern, flags="", indent="  "):
    # The variable declaration first
    print(f"{indent}const {name} = ", end="")

    if python_regex.flags & re.VERBOSE:
        # Remove comments and whitespace in verbose regexps.
        parts = []
        for line in python_regex.pattern.split("\n"):
            regex, _hash, _comment = line.partition("#")
            parts.extend(regex.split())
    else:
        parts = [python_regex.pattern]

    # Figure out the JavaScript compatible flags.
    if python_regex.flags & re.IGNORECASE:
        flags += "i"

    parts = [uniescape(part) for part in parts]

    # Print the regex!
    print("/", *parts, "/", flags, sep="")


def uniescape(text: str) -> str:
    """
    Escapes all non-ASCII printable characters with JavaScript Unicode escapes.
    """

    def escape(match):
        character = match.group(0)
        assert len(character) == 1
        code_point = ord(character)
        assert code_point <= 0xFFFF
        return f"\\u{code_point:04X}"

    return re.sub("[^\u0020-\u007f]", escape, text)


if __name__ == "__main__":
    print_javascript_regexp("sroPattern", sro_pattern)
    print_javascript_regexp("wordPattern", word_pattern, flags="g")
    print_javascript_regexp("fullStopPattern", full_stop_pattern, flags="g")
    print_javascript_regexp("finalDotPattern", final_dot_pattern, flags="g")
