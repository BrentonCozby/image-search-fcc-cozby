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
    init: function init() {
        $('select').material_select();
        $options.on('change', formMethods.buildUrl);
        $('#reset').click(formMethods.resetForm);
        $('#get-images').click(formMethods.getImages);
    },
    buildUrl: function buildUrl() {
        var urlHTML = 'http://image-search-fcc-cozby.herokuapp.com/api?';
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
        $apiUrl.html('http://image-search-fcc-cozby.herokuapp.com/api?search=grumpycat&start=0');
    },
    getImages: function getImages() {
        $.get($apiUrl.html()).done(function (data) {
            console.log(data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvanMvbWFpbi5qcyIsInB1YmxpYy9qcy9wYXJ0aWFscy9mb3JtLmpzIiwicHVibGljL2pzL3BhcnRpYWxzL25hdmJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsRUFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFXO0FBQ3pCLHFCQUFPLElBQVA7QUFDQSxtQkFBSyxJQUFMO0FBQ0gsQ0FIRDs7Ozs7QUNIQSxJQUFNLFVBQVUsRUFBRSxVQUFGLENBQWhCO0FBQ0EsSUFBTSxXQUFXLEVBQUUsU0FBRixFQUNaLEdBRFksQ0FDUixrQkFEUSxFQUVaLEdBRlksQ0FFUixtQkFGUSxFQUdaLEdBSFksQ0FHUixxQkFIUSxFQUlaLEdBSlksQ0FJUixxQkFKUSxFQUtaLEdBTFksQ0FLUiw4QkFMUSxFQU1aLEdBTlksQ0FNUiwwQkFOUSxFQU9aLEdBUFksQ0FPUixrQkFQUSxDQUFqQjs7QUFTQSxJQUFNLGtCQUFrQixDQUNwQixDQUFDLFNBQUQsRUFBWSxRQUFaLENBRG9CLEVBRXBCLENBQUMsNkJBQUQsRUFBZ0MsU0FBaEMsQ0FGb0IsRUFHcEIsQ0FBQyw2QkFBRCxFQUFnQyxTQUFoQyxDQUhvQixFQUlwQixDQUFDLHNDQUFELEVBQXlDLGtCQUF6QyxDQUpvQixFQUtwQixDQUFDLGtDQUFELEVBQXFDLGNBQXJDLENBTG9CLEVBTXBCLENBQUMsMEJBQUQsRUFBNkIsTUFBN0IsQ0FOb0IsQ0FBeEI7O0FBU0EsSUFBTSxjQUFjO0FBQ2hCLFVBQU0sZ0JBQVc7QUFDYixVQUFFLFFBQUYsRUFBWSxlQUFaO0FBQ0EsaUJBQVMsRUFBVCxDQUFZLFFBQVosRUFBc0IsWUFBWSxRQUFsQztBQUNBLFVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBWSxTQUE5QjtBQUNBLFVBQUUsYUFBRixFQUFpQixLQUFqQixDQUF1QixZQUFZLFNBQW5DO0FBQ0gsS0FOZTtBQU9oQixjQUFVLG9CQUFXO0FBQ2pCLFlBQUksVUFBVSxrREFBZDtBQUNBLFlBQU0sUUFBUSxFQUFFLGtCQUFGLEVBQXNCLEdBQXRCLEVBQWQ7QUFDQSxZQUFNLFNBQVMsRUFBRSxtQkFBRixFQUF1QixHQUF2QixFQUFmO0FBQ0Esd0JBQWdCLE9BQWhCLENBQXdCLG9CQUFZO0FBQ2hDLGdCQUFJLFFBQVEsRUFBRSxTQUFTLENBQVQsQ0FBRixFQUFlLEdBQWYsRUFBWjtBQUNBLGdCQUFJLFFBQVEsU0FBUyxDQUFULENBQVo7QUFDQSxnQkFBRyxLQUFILEVBQVU7QUFDTiwyQkFBYyxLQUFkLFNBQXVCLEtBQXZCO0FBQ0g7QUFDSixTQU5EO0FBT0EsWUFBRyxTQUFTLE1BQVosRUFBb0I7QUFDaEIseUNBQTJCLE1BQTNCLFNBQXFDLEtBQXJDO0FBQ0g7QUFDRCxnQkFBUSxJQUFSLENBQWEsVUFBVSxTQUF2QjtBQUNBLGdCQUFRLElBQVIsQ0FBYSxNQUFiLEVBQXFCLFVBQVUsU0FBL0I7QUFDSCxLQXZCZTtBQXdCaEIsZUFBVyxxQkFBVztBQUNsQixVQUFFLFNBQUYsRUFBYSxHQUFiLENBQWlCLEVBQWpCO0FBQ0EsVUFBRSxrQkFBRixFQUFzQixHQUF0QixDQUEwQixFQUExQjtBQUNBLFVBQUUsT0FBRixFQUFXLElBQVgsQ0FBZ0IsU0FBaEIsRUFBMkIsS0FBM0I7QUFDQSxnQkFBUSxJQUFSLENBQWEsMEVBQWI7QUFDSCxLQTdCZTtBQThCaEIsZUFBVyxxQkFBVztBQUNsQixVQUFFLEdBQUYsQ0FBTSxRQUFRLElBQVIsRUFBTixFQUNLLElBREwsQ0FDVSxnQkFBUTtBQUNWLG9CQUFRLEdBQVIsQ0FBWSxJQUFaO0FBQ0gsU0FITCxFQUlLLElBSkwsQ0FJVSxlQUFPO0FBQ1Qsb0JBQVEsR0FBUixDQUFZLEdBQVo7QUFDSCxTQU5MO0FBT0g7QUF0Q2UsQ0FBcEI7O0FBeUNBLE9BQU8sT0FBUCxHQUFpQixXQUFqQjs7Ozs7QUM1REEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsVUFBTSxnQkFBVztBQUNiLFVBQUUsa0JBQUYsRUFBc0IsT0FBdEI7QUFDSDtBQUhZLENBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBuYXZiYXIgZnJvbSAnLi9wYXJ0aWFscy9uYXZiYXInO1xuaW1wb3J0IGZvcm0gZnJvbSAnLi9wYXJ0aWFscy9mb3JtJztcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgbmF2YmFyLmluaXQoKTtcbiAgICBmb3JtLmluaXQoKTtcbn0pO1xuIiwiY29uc3QgJGFwaVVybCA9ICQoJyNhcGktdXJsJyk7XG5jb25zdCAkb3B0aW9ucyA9ICQoJyNzZWFyY2gnKVxuICAgIC5hZGQoJyNkYXRlUmVzdHJpY3ROdW0nKVxuICAgIC5hZGQoJyNkYXRlUmVzdHJpY3RUeXBlJylcbiAgICAuYWRkKCdpbnB1dFtuYW1lPWltZ1NpemVdJylcbiAgICAuYWRkKCdpbnB1dFtuYW1lPWltZ1R5cGVdJylcbiAgICAuYWRkKCdpbnB1dFtuYW1lPWltZ0RvbWluYW50Q29sb3JdJylcbiAgICAuYWRkKCdpbnB1dFtuYW1lPWltZ0NvbG9yVHlwZV0nKVxuICAgIC5hZGQoJ2lucHV0W25hbWU9c2FmZV0nKTtcblxuY29uc3Qgb3B0aW9uU2VsZWN0b3JzID0gW1xuICAgIFsnI3NlYXJjaCcsICdzZWFyY2gnXSxcbiAgICBbJ2lucHV0W25hbWU9aW1nU2l6ZV06Y2hlY2tlZCcsICdpbWdTaXplJ10sXG4gICAgWydpbnB1dFtuYW1lPWltZ1R5cGVdOmNoZWNrZWQnLCAnaW1nVHlwZSddLFxuICAgIFsnaW5wdXRbbmFtZT1pbWdEb21pbmFudENvbG9yXTpjaGVja2VkJywgJ2ltZ0RvbWluYW50Q29sb3InXSxcbiAgICBbJ2lucHV0W25hbWU9aW1nQ29sb3JUeXBlXTpjaGVja2VkJywgJ2ltZ0NvbG9yVHlwZSddLFxuICAgIFsnaW5wdXRbbmFtZT1zYWZlXTpjaGVja2VkJywgJ3NhZmUnXVxuXTtcblxuY29uc3QgZm9ybU1ldGhvZHMgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJ3NlbGVjdCcpLm1hdGVyaWFsX3NlbGVjdCgpO1xuICAgICAgICAkb3B0aW9ucy5vbignY2hhbmdlJywgZm9ybU1ldGhvZHMuYnVpbGRVcmwpO1xuICAgICAgICAkKCcjcmVzZXQnKS5jbGljayhmb3JtTWV0aG9kcy5yZXNldEZvcm0pO1xuICAgICAgICAkKCcjZ2V0LWltYWdlcycpLmNsaWNrKGZvcm1NZXRob2RzLmdldEltYWdlcyk7XG4gICAgfSxcbiAgICBidWlsZFVybDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB1cmxIVE1MID0gJ2h0dHA6Ly9pbWFnZS1zZWFyY2gtZmNjLWNvemJ5Lmhlcm9rdWFwcC5jb20vYXBpPyc7XG4gICAgICAgIGNvbnN0IGRyTnVtID0gJCgnI2RhdGVSZXN0cmljdE51bScpLnZhbCgpO1xuICAgICAgICBjb25zdCBkclR5cGUgPSAkKCcjZGF0ZVJlc3RyaWN0VHlwZScpLnZhbCgpO1xuICAgICAgICBvcHRpb25TZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAkKHNlbGVjdG9yWzBdKS52YWwoKTtcbiAgICAgICAgICAgIHZhciBwYXJhbSA9IHNlbGVjdG9yWzFdO1xuICAgICAgICAgICAgaWYodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB1cmxIVE1MICs9IGAke3BhcmFtfT0ke3ZhbHVlfSZgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYoZHJOdW0gJiYgZHJUeXBlKSB7XG4gICAgICAgICAgICB1cmxIVE1MICs9IGBkYXRlUmVzdHJpY3Q9JHtkclR5cGV9WyR7ZHJOdW19XSZgO1xuICAgICAgICB9XG4gICAgICAgICRhcGlVcmwuaHRtbCh1cmxIVE1MICsgJ3N0YXJ0PTAnKTtcbiAgICAgICAgJGFwaVVybC5hdHRyKCdocmVmJywgdXJsSFRNTCArICdzdGFydD0wJyk7XG4gICAgfSxcbiAgICByZXNldEZvcm06IGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcjc2VhcmNoJykudmFsKCcnKTtcbiAgICAgICAgJCgnI2RhdGVSZXN0cmljdE51bScpLnZhbCgnJyk7XG4gICAgICAgICQoJ2lucHV0JykuYXR0cignY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgJGFwaVVybC5odG1sKCdodHRwOi8vaW1hZ2Utc2VhcmNoLWZjYy1jb3pieS5oZXJva3VhcHAuY29tL2FwaT9zZWFyY2g9Z3J1bXB5Y2F0JnN0YXJ0PTAnKTtcbiAgICB9LFxuICAgIGdldEltYWdlczogZnVuY3Rpb24oKSB7XG4gICAgICAgICQuZ2V0KCRhcGlVcmwuaHRtbCgpKVxuICAgICAgICAgICAgLmRvbmUoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZhaWwoZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmb3JtTWV0aG9kcztcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuYnV0dG9uLWNvbGxhcHNlJykuc2lkZU5hdigpO1xuICAgIH1cbn07XG4iXX0=
