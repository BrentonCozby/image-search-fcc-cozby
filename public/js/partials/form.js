const $apiUrl = $('#api-url');
const $options = $('#search')
    .add('#dateRestrictNum')
    .add('#dateRestrictType')
    .add('input[name=imgSize]')
    .add('input[name=imgType]')
    .add('input[name=imgDominantColor]')
    .add('input[name=imgColorType]')
    .add('input[name=safe]');

const optionSelectors = [
    ['#search', 'search'],
    ['input[name=imgSize]:checked', 'imgSize'],
    ['input[name=imgType]:checked', 'imgType'],
    ['input[name=imgDominantColor]:checked', 'imgDominantColor'],
    ['input[name=imgColorType]:checked', 'imgColorType'],
    ['input[name=safe]:checked', 'safe']
];

const formMethods = {
    init: function() {
        $('select').material_select();
        $options.on('change', formMethods.buildUrl);
        $('#reset').click(formMethods.resetForm);
        $('#get-images').click(formMethods.getImages);
    },
    buildUrl: function() {
        var urlHTML = 'http://image-search-fcc-cozby.herokuapp.com/api?';
        const drNum = $('#dateRestrictNum').val();
        const drType = $('#dateRestrictType').val();
        optionSelectors.forEach(selector => {
            var value = $(selector[0]).val();
            var param = selector[1];
            if(value) {
                urlHTML += `${param}=${value}&`;
            }
        });
        if(drNum && drType) {
            urlHTML += `dateRestrict=${drType}[${drNum}]&`;
        }
        $apiUrl.html(urlHTML + 'start=0');
        $apiUrl.attr('href', urlHTML + 'start=0');
    },
    resetForm: function() {
        $('#search').val('');
        $('#dateRestrictNum').val('');
        $('input').attr('checked', false);
        $apiUrl.html('http://image-search-fcc-cozby.herokuapp.com/api?search=grumpycat&start=0');
    },
    getImages: function() {
        $.get($apiUrl.html())
            .done(data => {
                data.forEach(image => {
                    console.log(image.link);
                });
            })
            .fail(err => {
                console.log(err);
            });
    }
};

module.exports = formMethods;
