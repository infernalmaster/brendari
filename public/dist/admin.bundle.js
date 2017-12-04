/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener('DOMContentLoaded', function () {
  var fileInputs = document.querySelectorAll('.js-fileupload');

  function uploadFile(fileInput) {
    if (fileInput.files.length === 0) return;

    var wrapper = fileInput.parentNode;

    var formData = new window.FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('_csrf', document.querySelector('[name="_csrf"]').value);

    var request = new window.XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState !== 4) return;

      if (request.status === 201) {
        var resp = JSON.parse(request.response);
        console.log(resp);

        wrapper.querySelector('.js-img').src = resp.full_name;
        wrapper.querySelector('.js-file-text').value = resp.file;

        document.querySelectorAll('[name="_csrf"]').forEach(function (input) {
          input.value = resp.csrf_token;
        });
      } else {
        console.log(request.responseText);
      }
    };

    var pbar = wrapper.querySelector('.js-pbar');
    request.upload.addEventListener('progress', function (e) {
      var progress = Math.ceil(e.loaded / e.total * 100);
      pbar.style.width = progress + '%';
    }, false);
    request.open('post', '/admin/upload');
    request.send(formData);
  }

  fileInputs.forEach(function (input) {
    input.addEventListener('change', function () {
      uploadFile(input);
    });
  });
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDQ5MTFiZDgyZjQyYjU3MzYyMWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9hZG1pbi5qcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJmaWxlSW5wdXRzIiwicXVlcnlTZWxlY3RvckFsbCIsInVwbG9hZEZpbGUiLCJmaWxlSW5wdXQiLCJmaWxlcyIsImxlbmd0aCIsIndyYXBwZXIiLCJwYXJlbnROb2RlIiwiZm9ybURhdGEiLCJ3aW5kb3ciLCJGb3JtRGF0YSIsImFwcGVuZCIsInF1ZXJ5U2VsZWN0b3IiLCJ2YWx1ZSIsInJlcXVlc3QiLCJYTUxIdHRwUmVxdWVzdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2UiLCJjb25zb2xlIiwibG9nIiwic3JjIiwiZnVsbF9uYW1lIiwiZmlsZSIsImZvckVhY2giLCJpbnB1dCIsImNzcmZfdG9rZW4iLCJyZXNwb25zZVRleHQiLCJwYmFyIiwidXBsb2FkIiwiZSIsInByb2dyZXNzIiwiTWF0aCIsImNlaWwiLCJsb2FkZWQiLCJ0b3RhbCIsInN0eWxlIiwid2lkdGgiLCJvcGVuIiwic2VuZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQzdEQUEsU0FBU0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVk7QUFDeEQsTUFBTUMsYUFBYUYsU0FBU0csZ0JBQVQsQ0FBMEIsZ0JBQTFCLENBQW5COztBQUVBLFdBQVNDLFVBQVQsQ0FBcUJDLFNBQXJCLEVBQWdDO0FBQzlCLFFBQUlBLFVBQVVDLEtBQVYsQ0FBZ0JDLE1BQWhCLEtBQTJCLENBQS9CLEVBQWtDOztBQUVsQyxRQUFNQyxVQUFVSCxVQUFVSSxVQUExQjs7QUFFQSxRQUFNQyxXQUFXLElBQUlDLE9BQU9DLFFBQVgsRUFBakI7QUFDQUYsYUFBU0csTUFBVCxDQUFnQixNQUFoQixFQUF3QlIsVUFBVUMsS0FBVixDQUFnQixDQUFoQixDQUF4QjtBQUNBSSxhQUFTRyxNQUFULENBQWdCLE9BQWhCLEVBQXlCYixTQUFTYyxhQUFULENBQXVCLGdCQUF2QixFQUF5Q0MsS0FBbEU7O0FBRUEsUUFBTUMsVUFBVSxJQUFJTCxPQUFPTSxjQUFYLEVBQWhCO0FBQ0FELFlBQVFFLGtCQUFSLEdBQTZCLFlBQVk7QUFDdkMsVUFBSUYsUUFBUUcsVUFBUixLQUF1QixDQUEzQixFQUE4Qjs7QUFFOUIsVUFBSUgsUUFBUUksTUFBUixLQUFtQixHQUF2QixFQUE0QjtBQUMxQixZQUFNQyxPQUFPQyxLQUFLQyxLQUFMLENBQVdQLFFBQVFRLFFBQW5CLENBQWI7QUFDQUMsZ0JBQVFDLEdBQVIsQ0FBWUwsSUFBWjs7QUFFQWIsZ0JBQVFNLGFBQVIsQ0FBc0IsU0FBdEIsRUFBaUNhLEdBQWpDLEdBQXVDTixLQUFLTyxTQUE1QztBQUNBcEIsZ0JBQVFNLGFBQVIsQ0FBc0IsZUFBdEIsRUFBdUNDLEtBQXZDLEdBQStDTSxLQUFLUSxJQUFwRDs7QUFFQTdCLGlCQUFTRyxnQkFBVCxDQUEwQixnQkFBMUIsRUFBNEMyQixPQUE1QyxDQUFvRCxpQkFBUztBQUFFQyxnQkFBTWhCLEtBQU4sR0FBY00sS0FBS1csVUFBbkI7QUFBK0IsU0FBOUY7QUFDRCxPQVJELE1BUU87QUFDTFAsZ0JBQVFDLEdBQVIsQ0FBWVYsUUFBUWlCLFlBQXBCO0FBQ0Q7QUFDRixLQWREOztBQWdCQSxRQUFNQyxPQUFPMUIsUUFBUU0sYUFBUixDQUFzQixVQUF0QixDQUFiO0FBQ0FFLFlBQVFtQixNQUFSLENBQWVsQyxnQkFBZixDQUFnQyxVQUFoQyxFQUE0QyxVQUFVbUMsQ0FBVixFQUFhO0FBQ3ZELFVBQU1DLFdBQVdDLEtBQUtDLElBQUwsQ0FBVUgsRUFBRUksTUFBRixHQUFXSixFQUFFSyxLQUFiLEdBQXFCLEdBQS9CLENBQWpCO0FBQ0FQLFdBQUtRLEtBQUwsQ0FBV0MsS0FBWCxHQUFzQk4sUUFBdEI7QUFDRCxLQUhELEVBR0csS0FISDtBQUlBckIsWUFBUTRCLElBQVIsQ0FBYSxNQUFiLEVBQXFCLGVBQXJCO0FBQ0E1QixZQUFRNkIsSUFBUixDQUFhbkMsUUFBYjtBQUNEOztBQUVEUixhQUFXNEIsT0FBWCxDQUFtQixVQUFDQyxLQUFELEVBQVc7QUFDNUJBLFVBQU05QixnQkFBTixDQUF1QixRQUF2QixFQUFpQyxZQUFNO0FBQUVHLGlCQUFXMkIsS0FBWDtBQUFtQixLQUE1RDtBQUNELEdBRkQ7QUFHRCxDQXpDRCxFIiwiZmlsZSI6ImFkbWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0XCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDQ5MTFiZDgyZjQyYjU3MzYyMWIiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICBjb25zdCBmaWxlSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLWZpbGV1cGxvYWQnKVxuXG4gIGZ1bmN0aW9uIHVwbG9hZEZpbGUgKGZpbGVJbnB1dCkge1xuICAgIGlmIChmaWxlSW5wdXQuZmlsZXMubGVuZ3RoID09PSAwKSByZXR1cm5cblxuICAgIGNvbnN0IHdyYXBwZXIgPSBmaWxlSW5wdXQucGFyZW50Tm9kZVxuXG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgd2luZG93LkZvcm1EYXRhKClcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlSW5wdXQuZmlsZXNbMF0pXG4gICAgZm9ybURhdGEuYXBwZW5kKCdfY3NyZicsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwiX2NzcmZcIl0nKS52YWx1ZSlcblxuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KClcbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVyblxuXG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDIwMSkge1xuICAgICAgICBjb25zdCByZXNwID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlKVxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwKVxuXG4gICAgICAgIHdyYXBwZXIucXVlcnlTZWxlY3RvcignLmpzLWltZycpLnNyYyA9IHJlc3AuZnVsbF9uYW1lXG4gICAgICAgIHdyYXBwZXIucXVlcnlTZWxlY3RvcignLmpzLWZpbGUtdGV4dCcpLnZhbHVlID0gcmVzcC5maWxlXG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW25hbWU9XCJfY3NyZlwiXScpLmZvckVhY2goaW5wdXQgPT4geyBpbnB1dC52YWx1ZSA9IHJlc3AuY3NyZl90b2tlbiB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2cocmVxdWVzdC5yZXNwb25zZVRleHQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcGJhciA9IHdyYXBwZXIucXVlcnlTZWxlY3RvcignLmpzLXBiYXInKVxuICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNvbnN0IHByb2dyZXNzID0gTWF0aC5jZWlsKGUubG9hZGVkIC8gZS50b3RhbCAqIDEwMClcbiAgICAgIHBiYXIuc3R5bGUud2lkdGggPSBgJHtwcm9ncmVzc30lYFxuICAgIH0sIGZhbHNlKVxuICAgIHJlcXVlc3Qub3BlbigncG9zdCcsICcvYWRtaW4vdXBsb2FkJylcbiAgICByZXF1ZXN0LnNlbmQoZm9ybURhdGEpXG4gIH1cblxuICBmaWxlSW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4geyB1cGxvYWRGaWxlKGlucHV0KSB9KVxuICB9KVxufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvYWRtaW4uanMiXSwic291cmNlUm9vdCI6IiJ9