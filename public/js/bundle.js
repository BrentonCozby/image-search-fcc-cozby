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
        $apiUrl.html(window.location.origin + '/projects/FreeCodeCamp/image-search-fcc-cozby/api?search=grumpycat&start=1');
        $apiUrl.attr('href', window.location.origin + '/projects/FreeCodeCamp/image-search-fcc-cozby/api?search=grumpycat&start=1');
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
        var urlHTML = window.location.origin + '/projects/FreeCodeCamp/image-search-fcc-cozby/api?';
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
        $apiUrl.html(window.location.origin + '/projects/FreeCodeCamp/image-search-fcc-cozby/api?search=grumpycat&start=1');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvanMvbWFpbi5qcyIsInB1YmxpYy9qcy9wYXJ0aWFscy9mb3JtLmpzIiwicHVibGljL2pzL3BhcnRpYWxzL25hdmJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsRUFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFXO0FBQ3pCLHFCQUFPLElBQVA7QUFDQSxtQkFBSyxJQUFMO0FBQ0gsQ0FIRDs7Ozs7QUNIQSxJQUFNLFVBQVUsRUFBRSxVQUFGLENBQWhCO0FBQ0EsSUFBTSxXQUFXLEVBQUUsa0JBQUYsRUFDWixHQURZLENBQ1IsbUJBRFEsRUFFWixHQUZZLENBRVIscUJBRlEsRUFHWixHQUhZLENBR1IscUJBSFEsRUFJWixHQUpZLENBSVIsOEJBSlEsRUFLWixHQUxZLENBS1IsMEJBTFEsRUFNWixHQU5ZLENBTVIsa0JBTlEsQ0FBakI7O0FBUUEsSUFBTSxrQkFBa0IsQ0FDcEIsQ0FBQyxTQUFELEVBQVksUUFBWixDQURvQixFQUVwQixDQUFDLDZCQUFELEVBQWdDLFNBQWhDLENBRm9CLEVBR3BCLENBQUMsNkJBQUQsRUFBZ0MsU0FBaEMsQ0FIb0IsRUFJcEIsQ0FBQyxzQ0FBRCxFQUF5QyxrQkFBekMsQ0FKb0IsRUFLcEIsQ0FBQyxrQ0FBRCxFQUFxQyxjQUFyQyxDQUxvQixFQU1wQixDQUFDLDBCQUFELEVBQTZCLE1BQTdCLENBTm9CLENBQXhCOztBQVNBLFNBQVMsV0FBVCxDQUFxQixhQUFyQixFQUFvQyxJQUFwQyxFQUEwQyxPQUExQyxFQUFtRDtBQUMvQyxRQUFJLFNBQVMsU0FBUyxhQUFULENBQXVCLEdBQXZCLENBQWI7QUFDQSxXQUFPLFlBQVAsQ0FBb0IsTUFBcEIsRUFBNEIsSUFBNUI7QUFDQSxXQUFPLFlBQVAsQ0FBb0IsUUFBcEIsRUFBOEIsUUFBOUI7QUFDQSxXQUFPLFlBQVAsQ0FBb0IsS0FB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bUJBQU8sS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFQO0FBQ0Esb0JBQVEsR0FBUixDQUFZLElBQVo7QUFDQSxnQkFBSSxjQUFjLEVBQWxCO0FBQ0EsaUJBQUssT0FBTCxDQUFhLGlCQUFTO0FBQ2xCLDRCQUFZLElBQVosQ0FBaUIsWUFBWSxNQUFNLFNBQWxCLEVBQTZCLE1BQU0sSUFBbkMsRUFBeUMsTUFBTSxPQUEvQyxDQUFqQjtBQUNILGFBRkQ7QUFHQSxjQUFFLG1CQUFGLEVBQXVCLE1BQXZCLENBQThCLFdBQTlCO0FBQ0gsU0FURCxFQVVDLElBVkQsQ0FVTSxlQUFPO0FBQ1Qsb0JBQVEsR0FBUixDQUFZLEdBQVo7QUFDSCxTQVpEO0FBYUg7QUEzRGUsQ0FBcEI7O0FBOERBLE9BQU8sT0FBUCxHQUFpQixXQUFqQjs7Ozs7QUM5RkEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsVUFBTSxnQkFBVztBQUNiLFVBQUUsa0JBQUYsRUFBc0IsT0FBdEI7QUFDSDtBQUhZLENBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBuYXZiYXIgZnJvbSAnLi9wYXJ0aWFscy9uYXZiYXInO1xuaW1wb3J0IGZvcm0gZnJvbSAnLi9wYXJ0aWFscy9mb3JtJztcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgbmF2YmFyLmluaXQoKTtcbiAgICBmb3JtLmluaXQoKTtcbn0pO1xuIiwiY29uc3QgJGFwaVVybCA9ICQoJyNhcGktdXJsJyk7XG5jb25zdCAkb3B0aW9ucyA9ICQoJyNkYXRlUmVzdHJpY3ROdW0nKVxuICAgIC5hZGQoJyNkYXRlUmVzdHJpY3RUeXBlJylcbiAgICAuYWRkKCdpbnB1dFtuYW1lPWltZ1NpemVdJylcbiAgICAuYWRkKCdpbnB1dFtuYW1lPWltZ1R5cGVdJylcbiAgICAuYWRkKCdpbnB1dFtuYW1lPWltZ0RvbWluYW50Q29sb3JdJylcbiAgICAuYWRkKCdpbnB1dFtuYW1lPWltZ0NvbG9yVHlwZV0nKVxuICAgIC5hZGQoJ2lucHV0W25hbWU9c2FmZV0nKTtcblxuY29uc3Qgb3B0aW9uU2VsZWN0b3JzID0gW1xuICAgIFsnI3NlYXJjaCcsICdzZWFyY2gnXSxcbiAgICBbJ2lucHV0W25hbWU9aW1nU2l6ZV06Y2hlY2tlZCcsICdpbWdTaXplJ10sXG4gICAgWydpbnB1dFtuYW1lPWltZ1R5cGVdOmNoZWNrZWQnLCAnaW1nVHlwZSddLFxuICAgIFsnaW5wdXRbbmFtZT1pbWdEb21pbmFudENvbG9yXTpjaGVja2VkJywgJ2ltZ0RvbWluYW50Q29sb3InXSxcbiAgICBbJ2lucHV0W25hbWU9aW1nQ29sb3JUeXBlXTpjaGVja2VkJywgJ2ltZ0NvbG9yVHlwZSddLFxuICAgIFsnaW5wdXRbbmFtZT1zYWZlXTpjaGVja2VkJywgJ3NhZmUnXVxuXTtcblxuZnVuY3Rpb24gY3JlYXRlSW1hZ2UodGh1bWJuYWlsTGluaywgbGluaywgc25pcHBldCkge1xuICAgIHZhciBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYW5jaG9yLnNldEF0dHJpYnV0ZSgnaHJlZicsIGxpbmspO1xuICAgIGFuY2hvci5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKTtcbiAgICBhbmNob3Iuc2V0QXR0cmlidXRlKCdyZWwnLCAnbm9vcGVuZXInKTtcbiAgICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgdGh1bWJuYWlsTGluayk7XG4gICAgaW1nLnNldEF0dHJpYnV0ZSgnYWx0Jywgc25pcHBldCk7XG4gICAgaW1nLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBzbmlwcGV0KTtcbiAgICBpbWcuY2xhc3NOYW1lICs9ICdpbWFnZSc7XG4gICAgYW5jaG9yLmFwcGVuZENoaWxkKGltZyk7XG4gICAgcmV0dXJuIGFuY2hvcjtcbn1cblxuY29uc3QgZm9ybU1ldGhvZHMgPSB7XG4gICAgJGltYWdlc01vZGFsOiBudWxsLFxuICAgICRtb2RhbEhlYWRlcjogbnVsbCxcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgJGFwaVVybC5odG1sKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnL3Byb2plY3RzL0ZyZWVDb2RlQ2FtcC9pbWFnZS1zZWFyY2gtZmNjLWNvemJ5L2FwaT9zZWFyY2g9Z3J1bXB5Y2F0JnN0YXJ0PTEnKTtcbiAgICAgICAgJGFwaVVybC5hdHRyKCdocmVmJywgd2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvcHJvamVjdHMvRnJlZUNvZGVDYW1wL2ltYWdlLXNlYXJjaC1mY2MtY296YnkvYXBpP3NlYXJjaD1ncnVtcHljYXQmc3RhcnQ9MScpO1xuICAgICAgICAkKCdzZWxlY3QnKS5tYXRlcmlhbF9zZWxlY3QoKTtcbiAgICAgICAgJCgnLm1vZGFsJykubW9kYWwoKTtcbiAgICAgICAgZm9ybU1ldGhvZHMuJGltYWdlc01vZGFsID0gJCgnI2ltYWdlcy1tb2RhbCcpO1xuICAgICAgICBmb3JtTWV0aG9kcy4kbW9kYWxIZWFkZXIgPSAkKCcjbW9kYWwtaGVhZGVyJyk7XG4gICAgICAgICQoJyNzZWFyY2gnKS5vbignaW5wdXQnLCBmb3JtTWV0aG9kcy5idWlsZFVybCk7XG4gICAgICAgICQoJyNzZWFyY2gnKS5vbigna2V5cHJlc3MnLCBlID0+IHtcbiAgICAgICAgICAgIGlmKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgICAgICAgICBmb3JtTWV0aG9kcy5nZXRJbWFnZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICRvcHRpb25zLm9uKCdjaGFuZ2UnLCBmb3JtTWV0aG9kcy5idWlsZFVybCk7XG4gICAgICAgICQoJyNyZXNldCcpLmNsaWNrKGZvcm1NZXRob2RzLnJlc2V0Rm9ybSk7XG4gICAgICAgICQoJyNnZXQtaW1hZ2VzJykuY2xpY2soZm9ybU1ldGhvZHMuZ2V0SW1hZ2VzKTtcbiAgICB9LFxuICAgIGJ1aWxkVXJsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHVybEhUTUwgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy9wcm9qZWN0cy9GcmVlQ29kZUNhbXAvaW1hZ2Utc2VhcmNoLWZjYy1jb3pieS9hcGk/JztcbiAgICAgICAgY29uc3QgZHJOdW0gPSAkKCcjZGF0ZVJlc3RyaWN0TnVtJykudmFsKCk7XG4gICAgICAgIGNvbnN0IGRyVHlwZSA9ICQoJyNkYXRlUmVzdHJpY3RUeXBlJykudmFsKCk7XG4gICAgICAgIG9wdGlvblNlbGVjdG9ycy5mb3JFYWNoKHNlbGVjdG9yID0+IHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9ICQoc2VsZWN0b3JbMF0pLnZhbCgpO1xuICAgICAgICAgICAgdmFyIHBhcmFtID0gc2VsZWN0b3JbMV07XG4gICAgICAgICAgICBpZih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHVybEhUTUwgKz0gYCR7cGFyYW19PSR7dmFsdWV9JmA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZihkck51bSAmJiBkclR5cGUpIHtcbiAgICAgICAgICAgIHVybEhUTUwgKz0gYGRhdGVSZXN0cmljdD0ke2RyVHlwZX1bJHtkck51bX1dJmA7XG4gICAgICAgIH1cbiAgICAgICAgJGFwaVVybC5odG1sKHVybEhUTUwgKyAnc3RhcnQ9MScpO1xuICAgICAgICAkYXBpVXJsLmF0dHIoJ2hyZWYnLCB1cmxIVE1MICsgJ3N0YXJ0PTEnKTtcbiAgICB9LFxuICAgIHJlc2V0Rm9ybTogZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJyNkYXRlUmVzdHJpY3ROdW0nKS52YWwoJycpO1xuICAgICAgICAkKCdpbnB1dCcpLmF0dHIoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICRhcGlVcmwuaHRtbCh3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy9wcm9qZWN0cy9GcmVlQ29kZUNhbXAvaW1hZ2Utc2VhcmNoLWZjYy1jb3pieS9hcGk/c2VhcmNoPWdydW1weWNhdCZzdGFydD0xJyk7XG4gICAgfSxcbiAgICBnZXRJbWFnZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcjaW1hZ2VzLWNvbnRhaW5lcicpLmVtcHR5KCk7XG4gICAgICAgIGZvcm1NZXRob2RzLiRpbWFnZXNNb2RhbC5tb2RhbCgnb3BlbicpO1xuICAgICAgICBmb3JtTWV0aG9kcy4kbW9kYWxIZWFkZXIuaHRtbCggJCgnI3NlYXJjaCcpLnZhbCgpID09PSAnJyA/ICdHcnVtcHkgQ2F0JyA6ICQoJyNzZWFyY2gnKS52YWwoKSApO1xuICAgICAgICAkLmdldCgkKCcjYXBpLXVybCcpLmh0bWwoKSlcbiAgICAgICAgLmRvbmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgdmFyIGltYWdlc0FycmF5ID0gW107XG4gICAgICAgICAgICBkYXRhLmZvckVhY2goaW1hZ2UgPT4ge1xuICAgICAgICAgICAgICAgIGltYWdlc0FycmF5LnB1c2goY3JlYXRlSW1hZ2UoaW1hZ2UudGh1bWJuYWlsLCBpbWFnZS5saW5rLCBpbWFnZS5zbmlwcGV0KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoJyNpbWFnZXMtY29udGFpbmVyJykuYXBwZW5kKGltYWdlc0FycmF5KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZm9ybU1ldGhvZHM7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmJ1dHRvbi1jb2xsYXBzZScpLnNpZGVOYXYoKTtcbiAgICB9XG59O1xuIl19
