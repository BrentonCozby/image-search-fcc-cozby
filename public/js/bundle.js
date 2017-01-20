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
        $apiUrl.html(window.location.origin + '/api?search=grumpycat&start=1');
        $apiUrl.attr('href', window.location.origin + '/api?search=grumpycat&start=1');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvanMvbWFpbi5qcyIsInB1YmxpYy9qcy9wYXJ0aWFscy9mb3JtLmpzIiwicHVibGljL2pzL3BhcnRpYWxzL25hdmJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsRUFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFXO0FBQ3pCLHFCQUFPLElBQVA7QUFDQSxtQkFBSyxJQUFMO0FBQ0gsQ0FIRDs7Ozs7QUNIQSxJQUFNLFVBQVUsRUFBRSxVQUFGLENBQWhCO0FBQ0EsSUFBTSxXQUFXLEVBQUUsa0JBQUYsRUFDWixHQURZLENBQ1IsbUJBRFEsRUFFWixHQUZZLENBRVIscUJBRlEsRUFHWixHQUhZLENBR1IscUJBSFEsRUFJWixHQUpZLENBSVIsOEJBSlEsRUFLWixHQUxZLENBS1IsMEJBTFEsRUFNWixHQU5ZLENBTVIsa0JBTlEsQ0FBakI7O0FBUUEsSUFBTSxrQkFBa0IsQ0FDcEIsQ0FBQyxTQUFELEVBQVksUUFBWixDQURvQixFQUVwQixDQUFDLDZCQUFELEVBQWdDLFNBQWhDLENBRm9CLEVBR3BCLENBQUMsNkJBQUQsRUFBZ0MsU0FBaEMsQ0FIb0IsRUFJcEIsQ0FBQyxzQ0FBRCxFQUF5QyxrQkFBekMsQ0FKb0IsRUFLcEIsQ0FBQyxrQ0FBRCxFQUFxQyxjQUFyQyxDQUxvQixFQU1wQixDQUFDLDBCQUFELEVBQTZCLE1BQTdCLENBTm9CLENBQXhCOztBQVNBLFNBQVMsV0FBVCxDQUFxQixhQUFyQixFQUFvQyxJQUFwQyxFQUEwQyxPQUExQyxFQUFtRDtBQUMvQyxRQUFJLFNBQVMsU0FBUyxhQUFULENBQXVCLEdBQXZCLENBQWI7QUFDQSxXQUFPLFlBQVAsQ0FBb0IsTUFBcEIsRUFBNEIsSUFBNUI7QUFDQSxXQUFPLFlBQVAsQ0FBb0IsUUFBcEIsRUFBOEIsUUFBOUI7QUFDQSxXQUFPLFlBQVAsQ0FBb0IsS0FB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QkFBTyxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQVA7QUFDQSxvQkFBUSxHQUFSLENBQVksSUFBWjtBQUNBLGdCQUFJLGNBQWMsRUFBbEI7QUFDQSxpQkFBSyxPQUFMLENBQWEsaUJBQVM7QUFDbEIsNEJBQVksSUFBWixDQUFpQixZQUFZLE1BQU0sU0FBbEIsRUFBNkIsTUFBTSxJQUFuQyxFQUF5QyxNQUFNLE9BQS9DLENBQWpCO0FBQ0gsYUFGRDtBQUdBLGNBQUUsbUJBQUYsRUFBdUIsTUFBdkIsQ0FBOEIsV0FBOUI7QUFDSCxTQVRELEVBVUMsSUFWRCxDQVVNLGVBQU87QUFDVCxvQkFBUSxHQUFSLENBQVksR0FBWjtBQUNILFNBWkQ7QUFhSDtBQTNEZSxDQUFwQjs7QUE4REEsT0FBTyxPQUFQLEdBQWlCLFdBQWpCOzs7OztBQzlGQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixVQUFNLGdCQUFXO0FBQ2IsVUFBRSxrQkFBRixFQUFzQixPQUF0QjtBQUNIO0FBSFksQ0FBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IG5hdmJhciBmcm9tICcuL3BhcnRpYWxzL25hdmJhcic7XG5pbXBvcnQgZm9ybSBmcm9tICcuL3BhcnRpYWxzL2Zvcm0nO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBuYXZiYXIuaW5pdCgpO1xuICAgIGZvcm0uaW5pdCgpO1xufSk7XG4iLCJjb25zdCAkYXBpVXJsID0gJCgnI2FwaS11cmwnKTtcbmNvbnN0ICRvcHRpb25zID0gJCgnI2RhdGVSZXN0cmljdE51bScpXG4gICAgLmFkZCgnI2RhdGVSZXN0cmljdFR5cGUnKVxuICAgIC5hZGQoJ2lucHV0W25hbWU9aW1nU2l6ZV0nKVxuICAgIC5hZGQoJ2lucHV0W25hbWU9aW1nVHlwZV0nKVxuICAgIC5hZGQoJ2lucHV0W25hbWU9aW1nRG9taW5hbnRDb2xvcl0nKVxuICAgIC5hZGQoJ2lucHV0W25hbWU9aW1nQ29sb3JUeXBlXScpXG4gICAgLmFkZCgnaW5wdXRbbmFtZT1zYWZlXScpO1xuXG5jb25zdCBvcHRpb25TZWxlY3RvcnMgPSBbXG4gICAgWycjc2VhcmNoJywgJ3NlYXJjaCddLFxuICAgIFsnaW5wdXRbbmFtZT1pbWdTaXplXTpjaGVja2VkJywgJ2ltZ1NpemUnXSxcbiAgICBbJ2lucHV0W25hbWU9aW1nVHlwZV06Y2hlY2tlZCcsICdpbWdUeXBlJ10sXG4gICAgWydpbnB1dFtuYW1lPWltZ0RvbWluYW50Q29sb3JdOmNoZWNrZWQnLCAnaW1nRG9taW5hbnRDb2xvciddLFxuICAgIFsnaW5wdXRbbmFtZT1pbWdDb2xvclR5cGVdOmNoZWNrZWQnLCAnaW1nQ29sb3JUeXBlJ10sXG4gICAgWydpbnB1dFtuYW1lPXNhZmVdOmNoZWNrZWQnLCAnc2FmZSddXG5dO1xuXG5mdW5jdGlvbiBjcmVhdGVJbWFnZSh0aHVtYm5haWxMaW5rLCBsaW5rLCBzbmlwcGV0KSB7XG4gICAgdmFyIGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhbmNob3Iuc2V0QXR0cmlidXRlKCdocmVmJywgbGluayk7XG4gICAgYW5jaG9yLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgJ19ibGFuaycpO1xuICAgIGFuY2hvci5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdub29wZW5lcicpO1xuICAgIHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCB0aHVtYm5haWxMaW5rKTtcbiAgICBpbWcuc2V0QXR0cmlidXRlKCdhbHQnLCBzbmlwcGV0KTtcbiAgICBpbWcuc2V0QXR0cmlidXRlKCd0aXRsZScsIHNuaXBwZXQpO1xuICAgIGltZy5jbGFzc05hbWUgKz0gJ2ltYWdlJztcbiAgICBhbmNob3IuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICByZXR1cm4gYW5jaG9yO1xufVxuXG5jb25zdCBmb3JtTWV0aG9kcyA9IHtcbiAgICAkaW1hZ2VzTW9kYWw6IG51bGwsXG4gICAgJG1vZGFsSGVhZGVyOiBudWxsLFxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAkYXBpVXJsLmh0bWwod2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvYXBpP3NlYXJjaD1ncnVtcHljYXQmc3RhcnQ9MScpO1xuICAgICAgICAkYXBpVXJsLmF0dHIoJ2hyZWYnLCB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy9hcGk/c2VhcmNoPWdydW1weWNhdCZzdGFydD0xJyk7XG4gICAgICAgICQoJ3NlbGVjdCcpLm1hdGVyaWFsX3NlbGVjdCgpO1xuICAgICAgICAkKCcubW9kYWwnKS5tb2RhbCgpO1xuICAgICAgICBmb3JtTWV0aG9kcy4kaW1hZ2VzTW9kYWwgPSAkKCcjaW1hZ2VzLW1vZGFsJyk7XG4gICAgICAgIGZvcm1NZXRob2RzLiRtb2RhbEhlYWRlciA9ICQoJyNtb2RhbC1oZWFkZXInKTtcbiAgICAgICAgJCgnI3NlYXJjaCcpLm9uKCdpbnB1dCcsIGZvcm1NZXRob2RzLmJ1aWxkVXJsKTtcbiAgICAgICAgJCgnI3NlYXJjaCcpLm9uKCdrZXlwcmVzcycsIGUgPT4ge1xuICAgICAgICAgICAgaWYoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgICAgIGZvcm1NZXRob2RzLmdldEltYWdlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJG9wdGlvbnMub24oJ2NoYW5nZScsIGZvcm1NZXRob2RzLmJ1aWxkVXJsKTtcbiAgICAgICAgJCgnI3Jlc2V0JykuY2xpY2soZm9ybU1ldGhvZHMucmVzZXRGb3JtKTtcbiAgICAgICAgJCgnI2dldC1pbWFnZXMnKS5jbGljayhmb3JtTWV0aG9kcy5nZXRJbWFnZXMpO1xuICAgIH0sXG4gICAgYnVpbGRVcmw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdXJsSFRNTCA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnL2FwaT8nO1xuICAgICAgICBjb25zdCBkck51bSA9ICQoJyNkYXRlUmVzdHJpY3ROdW0nKS52YWwoKTtcbiAgICAgICAgY29uc3QgZHJUeXBlID0gJCgnI2RhdGVSZXN0cmljdFR5cGUnKS52YWwoKTtcbiAgICAgICAgb3B0aW9uU2VsZWN0b3JzLmZvckVhY2goc2VsZWN0b3IgPT4ge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gJChzZWxlY3RvclswXSkudmFsKCk7XG4gICAgICAgICAgICB2YXIgcGFyYW0gPSBzZWxlY3RvclsxXTtcbiAgICAgICAgICAgIGlmKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdXJsSFRNTCArPSBgJHtwYXJhbX09JHt2YWx1ZX0mYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmKGRyTnVtICYmIGRyVHlwZSkge1xuICAgICAgICAgICAgdXJsSFRNTCArPSBgZGF0ZVJlc3RyaWN0PSR7ZHJUeXBlfVske2RyTnVtfV0mYDtcbiAgICAgICAgfVxuICAgICAgICAkYXBpVXJsLmh0bWwodXJsSFRNTCArICdzdGFydD0xJyk7XG4gICAgICAgICRhcGlVcmwuYXR0cignaHJlZicsIHVybEhUTUwgKyAnc3RhcnQ9MScpO1xuICAgIH0sXG4gICAgcmVzZXRGb3JtOiBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI2RhdGVSZXN0cmljdE51bScpLnZhbCgnJyk7XG4gICAgICAgICQoJ2lucHV0JykuYXR0cignY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgJGFwaVVybC5odG1sKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnL2FwaT9zZWFyY2g9Z3J1bXB5Y2F0JnN0YXJ0PTEnKTtcbiAgICB9LFxuICAgIGdldEltYWdlczogZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJyNpbWFnZXMtY29udGFpbmVyJykuZW1wdHkoKTtcbiAgICAgICAgZm9ybU1ldGhvZHMuJGltYWdlc01vZGFsLm1vZGFsKCdvcGVuJyk7XG4gICAgICAgIGZvcm1NZXRob2RzLiRtb2RhbEhlYWRlci5odG1sKCAkKCcjc2VhcmNoJykudmFsKCkgPT09ICcnID8gJ0dydW1weSBDYXQnIDogJCgnI3NlYXJjaCcpLnZhbCgpICk7XG4gICAgICAgICQuZ2V0KCQoJyNhcGktdXJsJykuaHRtbCgpKVxuICAgICAgICAuZG9uZShkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICB2YXIgaW1hZ2VzQXJyYXkgPSBbXTtcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChpbWFnZSA9PiB7XG4gICAgICAgICAgICAgICAgaW1hZ2VzQXJyYXkucHVzaChjcmVhdGVJbWFnZShpbWFnZS50aHVtYm5haWwsIGltYWdlLmxpbmssIGltYWdlLnNuaXBwZXQpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCgnI2ltYWdlcy1jb250YWluZXInKS5hcHBlbmQoaW1hZ2VzQXJyYXkpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmb3JtTWV0aG9kcztcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuYnV0dG9uLWNvbGxhcHNlJykuc2lkZU5hdigpO1xuICAgIH1cbn07XG4iXX0=
