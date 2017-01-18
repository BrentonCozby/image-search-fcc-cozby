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
        function createImage(thumbnailLink, link, snippet) {
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
            var imagesArray = [];
            data.toArray(function (imagesData) {
                var $imagesContainer = $('#images-container');
                imagesData.forEach(function (image) {
                    imagesArray.push(createImage(image.thumbnailLink, image.link, image.snippet));
                });
                $imagesContainer.append(imagesArray);
            });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvanMvbWFpbi5qcyIsInB1YmxpYy9qcy9wYXJ0aWFscy9mb3JtLmpzIiwicHVibGljL2pzL3BhcnRpYWxzL25hdmJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsRUFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFXO0FBQ3pCLHFCQUFPLElBQVA7QUFDQSxtQkFBSyxJQUFMO0FBQ0gsQ0FIRDs7Ozs7QUNIQSxJQUFNLFVBQVUsRUFBRSxVQUFGLENBQWhCO0FBQ0EsSUFBTSxXQUFXLEVBQUUsU0FBRixFQUNaLEdBRFksQ0FDUixrQkFEUSxFQUVaLEdBRlksQ0FFUixtQkFGUSxFQUdaLEdBSFksQ0FHUixxQkFIUSxFQUlaLEdBSlksQ0FJUixxQkFKUSxFQUtaLEdBTFksQ0FLUiw4QkFMUSxFQU1aLEdBTlksQ0FNUiwwQkFOUSxFQU9aLEdBUFksQ0FPUixrQkFQUSxDQUFqQjs7QUFTQSxJQUFNLGtCQUFrQixDQUNwQixDQUFDLFNBQUQsRUFBWSxRQUFaLENBRG9CLEVBRXBCLENBQUMsNkJBQUQsRUFBZ0MsU0FBaEMsQ0FGb0IsRUFHcEIsQ0FBQyw2QkFBRCxFQUFnQyxTQUFoQyxDQUhvQixFQUlwQixDQUFDLHNDQUFELEVBQXlDLGtCQUF6QyxDQUpvQixFQUtwQixDQUFDLGtDQUFELEVBQXFDLGNBQXJDLENBTG9CLEVBTXBCLENBQUMsMEJBQUQsRUFBNkIsTUFBN0IsQ0FOb0IsQ0FBeEI7O0FBU0EsSUFBTSxjQUFjO0FBQ2hCLGtCQUFjLElBREU7QUFFaEIsa0JBQWMsSUFGRTtBQUdoQixVQUFNLGdCQUFXO0FBQ2IsVUFBRSxRQUFGLEVBQVksZUFBWjtBQUNBLFVBQUUsUUFBRixFQUFZLEtBQVo7QUFDQSxvQkFBWSxZQUFaLEdBQTJCLEVBQUUsZUFBRixDQUEzQjtBQUNBLG9CQUFZLFlBQVosR0FBMkIsRUFBRSxlQUFGLENBQTNCO0FBQ0EsaUJBQVMsRUFBVCxDQUFZLFFBQVosRUFBc0IsWUFBWSxRQUFsQztBQUNBLFVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBWSxTQUE5QjtBQUNBLFVBQUUsYUFBRixFQUFpQixLQUFqQixDQUF1QixZQUFZLFNBQW5DO0FBQ0gsS0FYZTtBQVloQixjQUFVLG9CQUFXO0FBQ2pCLFlBQUksVUFBVSxPQUFkO0FBQ0EsWUFBTSxRQUFRLEVBQUUsa0JBQUYsRUFBc0IsR0FBdEIsRUFBZDtBQUNBLFlBQU0sU0FBUyxFQUFFLG1CQUFGLEVBQXVCLEdBQXZCLEVBQWY7QUFDQSx3QkFBZ0IsT0FBaEIsQ0FBd0Isb0JBQVk7QUFDaEMsZ0JBQUksUUFBUSxFQUFFLFNBQVMsQ0FBVCxDQUFGLEVBQWUsR0FBZixFQUFaO0FBQ0EsZ0JBQUksUUFBUSxTQUFTLENBQVQsQ0FBWjtBQUNBLGdCQUFHLEtBQUgsRUFBVTtBQUNOLDJCQUFjLEtBQWQsU0FBdUIsS0FBdkI7QUFDSDtBQUNKLFNBTkQ7QUFPQSxZQUFHLFNBQVMsTUFBWixFQUFvQjtBQUNoQix5Q0FBMkIsTUFBM0IsU0FBcUMsS0FBckM7QUFDSDtBQUNELGdCQUFRLElBQVIsQ0FBYSxVQUFVLFNBQXZCO0FBQ0EsZ0JBQVEsSUFBUixDQUFhLE1BQWIsRUFBcUIsVUFBVSxTQUEvQjtBQUNILEtBNUJlO0FBNkJoQixlQUFXLHFCQUFXO0FBQ2xCLFVBQUUsU0FBRixFQUFhLEdBQWIsQ0FBaUIsRUFBakI7QUFDQSxVQUFFLGtCQUFGLEVBQXNCLEdBQXRCLENBQTBCLEVBQTFCO0FBQ0EsVUFBRSxPQUFGLEVBQVcsSUFBWCxDQUFnQixTQUFoQixFQUEyQixLQUEzQjtBQUNBLGdCQUFRLElBQVIsQ0FBYSwrQkFBYjtBQUNILEtBbENlO0FBbUNoQixlQUFXLHFCQUFXO0FBQ2xCLGlCQUFTLFdBQVQsQ0FBcUIsYUFBckIsRUFBb0MsSUFBcEMsRUFBMEMsT0FBMUMsRUFBbUQ7QUFDL0MsZ0JBQUksTUFBTSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBVjtBQUNBLGdCQUFJLFlBQUosQ0FBaUIsS0FBakIsRUFBd0IsYUFBeEI7QUFDQSxnQkFBSSxZQUFKLENBQWlCLEtBQWpCLEVBQXdCLE9BQXhCO0FBQ0EsZ0JBQUksWUFBSixDQUFpQixPQUFqQixFQUEwQixPQUExQjtBQUNBLGdCQUFJLE9BQUosQ0FBWSxJQUFaLEdBQW1CLElBQW5CO0FBQ0EsZ0JBQUksU0FBSixJQUFpQixpQkFBakI7QUFDQSxtQkFBTyxHQUFQO0FBQ0g7QUFDRCxvQkFBWSxZQUFaLENBQXlCLEtBQXpCLENBQStCLE1BQS9CO0FBQ0Esb0JBQVksWUFBWixDQUF5QixJQUF6QixDQUErQixFQUFFLFNBQUYsRUFBYSxHQUFiLE9BQXVCLEVBQXZCLEdBQTRCLFlBQTVCLEdBQTJDLEVBQUUsU0FBRixFQUFhLEdBQWIsRUFBMUU7QUFDQSxVQUFFLEdBQUYsQ0FBTSxRQUFRLElBQVIsRUFBTixFQUNDLElBREQsQ0FDTSxnQkFBUTtBQUNWLG9CQUFRLEdBQVIsQ0FBWSxJQUFaO0FBQ0EsZ0JBQUksY0FBYyxFQUFsQjtBQUNBLGlCQUFLLE9BQUwsQ0FBYSxzQkFBYztBQUN2QixvQkFBTSxtQkFBbUIsRUFBRSxtQkFBRixDQUF6QjtBQUNBLDJCQUFXLE9BQVgsQ0FBbUIsaUJBQVM7QUFDeEIsZ0NBQVksSUFBWixDQUFpQixZQUFZLE1BQU0sYUFBbEIsRUFBaUMsTUFBTSxJQUF2QyxFQUE2QyxNQUFNLE9BQW5ELENBQWpCO0FBQ0gsaUJBRkQ7QUFHQSxpQ0FBaUIsTUFBakIsQ0FBd0IsV0FBeEI7QUFDSCxhQU5EO0FBT0gsU0FYRCxFQVlDLElBWkQsQ0FZTSxlQUFPO0FBQ1Qsb0JBQVEsR0FBUixDQUFZLEdBQVo7QUFDSCxTQWREO0FBZUg7QUE5RGUsQ0FBcEI7O0FBaUVBLE9BQU8sT0FBUCxHQUFpQixXQUFqQjs7Ozs7QUNwRkEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsVUFBTSxnQkFBVztBQUNiLFVBQUUsa0JBQUYsRUFBc0IsT0FBdEI7QUFDSDtBQUhZLENBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBuYXZiYXIgZnJvbSAnLi9wYXJ0aWFscy9uYXZiYXInO1xuaW1wb3J0IGZvcm0gZnJvbSAnLi9wYXJ0aWFscy9mb3JtJztcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgbmF2YmFyLmluaXQoKTtcbiAgICBmb3JtLmluaXQoKTtcbn0pO1xuIiwiY29uc3QgJGFwaVVybCA9ICQoJyNhcGktdXJsJyk7XG5jb25zdCAkb3B0aW9ucyA9ICQoJyNzZWFyY2gnKVxuICAgIC5hZGQoJyNkYXRlUmVzdHJpY3ROdW0nKVxuICAgIC5hZGQoJyNkYXRlUmVzdHJpY3RUeXBlJylcbiAgICAuYWRkKCdpbnB1dFtuYW1lPWltZ1NpemVdJylcbiAgICAuYWRkKCdpbnB1dFtuYW1lPWltZ1R5cGVdJylcbiAgICAuYWRkKCdpbnB1dFtuYW1lPWltZ0RvbWluYW50Q29sb3JdJylcbiAgICAuYWRkKCdpbnB1dFtuYW1lPWltZ0NvbG9yVHlwZV0nKVxuICAgIC5hZGQoJ2lucHV0W25hbWU9c2FmZV0nKTtcblxuY29uc3Qgb3B0aW9uU2VsZWN0b3JzID0gW1xuICAgIFsnI3NlYXJjaCcsICdzZWFyY2gnXSxcbiAgICBbJ2lucHV0W25hbWU9aW1nU2l6ZV06Y2hlY2tlZCcsICdpbWdTaXplJ10sXG4gICAgWydpbnB1dFtuYW1lPWltZ1R5cGVdOmNoZWNrZWQnLCAnaW1nVHlwZSddLFxuICAgIFsnaW5wdXRbbmFtZT1pbWdEb21pbmFudENvbG9yXTpjaGVja2VkJywgJ2ltZ0RvbWluYW50Q29sb3InXSxcbiAgICBbJ2lucHV0W25hbWU9aW1nQ29sb3JUeXBlXTpjaGVja2VkJywgJ2ltZ0NvbG9yVHlwZSddLFxuICAgIFsnaW5wdXRbbmFtZT1zYWZlXTpjaGVja2VkJywgJ3NhZmUnXVxuXTtcblxuY29uc3QgZm9ybU1ldGhvZHMgPSB7XG4gICAgJGltYWdlc01vZGFsOiBudWxsLFxuICAgICRtb2RhbEhlYWRlcjogbnVsbCxcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnc2VsZWN0JykubWF0ZXJpYWxfc2VsZWN0KCk7XG4gICAgICAgICQoJy5tb2RhbCcpLm1vZGFsKCk7XG4gICAgICAgIGZvcm1NZXRob2RzLiRpbWFnZXNNb2RhbCA9ICQoJyNpbWFnZXMtbW9kYWwnKTtcbiAgICAgICAgZm9ybU1ldGhvZHMuJG1vZGFsSGVhZGVyID0gJCgnI21vZGFsLWhlYWRlcicpO1xuICAgICAgICAkb3B0aW9ucy5vbignY2hhbmdlJywgZm9ybU1ldGhvZHMuYnVpbGRVcmwpO1xuICAgICAgICAkKCcjcmVzZXQnKS5jbGljayhmb3JtTWV0aG9kcy5yZXNldEZvcm0pO1xuICAgICAgICAkKCcjZ2V0LWltYWdlcycpLmNsaWNrKGZvcm1NZXRob2RzLmdldEltYWdlcyk7XG4gICAgfSxcbiAgICBidWlsZFVybDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB1cmxIVE1MID0gJy9hcGk/JztcbiAgICAgICAgY29uc3QgZHJOdW0gPSAkKCcjZGF0ZVJlc3RyaWN0TnVtJykudmFsKCk7XG4gICAgICAgIGNvbnN0IGRyVHlwZSA9ICQoJyNkYXRlUmVzdHJpY3RUeXBlJykudmFsKCk7XG4gICAgICAgIG9wdGlvblNlbGVjdG9ycy5mb3JFYWNoKHNlbGVjdG9yID0+IHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9ICQoc2VsZWN0b3JbMF0pLnZhbCgpO1xuICAgICAgICAgICAgdmFyIHBhcmFtID0gc2VsZWN0b3JbMV07XG4gICAgICAgICAgICBpZih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHVybEhUTUwgKz0gYCR7cGFyYW19PSR7dmFsdWV9JmA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZihkck51bSAmJiBkclR5cGUpIHtcbiAgICAgICAgICAgIHVybEhUTUwgKz0gYGRhdGVSZXN0cmljdD0ke2RyVHlwZX1bJHtkck51bX1dJmA7XG4gICAgICAgIH1cbiAgICAgICAgJGFwaVVybC5odG1sKHVybEhUTUwgKyAnc3RhcnQ9MCcpO1xuICAgICAgICAkYXBpVXJsLmF0dHIoJ2hyZWYnLCB1cmxIVE1MICsgJ3N0YXJ0PTAnKTtcbiAgICB9LFxuICAgIHJlc2V0Rm9ybTogZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJyNzZWFyY2gnKS52YWwoJycpO1xuICAgICAgICAkKCcjZGF0ZVJlc3RyaWN0TnVtJykudmFsKCcnKTtcbiAgICAgICAgJCgnaW5wdXQnKS5hdHRyKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAkYXBpVXJsLmh0bWwoJy9hcGk/c2VhcmNoPWdydW1weWNhdCZzdGFydD0wJyk7XG4gICAgfSxcbiAgICBnZXRJbWFnZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBmdW5jdGlvbiBjcmVhdGVJbWFnZSh0aHVtYm5haWxMaW5rLCBsaW5rLCBzbmlwcGV0KSB7XG4gICAgICAgICAgICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCB0aHVtYm5haWxMaW5rKTtcbiAgICAgICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIHNuaXBwZXQpO1xuICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBzbmlwcGV0KTtcbiAgICAgICAgICAgIGltZy5kYXRhc2V0LmxpbmsgPSBsaW5rO1xuICAgICAgICAgICAgaW1nLmNsYXNzTmFtZSArPSAnaW1hZ2Ugei1kZXB0aC00JztcbiAgICAgICAgICAgIHJldHVybiBpbWc7XG4gICAgICAgIH1cbiAgICAgICAgZm9ybU1ldGhvZHMuJGltYWdlc01vZGFsLm1vZGFsKCdvcGVuJyk7XG4gICAgICAgIGZvcm1NZXRob2RzLiRtb2RhbEhlYWRlci5odG1sKCAkKCcjc2VhcmNoJykudmFsKCkgPT09ICcnID8gJ0dydW1weSBDYXQnIDogJCgnI3NlYXJjaCcpLnZhbCgpICk7XG4gICAgICAgICQuZ2V0KCRhcGlVcmwuaHRtbCgpKVxuICAgICAgICAuZG9uZShkYXRhID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgdmFyIGltYWdlc0FycmF5ID0gW107XG4gICAgICAgICAgICBkYXRhLnRvQXJyYXkoaW1hZ2VzRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgJGltYWdlc0NvbnRhaW5lciA9ICQoJyNpbWFnZXMtY29udGFpbmVyJyk7XG4gICAgICAgICAgICAgICAgaW1hZ2VzRGF0YS5mb3JFYWNoKGltYWdlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzQXJyYXkucHVzaChjcmVhdGVJbWFnZShpbWFnZS50aHVtYm5haWxMaW5rLCBpbWFnZS5saW5rLCBpbWFnZS5zbmlwcGV0KSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgJGltYWdlc0NvbnRhaW5lci5hcHBlbmQoaW1hZ2VzQXJyYXkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZvcm1NZXRob2RzO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5idXR0b24tY29sbGFwc2UnKS5zaWRlTmF2KCk7XG4gICAgfVxufTtcbiJdfQ==
