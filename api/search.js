const googleSearch = require('googleapis').customsearch('v1');

function search(query, callback) {
    const CX = process.env.GOOGLE_SEARCH_CX;
    const API_KEY = process.env.GOOGLE_SEARCH_API_KEY;

    // To edit API settings, go here: https://cse.google.com/manage/all

    // Google's query options found here:
    // https://developers.google.com/custom-search/json-api/v1/reference/cse/list#request
    var options = {
        cx: CX,
        key: API_KEY,
        q: query.search,
        num: 10,
        alt: "json",
        searchType: "image"
    };

    if (query.start) options.start = +query.start;
    if (query.imgSize) options.imgSize = query.imgSize;
    if (query.imgType) options.imgType = query.imgType;
    if (query.imgColorType) options.imgColorType = query.imgColorType;
    if (query.imgDominantColor) options.imgDominantColor = query.imgDominantColor;
    if (query.dateRestrict) options.dateRestrict = query.dateRestrict;
    if (query.safe) options.safe = query.safe;

    googleSearch.cse.list(options, function(err, data) {
        if (err) console.log('An error occured', err);
        callback(err, data);
    });
}

module.exports = search;
