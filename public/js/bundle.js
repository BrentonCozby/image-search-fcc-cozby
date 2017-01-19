(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _navbar = require('./partials/navbar');

var _navbar2 = _interopRequireDefault(_navbar);

var _form = require('./partials/form');

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(document).ready(function () {
    _navbar2.default.init();
    _form2.default.init();
});

},{"./partials/form":2,"./partials/navbar":3}],2:[function(require,module,exports){
'use strict';

var $apiUrl = $('#api-url');
var $options = $('#search').add('#dateRestrictNum').add('#dateRestrictType').add('input[name=imgSize]').add('input[name=imgType]').add('input[name=imgDominantColor]').add('input[name=imgColorType]').add('input[name=safe]');

var optionSelectors = [['#search', 'search'], ['input[name=imgSize]:checked', 'imgSize'], ['input[name=imgType]:checked', 'imgType'], ['input[name=imgDominantColor]:checked', 'imgDominantColor'], ['input[name=imgColorType]:checked', 'imgColorType'], ['input[name=safe]:checked', 'safe']];

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

var formMethods = {
    $imagesModal: null,
    $modalHeader: null,
    init: function init() {
        $apiUrl.html(window.location.origin + '/api?search=grumpycat&start=1');
        $apiUrl.attr('href', window.location.origin + '/api?search=grumpycat&start=1');
        $('select').material_select();
        $('.modal').modal();
        formMethods.$imagesModal = $('#images-modal');
        formMethods.$modalHeader = $('#modal-header');
        $options.on('input', formMethods.buildUrl);
        $('#reset').click(formMethods.resetForm);
        $('#get-images').click(formMethods.getImages);
    },
    buildUrl: function buildUrl() {
        var urlHTML = window.location.origin + '/api?';
        var drNum = $('#dateRestrictNum').val();
        var drType = $('#dateRestrictType').val();
        optionSelectors.forEach(function (selector) {
            var value = $(selector[0]).val();
            var param = selector[1];
            if (value) {
                urlHTML += param + '=' + value + '&';
            }
        });
        if (drNum && drType) {
            urlHTML += 'dateRestrict=' + drType + '[' + drNum + ']&';
        }
        $apiUrl.html(urlHTML + 'start=1');
        $apiUrl.attr('href', urlHTML + 'start=1');
    },
    resetForm: function resetForm() {
        $('#search').val('');
        $('#dateRestrictNum').val('');
        $('input').attr('checked', false);
        $apiUrl.html(window.location.origin + '/api?search=grumpycat&start=1');
    },
    getImages: function getImages() {
        $('#images-container').empty();
        formMethods.$imagesModal.modal('open');
        formMethods.$modalHeader.html($('#search').val() === '' ? 'Grumpy Cat' : $('#search').val());
        $.get($('#api-url').html()).done(function (data) {
            data = JSON.parse(data);
            console.log(data);
            var imagesArray = [];
            data.forEach(function (image) {
                imagesArray.push(createImage(image.thumbnail, image.link, image.snippet));
            });
            $('#images-container').append(imagesArray);
        }).fail(function (err) {
            console.log(err);
        });
    }
};

module.exports = formMethods;

},{}],3:[function(require,module,exports){
'use strict';

module.exports = {
    init: function init() {
        $('.button-collapse').sideNav();
    }
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWNcXGpzXFxtYWluLmpzIiwicHVibGljXFxqc1xccGFydGlhbHNcXGZvcm0uanMiLCJwdWJsaWNcXGpzXFxwYXJ0aWFsc1xcbmF2YmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7Ozs7QUFFQSxFQUFFLFFBQUYsRUFBWSxLQUFaLENBQWtCLFlBQVc7QUFDekIscUJBQU8sSUFBUDtBQUNBLG1CQUFLLElBQUw7QUFDSCxDQUhEOzs7OztBQ0hBLElBQU0sVUFBVSxFQUFFLFVBQUYsQ0FBaEI7QUFDQSxJQUFNLFdBQVcsRUFBRSxTQUFGLEVBQ1osR0FEWSxDQUNSLGtCQURRLEVBRVosR0FGWSxDQUVSLG1CQUZRLEVBR1osR0FIWSxDQUdSLHFCQUhRLEVBSVosR0FKWSxDQUlSLHFCQUpRLEVBS1osR0FMWSxDQUtSLDhCQUxRLEVBTVosR0FOWSxDQU1SLDBCQU5RLEVBT1osR0FQWSxDQU9SLGtCQVBRLENBQWpCOztBQVNBLElBQU0sa0JBQWtCLENBQ3BCLENBQUMsU0FBRCxFQUFZLFFBQVosQ0FEb0IsRUFFcEIsQ0FBQyw2QkFBRCxFQUFnQyxTQUFoQyxDQUZvQixFQUdwQixDQUFDLDZCQUFELEVBQWdDLFNBQWhDLENBSG9CLEVBSXBCLENBQUMsc0NBQUQsRUFBeUMsa0JBQXpDLENBSm9CLEVBS3BCLENBQUMsa0NBQUQsRUFBcUMsY0FBckMsQ0FMb0IsRUFNcEIsQ0FBQywwQkFBRCxFQUE2QixNQUE3QixDQU5vQixDQUF4Qjs7QUFTQSxTQUFTLFdBQVQsQ0FBcUIsYUFBckIsRUFBb0MsSUFBcEMsRUFBMEMsT0FBMUMsRUFBbUQ7QUFDL0MsUUFBSSxTQUFTLFNBQVMsYUFBVCxDQUF1QixHQUF2QixDQUFiO0FBQ0EsV0FBTyxZQUFQLENBQW9CLE1BQXBCLEVBQTRCLElBQTVCO0FBQ0EsV0FBTyxZQUFQLENBQW9CLFFBQXBCLEVBQThCLFFB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LDRCQUFZLElBQVosQ0FBaUIsWUFBWSxNQUFNLFNBQWxCLEVBQTZCLE1BQU0sSUFBbkMsRUFBeUMsTUFBTSxPQUEvQyxDQUFqQjtBQUNILGFBRkQ7QUFHQSxjQUFFLG1CQUFGLEVBQXVCLE1BQXZCLENBQThCLFdBQTlCO0FBQ0gsU0FURCxFQVVDLElBVkQsQ0FVTSxlQUFPO0FBQ1Qsb0JBQVEsR0FBUixDQUFZLEdBQVo7QUFDSCxTQVpEO0FBYUg7QUF0RGUsQ0FBcEI7O0FBeURBLE9BQU8sT0FBUCxHQUFpQixXQUFqQjs7Ozs7QUMxRkEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsVUFBTSxnQkFBVztBQUNiLFVBQUUsa0JBQUYsRUFBc0IsT0FBdEI7QUFDSDtBQUhZLENBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBuYXZiYXIgZnJvbSAnLi9wYXJ0aWFscy9uYXZiYXInO1xyXG5pbXBvcnQgZm9ybSBmcm9tICcuL3BhcnRpYWxzL2Zvcm0nO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICBuYXZiYXIuaW5pdCgpO1xyXG4gICAgZm9ybS5pbml0KCk7XHJcbn0pO1xyXG4iLCJjb25zdCAkYXBpVXJsID0gJCgnI2FwaS11cmwnKTtcclxuY29uc3QgJG9wdGlvbnMgPSAkKCcjc2VhcmNoJylcclxuICAgIC5hZGQoJyNkYXRlUmVzdHJpY3ROdW0nKVxyXG4gICAgLmFkZCgnI2RhdGVSZXN0cmljdFR5cGUnKVxyXG4gICAgLmFkZCgnaW5wdXRbbmFtZT1pbWdTaXplXScpXHJcbiAgICAuYWRkKCdpbnB1dFtuYW1lPWltZ1R5cGVdJylcclxuICAgIC5hZGQoJ2lucHV0W25hbWU9aW1nRG9taW5hbnRDb2xvcl0nKVxyXG4gICAgLmFkZCgnaW5wdXRbbmFtZT1pbWdDb2xvclR5cGVdJylcclxuICAgIC5hZGQoJ2lucHV0W25hbWU9c2FmZV0nKTtcclxuXHJcbmNvbnN0IG9wdGlvblNlbGVjdG9ycyA9IFtcclxuICAgIFsnI3NlYXJjaCcsICdzZWFyY2gnXSxcclxuICAgIFsnaW5wdXRbbmFtZT1pbWdTaXplXTpjaGVja2VkJywgJ2ltZ1NpemUnXSxcclxuICAgIFsnaW5wdXRbbmFtZT1pbWdUeXBlXTpjaGVja2VkJywgJ2ltZ1R5cGUnXSxcclxuICAgIFsnaW5wdXRbbmFtZT1pbWdEb21pbmFudENvbG9yXTpjaGVja2VkJywgJ2ltZ0RvbWluYW50Q29sb3InXSxcclxuICAgIFsnaW5wdXRbbmFtZT1pbWdDb2xvclR5cGVdOmNoZWNrZWQnLCAnaW1nQ29sb3JUeXBlJ10sXHJcbiAgICBbJ2lucHV0W25hbWU9c2FmZV06Y2hlY2tlZCcsICdzYWZlJ11cclxuXTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUltYWdlKHRodW1ibmFpbExpbmssIGxpbmssIHNuaXBwZXQpIHtcclxuICAgIHZhciBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICBhbmNob3Iuc2V0QXR0cmlidXRlKCdocmVmJywgbGluayk7XHJcbiAgICBhbmNob3Iuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCAnX2JsYW5rJyk7XHJcbiAgICBhbmNob3Iuc2V0QXR0cmlidXRlKCdyZWwnLCAnbm9vcGVuZXInKTtcclxuICAgIHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHRodW1ibmFpbExpbmspO1xyXG4gICAgaW1nLnNldEF0dHJpYnV0ZSgnYWx0Jywgc25pcHBldCk7XHJcbiAgICBpbWcuc2V0QXR0cmlidXRlKCd0aXRsZScsIHNuaXBwZXQpO1xyXG4gICAgaW1nLmNsYXNzTmFtZSArPSAnaW1hZ2UnO1xyXG4gICAgYW5jaG9yLmFwcGVuZENoaWxkKGltZyk7XHJcbiAgICByZXR1cm4gYW5jaG9yO1xyXG59XHJcblxyXG5jb25zdCBmb3JtTWV0aG9kcyA9IHtcclxuICAgICRpbWFnZXNNb2RhbDogbnVsbCxcclxuICAgICRtb2RhbEhlYWRlcjogbnVsbCxcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRhcGlVcmwuaHRtbCh3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy9hcGk/c2VhcmNoPWdydW1weWNhdCZzdGFydD0xJyk7XHJcbiAgICAgICAgJGFwaVVybC5hdHRyKCdocmVmJywgd2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvYXBpP3NlYXJjaD1ncnVtcHljYXQmc3RhcnQ9MScpO1xyXG4gICAgICAgICQoJ3NlbGVjdCcpLm1hdGVyaWFsX3NlbGVjdCgpO1xyXG4gICAgICAgICQoJy5tb2RhbCcpLm1vZGFsKCk7XHJcbiAgICAgICAgZm9ybU1ldGhvZHMuJGltYWdlc01vZGFsID0gJCgnI2ltYWdlcy1tb2RhbCcpO1xyXG4gICAgICAgIGZvcm1NZXRob2RzLiRtb2RhbEhlYWRlciA9ICQoJyNtb2RhbC1oZWFkZXInKTtcclxuICAgICAgICAkb3B0aW9ucy5vbignaW5wdXQnLCBmb3JtTWV0aG9kcy5idWlsZFVybCk7XHJcbiAgICAgICAgJCgnI3Jlc2V0JykuY2xpY2soZm9ybU1ldGhvZHMucmVzZXRGb3JtKTtcclxuICAgICAgICAkKCcjZ2V0LWltYWdlcycpLmNsaWNrKGZvcm1NZXRob2RzLmdldEltYWdlcyk7XHJcbiAgICB9LFxyXG4gICAgYnVpbGRVcmw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB1cmxIVE1MID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvYXBpPyc7XHJcbiAgICAgICAgY29uc3QgZHJOdW0gPSAkKCcjZGF0ZVJlc3RyaWN0TnVtJykudmFsKCk7XHJcbiAgICAgICAgY29uc3QgZHJUeXBlID0gJCgnI2RhdGVSZXN0cmljdFR5cGUnKS52YWwoKTtcclxuICAgICAgICBvcHRpb25TZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiB7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9ICQoc2VsZWN0b3JbMF0pLnZhbCgpO1xyXG4gICAgICAgICAgICB2YXIgcGFyYW0gPSBzZWxlY3RvclsxXTtcclxuICAgICAgICAgICAgaWYodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHVybEhUTUwgKz0gYCR7cGFyYW19PSR7dmFsdWV9JmA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZihkck51bSAmJiBkclR5cGUpIHtcclxuICAgICAgICAgICAgdXJsSFRNTCArPSBgZGF0ZVJlc3RyaWN0PSR7ZHJUeXBlfVske2RyTnVtfV0mYDtcclxuICAgICAgICB9XHJcbiAgICAgICAgJGFwaVVybC5odG1sKHVybEhUTUwgKyAnc3RhcnQ9MScpO1xyXG4gICAgICAgICRhcGlVcmwuYXR0cignaHJlZicsIHVybEhUTUwgKyAnc3RhcnQ9MScpO1xyXG4gICAgfSxcclxuICAgIHJlc2V0Rm9ybTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnI3NlYXJjaCcpLnZhbCgnJyk7XHJcbiAgICAgICAgJCgnI2RhdGVSZXN0cmljdE51bScpLnZhbCgnJyk7XHJcbiAgICAgICAgJCgnaW5wdXQnKS5hdHRyKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICRhcGlVcmwuaHRtbCh3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy9hcGk/c2VhcmNoPWdydW1weWNhdCZzdGFydD0xJyk7XHJcbiAgICB9LFxyXG4gICAgZ2V0SW1hZ2VzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcjaW1hZ2VzLWNvbnRhaW5lcicpLmVtcHR5KCk7XHJcbiAgICAgICAgZm9ybU1ldGhvZHMuJGltYWdlc01vZGFsLm1vZGFsKCdvcGVuJyk7XHJcbiAgICAgICAgZm9ybU1ldGhvZHMuJG1vZGFsSGVhZGVyLmh0bWwoICQoJyNzZWFyY2gnKS52YWwoKSA9PT0gJycgPyAnR3J1bXB5IENhdCcgOiAkKCcjc2VhcmNoJykudmFsKCkgKTtcclxuICAgICAgICAkLmdldCgkKCcjYXBpLXVybCcpLmh0bWwoKSlcclxuICAgICAgICAuZG9uZShkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICB2YXIgaW1hZ2VzQXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGltYWdlID0+IHtcclxuICAgICAgICAgICAgICAgIGltYWdlc0FycmF5LnB1c2goY3JlYXRlSW1hZ2UoaW1hZ2UudGh1bWJuYWlsLCBpbWFnZS5saW5rLCBpbWFnZS5zbmlwcGV0KSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkKCcjaW1hZ2VzLWNvbnRhaW5lcicpLmFwcGVuZChpbWFnZXNBcnJheSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChlcnIgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmb3JtTWV0aG9kcztcclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuYnV0dG9uLWNvbGxhcHNlJykuc2lkZU5hdigpO1xyXG4gICAgfVxyXG59O1xyXG4iXX0=
