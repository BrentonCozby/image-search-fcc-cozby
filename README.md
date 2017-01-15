# Image Search Abstraction Layer

### Query options:

1. search: a string indicating which images you want to search for

2. start: a number indicating which result number to start at

3. imgSize:
    * "huge"
    * "icon"
    * "large"
    * "medium"
    * "small"
    * "xlarge"
    * "xxlarge"

4. dateRestrict: where d is days, w is weeks, m is months, y is years, and num is number of (days|weeks|months|years) ago
    * d[num]
    * w[num]
    * m[num]
    * y[num]

5. imgColorType:
    * "color"
    * "gray"
    * "mono"

6. imgDominantColor:
    * "black"
    * "blue"
    * "brown"
    * "gray"
    * "green"
    * "pink"
    * "purple"
    * "teal"
    * "white"
    * "yellow"

7. imgType:
    * "clipart":
    * "face"
    * "lineart"
    * "news"
    * "photo"

8. safe:
    * "high": Enables highest level of SafeSearch filtering.
    * "medium": Enables moderate SafeSearch filtering.
    * "off": Disables SafeSearch filtering. (default)
