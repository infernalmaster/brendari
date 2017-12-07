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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTY1NzdmYTVlOWQ0NzAxYjQ4ZGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9tYWluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zd2lwZWpzL3N3aXBlLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwibXNucnlDb250YWluZXIiLCJxdWVyeVNlbGVjdG9yIiwiY2xhc3NMaXN0IiwiYWRkIiwiTXV1cmkiLCJpdGVtcyIsImxheW91dCIsImZpbGxHYXBzIiwiaG9yaXpvbnRhbCIsImFsaWduUmlnaHQiLCJhbGlnbkJvdHRvbSIsInJvdW5kaW5nIiwibWFwT3B0aW9ucyIsInpvb20iLCJtYXBUeXBlSWQiLCJnb29nbGUiLCJtYXBzIiwiTWFwVHlwZUlkIiwiUk9BRE1BUCIsImNlbnRlciIsIkxhdExuZyIsIm1hcCIsIk1hcCIsIm1hcmtlciIsIk1hcmtlciIsInBvc2l0aW9uIiwiaWNvbiIsInBhdGgiLCJmaWxsQ29sb3IiLCJmaWxsT3BhY2l0eSIsImFuY2hvciIsIlBvaW50Iiwic3Ryb2tlV2VpZ2h0IiwicGFuVG8iLCJnZXRQb3NpdGlvbiIsIm1lbnUiLCJlIiwicHJldmVudERlZmF1bHQiLCJyZW1vdmUiLCJvYmplY3QiLCJzaG93Iiwic2V0VGltZW91dCIsImxvZ28iLCJjb250ZW50RG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInNldEF0dHJpYnV0ZSIsInRhcmdldCIsImNvbnRhaW5zIiwicGxheWVyIiwicGFyZW50RWxlbWVudCIsImN1cnJlbnRUaW1lIiwicGxheSIsInBhdXNlIiwiZHJhZ2dhYmxlIiwiY29udGludW91cyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsd0RBQXdEOztBQUV4RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsaUNBQWlDO0FBQ2pDO0FBQ0E7O0FBRUEsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsQ0FBQzs7Ozs7Ozs7QUNyd0JEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3RcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5NjU3N2ZhNWU5ZDQ3MDFiNDhkZiIsIi8vIGltcG9ydCBBbWJlciBmcm9tICdhbWJlcidcbmltcG9ydCBTd2lwZWpzIGZyb20gJ3N3aXBlanMnXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG5cbiAgLy8gZ3JpZFxuICBjb25zdCBtc25yeUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1tc25yeScpXG4gIGlmIChtc25yeUNvbnRhaW5lcikge1xuICAgIG1zbnJ5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2pzLWFjdGl2YXRlZCcpXG5cbiAgICBuZXcgTXV1cmkoJy5tc25yeScsIHtcbiAgICAgIGl0ZW1zOiAnLm1zbnJ5LWl0ZW0nLFxuICAgICAgbGF5b3V0OiB7XG4gICAgICAgIGZpbGxHYXBzOiB0cnVlLFxuICAgICAgICBob3Jpem9udGFsOiBmYWxzZSxcbiAgICAgICAgYWxpZ25SaWdodDogZmFsc2UsXG4gICAgICAgIGFsaWduQm90dG9tOiBmYWxzZSxcbiAgICAgICAgcm91bmRpbmc6IGZhbHNlXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIEdNQVBcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1nbWFwJykpIHtcbiAgICB2YXIgbWFwT3B0aW9ucyA9IHtcbiAgICAgIHpvb206IDE3LFxuICAgICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCxcbiAgICAgIGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZygwLCAwKVxuICAgIH1cbiAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtZ21hcCcpLCBtYXBPcHRpb25zKVxuICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgIHBvc2l0aW9uOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDQ4LjkyMzU2NCwgMjQuNzExMjU2KSxcbiAgICAgIGljb246IHtcbiAgICAgICAgcGF0aDogJ00yMS4yMTYuMDE0QzEwLjI2LjM5NyAxLjE1NiA4LjkyNC4xMDYgMTkuODA0LS4xMSAyMS45ODIuMDEzIDI0LjA5LjM5OCAyNi4xMWMwIDAgLjAzMy4yMzUuMTQ2LjY4Ny4zNCAxLjUxLjg0OCAyLjk3NyAxLjQ4IDQuMzUyIDIuMjA2IDUuMjEgNy4zMDYgMTMuOTI2IDE4Ljc1IDIzLjQxLjcuNTg3IDEuNzMuNTg3IDIuNDQgMCAxMS40NDQtOS40NzIgMTYuNTQ0LTE4LjE5IDE4Ljc2LTIzLjQyMi42NDQtMS4zNzYgMS4xNDItMi44MyAxLjQ4LTQuMzUzLjEwMy0uNDQuMTQ4LS42ODguMTQ4LS42ODguMjYtMS4zNTMuMzk2LTIuNzQuMzk2LTQuMTZDNDQgOS41NTMgMzMuNzIyLS40MjcgMjEuMjE2LjAxM3pNMjIgMzRjLTYuMDc2IDAtMTEtNC45MjQtMTEtMTFzNC45MjQtMTEgMTEtMTEgMTEgNC45MjQgMTEgMTEtNC45MjQgMTEtMTEgMTF6JyxcbiAgICAgICAgZmlsbENvbG9yOiAnI0ZGMEQzNScsXG4gICAgICAgIGZpbGxPcGFjaXR5OiAxLFxuICAgICAgICBhbmNob3I6IG5ldyBnb29nbGUubWFwcy5Qb2ludCgyMiwgNTUpLFxuICAgICAgICBzdHJva2VXZWlnaHQ6IDBcbiAgICAgIH0sXG4gICAgICBtYXA6IG1hcFxuICAgIH0pXG4gICAgbWFwLnBhblRvKG1hcmtlci5nZXRQb3NpdGlvbigpKVxuICB9XG5cbiAgLy8gTUVOVVxuICB2YXIgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1tZW51JylcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW9wZW4tbWVudScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBtZW51LmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpXG4gIH0pXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1jbG9zZS1tZW51JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIG1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJylcbiAgfSk7XG5cbiAgLy8gRklYIGxvZ28gY29sb3JcbiAgKCgpID0+IHtcbiAgICB2YXIgb2JqZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdi1ob21lLWxvZ28nKVxuICAgIGlmICghb2JqZWN0KSByZXR1cm5cbiAgICBmdW5jdGlvbiBzaG93ICgpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB2YXIgbG9nbyA9IG9iamVjdC5jb250ZW50RG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3BhdGgnKVswXVxuICAgICAgICBsb2dvLnNldEF0dHJpYnV0ZSgnZmlsbCcsICcjMTMxMzEzJylcbiAgICAgIH0sIDUwKVxuICAgIH1cbiAgICBpZiAob2JqZWN0LmNvbnRlbnREb2N1bWVudCkgc2hvdygpXG4gICAgb2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBzaG93LCBmYWxzZSlcbiAgfSkoKVxuXG4gIC8vIGdpZnMgcGxheWVyIG9uIGxvZ29zIHBhZ2VcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS50YXJnZXQgJiYgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1wbGF5JykpIHtcbiAgICAgIGNvbnN0IHBsYXllciA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXBsYXllcicpXG4gICAgICBwbGF5ZXIuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJylcbiAgICAgIHBsYXllci5jdXJyZW50VGltZSA9IDBcbiAgICAgIHBsYXllci5wbGF5KClcbiAgICB9XG4gIH0pXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS50YXJnZXQgJiYgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1wbGF5JykpIHtcbiAgICAgIGNvbnN0IHBsYXllciA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXBsYXllcicpXG4gICAgICBwbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJylcbiAgICAgIHBsYXllci5wYXVzZSgpXG4gICAgfVxuICB9KVxuXG4gIC8vIFN3aXBlanNcbiAgbmV3IFN3aXBlanMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXN3aXBlJyksIHtcbiAgICBkcmFnZ2FibGU6IHRydWUsXG4gICAgY29udGludW91czogZmFsc2VcbiAgICAvLyBkaXNhYmxlU2Nyb2xsOiB0cnVlLFxuICAgIC8vIHN0b3BQcm9wYWdhdGlvbjogdHJ1ZSxcbiAgICAvLyBjYWxsYmFjazogZnVuY3Rpb24oaW5kZXgsIGVsZW1lbnQpIHt9LFxuICAgIC8vIHRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uKGluZGV4LCBlbGVtZW50KSB7fVxuICB9KVxufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvbWFpbi5qcyIsIi8qIVxuICogU3dpcGUgMi4yLjEwXG4gKlxuICogQnJhZCBCaXJkc2FsbFxuICogQ29weXJpZ2h0IDIwMTMsIE1JVCBMaWNlbnNlXG4gKlxuKi9cblxuLy8gaWYgdGhlIG1vZHVsZSBoYXMgbm8gZGVwZW5kZW5jaWVzLCB0aGUgYWJvdmUgcGF0dGVybiBjYW4gYmUgc2ltcGxpZmllZCB0b1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWV4dHJhLXNlbWlcbjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgZGVmaW5lKFtdLCBmdW5jdGlvbigpe1xuICAgICAgcm9vdC5Td2lwZSA9IGZhY3RvcnkoKTtcbiAgICAgIHJldHVybiByb290LlN3aXBlO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgLy8gTm9kZS4gRG9lcyBub3Qgd29yayB3aXRoIHN0cmljdCBDb21tb25KUywgYnV0XG4gICAgLy8gb25seSBDb21tb25KUy1saWtlIGVudmlyb25tZW50cyB0aGF0IHN1cHBvcnQgbW9kdWxlLmV4cG9ydHMsXG4gICAgLy8gbGlrZSBOb2RlLlxuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgIHJvb3QuU3dpcGUgPSBmYWN0b3J5KCk7XG4gIH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuICAvLyBFc3RhYmxpc2ggdGhlIHJvb3Qgb2JqZWN0LCBgd2luZG93YCAoYHNlbGZgKSBpbiB0aGUgYnJvd3NlciwgYGdsb2JhbGBcbiAgLy8gb24gdGhlIHNlcnZlciwgb3IgYHRoaXNgIGluIHNvbWUgdmlydHVhbCBtYWNoaW5lcy4gV2UgdXNlIGBzZWxmYFxuICAvLyBpbnN0ZWFkIG9mIGB3aW5kb3dgIGZvciBgV2ViV29ya2VyYCBzdXBwb3J0LlxuICB2YXIgcm9vdCA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYuc2VsZiA9PT0gc2VsZiAmJiBzZWxmIHx8XG4gICAgICAgICAgICAgdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwuZ2xvYmFsID09PSBnbG9iYWwgJiYgZ2xvYmFsIHx8XG4gICAgICAgICAgICAgdGhpcztcblxuICB2YXIgX2RvY3VtZW50ID0gcm9vdC5kb2N1bWVudDtcblxuICBmdW5jdGlvbiBTd2lwZShjb250YWluZXIsIG9wdGlvbnMpIHtcblxuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgLy8gc2V0dXAgaW5pdGlhbCB2YXJzXG4gICAgdmFyIHN0YXJ0ID0ge307XG4gICAgdmFyIGRlbHRhID0ge307XG4gICAgdmFyIGlzU2Nyb2xsaW5nO1xuXG4gICAgLy8gc2V0dXAgYXV0byBzbGlkZXNob3dcbiAgICB2YXIgZGVsYXkgPSBvcHRpb25zLmF1dG8gfHwgMDtcbiAgICB2YXIgaW50ZXJ2YWw7XG5cbiAgICB2YXIgZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIC8vIHV0aWxpdGllc1xuICAgIC8vIHNpbXBsZSBubyBvcGVyYXRpb24gZnVuY3Rpb25cbiAgICB2YXIgbm9vcCA9IGZ1bmN0aW9uKCkge307XG4gICAgLy8gb2ZmbG9hZCBhIGZ1bmN0aW9ucyBleGVjdXRpb25cbiAgICB2YXIgb2ZmbG9hZEZuID0gZnVuY3Rpb24oZm4pIHsgc2V0VGltZW91dChmbiB8fCBub29wLCAwKTsgfTtcbiAgICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG4gICAgLy8gYmUgdHJpZ2dlcmVkLlxuICAgIHZhciB0aHJvdHRsZSA9IGZ1bmN0aW9uIChmbiwgdGhyZXNoaG9sZCkge1xuICAgICAgdGhyZXNoaG9sZCA9IHRocmVzaGhvbGQgfHwgMTAwO1xuICAgICAgdmFyIHRpbWVvdXQgPSBudWxsO1xuXG4gICAgICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aW1lb3V0KSBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHRocm90dGxlZEZuKCkge1xuICAgICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICBjYW5jZWwoKTtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIH0sIHRocmVzaGhvbGQpO1xuICAgICAgfVxuXG4gICAgICAvLyBhbGxvdyByZW1vdmUgdGhyb3R0bGVkIHRpbWVvdXRcbiAgICAgIHRocm90dGxlZEZuLmNhbmNlbCA9IGNhbmNlbDtcblxuICAgICAgcmV0dXJuIHRocm90dGxlZEZuO1xuICAgIH07XG5cbiAgICAvLyBjaGVjayBicm93c2VyIGNhcGFiaWxpdGllc1xuICAgIHZhciBicm93c2VyID0ge1xuICAgICAgYWRkRXZlbnRMaXN0ZW5lcjogISFyb290LmFkZEV2ZW50TGlzdGVuZXIsXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICAgIHRvdWNoOiAoJ29udG91Y2hzdGFydCcgaW4gcm9vdCkgfHwgcm9vdC5Eb2N1bWVudFRvdWNoICYmIF9kb2N1bWVudCBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2gsXG4gICAgICB0cmFuc2l0aW9uczogKGZ1bmN0aW9uKHRlbXApIHtcbiAgICAgICAgdmFyIHByb3BzID0gWyd0cmFuc2l0aW9uUHJvcGVydHknLCAnV2Via2l0VHJhbnNpdGlvbicsICdNb3pUcmFuc2l0aW9uJywgJ09UcmFuc2l0aW9uJywgJ21zVHJhbnNpdGlvbiddO1xuICAgICAgICBmb3IgKCB2YXIgaSBpbiBwcm9wcyApIHtcbiAgICAgICAgICBpZiAodGVtcC5zdHlsZVsgcHJvcHNbaV0gXSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KShfZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3dpcGUnKSlcbiAgICB9O1xuXG4gICAgLy8gcXVpdCBpZiBubyByb290IGVsZW1lbnRcbiAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgdmFyIGVsZW1lbnQgPSBjb250YWluZXIuY2hpbGRyZW5bMF07XG4gICAgdmFyIHNsaWRlcywgc2xpZGVQb3MsIHdpZHRoLCBsZW5ndGg7XG4gICAgdmFyIGluZGV4ID0gcGFyc2VJbnQob3B0aW9ucy5zdGFydFNsaWRlLCAxMCkgfHwgMDtcbiAgICB2YXIgc3BlZWQgPSBvcHRpb25zLnNwZWVkIHx8IDMwMDtcbiAgICBvcHRpb25zLmNvbnRpbnVvdXMgPSBvcHRpb25zLmNvbnRpbnVvdXMgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY29udGludW91cyA6IHRydWU7XG5cbiAgICAvLyBBdXRvUmVzdGFydCBvcHRpb246IGF1dG8gcmVzdGFydCBzbGlkZXNob3cgYWZ0ZXIgdXNlcidzIHRvdWNoIGV2ZW50XG4gICAgb3B0aW9ucy5hdXRvUmVzdGFydCA9IG9wdGlvbnMuYXV0b1Jlc3RhcnQgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuYXV0b1Jlc3RhcnQgOiBmYWxzZTtcblxuICAgIC8vIHRocm90dGxlZCBzZXR1cFxuICAgIHZhciB0aHJvdHRsZWRTZXR1cCA9IHRocm90dGxlKHNldHVwKTtcblxuICAgIC8vIHNldHVwIGV2ZW50IGNhcHR1cmluZ1xuICAgIHZhciBldmVudHMgPSB7XG5cbiAgICAgIGhhbmRsZUV2ZW50OiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICBjYXNlICdtb3VzZWRvd24nOlxuICAgICAgICAgIGNhc2UgJ3RvdWNoc3RhcnQnOiB0aGlzLnN0YXJ0KGV2ZW50KTsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbW91c2Vtb3ZlJzpcbiAgICAgICAgICBjYXNlICd0b3VjaG1vdmUnOiB0aGlzLm1vdmUoZXZlbnQpOyBicmVhaztcbiAgICAgICAgICBjYXNlICdtb3VzZXVwJzpcbiAgICAgICAgICBjYXNlICdtb3VzZWxlYXZlJzpcbiAgICAgICAgICBjYXNlICd0b3VjaGVuZCc6IHRoaXMuZW5kKGV2ZW50KTsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnd2Via2l0VHJhbnNpdGlvbkVuZCc6XG4gICAgICAgICAgY2FzZSAnbXNUcmFuc2l0aW9uRW5kJzpcbiAgICAgICAgICBjYXNlICdvVHJhbnNpdGlvbkVuZCc6XG4gICAgICAgICAgY2FzZSAnb3RyYW5zaXRpb25lbmQnOlxuICAgICAgICAgIGNhc2UgJ3RyYW5zaXRpb25lbmQnOiB0aGlzLnRyYW5zaXRpb25FbmQoZXZlbnQpOyBicmVhaztcbiAgICAgICAgICBjYXNlICdyZXNpemUnOiB0aHJvdHRsZWRTZXR1cCgpOyBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLnN0b3BQcm9wYWdhdGlvbikge1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBzdGFydDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIHRvdWNoZXM7XG5cbiAgICAgICAgaWYgKGlzTW91c2VFdmVudChldmVudCkpIHtcbiAgICAgICAgICB0b3VjaGVzID0gZXZlbnQ7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gRm9yIGRlc2t0b3AgU2FmYXJpIGRyYWdcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b3VjaGVzID0gZXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1lYXN1cmUgc3RhcnQgdmFsdWVzXG4gICAgICAgIHN0YXJ0ID0ge1xuXG4gICAgICAgICAgLy8gZ2V0IGluaXRpYWwgdG91Y2ggY29vcmRzXG4gICAgICAgICAgeDogdG91Y2hlcy5wYWdlWCxcbiAgICAgICAgICB5OiB0b3VjaGVzLnBhZ2VZLFxuXG4gICAgICAgICAgLy8gc3RvcmUgdGltZSB0byBkZXRlcm1pbmUgdG91Y2ggZHVyYXRpb25cbiAgICAgICAgICB0aW1lOiArbmV3IERhdGUoKVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gdXNlZCBmb3IgdGVzdGluZyBmaXJzdCBtb3ZlIGV2ZW50XG4gICAgICAgIGlzU2Nyb2xsaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIHJlc2V0IGRlbHRhIGFuZCBlbmQgbWVhc3VyZW1lbnRzXG4gICAgICAgIGRlbHRhID0ge307XG5cbiAgICAgICAgLy8gYXR0YWNoIHRvdWNobW92ZSBhbmQgdG91Y2hlbmQgbGlzdGVuZXJzXG4gICAgICAgIGlmIChpc01vdXNlRXZlbnQoZXZlbnQpKSB7XG4gICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLCBmYWxzZSk7XG4gICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcywgZmFsc2UpO1xuICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMsIGZhbHNlKTtcbiAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcywgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgIH0sXG5cbiAgICAgIG1vdmU6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciB0b3VjaGVzO1xuXG4gICAgICAgIGlmIChpc01vdXNlRXZlbnQoZXZlbnQpKSB7XG4gICAgICAgICAgdG91Y2hlcyA9IGV2ZW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGVuc3VyZSBzd2lwaW5nIHdpdGggb25lIHRvdWNoIGFuZCBub3QgcGluY2hpbmdcbiAgICAgICAgICBpZiAoIGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMSB8fCBldmVudC5zY2FsZSAmJiBldmVudC5zY2FsZSAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChvcHRpb25zLmRpc2FibGVTY3JvbGwpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdG91Y2hlcyA9IGV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtZWFzdXJlIGNoYW5nZSBpbiB4IGFuZCB5XG4gICAgICAgIGRlbHRhID0ge1xuICAgICAgICAgIHg6IHRvdWNoZXMucGFnZVggLSBzdGFydC54LFxuICAgICAgICAgIHk6IHRvdWNoZXMucGFnZVkgLSBzdGFydC55XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIGlmIHNjcm9sbGluZyB0ZXN0IGhhcyBydW4gLSBvbmUgdGltZSB0ZXN0XG4gICAgICAgIGlmICggdHlwZW9mIGlzU2Nyb2xsaW5nID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlzU2Nyb2xsaW5nID0gISEoIGlzU2Nyb2xsaW5nIHx8IE1hdGguYWJzKGRlbHRhLngpIDwgTWF0aC5hYnMoZGVsdGEueSkgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHVzZXIgaXMgbm90IHRyeWluZyB0byBzY3JvbGwgdmVydGljYWxseVxuICAgICAgICBpZiAoIWlzU2Nyb2xsaW5nKSB7XG5cbiAgICAgICAgICAvLyBwcmV2ZW50IG5hdGl2ZSBzY3JvbGxpbmdcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgLy8gc3RvcCBzbGlkZXNob3dcbiAgICAgICAgICBzdG9wKCk7XG5cbiAgICAgICAgICAvLyBpbmNyZWFzZSByZXNpc3RhbmNlIGlmIGZpcnN0IG9yIGxhc3Qgc2xpZGVcbiAgICAgICAgICBpZiAob3B0aW9ucy5jb250aW51b3VzKSB7IC8vIHdlIGRvbid0IGFkZCByZXNpc3RhbmNlIGF0IHRoZSBlbmRcblxuICAgICAgICAgICAgdHJhbnNsYXRlKGNpcmNsZShpbmRleC0xKSwgZGVsdGEueCArIHNsaWRlUG9zW2NpcmNsZShpbmRleC0xKV0sIDApO1xuICAgICAgICAgICAgdHJhbnNsYXRlKGluZGV4LCBkZWx0YS54ICsgc2xpZGVQb3NbaW5kZXhdLCAwKTtcbiAgICAgICAgICAgIHRyYW5zbGF0ZShjaXJjbGUoaW5kZXgrMSksIGRlbHRhLnggKyBzbGlkZVBvc1tjaXJjbGUoaW5kZXgrMSldLCAwKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGRlbHRhLnggPVxuICAgICAgICAgICAgICBkZWx0YS54IC9cbiAgICAgICAgICAgICAgKCAoIWluZGV4ICYmIGRlbHRhLnggPiAwIHx8ICAgICAgICAgICAgIC8vIGlmIGZpcnN0IHNsaWRlIGFuZCBzbGlkaW5nIGxlZnRcbiAgICAgICAgICAgICAgICAgaW5kZXggPT09IHNsaWRlcy5sZW5ndGggLSAxICYmICAgICAgICAvLyBvciBpZiBsYXN0IHNsaWRlIGFuZCBzbGlkaW5nIHJpZ2h0XG4gICAgICAgICAgICAgICAgIGRlbHRhLnggPCAwICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYW5kIGlmIHNsaWRpbmcgYXQgYWxsXG4gICAgICAgICAgICAgICAgKSA/XG4gICAgICAgICAgICAgICAoIE1hdGguYWJzKGRlbHRhLngpIC8gd2lkdGggKyAxICkgICAgICAvLyBkZXRlcm1pbmUgcmVzaXN0YW5jZSBsZXZlbFxuICAgICAgICAgICAgICAgOiAxICk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm8gcmVzaXN0YW5jZSBpZiBmYWxzZVxuXG4gICAgICAgICAgICAvLyB0cmFuc2xhdGUgMToxXG4gICAgICAgICAgICB0cmFuc2xhdGUoaW5kZXgtMSwgZGVsdGEueCArIHNsaWRlUG9zW2luZGV4LTFdLCAwKTtcbiAgICAgICAgICAgIHRyYW5zbGF0ZShpbmRleCwgZGVsdGEueCArIHNsaWRlUG9zW2luZGV4XSwgMCk7XG4gICAgICAgICAgICB0cmFuc2xhdGUoaW5kZXgrMSwgZGVsdGEueCArIHNsaWRlUG9zW2luZGV4KzFdLCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGVuZDogZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAvLyBtZWFzdXJlIGR1cmF0aW9uXG4gICAgICAgIHZhciBkdXJhdGlvbiA9ICtuZXcgRGF0ZSgpIC0gc3RhcnQudGltZTtcblxuICAgICAgICAvLyBkZXRlcm1pbmUgaWYgc2xpZGUgYXR0ZW1wdCB0cmlnZ2VycyBuZXh0L3ByZXYgc2xpZGVcbiAgICAgICAgdmFyIGlzVmFsaWRTbGlkZSA9XG4gICAgICAgICAgICBOdW1iZXIoZHVyYXRpb24pIDwgMjUwICYmICAgICAgICAgLy8gaWYgc2xpZGUgZHVyYXRpb24gaXMgbGVzcyB0aGFuIDI1MG1zXG4gICAgICAgICAgICBNYXRoLmFicyhkZWx0YS54KSA+IDIwIHx8ICAgICAgICAgLy8gYW5kIGlmIHNsaWRlIGFtdCBpcyBncmVhdGVyIHRoYW4gMjBweFxuICAgICAgICAgICAgTWF0aC5hYnMoZGVsdGEueCkgPiB3aWR0aC8yOyAgICAgIC8vIG9yIGlmIHNsaWRlIGFtdCBpcyBncmVhdGVyIHRoYW4gaGFsZiB0aGUgd2lkdGhcblxuICAgICAgICAvLyBkZXRlcm1pbmUgaWYgc2xpZGUgYXR0ZW1wdCBpcyBwYXN0IHN0YXJ0IGFuZCBlbmRcbiAgICAgICAgdmFyIGlzUGFzdEJvdW5kcyA9XG4gICAgICAgICAgICAhaW5kZXggJiYgZGVsdGEueCA+IDAgfHwgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgZmlyc3Qgc2xpZGUgYW5kIHNsaWRlIGFtdCBpcyBncmVhdGVyIHRoYW4gMFxuICAgICAgICAgICAgaW5kZXggPT09IHNsaWRlcy5sZW5ndGggLSAxICYmIGRlbHRhLnggPCAwOyAgIC8vIG9yIGlmIGxhc3Qgc2xpZGUgYW5kIHNsaWRlIGFtdCBpcyBsZXNzIHRoYW4gMFxuXG4gICAgICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMpIHtcbiAgICAgICAgICBpc1Bhc3RCb3VuZHMgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE9MRCBkZXRlcm1pbmUgZGlyZWN0aW9uIG9mIHN3aXBlICh0cnVlOnJpZ2h0LCBmYWxzZTpsZWZ0KVxuICAgICAgICAvLyBkZXRlcm1pbmUgZGlyZWN0aW9uIG9mIHN3aXBlICgxOiBiYWNrd2FyZCwgLTE6IGZvcndhcmQpXG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBNYXRoLmFicyhkZWx0YS54KSAvIGRlbHRhLng7XG5cbiAgICAgICAgLy8gaWYgbm90IHNjcm9sbGluZyB2ZXJ0aWNhbGx5XG4gICAgICAgIGlmICghaXNTY3JvbGxpbmcpIHtcblxuICAgICAgICAgIGlmIChpc1ZhbGlkU2xpZGUgJiYgIWlzUGFzdEJvdW5kcykge1xuXG4gICAgICAgICAgICAvLyBpZiB3ZSdyZSBtb3ZpbmcgcmlnaHRcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPCAwKSB7XG5cbiAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuY29udGludW91cykgeyAvLyB3ZSBuZWVkIHRvIGdldCB0aGUgbmV4dCBpbiB0aGlzIGRpcmVjdGlvbiBpbiBwbGFjZVxuXG4gICAgICAgICAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgtMSksIC13aWR0aCwgMCk7XG4gICAgICAgICAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgrMiksIHdpZHRoLCAwKTtcblxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1vdmUoaW5kZXgtMSwgLXdpZHRoLCAwKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIG1vdmUoaW5kZXgsIHNsaWRlUG9zW2luZGV4XS13aWR0aCwgc3BlZWQpO1xuICAgICAgICAgICAgICBtb3ZlKGNpcmNsZShpbmRleCsxKSwgc2xpZGVQb3NbY2lyY2xlKGluZGV4KzEpXS13aWR0aCwgc3BlZWQpO1xuICAgICAgICAgICAgICBpbmRleCA9IGNpcmNsZShpbmRleCsxKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuY29udGludW91cykgeyAvLyB3ZSBuZWVkIHRvIGdldCB0aGUgbmV4dCBpbiB0aGlzIGRpcmVjdGlvbiBpbiBwbGFjZVxuXG4gICAgICAgICAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgrMSksIHdpZHRoLCAwKTtcbiAgICAgICAgICAgICAgICBtb3ZlKGNpcmNsZShpbmRleC0yKSwgLXdpZHRoLCAwKTtcblxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1vdmUoaW5kZXgrMSwgd2lkdGgsIDApO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgbW92ZShpbmRleCwgc2xpZGVQb3NbaW5kZXhdK3dpZHRoLCBzcGVlZCk7XG4gICAgICAgICAgICAgIG1vdmUoY2lyY2xlKGluZGV4LTEpLCBzbGlkZVBvc1tjaXJjbGUoaW5kZXgtMSldK3dpZHRoLCBzcGVlZCk7XG4gICAgICAgICAgICAgIGluZGV4ID0gY2lyY2xlKGluZGV4LTEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBydW5DYWxsYmFjayhnZXRQb3MoKSwgc2xpZGVzW2luZGV4XSwgZGlyZWN0aW9uKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMpIHtcblxuICAgICAgICAgICAgICBtb3ZlKGNpcmNsZShpbmRleC0xKSwgLXdpZHRoLCBzcGVlZCk7XG4gICAgICAgICAgICAgIG1vdmUoaW5kZXgsIDAsIHNwZWVkKTtcbiAgICAgICAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgrMSksIHdpZHRoLCBzcGVlZCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgbW92ZShpbmRleC0xLCAtd2lkdGgsIHNwZWVkKTtcbiAgICAgICAgICAgICAgbW92ZShpbmRleCwgMCwgc3BlZWQpO1xuICAgICAgICAgICAgICBtb3ZlKGluZGV4KzEsIHdpZHRoLCBzcGVlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8ga2lsbCB0b3VjaG1vdmUgYW5kIHRvdWNoZW5kIGV2ZW50IGxpc3RlbmVycyB1bnRpbCB0b3VjaHN0YXJ0IGNhbGxlZCBhZ2FpblxuICAgICAgICBpZiAoaXNNb3VzZUV2ZW50KGV2ZW50KSkge1xuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBldmVudHMsIGZhbHNlKTtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgfSxcblxuICAgICAgdHJhbnNpdGlvbkVuZDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICBpZiAoY3VycmVudEluZGV4ID09PSBpbmRleCkge1xuICAgICAgICAgIGlmIChkZWxheSB8fCBvcHRpb25zLmF1dG9SZXN0YXJ0KSByZXN0YXJ0KCk7XG5cbiAgICAgICAgICBydW5UcmFuc2l0aW9uRW5kKGdldFBvcygpLCBzbGlkZXNbaW5kZXhdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyB0cmlnZ2VyIHNldHVwXG4gICAgc2V0dXAoKTtcblxuICAgIC8vIHN0YXJ0IGF1dG8gc2xpZGVzaG93IGlmIGFwcGxpY2FibGVcbiAgICBiZWdpbigpO1xuXG4gICAgLy8gRXhwb3NlIHRoZSBTd2lwZSBBUElcbiAgICByZXR1cm4ge1xuICAgICAgLy8gaW5pdGlhbGl6ZVxuICAgICAgc2V0dXA6IHNldHVwLFxuXG4gICAgICAvLyBnbyB0byBzbGlkZVxuICAgICAgc2xpZGU6IGZ1bmN0aW9uKHRvLCBzcGVlZCkge1xuICAgICAgICBzdG9wKCk7XG4gICAgICAgIHNsaWRlKHRvLCBzcGVlZCk7XG4gICAgICB9LFxuXG4gICAgICAvLyBtb3ZlIHRvIHByZXZpb3VzXG4gICAgICBwcmV2OiBmdW5jdGlvbigpIHtcbiAgICAgICAgc3RvcCgpO1xuICAgICAgICBwcmV2KCk7XG4gICAgICB9LFxuXG4gICAgICAvLyBtb3ZlIHRvIG5leHRcbiAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBzdG9wKCk7XG4gICAgICAgIG5leHQoKTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIFJlc3RhcnQgc2xpZGVzaG93XG4gICAgICByZXN0YXJ0OiByZXN0YXJ0LFxuXG4gICAgICAvLyBjYW5jZWwgc2xpZGVzaG93XG4gICAgICBzdG9wOiBzdG9wLFxuXG4gICAgICAvLyByZXR1cm4gY3VycmVudCBpbmRleCBwb3NpdGlvblxuICAgICAgZ2V0UG9zOiBnZXRQb3MsXG5cbiAgICAgIC8vIGRpc2FibGUgc2xpZGVzaG93XG4gICAgICBkaXNhYmxlOiBkaXNhYmxlLFxuXG4gICAgICAvLyBlbmFibGUgc2xpZGVzaG93XG4gICAgICBlbmFibGU6IGVuYWJsZSxcblxuICAgICAgLy8gcmV0dXJuIHRvdGFsIG51bWJlciBvZiBzbGlkZXNcbiAgICAgIGdldE51bVNsaWRlczogZnVuY3Rpb24oKSB7IHJldHVybiBsZW5ndGg7IH0sXG5cbiAgICAgIC8vIGNvbXBsZXRlbHkgcmVtb3ZlIHN3aXBlXG4gICAgICBraWxsOiBraWxsXG4gICAgfTtcblxuICAgIC8vIHJlbW92ZSBhbGwgZXZlbnQgbGlzdGVuZXJzXG4gICAgZnVuY3Rpb24gZGV0YWNoRXZlbnRzKCkge1xuICAgICAgaWYgKGJyb3dzZXIuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAvLyByZW1vdmUgY3VycmVudCBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21zVHJhbnNpdGlvbkVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29UcmFuc2l0aW9uRW5kJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3RyYW5zaXRpb25lbmQnLCBldmVudHMsIGZhbHNlKTtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgIHJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb290Lm9ucmVzaXplID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXJzXG4gICAgZnVuY3Rpb24gYXR0YWNoRXZlbnRzKCkge1xuICAgICAgaWYgKGJyb3dzZXIuYWRkRXZlbnRMaXN0ZW5lcikge1xuXG4gICAgICAgIC8vIHNldCB0b3VjaHN0YXJ0IGV2ZW50IG9uIGVsZW1lbnRcbiAgICAgICAgaWYgKGJyb3dzZXIudG91Y2gpIHtcbiAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBldmVudHMsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLmRyYWdnYWJsZSkge1xuICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYnJvd3Nlci50cmFuc2l0aW9ucykge1xuICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbXNUcmFuc2l0aW9uRW5kJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdvVHJhbnNpdGlvbkVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignb3RyYW5zaXRpb25lbmQnLCBldmVudHMsIGZhbHNlKTtcbiAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBldmVudHMsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldCByZXNpemUgZXZlbnQgb24gd2luZG93XG4gICAgICAgIHJvb3QuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZXZlbnRzLCBmYWxzZSk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3Qub25yZXNpemUgPSB0aHJvdHRsZWRTZXR1cDsgLy8gdG8gcGxheSBuaWNlIHdpdGggb2xkIElFXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY2xvbmUgbm9kZXMgd2hlbiB0aGVyZSBpcyBvbmx5IHR3byBzbGlkZXNcbiAgICBmdW5jdGlvbiBjbG9uZU5vZGUoZWwpIHtcbiAgICAgIHZhciBjbG9uZSA9IGVsLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2xvbmUpO1xuXG4gICAgICAvLyB0YWcgdGhlc2Ugc2xpZGVzIGFzIGNsb25lcyAodG8gcmVtb3ZlIHRoZW0gb24ga2lsbClcbiAgICAgIGNsb25lLnNldEF0dHJpYnV0ZSgnZGF0YS1jbG9uZWQnLCB0cnVlKTtcblxuICAgICAgLy8gUmVtb3ZlIGlkIGZyb20gZWxlbWVudFxuICAgICAgY2xvbmUucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHVwKCkge1xuICAgICAgLy8gY2FjaGUgc2xpZGVzXG4gICAgICBzbGlkZXMgPSBlbGVtZW50LmNoaWxkcmVuO1xuICAgICAgbGVuZ3RoID0gc2xpZGVzLmxlbmd0aDtcblxuICAgICAgLy8gc2xpZGVzIGxlbmd0aCBjb3JyZWN0aW9uLCBtaW51cyBjbG9uZWQgc2xpZGVzXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc2xpZGVzW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1jbG9uZWQnKSkgbGVuZ3RoLS07XG4gICAgICB9XG5cbiAgICAgIC8vIHNldCBjb250aW51b3VzIHRvIGZhbHNlIGlmIG9ubHkgb25lIHNsaWRlXG4gICAgICBpZiAoc2xpZGVzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgb3B0aW9ucy5jb250aW51b3VzID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIHNwZWNpYWwgY2FzZSBpZiB0d28gc2xpZGVzXG4gICAgICBpZiAoYnJvd3Nlci50cmFuc2l0aW9ucyAmJiBvcHRpb25zLmNvbnRpbnVvdXMgJiYgc2xpZGVzLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgY2xvbmVOb2RlKHNsaWRlc1swXSk7XG4gICAgICAgIGNsb25lTm9kZShzbGlkZXNbMV0pO1xuXG4gICAgICAgIHNsaWRlcyA9IGVsZW1lbnQuY2hpbGRyZW47XG4gICAgICB9XG5cbiAgICAgIC8vIGNyZWF0ZSBhbiBhcnJheSB0byBzdG9yZSBjdXJyZW50IHBvc2l0aW9ucyBvZiBlYWNoIHNsaWRlXG4gICAgICBzbGlkZVBvcyA9IG5ldyBBcnJheShzbGlkZXMubGVuZ3RoKTtcblxuICAgICAgLy8gZGV0ZXJtaW5lIHdpZHRoIG9mIGVhY2ggc2xpZGVcbiAgICAgIHdpZHRoID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIHx8IGNvbnRhaW5lci5vZmZzZXRXaWR0aDtcblxuICAgICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IChzbGlkZXMubGVuZ3RoICogd2lkdGggKiAyKSArICdweCc7XG5cbiAgICAgIC8vIHN0YWNrIGVsZW1lbnRzXG4gICAgICB2YXIgcG9zID0gc2xpZGVzLmxlbmd0aDtcbiAgICAgIHdoaWxlKHBvcy0tKSB7XG4gICAgICAgIHZhciBzbGlkZSA9IHNsaWRlc1twb3NdO1xuXG4gICAgICAgIHNsaWRlLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgICAgICBzbGlkZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBwb3MpO1xuXG4gICAgICAgIGlmIChicm93c2VyLnRyYW5zaXRpb25zKSB7XG4gICAgICAgICAgc2xpZGUuc3R5bGUubGVmdCA9IChwb3MgKiAtd2lkdGgpICsgJ3B4JztcbiAgICAgICAgICBtb3ZlKHBvcywgaW5kZXggPiBwb3MgPyAtd2lkdGggOiAoaW5kZXggPCBwb3MgPyB3aWR0aCA6IDApLCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyByZXBvc2l0aW9uIGVsZW1lbnRzIGJlZm9yZSBhbmQgYWZ0ZXIgaW5kZXhcbiAgICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMgJiYgYnJvd3Nlci50cmFuc2l0aW9ucykge1xuICAgICAgICBtb3ZlKGNpcmNsZShpbmRleC0xKSwgLXdpZHRoLCAwKTtcbiAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgrMSksIHdpZHRoLCAwKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFicm93c2VyLnRyYW5zaXRpb25zKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IChpbmRleCAqIC13aWR0aCkgKyAncHgnO1xuICAgICAgfVxuXG4gICAgICBjb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcblxuICAgICAgLy8gcmVpbml0aWFsaXplIGV2ZW50c1xuICAgICAgZGV0YWNoRXZlbnRzKCk7XG4gICAgICBhdHRhY2hFdmVudHMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmV2KCkge1xuICAgICAgaWYgKGRpc2FibGVkKSByZXR1cm47XG5cbiAgICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMpIHtcbiAgICAgICAgc2xpZGUoaW5kZXgtMSk7XG4gICAgICB9IGVsc2UgaWYgKGluZGV4KSB7XG4gICAgICAgIHNsaWRlKGluZGV4LTEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcblxuICAgICAgaWYgKG9wdGlvbnMuY29udGludW91cykge1xuICAgICAgICBzbGlkZShpbmRleCsxKTtcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCBzbGlkZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICBzbGlkZShpbmRleCsxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5DYWxsYmFjayhwb3MsIGluZGV4LCBkaXIpIHtcbiAgICAgIGlmIChvcHRpb25zLmNhbGxiYWNrKSB7XG4gICAgICAgIG9wdGlvbnMuY2FsbGJhY2socG9zLCBpbmRleCwgZGlyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5UcmFuc2l0aW9uRW5kKHBvcywgaW5kZXgpIHtcbiAgICAgIGlmIChvcHRpb25zLnRyYW5zaXRpb25FbmQpIHtcbiAgICAgICAgb3B0aW9ucy50cmFuc2l0aW9uRW5kKHBvcywgaW5kZXgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNpcmNsZShpbmRleCkge1xuXG4gICAgICAvLyBhIHNpbXBsZSBwb3NpdGl2ZSBtb2R1bG8gdXNpbmcgc2xpZGVzLmxlbmd0aFxuICAgICAgcmV0dXJuIChzbGlkZXMubGVuZ3RoICsgKGluZGV4ICUgc2xpZGVzLmxlbmd0aCkpICUgc2xpZGVzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQb3MoKSB7XG4gICAgICAvLyBGaXggZm9yIHRoZSBjbG9uZSBpc3N1ZSBpbiB0aGUgZXZlbnQgb2YgMiBzbGlkZXNcbiAgICAgIHZhciBjdXJyZW50SW5kZXggPSBpbmRleDtcblxuICAgICAgaWYgKGN1cnJlbnRJbmRleCA+PSBsZW5ndGgpIHtcbiAgICAgICAgY3VycmVudEluZGV4ID0gY3VycmVudEluZGV4IC0gbGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY3VycmVudEluZGV4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNsaWRlKHRvLCBzbGlkZVNwZWVkKSB7XG5cbiAgICAgIC8vIGVuc3VyZSB0byBpcyBvZiB0eXBlICdudW1iZXInXG4gICAgICB0byA9IHR5cGVvZiB0byAhPT0gJ251bWJlcicgPyBwYXJzZUludCh0bywgMTApIDogdG87XG5cbiAgICAgIC8vIGRvIG5vdGhpbmcgaWYgYWxyZWFkeSBvbiByZXF1ZXN0ZWQgc2xpZGVcbiAgICAgIGlmIChpbmRleCA9PT0gdG8pIHJldHVybjtcblxuICAgICAgaWYgKGJyb3dzZXIudHJhbnNpdGlvbnMpIHtcblxuICAgICAgICB2YXIgZGlyZWN0aW9uID0gTWF0aC5hYnMoaW5kZXgtdG8pIC8gKGluZGV4LXRvKTsgLy8gMTogYmFja3dhcmQsIC0xOiBmb3J3YXJkXG5cbiAgICAgICAgLy8gZ2V0IHRoZSBhY3R1YWwgcG9zaXRpb24gb2YgdGhlIHNsaWRlXG4gICAgICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMpIHtcbiAgICAgICAgICB2YXIgbmF0dXJhbF9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgICAgZGlyZWN0aW9uID0gLXNsaWRlUG9zW2NpcmNsZSh0byldIC8gd2lkdGg7XG5cbiAgICAgICAgICAvLyBpZiBnb2luZyBmb3J3YXJkIGJ1dCB0byA8IGluZGV4LCB1c2UgdG8gPSBzbGlkZXMubGVuZ3RoICsgdG9cbiAgICAgICAgICAvLyBpZiBnb2luZyBiYWNrd2FyZCBidXQgdG8gPiBpbmRleCwgdXNlIHRvID0gLXNsaWRlcy5sZW5ndGggKyB0b1xuICAgICAgICAgIGlmIChkaXJlY3Rpb24gIT09IG5hdHVyYWxfZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICB0byA9IC1kaXJlY3Rpb24gKiBzbGlkZXMubGVuZ3RoICsgdG87XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZGlmZiA9IE1hdGguYWJzKGluZGV4LXRvKSAtIDE7XG5cbiAgICAgICAgLy8gbW92ZSBhbGwgdGhlIHNsaWRlcyBiZXR3ZWVuIGluZGV4IGFuZCB0byBpbiB0aGUgcmlnaHQgZGlyZWN0aW9uXG4gICAgICAgIHdoaWxlIChkaWZmLS0pIHtcbiAgICAgICAgICBtb3ZlKCBjaXJjbGUoKHRvID4gaW5kZXggPyB0byA6IGluZGV4KSAtIGRpZmYgLSAxKSwgd2lkdGggKiBkaXJlY3Rpb24sIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgdG8gPSBjaXJjbGUodG8pO1xuXG4gICAgICAgIG1vdmUoaW5kZXgsIHdpZHRoICogZGlyZWN0aW9uLCBzbGlkZVNwZWVkIHx8IHNwZWVkKTtcbiAgICAgICAgbW92ZSh0bywgMCwgc2xpZGVTcGVlZCB8fCBzcGVlZCk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuY29udGludW91cykgeyAvLyB3ZSBuZWVkIHRvIGdldCB0aGUgbmV4dCBpbiBwbGFjZVxuICAgICAgICAgIG1vdmUoY2lyY2xlKHRvIC0gZGlyZWN0aW9uKSwgLSh3aWR0aCAqIGRpcmVjdGlvbiksIDApO1xuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgdG8gPSBjaXJjbGUodG8pO1xuICAgICAgICBhbmltYXRlKGluZGV4ICogLXdpZHRoLCB0byAqIC13aWR0aCwgc2xpZGVTcGVlZCB8fCBzcGVlZCk7XG4gICAgICAgIC8vIG5vIGZhbGxiYWNrIGZvciBhIGNpcmN1bGFyIGNvbnRpbnVvdXMgaWYgdGhlIGJyb3dzZXIgZG9lcyBub3QgYWNjZXB0IHRyYW5zaXRpb25zXG4gICAgICB9XG5cbiAgICAgIGluZGV4ID0gdG87XG4gICAgICBvZmZsb2FkRm4oZnVuY3Rpb24oKSB7XG4gICAgICAgIHJ1bkNhbGxiYWNrKGdldFBvcygpLCBzbGlkZXNbaW5kZXhdLCBkaXJlY3Rpb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW92ZShpbmRleCwgZGlzdCwgc3BlZWQpIHtcbiAgICAgIHRyYW5zbGF0ZShpbmRleCwgZGlzdCwgc3BlZWQpO1xuICAgICAgc2xpZGVQb3NbaW5kZXhdID0gZGlzdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGUoaW5kZXgsIGRpc3QsIHNwZWVkKSB7XG5cbiAgICAgIHZhciBzbGlkZSA9IHNsaWRlc1tpbmRleF07XG4gICAgICB2YXIgc3R5bGUgPSBzbGlkZSAmJiBzbGlkZS5zdHlsZTtcblxuICAgICAgaWYgKCFzdHlsZSkgcmV0dXJuO1xuXG4gICAgICBzdHlsZS53ZWJraXRUcmFuc2l0aW9uRHVyYXRpb24gPVxuICAgICAgICBzdHlsZS5Nb3pUcmFuc2l0aW9uRHVyYXRpb24gPVxuICAgICAgICBzdHlsZS5tc1RyYW5zaXRpb25EdXJhdGlvbiA9XG4gICAgICAgIHN0eWxlLk9UcmFuc2l0aW9uRHVyYXRpb24gPVxuICAgICAgICBzdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBzcGVlZCArICdtcyc7XG5cbiAgICAgIHN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIGRpc3QgKyAncHgsMCknICsgJ3RyYW5zbGF0ZVooMCknO1xuICAgICAgc3R5bGUubXNUcmFuc2Zvcm0gPVxuICAgICAgICBzdHlsZS5Nb3pUcmFuc2Zvcm0gPVxuICAgICAgICBzdHlsZS5PVHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoJyArIGRpc3QgKyAncHgpJztcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFuaW1hdGUoZnJvbSwgdG8sIHNwZWVkKSB7XG5cbiAgICAgIC8vIGlmIG5vdCBhbiBhbmltYXRpb24sIGp1c3QgcmVwb3NpdGlvblxuICAgICAgaWYgKCFzcGVlZCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSB0byArICdweCc7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHN0YXJ0ID0gK25ldyBEYXRlKCk7XG5cbiAgICAgIHZhciB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGltZUVsYXAgPSArbmV3IERhdGUoKSAtIHN0YXJ0O1xuXG4gICAgICAgIGlmICh0aW1lRWxhcCA+IHNwZWVkKSB7XG5cbiAgICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSB0byArICdweCc7XG5cbiAgICAgICAgICBpZiAoZGVsYXkgfHwgb3B0aW9ucy5hdXRvUmVzdGFydCkgcmVzdGFydCgpO1xuXG4gICAgICAgICAgcnVuVHJhbnNpdGlvbkVuZChnZXRQb3MoKSwgc2xpZGVzW2luZGV4XSk7XG5cbiAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9ICgoICh0byAtIGZyb20pICogKE1hdGguZmxvb3IoKHRpbWVFbGFwIC8gc3BlZWQpICogMTAwKSAvIDEwMCkgKSArIGZyb20pICsgJ3B4JztcbiAgICAgIH0sIDQpO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYmVnaW4oKSB7XG4gICAgICBkZWxheSA9IG9wdGlvbnMuYXV0byB8fCAwO1xuICAgICAgaWYgKGRlbGF5KSBpbnRlcnZhbCA9IHNldFRpbWVvdXQobmV4dCwgZGVsYXkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICBkZWxheSA9IDA7XG4gICAgICBjbGVhclRpbWVvdXQoaW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc3RhcnQoKSB7XG4gICAgICBzdG9wKCk7XG4gICAgICBiZWdpbigpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgICBzdG9wKCk7XG4gICAgICBkaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgICAgZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIHJlc3RhcnQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc01vdXNlRXZlbnQoZSkge1xuICAgICAgcmV0dXJuIC9ebW91c2UvLnRlc3QoZS50eXBlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBraWxsKCkge1xuICAgICAgLy8gY2FuY2VsIHNsaWRlc2hvd1xuICAgICAgc3RvcCgpO1xuXG4gICAgICAvLyByZW1vdmUgaW5saW5lIHN0eWxlc1xuICAgICAgY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSAnJztcblxuICAgICAgLy8gcmVzZXQgZWxlbWVudFxuICAgICAgZWxlbWVudC5zdHlsZS53aWR0aCA9ICcnO1xuICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gJyc7XG5cbiAgICAgIC8vIHJlc2V0IHNsaWRlc1xuICAgICAgdmFyIHBvcyA9IHNsaWRlcy5sZW5ndGg7XG4gICAgICB3aGlsZSAocG9zLS0pIHtcblxuICAgICAgICBpZiAoYnJvd3Nlci50cmFuc2l0aW9ucykge1xuICAgICAgICAgIHRyYW5zbGF0ZShwb3MsIDAsIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNsaWRlID0gc2xpZGVzW3Bvc107XG5cbiAgICAgICAgLy8gaWYgdGhlIHNsaWRlIGlzIHRhZ2dlZCBhcyBjbG9uZSwgcmVtb3ZlIGl0XG4gICAgICAgIGlmIChzbGlkZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2xvbmVkJykpIHtcbiAgICAgICAgICB2YXIgX3BhcmVudCA9IHNsaWRlLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgX3BhcmVudC5yZW1vdmVDaGlsZChzbGlkZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgc3R5bGVzXG4gICAgICAgIHNsaWRlLnN0eWxlLndpZHRoID0gJyc7XG4gICAgICAgIHNsaWRlLnN0eWxlLmxlZnQgPSAnJztcblxuICAgICAgICBzbGlkZS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uRHVyYXRpb24gPVxuICAgICAgICAgIHNsaWRlLnN0eWxlLk1velRyYW5zaXRpb25EdXJhdGlvbiA9XG4gICAgICAgICAgc2xpZGUuc3R5bGUubXNUcmFuc2l0aW9uRHVyYXRpb24gPVxuICAgICAgICAgIHNsaWRlLnN0eWxlLk9UcmFuc2l0aW9uRHVyYXRpb24gPVxuICAgICAgICAgIHNsaWRlLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9ICcnO1xuXG4gICAgICAgIHNsaWRlLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9XG4gICAgICAgICAgc2xpZGUuc3R5bGUubXNUcmFuc2Zvcm0gPVxuICAgICAgICAgIHNsaWRlLnN0eWxlLk1velRyYW5zZm9ybSA9XG4gICAgICAgICAgc2xpZGUuc3R5bGUuT1RyYW5zZm9ybSA9ICcnO1xuXG4gICAgICAgIC8vIHJlbW92ZSBjdXN0b20gYXR0cmlidXRlcyAoPylcbiAgICAgICAgLy8gc2xpZGUucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlbW92ZSBhbGwgZXZlbnRzXG4gICAgICBkZXRhY2hFdmVudHMoKTtcblxuICAgICAgLy8gcmVtb3ZlIHRocm90dGxlZCBmdW5jdGlvbiB0aW1lb3V0XG4gICAgICB0aHJvdHRsZWRTZXR1cC5jYW5jZWwoKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIHJvb3QualF1ZXJ5IHx8IHJvb3QuWmVwdG8gKSB7XG4gICAgKGZ1bmN0aW9uKCQpIHtcbiAgICAgICQuZm4uU3dpcGUgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoJ1N3aXBlJywgbmV3IFN3aXBlKCQodGhpcylbMF0sIHBhcmFtcykpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfSkoIHJvb3QualF1ZXJ5IHx8IHJvb3QuWmVwdG8gKTtcbiAgfVxuXG4gIHJldHVybiBTd2lwZTtcbn0pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N3aXBlanMvc3dpcGUuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXG5cdFx0ZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=