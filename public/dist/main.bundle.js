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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// import Amber from 'amber'

document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.js-msnry')) {
    new Muuri('.msnry', {
      items: '.msnry-item',
      layout: {
        fillGaps: true,
        horizontal: false,
        alignRight: false,
        alignBottom: false,
        rounding: false
      }
    });
  }

  if (document.querySelector('.js-gmap')) {
    var mapOptions = {
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: new google.maps.LatLng(0, 0)
    };
    var map = new google.maps.Map(document.querySelector('.js-gmap'), mapOptions);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(48.923564, 24.711256),
      icon: {
        path: 'M21.216.014C10.26.397 1.156 8.924.106 19.804-.11 21.982.013 24.09.398 26.11c0 0 .033.235.146.687.34 1.51.848 2.977 1.48 4.352 2.206 5.21 7.306 13.926 18.75 23.41.7.587 1.73.587 2.44 0 11.444-9.472 16.544-18.19 18.76-23.422.644-1.376 1.142-2.83 1.48-4.353.103-.44.148-.688.148-.688.26-1.353.396-2.74.396-4.16C44 9.553 33.722-.427 21.216.013zM22 34c-6.076 0-11-4.924-11-11s4.924-11 11-11 11 4.924 11 11-4.924 11-11 11z',
        fillColor: '#FF0D35',
        fillOpacity: 1,
        anchor: new google.maps.Point(22, 55),
        strokeWeight: 0
      },
      map: map
    });
    map.panTo(marker.getPosition());
  }

  var menu = document.querySelector('.js-menu');
  document.querySelector('.js-open-menu').addEventListener('click', function (e) {
    e.preventDefault();
    menu.classList.add('is-active');
  });

  document.querySelector('.js-close-menu').addEventListener('click', function (e) {
    e.preventDefault();
    menu.classList.remove('is-active');
  });

  (function () {
    var object = document.querySelector('.nav-home-logo');
    if (!object) return;
    function show() {
      setTimeout(function () {
        var logo = object.contentDocument.getElementsByTagName('path')[0];
        logo.setAttribute('fill', '#131313');
      }, 50);
    }
    if (object.contentDocument) show();
    object.addEventListener('load', show, false);
  })();

  document.addEventListener('mouseover', function (e) {
    if (e.target && e.target.classList.contains('js-play')) {
      var player = e.target.parentElement.querySelector('.js-player');
      player.classList.add('is-active');
      player.currentTime = 0;
      player.play();
    }
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target && e.target.classList.contains('js-play')) {
      var player = e.target.parentElement.querySelector('.js-player');
      player.classList.remove('is-active');
      player.pause();
    }
  });
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTc4NmVkYTlhODFlN2VhYTMzNjgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJNdXVyaSIsIml0ZW1zIiwibGF5b3V0IiwiZmlsbEdhcHMiLCJob3Jpem9udGFsIiwiYWxpZ25SaWdodCIsImFsaWduQm90dG9tIiwicm91bmRpbmciLCJtYXBPcHRpb25zIiwiem9vbSIsIm1hcFR5cGVJZCIsImdvb2dsZSIsIm1hcHMiLCJNYXBUeXBlSWQiLCJST0FETUFQIiwiY2VudGVyIiwiTGF0TG5nIiwibWFwIiwiTWFwIiwibWFya2VyIiwiTWFya2VyIiwicG9zaXRpb24iLCJpY29uIiwicGF0aCIsImZpbGxDb2xvciIsImZpbGxPcGFjaXR5IiwiYW5jaG9yIiwiUG9pbnQiLCJzdHJva2VXZWlnaHQiLCJwYW5UbyIsImdldFBvc2l0aW9uIiwibWVudSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsIm9iamVjdCIsInNob3ciLCJzZXRUaW1lb3V0IiwibG9nbyIsImNvbnRlbnREb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic2V0QXR0cmlidXRlIiwidGFyZ2V0IiwiY29udGFpbnMiLCJwbGF5ZXIiLCJwYXJlbnRFbGVtZW50IiwiY3VycmVudFRpbWUiLCJwbGF5IiwicGF1c2UiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFB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QUFVa0MsQ0FBVixFQUFhO0FBQ2xELFFBQUlBLEVBQUVZLE1BQUYsSUFBWVosRUFBRVksTUFBRixDQUFTVixTQUFULENBQW1CVyxRQUFuQixDQUE0QixTQUE1QixDQUFoQixFQUF3RDtBQUN0RCxVQUFNQyxTQUFTZCxFQUFFWSxNQUFGLENBQVNHLGFBQVQsQ0FBdUJoRCxhQUF2QixDQUFxQyxZQUFyQyxDQUFmO0FBQ0ErQyxhQUFPWixTQUFQLENBQWlCQyxHQUFqQixDQUFxQixXQUFyQjtBQUNBVyxhQUFPRSxXQUFQLEdBQXFCLENBQXJCO0FBQ0FGLGFBQU9HLElBQVA7QUFDRDtBQUNGLEdBUEQ7QUFRQXBELFdBQVNDLGdCQUFULENBQTBCLFVBQTFCLEVBQXNDLFVBQVVrQyxDQUFWLEVBQWE7QUFDakQsUUFBSUEsRUFBRVksTUFBRixJQUFZWixFQUFFWSxNQUFGLENBQVNWLFNBQVQsQ0FBbUJXLFFBQW5CLENBQTRCLFNBQTVCLENBQWhCLEVBQXdEO0FBQ3RELFVBQU1DLFNBQVNkLEVBQUVZLE1BQUYsQ0FBU0csYUFBVCxDQUF1QmhELGFBQXZCLENBQXFDLFlBQXJDLENBQWY7QUFDQStDLGFBQU9aLFNBQVAsQ0FBaUJFLE1BQWpCLENBQXdCLFdBQXhCO0FBQ0FVLGFBQU9JLEtBQVA7QUFDRDtBQUNGLEdBTkQ7QUFPRCxDQTFFRCxFIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3RcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxNzg2ZWRhOWE4MWU3ZWFhMzM2OCIsIi8vIGltcG9ydCBBbWJlciBmcm9tICdhbWJlcidcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1tc25yeScpKSB7XG4gICAgbmV3IE11dXJpKCcubXNucnknLCB7XG4gICAgICBpdGVtczogJy5tc25yeS1pdGVtJyxcbiAgICAgIGxheW91dDoge1xuICAgICAgICBmaWxsR2FwczogdHJ1ZSxcbiAgICAgICAgaG9yaXpvbnRhbDogZmFsc2UsXG4gICAgICAgIGFsaWduUmlnaHQ6IGZhbHNlLFxuICAgICAgICBhbGlnbkJvdHRvbTogZmFsc2UsXG4gICAgICAgIHJvdW5kaW5nOiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWdtYXAnKSkge1xuICAgIHZhciBtYXBPcHRpb25zID0ge1xuICAgICAgem9vbTogMTcsXG4gICAgICBtYXBUeXBlSWQ6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQLFxuICAgICAgY2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDAsIDApXG4gICAgfVxuICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1nbWFwJyksIG1hcE9wdGlvbnMpXG4gICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgcG9zaXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNDguOTIzNTY0LCAyNC43MTEyNTYpLFxuICAgICAgaWNvbjoge1xuICAgICAgICBwYXRoOiAnTTIxLjIxNi4wMTRDMTAuMjYuMzk3IDEuMTU2IDguOTI0LjEwNiAxOS44MDQtLjExIDIxLjk4Mi4wMTMgMjQuMDkuMzk4IDI2LjExYzAgMCAuMDMzLjIzNS4xNDYuNjg3LjM0IDEuNTEuODQ4IDIuOTc3IDEuNDggNC4zNTIgMi4yMDYgNS4yMSA3LjMwNiAxMy45MjYgMTguNzUgMjMuNDEuNy41ODcgMS43My41ODcgMi40NCAwIDExLjQ0NC05LjQ3MiAxNi41NDQtMTguMTkgMTguNzYtMjMuNDIyLjY0NC0xLjM3NiAxLjE0Mi0yLjgzIDEuNDgtNC4zNTMuMTAzLS40NC4xNDgtLjY4OC4xNDgtLjY4OC4yNi0xLjM1My4zOTYtMi43NC4zOTYtNC4xNkM0NCA5LjU1MyAzMy43MjItLjQyNyAyMS4yMTYuMDEzek0yMiAzNGMtNi4wNzYgMC0xMS00LjkyNC0xMS0xMXM0LjkyNC0xMSAxMS0xMSAxMSA0LjkyNCAxMSAxMS00LjkyNCAxMS0xMSAxMXonLFxuICAgICAgICBmaWxsQ29sb3I6ICcjRkYwRDM1JyxcbiAgICAgICAgZmlsbE9wYWNpdHk6IDEsXG4gICAgICAgIGFuY2hvcjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDIyLCA1NSksXG4gICAgICAgIHN0cm9rZVdlaWdodDogMFxuICAgICAgfSxcbiAgICAgIG1hcDogbWFwXG4gICAgfSlcbiAgICBtYXAucGFuVG8obWFya2VyLmdldFBvc2l0aW9uKCkpXG4gIH1cblxuICB2YXIgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1tZW51JylcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW9wZW4tbWVudScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBtZW51LmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpXG4gIH0pXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWNsb3NlLW1lbnUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgbWVudS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKVxuICB9KTtcblxuICAoKCkgPT4ge1xuICAgIHZhciBvYmplY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2LWhvbWUtbG9nbycpXG4gICAgaWYgKCFvYmplY3QpIHJldHVyblxuICAgIGZ1bmN0aW9uIHNob3cgKCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHZhciBsb2dvID0gb2JqZWN0LmNvbnRlbnREb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgncGF0aCcpWzBdXG4gICAgICAgIGxvZ28uc2V0QXR0cmlidXRlKCdmaWxsJywgJyMxMzEzMTMnKVxuICAgICAgfSwgNTApXG4gICAgfVxuICAgIGlmIChvYmplY3QuY29udGVudERvY3VtZW50KSBzaG93KClcbiAgICBvYmplY3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHNob3csIGZhbHNlKVxuICB9KSgpXG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS50YXJnZXQgJiYgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1wbGF5JykpIHtcbiAgICAgIGNvbnN0IHBsYXllciA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXBsYXllcicpXG4gICAgICBwbGF5ZXIuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJylcbiAgICAgIHBsYXllci5jdXJyZW50VGltZSA9IDBcbiAgICAgIHBsYXllci5wbGF5KClcbiAgICB9XG4gIH0pXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS50YXJnZXQgJiYgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1wbGF5JykpIHtcbiAgICAgIGNvbnN0IHBsYXllciA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXBsYXllcicpXG4gICAgICBwbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJylcbiAgICAgIHBsYXllci5wYXVzZSgpXG4gICAgfVxuICB9KVxufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvbWFpbi5qcyJdLCJzb3VyY2VSb290IjoiIn0=