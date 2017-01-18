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
    $imagesModal: null,
    $modalHeader: null,
    init: function() {
        $('select').material_select();
        $('.modal').modal();
        formMethods.$imagesModal = $('#images-modal');
        formMethods.$modalHeader = $('#modal-header');
        $options.on('change', formMethods.buildUrl);
        $('#reset').click(formMethods.resetForm);
        $('#get-images').click(formMethods.getImages);
    },
    buildUrl: function() {
        var urlHTML = '/api?';
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
        $apiUrl.html('/api?search=grumpycat&start=0');
    },
    getImages: function() {
        function Image(thumbnailLink, link, snippet) {
            var img = document.createElement('img');
            img.setAttribute('src', thumbnailLink);
            img.setAttribute('alt', snippet);
            img.setAttribute('title', snippet);
            img.dataset.link = link;
            img.className += 'image z-depth-4';
            return img;
        }
        formMethods.$imagesModal.modal('open');
        formMethods.$modalHeader.html( $('#search').val() === '' ? 'Grumpy Cat' : $('#search').val() );
        $.get($apiUrl.html())
            .done(data => {
                console.log(data);
                // data.toArray(imagesData => {
                //     const $imagesContainer = $('#images-container');
                //     imagesData.forEach(image => {
                //         $imagesContainer.append(new Image(image.thumbnailLink, image.link, image.snippet));
                //     });
                // });
            })
            .fail(err => {
                console.log(err);
            });
    }
};

module.exports = formMethods;
