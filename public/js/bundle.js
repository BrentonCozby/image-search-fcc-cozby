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
        var urlHTML = '/api?';
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
        $apiUrl.html(urlHTML + 'start=0');
        $apiUrl.attr('href', urlHTML + 'start=0');
    },
    resetForm: function resetForm() {
        $('#search').val('');
        $('#dateRestrictNum').val('');
        $('input').attr('checked', false);
        $apiUrl.html('/api?search=grumpycat&start=0');
    },
    getImages: function getImages() {
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
        formMethods.$modalHeader.html($('#search').val() === '' ? 'Grumpy Cat' : $('#search').val());
        $.get($apiUrl.html()).done(function (data) {
            console.log(data);
            // data.toArray(imagesData => {
            //     const $imagesContainer = $('#images-container');
            //     imagesData.forEach(image => {
            //         $imagesContainer.append(new Image(image.thumbnailLink, image.link, image.snippet));
            //     });
            // });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvanMvbWFpbi5qcyIsInB1YmxpYy9qcy9wYXJ0aWFscy9mb3JtLmpzIiwicHVibGljL2pzL3BhcnRpYWxzL25hdmJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsRUFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFXO0FBQ3pCLHFCQUFPLElBQVA7QUFDQSxtQkFBSyxJQUFMO0FBQ0gsQ0FIRDs7Ozs7QUNIQSxJQUFNLFVBQVUsRUFBRSxVQUFGLENBQWhCO0FBQ0EsSUFBTSxXQUFXLEVBQUUsU0FBRixFQUNaLEdBRFksQ0FDUixrQkFEUSxFQUVaLEdBRlksQ0FFUixtQkFGUSxFQUdaLEdBSFksQ0FHUixxQkFIUSxFQUlaLEdBSlksQ0FJUixxQkFKUSxFQUtaLEdBTFksQ0FLUiw4QkFMUSxFQU1aLEdBTlksQ0FNUiwwQkFOUSxFQU9aLEdBUFksQ0FPUixrQkFQUSxDQUFqQjs7QUFTQSxJQUFNLGtCQUFrQixDQUNwQixDQUFDLFNBQUQsRUFBWSxRQUFaLENBRG9CLEVBRXBCLENBQUMsNkJBQUQsRUFBZ0MsU0FBaEMsQ0FGb0IsRUFHcEIsQ0FBQyw2QkFBRCxFQUFnQyxTQUFoQyxDQUhvQixFQUlwQixDQUFDLHNDQUFELEVBQXlDLGtCQUF6QyxDQUpvQixFQUtwQixDQUFDLGtDQUFELEVBQXFDLGNBQXJDLENBTG9CLEVBTXBCLENBQUMsMEJBQUQsRUFBNkIsTUFBN0IsQ0FOb0IsQ0FBeEI7O0FBU0EsSUFBTSxjQUFjO0FBQ2hCLGtCQUFjLElBREU7QUFFaEIsa0JBQWMsSUFGRTtBQUdoQixVQUFNLGdCQUFXO0FBQ2IsVUFBRSxRQUFGLEVBQVksZUFBWjtBQUNBLFVBQUUsUUFBRixFQUFZLEtBQVo7QUFDQSxvQkFBWSxZQUFaLEdBQTJCLEVBQUUsZUFBRixDQUEzQjtBQUNBLG9CQUFZLFlBQVosR0FBMkIsRUFBRSxlQUFGLENBQTNCO0FBQ0EsaUJBQVMsRUFBVCxDQUFZLFFBQVosRUFBc0IsWUFBWSxRQUFsQztBQUNBLFVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBWSxTQUE5QjtBQUNBLFVBQUUsYUFBRixFQUFpQixLQUFqQixDQUF1QixZQUFZLFNBQW5DO0FBQ0gsS0FYZTtBQVloQixjQUFVLG9CQUFXO0FBQ2pCLFlBQUksVUFBVSxPQUFkO0FBQ0EsWUFBTSxRQUFRLEVBQUUsa0JBQUYsRUFBc0IsR0FBdEIsRUFBZDtBQUNBLFlBQU0sU0FBUyxFQUFFLG1CQUFGLEVBQXVCLEdBQXZCLEVBQWY7QUFDQSx3QkFBZ0IsT0FBaEIsQ0FBd0Isb0JBQVk7QUFDaEMsZ0JBQUksUUFBUSxFQUFFLFNBQVMsQ0FBVCxDQUFGLEVBQWUsR0FBZixFQUFaO0FBQ0EsZ0JBQUksUUFBUSxTQUFTLENBQVQsQ0FBWjtBQUNBLGdCQUFHLEtBQUgsRUFBVTtBQUNOLDJCQUFjLEtBQWQsU0FBdUIsS0FBdkI7QUFDSDtBQUNKLFNBTkQ7QUFPQSxZQUFHLFNBQVMsTUFBWixFQUFvQjtBQUNoQix5Q0FBMkIsTUFBM0IsU0FBcUMsS0FBckM7QUFDSDtBQUNELGdCQUFRLElBQVIsQ0FBYSxVQUFVLFNBQXZCO0FBQ0EsZ0JBQVEsSUFBUixDQUFhLE1BQWIsRUFBcUIsVUFBVSxTQUEvQjtBQUNILEtBNUJlO0FBNkJoQixlQUFXLHFCQUFXO0FBQ2xCLFVBQUUsU0FBRixFQUFhLEdBQWIsQ0FBaUIsRUFBakI7QUFDQSxVQUFFLGtCQUFGLEVBQXNCLEdBQXRCLENBQTBCLEVBQTFCO0FBQ0EsVUFBRSxPQUFGLEVBQVcsSUFBWCxDQUFnQixTQUFoQixFQUEyQixLQUEzQjtBQUNBLGdCQUFRLElBQVIsQ0FBYSwrQkFBYjtBQUNILEtBbENlO0FBbUNoQixlQUFXLHFCQUFXO0FBQ2xCLGlCQUFTLEtBQVQsQ0FBZSxhQUFmLEVBQThCLElBQTlCLEVBQW9DLE9BQXBDLEVBQTZDO0FBQ3pDLGdCQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVY7QUFDQSxnQkFBSSxZQUFKLENBQWlCLEtBQWpCLEVBQXdCLGFBQXhCO0FBQ0EsZ0JBQUksWUFBSixDQUFpQixLQUFqQixFQUF3QixPQUF4QjtBQUNBLGdCQUFJLFlBQUosQ0FBaUIsT0FBakIsRUFBMEIsT0FBMUI7QUFDQSxnQkFBSSxPQUFKLENBQVksSUFBWixHQUFtQixJQUFuQjtBQUNBLGdCQUFJLFNBQUosSUFBaUIsaUJBQWpCO0FBQ0EsbUJBQU8sR0FBUDtBQUNIO0FBQ0Qsb0JBQVksWUFBWixDQUF5QixLQUF6QixDQUErQixNQUEvQjtBQUNBLG9CQUFZLFlBQVosQ0FBeUIsSUFBekIsQ0FBK0IsRUFBRSxTQUFGLEVBQWEsR0FBYixPQUF1QixFQUF2QixHQUE0QixZQUE1QixHQUEyQyxFQUFFLFNBQUYsRUFBYSxHQUFiLEVBQTFFO0FBQ0EsVUFBRSxHQUFGLENBQU0sUUFBUSxJQUFSLEVBQU4sRUFDSyxJQURMLENBQ1UsZ0JBQVE7QUFDVixvQkFBUSxHQUFSLENBQVksSUFBWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNILFNBVEwsRUFVSyxJQVZMLENBVVUsZUFBTztBQUNULG9CQUFRLEdBQVIsQ0FBWSxHQUFaO0FBQ0gsU0FaTDtBQWFIO0FBNURlLENBQXBCOztBQStEQSxPQUFPLE9BQVAsR0FBaUIsV0FBakI7Ozs7O0FDbEZBLE9BQU8sT0FBUCxHQUFpQjtBQUNiLFVBQU0sZ0JBQVc7QUFDYixVQUFFLGtCQUFGLEVBQXNCLE9BQXRCO0FBQ0g7QUFIWSxDQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgbmF2YmFyIGZyb20gJy4vcGFydGlhbHMvbmF2YmFyJztcbmltcG9ydCBmb3JtIGZyb20gJy4vcGFydGlhbHMvZm9ybSc7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIG5hdmJhci5pbml0KCk7XG4gICAgZm9ybS5pbml0KCk7XG59KTtcbiIsImNvbnN0ICRhcGlVcmwgPSAkKCcjYXBpLXVybCcpO1xuY29uc3QgJG9wdGlvbnMgPSAkKCcjc2VhcmNoJylcbiAgICAuYWRkKCcjZGF0ZVJlc3RyaWN0TnVtJylcbiAgICAuYWRkKCcjZGF0ZVJlc3RyaWN0VHlwZScpXG4gICAgLmFkZCgnaW5wdXRbbmFtZT1pbWdTaXplXScpXG4gICAgLmFkZCgnaW5wdXRbbmFtZT1pbWdUeXBlXScpXG4gICAgLmFkZCgnaW5wdXRbbmFtZT1pbWdEb21pbmFudENvbG9yXScpXG4gICAgLmFkZCgnaW5wdXRbbmFtZT1pbWdDb2xvclR5cGVdJylcbiAgICAuYWRkKCdpbnB1dFtuYW1lPXNhZmVdJyk7XG5cbmNvbnN0IG9wdGlvblNlbGVjdG9ycyA9IFtcbiAgICBbJyNzZWFyY2gnLCAnc2VhcmNoJ10sXG4gICAgWydpbnB1dFtuYW1lPWltZ1NpemVdOmNoZWNrZWQnLCAnaW1nU2l6ZSddLFxuICAgIFsnaW5wdXRbbmFtZT1pbWdUeXBlXTpjaGVja2VkJywgJ2ltZ1R5cGUnXSxcbiAgICBbJ2lucHV0W25hbWU9aW1nRG9taW5hbnRDb2xvcl06Y2hlY2tlZCcsICdpbWdEb21pbmFudENvbG9yJ10sXG4gICAgWydpbnB1dFtuYW1lPWltZ0NvbG9yVHlwZV06Y2hlY2tlZCcsICdpbWdDb2xvclR5cGUnXSxcbiAgICBbJ2lucHV0W25hbWU9c2FmZV06Y2hlY2tlZCcsICdzYWZlJ11cbl07XG5cbmNvbnN0IGZvcm1NZXRob2RzID0ge1xuICAgICRpbWFnZXNNb2RhbDogbnVsbCxcbiAgICAkbW9kYWxIZWFkZXI6IG51bGwsXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJ3NlbGVjdCcpLm1hdGVyaWFsX3NlbGVjdCgpO1xuICAgICAgICAkKCcubW9kYWwnKS5tb2RhbCgpO1xuICAgICAgICBmb3JtTWV0aG9kcy4kaW1hZ2VzTW9kYWwgPSAkKCcjaW1hZ2VzLW1vZGFsJyk7XG4gICAgICAgIGZvcm1NZXRob2RzLiRtb2RhbEhlYWRlciA9ICQoJyNtb2RhbC1oZWFkZXInKTtcbiAgICAgICAgJG9wdGlvbnMub24oJ2NoYW5nZScsIGZvcm1NZXRob2RzLmJ1aWxkVXJsKTtcbiAgICAgICAgJCgnI3Jlc2V0JykuY2xpY2soZm9ybU1ldGhvZHMucmVzZXRGb3JtKTtcbiAgICAgICAgJCgnI2dldC1pbWFnZXMnKS5jbGljayhmb3JtTWV0aG9kcy5nZXRJbWFnZXMpO1xuICAgIH0sXG4gICAgYnVpbGRVcmw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdXJsSFRNTCA9ICcvYXBpPyc7XG4gICAgICAgIGNvbnN0IGRyTnVtID0gJCgnI2RhdGVSZXN0cmljdE51bScpLnZhbCgpO1xuICAgICAgICBjb25zdCBkclR5cGUgPSAkKCcjZGF0ZVJlc3RyaWN0VHlwZScpLnZhbCgpO1xuICAgICAgICBvcHRpb25TZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAkKHNlbGVjdG9yWzBdKS52YWwoKTtcbiAgICAgICAgICAgIHZhciBwYXJhbSA9IHNlbGVjdG9yWzFdO1xuICAgICAgICAgICAgaWYodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB1cmxIVE1MICs9IGAke3BhcmFtfT0ke3ZhbHVlfSZgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYoZHJOdW0gJiYgZHJUeXBlKSB7XG4gICAgICAgICAgICB1cmxIVE1MICs9IGBkYXRlUmVzdHJpY3Q9JHtkclR5cGV9WyR7ZHJOdW19XSZgO1xuICAgICAgICB9XG4gICAgICAgICRhcGlVcmwuaHRtbCh1cmxIVE1MICsgJ3N0YXJ0PTAnKTtcbiAgICAgICAgJGFwaVVybC5hdHRyKCdocmVmJywgdXJsSFRNTCArICdzdGFydD0wJyk7XG4gICAgfSxcbiAgICByZXNldEZvcm06IGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcjc2VhcmNoJykudmFsKCcnKTtcbiAgICAgICAgJCgnI2RhdGVSZXN0cmljdE51bScpLnZhbCgnJyk7XG4gICAgICAgICQoJ2lucHV0JykuYXR0cignY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgJGFwaVVybC5odG1sKCcvYXBpP3NlYXJjaD1ncnVtcHljYXQmc3RhcnQ9MCcpO1xuICAgIH0sXG4gICAgZ2V0SW1hZ2VzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gSW1hZ2UodGh1bWJuYWlsTGluaywgbGluaywgc25pcHBldCkge1xuICAgICAgICAgICAgdmFyIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgdGh1bWJuYWlsTGluayk7XG4gICAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdhbHQnLCBzbmlwcGV0KTtcbiAgICAgICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgc25pcHBldCk7XG4gICAgICAgICAgICBpbWcuZGF0YXNldC5saW5rID0gbGluaztcbiAgICAgICAgICAgIGltZy5jbGFzc05hbWUgKz0gJ2ltYWdlIHotZGVwdGgtNCc7XG4gICAgICAgICAgICByZXR1cm4gaW1nO1xuICAgICAgICB9XG4gICAgICAgIGZvcm1NZXRob2RzLiRpbWFnZXNNb2RhbC5tb2RhbCgnb3BlbicpO1xuICAgICAgICBmb3JtTWV0aG9kcy4kbW9kYWxIZWFkZXIuaHRtbCggJCgnI3NlYXJjaCcpLnZhbCgpID09PSAnJyA/ICdHcnVtcHkgQ2F0JyA6ICQoJyNzZWFyY2gnKS52YWwoKSApO1xuICAgICAgICAkLmdldCgkYXBpVXJsLmh0bWwoKSlcbiAgICAgICAgICAgIC5kb25lKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIC8vIGRhdGEudG9BcnJheShpbWFnZXNEYXRhID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgY29uc3QgJGltYWdlc0NvbnRhaW5lciA9ICQoJyNpbWFnZXMtY29udGFpbmVyJyk7XG4gICAgICAgICAgICAgICAgLy8gICAgIGltYWdlc0RhdGEuZm9yRWFjaChpbWFnZSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAkaW1hZ2VzQ29udGFpbmVyLmFwcGVuZChuZXcgSW1hZ2UoaW1hZ2UudGh1bWJuYWlsTGluaywgaW1hZ2UubGluaywgaW1hZ2Uuc25pcHBldCkpO1xuICAgICAgICAgICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmFpbChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZvcm1NZXRob2RzO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5idXR0b24tY29sbGFwc2UnKS5zaWRlTmF2KCk7XG4gICAgfVxufTtcbiJdfQ==
