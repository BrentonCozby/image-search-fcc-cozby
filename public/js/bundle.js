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
        $options.on('change', formMethods.buildUrl);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvanMvbWFpbi5qcyIsInB1YmxpYy9qcy9wYXJ0aWFscy9mb3JtLmpzIiwicHVibGljL2pzL3BhcnRpYWxzL25hdmJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsRUFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFXO0FBQ3pCLHFCQUFPLElBQVA7QUFDQSxtQkFBSyxJQUFMO0FBQ0gsQ0FIRDs7Ozs7QUNIQSxJQUFNLFVBQVUsRUFBRSxVQUFGLENBQWhCO0FBQ0EsSUFBTSxXQUFXLEVBQUUsU0FBRixFQUNaLEdBRFksQ0FDUixrQkFEUSxFQUVaLEdBRlksQ0FFUixtQkFGUSxFQUdaLEdBSFksQ0FHUixxQkFIUSxFQUlaLEdBSlksQ0FJUixxQkFKUSxFQUtaLEdBTFksQ0FLUiw4QkFMUSxFQU1aLEdBTlksQ0FNUiwwQkFOUSxFQU9aLEdBUFksQ0FPUixrQkFQUSxDQUFqQjs7QUFTQSxJQUFNLGtCQUFrQixDQUNwQixDQUFDLFNBQUQsRUFBWSxRQUFaLENBRG9CLEVBRXBCLENBQUMsNkJBQUQsRUFBZ0MsU0FBaEMsQ0FGb0IsRUFHcEIsQ0FBQyw2QkFBRCxFQUFnQyxTQUFoQyxDQUhvQixFQUlwQixDQUFDLHNDQUFELEVBQXlDLGtCQUF6QyxDQUpvQixFQUtwQixDQUFDLGtDQUFELEVBQXFDLGNBQXJDLENBTG9CLEVBTXBCLENBQUMsMEJBQUQsRUFBNkIsTUFBN0IsQ0FOb0IsQ0FBeEI7O0FBU0EsU0FBUyxXQUFULENBQXFCLGFBQXJCLEVBQW9DLElBQXBDLEVBQTBDLE9BQTFDLEVBQW1EO0FBQy9DLFFBQUksU0FBUyxTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBYjtBQUNBLFdBQU8sWUFBUCxDQUFvQixNQUFwQixFQUE0QixJQUE1QjtBQUNBLFdBQU8sWUFBUCxDQUFvQixRQUFwQixFQUE4QixRQUE5QjtBQUNB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QUFaLENBQWlCLFlBQVksTUFBTSxTQUFsQixFQUE2QixNQUFNLElBQW5DLEVBQXlDLE1BQU0sT0FBL0MsQ0FBakI7QUFDSCxhQUZEO0FBR0EsY0FBRSxtQkFBRixFQUF1QixNQUF2QixDQUE4QixXQUE5QjtBQUNILFNBVEQsRUFVQyxJQVZELENBVU0sZUFBTztBQUNULG9CQUFRLEdBQVIsQ0FBWSxHQUFaO0FBQ0gsU0FaRDtBQWFIO0FBdERlLENBQXBCOztBQXlEQSxPQUFPLE9BQVAsR0FBaUIsV0FBakI7Ozs7O0FDMUZBLE9BQU8sT0FBUCxHQUFpQjtBQUNiLFVBQU0sZ0JBQVc7QUFDYixVQUFFLGtCQUFGLEVBQXNCLE9BQXRCO0FBQ0g7QUFIWSxDQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgbmF2YmFyIGZyb20gJy4vcGFydGlhbHMvbmF2YmFyJztcbmltcG9ydCBmb3JtIGZyb20gJy4vcGFydGlhbHMvZm9ybSc7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIG5hdmJhci5pbml0KCk7XG4gICAgZm9ybS5pbml0KCk7XG59KTtcbiIsImNvbnN0ICRhcGlVcmwgPSAkKCcjYXBpLXVybCcpO1xuY29uc3QgJG9wdGlvbnMgPSAkKCcjc2VhcmNoJylcbiAgICAuYWRkKCcjZGF0ZVJlc3RyaWN0TnVtJylcbiAgICAuYWRkKCcjZGF0ZVJlc3RyaWN0VHlwZScpXG4gICAgLmFkZCgnaW5wdXRbbmFtZT1pbWdTaXplXScpXG4gICAgLmFkZCgnaW5wdXRbbmFtZT1pbWdUeXBlXScpXG4gICAgLmFkZCgnaW5wdXRbbmFtZT1pbWdEb21pbmFudENvbG9yXScpXG4gICAgLmFkZCgnaW5wdXRbbmFtZT1pbWdDb2xvclR5cGVdJylcbiAgICAuYWRkKCdpbnB1dFtuYW1lPXNhZmVdJyk7XG5cbmNvbnN0IG9wdGlvblNlbGVjdG9ycyA9IFtcbiAgICBbJyNzZWFyY2gnLCAnc2VhcmNoJ10sXG4gICAgWydpbnB1dFtuYW1lPWltZ1NpemVdOmNoZWNrZWQnLCAnaW1nU2l6ZSddLFxuICAgIFsnaW5wdXRbbmFtZT1pbWdUeXBlXTpjaGVja2VkJywgJ2ltZ1R5cGUnXSxcbiAgICBbJ2lucHV0W25hbWU9aW1nRG9taW5hbnRDb2xvcl06Y2hlY2tlZCcsICdpbWdEb21pbmFudENvbG9yJ10sXG4gICAgWydpbnB1dFtuYW1lPWltZ0NvbG9yVHlwZV06Y2hlY2tlZCcsICdpbWdDb2xvclR5cGUnXSxcbiAgICBbJ2lucHV0W25hbWU9c2FmZV06Y2hlY2tlZCcsICdzYWZlJ11cbl07XG5cbmZ1bmN0aW9uIGNyZWF0ZUltYWdlKHRodW1ibmFpbExpbmssIGxpbmssIHNuaXBwZXQpIHtcbiAgICB2YXIgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGFuY2hvci5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBsaW5rKTtcbiAgICBhbmNob3Iuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCAnX2JsYW5rJyk7XG4gICAgYW5jaG9yLnNldEF0dHJpYnV0ZSgncmVsJywgJ25vb3BlbmVyJyk7XG4gICAgdmFyIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHRodW1ibmFpbExpbmspO1xuICAgIGltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIHNuaXBwZXQpO1xuICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgc25pcHBldCk7XG4gICAgaW1nLmNsYXNzTmFtZSArPSAnaW1hZ2UnO1xuICAgIGFuY2hvci5hcHBlbmRDaGlsZChpbWcpO1xuICAgIHJldHVybiBhbmNob3I7XG59XG5cbmNvbnN0IGZvcm1NZXRob2RzID0ge1xuICAgICRpbWFnZXNNb2RhbDogbnVsbCxcbiAgICAkbW9kYWxIZWFkZXI6IG51bGwsXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICRhcGlVcmwuaHRtbCh3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy9hcGk/c2VhcmNoPWdydW1weWNhdCZzdGFydD0xJyk7XG4gICAgICAgICRhcGlVcmwuYXR0cignaHJlZicsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnL2FwaT9zZWFyY2g9Z3J1bXB5Y2F0JnN0YXJ0PTEnKTtcbiAgICAgICAgJCgnc2VsZWN0JykubWF0ZXJpYWxfc2VsZWN0KCk7XG4gICAgICAgICQoJy5tb2RhbCcpLm1vZGFsKCk7XG4gICAgICAgIGZvcm1NZXRob2RzLiRpbWFnZXNNb2RhbCA9ICQoJyNpbWFnZXMtbW9kYWwnKTtcbiAgICAgICAgZm9ybU1ldGhvZHMuJG1vZGFsSGVhZGVyID0gJCgnI21vZGFsLWhlYWRlcicpO1xuICAgICAgICAkb3B0aW9ucy5vbignY2hhbmdlJywgZm9ybU1ldGhvZHMuYnVpbGRVcmwpO1xuICAgICAgICAkKCcjcmVzZXQnKS5jbGljayhmb3JtTWV0aG9kcy5yZXNldEZvcm0pO1xuICAgICAgICAkKCcjZ2V0LWltYWdlcycpLmNsaWNrKGZvcm1NZXRob2RzLmdldEltYWdlcyk7XG4gICAgfSxcbiAgICBidWlsZFVybDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB1cmxIVE1MID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvYXBpPyc7XG4gICAgICAgIGNvbnN0IGRyTnVtID0gJCgnI2RhdGVSZXN0cmljdE51bScpLnZhbCgpO1xuICAgICAgICBjb25zdCBkclR5cGUgPSAkKCcjZGF0ZVJlc3RyaWN0VHlwZScpLnZhbCgpO1xuICAgICAgICBvcHRpb25TZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAkKHNlbGVjdG9yWzBdKS52YWwoKTtcbiAgICAgICAgICAgIHZhciBwYXJhbSA9IHNlbGVjdG9yWzFdO1xuICAgICAgICAgICAgaWYodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB1cmxIVE1MICs9IGAke3BhcmFtfT0ke3ZhbHVlfSZgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYoZHJOdW0gJiYgZHJUeXBlKSB7XG4gICAgICAgICAgICB1cmxIVE1MICs9IGBkYXRlUmVzdHJpY3Q9JHtkclR5cGV9WyR7ZHJOdW19XSZgO1xuICAgICAgICB9XG4gICAgICAgICRhcGlVcmwuaHRtbCh1cmxIVE1MICsgJ3N0YXJ0PTEnKTtcbiAgICAgICAgJGFwaVVybC5hdHRyKCdocmVmJywgdXJsSFRNTCArICdzdGFydD0xJyk7XG4gICAgfSxcbiAgICByZXNldEZvcm06IGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcjc2VhcmNoJykudmFsKCcnKTtcbiAgICAgICAgJCgnI2RhdGVSZXN0cmljdE51bScpLnZhbCgnJyk7XG4gICAgICAgICQoJ2lucHV0JykuYXR0cignY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgJGFwaVVybC5odG1sKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnL2FwaT9zZWFyY2g9Z3J1bXB5Y2F0JnN0YXJ0PTEnKTtcbiAgICB9LFxuICAgIGdldEltYWdlczogZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJyNpbWFnZXMtY29udGFpbmVyJykuZW1wdHkoKTtcbiAgICAgICAgZm9ybU1ldGhvZHMuJGltYWdlc01vZGFsLm1vZGFsKCdvcGVuJyk7XG4gICAgICAgIGZvcm1NZXRob2RzLiRtb2RhbEhlYWRlci5odG1sKCAkKCcjc2VhcmNoJykudmFsKCkgPT09ICcnID8gJ0dydW1weSBDYXQnIDogJCgnI3NlYXJjaCcpLnZhbCgpICk7XG4gICAgICAgICQuZ2V0KCQoJyNhcGktdXJsJykuaHRtbCgpKVxuICAgICAgICAuZG9uZShkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICB2YXIgaW1hZ2VzQXJyYXkgPSBbXTtcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChpbWFnZSA9PiB7XG4gICAgICAgICAgICAgICAgaW1hZ2VzQXJyYXkucHVzaChjcmVhdGVJbWFnZShpbWFnZS50aHVtYm5haWwsIGltYWdlLmxpbmssIGltYWdlLnNuaXBwZXQpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCgnI2ltYWdlcy1jb250YWluZXInKS5hcHBlbmQoaW1hZ2VzQXJyYXkpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmb3JtTWV0aG9kcztcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuYnV0dG9uLWNvbGxhcHNlJykuc2lkZU5hdigpO1xuICAgIH1cbn07XG4iXX0=
