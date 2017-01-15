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
    getImages: function getImages() {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvanMvbWFpbi5qcyIsInB1YmxpYy9qcy9wYXJ0aWFscy9mb3JtLmpzIiwicHVibGljL2pzL3BhcnRpYWxzL25hdmJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsRUFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFXO0FBQ3pCLHFCQUFPLElBQVA7QUFDQSxtQkFBSyxJQUFMO0FBQ0gsQ0FIRDs7Ozs7QUNIQSxJQUFNLFVBQVUsRUFBRSxVQUFGLENBQWhCO0FBQ0EsSUFBTSxXQUFXLEVBQUUsU0FBRixFQUNaLEdBRFksQ0FDUixrQkFEUSxFQUVaLEdBRlksQ0FFUixtQkFGUSxFQUdaLEdBSFksQ0FHUixxQkFIUSxFQUlaLEdBSlksQ0FJUixxQkFKUSxFQUtaLEdBTFksQ0FLUiw4QkFMUSxFQU1aLEdBTlksQ0FNUiwwQkFOUSxFQU9aLEdBUFksQ0FPUixrQkFQUSxDQUFqQjs7QUFTQSxJQUFNLGtCQUFrQixDQUNwQixDQUFDLFNBQUQsRUFBWSxRQUFaLENBRG9CLEVBRXBCLENBQUMsNkJBQUQsRUFBZ0MsU0FBaEMsQ0FGb0IsRUFHcEIsQ0FBQyw2QkFBRCxFQUFnQyxTQUFoQyxDQUhvQixFQUlwQixDQUFDLHNDQUFELEVBQXlDLGtCQUF6QyxDQUpvQixFQUtwQixDQUFDLGtDQUFELEVBQXFDLGNBQXJDLENBTG9CLEVBTXBCLENBQUMsMEJBQUQsRUFBNkIsTUFBN0IsQ0FOb0IsQ0FBeEI7O0FBU0EsSUFBTSxjQUFjO0FBQ2hCLFVBQU0sZ0JBQVc7QUFDYixVQUFFLFFBQUYsRUFBWSxlQUFaO0FBQ0EsaUJBQVMsRUFBVCxDQUFZLFFBQVosRUFBc0IsWUFBWSxRQUFsQztBQUNBLFVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBWSxTQUE5QjtBQUNBLFVBQUUsYUFBRixFQUFpQixLQUFqQixDQUF1QixZQUFZLFNBQW5DO0FBQ0gsS0FOZTtBQU9oQixjQUFVLG9CQUFXO0FBQ2pCLFlBQUksVUFBVSxrREFBZDtBQUNBLFlBQU0sUUFBUSxFQUFFLGtCQUFGLEVBQXNCLEdBQXRCLEVBQWQ7QUFDQSxZQUFNLFNBQVMsRUFBRSxtQkFBRixFQUF1QixHQUF2QixFQUFmO0FBQ0Esd0JBQWdCLE9BQWhCLENBQXdCLG9CQUFZO0FBQ2hDLGdCQUFJLFFBQVEsRUFBRSxTQUFTLENBQVQsQ0FBRixFQUFlLEdBQWYsRUFBWjtBQUNBLGdCQUFJLFFBQVEsU0FBUyxDQUFULENBQVo7QUFDQSxnQkFBRyxLQUFILEVBQVU7QUFDTiwyQkFBYyxLQUFkLFNBQXVCLEtBQXZCO0FBQ0g7QUFDSixTQU5EO0FBT0EsWUFBRyxTQUFTLE1BQVosRUFBb0I7QUFDaEIseUNBQTJCLE1BQTNCLFNBQXFDLEtBQXJDO0FBQ0g7QUFDRCxnQkFBUSxJQUFSLENBQWEsVUFBVSxTQUF2QjtBQUNBLGdCQUFRLElBQVIsQ0FBYSxNQUFiLEVBQXFCLFVBQVUsU0FBL0I7QUFDSCxLQXZCZTtBQXdCaEIsZUFBVyxxQkFBVztBQUNsQixVQUFFLFNBQUYsRUFBYSxHQUFiLENBQWlCLEVBQWpCO0FBQ0EsVUFBRSxrQkFBRixFQUFzQixHQUF0QixDQUEwQixFQUExQjtBQUNBLFVBQUUsT0FBRixFQUFXLElBQVgsQ0FBZ0IsU0FBaEIsRUFBMkIsS0FBM0I7QUFDQSxnQkFBUSxJQUFSLENBQWEsMEVBQWI7QUFDSCxLQTdCZTtBQThCaEIsZUFBVyxxQkFBVyxDQUVyQjtBQWhDZSxDQUFwQjs7QUFtQ0EsT0FBTyxPQUFQLEdBQWlCLFdBQWpCOzs7OztBQ3REQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixVQUFNLGdCQUFXO0FBQ2IsVUFBRSxrQkFBRixFQUFzQixPQUF0QjtBQUNIO0FBSFksQ0FBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IG5hdmJhciBmcm9tICcuL3BhcnRpYWxzL25hdmJhcic7XG5pbXBvcnQgZm9ybSBmcm9tICcuL3BhcnRpYWxzL2Zvcm0nO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBuYXZiYXIuaW5pdCgpO1xuICAgIGZvcm0uaW5pdCgpO1xufSk7XG4iLCJjb25zdCAkYXBpVXJsID0gJCgnI2FwaS11cmwnKTtcbmNvbnN0ICRvcHRpb25zID0gJCgnI3NlYXJjaCcpXG4gICAgLmFkZCgnI2RhdGVSZXN0cmljdE51bScpXG4gICAgLmFkZCgnI2RhdGVSZXN0cmljdFR5cGUnKVxuICAgIC5hZGQoJ2lucHV0W25hbWU9aW1nU2l6ZV0nKVxuICAgIC5hZGQoJ2lucHV0W25hbWU9aW1nVHlwZV0nKVxuICAgIC5hZGQoJ2lucHV0W25hbWU9aW1nRG9taW5hbnRDb2xvcl0nKVxuICAgIC5hZGQoJ2lucHV0W25hbWU9aW1nQ29sb3JUeXBlXScpXG4gICAgLmFkZCgnaW5wdXRbbmFtZT1zYWZlXScpO1xuXG5jb25zdCBvcHRpb25TZWxlY3RvcnMgPSBbXG4gICAgWycjc2VhcmNoJywgJ3NlYXJjaCddLFxuICAgIFsnaW5wdXRbbmFtZT1pbWdTaXplXTpjaGVja2VkJywgJ2ltZ1NpemUnXSxcbiAgICBbJ2lucHV0W25hbWU9aW1nVHlwZV06Y2hlY2tlZCcsICdpbWdUeXBlJ10sXG4gICAgWydpbnB1dFtuYW1lPWltZ0RvbWluYW50Q29sb3JdOmNoZWNrZWQnLCAnaW1nRG9taW5hbnRDb2xvciddLFxuICAgIFsnaW5wdXRbbmFtZT1pbWdDb2xvclR5cGVdOmNoZWNrZWQnLCAnaW1nQ29sb3JUeXBlJ10sXG4gICAgWydpbnB1dFtuYW1lPXNhZmVdOmNoZWNrZWQnLCAnc2FmZSddXG5dO1xuXG5jb25zdCBmb3JtTWV0aG9kcyA9IHtcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnc2VsZWN0JykubWF0ZXJpYWxfc2VsZWN0KCk7XG4gICAgICAgICRvcHRpb25zLm9uKCdjaGFuZ2UnLCBmb3JtTWV0aG9kcy5idWlsZFVybCk7XG4gICAgICAgICQoJyNyZXNldCcpLmNsaWNrKGZvcm1NZXRob2RzLnJlc2V0Rm9ybSk7XG4gICAgICAgICQoJyNnZXQtaW1hZ2VzJykuY2xpY2soZm9ybU1ldGhvZHMuZ2V0SW1hZ2VzKTtcbiAgICB9LFxuICAgIGJ1aWxkVXJsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHVybEhUTUwgPSAnaHR0cDovL2ltYWdlLXNlYXJjaC1mY2MtY296YnkuaGVyb2t1YXBwLmNvbS9hcGk/JztcbiAgICAgICAgY29uc3QgZHJOdW0gPSAkKCcjZGF0ZVJlc3RyaWN0TnVtJykudmFsKCk7XG4gICAgICAgIGNvbnN0IGRyVHlwZSA9ICQoJyNkYXRlUmVzdHJpY3RUeXBlJykudmFsKCk7XG4gICAgICAgIG9wdGlvblNlbGVjdG9ycy5mb3JFYWNoKHNlbGVjdG9yID0+IHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9ICQoc2VsZWN0b3JbMF0pLnZhbCgpO1xuICAgICAgICAgICAgdmFyIHBhcmFtID0gc2VsZWN0b3JbMV07XG4gICAgICAgICAgICBpZih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHVybEhUTUwgKz0gYCR7cGFyYW19PSR7dmFsdWV9JmA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZihkck51bSAmJiBkclR5cGUpIHtcbiAgICAgICAgICAgIHVybEhUTUwgKz0gYGRhdGVSZXN0cmljdD0ke2RyVHlwZX1bJHtkck51bX1dJmA7XG4gICAgICAgIH1cbiAgICAgICAgJGFwaVVybC5odG1sKHVybEhUTUwgKyAnc3RhcnQ9MCcpO1xuICAgICAgICAkYXBpVXJsLmF0dHIoJ2hyZWYnLCB1cmxIVE1MICsgJ3N0YXJ0PTAnKTtcbiAgICB9LFxuICAgIHJlc2V0Rm9ybTogZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJyNzZWFyY2gnKS52YWwoJycpO1xuICAgICAgICAkKCcjZGF0ZVJlc3RyaWN0TnVtJykudmFsKCcnKTtcbiAgICAgICAgJCgnaW5wdXQnKS5hdHRyKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAkYXBpVXJsLmh0bWwoJ2h0dHA6Ly9pbWFnZS1zZWFyY2gtZmNjLWNvemJ5Lmhlcm9rdWFwcC5jb20vYXBpP3NlYXJjaD1ncnVtcHljYXQmc3RhcnQ9MCcpO1xuICAgIH0sXG4gICAgZ2V0SW1hZ2VzOiBmdW5jdGlvbigpIHtcblxuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZm9ybU1ldGhvZHM7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmJ1dHRvbi1jb2xsYXBzZScpLnNpZGVOYXYoKTtcbiAgICB9XG59O1xuIl19
