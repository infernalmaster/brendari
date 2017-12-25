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


var _swipejs = __webpack_require__(1);

var _swipejs2 = _interopRequireDefault(_swipejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: barba.js

document.addEventListener('DOMContentLoaded', function () {

  // grid
  var msnryContainer = document.querySelector('.js-msnry');
  if (msnryContainer) {
    msnryContainer.classList.add('js-activated');

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

  // GMAP
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

  // MENU
  var menu = document.querySelector('.js-menu');
  document.querySelector('.js-open-menu').addEventListener('click', function (e) {
    e.preventDefault();
    menu.classList.add('is-active');
  });
  document.querySelector('.js-close-menu').addEventListener('click', function (e) {
    e.preventDefault();
    menu.classList.remove('is-active');
  });

  // FIX logo color
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

  // gifs player on logos page
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

  // Swipejs
  new _swipejs2.default(document.querySelector('.js-swipe'), {
    draggable: true,
    continuous: false
    // disableScroll: true,
    // stopPropagation: true,
    // callback: function(index, element) {},
    // transitionEnd: function(index, element) {}
  });
}); // import Amber from 'amber'

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Swipe 2.2.10
 *
 * Brad Birdsall
 * Copyright 2013, MIT License
 *
*/

// if the module has no dependencies, the above pattern can be simplified to
// eslint-disable-next-line no-extra-semi
;(function (root, factory) {
  // eslint-disable-next-line no-undef
  if (true) {
    // AMD. Register as an anonymous module.
    // eslint-disable-next-line no-undef
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){
      root.Swipe = factory();
      return root.Swipe;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.Swipe = factory();
  }
}(this, function () {
  // Establish the root object, `window` (`self`) in the browser, `global`
  // on the server, or `this` in some virtual machines. We use `self`
  // instead of `window` for `WebWorker` support.
  var root = typeof self == 'object' && self.self === self && self ||
             typeof global == 'object' && global.global === global && global ||
             this;

  var _document = root.document;

  function Swipe(container, options) {

    'use strict';

    options = options || {};

    // setup initial vars
    var start = {};
    var delta = {};
    var isScrolling;

    // setup auto slideshow
    var delay = options.auto || 0;
    var interval;

    var disabled = false;

    // utilities
    // simple no operation function
    var noop = function() {};
    // offload a functions execution
    var offloadFn = function(fn) { setTimeout(fn || noop, 0); };
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered.
    var throttle = function (fn, threshhold) {
      threshhold = threshhold || 100;
      var timeout = null;

      function cancel() {
        if (timeout) clearTimeout(timeout);
      }

      function throttledFn() {
        var context = this;
        var args = arguments;
        cancel();
        timeout = setTimeout(function() {
          timeout = null;
          fn.apply(context, args);
        }, threshhold);
      }

      // allow remove throttled timeout
      throttledFn.cancel = cancel;

      return throttledFn;
    };

    // check browser capabilities
    var browser = {
      addEventListener: !!root.addEventListener,
      // eslint-disable-next-line no-undef
      touch: ('ontouchstart' in root) || root.DocumentTouch && _document instanceof DocumentTouch,
      transitions: (function(temp) {
        var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
        for ( var i in props ) {
          if (temp.style[ props[i] ] !== undefined){
            return true;
          }
        }
        return false;
      })(_document.createElement('swipe'))
    };

    // quit if no root element
    if (!container) return;

    var element = container.children[0];
    var slides, slidePos, width, length;
    var index = parseInt(options.startSlide, 10) || 0;
    var speed = options.speed || 300;
    options.continuous = options.continuous !== undefined ? options.continuous : true;

    // AutoRestart option: auto restart slideshow after user's touch event
    options.autoRestart = options.autoRestart !== undefined ? options.autoRestart : false;

    // throttled setup
    var throttledSetup = throttle(setup);

    // setup event capturing
    var events = {

      handleEvent: function(event) {
        if (disabled) return;

        switch (event.type) {
          case 'mousedown':
          case 'touchstart': this.start(event); break;
          case 'mousemove':
          case 'touchmove': this.move(event); break;
          case 'mouseup':
          case 'mouseleave':
          case 'touchend': this.end(event); break;
          case 'webkitTransitionEnd':
          case 'msTransitionEnd':
          case 'oTransitionEnd':
          case 'otransitionend':
          case 'transitionend': this.transitionEnd(event); break;
          case 'resize': throttledSetup(); break;
        }

        if (options.stopPropagation) {
          event.stopPropagation();
        }
      },

      start: function(event) {
        var touches;

        if (isMouseEvent(event)) {
          touches = event;
          event.preventDefault(); // For desktop Safari drag
        } else {
          touches = event.touches[0];
        }

        // measure start values
        start = {

          // get initial touch coords
          x: touches.pageX,
          y: touches.pageY,

          // store time to determine touch duration
          time: +new Date()

        };

        // used for testing first move event
        isScrolling = undefined;

        // reset delta and end measurements
        delta = {};

        // attach touchmove and touchend listeners
        if (isMouseEvent(event)) {
          element.addEventListener('mousemove', this, false);
          element.addEventListener('mouseup', this, false);
          element.addEventListener('mouseleave', this, false);
        } else {
          element.addEventListener('touchmove', this, false);
          element.addEventListener('touchend', this, false);
        }

      },

      move: function(event) {
        var touches;

        if (isMouseEvent(event)) {
          touches = event;
        } else {
          // ensure swiping with one touch and not pinching
          if ( event.touches.length > 1 || event.scale && event.scale !== 1) {
            return;
          }

          if (options.disableScroll) {
            event.preventDefault();
          }

          touches = event.touches[0];
        }

        // measure change in x and y
        delta = {
          x: touches.pageX - start.x,
          y: touches.pageY - start.y
        };

        // determine if scrolling test has run - one time test
        if ( typeof isScrolling === 'undefined') {
          isScrolling = !!( isScrolling || Math.abs(delta.x) < Math.abs(delta.y) );
        }

        // if user is not trying to scroll vertically
        if (!isScrolling) {

          // prevent native scrolling
          event.preventDefault();

          // stop slideshow
          stop();

          // increase resistance if first or last slide
          if (options.continuous) { // we don't add resistance at the end

            translate(circle(index-1), delta.x + slidePos[circle(index-1)], 0);
            translate(index, delta.x + slidePos[index], 0);
            translate(circle(index+1), delta.x + slidePos[circle(index+1)], 0);

          } else {

            delta.x =
              delta.x /
              ( (!index && delta.x > 0 ||             // if first slide and sliding left
                 index === slides.length - 1 &&        // or if last slide and sliding right
                 delta.x < 0                           // and if sliding at all
                ) ?
               ( Math.abs(delta.x) / width + 1 )      // determine resistance level
               : 1 );                                 // no resistance if false

            // translate 1:1
            translate(index-1, delta.x + slidePos[index-1], 0);
            translate(index, delta.x + slidePos[index], 0);
            translate(index+1, delta.x + slidePos[index+1], 0);
          }
        }
      },

      end: function(event) {

        // measure duration
        var duration = +new Date() - start.time;

        // determine if slide attempt triggers next/prev slide
        var isValidSlide =
            Number(duration) < 250 &&         // if slide duration is less than 250ms
            Math.abs(delta.x) > 20 ||         // and if slide amt is greater than 20px
            Math.abs(delta.x) > width/2;      // or if slide amt is greater than half the width

        // determine if slide attempt is past start and end
        var isPastBounds =
            !index && delta.x > 0 ||                      // if first slide and slide amt is greater than 0
            index === slides.length - 1 && delta.x < 0;   // or if last slide and slide amt is less than 0

        if (options.continuous) {
          isPastBounds = false;
        }

        // OLD determine direction of swipe (true:right, false:left)
        // determine direction of swipe (1: backward, -1: forward)
        var direction = Math.abs(delta.x) / delta.x;

        // if not scrolling vertically
        if (!isScrolling) {

          if (isValidSlide && !isPastBounds) {

            // if we're moving right
            if (direction < 0) {

              if (options.continuous) { // we need to get the next in this direction in place

                move(circle(index-1), -width, 0);
                move(circle(index+2), width, 0);

              } else {
                move(index-1, -width, 0);
              }

              move(index, slidePos[index]-width, speed);
              move(circle(index+1), slidePos[circle(index+1)]-width, speed);
              index = circle(index+1);

            } else {
              if (options.continuous) { // we need to get the next in this direction in place

                move(circle(index+1), width, 0);
                move(circle(index-2), -width, 0);

              } else {
                move(index+1, width, 0);
              }

              move(index, slidePos[index]+width, speed);
              move(circle(index-1), slidePos[circle(index-1)]+width, speed);
              index = circle(index-1);
            }

            runCallback(getPos(), slides[index], direction);

          } else {

            if (options.continuous) {

              move(circle(index-1), -width, speed);
              move(index, 0, speed);
              move(circle(index+1), width, speed);

            } else {

              move(index-1, -width, speed);
              move(index, 0, speed);
              move(index+1, width, speed);
            }
          }
        }

        // kill touchmove and touchend event listeners until touchstart called again
        if (isMouseEvent(event)) {
          element.removeEventListener('mousemove', events, false);
          element.removeEventListener('mouseup', events, false);
          element.removeEventListener('mouseleave', events, false);
        } else {
          element.removeEventListener('touchmove', events, false);
          element.removeEventListener('touchend', events, false);
        }

      },

      transitionEnd: function(event) {
        var currentIndex = parseInt(event.target.getAttribute('data-index'), 10);
        if (currentIndex === index) {
          if (delay || options.autoRestart) restart();

          runTransitionEnd(getPos(), slides[index]);
        }
      }
    };

    // trigger setup
    setup();

    // start auto slideshow if applicable
    begin();

    // Expose the Swipe API
    return {
      // initialize
      setup: setup,

      // go to slide
      slide: function(to, speed) {
        stop();
        slide(to, speed);
      },

      // move to previous
      prev: function() {
        stop();
        prev();
      },

      // move to next
      next: function() {
        stop();
        next();
      },

      // Restart slideshow
      restart: restart,

      // cancel slideshow
      stop: stop,

      // return current index position
      getPos: getPos,

      // disable slideshow
      disable: disable,

      // enable slideshow
      enable: enable,

      // return total number of slides
      getNumSlides: function() { return length; },

      // completely remove swipe
      kill: kill
    };

    // remove all event listeners
    function detachEvents() {
      if (browser.addEventListener) {
        // remove current event listeners
        element.removeEventListener('touchstart', events, false);
        element.removeEventListener('mousedown', events, false);
        element.removeEventListener('webkitTransitionEnd', events, false);
        element.removeEventListener('msTransitionEnd', events, false);
        element.removeEventListener('oTransitionEnd', events, false);
        element.removeEventListener('otransitionend', events, false);
        element.removeEventListener('transitionend', events, false);
        root.removeEventListener('resize', events, false);
      } else {
        root.onresize = null;
      }
    }

    // add event listeners
    function attachEvents() {
      if (browser.addEventListener) {

        // set touchstart event on element
        if (browser.touch) {
          element.addEventListener('touchstart', events, false);
        }

        if (options.draggable) {
          element.addEventListener('mousedown', events, false);
        }

        if (browser.transitions) {
          element.addEventListener('webkitTransitionEnd', events, false);
          element.addEventListener('msTransitionEnd', events, false);
          element.addEventListener('oTransitionEnd', events, false);
          element.addEventListener('otransitionend', events, false);
          element.addEventListener('transitionend', events, false);
        }

        // set resize event on window
        root.addEventListener('resize', events, false);

      } else {
        root.onresize = throttledSetup; // to play nice with old IE
      }
    }

    // clone nodes when there is only two slides
    function cloneNode(el) {
      var clone = el.cloneNode(true);
      element.appendChild(clone);

      // tag these slides as clones (to remove them on kill)
      clone.setAttribute('data-cloned', true);

      // Remove id from element
      clone.removeAttribute('id');
    }

    function setup() {
      // cache slides
      slides = element.children;
      length = slides.length;

      // slides length correction, minus cloned slides
      for (var i = 0; i < slides.length; i++) {
        if (slides[i].getAttribute('data-cloned')) length--;
      }

      // set continuous to false if only one slide
      if (slides.length < 2) {
        options.continuous = false;
      }

      // special case if two slides
      if (browser.transitions && options.continuous && slides.length < 3) {
        cloneNode(slides[0]);
        cloneNode(slides[1]);

        slides = element.children;
      }

      // create an array to store current positions of each slide
      slidePos = new Array(slides.length);

      // determine width of each slide
      width = container.getBoundingClientRect().width || container.offsetWidth;

      element.style.width = (slides.length * width * 2) + 'px';

      // stack elements
      var pos = slides.length;
      while(pos--) {
        var slide = slides[pos];

        slide.style.width = width + 'px';
        slide.setAttribute('data-index', pos);

        if (browser.transitions) {
          slide.style.left = (pos * -width) + 'px';
          move(pos, index > pos ? -width : (index < pos ? width : 0), 0);
        }
      }

      // reposition elements before and after index
      if (options.continuous && browser.transitions) {
        move(circle(index-1), -width, 0);
        move(circle(index+1), width, 0);
      }

      if (!browser.transitions) {
        element.style.left = (index * -width) + 'px';
      }

      container.style.visibility = 'visible';

      // reinitialize events
      detachEvents();
      attachEvents();
    }

    function prev() {
      if (disabled) return;

      if (options.continuous) {
        slide(index-1);
      } else if (index) {
        slide(index-1);
      }
    }

    function next() {
      if (disabled) return;

      if (options.continuous) {
        slide(index+1);
      } else if (index < slides.length - 1) {
        slide(index+1);
      }
    }

    function runCallback(pos, index, dir) {
      if (options.callback) {
        options.callback(pos, index, dir);
      }
    }

    function runTransitionEnd(pos, index) {
      if (options.transitionEnd) {
        options.transitionEnd(pos, index);
      }
    }

    function circle(index) {

      // a simple positive modulo using slides.length
      return (slides.length + (index % slides.length)) % slides.length;
    }

    function getPos() {
      // Fix for the clone issue in the event of 2 slides
      var currentIndex = index;

      if (currentIndex >= length) {
        currentIndex = currentIndex - length;
      }

      return currentIndex;
    }

    function slide(to, slideSpeed) {

      // ensure to is of type 'number'
      to = typeof to !== 'number' ? parseInt(to, 10) : to;

      // do nothing if already on requested slide
      if (index === to) return;

      if (browser.transitions) {

        var direction = Math.abs(index-to) / (index-to); // 1: backward, -1: forward

        // get the actual position of the slide
        if (options.continuous) {
          var natural_direction = direction;
          direction = -slidePos[circle(to)] / width;

          // if going forward but to < index, use to = slides.length + to
          // if going backward but to > index, use to = -slides.length + to
          if (direction !== natural_direction) {
            to = -direction * slides.length + to;
          }

        }

        var diff = Math.abs(index-to) - 1;

        // move all the slides between index and to in the right direction
        while (diff--) {
          move( circle((to > index ? to : index) - diff - 1), width * direction, 0);
        }

        to = circle(to);

        move(index, width * direction, slideSpeed || speed);
        move(to, 0, slideSpeed || speed);

        if (options.continuous) { // we need to get the next in place
          move(circle(to - direction), -(width * direction), 0);
        }

      } else {

        to = circle(to);
        animate(index * -width, to * -width, slideSpeed || speed);
        // no fallback for a circular continuous if the browser does not accept transitions
      }

      index = to;
      offloadFn(function() {
        runCallback(getPos(), slides[index], direction);
      });
    }

    function move(index, dist, speed) {
      translate(index, dist, speed);
      slidePos[index] = dist;
    }

    function translate(index, dist, speed) {

      var slide = slides[index];
      var style = slide && slide.style;

      if (!style) return;

      style.webkitTransitionDuration =
        style.MozTransitionDuration =
        style.msTransitionDuration =
        style.OTransitionDuration =
        style.transitionDuration = speed + 'ms';

      style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
      style.msTransform =
        style.MozTransform =
        style.OTransform = 'translateX(' + dist + 'px)';

    }

    function animate(from, to, speed) {

      // if not an animation, just reposition
      if (!speed) {
        element.style.left = to + 'px';
        return;
      }

      var start = +new Date();

      var timer = setInterval(function() {
        var timeElap = +new Date() - start;

        if (timeElap > speed) {

          element.style.left = to + 'px';

          if (delay || options.autoRestart) restart();

          runTransitionEnd(getPos(), slides[index]);

          clearInterval(timer);

          return;
        }

        element.style.left = (( (to - from) * (Math.floor((timeElap / speed) * 100) / 100) ) + from) + 'px';
      }, 4);

    }

    function begin() {
      delay = options.auto || 0;
      if (delay) interval = setTimeout(next, delay);
    }

    function stop() {
      delay = 0;
      clearTimeout(interval);
    }

    function restart() {
      stop();
      begin();
    }

    function disable() {
      stop();
      disabled = true;
    }

    function enable() {
      disabled = false;
      restart();
    }

    function isMouseEvent(e) {
      return /^mouse/.test(e.type);
    }

    function kill() {
      // cancel slideshow
      stop();

      // remove inline styles
      container.style.visibility = '';

      // reset element
      element.style.width = '';
      element.style.left = '';

      // reset slides
      var pos = slides.length;
      while (pos--) {

        if (browser.transitions) {
          translate(pos, 0, 0);
        }

        var slide = slides[pos];

        // if the slide is tagged as clone, remove it
        if (slide.getAttribute('data-cloned')) {
          var _parent = slide.parentElement;
          _parent.removeChild(slide);
        }

        // remove styles
        slide.style.width = '';
        slide.style.left = '';

        slide.style.webkitTransitionDuration =
          slide.style.MozTransitionDuration =
          slide.style.msTransitionDuration =
          slide.style.OTransitionDuration =
          slide.style.transitionDuration = '';

        slide.style.webkitTransform =
          slide.style.msTransform =
          slide.style.MozTransform =
          slide.style.OTransform = '';

        // remove custom attributes (?)
        // slide.removeAttribute('data-index');
      }

      // remove all events
      detachEvents();

      // remove throttled function timeout
      throttledSetup.cancel();
    }
  }

  if ( root.jQuery || root.Zepto ) {
    (function($) {
      $.fn.Swipe = function(params) {
        return this.each(function() {
          $(this).data('Swipe', new Swipe($(this)[0], params));
        });
      };
    })( root.jQuery || root.Zepto );
  }

  return Swipe;
}));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGMzMzhlNzNkMDA5ZDZmN2QyYmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9tYWluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zd2lwZWpzL3N3aXBlLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwibXNucnlDb250YWluZXIiLCJxdWVyeVNlbGVjdG9yIiwiY2xhc3NMaXN0IiwiYWRkIiwiTXV1cmkiLCJpdGVtcyIsImxheW91dCIsImZpbGxHYXBzIiwiaG9yaXpvbnRhbCIsImFsaWduUmlnaHQiLCJhbGlnbkJvdHRvbSIsInJvdW5kaW5nIiwibWFwT3B0aW9ucyIsInpvb20iLCJtYXBUeXBlSWQiLCJnb29nbGUiLCJtYXBzIiwiTWFwVHlwZUlkIiwiUk9BRE1BUCIsImNlbnRlciIsIkxhdExuZyIsIm1hcCIsIk1hcCIsIm1hcmtlciIsIk1hcmtlciIsInBvc2l0aW9uIiwiaWNvbiIsInBhdGgiLCJmaWxsQ29sb3IiLCJmaWxsT3BhY2l0eSIsImFuY2hvciIsIlBvaW50Iiwic3Ryb2tlV2VpZ2h0IiwicGFuVG8iLCJnZXRQb3NpdGlvbiIsIm1lbnUiLCJlIiwicHJldmVudERlZmF1bHQiLCJyZW1vdmUiLCJvYmplY3QiLCJzaG93Iiwic2V0VGltZW91dCIsImxvZ28iLCJjb250ZW50RG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInNldEF0dHJpYnV0ZSIsInRhcmdldCIsImNvbnRhaW5zIiwicGxheWVyIiwicGFyZW50RWxlbWVudCIsImN1cnJlbnRUaW1lIiwicGxheSIsInBhdXNlIiwiZHJhZ2dhYmxlIiwiY29udGludW91cyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsd0RBQXdEOztBQUV4RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsaUNBQWlDO0FBQ2pDO0FBQ0E7O0FBRUEsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsQ0FBQzs7Ozs7Ozs7QUNyd0JEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDIiwiZmlsZSI6IjU3MTk0ZTMwM2M5N2RiNjBlNDI2Lm1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3RcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkYzMzOGU3M2QwMDlkNmY3ZDJiZiIsIi8vIGltcG9ydCBBbWJlciBmcm9tICdhbWJlcidcbmltcG9ydCBTd2lwZWpzIGZyb20gJ3N3aXBlanMnXG4vLyBUT0RPOiBiYXJiYS5qc1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuXG4gIC8vIGdyaWRcbiAgY29uc3QgbXNucnlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbXNucnknKVxuICBpZiAobXNucnlDb250YWluZXIpIHtcbiAgICBtc25yeUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdqcy1hY3RpdmF0ZWQnKVxuXG4gICAgbmV3IE11dXJpKCcubXNucnknLCB7XG4gICAgICBpdGVtczogJy5tc25yeS1pdGVtJyxcbiAgICAgIGxheW91dDoge1xuICAgICAgICBmaWxsR2FwczogdHJ1ZSxcbiAgICAgICAgaG9yaXpvbnRhbDogZmFsc2UsXG4gICAgICAgIGFsaWduUmlnaHQ6IGZhbHNlLFxuICAgICAgICBhbGlnbkJvdHRvbTogZmFsc2UsXG4gICAgICAgIHJvdW5kaW5nOiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyBHTUFQXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtZ21hcCcpKSB7XG4gICAgdmFyIG1hcE9wdGlvbnMgPSB7XG4gICAgICB6b29tOiAxNyxcbiAgICAgIG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsXG4gICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoMCwgMClcbiAgICB9XG4gICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWdtYXAnKSwgbWFwT3B0aW9ucylcbiAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICBwb3NpdGlvbjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg0OC45MjM1NjQsIDI0LjcxMTI1NiksXG4gICAgICBpY29uOiB7XG4gICAgICAgIHBhdGg6ICdNMjEuMjE2LjAxNEMxMC4yNi4zOTcgMS4xNTYgOC45MjQuMTA2IDE5LjgwNC0uMTEgMjEuOTgyLjAxMyAyNC4wOS4zOTggMjYuMTFjMCAwIC4wMzMuMjM1LjE0Ni42ODcuMzQgMS41MS44NDggMi45NzcgMS40OCA0LjM1MiAyLjIwNiA1LjIxIDcuMzA2IDEzLjkyNiAxOC43NSAyMy40MS43LjU4NyAxLjczLjU4NyAyLjQ0IDAgMTEuNDQ0LTkuNDcyIDE2LjU0NC0xOC4xOSAxOC43Ni0yMy40MjIuNjQ0LTEuMzc2IDEuMTQyLTIuODMgMS40OC00LjM1My4xMDMtLjQ0LjE0OC0uNjg4LjE0OC0uNjg4LjI2LTEuMzUzLjM5Ni0yLjc0LjM5Ni00LjE2QzQ0IDkuNTUzIDMzLjcyMi0uNDI3IDIxLjIxNi4wMTN6TTIyIDM0Yy02LjA3NiAwLTExLTQuOTI0LTExLTExczQuOTI0LTExIDExLTExIDExIDQuOTI0IDExIDExLTQuOTI0IDExLTExIDExeicsXG4gICAgICAgIGZpbGxDb2xvcjogJyNGRjBEMzUnLFxuICAgICAgICBmaWxsT3BhY2l0eTogMSxcbiAgICAgICAgYW5jaG9yOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMjIsIDU1KSxcbiAgICAgICAgc3Ryb2tlV2VpZ2h0OiAwXG4gICAgICB9LFxuICAgICAgbWFwOiBtYXBcbiAgICB9KVxuICAgIG1hcC5wYW5UbyhtYXJrZXIuZ2V0UG9zaXRpb24oKSlcbiAgfVxuXG4gIC8vIE1FTlVcbiAgdmFyIG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbWVudScpXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1vcGVuLW1lbnUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgbWVudS5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKVxuICB9KVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtY2xvc2UtbWVudScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBtZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpXG4gIH0pO1xuXG4gIC8vIEZJWCBsb2dvIGNvbG9yXG4gICgoKSA9PiB7XG4gICAgdmFyIG9iamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtaG9tZS1sb2dvJylcbiAgICBpZiAoIW9iamVjdCkgcmV0dXJuXG4gICAgZnVuY3Rpb24gc2hvdyAoKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdmFyIGxvZ28gPSBvYmplY3QuY29udGVudERvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwYXRoJylbMF1cbiAgICAgICAgbG9nby5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnIzEzMTMxMycpXG4gICAgICB9LCA1MClcbiAgICB9XG4gICAgaWYgKG9iamVjdC5jb250ZW50RG9jdW1lbnQpIHNob3coKVxuICAgIG9iamVjdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgc2hvdywgZmFsc2UpXG4gIH0pKClcblxuICAvLyBnaWZzIHBsYXllciBvbiBsb2dvcyBwYWdlXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGUudGFyZ2V0ICYmIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnanMtcGxheScpKSB7XG4gICAgICBjb25zdCBwbGF5ZXIgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1wbGF5ZXInKVxuICAgICAgcGxheWVyLmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpXG4gICAgICBwbGF5ZXIuY3VycmVudFRpbWUgPSAwXG4gICAgICBwbGF5ZXIucGxheSgpXG4gICAgfVxuICB9KVxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGUudGFyZ2V0ICYmIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnanMtcGxheScpKSB7XG4gICAgICBjb25zdCBwbGF5ZXIgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1wbGF5ZXInKVxuICAgICAgcGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpXG4gICAgICBwbGF5ZXIucGF1c2UoKVxuICAgIH1cbiAgfSlcblxuICAvLyBTd2lwZWpzXG4gIG5ldyBTd2lwZWpzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1zd2lwZScpLCB7XG4gICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgIGNvbnRpbnVvdXM6IGZhbHNlXG4gICAgLy8gZGlzYWJsZVNjcm9sbDogdHJ1ZSxcbiAgICAvLyBzdG9wUHJvcGFnYXRpb246IHRydWUsXG4gICAgLy8gY2FsbGJhY2s6IGZ1bmN0aW9uKGluZGV4LCBlbGVtZW50KSB7fSxcbiAgICAvLyB0cmFuc2l0aW9uRW5kOiBmdW5jdGlvbihpbmRleCwgZWxlbWVudCkge31cbiAgfSlcbn0pXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL21haW4uanMiLCIvKiFcbiAqIFN3aXBlIDIuMi4xMFxuICpcbiAqIEJyYWQgQmlyZHNhbGxcbiAqIENvcHlyaWdodCAyMDEzLCBNSVQgTGljZW5zZVxuICpcbiovXG5cbi8vIGlmIHRoZSBtb2R1bGUgaGFzIG5vIGRlcGVuZGVuY2llcywgdGhlIGFib3ZlIHBhdHRlcm4gY2FuIGJlIHNpbXBsaWZpZWQgdG9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1leHRyYS1zZW1pXG47KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIGRlZmluZShbXSwgZnVuY3Rpb24oKXtcbiAgICAgIHJvb3QuU3dpcGUgPSBmYWN0b3J5KCk7XG4gICAgICByZXR1cm4gcm9vdC5Td2lwZTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIC8vIE5vZGUuIERvZXMgbm90IHdvcmsgd2l0aCBzdHJpY3QgQ29tbW9uSlMsIGJ1dFxuICAgIC8vIG9ubHkgQ29tbW9uSlMtbGlrZSBlbnZpcm9ubWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLFxuICAgIC8vIGxpa2UgTm9kZS5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHNcbiAgICByb290LlN3aXBlID0gZmFjdG9yeSgpO1xuICB9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgLy8gRXN0YWJsaXNoIHRoZSByb290IG9iamVjdCwgYHdpbmRvd2AgKGBzZWxmYCkgaW4gdGhlIGJyb3dzZXIsIGBnbG9iYWxgXG4gIC8vIG9uIHRoZSBzZXJ2ZXIsIG9yIGB0aGlzYCBpbiBzb21lIHZpcnR1YWwgbWFjaGluZXMuIFdlIHVzZSBgc2VsZmBcbiAgLy8gaW5zdGVhZCBvZiBgd2luZG93YCBmb3IgYFdlYldvcmtlcmAgc3VwcG9ydC5cbiAgdmFyIHJvb3QgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmLnNlbGYgPT09IHNlbGYgJiYgc2VsZiB8fFxuICAgICAgICAgICAgIHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsLmdsb2JhbCA9PT0gZ2xvYmFsICYmIGdsb2JhbCB8fFxuICAgICAgICAgICAgIHRoaXM7XG5cbiAgdmFyIF9kb2N1bWVudCA9IHJvb3QuZG9jdW1lbnQ7XG5cbiAgZnVuY3Rpb24gU3dpcGUoY29udGFpbmVyLCBvcHRpb25zKSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIC8vIHNldHVwIGluaXRpYWwgdmFyc1xuICAgIHZhciBzdGFydCA9IHt9O1xuICAgIHZhciBkZWx0YSA9IHt9O1xuICAgIHZhciBpc1Njcm9sbGluZztcblxuICAgIC8vIHNldHVwIGF1dG8gc2xpZGVzaG93XG4gICAgdmFyIGRlbGF5ID0gb3B0aW9ucy5hdXRvIHx8IDA7XG4gICAgdmFyIGludGVydmFsO1xuXG4gICAgdmFyIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgICAvLyB1dGlsaXRpZXNcbiAgICAvLyBzaW1wbGUgbm8gb3BlcmF0aW9uIGZ1bmN0aW9uXG4gICAgdmFyIG5vb3AgPSBmdW5jdGlvbigpIHt9O1xuICAgIC8vIG9mZmxvYWQgYSBmdW5jdGlvbnMgZXhlY3V0aW9uXG4gICAgdmFyIG9mZmxvYWRGbiA9IGZ1bmN0aW9uKGZuKSB7IHNldFRpbWVvdXQoZm4gfHwgbm9vcCwgMCk7IH07XG4gICAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuICAgIC8vIGJlIHRyaWdnZXJlZC5cbiAgICB2YXIgdGhyb3R0bGUgPSBmdW5jdGlvbiAoZm4sIHRocmVzaGhvbGQpIHtcbiAgICAgIHRocmVzaGhvbGQgPSB0aHJlc2hob2xkIHx8IDEwMDtcbiAgICAgIHZhciB0aW1lb3V0ID0gbnVsbDtcblxuICAgICAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgICAgICBpZiAodGltZW91dCkgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB0aHJvdHRsZWRGbigpIHtcbiAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgY2FuY2VsKCk7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICB9LCB0aHJlc2hob2xkKTtcbiAgICAgIH1cblxuICAgICAgLy8gYWxsb3cgcmVtb3ZlIHRocm90dGxlZCB0aW1lb3V0XG4gICAgICB0aHJvdHRsZWRGbi5jYW5jZWwgPSBjYW5jZWw7XG5cbiAgICAgIHJldHVybiB0aHJvdHRsZWRGbjtcbiAgICB9O1xuXG4gICAgLy8gY2hlY2sgYnJvd3NlciBjYXBhYmlsaXRpZXNcbiAgICB2YXIgYnJvd3NlciA9IHtcbiAgICAgIGFkZEV2ZW50TGlzdGVuZXI6ICEhcm9vdC5hZGRFdmVudExpc3RlbmVyLFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgICB0b3VjaDogKCdvbnRvdWNoc3RhcnQnIGluIHJvb3QpIHx8IHJvb3QuRG9jdW1lbnRUb3VjaCAmJiBfZG9jdW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoLFxuICAgICAgdHJhbnNpdGlvbnM6IChmdW5jdGlvbih0ZW1wKSB7XG4gICAgICAgIHZhciBwcm9wcyA9IFsndHJhbnNpdGlvblByb3BlcnR5JywgJ1dlYmtpdFRyYW5zaXRpb24nLCAnTW96VHJhbnNpdGlvbicsICdPVHJhbnNpdGlvbicsICdtc1RyYW5zaXRpb24nXTtcbiAgICAgICAgZm9yICggdmFyIGkgaW4gcHJvcHMgKSB7XG4gICAgICAgICAgaWYgKHRlbXAuc3R5bGVbIHByb3BzW2ldIF0gIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSkoX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N3aXBlJykpXG4gICAgfTtcblxuICAgIC8vIHF1aXQgaWYgbm8gcm9vdCBlbGVtZW50XG4gICAgaWYgKCFjb250YWluZXIpIHJldHVybjtcblxuICAgIHZhciBlbGVtZW50ID0gY29udGFpbmVyLmNoaWxkcmVuWzBdO1xuICAgIHZhciBzbGlkZXMsIHNsaWRlUG9zLCB3aWR0aCwgbGVuZ3RoO1xuICAgIHZhciBpbmRleCA9IHBhcnNlSW50KG9wdGlvbnMuc3RhcnRTbGlkZSwgMTApIHx8IDA7XG4gICAgdmFyIHNwZWVkID0gb3B0aW9ucy5zcGVlZCB8fCAzMDA7XG4gICAgb3B0aW9ucy5jb250aW51b3VzID0gb3B0aW9ucy5jb250aW51b3VzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNvbnRpbnVvdXMgOiB0cnVlO1xuXG4gICAgLy8gQXV0b1Jlc3RhcnQgb3B0aW9uOiBhdXRvIHJlc3RhcnQgc2xpZGVzaG93IGFmdGVyIHVzZXIncyB0b3VjaCBldmVudFxuICAgIG9wdGlvbnMuYXV0b1Jlc3RhcnQgPSBvcHRpb25zLmF1dG9SZXN0YXJ0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmF1dG9SZXN0YXJ0IDogZmFsc2U7XG5cbiAgICAvLyB0aHJvdHRsZWQgc2V0dXBcbiAgICB2YXIgdGhyb3R0bGVkU2V0dXAgPSB0aHJvdHRsZShzZXR1cCk7XG5cbiAgICAvLyBzZXR1cCBldmVudCBjYXB0dXJpbmdcbiAgICB2YXIgZXZlbnRzID0ge1xuXG4gICAgICBoYW5kbGVFdmVudDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGRpc2FibGVkKSByZXR1cm47XG5cbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgY2FzZSAnbW91c2Vkb3duJzpcbiAgICAgICAgICBjYXNlICd0b3VjaHN0YXJ0JzogdGhpcy5zdGFydChldmVudCk7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ21vdXNlbW92ZSc6XG4gICAgICAgICAgY2FzZSAndG91Y2htb3ZlJzogdGhpcy5tb3ZlKGV2ZW50KTsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbW91c2V1cCc6XG4gICAgICAgICAgY2FzZSAnbW91c2VsZWF2ZSc6XG4gICAgICAgICAgY2FzZSAndG91Y2hlbmQnOiB0aGlzLmVuZChldmVudCk7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3dlYmtpdFRyYW5zaXRpb25FbmQnOlxuICAgICAgICAgIGNhc2UgJ21zVHJhbnNpdGlvbkVuZCc6XG4gICAgICAgICAgY2FzZSAnb1RyYW5zaXRpb25FbmQnOlxuICAgICAgICAgIGNhc2UgJ290cmFuc2l0aW9uZW5kJzpcbiAgICAgICAgICBjYXNlICd0cmFuc2l0aW9uZW5kJzogdGhpcy50cmFuc2l0aW9uRW5kKGV2ZW50KTsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncmVzaXplJzogdGhyb3R0bGVkU2V0dXAoKTsgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5zdG9wUHJvcGFnYXRpb24pIHtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgc3RhcnQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciB0b3VjaGVzO1xuXG4gICAgICAgIGlmIChpc01vdXNlRXZlbnQoZXZlbnQpKSB7XG4gICAgICAgICAgdG91Y2hlcyA9IGV2ZW50O1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIEZvciBkZXNrdG9wIFNhZmFyaSBkcmFnXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG91Y2hlcyA9IGV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtZWFzdXJlIHN0YXJ0IHZhbHVlc1xuICAgICAgICBzdGFydCA9IHtcblxuICAgICAgICAgIC8vIGdldCBpbml0aWFsIHRvdWNoIGNvb3Jkc1xuICAgICAgICAgIHg6IHRvdWNoZXMucGFnZVgsXG4gICAgICAgICAgeTogdG91Y2hlcy5wYWdlWSxcblxuICAgICAgICAgIC8vIHN0b3JlIHRpbWUgdG8gZGV0ZXJtaW5lIHRvdWNoIGR1cmF0aW9uXG4gICAgICAgICAgdGltZTogK25ldyBEYXRlKClcblxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHVzZWQgZm9yIHRlc3RpbmcgZmlyc3QgbW92ZSBldmVudFxuICAgICAgICBpc1Njcm9sbGluZyA9IHVuZGVmaW5lZDtcblxuICAgICAgICAvLyByZXNldCBkZWx0YSBhbmQgZW5kIG1lYXN1cmVtZW50c1xuICAgICAgICBkZWx0YSA9IHt9O1xuXG4gICAgICAgIC8vIGF0dGFjaCB0b3VjaG1vdmUgYW5kIHRvdWNoZW5kIGxpc3RlbmVyc1xuICAgICAgICBpZiAoaXNNb3VzZUV2ZW50KGV2ZW50KSkge1xuICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcywgZmFsc2UpO1xuICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMsIGZhbHNlKTtcbiAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLCBmYWxzZSk7XG4gICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICB9LFxuXG4gICAgICBtb3ZlOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgdG91Y2hlcztcblxuICAgICAgICBpZiAoaXNNb3VzZUV2ZW50KGV2ZW50KSkge1xuICAgICAgICAgIHRvdWNoZXMgPSBldmVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBlbnN1cmUgc3dpcGluZyB3aXRoIG9uZSB0b3VjaCBhbmQgbm90IHBpbmNoaW5nXG4gICAgICAgICAgaWYgKCBldmVudC50b3VjaGVzLmxlbmd0aCA+IDEgfHwgZXZlbnQuc2NhbGUgJiYgZXZlbnQuc2NhbGUgIT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAob3B0aW9ucy5kaXNhYmxlU2Nyb2xsKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRvdWNoZXMgPSBldmVudC50b3VjaGVzWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWVhc3VyZSBjaGFuZ2UgaW4geCBhbmQgeVxuICAgICAgICBkZWx0YSA9IHtcbiAgICAgICAgICB4OiB0b3VjaGVzLnBhZ2VYIC0gc3RhcnQueCxcbiAgICAgICAgICB5OiB0b3VjaGVzLnBhZ2VZIC0gc3RhcnQueVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGRldGVybWluZSBpZiBzY3JvbGxpbmcgdGVzdCBoYXMgcnVuIC0gb25lIHRpbWUgdGVzdFxuICAgICAgICBpZiAoIHR5cGVvZiBpc1Njcm9sbGluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpc1Njcm9sbGluZyA9ICEhKCBpc1Njcm9sbGluZyB8fCBNYXRoLmFicyhkZWx0YS54KSA8IE1hdGguYWJzKGRlbHRhLnkpICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB1c2VyIGlzIG5vdCB0cnlpbmcgdG8gc2Nyb2xsIHZlcnRpY2FsbHlcbiAgICAgICAgaWYgKCFpc1Njcm9sbGluZykge1xuXG4gICAgICAgICAgLy8gcHJldmVudCBuYXRpdmUgc2Nyb2xsaW5nXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIC8vIHN0b3Agc2xpZGVzaG93XG4gICAgICAgICAgc3RvcCgpO1xuXG4gICAgICAgICAgLy8gaW5jcmVhc2UgcmVzaXN0YW5jZSBpZiBmaXJzdCBvciBsYXN0IHNsaWRlXG4gICAgICAgICAgaWYgKG9wdGlvbnMuY29udGludW91cykgeyAvLyB3ZSBkb24ndCBhZGQgcmVzaXN0YW5jZSBhdCB0aGUgZW5kXG5cbiAgICAgICAgICAgIHRyYW5zbGF0ZShjaXJjbGUoaW5kZXgtMSksIGRlbHRhLnggKyBzbGlkZVBvc1tjaXJjbGUoaW5kZXgtMSldLCAwKTtcbiAgICAgICAgICAgIHRyYW5zbGF0ZShpbmRleCwgZGVsdGEueCArIHNsaWRlUG9zW2luZGV4XSwgMCk7XG4gICAgICAgICAgICB0cmFuc2xhdGUoY2lyY2xlKGluZGV4KzEpLCBkZWx0YS54ICsgc2xpZGVQb3NbY2lyY2xlKGluZGV4KzEpXSwgMCk7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBkZWx0YS54ID1cbiAgICAgICAgICAgICAgZGVsdGEueCAvXG4gICAgICAgICAgICAgICggKCFpbmRleCAmJiBkZWx0YS54ID4gMCB8fCAgICAgICAgICAgICAvLyBpZiBmaXJzdCBzbGlkZSBhbmQgc2xpZGluZyBsZWZ0XG4gICAgICAgICAgICAgICAgIGluZGV4ID09PSBzbGlkZXMubGVuZ3RoIC0gMSAmJiAgICAgICAgLy8gb3IgaWYgbGFzdCBzbGlkZSBhbmQgc2xpZGluZyByaWdodFxuICAgICAgICAgICAgICAgICBkZWx0YS54IDwgMCAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCBpZiBzbGlkaW5nIGF0IGFsbFxuICAgICAgICAgICAgICAgICkgP1xuICAgICAgICAgICAgICAgKCBNYXRoLmFicyhkZWx0YS54KSAvIHdpZHRoICsgMSApICAgICAgLy8gZGV0ZXJtaW5lIHJlc2lzdGFuY2UgbGV2ZWxcbiAgICAgICAgICAgICAgIDogMSApOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vIHJlc2lzdGFuY2UgaWYgZmFsc2VcblxuICAgICAgICAgICAgLy8gdHJhbnNsYXRlIDE6MVxuICAgICAgICAgICAgdHJhbnNsYXRlKGluZGV4LTEsIGRlbHRhLnggKyBzbGlkZVBvc1tpbmRleC0xXSwgMCk7XG4gICAgICAgICAgICB0cmFuc2xhdGUoaW5kZXgsIGRlbHRhLnggKyBzbGlkZVBvc1tpbmRleF0sIDApO1xuICAgICAgICAgICAgdHJhbnNsYXRlKGluZGV4KzEsIGRlbHRhLnggKyBzbGlkZVBvc1tpbmRleCsxXSwgMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBlbmQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgLy8gbWVhc3VyZSBkdXJhdGlvblxuICAgICAgICB2YXIgZHVyYXRpb24gPSArbmV3IERhdGUoKSAtIHN0YXJ0LnRpbWU7XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIGlmIHNsaWRlIGF0dGVtcHQgdHJpZ2dlcnMgbmV4dC9wcmV2IHNsaWRlXG4gICAgICAgIHZhciBpc1ZhbGlkU2xpZGUgPVxuICAgICAgICAgICAgTnVtYmVyKGR1cmF0aW9uKSA8IDI1MCAmJiAgICAgICAgIC8vIGlmIHNsaWRlIGR1cmF0aW9uIGlzIGxlc3MgdGhhbiAyNTBtc1xuICAgICAgICAgICAgTWF0aC5hYnMoZGVsdGEueCkgPiAyMCB8fCAgICAgICAgIC8vIGFuZCBpZiBzbGlkZSBhbXQgaXMgZ3JlYXRlciB0aGFuIDIwcHhcbiAgICAgICAgICAgIE1hdGguYWJzKGRlbHRhLngpID4gd2lkdGgvMjsgICAgICAvLyBvciBpZiBzbGlkZSBhbXQgaXMgZ3JlYXRlciB0aGFuIGhhbGYgdGhlIHdpZHRoXG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIGlmIHNsaWRlIGF0dGVtcHQgaXMgcGFzdCBzdGFydCBhbmQgZW5kXG4gICAgICAgIHZhciBpc1Bhc3RCb3VuZHMgPVxuICAgICAgICAgICAgIWluZGV4ICYmIGRlbHRhLnggPiAwIHx8ICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGZpcnN0IHNsaWRlIGFuZCBzbGlkZSBhbXQgaXMgZ3JlYXRlciB0aGFuIDBcbiAgICAgICAgICAgIGluZGV4ID09PSBzbGlkZXMubGVuZ3RoIC0gMSAmJiBkZWx0YS54IDwgMDsgICAvLyBvciBpZiBsYXN0IHNsaWRlIGFuZCBzbGlkZSBhbXQgaXMgbGVzcyB0aGFuIDBcblxuICAgICAgICBpZiAob3B0aW9ucy5jb250aW51b3VzKSB7XG4gICAgICAgICAgaXNQYXN0Qm91bmRzID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBPTEQgZGV0ZXJtaW5lIGRpcmVjdGlvbiBvZiBzd2lwZSAodHJ1ZTpyaWdodCwgZmFsc2U6bGVmdClcbiAgICAgICAgLy8gZGV0ZXJtaW5lIGRpcmVjdGlvbiBvZiBzd2lwZSAoMTogYmFja3dhcmQsIC0xOiBmb3J3YXJkKVxuICAgICAgICB2YXIgZGlyZWN0aW9uID0gTWF0aC5hYnMoZGVsdGEueCkgLyBkZWx0YS54O1xuXG4gICAgICAgIC8vIGlmIG5vdCBzY3JvbGxpbmcgdmVydGljYWxseVxuICAgICAgICBpZiAoIWlzU2Nyb2xsaW5nKSB7XG5cbiAgICAgICAgICBpZiAoaXNWYWxpZFNsaWRlICYmICFpc1Bhc3RCb3VuZHMpIHtcblxuICAgICAgICAgICAgLy8gaWYgd2UncmUgbW92aW5nIHJpZ2h0XG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uIDwgMCkge1xuXG4gICAgICAgICAgICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMpIHsgLy8gd2UgbmVlZCB0byBnZXQgdGhlIG5leHQgaW4gdGhpcyBkaXJlY3Rpb24gaW4gcGxhY2VcblxuICAgICAgICAgICAgICAgIG1vdmUoY2lyY2xlKGluZGV4LTEpLCAtd2lkdGgsIDApO1xuICAgICAgICAgICAgICAgIG1vdmUoY2lyY2xlKGluZGV4KzIpLCB3aWR0aCwgMCk7XG5cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtb3ZlKGluZGV4LTEsIC13aWR0aCwgMCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBtb3ZlKGluZGV4LCBzbGlkZVBvc1tpbmRleF0td2lkdGgsIHNwZWVkKTtcbiAgICAgICAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgrMSksIHNsaWRlUG9zW2NpcmNsZShpbmRleCsxKV0td2lkdGgsIHNwZWVkKTtcbiAgICAgICAgICAgICAgaW5kZXggPSBjaXJjbGUoaW5kZXgrMSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMpIHsgLy8gd2UgbmVlZCB0byBnZXQgdGhlIG5leHQgaW4gdGhpcyBkaXJlY3Rpb24gaW4gcGxhY2VcblxuICAgICAgICAgICAgICAgIG1vdmUoY2lyY2xlKGluZGV4KzEpLCB3aWR0aCwgMCk7XG4gICAgICAgICAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgtMiksIC13aWR0aCwgMCk7XG5cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtb3ZlKGluZGV4KzEsIHdpZHRoLCAwKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIG1vdmUoaW5kZXgsIHNsaWRlUG9zW2luZGV4XSt3aWR0aCwgc3BlZWQpO1xuICAgICAgICAgICAgICBtb3ZlKGNpcmNsZShpbmRleC0xKSwgc2xpZGVQb3NbY2lyY2xlKGluZGV4LTEpXSt3aWR0aCwgc3BlZWQpO1xuICAgICAgICAgICAgICBpbmRleCA9IGNpcmNsZShpbmRleC0xKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcnVuQ2FsbGJhY2soZ2V0UG9zKCksIHNsaWRlc1tpbmRleF0sIGRpcmVjdGlvbik7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jb250aW51b3VzKSB7XG5cbiAgICAgICAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgtMSksIC13aWR0aCwgc3BlZWQpO1xuICAgICAgICAgICAgICBtb3ZlKGluZGV4LCAwLCBzcGVlZCk7XG4gICAgICAgICAgICAgIG1vdmUoY2lyY2xlKGluZGV4KzEpLCB3aWR0aCwgc3BlZWQpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgIG1vdmUoaW5kZXgtMSwgLXdpZHRoLCBzcGVlZCk7XG4gICAgICAgICAgICAgIG1vdmUoaW5kZXgsIDAsIHNwZWVkKTtcbiAgICAgICAgICAgICAgbW92ZShpbmRleCsxLCB3aWR0aCwgc3BlZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGtpbGwgdG91Y2htb3ZlIGFuZCB0b3VjaGVuZCBldmVudCBsaXN0ZW5lcnMgdW50aWwgdG91Y2hzdGFydCBjYWxsZWQgYWdhaW5cbiAgICAgICAgaWYgKGlzTW91c2VFdmVudChldmVudCkpIHtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgIH0sXG5cbiAgICAgIHRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBjdXJyZW50SW5kZXggPSBwYXJzZUludChldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgaWYgKGN1cnJlbnRJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICBpZiAoZGVsYXkgfHwgb3B0aW9ucy5hdXRvUmVzdGFydCkgcmVzdGFydCgpO1xuXG4gICAgICAgICAgcnVuVHJhbnNpdGlvbkVuZChnZXRQb3MoKSwgc2xpZGVzW2luZGV4XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gdHJpZ2dlciBzZXR1cFxuICAgIHNldHVwKCk7XG5cbiAgICAvLyBzdGFydCBhdXRvIHNsaWRlc2hvdyBpZiBhcHBsaWNhYmxlXG4gICAgYmVnaW4oKTtcblxuICAgIC8vIEV4cG9zZSB0aGUgU3dpcGUgQVBJXG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIGluaXRpYWxpemVcbiAgICAgIHNldHVwOiBzZXR1cCxcblxuICAgICAgLy8gZ28gdG8gc2xpZGVcbiAgICAgIHNsaWRlOiBmdW5jdGlvbih0bywgc3BlZWQpIHtcbiAgICAgICAgc3RvcCgpO1xuICAgICAgICBzbGlkZSh0bywgc3BlZWQpO1xuICAgICAgfSxcblxuICAgICAgLy8gbW92ZSB0byBwcmV2aW91c1xuICAgICAgcHJldjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHN0b3AoKTtcbiAgICAgICAgcHJldigpO1xuICAgICAgfSxcblxuICAgICAgLy8gbW92ZSB0byBuZXh0XG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgc3RvcCgpO1xuICAgICAgICBuZXh0KCk7XG4gICAgICB9LFxuXG4gICAgICAvLyBSZXN0YXJ0IHNsaWRlc2hvd1xuICAgICAgcmVzdGFydDogcmVzdGFydCxcblxuICAgICAgLy8gY2FuY2VsIHNsaWRlc2hvd1xuICAgICAgc3RvcDogc3RvcCxcblxuICAgICAgLy8gcmV0dXJuIGN1cnJlbnQgaW5kZXggcG9zaXRpb25cbiAgICAgIGdldFBvczogZ2V0UG9zLFxuXG4gICAgICAvLyBkaXNhYmxlIHNsaWRlc2hvd1xuICAgICAgZGlzYWJsZTogZGlzYWJsZSxcblxuICAgICAgLy8gZW5hYmxlIHNsaWRlc2hvd1xuICAgICAgZW5hYmxlOiBlbmFibGUsXG5cbiAgICAgIC8vIHJldHVybiB0b3RhbCBudW1iZXIgb2Ygc2xpZGVzXG4gICAgICBnZXROdW1TbGlkZXM6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbGVuZ3RoOyB9LFxuXG4gICAgICAvLyBjb21wbGV0ZWx5IHJlbW92ZSBzd2lwZVxuICAgICAga2lsbDoga2lsbFxuICAgIH07XG5cbiAgICAvLyByZW1vdmUgYWxsIGV2ZW50IGxpc3RlbmVyc1xuICAgIGZ1bmN0aW9uIGRldGFjaEV2ZW50cygpIHtcbiAgICAgIGlmIChicm93c2VyLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgLy8gcmVtb3ZlIGN1cnJlbnQgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBldmVudHMsIGZhbHNlKTtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtc1RyYW5zaXRpb25FbmQnLCBldmVudHMsIGZhbHNlKTtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdvVHJhbnNpdGlvbkVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ290cmFuc2l0aW9uZW5kJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICByb290LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdC5vbnJlc2l6ZSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyc1xuICAgIGZ1bmN0aW9uIGF0dGFjaEV2ZW50cygpIHtcbiAgICAgIGlmIChicm93c2VyLmFkZEV2ZW50TGlzdGVuZXIpIHtcblxuICAgICAgICAvLyBzZXQgdG91Y2hzdGFydCBldmVudCBvbiBlbGVtZW50XG4gICAgICAgIGlmIChicm93c2VyLnRvdWNoKSB7XG4gICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5kcmFnZ2FibGUpIHtcbiAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJyb3dzZXIudHJhbnNpdGlvbnMpIHtcbiAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBldmVudHMsIGZhbHNlKTtcbiAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21zVHJhbnNpdGlvbkVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignb1RyYW5zaXRpb25FbmQnLCBldmVudHMsIGZhbHNlKTtcbiAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ290cmFuc2l0aW9uZW5kJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZXQgcmVzaXplIGV2ZW50IG9uIHdpbmRvd1xuICAgICAgICByb290LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGV2ZW50cywgZmFsc2UpO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb290Lm9ucmVzaXplID0gdGhyb3R0bGVkU2V0dXA7IC8vIHRvIHBsYXkgbmljZSB3aXRoIG9sZCBJRVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNsb25lIG5vZGVzIHdoZW4gdGhlcmUgaXMgb25seSB0d28gc2xpZGVzXG4gICAgZnVuY3Rpb24gY2xvbmVOb2RlKGVsKSB7XG4gICAgICB2YXIgY2xvbmUgPSBlbC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNsb25lKTtcblxuICAgICAgLy8gdGFnIHRoZXNlIHNsaWRlcyBhcyBjbG9uZXMgKHRvIHJlbW92ZSB0aGVtIG9uIGtpbGwpXG4gICAgICBjbG9uZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY2xvbmVkJywgdHJ1ZSk7XG5cbiAgICAgIC8vIFJlbW92ZSBpZCBmcm9tIGVsZW1lbnRcbiAgICAgIGNsb25lLnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cCgpIHtcbiAgICAgIC8vIGNhY2hlIHNsaWRlc1xuICAgICAgc2xpZGVzID0gZWxlbWVudC5jaGlsZHJlbjtcbiAgICAgIGxlbmd0aCA9IHNsaWRlcy5sZW5ndGg7XG5cbiAgICAgIC8vIHNsaWRlcyBsZW5ndGggY29ycmVjdGlvbiwgbWludXMgY2xvbmVkIHNsaWRlc1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNsaWRlc1tpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2xvbmVkJykpIGxlbmd0aC0tO1xuICAgICAgfVxuXG4gICAgICAvLyBzZXQgY29udGludW91cyB0byBmYWxzZSBpZiBvbmx5IG9uZSBzbGlkZVxuICAgICAgaWYgKHNsaWRlcy5sZW5ndGggPCAyKSB7XG4gICAgICAgIG9wdGlvbnMuY29udGludW91cyA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBzcGVjaWFsIGNhc2UgaWYgdHdvIHNsaWRlc1xuICAgICAgaWYgKGJyb3dzZXIudHJhbnNpdGlvbnMgJiYgb3B0aW9ucy5jb250aW51b3VzICYmIHNsaWRlcy5sZW5ndGggPCAzKSB7XG4gICAgICAgIGNsb25lTm9kZShzbGlkZXNbMF0pO1xuICAgICAgICBjbG9uZU5vZGUoc2xpZGVzWzFdKTtcblxuICAgICAgICBzbGlkZXMgPSBlbGVtZW50LmNoaWxkcmVuO1xuICAgICAgfVxuXG4gICAgICAvLyBjcmVhdGUgYW4gYXJyYXkgdG8gc3RvcmUgY3VycmVudCBwb3NpdGlvbnMgb2YgZWFjaCBzbGlkZVxuICAgICAgc2xpZGVQb3MgPSBuZXcgQXJyYXkoc2xpZGVzLmxlbmd0aCk7XG5cbiAgICAgIC8vIGRldGVybWluZSB3aWR0aCBvZiBlYWNoIHNsaWRlXG4gICAgICB3aWR0aCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCB8fCBjb250YWluZXIub2Zmc2V0V2lkdGg7XG5cbiAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSAoc2xpZGVzLmxlbmd0aCAqIHdpZHRoICogMikgKyAncHgnO1xuXG4gICAgICAvLyBzdGFjayBlbGVtZW50c1xuICAgICAgdmFyIHBvcyA9IHNsaWRlcy5sZW5ndGg7XG4gICAgICB3aGlsZShwb3MtLSkge1xuICAgICAgICB2YXIgc2xpZGUgPSBzbGlkZXNbcG9zXTtcblxuICAgICAgICBzbGlkZS5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICAgICAgc2xpZGUuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgcG9zKTtcblxuICAgICAgICBpZiAoYnJvd3Nlci50cmFuc2l0aW9ucykge1xuICAgICAgICAgIHNsaWRlLnN0eWxlLmxlZnQgPSAocG9zICogLXdpZHRoKSArICdweCc7XG4gICAgICAgICAgbW92ZShwb3MsIGluZGV4ID4gcG9zID8gLXdpZHRoIDogKGluZGV4IDwgcG9zID8gd2lkdGggOiAwKSwgMCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcmVwb3NpdGlvbiBlbGVtZW50cyBiZWZvcmUgYW5kIGFmdGVyIGluZGV4XG4gICAgICBpZiAob3B0aW9ucy5jb250aW51b3VzICYmIGJyb3dzZXIudHJhbnNpdGlvbnMpIHtcbiAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgtMSksIC13aWR0aCwgMCk7XG4gICAgICAgIG1vdmUoY2lyY2xlKGluZGV4KzEpLCB3aWR0aCwgMCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghYnJvd3Nlci50cmFuc2l0aW9ucykge1xuICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSAoaW5kZXggKiAtd2lkdGgpICsgJ3B4JztcbiAgICAgIH1cblxuICAgICAgY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG5cbiAgICAgIC8vIHJlaW5pdGlhbGl6ZSBldmVudHNcbiAgICAgIGRldGFjaEV2ZW50cygpO1xuICAgICAgYXR0YWNoRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJldigpIHtcbiAgICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuO1xuXG4gICAgICBpZiAob3B0aW9ucy5jb250aW51b3VzKSB7XG4gICAgICAgIHNsaWRlKGluZGV4LTEpO1xuICAgICAgfSBlbHNlIGlmIChpbmRleCkge1xuICAgICAgICBzbGlkZShpbmRleC0xKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgaWYgKGRpc2FibGVkKSByZXR1cm47XG5cbiAgICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMpIHtcbiAgICAgICAgc2xpZGUoaW5kZXgrMSk7XG4gICAgICB9IGVsc2UgaWYgKGluZGV4IDwgc2xpZGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgc2xpZGUoaW5kZXgrMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuQ2FsbGJhY2socG9zLCBpbmRleCwgZGlyKSB7XG4gICAgICBpZiAob3B0aW9ucy5jYWxsYmFjaykge1xuICAgICAgICBvcHRpb25zLmNhbGxiYWNrKHBvcywgaW5kZXgsIGRpcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuVHJhbnNpdGlvbkVuZChwb3MsIGluZGV4KSB7XG4gICAgICBpZiAob3B0aW9ucy50cmFuc2l0aW9uRW5kKSB7XG4gICAgICAgIG9wdGlvbnMudHJhbnNpdGlvbkVuZChwb3MsIGluZGV4KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaXJjbGUoaW5kZXgpIHtcblxuICAgICAgLy8gYSBzaW1wbGUgcG9zaXRpdmUgbW9kdWxvIHVzaW5nIHNsaWRlcy5sZW5ndGhcbiAgICAgIHJldHVybiAoc2xpZGVzLmxlbmd0aCArIChpbmRleCAlIHNsaWRlcy5sZW5ndGgpKSAlIHNsaWRlcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UG9zKCkge1xuICAgICAgLy8gRml4IGZvciB0aGUgY2xvbmUgaXNzdWUgaW4gdGhlIGV2ZW50IG9mIDIgc2xpZGVzXG4gICAgICB2YXIgY3VycmVudEluZGV4ID0gaW5kZXg7XG5cbiAgICAgIGlmIChjdXJyZW50SW5kZXggPj0gbGVuZ3RoKSB7XG4gICAgICAgIGN1cnJlbnRJbmRleCA9IGN1cnJlbnRJbmRleCAtIGxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGN1cnJlbnRJbmRleDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzbGlkZSh0bywgc2xpZGVTcGVlZCkge1xuXG4gICAgICAvLyBlbnN1cmUgdG8gaXMgb2YgdHlwZSAnbnVtYmVyJ1xuICAgICAgdG8gPSB0eXBlb2YgdG8gIT09ICdudW1iZXInID8gcGFyc2VJbnQodG8sIDEwKSA6IHRvO1xuXG4gICAgICAvLyBkbyBub3RoaW5nIGlmIGFscmVhZHkgb24gcmVxdWVzdGVkIHNsaWRlXG4gICAgICBpZiAoaW5kZXggPT09IHRvKSByZXR1cm47XG5cbiAgICAgIGlmIChicm93c2VyLnRyYW5zaXRpb25zKSB7XG5cbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IE1hdGguYWJzKGluZGV4LXRvKSAvIChpbmRleC10byk7IC8vIDE6IGJhY2t3YXJkLCAtMTogZm9yd2FyZFxuXG4gICAgICAgIC8vIGdldCB0aGUgYWN0dWFsIHBvc2l0aW9uIG9mIHRoZSBzbGlkZVxuICAgICAgICBpZiAob3B0aW9ucy5jb250aW51b3VzKSB7XG4gICAgICAgICAgdmFyIG5hdHVyYWxfZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICAgIGRpcmVjdGlvbiA9IC1zbGlkZVBvc1tjaXJjbGUodG8pXSAvIHdpZHRoO1xuXG4gICAgICAgICAgLy8gaWYgZ29pbmcgZm9yd2FyZCBidXQgdG8gPCBpbmRleCwgdXNlIHRvID0gc2xpZGVzLmxlbmd0aCArIHRvXG4gICAgICAgICAgLy8gaWYgZ29pbmcgYmFja3dhcmQgYnV0IHRvID4gaW5kZXgsIHVzZSB0byA9IC1zbGlkZXMubGVuZ3RoICsgdG9cbiAgICAgICAgICBpZiAoZGlyZWN0aW9uICE9PSBuYXR1cmFsX2RpcmVjdGlvbikge1xuICAgICAgICAgICAgdG8gPSAtZGlyZWN0aW9uICogc2xpZGVzLmxlbmd0aCArIHRvO1xuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRpZmYgPSBNYXRoLmFicyhpbmRleC10bykgLSAxO1xuXG4gICAgICAgIC8vIG1vdmUgYWxsIHRoZSBzbGlkZXMgYmV0d2VlbiBpbmRleCBhbmQgdG8gaW4gdGhlIHJpZ2h0IGRpcmVjdGlvblxuICAgICAgICB3aGlsZSAoZGlmZi0tKSB7XG4gICAgICAgICAgbW92ZSggY2lyY2xlKCh0byA+IGluZGV4ID8gdG8gOiBpbmRleCkgLSBkaWZmIC0gMSksIHdpZHRoICogZGlyZWN0aW9uLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRvID0gY2lyY2xlKHRvKTtcblxuICAgICAgICBtb3ZlKGluZGV4LCB3aWR0aCAqIGRpcmVjdGlvbiwgc2xpZGVTcGVlZCB8fCBzcGVlZCk7XG4gICAgICAgIG1vdmUodG8sIDAsIHNsaWRlU3BlZWQgfHwgc3BlZWQpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMpIHsgLy8gd2UgbmVlZCB0byBnZXQgdGhlIG5leHQgaW4gcGxhY2VcbiAgICAgICAgICBtb3ZlKGNpcmNsZSh0byAtIGRpcmVjdGlvbiksIC0od2lkdGggKiBkaXJlY3Rpb24pLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIHRvID0gY2lyY2xlKHRvKTtcbiAgICAgICAgYW5pbWF0ZShpbmRleCAqIC13aWR0aCwgdG8gKiAtd2lkdGgsIHNsaWRlU3BlZWQgfHwgc3BlZWQpO1xuICAgICAgICAvLyBubyBmYWxsYmFjayBmb3IgYSBjaXJjdWxhciBjb250aW51b3VzIGlmIHRoZSBicm93c2VyIGRvZXMgbm90IGFjY2VwdCB0cmFuc2l0aW9uc1xuICAgICAgfVxuXG4gICAgICBpbmRleCA9IHRvO1xuICAgICAgb2ZmbG9hZEZuKGZ1bmN0aW9uKCkge1xuICAgICAgICBydW5DYWxsYmFjayhnZXRQb3MoKSwgc2xpZGVzW2luZGV4XSwgZGlyZWN0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdmUoaW5kZXgsIGRpc3QsIHNwZWVkKSB7XG4gICAgICB0cmFuc2xhdGUoaW5kZXgsIGRpc3QsIHNwZWVkKTtcbiAgICAgIHNsaWRlUG9zW2luZGV4XSA9IGRpc3Q7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKGluZGV4LCBkaXN0LCBzcGVlZCkge1xuXG4gICAgICB2YXIgc2xpZGUgPSBzbGlkZXNbaW5kZXhdO1xuICAgICAgdmFyIHN0eWxlID0gc2xpZGUgJiYgc2xpZGUuc3R5bGU7XG5cbiAgICAgIGlmICghc3R5bGUpIHJldHVybjtcblxuICAgICAgc3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID1cbiAgICAgICAgc3R5bGUuTW96VHJhbnNpdGlvbkR1cmF0aW9uID1cbiAgICAgICAgc3R5bGUubXNUcmFuc2l0aW9uRHVyYXRpb24gPVxuICAgICAgICBzdHlsZS5PVHJhbnNpdGlvbkR1cmF0aW9uID1cbiAgICAgICAgc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gc3BlZWQgKyAnbXMnO1xuXG4gICAgICBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyBkaXN0ICsgJ3B4LDApJyArICd0cmFuc2xhdGVaKDApJztcbiAgICAgIHN0eWxlLm1zVHJhbnNmb3JtID1cbiAgICAgICAgc3R5bGUuTW96VHJhbnNmb3JtID1cbiAgICAgICAgc3R5bGUuT1RyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyBkaXN0ICsgJ3B4KSc7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlKGZyb20sIHRvLCBzcGVlZCkge1xuXG4gICAgICAvLyBpZiBub3QgYW4gYW5pbWF0aW9uLCBqdXN0IHJlcG9zaXRpb25cbiAgICAgIGlmICghc3BlZWQpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gdG8gKyAncHgnO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzdGFydCA9ICtuZXcgRGF0ZSgpO1xuXG4gICAgICB2YXIgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRpbWVFbGFwID0gK25ldyBEYXRlKCkgLSBzdGFydDtcblxuICAgICAgICBpZiAodGltZUVsYXAgPiBzcGVlZCkge1xuXG4gICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gdG8gKyAncHgnO1xuXG4gICAgICAgICAgaWYgKGRlbGF5IHx8IG9wdGlvbnMuYXV0b1Jlc3RhcnQpIHJlc3RhcnQoKTtcblxuICAgICAgICAgIHJ1blRyYW5zaXRpb25FbmQoZ2V0UG9zKCksIHNsaWRlc1tpbmRleF0pO1xuXG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSAoKCAodG8gLSBmcm9tKSAqIChNYXRoLmZsb29yKCh0aW1lRWxhcCAvIHNwZWVkKSAqIDEwMCkgLyAxMDApICkgKyBmcm9tKSArICdweCc7XG4gICAgICB9LCA0KTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJlZ2luKCkge1xuICAgICAgZGVsYXkgPSBvcHRpb25zLmF1dG8gfHwgMDtcbiAgICAgIGlmIChkZWxheSkgaW50ZXJ2YWwgPSBzZXRUaW1lb3V0KG5leHQsIGRlbGF5KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgZGVsYXkgPSAwO1xuICAgICAgY2xlYXJUaW1lb3V0KGludGVydmFsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXN0YXJ0KCkge1xuICAgICAgc3RvcCgpO1xuICAgICAgYmVnaW4oKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgc3RvcCgpO1xuICAgICAgZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICAgIGRpc2FibGVkID0gZmFsc2U7XG4gICAgICByZXN0YXJ0KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNNb3VzZUV2ZW50KGUpIHtcbiAgICAgIHJldHVybiAvXm1vdXNlLy50ZXN0KGUudHlwZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24ga2lsbCgpIHtcbiAgICAgIC8vIGNhbmNlbCBzbGlkZXNob3dcbiAgICAgIHN0b3AoKTtcblxuICAgICAgLy8gcmVtb3ZlIGlubGluZSBzdHlsZXNcbiAgICAgIGNvbnRhaW5lci5zdHlsZS52aXNpYmlsaXR5ID0gJyc7XG5cbiAgICAgIC8vIHJlc2V0IGVsZW1lbnRcbiAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSAnJztcbiAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9ICcnO1xuXG4gICAgICAvLyByZXNldCBzbGlkZXNcbiAgICAgIHZhciBwb3MgPSBzbGlkZXMubGVuZ3RoO1xuICAgICAgd2hpbGUgKHBvcy0tKSB7XG5cbiAgICAgICAgaWYgKGJyb3dzZXIudHJhbnNpdGlvbnMpIHtcbiAgICAgICAgICB0cmFuc2xhdGUocG9zLCAwLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzbGlkZSA9IHNsaWRlc1twb3NdO1xuXG4gICAgICAgIC8vIGlmIHRoZSBzbGlkZSBpcyB0YWdnZWQgYXMgY2xvbmUsIHJlbW92ZSBpdFxuICAgICAgICBpZiAoc2xpZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNsb25lZCcpKSB7XG4gICAgICAgICAgdmFyIF9wYXJlbnQgPSBzbGlkZS5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgIF9wYXJlbnQucmVtb3ZlQ2hpbGQoc2xpZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVtb3ZlIHN0eWxlc1xuICAgICAgICBzbGlkZS5zdHlsZS53aWR0aCA9ICcnO1xuICAgICAgICBzbGlkZS5zdHlsZS5sZWZ0ID0gJyc7XG5cbiAgICAgICAgc2xpZGUuc3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID1cbiAgICAgICAgICBzbGlkZS5zdHlsZS5Nb3pUcmFuc2l0aW9uRHVyYXRpb24gPVxuICAgICAgICAgIHNsaWRlLnN0eWxlLm1zVHJhbnNpdGlvbkR1cmF0aW9uID1cbiAgICAgICAgICBzbGlkZS5zdHlsZS5PVHJhbnNpdGlvbkR1cmF0aW9uID1cbiAgICAgICAgICBzbGlkZS5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSAnJztcblxuICAgICAgICBzbGlkZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPVxuICAgICAgICAgIHNsaWRlLnN0eWxlLm1zVHJhbnNmb3JtID1cbiAgICAgICAgICBzbGlkZS5zdHlsZS5Nb3pUcmFuc2Zvcm0gPVxuICAgICAgICAgIHNsaWRlLnN0eWxlLk9UcmFuc2Zvcm0gPSAnJztcblxuICAgICAgICAvLyByZW1vdmUgY3VzdG9tIGF0dHJpYnV0ZXMgKD8pXG4gICAgICAgIC8vIHNsaWRlLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xuICAgICAgfVxuXG4gICAgICAvLyByZW1vdmUgYWxsIGV2ZW50c1xuICAgICAgZGV0YWNoRXZlbnRzKCk7XG5cbiAgICAgIC8vIHJlbW92ZSB0aHJvdHRsZWQgZnVuY3Rpb24gdGltZW91dFxuICAgICAgdGhyb3R0bGVkU2V0dXAuY2FuY2VsKCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCByb290LmpRdWVyeSB8fCByb290LlplcHRvICkge1xuICAgIChmdW5jdGlvbigkKSB7XG4gICAgICAkLmZuLlN3aXBlID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCh0aGlzKS5kYXRhKCdTd2lwZScsIG5ldyBTd2lwZSgkKHRoaXMpWzBdLCBwYXJhbXMpKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH0pKCByb290LmpRdWVyeSB8fCByb290LlplcHRvICk7XG4gIH1cblxuICByZXR1cm4gU3dpcGU7XG59KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zd2lwZWpzL3N3aXBlLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcbn0gY2F0Y2goZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxuXHRcdGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9