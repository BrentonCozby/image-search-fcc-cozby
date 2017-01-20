const $apiUrl = $('#api-url');
const $options = $('#dateRestrictNum')
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

function createImage(thumbnailLink, link, snippet) {
    var anchor = document.createElement('a');
    anchor.setAttribute('href', link);
    anchor.setAttribute('target', '_blank');
    anchor.setAttribute('rel', 'noopener');
    var img = document.createElement('img');
    img.setAttribute('src', thumbnailLink);
    img.setAttribute('alt', snippet);
    img.setAttribute('title', snippet);
    img.className += 'image';
    anchor.appendChild(img);
    return anchor;
}

const formMethods = {
    $imagesModal: null,
    $modalHeader: null,
    init: function() {
        $apiUrl.html(window.location.origin + '/api?search=grumpycat&start=1');
        $apiUrl.attr('href', window.location.origin + '/api?search=grumpycat&start=1');
        $('select').material_select();
        $('.modal').modal();
        formMethods.$imagesModal = $('#images-modal');
        formMethods.$modalHeader = $('#modal-header');
        $('#search').on('input', formMethods.buildUrl);
        $('#search').on('keypress', e => {
            if(e.keyCode === 13) {
                formMethods.getImages();
            }
        });
        $options.on('change', formMethods.buildUrl);
        $('#reset').click(formMethods.resetForm);
        $('#get-images').click(formMethods.getImages);
    },
    buildUrl: function() {
        var urlHTML = window.location.origin + '/api?';
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
        $apiUrl.html(urlHTML + 'start=1');
        $apiUrl.attr('href', urlHTML + 'start=1');
    },
    resetForm: function() {
        $('#dateRestrictNum').val('');
        $('input').attr('checked', false);
        $apiUrl.html(window.location.origin + '/api?search=grumpycat&start=1');
    },
    getImages: function() {
        $('#images-container').empty();
        formMethods.$imagesModal.modal('open');
        formMethods.$modalHeader.html( $('#search').val() === '' ? 'Grumpy Cat' : $('#search').val() );
        $.get($('#api-url').html())
        .done(data => {
            data = JSON.parse(data);
            console.log(data);
            var imagesArray = [];
            data.forEach(image => {
                imagesArray.push(createImage(image.thumbnail, image.link, image.snippet));
            });
            $('#images-container').append(imagesArray);
        })
        .fail(err => {
            console.log(err);
        });
    }
};

module.exports = formMethods;
