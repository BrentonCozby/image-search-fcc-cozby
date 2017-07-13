(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */

'use strict';

/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Module exports.
 * @public
 */

module.exports = escapeHtml;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html;
}

},{}],2:[function(require,module,exports){
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

},{"./partials/form":3,"./partials/navbar":4}],3:[function(require,module,exports){
'use strict';

var escape = require('escape-html');

var $apiUrl = $('#api-url');
var rootUrl = '';

var $options = $('#dateRestrictNum').add('#dateRestrictType').add('input[name=imgSize]').add('input[name=imgType]').add('input[name=imgDominantColor]').add('input[name=imgColorType]').add('input[name=safe]');

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
        $apiUrl.html(window.location.origin + (rootUrl + '/api?search=grumpycat&start=1'));
        $apiUrl.attr('href', window.location.origin + (rootUrl + '/api?search=grumpycat&start=1'));
        $('select').material_select();
        $('.modal').modal();
        formMethods.$imagesModal = $('#images-modal');
        formMethods.$modalHeader = $('#modal-header');
        $('#search').on('input', formMethods.buildUrl);
        $('#search').on('keypress', function (e) {
            if (e.keyCode === 13) {
                formMethods.getImages();
            }
        });
        $options.on('change', formMethods.buildUrl);
        $('#reset').click(formMethods.resetForm);
        $('#get-images').click(formMethods.getImages);
    },
    buildUrl: function buildUrl() {
        var urlHTML = window.location.origin + (rootUrl + '/api?');
        var drNum = $('#dateRestrictNum').val();
        var drType = $('#dateRestrictType').val();
        optionSelectors.forEach(function (selector) {
            var value = escape($(selector[0]).val());
            var param = selector[1];

            if (value && value !== 'undefined') {
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
        $('#dateRestrictNum').val('');
        $('input').attr('checked', false);
        $apiUrl.html(window.location.origin + (rootUrl + '/api?search=grumpycat&start=1'));
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

},{"escape-html":1}],4:[function(require,module,exports){
'use strict';

module.exports = {
    init: function init() {
        $('.button-collapse').sideNav();
    }
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZXNjYXBlLWh0bWwvaW5kZXguanMiLCJwdWJsaWMvanMvbWFpbi5qcyIsInB1YmxpYy9qcy9wYXJ0aWFscy9mb3JtLmpzIiwicHVibGljL2pzL3BhcnRpYWxzL25hdmJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDOUVBOzs7O0FBQ0E7Ozs7OztBQUVBLEVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBVztBQUN6QixxQkFBTyxJQUFQO0FBQ0EsbUJBQUssSUFBTDtBQUNILENBSEQ7Ozs7O0FDSEEsSUFBTSxTQUFTLFFBQVEsYUFBUixDQUFmOztBQUVBLElBQU0sVUFBVSxFQUFFLFVBQUYsQ0FBaEI7QUFDQSxJQUFNLFlBQU47O0FBRUEsSUFBTSxXQUFXLEVBQUUsa0JBQUYsRUFDWixHQURZLENBQ1IsbUJBRFEsRUFFWixHQUZZLENBRVIscUJBRlEsRUFHWixHQUhZLENBR1IscUJBSFEsRUFJWixHQUpZLENBSVIsOEJBSlEsRUFL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YixVQUFNLGdCQUFXO0FBQ2IsVUFBRSxrQkFBRixFQUFzQixPQUF0QjtBQUNIO0FBSFksQ0FBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyohXG4gKiBlc2NhcGUtaHRtbFxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxMyBUSiBIb2xvd2F5Y2h1a1xuICogQ29weXJpZ2h0KGMpIDIwMTUgQW5kcmVhcyBMdWJiZVxuICogQ29weXJpZ2h0KGMpIDIwMTUgVGlhbmNoZW5nIFwiVGltb3RoeVwiIEd1XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTW9kdWxlIHZhcmlhYmxlcy5cbiAqIEBwcml2YXRlXG4gKi9cblxudmFyIG1hdGNoSHRtbFJlZ0V4cCA9IC9bXCInJjw+XS87XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKiBAcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBlc2NhcGVIdG1sO1xuXG4vKipcbiAqIEVzY2FwZSBzcGVjaWFsIGNoYXJhY3RlcnMgaW4gdGhlIGdpdmVuIHN0cmluZyBvZiBodG1sLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gZXNjYXBlIGZvciBpbnNlcnRpbmcgaW50byBIVE1MXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKiBAcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZXNjYXBlSHRtbChzdHJpbmcpIHtcbiAgdmFyIHN0ciA9ICcnICsgc3RyaW5nO1xuICB2YXIgbWF0Y2ggPSBtYXRjaEh0bWxSZWdFeHAuZXhlYyhzdHIpO1xuXG4gIGlmICghbWF0Y2gpIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgdmFyIGVzY2FwZTtcbiAgdmFyIGh0bWwgPSAnJztcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxhc3RJbmRleCA9IDA7XG5cbiAgZm9yIChpbmRleCA9IG1hdGNoLmluZGV4OyBpbmRleCA8IHN0ci5sZW5ndGg7IGluZGV4KyspIHtcbiAgICBzd2l0Y2ggKHN0ci5jaGFyQ29kZUF0KGluZGV4KSkge1xuICAgICAgY2FzZSAzNDogLy8gXCJcbiAgICAgICAgZXNjYXBlID0gJyZxdW90Oyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzODogLy8gJlxuICAgICAgICBlc2NhcGUgPSAnJmFtcDsnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6IC8vICdcbiAgICAgICAgZXNjYXBlID0gJyYjMzk7JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDYwOiAvLyA8XG4gICAgICAgIGVzY2FwZSA9ICcmbHQ7JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDYyOiAvLyA+XG4gICAgICAgIGVzY2FwZSA9ICcmZ3Q7JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAobGFzdEluZGV4ICE9PSBpbmRleCkge1xuICAgICAgaHRtbCArPSBzdHIuc3Vic3RyaW5nKGxhc3RJbmRleCwgaW5kZXgpO1xuICAgIH1cblxuICAgIGxhc3RJbmRleCA9IGluZGV4ICsgMTtcbiAgICBodG1sICs9IGVzY2FwZTtcbiAgfVxuXG4gIHJldHVybiBsYXN0SW5kZXggIT09IGluZGV4XG4gICAgPyBodG1sICsgc3RyLnN1YnN0cmluZyhsYXN0SW5kZXgsIGluZGV4KVxuICAgIDogaHRtbDtcbn1cbiIsImltcG9ydCBuYXZiYXIgZnJvbSAnLi9wYXJ0aWFscy9uYXZiYXInO1xuaW1wb3J0IGZvcm0gZnJvbSAnLi9wYXJ0aWFscy9mb3JtJztcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgbmF2YmFyLmluaXQoKTtcbiAgICBmb3JtLmluaXQoKTtcbn0pO1xuIiwiY29uc3QgZXNjYXBlID0gcmVxdWlyZSgnZXNjYXBlLWh0bWwnKVxuXG5jb25zdCAkYXBpVXJsID0gJCgnI2FwaS11cmwnKVxuY29uc3Qgcm9vdFVybCA9IGBgXG5cbmNvbnN0ICRvcHRpb25zID0gJCgnI2RhdGVSZXN0cmljdE51bScpXG4gICAgLmFkZCgnI2RhdGVSZXN0cmljdFR5cGUnKVxuICAgIC5hZGQoJ2lucHV0W25hbWU9aW1nU2l6ZV0nKVxuICAgIC5hZGQoJ2lucHV0W25hbWU9aW1nVHlwZV0nKVxuICAgIC5hZGQoJ2lucHV0W25hbWU9aW1nRG9taW5hbnRDb2xvcl0nKVxuICAgIC5hZGQoJ2lucHV0W25hbWU9aW1nQ29sb3JUeXBlXScpXG4gICAgLmFkZCgnaW5wdXRbbmFtZT1zYWZlXScpXG5cbmNvbnN0IG9wdGlvblNlbGVjdG9ycyA9IFtcbiAgICBbJyNzZWFyY2gnLCAnc2VhcmNoJ10sXG4gICAgWydpbnB1dFtuYW1lPWltZ1NpemVdOmNoZWNrZWQnLCAnaW1nU2l6ZSddLFxuICAgIFsnaW5wdXRbbmFtZT1pbWdUeXBlXTpjaGVja2VkJywgJ2ltZ1R5cGUnXSxcbiAgICBbJ2lucHV0W25hbWU9aW1nRG9taW5hbnRDb2xvcl06Y2hlY2tlZCcsICdpbWdEb21pbmFudENvbG9yJ10sXG4gICAgWydpbnB1dFtuYW1lPWltZ0NvbG9yVHlwZV06Y2hlY2tlZCcsICdpbWdDb2xvclR5cGUnXSxcbiAgICBbJ2lucHV0W25hbWU9c2FmZV06Y2hlY2tlZCcsICdzYWZlJ11cbl1cblxuZnVuY3Rpb24gY3JlYXRlSW1hZ2UodGh1bWJuYWlsTGluaywgbGluaywgc25pcHBldCkge1xuICAgIHZhciBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICBhbmNob3Iuc2V0QXR0cmlidXRlKCdocmVmJywgbGluaylcbiAgICBhbmNob3Iuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCAnX2JsYW5rJylcbiAgICBhbmNob3Iuc2V0QXR0cmlidXRlKCdyZWwnLCAnbm9vcGVuZXInKVxuICAgIHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHRodW1ibmFpbExpbmspXG4gICAgaW1nLnNldEF0dHJpYnV0ZSgnYWx0Jywgc25pcHBldClcbiAgICBpbWcuc2V0QXR0cmlidXRlKCd0aXRsZScsIHNuaXBwZXQpXG4gICAgaW1nLmNsYXNzTmFtZSArPSAnaW1hZ2UnXG4gICAgYW5jaG9yLmFwcGVuZENoaWxkKGltZylcbiAgICByZXR1cm4gYW5jaG9yXG59XG5cbmNvbnN0IGZvcm1NZXRob2RzID0ge1xuICAgICRpbWFnZXNNb2RhbDogbnVsbCxcbiAgICAkbW9kYWxIZWFkZXI6IG51bGwsXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICRhcGlVcmwuaHRtbCh3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgYCR7cm9vdFVybH0vYXBpP3NlYXJjaD1ncnVtcHljYXQmc3RhcnQ9MWApXG4gICAgICAgICRhcGlVcmwuYXR0cignaHJlZicsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyBgJHtyb290VXJsfS9hcGk/c2VhcmNoPWdydW1weWNhdCZzdGFydD0xYClcbiAgICAgICAgJCgnc2VsZWN0JykubWF0ZXJpYWxfc2VsZWN0KClcbiAgICAgICAgJCgnLm1vZGFsJykubW9kYWwoKVxuICAgICAgICBmb3JtTWV0aG9kcy4kaW1hZ2VzTW9kYWwgPSAkKCcjaW1hZ2VzLW1vZGFsJylcbiAgICAgICAgZm9ybU1ldGhvZHMuJG1vZGFsSGVhZGVyID0gJCgnI21vZGFsLWhlYWRlcicpXG4gICAgICAgICQoJyNzZWFyY2gnKS5vbignaW5wdXQnLCBmb3JtTWV0aG9kcy5idWlsZFVybClcbiAgICAgICAgJCgnI3NlYXJjaCcpLm9uKCdrZXlwcmVzcycsIGUgPT4ge1xuICAgICAgICAgICAgaWYoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgICAgIGZvcm1NZXRob2RzLmdldEltYWdlcygpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICRvcHRpb25zLm9uKCdjaGFuZ2UnLCBmb3JtTWV0aG9kcy5idWlsZFVybClcbiAgICAgICAgJCgnI3Jlc2V0JykuY2xpY2soZm9ybU1ldGhvZHMucmVzZXRGb3JtKVxuICAgICAgICAkKCcjZ2V0LWltYWdlcycpLmNsaWNrKGZvcm1NZXRob2RzLmdldEltYWdlcylcbiAgICB9LFxuICAgIGJ1aWxkVXJsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHVybEhUTUwgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgYCR7cm9vdFVybH0vYXBpP2BcbiAgICAgICAgY29uc3QgZHJOdW0gPSAkKCcjZGF0ZVJlc3RyaWN0TnVtJykudmFsKClcbiAgICAgICAgY29uc3QgZHJUeXBlID0gJCgnI2RhdGVSZXN0cmljdFR5cGUnKS52YWwoKVxuICAgICAgICBvcHRpb25TZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBlc2NhcGUoICQoc2VsZWN0b3JbMF0pLnZhbCgpIClcbiAgICAgICAgICAgIHZhciBwYXJhbSA9IHNlbGVjdG9yWzFdXG5cbiAgICAgICAgICAgIGlmKHZhbHVlICYmIHZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHVybEhUTUwgKz0gYCR7cGFyYW19PSR7dmFsdWV9JmBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgaWYoZHJOdW0gJiYgZHJUeXBlKSB7XG4gICAgICAgICAgICB1cmxIVE1MICs9IGBkYXRlUmVzdHJpY3Q9JHtkclR5cGV9WyR7ZHJOdW19XSZgXG4gICAgICAgIH1cbiAgICAgICAgJGFwaVVybC5odG1sKHVybEhUTUwgKyAnc3RhcnQ9MScpXG4gICAgICAgICRhcGlVcmwuYXR0cignaHJlZicsIHVybEhUTUwgKyAnc3RhcnQ9MScpXG4gICAgfSxcbiAgICByZXNldEZvcm06IGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcjZGF0ZVJlc3RyaWN0TnVtJykudmFsKCcnKVxuICAgICAgICAkKCdpbnB1dCcpLmF0dHIoJ2NoZWNrZWQnLCBmYWxzZSlcbiAgICAgICAgJGFwaVVybC5odG1sKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyBgJHtyb290VXJsfS9hcGk/c2VhcmNoPWdydW1weWNhdCZzdGFydD0xYClcbiAgICB9LFxuICAgIGdldEltYWdlczogZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJyNpbWFnZXMtY29udGFpbmVyJykuZW1wdHkoKVxuICAgICAgICBmb3JtTWV0aG9kcy4kaW1hZ2VzTW9kYWwubW9kYWwoJ29wZW4nKVxuICAgICAgICBmb3JtTWV0aG9kcy4kbW9kYWxIZWFkZXIuaHRtbCggJCgnI3NlYXJjaCcpLnZhbCgpID09PSAnJyA/ICdHcnVtcHkgQ2F0JyA6ICQoJyNzZWFyY2gnKS52YWwoKSApXG4gICAgICAgICQuZ2V0KCQoJyNhcGktdXJsJykuaHRtbCgpKVxuICAgICAgICAuZG9uZShkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgICAgdmFyIGltYWdlc0FycmF5ID0gW11cbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChpbWFnZSA9PiB7XG4gICAgICAgICAgICAgICAgaW1hZ2VzQXJyYXkucHVzaChjcmVhdGVJbWFnZShpbWFnZS50aHVtYm5haWwsIGltYWdlLmxpbmssIGltYWdlLnNuaXBwZXQpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICQoJyNpbWFnZXMtY29udGFpbmVyJykuYXBwZW5kKGltYWdlc0FycmF5KVxuICAgICAgICB9KVxuICAgICAgICAuZmFpbChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICB9KVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmb3JtTWV0aG9kc1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5idXR0b24tY29sbGFwc2UnKS5zaWRlTmF2KCk7XG4gICAgfVxufTtcbiJdfQ==
