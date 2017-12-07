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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ 3:
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
    request.open('post', fileInput.dataset.path);
    request.send(formData);
  }

  fileInputs.forEach(function (input) {
    input.addEventListener('change', function () {
      uploadFile(input);
    });
  });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWI2MTkyOTM2ZTFmNjdiMzM0YjEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9hZG1pbi5qcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJmaWxlSW5wdXRzIiwicXVlcnlTZWxlY3RvckFsbCIsInVwbG9hZEZpbGUiLCJmaWxlSW5wdXQiLCJmaWxlcyIsImxlbmd0aCIsIndyYXBwZXIiLCJwYXJlbnROb2RlIiwiZm9ybURhdGEiLCJ3aW5kb3ciLCJGb3JtRGF0YSIsImFwcGVuZCIsInF1ZXJ5U2VsZWN0b3IiLCJ2YWx1ZSIsInJlcXVlc3QiLCJYTUxIdHRwUmVxdWVzdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2UiLCJjb25zb2xlIiwibG9nIiwic3JjIiwiZnVsbF9uYW1lIiwiZmlsZSIsImZvckVhY2giLCJpbnB1dCIsImNzcmZfdG9rZW4iLCJyZXNwb25zZVRleHQiLCJwYmFyIiwidXBsb2FkIiwiZSIsInByb2dyZXNzIiwiTWF0aCIsImNlaWwiLCJsb2FkZWQiLCJ0b3RhbCIsInN0eWxlIiwid2lkdGgiLCJvcGVuIiwiZGF0YXNldCIsInBhdGgiLCJzZW5kIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDN0RBQSxTQUFTQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBWTtBQUN4RCxNQUFNQyxhQUFhRixTQUFTRyxnQkFBVCxDQUEwQixnQkFBMUIsQ0FBbkI7O0FBRUEsV0FBU0MsVUFBVCxDQUFxQkMsU0FBckIsRUFBZ0M7QUFDOUIsUUFBSUEsVUFBVUMsS0FBVixDQUFnQkMsTUFBaEIsS0FBMkIsQ0FBL0IsRUFBa0M7O0FBRWxDLFFBQU1DLFVBQVVILFVBQVVJLFVBQTFCOztBQUVBLFFBQU1DLFdBQVcsSUFBSUMsT0FBT0MsUUFBWCxFQUFqQjtBQUNBRixhQUFTRyxNQUFULENBQWdCLE1BQWhCLEVBQXdCUixVQUFVQyxLQUFWLENBQWdCLENBQWhCLENBQXhCO0FBQ0FJLGFBQVNHLE1BQVQsQ0FBZ0IsT0FBaEIsRUFBeUJiLFNBQVNjLGFBQVQsQ0FBdUIsZ0JBQXZCLEVBQXlDQyxLQUFsRTs7QUFFQSxRQUFNQyxVQUFVLElBQUlMLE9BQU9NLGNBQVgsRUFBaEI7QUFDQUQsWUFBUUUsa0JBQVIsR0FBNkIsWUFBWTtBQUN2QyxVQUFJRixRQUFRRyxVQUFSLEtBQXVCLENBQTNCLEVBQThCOztBQUU5QixVQUFJSCxRQUFRSSxNQUFSLEtBQW1CLEdBQXZCLEVBQTRCO0FBQzFCLFlBQU1DLE9BQU9DLEtBQUtDLEtBQUwsQ0FBV1AsUUFBUVEsUUFBbkIsQ0FBYjtBQUNBQyxnQkFBUUMsR0FBUixDQUFZTCxJQUFaOztBQUVBYixnQkFBUU0sYUFBUixDQUFzQixTQUF0QixFQUFpQ2EsR0FBakMsR0FBdUNOLEtBQUtPLFNBQTVDO0FBQ0FwQixnQkFBUU0sYUFBUixDQUFzQixlQUF0QixFQUF1Q0MsS0FBdkMsR0FBK0NNLEtBQUtRLElBQXBEOztBQUVBN0IsaUJBQVNHLGdCQUFULENBQTBCLGdCQUExQixFQUE0QzJCLE9BQTVDLENBQW9ELGlCQUFTO0FBQUVDLGdCQUFNaEIsS0FBTixHQUFjTSxLQUFLVyxVQUFuQjtBQUErQixTQUE5RjtBQUNELE9BUkQsTUFRTztBQUNMUCxnQkFBUUMsR0FBUixDQUFZVixRQUFRaUIsWUFBcEI7QUFDRDtBQUNGLEtBZEQ7O0FBZ0JBLFFBQU1DLE9BQU8xQixRQUFRTSxhQUFSLENBQXNCLFVBQXRCLENBQWI7QUFDQUUsWUFBUW1CLE1BQVIsQ0FBZWxDLGdCQUFmLENBQWdDLFVBQWhDLEVBQTRDLFVBQVVtQyxDQUFWLEVBQWE7QUFDdkQsVUFBTUMsV0FBV0MsS0FBS0MsSUFBTCxDQUFVSCxFQUFFSSxNQUFGLEdBQVdKLEVBQUVLLEtBQWIsR0FBcUIsR0FBL0IsQ0FBakI7QUFDQVAsV0FBS1EsS0FBTCxDQUFXQyxLQUFYLEdBQXNCTixRQUF0QjtBQUNELEtBSEQsRUFHRyxLQUhIO0FBSUFyQixZQUFRNEIsSUFBUixDQUFhLE1BQWIsRUFBcUJ2QyxVQUFVd0MsT0FBVixDQUFrQkMsSUFBdkM7QUFDQTlCLFlBQVErQixJQUFSLENBQWFyQyxRQUFiO0FBQ0Q7O0FBRURSLGFBQVc0QixPQUFYLENBQW1CLFVBQUNDLEtBQUQsRUFBVztBQUM1QkEsVUFBTTlCLGdCQUFOLENBQXVCLFFBQXZCLEVBQWlDLFlBQU07QUFBRUcsaUJBQVcyQixLQUFYO0FBQW1CLEtBQTVEO0FBQ0QsR0FGRDtBQUdELENBekNELEUiLCJmaWxlIjoiYWRtaW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3RcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxYjYxOTI5MzZlMWY2N2IzMzRiMSIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGZpbGVJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtZmlsZXVwbG9hZCcpXG5cbiAgZnVuY3Rpb24gdXBsb2FkRmlsZSAoZmlsZUlucHV0KSB7XG4gICAgaWYgKGZpbGVJbnB1dC5maWxlcy5sZW5ndGggPT09IDApIHJldHVyblxuXG4gICAgY29uc3Qgd3JhcHBlciA9IGZpbGVJbnB1dC5wYXJlbnROb2RlXG5cbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyB3aW5kb3cuRm9ybURhdGEoKVxuICAgIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGZpbGVJbnB1dC5maWxlc1swXSlcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ19jc3JmJywgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW25hbWU9XCJfY3NyZlwiXScpLnZhbHVlKVxuXG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKVxuICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuXG5cbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMjAxKSB7XG4gICAgICAgIGNvbnN0IHJlc3AgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2UpXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3ApXG5cbiAgICAgICAgd3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuanMtaW1nJykuc3JjID0gcmVzcC5mdWxsX25hbWVcbiAgICAgICAgd3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuanMtZmlsZS10ZXh0JykudmFsdWUgPSByZXNwLmZpbGVcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbbmFtZT1cIl9jc3JmXCJdJykuZm9yRWFjaChpbnB1dCA9PiB7IGlucHV0LnZhbHVlID0gcmVzcC5jc3JmX3Rva2VuIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXF1ZXN0LnJlc3BvbnNlVGV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwYmFyID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuanMtcGJhcicpXG4gICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLmNlaWwoZS5sb2FkZWQgLyBlLnRvdGFsICogMTAwKVxuICAgICAgcGJhci5zdHlsZS53aWR0aCA9IGAke3Byb2dyZXNzfSVgXG4gICAgfSwgZmFsc2UpXG4gICAgcmVxdWVzdC5vcGVuKCdwb3N0JywgZmlsZUlucHV0LmRhdGFzZXQucGF0aClcbiAgICByZXF1ZXN0LnNlbmQoZm9ybURhdGEpXG4gIH1cblxuICBmaWxlSW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4geyB1cGxvYWRGaWxlKGlucHV0KSB9KVxuICB9KVxufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvYWRtaW4uanMiXSwic291cmNlUm9vdCI6IiJ9