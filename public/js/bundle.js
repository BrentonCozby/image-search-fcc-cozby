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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvanMvbWFpbi5qcyIsInB1YmxpYy9qcy9wYXJ0aWFscy9mb3JtLmpzIiwicHVibGljL2pzL3BhcnRpYWxzL25hdmJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsRUFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFXO0FBQ3pCLHFCQUFPLElBQVA7QUFDQSxtQkFBSyxJQUFMO0FBQ0gsQ0FIRDs7Ozs7QUNIQSxJQUFNLFVBQVUsRUFBRSxVQUFGLENBQWhCO0FBQ0EsSUFBTSxXQUFXLEVBQUUsU0FBRixFQUNaLEdBRFksQ0FDUixrQkFEUSxFQUVaLEdBRlksQ0FFUixtQkFGUSxFQUdaLEdBSFksQ0FHUixxQkFIUSxFQUlaLEdBSlksQ0FJUixxQkFKUSxFQUtaLEdBTFksQ0FLUiw4QkFMUSxFQU1aLEdBTlksQ0FNUiwwQkFOUSxFQU9aLEdBUFksQ0FPUixrQkFQUSxDQUFqQjs7QUFTQSxJQUFNLGtCQUFrQixDQUNwQixDQUFDLFNBQUQsRUFBWSxRQUFaLENBRG9CLEVBRXBCLENBQUMsNkJBQUQsRUFBZ0MsU0FBaEMsQ0FGb0IsRUFHcEIsQ0FBQyw2QkFBRCxFQUFnQyxTQUFoQyxDQUhvQixFQUlwQixDQUFDLHNDQUFELEVBQXlDLGtCQUF6QyxDQUpvQixFQUtwQixDQUFDLGtDQUFELEVBQXFDLGNBQXJDLENBTG9CLEVBTXBCLENBQUMsMEJBQUQsRUFBNkIsTUFBN0IsQ0FOb0IsQ0FBeEI7O0FBU0EsU0FBUyxXQUFULENBQXFCLGFBQXJCLEVBQW9DLElBQXBDLEVBQTBDLE9BQTFDLEVBQW1EO0FBQy9DLFFBQUksU0FBUyxTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBYjtBQUNBLFdBQU8sWUFBUCxDQUFvQixNQUFwQixFQUE0QixJQUE1QjtBQUNBLFdBQU8sWUFBUCxDQUFvQixRQUFwQixFQUE4QixRQUE5QjtBQUNB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VEQsRUFVQyxJQVZELENBVU0sZUFBTztBQUNULG9CQUFRLEdBQVIsQ0FBWSxHQUFaO0FBQ0gsU0FaRDtBQWFIO0FBcERlLENBQXBCOztBQXVEQSxPQUFPLE9BQVAsR0FBaUIsV0FBakI7Ozs7O0FDeEZBLE9BQU8sT0FBUCxHQUFpQjtBQUNiLFVBQU0sZ0JBQVc7QUFDYixVQUFFLGtCQUFGLEVBQXNCLE9BQXRCO0FBQ0g7QUFIWSxDQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgbmF2YmFyIGZyb20gJy4vcGFydGlhbHMvbmF2YmFyJztcbmltcG9ydCBmb3JtIGZyb20gJy4vcGFydGlhbHMvZm9ybSc7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIG5hdmJhci5pbml0KCk7XG4gICAgZm9ybS5pbml0KCk7XG59KTtcbiIsImNvbnN0ICRhcGlVcmwgPSAkKCcjYXBpLXVybCcpO1xuY29uc3QgJG9wdGlvbnMgPSAkKCcjc2VhcmNoJylcbiAgICAuYWRkKCcjZGF0ZVJlc3RyaWN0TnVtJylcbiAgICAuYWRkKCcjZGF0ZVJlc3RyaWN0VHlwZScpXG4gICAgLmFkZCgnaW5wdXRbbmFtZT1pbWdTaXplXScpXG4gICAgLmFkZCgnaW5wdXRbbmFtZT1pbWdUeXBlXScpXG4gICAgLmFkZCgnaW5wdXRbbmFtZT1pbWdEb21pbmFudENvbG9yXScpXG4gICAgLmFkZCgnaW5wdXRbbmFtZT1pbWdDb2xvclR5cGVdJylcbiAgICAuYWRkKCdpbnB1dFtuYW1lPXNhZmVdJyk7XG5cbmNvbnN0IG9wdGlvblNlbGVjdG9ycyA9IFtcbiAgICBbJyNzZWFyY2gnLCAnc2VhcmNoJ10sXG4gICAgWydpbnB1dFtuYW1lPWltZ1NpemVdOmNoZWNrZWQnLCAnaW1nU2l6ZSddLFxuICAgIFsnaW5wdXRbbmFtZT1pbWdUeXBlXTpjaGVja2VkJywgJ2ltZ1R5cGUnXSxcbiAgICBbJ2lucHV0W25hbWU9aW1nRG9taW5hbnRDb2xvcl06Y2hlY2tlZCcsICdpbWdEb21pbmFudENvbG9yJ10sXG4gICAgWydpbnB1dFtuYW1lPWltZ0NvbG9yVHlwZV06Y2hlY2tlZCcsICdpbWdDb2xvclR5cGUnXSxcbiAgICBbJ2lucHV0W25hbWU9c2FmZV06Y2hlY2tlZCcsICdzYWZlJ11cbl07XG5cbmZ1bmN0aW9uIGNyZWF0ZUltYWdlKHRodW1ibmFpbExpbmssIGxpbmssIHNuaXBwZXQpIHtcbiAgICB2YXIgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGFuY2hvci5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBsaW5rKTtcbiAgICBhbmNob3Iuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCAnX2JsYW5rJyk7XG4gICAgYW5jaG9yLnNldEF0dHJpYnV0ZSgncmVsJywgJ25vb3BlbmVyJyk7XG4gICAgdmFyIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHRodW1ibmFpbExpbmspO1xuICAgIGltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIHNuaXBwZXQpO1xuICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgc25pcHBldCk7XG4gICAgaW1nLmNsYXNzTmFtZSArPSAnaW1hZ2UnO1xuICAgIGFuY2hvci5hcHBlbmRDaGlsZChpbWcpO1xuICAgIHJldHVybiBhbmNob3I7XG59XG5cbmNvbnN0IGZvcm1NZXRob2RzID0ge1xuICAgICRpbWFnZXNNb2RhbDogbnVsbCxcbiAgICAkbW9kYWxIZWFkZXI6IG51bGwsXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJ3NlbGVjdCcpLm1hdGVyaWFsX3NlbGVjdCgpO1xuICAgICAgICAkKCcubW9kYWwnKS5tb2RhbCgpO1xuICAgICAgICBmb3JtTWV0aG9kcy4kaW1hZ2VzTW9kYWwgPSAkKCcjaW1hZ2VzLW1vZGFsJyk7XG4gICAgICAgIGZvcm1NZXRob2RzLiRtb2RhbEhlYWRlciA9ICQoJyNtb2RhbC1oZWFkZXInKTtcbiAgICAgICAgJG9wdGlvbnMub24oJ2NoYW5nZScsIGZvcm1NZXRob2RzLmJ1aWxkVXJsKTtcbiAgICAgICAgJCgnI3Jlc2V0JykuY2xpY2soZm9ybU1ldGhvZHMucmVzZXRGb3JtKTtcbiAgICAgICAgJCgnI2dldC1pbWFnZXMnKS5jbGljayhmb3JtTWV0aG9kcy5nZXRJbWFnZXMpO1xuICAgIH0sXG4gICAgYnVpbGRVcmw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdXJsSFRNTCA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnL2FwaT8nO1xuICAgICAgICBjb25zdCBkck51bSA9ICQoJyNkYXRlUmVzdHJpY3ROdW0nKS52YWwoKTtcbiAgICAgICAgY29uc3QgZHJUeXBlID0gJCgnI2RhdGVSZXN0cmljdFR5cGUnKS52YWwoKTtcbiAgICAgICAgb3B0aW9uU2VsZWN0b3JzLmZvckVhY2goc2VsZWN0b3IgPT4ge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gJChzZWxlY3RvclswXSkudmFsKCk7XG4gICAgICAgICAgICB2YXIgcGFyYW0gPSBzZWxlY3RvclsxXTtcbiAgICAgICAgICAgIGlmKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdXJsSFRNTCArPSBgJHtwYXJhbX09JHt2YWx1ZX0mYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmKGRyTnVtICYmIGRyVHlwZSkge1xuICAgICAgICAgICAgdXJsSFRNTCArPSBgZGF0ZVJlc3RyaWN0PSR7ZHJUeXBlfVske2RyTnVtfV0mYDtcbiAgICAgICAgfVxuICAgICAgICAkYXBpVXJsLmh0bWwodXJsSFRNTCArICdzdGFydD0xJyk7XG4gICAgICAgICRhcGlVcmwuYXR0cignaHJlZicsIHVybEhUTUwgKyAnc3RhcnQ9MScpO1xuICAgIH0sXG4gICAgcmVzZXRGb3JtOiBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI3NlYXJjaCcpLnZhbCgnJyk7XG4gICAgICAgICQoJyNkYXRlUmVzdHJpY3ROdW0nKS52YWwoJycpO1xuICAgICAgICAkKCdpbnB1dCcpLmF0dHIoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICRhcGlVcmwuaHRtbCh3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy9hcGk/c2VhcmNoPWdydW1weWNhdCZzdGFydD0xJyk7XG4gICAgfSxcbiAgICBnZXRJbWFnZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcjaW1hZ2VzLWNvbnRhaW5lcicpLmVtcHR5KCk7XG4gICAgICAgIGZvcm1NZXRob2RzLiRpbWFnZXNNb2RhbC5tb2RhbCgnb3BlbicpO1xuICAgICAgICBmb3JtTWV0aG9kcy4kbW9kYWxIZWFkZXIuaHRtbCggJCgnI3NlYXJjaCcpLnZhbCgpID09PSAnJyA/ICdHcnVtcHkgQ2F0JyA6ICQoJyNzZWFyY2gnKS52YWwoKSApO1xuICAgICAgICAkLmdldCgkKCcjYXBpLXVybCcpLmh0bWwoKSlcbiAgICAgICAgLmRvbmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgdmFyIGltYWdlc0FycmF5ID0gW107XG4gICAgICAgICAgICBkYXRhLmZvckVhY2goaW1hZ2UgPT4ge1xuICAgICAgICAgICAgICAgIGltYWdlc0FycmF5LnB1c2goY3JlYXRlSW1hZ2UoaW1hZ2UudGh1bWJuYWlsLCBpbWFnZS5saW5rLCBpbWFnZS5zbmlwcGV0KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoJyNpbWFnZXMtY29udGFpbmVyJykuYXBwZW5kKGltYWdlc0FycmF5KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZm9ybU1ldGhvZHM7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmJ1dHRvbi1jb2xsYXBzZScpLnNpZGVOYXYoKTtcbiAgICB9XG59O1xuIl19
