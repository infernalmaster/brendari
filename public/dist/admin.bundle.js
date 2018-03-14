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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined) {
            return;
        }
        if (handler === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return Hammer;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module != 'undefined' && module.exports) {
    module.exports = Hammer;
} else {
    window[exportName] = Hammer;
}

})(window, document, 'Hammer');


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Muuri v0.5.3
 * https://github.com/haltu/muuri
 * Copyright (c) 2015, Haltu Oy
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function (global, factory) {

  var namespace = 'Muuri';
  var Hammer;

  if (typeof module === 'object' && module.exports) {
    /* eslint-disable */
    try { Hammer = __webpack_require__(0); } catch (e) {}
    /* eslint-enable */
    module.exports = factory(namespace, Hammer);
  }
  else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Hammer) {
      return factory(namespace, Hammer);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
  else {
    global[namespace] = factory(namespace, global.Hammer);
  }

}(typeof window !== 'undefined' ? window : this, function (namespace, Hammer, undefined) {

  'use strict';

  // Get references to all the stuff we are using from the global scope.
  var global = window;
  var Object = global.Object;
  var Array = global.Array;
  var Math = global.Math;
  var Error = global.Error;
  var Element = global.Element;
  var doc = global.document;
  var docElem = doc.documentElement;
  var body = doc.body;

  // Types.
  var typeFunction = 'function';
  var typeString = 'string';
  var typeNumber = 'number';

  // Raf loop that can be used to organize DOM write and read operations
  // optimally in the next animation frame.
  var rafLoop = createRafLoop();

  // Raf loop queue names.
  var rafQueueLayout = 'layout';
  var rafQueueVisibility = 'visibility';
  var rafQueueMove = 'move';
  var rafQueueScroll = 'scroll';

  // Drag start predicate states.
  var startPredicateInactive = 0;
  var startPredicatePending = 1;
  var startPredicateResolved = 2;
  var startPredicateRejected = 3;

  // Keep track of Grid instances.
  var gridInstances = {};

  // Keep track of Item instances.
  var itemInstances = {};

  // No operation function.
  var noop = function () {};

  // Unique id which is used for Grid instances and Item instances.
  // Should be incremented every time when used.
  var uuid = 0;

  // Get the supported element.matches().
  var elementMatches = getSupportedElementMatches();

  // Get the supported transform style property.
  var transform = getSupportedStyle('transform');

  // Test if transformed elements leak fixed elements.
  var transformLeaksFixed = body ? doesTransformLeakFixed() : null;

  // Event names.
  var evSynchronize = 'synchronize';
  var evLayoutStart = 'layoutStart';
  var evLayoutEnd = 'layoutEnd';
  var evAdd = 'add';
  var evRemove = 'remove';
  var evShowStart = 'showStart';
  var evShowEnd = 'showEnd';
  var evHideStart = 'hideStart';
  var evHideEnd = 'hideEnd';
  var evFilter = 'filter';
  var evSort = 'sort';
  var evMove = 'move';
  var evSend = 'send';
  var evBeforeSend = 'beforeSend';
  var evReceive = 'receive';
  var evBeforeReceive = 'beforeReceive';
  var evDragInit = 'dragInit';
  var evDragStart = 'dragStart';
  var evDragMove = 'dragMove';
  var evDragScroll = 'dragScroll';
  var evDragEnd = 'dragEnd';
  var evDragReleaseStart = 'dragReleaseStart';
  var evDragReleaseEnd = 'dragReleaseEnd';
  var evDestroy = 'destroy';

  /**
   * Grid
   * ****
   */

  /**
   * Creates a new Grid instance.
   *
   * @public
   * @class
   * @param {(HTMLElement|String)} element
   * @param {Object} [options]
   * @param {(?HTMLElement[]|NodeList|String)} [options.items]
   * @param {Number} [options.showDuration=300]
   * @param {String} [options.showEasing="ease"]
   * @param {Object} [options.visibleStyles]
   * @param {Number} [options.hideDuration=300]
   * @param {String} [options.hideEasing="ease"]
   * @param {Object} [options.hiddenStyles]
   * @param {(Function|Object)} [options.layout]
   * @param {Boolean} [options.layout.fillGaps=false]
   * @param {Boolean} [options.layout.horizontal=false]
   * @param {Boolean} [options.layout.alignRight=false]
   * @param {Boolean} [options.layout.alignBottom=false]
   * @param {Boolean} [options.layout.rounding=true]
   * @param {(Boolean|Number)} [options.layoutOnResize=100]
   * @param {Boolean} [options.layoutOnInit=true]
   * @param {Number} [options.layoutDuration=300]
   * @param {String} [options.layoutEasing="ease"]
   * @param {?Object} [options.sortData=null]
   * @param {Boolean} [options.dragEnabled=false]
   * @param {?HtmlElement} [options.dragContainer=null]
   * @param {?Function} [options.dragStartPredicate]
   * @param {Number} [options.dragStartPredicate.distance=0]
   * @param {Number} [options.dragStartPredicate.delay=0]
   * @param {(Boolean|String)} [options.dragStartPredicate.handle=false]
   * @param {?String} [options.dragAxis]
   * @param {(Boolean|Function)} [options.dragSort=true]
   * @param {Number} [options.dragSortInterval=100]
   * @param {(Function|Object)} [options.dragSortPredicate]
   * @param {Number} [options.dragSortPredicate.threshold=50]
   * @param {String} [options.dragSortPredicate.action="move"]
   * @param {String} [options.dragSortPredicate.gaps=true]
   * @param {Number} [options.dragReleaseDuration=300]
   * @param {String} [options.dragReleaseEasing="ease"]
   * @param {Object} [options.dragHammerSettings={touchAction: "none"}]
   * @param {String} [options.containerClass="muuri"]
   * @param {String} [options.itemClass="muuri-item"]
   * @param {String} [options.itemVisibleClass="muuri-item-visible"]
   * @param {String} [options.itemHiddenClass="muuri-item-hidden"]
   * @param {String} [options.itemPositioningClass="muuri-item-positioning"]
   * @param {String} [options.itemDraggingClass="muuri-item-dragging"]
   * @param {String} [options.itemReleasingClass="muuri-item-releasing"]
   */
  function Grid(element, options) {

    var inst = this;
    var settings;
    var items;
    var layoutOnResize;

    // Muuri can be loaded inside the head tag also, but in that case Muuri can
    // not cache body element and run the initial DOM tests. So, if we detect
    // that body element could not be fetched on init we do it here once and
    // also run the DOM tests. If the Grid is instantiated before body is ready
    // you are doing it wrong ;)
    if (!body) {
      body = document.body;
      transformLeaksFixed = doesTransformLeakFixed();
    }

    // Allow passing element as selector string. Store element for instance.
    element = inst._element = typeof element === typeString ? doc.querySelector(element) : element;

    // Throw an error if the container element is not body element or does not
    // exist within the body element.
    if (!body.contains(element)) {
      throw new Error('Container element must be an existing DOM element');
    }

    // Create instance settings by merging the options with default options.
    settings = inst._settings = mergeSettings(Grid.defaultOptions, options);

    // Sanitize dragSort setting.
    if (typeof settings.dragSort !== typeFunction) {
      settings.dragSort = !!settings.dragSort;
    }

    // Create instance id and store it to the grid instances collection.
    gridInstances[inst._id = ++uuid] = inst;

    // Destroyed flag.
    inst._isDestroyed = false;

    // Reference to the currently used Layout instance.
    inst._layout = null;

    // Create private Emitter instance.
    inst._emitter = new Grid.Emitter();

    // Setup grid's show/hide animation handler for items.
    inst._itemShowHandler = getItemVisibilityHandler('show', settings);
    inst._itemHideHandler = getItemVisibilityHandler('hide', settings);

    // Add container element's class name.
    addClass(element, settings.containerClass);

    // Create initial items.
    inst._items = [];
    items = settings.items;
    if (typeof items === typeString) {
      nodeListToArray(inst._element.children).forEach(function (itemElement) {
        if (items === '*' || elementMatches(itemElement, items)) {
          inst._items.push(new Grid.Item(inst, itemElement));
        }
      });
    }
    else if (Array.isArray(items) || isNodeList(items)) {
      inst._items = nodeListToArray(items).map(function (itemElement) {
        return new Grid.Item(inst, itemElement);
      });
    }

    // Sanitize layoutOnResize option and bind debounced resize handler if the
    // layoutOnResize option a valid number.
    layoutOnResize = settings.layoutOnResize;
    layoutOnResize = layoutOnResize === true ? 0 : typeof layoutOnResize === typeNumber ? layoutOnResize : -1;
    if (layoutOnResize >= 0) {
      global.addEventListener('resize', inst._resizeHandler = debounce(function () {
        inst.refreshItems().layout();
      }, layoutOnResize));
    }

    // Layout on init if necessary.
    if (settings.layoutOnInit) {
      inst.layout(true);
    }

  }

  /**
   * Grid - Public properties
   * ************************
   */

  /**
   * @see Item
   */
  Grid.Item = Item;

  /**
   * @see ItemDrag
   */
  Grid.ItemDrag = ItemDrag;

  /**
   * @see ItemRelease
   */
  Grid.ItemRelease = ItemRelease;

  /**
   * @see ItemMigrate
   */
  Grid.ItemMigrate = ItemMigrate;

  /**
   * @see ItemAnimate
   */
  Grid.ItemAnimate = ItemAnimate;

  /**
   * @see Layout
   */
  Grid.Layout = Layout;

  /**
   * @see Emitter
   */
  Grid.Emitter = Emitter;

  /**
   * Default options for Grid instance.
   *
   * @public
   * @memberof Grid
   */
  Grid.defaultOptions = {

    // Item elements
    items: '*',

    // Default show animation
    showDuration: 300,
    showEasing: 'ease',

    // Default hide animation
    hideDuration: 300,
    hideEasing: 'ease',

    // Item's visible/hidden state styles
    visibleStyles: {
      opacity: '1',
      transform: 'scale(1)'
    },
    hiddenStyles: {
      opacity: '0',
      transform: 'scale(0.5)'
    },

    // Layout
    layout: {
      fillGaps: false,
      horizontal: false,
      alignRight: false,
      alignBottom: false,
      rounding: true
    },
    layoutOnResize: 100,
    layoutOnInit: true,
    layoutDuration: 300,
    layoutEasing: 'ease',

    // Sorting
    sortData: null,

    // Drag & Drop
    dragEnabled: false,
    dragContainer: null,
    dragStartPredicate: {
      distance: 0,
      delay: 0,
      handle: false
    },
    dragAxis: null,
    dragSort: true,
    dragSortInterval: 100,
    dragSortPredicate: {
      threshold: 50,
      action: 'move'
    },
    dragReleaseDuration: 300,
    dragReleaseEasing: 'ease',
    dragHammerSettings: {
      touchAction: 'none'
    },

    // Classnames
    containerClass: 'muuri',
    itemClass: 'muuri-item',
    itemVisibleClass: 'muuri-item-shown',
    itemHiddenClass: 'muuri-item-hidden',
    itemPositioningClass: 'muuri-item-positioning',
    itemDraggingClass: 'muuri-item-dragging',
    itemReleasingClass: 'muuri-item-releasing'

  };

  /**
   * Grid - Private properties
   * *************************
   */

  Grid._maxRafBatchSize = 100;

  /**
   * Grid - Public prototype methods
   * *******************************
   */

  /**
   * Bind an event listener.
   *
   * @public
   * @memberof Grid.prototype
   * @param {String} event
   * @param {Function} listener
   * @returns {Grid}
   */
  Grid.prototype.on = function (event, listener) {

    var inst = this;

    if (!inst._isDestroyed) {
      inst._emitter.on(event, listener);
    }

    return inst;

  };

  /**
   * Bind an event listener that is triggered only once.
   *
   * @public
   * @memberof Grid.prototype
   * @param {String} event
   * @param {Function} listener
   * @returns {Grid}
   */
  Grid.prototype.once = function (event, listener) {

    var inst = this;

    if (!inst._isDestroyed) {
      inst._emitter.once(event, listener);
    }

    return inst;

  };

  /**
   * Unbind an event listener.
   *
   * @public
   * @memberof Grid.prototype
   * @param {String} event
   * @param {Function} listener
   * @returns {Grid}
   */
  Grid.prototype.off = function (event, listener) {

    var inst = this;

    if (!inst._isDestroyed) {
      inst._emitter.off(event, listener);
    }

    return inst;

  };

  /**
   * Get the container element.
   *
   * @public
   * @memberof Grid.prototype
   * @returns {HTMLElement}
   */
  Grid.prototype.getElement = function () {

    return this._element;

  };

  /**
   * Get all items. Optionally you can provide specific targets (elements and
   * indices) and filter the results based on the state of the items. Note that
   * the returned array is not the same object used by the instance so modifying
   * it will not affect instance's items. All items that are not found are
   * omitted from the returned array.
   *
   * @public
   * @memberof Grid.prototype
   * @param {GridMultiItemQuery} [targets]
   * @param {GridItemState} [state]
   * @returns {Item[]}
   */
  Grid.prototype.getItems = function (targets, state) {

    var inst = this;

    // Return an empty array immediately if the instance is destroyed.
    if (inst._isDestroyed) {
      return [];
    }

    var hasTargets = targets === 0 || (targets && typeof targets !== typeString);
    var targetItems = !hasTargets ? null : isNodeList(targets) ? nodeListToArray(targets) : [].concat(targets);
    var targetState = !hasTargets ? targets : state;
    var ret = [];
    var item;
    var i;

    // Sanitize target state.
    targetState = typeof targetState === typeString ? targetState : null;

    // If target state or target items are defined return filtered results.
    if (targetState || targetItems) {
      targetItems = targetItems || inst._items;
      for (i = 0; i < targetItems.length; i++) {
        item = hasTargets ? inst._getItem(targetItems[i]) : targetItems[i];
        if (item && (!targetState || isItemInState(item, targetState))) {
          ret.push(item);
        }
      }
      return ret;
    }

    // Otherwise return all items.
    else {
      return ret.concat(inst._items);
    }

  };

  /**
   * Update the cached dimensions of the instance's items.
   *
   * @public
   * @memberof Grid.prototype
   * @param {(GridMultiItemQuery|GridItemState)} [items]
   * @returns {Grid}
   */
  Grid.prototype.refreshItems = function (items) {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var targetItems = inst.getItems(items || 'active');
    var i;

    for (i = 0; i < targetItems.length; i++) {
      targetItems[i]._refreshDimensions();
    }

    return inst;

  };

  /**
   * Update the sort data of the instance's items.
   *
   * @public
   * @memberof Grid.prototype
   * @param {(GridMultiItemQuery|GridItemState)} [items]
   * @returns {Grid}
   */
  Grid.prototype.refreshSortData = function (items) {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var targetItems = inst.getItems(items);
    var i;

    for (i = 0; i < targetItems.length; i++) {
      targetItems[i]._refreshSortData();
    }

    return inst;

  };

  /**
   * Synchronize the item elements to match the order of the items in the DOM.
   * This comes handy if you need to keep the DOM structure matched with the
   * order of the items. Note that if an item's element is not currently a child
   * of the container element (if it is dragged for example) it is ignored and
   * left untouched.
   *
   * @public
   * @memberof Grid.prototype
   * @returns {Grid}
   */
  Grid.prototype.synchronize = function () {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var container = inst._element;
    var items = inst._items;
    var fragment;
    var element;
    var i;

    // Append all elements in order to the container element.
    if (items.length) {
      for (i = 0; i < items.length; i++) {
        element = items[i]._element;
        if (element.parentNode === container) {
          fragment = fragment || doc.createDocumentFragment();
          fragment.appendChild(element);
        }
      }
      if (fragment) {
        container.appendChild(fragment);
      }
    }

    // Emit synchronize event.
    inst._emit(evSynchronize);

    return inst;

  };

  /**
   * Calculate and apply item positions.
   *
   * @public
   * @memberof Grid.prototype
   * @param {Boolean} [instant=false]
   * @param {LayoutCallback} [onFinish]
   * @returns {Grid}
   */
  Grid.prototype.layout = function (instant, onFinish) {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var callback = typeof instant === typeFunction ? instant : onFinish;
    var isInstant = instant === true;
    var items = inst.getItems('active');
    var layout = inst._layout = new Grid.Layout(inst, items);
    var counter = items.length;
    var isBorderBox;
    var containerStyles;
    var item;
    var position;
    var i;

    // The finish function, which will be used for checking if all the items
    // have laid out yet. After all items have finished their animations call
    // callback and emit layoutEnd event. Only emit layoutEnd event if there
    // hasn't been a new layout call during this layout.
    function tryFinish() {
      if (--counter <= 0) {
        if (typeof callback === typeFunction) {
          callback(inst._layout !== layout, items.concat());
        }
        if (inst._layout === layout) {
          inst._emit(evLayoutEnd, items.concat());
        }
      }
    }

    // If grid's width or height was modified, we need to update it's cached
    // dimensions. Also keep in mind that grid's cached width/height should
    // always equal to what elem.getBoundingClientRect() would return, so
    // therefore we need to add the grid element's borders to the dimensions if
    // it's box-sizing is border-box.
    if (layout.setWidth || layout.setHeight) {

      containerStyles = {};
      isBorderBox = getStyle(inst._element, 'box-sizing') === 'border-box';

      if (layout.setHeight) {
        if (typeof layout.height === typeNumber) {
          containerStyles.height = (isBorderBox ? layout.height + inst._border.top + inst._border.bottom : layout.height) + 'px';
        }
        else {
          containerStyles.height = layout.height;
        }
      }

      if (layout.setWidth) {
        if (typeof layout.width === typeNumber) {
          containerStyles.width = (isBorderBox ? layout.width + inst._border.left + inst._border.right : layout.width) + 'px';
        }
        else {
          containerStyles.width = layout.width;
        }
      }

      setStyles(inst._element, containerStyles);

    }

    // Emit layoutStart event. Note that this is intentionally emitted after the
    // container element's dimensions are set, because otherwise there would be
    // no hook for reacting to container dimension changes.
    inst._emit(evLayoutStart, items.concat());

    // If there are no items let's finish quickly.
    if (!items.length) {
      tryFinish();
      return inst;
    }

    // If there are items let's position them.
    for (i = 0; i < items.length; i++) {

      item = items[i];
      position = layout.slots[item._id];

      // Update item's position.
      item._left = position.left;
      item._top = position.top;

      // Layout non-dragged items.
      if (item.isDragging()) {
        tryFinish(true, item);
      }
      else {
        item._layout(isInstant, tryFinish);
      }

    }

    return inst;

  };

  /**
   * Add new items by providing the elements you wish to add to the instance and
   * optionally provide the index where you want the items to be inserted into.
   * All elements that are not already children of the container element will be
   * automatically appended to the container element. If an element has it's CSS
   * display property set to "none" it will be marked as inactive during the
   * initiation process. As long as the item is inactive it will not be part of
   * the layout, but it will retain it's index. You can activate items at any
   * point with grid.show() method. This method will automatically call
   * grid.layout() if one or more of the added elements are visible. If only
   * hidden items are added no layout will be called. All the new visible items
   * are positioned without animation during their first layout.
   *
   * @public
   * @memberof Grid.prototype
   * @param {(HTMLElement|HTMLElement[])} elements
   * @param {Object} [options]
   * @param {Number} [options.index=-1]
   * @param {(Boolean|LayoutCallback|String)} [options.layout=true]
   * @returns {Item[]}
   */
  Grid.prototype.add = function (elements, options) {

    var inst = this;

    if (inst._isDestroyed) {
      return [];
    }

    var targetElements = isNodeList(elements) ? nodeListToArray(elements) : [].concat(elements);
    var newItems = [];

    // Return early if there are no items.
    if (!targetElements.length) {
      return newItems;
    }

    var opts = options || {};
    var layout = opts.layout ? opts.layout : opts.layout === undefined;
    var items = inst._items;
    var needsLayout = false;
    var elementIndex;
    var item;
    var i;

    // Filter out all elements that exist already in current instance.
    // TODO: This filtering can be made a lot faster by storing item elements
    // in a Map or WeakMap. Other option would be to transfer the reponsibility
    // completely to the user and get rid of this sanity check.
    for (i = 0; i < items.length; i++) {
      elementIndex = targetElements.indexOf(items[i]._element);
      if (elementIndex > -1) {
        targetElements.splice(elementIndex, 1);
        if (!targetElements.length) {
          return newItems;
        }
      }
    }

    // Create new items.
    for (i = 0; i < targetElements.length; i++) {

      item = new Grid.Item(inst, targetElements[i]);
      newItems.push(item);

      // If the item to be added is active, we need to do a layout. Also, we
      // need to mark the item with the skipNextLayoutAnimation flag to make it
      // position instantly (without animation) during the next layout. Without
      // the hack the item would animate to it's new position from the northwest
      // corner of the grid, which feels a bit buggy (imho).
      if (item._isActive) {
        needsLayout = true;
        item._skipNextLayoutAnimation = true;
      }

    }

    // Add the new items to the items collection to correct index.
    insertItemsToArray(items, newItems, opts.index);

    // Emit add event.
    inst._emit(evAdd, newItems.concat());

    // If layout is needed.
    if (needsLayout && layout) {
      inst.layout(layout === 'instant', typeof layout === typeFunction ? layout : undefined);
    }

    // Return new items.
    return newItems;

  };

  /**
   * Remove items from the instance.
   *
   * @public
   * @memberof Grid.prototype
   * @param {(GridMultiItemQuery|GridItemState)} items
   * @param {Object} [options]
   * @param {Boolean} [options.removeElements=false]
   * @param {(Boolean|LayoutCallback|String)} [options.layout=true]
   * @returns {Item[]}
   */
  Grid.prototype.remove = function (items, options) {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var opts = options || {};
    var layout = opts.layout ? opts.layout : opts.layout === undefined;
    var needsLayout = false;
    var targetItems = inst.getItems(items);
    var item;
    var i;

    // Remove the individual items.
    for (i = 0; i < targetItems.length; i++) {
      item = targetItems[i];
      if (item._isActive) {
        needsLayout = true;
      }
      item._destroy(opts.removeElements);
    }

    // Emit remove event.
    inst._emit(evRemove, targetItems.concat());

    // If layout is needed.
    if (needsLayout && layout) {
      inst.layout(layout === 'instant', typeof layout === typeFunction ? layout : undefined);
    }

    return targetItems;

  };

  /**
   * Show instance items.
   *
   * @public
   * @memberof Grid.prototype
   * @param {(GridMultiItemQuery|GridItemState)} items
   * @param {Object} [options]
   * @param {Boolean} [options.instant=false]
   * @param {ShowCallback} [options.onFinish]
   * @param {(Boolean|LayoutCallback|String)} [options.layout=true]
   * @returns {Grid}
   */
  Grid.prototype.show = function (items, options) {

    return this._isDestroyed ? this : gridShowHideHandler(this, 'show', items, options);

  };

  /**
   * Hide instance items.
   *
   * @public
   * @memberof Grid.prototype
   * @param {(GridMultiItemQuery|GridItemState)} items
   * @param {Object} [options]
   * @param {Boolean} [options.instant=false]
   * @param {HideCallback} [options.onFinish]
   * @param {(Boolean|LayoutCallback|String)} [options.layout=true]
   * @returns {Grid}
   */
  Grid.prototype.hide = function (items, options) {

    return this._isDestroyed ? this : gridShowHideHandler(this, 'hide', items, options);

  };

  /**
   * Filter items. Expects at least one argument, a predicate, which should be
   * either a function or a string. The predicate callback is executed for every
   * item in the instance. If the return value of the predicate is truthy the
   * item in question will be shown and otherwise hidden. The predicate callback
   * receives the item instance as it's argument. If the predicate is a string
   * it is considered to be a selector and it is checked against every item
   * element in the instance with the native element.matches() method. All the
   * matching items will be shown and others hidden.
   *
   * @public
   * @memberof Grid.prototype
   * @param {(Function|String)} predicate
   * @param {Object} [options]
   * @param {Boolean} [options.instant=false]
   * @param {FilterCallback} [options.onFinish]
   * @param {(Boolean|LayoutCallback|String)} [options.layout=true]
   * @returns {Grid}
   */
  Grid.prototype.filter = function (predicate, options) {

    var inst = this;

    // Return immediately if there are no items or if the instance id destroyed.
    if (inst._isDestroyed || !inst._items.length) {
      return inst;
    }

    var items = inst._items;
    var predicateType = typeof predicate;
    var isPredicateString = predicateType === typeString;
    var isPredicateFn = predicateType === typeFunction;
    var opts = options || {};
    var isInstant = opts.instant === true;
    var layout = opts.layout ? opts.layout : opts.layout === undefined;
    var onFinish = typeof opts.onFinish === typeFunction ? opts.onFinish : null;
    var itemsToShow = [];
    var itemsToHide = [];
    var tryFinishCounter = -1;
    var tryFinish = !onFinish ? noop : function () {
      ++tryFinishCounter && onFinish(itemsToShow.concat(), itemsToHide.concat());
    };
    var item;
    var i;

    // Check which items need to be shown and which hidden.
    if (isPredicateFn || isPredicateString) {
      for (i = 0; i < items.length; i++) {
        item = items[i];
        if (isPredicateFn ? predicate(item) : elementMatches(item._element, predicate)) {
          itemsToShow.push(item);
        }
        else {
          itemsToHide.push(item);
        }
      }
    }

    // Show items that need to be shown.
    if (itemsToShow.length) {
      inst.show(itemsToShow, {
        instant: isInstant,
        onFinish: tryFinish,
        layout: false
      });
    }
    else {
      tryFinish();
    }

    // Hide items that need to be hidden.
    if (itemsToHide.length) {
      inst.hide(itemsToHide, {
        instant: isInstant,
        onFinish: tryFinish,
        layout: false
      });
    }
    else {
      tryFinish();
    }

    // If there are any items to filter.
    if (itemsToShow.length || itemsToHide.length) {

      // Emit filter event.
      inst._emit(evFilter, itemsToShow.concat(), itemsToHide.concat());

      // If layout is needed.
      if (layout) {
        inst.layout(layout === 'instant', typeof layout === typeFunction ? layout : undefined);
      }

    }

    return inst;

  };

  /**
   * Sort items. There are three ways to sort the items. The first is simply by
   * providing a function as the comparer which works identically to native
   * array sort. Alternatively you can sort by the sort data you have provided
   * in the instance's options. Just provide the sort data key(s) as a string
   * (separated by space) and the items will be sorted based on the provided
   * sort data keys. Lastly you have the opportunity to provide a presorted
   * array of items which will be used to sync the internal items array in the
   * same order.
   *
   * @public
   * @memberof Grid.prototype
   * @param {(Function|Item[]|String|String[])} comparer
   * @param {Object} [options]
   * @param {Boolean} [options.descending=false]
   * @param {(Boolean|LayoutCallback|String)} [options.layout=true]
   * @returns {Grid}
   */
  Grid.prototype.sort = function (comparer, options) {

    var inst = this;

    // Let's not sort if it has no effect.
    if (inst._isDestroyed || inst._items.length < 2) {
      return inst;
    }

    var items = inst._items;
    var opts = options || {};
    var isDescending = !!opts.descending;
    var layout = opts.layout ? opts.layout : opts.layout === undefined;
    var origItems = items.concat();
    var indexMap;

    // If function is provided do a native array sort.
    if (typeof comparer === typeFunction) {
      items.sort(function (a, b) {
        var result = comparer(a, b);
        return (isDescending && result !== 0 ? -result : result) || compareItemIndices(a, b, isDescending, indexMap || (indexMap = getItemIndexMap(origItems)));
      });
    }

    // Otherwise if we got a string, let's sort by the sort data as provided in
    // the instance's options.
    else if (typeof comparer === typeString) {
      comparer = comparer.trim().split(' ').map(function (val) {
        return val.split(':');
      });
      items.sort(function (a, b) {
        return compareItems(a, b, isDescending, comparer) || compareItemIndices(a, b, isDescending, indexMap || (indexMap = getItemIndexMap(origItems)));
      });
    }

    // Otherwise if we got an array, let's assume it's a presorted array of the
    // items and order the items based on it.
    else if (Array.isArray(comparer)) {
      sortItemsByReference(items, comparer);
      if (isDescending) {
        items.reverse();
      }
    }

    // Otherwise, let's go home.
    else {
      return inst;
    }

    // Emit sort event.
    inst._emit(evSort, items.concat(), origItems);

    // If layout is needed.
    if (layout) {
      inst.layout(layout === 'instant', typeof layout === typeFunction ? layout : undefined);
    }

    return inst;

  };

  /**
   * Move item to another index or in place of another item.
   *
   * @public
   * @memberof Grid.prototype
   * @param {GridSingleItemQuery} item
   * @param {GridSingleItemQuery} position
   * @param {Object} [options]
   * @param {String} [options.action="move"]
   *   - Accepts either "move" or "swap".
   *   - "move" moves the item in place of the other item.
   *   - "swap" swaps the position of the items.
   * @param {(Boolean|LayoutCallback|String)} [options.layout=true]
   * @returns {Grid}
   */
  Grid.prototype.move = function (item, position, options) {

    var inst = this;

    // Return immediately, if moving an item is not possible.
    if (inst._isDestroyed || inst._items.length < 2) {
      return inst;
    }

    var items = inst._items;
    var opts = options || {};
    var layout = opts.layout ? opts.layout : opts.layout === undefined;
    var isSwap = opts.action === 'swap';
    var action = isSwap ? 'swap' : 'move';
    var fromItem = inst._getItem(item);
    var toItem = inst._getItem(position);
    var fromIndex;
    var toIndex;

    // Make sure the items exist and are not the same.
    if (fromItem && toItem && (fromItem !== toItem)) {

      // Get the indices of the items.
      fromIndex = items.indexOf(fromItem);
      toIndex = items.indexOf(toItem);

      // Do the move/swap.
      (isSwap ? arraySwap : arrayMove)(items, fromIndex, toIndex);

      // Emit move event.
      inst._emit(evMove, {
        item: fromItem,
        fromIndex: fromIndex,
        toIndex: toIndex,
        action: action
      });

      // If layout is needed.
      if (layout) {
        inst.layout(layout === 'instant', typeof layout === typeFunction ? layout : undefined);
      }

    }

    return inst;

  };

  /**
   * Send item to another Grid instance.
   *
   * @public
   * @memberof Grid.prototype
   * @param {GridSingleItemQuery} item
   * @param {Grid} grid
   * @param {GridSingleItemQuery} position
   * @param {Object} [options]
   * @param {HTMLElement} [options.appendTo=document.body]
   * @param {(Boolean|LayoutCallback|String)} [options.layoutSender=true]
   * @param {(Boolean|LayoutCallback|String)} [options.layoutReceiver=true]
   * @returns {Grid}
   */
  Grid.prototype.send = function (item, grid, position, options) {

    var currentGrid = this;

    // Return immediately if either grid is destroyed or if the grids are the
    // same, or if target item was not found.
    if (currentGrid._isDestroyed || grid._isDestroyed || currentGrid === grid || !(item = currentGrid._getItem(item))) {
      return currentGrid;
    }

    var targetGrid = grid;
    var opts = options || {};
    var container = opts.appendTo || body;
    var layoutSender = opts.layoutSender ? opts.layoutSender : opts.layoutSender === undefined;
    var layoutReceiver = opts.layoutReceiver ? opts.layoutReceiver : opts.layoutReceiver === undefined;

    // Start the migration process.
    item._migrate.start(targetGrid, position, container);

    // If migration was started succesfully and the item is active, let's layout
    // the grids.
    if (item._migrate.isActive && item.isActive()) {
      if (layoutSender) {
        currentGrid.layout(layoutSender === 'instant', typeof layoutSender === typeFunction ? layoutSender : undefined);
      }
      if (layoutReceiver) {
        targetGrid.layout(layoutReceiver === 'instant', typeof layoutReceiver === typeFunction ? layoutReceiver : undefined);
      }
    }

    return currentGrid;

  };

  /**
   * Destroy the instance.
   *
   * @public
   * @memberof Grid.prototype
   * @param {Boolean} [removeElements=false]
   * @returns {Grid}
   */
  Grid.prototype.destroy = function (removeElements) {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var container = inst._element;
    var items = inst._items.concat();
    var i;

    // Unbind window resize event listener.
    if (inst._resizeHandler) {
      global.removeEventListener('resize', inst._resizeHandler);
    }

    // Destroy items.
    for (i = 0; i < items.length; i++) {
      items[i]._destroy(removeElements);
    }

    // Restore container.
    removeClass(container, inst._settings.containerClass);
    setStyles(container, {height: ''});

    // Emit destroy event and unbind all events.
    inst._emit(evDestroy);
    inst._emitter.destroy();

    // Remove reference from the grid instances collection.
    gridInstances[inst._id] = undefined;

    // Flag instance as destroyed.
    inst._isDestroyed = true;

    return inst;

  };

  /**
   * Grid - Protected prototype methods
   * **********************************
   */

  /**
   * Get instance's item by element or by index. Target can also be an Item
   * instance in which case the function returns the item if it exists within
   * related Grid instance. If nothing is found with the provided target, null
   * is returned.
   *
   * @protected
   * @memberof Grid.prototype
   * @param {GridSingleItemQuery} [target=0]
   * @returns {?Item}
   */
  Grid.prototype._getItem = function (target) {

    var inst = this;
    var items = inst._items;
    var i;

    // If no target is specified or the instance is destroyed, return the first
    // item or null.
    if (inst._isDestroyed || !target) {
      return items[0] || null;
    }

    // If target is number return the item in that index. If the number is lower
    // than zero look for the item starting from the end of the items array. For
    // example -1 for the last item, -2 for the second last item, etc.
    else if (typeof target === typeNumber) {
      return items[target > -1 ? target : items.length + target] || null;
    }

    // If the target is an instance of Item return it if it is attached to this
    // Grid instance, otherwise return null.
    else if (target instanceof Item) {
      return target._gridId === inst._id ? target : null;
    }

    // In other cases let's assume that the target is an element, so let's try
    // to find an item that matches the element and return it. If item is not
    // found return null.
    else {
      // TODO: This could be made a lot faster by using WeakMap or Map.
      for (i = 0; i < items.length; i++) {
        if (items[i]._element === target) {
          return items[i];
        }
      }
      return null;
    }

  };

  /**
   * Bind an event listener.
   *
   * @protected
   * @memberof Grid.prototype
   * @param {String} event
   * @param {*} [arg1]
   * @param {*} [arg2]
   * @param {*} [arg3]
   * @returns {Grid}
   */
  Grid.prototype._emit = function () {

    var inst = this;

    if (!inst._isDestroyed) {
      inst._emitter.emit.apply(inst._emitter, arguments);
    }

    return inst;

  };

  /**
   * Refresh container's internal dimensions.
   *
   * @private
   * @memberof Grid.prototype
   * @returns {Grid}
   */
  Grid.prototype._refreshDimensions = function () {

    var inst = this;
    var element = inst._element;
    var rect = element.getBoundingClientRect();
    var sides = ['left', 'right', 'top', 'bottom'];
    var i;

    inst._width = rect.width;
    inst._height = rect.height;
    inst._left = rect.left;
    inst._top = rect.top;
    inst._border = {};

    for (i = 0; i < sides.length; i++) {
      inst._border[sides[i]] = getStyleAsFloat(element, 'border-' + sides[i] + '-width');
    }

    return inst;

  };

  /**
   * Item
   * ****
   */

  /**
   * Creates a new Item instance for a Grid instance.
   *
   * @public
   * @class
   * @param {Grid} grid
   * @param {HTMLElement} element
   */
  function Item(grid, element) {

    var inst = this;
    var settings = grid._settings;
    var isHidden;

    // Create instance id and add item to the itemInstances collection.
    inst._id = ++uuid;
    itemInstances[inst._id] = inst;

    // Destroyed flag.
    inst._isDestroyed = false;

    // If the provided item element is not a direct child of the grid container
    // element, append it to the grid container.
    if (element.parentNode !== grid._element) {
      grid._element.appendChild(element);
    }

    // Set item class.
    addClass(element, settings.itemClass);

    // Check if the element is hidden.
    isHidden = getStyle(element, 'display') === 'none';

    // Set visible/hidden class.
    addClass(element, isHidden ? settings.itemHiddenClass : settings.itemVisibleClass);

    // Refrence to connected Grid instance's id.
    inst._gridId = grid._id;

    // The elements.
    inst._element = element;
    inst._child = element.children[0];

    // Initiate item's animation controllers.
    inst._animate = new Grid.ItemAnimate(inst, element);
    inst._animateChild = new Grid.ItemAnimate(inst, inst._child);

    // Set up active state (defines if the item is considered part of the layout
    // or not).
    inst._isActive = isHidden ? false : true;

    // Set up positioning state (defines if the item is currently animating
    // it's position).
    inst._isPositioning = false;

    // Set up visibility states.
    inst._isHidden = isHidden;
    inst._isHiding = false;
    inst._isShowing = false;

    // Visibility animation callback queue. Whenever a callback is provided for
    // show/hide methods and animation is enabled the callback is stored
    // temporarily to this array. The callbacks are called with the first
    // argument as false if the animation succeeded without interruptions and
    // with the first argument as true if the animation was interrupted.
    inst._visibilityQueue = [];

    // Layout animation callback queue. Whenever a callback is provided for
    // layout method and animation is enabled the callback is stored temporarily
    // to this array. The callbacks are called with the first argument as false
    // if the animation succeeded without interruptions and with the first
    // argument as true if the animation was interrupted.
    inst._layoutQueue = [];

    // Set up initial positions.
    inst._left = 0;
    inst._top = 0;

    // Set element's initial styles.
    setStyles(element, {
      left: '0',
      top: '0',
      transform: getTranslateString(0, 0),
      display: isHidden ? 'none' : 'block'
    });

    // Set up the initial dimensions and sort data.
    inst._refreshDimensions()._refreshSortData();

    // Set initial styles for the child element.
    if (isHidden) {
      grid._itemHideHandler.start(inst, true);
    }
    else {
      grid._itemShowHandler.start(inst, true);
    }

    // Set up migration handler data.
    inst._migrate = new Grid.ItemMigrate(inst);

    // Set up release handler
    inst._release = new Grid.ItemRelease(inst);

    // Set up drag handler.
    inst._drag = settings.dragEnabled ? new Grid.ItemDrag(inst) : null;

  }

  /**
   * Item - Public prototype methods
   * *******************************
   */

  /**
   * Get the instance grid reference.
   *
   * @public
   * @memberof Item.prototype
   * @returns {Grid}
   */
  Item.prototype.getGrid = function () {

    return gridInstances[this._gridId];

  };

  /**
   * Get the instance element.
   *
   * @public
   * @memberof Item.prototype
   * @returns {HTMLElement}
   */
  Item.prototype.getElement = function () {

    return this._element;

  };

  /**
   * Get instance element's cached width.
   *
   * @public
   * @memberof Item.prototype
   * @returns {Number}
   */
  Item.prototype.getWidth = function () {

    return this._width;

  };

  /**
   * Get instance element's cached height.
   *
   * @public
   * @memberof Item.prototype
   * @returns {Number}
   */
  Item.prototype.getHeight = function () {

    return this._height;

  };

  /**
   * Get instance element's cached margins.
   *
   * @public
   * @memberof Item.prototype
   * @returns {Object}
   *   - The returned object contains left, right, top and bottom properties
   *     which indicate the item element's cached margins.
   */
  Item.prototype.getMargin = function () {

    return {
      left: this._margin.left,
      right: this._margin.right,
      top: this._margin.top,
      bottom: this._margin.bottom
    };

  };

  /**
   * Get instance element's cached position.
   *
   * @public
   * @memberof Item.prototype
   * @returns {Object}
   *   - The returned object contains left and top properties which indicate the
   *     item element's cached position in the grid.
   */
  Item.prototype.getPosition = function () {

    return {
      left: this._left,
      top: this._top
    };

  };

  /**
   * Is the item active?
   *
   * @public
   * @memberof Item.prototype
   * @returns {Boolean}
   */
  Item.prototype.isActive = function () {

    return this._isActive;

  };

  /**
   * Is the item visible?
   *
   * @public
   * @memberof Item.prototype
   * @returns {Boolean}
   */
  Item.prototype.isVisible = function () {

    return !this._isHidden;

  };

  /**
   * Is the item being animated to visible?
   *
   * @public
   * @memberof Item.prototype
   * @returns {Boolean}
   */
  Item.prototype.isShowing = function () {

    return this._isShowing;

  };

  /**
   * Is the item being animated to hidden?
   *
   * @public
   * @memberof Item.prototype
   * @returns {Boolean}
   */
  Item.prototype.isHiding = function () {

    return this._isHiding;

  };

  /**
   * Is the item positioning?
   *
   * @public
   * @memberof Item.prototype
   * @returns {Boolean}
   */
  Item.prototype.isPositioning = function () {

    return this._isPositioning;

  };

  /**
   * Is the item being dragged?
   *
   * @public
   * @memberof Item.prototype
   * @returns {Boolean}
   */
  Item.prototype.isDragging = function () {

    return !!this._drag && this._drag._data.isActive;

  };

  /**
   * Is the item being released?
   *
   * @public
   * @memberof Item.prototype
   * @returns {Boolean}
   */
  Item.prototype.isReleasing = function () {

    return this._release.isActive;

  };

  /**
   * Is the item destroyed?
   *
   * @public
   * @memberof Item.prototype
   * @returns {Boolean}
   */
  Item.prototype.isDestroyed = function () {

    return this._isDestroyed;

  };

  /**
   * Item - Protected prototype methods
   * **********************************
   */

  /**
   * Recalculate item's dimensions.
   *
   * @protected
   * @memberof Item.prototype
   * @returns {Item}
   */
  Item.prototype._refreshDimensions = function () {

    var inst = this;

    if (inst._isDestroyed || inst._isHidden) {
      return inst;
    }

    var element = inst._element;
    var rect = element.getBoundingClientRect();
    var sides = ['left', 'right', 'top', 'bottom'];
    var margin = inst._margin = inst._margin || {};
    var side;
    var i;

    // Calculate width and height.
    inst._width = rect.width;
    inst._height = rect.height;

    // Calculate margins (ignore negative margins).
    for (i = 0; i < 4; i++) {
      side = getStyleAsFloat(element, 'margin-' + sides[i]);
      margin[sides[i]] = side > 0 ? side : 0;
    }

    return inst;

  };

  /**
   * Fetch and store item's sort data.
   *
   * @protected
   * @memberof Item.prototype
   * @returns {Item}
   */
  Item.prototype._refreshSortData = function () {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var sortData = {};
    var getters = inst.getGrid()._settings.sortData;

    // Fetch sort data.
    if (getters) {
      Object.keys(getters).forEach(function (key) {
        sortData[key] = getters[key](inst, inst._element);
      });
    }

    // Store sort data to the instance.
    inst._sortData = sortData;

    return inst;

  };

  /**
   * Position item based on it's current data.
   *
   * @protected
   * @memberof Item.prototype
   * @param {Boolean} instant
   * @param {Function} [onFinish]
   * @returns {Item}
   */
  Item.prototype._layout = function (instant, onFinish) {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var element = inst._element;
    var isPositioning = inst._isPositioning;
    var migrate = inst._migrate;
    var release = inst._release;
    var isJustReleased = release.isActive && release.isPositioningStarted === false;
    var grid = inst.getGrid();
    var settings = grid._settings;
    var animDuration = isJustReleased ? settings.dragReleaseDuration : settings.layoutDuration;
    var animEasing = isJustReleased ? settings.dragReleaseEasing : settings.layoutEasing;
    var animEnabled = !instant && !inst._skipNextLayoutAnimation && animDuration > 0;
    var isAnimating;
    var offsetLeft;
    var offsetTop;
    var currentLeft;
    var currentTop;
    var targetStyles;

    // If the item is currently positioning process current layout callback
    // queue with interrupted flag on if the item is currently positioning.
    if (isPositioning) {
      processQueue(inst._layoutQueue, true, inst);
    }

    // Mark release positioning as started.
    if (isJustReleased) {
      release.isPositioningStarted = true;
    }

    // Push the callback to the callback queue.
    if (typeof onFinish === typeFunction) {
      inst._layoutQueue.push(onFinish);
    }

    // Get item container offsets and target styles.
    offsetLeft = release.isActive ? release.containerDiffX : migrate.isActive ? migrate.containerDiffX : 0;
    offsetTop = release.isActive ? release.containerDiffY : migrate.isActive ? migrate.containerDiffY : 0;
    targetStyles = {transform: getTranslateString(inst._left + offsetLeft, inst._top + offsetTop)};

    // If no animations are needed, easy peasy!
    if (!animEnabled) {
      isPositioning && rafLoop.cancel(rafQueueLayout, inst._id);
      isAnimating = inst._animate.isAnimating();
      inst._stopLayout(false, targetStyles);
      !isAnimating && setStyles(element, targetStyles);
      inst._skipNextLayoutAnimation = false;
      return inst._finishLayout();
    }

    // Set item as positioning.
    inst._isPositioning = true;

    // Get the element's current left and top position in the read callback.
    // Then in the write callback do the animation if necessary.
    rafLoop.add(rafQueueLayout, inst._id, function () {
      currentLeft = getTranslateAsFloat(element, 'x') - offsetLeft;
      currentTop = getTranslateAsFloat(element, 'y') - offsetTop;
    }, function () {

      // If the item is already in correct position let's quit early.
      if (inst._left === currentLeft && inst._top === currentTop) {
        isPositioning && inst._stopLayout(false, targetStyles);
        inst._isPositioning = false;
        return inst._finishLayout();
      }

      // Set item's positioning class.
      !isPositioning && addClass(element, settings.itemPositioningClass);

      // Animate.
      inst._animate.start(
        {transform: getTranslateString(currentLeft + offsetLeft, currentTop + offsetTop)},
        targetStyles,
        {
          duration: animDuration,
          easing: animEasing,
          onFinish: function () {
            inst._finishLayout();
          }
        }
      );

    });

    return inst;

  };

  /**
   * Position item based on it's current data.
   *
   * @protected
   * @memberof Item.prototype
   * @returns {Item}
   */
  Item.prototype._finishLayout = function () {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    // Mark the item as not positioning and remove positioning classes.
    if (inst._isPositioning) {
      inst._isPositioning = false;
      removeClass(inst._element, inst.getGrid()._settings.itemPositioningClass);
    }

    // Finish up release.
    if (inst._release.isActive) {
      inst._release.stop();
    }

    // Finish up migration.
    if (inst._migrate.isActive) {
      inst._migrate.stop();
    }

    // Process the callback queue.
    processQueue(inst._layoutQueue, false, inst);

    return inst;

  };

  /**
   * Stop item's position animation if it is currently animating.
   *
   * @protected
   * @memberof Item.prototype
   * @param {Boolean} [processLayoutQueue=false]
   * @param {Object} [targetStyles]
   * @returns {Item}
   */
  Item.prototype._stopLayout = function (processLayoutQueue, targetStyles) {

    var inst = this;

    if (inst._isDestroyed || !inst._isPositioning) {
      return inst;
    }

    // Cancel animation init.
    rafLoop.cancel(rafQueueLayout, inst._id);

    // Stop animation.
    inst._animate.stop(targetStyles);

    // Remove positioning class.
    removeClass(inst._element, inst.getGrid()._settings.itemPositioningClass);

    // Reset state.
    inst._isPositioning = false;

    // Process callback queue.
    if (processLayoutQueue) {
      processQueue(inst._layoutQueue, true, inst);
    }

    return inst;

  };

  Item.prototype._show = function (instant, onFinish) {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var element = inst._element;
    var queue = inst._visibilityQueue;
    var callback = typeof onFinish === typeFunction ? onFinish : null;
    var grid = inst.getGrid();
    var settings = grid._settings;

    // If item is visible call the callback and be done with it.
    if (!inst._isShowing && !inst._isHidden) {
      callback && callback(false, inst);
      return inst;
    }

    // If item is showing and does not need to be shown instantly, let's just
    // push callback to the callback queue and be done with it.
    if (inst._isShowing && !instant) {
      callback && queue.push(callback);
      return inst;
    }

    // If the item is hiding or hidden process the current visibility callback
    // queue with the interrupted flag active, update classes and set display
    // to block if necessary.
    if (!inst._isShowing) {
      processQueue(queue, true, inst);
      removeClass(element, settings.itemHiddenClass);
      addClass(element, settings.itemVisibleClass);
      !inst._isHiding && setStyles(element, {display: 'block'});
    }

    // Push callback to the callback queue.
    callback && queue.push(callback);

    // Update item's internal states.
    inst._isActive = inst._isShowing = true;
    inst._isHiding = inst._isHidden = false;

    // If we need to show instantly.
    if (instant) {
      grid._itemShowHandler.stop(inst, settings.visibleStyles);
      inst._isShowing = false;
      processQueue(queue, false, inst);
    }

    // If we need to animate.
    else {
      grid._itemShowHandler.start(inst, instant, function () {
        if (!inst._isHidden) {
          inst._isShowing = false;
          processQueue(queue, false, inst);
        }
      });
    }

    return inst;

  };

  /**
   * Hide item.
   *
   * @protected
   * @memberof Item.prototype
   * @param {Boolean} instant
   * @param {Function} [onFinish]
   * @returns {Item}
   */
  Item.prototype._hide = function (instant, onFinish) {

    var inst = this;

    // Return immediately if the instance is destroyed.
    if (inst._isDestroyed) {
      return inst;
    }

    var element = inst._element;
    var queue = inst._visibilityQueue;
    var callback = typeof onFinish === typeFunction ? onFinish : null;
    var grid = inst.getGrid();
    var settings = grid._settings;

    // If item is already hidden call the callback and be done with it.
    if (!inst._isHiding && inst._isHidden) {
      callback && callback(false, inst);
      return inst;
    }

    // If item is hiding and does not need to be hidden instantly, let's just
    // push callback to the callback queue and be done with it.
    if (inst._isHiding && !instant) {
      callback && queue.push(callback);
      return inst;
    }

    // If the item is showing or visible process the current visibility callback
    // queue with the interrupted flag active, update classes and set display
    // to block if necessary.
    if (!inst._isHiding) {
      processQueue(queue, true, inst);
      addClass(element, settings.itemHiddenClass);
      removeClass(element, settings.itemVisibleClass);
    }

    // Push callback to the callback queue.
    callback && queue.push(callback);

    // Update item's internal states.
    inst._isHidden = inst._isHiding = true;
    inst._isActive = inst._isShowing = false;

    // If we need to hide instantly.
    if (instant) {
      grid._itemHideHandler.stop(inst, settings.hiddenStyles);
      inst._isHiding = false;
      inst._stopLayout(true, {transform: getTranslateString(0, 0)});
      setStyles(element, {display: 'none'});
      processQueue(queue, false, inst);
    }

    // If we need to animate.
    else {
      grid._itemHideHandler.start(inst, instant, function () {
        if (inst._isHidden) {
          inst._isHiding = false;
          inst._stopLayout(true, {transform: getTranslateString(0, 0)});
          setStyles(element, {display: 'none'});
          processQueue(queue, false, inst);
        }
      });
    }

    return inst;

  };

  /**
   * Destroy item instance.
   *
   * @protected
   * @memberof Item.prototype
   * @param {Boolean} [removeElement=false]
   * @returns {Item}
   */
  Item.prototype._destroy = function (removeElement) {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var element = inst._element;
    var grid = inst.getGrid();
    var settings = grid._settings;
    var index = grid._items.indexOf(inst);

    // Destroy release and migration.
    inst._release.destroy();
    inst._migrate.destroy();

    // Stop animations.
    inst._stopLayout(true, {});
    grid._itemShowHandler.stop(inst, {});
    grid._itemHideHandler.stop(inst, {});

    // Destroy drag.
    inst._drag && inst._drag.destroy();

    // Destroy animation handlers.
    inst._animate.destroy();
    inst._animateChild.destroy();

    // Handle visibility callback queue, fire all uncompleted callbacks with
    // interrupted flag.
    processQueue(inst._visibilityQueue, true, inst);

    // Remove all inline styles.
    element.removeAttribute('style');
    inst._child.removeAttribute('style');

    // Remove classes.
    removeClass(element, settings.itemPositioningClass);
    removeClass(element, settings.itemDraggingClass);
    removeClass(element, settings.itemReleasingClass);
    removeClass(element, settings.itemClass);
    removeClass(element, settings.itemVisibleClass);
    removeClass(element, settings.itemHiddenClass);

    // Remove item from Grid instance if it still exists there.
    index > -1 && grid._items.splice(index, 1);

    // Remove element from DOM.
    removeElement && element.parentNode.removeChild(element);

    // Remove item instance from the item instances collection.
    itemInstances[inst._id] = undefined;

    // Update item states (mostly just for good measure).
    inst._isActive = inst._isPositioning = inst._isHiding = inst._isShowing = false;
    inst._isDestroyed = inst._isHidden = true;

    return inst;

  };

  /**
   * Layout
   * ******
   */

  /**
   * Creates a new Layout instance.
   *
   * @public
   * @class
   * @param {Grid} grid
   * @param {Item[]} items
   */
  function Layout(grid, items) {

    var inst = this;
    var layoutSettings = grid._settings.layout;

    // Clone items.
    items = items.concat();

    // Let's make sure we have the correct container dimensions before going
    // further.
    grid._refreshDimensions();

    var width = grid._width - grid._border.left - grid._border.right;
    var height = grid._height - grid._border.top - grid._border.bottom;
    var isCustomLayout = typeof layoutSettings === typeFunction;
    var layout = isCustomLayout ? layoutSettings(items, width, height) :
      muuriLayout(items, width, height, isPlainObject(layoutSettings) ? layoutSettings : {});

    // Set instance data based on layout data.
    inst.slots = layout.slots;
    inst.setWidth = layout.setWidth || false;
    inst.setHeight = layout.setHeight || false;
    inst.width = layout.width;
    inst.height = layout.height;

  }

  /**
   * Emitter
   * *******
   */

  /**
   * Event emitter constructor.
   *
   * @public
   * @class
   */
  function Emitter() {

    this._events = {};
    this._isDestroyed = false;

  }

  /**
   * Emitter - Public prototype methods
   * **********************************
   */

  /**
   * Bind an event listener.
   *
   * @public
   * @memberof Emitter.prototype
   * @param {String} event
   * @param {Function} listener
   * @returns {Emitter}
   */
  Emitter.prototype.on = function (event, listener) {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var listeners = inst._events[event] || [];
    listeners.push(listener);
    inst._events[event] = listeners;

    return inst;

  };

  /**
   * Bind an event listener that is triggered only once.
   *
   * @public
   * @memberof Emitter.prototype
   * @param {String} event
   * @param {Function} listener
   * @returns {Emitter}
   */
  Emitter.prototype.once = function (event, listener) {

    var inst = this;
    return this.on(event, function callback() {
      inst.off(event, callback);
      listener.apply(null, arguments);
    });

  };

  /**
   * Unbind all event listeners that match the provided listener function.
   *
   * @public
   * @memberof Emitter.prototype
   * @param {String} event
   * @param {Function} listener
   * @returns {Emitter}
   */
  Emitter.prototype.off = function (event, listener) {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var listeners = inst._events[event] || [];
    var i = listeners.length;

    while (i--) {
      if (listener === listeners[i]) {
        listeners.splice(i, 1);
      }
    }

    return inst;

  };

  /**
   * Emit all listeners in a specified event with the provided arguments.
   *
   * @public
   * @memberof Emitter.prototype
   * @param {String} event
   * @param {*} [arg1]
   * @param {*} [arg2]
   * @param {*} [arg3]
   * @returns {Emitter}
   */
  Emitter.prototype.emit = function (event, arg1, arg2, arg3) {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var listeners = inst._events[event] || [];
    var listenersLength = listeners.length;
    var argsLength = arguments.length - 1;
    var i;

    if (listenersLength) {
      listeners = listeners.concat();
      for (i = 0; i < listenersLength; i++) {
        argsLength === 0 ? listeners[i]() :
        argsLength === 1 ? listeners[i](arg1) :
        argsLength === 2 ? listeners[i](arg1, arg2) :
                            listeners[i](arg1, arg2, arg3);
      }
    }

    return inst;

  };

  /**
   * Destroy emitter instance. Basically just removes all bound listeners.
   *
   * @public
   * @memberof Emitter.prototype
   * @returns {Emitter}
   */
  Emitter.prototype.destroy = function () {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var eventNames = Object.keys(inst._events);
    var i;

    for (i = 0; i < eventNames.length; i++) {
      inst._events[eventNames[i]] = null;
    }

    inst._isDestroyed = true;

    return inst;

  };

  /**
   * ItemAnimate
   * ***********
   */

  /**
   * Muuri's internal animation engine. Uses Web Animations API.
   *
   * @public
   * @class
   * @param {Item} item
   * @param {HTMLElement} element
   */
  function ItemAnimate(item, element) {

    var inst = this;
    inst._item = item;
    inst._element = element;
    inst._animation = null;
    inst._propsTo = null;
    inst._isDestroyed = false;

  }

  /**
   * ItemAnimate - Public prototype methods
   * **************************************
   */

  /**
   * Start instance's animation. Automatically stops current animation if it is
   * running.
   *
   * @public
   * @memberof ItemAnimate.prototype
   * @param {Object} propsFrom
   * @param {Object} propsTo
   * @param {Object} [options]
   * @param {Number} [options.duration=300]
   * @param {String} [options.easing='ease']
   * @param {Function} [options.onFinish]
   */
  ItemAnimate.prototype.start = function (propsFrom, propsTo, options) {

    var inst = this;

    if (inst._isDestroyed) {
      return;
    }

    var opts = options || {};
    var callback = typeof opts.onFinish === typeFunction ? opts.onFinish : null;
    var shouldStop;

    // If item is being animate check if the target animation properties equal
    // to the properties in the current animation. If they match we can just let
    // the animation continue and be done with it (and of course change the
    // cached callback). If the animation properties do not match we need to
    // stop the ongoing animation.
    if (inst._animation) {
      shouldStop = Object.keys(propsTo).some(function (propName) {
        return propsTo[propName] !== inst._propsTo[propName];
      });
      if (shouldStop) {
        inst._animation.cancel();
      }
      else {
        inst._animation.onfinish = function () {
          inst._animation = inst._propsTo = null;
          callback && callback();
        };
        return;
      }
    }

    // Cache target props.
    inst._propsTo = propsTo;

    // Start the animation.
    inst._animation = inst._element.animate([propsFrom, propsTo], {
      duration: opts.duration || 300,
      easing: opts.easing || 'ease'
    });

    // Bind animation finish callback.
    inst._animation.onfinish = function () {
      inst._animation = inst._propsTo = null;
      callback && callback();
    };

    // Set the end styles.
    setStyles(inst._element, propsTo);

  };

  /**
   * Stop instance's current animation if running.
   *
   * @private
   * @memberof ItemAnimate.prototype
   * @param {Object} [currentProps]
   */
  ItemAnimate.prototype.stop = function (currentProps) {

    var inst = this;

    if (!inst._isDestroyed && inst._animation) {
      setStyles(inst._element, currentProps || getCurrentStyles(inst._element, inst._propsTo));
      inst._animation.cancel();
      inst._animation = inst._propsTo = null;
    }

  };

  /**
   * Check if the item is being animated currently.
   *
   * @private
   * @memberof ItemAnimate.prototype
   * @return {Boolean}
   */
  ItemAnimate.prototype.isAnimating = function () {

    return !!this._animation;

  };

  /**
   * Destroy the instance and stop current animation if it is running.
   *
   * @public
   * @memberof ItemAnimate.prototype
   * @returns {Boolean}
   */
  ItemAnimate.prototype.destroy = function () {

    var inst = this;

    if (!inst._isDestroyed) {
      inst.stop();
      inst._item = inst._element = null;
      inst._isDestroyed = true;
    }

  };

  /**
   * ItemMigrate
   * ***********
   */

  /**
   * The migrate process handler constructor.
   *
   * @class
   * @private
   * @param {Item} item
   */
  function ItemMigrate(item) {

    var migrate = this;

    // Private props.
    migrate._itemId = item._id;
    migrate._isDestroyed = false;

    // Public props.
    migrate.isActive = false;
    migrate.container = false;
    migrate.containerDiffX = 0;
    migrate.containerDiffY = 0;

  }

  /**
   * ItemMigrate - Public prototype methods
   * **************************************
   */

  /**
   * Destroy instance.
   *
   * @public
   * @memberof ItemMigrate.prototype
   * @returns {ItemMigrate}
   */
  ItemMigrate.prototype.destroy = function () {

    var migrate = this;

    if (!migrate._isDestroyed) {
      migrate.stop(true);
      migrate._isDestroyed = true;
    }

    return migrate;

  };

  /**
   * Get Item instance.
   *
   * @public
   * @memberof ItemMigrate.prototype
   * @returns {?Item}
   */
  ItemMigrate.prototype.getItem = function () {

    return itemInstances[this._itemId] || null;

  };

  /**
   * Start the migrate process of an item.
   *
   * @public
   * @memberof ItemMigrate.prototype
   * @param {Grid} targetGrid
   * @param {GridSingleItemQuery} position
   * @param {HTMLElement} [container]
   * @returns {ItemMigrate}
   */
  ItemMigrate.prototype.start = function (targetGrid, position, container) {

    var migrate = this;

    if (migrate._isDestroyed) {
      return migrate;
    }

    var item = migrate.getItem();
    var itemElement = item._element;
    var isItemVisible = item.isVisible();
    var currentGrid = item.getGrid();
    var currentGridStn = currentGrid._settings;
    var targetGridStn = targetGrid._settings;
    var targetGridElement = targetGrid._element;
    var currentIndex = currentGrid._items.indexOf(item);
    var targetIndex = typeof position === typeNumber ? position : targetGrid._items.indexOf(targetGrid._getItem(position));
    var targetContainer = container || body;
    var currentContainer;
    var offsetDiff;
    var containerDiff;
    var translateX;
    var translateY;

    // If we have invalid new index, let's return immediately.
    if (targetIndex === null) {
      return migrate;
    }

    // Normalize target index (for event data).
    targetIndex = normalizeArrayIndex(targetGrid._items, targetIndex, true);

    // Get current translateX and translateY values if needed.
    if (item.isPositioning() || migrate.isActive || item.isReleasing()) {
      translateX = getTranslateAsFloat(itemElement, 'x');
      translateY = getTranslateAsFloat(itemElement, 'y');
    }

    // Abort current positioning.
    if (item.isPositioning()) {
      item._stopLayout(true, {transform: getTranslateString(translateX, translateY)});
    }

    // Abort current migration.
    if (migrate.isActive) {
      translateX -= migrate.containerDiffX;
      translateY -= migrate.containerDiffY;
      migrate.stop(true, {transform: getTranslateString(translateX, translateY)});
    }

    // Abort current release.
    if (item.isReleasing()) {
      translateX -= item._release.containerDiffX;
      translateY -= item._release.containerDiffY;
      item._release.stop(true, {transform: getTranslateString(translateX, translateY)});
    }

    // Stop current visibility animations.
    // TODO: This causes potentially layout thrashing, because we are not
    // feeding any styles to the stop handlers.
    currentGrid._itemShowHandler.stop(item);
    currentGrid._itemHideHandler.stop(item);

    // Destroy current drag.
    if (item._drag) {
      item._drag.destroy();
    }

    // Destroy current animation handlers.
    item._animate.destroy();
    item._animateChild.destroy();

    // Process current visibility animation queue.
    processQueue(item._visibilityQueue, true, item);

    // Emit beforeSend event.
    currentGrid._emit(evBeforeSend, {
      item: item,
      fromGrid: currentGrid,
      fromIndex: currentIndex,
      toGrid: targetGrid,
      toIndex: targetIndex
    });

    // Emit beforeReceive event.
    targetGrid._emit(evBeforeReceive, {
      item: item,
      fromGrid: currentGrid,
      fromIndex: currentIndex,
      toGrid: targetGrid,
      toIndex: targetIndex
    });

    // Remove current classnames.
    removeClass(itemElement, currentGridStn.itemClass);
    removeClass(itemElement, currentGridStn.itemVisibleClass);
    removeClass(itemElement, currentGridStn.itemHiddenClass);

    // Add new classnames.
    addClass(itemElement, targetGridStn.itemClass);
    addClass(itemElement, isItemVisible ? targetGridStn.itemVisibleClass : targetGridStn.itemHiddenClass);

    // Move item instance from current grid to target grid.
    currentGrid._items.splice(currentIndex, 1);
    insertItemsToArray(targetGrid._items, item, targetIndex);

    // Update item's grid id reference.
    item._gridId = targetGrid._id;

    // Instantiate new animation controllers.
    item._animate = new Grid.ItemAnimate(item, itemElement);
    item._animateChild = new Grid.ItemAnimate(item, item._child);

    // Get current container
    currentContainer = itemElement.parentNode;

    // Move the item inside the target container if it's different than the
    // current container.
    if (targetContainer !== currentContainer) {
      targetContainer.appendChild(itemElement);
      offsetDiff = getOffsetDiff(targetContainer, currentContainer, true);
      if (translateX === undefined) {
        translateX = getTranslateAsFloat(itemElement, 'x');
        translateY = getTranslateAsFloat(itemElement, 'y');
      }
      setStyles(itemElement, {transform: getTranslateString(translateX + offsetDiff.left, translateY + offsetDiff.top)});
    }

    // Update child element's styles to reflect the current visibility state.
    item._child.removeAttribute('style');
    if (isItemVisible) {
      targetGrid._itemShowHandler.start(item, true);
    }
    else {
      targetGrid._itemHideHandler.start(item, true);
    }

    // Update display styles.
    setStyles(itemElement, {
      display: isItemVisible ? 'block' : 'hidden'
    });

    // Get offset diff for the migration data.
    containerDiff = getOffsetDiff(targetContainer, targetGridElement, true);

    // Update item's cached dimensions and sort data.
    item._refreshDimensions()._refreshSortData();

    // Create new drag handler.
    item._drag = targetGridStn.dragEnabled ? new Grid.ItemDrag(item) : null;

    // Setup migration data.
    migrate.isActive = true;
    migrate.container = targetContainer;
    migrate.containerDiffX = containerDiff.left;
    migrate.containerDiffY = containerDiff.top;

    // Emit send event.
    currentGrid._emit(evSend, {
      item: item,
      fromGrid: currentGrid,
      fromIndex: currentIndex,
      toGrid: targetGrid,
      toIndex: targetIndex
    });

    // Emit receive event.
    targetGrid._emit(evReceive, {
      item: item,
      fromGrid: currentGrid,
      fromIndex: currentIndex,
      toGrid: targetGrid,
      toIndex: targetIndex
    });

    return migrate;

  };

  /**
   * End the migrate process of an item. This method can be used to abort an
   * ongoing migrate process (animation) or finish the migrate process.
   *
   * @public
   * @memberof ItemMigrate.prototype
   * @param {Boolean} [abort=false]
   *  - Should the migration be aborted?
   * @param {Object} [currentStyles]
   *  - Optional current translateX and translateY styles.
   * @returns {ItemMigrate}
   */
  ItemMigrate.prototype.stop = function (abort, currentStyles) {

    var migrate = this;

    if (migrate._isDestroyed || !migrate.isActive) {
      return migrate;
    }

    var item = migrate.getItem();
    var element = item._element;
    var grid = item.getGrid();
    var gridElement = grid._element;
    var translateX;
    var translateY;

    if (migrate.container !== gridElement) {
      if (!currentStyles) {
        translateX = abort ? getTranslateAsFloat(element, 'x') - migrate.containerDiffX : item._left;
        translateY = abort ? getTranslateAsFloat(element, 'y') - migrate.containerDiffY : item._top;
        currentStyles = {transform: getTranslateString(translateX, translateY)};
      }
      gridElement.appendChild(element);
      setStyles(element, currentStyles);
    }

    migrate.isActive = false;
    migrate.container = null;
    migrate.containerDiffX = 0;
    migrate.containerDiffY = 0;

    return migrate;

  };

  /**
   * ItemRelease
   * ***********
   */

  /**
   * The release process handler constructor. Although this might seem as proper
   * fit for the drag process this needs to be separated into it's own logic
   * because there might be a scenario where drag is disabled, but the release
   * process still needs to be implemented (dragging from a grid to another).
   *
   * @class
   * @private
   * @param {Item} item
   */
  function ItemRelease(item) {

    var release = this;

    // Private props.
    release._itemId = item._id;
    release._isDestroyed = false;

    // Public props.
    release.isActive = false;
    release.isPositioningStarted = false;
    release.containerDiffX = 0;
    release.containerDiffY = 0;

  }

  /**
   * ItemRelease - Public prototype methods
   * **************************************
   */

  /**
   * Destroy instance.
   *
   * @public
   * @memberof ItemRelease.prototype
   * @returns {ItemRelease}
   */
  ItemRelease.prototype.destroy = function () {

    var release = this;

    if (!release._isDestroyed) {
      release.stop(true);
      release._isDestroyed = true;
    }

    return release;

  };

  /**
   * Get Item instance.
   *
   * @public
   * @memberof ItemRelease.prototype
   * @returns {?Item}
   */
  ItemRelease.prototype.getItem = function () {

    return itemInstances[this._itemId] || null;

  };

  /**
   * Reset public data and remove releasing class.
   *
   * @public
   * @memberof ItemRelease.prototype
   * @returns {ItemRelease}
   */
  ItemRelease.prototype.reset = function () {

    var release = this;

    if (release._isDestroyed) {
      return release;
    }

    var item = release.getItem();
    release.isActive = false;
    release.isPositioningStarted = false;
    release.containerDiffX = 0;
    release.containerDiffY = 0;
    removeClass(item._element, item.getGrid()._settings.itemReleasingClass);

    return release;

  };

  /**
   * Start the release process of an item.
   *
   * @public
   * @memberof ItemRelease.prototype
   * @returns {ItemRelease}
   */
  ItemRelease.prototype.start = function () {

    var release = this;

    if (release._isDestroyed || release.isActive) {
      return release;
    }

    var item = release.getItem();
    var grid = item.getGrid();

    // Flag release as active.
    release.isActive = true;

    // Add release classname to the released element.
    addClass(item._element, grid._settings.itemReleasingClass);

    // Emit dragReleaseStart event.
    grid._emit(evDragReleaseStart, item);

    // Position the released item.
    item._layout(false);

    return release;

  };

  /**
   * End the release process of an item. This method can be used to abort an
   * ongoing release process (animation) or finish the release process.
   *
   * @public
   * @memberof ItemRelease.prototype
   * @param {Boolean} [abort=false]
   *  - Should the release be aborted? When true, the release end event won't be
   *    emitted. Set to true only when you need to abort the release process
   *    while the item is animating to it's position.
   * @param {Object} [currentStyles]
   *  - Optional current translateX and translateY styles.
   * @returns {ItemRelease}
   */
  ItemRelease.prototype.stop = function (abort, currentStyles) {

    var release = this;

    if (release._isDestroyed || !release.isActive) {
      return release;
    }

    var item = release.getItem();
    var element = item._element;
    var grid = item.getGrid();
    var container = grid._element;
    var containerDiffX = release.containerDiffX;
    var containerDiffY = release.containerDiffY;
    var translateX;
    var translateY;

    // Reset data and remove releasing classname from the element.
    release.reset();

    // If the released element is outside the grid's container element put it
    // back there and adjust position accordingly.
    if (element.parentNode !== container) {
      if (!currentStyles) {
        translateX = abort ? getTranslateAsFloat(element, 'x') - containerDiffX : item._left;
        translateY = abort ? getTranslateAsFloat(element, 'y') - containerDiffY : item._top;
        currentStyles = {transform: getTranslateString(translateX, translateY)};
      }
      container.appendChild(element);
      setStyles(element, currentStyles);
    }

    // Emit dragReleaseEnd event.
    if (!abort) {
      grid._emit(evDragReleaseEnd, item);
    }

    return release;

  };

  /**
   * ItemDrag
   * ********
   */

  /**
   * Bind Hammer touch interaction to an item.
   *
   * @class
   * @private
   * @param {Item} item
   */
  function ItemDrag(item) {

    if (!Hammer) {
      throw new Error('[' + namespace + '] required dependency Hammer is not defined.');
    }

    var drag = this;
    var element = item._element;
    var grid = item.getGrid();
    var settings = grid._settings;
    var hammer;

    // Start predicate.
    var startPredicate = typeof settings.dragStartPredicate === typeFunction ?
      settings.dragStartPredicate : ItemDrag.defaultStartPredicate;
    var startPredicateState = startPredicateInactive;
    var startPredicateResult;

    // Protected data.
    drag._itemId = item._id;
    drag._gridId = grid._id;
    drag._hammer = hammer = new Hammer.Manager(element);
    drag._isDestroyed = false;
    drag._isMigrating = false;
    drag._data = {};

    // Create a private drag start resolver that can be used to resolve the drag
    // start predicate asynchronously.
    drag._resolveStartPredicate = function (event) {
      if (!drag._isDestroyed && startPredicateState === startPredicatePending) {
        startPredicateState = startPredicateResolved;
        drag.onStart(event);
      }
    };

    // Create scroll listener.
    drag._scrollListener = function (e) {
      drag.onScroll(e);
    };

    // Create overlap checker function.
    drag._checkSortOverlap = debounce(function () {
      drag._data.isActive && drag.checkOverlap();
    }, settings.dragSortInterval);

    // Create sort predicate.
    drag._sortPredicate = typeof settings.dragSortPredicate === typeFunction ?
      settings.dragSortPredicate : ItemDrag.defaultSortPredicate;

    // Setup item's initial drag data.
    drag.reset();

    // Add drag recognizer to hammer.
    hammer.add(new Hammer.Pan({
      event: 'drag',
      pointers: 1,
      threshold: 0,
      direction: Hammer.DIRECTION_ALL
    }));

    // Add draginit recognizer to hammer.
    hammer.add(new Hammer.Press({
      event: 'draginit',
      pointers: 1,
      threshold: 1000,
      time: 0
    }));

    // Configure the hammer instance.
    if (isPlainObject(settings.dragHammerSettings)) {
      hammer.set(settings.dragHammerSettings);
    }

    // Bind drag events.
    hammer
    .on('draginit dragstart dragmove', function (e) {

      // Let's activate drag start predicate state.
      if (startPredicateState === startPredicateInactive) {
        startPredicateState = startPredicatePending;
      }

      // If predicate is pending try to resolve it.
      if (startPredicateState === startPredicatePending) {
        startPredicateResult = startPredicate(drag.getItem(), e);
        if (startPredicateResult === true) {
          startPredicateState = startPredicateResolved;
          drag.onStart(e);
        }
        else if (startPredicateResult === false) {
          startPredicateState = startPredicateRejected;
        }
      }

      // Otherwise if predicate is resolved and drag is active, move the item.
      else if (startPredicateState === startPredicateResolved && drag._data.isActive) {
        drag.onMove(e);
      }

    })
    .on('dragend dragcancel draginitup', function (e) {

      // Check if the start predicate was resolved during drag.
      var isResolved = startPredicateState === startPredicateResolved;

      // Do final predicate check to allow user to unbind stuff for the current
      // drag procedure within the predicate callback. The return value of this
      // check will have no effect to the state of the predicate.
      startPredicate(drag.getItem(), e);

      // Reset start predicate state.
      startPredicateState = startPredicateInactive;

      // If predicate is resolved and dragging is active, call the end handler.
      if (isResolved && drag._data.isActive) {
        drag.onEnd(e);
      }

    });

    // Prevent native link/image dragging for the item and it's ancestors.
    element.addEventListener('dragstart', preventDefault, false);

  }

  /**
   * ItemDrag - Public methods
   * *************************
   */

  /**
   * Default drag start predicate handler that handles anchor elements
   * gracefully. The return value of this function defines if the drag is
   * started, rejected or pending. When true is returned the dragging is started
   * and when false is returned the dragging is rejected. If nothing is returned
   * the predicate will be called again on the next drag movement.
   *
   * @public
   * @memberof ItemDrag
   * @param {Item} item
   * @param {Object} event
   * @param {Object} [options]
   *   - An optional options object which can be used to pass the predicate
   *     it's options manually. By default the predicate retrieves the options
   *     from the grid's settings.
   * @returns {Boolean}
   */
  ItemDrag.defaultStartPredicate = function (item, event, options) {

    var element = item._element;
    var predicate = item._drag._startPredicateData;
    var config;
    var isAnchor;
    var href;
    var target;

    // Setup data if it is not set up yet.
    if (!predicate) {
      config = options || item._drag.getGrid()._settings.dragStartPredicate;
      config = isPlainObject(config) ? config : {};
      predicate = item._drag._startPredicateData = {
        distance: Math.abs(config.distance) || 0,
        delay: Math.max(config.delay, 0) || 0,
        handle: typeof config.handle === 'string' ? config.handle : false
      };
    }

    // Final event logic. At this stage return value does not matter anymore,
    // the predicate is either resolved or it's not and there's nothing to do
    // about it. Here we just reset data and if the item element is a link
    // we follow it (if there has only been slight movement).
    if (event.isFinal) {
      isAnchor = element.tagName.toLowerCase() === 'a';
      href = element.getAttribute('href');
      target = element.getAttribute('target');
      dragStartPredicateReset(item);
      if (isAnchor && href && Math.abs(event.deltaX) < 2 && Math.abs(event.deltaY) < 2 && event.deltaTime < 200) {
        if (target && target !== '_self') {
          global.open(href, target);
        }
        else {
          global.location.href = href;
        }
      }
      return;
    }

    // Find and store the handle element so we can check later on if the
    // cursor is within the handle. If we have a handle selector let's find
    // the corresponding element. Otherwise let's use the item element as the
    // handle.
    if (!predicate.handleElement) {
      if (predicate.handle) {
        predicate.handleElement = (event.changedPointers[0] || {}).target;
        while (predicate.handleElement && !elementMatches(predicate.handleElement, predicate.handle)) {
          predicate.handleElement = predicate.handleElement !== element ? predicate.handleElement.parentElement : null;
        }
        if (!predicate.handleElement) {
          return false;
        }
      }
      else {
        predicate.handleElement = element;
      }
    }

    // If delay is defined let's keep track of the latest event and initiate
    // delay if it has not been done yet.
    if (predicate.delay) {
      predicate.event = event;
      if (!predicate.delayTimer) {
        predicate.delayTimer = global.setTimeout(function () {
          predicate.delay = 0;
          if (dragStartPredicateResolve(item, predicate.event)) {
            item._drag._resolveStartPredicate(predicate.event);
            dragStartPredicateReset(item);
          }
        }, predicate.delay);
      }
    }

    return dragStartPredicateResolve(item, event);

  };

  /**
   * Default drag sort predicate.
   *
   * @public
   * @memberof ItemDrag
   * @param {Item} item
   * @param {Object} event
   * @returns {(Boolean|DragSortCommand)}
   *   - Returns false if no valid index was found. Otherwise returns drag sort
   *     command.
   */
  ItemDrag.defaultSortPredicate = function (item) {

    var drag = item._drag;
    var dragData = drag._data;
    var rootGrid = drag.getGrid();
    var settings = rootGrid._settings;
    var config = settings.dragSortPredicate || {};
    var sortThreshold = config.threshold || 50;
    var sortAction = config.action || 'move';
    var itemRect = {
      width: item._width,
      height: item._height,
      left: dragData.elementClientX,
      top: dragData.elementClientY
    };
    var grid = getTargetGrid(item, rootGrid, itemRect, sortThreshold);
    var gridOffsetLeft = 0;
    var gridOffsetTop = 0;
    var matchScore = -1;
    var matchIndex;
    var hasValidTargets;
    var target;
    var score;
    var i;

    // Return early if we found no grid container element that overlaps the
    // dragged item enough.
    if (!grid) {
      return false;
    }

    // If item is moved within it's originating grid adjust item's left and top
    // props. Otherwise if item is moved to/within another grid get the
    // container element's offset (from the element's content edge).
    if (grid === rootGrid) {
      itemRect.left = dragData.gridX + item._margin.left;
      itemRect.top = dragData.gridY + item._margin.top;
    }
    else {
      gridOffsetLeft = grid._left + grid._border.left;
      gridOffsetTop = grid._top + grid._border.top;
    }

    // Loop through the target grid items and try to find the best match.
    for (i = 0; i < grid._items.length; i++) {

      target = grid._items[i];

      // If the target item is not active or the target item is the dragged item
      // let's skip to the next item.
      if (!target._isActive || target === item) {
        continue;
      }

      // Mark the grid as having valid target items.
      hasValidTargets = true;

      // Calculate the target's overlap score with the dragged item.
      score = getRectOverlapScore(itemRect, {
        width: target._width,
        height: target._height,
        left: target._left + target._margin.left + gridOffsetLeft,
        top: target._top + target._margin.top + gridOffsetTop
      });

      // Update best match index and score if the target's overlap score with
      // the dragged item is higher than the current best match score.
      if (score > matchScore) {
        matchIndex = i;
        matchScore = score;
      }

    }

    // If there is no valid match and the item is being moved into another grid.
    if (matchScore < sortThreshold && item.getGrid() !== grid) {
      matchIndex = hasValidTargets ? -1 : 0;
      matchScore = Infinity;
    }

    // Check if the best match overlaps enough to justify a placement switch.
    if (matchScore >= sortThreshold) {
      return {
        grid: grid,
        index: matchIndex,
        action: sortAction
      };
    }

    return false;

  };

  /**
   * ItemDrag - Public prototype methods
   * ***********************************
   */

  /**
   * Destroy instance.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.destroy = function () {

    var drag = this;

    if (!drag._isDestroyed) {
      drag.stop();
      drag._hammer.destroy();
      drag.getItem()._element.removeEventListener('dragstart', preventDefault, false);
      drag._isDestroyed = true;
    }

    return drag;

  };

  /**
   * Get Item instance.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @returns {?Item}
   */
  ItemDrag.prototype.getItem = function () {

    return itemInstances[this._itemId] || null;

  };

  /**
   * Get Grid instance.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @returns {?Grid}
   */
  ItemDrag.prototype.getGrid = function () {

    return gridInstances[this._gridId] || null;

  };

  /**
   * Setup/reset drag data.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.reset = function () {

    var drag = this;
    var dragData = drag._data;

    // Is item being dragged?
    dragData.isActive = false;

    // The dragged item's container element.
    dragData.container = null;

    // The dragged item's containing block.
    dragData.containingBlock = null;

    // Hammer event data.
    dragData.startEvent = null;
    dragData.currentEvent = null;

    // All the elements which need to be listened for scroll events during
    // dragging.
    dragData.scrollers = [];

    // The current translateX/translateY position.
    dragData.left = 0;
    dragData.top = 0;

    // Dragged element's current position within the grid.
    dragData.gridX = 0;
    dragData.gridY = 0;

    // Dragged element's current offset from window's northwest corner. Does
    // not account for element's margins.
    dragData.elementClientX = 0;
    dragData.elementClientY = 0;

    // Offset difference between the dragged element's temporary drag
    // container and it's original container.
    dragData.containerDiffX = 0;
    dragData.containerDiffY = 0;

    return drag;

  };

  /**
   * Bind drag scroll handlers to all scrollable ancestor elements of the
   * dragged element and the drag container element.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.bindScrollListeners = function () {

    var drag = this;
    var gridContainer = drag.getGrid()._element;
    var dragContainer = drag._data.container;
    var scrollers = getScrollParents(drag.getItem()._element);
    var i;

    // If drag container is defined and it's not the same element as grid
    // container then we need to add the grid container and it's scroll parents
    // to the elements which are going to be listener for scroll events.
    if (dragContainer !== gridContainer) {
      scrollers = arrayUnique(scrollers.concat(gridContainer).concat(getScrollParents(gridContainer)));
    }

    // Bind scroll listeners.
    for (i = 0; i < scrollers.length; i++) {
      scrollers[i].addEventListener('scroll', drag._scrollListener);
    }

    // Save scrollers to drag data.
    drag._data.scrollers = scrollers;

    return drag;

  };

  /**
   * Unbind currently bound drag scroll handlers from all scrollable ancestor
   * elements of the dragged element and the drag container element.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.unbindScrollListeners = function () {

    var drag = this;
    var dragData = drag._data;
    var scrollers = dragData.scrollers;
    var i;

    for (i = 0; i < scrollers.length; i++) {
      scrollers[i].removeEventListener('scroll', drag._scrollListener);
    }

    dragData.scrollers = [];

    return drag;

  };

  /**
   * Check (during drag) if an item is overlapping other items and based on
   * the configuration layout the items.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.checkOverlap = function () {

    var drag = this;
    var item = drag.getItem();
    var result = drag._sortPredicate(item, drag._data.currentEvent);
    var currentGrid;
    var currentIndex;
    var targetGrid;
    var targetIndex;
    var sortAction;
    var isMigration;

    // Let's make sure the result object has a valid index before going further.
    if (!isPlainObject(result) || typeof result.index !== typeNumber) {
      return drag;
    }

    currentGrid = item.getGrid();
    targetGrid = result.grid || currentGrid;
    isMigration = currentGrid !== targetGrid;
    currentIndex = currentGrid._items.indexOf(item);
    targetIndex = normalizeArrayIndex(targetGrid._items, result.index, isMigration);
    sortAction = result.action === 'swap' ? 'swap' : 'move';

    // If the item was moved within it's current grid.
    if (!isMigration) {

      // Make sure the target index is not the current index.
      if (currentIndex !== targetIndex) {

        // Do the sort.
        (sortAction === 'swap' ? arraySwap : arrayMove)(currentGrid._items, currentIndex, targetIndex);

        // Emit move event.
        currentGrid._emit(evMove, {
          item: item,
          fromIndex: currentIndex,
          toIndex: targetIndex,
          action: sortAction
        });

        // Layout the grid.
        currentGrid.layout();

      }

    }

    // If the item was moved to another grid.
    else {

      // Emit beforeSend event.
      currentGrid._emit(evBeforeSend, {
        item: item,
        fromGrid: currentGrid,
        fromIndex: currentIndex,
        toGrid: targetGrid,
        toIndex: targetIndex
      });

      // Emit beforeReceive event.
      targetGrid._emit(evBeforeReceive, {
        item: item,
        fromGrid: currentGrid,
        fromIndex: currentIndex,
        toGrid: targetGrid,
        toIndex: targetIndex
      });

      // Update item's grid id reference.
      item._gridId = targetGrid._id;

      // Update drag instances's migrating indicator.
      drag._isMigrating = item._gridId !== drag._gridId;

      // Move item instance from current grid to target grid.
      currentGrid._items.splice(currentIndex, 1);
      insertItemsToArray(targetGrid._items, item, targetIndex);

      // Set sort data as null, which is an indicator for the item comparison
      // function that the sort data of this specific item should be fetched
      // lazily.
      item._sortData = null;

      // Emit send event.
      currentGrid._emit(evSend, {
        item: item,
        fromGrid: currentGrid,
        fromIndex: currentIndex,
        toGrid: targetGrid,
        toIndex: targetIndex
      });

      // Emit receive event.
      targetGrid._emit(evReceive, {
        item: item,
        fromGrid: currentGrid,
        fromIndex: currentIndex,
        toGrid: targetGrid,
        toIndex: targetIndex
      });

      // Layout both grids.
      currentGrid.layout();
      targetGrid.layout();

    }

    return drag;

  };

  /**
   * If item is dragged into another grid, finish the migration process
   * gracefully.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.finishMigration = function () {

    var drag = this;
    var item = drag.getItem();
    var release = item._release;
    var element = item._element;
    var targetGrid = item.getGrid();
    var targetGridElement = targetGrid._element;
    var targetSettings = targetGrid._settings;
    var targetContainer = targetSettings.dragContainer || targetGridElement;
    var currentSettings = drag.getGrid()._settings;
    var currentContainer = element.parentNode;
    var translateX;
    var translateY;
    var offsetDiff;

    // Destroy current drag. Note that we need to set the migrating flag to
    // false first, because otherwise we create an infinite loop between this
    // and the drag.stop() method.
    drag._isMigrating = false;
    drag.destroy();

    // Destroy current animation handlers.
    item._animate.destroy();
    item._animateChild.destroy();

    // Remove current classnames.
    removeClass(element, currentSettings.itemClass);
    removeClass(element, currentSettings.itemVisibleClass);
    removeClass(element, currentSettings.itemHiddenClass);

    // Add new classnames.
    addClass(element, targetSettings.itemClass);
    addClass(element, targetSettings.itemVisibleClass);

    // Instantiate new animation controllers.
    item._animate = new Grid.ItemAnimate(item, element);
    item._animateChild = new Grid.ItemAnimate(item, item._child);

    // Move the item inside the target container if it's different than the
    // current container.
    if (targetContainer !== currentContainer) {
      targetContainer.appendChild(element);
      offsetDiff = getOffsetDiff(currentContainer, targetContainer, true);
      translateX = getTranslateAsFloat(element, 'x') - offsetDiff.left;
      translateY = getTranslateAsFloat(element, 'y') - offsetDiff.top;
    }

    // Update item's cached dimensions and sort data.
    item._refreshDimensions()._refreshSortData();

    // Calculate the offset difference between target's drag container (if any)
    // and actual grid container element. We save it later for the release
    // process.
    offsetDiff = getOffsetDiff(targetContainer, targetGridElement, true);
    release.containerDiffX = offsetDiff.left;
    release.containerDiffY = offsetDiff.top;

    // Recreate item's drag handler.
    item._drag = targetSettings.dragEnabled ? new Grid.ItemDrag(item) : null;

    // Adjust the position of the item element if it was moved from a container
    // to another.
    if (targetContainer !== currentContainer) {
      setStyles(element, {transform: getTranslateString(translateX, translateY)});
    }

    // Update child element's styles to reflect the current visibility state.
    item._child.removeAttribute('style');
    targetGrid._itemShowHandler.start(item, true);

    // Start the release.
    release.start();

    return drag;

  };

  /**
   * cancel move/scroll event raf loop action.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.cancelRafLoop = function () {

    var id = this.getItem()._id;

    rafLoop.cancel(rafQueueScroll, id);
    rafLoop.cancel(rafQueueMove, id);

    return this;

  };

  /**
   * Abort dragging and reset drag data.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.stop = function () {

    var drag = this;
    var dragData = drag._data;
    var item = drag.getItem();
    var element = item._element;
    var grid = drag.getGrid();

    if (!dragData.isActive) {
      return drag;
    }

    // If the item is being dropped into another grid, finish it up and return
    // immediately.
    if (drag._isMigrating) {
      return drag.finishMigration(dragData.currentEvent);
    }

    // Cancel raf loop actions.
    drag.cancelRafLoop();

    // Remove scroll listeners.
    drag.unbindScrollListeners();

    // Cancel overlap check.
    drag._checkSortOverlap('cancel');

    // Append item element to the container if it's not it's child. Also make
    // sure the translate values are adjusted to account for the DOM shift.
    if (element.parentNode !== grid._element) {
      grid._element.appendChild(element);
      setStyles(element, {transform: getTranslateString(dragData.gridX, dragData.gridY)});
    }

    // Remove dragging class.
    removeClass(element, grid._settings.itemDraggingClass);

    // Reset drag data.
    drag.reset();

    return drag;

  };

  /**
   * Drag start handler.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @param {Object} event
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.onStart = function (event) {

    var drag = this;
    var item = drag.getItem();

    // If item is not active, don't start the drag.
    if (!item._isActive) {
      return drag;
    }

    var element = item._element;
    var grid = drag.getGrid();
    var settings = grid._settings;
    var dragData = drag._data;
    var release = item._release;
    var migrate = item._migrate;
    var gridContainer = grid._element;
    var dragContainer = settings.dragContainer || gridContainer;
    var containingBlock = getContainingBlock(dragContainer, true);
    var offsetDiff = dragContainer !== gridContainer ? getOffsetDiff(containingBlock, gridContainer) : 0;
    var currentLeft = getTranslateAsFloat(element, 'x');
    var currentTop = getTranslateAsFloat(element, 'y');
    var elementRect = element.getBoundingClientRect();

    // Stop current positioning animation.
    if (item.isPositioning()) {
      item._stopLayout(true, {transform: getTranslateString(currentLeft, currentTop)});
    }

    // Stop current migration animation.
    if (migrate.isActive) {
      currentLeft -= migrate.containerDiffX;
      currentTop -= migrate.containerDiffY;
      migrate.stop(true, {transform: getTranslateString(currentLeft, currentTop)});
    }

    // If item is being released reset release data.
    if (item.isReleasing()) {
      release.reset();
    }

    // Setup drag data.
    dragData.isActive = true;
    dragData.startEvent = dragData.currentEvent = event;
    dragData.container = dragContainer;
    dragData.containingBlock = containingBlock;
    dragData.elementClientX = elementRect.left;
    dragData.elementClientY = elementRect.top;
    dragData.left = dragData.gridX = currentLeft;
    dragData.top = dragData.gridY = currentTop;

    // Emit dragInit event.
    grid._emit(evDragInit, item, event);

    // If a specific drag container is set and it is different from the
    // grid's container element we need to cast some extra spells.
    if (dragContainer !== gridContainer) {

      // Store the container offset diffs to drag data.
      dragData.containerDiffX = offsetDiff.left;
      dragData.containerDiffY = offsetDiff.top;

      // If the dragged element is a child of the drag container all we need to
      // do is setup the relative drag position data.
      if (element.parentNode === dragContainer) {
        dragData.gridX = currentLeft - dragData.containerDiffX;
        dragData.gridY = currentTop - dragData.containerDiffY;
      }

      // Otherwise we need to append the element inside the correct container,
      // setup the actual drag position data and adjust the element's translate
      // values to account for the DOM position shift.
      else {
        dragData.left = currentLeft + dragData.containerDiffX;
        dragData.top = currentTop + dragData.containerDiffY;
        dragContainer.appendChild(element);
        setStyles(element, {transform: getTranslateString(dragData.left, dragData.top)});
      }

    }

    // Set drag class and bind scrollers.
    addClass(element, settings.itemDraggingClass);
    drag.bindScrollListeners();

    // Emit dragStart event.
    grid._emit(evDragStart, item, event);

    return drag;

  };

  /**
   * Drag move handler.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @param {Object} event
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.onMove = function (event) {

    var drag = this;
    var item = drag.getItem();

    // If item is not active, reset drag.
    if (!item._isActive) {
      return drag.stop();
    }

    var element = item._element;
    var grid = drag.getGrid();
    var settings = grid._settings;
    var dragData = drag._data;
    var axis = settings.dragAxis;
    var xDiff = event.deltaX - dragData.currentEvent.deltaX;
    var yDiff = event.deltaY - dragData.currentEvent.deltaY;

    rafLoop.add(rafQueueMove, item._id, function () {

      // Update current event.
      dragData.currentEvent = event;

      // Update horizontal position data.
      if (axis !== 'y') {
        dragData.left += xDiff;
        dragData.gridX += xDiff;
        dragData.elementClientX += xDiff;
      }

      // Update vertical position data.
      if (axis !== 'x') {
        dragData.top += yDiff;
        dragData.gridY += yDiff;
        dragData.elementClientY += yDiff;
      }

      // Overlap handling.
      settings.dragSort && drag._checkSortOverlap();

    }, function () {

      // Update element's translateX/Y values.
      setStyles(element, {transform: getTranslateString(dragData.left, dragData.top)});

      // Emit dragMove event.
      grid._emit(evDragMove, item, event);

    });

    return drag;

  };

  /**
   * Drag scroll handler.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @param {Object} event
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.onScroll = function (event) {

    var drag = this;
    var item = drag.getItem();
    var element = item._element;
    var grid = drag.getGrid();
    var settings = grid._settings;
    var axis = settings.dragAxis;
    var dragData = drag._data;
    var gridContainer = grid._element;
    var elementRect;
    var xDiff;
    var yDiff;
    var offsetDiff;

    rafLoop.add(rafQueueScroll, item._id, function () {

      // Calculate element's rect and x/y diff.
      elementRect = element.getBoundingClientRect();
      xDiff = dragData.elementClientX - elementRect.left;
      yDiff = dragData.elementClientY - elementRect.top;

      // Update container diff.
      if (dragData.container !== gridContainer) {
        offsetDiff = getOffsetDiff(dragData.containingBlock, gridContainer);
        dragData.containerDiffX = offsetDiff.left;
        dragData.containerDiffY = offsetDiff.top;
      }

      // Update horizontal position data.
      if (axis !== 'y') {
        dragData.left += xDiff;
        dragData.gridX = dragData.left - dragData.containerDiffX;
      }

      // Update vertical position data.
      if (axis !== 'x') {
        dragData.top += yDiff;
        dragData.gridY = dragData.top - dragData.containerDiffY;
      }

      // Overlap handling.
      settings.dragSort && drag._checkSortOverlap();

    }, function () {

      // Update element's translateX/Y values.
      setStyles(element, {transform: getTranslateString(dragData.left, dragData.top)});

      // Emit dragScroll event.
      grid._emit(evDragScroll, item, event);

    });

    return drag;

  };

  /**
   * Drag end handler.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @param {Object} event
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.onEnd = function (event) {

    var drag = this;
    var item = drag.getItem();
    var element = item._element;
    var grid = drag.getGrid();
    var settings = grid._settings;
    var dragData = drag._data;
    var release = item._release;

    // If item is not active, reset drag.
    if (!item._isActive) {
      return drag.stop();
    }

    // Cancel raf loop actions.
    drag.cancelRafLoop();

    // Finish currently queued overlap check.
    settings.dragSort && drag._checkSortOverlap('finish');

    // Remove scroll listeners.
    drag.unbindScrollListeners();

    // Setup release data.
    release.containerDiffX = dragData.containerDiffX;
    release.containerDiffY = dragData.containerDiffY;

    // Reset drag data.
    drag.reset();

    // Remove drag classname from element.
    removeClass(element, settings.itemDraggingClass);

    // Emit dragEnd event.
    grid._emit(evDragEnd, item, event);

    // Finish up the migration process or start the release process.
    drag._isMigrating ? drag.finishMigration() : release.start();

    return drag;

  };

  /**
   * Helpers - Generic
   * *****************
   */

  /**
   * Normalize array index. Basically this function makes sure that the provided
   * array index is within the bounds of the provided array and also transforms
   * negative index to the matching positive index.
   *
   * @private
   * @param {Array} array
   * @param {Number} index
   * @param {Boolean} isMigration
   */
  function normalizeArrayIndex(array, index, isMigration) {

    var length = array.length;
    var maxIndex = Math.max(0, isMigration ? length : length - 1);

    return index > maxIndex ? maxIndex :
      index < 0 ? Math.max(maxIndex + index + 1, 0) :
      index;

  }

  /**
   * Swap array items.
   *
   * @private
   * @param {Array} array
   * @param {Number} index
   *   - Index (positive or negative) of the item that will be swapped.
   * @param {Number} withIndex
   *   - Index (positive or negative) of the other item that will be swapped.
   */
  function arraySwap(array, index, withIndex) {

    // Make sure the array has two or more items.
    if (array.length < 2) {
      return;
    }

    // Normalize the indices.
    var indexA = normalizeArrayIndex(array, index);
    var indexB = normalizeArrayIndex(array, withIndex);
    var temp;

    // Swap the items.
    if (indexA !== indexB) {
      temp = array[indexA];
      array[indexA] = array[indexB];
      array[indexB] = temp;
    }

  }

  /**
   * Move array item to another index.
   *
   * @private
   * @param {Array} array
   * @param {Number} fromIndex
   *   - Index (positive or negative) of the item that will be moved.
   * @param {Number} toIndex
   *   - Index (positive or negative) where the item should be moved to.
   */
  function arrayMove(array, fromIndex, toIndex) {

    // Make sure the array has two or more items.
    if (array.length < 2) {
      return;
    }

    // Normalize the indices.
    var from = normalizeArrayIndex(array, fromIndex);
    var to = normalizeArrayIndex(array, toIndex);

    // Add target item to the new position.
    if (from !== to) {
      array.splice(to, 0, array.splice(from, 1)[0]);
    }

  }

  /**
   * Returns a new duplicate free version of the provided array.
   *
   * @private
   * @param {Array} array
   * @returns {Array}
   */
  function arrayUnique(array) {

    var ret = [];
    var len = array.length;
    var i;

    if (len) {
      ret[0] = array[0];
      for (i = 1; i < len; i++) {
        if (ret.indexOf(array[i]) < 0) {
          ret.push(array[i]);
        }
      }
    }

    return ret;

  }

  /**
   * Check if a value is a plain object.
   *
   * @private
   * @param {*} val
   * @returns {Boolean}
   */
  function isPlainObject(val) {

    return typeof val === 'object' && Object.prototype.toString.call(val) === '[object Object]';

  }

  /**
   * Check if a value is a node list
   *
   * @private
   * @param {*} val
   * @returns {Boolean}
   */
  function isNodeList(val) {

    var type = Object.prototype.toString.call(val);
    return type === '[object HTMLCollection]' || type === '[object NodeList]';

  }

  /**
   * Merge two objects recursively (deep merge). The source object's properties
   * are merged to the target object.
   *
   * @private
   * @param {Object} target
   *   - The target object.
   * @param {Object} source
   *   - The source object.
   * @returns {Object} Returns the target object.
   */
  function mergeObjects(target, source) {

    // Loop through the surce object's props.
    Object.keys(source).forEach(function (propName) {

      var isObject = isPlainObject(source[propName]);

      // If target and source values are both objects, merge the objects and
      // assign the merged value to the target property.
      if (isPlainObject(target[propName]) && isObject) {
        target[propName] = mergeObjects({}, target[propName]);
        target[propName] = mergeObjects(target[propName], source[propName]);
      }

      // Otherwise set the source object's value to target object and make sure
      // that object and array values are cloned and directly assigned.
      else {
        target[propName] = isObject ? mergeObjects({}, source[propName]) :
          Array.isArray(source[propName]) ? source[propName].concat() :
          source[propName];
      }

    });

    return target;

  }

  /**
   * Insert an item or an array of items to array to a specified index. Mutates
   * the array. The index can be negative in which case the items will be added
   * to the end of the array.
   *
   * @private
   * @param {Array} array
   * @param {*} items
   * @param {Number} [index=-1]
   */
  function insertItemsToArray(array, items, index) {

    var targetIndex = typeof index === typeNumber ? index : -1;
    array.splice.apply(array, [targetIndex < 0 ? array.length - targetIndex + 1 : targetIndex, 0].concat(items));

  }

  /**
   * Returns a function, that, as long as it continues to be invoked, will not
   * be triggered. The function will be called after it stops being called for
   * N milliseconds. The returned function accepts one argument which, when
   * being "finish", calls the debounced function immediately if it is currently
   * waiting to be called, and when being "cancel" cancels the currently queued
   * function call.
   *
   * @private
   * @param {Function} fn
   * @param {Number} wait
   * @returns {Function}
   */
  function debounce(fn, wait) {

    var timeout;
    var actionCancel = 'cancel';
    var actionFinish = 'finish';

    return wait > 0 ? function (action) {

      if (timeout !== undefined) {
        timeout = global.clearTimeout(timeout);
        if (action === actionFinish) {
          fn();
        }
      }

      if (action !== actionCancel && action !== actionFinish) {
        timeout = global.setTimeout(function () {
          timeout = undefined;
          fn();
        }, wait);
      }

    } : function (action) {

      if (action !== actionCancel) {
        fn();
      }

    };

  }

  /**
   * Returns a raf loop queue system that allows pushing callbacks to either
   * the read queue or the write queue.
   *
   * @private
   * @returns {Object}
   */
  function createRafLoop() {

    var nextTick = null;
    var queue = [];
    var map = {};
    var raf = (global.requestAnimationFrame
      || global.webkitRequestAnimationFrame
      || global.mozRequestAnimationFrame
      || global.msRequestAnimationFrame
      || function (cb) {
        return global.setTimeout(cb, 16);
      }
    ).bind(global);

    function add(type, id, readCallback, writeCallback) {

      // First, let's check if an item has been added to the queues with the
      // same id and remove it.
      var currentIndex = queue.indexOf(type + id);
      if (currentIndex > -1) {
        queue.splice(currentIndex, 1);
      }

      // Add all move/scroll event callbacks to the beginning of the queue
      // and other callbacks to the end of the queue.
      type === rafQueueMove || type === rafQueueScroll ? queue.unshift(type + id) : queue.push(type + id);
      map[type + id] = [readCallback, writeCallback];

      // Finally, let's kickstart the next tick if it is not running yet.
      !nextTick && (nextTick = raf(flush));

    }

    function cancel(type, id) {

      // Let's check if an item has been added to the queue with the id and
      // if so -> remove it.
      var currentIndex = queue.indexOf(type + id);
      if (currentIndex > -1) {
        queue.splice(currentIndex, 1);
        map[type + id] = undefined;
      }

    }

    function flush() {

      var maxBatchSize = +Grid._maxRafBatchSize || 100;
      var batch = queue.splice(0, Math.min(maxBatchSize, queue.length));
      var batchMap = {};
      var i;

      // Reset ticker.
      nextTick = null;

      // Create batch map and clear map items.
      for (i = 0; i < batch.length; i++) {
        batchMap[batch[i]] = map[batch[i]];
        map[batch[i]] = undefined;
      }

      // Process read callbacks.
      for (i = 0; i < batch.length; i++) {
        batchMap[batch[i]][0]();
      }

      // Process write callbacks.
      for (i = 0; i < batch.length; i++) {
        batchMap[batch[i]][1]();
      }

      // Restart the ticker if needed.
      if (!nextTick && queue.length) {
        nextTick = raf(flush);
      }

    }

    return {
      add: add,
      cancel: cancel
    };

  }

  /**
   * Helpers - DOM utils
   * *******************
   */

  /**
   * Transforms a camel case style property to kebab case style property.
   *
   * @private
   * @param {String} string
   * @returns {String}
   */
  function getStyleName(string) {

    return string.replace(/([A-Z])/g, '-$1').toLowerCase();

  }

  /**
   * Returns the computed value of an element's style property as a string.
   *
   * @private
   * @param {HTMLElement} element
   * @param {String} style
   * @returns {String}
   */
  function getStyle(element, style) {

    return global.getComputedStyle(element, null).getPropertyValue(style === 'transform' ? transform.styleName || style : style);

  }

  /**
   * Returns the computed value of an element's style property transformed into
   * a float value.
   *
   * @private
   * @param {HTMLElement} el
   * @param {String} style
   * @returns {Number}
   */
  function getStyleAsFloat(el, style) {

    return parseFloat(getStyle(el, style)) || 0;

  }

  /**
   * Returns the element's computed translateX/Y value as a float. Assumes that
   * the translate value is defined as pixels.
   *
   * @private
   * @param {HTMLElement} element
   * @param {String} axis
   *   - "x" or "y".
   * @returns {Number}
   */
  function getTranslateAsFloat(element, axis) {

    return parseFloat((getStyle(element, 'transform') || '').replace('matrix(', '').split(',')[axis === 'x' ? 4 : 5]) || 0;

  }

  /**
   * Transform translateX and translateY value into CSS transform style
   * property's value.
   *
   * @private
   * @param {Number} translateX
   * @param {Number} translateY
   * @returns {String}
   */
  function getTranslateString(translateX, translateY) {

    return 'translateX(' + translateX + 'px) translateY(' + translateY + 'px)';

  }

  /**
   * Get current values of the provided styles definition object.
   *
   * @private
   * @param {HTMLElement} element
   * @param {Object} styles
   * @return {Object}
   */
  function getCurrentStyles(element, styles) {

    var current = {};
    var keys = Object.keys(styles);
    var i;

    for (i = 0; i < keys.length; i++) {
      current[keys[i]] = getStyle(element, getStyleName(keys[i]));
    }

    return current;

  }

  /**
   * Set inline styles to an element.
   *
   * @private
   * @param {HTMLElement} element
   * @param {Object} styles
   */
  function setStyles(element, styles) {

    var props = Object.keys(styles);
    var i;

    for (i = 0; i < props.length; i++) {
      element.style[props[i] === 'transform' && transform ? transform.propName : props[i]] = styles[props[i]];
    }

  }

  /**
   * Add class to an element.
   *
   * @private
   * @param {HTMLElement} element
   * @param {String} className
   */
  function addClass(element, className) {

    if (element.classList) {
      element.classList.add(className);
    }
    else if (!elementMatches(element, '.' + className)) {
      element.className += ' ' + className;
    }

  }

  /**
   * Remove class name from an element.
   *
   * @private
   * @param {HTMLElement} element
   * @param {String} className
   */
  function removeClass(element, className) {

    if (element.classList) {
      element.classList.remove(className);
    }
    else if (elementMatches(element, '.' + className)) {
      element.className = (' ' + element.className + ' ').replace(' ' + className + ' ', ' ').trim();
    }

  }

  /**
   * Convert nodeList to array.
   *
   * @private
   * @param {NodeList} nodeList
   * @returns {HTMLElement[]}
   */
  function nodeListToArray(nodeList) {

    return [].slice.call(nodeList);

  }

  /**
   * Checks the supported element.matches() method and returns a function that
   * can be used to call the supported method.
   *
   * @private
   * @returns {Function}
   */
  function getSupportedElementMatches() {

    var p = Element.prototype;
    var fn = p.matches || p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector;

    return function (el, selector) {
      return fn.call(el, selector);
    };

  }

  /**
   * Returns the supported style property's prefix, property name and style name
   * or null if the style property is not supported. This is used for getting
   * the supported transform.
   *
   * @private
   * @param {String} style
   * @returns {?Object}
   */
  function getSupportedStyle(style) {

    var styleCap = style.charAt(0).toUpperCase() + style.slice(1);
    var prefixes = ['', 'Webkit', 'Moz', 'O', 'ms'];
    var prefix;
    var propName;
    var i;

    for (i = 0; i < prefixes.length; i++) {
      prefix = prefixes[i];
      propName = prefix ? prefix + styleCap : style;
      if (docElem.style[propName] !== undefined) {
        prefix = prefix.toLowerCase();
        return {
          prefix: prefix,
          propName: propName,
          styleName: prefix ? '-' + prefix + '-' + style : style
        };
      }
    }

    return null;

  }

  /**
   * Calculate the offset difference two elements.
   *
   * @private
   * @param {HTMLElement} elemA
   * @param {HTMLElement} elemB
   * @param {Boolean} [compareContainingBlocks=false]
   *   - When this is set to true the containing blocks of the provided elements
   *     will be used for calculating the difference. Otherwise the provided
   *     elements will be compared directly.
   * @returns {Object}
   */
  function getOffsetDiff(elemA, elemB, compareContainingBlocks) {

    if (elemA === elemB) {
      return {
        left: 0,
        top: 0
      };
    }

    if (compareContainingBlocks) {
      elemA = getContainingBlock(elemA, true);
      elemB = getContainingBlock(elemB, true);
    }

    var aOffset = getOffset(elemA, true);
    var bOffset = getOffset(elemB, true);

    return {
      left: bOffset.left - aOffset.left,
      top: bOffset.top - aOffset.top
    };

  }

  /**
   * Returns the element's document offset, which in practice means the vertical
   * and horizontal distance between the element's northwest corner and the
   * document's northwest corner.
   *
   * @private
   * @param {(Document|Element|Window)} element
   * @param {Boolean} [excludeElementBorders=false]
   * @returns {Offset}
   */
  function getOffset(element, excludeElementBorders) {

    var rect;
    var ret = {
      left: 0,
      top: 0
    };

    // Document's offsets are always 0.
    if (element === doc) {
      return ret;
    }

    // Add viewport's scroll left/top to the respective offsets.
    ret.left = global.pageXOffset || 0;
    ret.top = global.pageYOffset || 0;

    // Window's offsets are the viewport's scroll left/top values.
    if (element.self === global.self) {
      return ret;
    }

    // Add element's client rects to the offsets.
    rect = element.getBoundingClientRect();
    ret.left += rect.left;
    ret.top += rect.top;

    // Exclude element's borders from the offset if needed.
    if (excludeElementBorders) {
      ret.left += getStyleAsFloat(element, 'border-left-width');
      ret.top += getStyleAsFloat(element, 'border-top-width');
    }

    return ret;

  }

  /**
   * Returns an aabsolute positioned element's containing block, which is
   * considered to be the closest ancestor element that the target element's
   * positioning is relative to. Disclaimer: this only works as intended for
   * abolute positioned elements.
   *
   * @private
   * @param {HTMLElement} element
   * @param {Boolean} [isParent=false]
   *   - When this is set to true the containing block checking is started from
   *     the provided element. Otherwise the checking is started from the
   *     provided element's parent element.
   * @returns {(Document|Element)}
   */
  function getContainingBlock(element, isParent) {

    // As long as the containing block is an element, static and not
    // transformed, try to get the element's parent element and fallback to
    // document. https://github.com/niklasramo/mezr/blob/0.6.1/mezr.js#L339
    var ret = (isParent ? element : element.parentElement) || doc;
    while (ret && ret !== doc && getStyle(ret, 'position') === 'static' && !isTransformed(ret)) {
      ret = ret.parentElement || doc;
    }

    return ret;

  }

  /**
   * Get element's scroll parents.
   *
   * Borrowed from jQuery UI library (and heavily modified):
   * https://github.com/jquery/jquery-ui/blob/63448148a217da7e64c04b21a04982f0d6
   * 4aabaa/ui/scroll-parent.js
   *
   * @private
   * @param {HTMLElement} element
   * @returns {HTMLElement[]}
   */
  function getScrollParents(element) {

    var ret = [];
    var overflowRegex = /(auto|scroll)/;
    var parent = element.parentNode;

    // If transformed elements leak fixed elements.
    if (transformLeaksFixed) {

      // If the element is fixed it can not have any scroll parents.
      if (getStyle(element, 'position') === 'fixed') {
        return ret;
      }

      // Find scroll parents.
      while (parent && parent !== doc && parent !== docElem) {
        if (overflowRegex.test(getStyle(parent, 'overflow') + getStyle(parent, 'overflow-y') + getStyle(parent, 'overflow-x'))) {
          ret.push(parent);
        }
        parent = getStyle(parent, 'position') === 'fixed' ? null : parent.parentNode;
      }

      // If parent is not fixed element, add window object as the last scroll
      // parent.
      parent !== null && ret.push(global);

    }
    // If fixed elements behave as defined in the W3C specification.
    else {

      // Find scroll parents.
      while (parent && parent !== doc) {

        // If the currently looped element is fixed ignore all parents that are
        // not transformed.
        if (getStyle(element, 'position') === 'fixed' && !isTransformed(parent)) {
          parent = parent.parentNode;
          continue;
        }

        // Add the parent element to return items if it is scrollable.
        if (overflowRegex.test(getStyle(parent, 'overflow') + getStyle(parent, 'overflow-y') + getStyle(parent, 'overflow-x'))) {
          ret.push(parent);
        }

        // Update element and parent references.
        element = parent;
        parent = parent.parentNode;

      }

      // If the last item is the root element, replace it with the global
      // object (window). The root element scroll is propagated to the window.
      if (ret[ret.length - 1] === docElem) {
        ret[ret.length - 1] = global;
      }

      // Otherwise add global object (window) as the last scroll parent.
      else {
        ret.push(global);
      }

    }

    return ret;

  }

  /**
   * Detects if transformed elements leak fixed elements. According W3C
   * transform rendering spec a transformed element should contain even fixed
   * elements. Meaning that fixed elements are positioned relative to the
   * closest transformed ancestor element instead of window. However, not every
   * browser follows the spec (IE and older Firefox). So we need to test it.
   * https://www.w3.org/TR/css3-2d-transforms/#transform-rendering
   *
   * Borrowed from Mezr (v0.6.1):
   * https://github.com/niklasramo/mezr/blob/0.6.1/mezr.js#L607
   *
   * @private
   * @returns {Boolean}
   *   - Returns true if transformed elements leak fixed elements, false
   *     otherwise.
   */
  function doesTransformLeakFixed() {

    if (!transform) {
      return true;
    }

    var elems = [0, 1].map(function (elem, isInner) {
      elem = doc.createElement('div');
      setStyles(elem, {
        position: isInner ? 'fixed' : 'absolute',
        display: 'block',
        visibility: 'hidden',
        left: isInner ? '0px' : '1px',
        transform: 'none'
      });
      return elem;
    });
    var outer = body.appendChild(elems[0]);
    var inner = outer.appendChild(elems[1]);
    var left = inner.getBoundingClientRect().left;
    setStyles(outer, {transform: 'scale(1)'});
    var isLeaking = left === inner.getBoundingClientRect().left;
    body.removeChild(outer);

    return isLeaking;

  }

  /**
   * Returns true if element is transformed, false if not. In practice the
   * element's display value must be anything else than "none" or "inline" as
   * well as have a valid transform value applied in order to be counted as a
   * transformed element.
   *
   * Borrowed from Mezr (v0.6.1):
   * https://github.com/niklasramo/mezr/blob/0.6.1/mezr.js#L661
   *
   * @private
   * @param {HTMLElement} element
   * @returns {Boolean}
   */
  function isTransformed(element) {

    var transform = getStyle(element, 'transform');
    var display = getStyle(element, 'display');

    return transform !== 'none' && display !== 'inline' && display !== 'none';

  }

  /**
   * Calculate how many percent the intersection area of two rectangles is from
   * the maximum potential intersection area between the rectangles.
   *
   * @private
   * @param {Rectangle} a
   * @param {Rectangle} b
   * @returns {Number}
   *   - A number between 0-100.
   */
  function getRectOverlapScore(a, b) {

    // Return 0 immediately if the rectangles do not overlap.
    if (!muuriLayout.doRectsOverlap(a, b)) {
      return 0;
    }

    // Calculate intersection area's width, height, max height and max width.
    var width = Math.min(a.left + a.width, b.left + b.width) - Math.max(a.left, b.left);
    var height = Math.min(a.top + a.height, b.top + b.height) - Math.max(a.top, b.top);
    var maxWidth = Math.min(a.width, b.width);
    var maxHeight = Math.min(a.height, b.height);

    return (width * height) / (maxWidth * maxHeight) * 100;

  }

  /**
   * Helpers - Item sort utilities
   * *****************************
   */

  /**
   * Helper for the sort method to generate mapped version of the items array
   * than contains reference to the item indices.
   *
   * @private
   * @param {Item[]} items
   * @returns {Object}
   */
  function getItemIndexMap(items) {

    var ret = {};
    var i;

    for (i = 0; i < items.length; i++) {
      ret[items[i]._id] = i;
    }

    return ret;

  }

  /**
   * Helper for the sort method to compare the indices of the items to enforce
   * stable sort.
   *
   * @private
   * @param {Item} itemA
   * @param {Item} itemB
   * @param {Boolean} isDescending
   * @param {Object} indexMap
   * @returns {Number}
   */
  function compareItemIndices(itemA, itemB, isDescending, indexMap) {

    var indexA = indexMap[itemA._id];
    var indexB = indexMap[itemB._id];
    return isDescending ? indexB - indexA : indexA - indexB;

  }

  /**
   * Helper for the sort method to compare the items based on the provided
   * attributes.
   *
   * @private
   * @param {Item} itemA
   * @param {Item} itemB
   * @param {Boolean} isDescending
   * @param {Object} criterias
   * @returns {Number}
   */
  function compareItems(itemA, itemB, isDescending, criterias) {

    var ret = 0;
    var criteriaName;
    var criteriaOrder;
    var valA;
    var valB;
    var i;

    // Loop through the list of sort criterias.
    for (i = 0; i < criterias.length; i++) {

      // Get the criteria name, which should match an item's sort data key.
      criteriaName = criterias[i][0];
      criteriaOrder = criterias[i][1];

      // Get items' cached sort values for the criteria. If the item has no sort
      // data let's update the items sort data (this is a lazy load mechanism).
      valA = (itemA._sortData ? itemA : itemA._refreshSortData())._sortData[criteriaName];
      valB = (itemB._sortData ? itemB : itemB._refreshSortData())._sortData[criteriaName];

      // Sort the items in descending order if defined so explicitly.
      if (criteriaOrder === 'desc' || (!criteriaOrder && isDescending)) {
        ret = valB < valA ? -1 : valB > valA ? 1 : 0;
      }

      // Otherwise sort items in ascending order.
      else {
        ret = valA < valB ? -1 : valA > valB ? 1 : 0;
      }

      // If we have -1 or 1 as the return value, let's return it immediately.
      if (ret !== 0) {
        return ret;
      }

    }

    return ret;

  }

  /**
   * Reorder an array of items based on another array of items.
   *
   * @private
   * @param {Item[]} items
   * @param {Item[]} refItems
   * @returns {Item[]}
   */
  function sortItemsByReference(items, refItems) {

    var newItems = [];
    var currentItems = items.concat();
    var item;
    var currentIndex;
    var i;

    for (i = 0; i < refItems.length; i++) {
      item = refItems[i];
      currentIndex = currentItems.indexOf(item);
      if (currentIndex > -1) {
        newItems.push(item);
        currentItems.splice(currentIndex, 1);
      }
    }

    items.splice.apply(items, [0, items.length].concat(newItems).concat(currentItems));

    return items;

  }

  /**
   * Check if a point (coordinate) is within a rectangle.
   *
   * @private
   * @param {Number} x
   * @param {Number} y
   * @param {Rectangle} rect
   * @return {Boolean}
   */
  function isPointWithinRect(x, y, rect) {

    return rect.width
      && rect.height
      && x >= rect.left
      && x < (rect.left + rect.width)
      && y >= rect.top
      && y < (rect.top + rect.height);

  }

  /**
   * Helpers - Muuri
   * ***************
   */

  /**
   * Show or hide Grid instance's items.
   *
   * @private
   * @param {Grid} inst
   * @param {String} method
   *   - "show" or "hide".
   * @param {(GridMultiItemQuery|GridItemState)} items
   * @param {Object} [options]
   * @param {Boolean} [options.instant=false]
   * @param {(ShowCallback|HideCallback)} [options.onFinish]
   * @param {(Boolean|LayoutCallback|String)} [options.layout=true]
   * @returns {Grid}
   */
  function gridShowHideHandler(inst, method, items, options) {

    var targetItems = inst.getItems(items);
    var opts = options || {};
    var isInstant = opts.instant === true;
    var callback = opts.onFinish;
    var layout = opts.layout ? opts.layout : opts.layout === undefined;
    var counter = targetItems.length;
    var isShow = method === 'show';
    var startEvent = isShow ? evShowStart : evHideStart;
    var endEvent = isShow ? evShowEnd : evHideEnd;
    var needsLayout = false;
    var completedItems = [];
    var hiddenItems = [];
    var item;
    var i;

    // If there are no items call the callback, but don't emit any events.
    if (!counter) {
      if (typeof callback === typeFunction) {
        callback(targetItems);
      }
    }

    // Otherwise if we have some items let's dig in.
    else {

      // Emit showStart/hideStart event.
      inst._emit(startEvent, targetItems.concat());

      // Show/hide items.
      for (i = 0; i < targetItems.length; i++) {

        item = targetItems[i];

        // If inactive item is shown or active item is hidden we need to do
        // layout.
        if ((isShow && !item._isActive) || (!isShow && item._isActive)) {
          needsLayout = true;
        }

        // If inactive item is shown we also need to do some special hackery to
        // make the item not animate it's next positioning (layout).
        if (isShow && !item._isActive) {
          item._skipNextLayoutAnimation = true;
        }

        // If the a hidden item is being shown we need to refresh the item's
        // dimensions.
        isShow && item._isHidden && hiddenItems.push(item);

        // Show/hide the item.
        item['_' + method](isInstant, function (interrupted, item) {

          // If the current item's animation was not interrupted add it to the
          // completedItems array.
          if (!interrupted) {
            completedItems.push(item);
          }

          // If all items have finished their animations call the callback
          // and emit showEnd/hideEnd event.
          if (--counter < 1) {
            if (typeof callback === typeFunction) {
              callback(completedItems.concat());
            }
            inst._emit(endEvent, completedItems.concat());
          }

        });

      }

      // Refresh hidden items.
      hiddenItems.length && inst.refreshItems(hiddenItems);

      // Layout if needed.
      if (needsLayout && layout) {
        inst.layout(layout === 'instant', typeof layout === typeFunction ? layout : undefined);
      }

    }

    return inst;

  }

  /**
   * Returns an object which contains start and stop methods for item's
   * show/hide process.
   *
   * @param {String} type
   * @param {Object} settings
   * @returns {Object}
   */
  function getItemVisibilityHandler(type, settings) {

    var isShow = type === 'show';
    var duration = parseInt(isShow ? settings.showDuration : settings.hideDuration) || 0;
    var easing = (isShow ? settings.showEasing : settings.hideEasing) || 'ease';
    var styles = isShow ? settings.visibleStyles : settings.hiddenStyles;
    var isEnabled = duration > 0;
    var currentStyles;

    styles = isPlainObject(styles) ? styles : null;

    return {
      start: function (item, instant, onFinish) {
        if (!styles) {
          onFinish && onFinish();
        }
        else {
          rafLoop.cancel(rafQueueVisibility, item._id);
          if (!isEnabled || instant) {
            if (item._animateChild.isAnimating()) {
              item._animateChild.stop(styles);
            }
            else {
              setStyles(item._child, styles);
            }
            onFinish && onFinish();
          }
          else {
            rafLoop.add(rafQueueVisibility, item._id, function () {
              currentStyles = getCurrentStyles(item._child, styles);
            }, function () {
              item._animateChild.start(currentStyles, styles, {
                duration: duration,
                easing: easing,
                onFinish: onFinish
              });
            });
          }
        }
      },
      stop: function (item, targetStyles) {
        rafLoop.cancel(rafQueueVisibility, item._id);
        item._animateChild.stop(targetStyles);
      }
    };

  }

  /**
   * Get target grid for the default drag sort predicate.
   *
   * @private
   * @param {Item} item
   * @param {Grid} rootGrid
   * @param {Rectangle} itemRect
   * @param {Number} threshold
   * @returns {?Grid}
   */
  function getTargetGrid(item, rootGrid, itemRect, threshold) {

    var ret = null;
    var dragSort = rootGrid._settings.dragSort;
    var grids = dragSort === true ? [rootGrid] : dragSort.call(rootGrid, item);
    var bestScore = -1;
    var gridScore;
    var grid;
    var i;

    // Return immediately if there are no grids.
    if (!Array.isArray(grids)) {
      return ret;
    }

    // Loop through the grids and get the best match.
    for (i = 0; i < grids.length; i++) {

      grid = grids[i];

      // Filter out all destroyed grids.
      if (grid._isDestroyed) {
        continue;
      }

      // We need to update the grid's offset since it may have changed during
      // scrolling. This could be left as problem for the userland, but it's
      // much nicer this way. One less hack for the user to worry about =)
      grid._refreshDimensions();

      // Check how much dragged element overlaps the container element.
      gridScore = getRectOverlapScore(itemRect, {
        width: grid._width,
        height: grid._height,
        left: grid._left,
        top: grid._top
      });

      // Check if this grid is the best match so far.
      if (gridScore > threshold && gridScore > bestScore) {
        bestScore = gridScore;
        ret = grid;
      }

    }

    return ret;

  }

  /**
   * Process item's callback queue.
   *
   * @private
   * @param {Function[]} queue
   * @param {Boolean} interrupted
   * @param {Item} instance
   */
  function processQueue(queue, interrupted, instance) {

    var callbacks = queue.splice(0, queue.length);
    var i;

    for (i = 0; i < callbacks.length; i++) {
      callbacks[i](interrupted, instance);
    }

  }

  /**
   * Check if item is in specific state.
   *
   * @private
   * @param {Item} item
   * @param {GridItemState} state
   *  - Accepted values are: "active", "inactive", "visible", "hidden",
   *    "showing", "hiding", "positioning", "dragging", "releasing" and
   *    "migrating".
   * @returns {Boolean}
   */
  function isItemInState(item, state) {

    var methodName;

    if (state === 'inactive') {
      return !item.isActive();
    }

    if (state === 'hidden') {
      return !item.isVisible();
    }

    methodName = 'is' + state.charAt(0).toUpperCase() + state.slice(1);

    return typeof item[methodName] === typeFunction ? item[methodName]() : false;

  }

  /**
   * Prevent default.
   *
   * @private
   * @param {Object} e
   */
  function preventDefault(e) {

    if (e.preventDefault) {
      e.preventDefault();
    }

  }

  /**
   * Merge default settings with user settings. The returned object is a new
   * object with merged values. The merging is a deep merge meaning that all
   * objects and arrays within the provided settings objects will be also merged
   * so that modifying the values of the settings object will have no effect on
   * the returned object.
   *
   * @private
   * @param {Object} defaultSettings
   * @param {Object} [userSettings]
   * @returns {Object} Returns a new object.
   */
  function mergeSettings(defaultSettings, userSettings) {

    // Create a fresh copy of default settings.
    var ret = mergeObjects({}, defaultSettings);

    // Merge user settings to default settings.
    ret = userSettings ? mergeObjects(ret, userSettings) : ret;

    // Handle visible/hidden styles manually so that the whole object is
    // overriden instead of the props.
    ret.visibleStyles = (userSettings || {}).visibleStyles || (defaultSettings || {}).visibleStyles;
    ret.hiddenStyles = (userSettings || {}).hiddenStyles || (defaultSettings || {}).hiddenStyles;

    return ret;

  }

  /**
   * Resolver for default drag start predicate function.
   *
   * @private
   * @param {Item} item
   * @param {Object} event
   * @returns {Boolean}
   */
  function dragStartPredicateResolve(item, event) {

    var predicate = item._drag._startPredicateData;
    var pointer = event.changedPointers[0];
    var pageX = pointer && pointer.pageX || 0;
    var pageY = pointer && pointer.pageY || 0;
    var handleRect;

    // If the moved distance is smaller than the threshold distance or there is
    // some delay left, ignore this predicate cycle.
    if (event.distance < predicate.distance || predicate.delay) {
      return;
    }

    // Get handle rect.
    handleRect = predicate.handleElement.getBoundingClientRect();

    // Reset predicate data.
    dragStartPredicateReset(item);

    // If the cursor is still within the handle let's start the drag.
    return isPointWithinRect(pageX, pageY, {
      width: handleRect.width,
      height: handleRect.height,
      left: handleRect.left + (global.pageXOffset || 0),
      top: handleRect.top + (global.pageYOffset || 0)
    });

  }

  /**
   * Reset for default drag start predicate function.
   *
   * @private
   * @param {Item} item
   */
  function dragStartPredicateReset(item) {

    var predicate = item._drag._startPredicateData;

    if (predicate) {
      if (predicate.delayTimer) {
        predicate.delayTimer = global.clearTimeout(predicate.delayTimer);
      }
      item._drag._startPredicateData = null;
    }

  }

  /**
   * Default layout algorithm
   * ************************
   */

  /*!
    * muuriLayout v0.5.3
    * Copyright (c) 2016 Niklas Rämö <inramo@gmail.com>
    * Released under the MIT license
    */

  /**
   * The default Muuri layout algorithm. Based on MAXRECTS approach as described
   * by Jukka Jylänki in his survey: "A Thousand Ways to Pack the Bin - A
   * Practical Approach to Two-Dimensional Rectangle Bin Packing.".
   *
   * This algorithm is intentionally separated from the rest of the codebase,
   * because it is it's own library with a different copyright than the rest of
   * the software. It's also MIT licensed so no worries there. This is intended
   * to be used as Muuri's default layout algorithm and goes hand in hand with
   * Muuri's core development.
   *
   * @private
   * @param {Item[]} items
   * @param {Number} width
   * @param {Number} height
   * @param {Object} options
   * @param {Boolean} [options.fillGaps=false]
   * @param {Boolean} [options.horizontal=false]
   * @param {Boolean} [options.alignRight=false]
   * @param {Boolean} [options.alignBottom=false]
   * @returns {LayoutData}
   */
  function muuriLayout(items, width, height, options) {

    var fillGaps = !!options.fillGaps;
    var isHorizontal = !!options.horizontal;
    var alignRight = !!options.alignRight;
    var alignBottom = !!options.alignBottom;
    var rounding = !!options.rounding;
    var layout = {
      slots: {},
      width: isHorizontal ? 0 : (rounding ? Math.round(width) : width),
      height: !isHorizontal ? 0 : (rounding ? Math.round(height) : height),
      setWidth: isHorizontal,
      setHeight: !isHorizontal
    };
    var freeSlots = [];
    var slotIds;
    var slotData;
    var slot;
    var item;
    var itemWidth;
    var itemHeight;
    var i;

    // No need to go further if items do not exist.
    if (!items.length) {
      return layout;
    }

    // Find slots for items.
    for (i = 0; i < items.length; i++) {
      item = items[i];
      itemWidth = item._width + item._margin.left + item._margin.right;
      itemHeight = item._height + item._margin.top + item._margin.bottom;
      if (rounding) {
        itemWidth = Math.round(itemWidth);
        itemHeight = Math.round(itemHeight);
      }
      slotData = muuriLayout.getSlot(layout, freeSlots, itemWidth, itemHeight, !isHorizontal, fillGaps);
      slot = slotData[0];
      freeSlots = slotData[1];
      if (isHorizontal) {
        layout.width = Math.max(layout.width, slot.left + slot.width);
      }
      else {
        layout.height = Math.max(layout.height, slot.top + slot.height);
      }
      layout.slots[item._id] = slot;
    }

    // If the alignment is set to right or bottom, we need to adjust the
    // results.
    if (alignRight || alignBottom) {
      slotIds = Object.keys(layout.slots);
      for (i = 0; i < slotIds.length; i++) {
        slot = layout.slots[slotIds[i]];
        if (alignRight) {
          slot.left = layout.width - (slot.left + slot.width);
        }
        if (alignBottom) {
          slot.top = layout.height - (slot.top + slot.height);
        }
      }
    }

    return layout;

  }

  /**
   * Calculate position for the layout item. Returns the left and top position
   * of the item in pixels.
   *
   * @private
   * @memberof muuriLayout
   * @param {Layout} layout
   * @param {Array} slots
   * @param {Number} itemWidth
   * @param {Number} itemHeight
   * @param {Boolean} vertical
   * @param {Boolean} fillGaps
   * @returns {Array}
   */
  muuriLayout.getSlot = function (layout, slots, itemWidth, itemHeight, vertical, fillGaps) {

    var leeway = 0.001;
    var newSlots = [];
    var item = {
      left: null,
      top: null,
      width: itemWidth,
      height: itemHeight
    };
    var slot;
    var potentialSlots;
    var ignoreCurrentSlots;
    var i;
    var ii;

    // Try to find a slot for the item.
    for (i = 0; i < slots.length; i++) {
      slot = slots[i];
      if (item.width <= (slot.width + leeway) && item.height <= (slot.height + leeway)) {
        item.left = slot.left;
        item.top = slot.top;
        break;
      }
    }

    // If no slot was found for the item.
    if (item.left === null) {

      // Position the item in to the bottom left (vertical mode) or top right
      // (horizontal mode) of the grid.
      item.left = vertical ? 0 : layout.width;
      item.top = vertical ? layout.height : 0;

      // If gaps don't needs filling do not add any current slots to the new
      // slots array.
      if (!fillGaps) {
        ignoreCurrentSlots = true;
      }

    }

    // In vertical mode, if the item's bottom overlaps the grid's bottom.
    if (vertical && (item.top + item.height) > layout.height) {

      // If item is not aligned to the left edge, create a new slot.
      if (item.left > 0) {
        newSlots.push({
          left: 0,
          top: layout.height,
          width: item.left,
          height: Infinity
        });
      }

      // If item is not aligned to the right edge, create a new slot.
      if ((item.left + item.width) < layout.width) {
        newSlots.push({
          left: item.left + item.width,
          top: layout.height,
          width: layout.width - item.left - item.width,
          height: Infinity
        });
      }

      // Update grid height.
      layout.height = item.top + item.height;

    }

    // In horizontal mode, if the item's right overlaps the grid's right edge.
    if (!vertical && (item.left + item.width) > layout.width) {

      // If item is not aligned to the top, create a new slot.
      if (item.top > 0) {
        newSlots.push({
          left: layout.width,
          top: 0,
          width: Infinity,
          height: item.top
        });
      }

      // If item is not aligned to the bottom, create a new slot.
      if ((item.top + item.height) < layout.height) {
        newSlots.push({
          left: layout.width,
          top: item.top + item.height,
          width: Infinity,
          height: layout.height - item.top - item.height
        });
      }

      // Update grid width.
      layout.width = item.left + item.width;

    }

    // Clean up the current slots making sure there are no old slots that
    // overlap with the item. If an old slot overlaps with the item, split it
    // into smaller slots if necessary.
    for (i = fillGaps ? 0 : ignoreCurrentSlots ? slots.length : i; i < slots.length; i++) {
      potentialSlots = muuriLayout.splitRect(slots[i], item);
      for (ii = 0; ii < potentialSlots.length; ii++) {
        slot = potentialSlots[ii];
        // Let's make sure here that we have a big enough slot
        // (width/height > 0.49px) and also let's make sure that the slot is
        // within the boundaries of the grid.
        if (slot.width > 0.49 && slot.height > 0.49 && ((vertical && slot.top < layout.height) || (!vertical && slot.left < layout.width))) {
          newSlots.push(slot);
        }
      }
    }

    // Sanitize new slots.
    if (newSlots.length) {
      newSlots = muuriLayout.purgeRects(newSlots).sort(vertical ? muuriLayout.sortRectsTopLeft : muuriLayout.sortRectsLeftTop);
    }

    // Return the item and updated slots data.
    return [item, newSlots];

  };

  /**
   * Punch a hole into a rectangle and split the remaining area into smaller
   * rectangles (4 at max).
   *
   * @private
   * @param {Rectangle} rect
   * @param {Rectangle} hole
   * returns {Rectangle[]}
   */
  muuriLayout.splitRect = function (rect, hole) {

    var ret = [];

    // If the rect does not overlap with the hole add rect to the return data as
    // is.
    if (!muuriLayout.doRectsOverlap(rect, hole)) {
      return [{
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height
      }];
    }

    // Left split.
    if (rect.left < hole.left) {
      ret.push({
        left: rect.left,
        top: rect.top,
        width: hole.left - rect.left,
        height: rect.height
      });
    }

    // Right split.
    if ((rect.left + rect.width) > (hole.left + hole.width)) {
      ret.push({
        left: hole.left + hole.width,
        top: rect.top,
        width: (rect.left + rect.width) - (hole.left + hole.width),
        height: rect.height
      });
    }

    // Top split.
    if (rect.top < hole.top) {
      ret.push({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: hole.top - rect.top
      });
    }

    // Bottom split.
    if ((rect.top + rect.height) > (hole.top + hole.height)) {
      ret.push({
        left: rect.left,
        top: hole.top + hole.height,
        width: rect.width,
        height: (rect.top + rect.height) - (hole.top + hole.height)
      });
    }

    return ret;

  };

  /**
   * Check if two rectangles overlap.
   *
   * @private
   * @memberof muuriLayout
   * @param {Rectangle} a
   * @param {Rectangle} b
   * @returns {Boolean}
   */
  muuriLayout.doRectsOverlap = function (a, b) {

    return !((a.left + a.width) <= b.left || (b.left + b.width) <= a.left || (a.top + a.height) <= b.top || (b.top + b.height) <= a.top);

  };

  /**
   * Check if a rectangle is fully within another rectangle.
   *
   * @private
   * @memberof muuriLayout
   * @param {Rectangle} a
   * @param {Rectangle} b
   * @returns {Boolean}
   */
  muuriLayout.isRectWithinRect = function (a, b) {

    return a.left >= b.left && a.top >= b.top && (a.left + a.width) <= (b.left + b.width) && (a.top + a.height) <= (b.top + b.height);

  };

  /**
   * Loops through an array of rectangles and removes all that are fully within
   * another rectangle in the array.
   *
   * @private
   * @memberof muuriLayout
   * @param {Rectangle[]} rects
   * @returns {Rectangle[]}
   */
  muuriLayout.purgeRects = function (rects) {

    var i = rects.length;
    var ii;
    var rectA;
    var rectB;

    while (i--) {
      rectA = rects[i];
      ii = rects.length;
      while (ii--) {
        rectB = rects[ii];
        if (i !== ii && muuriLayout.isRectWithinRect(rectA, rectB)) {
          rects.splice(i, 1);
          break;
        }
      }
    }

    return rects;

  };

  /**
   * Sort rectangles with top-left gravity.
   *
   * @private
   * @memberof muuriLayout
   * @param {Rectangle} a
   * @param {Rectangle} b
   * @returns {Number}
   */
  muuriLayout.sortRectsTopLeft = function (a, b) {

    return a.top - b.top || a.left - b.left;

  };

  /**
   * Sort rectangles with left-top gravity.
   *
   * @private
   * @memberof muuriLayout
   * @param {Rectangle} a
   * @param {Rectangle} b
   * @returns {Number}
   */
  muuriLayout.sortRectsLeftTop = function (a, b) {

    return a.left - b.left || a.top - b.top;

  };

  /**
   * Type definitions
   * ****************
   */

  /* eslint-disable */
  /**
   * The values by which multiple grid items can be queried. An html element or
   * an array of HTML elements. Item or an array of items. Node list, live or
   * static. Number (index) or a list of numbers (indices).
   *
   * @typedef {(HTMLElement|HTMLElement[]|Item|Item[]|NodeList|Number|Number[])} GridMultiItemQuery
   */
  /* eslint-enable */

  /**
   * The values by which a single grid item can be queried. An html element, an
   * item instance or a number (index).
   *
   * @typedef {(HTMLElement|Item|Number)} GridSingleItemQuery
   */

  /**
   * The grid item's state, a string. Accepted values are: "active", "inactive",
   * "visible", "hidden", "showing", "hiding", "positioning", "dragging",
   * "releasing" and "migrating".
   *
   * @typedef {String} GridItemState
   */

  /**
   * The data that is required to orchestrate a sort action during drag.
   *
   * @typedef {Object} DragSortCommand
   * @param {String} action
   *   - "move" or "swap".
   * @param {Number} index
   *   - target index.
   * @param {?Grid} [grid=null]
   *   - target grid.
   */

  /**
   * A rectangle is an object with width, height and offset (left and top) data.
   *
   * @typedef {Object} Rectangle
   * @property {Number} width
   * @property {Number} height
   * @property {Number} left
   * @property {Number} top
   */

  /**
   * Layout data for the layout instance.
   *
   * @typedef {Object} LayoutData
   * @property {Object} slots
   * @property {Number} width
   * @property {Number} height
   * @property {Boolean} setWidth
   * @property {Boolean} setHeight
   */

  /**
   * @callback LayoutCallback
   * @param {Boolean} isAborted
   *   - Was the layout procedure aborted?
   * @param {Item[]} items
   *   - The items that were attempted to be positioned.
   */

  /**
   * @callback ShowCallback
   * @param {Item[]} items
   *   - The items that were successfully shown without interruptions.
   */

  /**
   * @callback HideCallback
   * @param {Item[]} items
   *   - The items that were successfully hidden without interruptions.
   */

  /**
   * @callback FilterCallback
   * @param {Item[]} shownItems
   *   - The items that were shown.
   * @param {Item[]} hiddenItems
   *   - The items that were hidden.
   */

  /**
   * Init
   */

  return Grid;

}));


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _muuri = __webpack_require__(1);

var _muuri2 = _interopRequireDefault(_muuri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var csrfToken = document.querySelector('[name="_csrf"]').content;

  var fileInputs = document.querySelectorAll('.js-fileupload');

  function uploadFile(fileInput) {
    if (fileInput.files.length === 0) return;

    var wrapper = fileInput.parentNode;

    var formData = new window.FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('_csrf', csrfToken);

    var request = new window.XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState !== 4) return;

      if (request.status === 201) {
        var resp = JSON.parse(request.response);
        console.log(resp);

        wrapper.querySelector('.js-img').src = resp.full_name;
        wrapper.querySelector('.js-file-text').value = resp.file;
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

  // grid
  var msnryContainer = document.querySelector('.js-msnry');
  if (msnryContainer) {
    msnryContainer.classList.add('js-activated');

    var g = new _muuri2.default('.msnry', {
      items: '.msnry-item',
      dragEnabled: true,
      dragSort: true,
      layout: {
        fillGaps: true,
        horizontal: false,
        alignRight: false,
        alignBottom: false,
        rounding: false
      }
    }).on('dragReleaseEnd', function () {
      g.synchronize();
      var ids = Array.from(document.querySelectorAll('.msnry-item')).map(function (el) {
        return el.dataset.id;
      });
      $.ajax({
        type: 'POST',
        url: '/admin/logos/reposition',
        data: {
          ids: ids.join(','),
          _csrf: csrfToken
        },
        success: function success(resp) {
          console.log('saved');
        },
        dataType: 'json'
      });
    });
  }
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDU1MjFjNmM0ZGU4NGNmYWIzN2IiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2hhbW1lcmpzL2hhbW1lci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXV1cmkvbXV1cmkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9hZG1pbi5qcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjc3JmVG9rZW4iLCJxdWVyeVNlbGVjdG9yIiwiY29udGVudCIsImZpbGVJbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwidXBsb2FkRmlsZSIsImZpbGVJbnB1dCIsImZpbGVzIiwibGVuZ3RoIiwid3JhcHBlciIsInBhcmVudE5vZGUiLCJmb3JtRGF0YSIsIndpbmRvdyIsIkZvcm1EYXRhIiwiYXBwZW5kIiwicmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3AiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZSIsImNvbnNvbGUiLCJsb2ciLCJzcmMiLCJmdWxsX25hbWUiLCJ2YWx1ZSIsImZpbGUiLCJyZXNwb25zZVRleHQiLCJwYmFyIiwidXBsb2FkIiwiZSIsInByb2dyZXNzIiwiTWF0aCIsImNlaWwiLCJsb2FkZWQiLCJ0b3RhbCIsInN0eWxlIiwid2lkdGgiLCJvcGVuIiwiZGF0YXNldCIsInBhdGgiLCJzZW5kIiwiZm9yRWFjaCIsImlucHV0IiwibXNucnlDb250YWluZXIiLCJjbGFzc0xpc3QiLCJhZGQiLCJnIiwiaXRlbXMiLCJkcmFnRW5hYmxlZCIsImRyYWdTb3J0IiwibGF5b3V0IiwiZmlsbEdhcHMiLCJob3Jpem9udGFsIiwiYWxpZ25SaWdodCIsImFsaWduQm90dG9tIiwicm91bmRpbmciLCJvbiIsInN5bmNocm9uaXplIiwiaWRzIiwiQXJyYXkiLCJmcm9tIiwibWFwIiwiZWwiLCJpZCIsIiQiLCJhamF4IiwidHlwZSIsInVybCIsImRhdGEiLCJqb2luIiwiX2NzcmYiLCJzdWNjZXNzIiwiZGF0YVR5cGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxVQUFVOztBQUUvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxVQUFVO0FBQ3JCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQiwwQkFBMEI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGlCQUFpQjtBQUM1QixXQUFXLE1BQU07QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYixXQUFXLEVBQUU7QUFDYixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsWUFBWTtBQUN2QixXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFlBQVk7QUFDdkIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFlBQVk7QUFDdkIsV0FBVyxZQUFZO0FBQ3ZCLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksZUFBZTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxNQUFNLE9BQU8sS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQzNDLFdBQVcsT0FBTztBQUNsQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxNQUFNLEdBQUcsS0FBSyxFQUFFLEtBQUs7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLGlCQUFpQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsWUFBWTtBQUN2QixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsU0FBUztBQUNwQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLEVBQUU7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU8sS0FBSztBQUN2QixXQUFXLE9BQU8sS0FBSztBQUN2QixXQUFXLE1BQU07QUFDakIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxNQUFNO0FBQ2pCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixXQUFXLE1BQU07QUFDakIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixXQUFXLE1BQU07QUFDakIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlCQUF5Qjs7QUFFekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxDQUFDOztBQUVEO0FBQ0EsVUFBVTtBQUNWLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxnQkFBZ0I7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFD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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxXQUFXLFlBQVk7QUFDdkIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FB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QUFFTDtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLG1HQUFtRyxHQUFHO0FBQ3RHOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFBQTtBQUNMLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7QUNsbEZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGVBQWUsa0JBQWtCO0FBQ2pDO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQixhQUFhLFlBQVk7QUFDekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxTQUFTO0FBQ3RCLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVMsZ0ZBQWdGO0FBQ3pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxPQUFPO0FBQ3BCLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHlGQUF5RjtBQUN2SDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLEtBQUs7QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxLQUFLO0FBQ2xCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxLQUFLO0FBQ2xCLGFBQWEsT0FBTztBQUNwQixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSx3QkFBd0I7O0FBRXZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsc0JBQXNCO0FBQ3JDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLHNCQUFzQjtBQUNyQztBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixzREFBc0Q7QUFDaEY7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsOERBQThEO0FBQ3hGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4Qix1REFBdUQ7QUFDckY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsdURBQXVEO0FBQ2pGOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDJEQUEyRDtBQUN2Rjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsS0FBSzs7QUFFTDtBQUNBLDBCQUEwQiwyREFBMkQ7O0FBRXJGO0FBQ0E7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsS0FBSzs7QUFFTDtBQUNBLDBCQUEwQiwyREFBMkQ7O0FBRXJGO0FBQ0E7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7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QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0Usa0JBQWtCO0FBQ3BGO0FBQ0Esa0JBQWtCLDRCQUE0QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxVQUFVO0FBQ3ZCLGFBQWEsVUFBVTtBQUN2QixjQUFjO0FBQ2Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkIsYUFBYSxVQUFVO0FBQ3ZCLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkIsYUFBYSxVQUFVO0FBQ3ZCLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsWUFBWTtBQUN6QixlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkIsYUFBYSxVQUFVO0FBQ3ZCLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkIsYUFBYSxVQUFVO0FBQ3ZCLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUVBQWlFO0FBQ2hGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLDBCQUEwQjtBQUN6Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixhQUFhLE9BQU87QUFDcEI7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQSxhQUFhLE1BQU07QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZ0JBQWdCLE9BQU87QUFDdkIsZ0JBQWdCLE9BQU87QUFDdkIsZ0JBQWdCLE9BQU87QUFDdkIsZ0JBQWdCLE9BQU87QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGdCQUFnQixPQUFPO0FBQ3ZCLGdCQUFnQixPQUFPO0FBQ3ZCLGdCQUFnQixPQUFPO0FBQ3ZCLGdCQUFnQixRQUFRO0FBQ3hCLGdCQUFnQixRQUFRO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDbnZMRDs7Ozs7O0FBRUFBLFNBQVNDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFZO0FBQ3hELE1BQU1DLFlBQVlGLFNBQVNHLGFBQVQsQ0FBdUIsZ0JBQXZCLEVBQXlDQyxPQUEzRDs7QUFFQSxNQUFNQyxhQUFhTCxTQUFTTSxnQkFBVCxDQUEwQixnQkFBMUIsQ0FBbkI7O0FBRUEsV0FBU0MsVUFBVCxDQUFxQkMsU0FBckIsRUFBZ0M7QUFDOUIsUUFBSUEsVUFBVUMsS0FBVixDQUFnQkMsTUFBaEIsS0FBMkIsQ0FBL0IsRUFBa0M7O0FBRWxDLFFBQU1DLFVBQVVILFVBQVVJLFVBQTFCOztBQUVBLFFBQU1DLFdBQVcsSUFBSUMsT0FBT0MsUUFBWCxFQUFqQjtBQUNBRixhQUFTRyxNQUFULENBQWdCLE1BQWhCLEVBQXdCUixVQUFVQyxLQUFWLENBQWdCLENBQWhCLENBQXhCO0FBQ0FJLGFBQVNHLE1BQVQsQ0FBZ0IsT0FBaEIsRUFBeUJkLFNBQXpCOztBQUVBLFFBQU1lLFVBQVUsSUFBSUgsT0FBT0ksY0FBWCxFQUFoQjtBQUNBRCxZQUFRRSxrQkFBUixHQUE2QixZQUFZO0FBQ3ZDLFVBQUlGLFFBQVFHLFVBQVIsS0FBdUIsQ0FBM0IsRUFBOEI7O0FBRTlCLFVBQUlILFFBQVFJLE1BQVIsS0FBbUIsR0FBdkIsRUFBNEI7QUFDMUIsWUFBTUMsT0FBT0MsS0FBS0MsS0FBTCxDQUFXUCxRQUFRUSxRQUFuQixDQUFiO0FBQ0FDLGdCQUFRQyxHQUFSLENBQVlMLElBQVo7O0FBRUFYLGdCQUFRUixhQUFSLENBQXNCLFNBQXRCLEVBQWlDeUIsR0FBakMsR0FBdUNOLEtBQUtPLFNBQTVDO0FBQ0FsQixnQkFBUVIsYUFBUixDQUFzQixlQUF0QixFQUF1QzJCLEtBQXZDLEdBQStDUixLQUFLUyxJQUFwRDtBQUNELE9BTkQsTUFNTztBQUNMTCxnQkFBUUMsR0FBUixDQUFZVixRQUFRZSxZQUFwQjtBQUNEO0FBQ0YsS0FaRDs7QUFjQSxRQUFNQyxPQUFPdEIsUUFBUVIsYUFBUixDQUFzQixVQUF0QixDQUFiO0FBQ0FjLFlBQVFpQixNQUFSLENBQWVqQyxnQkFBZixDQUFnQyxVQUFoQyxFQUE0QyxVQUFVa0MsQ0FBVixFQUFhO0FBQ3ZELFVBQU1DLFdBQVdDLEtBQUtDLElBQUwsQ0FBVUgsRUFBRUksTUFBRixHQUFXSixFQUFFSyxLQUFiLEdBQXFCLEdBQS9CLENBQWpCO0FBQ0FQLFdBQUtRLEtBQUwsQ0FBV0MsS0FBWCxHQUFzQk4sUUFBdEI7QUFDRCxLQUhELEVBR0csS0FISDtBQUlBbkIsWUFBUTBCLElBQVIsQ0FBYSxNQUFiLEVBQXFCbkMsVUFBVW9DLE9BQVYsQ0FBa0JDLElBQXZDO0FBQ0E1QixZQUFRNkIsSUFBUixDQUFhakMsUUFBYjtBQUNEOztBQUVEUixhQUFXMEMsT0FBWCxDQUFtQixVQUFDQyxLQUFELEVBQVc7QUFDNUJBLFVBQU0vQyxnQkFBTixDQUF1QixRQUF2QixFQUFpQyxZQUFNO0FBQUVNLGlCQUFXeUMsS0FBWDtBQUFtQixLQUE1RDtBQUNELEdBRkQ7O0FBSUE7QUFDQSxNQUFNQyxpQkFBaUJqRCxTQUFTRyxhQUFULENBQXVCLFdBQXZCLENBQXZCO0FBQ0EsTUFBSThDLGNBQUosRUFBb0I7QUFDbEJBLG1CQUFlQyxTQUFmLENBQXlCQyxHQUF6QixDQUE2QixjQUE3Qjs7QUFFQSxRQUFNQyxJQUFJLG9CQUFVLFFBQVYsRUFBb0I7QUFDNUJDLGFBQU8sYUFEcUI7QUFFNUJDLG1CQUFhLElBRmU7QUFHNUJDLGdCQUFVLElBSGtCO0FBSTVCQyxjQUFRO0FBQ05DLGtCQUFVLElBREo7QUFFTkMsb0JBQVksS0FGTjtBQUdOQyxvQkFBWSxLQUhOO0FBSU5DLHFCQUFhLEtBSlA7QUFLTkMsa0JBQVU7QUFMSjtBQUpvQixLQUFwQixFQVdQQyxFQVhPLENBV0osZ0JBWEksRUFXYyxZQUFNO0FBQzVCVixRQUFFVyxXQUFGO0FBQ0EsVUFBTUMsTUFBTUMsTUFBTUMsSUFBTixDQUFXbEUsU0FBU00sZ0JBQVQsQ0FBMEIsYUFBMUIsQ0FBWCxFQUFxRDZELEdBQXJELENBQXlEO0FBQUEsZUFBTUMsR0FBR3hCLE9BQUgsQ0FBV3lCLEVBQWpCO0FBQUEsT0FBekQsQ0FBWjtBQUNBQyxRQUFFQyxJQUFGLENBQU87QUFDTEMsY0FBTSxNQUREO0FBRUxDLGFBQUsseUJBRkE7QUFHTEMsY0FBTTtBQUNKVixlQUFLQSxJQUFJVyxJQUFKLENBQVMsR0FBVCxDQUREO0FBRUpDLGlCQUFPMUU7QUFGSCxTQUhEO0FBT0wyRSxpQkFBUyxpQkFBQ3ZELElBQUQsRUFBVTtBQUNqQkksa0JBQVFDLEdBQVIsQ0FBWSxPQUFaO0FBQ0QsU0FUSTtBQVVMbUQsa0JBQVU7QUFWTCxPQUFQO0FBWUQsS0ExQlMsQ0FBVjtBQTJCRDtBQUNGLENBM0VELEUiLCJmaWxlIjoiYWRtaW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3RcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0NTUyMWM2YzRkZTg0Y2ZhYjM3YiIsIi8qISBIYW1tZXIuSlMgLSB2Mi4wLjcgLSAyMDE2LTA0LTIyXG4gKiBodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvL1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNiBKb3JpayBUYW5nZWxkZXI7XG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgKi9cbihmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50LCBleHBvcnROYW1lLCB1bmRlZmluZWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG52YXIgVkVORE9SX1BSRUZJWEVTID0gWycnLCAnd2Via2l0JywgJ01veicsICdNUycsICdtcycsICdvJ107XG52YXIgVEVTVF9FTEVNRU5UID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbnZhciBUWVBFX0ZVTkNUSU9OID0gJ2Z1bmN0aW9uJztcblxudmFyIHJvdW5kID0gTWF0aC5yb3VuZDtcbnZhciBhYnMgPSBNYXRoLmFicztcbnZhciBub3cgPSBEYXRlLm5vdztcblxuLyoqXG4gKiBzZXQgYSB0aW1lb3V0IHdpdGggYSBnaXZlbiBzY29wZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lb3V0XG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gc2V0VGltZW91dENvbnRleHQoZm4sIHRpbWVvdXQsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gc2V0VGltZW91dChiaW5kRm4oZm4sIGNvbnRleHQpLCB0aW1lb3V0KTtcbn1cblxuLyoqXG4gKiBpZiB0aGUgYXJndW1lbnQgaXMgYW4gYXJyYXksIHdlIHdhbnQgdG8gZXhlY3V0ZSB0aGUgZm4gb24gZWFjaCBlbnRyeVxuICogaWYgaXQgYWludCBhbiBhcnJheSB3ZSBkb24ndCB3YW50IHRvIGRvIGEgdGhpbmcuXG4gKiB0aGlzIGlzIHVzZWQgYnkgYWxsIHRoZSBtZXRob2RzIHRoYXQgYWNjZXB0IGEgc2luZ2xlIGFuZCBhcnJheSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7KnxBcnJheX0gYXJnXG4gKiBAcGFyYW0ge1N0cmluZ30gZm5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbY29udGV4dF1cbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBpbnZva2VBcnJheUFyZyhhcmcsIGZuLCBjb250ZXh0KSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuICAgICAgICBlYWNoKGFyZywgY29udGV4dFtmbl0sIGNvbnRleHQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIHdhbGsgb2JqZWN0cyBhbmQgYXJyYXlzXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRvclxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAqL1xuZnVuY3Rpb24gZWFjaChvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgdmFyIGk7XG5cbiAgICBpZiAoIW9iaikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG9iai5mb3JFYWNoKSB7XG4gICAgICAgIG9iai5mb3JFYWNoKGl0ZXJhdG9yLCBjb250ZXh0KTtcbiAgICB9IGVsc2UgaWYgKG9iai5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCBvYmoubGVuZ3RoKSB7XG4gICAgICAgICAgICBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoaSBpbiBvYmopIHtcbiAgICAgICAgICAgIG9iai5oYXNPd25Qcm9wZXJ0eShpKSAmJiBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiB3cmFwIGEgbWV0aG9kIHdpdGggYSBkZXByZWNhdGlvbiB3YXJuaW5nIGFuZCBzdGFjayB0cmFjZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWV0aG9kXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gd3JhcHBpbmcgdGhlIHN1cHBsaWVkIG1ldGhvZC5cbiAqL1xuZnVuY3Rpb24gZGVwcmVjYXRlKG1ldGhvZCwgbmFtZSwgbWVzc2FnZSkge1xuICAgIHZhciBkZXByZWNhdGlvbk1lc3NhZ2UgPSAnREVQUkVDQVRFRCBNRVRIT0Q6ICcgKyBuYW1lICsgJ1xcbicgKyBtZXNzYWdlICsgJyBBVCBcXG4nO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGUgPSBuZXcgRXJyb3IoJ2dldC1zdGFjay10cmFjZScpO1xuICAgICAgICB2YXIgc3RhY2sgPSBlICYmIGUuc3RhY2sgPyBlLnN0YWNrLnJlcGxhY2UoL15bXlxcKF0rP1tcXG4kXS9nbSwgJycpXG4gICAgICAgICAgICAucmVwbGFjZSgvXlxccythdFxccysvZ20sICcnKVxuICAgICAgICAgICAgLnJlcGxhY2UoL15PYmplY3QuPGFub255bW91cz5cXHMqXFwoL2dtLCAne2Fub255bW91c30oKUAnKSA6ICdVbmtub3duIFN0YWNrIFRyYWNlJztcblxuICAgICAgICB2YXIgbG9nID0gd2luZG93LmNvbnNvbGUgJiYgKHdpbmRvdy5jb25zb2xlLndhcm4gfHwgd2luZG93LmNvbnNvbGUubG9nKTtcbiAgICAgICAgaWYgKGxvZykge1xuICAgICAgICAgICAgbG9nLmNhbGwod2luZG93LmNvbnNvbGUsIGRlcHJlY2F0aW9uTWVzc2FnZSwgc3RhY2spO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xufVxuXG4vKipcbiAqIGV4dGVuZCBvYmplY3QuXG4gKiBtZWFucyB0aGF0IHByb3BlcnRpZXMgaW4gZGVzdCB3aWxsIGJlIG92ZXJ3cml0dGVuIGJ5IHRoZSBvbmVzIGluIHNyYy5cbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBvYmplY3RzX3RvX2Fzc2lnblxuICogQHJldHVybnMge09iamVjdH0gdGFyZ2V0XG4gKi9cbnZhciBhc3NpZ247XG5pZiAodHlwZW9mIE9iamVjdC5hc3NpZ24gIT09ICdmdW5jdGlvbicpIHtcbiAgICBhc3NpZ24gPSBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0KSB7XG4gICAgICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCB8fCB0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG91dHB1dCA9IE9iamVjdCh0YXJnZXQpO1xuICAgICAgICBmb3IgKHZhciBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF07XG4gICAgICAgICAgICBpZiAoc291cmNlICE9PSB1bmRlZmluZWQgJiYgc291cmNlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbmV4dEtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShuZXh0S2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0W25leHRLZXldID0gc291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfTtcbn0gZWxzZSB7XG4gICAgYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcbn1cblxuLyoqXG4gKiBleHRlbmQgb2JqZWN0LlxuICogbWVhbnMgdGhhdCBwcm9wZXJ0aWVzIGluIGRlc3Qgd2lsbCBiZSBvdmVyd3JpdHRlbiBieSB0aGUgb25lcyBpbiBzcmMuXG4gKiBAcGFyYW0ge09iamVjdH0gZGVzdFxuICogQHBhcmFtIHtPYmplY3R9IHNyY1xuICogQHBhcmFtIHtCb29sZWFufSBbbWVyZ2U9ZmFsc2VdXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBkZXN0XG4gKi9cbnZhciBleHRlbmQgPSBkZXByZWNhdGUoZnVuY3Rpb24gZXh0ZW5kKGRlc3QsIHNyYywgbWVyZ2UpIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHNyYyk7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwga2V5cy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCFtZXJnZSB8fCAobWVyZ2UgJiYgZGVzdFtrZXlzW2ldXSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgZGVzdFtrZXlzW2ldXSA9IHNyY1trZXlzW2ldXTtcbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiBkZXN0O1xufSwgJ2V4dGVuZCcsICdVc2UgYGFzc2lnbmAuJyk7XG5cbi8qKlxuICogbWVyZ2UgdGhlIHZhbHVlcyBmcm9tIHNyYyBpbiB0aGUgZGVzdC5cbiAqIG1lYW5zIHRoYXQgcHJvcGVydGllcyB0aGF0IGV4aXN0IGluIGRlc3Qgd2lsbCBub3QgYmUgb3ZlcndyaXR0ZW4gYnkgc3JjXG4gKiBAcGFyYW0ge09iamVjdH0gZGVzdFxuICogQHBhcmFtIHtPYmplY3R9IHNyY1xuICogQHJldHVybnMge09iamVjdH0gZGVzdFxuICovXG52YXIgbWVyZ2UgPSBkZXByZWNhdGUoZnVuY3Rpb24gbWVyZ2UoZGVzdCwgc3JjKSB7XG4gICAgcmV0dXJuIGV4dGVuZChkZXN0LCBzcmMsIHRydWUpO1xufSwgJ21lcmdlJywgJ1VzZSBgYXNzaWduYC4nKTtcblxuLyoqXG4gKiBzaW1wbGUgY2xhc3MgaW5oZXJpdGFuY2VcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNoaWxkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBiYXNlXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXNdXG4gKi9cbmZ1bmN0aW9uIGluaGVyaXQoY2hpbGQsIGJhc2UsIHByb3BlcnRpZXMpIHtcbiAgICB2YXIgYmFzZVAgPSBiYXNlLnByb3RvdHlwZSxcbiAgICAgICAgY2hpbGRQO1xuXG4gICAgY2hpbGRQID0gY2hpbGQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShiYXNlUCk7XG4gICAgY2hpbGRQLmNvbnN0cnVjdG9yID0gY2hpbGQ7XG4gICAgY2hpbGRQLl9zdXBlciA9IGJhc2VQO1xuXG4gICAgaWYgKHByb3BlcnRpZXMpIHtcbiAgICAgICAgYXNzaWduKGNoaWxkUCwgcHJvcGVydGllcyk7XG4gICAgfVxufVxuXG4vKipcbiAqIHNpbXBsZSBmdW5jdGlvbiBiaW5kXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gYmluZEZuKGZuLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGJvdW5kRm4oKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5cbi8qKlxuICogbGV0IGEgYm9vbGVhbiB2YWx1ZSBhbHNvIGJlIGEgZnVuY3Rpb24gdGhhdCBtdXN0IHJldHVybiBhIGJvb2xlYW5cbiAqIHRoaXMgZmlyc3QgaXRlbSBpbiBhcmdzIHdpbGwgYmUgdXNlZCBhcyB0aGUgY29udGV4dFxuICogQHBhcmFtIHtCb29sZWFufEZ1bmN0aW9ufSB2YWxcbiAqIEBwYXJhbSB7QXJyYXl9IFthcmdzXVxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGJvb2xPckZuKHZhbCwgYXJncykge1xuICAgIGlmICh0eXBlb2YgdmFsID09IFRZUEVfRlVOQ1RJT04pIHtcbiAgICAgICAgcmV0dXJuIHZhbC5hcHBseShhcmdzID8gYXJnc1swXSB8fCB1bmRlZmluZWQgOiB1bmRlZmluZWQsIGFyZ3MpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xufVxuXG4vKipcbiAqIHVzZSB0aGUgdmFsMiB3aGVuIHZhbDEgaXMgdW5kZWZpbmVkXG4gKiBAcGFyYW0geyp9IHZhbDFcbiAqIEBwYXJhbSB7Kn0gdmFsMlxuICogQHJldHVybnMgeyp9XG4gKi9cbmZ1bmN0aW9uIGlmVW5kZWZpbmVkKHZhbDEsIHZhbDIpIHtcbiAgICByZXR1cm4gKHZhbDEgPT09IHVuZGVmaW5lZCkgPyB2YWwyIDogdmFsMTtcbn1cblxuLyoqXG4gKiBhZGRFdmVudExpc3RlbmVyIHdpdGggbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2VcbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IHRhcmdldFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gKi9cbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKHRhcmdldCwgdHlwZXMsIGhhbmRsZXIpIHtcbiAgICBlYWNoKHNwbGl0U3RyKHR5cGVzKSwgZnVuY3Rpb24odHlwZSkge1xuICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgfSk7XG59XG5cbi8qKlxuICogcmVtb3ZlRXZlbnRMaXN0ZW5lciB3aXRoIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlXG4gKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSB0YXJnZXRcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclxuICovXG5mdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycyh0YXJnZXQsIHR5cGVzLCBoYW5kbGVyKSB7XG4gICAgZWFjaChzcGxpdFN0cih0eXBlcyksIGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgZmFsc2UpO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIGZpbmQgaWYgYSBub2RlIGlzIGluIHRoZSBnaXZlbiBwYXJlbnRcbiAqIEBtZXRob2QgaGFzUGFyZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwYXJlbnRcbiAqIEByZXR1cm4ge0Jvb2xlYW59IGZvdW5kXG4gKi9cbmZ1bmN0aW9uIGhhc1BhcmVudChub2RlLCBwYXJlbnQpIHtcbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICBpZiAobm9kZSA9PSBwYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBzbWFsbCBpbmRleE9mIHdyYXBwZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaW5kXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gZm91bmRcbiAqL1xuZnVuY3Rpb24gaW5TdHIoc3RyLCBmaW5kKSB7XG4gICAgcmV0dXJuIHN0ci5pbmRleE9mKGZpbmQpID4gLTE7XG59XG5cbi8qKlxuICogc3BsaXQgc3RyaW5nIG9uIHdoaXRlc3BhY2VcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtBcnJheX0gd29yZHNcbiAqL1xuZnVuY3Rpb24gc3BsaXRTdHIoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci50cmltKCkuc3BsaXQoL1xccysvZyk7XG59XG5cbi8qKlxuICogZmluZCBpZiBhIGFycmF5IGNvbnRhaW5zIHRoZSBvYmplY3QgdXNpbmcgaW5kZXhPZiBvciBhIHNpbXBsZSBwb2x5RmlsbFxuICogQHBhcmFtIHtBcnJheX0gc3JjXG4gKiBAcGFyYW0ge1N0cmluZ30gZmluZFxuICogQHBhcmFtIHtTdHJpbmd9IFtmaW5kQnlLZXldXG4gKiBAcmV0dXJuIHtCb29sZWFufE51bWJlcn0gZmFsc2Ugd2hlbiBub3QgZm91bmQsIG9yIHRoZSBpbmRleFxuICovXG5mdW5jdGlvbiBpbkFycmF5KHNyYywgZmluZCwgZmluZEJ5S2V5KSB7XG4gICAgaWYgKHNyYy5pbmRleE9mICYmICFmaW5kQnlLZXkpIHtcbiAgICAgICAgcmV0dXJuIHNyYy5pbmRleE9mKGZpbmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCBzcmMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoKGZpbmRCeUtleSAmJiBzcmNbaV1bZmluZEJ5S2V5XSA9PSBmaW5kKSB8fCAoIWZpbmRCeUtleSAmJiBzcmNbaV0gPT09IGZpbmQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbn1cblxuLyoqXG4gKiBjb252ZXJ0IGFycmF5LWxpa2Ugb2JqZWN0cyB0byByZWFsIGFycmF5c1xuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybnMge0FycmF5fVxuICovXG5mdW5jdGlvbiB0b0FycmF5KG9iaikge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChvYmosIDApO1xufVxuXG4vKipcbiAqIHVuaXF1ZSBhcnJheSB3aXRoIG9iamVjdHMgYmFzZWQgb24gYSBrZXkgKGxpa2UgJ2lkJykgb3IganVzdCBieSB0aGUgYXJyYXkncyB2YWx1ZVxuICogQHBhcmFtIHtBcnJheX0gc3JjIFt7aWQ6MX0se2lkOjJ9LHtpZDoxfV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBba2V5XVxuICogQHBhcmFtIHtCb29sZWFufSBbc29ydD1GYWxzZV1cbiAqIEByZXR1cm5zIHtBcnJheX0gW3tpZDoxfSx7aWQ6Mn1dXG4gKi9cbmZ1bmN0aW9uIHVuaXF1ZUFycmF5KHNyYywga2V5LCBzb3J0KSB7XG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICB2YXIgdmFsdWVzID0gW107XG4gICAgdmFyIGkgPSAwO1xuXG4gICAgd2hpbGUgKGkgPCBzcmMubGVuZ3RoKSB7XG4gICAgICAgIHZhciB2YWwgPSBrZXkgPyBzcmNbaV1ba2V5XSA6IHNyY1tpXTtcbiAgICAgICAgaWYgKGluQXJyYXkodmFsdWVzLCB2YWwpIDwgMCkge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHNyY1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWVzW2ldID0gdmFsO1xuICAgICAgICBpKys7XG4gICAgfVxuXG4gICAgaWYgKHNvcnQpIHtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLnNvcnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLnNvcnQoZnVuY3Rpb24gc29ydFVuaXF1ZUFycmF5KGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYVtrZXldID4gYltrZXldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbn1cblxuLyoqXG4gKiBnZXQgdGhlIHByZWZpeGVkIHByb3BlcnR5XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAqIEByZXR1cm5zIHtTdHJpbmd8VW5kZWZpbmVkfSBwcmVmaXhlZFxuICovXG5mdW5jdGlvbiBwcmVmaXhlZChvYmosIHByb3BlcnR5KSB7XG4gICAgdmFyIHByZWZpeCwgcHJvcDtcbiAgICB2YXIgY2FtZWxQcm9wID0gcHJvcGVydHlbMF0udG9VcHBlckNhc2UoKSArIHByb3BlcnR5LnNsaWNlKDEpO1xuXG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgVkVORE9SX1BSRUZJWEVTLmxlbmd0aCkge1xuICAgICAgICBwcmVmaXggPSBWRU5ET1JfUFJFRklYRVNbaV07XG4gICAgICAgIHByb3AgPSAocHJlZml4KSA/IHByZWZpeCArIGNhbWVsUHJvcCA6IHByb3BlcnR5O1xuXG4gICAgICAgIGlmIChwcm9wIGluIG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIHByb3A7XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIGdldCBhIHVuaXF1ZSBpZFxuICogQHJldHVybnMge251bWJlcn0gdW5pcXVlSWRcbiAqL1xudmFyIF91bmlxdWVJZCA9IDE7XG5mdW5jdGlvbiB1bmlxdWVJZCgpIHtcbiAgICByZXR1cm4gX3VuaXF1ZUlkKys7XG59XG5cbi8qKlxuICogZ2V0IHRoZSB3aW5kb3cgb2JqZWN0IG9mIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtEb2N1bWVudFZpZXd8V2luZG93fVxuICovXG5mdW5jdGlvbiBnZXRXaW5kb3dGb3JFbGVtZW50KGVsZW1lbnQpIHtcbiAgICB2YXIgZG9jID0gZWxlbWVudC5vd25lckRvY3VtZW50IHx8IGVsZW1lbnQ7XG4gICAgcmV0dXJuIChkb2MuZGVmYXVsdFZpZXcgfHwgZG9jLnBhcmVudFdpbmRvdyB8fCB3aW5kb3cpO1xufVxuXG52YXIgTU9CSUxFX1JFR0VYID0gL21vYmlsZXx0YWJsZXR8aXAoYWR8aG9uZXxvZCl8YW5kcm9pZC9pO1xuXG52YXIgU1VQUE9SVF9UT1VDSCA9ICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpO1xudmFyIFNVUFBPUlRfUE9JTlRFUl9FVkVOVFMgPSBwcmVmaXhlZCh3aW5kb3csICdQb2ludGVyRXZlbnQnKSAhPT0gdW5kZWZpbmVkO1xudmFyIFNVUFBPUlRfT05MWV9UT1VDSCA9IFNVUFBPUlRfVE9VQ0ggJiYgTU9CSUxFX1JFR0VYLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbnZhciBJTlBVVF9UWVBFX1RPVUNIID0gJ3RvdWNoJztcbnZhciBJTlBVVF9UWVBFX1BFTiA9ICdwZW4nO1xudmFyIElOUFVUX1RZUEVfTU9VU0UgPSAnbW91c2UnO1xudmFyIElOUFVUX1RZUEVfS0lORUNUID0gJ2tpbmVjdCc7XG5cbnZhciBDT01QVVRFX0lOVEVSVkFMID0gMjU7XG5cbnZhciBJTlBVVF9TVEFSVCA9IDE7XG52YXIgSU5QVVRfTU9WRSA9IDI7XG52YXIgSU5QVVRfRU5EID0gNDtcbnZhciBJTlBVVF9DQU5DRUwgPSA4O1xuXG52YXIgRElSRUNUSU9OX05PTkUgPSAxO1xudmFyIERJUkVDVElPTl9MRUZUID0gMjtcbnZhciBESVJFQ1RJT05fUklHSFQgPSA0O1xudmFyIERJUkVDVElPTl9VUCA9IDg7XG52YXIgRElSRUNUSU9OX0RPV04gPSAxNjtcblxudmFyIERJUkVDVElPTl9IT1JJWk9OVEFMID0gRElSRUNUSU9OX0xFRlQgfCBESVJFQ1RJT05fUklHSFQ7XG52YXIgRElSRUNUSU9OX1ZFUlRJQ0FMID0gRElSRUNUSU9OX1VQIHwgRElSRUNUSU9OX0RPV047XG52YXIgRElSRUNUSU9OX0FMTCA9IERJUkVDVElPTl9IT1JJWk9OVEFMIHwgRElSRUNUSU9OX1ZFUlRJQ0FMO1xuXG52YXIgUFJPUFNfWFkgPSBbJ3gnLCAneSddO1xudmFyIFBST1BTX0NMSUVOVF9YWSA9IFsnY2xpZW50WCcsICdjbGllbnRZJ107XG5cbi8qKlxuICogY3JlYXRlIG5ldyBpbnB1dCB0eXBlIG1hbmFnZXJcbiAqIEBwYXJhbSB7TWFuYWdlcn0gbWFuYWdlclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtJbnB1dH1cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBJbnB1dChtYW5hZ2VyLCBjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLm1hbmFnZXIgPSBtYW5hZ2VyO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB0aGlzLmVsZW1lbnQgPSBtYW5hZ2VyLmVsZW1lbnQ7XG4gICAgdGhpcy50YXJnZXQgPSBtYW5hZ2VyLm9wdGlvbnMuaW5wdXRUYXJnZXQ7XG5cbiAgICAvLyBzbWFsbGVyIHdyYXBwZXIgYXJvdW5kIHRoZSBoYW5kbGVyLCBmb3IgdGhlIHNjb3BlIGFuZCB0aGUgZW5hYmxlZCBzdGF0ZSBvZiB0aGUgbWFuYWdlcixcbiAgICAvLyBzbyB3aGVuIGRpc2FibGVkIHRoZSBpbnB1dCBldmVudHMgYXJlIGNvbXBsZXRlbHkgYnlwYXNzZWQuXG4gICAgdGhpcy5kb21IYW5kbGVyID0gZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgaWYgKGJvb2xPckZuKG1hbmFnZXIub3B0aW9ucy5lbmFibGUsIFttYW5hZ2VyXSkpIHtcbiAgICAgICAgICAgIHNlbGYuaGFuZGxlcihldik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5pbml0KCk7XG5cbn1cblxuSW5wdXQucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIHNob3VsZCBoYW5kbGUgdGhlIGlucHV0RXZlbnQgZGF0YSBhbmQgdHJpZ2dlciB0aGUgY2FsbGJhY2tcbiAgICAgKiBAdmlydHVhbFxuICAgICAqL1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkgeyB9LFxuXG4gICAgLyoqXG4gICAgICogYmluZCB0aGUgZXZlbnRzXG4gICAgICovXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZXZFbCAmJiBhZGRFdmVudExpc3RlbmVycyh0aGlzLmVsZW1lbnQsIHRoaXMuZXZFbCwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICAgICAgdGhpcy5ldlRhcmdldCAmJiBhZGRFdmVudExpc3RlbmVycyh0aGlzLnRhcmdldCwgdGhpcy5ldlRhcmdldCwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICAgICAgdGhpcy5ldldpbiAmJiBhZGRFdmVudExpc3RlbmVycyhnZXRXaW5kb3dGb3JFbGVtZW50KHRoaXMuZWxlbWVudCksIHRoaXMuZXZXaW4sIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHVuYmluZCB0aGUgZXZlbnRzXG4gICAgICovXG4gICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZXZFbCAmJiByZW1vdmVFdmVudExpc3RlbmVycyh0aGlzLmVsZW1lbnQsIHRoaXMuZXZFbCwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICAgICAgdGhpcy5ldlRhcmdldCAmJiByZW1vdmVFdmVudExpc3RlbmVycyh0aGlzLnRhcmdldCwgdGhpcy5ldlRhcmdldCwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICAgICAgdGhpcy5ldldpbiAmJiByZW1vdmVFdmVudExpc3RlbmVycyhnZXRXaW5kb3dGb3JFbGVtZW50KHRoaXMuZWxlbWVudCksIHRoaXMuZXZXaW4sIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgfVxufTtcblxuLyoqXG4gKiBjcmVhdGUgbmV3IGlucHV0IHR5cGUgbWFuYWdlclxuICogY2FsbGVkIGJ5IHRoZSBNYW5hZ2VyIGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0hhbW1lcn0gbWFuYWdlclxuICogQHJldHVybnMge0lucHV0fVxuICovXG5mdW5jdGlvbiBjcmVhdGVJbnB1dEluc3RhbmNlKG1hbmFnZXIpIHtcbiAgICB2YXIgVHlwZTtcbiAgICB2YXIgaW5wdXRDbGFzcyA9IG1hbmFnZXIub3B0aW9ucy5pbnB1dENsYXNzO1xuXG4gICAgaWYgKGlucHV0Q2xhc3MpIHtcbiAgICAgICAgVHlwZSA9IGlucHV0Q2xhc3M7XG4gICAgfSBlbHNlIGlmIChTVVBQT1JUX1BPSU5URVJfRVZFTlRTKSB7XG4gICAgICAgIFR5cGUgPSBQb2ludGVyRXZlbnRJbnB1dDtcbiAgICB9IGVsc2UgaWYgKFNVUFBPUlRfT05MWV9UT1VDSCkge1xuICAgICAgICBUeXBlID0gVG91Y2hJbnB1dDtcbiAgICB9IGVsc2UgaWYgKCFTVVBQT1JUX1RPVUNIKSB7XG4gICAgICAgIFR5cGUgPSBNb3VzZUlucHV0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIFR5cGUgPSBUb3VjaE1vdXNlSW5wdXQ7XG4gICAgfVxuICAgIHJldHVybiBuZXcgKFR5cGUpKG1hbmFnZXIsIGlucHV0SGFuZGxlcik7XG59XG5cbi8qKlxuICogaGFuZGxlIGlucHV0IGV2ZW50c1xuICogQHBhcmFtIHtNYW5hZ2VyfSBtYW5hZ2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAqL1xuZnVuY3Rpb24gaW5wdXRIYW5kbGVyKG1hbmFnZXIsIGV2ZW50VHlwZSwgaW5wdXQpIHtcbiAgICB2YXIgcG9pbnRlcnNMZW4gPSBpbnB1dC5wb2ludGVycy5sZW5ndGg7XG4gICAgdmFyIGNoYW5nZWRQb2ludGVyc0xlbiA9IGlucHV0LmNoYW5nZWRQb2ludGVycy5sZW5ndGg7XG4gICAgdmFyIGlzRmlyc3QgPSAoZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQgJiYgKHBvaW50ZXJzTGVuIC0gY2hhbmdlZFBvaW50ZXJzTGVuID09PSAwKSk7XG4gICAgdmFyIGlzRmluYWwgPSAoZXZlbnRUeXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkgJiYgKHBvaW50ZXJzTGVuIC0gY2hhbmdlZFBvaW50ZXJzTGVuID09PSAwKSk7XG5cbiAgICBpbnB1dC5pc0ZpcnN0ID0gISFpc0ZpcnN0O1xuICAgIGlucHV0LmlzRmluYWwgPSAhIWlzRmluYWw7XG5cbiAgICBpZiAoaXNGaXJzdCkge1xuICAgICAgICBtYW5hZ2VyLnNlc3Npb24gPSB7fTtcbiAgICB9XG5cbiAgICAvLyBzb3VyY2UgZXZlbnQgaXMgdGhlIG5vcm1hbGl6ZWQgdmFsdWUgb2YgdGhlIGRvbUV2ZW50c1xuICAgIC8vIGxpa2UgJ3RvdWNoc3RhcnQsIG1vdXNldXAsIHBvaW50ZXJkb3duJ1xuICAgIGlucHV0LmV2ZW50VHlwZSA9IGV2ZW50VHlwZTtcblxuICAgIC8vIGNvbXB1dGUgc2NhbGUsIHJvdGF0aW9uIGV0Y1xuICAgIGNvbXB1dGVJbnB1dERhdGEobWFuYWdlciwgaW5wdXQpO1xuXG4gICAgLy8gZW1pdCBzZWNyZXQgZXZlbnRcbiAgICBtYW5hZ2VyLmVtaXQoJ2hhbW1lci5pbnB1dCcsIGlucHV0KTtcblxuICAgIG1hbmFnZXIucmVjb2duaXplKGlucHV0KTtcbiAgICBtYW5hZ2VyLnNlc3Npb24ucHJldklucHV0ID0gaW5wdXQ7XG59XG5cbi8qKlxuICogZXh0ZW5kIHRoZSBkYXRhIHdpdGggc29tZSB1c2FibGUgcHJvcGVydGllcyBsaWtlIHNjYWxlLCByb3RhdGUsIHZlbG9jaXR5IGV0Y1xuICogQHBhcmFtIHtPYmplY3R9IG1hbmFnZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICovXG5mdW5jdGlvbiBjb21wdXRlSW5wdXREYXRhKG1hbmFnZXIsIGlucHV0KSB7XG4gICAgdmFyIHNlc3Npb24gPSBtYW5hZ2VyLnNlc3Npb247XG4gICAgdmFyIHBvaW50ZXJzID0gaW5wdXQucG9pbnRlcnM7XG4gICAgdmFyIHBvaW50ZXJzTGVuZ3RoID0gcG9pbnRlcnMubGVuZ3RoO1xuXG4gICAgLy8gc3RvcmUgdGhlIGZpcnN0IGlucHV0IHRvIGNhbGN1bGF0ZSB0aGUgZGlzdGFuY2UgYW5kIGRpcmVjdGlvblxuICAgIGlmICghc2Vzc2lvbi5maXJzdElucHV0KSB7XG4gICAgICAgIHNlc3Npb24uZmlyc3RJbnB1dCA9IHNpbXBsZUNsb25lSW5wdXREYXRhKGlucHV0KTtcbiAgICB9XG5cbiAgICAvLyB0byBjb21wdXRlIHNjYWxlIGFuZCByb3RhdGlvbiB3ZSBuZWVkIHRvIHN0b3JlIHRoZSBtdWx0aXBsZSB0b3VjaGVzXG4gICAgaWYgKHBvaW50ZXJzTGVuZ3RoID4gMSAmJiAhc2Vzc2lvbi5maXJzdE11bHRpcGxlKSB7XG4gICAgICAgIHNlc3Npb24uZmlyc3RNdWx0aXBsZSA9IHNpbXBsZUNsb25lSW5wdXREYXRhKGlucHV0KTtcbiAgICB9IGVsc2UgaWYgKHBvaW50ZXJzTGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHNlc3Npb24uZmlyc3RNdWx0aXBsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBmaXJzdElucHV0ID0gc2Vzc2lvbi5maXJzdElucHV0O1xuICAgIHZhciBmaXJzdE11bHRpcGxlID0gc2Vzc2lvbi5maXJzdE11bHRpcGxlO1xuICAgIHZhciBvZmZzZXRDZW50ZXIgPSBmaXJzdE11bHRpcGxlID8gZmlyc3RNdWx0aXBsZS5jZW50ZXIgOiBmaXJzdElucHV0LmNlbnRlcjtcblxuICAgIHZhciBjZW50ZXIgPSBpbnB1dC5jZW50ZXIgPSBnZXRDZW50ZXIocG9pbnRlcnMpO1xuICAgIGlucHV0LnRpbWVTdGFtcCA9IG5vdygpO1xuICAgIGlucHV0LmRlbHRhVGltZSA9IGlucHV0LnRpbWVTdGFtcCAtIGZpcnN0SW5wdXQudGltZVN0YW1wO1xuXG4gICAgaW5wdXQuYW5nbGUgPSBnZXRBbmdsZShvZmZzZXRDZW50ZXIsIGNlbnRlcik7XG4gICAgaW5wdXQuZGlzdGFuY2UgPSBnZXREaXN0YW5jZShvZmZzZXRDZW50ZXIsIGNlbnRlcik7XG5cbiAgICBjb21wdXRlRGVsdGFYWShzZXNzaW9uLCBpbnB1dCk7XG4gICAgaW5wdXQub2Zmc2V0RGlyZWN0aW9uID0gZ2V0RGlyZWN0aW9uKGlucHV0LmRlbHRhWCwgaW5wdXQuZGVsdGFZKTtcblxuICAgIHZhciBvdmVyYWxsVmVsb2NpdHkgPSBnZXRWZWxvY2l0eShpbnB1dC5kZWx0YVRpbWUsIGlucHV0LmRlbHRhWCwgaW5wdXQuZGVsdGFZKTtcbiAgICBpbnB1dC5vdmVyYWxsVmVsb2NpdHlYID0gb3ZlcmFsbFZlbG9jaXR5Lng7XG4gICAgaW5wdXQub3ZlcmFsbFZlbG9jaXR5WSA9IG92ZXJhbGxWZWxvY2l0eS55O1xuICAgIGlucHV0Lm92ZXJhbGxWZWxvY2l0eSA9IChhYnMob3ZlcmFsbFZlbG9jaXR5LngpID4gYWJzKG92ZXJhbGxWZWxvY2l0eS55KSkgPyBvdmVyYWxsVmVsb2NpdHkueCA6IG92ZXJhbGxWZWxvY2l0eS55O1xuXG4gICAgaW5wdXQuc2NhbGUgPSBmaXJzdE11bHRpcGxlID8gZ2V0U2NhbGUoZmlyc3RNdWx0aXBsZS5wb2ludGVycywgcG9pbnRlcnMpIDogMTtcbiAgICBpbnB1dC5yb3RhdGlvbiA9IGZpcnN0TXVsdGlwbGUgPyBnZXRSb3RhdGlvbihmaXJzdE11bHRpcGxlLnBvaW50ZXJzLCBwb2ludGVycykgOiAwO1xuXG4gICAgaW5wdXQubWF4UG9pbnRlcnMgPSAhc2Vzc2lvbi5wcmV2SW5wdXQgPyBpbnB1dC5wb2ludGVycy5sZW5ndGggOiAoKGlucHV0LnBvaW50ZXJzLmxlbmd0aCA+XG4gICAgICAgIHNlc3Npb24ucHJldklucHV0Lm1heFBvaW50ZXJzKSA/IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA6IHNlc3Npb24ucHJldklucHV0Lm1heFBvaW50ZXJzKTtcblxuICAgIGNvbXB1dGVJbnRlcnZhbElucHV0RGF0YShzZXNzaW9uLCBpbnB1dCk7XG5cbiAgICAvLyBmaW5kIHRoZSBjb3JyZWN0IHRhcmdldFxuICAgIHZhciB0YXJnZXQgPSBtYW5hZ2VyLmVsZW1lbnQ7XG4gICAgaWYgKGhhc1BhcmVudChpbnB1dC5zcmNFdmVudC50YXJnZXQsIHRhcmdldCkpIHtcbiAgICAgICAgdGFyZ2V0ID0gaW5wdXQuc3JjRXZlbnQudGFyZ2V0O1xuICAgIH1cbiAgICBpbnB1dC50YXJnZXQgPSB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVEZWx0YVhZKHNlc3Npb24sIGlucHV0KSB7XG4gICAgdmFyIGNlbnRlciA9IGlucHV0LmNlbnRlcjtcbiAgICB2YXIgb2Zmc2V0ID0gc2Vzc2lvbi5vZmZzZXREZWx0YSB8fCB7fTtcbiAgICB2YXIgcHJldkRlbHRhID0gc2Vzc2lvbi5wcmV2RGVsdGEgfHwge307XG4gICAgdmFyIHByZXZJbnB1dCA9IHNlc3Npb24ucHJldklucHV0IHx8IHt9O1xuXG4gICAgaWYgKGlucHV0LmV2ZW50VHlwZSA9PT0gSU5QVVRfU1RBUlQgfHwgcHJldklucHV0LmV2ZW50VHlwZSA9PT0gSU5QVVRfRU5EKSB7XG4gICAgICAgIHByZXZEZWx0YSA9IHNlc3Npb24ucHJldkRlbHRhID0ge1xuICAgICAgICAgICAgeDogcHJldklucHV0LmRlbHRhWCB8fCAwLFxuICAgICAgICAgICAgeTogcHJldklucHV0LmRlbHRhWSB8fCAwXG4gICAgICAgIH07XG5cbiAgICAgICAgb2Zmc2V0ID0gc2Vzc2lvbi5vZmZzZXREZWx0YSA9IHtcbiAgICAgICAgICAgIHg6IGNlbnRlci54LFxuICAgICAgICAgICAgeTogY2VudGVyLnlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpbnB1dC5kZWx0YVggPSBwcmV2RGVsdGEueCArIChjZW50ZXIueCAtIG9mZnNldC54KTtcbiAgICBpbnB1dC5kZWx0YVkgPSBwcmV2RGVsdGEueSArIChjZW50ZXIueSAtIG9mZnNldC55KTtcbn1cblxuLyoqXG4gKiB2ZWxvY2l0eSBpcyBjYWxjdWxhdGVkIGV2ZXJ5IHggbXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXNzaW9uXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAqL1xuZnVuY3Rpb24gY29tcHV0ZUludGVydmFsSW5wdXREYXRhKHNlc3Npb24sIGlucHV0KSB7XG4gICAgdmFyIGxhc3QgPSBzZXNzaW9uLmxhc3RJbnRlcnZhbCB8fCBpbnB1dCxcbiAgICAgICAgZGVsdGFUaW1lID0gaW5wdXQudGltZVN0YW1wIC0gbGFzdC50aW1lU3RhbXAsXG4gICAgICAgIHZlbG9jaXR5LCB2ZWxvY2l0eVgsIHZlbG9jaXR5WSwgZGlyZWN0aW9uO1xuXG4gICAgaWYgKGlucHV0LmV2ZW50VHlwZSAhPSBJTlBVVF9DQU5DRUwgJiYgKGRlbHRhVGltZSA+IENPTVBVVEVfSU5URVJWQUwgfHwgbGFzdC52ZWxvY2l0eSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICB2YXIgZGVsdGFYID0gaW5wdXQuZGVsdGFYIC0gbGFzdC5kZWx0YVg7XG4gICAgICAgIHZhciBkZWx0YVkgPSBpbnB1dC5kZWx0YVkgLSBsYXN0LmRlbHRhWTtcblxuICAgICAgICB2YXIgdiA9IGdldFZlbG9jaXR5KGRlbHRhVGltZSwgZGVsdGFYLCBkZWx0YVkpO1xuICAgICAgICB2ZWxvY2l0eVggPSB2Lng7XG4gICAgICAgIHZlbG9jaXR5WSA9IHYueTtcbiAgICAgICAgdmVsb2NpdHkgPSAoYWJzKHYueCkgPiBhYnModi55KSkgPyB2LnggOiB2Lnk7XG4gICAgICAgIGRpcmVjdGlvbiA9IGdldERpcmVjdGlvbihkZWx0YVgsIGRlbHRhWSk7XG5cbiAgICAgICAgc2Vzc2lvbi5sYXN0SW50ZXJ2YWwgPSBpbnB1dDtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB1c2UgbGF0ZXN0IHZlbG9jaXR5IGluZm8gaWYgaXQgZG9lc24ndCBvdmVydGFrZSBhIG1pbmltdW0gcGVyaW9kXG4gICAgICAgIHZlbG9jaXR5ID0gbGFzdC52ZWxvY2l0eTtcbiAgICAgICAgdmVsb2NpdHlYID0gbGFzdC52ZWxvY2l0eVg7XG4gICAgICAgIHZlbG9jaXR5WSA9IGxhc3QudmVsb2NpdHlZO1xuICAgICAgICBkaXJlY3Rpb24gPSBsYXN0LmRpcmVjdGlvbjtcbiAgICB9XG5cbiAgICBpbnB1dC52ZWxvY2l0eSA9IHZlbG9jaXR5O1xuICAgIGlucHV0LnZlbG9jaXR5WCA9IHZlbG9jaXR5WDtcbiAgICBpbnB1dC52ZWxvY2l0eVkgPSB2ZWxvY2l0eVk7XG4gICAgaW5wdXQuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xufVxuXG4vKipcbiAqIGNyZWF0ZSBhIHNpbXBsZSBjbG9uZSBmcm9tIHRoZSBpbnB1dCB1c2VkIGZvciBzdG9yYWdlIG9mIGZpcnN0SW5wdXQgYW5kIGZpcnN0TXVsdGlwbGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICogQHJldHVybnMge09iamVjdH0gY2xvbmVkSW5wdXREYXRhXG4gKi9cbmZ1bmN0aW9uIHNpbXBsZUNsb25lSW5wdXREYXRhKGlucHV0KSB7XG4gICAgLy8gbWFrZSBhIHNpbXBsZSBjb3B5IG9mIHRoZSBwb2ludGVycyBiZWNhdXNlIHdlIHdpbGwgZ2V0IGEgcmVmZXJlbmNlIGlmIHdlIGRvbid0XG4gICAgLy8gd2Ugb25seSBuZWVkIGNsaWVudFhZIGZvciB0aGUgY2FsY3VsYXRpb25zXG4gICAgdmFyIHBvaW50ZXJzID0gW107XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgaW5wdXQucG9pbnRlcnMubGVuZ3RoKSB7XG4gICAgICAgIHBvaW50ZXJzW2ldID0ge1xuICAgICAgICAgICAgY2xpZW50WDogcm91bmQoaW5wdXQucG9pbnRlcnNbaV0uY2xpZW50WCksXG4gICAgICAgICAgICBjbGllbnRZOiByb3VuZChpbnB1dC5wb2ludGVyc1tpXS5jbGllbnRZKVxuICAgICAgICB9O1xuICAgICAgICBpKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGltZVN0YW1wOiBub3coKSxcbiAgICAgICAgcG9pbnRlcnM6IHBvaW50ZXJzLFxuICAgICAgICBjZW50ZXI6IGdldENlbnRlcihwb2ludGVycyksXG4gICAgICAgIGRlbHRhWDogaW5wdXQuZGVsdGFYLFxuICAgICAgICBkZWx0YVk6IGlucHV0LmRlbHRhWVxuICAgIH07XG59XG5cbi8qKlxuICogZ2V0IHRoZSBjZW50ZXIgb2YgYWxsIHRoZSBwb2ludGVyc1xuICogQHBhcmFtIHtBcnJheX0gcG9pbnRlcnNcbiAqIEByZXR1cm4ge09iamVjdH0gY2VudGVyIGNvbnRhaW5zIGB4YCBhbmQgYHlgIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gZ2V0Q2VudGVyKHBvaW50ZXJzKSB7XG4gICAgdmFyIHBvaW50ZXJzTGVuZ3RoID0gcG9pbnRlcnMubGVuZ3RoO1xuXG4gICAgLy8gbm8gbmVlZCB0byBsb29wIHdoZW4gb25seSBvbmUgdG91Y2hcbiAgICBpZiAocG9pbnRlcnNMZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHJvdW5kKHBvaW50ZXJzWzBdLmNsaWVudFgpLFxuICAgICAgICAgICAgeTogcm91bmQocG9pbnRlcnNbMF0uY2xpZW50WSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgeCA9IDAsIHkgPSAwLCBpID0gMDtcbiAgICB3aGlsZSAoaSA8IHBvaW50ZXJzTGVuZ3RoKSB7XG4gICAgICAgIHggKz0gcG9pbnRlcnNbaV0uY2xpZW50WDtcbiAgICAgICAgeSArPSBwb2ludGVyc1tpXS5jbGllbnRZO1xuICAgICAgICBpKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogcm91bmQoeCAvIHBvaW50ZXJzTGVuZ3RoKSxcbiAgICAgICAgeTogcm91bmQoeSAvIHBvaW50ZXJzTGVuZ3RoKVxuICAgIH07XG59XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSB2ZWxvY2l0eSBiZXR3ZWVuIHR3byBwb2ludHMuIHVuaXQgaXMgaW4gcHggcGVyIG1zLlxuICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhVGltZVxuICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gKiBAcmV0dXJuIHtPYmplY3R9IHZlbG9jaXR5IGB4YCBhbmQgYHlgXG4gKi9cbmZ1bmN0aW9uIGdldFZlbG9jaXR5KGRlbHRhVGltZSwgeCwgeSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHg6IHggLyBkZWx0YVRpbWUgfHwgMCxcbiAgICAgICAgeTogeSAvIGRlbHRhVGltZSB8fCAwXG4gICAgfTtcbn1cblxuLyoqXG4gKiBnZXQgdGhlIGRpcmVjdGlvbiBiZXR3ZWVuIHR3byBwb2ludHNcbiAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gKiBAcGFyYW0ge051bWJlcn0geVxuICogQHJldHVybiB7TnVtYmVyfSBkaXJlY3Rpb25cbiAqL1xuZnVuY3Rpb24gZ2V0RGlyZWN0aW9uKHgsIHkpIHtcbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgICByZXR1cm4gRElSRUNUSU9OX05PTkU7XG4gICAgfVxuXG4gICAgaWYgKGFicyh4KSA+PSBhYnMoeSkpIHtcbiAgICAgICAgcmV0dXJuIHggPCAwID8gRElSRUNUSU9OX0xFRlQgOiBESVJFQ1RJT05fUklHSFQ7XG4gICAgfVxuICAgIHJldHVybiB5IDwgMCA/IERJUkVDVElPTl9VUCA6IERJUkVDVElPTl9ET1dOO1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgYWJzb2x1dGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gcG9pbnRzXG4gKiBAcGFyYW0ge09iamVjdH0gcDEge3gsIHl9XG4gKiBAcGFyYW0ge09iamVjdH0gcDIge3gsIHl9XG4gKiBAcGFyYW0ge0FycmF5fSBbcHJvcHNdIGNvbnRhaW5pbmcgeCBhbmQgeSBrZXlzXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IGRpc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIGdldERpc3RhbmNlKHAxLCBwMiwgcHJvcHMpIHtcbiAgICBpZiAoIXByb3BzKSB7XG4gICAgICAgIHByb3BzID0gUFJPUFNfWFk7XG4gICAgfVxuICAgIHZhciB4ID0gcDJbcHJvcHNbMF1dIC0gcDFbcHJvcHNbMF1dLFxuICAgICAgICB5ID0gcDJbcHJvcHNbMV1dIC0gcDFbcHJvcHNbMV1dO1xuXG4gICAgcmV0dXJuIE1hdGguc3FydCgoeCAqIHgpICsgKHkgKiB5KSk7XG59XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSBhbmdsZSBiZXR3ZWVuIHR3byBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IHAxXG4gKiBAcGFyYW0ge09iamVjdH0gcDJcbiAqIEBwYXJhbSB7QXJyYXl9IFtwcm9wc10gY29udGFpbmluZyB4IGFuZCB5IGtleXNcbiAqIEByZXR1cm4ge051bWJlcn0gYW5nbGVcbiAqL1xuZnVuY3Rpb24gZ2V0QW5nbGUocDEsIHAyLCBwcm9wcykge1xuICAgIGlmICghcHJvcHMpIHtcbiAgICAgICAgcHJvcHMgPSBQUk9QU19YWTtcbiAgICB9XG4gICAgdmFyIHggPSBwMltwcm9wc1swXV0gLSBwMVtwcm9wc1swXV0sXG4gICAgICAgIHkgPSBwMltwcm9wc1sxXV0gLSBwMVtwcm9wc1sxXV07XG4gICAgcmV0dXJuIE1hdGguYXRhbjIoeSwgeCkgKiAxODAgLyBNYXRoLlBJO1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgcm90YXRpb24gZGVncmVlcyBiZXR3ZWVuIHR3byBwb2ludGVyc2V0c1xuICogQHBhcmFtIHtBcnJheX0gc3RhcnQgYXJyYXkgb2YgcG9pbnRlcnNcbiAqIEBwYXJhbSB7QXJyYXl9IGVuZCBhcnJheSBvZiBwb2ludGVyc1xuICogQHJldHVybiB7TnVtYmVyfSByb3RhdGlvblxuICovXG5mdW5jdGlvbiBnZXRSb3RhdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGdldEFuZ2xlKGVuZFsxXSwgZW5kWzBdLCBQUk9QU19DTElFTlRfWFkpICsgZ2V0QW5nbGUoc3RhcnRbMV0sIHN0YXJ0WzBdLCBQUk9QU19DTElFTlRfWFkpO1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgc2NhbGUgZmFjdG9yIGJldHdlZW4gdHdvIHBvaW50ZXJzZXRzXG4gKiBubyBzY2FsZSBpcyAxLCBhbmQgZ29lcyBkb3duIHRvIDAgd2hlbiBwaW5jaGVkIHRvZ2V0aGVyLCBhbmQgYmlnZ2VyIHdoZW4gcGluY2hlZCBvdXRcbiAqIEBwYXJhbSB7QXJyYXl9IHN0YXJ0IGFycmF5IG9mIHBvaW50ZXJzXG4gKiBAcGFyYW0ge0FycmF5fSBlbmQgYXJyYXkgb2YgcG9pbnRlcnNcbiAqIEByZXR1cm4ge051bWJlcn0gc2NhbGVcbiAqL1xuZnVuY3Rpb24gZ2V0U2NhbGUoc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBnZXREaXN0YW5jZShlbmRbMF0sIGVuZFsxXSwgUFJPUFNfQ0xJRU5UX1hZKSAvIGdldERpc3RhbmNlKHN0YXJ0WzBdLCBzdGFydFsxXSwgUFJPUFNfQ0xJRU5UX1hZKTtcbn1cblxudmFyIE1PVVNFX0lOUFVUX01BUCA9IHtcbiAgICBtb3VzZWRvd246IElOUFVUX1NUQVJULFxuICAgIG1vdXNlbW92ZTogSU5QVVRfTU9WRSxcbiAgICBtb3VzZXVwOiBJTlBVVF9FTkRcbn07XG5cbnZhciBNT1VTRV9FTEVNRU5UX0VWRU5UUyA9ICdtb3VzZWRvd24nO1xudmFyIE1PVVNFX1dJTkRPV19FVkVOVFMgPSAnbW91c2Vtb3ZlIG1vdXNldXAnO1xuXG4vKipcbiAqIE1vdXNlIGV2ZW50cyBpbnB1dFxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5mdW5jdGlvbiBNb3VzZUlucHV0KCkge1xuICAgIHRoaXMuZXZFbCA9IE1PVVNFX0VMRU1FTlRfRVZFTlRTO1xuICAgIHRoaXMuZXZXaW4gPSBNT1VTRV9XSU5ET1dfRVZFTlRTO1xuXG4gICAgdGhpcy5wcmVzc2VkID0gZmFsc2U7IC8vIG1vdXNlZG93biBzdGF0ZVxuXG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChNb3VzZUlucHV0LCBJbnB1dCwge1xuICAgIC8qKlxuICAgICAqIGhhbmRsZSBtb3VzZSBldmVudHNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZcbiAgICAgKi9cbiAgICBoYW5kbGVyOiBmdW5jdGlvbiBNRWhhbmRsZXIoZXYpIHtcbiAgICAgICAgdmFyIGV2ZW50VHlwZSA9IE1PVVNFX0lOUFVUX01BUFtldi50eXBlXTtcblxuICAgICAgICAvLyBvbiBzdGFydCB3ZSB3YW50IHRvIGhhdmUgdGhlIGxlZnQgbW91c2UgYnV0dG9uIGRvd25cbiAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX1NUQVJUICYmIGV2LmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5wcmVzc2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9NT1ZFICYmIGV2LndoaWNoICE9PSAxKSB7XG4gICAgICAgICAgICBldmVudFR5cGUgPSBJTlBVVF9FTkQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtb3VzZSBtdXN0IGJlIGRvd25cbiAgICAgICAgaWYgKCF0aGlzLnByZXNzZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9FTkQpIHtcbiAgICAgICAgICAgIHRoaXMucHJlc3NlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLm1hbmFnZXIsIGV2ZW50VHlwZSwge1xuICAgICAgICAgICAgcG9pbnRlcnM6IFtldl0sXG4gICAgICAgICAgICBjaGFuZ2VkUG9pbnRlcnM6IFtldl0sXG4gICAgICAgICAgICBwb2ludGVyVHlwZTogSU5QVVRfVFlQRV9NT1VTRSxcbiAgICAgICAgICAgIHNyY0V2ZW50OiBldlxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxudmFyIFBPSU5URVJfSU5QVVRfTUFQID0ge1xuICAgIHBvaW50ZXJkb3duOiBJTlBVVF9TVEFSVCxcbiAgICBwb2ludGVybW92ZTogSU5QVVRfTU9WRSxcbiAgICBwb2ludGVydXA6IElOUFVUX0VORCxcbiAgICBwb2ludGVyY2FuY2VsOiBJTlBVVF9DQU5DRUwsXG4gICAgcG9pbnRlcm91dDogSU5QVVRfQ0FOQ0VMXG59O1xuXG4vLyBpbiBJRTEwIHRoZSBwb2ludGVyIHR5cGVzIGlzIGRlZmluZWQgYXMgYW4gZW51bVxudmFyIElFMTBfUE9JTlRFUl9UWVBFX0VOVU0gPSB7XG4gICAgMjogSU5QVVRfVFlQRV9UT1VDSCxcbiAgICAzOiBJTlBVVF9UWVBFX1BFTixcbiAgICA0OiBJTlBVVF9UWVBFX01PVVNFLFxuICAgIDU6IElOUFVUX1RZUEVfS0lORUNUIC8vIHNlZSBodHRwczovL3R3aXR0ZXIuY29tL2phY29icm9zc2kvc3RhdHVzLzQ4MDU5NjQzODQ4OTg5MDgxNlxufTtcblxudmFyIFBPSU5URVJfRUxFTUVOVF9FVkVOVFMgPSAncG9pbnRlcmRvd24nO1xudmFyIFBPSU5URVJfV0lORE9XX0VWRU5UUyA9ICdwb2ludGVybW92ZSBwb2ludGVydXAgcG9pbnRlcmNhbmNlbCc7XG5cbi8vIElFMTAgaGFzIHByZWZpeGVkIHN1cHBvcnQsIGFuZCBjYXNlLXNlbnNpdGl2ZVxuaWYgKHdpbmRvdy5NU1BvaW50ZXJFdmVudCAmJiAhd2luZG93LlBvaW50ZXJFdmVudCkge1xuICAgIFBPSU5URVJfRUxFTUVOVF9FVkVOVFMgPSAnTVNQb2ludGVyRG93bic7XG4gICAgUE9JTlRFUl9XSU5ET1dfRVZFTlRTID0gJ01TUG9pbnRlck1vdmUgTVNQb2ludGVyVXAgTVNQb2ludGVyQ2FuY2VsJztcbn1cblxuLyoqXG4gKiBQb2ludGVyIGV2ZW50cyBpbnB1dFxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5mdW5jdGlvbiBQb2ludGVyRXZlbnRJbnB1dCgpIHtcbiAgICB0aGlzLmV2RWwgPSBQT0lOVEVSX0VMRU1FTlRfRVZFTlRTO1xuICAgIHRoaXMuZXZXaW4gPSBQT0lOVEVSX1dJTkRPV19FVkVOVFM7XG5cbiAgICBJbnB1dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5zdG9yZSA9ICh0aGlzLm1hbmFnZXIuc2Vzc2lvbi5wb2ludGVyRXZlbnRzID0gW10pO1xufVxuXG5pbmhlcml0KFBvaW50ZXJFdmVudElucHV0LCBJbnB1dCwge1xuICAgIC8qKlxuICAgICAqIGhhbmRsZSBtb3VzZSBldmVudHNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZcbiAgICAgKi9cbiAgICBoYW5kbGVyOiBmdW5jdGlvbiBQRWhhbmRsZXIoZXYpIHtcbiAgICAgICAgdmFyIHN0b3JlID0gdGhpcy5zdG9yZTtcbiAgICAgICAgdmFyIHJlbW92ZVBvaW50ZXIgPSBmYWxzZTtcblxuICAgICAgICB2YXIgZXZlbnRUeXBlTm9ybWFsaXplZCA9IGV2LnR5cGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCdtcycsICcnKTtcbiAgICAgICAgdmFyIGV2ZW50VHlwZSA9IFBPSU5URVJfSU5QVVRfTUFQW2V2ZW50VHlwZU5vcm1hbGl6ZWRdO1xuICAgICAgICB2YXIgcG9pbnRlclR5cGUgPSBJRTEwX1BPSU5URVJfVFlQRV9FTlVNW2V2LnBvaW50ZXJUeXBlXSB8fCBldi5wb2ludGVyVHlwZTtcblxuICAgICAgICB2YXIgaXNUb3VjaCA9IChwb2ludGVyVHlwZSA9PSBJTlBVVF9UWVBFX1RPVUNIKTtcblxuICAgICAgICAvLyBnZXQgaW5kZXggb2YgdGhlIGV2ZW50IGluIHRoZSBzdG9yZVxuICAgICAgICB2YXIgc3RvcmVJbmRleCA9IGluQXJyYXkoc3RvcmUsIGV2LnBvaW50ZXJJZCwgJ3BvaW50ZXJJZCcpO1xuXG4gICAgICAgIC8vIHN0YXJ0IGFuZCBtb3VzZSBtdXN0IGJlIGRvd25cbiAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX1NUQVJUICYmIChldi5idXR0b24gPT09IDAgfHwgaXNUb3VjaCkpIHtcbiAgICAgICAgICAgIGlmIChzdG9yZUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHN0b3JlLnB1c2goZXYpO1xuICAgICAgICAgICAgICAgIHN0b3JlSW5kZXggPSBzdG9yZS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50VHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpKSB7XG4gICAgICAgICAgICByZW1vdmVQb2ludGVyID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGl0IG5vdCBmb3VuZCwgc28gdGhlIHBvaW50ZXIgaGFzbid0IGJlZW4gZG93biAoc28gaXQncyBwcm9iYWJseSBhIGhvdmVyKVxuICAgICAgICBpZiAoc3RvcmVJbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZXZlbnQgaW4gdGhlIHN0b3JlXG4gICAgICAgIHN0b3JlW3N0b3JlSW5kZXhdID0gZXY7XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLm1hbmFnZXIsIGV2ZW50VHlwZSwge1xuICAgICAgICAgICAgcG9pbnRlcnM6IHN0b3JlLFxuICAgICAgICAgICAgY2hhbmdlZFBvaW50ZXJzOiBbZXZdLFxuICAgICAgICAgICAgcG9pbnRlclR5cGU6IHBvaW50ZXJUeXBlLFxuICAgICAgICAgICAgc3JjRXZlbnQ6IGV2XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZW1vdmVQb2ludGVyKSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgZnJvbSB0aGUgc3RvcmVcbiAgICAgICAgICAgIHN0b3JlLnNwbGljZShzdG9yZUluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG52YXIgU0lOR0xFX1RPVUNIX0lOUFVUX01BUCA9IHtcbiAgICB0b3VjaHN0YXJ0OiBJTlBVVF9TVEFSVCxcbiAgICB0b3VjaG1vdmU6IElOUFVUX01PVkUsXG4gICAgdG91Y2hlbmQ6IElOUFVUX0VORCxcbiAgICB0b3VjaGNhbmNlbDogSU5QVVRfQ0FOQ0VMXG59O1xuXG52YXIgU0lOR0xFX1RPVUNIX1RBUkdFVF9FVkVOVFMgPSAndG91Y2hzdGFydCc7XG52YXIgU0lOR0xFX1RPVUNIX1dJTkRPV19FVkVOVFMgPSAndG91Y2hzdGFydCB0b3VjaG1vdmUgdG91Y2hlbmQgdG91Y2hjYW5jZWwnO1xuXG4vKipcbiAqIFRvdWNoIGV2ZW50cyBpbnB1dFxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5mdW5jdGlvbiBTaW5nbGVUb3VjaElucHV0KCkge1xuICAgIHRoaXMuZXZUYXJnZXQgPSBTSU5HTEVfVE9VQ0hfVEFSR0VUX0VWRU5UUztcbiAgICB0aGlzLmV2V2luID0gU0lOR0xFX1RPVUNIX1dJTkRPV19FVkVOVFM7XG4gICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG5cbiAgICBJbnB1dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFNpbmdsZVRvdWNoSW5wdXQsIElucHV0LCB7XG4gICAgaGFuZGxlcjogZnVuY3Rpb24gVEVoYW5kbGVyKGV2KSB7XG4gICAgICAgIHZhciB0eXBlID0gU0lOR0xFX1RPVUNIX0lOUFVUX01BUFtldi50eXBlXTtcblxuICAgICAgICAvLyBzaG91bGQgd2UgaGFuZGxlIHRoZSB0b3VjaCBldmVudHM/XG4gICAgICAgIGlmICh0eXBlID09PSBJTlBVVF9TVEFSVCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5zdGFydGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG91Y2hlcyA9IG5vcm1hbGl6ZVNpbmdsZVRvdWNoZXMuY2FsbCh0aGlzLCBldiwgdHlwZSk7XG5cbiAgICAgICAgLy8gd2hlbiBkb25lLCByZXNldCB0aGUgc3RhcnRlZCBzdGF0ZVxuICAgICAgICBpZiAodHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpICYmIHRvdWNoZXNbMF0ubGVuZ3RoIC0gdG91Y2hlc1sxXS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLm1hbmFnZXIsIHR5cGUsIHtcbiAgICAgICAgICAgIHBvaW50ZXJzOiB0b3VjaGVzWzBdLFxuICAgICAgICAgICAgY2hhbmdlZFBvaW50ZXJzOiB0b3VjaGVzWzFdLFxuICAgICAgICAgICAgcG9pbnRlclR5cGU6IElOUFVUX1RZUEVfVE9VQ0gsXG4gICAgICAgICAgICBzcmNFdmVudDogZXZcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogQHRoaXMge1RvdWNoSW5wdXR9XG4gKiBAcGFyYW0ge09iamVjdH0gZXZcbiAqIEBwYXJhbSB7TnVtYmVyfSB0eXBlIGZsYWdcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR8QXJyYXl9IFthbGwsIGNoYW5nZWRdXG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZVNpbmdsZVRvdWNoZXMoZXYsIHR5cGUpIHtcbiAgICB2YXIgYWxsID0gdG9BcnJheShldi50b3VjaGVzKTtcbiAgICB2YXIgY2hhbmdlZCA9IHRvQXJyYXkoZXYuY2hhbmdlZFRvdWNoZXMpO1xuXG4gICAgaWYgKHR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSkge1xuICAgICAgICBhbGwgPSB1bmlxdWVBcnJheShhbGwuY29uY2F0KGNoYW5nZWQpLCAnaWRlbnRpZmllcicsIHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiBbYWxsLCBjaGFuZ2VkXTtcbn1cblxudmFyIFRPVUNIX0lOUFVUX01BUCA9IHtcbiAgICB0b3VjaHN0YXJ0OiBJTlBVVF9TVEFSVCxcbiAgICB0b3VjaG1vdmU6IElOUFVUX01PVkUsXG4gICAgdG91Y2hlbmQ6IElOUFVUX0VORCxcbiAgICB0b3VjaGNhbmNlbDogSU5QVVRfQ0FOQ0VMXG59O1xuXG52YXIgVE9VQ0hfVEFSR0VUX0VWRU5UUyA9ICd0b3VjaHN0YXJ0IHRvdWNobW92ZSB0b3VjaGVuZCB0b3VjaGNhbmNlbCc7XG5cbi8qKlxuICogTXVsdGktdXNlciB0b3VjaCBldmVudHMgaW5wdXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuZnVuY3Rpb24gVG91Y2hJbnB1dCgpIHtcbiAgICB0aGlzLmV2VGFyZ2V0ID0gVE9VQ0hfVEFSR0VUX0VWRU5UUztcbiAgICB0aGlzLnRhcmdldElkcyA9IHt9O1xuXG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChUb3VjaElucHV0LCBJbnB1dCwge1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uIE1URWhhbmRsZXIoZXYpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBUT1VDSF9JTlBVVF9NQVBbZXYudHlwZV07XG4gICAgICAgIHZhciB0b3VjaGVzID0gZ2V0VG91Y2hlcy5jYWxsKHRoaXMsIGV2LCB0eXBlKTtcbiAgICAgICAgaWYgKCF0b3VjaGVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMubWFuYWdlciwgdHlwZSwge1xuICAgICAgICAgICAgcG9pbnRlcnM6IHRvdWNoZXNbMF0sXG4gICAgICAgICAgICBjaGFuZ2VkUG9pbnRlcnM6IHRvdWNoZXNbMV0sXG4gICAgICAgICAgICBwb2ludGVyVHlwZTogSU5QVVRfVFlQRV9UT1VDSCxcbiAgICAgICAgICAgIHNyY0V2ZW50OiBldlxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBAdGhpcyB7VG91Y2hJbnB1dH1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldlxuICogQHBhcmFtIHtOdW1iZXJ9IHR5cGUgZmxhZ1xuICogQHJldHVybnMge3VuZGVmaW5lZHxBcnJheX0gW2FsbCwgY2hhbmdlZF1cbiAqL1xuZnVuY3Rpb24gZ2V0VG91Y2hlcyhldiwgdHlwZSkge1xuICAgIHZhciBhbGxUb3VjaGVzID0gdG9BcnJheShldi50b3VjaGVzKTtcbiAgICB2YXIgdGFyZ2V0SWRzID0gdGhpcy50YXJnZXRJZHM7XG5cbiAgICAvLyB3aGVuIHRoZXJlIGlzIG9ubHkgb25lIHRvdWNoLCB0aGUgcHJvY2VzcyBjYW4gYmUgc2ltcGxpZmllZFxuICAgIGlmICh0eXBlICYgKElOUFVUX1NUQVJUIHwgSU5QVVRfTU9WRSkgJiYgYWxsVG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdGFyZ2V0SWRzW2FsbFRvdWNoZXNbMF0uaWRlbnRpZmllcl0gPSB0cnVlO1xuICAgICAgICByZXR1cm4gW2FsbFRvdWNoZXMsIGFsbFRvdWNoZXNdO1xuICAgIH1cblxuICAgIHZhciBpLFxuICAgICAgICB0YXJnZXRUb3VjaGVzLFxuICAgICAgICBjaGFuZ2VkVG91Y2hlcyA9IHRvQXJyYXkoZXYuY2hhbmdlZFRvdWNoZXMpLFxuICAgICAgICBjaGFuZ2VkVGFyZ2V0VG91Y2hlcyA9IFtdLFxuICAgICAgICB0YXJnZXQgPSB0aGlzLnRhcmdldDtcblxuICAgIC8vIGdldCB0YXJnZXQgdG91Y2hlcyBmcm9tIHRvdWNoZXNcbiAgICB0YXJnZXRUb3VjaGVzID0gYWxsVG91Y2hlcy5maWx0ZXIoZnVuY3Rpb24odG91Y2gpIHtcbiAgICAgICAgcmV0dXJuIGhhc1BhcmVudCh0b3VjaC50YXJnZXQsIHRhcmdldCk7XG4gICAgfSk7XG5cbiAgICAvLyBjb2xsZWN0IHRvdWNoZXNcbiAgICBpZiAodHlwZSA9PT0gSU5QVVRfU1RBUlQpIHtcbiAgICAgICAgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgdGFyZ2V0VG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRhcmdldElkc1t0YXJnZXRUb3VjaGVzW2ldLmlkZW50aWZpZXJdID0gdHJ1ZTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZpbHRlciBjaGFuZ2VkIHRvdWNoZXMgdG8gb25seSBjb250YWluIHRvdWNoZXMgdGhhdCBleGlzdCBpbiB0aGUgY29sbGVjdGVkIHRhcmdldCBpZHNcbiAgICBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGNoYW5nZWRUb3VjaGVzLmxlbmd0aCkge1xuICAgICAgICBpZiAodGFyZ2V0SWRzW2NoYW5nZWRUb3VjaGVzW2ldLmlkZW50aWZpZXJdKSB7XG4gICAgICAgICAgICBjaGFuZ2VkVGFyZ2V0VG91Y2hlcy5wdXNoKGNoYW5nZWRUb3VjaGVzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNsZWFudXAgcmVtb3ZlZCB0b3VjaGVzXG4gICAgICAgIGlmICh0eXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0YXJnZXRJZHNbY2hhbmdlZFRvdWNoZXNbaV0uaWRlbnRpZmllcl07XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgIH1cblxuICAgIGlmICghY2hhbmdlZFRhcmdldFRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm4gW1xuICAgICAgICAvLyBtZXJnZSB0YXJnZXRUb3VjaGVzIHdpdGggY2hhbmdlZFRhcmdldFRvdWNoZXMgc28gaXQgY29udGFpbnMgQUxMIHRvdWNoZXMsIGluY2x1ZGluZyAnZW5kJyBhbmQgJ2NhbmNlbCdcbiAgICAgICAgdW5pcXVlQXJyYXkodGFyZ2V0VG91Y2hlcy5jb25jYXQoY2hhbmdlZFRhcmdldFRvdWNoZXMpLCAnaWRlbnRpZmllcicsIHRydWUpLFxuICAgICAgICBjaGFuZ2VkVGFyZ2V0VG91Y2hlc1xuICAgIF07XG59XG5cbi8qKlxuICogQ29tYmluZWQgdG91Y2ggYW5kIG1vdXNlIGlucHV0XG4gKlxuICogVG91Y2ggaGFzIGEgaGlnaGVyIHByaW9yaXR5IHRoZW4gbW91c2UsIGFuZCB3aGlsZSB0b3VjaGluZyBubyBtb3VzZSBldmVudHMgYXJlIGFsbG93ZWQuXG4gKiBUaGlzIGJlY2F1c2UgdG91Y2ggZGV2aWNlcyBhbHNvIGVtaXQgbW91c2UgZXZlbnRzIHdoaWxlIGRvaW5nIGEgdG91Y2guXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5cbnZhciBERURVUF9USU1FT1VUID0gMjUwMDtcbnZhciBERURVUF9ESVNUQU5DRSA9IDI1O1xuXG5mdW5jdGlvbiBUb3VjaE1vdXNlSW5wdXQoKSB7XG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHZhciBoYW5kbGVyID0gYmluZEZuKHRoaXMuaGFuZGxlciwgdGhpcyk7XG4gICAgdGhpcy50b3VjaCA9IG5ldyBUb3VjaElucHV0KHRoaXMubWFuYWdlciwgaGFuZGxlcik7XG4gICAgdGhpcy5tb3VzZSA9IG5ldyBNb3VzZUlucHV0KHRoaXMubWFuYWdlciwgaGFuZGxlcik7XG5cbiAgICB0aGlzLnByaW1hcnlUb3VjaCA9IG51bGw7XG4gICAgdGhpcy5sYXN0VG91Y2hlcyA9IFtdO1xufVxuXG5pbmhlcml0KFRvdWNoTW91c2VJbnB1dCwgSW5wdXQsIHtcbiAgICAvKipcbiAgICAgKiBoYW5kbGUgbW91c2UgYW5kIHRvdWNoIGV2ZW50c1xuICAgICAqIEBwYXJhbSB7SGFtbWVyfSBtYW5hZ2VyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlucHV0RXZlbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXREYXRhXG4gICAgICovXG4gICAgaGFuZGxlcjogZnVuY3Rpb24gVE1FaGFuZGxlcihtYW5hZ2VyLCBpbnB1dEV2ZW50LCBpbnB1dERhdGEpIHtcbiAgICAgICAgdmFyIGlzVG91Y2ggPSAoaW5wdXREYXRhLnBvaW50ZXJUeXBlID09IElOUFVUX1RZUEVfVE9VQ0gpLFxuICAgICAgICAgICAgaXNNb3VzZSA9IChpbnB1dERhdGEucG9pbnRlclR5cGUgPT0gSU5QVVRfVFlQRV9NT1VTRSk7XG5cbiAgICAgICAgaWYgKGlzTW91c2UgJiYgaW5wdXREYXRhLnNvdXJjZUNhcGFiaWxpdGllcyAmJiBpbnB1dERhdGEuc291cmNlQ2FwYWJpbGl0aWVzLmZpcmVzVG91Y2hFdmVudHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdoZW4gd2UncmUgaW4gYSB0b3VjaCBldmVudCwgcmVjb3JkIHRvdWNoZXMgdG8gIGRlLWR1cGUgc3ludGhldGljIG1vdXNlIGV2ZW50XG4gICAgICAgIGlmIChpc1RvdWNoKSB7XG4gICAgICAgICAgICByZWNvcmRUb3VjaGVzLmNhbGwodGhpcywgaW5wdXRFdmVudCwgaW5wdXREYXRhKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc01vdXNlICYmIGlzU3ludGhldGljRXZlbnQuY2FsbCh0aGlzLCBpbnB1dERhdGEpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGxiYWNrKG1hbmFnZXIsIGlucHV0RXZlbnQsIGlucHV0RGF0YSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJlbW92ZSB0aGUgZXZlbnQgbGlzdGVuZXJzXG4gICAgICovXG4gICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy50b3VjaC5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMubW91c2UuZGVzdHJveSgpO1xuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiByZWNvcmRUb3VjaGVzKGV2ZW50VHlwZSwgZXZlbnREYXRhKSB7XG4gICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX1NUQVJUKSB7XG4gICAgICAgIHRoaXMucHJpbWFyeVRvdWNoID0gZXZlbnREYXRhLmNoYW5nZWRQb2ludGVyc1swXS5pZGVudGlmaWVyO1xuICAgICAgICBzZXRMYXN0VG91Y2guY2FsbCh0aGlzLCBldmVudERhdGEpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnRUeXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkpIHtcbiAgICAgICAgc2V0TGFzdFRvdWNoLmNhbGwodGhpcywgZXZlbnREYXRhKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldExhc3RUb3VjaChldmVudERhdGEpIHtcbiAgICB2YXIgdG91Y2ggPSBldmVudERhdGEuY2hhbmdlZFBvaW50ZXJzWzBdO1xuXG4gICAgaWYgKHRvdWNoLmlkZW50aWZpZXIgPT09IHRoaXMucHJpbWFyeVRvdWNoKSB7XG4gICAgICAgIHZhciBsYXN0VG91Y2ggPSB7eDogdG91Y2guY2xpZW50WCwgeTogdG91Y2guY2xpZW50WX07XG4gICAgICAgIHRoaXMubGFzdFRvdWNoZXMucHVzaChsYXN0VG91Y2gpO1xuICAgICAgICB2YXIgbHRzID0gdGhpcy5sYXN0VG91Y2hlcztcbiAgICAgICAgdmFyIHJlbW92ZUxhc3RUb3VjaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGkgPSBsdHMuaW5kZXhPZihsYXN0VG91Y2gpO1xuICAgICAgICAgICAgaWYgKGkgPiAtMSkge1xuICAgICAgICAgICAgICAgIGx0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHNldFRpbWVvdXQocmVtb3ZlTGFzdFRvdWNoLCBERURVUF9USU1FT1VUKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzU3ludGhldGljRXZlbnQoZXZlbnREYXRhKSB7XG4gICAgdmFyIHggPSBldmVudERhdGEuc3JjRXZlbnQuY2xpZW50WCwgeSA9IGV2ZW50RGF0YS5zcmNFdmVudC5jbGllbnRZO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sYXN0VG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdCA9IHRoaXMubGFzdFRvdWNoZXNbaV07XG4gICAgICAgIHZhciBkeCA9IE1hdGguYWJzKHggLSB0LngpLCBkeSA9IE1hdGguYWJzKHkgLSB0LnkpO1xuICAgICAgICBpZiAoZHggPD0gREVEVVBfRElTVEFOQ0UgJiYgZHkgPD0gREVEVVBfRElTVEFOQ0UpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxudmFyIFBSRUZJWEVEX1RPVUNIX0FDVElPTiA9IHByZWZpeGVkKFRFU1RfRUxFTUVOVC5zdHlsZSwgJ3RvdWNoQWN0aW9uJyk7XG52YXIgTkFUSVZFX1RPVUNIX0FDVElPTiA9IFBSRUZJWEVEX1RPVUNIX0FDVElPTiAhPT0gdW5kZWZpbmVkO1xuXG4vLyBtYWdpY2FsIHRvdWNoQWN0aW9uIHZhbHVlXG52YXIgVE9VQ0hfQUNUSU9OX0NPTVBVVEUgPSAnY29tcHV0ZSc7XG52YXIgVE9VQ0hfQUNUSU9OX0FVVE8gPSAnYXV0byc7XG52YXIgVE9VQ0hfQUNUSU9OX01BTklQVUxBVElPTiA9ICdtYW5pcHVsYXRpb24nOyAvLyBub3QgaW1wbGVtZW50ZWRcbnZhciBUT1VDSF9BQ1RJT05fTk9ORSA9ICdub25lJztcbnZhciBUT1VDSF9BQ1RJT05fUEFOX1ggPSAncGFuLXgnO1xudmFyIFRPVUNIX0FDVElPTl9QQU5fWSA9ICdwYW4teSc7XG52YXIgVE9VQ0hfQUNUSU9OX01BUCA9IGdldFRvdWNoQWN0aW9uUHJvcHMoKTtcblxuLyoqXG4gKiBUb3VjaCBBY3Rpb25cbiAqIHNldHMgdGhlIHRvdWNoQWN0aW9uIHByb3BlcnR5IG9yIHVzZXMgdGhlIGpzIGFsdGVybmF0aXZlXG4gKiBAcGFyYW0ge01hbmFnZXJ9IG1hbmFnZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFRvdWNoQWN0aW9uKG1hbmFnZXIsIHZhbHVlKSB7XG4gICAgdGhpcy5tYW5hZ2VyID0gbWFuYWdlcjtcbiAgICB0aGlzLnNldCh2YWx1ZSk7XG59XG5cblRvdWNoQWN0aW9uLnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBzZXQgdGhlIHRvdWNoQWN0aW9uIHZhbHVlIG9uIHRoZSBlbGVtZW50IG9yIGVuYWJsZSB0aGUgcG9seWZpbGxcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIC8vIGZpbmQgb3V0IHRoZSB0b3VjaC1hY3Rpb24gYnkgdGhlIGV2ZW50IGhhbmRsZXJzXG4gICAgICAgIGlmICh2YWx1ZSA9PSBUT1VDSF9BQ1RJT05fQ09NUFVURSkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmNvbXB1dGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChOQVRJVkVfVE9VQ0hfQUNUSU9OICYmIHRoaXMubWFuYWdlci5lbGVtZW50LnN0eWxlICYmIFRPVUNIX0FDVElPTl9NQVBbdmFsdWVdKSB7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZWxlbWVudC5zdHlsZVtQUkVGSVhFRF9UT1VDSF9BQ1RJT05dID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hY3Rpb25zID0gdmFsdWUudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGp1c3QgcmUtc2V0IHRoZSB0b3VjaEFjdGlvbiB2YWx1ZVxuICAgICAqL1xuICAgIHVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2V0KHRoaXMubWFuYWdlci5vcHRpb25zLnRvdWNoQWN0aW9uKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogY29tcHV0ZSB0aGUgdmFsdWUgZm9yIHRoZSB0b3VjaEFjdGlvbiBwcm9wZXJ0eSBiYXNlZCBvbiB0aGUgcmVjb2duaXplcidzIHNldHRpbmdzXG4gICAgICogQHJldHVybnMge1N0cmluZ30gdmFsdWVcbiAgICAgKi9cbiAgICBjb21wdXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFjdGlvbnMgPSBbXTtcbiAgICAgICAgZWFjaCh0aGlzLm1hbmFnZXIucmVjb2duaXplcnMsIGZ1bmN0aW9uKHJlY29nbml6ZXIpIHtcbiAgICAgICAgICAgIGlmIChib29sT3JGbihyZWNvZ25pemVyLm9wdGlvbnMuZW5hYmxlLCBbcmVjb2duaXplcl0pKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9ucyA9IGFjdGlvbnMuY29uY2F0KHJlY29nbml6ZXIuZ2V0VG91Y2hBY3Rpb24oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY2xlYW5Ub3VjaEFjdGlvbnMoYWN0aW9ucy5qb2luKCcgJykpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB0aGlzIG1ldGhvZCBpcyBjYWxsZWQgb24gZWFjaCBpbnB1dCBjeWNsZSBhbmQgcHJvdmlkZXMgdGhlIHByZXZlbnRpbmcgb2YgdGhlIGJyb3dzZXIgYmVoYXZpb3JcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKi9cbiAgICBwcmV2ZW50RGVmYXVsdHM6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBzcmNFdmVudCA9IGlucHV0LnNyY0V2ZW50O1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gaW5wdXQub2Zmc2V0RGlyZWN0aW9uO1xuXG4gICAgICAgIC8vIGlmIHRoZSB0b3VjaCBhY3Rpb24gZGlkIHByZXZlbnRlZCBvbmNlIHRoaXMgc2Vzc2lvblxuICAgICAgICBpZiAodGhpcy5tYW5hZ2VyLnNlc3Npb24ucHJldmVudGVkKSB7XG4gICAgICAgICAgICBzcmNFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFjdGlvbnMgPSB0aGlzLmFjdGlvbnM7XG4gICAgICAgIHZhciBoYXNOb25lID0gaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX05PTkUpICYmICFUT1VDSF9BQ1RJT05fTUFQW1RPVUNIX0FDVElPTl9OT05FXTtcbiAgICAgICAgdmFyIGhhc1BhblkgPSBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fUEFOX1kpICYmICFUT1VDSF9BQ1RJT05fTUFQW1RPVUNIX0FDVElPTl9QQU5fWV07XG4gICAgICAgIHZhciBoYXNQYW5YID0gaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX1BBTl9YKSAmJiAhVE9VQ0hfQUNUSU9OX01BUFtUT1VDSF9BQ1RJT05fUEFOX1hdO1xuXG4gICAgICAgIGlmIChoYXNOb25lKSB7XG4gICAgICAgICAgICAvL2RvIG5vdCBwcmV2ZW50IGRlZmF1bHRzIGlmIHRoaXMgaXMgYSB0YXAgZ2VzdHVyZVxuXG4gICAgICAgICAgICB2YXIgaXNUYXBQb2ludGVyID0gaW5wdXQucG9pbnRlcnMubGVuZ3RoID09PSAxO1xuICAgICAgICAgICAgdmFyIGlzVGFwTW92ZW1lbnQgPSBpbnB1dC5kaXN0YW5jZSA8IDI7XG4gICAgICAgICAgICB2YXIgaXNUYXBUb3VjaFRpbWUgPSBpbnB1dC5kZWx0YVRpbWUgPCAyNTA7XG5cbiAgICAgICAgICAgIGlmIChpc1RhcFBvaW50ZXIgJiYgaXNUYXBNb3ZlbWVudCAmJiBpc1RhcFRvdWNoVGltZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNQYW5YICYmIGhhc1BhblkpIHtcbiAgICAgICAgICAgIC8vIGBwYW4teCBwYW4teWAgbWVhbnMgYnJvd3NlciBoYW5kbGVzIGFsbCBzY3JvbGxpbmcvcGFubmluZywgZG8gbm90IHByZXZlbnRcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNOb25lIHx8XG4gICAgICAgICAgICAoaGFzUGFuWSAmJiBkaXJlY3Rpb24gJiBESVJFQ1RJT05fSE9SSVpPTlRBTCkgfHxcbiAgICAgICAgICAgIChoYXNQYW5YICYmIGRpcmVjdGlvbiAmIERJUkVDVElPTl9WRVJUSUNBTCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXZlbnRTcmMoc3JjRXZlbnQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNhbGwgcHJldmVudERlZmF1bHQgdG8gcHJldmVudCB0aGUgYnJvd3NlcidzIGRlZmF1bHQgYmVoYXZpb3IgKHNjcm9sbGluZyBpbiBtb3N0IGNhc2VzKVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzcmNFdmVudFxuICAgICAqL1xuICAgIHByZXZlbnRTcmM6IGZ1bmN0aW9uKHNyY0V2ZW50KSB7XG4gICAgICAgIHRoaXMubWFuYWdlci5zZXNzaW9uLnByZXZlbnRlZCA9IHRydWU7XG4gICAgICAgIHNyY0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufTtcblxuLyoqXG4gKiB3aGVuIHRoZSB0b3VjaEFjdGlvbnMgYXJlIGNvbGxlY3RlZCB0aGV5IGFyZSBub3QgYSB2YWxpZCB2YWx1ZSwgc28gd2UgbmVlZCB0byBjbGVhbiB0aGluZ3MgdXAuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gY2xlYW5Ub3VjaEFjdGlvbnMoYWN0aW9ucykge1xuICAgIC8vIG5vbmVcbiAgICBpZiAoaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX05PTkUpKSB7XG4gICAgICAgIHJldHVybiBUT1VDSF9BQ1RJT05fTk9ORTtcbiAgICB9XG5cbiAgICB2YXIgaGFzUGFuWCA9IGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9QQU5fWCk7XG4gICAgdmFyIGhhc1BhblkgPSBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fUEFOX1kpO1xuXG4gICAgLy8gaWYgYm90aCBwYW4teCBhbmQgcGFuLXkgYXJlIHNldCAoZGlmZmVyZW50IHJlY29nbml6ZXJzXG4gICAgLy8gZm9yIGRpZmZlcmVudCBkaXJlY3Rpb25zLCBlLmcuIGhvcml6b250YWwgcGFuIGJ1dCB2ZXJ0aWNhbCBzd2lwZT8pXG4gICAgLy8gd2UgbmVlZCBub25lIChhcyBvdGhlcndpc2Ugd2l0aCBwYW4teCBwYW4teSBjb21iaW5lZCBub25lIG9mIHRoZXNlXG4gICAgLy8gcmVjb2duaXplcnMgd2lsbCB3b3JrLCBzaW5jZSB0aGUgYnJvd3NlciB3b3VsZCBoYW5kbGUgYWxsIHBhbm5pbmdcbiAgICBpZiAoaGFzUGFuWCAmJiBoYXNQYW5ZKSB7XG4gICAgICAgIHJldHVybiBUT1VDSF9BQ1RJT05fTk9ORTtcbiAgICB9XG5cbiAgICAvLyBwYW4teCBPUiBwYW4teVxuICAgIGlmIChoYXNQYW5YIHx8IGhhc1BhblkpIHtcbiAgICAgICAgcmV0dXJuIGhhc1BhblggPyBUT1VDSF9BQ1RJT05fUEFOX1ggOiBUT1VDSF9BQ1RJT05fUEFOX1k7XG4gICAgfVxuXG4gICAgLy8gbWFuaXB1bGF0aW9uXG4gICAgaWYgKGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9NQU5JUFVMQVRJT04pKSB7XG4gICAgICAgIHJldHVybiBUT1VDSF9BQ1RJT05fTUFOSVBVTEFUSU9OO1xuICAgIH1cblxuICAgIHJldHVybiBUT1VDSF9BQ1RJT05fQVVUTztcbn1cblxuZnVuY3Rpb24gZ2V0VG91Y2hBY3Rpb25Qcm9wcygpIHtcbiAgICBpZiAoIU5BVElWRV9UT1VDSF9BQ1RJT04pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgdG91Y2hNYXAgPSB7fTtcbiAgICB2YXIgY3NzU3VwcG9ydHMgPSB3aW5kb3cuQ1NTICYmIHdpbmRvdy5DU1Muc3VwcG9ydHM7XG4gICAgWydhdXRvJywgJ21hbmlwdWxhdGlvbicsICdwYW4teScsICdwYW4teCcsICdwYW4teCBwYW4teScsICdub25lJ10uZm9yRWFjaChmdW5jdGlvbih2YWwpIHtcblxuICAgICAgICAvLyBJZiBjc3Muc3VwcG9ydHMgaXMgbm90IHN1cHBvcnRlZCBidXQgdGhlcmUgaXMgbmF0aXZlIHRvdWNoLWFjdGlvbiBhc3N1bWUgaXQgc3VwcG9ydHNcbiAgICAgICAgLy8gYWxsIHZhbHVlcy4gVGhpcyBpcyB0aGUgY2FzZSBmb3IgSUUgMTAgYW5kIDExLlxuICAgICAgICB0b3VjaE1hcFt2YWxdID0gY3NzU3VwcG9ydHMgPyB3aW5kb3cuQ1NTLnN1cHBvcnRzKCd0b3VjaC1hY3Rpb24nLCB2YWwpIDogdHJ1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gdG91Y2hNYXA7XG59XG5cbi8qKlxuICogUmVjb2duaXplciBmbG93IGV4cGxhaW5lZDsgKlxuICogQWxsIHJlY29nbml6ZXJzIGhhdmUgdGhlIGluaXRpYWwgc3RhdGUgb2YgUE9TU0lCTEUgd2hlbiBhIGlucHV0IHNlc3Npb24gc3RhcnRzLlxuICogVGhlIGRlZmluaXRpb24gb2YgYSBpbnB1dCBzZXNzaW9uIGlzIGZyb20gdGhlIGZpcnN0IGlucHV0IHVudGlsIHRoZSBsYXN0IGlucHV0LCB3aXRoIGFsbCBpdCdzIG1vdmVtZW50IGluIGl0LiAqXG4gKiBFeGFtcGxlIHNlc3Npb24gZm9yIG1vdXNlLWlucHV0OiBtb3VzZWRvd24gLT4gbW91c2Vtb3ZlIC0+IG1vdXNldXBcbiAqXG4gKiBPbiBlYWNoIHJlY29nbml6aW5nIGN5Y2xlIChzZWUgTWFuYWdlci5yZWNvZ25pemUpIHRoZSAucmVjb2duaXplKCkgbWV0aG9kIGlzIGV4ZWN1dGVkXG4gKiB3aGljaCBkZXRlcm1pbmVzIHdpdGggc3RhdGUgaXQgc2hvdWxkIGJlLlxuICpcbiAqIElmIHRoZSByZWNvZ25pemVyIGhhcyB0aGUgc3RhdGUgRkFJTEVELCBDQU5DRUxMRUQgb3IgUkVDT0dOSVpFRCAoZXF1YWxzIEVOREVEKSwgaXQgaXMgcmVzZXQgdG9cbiAqIFBPU1NJQkxFIHRvIGdpdmUgaXQgYW5vdGhlciBjaGFuZ2Ugb24gdGhlIG5leHQgY3ljbGUuXG4gKlxuICogICAgICAgICAgICAgICBQb3NzaWJsZVxuICogICAgICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAgICstLS0tLSstLS0tLS0tLS0tLS0tLS0rXG4gKiAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgICAgICstLS0tLSstLS0tLSsgICAgICAgICAgICAgICB8XG4gKiAgICAgIHwgICAgICAgICAgIHwgICAgICAgICAgICAgICB8XG4gKiAgIEZhaWxlZCAgICAgIENhbmNlbGxlZCAgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgKy0tLS0tLS0rLS0tLS0tK1xuICogICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICAgIFJlY29nbml6ZWQgICAgICAgQmVnYW5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2hhbmdlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVuZGVkL1JlY29nbml6ZWRcbiAqL1xudmFyIFNUQVRFX1BPU1NJQkxFID0gMTtcbnZhciBTVEFURV9CRUdBTiA9IDI7XG52YXIgU1RBVEVfQ0hBTkdFRCA9IDQ7XG52YXIgU1RBVEVfRU5ERUQgPSA4O1xudmFyIFNUQVRFX1JFQ09HTklaRUQgPSBTVEFURV9FTkRFRDtcbnZhciBTVEFURV9DQU5DRUxMRUQgPSAxNjtcbnZhciBTVEFURV9GQUlMRUQgPSAzMjtcblxuLyoqXG4gKiBSZWNvZ25pemVyXG4gKiBFdmVyeSByZWNvZ25pemVyIG5lZWRzIHRvIGV4dGVuZCBmcm9tIHRoaXMgY2xhc3MuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIFJlY29nbml6ZXIob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IGFzc2lnbih7fSwgdGhpcy5kZWZhdWx0cywgb3B0aW9ucyB8fCB7fSk7XG5cbiAgICB0aGlzLmlkID0gdW5pcXVlSWQoKTtcblxuICAgIHRoaXMubWFuYWdlciA9IG51bGw7XG5cbiAgICAvLyBkZWZhdWx0IGlzIGVuYWJsZSB0cnVlXG4gICAgdGhpcy5vcHRpb25zLmVuYWJsZSA9IGlmVW5kZWZpbmVkKHRoaXMub3B0aW9ucy5lbmFibGUsIHRydWUpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IFNUQVRFX1BPU1NJQkxFO1xuXG4gICAgdGhpcy5zaW11bHRhbmVvdXMgPSB7fTtcbiAgICB0aGlzLnJlcXVpcmVGYWlsID0gW107XG59XG5cblJlY29nbml6ZXIucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICBkZWZhdWx0czoge30sXG5cbiAgICAvKipcbiAgICAgKiBzZXQgb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHJldHVybiB7UmVjb2duaXplcn1cbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgYXNzaWduKHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgICAgLy8gYWxzbyB1cGRhdGUgdGhlIHRvdWNoQWN0aW9uLCBpbiBjYXNlIHNvbWV0aGluZyBjaGFuZ2VkIGFib3V0IHRoZSBkaXJlY3Rpb25zL2VuYWJsZWQgc3RhdGVcbiAgICAgICAgdGhpcy5tYW5hZ2VyICYmIHRoaXMubWFuYWdlci50b3VjaEFjdGlvbi51cGRhdGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJlY29nbml6ZSBzaW11bHRhbmVvdXMgd2l0aCBhbiBvdGhlciByZWNvZ25pemVyLlxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICByZWNvZ25pemVXaXRoOiBmdW5jdGlvbihvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKG90aGVyUmVjb2duaXplciwgJ3JlY29nbml6ZVdpdGgnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2ltdWx0YW5lb3VzID0gdGhpcy5zaW11bHRhbmVvdXM7XG4gICAgICAgIG90aGVyUmVjb2duaXplciA9IGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCB0aGlzKTtcbiAgICAgICAgaWYgKCFzaW11bHRhbmVvdXNbb3RoZXJSZWNvZ25pemVyLmlkXSkge1xuICAgICAgICAgICAgc2ltdWx0YW5lb3VzW290aGVyUmVjb2duaXplci5pZF0gPSBvdGhlclJlY29nbml6ZXI7XG4gICAgICAgICAgICBvdGhlclJlY29nbml6ZXIucmVjb2duaXplV2l0aCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZHJvcCB0aGUgc2ltdWx0YW5lb3VzIGxpbmsuIGl0IGRvZXNudCByZW1vdmUgdGhlIGxpbmsgb24gdGhlIG90aGVyIHJlY29nbml6ZXIuXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcn0gdGhpc1xuICAgICAqL1xuICAgIGRyb3BSZWNvZ25pemVXaXRoOiBmdW5jdGlvbihvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKG90aGVyUmVjb2duaXplciwgJ2Ryb3BSZWNvZ25pemVXaXRoJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgb3RoZXJSZWNvZ25pemVyID0gZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlcihvdGhlclJlY29nbml6ZXIsIHRoaXMpO1xuICAgICAgICBkZWxldGUgdGhpcy5zaW11bHRhbmVvdXNbb3RoZXJSZWNvZ25pemVyLmlkXTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJlY29nbml6ZXIgY2FuIG9ubHkgcnVuIHdoZW4gYW4gb3RoZXIgaXMgZmFpbGluZ1xuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICByZXF1aXJlRmFpbHVyZTogZnVuY3Rpb24ob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhvdGhlclJlY29nbml6ZXIsICdyZXF1aXJlRmFpbHVyZScsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXF1aXJlRmFpbCA9IHRoaXMucmVxdWlyZUZhaWw7XG4gICAgICAgIG90aGVyUmVjb2duaXplciA9IGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCB0aGlzKTtcbiAgICAgICAgaWYgKGluQXJyYXkocmVxdWlyZUZhaWwsIG90aGVyUmVjb2duaXplcikgPT09IC0xKSB7XG4gICAgICAgICAgICByZXF1aXJlRmFpbC5wdXNoKG90aGVyUmVjb2duaXplcik7XG4gICAgICAgICAgICBvdGhlclJlY29nbml6ZXIucmVxdWlyZUZhaWx1cmUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGRyb3AgdGhlIHJlcXVpcmVGYWlsdXJlIGxpbmsuIGl0IGRvZXMgbm90IHJlbW92ZSB0aGUgbGluayBvbiB0aGUgb3RoZXIgcmVjb2duaXplci5cbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfSB0aGlzXG4gICAgICovXG4gICAgZHJvcFJlcXVpcmVGYWlsdXJlOiBmdW5jdGlvbihvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKG90aGVyUmVjb2duaXplciwgJ2Ryb3BSZXF1aXJlRmFpbHVyZScsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIG90aGVyUmVjb2duaXplciA9IGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCB0aGlzKTtcbiAgICAgICAgdmFyIGluZGV4ID0gaW5BcnJheSh0aGlzLnJlcXVpcmVGYWlsLCBvdGhlclJlY29nbml6ZXIpO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5yZXF1aXJlRmFpbC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBoYXMgcmVxdWlyZSBmYWlsdXJlcyBib29sZWFuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaGFzUmVxdWlyZUZhaWx1cmVzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWlyZUZhaWwubGVuZ3RoID4gMDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogaWYgdGhlIHJlY29nbml6ZXIgY2FuIHJlY29nbml6ZSBzaW11bHRhbmVvdXMgd2l0aCBhbiBvdGhlciByZWNvZ25pemVyXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBjYW5SZWNvZ25pemVXaXRoOiBmdW5jdGlvbihvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5zaW11bHRhbmVvdXNbb3RoZXJSZWNvZ25pemVyLmlkXTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogWW91IHNob3VsZCB1c2UgYHRyeUVtaXRgIGluc3RlYWQgb2YgYGVtaXRgIGRpcmVjdGx5IHRvIGNoZWNrXG4gICAgICogdGhhdCBhbGwgdGhlIG5lZWRlZCByZWNvZ25pemVycyBoYXMgZmFpbGVkIGJlZm9yZSBlbWl0dGluZy5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKi9cbiAgICBlbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgZnVuY3Rpb24gZW1pdChldmVudCkge1xuICAgICAgICAgICAgc2VsZi5tYW5hZ2VyLmVtaXQoZXZlbnQsIGlucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vICdwYW5zdGFydCcgYW5kICdwYW5tb3ZlJ1xuICAgICAgICBpZiAoc3RhdGUgPCBTVEFURV9FTkRFRCkge1xuICAgICAgICAgICAgZW1pdChzZWxmLm9wdGlvbnMuZXZlbnQgKyBzdGF0ZVN0cihzdGF0ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZW1pdChzZWxmLm9wdGlvbnMuZXZlbnQpOyAvLyBzaW1wbGUgJ2V2ZW50TmFtZScgZXZlbnRzXG5cbiAgICAgICAgaWYgKGlucHV0LmFkZGl0aW9uYWxFdmVudCkgeyAvLyBhZGRpdGlvbmFsIGV2ZW50KHBhbmxlZnQsIHBhbnJpZ2h0LCBwaW5jaGluLCBwaW5jaG91dC4uLilcbiAgICAgICAgICAgIGVtaXQoaW5wdXQuYWRkaXRpb25hbEV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBhbmVuZCBhbmQgcGFuY2FuY2VsXG4gICAgICAgIGlmIChzdGF0ZSA+PSBTVEFURV9FTkRFRCkge1xuICAgICAgICAgICAgZW1pdChzZWxmLm9wdGlvbnMuZXZlbnQgKyBzdGF0ZVN0cihzdGF0ZSkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrIHRoYXQgYWxsIHRoZSByZXF1aXJlIGZhaWx1cmUgcmVjb2duaXplcnMgaGFzIGZhaWxlZCxcbiAgICAgKiBpZiB0cnVlLCBpdCBlbWl0cyBhIGdlc3R1cmUgZXZlbnQsXG4gICAgICogb3RoZXJ3aXNlLCBzZXR1cCB0aGUgc3RhdGUgdG8gRkFJTEVELlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICAgICAqL1xuICAgIHRyeUVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIGlmICh0aGlzLmNhbkVtaXQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdChpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaXQncyBmYWlsaW5nIGFueXdheVxuICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfRkFJTEVEO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjYW4gd2UgZW1pdD9cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBjYW5FbWl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMucmVxdWlyZUZhaWwubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoISh0aGlzLnJlcXVpcmVGYWlsW2ldLnN0YXRlICYgKFNUQVRFX0ZBSUxFRCB8IFNUQVRFX1BPU1NJQkxFKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHVwZGF0ZSB0aGUgcmVjb2duaXplclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dERhdGFcbiAgICAgKi9cbiAgICByZWNvZ25pemU6IGZ1bmN0aW9uKGlucHV0RGF0YSkge1xuICAgICAgICAvLyBtYWtlIGEgbmV3IGNvcHkgb2YgdGhlIGlucHV0RGF0YVxuICAgICAgICAvLyBzbyB3ZSBjYW4gY2hhbmdlIHRoZSBpbnB1dERhdGEgd2l0aG91dCBtZXNzaW5nIHVwIHRoZSBvdGhlciByZWNvZ25pemVyc1xuICAgICAgICB2YXIgaW5wdXREYXRhQ2xvbmUgPSBhc3NpZ24oe30sIGlucHV0RGF0YSk7XG5cbiAgICAgICAgLy8gaXMgaXMgZW5hYmxlZCBhbmQgYWxsb3cgcmVjb2duaXppbmc/XG4gICAgICAgIGlmICghYm9vbE9yRm4odGhpcy5vcHRpb25zLmVuYWJsZSwgW3RoaXMsIGlucHV0RGF0YUNsb25lXSkpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9GQUlMRUQ7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXNldCB3aGVuIHdlJ3ZlIHJlYWNoZWQgdGhlIGVuZFxuICAgICAgICBpZiAodGhpcy5zdGF0ZSAmIChTVEFURV9SRUNPR05JWkVEIHwgU1RBVEVfQ0FOQ0VMTEVEIHwgU1RBVEVfRkFJTEVEKSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX1BPU1NJQkxFO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMucHJvY2VzcyhpbnB1dERhdGFDbG9uZSk7XG5cbiAgICAgICAgLy8gdGhlIHJlY29nbml6ZXIgaGFzIHJlY29nbml6ZWQgYSBnZXN0dXJlXG4gICAgICAgIC8vIHNvIHRyaWdnZXIgYW4gZXZlbnRcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgJiAoU1RBVEVfQkVHQU4gfCBTVEFURV9DSEFOR0VEIHwgU1RBVEVfRU5ERUQgfCBTVEFURV9DQU5DRUxMRUQpKSB7XG4gICAgICAgICAgICB0aGlzLnRyeUVtaXQoaW5wdXREYXRhQ2xvbmUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJldHVybiB0aGUgc3RhdGUgb2YgdGhlIHJlY29nbml6ZXJcbiAgICAgKiB0aGUgYWN0dWFsIHJlY29nbml6aW5nIGhhcHBlbnMgaW4gdGhpcyBtZXRob2RcbiAgICAgKiBAdmlydHVhbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dERhdGFcbiAgICAgKiBAcmV0dXJucyB7Q29uc3R9IFNUQVRFXG4gICAgICovXG4gICAgcHJvY2VzczogZnVuY3Rpb24oaW5wdXREYXRhKSB7IH0sIC8vIGpzaGludCBpZ25vcmU6bGluZVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJuIHRoZSBwcmVmZXJyZWQgdG91Y2gtYWN0aW9uXG4gICAgICogQHZpcnR1YWxcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICovXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkgeyB9LFxuXG4gICAgLyoqXG4gICAgICogY2FsbGVkIHdoZW4gdGhlIGdlc3R1cmUgaXNuJ3QgYWxsb3dlZCB0byByZWNvZ25pemVcbiAgICAgKiBsaWtlIHdoZW4gYW5vdGhlciBpcyBiZWluZyByZWNvZ25pemVkIG9yIGl0IGlzIGRpc2FibGVkXG4gICAgICogQHZpcnR1YWxcbiAgICAgKi9cbiAgICByZXNldDogZnVuY3Rpb24oKSB7IH1cbn07XG5cbi8qKlxuICogZ2V0IGEgdXNhYmxlIHN0cmluZywgdXNlZCBhcyBldmVudCBwb3N0Zml4XG4gKiBAcGFyYW0ge0NvbnN0fSBzdGF0ZVxuICogQHJldHVybnMge1N0cmluZ30gc3RhdGVcbiAqL1xuZnVuY3Rpb24gc3RhdGVTdHIoc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUgJiBTVEFURV9DQU5DRUxMRUQpIHtcbiAgICAgICAgcmV0dXJuICdjYW5jZWwnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUgJiBTVEFURV9FTkRFRCkge1xuICAgICAgICByZXR1cm4gJ2VuZCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZSAmIFNUQVRFX0NIQU5HRUQpIHtcbiAgICAgICAgcmV0dXJuICdtb3ZlJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlICYgU1RBVEVfQkVHQU4pIHtcbiAgICAgICAgcmV0dXJuICdzdGFydCc7XG4gICAgfVxuICAgIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBkaXJlY3Rpb24gY29ucyB0byBzdHJpbmdcbiAqIEBwYXJhbSB7Q29uc3R9IGRpcmVjdGlvblxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZGlyZWN0aW9uU3RyKGRpcmVjdGlvbikge1xuICAgIGlmIChkaXJlY3Rpb24gPT0gRElSRUNUSU9OX0RPV04pIHtcbiAgICAgICAgcmV0dXJuICdkb3duJztcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT05fVVApIHtcbiAgICAgICAgcmV0dXJuICd1cCc7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT0gRElSRUNUSU9OX0xFRlQpIHtcbiAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT05fUklHSFQpIHtcbiAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgfVxuICAgIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBnZXQgYSByZWNvZ25pemVyIGJ5IG5hbWUgaWYgaXQgaXMgYm91bmQgdG8gYSBtYW5hZ2VyXG4gKiBAcGFyYW0ge1JlY29nbml6ZXJ8U3RyaW5nfSBvdGhlclJlY29nbml6ZXJcbiAqIEBwYXJhbSB7UmVjb2duaXplcn0gcmVjb2duaXplclxuICogQHJldHVybnMge1JlY29nbml6ZXJ9XG4gKi9cbmZ1bmN0aW9uIGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCByZWNvZ25pemVyKSB7XG4gICAgdmFyIG1hbmFnZXIgPSByZWNvZ25pemVyLm1hbmFnZXI7XG4gICAgaWYgKG1hbmFnZXIpIHtcbiAgICAgICAgcmV0dXJuIG1hbmFnZXIuZ2V0KG90aGVyUmVjb2duaXplcik7XG4gICAgfVxuICAgIHJldHVybiBvdGhlclJlY29nbml6ZXI7XG59XG5cbi8qKlxuICogVGhpcyByZWNvZ25pemVyIGlzIGp1c3QgdXNlZCBhcyBhIGJhc2UgZm9yIHRoZSBzaW1wbGUgYXR0cmlidXRlIHJlY29nbml6ZXJzLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIEF0dHJSZWNvZ25pemVyKCkge1xuICAgIFJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChBdHRyUmVjb2duaXplciwgUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgQXR0clJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGRlZmF1bHQgMVxuICAgICAgICAgKi9cbiAgICAgICAgcG9pbnRlcnM6IDFcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBjaGVjayBpZiBpdCB0aGUgcmVjb2duaXplciByZWNlaXZlcyB2YWxpZCBpbnB1dCwgbGlrZSBpbnB1dC5kaXN0YW5jZSA+IDEwLlxuICAgICAqIEBtZW1iZXJvZiBBdHRyUmVjb2duaXplclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSByZWNvZ25pemVkXG4gICAgICovXG4gICAgYXR0clRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBvcHRpb25Qb2ludGVycyA9IHRoaXMub3B0aW9ucy5wb2ludGVycztcbiAgICAgICAgcmV0dXJuIG9wdGlvblBvaW50ZXJzID09PSAwIHx8IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA9PT0gb3B0aW9uUG9pbnRlcnM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFByb2Nlc3MgdGhlIGlucHV0IGFuZCByZXR1cm4gdGhlIHN0YXRlIGZvciB0aGUgcmVjb2duaXplclxuICAgICAqIEBtZW1iZXJvZiBBdHRyUmVjb2duaXplclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICAgICAqIEByZXR1cm5zIHsqfSBTdGF0ZVxuICAgICAqL1xuICAgIHByb2Nlc3M6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIHZhciBldmVudFR5cGUgPSBpbnB1dC5ldmVudFR5cGU7XG5cbiAgICAgICAgdmFyIGlzUmVjb2duaXplZCA9IHN0YXRlICYgKFNUQVRFX0JFR0FOIHwgU1RBVEVfQ0hBTkdFRCk7XG4gICAgICAgIHZhciBpc1ZhbGlkID0gdGhpcy5hdHRyVGVzdChpbnB1dCk7XG5cbiAgICAgICAgLy8gb24gY2FuY2VsIGlucHV0IGFuZCB3ZSd2ZSByZWNvZ25pemVkIGJlZm9yZSwgcmV0dXJuIFNUQVRFX0NBTkNFTExFRFxuICAgICAgICBpZiAoaXNSZWNvZ25pemVkICYmIChldmVudFR5cGUgJiBJTlBVVF9DQU5DRUwgfHwgIWlzVmFsaWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUgfCBTVEFURV9DQU5DRUxMRUQ7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNSZWNvZ25pemVkIHx8IGlzVmFsaWQpIHtcbiAgICAgICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9FTkQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUgfCBTVEFURV9FTkRFRDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIShzdGF0ZSAmIFNUQVRFX0JFR0FOKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBTVEFURV9CRUdBTjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdGF0ZSB8IFNUQVRFX0NIQU5HRUQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFNUQVRFX0ZBSUxFRDtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBQYW5cbiAqIFJlY29nbml6ZWQgd2hlbiB0aGUgcG9pbnRlciBpcyBkb3duIGFuZCBtb3ZlZCBpbiB0aGUgYWxsb3dlZCBkaXJlY3Rpb24uXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIEF0dHJSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFBhblJlY29nbml6ZXIoKSB7XG4gICAgQXR0clJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucFggPSBudWxsO1xuICAgIHRoaXMucFkgPSBudWxsO1xufVxuXG5pbmhlcml0KFBhblJlY29nbml6ZXIsIEF0dHJSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBQYW5SZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdwYW4nLFxuICAgICAgICB0aHJlc2hvbGQ6IDEwLFxuICAgICAgICBwb2ludGVyczogMSxcbiAgICAgICAgZGlyZWN0aW9uOiBESVJFQ1RJT05fQUxMXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IHRoaXMub3B0aW9ucy5kaXJlY3Rpb247XG4gICAgICAgIHZhciBhY3Rpb25zID0gW107XG4gICAgICAgIGlmIChkaXJlY3Rpb24gJiBESVJFQ1RJT05fSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKFRPVUNIX0FDVElPTl9QQU5fWSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpcmVjdGlvbiAmIERJUkVDVElPTl9WRVJUSUNBTCkge1xuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKFRPVUNIX0FDVElPTl9QQU5fWCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjdGlvbnM7XG4gICAgfSxcblxuICAgIGRpcmVjdGlvblRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICB2YXIgaGFzTW92ZWQgPSB0cnVlO1xuICAgICAgICB2YXIgZGlzdGFuY2UgPSBpbnB1dC5kaXN0YW5jZTtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGlucHV0LmRpcmVjdGlvbjtcbiAgICAgICAgdmFyIHggPSBpbnB1dC5kZWx0YVg7XG4gICAgICAgIHZhciB5ID0gaW5wdXQuZGVsdGFZO1xuXG4gICAgICAgIC8vIGxvY2sgdG8gYXhpcz9cbiAgICAgICAgaWYgKCEoZGlyZWN0aW9uICYgb3B0aW9ucy5kaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kaXJlY3Rpb24gJiBESVJFQ1RJT05fSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9ICh4ID09PSAwKSA/IERJUkVDVElPTl9OT05FIDogKHggPCAwKSA/IERJUkVDVElPTl9MRUZUIDogRElSRUNUSU9OX1JJR0hUO1xuICAgICAgICAgICAgICAgIGhhc01vdmVkID0geCAhPSB0aGlzLnBYO1xuICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gTWF0aC5hYnMoaW5wdXQuZGVsdGFYKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gKHkgPT09IDApID8gRElSRUNUSU9OX05PTkUgOiAoeSA8IDApID8gRElSRUNUSU9OX1VQIDogRElSRUNUSU9OX0RPV047XG4gICAgICAgICAgICAgICAgaGFzTW92ZWQgPSB5ICE9IHRoaXMucFk7XG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBNYXRoLmFicyhpbnB1dC5kZWx0YVkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlucHV0LmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgcmV0dXJuIGhhc01vdmVkICYmIGRpc3RhbmNlID4gb3B0aW9ucy50aHJlc2hvbGQgJiYgZGlyZWN0aW9uICYgb3B0aW9ucy5kaXJlY3Rpb247XG4gICAgfSxcblxuICAgIGF0dHJUZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gQXR0clJlY29nbml6ZXIucHJvdG90eXBlLmF0dHJUZXN0LmNhbGwodGhpcywgaW5wdXQpICYmXG4gICAgICAgICAgICAodGhpcy5zdGF0ZSAmIFNUQVRFX0JFR0FOIHx8ICghKHRoaXMuc3RhdGUgJiBTVEFURV9CRUdBTikgJiYgdGhpcy5kaXJlY3Rpb25UZXN0KGlucHV0KSkpO1xuICAgIH0sXG5cbiAgICBlbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuXG4gICAgICAgIHRoaXMucFggPSBpbnB1dC5kZWx0YVg7XG4gICAgICAgIHRoaXMucFkgPSBpbnB1dC5kZWx0YVk7XG5cbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGRpcmVjdGlvblN0cihpbnB1dC5kaXJlY3Rpb24pO1xuXG4gICAgICAgIGlmIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGlucHV0LmFkZGl0aW9uYWxFdmVudCA9IHRoaXMub3B0aW9ucy5ldmVudCArIGRpcmVjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdXBlci5lbWl0LmNhbGwodGhpcywgaW5wdXQpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIFBpbmNoXG4gKiBSZWNvZ25pemVkIHdoZW4gdHdvIG9yIG1vcmUgcG9pbnRlcnMgYXJlIG1vdmluZyB0b3dhcmQgKHpvb20taW4pIG9yIGF3YXkgZnJvbSBlYWNoIG90aGVyICh6b29tLW91dCkuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIEF0dHJSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFBpbmNoUmVjb2duaXplcigpIHtcbiAgICBBdHRyUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFBpbmNoUmVjb2duaXplciwgQXR0clJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFBpbmNoUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAncGluY2gnLFxuICAgICAgICB0aHJlc2hvbGQ6IDAsXG4gICAgICAgIHBvaW50ZXJzOiAyXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtUT1VDSF9BQ1RJT05fTk9ORV07XG4gICAgfSxcblxuICAgIGF0dHJUZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3VwZXIuYXR0clRlc3QuY2FsbCh0aGlzLCBpbnB1dCkgJiZcbiAgICAgICAgICAgIChNYXRoLmFicyhpbnB1dC5zY2FsZSAtIDEpID4gdGhpcy5vcHRpb25zLnRocmVzaG9sZCB8fCB0aGlzLnN0YXRlICYgU1RBVEVfQkVHQU4pO1xuICAgIH0sXG5cbiAgICBlbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICBpZiAoaW5wdXQuc2NhbGUgIT09IDEpIHtcbiAgICAgICAgICAgIHZhciBpbk91dCA9IGlucHV0LnNjYWxlIDwgMSA/ICdpbicgOiAnb3V0JztcbiAgICAgICAgICAgIGlucHV0LmFkZGl0aW9uYWxFdmVudCA9IHRoaXMub3B0aW9ucy5ldmVudCArIGluT3V0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N1cGVyLmVtaXQuY2FsbCh0aGlzLCBpbnB1dCk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogUHJlc3NcbiAqIFJlY29nbml6ZWQgd2hlbiB0aGUgcG9pbnRlciBpcyBkb3duIGZvciB4IG1zIHdpdGhvdXQgYW55IG1vdmVtZW50LlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFByZXNzUmVjb2duaXplcigpIHtcbiAgICBSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLl90aW1lciA9IG51bGw7XG4gICAgdGhpcy5faW5wdXQgPSBudWxsO1xufVxuXG5pbmhlcml0KFByZXNzUmVjb2duaXplciwgUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgUHJlc3NSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdwcmVzcycsXG4gICAgICAgIHBvaW50ZXJzOiAxLFxuICAgICAgICB0aW1lOiAyNTEsIC8vIG1pbmltYWwgdGltZSBvZiB0aGUgcG9pbnRlciB0byBiZSBwcmVzc2VkXG4gICAgICAgIHRocmVzaG9sZDogOSAvLyBhIG1pbmltYWwgbW92ZW1lbnQgaXMgb2ssIGJ1dCBrZWVwIGl0IGxvd1xuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbVE9VQ0hfQUNUSU9OX0FVVE9dO1xuICAgIH0sXG5cbiAgICBwcm9jZXNzOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgdmFyIHZhbGlkUG9pbnRlcnMgPSBpbnB1dC5wb2ludGVycy5sZW5ndGggPT09IG9wdGlvbnMucG9pbnRlcnM7XG4gICAgICAgIHZhciB2YWxpZE1vdmVtZW50ID0gaW5wdXQuZGlzdGFuY2UgPCBvcHRpb25zLnRocmVzaG9sZDtcbiAgICAgICAgdmFyIHZhbGlkVGltZSA9IGlucHV0LmRlbHRhVGltZSA+IG9wdGlvbnMudGltZTtcblxuICAgICAgICB0aGlzLl9pbnB1dCA9IGlucHV0O1xuXG4gICAgICAgIC8vIHdlIG9ubHkgYWxsb3cgbGl0dGxlIG1vdmVtZW50XG4gICAgICAgIC8vIGFuZCB3ZSd2ZSByZWFjaGVkIGFuIGVuZCBldmVudCwgc28gYSB0YXAgaXMgcG9zc2libGVcbiAgICAgICAgaWYgKCF2YWxpZE1vdmVtZW50IHx8ICF2YWxpZFBvaW50ZXJzIHx8IChpbnB1dC5ldmVudFR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSAmJiAhdmFsaWRUaW1lKSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX1NUQVJUKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXRDb250ZXh0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9SRUNPR05JWkVEO1xuICAgICAgICAgICAgICAgIHRoaXMudHJ5RW1pdCgpO1xuICAgICAgICAgICAgfSwgb3B0aW9ucy50aW1lLCB0aGlzKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC5ldmVudFR5cGUgJiBJTlBVVF9FTkQpIHtcbiAgICAgICAgICAgIHJldHVybiBTVEFURV9SRUNPR05JWkVEO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTVEFURV9GQUlMRUQ7XG4gICAgfSxcblxuICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgICB9LFxuXG4gICAgZW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09IFNUQVRFX1JFQ09HTklaRUQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbnB1dCAmJiAoaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfRU5EKSkge1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50ICsgJ3VwJywgaW5wdXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5faW5wdXQudGltZVN0YW1wID0gbm93KCk7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQsIHRoaXMuX2lucHV0KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4vKipcbiAqIFJvdGF0ZVxuICogUmVjb2duaXplZCB3aGVuIHR3byBvciBtb3JlIHBvaW50ZXIgYXJlIG1vdmluZyBpbiBhIGNpcmN1bGFyIG1vdGlvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgQXR0clJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gUm90YXRlUmVjb2duaXplcigpIHtcbiAgICBBdHRyUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFJvdGF0ZVJlY29nbml6ZXIsIEF0dHJSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBSb3RhdGVSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdyb3RhdGUnLFxuICAgICAgICB0aHJlc2hvbGQ6IDAsXG4gICAgICAgIHBvaW50ZXJzOiAyXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtUT1VDSF9BQ1RJT05fTk9ORV07XG4gICAgfSxcblxuICAgIGF0dHJUZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3VwZXIuYXR0clRlc3QuY2FsbCh0aGlzLCBpbnB1dCkgJiZcbiAgICAgICAgICAgIChNYXRoLmFicyhpbnB1dC5yb3RhdGlvbikgPiB0aGlzLm9wdGlvbnMudGhyZXNob2xkIHx8IHRoaXMuc3RhdGUgJiBTVEFURV9CRUdBTik7XG4gICAgfVxufSk7XG5cbi8qKlxuICogU3dpcGVcbiAqIFJlY29nbml6ZWQgd2hlbiB0aGUgcG9pbnRlciBpcyBtb3ZpbmcgZmFzdCAodmVsb2NpdHkpLCB3aXRoIGVub3VnaCBkaXN0YW5jZSBpbiB0aGUgYWxsb3dlZCBkaXJlY3Rpb24uXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIEF0dHJSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFN3aXBlUmVjb2duaXplcigpIHtcbiAgICBBdHRyUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFN3aXBlUmVjb2duaXplciwgQXR0clJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFN3aXBlUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAnc3dpcGUnLFxuICAgICAgICB0aHJlc2hvbGQ6IDEwLFxuICAgICAgICB2ZWxvY2l0eTogMC4zLFxuICAgICAgICBkaXJlY3Rpb246IERJUkVDVElPTl9IT1JJWk9OVEFMIHwgRElSRUNUSU9OX1ZFUlRJQ0FMLFxuICAgICAgICBwb2ludGVyczogMVxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBQYW5SZWNvZ25pemVyLnByb3RvdHlwZS5nZXRUb3VjaEFjdGlvbi5jYWxsKHRoaXMpO1xuICAgIH0sXG5cbiAgICBhdHRyVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IHRoaXMub3B0aW9ucy5kaXJlY3Rpb247XG4gICAgICAgIHZhciB2ZWxvY2l0eTtcblxuICAgICAgICBpZiAoZGlyZWN0aW9uICYgKERJUkVDVElPTl9IT1JJWk9OVEFMIHwgRElSRUNUSU9OX1ZFUlRJQ0FMKSkge1xuICAgICAgICAgICAgdmVsb2NpdHkgPSBpbnB1dC5vdmVyYWxsVmVsb2NpdHk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uICYgRElSRUNUSU9OX0hPUklaT05UQUwpIHtcbiAgICAgICAgICAgIHZlbG9jaXR5ID0gaW5wdXQub3ZlcmFsbFZlbG9jaXR5WDtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gJiBESVJFQ1RJT05fVkVSVElDQUwpIHtcbiAgICAgICAgICAgIHZlbG9jaXR5ID0gaW5wdXQub3ZlcmFsbFZlbG9jaXR5WTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9zdXBlci5hdHRyVGVzdC5jYWxsKHRoaXMsIGlucHV0KSAmJlxuICAgICAgICAgICAgZGlyZWN0aW9uICYgaW5wdXQub2Zmc2V0RGlyZWN0aW9uICYmXG4gICAgICAgICAgICBpbnB1dC5kaXN0YW5jZSA+IHRoaXMub3B0aW9ucy50aHJlc2hvbGQgJiZcbiAgICAgICAgICAgIGlucHV0Lm1heFBvaW50ZXJzID09IHRoaXMub3B0aW9ucy5wb2ludGVycyAmJlxuICAgICAgICAgICAgYWJzKHZlbG9jaXR5KSA+IHRoaXMub3B0aW9ucy52ZWxvY2l0eSAmJiBpbnB1dC5ldmVudFR5cGUgJiBJTlBVVF9FTkQ7XG4gICAgfSxcblxuICAgIGVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBkaXJlY3Rpb25TdHIoaW5wdXQub2Zmc2V0RGlyZWN0aW9uKTtcbiAgICAgICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50ICsgZGlyZWN0aW9uLCBpbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQsIGlucHV0KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBBIHRhcCBpcyBlY29nbml6ZWQgd2hlbiB0aGUgcG9pbnRlciBpcyBkb2luZyBhIHNtYWxsIHRhcC9jbGljay4gTXVsdGlwbGUgdGFwcyBhcmUgcmVjb2duaXplZCBpZiB0aGV5IG9jY3VyXG4gKiBiZXR3ZWVuIHRoZSBnaXZlbiBpbnRlcnZhbCBhbmQgcG9zaXRpb24uIFRoZSBkZWxheSBvcHRpb24gY2FuIGJlIHVzZWQgdG8gcmVjb2duaXplIG11bHRpLXRhcHMgd2l0aG91dCBmaXJpbmdcbiAqIGEgc2luZ2xlIHRhcC5cbiAqXG4gKiBUaGUgZXZlbnREYXRhIGZyb20gdGhlIGVtaXR0ZWQgZXZlbnQgY29udGFpbnMgdGhlIHByb3BlcnR5IGB0YXBDb3VudGAsIHdoaWNoIGNvbnRhaW5zIHRoZSBhbW91bnQgb2ZcbiAqIG11bHRpLXRhcHMgYmVpbmcgcmVjb2duaXplZC5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBUYXBSZWNvZ25pemVyKCkge1xuICAgIFJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIC8vIHByZXZpb3VzIHRpbWUgYW5kIGNlbnRlcixcbiAgICAvLyB1c2VkIGZvciB0YXAgY291bnRpbmdcbiAgICB0aGlzLnBUaW1lID0gZmFsc2U7XG4gICAgdGhpcy5wQ2VudGVyID0gZmFsc2U7XG5cbiAgICB0aGlzLl90aW1lciA9IG51bGw7XG4gICAgdGhpcy5faW5wdXQgPSBudWxsO1xuICAgIHRoaXMuY291bnQgPSAwO1xufVxuXG5pbmhlcml0KFRhcFJlY29nbml6ZXIsIFJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFBpbmNoUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAndGFwJyxcbiAgICAgICAgcG9pbnRlcnM6IDEsXG4gICAgICAgIHRhcHM6IDEsXG4gICAgICAgIGludGVydmFsOiAzMDAsIC8vIG1heCB0aW1lIGJldHdlZW4gdGhlIG11bHRpLXRhcCB0YXBzXG4gICAgICAgIHRpbWU6IDI1MCwgLy8gbWF4IHRpbWUgb2YgdGhlIHBvaW50ZXIgdG8gYmUgZG93biAobGlrZSBmaW5nZXIgb24gdGhlIHNjcmVlbilcbiAgICAgICAgdGhyZXNob2xkOiA5LCAvLyBhIG1pbmltYWwgbW92ZW1lbnQgaXMgb2ssIGJ1dCBrZWVwIGl0IGxvd1xuICAgICAgICBwb3NUaHJlc2hvbGQ6IDEwIC8vIGEgbXVsdGktdGFwIGNhbiBiZSBhIGJpdCBvZmYgdGhlIGluaXRpYWwgcG9zaXRpb25cbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW1RPVUNIX0FDVElPTl9NQU5JUFVMQVRJT05dO1xuICAgIH0sXG5cbiAgICBwcm9jZXNzOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuICAgICAgICB2YXIgdmFsaWRQb2ludGVycyA9IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA9PT0gb3B0aW9ucy5wb2ludGVycztcbiAgICAgICAgdmFyIHZhbGlkTW92ZW1lbnQgPSBpbnB1dC5kaXN0YW5jZSA8IG9wdGlvbnMudGhyZXNob2xkO1xuICAgICAgICB2YXIgdmFsaWRUb3VjaFRpbWUgPSBpbnB1dC5kZWx0YVRpbWUgPCBvcHRpb25zLnRpbWU7XG5cbiAgICAgICAgdGhpcy5yZXNldCgpO1xuXG4gICAgICAgIGlmICgoaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQpICYmICh0aGlzLmNvdW50ID09PSAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmFpbFRpbWVvdXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdlIG9ubHkgYWxsb3cgbGl0dGxlIG1vdmVtZW50XG4gICAgICAgIC8vIGFuZCB3ZSd2ZSByZWFjaGVkIGFuIGVuZCBldmVudCwgc28gYSB0YXAgaXMgcG9zc2libGVcbiAgICAgICAgaWYgKHZhbGlkTW92ZW1lbnQgJiYgdmFsaWRUb3VjaFRpbWUgJiYgdmFsaWRQb2ludGVycykge1xuICAgICAgICAgICAgaWYgKGlucHV0LmV2ZW50VHlwZSAhPSBJTlBVVF9FTkQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mYWlsVGltZW91dCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdmFsaWRJbnRlcnZhbCA9IHRoaXMucFRpbWUgPyAoaW5wdXQudGltZVN0YW1wIC0gdGhpcy5wVGltZSA8IG9wdGlvbnMuaW50ZXJ2YWwpIDogdHJ1ZTtcbiAgICAgICAgICAgIHZhciB2YWxpZE11bHRpVGFwID0gIXRoaXMucENlbnRlciB8fCBnZXREaXN0YW5jZSh0aGlzLnBDZW50ZXIsIGlucHV0LmNlbnRlcikgPCBvcHRpb25zLnBvc1RocmVzaG9sZDtcblxuICAgICAgICAgICAgdGhpcy5wVGltZSA9IGlucHV0LnRpbWVTdGFtcDtcbiAgICAgICAgICAgIHRoaXMucENlbnRlciA9IGlucHV0LmNlbnRlcjtcblxuICAgICAgICAgICAgaWYgKCF2YWxpZE11bHRpVGFwIHx8ICF2YWxpZEludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudCA9IDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnQgKz0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5faW5wdXQgPSBpbnB1dDtcblxuICAgICAgICAgICAgLy8gaWYgdGFwIGNvdW50IG1hdGNoZXMgd2UgaGF2ZSByZWNvZ25pemVkIGl0LFxuICAgICAgICAgICAgLy8gZWxzZSBpdCBoYXMgYmVnYW4gcmVjb2duaXppbmcuLi5cbiAgICAgICAgICAgIHZhciB0YXBDb3VudCA9IHRoaXMuY291bnQgJSBvcHRpb25zLnRhcHM7XG4gICAgICAgICAgICBpZiAodGFwQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBubyBmYWlsaW5nIHJlcXVpcmVtZW50cywgaW1tZWRpYXRlbHkgdHJpZ2dlciB0aGUgdGFwIGV2ZW50XG4gICAgICAgICAgICAgICAgLy8gb3Igd2FpdCBhcyBsb25nIGFzIHRoZSBtdWx0aXRhcCBpbnRlcnZhbCB0byB0cmlnZ2VyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmhhc1JlcXVpcmVGYWlsdXJlcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTVEFURV9SRUNPR05JWkVEO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dENvbnRleHQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfUkVDT0dOSVpFRDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5RW1pdCgpO1xuICAgICAgICAgICAgICAgICAgICB9LCBvcHRpb25zLmludGVydmFsLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFNUQVRFX0JFR0FOO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU1RBVEVfRkFJTEVEO1xuICAgIH0sXG5cbiAgICBmYWlsVGltZW91dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dENvbnRleHQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfRkFJTEVEO1xuICAgICAgICB9LCB0aGlzLm9wdGlvbnMuaW50ZXJ2YWwsIHRoaXMpO1xuICAgICAgICByZXR1cm4gU1RBVEVfRkFJTEVEO1xuICAgIH0sXG5cbiAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gICAgfSxcblxuICAgIGVtaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PSBTVEFURV9SRUNPR05JWkVEKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnB1dC50YXBDb3VudCA9IHRoaXMuY291bnQ7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQsIHRoaXMuX2lucHV0KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4vKipcbiAqIFNpbXBsZSB3YXkgdG8gY3JlYXRlIGEgbWFuYWdlciB3aXRoIGEgZGVmYXVsdCBzZXQgb2YgcmVjb2duaXplcnMuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gSGFtbWVyKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBvcHRpb25zLnJlY29nbml6ZXJzID0gaWZVbmRlZmluZWQob3B0aW9ucy5yZWNvZ25pemVycywgSGFtbWVyLmRlZmF1bHRzLnByZXNldCk7XG4gICAgcmV0dXJuIG5ldyBNYW5hZ2VyKGVsZW1lbnQsIG9wdGlvbnMpO1xufVxuXG4vKipcbiAqIEBjb25zdCB7c3RyaW5nfVxuICovXG5IYW1tZXIuVkVSU0lPTiA9ICcyLjAuNyc7XG5cbi8qKlxuICogZGVmYXVsdCBzZXR0aW5nc1xuICogQG5hbWVzcGFjZVxuICovXG5IYW1tZXIuZGVmYXVsdHMgPSB7XG4gICAgLyoqXG4gICAgICogc2V0IGlmIERPTSBldmVudHMgYXJlIGJlaW5nIHRyaWdnZXJlZC5cbiAgICAgKiBCdXQgdGhpcyBpcyBzbG93ZXIgYW5kIHVudXNlZCBieSBzaW1wbGUgaW1wbGVtZW50YXRpb25zLCBzbyBkaXNhYmxlZCBieSBkZWZhdWx0LlxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgZG9tRXZlbnRzOiBmYWxzZSxcblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBmb3IgdGhlIHRvdWNoQWN0aW9uIHByb3BlcnR5L2ZhbGxiYWNrLlxuICAgICAqIFdoZW4gc2V0IHRvIGBjb21wdXRlYCBpdCB3aWxsIG1hZ2ljYWxseSBzZXQgdGhlIGNvcnJlY3QgdmFsdWUgYmFzZWQgb24gdGhlIGFkZGVkIHJlY29nbml6ZXJzLlxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICogQGRlZmF1bHQgY29tcHV0ZVxuICAgICAqL1xuICAgIHRvdWNoQWN0aW9uOiBUT1VDSF9BQ1RJT05fQ09NUFVURSxcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBlbmFibGU6IHRydWUsXG5cbiAgICAvKipcbiAgICAgKiBFWFBFUklNRU5UQUwgRkVBVFVSRSAtLSBjYW4gYmUgcmVtb3ZlZC9jaGFuZ2VkXG4gICAgICogQ2hhbmdlIHRoZSBwYXJlbnQgaW5wdXQgdGFyZ2V0IGVsZW1lbnQuXG4gICAgICogSWYgTnVsbCwgdGhlbiBpdCBpcyBiZWluZyBzZXQgdGhlIHRvIG1haW4gZWxlbWVudC5cbiAgICAgKiBAdHlwZSB7TnVsbHxFdmVudFRhcmdldH1cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgaW5wdXRUYXJnZXQ6IG51bGwsXG5cbiAgICAvKipcbiAgICAgKiBmb3JjZSBhbiBpbnB1dCBjbGFzc1xuICAgICAqIEB0eXBlIHtOdWxsfEZ1bmN0aW9ufVxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBpbnB1dENsYXNzOiBudWxsLFxuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCByZWNvZ25pemVyIHNldHVwIHdoZW4gY2FsbGluZyBgSGFtbWVyKClgXG4gICAgICogV2hlbiBjcmVhdGluZyBhIG5ldyBNYW5hZ2VyIHRoZXNlIHdpbGwgYmUgc2tpcHBlZC5cbiAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICovXG4gICAgcHJlc2V0OiBbXG4gICAgICAgIC8vIFJlY29nbml6ZXJDbGFzcywgb3B0aW9ucywgW3JlY29nbml6ZVdpdGgsIC4uLl0sIFtyZXF1aXJlRmFpbHVyZSwgLi4uXVxuICAgICAgICBbUm90YXRlUmVjb2duaXplciwge2VuYWJsZTogZmFsc2V9XSxcbiAgICAgICAgW1BpbmNoUmVjb2duaXplciwge2VuYWJsZTogZmFsc2V9LCBbJ3JvdGF0ZSddXSxcbiAgICAgICAgW1N3aXBlUmVjb2duaXplciwge2RpcmVjdGlvbjogRElSRUNUSU9OX0hPUklaT05UQUx9XSxcbiAgICAgICAgW1BhblJlY29nbml6ZXIsIHtkaXJlY3Rpb246IERJUkVDVElPTl9IT1JJWk9OVEFMfSwgWydzd2lwZSddXSxcbiAgICAgICAgW1RhcFJlY29nbml6ZXJdLFxuICAgICAgICBbVGFwUmVjb2duaXplciwge2V2ZW50OiAnZG91YmxldGFwJywgdGFwczogMn0sIFsndGFwJ11dLFxuICAgICAgICBbUHJlc3NSZWNvZ25pemVyXVxuICAgIF0sXG5cbiAgICAvKipcbiAgICAgKiBTb21lIENTUyBwcm9wZXJ0aWVzIGNhbiBiZSB1c2VkIHRvIGltcHJvdmUgdGhlIHdvcmtpbmcgb2YgSGFtbWVyLlxuICAgICAqIEFkZCB0aGVtIHRvIHRoaXMgbWV0aG9kIGFuZCB0aGV5IHdpbGwgYmUgc2V0IHdoZW4gY3JlYXRpbmcgYSBuZXcgTWFuYWdlci5cbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICovXG4gICAgY3NzUHJvcHM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGVzIHRleHQgc2VsZWN0aW9uIHRvIGltcHJvdmUgdGhlIGRyYWdnaW5nIGdlc3R1cmUuIE1haW5seSBmb3IgZGVza3RvcCBicm93c2Vycy5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGUgdGhlIFdpbmRvd3MgUGhvbmUgZ3JpcHBlcnMgd2hlbiBwcmVzc2luZyBhbiBlbGVtZW50LlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIHRvdWNoU2VsZWN0OiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGVzIHRoZSBkZWZhdWx0IGNhbGxvdXQgc2hvd24gd2hlbiB5b3UgdG91Y2ggYW5kIGhvbGQgYSB0b3VjaCB0YXJnZXQuXG4gICAgICAgICAqIE9uIGlPUywgd2hlbiB5b3UgdG91Y2ggYW5kIGhvbGQgYSB0b3VjaCB0YXJnZXQgc3VjaCBhcyBhIGxpbmssIFNhZmFyaSBkaXNwbGF5c1xuICAgICAgICAgKiBhIGNhbGxvdXQgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgbGluay4gVGhpcyBwcm9wZXJ0eSBhbGxvd3MgeW91IHRvIGRpc2FibGUgdGhhdCBjYWxsb3V0LlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIHRvdWNoQ2FsbG91dDogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZpZXMgd2hldGhlciB6b29taW5nIGlzIGVuYWJsZWQuIFVzZWQgYnkgSUUxMD5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICBjb250ZW50Wm9vbWluZzogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZpZXMgdGhhdCBhbiBlbnRpcmUgZWxlbWVudCBzaG91bGQgYmUgZHJhZ2dhYmxlIGluc3RlYWQgb2YgaXRzIGNvbnRlbnRzLiBNYWlubHkgZm9yIGRlc2t0b3AgYnJvd3NlcnMuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgdXNlckRyYWc6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogT3ZlcnJpZGVzIHRoZSBoaWdobGlnaHQgY29sb3Igc2hvd24gd2hlbiB0aGUgdXNlciB0YXBzIGEgbGluayBvciBhIEphdmFTY3JpcHRcbiAgICAgICAgICogY2xpY2thYmxlIGVsZW1lbnQgaW4gaU9TLiBUaGlzIHByb3BlcnR5IG9iZXlzIHRoZSBhbHBoYSB2YWx1ZSwgaWYgc3BlY2lmaWVkLlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAncmdiYSgwLDAsMCwwKSdcbiAgICAgICAgICovXG4gICAgICAgIHRhcEhpZ2hsaWdodENvbG9yOiAncmdiYSgwLDAsMCwwKSdcbiAgICB9XG59O1xuXG52YXIgU1RPUCA9IDE7XG52YXIgRk9SQ0VEX1NUT1AgPSAyO1xuXG4vKipcbiAqIE1hbmFnZXJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBNYW5hZ2VyKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBhc3NpZ24oe30sIEhhbW1lci5kZWZhdWx0cywgb3B0aW9ucyB8fCB7fSk7XG5cbiAgICB0aGlzLm9wdGlvbnMuaW5wdXRUYXJnZXQgPSB0aGlzLm9wdGlvbnMuaW5wdXRUYXJnZXQgfHwgZWxlbWVudDtcblxuICAgIHRoaXMuaGFuZGxlcnMgPSB7fTtcbiAgICB0aGlzLnNlc3Npb24gPSB7fTtcbiAgICB0aGlzLnJlY29nbml6ZXJzID0gW107XG4gICAgdGhpcy5vbGRDc3NQcm9wcyA9IHt9O1xuXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLmlucHV0ID0gY3JlYXRlSW5wdXRJbnN0YW5jZSh0aGlzKTtcbiAgICB0aGlzLnRvdWNoQWN0aW9uID0gbmV3IFRvdWNoQWN0aW9uKHRoaXMsIHRoaXMub3B0aW9ucy50b3VjaEFjdGlvbik7XG5cbiAgICB0b2dnbGVDc3NQcm9wcyh0aGlzLCB0cnVlKTtcblxuICAgIGVhY2godGhpcy5vcHRpb25zLnJlY29nbml6ZXJzLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHZhciByZWNvZ25pemVyID0gdGhpcy5hZGQobmV3IChpdGVtWzBdKShpdGVtWzFdKSk7XG4gICAgICAgIGl0ZW1bMl0gJiYgcmVjb2duaXplci5yZWNvZ25pemVXaXRoKGl0ZW1bMl0pO1xuICAgICAgICBpdGVtWzNdICYmIHJlY29nbml6ZXIucmVxdWlyZUZhaWx1cmUoaXRlbVszXSk7XG4gICAgfSwgdGhpcyk7XG59XG5cbk1hbmFnZXIucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIHNldCBvcHRpb25zXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7TWFuYWdlcn1cbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgYXNzaWduKHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgICAgLy8gT3B0aW9ucyB0aGF0IG5lZWQgYSBsaXR0bGUgbW9yZSBzZXR1cFxuICAgICAgICBpZiAob3B0aW9ucy50b3VjaEFjdGlvbikge1xuICAgICAgICAgICAgdGhpcy50b3VjaEFjdGlvbi51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5pbnB1dFRhcmdldCkge1xuICAgICAgICAgICAgLy8gQ2xlYW4gdXAgZXhpc3RpbmcgZXZlbnQgbGlzdGVuZXJzIGFuZCByZWluaXRpYWxpemVcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dC50YXJnZXQgPSBvcHRpb25zLmlucHV0VGFyZ2V0O1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5pbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHN0b3AgcmVjb2duaXppbmcgZm9yIHRoaXMgc2Vzc2lvbi5cbiAgICAgKiBUaGlzIHNlc3Npb24gd2lsbCBiZSBkaXNjYXJkZWQsIHdoZW4gYSBuZXcgW2lucHV0XXN0YXJ0IGV2ZW50IGlzIGZpcmVkLlxuICAgICAqIFdoZW4gZm9yY2VkLCB0aGUgcmVjb2duaXplciBjeWNsZSBpcyBzdG9wcGVkIGltbWVkaWF0ZWx5LlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZvcmNlXVxuICAgICAqL1xuICAgIHN0b3A6IGZ1bmN0aW9uKGZvcmNlKSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbi5zdG9wcGVkID0gZm9yY2UgPyBGT1JDRURfU1RPUCA6IFNUT1A7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJ1biB0aGUgcmVjb2duaXplcnMhXG4gICAgICogY2FsbGVkIGJ5IHRoZSBpbnB1dEhhbmRsZXIgZnVuY3Rpb24gb24gZXZlcnkgbW92ZW1lbnQgb2YgdGhlIHBvaW50ZXJzICh0b3VjaGVzKVxuICAgICAqIGl0IHdhbGtzIHRocm91Z2ggYWxsIHRoZSByZWNvZ25pemVycyBhbmQgdHJpZXMgdG8gZGV0ZWN0IHRoZSBnZXN0dXJlIHRoYXQgaXMgYmVpbmcgbWFkZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dERhdGFcbiAgICAgKi9cbiAgICByZWNvZ25pemU6IGZ1bmN0aW9uKGlucHV0RGF0YSkge1xuICAgICAgICB2YXIgc2Vzc2lvbiA9IHRoaXMuc2Vzc2lvbjtcbiAgICAgICAgaWYgKHNlc3Npb24uc3RvcHBlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcnVuIHRoZSB0b3VjaC1hY3Rpb24gcG9seWZpbGxcbiAgICAgICAgdGhpcy50b3VjaEFjdGlvbi5wcmV2ZW50RGVmYXVsdHMoaW5wdXREYXRhKTtcblxuICAgICAgICB2YXIgcmVjb2duaXplcjtcbiAgICAgICAgdmFyIHJlY29nbml6ZXJzID0gdGhpcy5yZWNvZ25pemVycztcblxuICAgICAgICAvLyB0aGlzIGhvbGRzIHRoZSByZWNvZ25pemVyIHRoYXQgaXMgYmVpbmcgcmVjb2duaXplZC5cbiAgICAgICAgLy8gc28gdGhlIHJlY29nbml6ZXIncyBzdGF0ZSBuZWVkcyB0byBiZSBCRUdBTiwgQ0hBTkdFRCwgRU5ERUQgb3IgUkVDT0dOSVpFRFxuICAgICAgICAvLyBpZiBubyByZWNvZ25pemVyIGlzIGRldGVjdGluZyBhIHRoaW5nLCBpdCBpcyBzZXQgdG8gYG51bGxgXG4gICAgICAgIHZhciBjdXJSZWNvZ25pemVyID0gc2Vzc2lvbi5jdXJSZWNvZ25pemVyO1xuXG4gICAgICAgIC8vIHJlc2V0IHdoZW4gdGhlIGxhc3QgcmVjb2duaXplciBpcyByZWNvZ25pemVkXG4gICAgICAgIC8vIG9yIHdoZW4gd2UncmUgaW4gYSBuZXcgc2Vzc2lvblxuICAgICAgICBpZiAoIWN1clJlY29nbml6ZXIgfHwgKGN1clJlY29nbml6ZXIgJiYgY3VyUmVjb2duaXplci5zdGF0ZSAmIFNUQVRFX1JFQ09HTklaRUQpKSB7XG4gICAgICAgICAgICBjdXJSZWNvZ25pemVyID0gc2Vzc2lvbi5jdXJSZWNvZ25pemVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCByZWNvZ25pemVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlY29nbml6ZXIgPSByZWNvZ25pemVyc1tpXTtcblxuICAgICAgICAgICAgLy8gZmluZCBvdXQgaWYgd2UgYXJlIGFsbG93ZWQgdHJ5IHRvIHJlY29nbml6ZSB0aGUgaW5wdXQgZm9yIHRoaXMgb25lLlxuICAgICAgICAgICAgLy8gMS4gICBhbGxvdyBpZiB0aGUgc2Vzc2lvbiBpcyBOT1QgZm9yY2VkIHN0b3BwZWQgKHNlZSB0aGUgLnN0b3AoKSBtZXRob2QpXG4gICAgICAgICAgICAvLyAyLiAgIGFsbG93IGlmIHdlIHN0aWxsIGhhdmVuJ3QgcmVjb2duaXplZCBhIGdlc3R1cmUgaW4gdGhpcyBzZXNzaW9uLCBvciB0aGUgdGhpcyByZWNvZ25pemVyIGlzIHRoZSBvbmVcbiAgICAgICAgICAgIC8vICAgICAgdGhhdCBpcyBiZWluZyByZWNvZ25pemVkLlxuICAgICAgICAgICAgLy8gMy4gICBhbGxvdyBpZiB0aGUgcmVjb2duaXplciBpcyBhbGxvd2VkIHRvIHJ1biBzaW11bHRhbmVvdXMgd2l0aCB0aGUgY3VycmVudCByZWNvZ25pemVkIHJlY29nbml6ZXIuXG4gICAgICAgICAgICAvLyAgICAgIHRoaXMgY2FuIGJlIHNldHVwIHdpdGggdGhlIGByZWNvZ25pemVXaXRoKClgIG1ldGhvZCBvbiB0aGUgcmVjb2duaXplci5cbiAgICAgICAgICAgIGlmIChzZXNzaW9uLnN0b3BwZWQgIT09IEZPUkNFRF9TVE9QICYmICggLy8gMVxuICAgICAgICAgICAgICAgICAgICAhY3VyUmVjb2duaXplciB8fCByZWNvZ25pemVyID09IGN1clJlY29nbml6ZXIgfHwgLy8gMlxuICAgICAgICAgICAgICAgICAgICByZWNvZ25pemVyLmNhblJlY29nbml6ZVdpdGgoY3VyUmVjb2duaXplcikpKSB7IC8vIDNcbiAgICAgICAgICAgICAgICByZWNvZ25pemVyLnJlY29nbml6ZShpbnB1dERhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWNvZ25pemVyLnJlc2V0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSByZWNvZ25pemVyIGhhcyBiZWVuIHJlY29nbml6aW5nIHRoZSBpbnB1dCBhcyBhIHZhbGlkIGdlc3R1cmUsIHdlIHdhbnQgdG8gc3RvcmUgdGhpcyBvbmUgYXMgdGhlXG4gICAgICAgICAgICAvLyBjdXJyZW50IGFjdGl2ZSByZWNvZ25pemVyLiBidXQgb25seSBpZiB3ZSBkb24ndCBhbHJlYWR5IGhhdmUgYW4gYWN0aXZlIHJlY29nbml6ZXJcbiAgICAgICAgICAgIGlmICghY3VyUmVjb2duaXplciAmJiByZWNvZ25pemVyLnN0YXRlICYgKFNUQVRFX0JFR0FOIHwgU1RBVEVfQ0hBTkdFRCB8IFNUQVRFX0VOREVEKSkge1xuICAgICAgICAgICAgICAgIGN1clJlY29nbml6ZXIgPSBzZXNzaW9uLmN1clJlY29nbml6ZXIgPSByZWNvZ25pemVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGdldCBhIHJlY29nbml6ZXIgYnkgaXRzIGV2ZW50IG5hbWUuXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfFN0cmluZ30gcmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfE51bGx9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbihyZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChyZWNvZ25pemVyIGluc3RhbmNlb2YgUmVjb2duaXplcikge1xuICAgICAgICAgICAgcmV0dXJuIHJlY29nbml6ZXI7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVjb2duaXplcnMgPSB0aGlzLnJlY29nbml6ZXJzO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlY29nbml6ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocmVjb2duaXplcnNbaV0ub3B0aW9ucy5ldmVudCA9PSByZWNvZ25pemVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY29nbml6ZXJzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBhZGQgYSByZWNvZ25pemVyIHRvIHRoZSBtYW5hZ2VyXG4gICAgICogZXhpc3RpbmcgcmVjb2duaXplcnMgd2l0aCB0aGUgc2FtZSBldmVudCBuYW1lIHdpbGwgYmUgcmVtb3ZlZFxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gcmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfE1hbmFnZXJ9XG4gICAgICovXG4gICAgYWRkOiBmdW5jdGlvbihyZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhyZWNvZ25pemVyLCAnYWRkJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVtb3ZlIGV4aXN0aW5nXG4gICAgICAgIHZhciBleGlzdGluZyA9IHRoaXMuZ2V0KHJlY29nbml6ZXIub3B0aW9ucy5ldmVudCk7XG4gICAgICAgIGlmIChleGlzdGluZykge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUoZXhpc3RpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWNvZ25pemVycy5wdXNoKHJlY29nbml6ZXIpO1xuICAgICAgICByZWNvZ25pemVyLm1hbmFnZXIgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMudG91Y2hBY3Rpb24udXBkYXRlKCk7XG4gICAgICAgIHJldHVybiByZWNvZ25pemVyO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZW1vdmUgYSByZWNvZ25pemVyIGJ5IG5hbWUgb3IgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ8U3RyaW5nfSByZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge01hbmFnZXJ9XG4gICAgICovXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihyZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhyZWNvZ25pemVyLCAncmVtb3ZlJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVjb2duaXplciA9IHRoaXMuZ2V0KHJlY29nbml6ZXIpO1xuXG4gICAgICAgIC8vIGxldCdzIG1ha2Ugc3VyZSB0aGlzIHJlY29nbml6ZXIgZXhpc3RzXG4gICAgICAgIGlmIChyZWNvZ25pemVyKSB7XG4gICAgICAgICAgICB2YXIgcmVjb2duaXplcnMgPSB0aGlzLnJlY29nbml6ZXJzO1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gaW5BcnJheShyZWNvZ25pemVycywgcmVjb2duaXplcik7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZWNvZ25pemVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMudG91Y2hBY3Rpb24udXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogYmluZCBldmVudFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudHNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gICAgICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gdGhpc1xuICAgICAqL1xuICAgIG9uOiBmdW5jdGlvbihldmVudHMsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy5oYW5kbGVycztcbiAgICAgICAgZWFjaChzcGxpdFN0cihldmVudHMpLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaGFuZGxlcnNbZXZlbnRdID0gaGFuZGxlcnNbZXZlbnRdIHx8IFtdO1xuICAgICAgICAgICAgaGFuZGxlcnNbZXZlbnRdLnB1c2goaGFuZGxlcik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdW5iaW5kIGV2ZW50LCBsZWF2ZSBlbWl0IGJsYW5rIHRvIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2hhbmRsZXJdXG4gICAgICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gdGhpc1xuICAgICAqL1xuICAgIG9mZjogZnVuY3Rpb24oZXZlbnRzLCBoYW5kbGVyKSB7XG4gICAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy5oYW5kbGVycztcbiAgICAgICAgZWFjaChzcGxpdFN0cihldmVudHMpLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKCFoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGhhbmRsZXJzW2V2ZW50XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcnNbZXZlbnRdICYmIGhhbmRsZXJzW2V2ZW50XS5zcGxpY2UoaW5BcnJheShoYW5kbGVyc1tldmVudF0sIGhhbmRsZXIpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBlbWl0IGV2ZW50IHRvIHRoZSBsaXN0ZW5lcnNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIGVtaXQ6IGZ1bmN0aW9uKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgIC8vIHdlIGFsc28gd2FudCB0byB0cmlnZ2VyIGRvbSBldmVudHNcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kb21FdmVudHMpIHtcbiAgICAgICAgICAgIHRyaWdnZXJEb21FdmVudChldmVudCwgZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBubyBoYW5kbGVycywgc28gc2tpcCBpdCBhbGxcbiAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy5oYW5kbGVyc1tldmVudF0gJiYgdGhpcy5oYW5kbGVyc1tldmVudF0uc2xpY2UoKTtcbiAgICAgICAgaWYgKCFoYW5kbGVycyB8fCAhaGFuZGxlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBkYXRhLnR5cGUgPSBldmVudDtcbiAgICAgICAgZGF0YS5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGF0YS5zcmNFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCBoYW5kbGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGhhbmRsZXJzW2ldKGRhdGEpO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGRlc3Ryb3kgdGhlIG1hbmFnZXIgYW5kIHVuYmluZHMgYWxsIGV2ZW50c1xuICAgICAqIGl0IGRvZXNuJ3QgdW5iaW5kIGRvbSBldmVudHMsIHRoYXQgaXMgdGhlIHVzZXIgb3duIHJlc3BvbnNpYmlsaXR5XG4gICAgICovXG4gICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCAmJiB0b2dnbGVDc3NQcm9wcyh0aGlzLCBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVycyA9IHt9O1xuICAgICAgICB0aGlzLnNlc3Npb24gPSB7fTtcbiAgICAgICAgdGhpcy5pbnB1dC5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgfVxufTtcblxuLyoqXG4gKiBhZGQvcmVtb3ZlIHRoZSBjc3MgcHJvcGVydGllcyBhcyBkZWZpbmVkIGluIG1hbmFnZXIub3B0aW9ucy5jc3NQcm9wc1xuICogQHBhcmFtIHtNYW5hZ2VyfSBtYW5hZ2VyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGFkZFxuICovXG5mdW5jdGlvbiB0b2dnbGVDc3NQcm9wcyhtYW5hZ2VyLCBhZGQpIHtcbiAgICB2YXIgZWxlbWVudCA9IG1hbmFnZXIuZWxlbWVudDtcbiAgICBpZiAoIWVsZW1lbnQuc3R5bGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcHJvcDtcbiAgICBlYWNoKG1hbmFnZXIub3B0aW9ucy5jc3NQcm9wcywgZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgcHJvcCA9IHByZWZpeGVkKGVsZW1lbnQuc3R5bGUsIG5hbWUpO1xuICAgICAgICBpZiAoYWRkKSB7XG4gICAgICAgICAgICBtYW5hZ2VyLm9sZENzc1Byb3BzW3Byb3BdID0gZWxlbWVudC5zdHlsZVtwcm9wXTtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSBtYW5hZ2VyLm9sZENzc1Byb3BzW3Byb3BdIHx8ICcnO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFhZGQpIHtcbiAgICAgICAgbWFuYWdlci5vbGRDc3NQcm9wcyA9IHt9O1xuICAgIH1cbn1cblxuLyoqXG4gKiB0cmlnZ2VyIGRvbSBldmVudFxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICovXG5mdW5jdGlvbiB0cmlnZ2VyRG9tRXZlbnQoZXZlbnQsIGRhdGEpIHtcbiAgICB2YXIgZ2VzdHVyZUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgZ2VzdHVyZUV2ZW50LmluaXRFdmVudChldmVudCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgZ2VzdHVyZUV2ZW50Lmdlc3R1cmUgPSBkYXRhO1xuICAgIGRhdGEudGFyZ2V0LmRpc3BhdGNoRXZlbnQoZ2VzdHVyZUV2ZW50KTtcbn1cblxuYXNzaWduKEhhbW1lciwge1xuICAgIElOUFVUX1NUQVJUOiBJTlBVVF9TVEFSVCxcbiAgICBJTlBVVF9NT1ZFOiBJTlBVVF9NT1ZFLFxuICAgIElOUFVUX0VORDogSU5QVVRfRU5ELFxuICAgIElOUFVUX0NBTkNFTDogSU5QVVRfQ0FOQ0VMLFxuXG4gICAgU1RBVEVfUE9TU0lCTEU6IFNUQVRFX1BPU1NJQkxFLFxuICAgIFNUQVRFX0JFR0FOOiBTVEFURV9CRUdBTixcbiAgICBTVEFURV9DSEFOR0VEOiBTVEFURV9DSEFOR0VELFxuICAgIFNUQVRFX0VOREVEOiBTVEFURV9FTkRFRCxcbiAgICBTVEFURV9SRUNPR05JWkVEOiBTVEFURV9SRUNPR05JWkVELFxuICAgIFNUQVRFX0NBTkNFTExFRDogU1RBVEVfQ0FOQ0VMTEVELFxuICAgIFNUQVRFX0ZBSUxFRDogU1RBVEVfRkFJTEVELFxuXG4gICAgRElSRUNUSU9OX05PTkU6IERJUkVDVElPTl9OT05FLFxuICAgIERJUkVDVElPTl9MRUZUOiBESVJFQ1RJT05fTEVGVCxcbiAgICBESVJFQ1RJT05fUklHSFQ6IERJUkVDVElPTl9SSUdIVCxcbiAgICBESVJFQ1RJT05fVVA6IERJUkVDVElPTl9VUCxcbiAgICBESVJFQ1RJT05fRE9XTjogRElSRUNUSU9OX0RPV04sXG4gICAgRElSRUNUSU9OX0hPUklaT05UQUw6IERJUkVDVElPTl9IT1JJWk9OVEFMLFxuICAgIERJUkVDVElPTl9WRVJUSUNBTDogRElSRUNUSU9OX1ZFUlRJQ0FMLFxuICAgIERJUkVDVElPTl9BTEw6IERJUkVDVElPTl9BTEwsXG5cbiAgICBNYW5hZ2VyOiBNYW5hZ2VyLFxuICAgIElucHV0OiBJbnB1dCxcbiAgICBUb3VjaEFjdGlvbjogVG91Y2hBY3Rpb24sXG5cbiAgICBUb3VjaElucHV0OiBUb3VjaElucHV0LFxuICAgIE1vdXNlSW5wdXQ6IE1vdXNlSW5wdXQsXG4gICAgUG9pbnRlckV2ZW50SW5wdXQ6IFBvaW50ZXJFdmVudElucHV0LFxuICAgIFRvdWNoTW91c2VJbnB1dDogVG91Y2hNb3VzZUlucHV0LFxuICAgIFNpbmdsZVRvdWNoSW5wdXQ6IFNpbmdsZVRvdWNoSW5wdXQsXG5cbiAgICBSZWNvZ25pemVyOiBSZWNvZ25pemVyLFxuICAgIEF0dHJSZWNvZ25pemVyOiBBdHRyUmVjb2duaXplcixcbiAgICBUYXA6IFRhcFJlY29nbml6ZXIsXG4gICAgUGFuOiBQYW5SZWNvZ25pemVyLFxuICAgIFN3aXBlOiBTd2lwZVJlY29nbml6ZXIsXG4gICAgUGluY2g6IFBpbmNoUmVjb2duaXplcixcbiAgICBSb3RhdGU6IFJvdGF0ZVJlY29nbml6ZXIsXG4gICAgUHJlc3M6IFByZXNzUmVjb2duaXplcixcblxuICAgIG9uOiBhZGRFdmVudExpc3RlbmVycyxcbiAgICBvZmY6IHJlbW92ZUV2ZW50TGlzdGVuZXJzLFxuICAgIGVhY2g6IGVhY2gsXG4gICAgbWVyZ2U6IG1lcmdlLFxuICAgIGV4dGVuZDogZXh0ZW5kLFxuICAgIGFzc2lnbjogYXNzaWduLFxuICAgIGluaGVyaXQ6IGluaGVyaXQsXG4gICAgYmluZEZuOiBiaW5kRm4sXG4gICAgcHJlZml4ZWQ6IHByZWZpeGVkXG59KTtcblxuLy8gdGhpcyBwcmV2ZW50cyBlcnJvcnMgd2hlbiBIYW1tZXIgaXMgbG9hZGVkIGluIHRoZSBwcmVzZW5jZSBvZiBhbiBBTURcbi8vICBzdHlsZSBsb2FkZXIgYnV0IGJ5IHNjcmlwdCB0YWcsIG5vdCBieSB0aGUgbG9hZGVyLlxudmFyIGZyZWVHbG9iYWwgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHt9KSk7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuZnJlZUdsb2JhbC5IYW1tZXIgPSBIYW1tZXI7XG5cbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBIYW1tZXI7XG4gICAgfSk7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEhhbW1lcjtcbn0gZWxzZSB7XG4gICAgd2luZG93W2V4cG9ydE5hbWVdID0gSGFtbWVyO1xufVxuXG59KSh3aW5kb3csIGRvY3VtZW50LCAnSGFtbWVyJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9oYW1tZXJqcy9oYW1tZXIuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIE11dXJpIHYwLjUuM1xuICogaHR0cHM6Ly9naXRodWIuY29tL2hhbHR1L211dXJpXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUsIEhhbHR1IE95XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXG4gIHZhciBuYW1lc3BhY2UgPSAnTXV1cmknO1xuICB2YXIgSGFtbWVyO1xuXG4gIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgdHJ5IHsgSGFtbWVyID0gcmVxdWlyZSgnaGFtbWVyanMnKTsgfSBjYXRjaCAoZSkge31cbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KG5hbWVzcGFjZSwgSGFtbWVyKTtcbiAgfVxuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoWydoYW1tZXJqcyddLCBmdW5jdGlvbiAoSGFtbWVyKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeShuYW1lc3BhY2UsIEhhbW1lcik7XG4gICAgfSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgZ2xvYmFsW25hbWVzcGFjZV0gPSBmYWN0b3J5KG5hbWVzcGFjZSwgZ2xvYmFsLkhhbW1lcik7XG4gIH1cblxufSh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHRoaXMsIGZ1bmN0aW9uIChuYW1lc3BhY2UsIEhhbW1lciwgdW5kZWZpbmVkKSB7XG5cbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIEdldCByZWZlcmVuY2VzIHRvIGFsbCB0aGUgc3R1ZmYgd2UgYXJlIHVzaW5nIGZyb20gdGhlIGdsb2JhbCBzY29wZS5cbiAgdmFyIGdsb2JhbCA9IHdpbmRvdztcbiAgdmFyIE9iamVjdCA9IGdsb2JhbC5PYmplY3Q7XG4gIHZhciBBcnJheSA9IGdsb2JhbC5BcnJheTtcbiAgdmFyIE1hdGggPSBnbG9iYWwuTWF0aDtcbiAgdmFyIEVycm9yID0gZ2xvYmFsLkVycm9yO1xuICB2YXIgRWxlbWVudCA9IGdsb2JhbC5FbGVtZW50O1xuICB2YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xuICB2YXIgZG9jRWxlbSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gIHZhciBib2R5ID0gZG9jLmJvZHk7XG5cbiAgLy8gVHlwZXMuXG4gIHZhciB0eXBlRnVuY3Rpb24gPSAnZnVuY3Rpb24nO1xuICB2YXIgdHlwZVN0cmluZyA9ICdzdHJpbmcnO1xuICB2YXIgdHlwZU51bWJlciA9ICdudW1iZXInO1xuXG4gIC8vIFJhZiBsb29wIHRoYXQgY2FuIGJlIHVzZWQgdG8gb3JnYW5pemUgRE9NIHdyaXRlIGFuZCByZWFkIG9wZXJhdGlvbnNcbiAgLy8gb3B0aW1hbGx5IGluIHRoZSBuZXh0IGFuaW1hdGlvbiBmcmFtZS5cbiAgdmFyIHJhZkxvb3AgPSBjcmVhdGVSYWZMb29wKCk7XG5cbiAgLy8gUmFmIGxvb3AgcXVldWUgbmFtZXMuXG4gIHZhciByYWZRdWV1ZUxheW91dCA9ICdsYXlvdXQnO1xuICB2YXIgcmFmUXVldWVWaXNpYmlsaXR5ID0gJ3Zpc2liaWxpdHknO1xuICB2YXIgcmFmUXVldWVNb3ZlID0gJ21vdmUnO1xuICB2YXIgcmFmUXVldWVTY3JvbGwgPSAnc2Nyb2xsJztcblxuICAvLyBEcmFnIHN0YXJ0IHByZWRpY2F0ZSBzdGF0ZXMuXG4gIHZhciBzdGFydFByZWRpY2F0ZUluYWN0aXZlID0gMDtcbiAgdmFyIHN0YXJ0UHJlZGljYXRlUGVuZGluZyA9IDE7XG4gIHZhciBzdGFydFByZWRpY2F0ZVJlc29sdmVkID0gMjtcbiAgdmFyIHN0YXJ0UHJlZGljYXRlUmVqZWN0ZWQgPSAzO1xuXG4gIC8vIEtlZXAgdHJhY2sgb2YgR3JpZCBpbnN0YW5jZXMuXG4gIHZhciBncmlkSW5zdGFuY2VzID0ge307XG5cbiAgLy8gS2VlcCB0cmFjayBvZiBJdGVtIGluc3RhbmNlcy5cbiAgdmFyIGl0ZW1JbnN0YW5jZXMgPSB7fTtcblxuICAvLyBObyBvcGVyYXRpb24gZnVuY3Rpb24uXG4gIHZhciBub29wID0gZnVuY3Rpb24gKCkge307XG5cbiAgLy8gVW5pcXVlIGlkIHdoaWNoIGlzIHVzZWQgZm9yIEdyaWQgaW5zdGFuY2VzIGFuZCBJdGVtIGluc3RhbmNlcy5cbiAgLy8gU2hvdWxkIGJlIGluY3JlbWVudGVkIGV2ZXJ5IHRpbWUgd2hlbiB1c2VkLlxuICB2YXIgdXVpZCA9IDA7XG5cbiAgLy8gR2V0IHRoZSBzdXBwb3J0ZWQgZWxlbWVudC5tYXRjaGVzKCkuXG4gIHZhciBlbGVtZW50TWF0Y2hlcyA9IGdldFN1cHBvcnRlZEVsZW1lbnRNYXRjaGVzKCk7XG5cbiAgLy8gR2V0IHRoZSBzdXBwb3J0ZWQgdHJhbnNmb3JtIHN0eWxlIHByb3BlcnR5LlxuICB2YXIgdHJhbnNmb3JtID0gZ2V0U3VwcG9ydGVkU3R5bGUoJ3RyYW5zZm9ybScpO1xuXG4gIC8vIFRlc3QgaWYgdHJhbnNmb3JtZWQgZWxlbWVudHMgbGVhayBmaXhlZCBlbGVtZW50cy5cbiAgdmFyIHRyYW5zZm9ybUxlYWtzRml4ZWQgPSBib2R5ID8gZG9lc1RyYW5zZm9ybUxlYWtGaXhlZCgpIDogbnVsbDtcblxuICAvLyBFdmVudCBuYW1lcy5cbiAgdmFyIGV2U3luY2hyb25pemUgPSAnc3luY2hyb25pemUnO1xuICB2YXIgZXZMYXlvdXRTdGFydCA9ICdsYXlvdXRTdGFydCc7XG4gIHZhciBldkxheW91dEVuZCA9ICdsYXlvdXRFbmQnO1xuICB2YXIgZXZBZGQgPSAnYWRkJztcbiAgdmFyIGV2UmVtb3ZlID0gJ3JlbW92ZSc7XG4gIHZhciBldlNob3dTdGFydCA9ICdzaG93U3RhcnQnO1xuICB2YXIgZXZTaG93RW5kID0gJ3Nob3dFbmQnO1xuICB2YXIgZXZIaWRlU3RhcnQgPSAnaGlkZVN0YXJ0JztcbiAgdmFyIGV2SGlkZUVuZCA9ICdoaWRlRW5kJztcbiAgdmFyIGV2RmlsdGVyID0gJ2ZpbHRlcic7XG4gIHZhciBldlNvcnQgPSAnc29ydCc7XG4gIHZhciBldk1vdmUgPSAnbW92ZSc7XG4gIHZhciBldlNlbmQgPSAnc2VuZCc7XG4gIHZhciBldkJlZm9yZVNlbmQgPSAnYmVmb3JlU2VuZCc7XG4gIHZhciBldlJlY2VpdmUgPSAncmVjZWl2ZSc7XG4gIHZhciBldkJlZm9yZVJlY2VpdmUgPSAnYmVmb3JlUmVjZWl2ZSc7XG4gIHZhciBldkRyYWdJbml0ID0gJ2RyYWdJbml0JztcbiAgdmFyIGV2RHJhZ1N0YXJ0ID0gJ2RyYWdTdGFydCc7XG4gIHZhciBldkRyYWdNb3ZlID0gJ2RyYWdNb3ZlJztcbiAgdmFyIGV2RHJhZ1Njcm9sbCA9ICdkcmFnU2Nyb2xsJztcbiAgdmFyIGV2RHJhZ0VuZCA9ICdkcmFnRW5kJztcbiAgdmFyIGV2RHJhZ1JlbGVhc2VTdGFydCA9ICdkcmFnUmVsZWFzZVN0YXJ0JztcbiAgdmFyIGV2RHJhZ1JlbGVhc2VFbmQgPSAnZHJhZ1JlbGVhc2VFbmQnO1xuICB2YXIgZXZEZXN0cm95ID0gJ2Rlc3Ryb3knO1xuXG4gIC8qKlxuICAgKiBHcmlkXG4gICAqICoqKipcbiAgICovXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgR3JpZCBpbnN0YW5jZS5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2xhc3NcbiAgICogQHBhcmFtIHsoSFRNTEVsZW1lbnR8U3RyaW5nKX0gZWxlbWVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAqIEBwYXJhbSB7KD9IVE1MRWxlbWVudFtdfE5vZGVMaXN0fFN0cmluZyl9IFtvcHRpb25zLml0ZW1zXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuc2hvd0R1cmF0aW9uPTMwMF1cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnNob3dFYXNpbmc9XCJlYXNlXCJdXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy52aXNpYmxlU3R5bGVzXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuaGlkZUR1cmF0aW9uPTMwMF1cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmhpZGVFYXNpbmc9XCJlYXNlXCJdXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5oaWRkZW5TdHlsZXNdXG4gICAqIEBwYXJhbSB7KEZ1bmN0aW9ufE9iamVjdCl9IFtvcHRpb25zLmxheW91dF1cbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5sYXlvdXQuZmlsbEdhcHM9ZmFsc2VdXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubGF5b3V0Lmhvcml6b250YWw9ZmFsc2VdXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubGF5b3V0LmFsaWduUmlnaHQ9ZmFsc2VdXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubGF5b3V0LmFsaWduQm90dG9tPWZhbHNlXVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmxheW91dC5yb3VuZGluZz10cnVlXVxuICAgKiBAcGFyYW0geyhCb29sZWFufE51bWJlcil9IFtvcHRpb25zLmxheW91dE9uUmVzaXplPTEwMF1cbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5sYXlvdXRPbkluaXQ9dHJ1ZV1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmxheW91dER1cmF0aW9uPTMwMF1cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmxheW91dEVhc2luZz1cImVhc2VcIl1cbiAgICogQHBhcmFtIHs/T2JqZWN0fSBbb3B0aW9ucy5zb3J0RGF0YT1udWxsXVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRyYWdFbmFibGVkPWZhbHNlXVxuICAgKiBAcGFyYW0gez9IdG1sRWxlbWVudH0gW29wdGlvbnMuZHJhZ0NvbnRhaW5lcj1udWxsXVxuICAgKiBAcGFyYW0gez9GdW5jdGlvbn0gW29wdGlvbnMuZHJhZ1N0YXJ0UHJlZGljYXRlXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZHJhZ1N0YXJ0UHJlZGljYXRlLmRpc3RhbmNlPTBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kcmFnU3RhcnRQcmVkaWNhdGUuZGVsYXk9MF1cbiAgICogQHBhcmFtIHsoQm9vbGVhbnxTdHJpbmcpfSBbb3B0aW9ucy5kcmFnU3RhcnRQcmVkaWNhdGUuaGFuZGxlPWZhbHNlXVxuICAgKiBAcGFyYW0gez9TdHJpbmd9IFtvcHRpb25zLmRyYWdBeGlzXVxuICAgKiBAcGFyYW0geyhCb29sZWFufEZ1bmN0aW9uKX0gW29wdGlvbnMuZHJhZ1NvcnQ9dHJ1ZV1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmRyYWdTb3J0SW50ZXJ2YWw9MTAwXVxuICAgKiBAcGFyYW0geyhGdW5jdGlvbnxPYmplY3QpfSBbb3B0aW9ucy5kcmFnU29ydFByZWRpY2F0ZV1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmRyYWdTb3J0UHJlZGljYXRlLnRocmVzaG9sZD01MF1cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmRyYWdTb3J0UHJlZGljYXRlLmFjdGlvbj1cIm1vdmVcIl1cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmRyYWdTb3J0UHJlZGljYXRlLmdhcHM9dHJ1ZV1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmRyYWdSZWxlYXNlRHVyYXRpb249MzAwXVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuZHJhZ1JlbGVhc2VFYXNpbmc9XCJlYXNlXCJdXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5kcmFnSGFtbWVyU2V0dGluZ3M9e3RvdWNoQWN0aW9uOiBcIm5vbmVcIn1dXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5jb250YWluZXJDbGFzcz1cIm11dXJpXCJdXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5pdGVtQ2xhc3M9XCJtdXVyaS1pdGVtXCJdXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5pdGVtVmlzaWJsZUNsYXNzPVwibXV1cmktaXRlbS12aXNpYmxlXCJdXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5pdGVtSGlkZGVuQ2xhc3M9XCJtdXVyaS1pdGVtLWhpZGRlblwiXVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuaXRlbVBvc2l0aW9uaW5nQ2xhc3M9XCJtdXVyaS1pdGVtLXBvc2l0aW9uaW5nXCJdXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5pdGVtRHJhZ2dpbmdDbGFzcz1cIm11dXJpLWl0ZW0tZHJhZ2dpbmdcIl1cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLml0ZW1SZWxlYXNpbmdDbGFzcz1cIm11dXJpLWl0ZW0tcmVsZWFzaW5nXCJdXG4gICAqL1xuICBmdW5jdGlvbiBHcmlkKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcbiAgICB2YXIgc2V0dGluZ3M7XG4gICAgdmFyIGl0ZW1zO1xuICAgIHZhciBsYXlvdXRPblJlc2l6ZTtcblxuICAgIC8vIE11dXJpIGNhbiBiZSBsb2FkZWQgaW5zaWRlIHRoZSBoZWFkIHRhZyBhbHNvLCBidXQgaW4gdGhhdCBjYXNlIE11dXJpIGNhblxuICAgIC8vIG5vdCBjYWNoZSBib2R5IGVsZW1lbnQgYW5kIHJ1biB0aGUgaW5pdGlhbCBET00gdGVzdHMuIFNvLCBpZiB3ZSBkZXRlY3RcbiAgICAvLyB0aGF0IGJvZHkgZWxlbWVudCBjb3VsZCBub3QgYmUgZmV0Y2hlZCBvbiBpbml0IHdlIGRvIGl0IGhlcmUgb25jZSBhbmRcbiAgICAvLyBhbHNvIHJ1biB0aGUgRE9NIHRlc3RzLiBJZiB0aGUgR3JpZCBpcyBpbnN0YW50aWF0ZWQgYmVmb3JlIGJvZHkgaXMgcmVhZHlcbiAgICAvLyB5b3UgYXJlIGRvaW5nIGl0IHdyb25nIDspXG4gICAgaWYgKCFib2R5KSB7XG4gICAgICBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgIHRyYW5zZm9ybUxlYWtzRml4ZWQgPSBkb2VzVHJhbnNmb3JtTGVha0ZpeGVkKCk7XG4gICAgfVxuXG4gICAgLy8gQWxsb3cgcGFzc2luZyBlbGVtZW50IGFzIHNlbGVjdG9yIHN0cmluZy4gU3RvcmUgZWxlbWVudCBmb3IgaW5zdGFuY2UuXG4gICAgZWxlbWVudCA9IGluc3QuX2VsZW1lbnQgPSB0eXBlb2YgZWxlbWVudCA9PT0gdHlwZVN0cmluZyA/IGRvYy5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpIDogZWxlbWVudDtcblxuICAgIC8vIFRocm93IGFuIGVycm9yIGlmIHRoZSBjb250YWluZXIgZWxlbWVudCBpcyBub3QgYm9keSBlbGVtZW50IG9yIGRvZXMgbm90XG4gICAgLy8gZXhpc3Qgd2l0aGluIHRoZSBib2R5IGVsZW1lbnQuXG4gICAgaWYgKCFib2R5LmNvbnRhaW5zKGVsZW1lbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbnRhaW5lciBlbGVtZW50IG11c3QgYmUgYW4gZXhpc3RpbmcgRE9NIGVsZW1lbnQnKTtcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgaW5zdGFuY2Ugc2V0dGluZ3MgYnkgbWVyZ2luZyB0aGUgb3B0aW9ucyB3aXRoIGRlZmF1bHQgb3B0aW9ucy5cbiAgICBzZXR0aW5ncyA9IGluc3QuX3NldHRpbmdzID0gbWVyZ2VTZXR0aW5ncyhHcmlkLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcblxuICAgIC8vIFNhbml0aXplIGRyYWdTb3J0IHNldHRpbmcuXG4gICAgaWYgKHR5cGVvZiBzZXR0aW5ncy5kcmFnU29ydCAhPT0gdHlwZUZ1bmN0aW9uKSB7XG4gICAgICBzZXR0aW5ncy5kcmFnU29ydCA9ICEhc2V0dGluZ3MuZHJhZ1NvcnQ7XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGluc3RhbmNlIGlkIGFuZCBzdG9yZSBpdCB0byB0aGUgZ3JpZCBpbnN0YW5jZXMgY29sbGVjdGlvbi5cbiAgICBncmlkSW5zdGFuY2VzW2luc3QuX2lkID0gKyt1dWlkXSA9IGluc3Q7XG5cbiAgICAvLyBEZXN0cm95ZWQgZmxhZy5cbiAgICBpbnN0Ll9pc0Rlc3Ryb3llZCA9IGZhbHNlO1xuXG4gICAgLy8gUmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50bHkgdXNlZCBMYXlvdXQgaW5zdGFuY2UuXG4gICAgaW5zdC5fbGF5b3V0ID0gbnVsbDtcblxuICAgIC8vIENyZWF0ZSBwcml2YXRlIEVtaXR0ZXIgaW5zdGFuY2UuXG4gICAgaW5zdC5fZW1pdHRlciA9IG5ldyBHcmlkLkVtaXR0ZXIoKTtcblxuICAgIC8vIFNldHVwIGdyaWQncyBzaG93L2hpZGUgYW5pbWF0aW9uIGhhbmRsZXIgZm9yIGl0ZW1zLlxuICAgIGluc3QuX2l0ZW1TaG93SGFuZGxlciA9IGdldEl0ZW1WaXNpYmlsaXR5SGFuZGxlcignc2hvdycsIHNldHRpbmdzKTtcbiAgICBpbnN0Ll9pdGVtSGlkZUhhbmRsZXIgPSBnZXRJdGVtVmlzaWJpbGl0eUhhbmRsZXIoJ2hpZGUnLCBzZXR0aW5ncyk7XG5cbiAgICAvLyBBZGQgY29udGFpbmVyIGVsZW1lbnQncyBjbGFzcyBuYW1lLlxuICAgIGFkZENsYXNzKGVsZW1lbnQsIHNldHRpbmdzLmNvbnRhaW5lckNsYXNzKTtcblxuICAgIC8vIENyZWF0ZSBpbml0aWFsIGl0ZW1zLlxuICAgIGluc3QuX2l0ZW1zID0gW107XG4gICAgaXRlbXMgPSBzZXR0aW5ncy5pdGVtcztcbiAgICBpZiAodHlwZW9mIGl0ZW1zID09PSB0eXBlU3RyaW5nKSB7XG4gICAgICBub2RlTGlzdFRvQXJyYXkoaW5zdC5fZWxlbWVudC5jaGlsZHJlbikuZm9yRWFjaChmdW5jdGlvbiAoaXRlbUVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGl0ZW1zID09PSAnKicgfHwgZWxlbWVudE1hdGNoZXMoaXRlbUVsZW1lbnQsIGl0ZW1zKSkge1xuICAgICAgICAgIGluc3QuX2l0ZW1zLnB1c2gobmV3IEdyaWQuSXRlbShpbnN0LCBpdGVtRWxlbWVudCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpdGVtcykgfHwgaXNOb2RlTGlzdChpdGVtcykpIHtcbiAgICAgIGluc3QuX2l0ZW1zID0gbm9kZUxpc3RUb0FycmF5KGl0ZW1zKS5tYXAoZnVuY3Rpb24gKGl0ZW1FbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBuZXcgR3JpZC5JdGVtKGluc3QsIGl0ZW1FbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFNhbml0aXplIGxheW91dE9uUmVzaXplIG9wdGlvbiBhbmQgYmluZCBkZWJvdW5jZWQgcmVzaXplIGhhbmRsZXIgaWYgdGhlXG4gICAgLy8gbGF5b3V0T25SZXNpemUgb3B0aW9uIGEgdmFsaWQgbnVtYmVyLlxuICAgIGxheW91dE9uUmVzaXplID0gc2V0dGluZ3MubGF5b3V0T25SZXNpemU7XG4gICAgbGF5b3V0T25SZXNpemUgPSBsYXlvdXRPblJlc2l6ZSA9PT0gdHJ1ZSA/IDAgOiB0eXBlb2YgbGF5b3V0T25SZXNpemUgPT09IHR5cGVOdW1iZXIgPyBsYXlvdXRPblJlc2l6ZSA6IC0xO1xuICAgIGlmIChsYXlvdXRPblJlc2l6ZSA+PSAwKSB7XG4gICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5zdC5fcmVzaXplSGFuZGxlciA9IGRlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaW5zdC5yZWZyZXNoSXRlbXMoKS5sYXlvdXQoKTtcbiAgICAgIH0sIGxheW91dE9uUmVzaXplKSk7XG4gICAgfVxuXG4gICAgLy8gTGF5b3V0IG9uIGluaXQgaWYgbmVjZXNzYXJ5LlxuICAgIGlmIChzZXR0aW5ncy5sYXlvdXRPbkluaXQpIHtcbiAgICAgIGluc3QubGF5b3V0KHRydWUpO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqIEdyaWQgLSBQdWJsaWMgcHJvcGVydGllc1xuICAgKiAqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICovXG5cbiAgLyoqXG4gICAqIEBzZWUgSXRlbVxuICAgKi9cbiAgR3JpZC5JdGVtID0gSXRlbTtcblxuICAvKipcbiAgICogQHNlZSBJdGVtRHJhZ1xuICAgKi9cbiAgR3JpZC5JdGVtRHJhZyA9IEl0ZW1EcmFnO1xuXG4gIC8qKlxuICAgKiBAc2VlIEl0ZW1SZWxlYXNlXG4gICAqL1xuICBHcmlkLkl0ZW1SZWxlYXNlID0gSXRlbVJlbGVhc2U7XG5cbiAgLyoqXG4gICAqIEBzZWUgSXRlbU1pZ3JhdGVcbiAgICovXG4gIEdyaWQuSXRlbU1pZ3JhdGUgPSBJdGVtTWlncmF0ZTtcblxuICAvKipcbiAgICogQHNlZSBJdGVtQW5pbWF0ZVxuICAgKi9cbiAgR3JpZC5JdGVtQW5pbWF0ZSA9IEl0ZW1BbmltYXRlO1xuXG4gIC8qKlxuICAgKiBAc2VlIExheW91dFxuICAgKi9cbiAgR3JpZC5MYXlvdXQgPSBMYXlvdXQ7XG5cbiAgLyoqXG4gICAqIEBzZWUgRW1pdHRlclxuICAgKi9cbiAgR3JpZC5FbWl0dGVyID0gRW1pdHRlcjtcblxuICAvKipcbiAgICogRGVmYXVsdCBvcHRpb25zIGZvciBHcmlkIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBHcmlkXG4gICAqL1xuICBHcmlkLmRlZmF1bHRPcHRpb25zID0ge1xuXG4gICAgLy8gSXRlbSBlbGVtZW50c1xuICAgIGl0ZW1zOiAnKicsXG5cbiAgICAvLyBEZWZhdWx0IHNob3cgYW5pbWF0aW9uXG4gICAgc2hvd0R1cmF0aW9uOiAzMDAsXG4gICAgc2hvd0Vhc2luZzogJ2Vhc2UnLFxuXG4gICAgLy8gRGVmYXVsdCBoaWRlIGFuaW1hdGlvblxuICAgIGhpZGVEdXJhdGlvbjogMzAwLFxuICAgIGhpZGVFYXNpbmc6ICdlYXNlJyxcblxuICAgIC8vIEl0ZW0ncyB2aXNpYmxlL2hpZGRlbiBzdGF0ZSBzdHlsZXNcbiAgICB2aXNpYmxlU3R5bGVzOiB7XG4gICAgICBvcGFjaXR5OiAnMScsXG4gICAgICB0cmFuc2Zvcm06ICdzY2FsZSgxKSdcbiAgICB9LFxuICAgIGhpZGRlblN0eWxlczoge1xuICAgICAgb3BhY2l0eTogJzAnLFxuICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMC41KSdcbiAgICB9LFxuXG4gICAgLy8gTGF5b3V0XG4gICAgbGF5b3V0OiB7XG4gICAgICBmaWxsR2FwczogZmFsc2UsXG4gICAgICBob3Jpem9udGFsOiBmYWxzZSxcbiAgICAgIGFsaWduUmlnaHQ6IGZhbHNlLFxuICAgICAgYWxpZ25Cb3R0b206IGZhbHNlLFxuICAgICAgcm91bmRpbmc6IHRydWVcbiAgICB9LFxuICAgIGxheW91dE9uUmVzaXplOiAxMDAsXG4gICAgbGF5b3V0T25Jbml0OiB0cnVlLFxuICAgIGxheW91dER1cmF0aW9uOiAzMDAsXG4gICAgbGF5b3V0RWFzaW5nOiAnZWFzZScsXG5cbiAgICAvLyBTb3J0aW5nXG4gICAgc29ydERhdGE6IG51bGwsXG5cbiAgICAvLyBEcmFnICYgRHJvcFxuICAgIGRyYWdFbmFibGVkOiBmYWxzZSxcbiAgICBkcmFnQ29udGFpbmVyOiBudWxsLFxuICAgIGRyYWdTdGFydFByZWRpY2F0ZToge1xuICAgICAgZGlzdGFuY2U6IDAsXG4gICAgICBkZWxheTogMCxcbiAgICAgIGhhbmRsZTogZmFsc2VcbiAgICB9LFxuICAgIGRyYWdBeGlzOiBudWxsLFxuICAgIGRyYWdTb3J0OiB0cnVlLFxuICAgIGRyYWdTb3J0SW50ZXJ2YWw6IDEwMCxcbiAgICBkcmFnU29ydFByZWRpY2F0ZToge1xuICAgICAgdGhyZXNob2xkOiA1MCxcbiAgICAgIGFjdGlvbjogJ21vdmUnXG4gICAgfSxcbiAgICBkcmFnUmVsZWFzZUR1cmF0aW9uOiAzMDAsXG4gICAgZHJhZ1JlbGVhc2VFYXNpbmc6ICdlYXNlJyxcbiAgICBkcmFnSGFtbWVyU2V0dGluZ3M6IHtcbiAgICAgIHRvdWNoQWN0aW9uOiAnbm9uZSdcbiAgICB9LFxuXG4gICAgLy8gQ2xhc3NuYW1lc1xuICAgIGNvbnRhaW5lckNsYXNzOiAnbXV1cmknLFxuICAgIGl0ZW1DbGFzczogJ211dXJpLWl0ZW0nLFxuICAgIGl0ZW1WaXNpYmxlQ2xhc3M6ICdtdXVyaS1pdGVtLXNob3duJyxcbiAgICBpdGVtSGlkZGVuQ2xhc3M6ICdtdXVyaS1pdGVtLWhpZGRlbicsXG4gICAgaXRlbVBvc2l0aW9uaW5nQ2xhc3M6ICdtdXVyaS1pdGVtLXBvc2l0aW9uaW5nJyxcbiAgICBpdGVtRHJhZ2dpbmdDbGFzczogJ211dXJpLWl0ZW0tZHJhZ2dpbmcnLFxuICAgIGl0ZW1SZWxlYXNpbmdDbGFzczogJ211dXJpLWl0ZW0tcmVsZWFzaW5nJ1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEdyaWQgLSBQcml2YXRlIHByb3BlcnRpZXNcbiAgICogKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKi9cblxuICBHcmlkLl9tYXhSYWZCYXRjaFNpemUgPSAxMDA7XG5cbiAgLyoqXG4gICAqIEdyaWQgLSBQdWJsaWMgcHJvdG90eXBlIG1ldGhvZHNcbiAgICogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKi9cblxuICAvKipcbiAgICogQmluZCBhbiBldmVudCBsaXN0ZW5lci5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgR3JpZC5wcm90b3R5cGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gICAqIEByZXR1cm5zIHtHcmlkfVxuICAgKi9cbiAgR3JpZC5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XG5cbiAgICB2YXIgaW5zdCA9IHRoaXM7XG5cbiAgICBpZiAoIWluc3QuX2lzRGVzdHJveWVkKSB7XG4gICAgICBpbnN0Ll9lbWl0dGVyLm9uKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3Q7XG5cbiAgfTtcblxuICAvKipcbiAgICogQmluZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0IGlzIHRyaWdnZXJlZCBvbmx5IG9uY2UuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEdyaWQucHJvdG90eXBlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgKiBAcmV0dXJucyB7R3JpZH1cbiAgICovXG4gIEdyaWQucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XG5cbiAgICB2YXIgaW5zdCA9IHRoaXM7XG5cbiAgICBpZiAoIWluc3QuX2lzRGVzdHJveWVkKSB7XG4gICAgICBpbnN0Ll9lbWl0dGVyLm9uY2UoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBVbmJpbmQgYW4gZXZlbnQgbGlzdGVuZXIuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEdyaWQucHJvdG90eXBlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgKiBAcmV0dXJucyB7R3JpZH1cbiAgICovXG4gIEdyaWQucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuICAgIGlmICghaW5zdC5faXNEZXN0cm95ZWQpIHtcbiAgICAgIGluc3QuX2VtaXR0ZXIub2ZmKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3Q7XG5cbiAgfTtcblxuICAvKipcbiAgICogR2V0IHRoZSBjb250YWluZXIgZWxlbWVudC5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgR3JpZC5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgR3JpZC5wcm90b3R5cGUuZ2V0RWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgaXRlbXMuIE9wdGlvbmFsbHkgeW91IGNhbiBwcm92aWRlIHNwZWNpZmljIHRhcmdldHMgKGVsZW1lbnRzIGFuZFxuICAgKiBpbmRpY2VzKSBhbmQgZmlsdGVyIHRoZSByZXN1bHRzIGJhc2VkIG9uIHRoZSBzdGF0ZSBvZiB0aGUgaXRlbXMuIE5vdGUgdGhhdFxuICAgKiB0aGUgcmV0dXJuZWQgYXJyYXkgaXMgbm90IHRoZSBzYW1lIG9iamVjdCB1c2VkIGJ5IHRoZSBpbnN0YW5jZSBzbyBtb2RpZnlpbmdcbiAgICogaXQgd2lsbCBub3QgYWZmZWN0IGluc3RhbmNlJ3MgaXRlbXMuIEFsbCBpdGVtcyB0aGF0IGFyZSBub3QgZm91bmQgYXJlXG4gICAqIG9taXR0ZWQgZnJvbSB0aGUgcmV0dXJuZWQgYXJyYXkuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEdyaWQucHJvdG90eXBlXG4gICAqIEBwYXJhbSB7R3JpZE11bHRpSXRlbVF1ZXJ5fSBbdGFyZ2V0c11cbiAgICogQHBhcmFtIHtHcmlkSXRlbVN0YXRlfSBbc3RhdGVdXG4gICAqIEByZXR1cm5zIHtJdGVtW119XG4gICAqL1xuICBHcmlkLnByb3RvdHlwZS5nZXRJdGVtcyA9IGZ1bmN0aW9uICh0YXJnZXRzLCBzdGF0ZSkge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuXG4gICAgLy8gUmV0dXJuIGFuIGVtcHR5IGFycmF5IGltbWVkaWF0ZWx5IGlmIHRoZSBpbnN0YW5jZSBpcyBkZXN0cm95ZWQuXG4gICAgaWYgKGluc3QuX2lzRGVzdHJveWVkKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgdmFyIGhhc1RhcmdldHMgPSB0YXJnZXRzID09PSAwIHx8ICh0YXJnZXRzICYmIHR5cGVvZiB0YXJnZXRzICE9PSB0eXBlU3RyaW5nKTtcbiAgICB2YXIgdGFyZ2V0SXRlbXMgPSAhaGFzVGFyZ2V0cyA/IG51bGwgOiBpc05vZGVMaXN0KHRhcmdldHMpID8gbm9kZUxpc3RUb0FycmF5KHRhcmdldHMpIDogW10uY29uY2F0KHRhcmdldHMpO1xuICAgIHZhciB0YXJnZXRTdGF0ZSA9ICFoYXNUYXJnZXRzID8gdGFyZ2V0cyA6IHN0YXRlO1xuICAgIHZhciByZXQgPSBbXTtcbiAgICB2YXIgaXRlbTtcbiAgICB2YXIgaTtcblxuICAgIC8vIFNhbml0aXplIHRhcmdldCBzdGF0ZS5cbiAgICB0YXJnZXRTdGF0ZSA9IHR5cGVvZiB0YXJnZXRTdGF0ZSA9PT0gdHlwZVN0cmluZyA/IHRhcmdldFN0YXRlIDogbnVsbDtcblxuICAgIC8vIElmIHRhcmdldCBzdGF0ZSBvciB0YXJnZXQgaXRlbXMgYXJlIGRlZmluZWQgcmV0dXJuIGZpbHRlcmVkIHJlc3VsdHMuXG4gICAgaWYgKHRhcmdldFN0YXRlIHx8IHRhcmdldEl0ZW1zKSB7XG4gICAgICB0YXJnZXRJdGVtcyA9IHRhcmdldEl0ZW1zIHx8IGluc3QuX2l0ZW1zO1xuICAgICAgZm9yIChpID0gMDsgaSA8IHRhcmdldEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGl0ZW0gPSBoYXNUYXJnZXRzID8gaW5zdC5fZ2V0SXRlbSh0YXJnZXRJdGVtc1tpXSkgOiB0YXJnZXRJdGVtc1tpXTtcbiAgICAgICAgaWYgKGl0ZW0gJiYgKCF0YXJnZXRTdGF0ZSB8fCBpc0l0ZW1JblN0YXRlKGl0ZW0sIHRhcmdldFN0YXRlKSkpIHtcbiAgICAgICAgICByZXQucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2UgcmV0dXJuIGFsbCBpdGVtcy5cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiByZXQuY29uY2F0KGluc3QuX2l0ZW1zKTtcbiAgICB9XG5cbiAgfTtcblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBjYWNoZWQgZGltZW5zaW9ucyBvZiB0aGUgaW5zdGFuY2UncyBpdGVtcy5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgR3JpZC5wcm90b3R5cGVcbiAgICogQHBhcmFtIHsoR3JpZE11bHRpSXRlbVF1ZXJ5fEdyaWRJdGVtU3RhdGUpfSBbaXRlbXNdXG4gICAqIEByZXR1cm5zIHtHcmlkfVxuICAgKi9cbiAgR3JpZC5wcm90b3R5cGUucmVmcmVzaEl0ZW1zID0gZnVuY3Rpb24gKGl0ZW1zKSB7XG5cbiAgICB2YXIgaW5zdCA9IHRoaXM7XG5cbiAgICBpZiAoaW5zdC5faXNEZXN0cm95ZWQpIHtcbiAgICAgIHJldHVybiBpbnN0O1xuICAgIH1cblxuICAgIHZhciB0YXJnZXRJdGVtcyA9IGluc3QuZ2V0SXRlbXMoaXRlbXMgfHwgJ2FjdGl2ZScpO1xuICAgIHZhciBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHRhcmdldEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0YXJnZXRJdGVtc1tpXS5fcmVmcmVzaERpbWVuc2lvbnMoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHNvcnQgZGF0YSBvZiB0aGUgaW5zdGFuY2UncyBpdGVtcy5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgR3JpZC5wcm90b3R5cGVcbiAgICogQHBhcmFtIHsoR3JpZE11bHRpSXRlbVF1ZXJ5fEdyaWRJdGVtU3RhdGUpfSBbaXRlbXNdXG4gICAqIEByZXR1cm5zIHtHcmlkfVxuICAgKi9cbiAgR3JpZC5wcm90b3R5cGUucmVmcmVzaFNvcnREYXRhID0gZnVuY3Rpb24gKGl0ZW1zKSB7XG5cbiAgICB2YXIgaW5zdCA9IHRoaXM7XG5cbiAgICBpZiAoaW5zdC5faXNEZXN0cm95ZWQpIHtcbiAgICAgIHJldHVybiBpbnN0O1xuICAgIH1cblxuICAgIHZhciB0YXJnZXRJdGVtcyA9IGluc3QuZ2V0SXRlbXMoaXRlbXMpO1xuICAgIHZhciBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHRhcmdldEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0YXJnZXRJdGVtc1tpXS5fcmVmcmVzaFNvcnREYXRhKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3Q7XG5cbiAgfTtcblxuICAvKipcbiAgICogU3luY2hyb25pemUgdGhlIGl0ZW0gZWxlbWVudHMgdG8gbWF0Y2ggdGhlIG9yZGVyIG9mIHRoZSBpdGVtcyBpbiB0aGUgRE9NLlxuICAgKiBUaGlzIGNvbWVzIGhhbmR5IGlmIHlvdSBuZWVkIHRvIGtlZXAgdGhlIERPTSBzdHJ1Y3R1cmUgbWF0Y2hlZCB3aXRoIHRoZVxuICAgKiBvcmRlciBvZiB0aGUgaXRlbXMuIE5vdGUgdGhhdCBpZiBhbiBpdGVtJ3MgZWxlbWVudCBpcyBub3QgY3VycmVudGx5IGEgY2hpbGRcbiAgICogb2YgdGhlIGNvbnRhaW5lciBlbGVtZW50IChpZiBpdCBpcyBkcmFnZ2VkIGZvciBleGFtcGxlKSBpdCBpcyBpZ25vcmVkIGFuZFxuICAgKiBsZWZ0IHVudG91Y2hlZC5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgR3JpZC5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0dyaWR9XG4gICAqL1xuICBHcmlkLnByb3RvdHlwZS5zeW5jaHJvbml6ZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuICAgIGlmIChpbnN0Ll9pc0Rlc3Ryb3llZCkge1xuICAgICAgcmV0dXJuIGluc3Q7XG4gICAgfVxuXG4gICAgdmFyIGNvbnRhaW5lciA9IGluc3QuX2VsZW1lbnQ7XG4gICAgdmFyIGl0ZW1zID0gaW5zdC5faXRlbXM7XG4gICAgdmFyIGZyYWdtZW50O1xuICAgIHZhciBlbGVtZW50O1xuICAgIHZhciBpO1xuXG4gICAgLy8gQXBwZW5kIGFsbCBlbGVtZW50cyBpbiBvcmRlciB0byB0aGUgY29udGFpbmVyIGVsZW1lbnQuXG4gICAgaWYgKGl0ZW1zLmxlbmd0aCkge1xuICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGVsZW1lbnQgPSBpdGVtc1tpXS5fZWxlbWVudDtcbiAgICAgICAgaWYgKGVsZW1lbnQucGFyZW50Tm9kZSA9PT0gY29udGFpbmVyKSB7XG4gICAgICAgICAgZnJhZ21lbnQgPSBmcmFnbWVudCB8fCBkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZnJhZ21lbnQpIHtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBFbWl0IHN5bmNocm9uaXplIGV2ZW50LlxuICAgIGluc3QuX2VtaXQoZXZTeW5jaHJvbml6ZSk7XG5cbiAgICByZXR1cm4gaW5zdDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgYW5kIGFwcGx5IGl0ZW0gcG9zaXRpb25zLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBHcmlkLnByb3RvdHlwZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtpbnN0YW50PWZhbHNlXVxuICAgKiBAcGFyYW0ge0xheW91dENhbGxiYWNrfSBbb25GaW5pc2hdXG4gICAqIEByZXR1cm5zIHtHcmlkfVxuICAgKi9cbiAgR3JpZC5wcm90b3R5cGUubGF5b3V0ID0gZnVuY3Rpb24gKGluc3RhbnQsIG9uRmluaXNoKSB7XG5cbiAgICB2YXIgaW5zdCA9IHRoaXM7XG5cbiAgICBpZiAoaW5zdC5faXNEZXN0cm95ZWQpIHtcbiAgICAgIHJldHVybiBpbnN0O1xuICAgIH1cblxuICAgIHZhciBjYWxsYmFjayA9IHR5cGVvZiBpbnN0YW50ID09PSB0eXBlRnVuY3Rpb24gPyBpbnN0YW50IDogb25GaW5pc2g7XG4gICAgdmFyIGlzSW5zdGFudCA9IGluc3RhbnQgPT09IHRydWU7XG4gICAgdmFyIGl0ZW1zID0gaW5zdC5nZXRJdGVtcygnYWN0aXZlJyk7XG4gICAgdmFyIGxheW91dCA9IGluc3QuX2xheW91dCA9IG5ldyBHcmlkLkxheW91dChpbnN0LCBpdGVtcyk7XG4gICAgdmFyIGNvdW50ZXIgPSBpdGVtcy5sZW5ndGg7XG4gICAgdmFyIGlzQm9yZGVyQm94O1xuICAgIHZhciBjb250YWluZXJTdHlsZXM7XG4gICAgdmFyIGl0ZW07XG4gICAgdmFyIHBvc2l0aW9uO1xuICAgIHZhciBpO1xuXG4gICAgLy8gVGhlIGZpbmlzaCBmdW5jdGlvbiwgd2hpY2ggd2lsbCBiZSB1c2VkIGZvciBjaGVja2luZyBpZiBhbGwgdGhlIGl0ZW1zXG4gICAgLy8gaGF2ZSBsYWlkIG91dCB5ZXQuIEFmdGVyIGFsbCBpdGVtcyBoYXZlIGZpbmlzaGVkIHRoZWlyIGFuaW1hdGlvbnMgY2FsbFxuICAgIC8vIGNhbGxiYWNrIGFuZCBlbWl0IGxheW91dEVuZCBldmVudC4gT25seSBlbWl0IGxheW91dEVuZCBldmVudCBpZiB0aGVyZVxuICAgIC8vIGhhc24ndCBiZWVuIGEgbmV3IGxheW91dCBjYWxsIGR1cmluZyB0aGlzIGxheW91dC5cbiAgICBmdW5jdGlvbiB0cnlGaW5pc2goKSB7XG4gICAgICBpZiAoLS1jb3VudGVyIDw9IDApIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gdHlwZUZ1bmN0aW9uKSB7XG4gICAgICAgICAgY2FsbGJhY2soaW5zdC5fbGF5b3V0ICE9PSBsYXlvdXQsIGl0ZW1zLmNvbmNhdCgpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5zdC5fbGF5b3V0ID09PSBsYXlvdXQpIHtcbiAgICAgICAgICBpbnN0Ll9lbWl0KGV2TGF5b3V0RW5kLCBpdGVtcy5jb25jYXQoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiBncmlkJ3Mgd2lkdGggb3IgaGVpZ2h0IHdhcyBtb2RpZmllZCwgd2UgbmVlZCB0byB1cGRhdGUgaXQncyBjYWNoZWRcbiAgICAvLyBkaW1lbnNpb25zLiBBbHNvIGtlZXAgaW4gbWluZCB0aGF0IGdyaWQncyBjYWNoZWQgd2lkdGgvaGVpZ2h0IHNob3VsZFxuICAgIC8vIGFsd2F5cyBlcXVhbCB0byB3aGF0IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgd291bGQgcmV0dXJuLCBzb1xuICAgIC8vIHRoZXJlZm9yZSB3ZSBuZWVkIHRvIGFkZCB0aGUgZ3JpZCBlbGVtZW50J3MgYm9yZGVycyB0byB0aGUgZGltZW5zaW9ucyBpZlxuICAgIC8vIGl0J3MgYm94LXNpemluZyBpcyBib3JkZXItYm94LlxuICAgIGlmIChsYXlvdXQuc2V0V2lkdGggfHwgbGF5b3V0LnNldEhlaWdodCkge1xuXG4gICAgICBjb250YWluZXJTdHlsZXMgPSB7fTtcbiAgICAgIGlzQm9yZGVyQm94ID0gZ2V0U3R5bGUoaW5zdC5fZWxlbWVudCwgJ2JveC1zaXppbmcnKSA9PT0gJ2JvcmRlci1ib3gnO1xuXG4gICAgICBpZiAobGF5b3V0LnNldEhlaWdodCkge1xuICAgICAgICBpZiAodHlwZW9mIGxheW91dC5oZWlnaHQgPT09IHR5cGVOdW1iZXIpIHtcbiAgICAgICAgICBjb250YWluZXJTdHlsZXMuaGVpZ2h0ID0gKGlzQm9yZGVyQm94ID8gbGF5b3V0LmhlaWdodCArIGluc3QuX2JvcmRlci50b3AgKyBpbnN0Ll9ib3JkZXIuYm90dG9tIDogbGF5b3V0LmhlaWdodCkgKyAncHgnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbnRhaW5lclN0eWxlcy5oZWlnaHQgPSBsYXlvdXQuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChsYXlvdXQuc2V0V2lkdGgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBsYXlvdXQud2lkdGggPT09IHR5cGVOdW1iZXIpIHtcbiAgICAgICAgICBjb250YWluZXJTdHlsZXMud2lkdGggPSAoaXNCb3JkZXJCb3ggPyBsYXlvdXQud2lkdGggKyBpbnN0Ll9ib3JkZXIubGVmdCArIGluc3QuX2JvcmRlci5yaWdodCA6IGxheW91dC53aWR0aCkgKyAncHgnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbnRhaW5lclN0eWxlcy53aWR0aCA9IGxheW91dC53aWR0aDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzZXRTdHlsZXMoaW5zdC5fZWxlbWVudCwgY29udGFpbmVyU3R5bGVzKTtcblxuICAgIH1cblxuICAgIC8vIEVtaXQgbGF5b3V0U3RhcnQgZXZlbnQuIE5vdGUgdGhhdCB0aGlzIGlzIGludGVudGlvbmFsbHkgZW1pdHRlZCBhZnRlciB0aGVcbiAgICAvLyBjb250YWluZXIgZWxlbWVudCdzIGRpbWVuc2lvbnMgYXJlIHNldCwgYmVjYXVzZSBvdGhlcndpc2UgdGhlcmUgd291bGQgYmVcbiAgICAvLyBubyBob29rIGZvciByZWFjdGluZyB0byBjb250YWluZXIgZGltZW5zaW9uIGNoYW5nZXMuXG4gICAgaW5zdC5fZW1pdChldkxheW91dFN0YXJ0LCBpdGVtcy5jb25jYXQoKSk7XG5cbiAgICAvLyBJZiB0aGVyZSBhcmUgbm8gaXRlbXMgbGV0J3MgZmluaXNoIHF1aWNrbHkuXG4gICAgaWYgKCFpdGVtcy5sZW5ndGgpIHtcbiAgICAgIHRyeUZpbmlzaCgpO1xuICAgICAgcmV0dXJuIGluc3Q7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUgYXJlIGl0ZW1zIGxldCdzIHBvc2l0aW9uIHRoZW0uXG4gICAgZm9yIChpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIGl0ZW0gPSBpdGVtc1tpXTtcbiAgICAgIHBvc2l0aW9uID0gbGF5b3V0LnNsb3RzW2l0ZW0uX2lkXTtcblxuICAgICAgLy8gVXBkYXRlIGl0ZW0ncyBwb3NpdGlvbi5cbiAgICAgIGl0ZW0uX2xlZnQgPSBwb3NpdGlvbi5sZWZ0O1xuICAgICAgaXRlbS5fdG9wID0gcG9zaXRpb24udG9wO1xuXG4gICAgICAvLyBMYXlvdXQgbm9uLWRyYWdnZWQgaXRlbXMuXG4gICAgICBpZiAoaXRlbS5pc0RyYWdnaW5nKCkpIHtcbiAgICAgICAgdHJ5RmluaXNoKHRydWUsIGl0ZW0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGl0ZW0uX2xheW91dChpc0luc3RhbnQsIHRyeUZpbmlzaCk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgbmV3IGl0ZW1zIGJ5IHByb3ZpZGluZyB0aGUgZWxlbWVudHMgeW91IHdpc2ggdG8gYWRkIHRvIHRoZSBpbnN0YW5jZSBhbmRcbiAgICogb3B0aW9uYWxseSBwcm92aWRlIHRoZSBpbmRleCB3aGVyZSB5b3Ugd2FudCB0aGUgaXRlbXMgdG8gYmUgaW5zZXJ0ZWQgaW50by5cbiAgICogQWxsIGVsZW1lbnRzIHRoYXQgYXJlIG5vdCBhbHJlYWR5IGNoaWxkcmVuIG9mIHRoZSBjb250YWluZXIgZWxlbWVudCB3aWxsIGJlXG4gICAqIGF1dG9tYXRpY2FsbHkgYXBwZW5kZWQgdG8gdGhlIGNvbnRhaW5lciBlbGVtZW50LiBJZiBhbiBlbGVtZW50IGhhcyBpdCdzIENTU1xuICAgKiBkaXNwbGF5IHByb3BlcnR5IHNldCB0byBcIm5vbmVcIiBpdCB3aWxsIGJlIG1hcmtlZCBhcyBpbmFjdGl2ZSBkdXJpbmcgdGhlXG4gICAqIGluaXRpYXRpb24gcHJvY2Vzcy4gQXMgbG9uZyBhcyB0aGUgaXRlbSBpcyBpbmFjdGl2ZSBpdCB3aWxsIG5vdCBiZSBwYXJ0IG9mXG4gICAqIHRoZSBsYXlvdXQsIGJ1dCBpdCB3aWxsIHJldGFpbiBpdCdzIGluZGV4LiBZb3UgY2FuIGFjdGl2YXRlIGl0ZW1zIGF0IGFueVxuICAgKiBwb2ludCB3aXRoIGdyaWQuc2hvdygpIG1ldGhvZC4gVGhpcyBtZXRob2Qgd2lsbCBhdXRvbWF0aWNhbGx5IGNhbGxcbiAgICogZ3JpZC5sYXlvdXQoKSBpZiBvbmUgb3IgbW9yZSBvZiB0aGUgYWRkZWQgZWxlbWVudHMgYXJlIHZpc2libGUuIElmIG9ubHlcbiAgICogaGlkZGVuIGl0ZW1zIGFyZSBhZGRlZCBubyBsYXlvdXQgd2lsbCBiZSBjYWxsZWQuIEFsbCB0aGUgbmV3IHZpc2libGUgaXRlbXNcbiAgICogYXJlIHBvc2l0aW9uZWQgd2l0aG91dCBhbmltYXRpb24gZHVyaW5nIHRoZWlyIGZpcnN0IGxheW91dC5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgR3JpZC5wcm90b3R5cGVcbiAgICogQHBhcmFtIHsoSFRNTEVsZW1lbnR8SFRNTEVsZW1lbnRbXSl9IGVsZW1lbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmluZGV4PS0xXVxuICAgKiBAcGFyYW0geyhCb29sZWFufExheW91dENhbGxiYWNrfFN0cmluZyl9IFtvcHRpb25zLmxheW91dD10cnVlXVxuICAgKiBAcmV0dXJucyB7SXRlbVtdfVxuICAgKi9cbiAgR3JpZC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGVsZW1lbnRzLCBvcHRpb25zKSB7XG5cbiAgICB2YXIgaW5zdCA9IHRoaXM7XG5cbiAgICBpZiAoaW5zdC5faXNEZXN0cm95ZWQpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICB2YXIgdGFyZ2V0RWxlbWVudHMgPSBpc05vZGVMaXN0KGVsZW1lbnRzKSA/IG5vZGVMaXN0VG9BcnJheShlbGVtZW50cykgOiBbXS5jb25jYXQoZWxlbWVudHMpO1xuICAgIHZhciBuZXdJdGVtcyA9IFtdO1xuXG4gICAgLy8gUmV0dXJuIGVhcmx5IGlmIHRoZXJlIGFyZSBubyBpdGVtcy5cbiAgICBpZiAoIXRhcmdldEVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG5ld0l0ZW1zO1xuICAgIH1cblxuICAgIHZhciBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgbGF5b3V0ID0gb3B0cy5sYXlvdXQgPyBvcHRzLmxheW91dCA6IG9wdHMubGF5b3V0ID09PSB1bmRlZmluZWQ7XG4gICAgdmFyIGl0ZW1zID0gaW5zdC5faXRlbXM7XG4gICAgdmFyIG5lZWRzTGF5b3V0ID0gZmFsc2U7XG4gICAgdmFyIGVsZW1lbnRJbmRleDtcbiAgICB2YXIgaXRlbTtcbiAgICB2YXIgaTtcblxuICAgIC8vIEZpbHRlciBvdXQgYWxsIGVsZW1lbnRzIHRoYXQgZXhpc3QgYWxyZWFkeSBpbiBjdXJyZW50IGluc3RhbmNlLlxuICAgIC8vIFRPRE86IFRoaXMgZmlsdGVyaW5nIGNhbiBiZSBtYWRlIGEgbG90IGZhc3RlciBieSBzdG9yaW5nIGl0ZW0gZWxlbWVudHNcbiAgICAvLyBpbiBhIE1hcCBvciBXZWFrTWFwLiBPdGhlciBvcHRpb24gd291bGQgYmUgdG8gdHJhbnNmZXIgdGhlIHJlcG9uc2liaWxpdHlcbiAgICAvLyBjb21wbGV0ZWx5IHRvIHRoZSB1c2VyIGFuZCBnZXQgcmlkIG9mIHRoaXMgc2FuaXR5IGNoZWNrLlxuICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgZWxlbWVudEluZGV4ID0gdGFyZ2V0RWxlbWVudHMuaW5kZXhPZihpdGVtc1tpXS5fZWxlbWVudCk7XG4gICAgICBpZiAoZWxlbWVudEluZGV4ID4gLTEpIHtcbiAgICAgICAgdGFyZ2V0RWxlbWVudHMuc3BsaWNlKGVsZW1lbnRJbmRleCwgMSk7XG4gICAgICAgIGlmICghdGFyZ2V0RWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIG5ld0l0ZW1zO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIG5ldyBpdGVtcy5cbiAgICBmb3IgKGkgPSAwOyBpIDwgdGFyZ2V0RWxlbWVudHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgaXRlbSA9IG5ldyBHcmlkLkl0ZW0oaW5zdCwgdGFyZ2V0RWxlbWVudHNbaV0pO1xuICAgICAgbmV3SXRlbXMucHVzaChpdGVtKTtcblxuICAgICAgLy8gSWYgdGhlIGl0ZW0gdG8gYmUgYWRkZWQgaXMgYWN0aXZlLCB3ZSBuZWVkIHRvIGRvIGEgbGF5b3V0LiBBbHNvLCB3ZVxuICAgICAgLy8gbmVlZCB0byBtYXJrIHRoZSBpdGVtIHdpdGggdGhlIHNraXBOZXh0TGF5b3V0QW5pbWF0aW9uIGZsYWcgdG8gbWFrZSBpdFxuICAgICAgLy8gcG9zaXRpb24gaW5zdGFudGx5ICh3aXRob3V0IGFuaW1hdGlvbikgZHVyaW5nIHRoZSBuZXh0IGxheW91dC4gV2l0aG91dFxuICAgICAgLy8gdGhlIGhhY2sgdGhlIGl0ZW0gd291bGQgYW5pbWF0ZSB0byBpdCdzIG5ldyBwb3NpdGlvbiBmcm9tIHRoZSBub3J0aHdlc3RcbiAgICAgIC8vIGNvcm5lciBvZiB0aGUgZ3JpZCwgd2hpY2ggZmVlbHMgYSBiaXQgYnVnZ3kgKGltaG8pLlxuICAgICAgaWYgKGl0ZW0uX2lzQWN0aXZlKSB7XG4gICAgICAgIG5lZWRzTGF5b3V0ID0gdHJ1ZTtcbiAgICAgICAgaXRlbS5fc2tpcE5leHRMYXlvdXRBbmltYXRpb24gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gQWRkIHRoZSBuZXcgaXRlbXMgdG8gdGhlIGl0ZW1zIGNvbGxlY3Rpb24gdG8gY29ycmVjdCBpbmRleC5cbiAgICBpbnNlcnRJdGVtc1RvQXJyYXkoaXRlbXMsIG5ld0l0ZW1zLCBvcHRzLmluZGV4KTtcblxuICAgIC8vIEVtaXQgYWRkIGV2ZW50LlxuICAgIGluc3QuX2VtaXQoZXZBZGQsIG5ld0l0ZW1zLmNvbmNhdCgpKTtcblxuICAgIC8vIElmIGxheW91dCBpcyBuZWVkZWQuXG4gICAgaWYgKG5lZWRzTGF5b3V0ICYmIGxheW91dCkge1xuICAgICAgaW5zdC5sYXlvdXQobGF5b3V0ID09PSAnaW5zdGFudCcsIHR5cGVvZiBsYXlvdXQgPT09IHR5cGVGdW5jdGlvbiA/IGxheW91dCA6IHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIG5ldyBpdGVtcy5cbiAgICByZXR1cm4gbmV3SXRlbXM7XG5cbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlIGl0ZW1zIGZyb20gdGhlIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBHcmlkLnByb3RvdHlwZVxuICAgKiBAcGFyYW0geyhHcmlkTXVsdGlJdGVtUXVlcnl8R3JpZEl0ZW1TdGF0ZSl9IGl0ZW1zXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5yZW1vdmVFbGVtZW50cz1mYWxzZV1cbiAgICogQHBhcmFtIHsoQm9vbGVhbnxMYXlvdXRDYWxsYmFja3xTdHJpbmcpfSBbb3B0aW9ucy5sYXlvdXQ9dHJ1ZV1cbiAgICogQHJldHVybnMge0l0ZW1bXX1cbiAgICovXG4gIEdyaWQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChpdGVtcywgb3B0aW9ucykge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuXG4gICAgaWYgKGluc3QuX2lzRGVzdHJveWVkKSB7XG4gICAgICByZXR1cm4gaW5zdDtcbiAgICB9XG5cbiAgICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gICAgdmFyIGxheW91dCA9IG9wdHMubGF5b3V0ID8gb3B0cy5sYXlvdXQgOiBvcHRzLmxheW91dCA9PT0gdW5kZWZpbmVkO1xuICAgIHZhciBuZWVkc0xheW91dCA9IGZhbHNlO1xuICAgIHZhciB0YXJnZXRJdGVtcyA9IGluc3QuZ2V0SXRlbXMoaXRlbXMpO1xuICAgIHZhciBpdGVtO1xuICAgIHZhciBpO1xuXG4gICAgLy8gUmVtb3ZlIHRoZSBpbmRpdmlkdWFsIGl0ZW1zLlxuICAgIGZvciAoaSA9IDA7IGkgPCB0YXJnZXRJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgaXRlbSA9IHRhcmdldEl0ZW1zW2ldO1xuICAgICAgaWYgKGl0ZW0uX2lzQWN0aXZlKSB7XG4gICAgICAgIG5lZWRzTGF5b3V0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGl0ZW0uX2Rlc3Ryb3kob3B0cy5yZW1vdmVFbGVtZW50cyk7XG4gICAgfVxuXG4gICAgLy8gRW1pdCByZW1vdmUgZXZlbnQuXG4gICAgaW5zdC5fZW1pdChldlJlbW92ZSwgdGFyZ2V0SXRlbXMuY29uY2F0KCkpO1xuXG4gICAgLy8gSWYgbGF5b3V0IGlzIG5lZWRlZC5cbiAgICBpZiAobmVlZHNMYXlvdXQgJiYgbGF5b3V0KSB7XG4gICAgICBpbnN0LmxheW91dChsYXlvdXQgPT09ICdpbnN0YW50JywgdHlwZW9mIGxheW91dCA9PT0gdHlwZUZ1bmN0aW9uID8gbGF5b3V0IDogdW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0SXRlbXM7XG5cbiAgfTtcblxuICAvKipcbiAgICogU2hvdyBpbnN0YW5jZSBpdGVtcy5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgR3JpZC5wcm90b3R5cGVcbiAgICogQHBhcmFtIHsoR3JpZE11bHRpSXRlbVF1ZXJ5fEdyaWRJdGVtU3RhdGUpfSBpdGVtc1xuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuaW5zdGFudD1mYWxzZV1cbiAgICogQHBhcmFtIHtTaG93Q2FsbGJhY2t9IFtvcHRpb25zLm9uRmluaXNoXVxuICAgKiBAcGFyYW0geyhCb29sZWFufExheW91dENhbGxiYWNrfFN0cmluZyl9IFtvcHRpb25zLmxheW91dD10cnVlXVxuICAgKiBAcmV0dXJucyB7R3JpZH1cbiAgICovXG4gIEdyaWQucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoaXRlbXMsIG9wdGlvbnMpIHtcblxuICAgIHJldHVybiB0aGlzLl9pc0Rlc3Ryb3llZCA/IHRoaXMgOiBncmlkU2hvd0hpZGVIYW5kbGVyKHRoaXMsICdzaG93JywgaXRlbXMsIG9wdGlvbnMpO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEhpZGUgaW5zdGFuY2UgaXRlbXMuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEdyaWQucHJvdG90eXBlXG4gICAqIEBwYXJhbSB7KEdyaWRNdWx0aUl0ZW1RdWVyeXxHcmlkSXRlbVN0YXRlKX0gaXRlbXNcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmluc3RhbnQ9ZmFsc2VdXG4gICAqIEBwYXJhbSB7SGlkZUNhbGxiYWNrfSBbb3B0aW9ucy5vbkZpbmlzaF1cbiAgICogQHBhcmFtIHsoQm9vbGVhbnxMYXlvdXRDYWxsYmFja3xTdHJpbmcpfSBbb3B0aW9ucy5sYXlvdXQ9dHJ1ZV1cbiAgICogQHJldHVybnMge0dyaWR9XG4gICAqL1xuICBHcmlkLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKGl0ZW1zLCBvcHRpb25zKSB7XG5cbiAgICByZXR1cm4gdGhpcy5faXNEZXN0cm95ZWQgPyB0aGlzIDogZ3JpZFNob3dIaWRlSGFuZGxlcih0aGlzLCAnaGlkZScsIGl0ZW1zLCBvcHRpb25zKTtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBGaWx0ZXIgaXRlbXMuIEV4cGVjdHMgYXQgbGVhc3Qgb25lIGFyZ3VtZW50LCBhIHByZWRpY2F0ZSwgd2hpY2ggc2hvdWxkIGJlXG4gICAqIGVpdGhlciBhIGZ1bmN0aW9uIG9yIGEgc3RyaW5nLiBUaGUgcHJlZGljYXRlIGNhbGxiYWNrIGlzIGV4ZWN1dGVkIGZvciBldmVyeVxuICAgKiBpdGVtIGluIHRoZSBpbnN0YW5jZS4gSWYgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgcHJlZGljYXRlIGlzIHRydXRoeSB0aGVcbiAgICogaXRlbSBpbiBxdWVzdGlvbiB3aWxsIGJlIHNob3duIGFuZCBvdGhlcndpc2UgaGlkZGVuLiBUaGUgcHJlZGljYXRlIGNhbGxiYWNrXG4gICAqIHJlY2VpdmVzIHRoZSBpdGVtIGluc3RhbmNlIGFzIGl0J3MgYXJndW1lbnQuIElmIHRoZSBwcmVkaWNhdGUgaXMgYSBzdHJpbmdcbiAgICogaXQgaXMgY29uc2lkZXJlZCB0byBiZSBhIHNlbGVjdG9yIGFuZCBpdCBpcyBjaGVja2VkIGFnYWluc3QgZXZlcnkgaXRlbVxuICAgKiBlbGVtZW50IGluIHRoZSBpbnN0YW5jZSB3aXRoIHRoZSBuYXRpdmUgZWxlbWVudC5tYXRjaGVzKCkgbWV0aG9kLiBBbGwgdGhlXG4gICAqIG1hdGNoaW5nIGl0ZW1zIHdpbGwgYmUgc2hvd24gYW5kIG90aGVycyBoaWRkZW4uXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEdyaWQucHJvdG90eXBlXG4gICAqIEBwYXJhbSB7KEZ1bmN0aW9ufFN0cmluZyl9IHByZWRpY2F0ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuaW5zdGFudD1mYWxzZV1cbiAgICogQHBhcmFtIHtGaWx0ZXJDYWxsYmFja30gW29wdGlvbnMub25GaW5pc2hdXG4gICAqIEBwYXJhbSB7KEJvb2xlYW58TGF5b3V0Q2FsbGJhY2t8U3RyaW5nKX0gW29wdGlvbnMubGF5b3V0PXRydWVdXG4gICAqIEByZXR1cm5zIHtHcmlkfVxuICAgKi9cbiAgR3JpZC5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24gKHByZWRpY2F0ZSwgb3B0aW9ucykge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuXG4gICAgLy8gUmV0dXJuIGltbWVkaWF0ZWx5IGlmIHRoZXJlIGFyZSBubyBpdGVtcyBvciBpZiB0aGUgaW5zdGFuY2UgaWQgZGVzdHJveWVkLlxuICAgIGlmIChpbnN0Ll9pc0Rlc3Ryb3llZCB8fCAhaW5zdC5faXRlbXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gaW5zdDtcbiAgICB9XG5cbiAgICB2YXIgaXRlbXMgPSBpbnN0Ll9pdGVtcztcbiAgICB2YXIgcHJlZGljYXRlVHlwZSA9IHR5cGVvZiBwcmVkaWNhdGU7XG4gICAgdmFyIGlzUHJlZGljYXRlU3RyaW5nID0gcHJlZGljYXRlVHlwZSA9PT0gdHlwZVN0cmluZztcbiAgICB2YXIgaXNQcmVkaWNhdGVGbiA9IHByZWRpY2F0ZVR5cGUgPT09IHR5cGVGdW5jdGlvbjtcbiAgICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gICAgdmFyIGlzSW5zdGFudCA9IG9wdHMuaW5zdGFudCA9PT0gdHJ1ZTtcbiAgICB2YXIgbGF5b3V0ID0gb3B0cy5sYXlvdXQgPyBvcHRzLmxheW91dCA6IG9wdHMubGF5b3V0ID09PSB1bmRlZmluZWQ7XG4gICAgdmFyIG9uRmluaXNoID0gdHlwZW9mIG9wdHMub25GaW5pc2ggPT09IHR5cGVGdW5jdGlvbiA/IG9wdHMub25GaW5pc2ggOiBudWxsO1xuICAgIHZhciBpdGVtc1RvU2hvdyA9IFtdO1xuICAgIHZhciBpdGVtc1RvSGlkZSA9IFtdO1xuICAgIHZhciB0cnlGaW5pc2hDb3VudGVyID0gLTE7XG4gICAgdmFyIHRyeUZpbmlzaCA9ICFvbkZpbmlzaCA/IG5vb3AgOiBmdW5jdGlvbiAoKSB7XG4gICAgICArK3RyeUZpbmlzaENvdW50ZXIgJiYgb25GaW5pc2goaXRlbXNUb1Nob3cuY29uY2F0KCksIGl0ZW1zVG9IaWRlLmNvbmNhdCgpKTtcbiAgICB9O1xuICAgIHZhciBpdGVtO1xuICAgIHZhciBpO1xuXG4gICAgLy8gQ2hlY2sgd2hpY2ggaXRlbXMgbmVlZCB0byBiZSBzaG93biBhbmQgd2hpY2ggaGlkZGVuLlxuICAgIGlmIChpc1ByZWRpY2F0ZUZuIHx8IGlzUHJlZGljYXRlU3RyaW5nKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlbSA9IGl0ZW1zW2ldO1xuICAgICAgICBpZiAoaXNQcmVkaWNhdGVGbiA/IHByZWRpY2F0ZShpdGVtKSA6IGVsZW1lbnRNYXRjaGVzKGl0ZW0uX2VsZW1lbnQsIHByZWRpY2F0ZSkpIHtcbiAgICAgICAgICBpdGVtc1RvU2hvdy5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGl0ZW1zVG9IaWRlLnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTaG93IGl0ZW1zIHRoYXQgbmVlZCB0byBiZSBzaG93bi5cbiAgICBpZiAoaXRlbXNUb1Nob3cubGVuZ3RoKSB7XG4gICAgICBpbnN0LnNob3coaXRlbXNUb1Nob3csIHtcbiAgICAgICAgaW5zdGFudDogaXNJbnN0YW50LFxuICAgICAgICBvbkZpbmlzaDogdHJ5RmluaXNoLFxuICAgICAgICBsYXlvdXQ6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0cnlGaW5pc2goKTtcbiAgICB9XG5cbiAgICAvLyBIaWRlIGl0ZW1zIHRoYXQgbmVlZCB0byBiZSBoaWRkZW4uXG4gICAgaWYgKGl0ZW1zVG9IaWRlLmxlbmd0aCkge1xuICAgICAgaW5zdC5oaWRlKGl0ZW1zVG9IaWRlLCB7XG4gICAgICAgIGluc3RhbnQ6IGlzSW5zdGFudCxcbiAgICAgICAgb25GaW5pc2g6IHRyeUZpbmlzaCxcbiAgICAgICAgbGF5b3V0OiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdHJ5RmluaXNoKCk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUgYXJlIGFueSBpdGVtcyB0byBmaWx0ZXIuXG4gICAgaWYgKGl0ZW1zVG9TaG93Lmxlbmd0aCB8fCBpdGVtc1RvSGlkZS5sZW5ndGgpIHtcblxuICAgICAgLy8gRW1pdCBmaWx0ZXIgZXZlbnQuXG4gICAgICBpbnN0Ll9lbWl0KGV2RmlsdGVyLCBpdGVtc1RvU2hvdy5jb25jYXQoKSwgaXRlbXNUb0hpZGUuY29uY2F0KCkpO1xuXG4gICAgICAvLyBJZiBsYXlvdXQgaXMgbmVlZGVkLlxuICAgICAgaWYgKGxheW91dCkge1xuICAgICAgICBpbnN0LmxheW91dChsYXlvdXQgPT09ICdpbnN0YW50JywgdHlwZW9mIGxheW91dCA9PT0gdHlwZUZ1bmN0aW9uID8gbGF5b3V0IDogdW5kZWZpbmVkKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBpbnN0O1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIFNvcnQgaXRlbXMuIFRoZXJlIGFyZSB0aHJlZSB3YXlzIHRvIHNvcnQgdGhlIGl0ZW1zLiBUaGUgZmlyc3QgaXMgc2ltcGx5IGJ5XG4gICAqIHByb3ZpZGluZyBhIGZ1bmN0aW9uIGFzIHRoZSBjb21wYXJlciB3aGljaCB3b3JrcyBpZGVudGljYWxseSB0byBuYXRpdmVcbiAgICogYXJyYXkgc29ydC4gQWx0ZXJuYXRpdmVseSB5b3UgY2FuIHNvcnQgYnkgdGhlIHNvcnQgZGF0YSB5b3UgaGF2ZSBwcm92aWRlZFxuICAgKiBpbiB0aGUgaW5zdGFuY2UncyBvcHRpb25zLiBKdXN0IHByb3ZpZGUgdGhlIHNvcnQgZGF0YSBrZXkocykgYXMgYSBzdHJpbmdcbiAgICogKHNlcGFyYXRlZCBieSBzcGFjZSkgYW5kIHRoZSBpdGVtcyB3aWxsIGJlIHNvcnRlZCBiYXNlZCBvbiB0aGUgcHJvdmlkZWRcbiAgICogc29ydCBkYXRhIGtleXMuIExhc3RseSB5b3UgaGF2ZSB0aGUgb3Bwb3J0dW5pdHkgdG8gcHJvdmlkZSBhIHByZXNvcnRlZFxuICAgKiBhcnJheSBvZiBpdGVtcyB3aGljaCB3aWxsIGJlIHVzZWQgdG8gc3luYyB0aGUgaW50ZXJuYWwgaXRlbXMgYXJyYXkgaW4gdGhlXG4gICAqIHNhbWUgb3JkZXIuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEdyaWQucHJvdG90eXBlXG4gICAqIEBwYXJhbSB7KEZ1bmN0aW9ufEl0ZW1bXXxTdHJpbmd8U3RyaW5nW10pfSBjb21wYXJlclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZGVzY2VuZGluZz1mYWxzZV1cbiAgICogQHBhcmFtIHsoQm9vbGVhbnxMYXlvdXRDYWxsYmFja3xTdHJpbmcpfSBbb3B0aW9ucy5sYXlvdXQ9dHJ1ZV1cbiAgICogQHJldHVybnMge0dyaWR9XG4gICAqL1xuICBHcmlkLnByb3RvdHlwZS5zb3J0ID0gZnVuY3Rpb24gKGNvbXBhcmVyLCBvcHRpb25zKSB7XG5cbiAgICB2YXIgaW5zdCA9IHRoaXM7XG5cbiAgICAvLyBMZXQncyBub3Qgc29ydCBpZiBpdCBoYXMgbm8gZWZmZWN0LlxuICAgIGlmIChpbnN0Ll9pc0Rlc3Ryb3llZCB8fCBpbnN0Ll9pdGVtcy5sZW5ndGggPCAyKSB7XG4gICAgICByZXR1cm4gaW5zdDtcbiAgICB9XG5cbiAgICB2YXIgaXRlbXMgPSBpbnN0Ll9pdGVtcztcbiAgICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gICAgdmFyIGlzRGVzY2VuZGluZyA9ICEhb3B0cy5kZXNjZW5kaW5nO1xuICAgIHZhciBsYXlvdXQgPSBvcHRzLmxheW91dCA/IG9wdHMubGF5b3V0IDogb3B0cy5sYXlvdXQgPT09IHVuZGVmaW5lZDtcbiAgICB2YXIgb3JpZ0l0ZW1zID0gaXRlbXMuY29uY2F0KCk7XG4gICAgdmFyIGluZGV4TWFwO1xuXG4gICAgLy8gSWYgZnVuY3Rpb24gaXMgcHJvdmlkZWQgZG8gYSBuYXRpdmUgYXJyYXkgc29ydC5cbiAgICBpZiAodHlwZW9mIGNvbXBhcmVyID09PSB0eXBlRnVuY3Rpb24pIHtcbiAgICAgIGl0ZW1zLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGNvbXBhcmVyKGEsIGIpO1xuICAgICAgICByZXR1cm4gKGlzRGVzY2VuZGluZyAmJiByZXN1bHQgIT09IDAgPyAtcmVzdWx0IDogcmVzdWx0KSB8fCBjb21wYXJlSXRlbUluZGljZXMoYSwgYiwgaXNEZXNjZW5kaW5nLCBpbmRleE1hcCB8fCAoaW5kZXhNYXAgPSBnZXRJdGVtSW5kZXhNYXAob3JpZ0l0ZW1zKSkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gT3RoZXJ3aXNlIGlmIHdlIGdvdCBhIHN0cmluZywgbGV0J3Mgc29ydCBieSB0aGUgc29ydCBkYXRhIGFzIHByb3ZpZGVkIGluXG4gICAgLy8gdGhlIGluc3RhbmNlJ3Mgb3B0aW9ucy5cbiAgICBlbHNlIGlmICh0eXBlb2YgY29tcGFyZXIgPT09IHR5cGVTdHJpbmcpIHtcbiAgICAgIGNvbXBhcmVyID0gY29tcGFyZXIudHJpbSgpLnNwbGl0KCcgJykubWFwKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHZhbC5zcGxpdCgnOicpO1xuICAgICAgfSk7XG4gICAgICBpdGVtcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBjb21wYXJlSXRlbXMoYSwgYiwgaXNEZXNjZW5kaW5nLCBjb21wYXJlcikgfHwgY29tcGFyZUl0ZW1JbmRpY2VzKGEsIGIsIGlzRGVzY2VuZGluZywgaW5kZXhNYXAgfHwgKGluZGV4TWFwID0gZ2V0SXRlbUluZGV4TWFwKG9yaWdJdGVtcykpKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIE90aGVyd2lzZSBpZiB3ZSBnb3QgYW4gYXJyYXksIGxldCdzIGFzc3VtZSBpdCdzIGEgcHJlc29ydGVkIGFycmF5IG9mIHRoZVxuICAgIC8vIGl0ZW1zIGFuZCBvcmRlciB0aGUgaXRlbXMgYmFzZWQgb24gaXQuXG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjb21wYXJlcikpIHtcbiAgICAgIHNvcnRJdGVtc0J5UmVmZXJlbmNlKGl0ZW1zLCBjb21wYXJlcik7XG4gICAgICBpZiAoaXNEZXNjZW5kaW5nKSB7XG4gICAgICAgIGl0ZW1zLnJldmVyc2UoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2UsIGxldCdzIGdvIGhvbWUuXG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gaW5zdDtcbiAgICB9XG5cbiAgICAvLyBFbWl0IHNvcnQgZXZlbnQuXG4gICAgaW5zdC5fZW1pdChldlNvcnQsIGl0ZW1zLmNvbmNhdCgpLCBvcmlnSXRlbXMpO1xuXG4gICAgLy8gSWYgbGF5b3V0IGlzIG5lZWRlZC5cbiAgICBpZiAobGF5b3V0KSB7XG4gICAgICBpbnN0LmxheW91dChsYXlvdXQgPT09ICdpbnN0YW50JywgdHlwZW9mIGxheW91dCA9PT0gdHlwZUZ1bmN0aW9uID8gbGF5b3V0IDogdW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBNb3ZlIGl0ZW0gdG8gYW5vdGhlciBpbmRleCBvciBpbiBwbGFjZSBvZiBhbm90aGVyIGl0ZW0uXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEdyaWQucHJvdG90eXBlXG4gICAqIEBwYXJhbSB7R3JpZFNpbmdsZUl0ZW1RdWVyeX0gaXRlbVxuICAgKiBAcGFyYW0ge0dyaWRTaW5nbGVJdGVtUXVlcnl9IHBvc2l0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmFjdGlvbj1cIm1vdmVcIl1cbiAgICogICAtIEFjY2VwdHMgZWl0aGVyIFwibW92ZVwiIG9yIFwic3dhcFwiLlxuICAgKiAgIC0gXCJtb3ZlXCIgbW92ZXMgdGhlIGl0ZW0gaW4gcGxhY2Ugb2YgdGhlIG90aGVyIGl0ZW0uXG4gICAqICAgLSBcInN3YXBcIiBzd2FwcyB0aGUgcG9zaXRpb24gb2YgdGhlIGl0ZW1zLlxuICAgKiBAcGFyYW0geyhCb29sZWFufExheW91dENhbGxiYWNrfFN0cmluZyl9IFtvcHRpb25zLmxheW91dD10cnVlXVxuICAgKiBAcmV0dXJucyB7R3JpZH1cbiAgICovXG4gIEdyaWQucHJvdG90eXBlLm1vdmUgPSBmdW5jdGlvbiAoaXRlbSwgcG9zaXRpb24sIG9wdGlvbnMpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuICAgIC8vIFJldHVybiBpbW1lZGlhdGVseSwgaWYgbW92aW5nIGFuIGl0ZW0gaXMgbm90IHBvc3NpYmxlLlxuICAgIGlmIChpbnN0Ll9pc0Rlc3Ryb3llZCB8fCBpbnN0Ll9pdGVtcy5sZW5ndGggPCAyKSB7XG4gICAgICByZXR1cm4gaW5zdDtcbiAgICB9XG5cbiAgICB2YXIgaXRlbXMgPSBpbnN0Ll9pdGVtcztcbiAgICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gICAgdmFyIGxheW91dCA9IG9wdHMubGF5b3V0ID8gb3B0cy5sYXlvdXQgOiBvcHRzLmxheW91dCA9PT0gdW5kZWZpbmVkO1xuICAgIHZhciBpc1N3YXAgPSBvcHRzLmFjdGlvbiA9PT0gJ3N3YXAnO1xuICAgIHZhciBhY3Rpb24gPSBpc1N3YXAgPyAnc3dhcCcgOiAnbW92ZSc7XG4gICAgdmFyIGZyb21JdGVtID0gaW5zdC5fZ2V0SXRlbShpdGVtKTtcbiAgICB2YXIgdG9JdGVtID0gaW5zdC5fZ2V0SXRlbShwb3NpdGlvbik7XG4gICAgdmFyIGZyb21JbmRleDtcbiAgICB2YXIgdG9JbmRleDtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGUgaXRlbXMgZXhpc3QgYW5kIGFyZSBub3QgdGhlIHNhbWUuXG4gICAgaWYgKGZyb21JdGVtICYmIHRvSXRlbSAmJiAoZnJvbUl0ZW0gIT09IHRvSXRlbSkpIHtcblxuICAgICAgLy8gR2V0IHRoZSBpbmRpY2VzIG9mIHRoZSBpdGVtcy5cbiAgICAgIGZyb21JbmRleCA9IGl0ZW1zLmluZGV4T2YoZnJvbUl0ZW0pO1xuICAgICAgdG9JbmRleCA9IGl0ZW1zLmluZGV4T2YodG9JdGVtKTtcblxuICAgICAgLy8gRG8gdGhlIG1vdmUvc3dhcC5cbiAgICAgIChpc1N3YXAgPyBhcnJheVN3YXAgOiBhcnJheU1vdmUpKGl0ZW1zLCBmcm9tSW5kZXgsIHRvSW5kZXgpO1xuXG4gICAgICAvLyBFbWl0IG1vdmUgZXZlbnQuXG4gICAgICBpbnN0Ll9lbWl0KGV2TW92ZSwge1xuICAgICAgICBpdGVtOiBmcm9tSXRlbSxcbiAgICAgICAgZnJvbUluZGV4OiBmcm9tSW5kZXgsXG4gICAgICAgIHRvSW5kZXg6IHRvSW5kZXgsXG4gICAgICAgIGFjdGlvbjogYWN0aW9uXG4gICAgICB9KTtcblxuICAgICAgLy8gSWYgbGF5b3V0IGlzIG5lZWRlZC5cbiAgICAgIGlmIChsYXlvdXQpIHtcbiAgICAgICAgaW5zdC5sYXlvdXQobGF5b3V0ID09PSAnaW5zdGFudCcsIHR5cGVvZiBsYXlvdXQgPT09IHR5cGVGdW5jdGlvbiA/IGxheW91dCA6IHVuZGVmaW5lZCk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBTZW5kIGl0ZW0gdG8gYW5vdGhlciBHcmlkIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBHcmlkLnByb3RvdHlwZVxuICAgKiBAcGFyYW0ge0dyaWRTaW5nbGVJdGVtUXVlcnl9IGl0ZW1cbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXG4gICAqIEBwYXJhbSB7R3JpZFNpbmdsZUl0ZW1RdWVyeX0gcG9zaXRpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbb3B0aW9ucy5hcHBlbmRUbz1kb2N1bWVudC5ib2R5XVxuICAgKiBAcGFyYW0geyhCb29sZWFufExheW91dENhbGxiYWNrfFN0cmluZyl9IFtvcHRpb25zLmxheW91dFNlbmRlcj10cnVlXVxuICAgKiBAcGFyYW0geyhCb29sZWFufExheW91dENhbGxiYWNrfFN0cmluZyl9IFtvcHRpb25zLmxheW91dFJlY2VpdmVyPXRydWVdXG4gICAqIEByZXR1cm5zIHtHcmlkfVxuICAgKi9cbiAgR3JpZC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChpdGVtLCBncmlkLCBwb3NpdGlvbiwgb3B0aW9ucykge1xuXG4gICAgdmFyIGN1cnJlbnRHcmlkID0gdGhpcztcblxuICAgIC8vIFJldHVybiBpbW1lZGlhdGVseSBpZiBlaXRoZXIgZ3JpZCBpcyBkZXN0cm95ZWQgb3IgaWYgdGhlIGdyaWRzIGFyZSB0aGVcbiAgICAvLyBzYW1lLCBvciBpZiB0YXJnZXQgaXRlbSB3YXMgbm90IGZvdW5kLlxuICAgIGlmIChjdXJyZW50R3JpZC5faXNEZXN0cm95ZWQgfHwgZ3JpZC5faXNEZXN0cm95ZWQgfHwgY3VycmVudEdyaWQgPT09IGdyaWQgfHwgIShpdGVtID0gY3VycmVudEdyaWQuX2dldEl0ZW0oaXRlbSkpKSB7XG4gICAgICByZXR1cm4gY3VycmVudEdyaWQ7XG4gICAgfVxuXG4gICAgdmFyIHRhcmdldEdyaWQgPSBncmlkO1xuICAgIHZhciBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgY29udGFpbmVyID0gb3B0cy5hcHBlbmRUbyB8fCBib2R5O1xuICAgIHZhciBsYXlvdXRTZW5kZXIgPSBvcHRzLmxheW91dFNlbmRlciA/IG9wdHMubGF5b3V0U2VuZGVyIDogb3B0cy5sYXlvdXRTZW5kZXIgPT09IHVuZGVmaW5lZDtcbiAgICB2YXIgbGF5b3V0UmVjZWl2ZXIgPSBvcHRzLmxheW91dFJlY2VpdmVyID8gb3B0cy5sYXlvdXRSZWNlaXZlciA6IG9wdHMubGF5b3V0UmVjZWl2ZXIgPT09IHVuZGVmaW5lZDtcblxuICAgIC8vIFN0YXJ0IHRoZSBtaWdyYXRpb24gcHJvY2Vzcy5cbiAgICBpdGVtLl9taWdyYXRlLnN0YXJ0KHRhcmdldEdyaWQsIHBvc2l0aW9uLCBjb250YWluZXIpO1xuXG4gICAgLy8gSWYgbWlncmF0aW9uIHdhcyBzdGFydGVkIHN1Y2Nlc2Z1bGx5IGFuZCB0aGUgaXRlbSBpcyBhY3RpdmUsIGxldCdzIGxheW91dFxuICAgIC8vIHRoZSBncmlkcy5cbiAgICBpZiAoaXRlbS5fbWlncmF0ZS5pc0FjdGl2ZSAmJiBpdGVtLmlzQWN0aXZlKCkpIHtcbiAgICAgIGlmIChsYXlvdXRTZW5kZXIpIHtcbiAgICAgICAgY3VycmVudEdyaWQubGF5b3V0KGxheW91dFNlbmRlciA9PT0gJ2luc3RhbnQnLCB0eXBlb2YgbGF5b3V0U2VuZGVyID09PSB0eXBlRnVuY3Rpb24gPyBsYXlvdXRTZW5kZXIgOiB1bmRlZmluZWQpO1xuICAgICAgfVxuICAgICAgaWYgKGxheW91dFJlY2VpdmVyKSB7XG4gICAgICAgIHRhcmdldEdyaWQubGF5b3V0KGxheW91dFJlY2VpdmVyID09PSAnaW5zdGFudCcsIHR5cGVvZiBsYXlvdXRSZWNlaXZlciA9PT0gdHlwZUZ1bmN0aW9uID8gbGF5b3V0UmVjZWl2ZXIgOiB1bmRlZmluZWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjdXJyZW50R3JpZDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBEZXN0cm95IHRoZSBpbnN0YW5jZS5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgR3JpZC5wcm90b3R5cGVcbiAgICogQHBhcmFtIHtCb29sZWFufSBbcmVtb3ZlRWxlbWVudHM9ZmFsc2VdXG4gICAqIEByZXR1cm5zIHtHcmlkfVxuICAgKi9cbiAgR3JpZC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChyZW1vdmVFbGVtZW50cykge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuXG4gICAgaWYgKGluc3QuX2lzRGVzdHJveWVkKSB7XG4gICAgICByZXR1cm4gaW5zdDtcbiAgICB9XG5cbiAgICB2YXIgY29udGFpbmVyID0gaW5zdC5fZWxlbWVudDtcbiAgICB2YXIgaXRlbXMgPSBpbnN0Ll9pdGVtcy5jb25jYXQoKTtcbiAgICB2YXIgaTtcblxuICAgIC8vIFVuYmluZCB3aW5kb3cgcmVzaXplIGV2ZW50IGxpc3RlbmVyLlxuICAgIGlmIChpbnN0Ll9yZXNpemVIYW5kbGVyKSB7XG4gICAgICBnbG9iYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5zdC5fcmVzaXplSGFuZGxlcik7XG4gICAgfVxuXG4gICAgLy8gRGVzdHJveSBpdGVtcy5cbiAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGl0ZW1zW2ldLl9kZXN0cm95KHJlbW92ZUVsZW1lbnRzKTtcbiAgICB9XG5cbiAgICAvLyBSZXN0b3JlIGNvbnRhaW5lci5cbiAgICByZW1vdmVDbGFzcyhjb250YWluZXIsIGluc3QuX3NldHRpbmdzLmNvbnRhaW5lckNsYXNzKTtcbiAgICBzZXRTdHlsZXMoY29udGFpbmVyLCB7aGVpZ2h0OiAnJ30pO1xuXG4gICAgLy8gRW1pdCBkZXN0cm95IGV2ZW50IGFuZCB1bmJpbmQgYWxsIGV2ZW50cy5cbiAgICBpbnN0Ll9lbWl0KGV2RGVzdHJveSk7XG4gICAgaW5zdC5fZW1pdHRlci5kZXN0cm95KCk7XG5cbiAgICAvLyBSZW1vdmUgcmVmZXJlbmNlIGZyb20gdGhlIGdyaWQgaW5zdGFuY2VzIGNvbGxlY3Rpb24uXG4gICAgZ3JpZEluc3RhbmNlc1tpbnN0Ll9pZF0gPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBGbGFnIGluc3RhbmNlIGFzIGRlc3Ryb3llZC5cbiAgICBpbnN0Ll9pc0Rlc3Ryb3llZCA9IHRydWU7XG5cbiAgICByZXR1cm4gaW5zdDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBHcmlkIC0gUHJvdGVjdGVkIHByb3RvdHlwZSBtZXRob2RzXG4gICAqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICovXG5cbiAgLyoqXG4gICAqIEdldCBpbnN0YW5jZSdzIGl0ZW0gYnkgZWxlbWVudCBvciBieSBpbmRleC4gVGFyZ2V0IGNhbiBhbHNvIGJlIGFuIEl0ZW1cbiAgICogaW5zdGFuY2UgaW4gd2hpY2ggY2FzZSB0aGUgZnVuY3Rpb24gcmV0dXJucyB0aGUgaXRlbSBpZiBpdCBleGlzdHMgd2l0aGluXG4gICAqIHJlbGF0ZWQgR3JpZCBpbnN0YW5jZS4gSWYgbm90aGluZyBpcyBmb3VuZCB3aXRoIHRoZSBwcm92aWRlZCB0YXJnZXQsIG51bGxcbiAgICogaXMgcmV0dXJuZWQuXG4gICAqXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQG1lbWJlcm9mIEdyaWQucHJvdG90eXBlXG4gICAqIEBwYXJhbSB7R3JpZFNpbmdsZUl0ZW1RdWVyeX0gW3RhcmdldD0wXVxuICAgKiBAcmV0dXJucyB7P0l0ZW19XG4gICAqL1xuICBHcmlkLnByb3RvdHlwZS5fZ2V0SXRlbSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcbiAgICB2YXIgaXRlbXMgPSBpbnN0Ll9pdGVtcztcbiAgICB2YXIgaTtcblxuICAgIC8vIElmIG5vIHRhcmdldCBpcyBzcGVjaWZpZWQgb3IgdGhlIGluc3RhbmNlIGlzIGRlc3Ryb3llZCwgcmV0dXJuIHRoZSBmaXJzdFxuICAgIC8vIGl0ZW0gb3IgbnVsbC5cbiAgICBpZiAoaW5zdC5faXNEZXN0cm95ZWQgfHwgIXRhcmdldCkge1xuICAgICAgcmV0dXJuIGl0ZW1zWzBdIHx8IG51bGw7XG4gICAgfVxuXG4gICAgLy8gSWYgdGFyZ2V0IGlzIG51bWJlciByZXR1cm4gdGhlIGl0ZW0gaW4gdGhhdCBpbmRleC4gSWYgdGhlIG51bWJlciBpcyBsb3dlclxuICAgIC8vIHRoYW4gemVybyBsb29rIGZvciB0aGUgaXRlbSBzdGFydGluZyBmcm9tIHRoZSBlbmQgb2YgdGhlIGl0ZW1zIGFycmF5LiBGb3JcbiAgICAvLyBleGFtcGxlIC0xIGZvciB0aGUgbGFzdCBpdGVtLCAtMiBmb3IgdGhlIHNlY29uZCBsYXN0IGl0ZW0sIGV0Yy5cbiAgICBlbHNlIGlmICh0eXBlb2YgdGFyZ2V0ID09PSB0eXBlTnVtYmVyKSB7XG4gICAgICByZXR1cm4gaXRlbXNbdGFyZ2V0ID4gLTEgPyB0YXJnZXQgOiBpdGVtcy5sZW5ndGggKyB0YXJnZXRdIHx8IG51bGw7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIHRhcmdldCBpcyBhbiBpbnN0YW5jZSBvZiBJdGVtIHJldHVybiBpdCBpZiBpdCBpcyBhdHRhY2hlZCB0byB0aGlzXG4gICAgLy8gR3JpZCBpbnN0YW5jZSwgb3RoZXJ3aXNlIHJldHVybiBudWxsLlxuICAgIGVsc2UgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEl0ZW0pIHtcbiAgICAgIHJldHVybiB0YXJnZXQuX2dyaWRJZCA9PT0gaW5zdC5faWQgPyB0YXJnZXQgOiBudWxsO1xuICAgIH1cblxuICAgIC8vIEluIG90aGVyIGNhc2VzIGxldCdzIGFzc3VtZSB0aGF0IHRoZSB0YXJnZXQgaXMgYW4gZWxlbWVudCwgc28gbGV0J3MgdHJ5XG4gICAgLy8gdG8gZmluZCBhbiBpdGVtIHRoYXQgbWF0Y2hlcyB0aGUgZWxlbWVudCBhbmQgcmV0dXJuIGl0LiBJZiBpdGVtIGlzIG5vdFxuICAgIC8vIGZvdW5kIHJldHVybiBudWxsLlxuICAgIGVsc2Uge1xuICAgICAgLy8gVE9ETzogVGhpcyBjb3VsZCBiZSBtYWRlIGEgbG90IGZhc3RlciBieSB1c2luZyBXZWFrTWFwIG9yIE1hcC5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXRlbXNbaV0uX2VsZW1lbnQgPT09IHRhcmdldCkge1xuICAgICAgICAgIHJldHVybiBpdGVtc1tpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gIH07XG5cbiAgLyoqXG4gICAqIEJpbmQgYW4gZXZlbnQgbGlzdGVuZXIuXG4gICAqXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQG1lbWJlcm9mIEdyaWQucHJvdG90eXBlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0geyp9IFthcmcxXVxuICAgKiBAcGFyYW0geyp9IFthcmcyXVxuICAgKiBAcGFyYW0geyp9IFthcmczXVxuICAgKiBAcmV0dXJucyB7R3JpZH1cbiAgICovXG4gIEdyaWQucHJvdG90eXBlLl9lbWl0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuXG4gICAgaWYgKCFpbnN0Ll9pc0Rlc3Ryb3llZCkge1xuICAgICAgaW5zdC5fZW1pdHRlci5lbWl0LmFwcGx5KGluc3QuX2VtaXR0ZXIsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3Q7XG5cbiAgfTtcblxuICAvKipcbiAgICogUmVmcmVzaCBjb250YWluZXIncyBpbnRlcm5hbCBkaW1lbnNpb25zLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgR3JpZC5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0dyaWR9XG4gICAqL1xuICBHcmlkLnByb3RvdHlwZS5fcmVmcmVzaERpbWVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgaW5zdCA9IHRoaXM7XG4gICAgdmFyIGVsZW1lbnQgPSBpbnN0Ll9lbGVtZW50O1xuICAgIHZhciByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB2YXIgc2lkZXMgPSBbJ2xlZnQnLCAncmlnaHQnLCAndG9wJywgJ2JvdHRvbSddO1xuICAgIHZhciBpO1xuXG4gICAgaW5zdC5fd2lkdGggPSByZWN0LndpZHRoO1xuICAgIGluc3QuX2hlaWdodCA9IHJlY3QuaGVpZ2h0O1xuICAgIGluc3QuX2xlZnQgPSByZWN0LmxlZnQ7XG4gICAgaW5zdC5fdG9wID0gcmVjdC50b3A7XG4gICAgaW5zdC5fYm9yZGVyID0ge307XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc2lkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGluc3QuX2JvcmRlcltzaWRlc1tpXV0gPSBnZXRTdHlsZUFzRmxvYXQoZWxlbWVudCwgJ2JvcmRlci0nICsgc2lkZXNbaV0gKyAnLXdpZHRoJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3Q7XG5cbiAgfTtcblxuICAvKipcbiAgICogSXRlbVxuICAgKiAqKioqXG4gICAqL1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IEl0ZW0gaW5zdGFuY2UgZm9yIGEgR3JpZCBpbnN0YW5jZS5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2xhc3NcbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAgICovXG4gIGZ1bmN0aW9uIEl0ZW0oZ3JpZCwgZWxlbWVudCkge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuICAgIHZhciBzZXR0aW5ncyA9IGdyaWQuX3NldHRpbmdzO1xuICAgIHZhciBpc0hpZGRlbjtcblxuICAgIC8vIENyZWF0ZSBpbnN0YW5jZSBpZCBhbmQgYWRkIGl0ZW0gdG8gdGhlIGl0ZW1JbnN0YW5jZXMgY29sbGVjdGlvbi5cbiAgICBpbnN0Ll9pZCA9ICsrdXVpZDtcbiAgICBpdGVtSW5zdGFuY2VzW2luc3QuX2lkXSA9IGluc3Q7XG5cbiAgICAvLyBEZXN0cm95ZWQgZmxhZy5cbiAgICBpbnN0Ll9pc0Rlc3Ryb3llZCA9IGZhbHNlO1xuXG4gICAgLy8gSWYgdGhlIHByb3ZpZGVkIGl0ZW0gZWxlbWVudCBpcyBub3QgYSBkaXJlY3QgY2hpbGQgb2YgdGhlIGdyaWQgY29udGFpbmVyXG4gICAgLy8gZWxlbWVudCwgYXBwZW5kIGl0IHRvIHRoZSBncmlkIGNvbnRhaW5lci5cbiAgICBpZiAoZWxlbWVudC5wYXJlbnROb2RlICE9PSBncmlkLl9lbGVtZW50KSB7XG4gICAgICBncmlkLl9lbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8vIFNldCBpdGVtIGNsYXNzLlxuICAgIGFkZENsYXNzKGVsZW1lbnQsIHNldHRpbmdzLml0ZW1DbGFzcyk7XG5cbiAgICAvLyBDaGVjayBpZiB0aGUgZWxlbWVudCBpcyBoaWRkZW4uXG4gICAgaXNIaWRkZW4gPSBnZXRTdHlsZShlbGVtZW50LCAnZGlzcGxheScpID09PSAnbm9uZSc7XG5cbiAgICAvLyBTZXQgdmlzaWJsZS9oaWRkZW4gY2xhc3MuXG4gICAgYWRkQ2xhc3MoZWxlbWVudCwgaXNIaWRkZW4gPyBzZXR0aW5ncy5pdGVtSGlkZGVuQ2xhc3MgOiBzZXR0aW5ncy5pdGVtVmlzaWJsZUNsYXNzKTtcblxuICAgIC8vIFJlZnJlbmNlIHRvIGNvbm5lY3RlZCBHcmlkIGluc3RhbmNlJ3MgaWQuXG4gICAgaW5zdC5fZ3JpZElkID0gZ3JpZC5faWQ7XG5cbiAgICAvLyBUaGUgZWxlbWVudHMuXG4gICAgaW5zdC5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgaW5zdC5fY2hpbGQgPSBlbGVtZW50LmNoaWxkcmVuWzBdO1xuXG4gICAgLy8gSW5pdGlhdGUgaXRlbSdzIGFuaW1hdGlvbiBjb250cm9sbGVycy5cbiAgICBpbnN0Ll9hbmltYXRlID0gbmV3IEdyaWQuSXRlbUFuaW1hdGUoaW5zdCwgZWxlbWVudCk7XG4gICAgaW5zdC5fYW5pbWF0ZUNoaWxkID0gbmV3IEdyaWQuSXRlbUFuaW1hdGUoaW5zdCwgaW5zdC5fY2hpbGQpO1xuXG4gICAgLy8gU2V0IHVwIGFjdGl2ZSBzdGF0ZSAoZGVmaW5lcyBpZiB0aGUgaXRlbSBpcyBjb25zaWRlcmVkIHBhcnQgb2YgdGhlIGxheW91dFxuICAgIC8vIG9yIG5vdCkuXG4gICAgaW5zdC5faXNBY3RpdmUgPSBpc0hpZGRlbiA/IGZhbHNlIDogdHJ1ZTtcblxuICAgIC8vIFNldCB1cCBwb3NpdGlvbmluZyBzdGF0ZSAoZGVmaW5lcyBpZiB0aGUgaXRlbSBpcyBjdXJyZW50bHkgYW5pbWF0aW5nXG4gICAgLy8gaXQncyBwb3NpdGlvbikuXG4gICAgaW5zdC5faXNQb3NpdGlvbmluZyA9IGZhbHNlO1xuXG4gICAgLy8gU2V0IHVwIHZpc2liaWxpdHkgc3RhdGVzLlxuICAgIGluc3QuX2lzSGlkZGVuID0gaXNIaWRkZW47XG4gICAgaW5zdC5faXNIaWRpbmcgPSBmYWxzZTtcbiAgICBpbnN0Ll9pc1Nob3dpbmcgPSBmYWxzZTtcblxuICAgIC8vIFZpc2liaWxpdHkgYW5pbWF0aW9uIGNhbGxiYWNrIHF1ZXVlLiBXaGVuZXZlciBhIGNhbGxiYWNrIGlzIHByb3ZpZGVkIGZvclxuICAgIC8vIHNob3cvaGlkZSBtZXRob2RzIGFuZCBhbmltYXRpb24gaXMgZW5hYmxlZCB0aGUgY2FsbGJhY2sgaXMgc3RvcmVkXG4gICAgLy8gdGVtcG9yYXJpbHkgdG8gdGhpcyBhcnJheS4gVGhlIGNhbGxiYWNrcyBhcmUgY2FsbGVkIHdpdGggdGhlIGZpcnN0XG4gICAgLy8gYXJndW1lbnQgYXMgZmFsc2UgaWYgdGhlIGFuaW1hdGlvbiBzdWNjZWVkZWQgd2l0aG91dCBpbnRlcnJ1cHRpb25zIGFuZFxuICAgIC8vIHdpdGggdGhlIGZpcnN0IGFyZ3VtZW50IGFzIHRydWUgaWYgdGhlIGFuaW1hdGlvbiB3YXMgaW50ZXJydXB0ZWQuXG4gICAgaW5zdC5fdmlzaWJpbGl0eVF1ZXVlID0gW107XG5cbiAgICAvLyBMYXlvdXQgYW5pbWF0aW9uIGNhbGxiYWNrIHF1ZXVlLiBXaGVuZXZlciBhIGNhbGxiYWNrIGlzIHByb3ZpZGVkIGZvclxuICAgIC8vIGxheW91dCBtZXRob2QgYW5kIGFuaW1hdGlvbiBpcyBlbmFibGVkIHRoZSBjYWxsYmFjayBpcyBzdG9yZWQgdGVtcG9yYXJpbHlcbiAgICAvLyB0byB0aGlzIGFycmF5LiBUaGUgY2FsbGJhY2tzIGFyZSBjYWxsZWQgd2l0aCB0aGUgZmlyc3QgYXJndW1lbnQgYXMgZmFsc2VcbiAgICAvLyBpZiB0aGUgYW5pbWF0aW9uIHN1Y2NlZWRlZCB3aXRob3V0IGludGVycnVwdGlvbnMgYW5kIHdpdGggdGhlIGZpcnN0XG4gICAgLy8gYXJndW1lbnQgYXMgdHJ1ZSBpZiB0aGUgYW5pbWF0aW9uIHdhcyBpbnRlcnJ1cHRlZC5cbiAgICBpbnN0Ll9sYXlvdXRRdWV1ZSA9IFtdO1xuXG4gICAgLy8gU2V0IHVwIGluaXRpYWwgcG9zaXRpb25zLlxuICAgIGluc3QuX2xlZnQgPSAwO1xuICAgIGluc3QuX3RvcCA9IDA7XG5cbiAgICAvLyBTZXQgZWxlbWVudCdzIGluaXRpYWwgc3R5bGVzLlxuICAgIHNldFN0eWxlcyhlbGVtZW50LCB7XG4gICAgICBsZWZ0OiAnMCcsXG4gICAgICB0b3A6ICcwJyxcbiAgICAgIHRyYW5zZm9ybTogZ2V0VHJhbnNsYXRlU3RyaW5nKDAsIDApLFxuICAgICAgZGlzcGxheTogaXNIaWRkZW4gPyAnbm9uZScgOiAnYmxvY2snXG4gICAgfSk7XG5cbiAgICAvLyBTZXQgdXAgdGhlIGluaXRpYWwgZGltZW5zaW9ucyBhbmQgc29ydCBkYXRhLlxuICAgIGluc3QuX3JlZnJlc2hEaW1lbnNpb25zKCkuX3JlZnJlc2hTb3J0RGF0YSgpO1xuXG4gICAgLy8gU2V0IGluaXRpYWwgc3R5bGVzIGZvciB0aGUgY2hpbGQgZWxlbWVudC5cbiAgICBpZiAoaXNIaWRkZW4pIHtcbiAgICAgIGdyaWQuX2l0ZW1IaWRlSGFuZGxlci5zdGFydChpbnN0LCB0cnVlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBncmlkLl9pdGVtU2hvd0hhbmRsZXIuc3RhcnQoaW5zdCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgLy8gU2V0IHVwIG1pZ3JhdGlvbiBoYW5kbGVyIGRhdGEuXG4gICAgaW5zdC5fbWlncmF0ZSA9IG5ldyBHcmlkLkl0ZW1NaWdyYXRlKGluc3QpO1xuXG4gICAgLy8gU2V0IHVwIHJlbGVhc2UgaGFuZGxlclxuICAgIGluc3QuX3JlbGVhc2UgPSBuZXcgR3JpZC5JdGVtUmVsZWFzZShpbnN0KTtcblxuICAgIC8vIFNldCB1cCBkcmFnIGhhbmRsZXIuXG4gICAgaW5zdC5fZHJhZyA9IHNldHRpbmdzLmRyYWdFbmFibGVkID8gbmV3IEdyaWQuSXRlbURyYWcoaW5zdCkgOiBudWxsO1xuXG4gIH1cblxuICAvKipcbiAgICogSXRlbSAtIFB1YmxpYyBwcm90b3R5cGUgbWV0aG9kc1xuICAgKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqL1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGluc3RhbmNlIGdyaWQgcmVmZXJlbmNlLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7R3JpZH1cbiAgICovXG4gIEl0ZW0ucHJvdG90eXBlLmdldEdyaWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4gZ3JpZEluc3RhbmNlc1t0aGlzLl9ncmlkSWRdO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaW5zdGFuY2UgZWxlbWVudC5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbS5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgSXRlbS5wcm90b3R5cGUuZ2V0RWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBpbnN0YW5jZSBlbGVtZW50J3MgY2FjaGVkIHdpZHRoLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgKi9cbiAgSXRlbS5wcm90b3R5cGUuZ2V0V2lkdGggPSBmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4gdGhpcy5fd2lkdGg7XG5cbiAgfTtcblxuICAvKipcbiAgICogR2V0IGluc3RhbmNlIGVsZW1lbnQncyBjYWNoZWQgaGVpZ2h0LlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgKi9cbiAgSXRlbS5wcm90b3R5cGUuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgaW5zdGFuY2UgZWxlbWVudCdzIGNhY2hlZCBtYXJnaW5zLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKiAgIC0gVGhlIHJldHVybmVkIG9iamVjdCBjb250YWlucyBsZWZ0LCByaWdodCwgdG9wIGFuZCBib3R0b20gcHJvcGVydGllc1xuICAgKiAgICAgd2hpY2ggaW5kaWNhdGUgdGhlIGl0ZW0gZWxlbWVudCdzIGNhY2hlZCBtYXJnaW5zLlxuICAgKi9cbiAgSXRlbS5wcm90b3R5cGUuZ2V0TWFyZ2luID0gZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGxlZnQ6IHRoaXMuX21hcmdpbi5sZWZ0LFxuICAgICAgcmlnaHQ6IHRoaXMuX21hcmdpbi5yaWdodCxcbiAgICAgIHRvcDogdGhpcy5fbWFyZ2luLnRvcCxcbiAgICAgIGJvdHRvbTogdGhpcy5fbWFyZ2luLmJvdHRvbVxuICAgIH07XG5cbiAgfTtcblxuICAvKipcbiAgICogR2V0IGluc3RhbmNlIGVsZW1lbnQncyBjYWNoZWQgcG9zaXRpb24uXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW0ucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqICAgLSBUaGUgcmV0dXJuZWQgb2JqZWN0IGNvbnRhaW5zIGxlZnQgYW5kIHRvcCBwcm9wZXJ0aWVzIHdoaWNoIGluZGljYXRlIHRoZVxuICAgKiAgICAgaXRlbSBlbGVtZW50J3MgY2FjaGVkIHBvc2l0aW9uIGluIHRoZSBncmlkLlxuICAgKi9cbiAgSXRlbS5wcm90b3R5cGUuZ2V0UG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbGVmdDogdGhpcy5fbGVmdCxcbiAgICAgIHRvcDogdGhpcy5fdG9wXG4gICAgfTtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBJcyB0aGUgaXRlbSBhY3RpdmU/XG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW0ucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgSXRlbS5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4gdGhpcy5faXNBY3RpdmU7XG5cbiAgfTtcblxuICAvKipcbiAgICogSXMgdGhlIGl0ZW0gdmlzaWJsZT9cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbS5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBJdGVtLnByb3RvdHlwZS5pc1Zpc2libGUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4gIXRoaXMuX2lzSGlkZGVuO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIElzIHRoZSBpdGVtIGJlaW5nIGFuaW1hdGVkIHRvIHZpc2libGU/XG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW0ucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgSXRlbS5wcm90b3R5cGUuaXNTaG93aW5nID0gZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHRoaXMuX2lzU2hvd2luZztcblxuICB9O1xuXG4gIC8qKlxuICAgKiBJcyB0aGUgaXRlbSBiZWluZyBhbmltYXRlZCB0byBoaWRkZW4/XG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW0ucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgSXRlbS5wcm90b3R5cGUuaXNIaWRpbmcgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4gdGhpcy5faXNIaWRpbmc7XG5cbiAgfTtcblxuICAvKipcbiAgICogSXMgdGhlIGl0ZW0gcG9zaXRpb25pbmc/XG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW0ucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgSXRlbS5wcm90b3R5cGUuaXNQb3NpdGlvbmluZyA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB0aGlzLl9pc1Bvc2l0aW9uaW5nO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIElzIHRoZSBpdGVtIGJlaW5nIGRyYWdnZWQ/XG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW0ucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgSXRlbS5wcm90b3R5cGUuaXNEcmFnZ2luZyA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiAhIXRoaXMuX2RyYWcgJiYgdGhpcy5fZHJhZy5fZGF0YS5pc0FjdGl2ZTtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBJcyB0aGUgaXRlbSBiZWluZyByZWxlYXNlZD9cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbS5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBJdGVtLnByb3RvdHlwZS5pc1JlbGVhc2luZyA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB0aGlzLl9yZWxlYXNlLmlzQWN0aXZlO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIElzIHRoZSBpdGVtIGRlc3Ryb3llZD9cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbS5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBJdGVtLnByb3RvdHlwZS5pc0Rlc3Ryb3llZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB0aGlzLl9pc0Rlc3Ryb3llZDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBJdGVtIC0gUHJvdGVjdGVkIHByb3RvdHlwZSBtZXRob2RzXG4gICAqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICovXG5cbiAgLyoqXG4gICAqIFJlY2FsY3VsYXRlIGl0ZW0ncyBkaW1lbnNpb25zLlxuICAgKlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBtZW1iZXJvZiBJdGVtLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7SXRlbX1cbiAgICovXG4gIEl0ZW0ucHJvdG90eXBlLl9yZWZyZXNoRGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuICAgIGlmIChpbnN0Ll9pc0Rlc3Ryb3llZCB8fCBpbnN0Ll9pc0hpZGRlbikge1xuICAgICAgcmV0dXJuIGluc3Q7XG4gICAgfVxuXG4gICAgdmFyIGVsZW1lbnQgPSBpbnN0Ll9lbGVtZW50O1xuICAgIHZhciByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB2YXIgc2lkZXMgPSBbJ2xlZnQnLCAncmlnaHQnLCAndG9wJywgJ2JvdHRvbSddO1xuICAgIHZhciBtYXJnaW4gPSBpbnN0Ll9tYXJnaW4gPSBpbnN0Ll9tYXJnaW4gfHwge307XG4gICAgdmFyIHNpZGU7XG4gICAgdmFyIGk7XG5cbiAgICAvLyBDYWxjdWxhdGUgd2lkdGggYW5kIGhlaWdodC5cbiAgICBpbnN0Ll93aWR0aCA9IHJlY3Qud2lkdGg7XG4gICAgaW5zdC5faGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XG5cbiAgICAvLyBDYWxjdWxhdGUgbWFyZ2lucyAoaWdub3JlIG5lZ2F0aXZlIG1hcmdpbnMpLlxuICAgIGZvciAoaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgIHNpZGUgPSBnZXRTdHlsZUFzRmxvYXQoZWxlbWVudCwgJ21hcmdpbi0nICsgc2lkZXNbaV0pO1xuICAgICAgbWFyZ2luW3NpZGVzW2ldXSA9IHNpZGUgPiAwID8gc2lkZSA6IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3Q7XG5cbiAgfTtcblxuICAvKipcbiAgICogRmV0Y2ggYW5kIHN0b3JlIGl0ZW0ncyBzb3J0IGRhdGEuXG4gICAqXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQG1lbWJlcm9mIEl0ZW0ucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHtJdGVtfVxuICAgKi9cbiAgSXRlbS5wcm90b3R5cGUuX3JlZnJlc2hTb3J0RGF0YSA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuICAgIGlmIChpbnN0Ll9pc0Rlc3Ryb3llZCkge1xuICAgICAgcmV0dXJuIGluc3Q7XG4gICAgfVxuXG4gICAgdmFyIHNvcnREYXRhID0ge307XG4gICAgdmFyIGdldHRlcnMgPSBpbnN0LmdldEdyaWQoKS5fc2V0dGluZ3Muc29ydERhdGE7XG5cbiAgICAvLyBGZXRjaCBzb3J0IGRhdGEuXG4gICAgaWYgKGdldHRlcnMpIHtcbiAgICAgIE9iamVjdC5rZXlzKGdldHRlcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBzb3J0RGF0YVtrZXldID0gZ2V0dGVyc1trZXldKGluc3QsIGluc3QuX2VsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gU3RvcmUgc29ydCBkYXRhIHRvIHRoZSBpbnN0YW5jZS5cbiAgICBpbnN0Ll9zb3J0RGF0YSA9IHNvcnREYXRhO1xuXG4gICAgcmV0dXJuIGluc3Q7XG5cbiAgfTtcblxuICAvKipcbiAgICogUG9zaXRpb24gaXRlbSBiYXNlZCBvbiBpdCdzIGN1cnJlbnQgZGF0YS5cbiAgICpcbiAgICogQHByb3RlY3RlZFxuICAgKiBAbWVtYmVyb2YgSXRlbS5wcm90b3R5cGVcbiAgICogQHBhcmFtIHtCb29sZWFufSBpbnN0YW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkZpbmlzaF1cbiAgICogQHJldHVybnMge0l0ZW19XG4gICAqL1xuICBJdGVtLnByb3RvdHlwZS5fbGF5b3V0ID0gZnVuY3Rpb24gKGluc3RhbnQsIG9uRmluaXNoKSB7XG5cbiAgICB2YXIgaW5zdCA9IHRoaXM7XG5cbiAgICBpZiAoaW5zdC5faXNEZXN0cm95ZWQpIHtcbiAgICAgIHJldHVybiBpbnN0O1xuICAgIH1cblxuICAgIHZhciBlbGVtZW50ID0gaW5zdC5fZWxlbWVudDtcbiAgICB2YXIgaXNQb3NpdGlvbmluZyA9IGluc3QuX2lzUG9zaXRpb25pbmc7XG4gICAgdmFyIG1pZ3JhdGUgPSBpbnN0Ll9taWdyYXRlO1xuICAgIHZhciByZWxlYXNlID0gaW5zdC5fcmVsZWFzZTtcbiAgICB2YXIgaXNKdXN0UmVsZWFzZWQgPSByZWxlYXNlLmlzQWN0aXZlICYmIHJlbGVhc2UuaXNQb3NpdGlvbmluZ1N0YXJ0ZWQgPT09IGZhbHNlO1xuICAgIHZhciBncmlkID0gaW5zdC5nZXRHcmlkKCk7XG4gICAgdmFyIHNldHRpbmdzID0gZ3JpZC5fc2V0dGluZ3M7XG4gICAgdmFyIGFuaW1EdXJhdGlvbiA9IGlzSnVzdFJlbGVhc2VkID8gc2V0dGluZ3MuZHJhZ1JlbGVhc2VEdXJhdGlvbiA6IHNldHRpbmdzLmxheW91dER1cmF0aW9uO1xuICAgIHZhciBhbmltRWFzaW5nID0gaXNKdXN0UmVsZWFzZWQgPyBzZXR0aW5ncy5kcmFnUmVsZWFzZUVhc2luZyA6IHNldHRpbmdzLmxheW91dEVhc2luZztcbiAgICB2YXIgYW5pbUVuYWJsZWQgPSAhaW5zdGFudCAmJiAhaW5zdC5fc2tpcE5leHRMYXlvdXRBbmltYXRpb24gJiYgYW5pbUR1cmF0aW9uID4gMDtcbiAgICB2YXIgaXNBbmltYXRpbmc7XG4gICAgdmFyIG9mZnNldExlZnQ7XG4gICAgdmFyIG9mZnNldFRvcDtcbiAgICB2YXIgY3VycmVudExlZnQ7XG4gICAgdmFyIGN1cnJlbnRUb3A7XG4gICAgdmFyIHRhcmdldFN0eWxlcztcblxuICAgIC8vIElmIHRoZSBpdGVtIGlzIGN1cnJlbnRseSBwb3NpdGlvbmluZyBwcm9jZXNzIGN1cnJlbnQgbGF5b3V0IGNhbGxiYWNrXG4gICAgLy8gcXVldWUgd2l0aCBpbnRlcnJ1cHRlZCBmbGFnIG9uIGlmIHRoZSBpdGVtIGlzIGN1cnJlbnRseSBwb3NpdGlvbmluZy5cbiAgICBpZiAoaXNQb3NpdGlvbmluZykge1xuICAgICAgcHJvY2Vzc1F1ZXVlKGluc3QuX2xheW91dFF1ZXVlLCB0cnVlLCBpbnN0KTtcbiAgICB9XG5cbiAgICAvLyBNYXJrIHJlbGVhc2UgcG9zaXRpb25pbmcgYXMgc3RhcnRlZC5cbiAgICBpZiAoaXNKdXN0UmVsZWFzZWQpIHtcbiAgICAgIHJlbGVhc2UuaXNQb3NpdGlvbmluZ1N0YXJ0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIFB1c2ggdGhlIGNhbGxiYWNrIHRvIHRoZSBjYWxsYmFjayBxdWV1ZS5cbiAgICBpZiAodHlwZW9mIG9uRmluaXNoID09PSB0eXBlRnVuY3Rpb24pIHtcbiAgICAgIGluc3QuX2xheW91dFF1ZXVlLnB1c2gob25GaW5pc2gpO1xuICAgIH1cblxuICAgIC8vIEdldCBpdGVtIGNvbnRhaW5lciBvZmZzZXRzIGFuZCB0YXJnZXQgc3R5bGVzLlxuICAgIG9mZnNldExlZnQgPSByZWxlYXNlLmlzQWN0aXZlID8gcmVsZWFzZS5jb250YWluZXJEaWZmWCA6IG1pZ3JhdGUuaXNBY3RpdmUgPyBtaWdyYXRlLmNvbnRhaW5lckRpZmZYIDogMDtcbiAgICBvZmZzZXRUb3AgPSByZWxlYXNlLmlzQWN0aXZlID8gcmVsZWFzZS5jb250YWluZXJEaWZmWSA6IG1pZ3JhdGUuaXNBY3RpdmUgPyBtaWdyYXRlLmNvbnRhaW5lckRpZmZZIDogMDtcbiAgICB0YXJnZXRTdHlsZXMgPSB7dHJhbnNmb3JtOiBnZXRUcmFuc2xhdGVTdHJpbmcoaW5zdC5fbGVmdCArIG9mZnNldExlZnQsIGluc3QuX3RvcCArIG9mZnNldFRvcCl9O1xuXG4gICAgLy8gSWYgbm8gYW5pbWF0aW9ucyBhcmUgbmVlZGVkLCBlYXN5IHBlYXN5IVxuICAgIGlmICghYW5pbUVuYWJsZWQpIHtcbiAgICAgIGlzUG9zaXRpb25pbmcgJiYgcmFmTG9vcC5jYW5jZWwocmFmUXVldWVMYXlvdXQsIGluc3QuX2lkKTtcbiAgICAgIGlzQW5pbWF0aW5nID0gaW5zdC5fYW5pbWF0ZS5pc0FuaW1hdGluZygpO1xuICAgICAgaW5zdC5fc3RvcExheW91dChmYWxzZSwgdGFyZ2V0U3R5bGVzKTtcbiAgICAgICFpc0FuaW1hdGluZyAmJiBzZXRTdHlsZXMoZWxlbWVudCwgdGFyZ2V0U3R5bGVzKTtcbiAgICAgIGluc3QuX3NraXBOZXh0TGF5b3V0QW5pbWF0aW9uID0gZmFsc2U7XG4gICAgICByZXR1cm4gaW5zdC5fZmluaXNoTGF5b3V0KCk7XG4gICAgfVxuXG4gICAgLy8gU2V0IGl0ZW0gYXMgcG9zaXRpb25pbmcuXG4gICAgaW5zdC5faXNQb3NpdGlvbmluZyA9IHRydWU7XG5cbiAgICAvLyBHZXQgdGhlIGVsZW1lbnQncyBjdXJyZW50IGxlZnQgYW5kIHRvcCBwb3NpdGlvbiBpbiB0aGUgcmVhZCBjYWxsYmFjay5cbiAgICAvLyBUaGVuIGluIHRoZSB3cml0ZSBjYWxsYmFjayBkbyB0aGUgYW5pbWF0aW9uIGlmIG5lY2Vzc2FyeS5cbiAgICByYWZMb29wLmFkZChyYWZRdWV1ZUxheW91dCwgaW5zdC5faWQsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGN1cnJlbnRMZWZ0ID0gZ2V0VHJhbnNsYXRlQXNGbG9hdChlbGVtZW50LCAneCcpIC0gb2Zmc2V0TGVmdDtcbiAgICAgIGN1cnJlbnRUb3AgPSBnZXRUcmFuc2xhdGVBc0Zsb2F0KGVsZW1lbnQsICd5JykgLSBvZmZzZXRUb3A7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuXG4gICAgICAvLyBJZiB0aGUgaXRlbSBpcyBhbHJlYWR5IGluIGNvcnJlY3QgcG9zaXRpb24gbGV0J3MgcXVpdCBlYXJseS5cbiAgICAgIGlmIChpbnN0Ll9sZWZ0ID09PSBjdXJyZW50TGVmdCAmJiBpbnN0Ll90b3AgPT09IGN1cnJlbnRUb3ApIHtcbiAgICAgICAgaXNQb3NpdGlvbmluZyAmJiBpbnN0Ll9zdG9wTGF5b3V0KGZhbHNlLCB0YXJnZXRTdHlsZXMpO1xuICAgICAgICBpbnN0Ll9pc1Bvc2l0aW9uaW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBpbnN0Ll9maW5pc2hMYXlvdXQoKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2V0IGl0ZW0ncyBwb3NpdGlvbmluZyBjbGFzcy5cbiAgICAgICFpc1Bvc2l0aW9uaW5nICYmIGFkZENsYXNzKGVsZW1lbnQsIHNldHRpbmdzLml0ZW1Qb3NpdGlvbmluZ0NsYXNzKTtcblxuICAgICAgLy8gQW5pbWF0ZS5cbiAgICAgIGluc3QuX2FuaW1hdGUuc3RhcnQoXG4gICAgICAgIHt0cmFuc2Zvcm06IGdldFRyYW5zbGF0ZVN0cmluZyhjdXJyZW50TGVmdCArIG9mZnNldExlZnQsIGN1cnJlbnRUb3AgKyBvZmZzZXRUb3ApfSxcbiAgICAgICAgdGFyZ2V0U3R5bGVzLFxuICAgICAgICB7XG4gICAgICAgICAgZHVyYXRpb246IGFuaW1EdXJhdGlvbixcbiAgICAgICAgICBlYXNpbmc6IGFuaW1FYXNpbmcsXG4gICAgICAgICAgb25GaW5pc2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGluc3QuX2ZpbmlzaExheW91dCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGluc3Q7XG5cbiAgfTtcblxuICAvKipcbiAgICogUG9zaXRpb24gaXRlbSBiYXNlZCBvbiBpdCdzIGN1cnJlbnQgZGF0YS5cbiAgICpcbiAgICogQHByb3RlY3RlZFxuICAgKiBAbWVtYmVyb2YgSXRlbS5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0l0ZW19XG4gICAqL1xuICBJdGVtLnByb3RvdHlwZS5fZmluaXNoTGF5b3V0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuXG4gICAgaWYgKGluc3QuX2lzRGVzdHJveWVkKSB7XG4gICAgICByZXR1cm4gaW5zdDtcbiAgICB9XG5cbiAgICAvLyBNYXJrIHRoZSBpdGVtIGFzIG5vdCBwb3NpdGlvbmluZyBhbmQgcmVtb3ZlIHBvc2l0aW9uaW5nIGNsYXNzZXMuXG4gICAgaWYgKGluc3QuX2lzUG9zaXRpb25pbmcpIHtcbiAgICAgIGluc3QuX2lzUG9zaXRpb25pbmcgPSBmYWxzZTtcbiAgICAgIHJlbW92ZUNsYXNzKGluc3QuX2VsZW1lbnQsIGluc3QuZ2V0R3JpZCgpLl9zZXR0aW5ncy5pdGVtUG9zaXRpb25pbmdDbGFzcyk7XG4gICAgfVxuXG4gICAgLy8gRmluaXNoIHVwIHJlbGVhc2UuXG4gICAgaWYgKGluc3QuX3JlbGVhc2UuaXNBY3RpdmUpIHtcbiAgICAgIGluc3QuX3JlbGVhc2Uuc3RvcCgpO1xuICAgIH1cblxuICAgIC8vIEZpbmlzaCB1cCBtaWdyYXRpb24uXG4gICAgaWYgKGluc3QuX21pZ3JhdGUuaXNBY3RpdmUpIHtcbiAgICAgIGluc3QuX21pZ3JhdGUuc3RvcCgpO1xuICAgIH1cblxuICAgIC8vIFByb2Nlc3MgdGhlIGNhbGxiYWNrIHF1ZXVlLlxuICAgIHByb2Nlc3NRdWV1ZShpbnN0Ll9sYXlvdXRRdWV1ZSwgZmFsc2UsIGluc3QpO1xuXG4gICAgcmV0dXJuIGluc3Q7XG5cbiAgfTtcblxuICAvKipcbiAgICogU3RvcCBpdGVtJ3MgcG9zaXRpb24gYW5pbWF0aW9uIGlmIGl0IGlzIGN1cnJlbnRseSBhbmltYXRpbmcuXG4gICAqXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQG1lbWJlcm9mIEl0ZW0ucHJvdG90eXBlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3Byb2Nlc3NMYXlvdXRRdWV1ZT1mYWxzZV1cbiAgICogQHBhcmFtIHtPYmplY3R9IFt0YXJnZXRTdHlsZXNdXG4gICAqIEByZXR1cm5zIHtJdGVtfVxuICAgKi9cbiAgSXRlbS5wcm90b3R5cGUuX3N0b3BMYXlvdXQgPSBmdW5jdGlvbiAocHJvY2Vzc0xheW91dFF1ZXVlLCB0YXJnZXRTdHlsZXMpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuICAgIGlmIChpbnN0Ll9pc0Rlc3Ryb3llZCB8fCAhaW5zdC5faXNQb3NpdGlvbmluZykge1xuICAgICAgcmV0dXJuIGluc3Q7XG4gICAgfVxuXG4gICAgLy8gQ2FuY2VsIGFuaW1hdGlvbiBpbml0LlxuICAgIHJhZkxvb3AuY2FuY2VsKHJhZlF1ZXVlTGF5b3V0LCBpbnN0Ll9pZCk7XG5cbiAgICAvLyBTdG9wIGFuaW1hdGlvbi5cbiAgICBpbnN0Ll9hbmltYXRlLnN0b3AodGFyZ2V0U3R5bGVzKTtcblxuICAgIC8vIFJlbW92ZSBwb3NpdGlvbmluZyBjbGFzcy5cbiAgICByZW1vdmVDbGFzcyhpbnN0Ll9lbGVtZW50LCBpbnN0LmdldEdyaWQoKS5fc2V0dGluZ3MuaXRlbVBvc2l0aW9uaW5nQ2xhc3MpO1xuXG4gICAgLy8gUmVzZXQgc3RhdGUuXG4gICAgaW5zdC5faXNQb3NpdGlvbmluZyA9IGZhbHNlO1xuXG4gICAgLy8gUHJvY2VzcyBjYWxsYmFjayBxdWV1ZS5cbiAgICBpZiAocHJvY2Vzc0xheW91dFF1ZXVlKSB7XG4gICAgICBwcm9jZXNzUXVldWUoaW5zdC5fbGF5b3V0UXVldWUsIHRydWUsIGluc3QpO1xuICAgIH1cblxuICAgIHJldHVybiBpbnN0O1xuXG4gIH07XG5cbiAgSXRlbS5wcm90b3R5cGUuX3Nob3cgPSBmdW5jdGlvbiAoaW5zdGFudCwgb25GaW5pc2gpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuICAgIGlmIChpbnN0Ll9pc0Rlc3Ryb3llZCkge1xuICAgICAgcmV0dXJuIGluc3Q7XG4gICAgfVxuXG4gICAgdmFyIGVsZW1lbnQgPSBpbnN0Ll9lbGVtZW50O1xuICAgIHZhciBxdWV1ZSA9IGluc3QuX3Zpc2liaWxpdHlRdWV1ZTtcbiAgICB2YXIgY2FsbGJhY2sgPSB0eXBlb2Ygb25GaW5pc2ggPT09IHR5cGVGdW5jdGlvbiA/IG9uRmluaXNoIDogbnVsbDtcbiAgICB2YXIgZ3JpZCA9IGluc3QuZ2V0R3JpZCgpO1xuICAgIHZhciBzZXR0aW5ncyA9IGdyaWQuX3NldHRpbmdzO1xuXG4gICAgLy8gSWYgaXRlbSBpcyB2aXNpYmxlIGNhbGwgdGhlIGNhbGxiYWNrIGFuZCBiZSBkb25lIHdpdGggaXQuXG4gICAgaWYgKCFpbnN0Ll9pc1Nob3dpbmcgJiYgIWluc3QuX2lzSGlkZGVuKSB7XG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhmYWxzZSwgaW5zdCk7XG4gICAgICByZXR1cm4gaW5zdDtcbiAgICB9XG5cbiAgICAvLyBJZiBpdGVtIGlzIHNob3dpbmcgYW5kIGRvZXMgbm90IG5lZWQgdG8gYmUgc2hvd24gaW5zdGFudGx5LCBsZXQncyBqdXN0XG4gICAgLy8gcHVzaCBjYWxsYmFjayB0byB0aGUgY2FsbGJhY2sgcXVldWUgYW5kIGJlIGRvbmUgd2l0aCBpdC5cbiAgICBpZiAoaW5zdC5faXNTaG93aW5nICYmICFpbnN0YW50KSB7XG4gICAgICBjYWxsYmFjayAmJiBxdWV1ZS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiBpbnN0O1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBpdGVtIGlzIGhpZGluZyBvciBoaWRkZW4gcHJvY2VzcyB0aGUgY3VycmVudCB2aXNpYmlsaXR5IGNhbGxiYWNrXG4gICAgLy8gcXVldWUgd2l0aCB0aGUgaW50ZXJydXB0ZWQgZmxhZyBhY3RpdmUsIHVwZGF0ZSBjbGFzc2VzIGFuZCBzZXQgZGlzcGxheVxuICAgIC8vIHRvIGJsb2NrIGlmIG5lY2Vzc2FyeS5cbiAgICBpZiAoIWluc3QuX2lzU2hvd2luZykge1xuICAgICAgcHJvY2Vzc1F1ZXVlKHF1ZXVlLCB0cnVlLCBpbnN0KTtcbiAgICAgIHJlbW92ZUNsYXNzKGVsZW1lbnQsIHNldHRpbmdzLml0ZW1IaWRkZW5DbGFzcyk7XG4gICAgICBhZGRDbGFzcyhlbGVtZW50LCBzZXR0aW5ncy5pdGVtVmlzaWJsZUNsYXNzKTtcbiAgICAgICFpbnN0Ll9pc0hpZGluZyAmJiBzZXRTdHlsZXMoZWxlbWVudCwge2Rpc3BsYXk6ICdibG9jayd9KTtcbiAgICB9XG5cbiAgICAvLyBQdXNoIGNhbGxiYWNrIHRvIHRoZSBjYWxsYmFjayBxdWV1ZS5cbiAgICBjYWxsYmFjayAmJiBxdWV1ZS5wdXNoKGNhbGxiYWNrKTtcblxuICAgIC8vIFVwZGF0ZSBpdGVtJ3MgaW50ZXJuYWwgc3RhdGVzLlxuICAgIGluc3QuX2lzQWN0aXZlID0gaW5zdC5faXNTaG93aW5nID0gdHJ1ZTtcbiAgICBpbnN0Ll9pc0hpZGluZyA9IGluc3QuX2lzSGlkZGVuID0gZmFsc2U7XG5cbiAgICAvLyBJZiB3ZSBuZWVkIHRvIHNob3cgaW5zdGFudGx5LlxuICAgIGlmIChpbnN0YW50KSB7XG4gICAgICBncmlkLl9pdGVtU2hvd0hhbmRsZXIuc3RvcChpbnN0LCBzZXR0aW5ncy52aXNpYmxlU3R5bGVzKTtcbiAgICAgIGluc3QuX2lzU2hvd2luZyA9IGZhbHNlO1xuICAgICAgcHJvY2Vzc1F1ZXVlKHF1ZXVlLCBmYWxzZSwgaW5zdCk7XG4gICAgfVxuXG4gICAgLy8gSWYgd2UgbmVlZCB0byBhbmltYXRlLlxuICAgIGVsc2Uge1xuICAgICAgZ3JpZC5faXRlbVNob3dIYW5kbGVyLnN0YXJ0KGluc3QsIGluc3RhbnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFpbnN0Ll9pc0hpZGRlbikge1xuICAgICAgICAgIGluc3QuX2lzU2hvd2luZyA9IGZhbHNlO1xuICAgICAgICAgIHByb2Nlc3NRdWV1ZShxdWV1ZSwgZmFsc2UsIGluc3QpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBIaWRlIGl0ZW0uXG4gICAqXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQG1lbWJlcm9mIEl0ZW0ucHJvdG90eXBlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5zdGFudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25GaW5pc2hdXG4gICAqIEByZXR1cm5zIHtJdGVtfVxuICAgKi9cbiAgSXRlbS5wcm90b3R5cGUuX2hpZGUgPSBmdW5jdGlvbiAoaW5zdGFudCwgb25GaW5pc2gpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuICAgIC8vIFJldHVybiBpbW1lZGlhdGVseSBpZiB0aGUgaW5zdGFuY2UgaXMgZGVzdHJveWVkLlxuICAgIGlmIChpbnN0Ll9pc0Rlc3Ryb3llZCkge1xuICAgICAgcmV0dXJuIGluc3Q7XG4gICAgfVxuXG4gICAgdmFyIGVsZW1lbnQgPSBpbnN0Ll9lbGVtZW50O1xuICAgIHZhciBxdWV1ZSA9IGluc3QuX3Zpc2liaWxpdHlRdWV1ZTtcbiAgICB2YXIgY2FsbGJhY2sgPSB0eXBlb2Ygb25GaW5pc2ggPT09IHR5cGVGdW5jdGlvbiA/IG9uRmluaXNoIDogbnVsbDtcbiAgICB2YXIgZ3JpZCA9IGluc3QuZ2V0R3JpZCgpO1xuICAgIHZhciBzZXR0aW5ncyA9IGdyaWQuX3NldHRpbmdzO1xuXG4gICAgLy8gSWYgaXRlbSBpcyBhbHJlYWR5IGhpZGRlbiBjYWxsIHRoZSBjYWxsYmFjayBhbmQgYmUgZG9uZSB3aXRoIGl0LlxuICAgIGlmICghaW5zdC5faXNIaWRpbmcgJiYgaW5zdC5faXNIaWRkZW4pIHtcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGZhbHNlLCBpbnN0KTtcbiAgICAgIHJldHVybiBpbnN0O1xuICAgIH1cblxuICAgIC8vIElmIGl0ZW0gaXMgaGlkaW5nIGFuZCBkb2VzIG5vdCBuZWVkIHRvIGJlIGhpZGRlbiBpbnN0YW50bHksIGxldCdzIGp1c3RcbiAgICAvLyBwdXNoIGNhbGxiYWNrIHRvIHRoZSBjYWxsYmFjayBxdWV1ZSBhbmQgYmUgZG9uZSB3aXRoIGl0LlxuICAgIGlmIChpbnN0Ll9pc0hpZGluZyAmJiAhaW5zdGFudCkge1xuICAgICAgY2FsbGJhY2sgJiYgcXVldWUucHVzaChjYWxsYmFjayk7XG4gICAgICByZXR1cm4gaW5zdDtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgaXRlbSBpcyBzaG93aW5nIG9yIHZpc2libGUgcHJvY2VzcyB0aGUgY3VycmVudCB2aXNpYmlsaXR5IGNhbGxiYWNrXG4gICAgLy8gcXVldWUgd2l0aCB0aGUgaW50ZXJydXB0ZWQgZmxhZyBhY3RpdmUsIHVwZGF0ZSBjbGFzc2VzIGFuZCBzZXQgZGlzcGxheVxuICAgIC8vIHRvIGJsb2NrIGlmIG5lY2Vzc2FyeS5cbiAgICBpZiAoIWluc3QuX2lzSGlkaW5nKSB7XG4gICAgICBwcm9jZXNzUXVldWUocXVldWUsIHRydWUsIGluc3QpO1xuICAgICAgYWRkQ2xhc3MoZWxlbWVudCwgc2V0dGluZ3MuaXRlbUhpZGRlbkNsYXNzKTtcbiAgICAgIHJlbW92ZUNsYXNzKGVsZW1lbnQsIHNldHRpbmdzLml0ZW1WaXNpYmxlQ2xhc3MpO1xuICAgIH1cblxuICAgIC8vIFB1c2ggY2FsbGJhY2sgdG8gdGhlIGNhbGxiYWNrIHF1ZXVlLlxuICAgIGNhbGxiYWNrICYmIHF1ZXVlLnB1c2goY2FsbGJhY2spO1xuXG4gICAgLy8gVXBkYXRlIGl0ZW0ncyBpbnRlcm5hbCBzdGF0ZXMuXG4gICAgaW5zdC5faXNIaWRkZW4gPSBpbnN0Ll9pc0hpZGluZyA9IHRydWU7XG4gICAgaW5zdC5faXNBY3RpdmUgPSBpbnN0Ll9pc1Nob3dpbmcgPSBmYWxzZTtcblxuICAgIC8vIElmIHdlIG5lZWQgdG8gaGlkZSBpbnN0YW50bHkuXG4gICAgaWYgKGluc3RhbnQpIHtcbiAgICAgIGdyaWQuX2l0ZW1IaWRlSGFuZGxlci5zdG9wKGluc3QsIHNldHRpbmdzLmhpZGRlblN0eWxlcyk7XG4gICAgICBpbnN0Ll9pc0hpZGluZyA9IGZhbHNlO1xuICAgICAgaW5zdC5fc3RvcExheW91dCh0cnVlLCB7dHJhbnNmb3JtOiBnZXRUcmFuc2xhdGVTdHJpbmcoMCwgMCl9KTtcbiAgICAgIHNldFN0eWxlcyhlbGVtZW50LCB7ZGlzcGxheTogJ25vbmUnfSk7XG4gICAgICBwcm9jZXNzUXVldWUocXVldWUsIGZhbHNlLCBpbnN0KTtcbiAgICB9XG5cbiAgICAvLyBJZiB3ZSBuZWVkIHRvIGFuaW1hdGUuXG4gICAgZWxzZSB7XG4gICAgICBncmlkLl9pdGVtSGlkZUhhbmRsZXIuc3RhcnQoaW5zdCwgaW5zdGFudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoaW5zdC5faXNIaWRkZW4pIHtcbiAgICAgICAgICBpbnN0Ll9pc0hpZGluZyA9IGZhbHNlO1xuICAgICAgICAgIGluc3QuX3N0b3BMYXlvdXQodHJ1ZSwge3RyYW5zZm9ybTogZ2V0VHJhbnNsYXRlU3RyaW5nKDAsIDApfSk7XG4gICAgICAgICAgc2V0U3R5bGVzKGVsZW1lbnQsIHtkaXNwbGF5OiAnbm9uZSd9KTtcbiAgICAgICAgICBwcm9jZXNzUXVldWUocXVldWUsIGZhbHNlLCBpbnN0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3Q7XG5cbiAgfTtcblxuICAvKipcbiAgICogRGVzdHJveSBpdGVtIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBtZW1iZXJvZiBJdGVtLnByb3RvdHlwZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtyZW1vdmVFbGVtZW50PWZhbHNlXVxuICAgKiBAcmV0dXJucyB7SXRlbX1cbiAgICovXG4gIEl0ZW0ucHJvdG90eXBlLl9kZXN0cm95ID0gZnVuY3Rpb24gKHJlbW92ZUVsZW1lbnQpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuICAgIGlmIChpbnN0Ll9pc0Rlc3Ryb3llZCkge1xuICAgICAgcmV0dXJuIGluc3Q7XG4gICAgfVxuXG4gICAgdmFyIGVsZW1lbnQgPSBpbnN0Ll9lbGVtZW50O1xuICAgIHZhciBncmlkID0gaW5zdC5nZXRHcmlkKCk7XG4gICAgdmFyIHNldHRpbmdzID0gZ3JpZC5fc2V0dGluZ3M7XG4gICAgdmFyIGluZGV4ID0gZ3JpZC5faXRlbXMuaW5kZXhPZihpbnN0KTtcblxuICAgIC8vIERlc3Ryb3kgcmVsZWFzZSBhbmQgbWlncmF0aW9uLlxuICAgIGluc3QuX3JlbGVhc2UuZGVzdHJveSgpO1xuICAgIGluc3QuX21pZ3JhdGUuZGVzdHJveSgpO1xuXG4gICAgLy8gU3RvcCBhbmltYXRpb25zLlxuICAgIGluc3QuX3N0b3BMYXlvdXQodHJ1ZSwge30pO1xuICAgIGdyaWQuX2l0ZW1TaG93SGFuZGxlci5zdG9wKGluc3QsIHt9KTtcbiAgICBncmlkLl9pdGVtSGlkZUhhbmRsZXIuc3RvcChpbnN0LCB7fSk7XG5cbiAgICAvLyBEZXN0cm95IGRyYWcuXG4gICAgaW5zdC5fZHJhZyAmJiBpbnN0Ll9kcmFnLmRlc3Ryb3koKTtcblxuICAgIC8vIERlc3Ryb3kgYW5pbWF0aW9uIGhhbmRsZXJzLlxuICAgIGluc3QuX2FuaW1hdGUuZGVzdHJveSgpO1xuICAgIGluc3QuX2FuaW1hdGVDaGlsZC5kZXN0cm95KCk7XG5cbiAgICAvLyBIYW5kbGUgdmlzaWJpbGl0eSBjYWxsYmFjayBxdWV1ZSwgZmlyZSBhbGwgdW5jb21wbGV0ZWQgY2FsbGJhY2tzIHdpdGhcbiAgICAvLyBpbnRlcnJ1cHRlZCBmbGFnLlxuICAgIHByb2Nlc3NRdWV1ZShpbnN0Ll92aXNpYmlsaXR5UXVldWUsIHRydWUsIGluc3QpO1xuXG4gICAgLy8gUmVtb3ZlIGFsbCBpbmxpbmUgc3R5bGVzLlxuICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIGluc3QuX2NoaWxkLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcblxuICAgIC8vIFJlbW92ZSBjbGFzc2VzLlxuICAgIHJlbW92ZUNsYXNzKGVsZW1lbnQsIHNldHRpbmdzLml0ZW1Qb3NpdGlvbmluZ0NsYXNzKTtcbiAgICByZW1vdmVDbGFzcyhlbGVtZW50LCBzZXR0aW5ncy5pdGVtRHJhZ2dpbmdDbGFzcyk7XG4gICAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgc2V0dGluZ3MuaXRlbVJlbGVhc2luZ0NsYXNzKTtcbiAgICByZW1vdmVDbGFzcyhlbGVtZW50LCBzZXR0aW5ncy5pdGVtQ2xhc3MpO1xuICAgIHJlbW92ZUNsYXNzKGVsZW1lbnQsIHNldHRpbmdzLml0ZW1WaXNpYmxlQ2xhc3MpO1xuICAgIHJlbW92ZUNsYXNzKGVsZW1lbnQsIHNldHRpbmdzLml0ZW1IaWRkZW5DbGFzcyk7XG5cbiAgICAvLyBSZW1vdmUgaXRlbSBmcm9tIEdyaWQgaW5zdGFuY2UgaWYgaXQgc3RpbGwgZXhpc3RzIHRoZXJlLlxuICAgIGluZGV4ID4gLTEgJiYgZ3JpZC5faXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgIC8vIFJlbW92ZSBlbGVtZW50IGZyb20gRE9NLlxuICAgIHJlbW92ZUVsZW1lbnQgJiYgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuXG4gICAgLy8gUmVtb3ZlIGl0ZW0gaW5zdGFuY2UgZnJvbSB0aGUgaXRlbSBpbnN0YW5jZXMgY29sbGVjdGlvbi5cbiAgICBpdGVtSW5zdGFuY2VzW2luc3QuX2lkXSA9IHVuZGVmaW5lZDtcblxuICAgIC8vIFVwZGF0ZSBpdGVtIHN0YXRlcyAobW9zdGx5IGp1c3QgZm9yIGdvb2QgbWVhc3VyZSkuXG4gICAgaW5zdC5faXNBY3RpdmUgPSBpbnN0Ll9pc1Bvc2l0aW9uaW5nID0gaW5zdC5faXNIaWRpbmcgPSBpbnN0Ll9pc1Nob3dpbmcgPSBmYWxzZTtcbiAgICBpbnN0Ll9pc0Rlc3Ryb3llZCA9IGluc3QuX2lzSGlkZGVuID0gdHJ1ZTtcblxuICAgIHJldHVybiBpbnN0O1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIExheW91dFxuICAgKiAqKioqKipcbiAgICovXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgTGF5b3V0IGluc3RhbmNlLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjbGFzc1xuICAgKiBAcGFyYW0ge0dyaWR9IGdyaWRcbiAgICogQHBhcmFtIHtJdGVtW119IGl0ZW1zXG4gICAqL1xuICBmdW5jdGlvbiBMYXlvdXQoZ3JpZCwgaXRlbXMpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcbiAgICB2YXIgbGF5b3V0U2V0dGluZ3MgPSBncmlkLl9zZXR0aW5ncy5sYXlvdXQ7XG5cbiAgICAvLyBDbG9uZSBpdGVtcy5cbiAgICBpdGVtcyA9IGl0ZW1zLmNvbmNhdCgpO1xuXG4gICAgLy8gTGV0J3MgbWFrZSBzdXJlIHdlIGhhdmUgdGhlIGNvcnJlY3QgY29udGFpbmVyIGRpbWVuc2lvbnMgYmVmb3JlIGdvaW5nXG4gICAgLy8gZnVydGhlci5cbiAgICBncmlkLl9yZWZyZXNoRGltZW5zaW9ucygpO1xuXG4gICAgdmFyIHdpZHRoID0gZ3JpZC5fd2lkdGggLSBncmlkLl9ib3JkZXIubGVmdCAtIGdyaWQuX2JvcmRlci5yaWdodDtcbiAgICB2YXIgaGVpZ2h0ID0gZ3JpZC5faGVpZ2h0IC0gZ3JpZC5fYm9yZGVyLnRvcCAtIGdyaWQuX2JvcmRlci5ib3R0b207XG4gICAgdmFyIGlzQ3VzdG9tTGF5b3V0ID0gdHlwZW9mIGxheW91dFNldHRpbmdzID09PSB0eXBlRnVuY3Rpb247XG4gICAgdmFyIGxheW91dCA9IGlzQ3VzdG9tTGF5b3V0ID8gbGF5b3V0U2V0dGluZ3MoaXRlbXMsIHdpZHRoLCBoZWlnaHQpIDpcbiAgICAgIG11dXJpTGF5b3V0KGl0ZW1zLCB3aWR0aCwgaGVpZ2h0LCBpc1BsYWluT2JqZWN0KGxheW91dFNldHRpbmdzKSA/IGxheW91dFNldHRpbmdzIDoge30pO1xuXG4gICAgLy8gU2V0IGluc3RhbmNlIGRhdGEgYmFzZWQgb24gbGF5b3V0IGRhdGEuXG4gICAgaW5zdC5zbG90cyA9IGxheW91dC5zbG90cztcbiAgICBpbnN0LnNldFdpZHRoID0gbGF5b3V0LnNldFdpZHRoIHx8IGZhbHNlO1xuICAgIGluc3Quc2V0SGVpZ2h0ID0gbGF5b3V0LnNldEhlaWdodCB8fCBmYWxzZTtcbiAgICBpbnN0LndpZHRoID0gbGF5b3V0LndpZHRoO1xuICAgIGluc3QuaGVpZ2h0ID0gbGF5b3V0LmhlaWdodDtcblxuICB9XG5cbiAgLyoqXG4gICAqIEVtaXR0ZXJcbiAgICogKioqKioqKlxuICAgKi9cblxuICAvKipcbiAgICogRXZlbnQgZW1pdHRlciBjb25zdHJ1Y3Rvci5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2xhc3NcbiAgICovXG4gIGZ1bmN0aW9uIEVtaXR0ZXIoKSB7XG5cbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICB0aGlzLl9pc0Rlc3Ryb3llZCA9IGZhbHNlO1xuXG4gIH1cblxuICAvKipcbiAgICogRW1pdHRlciAtIFB1YmxpYyBwcm90b3R5cGUgbWV0aG9kc1xuICAgKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqL1xuXG4gIC8qKlxuICAgKiBCaW5kIGFuIGV2ZW50IGxpc3RlbmVyLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBFbWl0dGVyLnByb3RvdHlwZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAgICogQHJldHVybnMge0VtaXR0ZXJ9XG4gICAqL1xuICBFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuICAgIGlmIChpbnN0Ll9pc0Rlc3Ryb3llZCkge1xuICAgICAgcmV0dXJuIGluc3Q7XG4gICAgfVxuXG4gICAgdmFyIGxpc3RlbmVycyA9IGluc3QuX2V2ZW50c1tldmVudF0gfHwgW107XG4gICAgbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIGluc3QuX2V2ZW50c1tldmVudF0gPSBsaXN0ZW5lcnM7XG5cbiAgICByZXR1cm4gaW5zdDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBCaW5kIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQgaXMgdHJpZ2dlcmVkIG9ubHkgb25jZS5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgRW1pdHRlci5wcm90b3R5cGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gICAqIEByZXR1cm5zIHtFbWl0dGVyfVxuICAgKi9cbiAgRW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcbiAgICByZXR1cm4gdGhpcy5vbihldmVudCwgZnVuY3Rpb24gY2FsbGJhY2soKSB7XG4gICAgICBpbnN0Lm9mZihldmVudCwgY2FsbGJhY2spO1xuICAgICAgbGlzdGVuZXIuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9KTtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBVbmJpbmQgYWxsIGV2ZW50IGxpc3RlbmVycyB0aGF0IG1hdGNoIHRoZSBwcm92aWRlZCBsaXN0ZW5lciBmdW5jdGlvbi5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgRW1pdHRlci5wcm90b3R5cGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gICAqIEByZXR1cm5zIHtFbWl0dGVyfVxuICAgKi9cbiAgRW1pdHRlci5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGV2ZW50LCBsaXN0ZW5lcikge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuXG4gICAgaWYgKGluc3QuX2lzRGVzdHJveWVkKSB7XG4gICAgICByZXR1cm4gaW5zdDtcbiAgICB9XG5cbiAgICB2YXIgbGlzdGVuZXJzID0gaW5zdC5fZXZlbnRzW2V2ZW50XSB8fCBbXTtcbiAgICB2YXIgaSA9IGxpc3RlbmVycy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZiAobGlzdGVuZXIgPT09IGxpc3RlbmVyc1tpXSkge1xuICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpbnN0O1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEVtaXQgYWxsIGxpc3RlbmVycyBpbiBhIHNwZWNpZmllZCBldmVudCB3aXRoIHRoZSBwcm92aWRlZCBhcmd1bWVudHMuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEVtaXR0ZXIucHJvdG90eXBlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0geyp9IFthcmcxXVxuICAgKiBAcGFyYW0geyp9IFthcmcyXVxuICAgKiBAcGFyYW0geyp9IFthcmczXVxuICAgKiBAcmV0dXJucyB7RW1pdHRlcn1cbiAgICovXG4gIEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnQsIGFyZzEsIGFyZzIsIGFyZzMpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuICAgIGlmIChpbnN0Ll9pc0Rlc3Ryb3llZCkge1xuICAgICAgcmV0dXJuIGluc3Q7XG4gICAgfVxuXG4gICAgdmFyIGxpc3RlbmVycyA9IGluc3QuX2V2ZW50c1tldmVudF0gfHwgW107XG4gICAgdmFyIGxpc3RlbmVyc0xlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgdmFyIGFyZ3NMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcbiAgICB2YXIgaTtcblxuICAgIGlmIChsaXN0ZW5lcnNMZW5ndGgpIHtcbiAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5jb25jYXQoKTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnNMZW5ndGg7IGkrKykge1xuICAgICAgICBhcmdzTGVuZ3RoID09PSAwID8gbGlzdGVuZXJzW2ldKCkgOlxuICAgICAgICBhcmdzTGVuZ3RoID09PSAxID8gbGlzdGVuZXJzW2ldKGFyZzEpIDpcbiAgICAgICAgYXJnc0xlbmd0aCA9PT0gMiA/IGxpc3RlbmVyc1tpXShhcmcxLCBhcmcyKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzW2ldKGFyZzEsIGFyZzIsIGFyZzMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpbnN0O1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgZW1pdHRlciBpbnN0YW5jZS4gQmFzaWNhbGx5IGp1c3QgcmVtb3ZlcyBhbGwgYm91bmQgbGlzdGVuZXJzLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBFbWl0dGVyLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7RW1pdHRlcn1cbiAgICovXG4gIEVtaXR0ZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgaW5zdCA9IHRoaXM7XG5cbiAgICBpZiAoaW5zdC5faXNEZXN0cm95ZWQpIHtcbiAgICAgIHJldHVybiBpbnN0O1xuICAgIH1cblxuICAgIHZhciBldmVudE5hbWVzID0gT2JqZWN0LmtleXMoaW5zdC5fZXZlbnRzKTtcbiAgICB2YXIgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBldmVudE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpbnN0Ll9ldmVudHNbZXZlbnROYW1lc1tpXV0gPSBudWxsO1xuICAgIH1cblxuICAgIGluc3QuX2lzRGVzdHJveWVkID0gdHJ1ZTtcblxuICAgIHJldHVybiBpbnN0O1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEl0ZW1BbmltYXRlXG4gICAqICoqKioqKioqKioqXG4gICAqL1xuXG4gIC8qKlxuICAgKiBNdXVyaSdzIGludGVybmFsIGFuaW1hdGlvbiBlbmdpbmUuIFVzZXMgV2ViIEFuaW1hdGlvbnMgQVBJLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjbGFzc1xuICAgKiBAcGFyYW0ge0l0ZW19IGl0ZW1cbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICAgKi9cbiAgZnVuY3Rpb24gSXRlbUFuaW1hdGUoaXRlbSwgZWxlbWVudCkge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuICAgIGluc3QuX2l0ZW0gPSBpdGVtO1xuICAgIGluc3QuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgIGluc3QuX2FuaW1hdGlvbiA9IG51bGw7XG4gICAgaW5zdC5fcHJvcHNUbyA9IG51bGw7XG4gICAgaW5zdC5faXNEZXN0cm95ZWQgPSBmYWxzZTtcblxuICB9XG5cbiAgLyoqXG4gICAqIEl0ZW1BbmltYXRlIC0gUHVibGljIHByb3RvdHlwZSBtZXRob2RzXG4gICAqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqL1xuXG4gIC8qKlxuICAgKiBTdGFydCBpbnN0YW5jZSdzIGFuaW1hdGlvbi4gQXV0b21hdGljYWxseSBzdG9wcyBjdXJyZW50IGFuaW1hdGlvbiBpZiBpdCBpc1xuICAgKiBydW5uaW5nLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtQW5pbWF0ZS5wcm90b3R5cGVcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzRnJvbVxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHNUb1xuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbj0zMDBdXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5lYXNpbmc9J2Vhc2UnXVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5vbkZpbmlzaF1cbiAgICovXG4gIEl0ZW1BbmltYXRlLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uIChwcm9wc0Zyb20sIHByb3BzVG8sIG9wdGlvbnMpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuICAgIGlmIChpbnN0Ll9pc0Rlc3Ryb3llZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgY2FsbGJhY2sgPSB0eXBlb2Ygb3B0cy5vbkZpbmlzaCA9PT0gdHlwZUZ1bmN0aW9uID8gb3B0cy5vbkZpbmlzaCA6IG51bGw7XG4gICAgdmFyIHNob3VsZFN0b3A7XG5cbiAgICAvLyBJZiBpdGVtIGlzIGJlaW5nIGFuaW1hdGUgY2hlY2sgaWYgdGhlIHRhcmdldCBhbmltYXRpb24gcHJvcGVydGllcyBlcXVhbFxuICAgIC8vIHRvIHRoZSBwcm9wZXJ0aWVzIGluIHRoZSBjdXJyZW50IGFuaW1hdGlvbi4gSWYgdGhleSBtYXRjaCB3ZSBjYW4ganVzdCBsZXRcbiAgICAvLyB0aGUgYW5pbWF0aW9uIGNvbnRpbnVlIGFuZCBiZSBkb25lIHdpdGggaXQgKGFuZCBvZiBjb3Vyc2UgY2hhbmdlIHRoZVxuICAgIC8vIGNhY2hlZCBjYWxsYmFjaykuIElmIHRoZSBhbmltYXRpb24gcHJvcGVydGllcyBkbyBub3QgbWF0Y2ggd2UgbmVlZCB0b1xuICAgIC8vIHN0b3AgdGhlIG9uZ29pbmcgYW5pbWF0aW9uLlxuICAgIGlmIChpbnN0Ll9hbmltYXRpb24pIHtcbiAgICAgIHNob3VsZFN0b3AgPSBPYmplY3Qua2V5cyhwcm9wc1RvKS5zb21lKGZ1bmN0aW9uIChwcm9wTmFtZSkge1xuICAgICAgICByZXR1cm4gcHJvcHNUb1twcm9wTmFtZV0gIT09IGluc3QuX3Byb3BzVG9bcHJvcE5hbWVdO1xuICAgICAgfSk7XG4gICAgICBpZiAoc2hvdWxkU3RvcCkge1xuICAgICAgICBpbnN0Ll9hbmltYXRpb24uY2FuY2VsKCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaW5zdC5fYW5pbWF0aW9uLm9uZmluaXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGluc3QuX2FuaW1hdGlvbiA9IGluc3QuX3Byb3BzVG8gPSBudWxsO1xuICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDYWNoZSB0YXJnZXQgcHJvcHMuXG4gICAgaW5zdC5fcHJvcHNUbyA9IHByb3BzVG87XG5cbiAgICAvLyBTdGFydCB0aGUgYW5pbWF0aW9uLlxuICAgIGluc3QuX2FuaW1hdGlvbiA9IGluc3QuX2VsZW1lbnQuYW5pbWF0ZShbcHJvcHNGcm9tLCBwcm9wc1RvXSwge1xuICAgICAgZHVyYXRpb246IG9wdHMuZHVyYXRpb24gfHwgMzAwLFxuICAgICAgZWFzaW5nOiBvcHRzLmVhc2luZyB8fCAnZWFzZSdcbiAgICB9KTtcblxuICAgIC8vIEJpbmQgYW5pbWF0aW9uIGZpbmlzaCBjYWxsYmFjay5cbiAgICBpbnN0Ll9hbmltYXRpb24ub25maW5pc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpbnN0Ll9hbmltYXRpb24gPSBpbnN0Ll9wcm9wc1RvID0gbnVsbDtcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgfTtcblxuICAgIC8vIFNldCB0aGUgZW5kIHN0eWxlcy5cbiAgICBzZXRTdHlsZXMoaW5zdC5fZWxlbWVudCwgcHJvcHNUbyk7XG5cbiAgfTtcblxuICAvKipcbiAgICogU3RvcCBpbnN0YW5jZSdzIGN1cnJlbnQgYW5pbWF0aW9uIGlmIHJ1bm5pbmcuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBJdGVtQW5pbWF0ZS5wcm90b3R5cGVcbiAgICogQHBhcmFtIHtPYmplY3R9IFtjdXJyZW50UHJvcHNdXG4gICAqL1xuICBJdGVtQW5pbWF0ZS5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uIChjdXJyZW50UHJvcHMpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuICAgIGlmICghaW5zdC5faXNEZXN0cm95ZWQgJiYgaW5zdC5fYW5pbWF0aW9uKSB7XG4gICAgICBzZXRTdHlsZXMoaW5zdC5fZWxlbWVudCwgY3VycmVudFByb3BzIHx8IGdldEN1cnJlbnRTdHlsZXMoaW5zdC5fZWxlbWVudCwgaW5zdC5fcHJvcHNUbykpO1xuICAgICAgaW5zdC5fYW5pbWF0aW9uLmNhbmNlbCgpO1xuICAgICAgaW5zdC5fYW5pbWF0aW9uID0gaW5zdC5fcHJvcHNUbyA9IG51bGw7XG4gICAgfVxuXG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBpdGVtIGlzIGJlaW5nIGFuaW1hdGVkIGN1cnJlbnRseS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIEl0ZW1BbmltYXRlLnByb3RvdHlwZVxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgSXRlbUFuaW1hdGUucHJvdG90eXBlLmlzQW5pbWF0aW5nID0gZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuICEhdGhpcy5fYW5pbWF0aW9uO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgdGhlIGluc3RhbmNlIGFuZCBzdG9wIGN1cnJlbnQgYW5pbWF0aW9uIGlmIGl0IGlzIHJ1bm5pbmcuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW1BbmltYXRlLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIEl0ZW1BbmltYXRlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuXG4gICAgaWYgKCFpbnN0Ll9pc0Rlc3Ryb3llZCkge1xuICAgICAgaW5zdC5zdG9wKCk7XG4gICAgICBpbnN0Ll9pdGVtID0gaW5zdC5fZWxlbWVudCA9IG51bGw7XG4gICAgICBpbnN0Ll9pc0Rlc3Ryb3llZCA9IHRydWU7XG4gICAgfVxuXG4gIH07XG5cbiAgLyoqXG4gICAqIEl0ZW1NaWdyYXRlXG4gICAqICoqKioqKioqKioqXG4gICAqL1xuXG4gIC8qKlxuICAgKiBUaGUgbWlncmF0ZSBwcm9jZXNzIGhhbmRsZXIgY29uc3RydWN0b3IuXG4gICAqXG4gICAqIEBjbGFzc1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0l0ZW19IGl0ZW1cbiAgICovXG4gIGZ1bmN0aW9uIEl0ZW1NaWdyYXRlKGl0ZW0pIHtcblxuICAgIHZhciBtaWdyYXRlID0gdGhpcztcblxuICAgIC8vIFByaXZhdGUgcHJvcHMuXG4gICAgbWlncmF0ZS5faXRlbUlkID0gaXRlbS5faWQ7XG4gICAgbWlncmF0ZS5faXNEZXN0cm95ZWQgPSBmYWxzZTtcblxuICAgIC8vIFB1YmxpYyBwcm9wcy5cbiAgICBtaWdyYXRlLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgbWlncmF0ZS5jb250YWluZXIgPSBmYWxzZTtcbiAgICBtaWdyYXRlLmNvbnRhaW5lckRpZmZYID0gMDtcbiAgICBtaWdyYXRlLmNvbnRhaW5lckRpZmZZID0gMDtcblxuICB9XG5cbiAgLyoqXG4gICAqIEl0ZW1NaWdyYXRlIC0gUHVibGljIHByb3RvdHlwZSBtZXRob2RzXG4gICAqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqL1xuXG4gIC8qKlxuICAgKiBEZXN0cm95IGluc3RhbmNlLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtTWlncmF0ZS5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0l0ZW1NaWdyYXRlfVxuICAgKi9cbiAgSXRlbU1pZ3JhdGUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgbWlncmF0ZSA9IHRoaXM7XG5cbiAgICBpZiAoIW1pZ3JhdGUuX2lzRGVzdHJveWVkKSB7XG4gICAgICBtaWdyYXRlLnN0b3AodHJ1ZSk7XG4gICAgICBtaWdyYXRlLl9pc0Rlc3Ryb3llZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1pZ3JhdGU7XG5cbiAgfTtcblxuICAvKipcbiAgICogR2V0IEl0ZW0gaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW1NaWdyYXRlLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7P0l0ZW19XG4gICAqL1xuICBJdGVtTWlncmF0ZS5wcm90b3R5cGUuZ2V0SXRlbSA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiBpdGVtSW5zdGFuY2VzW3RoaXMuX2l0ZW1JZF0gfHwgbnVsbDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBTdGFydCB0aGUgbWlncmF0ZSBwcm9jZXNzIG9mIGFuIGl0ZW0uXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW1NaWdyYXRlLnByb3RvdHlwZVxuICAgKiBAcGFyYW0ge0dyaWR9IHRhcmdldEdyaWRcbiAgICogQHBhcmFtIHtHcmlkU2luZ2xlSXRlbVF1ZXJ5fSBwb3NpdGlvblxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbY29udGFpbmVyXVxuICAgKiBAcmV0dXJucyB7SXRlbU1pZ3JhdGV9XG4gICAqL1xuICBJdGVtTWlncmF0ZS5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAodGFyZ2V0R3JpZCwgcG9zaXRpb24sIGNvbnRhaW5lcikge1xuXG4gICAgdmFyIG1pZ3JhdGUgPSB0aGlzO1xuXG4gICAgaWYgKG1pZ3JhdGUuX2lzRGVzdHJveWVkKSB7XG4gICAgICByZXR1cm4gbWlncmF0ZTtcbiAgICB9XG5cbiAgICB2YXIgaXRlbSA9IG1pZ3JhdGUuZ2V0SXRlbSgpO1xuICAgIHZhciBpdGVtRWxlbWVudCA9IGl0ZW0uX2VsZW1lbnQ7XG4gICAgdmFyIGlzSXRlbVZpc2libGUgPSBpdGVtLmlzVmlzaWJsZSgpO1xuICAgIHZhciBjdXJyZW50R3JpZCA9IGl0ZW0uZ2V0R3JpZCgpO1xuICAgIHZhciBjdXJyZW50R3JpZFN0biA9IGN1cnJlbnRHcmlkLl9zZXR0aW5ncztcbiAgICB2YXIgdGFyZ2V0R3JpZFN0biA9IHRhcmdldEdyaWQuX3NldHRpbmdzO1xuICAgIHZhciB0YXJnZXRHcmlkRWxlbWVudCA9IHRhcmdldEdyaWQuX2VsZW1lbnQ7XG4gICAgdmFyIGN1cnJlbnRJbmRleCA9IGN1cnJlbnRHcmlkLl9pdGVtcy5pbmRleE9mKGl0ZW0pO1xuICAgIHZhciB0YXJnZXRJbmRleCA9IHR5cGVvZiBwb3NpdGlvbiA9PT0gdHlwZU51bWJlciA/IHBvc2l0aW9uIDogdGFyZ2V0R3JpZC5faXRlbXMuaW5kZXhPZih0YXJnZXRHcmlkLl9nZXRJdGVtKHBvc2l0aW9uKSk7XG4gICAgdmFyIHRhcmdldENvbnRhaW5lciA9IGNvbnRhaW5lciB8fCBib2R5O1xuICAgIHZhciBjdXJyZW50Q29udGFpbmVyO1xuICAgIHZhciBvZmZzZXREaWZmO1xuICAgIHZhciBjb250YWluZXJEaWZmO1xuICAgIHZhciB0cmFuc2xhdGVYO1xuICAgIHZhciB0cmFuc2xhdGVZO1xuXG4gICAgLy8gSWYgd2UgaGF2ZSBpbnZhbGlkIG5ldyBpbmRleCwgbGV0J3MgcmV0dXJuIGltbWVkaWF0ZWx5LlxuICAgIGlmICh0YXJnZXRJbmRleCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG1pZ3JhdGU7XG4gICAgfVxuXG4gICAgLy8gTm9ybWFsaXplIHRhcmdldCBpbmRleCAoZm9yIGV2ZW50IGRhdGEpLlxuICAgIHRhcmdldEluZGV4ID0gbm9ybWFsaXplQXJyYXlJbmRleCh0YXJnZXRHcmlkLl9pdGVtcywgdGFyZ2V0SW5kZXgsIHRydWUpO1xuXG4gICAgLy8gR2V0IGN1cnJlbnQgdHJhbnNsYXRlWCBhbmQgdHJhbnNsYXRlWSB2YWx1ZXMgaWYgbmVlZGVkLlxuICAgIGlmIChpdGVtLmlzUG9zaXRpb25pbmcoKSB8fCBtaWdyYXRlLmlzQWN0aXZlIHx8IGl0ZW0uaXNSZWxlYXNpbmcoKSkge1xuICAgICAgdHJhbnNsYXRlWCA9IGdldFRyYW5zbGF0ZUFzRmxvYXQoaXRlbUVsZW1lbnQsICd4Jyk7XG4gICAgICB0cmFuc2xhdGVZID0gZ2V0VHJhbnNsYXRlQXNGbG9hdChpdGVtRWxlbWVudCwgJ3knKTtcbiAgICB9XG5cbiAgICAvLyBBYm9ydCBjdXJyZW50IHBvc2l0aW9uaW5nLlxuICAgIGlmIChpdGVtLmlzUG9zaXRpb25pbmcoKSkge1xuICAgICAgaXRlbS5fc3RvcExheW91dCh0cnVlLCB7dHJhbnNmb3JtOiBnZXRUcmFuc2xhdGVTdHJpbmcodHJhbnNsYXRlWCwgdHJhbnNsYXRlWSl9KTtcbiAgICB9XG5cbiAgICAvLyBBYm9ydCBjdXJyZW50IG1pZ3JhdGlvbi5cbiAgICBpZiAobWlncmF0ZS5pc0FjdGl2ZSkge1xuICAgICAgdHJhbnNsYXRlWCAtPSBtaWdyYXRlLmNvbnRhaW5lckRpZmZYO1xuICAgICAgdHJhbnNsYXRlWSAtPSBtaWdyYXRlLmNvbnRhaW5lckRpZmZZO1xuICAgICAgbWlncmF0ZS5zdG9wKHRydWUsIHt0cmFuc2Zvcm06IGdldFRyYW5zbGF0ZVN0cmluZyh0cmFuc2xhdGVYLCB0cmFuc2xhdGVZKX0pO1xuICAgIH1cblxuICAgIC8vIEFib3J0IGN1cnJlbnQgcmVsZWFzZS5cbiAgICBpZiAoaXRlbS5pc1JlbGVhc2luZygpKSB7XG4gICAgICB0cmFuc2xhdGVYIC09IGl0ZW0uX3JlbGVhc2UuY29udGFpbmVyRGlmZlg7XG4gICAgICB0cmFuc2xhdGVZIC09IGl0ZW0uX3JlbGVhc2UuY29udGFpbmVyRGlmZlk7XG4gICAgICBpdGVtLl9yZWxlYXNlLnN0b3AodHJ1ZSwge3RyYW5zZm9ybTogZ2V0VHJhbnNsYXRlU3RyaW5nKHRyYW5zbGF0ZVgsIHRyYW5zbGF0ZVkpfSk7XG4gICAgfVxuXG4gICAgLy8gU3RvcCBjdXJyZW50IHZpc2liaWxpdHkgYW5pbWF0aW9ucy5cbiAgICAvLyBUT0RPOiBUaGlzIGNhdXNlcyBwb3RlbnRpYWxseSBsYXlvdXQgdGhyYXNoaW5nLCBiZWNhdXNlIHdlIGFyZSBub3RcbiAgICAvLyBmZWVkaW5nIGFueSBzdHlsZXMgdG8gdGhlIHN0b3AgaGFuZGxlcnMuXG4gICAgY3VycmVudEdyaWQuX2l0ZW1TaG93SGFuZGxlci5zdG9wKGl0ZW0pO1xuICAgIGN1cnJlbnRHcmlkLl9pdGVtSGlkZUhhbmRsZXIuc3RvcChpdGVtKTtcblxuICAgIC8vIERlc3Ryb3kgY3VycmVudCBkcmFnLlxuICAgIGlmIChpdGVtLl9kcmFnKSB7XG4gICAgICBpdGVtLl9kcmFnLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICAvLyBEZXN0cm95IGN1cnJlbnQgYW5pbWF0aW9uIGhhbmRsZXJzLlxuICAgIGl0ZW0uX2FuaW1hdGUuZGVzdHJveSgpO1xuICAgIGl0ZW0uX2FuaW1hdGVDaGlsZC5kZXN0cm95KCk7XG5cbiAgICAvLyBQcm9jZXNzIGN1cnJlbnQgdmlzaWJpbGl0eSBhbmltYXRpb24gcXVldWUuXG4gICAgcHJvY2Vzc1F1ZXVlKGl0ZW0uX3Zpc2liaWxpdHlRdWV1ZSwgdHJ1ZSwgaXRlbSk7XG5cbiAgICAvLyBFbWl0IGJlZm9yZVNlbmQgZXZlbnQuXG4gICAgY3VycmVudEdyaWQuX2VtaXQoZXZCZWZvcmVTZW5kLCB7XG4gICAgICBpdGVtOiBpdGVtLFxuICAgICAgZnJvbUdyaWQ6IGN1cnJlbnRHcmlkLFxuICAgICAgZnJvbUluZGV4OiBjdXJyZW50SW5kZXgsXG4gICAgICB0b0dyaWQ6IHRhcmdldEdyaWQsXG4gICAgICB0b0luZGV4OiB0YXJnZXRJbmRleFxuICAgIH0pO1xuXG4gICAgLy8gRW1pdCBiZWZvcmVSZWNlaXZlIGV2ZW50LlxuICAgIHRhcmdldEdyaWQuX2VtaXQoZXZCZWZvcmVSZWNlaXZlLCB7XG4gICAgICBpdGVtOiBpdGVtLFxuICAgICAgZnJvbUdyaWQ6IGN1cnJlbnRHcmlkLFxuICAgICAgZnJvbUluZGV4OiBjdXJyZW50SW5kZXgsXG4gICAgICB0b0dyaWQ6IHRhcmdldEdyaWQsXG4gICAgICB0b0luZGV4OiB0YXJnZXRJbmRleFxuICAgIH0pO1xuXG4gICAgLy8gUmVtb3ZlIGN1cnJlbnQgY2xhc3NuYW1lcy5cbiAgICByZW1vdmVDbGFzcyhpdGVtRWxlbWVudCwgY3VycmVudEdyaWRTdG4uaXRlbUNsYXNzKTtcbiAgICByZW1vdmVDbGFzcyhpdGVtRWxlbWVudCwgY3VycmVudEdyaWRTdG4uaXRlbVZpc2libGVDbGFzcyk7XG4gICAgcmVtb3ZlQ2xhc3MoaXRlbUVsZW1lbnQsIGN1cnJlbnRHcmlkU3RuLml0ZW1IaWRkZW5DbGFzcyk7XG5cbiAgICAvLyBBZGQgbmV3IGNsYXNzbmFtZXMuXG4gICAgYWRkQ2xhc3MoaXRlbUVsZW1lbnQsIHRhcmdldEdyaWRTdG4uaXRlbUNsYXNzKTtcbiAgICBhZGRDbGFzcyhpdGVtRWxlbWVudCwgaXNJdGVtVmlzaWJsZSA/IHRhcmdldEdyaWRTdG4uaXRlbVZpc2libGVDbGFzcyA6IHRhcmdldEdyaWRTdG4uaXRlbUhpZGRlbkNsYXNzKTtcblxuICAgIC8vIE1vdmUgaXRlbSBpbnN0YW5jZSBmcm9tIGN1cnJlbnQgZ3JpZCB0byB0YXJnZXQgZ3JpZC5cbiAgICBjdXJyZW50R3JpZC5faXRlbXMuc3BsaWNlKGN1cnJlbnRJbmRleCwgMSk7XG4gICAgaW5zZXJ0SXRlbXNUb0FycmF5KHRhcmdldEdyaWQuX2l0ZW1zLCBpdGVtLCB0YXJnZXRJbmRleCk7XG5cbiAgICAvLyBVcGRhdGUgaXRlbSdzIGdyaWQgaWQgcmVmZXJlbmNlLlxuICAgIGl0ZW0uX2dyaWRJZCA9IHRhcmdldEdyaWQuX2lkO1xuXG4gICAgLy8gSW5zdGFudGlhdGUgbmV3IGFuaW1hdGlvbiBjb250cm9sbGVycy5cbiAgICBpdGVtLl9hbmltYXRlID0gbmV3IEdyaWQuSXRlbUFuaW1hdGUoaXRlbSwgaXRlbUVsZW1lbnQpO1xuICAgIGl0ZW0uX2FuaW1hdGVDaGlsZCA9IG5ldyBHcmlkLkl0ZW1BbmltYXRlKGl0ZW0sIGl0ZW0uX2NoaWxkKTtcblxuICAgIC8vIEdldCBjdXJyZW50IGNvbnRhaW5lclxuICAgIGN1cnJlbnRDb250YWluZXIgPSBpdGVtRWxlbWVudC5wYXJlbnROb2RlO1xuXG4gICAgLy8gTW92ZSB0aGUgaXRlbSBpbnNpZGUgdGhlIHRhcmdldCBjb250YWluZXIgaWYgaXQncyBkaWZmZXJlbnQgdGhhbiB0aGVcbiAgICAvLyBjdXJyZW50IGNvbnRhaW5lci5cbiAgICBpZiAodGFyZ2V0Q29udGFpbmVyICE9PSBjdXJyZW50Q29udGFpbmVyKSB7XG4gICAgICB0YXJnZXRDb250YWluZXIuYXBwZW5kQ2hpbGQoaXRlbUVsZW1lbnQpO1xuICAgICAgb2Zmc2V0RGlmZiA9IGdldE9mZnNldERpZmYodGFyZ2V0Q29udGFpbmVyLCBjdXJyZW50Q29udGFpbmVyLCB0cnVlKTtcbiAgICAgIGlmICh0cmFuc2xhdGVYID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdHJhbnNsYXRlWCA9IGdldFRyYW5zbGF0ZUFzRmxvYXQoaXRlbUVsZW1lbnQsICd4Jyk7XG4gICAgICAgIHRyYW5zbGF0ZVkgPSBnZXRUcmFuc2xhdGVBc0Zsb2F0KGl0ZW1FbGVtZW50LCAneScpO1xuICAgICAgfVxuICAgICAgc2V0U3R5bGVzKGl0ZW1FbGVtZW50LCB7dHJhbnNmb3JtOiBnZXRUcmFuc2xhdGVTdHJpbmcodHJhbnNsYXRlWCArIG9mZnNldERpZmYubGVmdCwgdHJhbnNsYXRlWSArIG9mZnNldERpZmYudG9wKX0pO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSBjaGlsZCBlbGVtZW50J3Mgc3R5bGVzIHRvIHJlZmxlY3QgdGhlIGN1cnJlbnQgdmlzaWJpbGl0eSBzdGF0ZS5cbiAgICBpdGVtLl9jaGlsZC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgaWYgKGlzSXRlbVZpc2libGUpIHtcbiAgICAgIHRhcmdldEdyaWQuX2l0ZW1TaG93SGFuZGxlci5zdGFydChpdGVtLCB0cnVlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0YXJnZXRHcmlkLl9pdGVtSGlkZUhhbmRsZXIuc3RhcnQoaXRlbSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIGRpc3BsYXkgc3R5bGVzLlxuICAgIHNldFN0eWxlcyhpdGVtRWxlbWVudCwge1xuICAgICAgZGlzcGxheTogaXNJdGVtVmlzaWJsZSA/ICdibG9jaycgOiAnaGlkZGVuJ1xuICAgIH0pO1xuXG4gICAgLy8gR2V0IG9mZnNldCBkaWZmIGZvciB0aGUgbWlncmF0aW9uIGRhdGEuXG4gICAgY29udGFpbmVyRGlmZiA9IGdldE9mZnNldERpZmYodGFyZ2V0Q29udGFpbmVyLCB0YXJnZXRHcmlkRWxlbWVudCwgdHJ1ZSk7XG5cbiAgICAvLyBVcGRhdGUgaXRlbSdzIGNhY2hlZCBkaW1lbnNpb25zIGFuZCBzb3J0IGRhdGEuXG4gICAgaXRlbS5fcmVmcmVzaERpbWVuc2lvbnMoKS5fcmVmcmVzaFNvcnREYXRhKCk7XG5cbiAgICAvLyBDcmVhdGUgbmV3IGRyYWcgaGFuZGxlci5cbiAgICBpdGVtLl9kcmFnID0gdGFyZ2V0R3JpZFN0bi5kcmFnRW5hYmxlZCA/IG5ldyBHcmlkLkl0ZW1EcmFnKGl0ZW0pIDogbnVsbDtcblxuICAgIC8vIFNldHVwIG1pZ3JhdGlvbiBkYXRhLlxuICAgIG1pZ3JhdGUuaXNBY3RpdmUgPSB0cnVlO1xuICAgIG1pZ3JhdGUuY29udGFpbmVyID0gdGFyZ2V0Q29udGFpbmVyO1xuICAgIG1pZ3JhdGUuY29udGFpbmVyRGlmZlggPSBjb250YWluZXJEaWZmLmxlZnQ7XG4gICAgbWlncmF0ZS5jb250YWluZXJEaWZmWSA9IGNvbnRhaW5lckRpZmYudG9wO1xuXG4gICAgLy8gRW1pdCBzZW5kIGV2ZW50LlxuICAgIGN1cnJlbnRHcmlkLl9lbWl0KGV2U2VuZCwge1xuICAgICAgaXRlbTogaXRlbSxcbiAgICAgIGZyb21HcmlkOiBjdXJyZW50R3JpZCxcbiAgICAgIGZyb21JbmRleDogY3VycmVudEluZGV4LFxuICAgICAgdG9HcmlkOiB0YXJnZXRHcmlkLFxuICAgICAgdG9JbmRleDogdGFyZ2V0SW5kZXhcbiAgICB9KTtcblxuICAgIC8vIEVtaXQgcmVjZWl2ZSBldmVudC5cbiAgICB0YXJnZXRHcmlkLl9lbWl0KGV2UmVjZWl2ZSwge1xuICAgICAgaXRlbTogaXRlbSxcbiAgICAgIGZyb21HcmlkOiBjdXJyZW50R3JpZCxcbiAgICAgIGZyb21JbmRleDogY3VycmVudEluZGV4LFxuICAgICAgdG9HcmlkOiB0YXJnZXRHcmlkLFxuICAgICAgdG9JbmRleDogdGFyZ2V0SW5kZXhcbiAgICB9KTtcblxuICAgIHJldHVybiBtaWdyYXRlO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEVuZCB0aGUgbWlncmF0ZSBwcm9jZXNzIG9mIGFuIGl0ZW0uIFRoaXMgbWV0aG9kIGNhbiBiZSB1c2VkIHRvIGFib3J0IGFuXG4gICAqIG9uZ29pbmcgbWlncmF0ZSBwcm9jZXNzIChhbmltYXRpb24pIG9yIGZpbmlzaCB0aGUgbWlncmF0ZSBwcm9jZXNzLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtTWlncmF0ZS5wcm90b3R5cGVcbiAgICogQHBhcmFtIHtCb29sZWFufSBbYWJvcnQ9ZmFsc2VdXG4gICAqICAtIFNob3VsZCB0aGUgbWlncmF0aW9uIGJlIGFib3J0ZWQ/XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY3VycmVudFN0eWxlc11cbiAgICogIC0gT3B0aW9uYWwgY3VycmVudCB0cmFuc2xhdGVYIGFuZCB0cmFuc2xhdGVZIHN0eWxlcy5cbiAgICogQHJldHVybnMge0l0ZW1NaWdyYXRlfVxuICAgKi9cbiAgSXRlbU1pZ3JhdGUucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoYWJvcnQsIGN1cnJlbnRTdHlsZXMpIHtcblxuICAgIHZhciBtaWdyYXRlID0gdGhpcztcblxuICAgIGlmIChtaWdyYXRlLl9pc0Rlc3Ryb3llZCB8fCAhbWlncmF0ZS5pc0FjdGl2ZSkge1xuICAgICAgcmV0dXJuIG1pZ3JhdGU7XG4gICAgfVxuXG4gICAgdmFyIGl0ZW0gPSBtaWdyYXRlLmdldEl0ZW0oKTtcbiAgICB2YXIgZWxlbWVudCA9IGl0ZW0uX2VsZW1lbnQ7XG4gICAgdmFyIGdyaWQgPSBpdGVtLmdldEdyaWQoKTtcbiAgICB2YXIgZ3JpZEVsZW1lbnQgPSBncmlkLl9lbGVtZW50O1xuICAgIHZhciB0cmFuc2xhdGVYO1xuICAgIHZhciB0cmFuc2xhdGVZO1xuXG4gICAgaWYgKG1pZ3JhdGUuY29udGFpbmVyICE9PSBncmlkRWxlbWVudCkge1xuICAgICAgaWYgKCFjdXJyZW50U3R5bGVzKSB7XG4gICAgICAgIHRyYW5zbGF0ZVggPSBhYm9ydCA/IGdldFRyYW5zbGF0ZUFzRmxvYXQoZWxlbWVudCwgJ3gnKSAtIG1pZ3JhdGUuY29udGFpbmVyRGlmZlggOiBpdGVtLl9sZWZ0O1xuICAgICAgICB0cmFuc2xhdGVZID0gYWJvcnQgPyBnZXRUcmFuc2xhdGVBc0Zsb2F0KGVsZW1lbnQsICd5JykgLSBtaWdyYXRlLmNvbnRhaW5lckRpZmZZIDogaXRlbS5fdG9wO1xuICAgICAgICBjdXJyZW50U3R5bGVzID0ge3RyYW5zZm9ybTogZ2V0VHJhbnNsYXRlU3RyaW5nKHRyYW5zbGF0ZVgsIHRyYW5zbGF0ZVkpfTtcbiAgICAgIH1cbiAgICAgIGdyaWRFbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgc2V0U3R5bGVzKGVsZW1lbnQsIGN1cnJlbnRTdHlsZXMpO1xuICAgIH1cblxuICAgIG1pZ3JhdGUuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICBtaWdyYXRlLmNvbnRhaW5lciA9IG51bGw7XG4gICAgbWlncmF0ZS5jb250YWluZXJEaWZmWCA9IDA7XG4gICAgbWlncmF0ZS5jb250YWluZXJEaWZmWSA9IDA7XG5cbiAgICByZXR1cm4gbWlncmF0ZTtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBJdGVtUmVsZWFzZVxuICAgKiAqKioqKioqKioqKlxuICAgKi9cblxuICAvKipcbiAgICogVGhlIHJlbGVhc2UgcHJvY2VzcyBoYW5kbGVyIGNvbnN0cnVjdG9yLiBBbHRob3VnaCB0aGlzIG1pZ2h0IHNlZW0gYXMgcHJvcGVyXG4gICAqIGZpdCBmb3IgdGhlIGRyYWcgcHJvY2VzcyB0aGlzIG5lZWRzIHRvIGJlIHNlcGFyYXRlZCBpbnRvIGl0J3Mgb3duIGxvZ2ljXG4gICAqIGJlY2F1c2UgdGhlcmUgbWlnaHQgYmUgYSBzY2VuYXJpbyB3aGVyZSBkcmFnIGlzIGRpc2FibGVkLCBidXQgdGhlIHJlbGVhc2VcbiAgICogcHJvY2VzcyBzdGlsbCBuZWVkcyB0byBiZSBpbXBsZW1lbnRlZCAoZHJhZ2dpbmcgZnJvbSBhIGdyaWQgdG8gYW5vdGhlcikuXG4gICAqXG4gICAqIEBjbGFzc1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0l0ZW19IGl0ZW1cbiAgICovXG4gIGZ1bmN0aW9uIEl0ZW1SZWxlYXNlKGl0ZW0pIHtcblxuICAgIHZhciByZWxlYXNlID0gdGhpcztcblxuICAgIC8vIFByaXZhdGUgcHJvcHMuXG4gICAgcmVsZWFzZS5faXRlbUlkID0gaXRlbS5faWQ7XG4gICAgcmVsZWFzZS5faXNEZXN0cm95ZWQgPSBmYWxzZTtcblxuICAgIC8vIFB1YmxpYyBwcm9wcy5cbiAgICByZWxlYXNlLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgcmVsZWFzZS5pc1Bvc2l0aW9uaW5nU3RhcnRlZCA9IGZhbHNlO1xuICAgIHJlbGVhc2UuY29udGFpbmVyRGlmZlggPSAwO1xuICAgIHJlbGVhc2UuY29udGFpbmVyRGlmZlkgPSAwO1xuXG4gIH1cblxuICAvKipcbiAgICogSXRlbVJlbGVhc2UgLSBQdWJsaWMgcHJvdG90eXBlIG1ldGhvZHNcbiAgICogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICovXG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW1SZWxlYXNlLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7SXRlbVJlbGVhc2V9XG4gICAqL1xuICBJdGVtUmVsZWFzZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciByZWxlYXNlID0gdGhpcztcblxuICAgIGlmICghcmVsZWFzZS5faXNEZXN0cm95ZWQpIHtcbiAgICAgIHJlbGVhc2Uuc3RvcCh0cnVlKTtcbiAgICAgIHJlbGVhc2UuX2lzRGVzdHJveWVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVsZWFzZTtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgSXRlbSBpbnN0YW5jZS5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbVJlbGVhc2UucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHs/SXRlbX1cbiAgICovXG4gIEl0ZW1SZWxlYXNlLnByb3RvdHlwZS5nZXRJdGVtID0gZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIGl0ZW1JbnN0YW5jZXNbdGhpcy5faXRlbUlkXSB8fCBudWxsO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIFJlc2V0IHB1YmxpYyBkYXRhIGFuZCByZW1vdmUgcmVsZWFzaW5nIGNsYXNzLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtUmVsZWFzZS5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0l0ZW1SZWxlYXNlfVxuICAgKi9cbiAgSXRlbVJlbGVhc2UucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHJlbGVhc2UgPSB0aGlzO1xuXG4gICAgaWYgKHJlbGVhc2UuX2lzRGVzdHJveWVkKSB7XG4gICAgICByZXR1cm4gcmVsZWFzZTtcbiAgICB9XG5cbiAgICB2YXIgaXRlbSA9IHJlbGVhc2UuZ2V0SXRlbSgpO1xuICAgIHJlbGVhc2UuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICByZWxlYXNlLmlzUG9zaXRpb25pbmdTdGFydGVkID0gZmFsc2U7XG4gICAgcmVsZWFzZS5jb250YWluZXJEaWZmWCA9IDA7XG4gICAgcmVsZWFzZS5jb250YWluZXJEaWZmWSA9IDA7XG4gICAgcmVtb3ZlQ2xhc3MoaXRlbS5fZWxlbWVudCwgaXRlbS5nZXRHcmlkKCkuX3NldHRpbmdzLml0ZW1SZWxlYXNpbmdDbGFzcyk7XG5cbiAgICByZXR1cm4gcmVsZWFzZTtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBTdGFydCB0aGUgcmVsZWFzZSBwcm9jZXNzIG9mIGFuIGl0ZW0uXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW1SZWxlYXNlLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7SXRlbVJlbGVhc2V9XG4gICAqL1xuICBJdGVtUmVsZWFzZS5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgcmVsZWFzZSA9IHRoaXM7XG5cbiAgICBpZiAocmVsZWFzZS5faXNEZXN0cm95ZWQgfHwgcmVsZWFzZS5pc0FjdGl2ZSkge1xuICAgICAgcmV0dXJuIHJlbGVhc2U7XG4gICAgfVxuXG4gICAgdmFyIGl0ZW0gPSByZWxlYXNlLmdldEl0ZW0oKTtcbiAgICB2YXIgZ3JpZCA9IGl0ZW0uZ2V0R3JpZCgpO1xuXG4gICAgLy8gRmxhZyByZWxlYXNlIGFzIGFjdGl2ZS5cbiAgICByZWxlYXNlLmlzQWN0aXZlID0gdHJ1ZTtcblxuICAgIC8vIEFkZCByZWxlYXNlIGNsYXNzbmFtZSB0byB0aGUgcmVsZWFzZWQgZWxlbWVudC5cbiAgICBhZGRDbGFzcyhpdGVtLl9lbGVtZW50LCBncmlkLl9zZXR0aW5ncy5pdGVtUmVsZWFzaW5nQ2xhc3MpO1xuXG4gICAgLy8gRW1pdCBkcmFnUmVsZWFzZVN0YXJ0IGV2ZW50LlxuICAgIGdyaWQuX2VtaXQoZXZEcmFnUmVsZWFzZVN0YXJ0LCBpdGVtKTtcblxuICAgIC8vIFBvc2l0aW9uIHRoZSByZWxlYXNlZCBpdGVtLlxuICAgIGl0ZW0uX2xheW91dChmYWxzZSk7XG5cbiAgICByZXR1cm4gcmVsZWFzZTtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBFbmQgdGhlIHJlbGVhc2UgcHJvY2VzcyBvZiBhbiBpdGVtLiBUaGlzIG1ldGhvZCBjYW4gYmUgdXNlZCB0byBhYm9ydCBhblxuICAgKiBvbmdvaW5nIHJlbGVhc2UgcHJvY2VzcyAoYW5pbWF0aW9uKSBvciBmaW5pc2ggdGhlIHJlbGVhc2UgcHJvY2Vzcy5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbVJlbGVhc2UucHJvdG90eXBlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2Fib3J0PWZhbHNlXVxuICAgKiAgLSBTaG91bGQgdGhlIHJlbGVhc2UgYmUgYWJvcnRlZD8gV2hlbiB0cnVlLCB0aGUgcmVsZWFzZSBlbmQgZXZlbnQgd29uJ3QgYmVcbiAgICogICAgZW1pdHRlZC4gU2V0IHRvIHRydWUgb25seSB3aGVuIHlvdSBuZWVkIHRvIGFib3J0IHRoZSByZWxlYXNlIHByb2Nlc3NcbiAgICogICAgd2hpbGUgdGhlIGl0ZW0gaXMgYW5pbWF0aW5nIHRvIGl0J3MgcG9zaXRpb24uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY3VycmVudFN0eWxlc11cbiAgICogIC0gT3B0aW9uYWwgY3VycmVudCB0cmFuc2xhdGVYIGFuZCB0cmFuc2xhdGVZIHN0eWxlcy5cbiAgICogQHJldHVybnMge0l0ZW1SZWxlYXNlfVxuICAgKi9cbiAgSXRlbVJlbGVhc2UucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoYWJvcnQsIGN1cnJlbnRTdHlsZXMpIHtcblxuICAgIHZhciByZWxlYXNlID0gdGhpcztcblxuICAgIGlmIChyZWxlYXNlLl9pc0Rlc3Ryb3llZCB8fCAhcmVsZWFzZS5pc0FjdGl2ZSkge1xuICAgICAgcmV0dXJuIHJlbGVhc2U7XG4gICAgfVxuXG4gICAgdmFyIGl0ZW0gPSByZWxlYXNlLmdldEl0ZW0oKTtcbiAgICB2YXIgZWxlbWVudCA9IGl0ZW0uX2VsZW1lbnQ7XG4gICAgdmFyIGdyaWQgPSBpdGVtLmdldEdyaWQoKTtcbiAgICB2YXIgY29udGFpbmVyID0gZ3JpZC5fZWxlbWVudDtcbiAgICB2YXIgY29udGFpbmVyRGlmZlggPSByZWxlYXNlLmNvbnRhaW5lckRpZmZYO1xuICAgIHZhciBjb250YWluZXJEaWZmWSA9IHJlbGVhc2UuY29udGFpbmVyRGlmZlk7XG4gICAgdmFyIHRyYW5zbGF0ZVg7XG4gICAgdmFyIHRyYW5zbGF0ZVk7XG5cbiAgICAvLyBSZXNldCBkYXRhIGFuZCByZW1vdmUgcmVsZWFzaW5nIGNsYXNzbmFtZSBmcm9tIHRoZSBlbGVtZW50LlxuICAgIHJlbGVhc2UucmVzZXQoKTtcblxuICAgIC8vIElmIHRoZSByZWxlYXNlZCBlbGVtZW50IGlzIG91dHNpZGUgdGhlIGdyaWQncyBjb250YWluZXIgZWxlbWVudCBwdXQgaXRcbiAgICAvLyBiYWNrIHRoZXJlIGFuZCBhZGp1c3QgcG9zaXRpb24gYWNjb3JkaW5nbHkuXG4gICAgaWYgKGVsZW1lbnQucGFyZW50Tm9kZSAhPT0gY29udGFpbmVyKSB7XG4gICAgICBpZiAoIWN1cnJlbnRTdHlsZXMpIHtcbiAgICAgICAgdHJhbnNsYXRlWCA9IGFib3J0ID8gZ2V0VHJhbnNsYXRlQXNGbG9hdChlbGVtZW50LCAneCcpIC0gY29udGFpbmVyRGlmZlggOiBpdGVtLl9sZWZ0O1xuICAgICAgICB0cmFuc2xhdGVZID0gYWJvcnQgPyBnZXRUcmFuc2xhdGVBc0Zsb2F0KGVsZW1lbnQsICd5JykgLSBjb250YWluZXJEaWZmWSA6IGl0ZW0uX3RvcDtcbiAgICAgICAgY3VycmVudFN0eWxlcyA9IHt0cmFuc2Zvcm06IGdldFRyYW5zbGF0ZVN0cmluZyh0cmFuc2xhdGVYLCB0cmFuc2xhdGVZKX07XG4gICAgICB9XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICBzZXRTdHlsZXMoZWxlbWVudCwgY3VycmVudFN0eWxlcyk7XG4gICAgfVxuXG4gICAgLy8gRW1pdCBkcmFnUmVsZWFzZUVuZCBldmVudC5cbiAgICBpZiAoIWFib3J0KSB7XG4gICAgICBncmlkLl9lbWl0KGV2RHJhZ1JlbGVhc2VFbmQsIGl0ZW0pO1xuICAgIH1cblxuICAgIHJldHVybiByZWxlYXNlO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEl0ZW1EcmFnXG4gICAqICoqKioqKioqXG4gICAqL1xuXG4gIC8qKlxuICAgKiBCaW5kIEhhbW1lciB0b3VjaCBpbnRlcmFjdGlvbiB0byBhbiBpdGVtLlxuICAgKlxuICAgKiBAY2xhc3NcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtJdGVtfSBpdGVtXG4gICAqL1xuICBmdW5jdGlvbiBJdGVtRHJhZyhpdGVtKSB7XG5cbiAgICBpZiAoIUhhbW1lcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdbJyArIG5hbWVzcGFjZSArICddIHJlcXVpcmVkIGRlcGVuZGVuY3kgSGFtbWVyIGlzIG5vdCBkZWZpbmVkLicpO1xuICAgIH1cblxuICAgIHZhciBkcmFnID0gdGhpcztcbiAgICB2YXIgZWxlbWVudCA9IGl0ZW0uX2VsZW1lbnQ7XG4gICAgdmFyIGdyaWQgPSBpdGVtLmdldEdyaWQoKTtcbiAgICB2YXIgc2V0dGluZ3MgPSBncmlkLl9zZXR0aW5ncztcbiAgICB2YXIgaGFtbWVyO1xuXG4gICAgLy8gU3RhcnQgcHJlZGljYXRlLlxuICAgIHZhciBzdGFydFByZWRpY2F0ZSA9IHR5cGVvZiBzZXR0aW5ncy5kcmFnU3RhcnRQcmVkaWNhdGUgPT09IHR5cGVGdW5jdGlvbiA/XG4gICAgICBzZXR0aW5ncy5kcmFnU3RhcnRQcmVkaWNhdGUgOiBJdGVtRHJhZy5kZWZhdWx0U3RhcnRQcmVkaWNhdGU7XG4gICAgdmFyIHN0YXJ0UHJlZGljYXRlU3RhdGUgPSBzdGFydFByZWRpY2F0ZUluYWN0aXZlO1xuICAgIHZhciBzdGFydFByZWRpY2F0ZVJlc3VsdDtcblxuICAgIC8vIFByb3RlY3RlZCBkYXRhLlxuICAgIGRyYWcuX2l0ZW1JZCA9IGl0ZW0uX2lkO1xuICAgIGRyYWcuX2dyaWRJZCA9IGdyaWQuX2lkO1xuICAgIGRyYWcuX2hhbW1lciA9IGhhbW1lciA9IG5ldyBIYW1tZXIuTWFuYWdlcihlbGVtZW50KTtcbiAgICBkcmFnLl9pc0Rlc3Ryb3llZCA9IGZhbHNlO1xuICAgIGRyYWcuX2lzTWlncmF0aW5nID0gZmFsc2U7XG4gICAgZHJhZy5fZGF0YSA9IHt9O1xuXG4gICAgLy8gQ3JlYXRlIGEgcHJpdmF0ZSBkcmFnIHN0YXJ0IHJlc29sdmVyIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVzb2x2ZSB0aGUgZHJhZ1xuICAgIC8vIHN0YXJ0IHByZWRpY2F0ZSBhc3luY2hyb25vdXNseS5cbiAgICBkcmFnLl9yZXNvbHZlU3RhcnRQcmVkaWNhdGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmICghZHJhZy5faXNEZXN0cm95ZWQgJiYgc3RhcnRQcmVkaWNhdGVTdGF0ZSA9PT0gc3RhcnRQcmVkaWNhdGVQZW5kaW5nKSB7XG4gICAgICAgIHN0YXJ0UHJlZGljYXRlU3RhdGUgPSBzdGFydFByZWRpY2F0ZVJlc29sdmVkO1xuICAgICAgICBkcmFnLm9uU3RhcnQoZXZlbnQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBDcmVhdGUgc2Nyb2xsIGxpc3RlbmVyLlxuICAgIGRyYWcuX3Njcm9sbExpc3RlbmVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGRyYWcub25TY3JvbGwoZSk7XG4gICAgfTtcblxuICAgIC8vIENyZWF0ZSBvdmVybGFwIGNoZWNrZXIgZnVuY3Rpb24uXG4gICAgZHJhZy5fY2hlY2tTb3J0T3ZlcmxhcCA9IGRlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgIGRyYWcuX2RhdGEuaXNBY3RpdmUgJiYgZHJhZy5jaGVja092ZXJsYXAoKTtcbiAgICB9LCBzZXR0aW5ncy5kcmFnU29ydEludGVydmFsKTtcblxuICAgIC8vIENyZWF0ZSBzb3J0IHByZWRpY2F0ZS5cbiAgICBkcmFnLl9zb3J0UHJlZGljYXRlID0gdHlwZW9mIHNldHRpbmdzLmRyYWdTb3J0UHJlZGljYXRlID09PSB0eXBlRnVuY3Rpb24gP1xuICAgICAgc2V0dGluZ3MuZHJhZ1NvcnRQcmVkaWNhdGUgOiBJdGVtRHJhZy5kZWZhdWx0U29ydFByZWRpY2F0ZTtcblxuICAgIC8vIFNldHVwIGl0ZW0ncyBpbml0aWFsIGRyYWcgZGF0YS5cbiAgICBkcmFnLnJlc2V0KCk7XG5cbiAgICAvLyBBZGQgZHJhZyByZWNvZ25pemVyIHRvIGhhbW1lci5cbiAgICBoYW1tZXIuYWRkKG5ldyBIYW1tZXIuUGFuKHtcbiAgICAgIGV2ZW50OiAnZHJhZycsXG4gICAgICBwb2ludGVyczogMSxcbiAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgIGRpcmVjdGlvbjogSGFtbWVyLkRJUkVDVElPTl9BTExcbiAgICB9KSk7XG5cbiAgICAvLyBBZGQgZHJhZ2luaXQgcmVjb2duaXplciB0byBoYW1tZXIuXG4gICAgaGFtbWVyLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcbiAgICAgIGV2ZW50OiAnZHJhZ2luaXQnLFxuICAgICAgcG9pbnRlcnM6IDEsXG4gICAgICB0aHJlc2hvbGQ6IDEwMDAsXG4gICAgICB0aW1lOiAwXG4gICAgfSkpO1xuXG4gICAgLy8gQ29uZmlndXJlIHRoZSBoYW1tZXIgaW5zdGFuY2UuXG4gICAgaWYgKGlzUGxhaW5PYmplY3Qoc2V0dGluZ3MuZHJhZ0hhbW1lclNldHRpbmdzKSkge1xuICAgICAgaGFtbWVyLnNldChzZXR0aW5ncy5kcmFnSGFtbWVyU2V0dGluZ3MpO1xuICAgIH1cblxuICAgIC8vIEJpbmQgZHJhZyBldmVudHMuXG4gICAgaGFtbWVyXG4gICAgLm9uKCdkcmFnaW5pdCBkcmFnc3RhcnQgZHJhZ21vdmUnLCBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAvLyBMZXQncyBhY3RpdmF0ZSBkcmFnIHN0YXJ0IHByZWRpY2F0ZSBzdGF0ZS5cbiAgICAgIGlmIChzdGFydFByZWRpY2F0ZVN0YXRlID09PSBzdGFydFByZWRpY2F0ZUluYWN0aXZlKSB7XG4gICAgICAgIHN0YXJ0UHJlZGljYXRlU3RhdGUgPSBzdGFydFByZWRpY2F0ZVBlbmRpbmc7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHByZWRpY2F0ZSBpcyBwZW5kaW5nIHRyeSB0byByZXNvbHZlIGl0LlxuICAgICAgaWYgKHN0YXJ0UHJlZGljYXRlU3RhdGUgPT09IHN0YXJ0UHJlZGljYXRlUGVuZGluZykge1xuICAgICAgICBzdGFydFByZWRpY2F0ZVJlc3VsdCA9IHN0YXJ0UHJlZGljYXRlKGRyYWcuZ2V0SXRlbSgpLCBlKTtcbiAgICAgICAgaWYgKHN0YXJ0UHJlZGljYXRlUmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgICAgc3RhcnRQcmVkaWNhdGVTdGF0ZSA9IHN0YXJ0UHJlZGljYXRlUmVzb2x2ZWQ7XG4gICAgICAgICAgZHJhZy5vblN0YXJ0KGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0YXJ0UHJlZGljYXRlUmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgIHN0YXJ0UHJlZGljYXRlU3RhdGUgPSBzdGFydFByZWRpY2F0ZVJlamVjdGVkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE90aGVyd2lzZSBpZiBwcmVkaWNhdGUgaXMgcmVzb2x2ZWQgYW5kIGRyYWcgaXMgYWN0aXZlLCBtb3ZlIHRoZSBpdGVtLlxuICAgICAgZWxzZSBpZiAoc3RhcnRQcmVkaWNhdGVTdGF0ZSA9PT0gc3RhcnRQcmVkaWNhdGVSZXNvbHZlZCAmJiBkcmFnLl9kYXRhLmlzQWN0aXZlKSB7XG4gICAgICAgIGRyYWcub25Nb3ZlKGUpO1xuICAgICAgfVxuXG4gICAgfSlcbiAgICAub24oJ2RyYWdlbmQgZHJhZ2NhbmNlbCBkcmFnaW5pdHVwJywgZnVuY3Rpb24gKGUpIHtcblxuICAgICAgLy8gQ2hlY2sgaWYgdGhlIHN0YXJ0IHByZWRpY2F0ZSB3YXMgcmVzb2x2ZWQgZHVyaW5nIGRyYWcuXG4gICAgICB2YXIgaXNSZXNvbHZlZCA9IHN0YXJ0UHJlZGljYXRlU3RhdGUgPT09IHN0YXJ0UHJlZGljYXRlUmVzb2x2ZWQ7XG5cbiAgICAgIC8vIERvIGZpbmFsIHByZWRpY2F0ZSBjaGVjayB0byBhbGxvdyB1c2VyIHRvIHVuYmluZCBzdHVmZiBmb3IgdGhlIGN1cnJlbnRcbiAgICAgIC8vIGRyYWcgcHJvY2VkdXJlIHdpdGhpbiB0aGUgcHJlZGljYXRlIGNhbGxiYWNrLiBUaGUgcmV0dXJuIHZhbHVlIG9mIHRoaXNcbiAgICAgIC8vIGNoZWNrIHdpbGwgaGF2ZSBubyBlZmZlY3QgdG8gdGhlIHN0YXRlIG9mIHRoZSBwcmVkaWNhdGUuXG4gICAgICBzdGFydFByZWRpY2F0ZShkcmFnLmdldEl0ZW0oKSwgZSk7XG5cbiAgICAgIC8vIFJlc2V0IHN0YXJ0IHByZWRpY2F0ZSBzdGF0ZS5cbiAgICAgIHN0YXJ0UHJlZGljYXRlU3RhdGUgPSBzdGFydFByZWRpY2F0ZUluYWN0aXZlO1xuXG4gICAgICAvLyBJZiBwcmVkaWNhdGUgaXMgcmVzb2x2ZWQgYW5kIGRyYWdnaW5nIGlzIGFjdGl2ZSwgY2FsbCB0aGUgZW5kIGhhbmRsZXIuXG4gICAgICBpZiAoaXNSZXNvbHZlZCAmJiBkcmFnLl9kYXRhLmlzQWN0aXZlKSB7XG4gICAgICAgIGRyYWcub25FbmQoZSk7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIC8vIFByZXZlbnQgbmF0aXZlIGxpbmsvaW1hZ2UgZHJhZ2dpbmcgZm9yIHRoZSBpdGVtIGFuZCBpdCdzIGFuY2VzdG9ycy5cbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHByZXZlbnREZWZhdWx0LCBmYWxzZSk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVtRHJhZyAtIFB1YmxpYyBtZXRob2RzXG4gICAqICoqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICovXG5cbiAgLyoqXG4gICAqIERlZmF1bHQgZHJhZyBzdGFydCBwcmVkaWNhdGUgaGFuZGxlciB0aGF0IGhhbmRsZXMgYW5jaG9yIGVsZW1lbnRzXG4gICAqIGdyYWNlZnVsbHkuIFRoZSByZXR1cm4gdmFsdWUgb2YgdGhpcyBmdW5jdGlvbiBkZWZpbmVzIGlmIHRoZSBkcmFnIGlzXG4gICAqIHN0YXJ0ZWQsIHJlamVjdGVkIG9yIHBlbmRpbmcuIFdoZW4gdHJ1ZSBpcyByZXR1cm5lZCB0aGUgZHJhZ2dpbmcgaXMgc3RhcnRlZFxuICAgKiBhbmQgd2hlbiBmYWxzZSBpcyByZXR1cm5lZCB0aGUgZHJhZ2dpbmcgaXMgcmVqZWN0ZWQuIElmIG5vdGhpbmcgaXMgcmV0dXJuZWRcbiAgICogdGhlIHByZWRpY2F0ZSB3aWxsIGJlIGNhbGxlZCBhZ2FpbiBvbiB0aGUgbmV4dCBkcmFnIG1vdmVtZW50LlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtRHJhZ1xuICAgKiBAcGFyYW0ge0l0ZW19IGl0ZW1cbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICogICAtIEFuIG9wdGlvbmFsIG9wdGlvbnMgb2JqZWN0IHdoaWNoIGNhbiBiZSB1c2VkIHRvIHBhc3MgdGhlIHByZWRpY2F0ZVxuICAgKiAgICAgaXQncyBvcHRpb25zIG1hbnVhbGx5LiBCeSBkZWZhdWx0IHRoZSBwcmVkaWNhdGUgcmV0cmlldmVzIHRoZSBvcHRpb25zXG4gICAqICAgICBmcm9tIHRoZSBncmlkJ3Mgc2V0dGluZ3MuXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgSXRlbURyYWcuZGVmYXVsdFN0YXJ0UHJlZGljYXRlID0gZnVuY3Rpb24gKGl0ZW0sIGV2ZW50LCBvcHRpb25zKSB7XG5cbiAgICB2YXIgZWxlbWVudCA9IGl0ZW0uX2VsZW1lbnQ7XG4gICAgdmFyIHByZWRpY2F0ZSA9IGl0ZW0uX2RyYWcuX3N0YXJ0UHJlZGljYXRlRGF0YTtcbiAgICB2YXIgY29uZmlnO1xuICAgIHZhciBpc0FuY2hvcjtcbiAgICB2YXIgaHJlZjtcbiAgICB2YXIgdGFyZ2V0O1xuXG4gICAgLy8gU2V0dXAgZGF0YSBpZiBpdCBpcyBub3Qgc2V0IHVwIHlldC5cbiAgICBpZiAoIXByZWRpY2F0ZSkge1xuICAgICAgY29uZmlnID0gb3B0aW9ucyB8fCBpdGVtLl9kcmFnLmdldEdyaWQoKS5fc2V0dGluZ3MuZHJhZ1N0YXJ0UHJlZGljYXRlO1xuICAgICAgY29uZmlnID0gaXNQbGFpbk9iamVjdChjb25maWcpID8gY29uZmlnIDoge307XG4gICAgICBwcmVkaWNhdGUgPSBpdGVtLl9kcmFnLl9zdGFydFByZWRpY2F0ZURhdGEgPSB7XG4gICAgICAgIGRpc3RhbmNlOiBNYXRoLmFicyhjb25maWcuZGlzdGFuY2UpIHx8IDAsXG4gICAgICAgIGRlbGF5OiBNYXRoLm1heChjb25maWcuZGVsYXksIDApIHx8IDAsXG4gICAgICAgIGhhbmRsZTogdHlwZW9mIGNvbmZpZy5oYW5kbGUgPT09ICdzdHJpbmcnID8gY29uZmlnLmhhbmRsZSA6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIEZpbmFsIGV2ZW50IGxvZ2ljLiBBdCB0aGlzIHN0YWdlIHJldHVybiB2YWx1ZSBkb2VzIG5vdCBtYXR0ZXIgYW55bW9yZSxcbiAgICAvLyB0aGUgcHJlZGljYXRlIGlzIGVpdGhlciByZXNvbHZlZCBvciBpdCdzIG5vdCBhbmQgdGhlcmUncyBub3RoaW5nIHRvIGRvXG4gICAgLy8gYWJvdXQgaXQuIEhlcmUgd2UganVzdCByZXNldCBkYXRhIGFuZCBpZiB0aGUgaXRlbSBlbGVtZW50IGlzIGEgbGlua1xuICAgIC8vIHdlIGZvbGxvdyBpdCAoaWYgdGhlcmUgaGFzIG9ubHkgYmVlbiBzbGlnaHQgbW92ZW1lbnQpLlxuICAgIGlmIChldmVudC5pc0ZpbmFsKSB7XG4gICAgICBpc0FuY2hvciA9IGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYSc7XG4gICAgICBocmVmID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgIHRhcmdldCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0YXJnZXQnKTtcbiAgICAgIGRyYWdTdGFydFByZWRpY2F0ZVJlc2V0KGl0ZW0pO1xuICAgICAgaWYgKGlzQW5jaG9yICYmIGhyZWYgJiYgTWF0aC5hYnMoZXZlbnQuZGVsdGFYKSA8IDIgJiYgTWF0aC5hYnMoZXZlbnQuZGVsdGFZKSA8IDIgJiYgZXZlbnQuZGVsdGFUaW1lIDwgMjAwKSB7XG4gICAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0ICE9PSAnX3NlbGYnKSB7XG4gICAgICAgICAgZ2xvYmFsLm9wZW4oaHJlZiwgdGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBnbG9iYWwubG9jYXRpb24uaHJlZiA9IGhyZWY7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBGaW5kIGFuZCBzdG9yZSB0aGUgaGFuZGxlIGVsZW1lbnQgc28gd2UgY2FuIGNoZWNrIGxhdGVyIG9uIGlmIHRoZVxuICAgIC8vIGN1cnNvciBpcyB3aXRoaW4gdGhlIGhhbmRsZS4gSWYgd2UgaGF2ZSBhIGhhbmRsZSBzZWxlY3RvciBsZXQncyBmaW5kXG4gICAgLy8gdGhlIGNvcnJlc3BvbmRpbmcgZWxlbWVudC4gT3RoZXJ3aXNlIGxldCdzIHVzZSB0aGUgaXRlbSBlbGVtZW50IGFzIHRoZVxuICAgIC8vIGhhbmRsZS5cbiAgICBpZiAoIXByZWRpY2F0ZS5oYW5kbGVFbGVtZW50KSB7XG4gICAgICBpZiAocHJlZGljYXRlLmhhbmRsZSkge1xuICAgICAgICBwcmVkaWNhdGUuaGFuZGxlRWxlbWVudCA9IChldmVudC5jaGFuZ2VkUG9pbnRlcnNbMF0gfHwge30pLnRhcmdldDtcbiAgICAgICAgd2hpbGUgKHByZWRpY2F0ZS5oYW5kbGVFbGVtZW50ICYmICFlbGVtZW50TWF0Y2hlcyhwcmVkaWNhdGUuaGFuZGxlRWxlbWVudCwgcHJlZGljYXRlLmhhbmRsZSkpIHtcbiAgICAgICAgICBwcmVkaWNhdGUuaGFuZGxlRWxlbWVudCA9IHByZWRpY2F0ZS5oYW5kbGVFbGVtZW50ICE9PSBlbGVtZW50ID8gcHJlZGljYXRlLmhhbmRsZUVsZW1lbnQucGFyZW50RWxlbWVudCA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwcmVkaWNhdGUuaGFuZGxlRWxlbWVudCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHByZWRpY2F0ZS5oYW5kbGVFbGVtZW50ID0gZWxlbWVudDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiBkZWxheSBpcyBkZWZpbmVkIGxldCdzIGtlZXAgdHJhY2sgb2YgdGhlIGxhdGVzdCBldmVudCBhbmQgaW5pdGlhdGVcbiAgICAvLyBkZWxheSBpZiBpdCBoYXMgbm90IGJlZW4gZG9uZSB5ZXQuXG4gICAgaWYgKHByZWRpY2F0ZS5kZWxheSkge1xuICAgICAgcHJlZGljYXRlLmV2ZW50ID0gZXZlbnQ7XG4gICAgICBpZiAoIXByZWRpY2F0ZS5kZWxheVRpbWVyKSB7XG4gICAgICAgIHByZWRpY2F0ZS5kZWxheVRpbWVyID0gZ2xvYmFsLnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHByZWRpY2F0ZS5kZWxheSA9IDA7XG4gICAgICAgICAgaWYgKGRyYWdTdGFydFByZWRpY2F0ZVJlc29sdmUoaXRlbSwgcHJlZGljYXRlLmV2ZW50KSkge1xuICAgICAgICAgICAgaXRlbS5fZHJhZy5fcmVzb2x2ZVN0YXJ0UHJlZGljYXRlKHByZWRpY2F0ZS5ldmVudCk7XG4gICAgICAgICAgICBkcmFnU3RhcnRQcmVkaWNhdGVSZXNldChpdGVtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIHByZWRpY2F0ZS5kZWxheSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdTdGFydFByZWRpY2F0ZVJlc29sdmUoaXRlbSwgZXZlbnQpO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgZHJhZyBzb3J0IHByZWRpY2F0ZS5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbURyYWdcbiAgICogQHBhcmFtIHtJdGVtfSBpdGVtXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgKiBAcmV0dXJucyB7KEJvb2xlYW58RHJhZ1NvcnRDb21tYW5kKX1cbiAgICogICAtIFJldHVybnMgZmFsc2UgaWYgbm8gdmFsaWQgaW5kZXggd2FzIGZvdW5kLiBPdGhlcndpc2UgcmV0dXJucyBkcmFnIHNvcnRcbiAgICogICAgIGNvbW1hbmQuXG4gICAqL1xuICBJdGVtRHJhZy5kZWZhdWx0U29ydFByZWRpY2F0ZSA9IGZ1bmN0aW9uIChpdGVtKSB7XG5cbiAgICB2YXIgZHJhZyA9IGl0ZW0uX2RyYWc7XG4gICAgdmFyIGRyYWdEYXRhID0gZHJhZy5fZGF0YTtcbiAgICB2YXIgcm9vdEdyaWQgPSBkcmFnLmdldEdyaWQoKTtcbiAgICB2YXIgc2V0dGluZ3MgPSByb290R3JpZC5fc2V0dGluZ3M7XG4gICAgdmFyIGNvbmZpZyA9IHNldHRpbmdzLmRyYWdTb3J0UHJlZGljYXRlIHx8IHt9O1xuICAgIHZhciBzb3J0VGhyZXNob2xkID0gY29uZmlnLnRocmVzaG9sZCB8fCA1MDtcbiAgICB2YXIgc29ydEFjdGlvbiA9IGNvbmZpZy5hY3Rpb24gfHwgJ21vdmUnO1xuICAgIHZhciBpdGVtUmVjdCA9IHtcbiAgICAgIHdpZHRoOiBpdGVtLl93aWR0aCxcbiAgICAgIGhlaWdodDogaXRlbS5faGVpZ2h0LFxuICAgICAgbGVmdDogZHJhZ0RhdGEuZWxlbWVudENsaWVudFgsXG4gICAgICB0b3A6IGRyYWdEYXRhLmVsZW1lbnRDbGllbnRZXG4gICAgfTtcbiAgICB2YXIgZ3JpZCA9IGdldFRhcmdldEdyaWQoaXRlbSwgcm9vdEdyaWQsIGl0ZW1SZWN0LCBzb3J0VGhyZXNob2xkKTtcbiAgICB2YXIgZ3JpZE9mZnNldExlZnQgPSAwO1xuICAgIHZhciBncmlkT2Zmc2V0VG9wID0gMDtcbiAgICB2YXIgbWF0Y2hTY29yZSA9IC0xO1xuICAgIHZhciBtYXRjaEluZGV4O1xuICAgIHZhciBoYXNWYWxpZFRhcmdldHM7XG4gICAgdmFyIHRhcmdldDtcbiAgICB2YXIgc2NvcmU7XG4gICAgdmFyIGk7XG5cbiAgICAvLyBSZXR1cm4gZWFybHkgaWYgd2UgZm91bmQgbm8gZ3JpZCBjb250YWluZXIgZWxlbWVudCB0aGF0IG92ZXJsYXBzIHRoZVxuICAgIC8vIGRyYWdnZWQgaXRlbSBlbm91Z2guXG4gICAgaWYgKCFncmlkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gSWYgaXRlbSBpcyBtb3ZlZCB3aXRoaW4gaXQncyBvcmlnaW5hdGluZyBncmlkIGFkanVzdCBpdGVtJ3MgbGVmdCBhbmQgdG9wXG4gICAgLy8gcHJvcHMuIE90aGVyd2lzZSBpZiBpdGVtIGlzIG1vdmVkIHRvL3dpdGhpbiBhbm90aGVyIGdyaWQgZ2V0IHRoZVxuICAgIC8vIGNvbnRhaW5lciBlbGVtZW50J3Mgb2Zmc2V0IChmcm9tIHRoZSBlbGVtZW50J3MgY29udGVudCBlZGdlKS5cbiAgICBpZiAoZ3JpZCA9PT0gcm9vdEdyaWQpIHtcbiAgICAgIGl0ZW1SZWN0LmxlZnQgPSBkcmFnRGF0YS5ncmlkWCArIGl0ZW0uX21hcmdpbi5sZWZ0O1xuICAgICAgaXRlbVJlY3QudG9wID0gZHJhZ0RhdGEuZ3JpZFkgKyBpdGVtLl9tYXJnaW4udG9wO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGdyaWRPZmZzZXRMZWZ0ID0gZ3JpZC5fbGVmdCArIGdyaWQuX2JvcmRlci5sZWZ0O1xuICAgICAgZ3JpZE9mZnNldFRvcCA9IGdyaWQuX3RvcCArIGdyaWQuX2JvcmRlci50b3A7XG4gICAgfVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIHRoZSB0YXJnZXQgZ3JpZCBpdGVtcyBhbmQgdHJ5IHRvIGZpbmQgdGhlIGJlc3QgbWF0Y2guXG4gICAgZm9yIChpID0gMDsgaSA8IGdyaWQuX2l0ZW1zLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIHRhcmdldCA9IGdyaWQuX2l0ZW1zW2ldO1xuXG4gICAgICAvLyBJZiB0aGUgdGFyZ2V0IGl0ZW0gaXMgbm90IGFjdGl2ZSBvciB0aGUgdGFyZ2V0IGl0ZW0gaXMgdGhlIGRyYWdnZWQgaXRlbVxuICAgICAgLy8gbGV0J3Mgc2tpcCB0byB0aGUgbmV4dCBpdGVtLlxuICAgICAgaWYgKCF0YXJnZXQuX2lzQWN0aXZlIHx8IHRhcmdldCA9PT0gaXRlbSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gTWFyayB0aGUgZ3JpZCBhcyBoYXZpbmcgdmFsaWQgdGFyZ2V0IGl0ZW1zLlxuICAgICAgaGFzVmFsaWRUYXJnZXRzID0gdHJ1ZTtcblxuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSB0YXJnZXQncyBvdmVybGFwIHNjb3JlIHdpdGggdGhlIGRyYWdnZWQgaXRlbS5cbiAgICAgIHNjb3JlID0gZ2V0UmVjdE92ZXJsYXBTY29yZShpdGVtUmVjdCwge1xuICAgICAgICB3aWR0aDogdGFyZ2V0Ll93aWR0aCxcbiAgICAgICAgaGVpZ2h0OiB0YXJnZXQuX2hlaWdodCxcbiAgICAgICAgbGVmdDogdGFyZ2V0Ll9sZWZ0ICsgdGFyZ2V0Ll9tYXJnaW4ubGVmdCArIGdyaWRPZmZzZXRMZWZ0LFxuICAgICAgICB0b3A6IHRhcmdldC5fdG9wICsgdGFyZ2V0Ll9tYXJnaW4udG9wICsgZ3JpZE9mZnNldFRvcFxuICAgICAgfSk7XG5cbiAgICAgIC8vIFVwZGF0ZSBiZXN0IG1hdGNoIGluZGV4IGFuZCBzY29yZSBpZiB0aGUgdGFyZ2V0J3Mgb3ZlcmxhcCBzY29yZSB3aXRoXG4gICAgICAvLyB0aGUgZHJhZ2dlZCBpdGVtIGlzIGhpZ2hlciB0aGFuIHRoZSBjdXJyZW50IGJlc3QgbWF0Y2ggc2NvcmUuXG4gICAgICBpZiAoc2NvcmUgPiBtYXRjaFNjb3JlKSB7XG4gICAgICAgIG1hdGNoSW5kZXggPSBpO1xuICAgICAgICBtYXRjaFNjb3JlID0gc2NvcmU7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBubyB2YWxpZCBtYXRjaCBhbmQgdGhlIGl0ZW0gaXMgYmVpbmcgbW92ZWQgaW50byBhbm90aGVyIGdyaWQuXG4gICAgaWYgKG1hdGNoU2NvcmUgPCBzb3J0VGhyZXNob2xkICYmIGl0ZW0uZ2V0R3JpZCgpICE9PSBncmlkKSB7XG4gICAgICBtYXRjaEluZGV4ID0gaGFzVmFsaWRUYXJnZXRzID8gLTEgOiAwO1xuICAgICAgbWF0Y2hTY29yZSA9IEluZmluaXR5O1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIHRoZSBiZXN0IG1hdGNoIG92ZXJsYXBzIGVub3VnaCB0byBqdXN0aWZ5IGEgcGxhY2VtZW50IHN3aXRjaC5cbiAgICBpZiAobWF0Y2hTY29yZSA+PSBzb3J0VGhyZXNob2xkKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBncmlkOiBncmlkLFxuICAgICAgICBpbmRleDogbWF0Y2hJbmRleCxcbiAgICAgICAgYWN0aW9uOiBzb3J0QWN0aW9uXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBJdGVtRHJhZyAtIFB1YmxpYyBwcm90b3R5cGUgbWV0aG9kc1xuICAgKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKi9cblxuICAvKipcbiAgICogRGVzdHJveSBpbnN0YW5jZS5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbURyYWcucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHtJdGVtRHJhZ31cbiAgICovXG4gIEl0ZW1EcmFnLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGRyYWcgPSB0aGlzO1xuXG4gICAgaWYgKCFkcmFnLl9pc0Rlc3Ryb3llZCkge1xuICAgICAgZHJhZy5zdG9wKCk7XG4gICAgICBkcmFnLl9oYW1tZXIuZGVzdHJveSgpO1xuICAgICAgZHJhZy5nZXRJdGVtKCkuX2VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgcHJldmVudERlZmF1bHQsIGZhbHNlKTtcbiAgICAgIGRyYWcuX2lzRGVzdHJveWVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZztcblxuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgSXRlbSBpbnN0YW5jZS5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbURyYWcucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHs/SXRlbX1cbiAgICovXG4gIEl0ZW1EcmFnLnByb3RvdHlwZS5nZXRJdGVtID0gZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIGl0ZW1JbnN0YW5jZXNbdGhpcy5faXRlbUlkXSB8fCBudWxsO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBHcmlkIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtRHJhZy5wcm90b3R5cGVcbiAgICogQHJldHVybnMgez9HcmlkfVxuICAgKi9cbiAgSXRlbURyYWcucHJvdG90eXBlLmdldEdyaWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4gZ3JpZEluc3RhbmNlc1t0aGlzLl9ncmlkSWRdIHx8IG51bGw7XG5cbiAgfTtcblxuICAvKipcbiAgICogU2V0dXAvcmVzZXQgZHJhZyBkYXRhLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtRHJhZy5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0l0ZW1EcmFnfVxuICAgKi9cbiAgSXRlbURyYWcucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGRyYWcgPSB0aGlzO1xuICAgIHZhciBkcmFnRGF0YSA9IGRyYWcuX2RhdGE7XG5cbiAgICAvLyBJcyBpdGVtIGJlaW5nIGRyYWdnZWQ/XG4gICAgZHJhZ0RhdGEuaXNBY3RpdmUgPSBmYWxzZTtcblxuICAgIC8vIFRoZSBkcmFnZ2VkIGl0ZW0ncyBjb250YWluZXIgZWxlbWVudC5cbiAgICBkcmFnRGF0YS5jb250YWluZXIgPSBudWxsO1xuXG4gICAgLy8gVGhlIGRyYWdnZWQgaXRlbSdzIGNvbnRhaW5pbmcgYmxvY2suXG4gICAgZHJhZ0RhdGEuY29udGFpbmluZ0Jsb2NrID0gbnVsbDtcblxuICAgIC8vIEhhbW1lciBldmVudCBkYXRhLlxuICAgIGRyYWdEYXRhLnN0YXJ0RXZlbnQgPSBudWxsO1xuICAgIGRyYWdEYXRhLmN1cnJlbnRFdmVudCA9IG51bGw7XG5cbiAgICAvLyBBbGwgdGhlIGVsZW1lbnRzIHdoaWNoIG5lZWQgdG8gYmUgbGlzdGVuZWQgZm9yIHNjcm9sbCBldmVudHMgZHVyaW5nXG4gICAgLy8gZHJhZ2dpbmcuXG4gICAgZHJhZ0RhdGEuc2Nyb2xsZXJzID0gW107XG5cbiAgICAvLyBUaGUgY3VycmVudCB0cmFuc2xhdGVYL3RyYW5zbGF0ZVkgcG9zaXRpb24uXG4gICAgZHJhZ0RhdGEubGVmdCA9IDA7XG4gICAgZHJhZ0RhdGEudG9wID0gMDtcblxuICAgIC8vIERyYWdnZWQgZWxlbWVudCdzIGN1cnJlbnQgcG9zaXRpb24gd2l0aGluIHRoZSBncmlkLlxuICAgIGRyYWdEYXRhLmdyaWRYID0gMDtcbiAgICBkcmFnRGF0YS5ncmlkWSA9IDA7XG5cbiAgICAvLyBEcmFnZ2VkIGVsZW1lbnQncyBjdXJyZW50IG9mZnNldCBmcm9tIHdpbmRvdydzIG5vcnRod2VzdCBjb3JuZXIuIERvZXNcbiAgICAvLyBub3QgYWNjb3VudCBmb3IgZWxlbWVudCdzIG1hcmdpbnMuXG4gICAgZHJhZ0RhdGEuZWxlbWVudENsaWVudFggPSAwO1xuICAgIGRyYWdEYXRhLmVsZW1lbnRDbGllbnRZID0gMDtcblxuICAgIC8vIE9mZnNldCBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIGRyYWdnZWQgZWxlbWVudCdzIHRlbXBvcmFyeSBkcmFnXG4gICAgLy8gY29udGFpbmVyIGFuZCBpdCdzIG9yaWdpbmFsIGNvbnRhaW5lci5cbiAgICBkcmFnRGF0YS5jb250YWluZXJEaWZmWCA9IDA7XG4gICAgZHJhZ0RhdGEuY29udGFpbmVyRGlmZlkgPSAwO1xuXG4gICAgcmV0dXJuIGRyYWc7XG5cbiAgfTtcblxuICAvKipcbiAgICogQmluZCBkcmFnIHNjcm9sbCBoYW5kbGVycyB0byBhbGwgc2Nyb2xsYWJsZSBhbmNlc3RvciBlbGVtZW50cyBvZiB0aGVcbiAgICogZHJhZ2dlZCBlbGVtZW50IGFuZCB0aGUgZHJhZyBjb250YWluZXIgZWxlbWVudC5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbURyYWcucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHtJdGVtRHJhZ31cbiAgICovXG4gIEl0ZW1EcmFnLnByb3RvdHlwZS5iaW5kU2Nyb2xsTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGRyYWcgPSB0aGlzO1xuICAgIHZhciBncmlkQ29udGFpbmVyID0gZHJhZy5nZXRHcmlkKCkuX2VsZW1lbnQ7XG4gICAgdmFyIGRyYWdDb250YWluZXIgPSBkcmFnLl9kYXRhLmNvbnRhaW5lcjtcbiAgICB2YXIgc2Nyb2xsZXJzID0gZ2V0U2Nyb2xsUGFyZW50cyhkcmFnLmdldEl0ZW0oKS5fZWxlbWVudCk7XG4gICAgdmFyIGk7XG5cbiAgICAvLyBJZiBkcmFnIGNvbnRhaW5lciBpcyBkZWZpbmVkIGFuZCBpdCdzIG5vdCB0aGUgc2FtZSBlbGVtZW50IGFzIGdyaWRcbiAgICAvLyBjb250YWluZXIgdGhlbiB3ZSBuZWVkIHRvIGFkZCB0aGUgZ3JpZCBjb250YWluZXIgYW5kIGl0J3Mgc2Nyb2xsIHBhcmVudHNcbiAgICAvLyB0byB0aGUgZWxlbWVudHMgd2hpY2ggYXJlIGdvaW5nIHRvIGJlIGxpc3RlbmVyIGZvciBzY3JvbGwgZXZlbnRzLlxuICAgIGlmIChkcmFnQ29udGFpbmVyICE9PSBncmlkQ29udGFpbmVyKSB7XG4gICAgICBzY3JvbGxlcnMgPSBhcnJheVVuaXF1ZShzY3JvbGxlcnMuY29uY2F0KGdyaWRDb250YWluZXIpLmNvbmNhdChnZXRTY3JvbGxQYXJlbnRzKGdyaWRDb250YWluZXIpKSk7XG4gICAgfVxuXG4gICAgLy8gQmluZCBzY3JvbGwgbGlzdGVuZXJzLlxuICAgIGZvciAoaSA9IDA7IGkgPCBzY3JvbGxlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHNjcm9sbGVyc1tpXS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBkcmFnLl9zY3JvbGxMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gU2F2ZSBzY3JvbGxlcnMgdG8gZHJhZyBkYXRhLlxuICAgIGRyYWcuX2RhdGEuc2Nyb2xsZXJzID0gc2Nyb2xsZXJzO1xuXG4gICAgcmV0dXJuIGRyYWc7XG5cbiAgfTtcblxuICAvKipcbiAgICogVW5iaW5kIGN1cnJlbnRseSBib3VuZCBkcmFnIHNjcm9sbCBoYW5kbGVycyBmcm9tIGFsbCBzY3JvbGxhYmxlIGFuY2VzdG9yXG4gICAqIGVsZW1lbnRzIG9mIHRoZSBkcmFnZ2VkIGVsZW1lbnQgYW5kIHRoZSBkcmFnIGNvbnRhaW5lciBlbGVtZW50LlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtRHJhZy5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0l0ZW1EcmFnfVxuICAgKi9cbiAgSXRlbURyYWcucHJvdG90eXBlLnVuYmluZFNjcm9sbExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBkcmFnID0gdGhpcztcbiAgICB2YXIgZHJhZ0RhdGEgPSBkcmFnLl9kYXRhO1xuICAgIHZhciBzY3JvbGxlcnMgPSBkcmFnRGF0YS5zY3JvbGxlcnM7XG4gICAgdmFyIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc2Nyb2xsZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzY3JvbGxlcnNbaV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZHJhZy5fc2Nyb2xsTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIGRyYWdEYXRhLnNjcm9sbGVycyA9IFtdO1xuXG4gICAgcmV0dXJuIGRyYWc7XG5cbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgKGR1cmluZyBkcmFnKSBpZiBhbiBpdGVtIGlzIG92ZXJsYXBwaW5nIG90aGVyIGl0ZW1zIGFuZCBiYXNlZCBvblxuICAgKiB0aGUgY29uZmlndXJhdGlvbiBsYXlvdXQgdGhlIGl0ZW1zLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtRHJhZy5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0l0ZW1EcmFnfVxuICAgKi9cbiAgSXRlbURyYWcucHJvdG90eXBlLmNoZWNrT3ZlcmxhcCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBkcmFnID0gdGhpcztcbiAgICB2YXIgaXRlbSA9IGRyYWcuZ2V0SXRlbSgpO1xuICAgIHZhciByZXN1bHQgPSBkcmFnLl9zb3J0UHJlZGljYXRlKGl0ZW0sIGRyYWcuX2RhdGEuY3VycmVudEV2ZW50KTtcbiAgICB2YXIgY3VycmVudEdyaWQ7XG4gICAgdmFyIGN1cnJlbnRJbmRleDtcbiAgICB2YXIgdGFyZ2V0R3JpZDtcbiAgICB2YXIgdGFyZ2V0SW5kZXg7XG4gICAgdmFyIHNvcnRBY3Rpb247XG4gICAgdmFyIGlzTWlncmF0aW9uO1xuXG4gICAgLy8gTGV0J3MgbWFrZSBzdXJlIHRoZSByZXN1bHQgb2JqZWN0IGhhcyBhIHZhbGlkIGluZGV4IGJlZm9yZSBnb2luZyBmdXJ0aGVyLlxuICAgIGlmICghaXNQbGFpbk9iamVjdChyZXN1bHQpIHx8IHR5cGVvZiByZXN1bHQuaW5kZXggIT09IHR5cGVOdW1iZXIpIHtcbiAgICAgIHJldHVybiBkcmFnO1xuICAgIH1cblxuICAgIGN1cnJlbnRHcmlkID0gaXRlbS5nZXRHcmlkKCk7XG4gICAgdGFyZ2V0R3JpZCA9IHJlc3VsdC5ncmlkIHx8IGN1cnJlbnRHcmlkO1xuICAgIGlzTWlncmF0aW9uID0gY3VycmVudEdyaWQgIT09IHRhcmdldEdyaWQ7XG4gICAgY3VycmVudEluZGV4ID0gY3VycmVudEdyaWQuX2l0ZW1zLmluZGV4T2YoaXRlbSk7XG4gICAgdGFyZ2V0SW5kZXggPSBub3JtYWxpemVBcnJheUluZGV4KHRhcmdldEdyaWQuX2l0ZW1zLCByZXN1bHQuaW5kZXgsIGlzTWlncmF0aW9uKTtcbiAgICBzb3J0QWN0aW9uID0gcmVzdWx0LmFjdGlvbiA9PT0gJ3N3YXAnID8gJ3N3YXAnIDogJ21vdmUnO1xuXG4gICAgLy8gSWYgdGhlIGl0ZW0gd2FzIG1vdmVkIHdpdGhpbiBpdCdzIGN1cnJlbnQgZ3JpZC5cbiAgICBpZiAoIWlzTWlncmF0aW9uKSB7XG5cbiAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgdGFyZ2V0IGluZGV4IGlzIG5vdCB0aGUgY3VycmVudCBpbmRleC5cbiAgICAgIGlmIChjdXJyZW50SW5kZXggIT09IHRhcmdldEluZGV4KSB7XG5cbiAgICAgICAgLy8gRG8gdGhlIHNvcnQuXG4gICAgICAgIChzb3J0QWN0aW9uID09PSAnc3dhcCcgPyBhcnJheVN3YXAgOiBhcnJheU1vdmUpKGN1cnJlbnRHcmlkLl9pdGVtcywgY3VycmVudEluZGV4LCB0YXJnZXRJbmRleCk7XG5cbiAgICAgICAgLy8gRW1pdCBtb3ZlIGV2ZW50LlxuICAgICAgICBjdXJyZW50R3JpZC5fZW1pdChldk1vdmUsIHtcbiAgICAgICAgICBpdGVtOiBpdGVtLFxuICAgICAgICAgIGZyb21JbmRleDogY3VycmVudEluZGV4LFxuICAgICAgICAgIHRvSW5kZXg6IHRhcmdldEluZGV4LFxuICAgICAgICAgIGFjdGlvbjogc29ydEFjdGlvblxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBMYXlvdXQgdGhlIGdyaWQuXG4gICAgICAgIGN1cnJlbnRHcmlkLmxheW91dCgpO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgaXRlbSB3YXMgbW92ZWQgdG8gYW5vdGhlciBncmlkLlxuICAgIGVsc2Uge1xuXG4gICAgICAvLyBFbWl0IGJlZm9yZVNlbmQgZXZlbnQuXG4gICAgICBjdXJyZW50R3JpZC5fZW1pdChldkJlZm9yZVNlbmQsIHtcbiAgICAgICAgaXRlbTogaXRlbSxcbiAgICAgICAgZnJvbUdyaWQ6IGN1cnJlbnRHcmlkLFxuICAgICAgICBmcm9tSW5kZXg6IGN1cnJlbnRJbmRleCxcbiAgICAgICAgdG9HcmlkOiB0YXJnZXRHcmlkLFxuICAgICAgICB0b0luZGV4OiB0YXJnZXRJbmRleFxuICAgICAgfSk7XG5cbiAgICAgIC8vIEVtaXQgYmVmb3JlUmVjZWl2ZSBldmVudC5cbiAgICAgIHRhcmdldEdyaWQuX2VtaXQoZXZCZWZvcmVSZWNlaXZlLCB7XG4gICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgIGZyb21HcmlkOiBjdXJyZW50R3JpZCxcbiAgICAgICAgZnJvbUluZGV4OiBjdXJyZW50SW5kZXgsXG4gICAgICAgIHRvR3JpZDogdGFyZ2V0R3JpZCxcbiAgICAgICAgdG9JbmRleDogdGFyZ2V0SW5kZXhcbiAgICAgIH0pO1xuXG4gICAgICAvLyBVcGRhdGUgaXRlbSdzIGdyaWQgaWQgcmVmZXJlbmNlLlxuICAgICAgaXRlbS5fZ3JpZElkID0gdGFyZ2V0R3JpZC5faWQ7XG5cbiAgICAgIC8vIFVwZGF0ZSBkcmFnIGluc3RhbmNlcydzIG1pZ3JhdGluZyBpbmRpY2F0b3IuXG4gICAgICBkcmFnLl9pc01pZ3JhdGluZyA9IGl0ZW0uX2dyaWRJZCAhPT0gZHJhZy5fZ3JpZElkO1xuXG4gICAgICAvLyBNb3ZlIGl0ZW0gaW5zdGFuY2UgZnJvbSBjdXJyZW50IGdyaWQgdG8gdGFyZ2V0IGdyaWQuXG4gICAgICBjdXJyZW50R3JpZC5faXRlbXMuc3BsaWNlKGN1cnJlbnRJbmRleCwgMSk7XG4gICAgICBpbnNlcnRJdGVtc1RvQXJyYXkodGFyZ2V0R3JpZC5faXRlbXMsIGl0ZW0sIHRhcmdldEluZGV4KTtcblxuICAgICAgLy8gU2V0IHNvcnQgZGF0YSBhcyBudWxsLCB3aGljaCBpcyBhbiBpbmRpY2F0b3IgZm9yIHRoZSBpdGVtIGNvbXBhcmlzb25cbiAgICAgIC8vIGZ1bmN0aW9uIHRoYXQgdGhlIHNvcnQgZGF0YSBvZiB0aGlzIHNwZWNpZmljIGl0ZW0gc2hvdWxkIGJlIGZldGNoZWRcbiAgICAgIC8vIGxhemlseS5cbiAgICAgIGl0ZW0uX3NvcnREYXRhID0gbnVsbDtcblxuICAgICAgLy8gRW1pdCBzZW5kIGV2ZW50LlxuICAgICAgY3VycmVudEdyaWQuX2VtaXQoZXZTZW5kLCB7XG4gICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgIGZyb21HcmlkOiBjdXJyZW50R3JpZCxcbiAgICAgICAgZnJvbUluZGV4OiBjdXJyZW50SW5kZXgsXG4gICAgICAgIHRvR3JpZDogdGFyZ2V0R3JpZCxcbiAgICAgICAgdG9JbmRleDogdGFyZ2V0SW5kZXhcbiAgICAgIH0pO1xuXG4gICAgICAvLyBFbWl0IHJlY2VpdmUgZXZlbnQuXG4gICAgICB0YXJnZXRHcmlkLl9lbWl0KGV2UmVjZWl2ZSwge1xuICAgICAgICBpdGVtOiBpdGVtLFxuICAgICAgICBmcm9tR3JpZDogY3VycmVudEdyaWQsXG4gICAgICAgIGZyb21JbmRleDogY3VycmVudEluZGV4LFxuICAgICAgICB0b0dyaWQ6IHRhcmdldEdyaWQsXG4gICAgICAgIHRvSW5kZXg6IHRhcmdldEluZGV4XG4gICAgICB9KTtcblxuICAgICAgLy8gTGF5b3V0IGJvdGggZ3JpZHMuXG4gICAgICBjdXJyZW50R3JpZC5sYXlvdXQoKTtcbiAgICAgIHRhcmdldEdyaWQubGF5b3V0KCk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZztcblxuICB9O1xuXG4gIC8qKlxuICAgKiBJZiBpdGVtIGlzIGRyYWdnZWQgaW50byBhbm90aGVyIGdyaWQsIGZpbmlzaCB0aGUgbWlncmF0aW9uIHByb2Nlc3NcbiAgICogZ3JhY2VmdWxseS5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbURyYWcucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHtJdGVtRHJhZ31cbiAgICovXG4gIEl0ZW1EcmFnLnByb3RvdHlwZS5maW5pc2hNaWdyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgZHJhZyA9IHRoaXM7XG4gICAgdmFyIGl0ZW0gPSBkcmFnLmdldEl0ZW0oKTtcbiAgICB2YXIgcmVsZWFzZSA9IGl0ZW0uX3JlbGVhc2U7XG4gICAgdmFyIGVsZW1lbnQgPSBpdGVtLl9lbGVtZW50O1xuICAgIHZhciB0YXJnZXRHcmlkID0gaXRlbS5nZXRHcmlkKCk7XG4gICAgdmFyIHRhcmdldEdyaWRFbGVtZW50ID0gdGFyZ2V0R3JpZC5fZWxlbWVudDtcbiAgICB2YXIgdGFyZ2V0U2V0dGluZ3MgPSB0YXJnZXRHcmlkLl9zZXR0aW5ncztcbiAgICB2YXIgdGFyZ2V0Q29udGFpbmVyID0gdGFyZ2V0U2V0dGluZ3MuZHJhZ0NvbnRhaW5lciB8fCB0YXJnZXRHcmlkRWxlbWVudDtcbiAgICB2YXIgY3VycmVudFNldHRpbmdzID0gZHJhZy5nZXRHcmlkKCkuX3NldHRpbmdzO1xuICAgIHZhciBjdXJyZW50Q29udGFpbmVyID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgIHZhciB0cmFuc2xhdGVYO1xuICAgIHZhciB0cmFuc2xhdGVZO1xuICAgIHZhciBvZmZzZXREaWZmO1xuXG4gICAgLy8gRGVzdHJveSBjdXJyZW50IGRyYWcuIE5vdGUgdGhhdCB3ZSBuZWVkIHRvIHNldCB0aGUgbWlncmF0aW5nIGZsYWcgdG9cbiAgICAvLyBmYWxzZSBmaXJzdCwgYmVjYXVzZSBvdGhlcndpc2Ugd2UgY3JlYXRlIGFuIGluZmluaXRlIGxvb3AgYmV0d2VlbiB0aGlzXG4gICAgLy8gYW5kIHRoZSBkcmFnLnN0b3AoKSBtZXRob2QuXG4gICAgZHJhZy5faXNNaWdyYXRpbmcgPSBmYWxzZTtcbiAgICBkcmFnLmRlc3Ryb3koKTtcblxuICAgIC8vIERlc3Ryb3kgY3VycmVudCBhbmltYXRpb24gaGFuZGxlcnMuXG4gICAgaXRlbS5fYW5pbWF0ZS5kZXN0cm95KCk7XG4gICAgaXRlbS5fYW5pbWF0ZUNoaWxkLmRlc3Ryb3koKTtcblxuICAgIC8vIFJlbW92ZSBjdXJyZW50IGNsYXNzbmFtZXMuXG4gICAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY3VycmVudFNldHRpbmdzLml0ZW1DbGFzcyk7XG4gICAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY3VycmVudFNldHRpbmdzLml0ZW1WaXNpYmxlQ2xhc3MpO1xuICAgIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGN1cnJlbnRTZXR0aW5ncy5pdGVtSGlkZGVuQ2xhc3MpO1xuXG4gICAgLy8gQWRkIG5ldyBjbGFzc25hbWVzLlxuICAgIGFkZENsYXNzKGVsZW1lbnQsIHRhcmdldFNldHRpbmdzLml0ZW1DbGFzcyk7XG4gICAgYWRkQ2xhc3MoZWxlbWVudCwgdGFyZ2V0U2V0dGluZ3MuaXRlbVZpc2libGVDbGFzcyk7XG5cbiAgICAvLyBJbnN0YW50aWF0ZSBuZXcgYW5pbWF0aW9uIGNvbnRyb2xsZXJzLlxuICAgIGl0ZW0uX2FuaW1hdGUgPSBuZXcgR3JpZC5JdGVtQW5pbWF0ZShpdGVtLCBlbGVtZW50KTtcbiAgICBpdGVtLl9hbmltYXRlQ2hpbGQgPSBuZXcgR3JpZC5JdGVtQW5pbWF0ZShpdGVtLCBpdGVtLl9jaGlsZCk7XG5cbiAgICAvLyBNb3ZlIHRoZSBpdGVtIGluc2lkZSB0aGUgdGFyZ2V0IGNvbnRhaW5lciBpZiBpdCdzIGRpZmZlcmVudCB0aGFuIHRoZVxuICAgIC8vIGN1cnJlbnQgY29udGFpbmVyLlxuICAgIGlmICh0YXJnZXRDb250YWluZXIgIT09IGN1cnJlbnRDb250YWluZXIpIHtcbiAgICAgIHRhcmdldENvbnRhaW5lci5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgIG9mZnNldERpZmYgPSBnZXRPZmZzZXREaWZmKGN1cnJlbnRDb250YWluZXIsIHRhcmdldENvbnRhaW5lciwgdHJ1ZSk7XG4gICAgICB0cmFuc2xhdGVYID0gZ2V0VHJhbnNsYXRlQXNGbG9hdChlbGVtZW50LCAneCcpIC0gb2Zmc2V0RGlmZi5sZWZ0O1xuICAgICAgdHJhbnNsYXRlWSA9IGdldFRyYW5zbGF0ZUFzRmxvYXQoZWxlbWVudCwgJ3knKSAtIG9mZnNldERpZmYudG9wO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSBpdGVtJ3MgY2FjaGVkIGRpbWVuc2lvbnMgYW5kIHNvcnQgZGF0YS5cbiAgICBpdGVtLl9yZWZyZXNoRGltZW5zaW9ucygpLl9yZWZyZXNoU29ydERhdGEoKTtcblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgb2Zmc2V0IGRpZmZlcmVuY2UgYmV0d2VlbiB0YXJnZXQncyBkcmFnIGNvbnRhaW5lciAoaWYgYW55KVxuICAgIC8vIGFuZCBhY3R1YWwgZ3JpZCBjb250YWluZXIgZWxlbWVudC4gV2Ugc2F2ZSBpdCBsYXRlciBmb3IgdGhlIHJlbGVhc2VcbiAgICAvLyBwcm9jZXNzLlxuICAgIG9mZnNldERpZmYgPSBnZXRPZmZzZXREaWZmKHRhcmdldENvbnRhaW5lciwgdGFyZ2V0R3JpZEVsZW1lbnQsIHRydWUpO1xuICAgIHJlbGVhc2UuY29udGFpbmVyRGlmZlggPSBvZmZzZXREaWZmLmxlZnQ7XG4gICAgcmVsZWFzZS5jb250YWluZXJEaWZmWSA9IG9mZnNldERpZmYudG9wO1xuXG4gICAgLy8gUmVjcmVhdGUgaXRlbSdzIGRyYWcgaGFuZGxlci5cbiAgICBpdGVtLl9kcmFnID0gdGFyZ2V0U2V0dGluZ3MuZHJhZ0VuYWJsZWQgPyBuZXcgR3JpZC5JdGVtRHJhZyhpdGVtKSA6IG51bGw7XG5cbiAgICAvLyBBZGp1c3QgdGhlIHBvc2l0aW9uIG9mIHRoZSBpdGVtIGVsZW1lbnQgaWYgaXQgd2FzIG1vdmVkIGZyb20gYSBjb250YWluZXJcbiAgICAvLyB0byBhbm90aGVyLlxuICAgIGlmICh0YXJnZXRDb250YWluZXIgIT09IGN1cnJlbnRDb250YWluZXIpIHtcbiAgICAgIHNldFN0eWxlcyhlbGVtZW50LCB7dHJhbnNmb3JtOiBnZXRUcmFuc2xhdGVTdHJpbmcodHJhbnNsYXRlWCwgdHJhbnNsYXRlWSl9KTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgY2hpbGQgZWxlbWVudCdzIHN0eWxlcyB0byByZWZsZWN0IHRoZSBjdXJyZW50IHZpc2liaWxpdHkgc3RhdGUuXG4gICAgaXRlbS5fY2hpbGQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIHRhcmdldEdyaWQuX2l0ZW1TaG93SGFuZGxlci5zdGFydChpdGVtLCB0cnVlKTtcblxuICAgIC8vIFN0YXJ0IHRoZSByZWxlYXNlLlxuICAgIHJlbGVhc2Uuc3RhcnQoKTtcblxuICAgIHJldHVybiBkcmFnO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIGNhbmNlbCBtb3ZlL3Njcm9sbCBldmVudCByYWYgbG9vcCBhY3Rpb24uXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW1EcmFnLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7SXRlbURyYWd9XG4gICAqL1xuICBJdGVtRHJhZy5wcm90b3R5cGUuY2FuY2VsUmFmTG9vcCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBpZCA9IHRoaXMuZ2V0SXRlbSgpLl9pZDtcblxuICAgIHJhZkxvb3AuY2FuY2VsKHJhZlF1ZXVlU2Nyb2xsLCBpZCk7XG4gICAgcmFmTG9vcC5jYW5jZWwocmFmUXVldWVNb3ZlLCBpZCk7XG5cbiAgICByZXR1cm4gdGhpcztcblxuICB9O1xuXG4gIC8qKlxuICAgKiBBYm9ydCBkcmFnZ2luZyBhbmQgcmVzZXQgZHJhZyBkYXRhLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtRHJhZy5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0l0ZW1EcmFnfVxuICAgKi9cbiAgSXRlbURyYWcucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgZHJhZyA9IHRoaXM7XG4gICAgdmFyIGRyYWdEYXRhID0gZHJhZy5fZGF0YTtcbiAgICB2YXIgaXRlbSA9IGRyYWcuZ2V0SXRlbSgpO1xuICAgIHZhciBlbGVtZW50ID0gaXRlbS5fZWxlbWVudDtcbiAgICB2YXIgZ3JpZCA9IGRyYWcuZ2V0R3JpZCgpO1xuXG4gICAgaWYgKCFkcmFnRGF0YS5pc0FjdGl2ZSkge1xuICAgICAgcmV0dXJuIGRyYWc7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGl0ZW0gaXMgYmVpbmcgZHJvcHBlZCBpbnRvIGFub3RoZXIgZ3JpZCwgZmluaXNoIGl0IHVwIGFuZCByZXR1cm5cbiAgICAvLyBpbW1lZGlhdGVseS5cbiAgICBpZiAoZHJhZy5faXNNaWdyYXRpbmcpIHtcbiAgICAgIHJldHVybiBkcmFnLmZpbmlzaE1pZ3JhdGlvbihkcmFnRGF0YS5jdXJyZW50RXZlbnQpO1xuICAgIH1cblxuICAgIC8vIENhbmNlbCByYWYgbG9vcCBhY3Rpb25zLlxuICAgIGRyYWcuY2FuY2VsUmFmTG9vcCgpO1xuXG4gICAgLy8gUmVtb3ZlIHNjcm9sbCBsaXN0ZW5lcnMuXG4gICAgZHJhZy51bmJpbmRTY3JvbGxMaXN0ZW5lcnMoKTtcblxuICAgIC8vIENhbmNlbCBvdmVybGFwIGNoZWNrLlxuICAgIGRyYWcuX2NoZWNrU29ydE92ZXJsYXAoJ2NhbmNlbCcpO1xuXG4gICAgLy8gQXBwZW5kIGl0ZW0gZWxlbWVudCB0byB0aGUgY29udGFpbmVyIGlmIGl0J3Mgbm90IGl0J3MgY2hpbGQuIEFsc28gbWFrZVxuICAgIC8vIHN1cmUgdGhlIHRyYW5zbGF0ZSB2YWx1ZXMgYXJlIGFkanVzdGVkIHRvIGFjY291bnQgZm9yIHRoZSBET00gc2hpZnQuXG4gICAgaWYgKGVsZW1lbnQucGFyZW50Tm9kZSAhPT0gZ3JpZC5fZWxlbWVudCkge1xuICAgICAgZ3JpZC5fZWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgIHNldFN0eWxlcyhlbGVtZW50LCB7dHJhbnNmb3JtOiBnZXRUcmFuc2xhdGVTdHJpbmcoZHJhZ0RhdGEuZ3JpZFgsIGRyYWdEYXRhLmdyaWRZKX0pO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZSBkcmFnZ2luZyBjbGFzcy5cbiAgICByZW1vdmVDbGFzcyhlbGVtZW50LCBncmlkLl9zZXR0aW5ncy5pdGVtRHJhZ2dpbmdDbGFzcyk7XG5cbiAgICAvLyBSZXNldCBkcmFnIGRhdGEuXG4gICAgZHJhZy5yZXNldCgpO1xuXG4gICAgcmV0dXJuIGRyYWc7XG5cbiAgfTtcblxuICAvKipcbiAgICogRHJhZyBzdGFydCBoYW5kbGVyLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtRHJhZy5wcm90b3R5cGVcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAqIEByZXR1cm5zIHtJdGVtRHJhZ31cbiAgICovXG4gIEl0ZW1EcmFnLnByb3RvdHlwZS5vblN0YXJ0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cbiAgICB2YXIgZHJhZyA9IHRoaXM7XG4gICAgdmFyIGl0ZW0gPSBkcmFnLmdldEl0ZW0oKTtcblxuICAgIC8vIElmIGl0ZW0gaXMgbm90IGFjdGl2ZSwgZG9uJ3Qgc3RhcnQgdGhlIGRyYWcuXG4gICAgaWYgKCFpdGVtLl9pc0FjdGl2ZSkge1xuICAgICAgcmV0dXJuIGRyYWc7XG4gICAgfVxuXG4gICAgdmFyIGVsZW1lbnQgPSBpdGVtLl9lbGVtZW50O1xuICAgIHZhciBncmlkID0gZHJhZy5nZXRHcmlkKCk7XG4gICAgdmFyIHNldHRpbmdzID0gZ3JpZC5fc2V0dGluZ3M7XG4gICAgdmFyIGRyYWdEYXRhID0gZHJhZy5fZGF0YTtcbiAgICB2YXIgcmVsZWFzZSA9IGl0ZW0uX3JlbGVhc2U7XG4gICAgdmFyIG1pZ3JhdGUgPSBpdGVtLl9taWdyYXRlO1xuICAgIHZhciBncmlkQ29udGFpbmVyID0gZ3JpZC5fZWxlbWVudDtcbiAgICB2YXIgZHJhZ0NvbnRhaW5lciA9IHNldHRpbmdzLmRyYWdDb250YWluZXIgfHwgZ3JpZENvbnRhaW5lcjtcbiAgICB2YXIgY29udGFpbmluZ0Jsb2NrID0gZ2V0Q29udGFpbmluZ0Jsb2NrKGRyYWdDb250YWluZXIsIHRydWUpO1xuICAgIHZhciBvZmZzZXREaWZmID0gZHJhZ0NvbnRhaW5lciAhPT0gZ3JpZENvbnRhaW5lciA/IGdldE9mZnNldERpZmYoY29udGFpbmluZ0Jsb2NrLCBncmlkQ29udGFpbmVyKSA6IDA7XG4gICAgdmFyIGN1cnJlbnRMZWZ0ID0gZ2V0VHJhbnNsYXRlQXNGbG9hdChlbGVtZW50LCAneCcpO1xuICAgIHZhciBjdXJyZW50VG9wID0gZ2V0VHJhbnNsYXRlQXNGbG9hdChlbGVtZW50LCAneScpO1xuICAgIHZhciBlbGVtZW50UmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAvLyBTdG9wIGN1cnJlbnQgcG9zaXRpb25pbmcgYW5pbWF0aW9uLlxuICAgIGlmIChpdGVtLmlzUG9zaXRpb25pbmcoKSkge1xuICAgICAgaXRlbS5fc3RvcExheW91dCh0cnVlLCB7dHJhbnNmb3JtOiBnZXRUcmFuc2xhdGVTdHJpbmcoY3VycmVudExlZnQsIGN1cnJlbnRUb3ApfSk7XG4gICAgfVxuXG4gICAgLy8gU3RvcCBjdXJyZW50IG1pZ3JhdGlvbiBhbmltYXRpb24uXG4gICAgaWYgKG1pZ3JhdGUuaXNBY3RpdmUpIHtcbiAgICAgIGN1cnJlbnRMZWZ0IC09IG1pZ3JhdGUuY29udGFpbmVyRGlmZlg7XG4gICAgICBjdXJyZW50VG9wIC09IG1pZ3JhdGUuY29udGFpbmVyRGlmZlk7XG4gICAgICBtaWdyYXRlLnN0b3AodHJ1ZSwge3RyYW5zZm9ybTogZ2V0VHJhbnNsYXRlU3RyaW5nKGN1cnJlbnRMZWZ0LCBjdXJyZW50VG9wKX0pO1xuICAgIH1cblxuICAgIC8vIElmIGl0ZW0gaXMgYmVpbmcgcmVsZWFzZWQgcmVzZXQgcmVsZWFzZSBkYXRhLlxuICAgIGlmIChpdGVtLmlzUmVsZWFzaW5nKCkpIHtcbiAgICAgIHJlbGVhc2UucmVzZXQoKTtcbiAgICB9XG5cbiAgICAvLyBTZXR1cCBkcmFnIGRhdGEuXG4gICAgZHJhZ0RhdGEuaXNBY3RpdmUgPSB0cnVlO1xuICAgIGRyYWdEYXRhLnN0YXJ0RXZlbnQgPSBkcmFnRGF0YS5jdXJyZW50RXZlbnQgPSBldmVudDtcbiAgICBkcmFnRGF0YS5jb250YWluZXIgPSBkcmFnQ29udGFpbmVyO1xuICAgIGRyYWdEYXRhLmNvbnRhaW5pbmdCbG9jayA9IGNvbnRhaW5pbmdCbG9jaztcbiAgICBkcmFnRGF0YS5lbGVtZW50Q2xpZW50WCA9IGVsZW1lbnRSZWN0LmxlZnQ7XG4gICAgZHJhZ0RhdGEuZWxlbWVudENsaWVudFkgPSBlbGVtZW50UmVjdC50b3A7XG4gICAgZHJhZ0RhdGEubGVmdCA9IGRyYWdEYXRhLmdyaWRYID0gY3VycmVudExlZnQ7XG4gICAgZHJhZ0RhdGEudG9wID0gZHJhZ0RhdGEuZ3JpZFkgPSBjdXJyZW50VG9wO1xuXG4gICAgLy8gRW1pdCBkcmFnSW5pdCBldmVudC5cbiAgICBncmlkLl9lbWl0KGV2RHJhZ0luaXQsIGl0ZW0sIGV2ZW50KTtcblxuICAgIC8vIElmIGEgc3BlY2lmaWMgZHJhZyBjb250YWluZXIgaXMgc2V0IGFuZCBpdCBpcyBkaWZmZXJlbnQgZnJvbSB0aGVcbiAgICAvLyBncmlkJ3MgY29udGFpbmVyIGVsZW1lbnQgd2UgbmVlZCB0byBjYXN0IHNvbWUgZXh0cmEgc3BlbGxzLlxuICAgIGlmIChkcmFnQ29udGFpbmVyICE9PSBncmlkQ29udGFpbmVyKSB7XG5cbiAgICAgIC8vIFN0b3JlIHRoZSBjb250YWluZXIgb2Zmc2V0IGRpZmZzIHRvIGRyYWcgZGF0YS5cbiAgICAgIGRyYWdEYXRhLmNvbnRhaW5lckRpZmZYID0gb2Zmc2V0RGlmZi5sZWZ0O1xuICAgICAgZHJhZ0RhdGEuY29udGFpbmVyRGlmZlkgPSBvZmZzZXREaWZmLnRvcDtcblxuICAgICAgLy8gSWYgdGhlIGRyYWdnZWQgZWxlbWVudCBpcyBhIGNoaWxkIG9mIHRoZSBkcmFnIGNvbnRhaW5lciBhbGwgd2UgbmVlZCB0b1xuICAgICAgLy8gZG8gaXMgc2V0dXAgdGhlIHJlbGF0aXZlIGRyYWcgcG9zaXRpb24gZGF0YS5cbiAgICAgIGlmIChlbGVtZW50LnBhcmVudE5vZGUgPT09IGRyYWdDb250YWluZXIpIHtcbiAgICAgICAgZHJhZ0RhdGEuZ3JpZFggPSBjdXJyZW50TGVmdCAtIGRyYWdEYXRhLmNvbnRhaW5lckRpZmZYO1xuICAgICAgICBkcmFnRGF0YS5ncmlkWSA9IGN1cnJlbnRUb3AgLSBkcmFnRGF0YS5jb250YWluZXJEaWZmWTtcbiAgICAgIH1cblxuICAgICAgLy8gT3RoZXJ3aXNlIHdlIG5lZWQgdG8gYXBwZW5kIHRoZSBlbGVtZW50IGluc2lkZSB0aGUgY29ycmVjdCBjb250YWluZXIsXG4gICAgICAvLyBzZXR1cCB0aGUgYWN0dWFsIGRyYWcgcG9zaXRpb24gZGF0YSBhbmQgYWRqdXN0IHRoZSBlbGVtZW50J3MgdHJhbnNsYXRlXG4gICAgICAvLyB2YWx1ZXMgdG8gYWNjb3VudCBmb3IgdGhlIERPTSBwb3NpdGlvbiBzaGlmdC5cbiAgICAgIGVsc2Uge1xuICAgICAgICBkcmFnRGF0YS5sZWZ0ID0gY3VycmVudExlZnQgKyBkcmFnRGF0YS5jb250YWluZXJEaWZmWDtcbiAgICAgICAgZHJhZ0RhdGEudG9wID0gY3VycmVudFRvcCArIGRyYWdEYXRhLmNvbnRhaW5lckRpZmZZO1xuICAgICAgICBkcmFnQ29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICBzZXRTdHlsZXMoZWxlbWVudCwge3RyYW5zZm9ybTogZ2V0VHJhbnNsYXRlU3RyaW5nKGRyYWdEYXRhLmxlZnQsIGRyYWdEYXRhLnRvcCl9KTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIFNldCBkcmFnIGNsYXNzIGFuZCBiaW5kIHNjcm9sbGVycy5cbiAgICBhZGRDbGFzcyhlbGVtZW50LCBzZXR0aW5ncy5pdGVtRHJhZ2dpbmdDbGFzcyk7XG4gICAgZHJhZy5iaW5kU2Nyb2xsTGlzdGVuZXJzKCk7XG5cbiAgICAvLyBFbWl0IGRyYWdTdGFydCBldmVudC5cbiAgICBncmlkLl9lbWl0KGV2RHJhZ1N0YXJ0LCBpdGVtLCBldmVudCk7XG5cbiAgICByZXR1cm4gZHJhZztcblxuICB9O1xuXG4gIC8qKlxuICAgKiBEcmFnIG1vdmUgaGFuZGxlci5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbURyYWcucHJvdG90eXBlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgKiBAcmV0dXJucyB7SXRlbURyYWd9XG4gICAqL1xuICBJdGVtRHJhZy5wcm90b3R5cGUub25Nb3ZlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cbiAgICB2YXIgZHJhZyA9IHRoaXM7XG4gICAgdmFyIGl0ZW0gPSBkcmFnLmdldEl0ZW0oKTtcblxuICAgIC8vIElmIGl0ZW0gaXMgbm90IGFjdGl2ZSwgcmVzZXQgZHJhZy5cbiAgICBpZiAoIWl0ZW0uX2lzQWN0aXZlKSB7XG4gICAgICByZXR1cm4gZHJhZy5zdG9wKCk7XG4gICAgfVxuXG4gICAgdmFyIGVsZW1lbnQgPSBpdGVtLl9lbGVtZW50O1xuICAgIHZhciBncmlkID0gZHJhZy5nZXRHcmlkKCk7XG4gICAgdmFyIHNldHRpbmdzID0gZ3JpZC5fc2V0dGluZ3M7XG4gICAgdmFyIGRyYWdEYXRhID0gZHJhZy5fZGF0YTtcbiAgICB2YXIgYXhpcyA9IHNldHRpbmdzLmRyYWdBeGlzO1xuICAgIHZhciB4RGlmZiA9IGV2ZW50LmRlbHRhWCAtIGRyYWdEYXRhLmN1cnJlbnRFdmVudC5kZWx0YVg7XG4gICAgdmFyIHlEaWZmID0gZXZlbnQuZGVsdGFZIC0gZHJhZ0RhdGEuY3VycmVudEV2ZW50LmRlbHRhWTtcblxuICAgIHJhZkxvb3AuYWRkKHJhZlF1ZXVlTW92ZSwgaXRlbS5faWQsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgLy8gVXBkYXRlIGN1cnJlbnQgZXZlbnQuXG4gICAgICBkcmFnRGF0YS5jdXJyZW50RXZlbnQgPSBldmVudDtcblxuICAgICAgLy8gVXBkYXRlIGhvcml6b250YWwgcG9zaXRpb24gZGF0YS5cbiAgICAgIGlmIChheGlzICE9PSAneScpIHtcbiAgICAgICAgZHJhZ0RhdGEubGVmdCArPSB4RGlmZjtcbiAgICAgICAgZHJhZ0RhdGEuZ3JpZFggKz0geERpZmY7XG4gICAgICAgIGRyYWdEYXRhLmVsZW1lbnRDbGllbnRYICs9IHhEaWZmO1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgdmVydGljYWwgcG9zaXRpb24gZGF0YS5cbiAgICAgIGlmIChheGlzICE9PSAneCcpIHtcbiAgICAgICAgZHJhZ0RhdGEudG9wICs9IHlEaWZmO1xuICAgICAgICBkcmFnRGF0YS5ncmlkWSArPSB5RGlmZjtcbiAgICAgICAgZHJhZ0RhdGEuZWxlbWVudENsaWVudFkgKz0geURpZmY7XG4gICAgICB9XG5cbiAgICAgIC8vIE92ZXJsYXAgaGFuZGxpbmcuXG4gICAgICBzZXR0aW5ncy5kcmFnU29ydCAmJiBkcmFnLl9jaGVja1NvcnRPdmVybGFwKCk7XG5cbiAgICB9LCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIC8vIFVwZGF0ZSBlbGVtZW50J3MgdHJhbnNsYXRlWC9ZIHZhbHVlcy5cbiAgICAgIHNldFN0eWxlcyhlbGVtZW50LCB7dHJhbnNmb3JtOiBnZXRUcmFuc2xhdGVTdHJpbmcoZHJhZ0RhdGEubGVmdCwgZHJhZ0RhdGEudG9wKX0pO1xuXG4gICAgICAvLyBFbWl0IGRyYWdNb3ZlIGV2ZW50LlxuICAgICAgZ3JpZC5fZW1pdChldkRyYWdNb3ZlLCBpdGVtLCBldmVudCk7XG5cbiAgICB9KTtcblxuICAgIHJldHVybiBkcmFnO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIERyYWcgc2Nyb2xsIGhhbmRsZXIuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW1EcmFnLnByb3RvdHlwZVxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICogQHJldHVybnMge0l0ZW1EcmFnfVxuICAgKi9cbiAgSXRlbURyYWcucHJvdG90eXBlLm9uU2Nyb2xsID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cbiAgICB2YXIgZHJhZyA9IHRoaXM7XG4gICAgdmFyIGl0ZW0gPSBkcmFnLmdldEl0ZW0oKTtcbiAgICB2YXIgZWxlbWVudCA9IGl0ZW0uX2VsZW1lbnQ7XG4gICAgdmFyIGdyaWQgPSBkcmFnLmdldEdyaWQoKTtcbiAgICB2YXIgc2V0dGluZ3MgPSBncmlkLl9zZXR0aW5ncztcbiAgICB2YXIgYXhpcyA9IHNldHRpbmdzLmRyYWdBeGlzO1xuICAgIHZhciBkcmFnRGF0YSA9IGRyYWcuX2RhdGE7XG4gICAgdmFyIGdyaWRDb250YWluZXIgPSBncmlkLl9lbGVtZW50O1xuICAgIHZhciBlbGVtZW50UmVjdDtcbiAgICB2YXIgeERpZmY7XG4gICAgdmFyIHlEaWZmO1xuICAgIHZhciBvZmZzZXREaWZmO1xuXG4gICAgcmFmTG9vcC5hZGQocmFmUXVldWVTY3JvbGwsIGl0ZW0uX2lkLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIC8vIENhbGN1bGF0ZSBlbGVtZW50J3MgcmVjdCBhbmQgeC95IGRpZmYuXG4gICAgICBlbGVtZW50UmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB4RGlmZiA9IGRyYWdEYXRhLmVsZW1lbnRDbGllbnRYIC0gZWxlbWVudFJlY3QubGVmdDtcbiAgICAgIHlEaWZmID0gZHJhZ0RhdGEuZWxlbWVudENsaWVudFkgLSBlbGVtZW50UmVjdC50b3A7XG5cbiAgICAgIC8vIFVwZGF0ZSBjb250YWluZXIgZGlmZi5cbiAgICAgIGlmIChkcmFnRGF0YS5jb250YWluZXIgIT09IGdyaWRDb250YWluZXIpIHtcbiAgICAgICAgb2Zmc2V0RGlmZiA9IGdldE9mZnNldERpZmYoZHJhZ0RhdGEuY29udGFpbmluZ0Jsb2NrLCBncmlkQ29udGFpbmVyKTtcbiAgICAgICAgZHJhZ0RhdGEuY29udGFpbmVyRGlmZlggPSBvZmZzZXREaWZmLmxlZnQ7XG4gICAgICAgIGRyYWdEYXRhLmNvbnRhaW5lckRpZmZZID0gb2Zmc2V0RGlmZi50b3A7XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSBob3Jpem9udGFsIHBvc2l0aW9uIGRhdGEuXG4gICAgICBpZiAoYXhpcyAhPT0gJ3knKSB7XG4gICAgICAgIGRyYWdEYXRhLmxlZnQgKz0geERpZmY7XG4gICAgICAgIGRyYWdEYXRhLmdyaWRYID0gZHJhZ0RhdGEubGVmdCAtIGRyYWdEYXRhLmNvbnRhaW5lckRpZmZYO1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgdmVydGljYWwgcG9zaXRpb24gZGF0YS5cbiAgICAgIGlmIChheGlzICE9PSAneCcpIHtcbiAgICAgICAgZHJhZ0RhdGEudG9wICs9IHlEaWZmO1xuICAgICAgICBkcmFnRGF0YS5ncmlkWSA9IGRyYWdEYXRhLnRvcCAtIGRyYWdEYXRhLmNvbnRhaW5lckRpZmZZO1xuICAgICAgfVxuXG4gICAgICAvLyBPdmVybGFwIGhhbmRsaW5nLlxuICAgICAgc2V0dGluZ3MuZHJhZ1NvcnQgJiYgZHJhZy5fY2hlY2tTb3J0T3ZlcmxhcCgpO1xuXG4gICAgfSwgZnVuY3Rpb24gKCkge1xuXG4gICAgICAvLyBVcGRhdGUgZWxlbWVudCdzIHRyYW5zbGF0ZVgvWSB2YWx1ZXMuXG4gICAgICBzZXRTdHlsZXMoZWxlbWVudCwge3RyYW5zZm9ybTogZ2V0VHJhbnNsYXRlU3RyaW5nKGRyYWdEYXRhLmxlZnQsIGRyYWdEYXRhLnRvcCl9KTtcblxuICAgICAgLy8gRW1pdCBkcmFnU2Nyb2xsIGV2ZW50LlxuICAgICAgZ3JpZC5fZW1pdChldkRyYWdTY3JvbGwsIGl0ZW0sIGV2ZW50KTtcblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRyYWc7XG5cbiAgfTtcblxuICAvKipcbiAgICogRHJhZyBlbmQgaGFuZGxlci5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbURyYWcucHJvdG90eXBlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgKiBAcmV0dXJucyB7SXRlbURyYWd9XG4gICAqL1xuICBJdGVtRHJhZy5wcm90b3R5cGUub25FbmQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgIHZhciBkcmFnID0gdGhpcztcbiAgICB2YXIgaXRlbSA9IGRyYWcuZ2V0SXRlbSgpO1xuICAgIHZhciBlbGVtZW50ID0gaXRlbS5fZWxlbWVudDtcbiAgICB2YXIgZ3JpZCA9IGRyYWcuZ2V0R3JpZCgpO1xuICAgIHZhciBzZXR0aW5ncyA9IGdyaWQuX3NldHRpbmdzO1xuICAgIHZhciBkcmFnRGF0YSA9IGRyYWcuX2RhdGE7XG4gICAgdmFyIHJlbGVhc2UgPSBpdGVtLl9yZWxlYXNlO1xuXG4gICAgLy8gSWYgaXRlbSBpcyBub3QgYWN0aXZlLCByZXNldCBkcmFnLlxuICAgIGlmICghaXRlbS5faXNBY3RpdmUpIHtcbiAgICAgIHJldHVybiBkcmFnLnN0b3AoKTtcbiAgICB9XG5cbiAgICAvLyBDYW5jZWwgcmFmIGxvb3AgYWN0aW9ucy5cbiAgICBkcmFnLmNhbmNlbFJhZkxvb3AoKTtcblxuICAgIC8vIEZpbmlzaCBjdXJyZW50bHkgcXVldWVkIG92ZXJsYXAgY2hlY2suXG4gICAgc2V0dGluZ3MuZHJhZ1NvcnQgJiYgZHJhZy5fY2hlY2tTb3J0T3ZlcmxhcCgnZmluaXNoJyk7XG5cbiAgICAvLyBSZW1vdmUgc2Nyb2xsIGxpc3RlbmVycy5cbiAgICBkcmFnLnVuYmluZFNjcm9sbExpc3RlbmVycygpO1xuXG4gICAgLy8gU2V0dXAgcmVsZWFzZSBkYXRhLlxuICAgIHJlbGVhc2UuY29udGFpbmVyRGlmZlggPSBkcmFnRGF0YS5jb250YWluZXJEaWZmWDtcbiAgICByZWxlYXNlLmNvbnRhaW5lckRpZmZZID0gZHJhZ0RhdGEuY29udGFpbmVyRGlmZlk7XG5cbiAgICAvLyBSZXNldCBkcmFnIGRhdGEuXG4gICAgZHJhZy5yZXNldCgpO1xuXG4gICAgLy8gUmVtb3ZlIGRyYWcgY2xhc3NuYW1lIGZyb20gZWxlbWVudC5cbiAgICByZW1vdmVDbGFzcyhlbGVtZW50LCBzZXR0aW5ncy5pdGVtRHJhZ2dpbmdDbGFzcyk7XG5cbiAgICAvLyBFbWl0IGRyYWdFbmQgZXZlbnQuXG4gICAgZ3JpZC5fZW1pdChldkRyYWdFbmQsIGl0ZW0sIGV2ZW50KTtcblxuICAgIC8vIEZpbmlzaCB1cCB0aGUgbWlncmF0aW9uIHByb2Nlc3Mgb3Igc3RhcnQgdGhlIHJlbGVhc2UgcHJvY2Vzcy5cbiAgICBkcmFnLl9pc01pZ3JhdGluZyA/IGRyYWcuZmluaXNoTWlncmF0aW9uKCkgOiByZWxlYXNlLnN0YXJ0KCk7XG5cbiAgICByZXR1cm4gZHJhZztcblxuICB9O1xuXG4gIC8qKlxuICAgKiBIZWxwZXJzIC0gR2VuZXJpY1xuICAgKiAqKioqKioqKioqKioqKioqKlxuICAgKi9cblxuICAvKipcbiAgICogTm9ybWFsaXplIGFycmF5IGluZGV4LiBCYXNpY2FsbHkgdGhpcyBmdW5jdGlvbiBtYWtlcyBzdXJlIHRoYXQgdGhlIHByb3ZpZGVkXG4gICAqIGFycmF5IGluZGV4IGlzIHdpdGhpbiB0aGUgYm91bmRzIG9mIHRoZSBwcm92aWRlZCBhcnJheSBhbmQgYWxzbyB0cmFuc2Zvcm1zXG4gICAqIG5lZ2F0aXZlIGluZGV4IHRvIHRoZSBtYXRjaGluZyBwb3NpdGl2ZSBpbmRleC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNNaWdyYXRpb25cbiAgICovXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZUFycmF5SW5kZXgoYXJyYXksIGluZGV4LCBpc01pZ3JhdGlvbikge1xuXG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICB2YXIgbWF4SW5kZXggPSBNYXRoLm1heCgwLCBpc01pZ3JhdGlvbiA/IGxlbmd0aCA6IGxlbmd0aCAtIDEpO1xuXG4gICAgcmV0dXJuIGluZGV4ID4gbWF4SW5kZXggPyBtYXhJbmRleCA6XG4gICAgICBpbmRleCA8IDAgPyBNYXRoLm1heChtYXhJbmRleCArIGluZGV4ICsgMSwgMCkgOlxuICAgICAgaW5kZXg7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBTd2FwIGFycmF5IGl0ZW1zLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheVxuICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICogICAtIEluZGV4IChwb3NpdGl2ZSBvciBuZWdhdGl2ZSkgb2YgdGhlIGl0ZW0gdGhhdCB3aWxsIGJlIHN3YXBwZWQuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB3aXRoSW5kZXhcbiAgICogICAtIEluZGV4IChwb3NpdGl2ZSBvciBuZWdhdGl2ZSkgb2YgdGhlIG90aGVyIGl0ZW0gdGhhdCB3aWxsIGJlIHN3YXBwZWQuXG4gICAqL1xuICBmdW5jdGlvbiBhcnJheVN3YXAoYXJyYXksIGluZGV4LCB3aXRoSW5kZXgpIHtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGUgYXJyYXkgaGFzIHR3byBvciBtb3JlIGl0ZW1zLlxuICAgIGlmIChhcnJheS5sZW5ndGggPCAyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gTm9ybWFsaXplIHRoZSBpbmRpY2VzLlxuICAgIHZhciBpbmRleEEgPSBub3JtYWxpemVBcnJheUluZGV4KGFycmF5LCBpbmRleCk7XG4gICAgdmFyIGluZGV4QiA9IG5vcm1hbGl6ZUFycmF5SW5kZXgoYXJyYXksIHdpdGhJbmRleCk7XG4gICAgdmFyIHRlbXA7XG5cbiAgICAvLyBTd2FwIHRoZSBpdGVtcy5cbiAgICBpZiAoaW5kZXhBICE9PSBpbmRleEIpIHtcbiAgICAgIHRlbXAgPSBhcnJheVtpbmRleEFdO1xuICAgICAgYXJyYXlbaW5kZXhBXSA9IGFycmF5W2luZGV4Ql07XG4gICAgICBhcnJheVtpbmRleEJdID0gdGVtcDtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlIGFycmF5IGl0ZW0gdG8gYW5vdGhlciBpbmRleC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZyb21JbmRleFxuICAgKiAgIC0gSW5kZXggKHBvc2l0aXZlIG9yIG5lZ2F0aXZlKSBvZiB0aGUgaXRlbSB0aGF0IHdpbGwgYmUgbW92ZWQuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0b0luZGV4XG4gICAqICAgLSBJbmRleCAocG9zaXRpdmUgb3IgbmVnYXRpdmUpIHdoZXJlIHRoZSBpdGVtIHNob3VsZCBiZSBtb3ZlZCB0by5cbiAgICovXG4gIGZ1bmN0aW9uIGFycmF5TW92ZShhcnJheSwgZnJvbUluZGV4LCB0b0luZGV4KSB7XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlIGFycmF5IGhhcyB0d28gb3IgbW9yZSBpdGVtcy5cbiAgICBpZiAoYXJyYXkubGVuZ3RoIDwgMikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIE5vcm1hbGl6ZSB0aGUgaW5kaWNlcy5cbiAgICB2YXIgZnJvbSA9IG5vcm1hbGl6ZUFycmF5SW5kZXgoYXJyYXksIGZyb21JbmRleCk7XG4gICAgdmFyIHRvID0gbm9ybWFsaXplQXJyYXlJbmRleChhcnJheSwgdG9JbmRleCk7XG5cbiAgICAvLyBBZGQgdGFyZ2V0IGl0ZW0gdG8gdGhlIG5ldyBwb3NpdGlvbi5cbiAgICBpZiAoZnJvbSAhPT0gdG8pIHtcbiAgICAgIGFycmF5LnNwbGljZSh0bywgMCwgYXJyYXkuc3BsaWNlKGZyb20sIDEpWzBdKTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbmV3IGR1cGxpY2F0ZSBmcmVlIHZlcnNpb24gb2YgdGhlIHByb3ZpZGVkIGFycmF5LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheVxuICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAqL1xuICBmdW5jdGlvbiBhcnJheVVuaXF1ZShhcnJheSkge1xuXG4gICAgdmFyIHJldCA9IFtdO1xuICAgIHZhciBsZW4gPSBhcnJheS5sZW5ndGg7XG4gICAgdmFyIGk7XG5cbiAgICBpZiAobGVuKSB7XG4gICAgICByZXRbMF0gPSBhcnJheVswXTtcbiAgICAgIGZvciAoaSA9IDE7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAocmV0LmluZGV4T2YoYXJyYXlbaV0pIDwgMCkge1xuICAgICAgICAgIHJldC5wdXNoKGFycmF5W2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0geyp9IHZhbFxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsKSB7XG5cbiAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSB2YWx1ZSBpcyBhIG5vZGUgbGlzdFxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0geyp9IHZhbFxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGZ1bmN0aW9uIGlzTm9kZUxpc3QodmFsKSB7XG5cbiAgICB2YXIgdHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpO1xuICAgIHJldHVybiB0eXBlID09PSAnW29iamVjdCBIVE1MQ29sbGVjdGlvbl0nIHx8IHR5cGUgPT09ICdbb2JqZWN0IE5vZGVMaXN0XSc7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXJnZSB0d28gb2JqZWN0cyByZWN1cnNpdmVseSAoZGVlcCBtZXJnZSkuIFRoZSBzb3VyY2Ugb2JqZWN0J3MgcHJvcGVydGllc1xuICAgKiBhcmUgbWVyZ2VkIHRvIHRoZSB0YXJnZXQgb2JqZWN0LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAqICAgLSBUaGUgdGFyZ2V0IG9iamVjdC5cbiAgICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZVxuICAgKiAgIC0gVGhlIHNvdXJjZSBvYmplY3QuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIHRhcmdldCBvYmplY3QuXG4gICAqL1xuICBmdW5jdGlvbiBtZXJnZU9iamVjdHModGFyZ2V0LCBzb3VyY2UpIHtcblxuICAgIC8vIExvb3AgdGhyb3VnaCB0aGUgc3VyY2Ugb2JqZWN0J3MgcHJvcHMuXG4gICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wTmFtZSkge1xuXG4gICAgICB2YXIgaXNPYmplY3QgPSBpc1BsYWluT2JqZWN0KHNvdXJjZVtwcm9wTmFtZV0pO1xuXG4gICAgICAvLyBJZiB0YXJnZXQgYW5kIHNvdXJjZSB2YWx1ZXMgYXJlIGJvdGggb2JqZWN0cywgbWVyZ2UgdGhlIG9iamVjdHMgYW5kXG4gICAgICAvLyBhc3NpZ24gdGhlIG1lcmdlZCB2YWx1ZSB0byB0aGUgdGFyZ2V0IHByb3BlcnR5LlxuICAgICAgaWYgKGlzUGxhaW5PYmplY3QodGFyZ2V0W3Byb3BOYW1lXSkgJiYgaXNPYmplY3QpIHtcbiAgICAgICAgdGFyZ2V0W3Byb3BOYW1lXSA9IG1lcmdlT2JqZWN0cyh7fSwgdGFyZ2V0W3Byb3BOYW1lXSk7XG4gICAgICAgIHRhcmdldFtwcm9wTmFtZV0gPSBtZXJnZU9iamVjdHModGFyZ2V0W3Byb3BOYW1lXSwgc291cmNlW3Byb3BOYW1lXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIE90aGVyd2lzZSBzZXQgdGhlIHNvdXJjZSBvYmplY3QncyB2YWx1ZSB0byB0YXJnZXQgb2JqZWN0IGFuZCBtYWtlIHN1cmVcbiAgICAgIC8vIHRoYXQgb2JqZWN0IGFuZCBhcnJheSB2YWx1ZXMgYXJlIGNsb25lZCBhbmQgZGlyZWN0bHkgYXNzaWduZWQuXG4gICAgICBlbHNlIHtcbiAgICAgICAgdGFyZ2V0W3Byb3BOYW1lXSA9IGlzT2JqZWN0ID8gbWVyZ2VPYmplY3RzKHt9LCBzb3VyY2VbcHJvcE5hbWVdKSA6XG4gICAgICAgICAgQXJyYXkuaXNBcnJheShzb3VyY2VbcHJvcE5hbWVdKSA/IHNvdXJjZVtwcm9wTmFtZV0uY29uY2F0KCkgOlxuICAgICAgICAgIHNvdXJjZVtwcm9wTmFtZV07XG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIHJldHVybiB0YXJnZXQ7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnQgYW4gaXRlbSBvciBhbiBhcnJheSBvZiBpdGVtcyB0byBhcnJheSB0byBhIHNwZWNpZmllZCBpbmRleC4gTXV0YXRlc1xuICAgKiB0aGUgYXJyYXkuIFRoZSBpbmRleCBjYW4gYmUgbmVnYXRpdmUgaW4gd2hpY2ggY2FzZSB0aGUgaXRlbXMgd2lsbCBiZSBhZGRlZFxuICAgKiB0byB0aGUgZW5kIG9mIHRoZSBhcnJheS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXlcbiAgICogQHBhcmFtIHsqfSBpdGVtc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2luZGV4PS0xXVxuICAgKi9cbiAgZnVuY3Rpb24gaW5zZXJ0SXRlbXNUb0FycmF5KGFycmF5LCBpdGVtcywgaW5kZXgpIHtcblxuICAgIHZhciB0YXJnZXRJbmRleCA9IHR5cGVvZiBpbmRleCA9PT0gdHlwZU51bWJlciA/IGluZGV4IDogLTE7XG4gICAgYXJyYXkuc3BsaWNlLmFwcGx5KGFycmF5LCBbdGFyZ2V0SW5kZXggPCAwID8gYXJyYXkubGVuZ3RoIC0gdGFyZ2V0SW5kZXggKyAxIDogdGFyZ2V0SW5kZXgsIDBdLmNvbmNhdChpdGVtcykpO1xuXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuICAgKiBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG4gICAqIE4gbWlsbGlzZWNvbmRzLiBUaGUgcmV0dXJuZWQgZnVuY3Rpb24gYWNjZXB0cyBvbmUgYXJndW1lbnQgd2hpY2gsIHdoZW5cbiAgICogYmVpbmcgXCJmaW5pc2hcIiwgY2FsbHMgdGhlIGRlYm91bmNlZCBmdW5jdGlvbiBpbW1lZGlhdGVseSBpZiBpdCBpcyBjdXJyZW50bHlcbiAgICogd2FpdGluZyB0byBiZSBjYWxsZWQsIGFuZCB3aGVuIGJlaW5nIFwiY2FuY2VsXCIgY2FuY2VscyB0aGUgY3VycmVudGx5IHF1ZXVlZFxuICAgKiBmdW5jdGlvbiBjYWxsLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiBAcGFyYW0ge051bWJlcn0gd2FpdFxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gICAqL1xuICBmdW5jdGlvbiBkZWJvdW5jZShmbiwgd2FpdCkge1xuXG4gICAgdmFyIHRpbWVvdXQ7XG4gICAgdmFyIGFjdGlvbkNhbmNlbCA9ICdjYW5jZWwnO1xuICAgIHZhciBhY3Rpb25GaW5pc2ggPSAnZmluaXNoJztcblxuICAgIHJldHVybiB3YWl0ID4gMCA/IGZ1bmN0aW9uIChhY3Rpb24pIHtcblxuICAgICAgaWYgKHRpbWVvdXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aW1lb3V0ID0gZ2xvYmFsLmNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gYWN0aW9uRmluaXNoKSB7XG4gICAgICAgICAgZm4oKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aW9uICE9PSBhY3Rpb25DYW5jZWwgJiYgYWN0aW9uICE9PSBhY3Rpb25GaW5pc2gpIHtcbiAgICAgICAgdGltZW91dCA9IGdsb2JhbC5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aW1lb3V0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgIGZuKCk7XG4gICAgICAgIH0sIHdhaXQpO1xuICAgICAgfVxuXG4gICAgfSA6IGZ1bmN0aW9uIChhY3Rpb24pIHtcblxuICAgICAgaWYgKGFjdGlvbiAhPT0gYWN0aW9uQ2FuY2VsKSB7XG4gICAgICAgIGZuKCk7XG4gICAgICB9XG5cbiAgICB9O1xuXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHJhZiBsb29wIHF1ZXVlIHN5c3RlbSB0aGF0IGFsbG93cyBwdXNoaW5nIGNhbGxiYWNrcyB0byBlaXRoZXJcbiAgICogdGhlIHJlYWQgcXVldWUgb3IgdGhlIHdyaXRlIHF1ZXVlLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlUmFmTG9vcCgpIHtcblxuICAgIHZhciBuZXh0VGljayA9IG51bGw7XG4gICAgdmFyIHF1ZXVlID0gW107XG4gICAgdmFyIG1hcCA9IHt9O1xuICAgIHZhciByYWYgPSAoZ2xvYmFsLnJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgfHwgZ2xvYmFsLndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgfHwgZ2xvYmFsLm1velJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgfHwgZ2xvYmFsLm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICB8fCBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgcmV0dXJuIGdsb2JhbC5zZXRUaW1lb3V0KGNiLCAxNik7XG4gICAgICB9XG4gICAgKS5iaW5kKGdsb2JhbCk7XG5cbiAgICBmdW5jdGlvbiBhZGQodHlwZSwgaWQsIHJlYWRDYWxsYmFjaywgd3JpdGVDYWxsYmFjaykge1xuXG4gICAgICAvLyBGaXJzdCwgbGV0J3MgY2hlY2sgaWYgYW4gaXRlbSBoYXMgYmVlbiBhZGRlZCB0byB0aGUgcXVldWVzIHdpdGggdGhlXG4gICAgICAvLyBzYW1lIGlkIGFuZCByZW1vdmUgaXQuXG4gICAgICB2YXIgY3VycmVudEluZGV4ID0gcXVldWUuaW5kZXhPZih0eXBlICsgaWQpO1xuICAgICAgaWYgKGN1cnJlbnRJbmRleCA+IC0xKSB7XG4gICAgICAgIHF1ZXVlLnNwbGljZShjdXJyZW50SW5kZXgsIDEpO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgYWxsIG1vdmUvc2Nyb2xsIGV2ZW50IGNhbGxiYWNrcyB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBxdWV1ZVxuICAgICAgLy8gYW5kIG90aGVyIGNhbGxiYWNrcyB0byB0aGUgZW5kIG9mIHRoZSBxdWV1ZS5cbiAgICAgIHR5cGUgPT09IHJhZlF1ZXVlTW92ZSB8fCB0eXBlID09PSByYWZRdWV1ZVNjcm9sbCA/IHF1ZXVlLnVuc2hpZnQodHlwZSArIGlkKSA6IHF1ZXVlLnB1c2godHlwZSArIGlkKTtcbiAgICAgIG1hcFt0eXBlICsgaWRdID0gW3JlYWRDYWxsYmFjaywgd3JpdGVDYWxsYmFja107XG5cbiAgICAgIC8vIEZpbmFsbHksIGxldCdzIGtpY2tzdGFydCB0aGUgbmV4dCB0aWNrIGlmIGl0IGlzIG5vdCBydW5uaW5nIHlldC5cbiAgICAgICFuZXh0VGljayAmJiAobmV4dFRpY2sgPSByYWYoZmx1c2gpKTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbmNlbCh0eXBlLCBpZCkge1xuXG4gICAgICAvLyBMZXQncyBjaGVjayBpZiBhbiBpdGVtIGhhcyBiZWVuIGFkZGVkIHRvIHRoZSBxdWV1ZSB3aXRoIHRoZSBpZCBhbmRcbiAgICAgIC8vIGlmIHNvIC0+IHJlbW92ZSBpdC5cbiAgICAgIHZhciBjdXJyZW50SW5kZXggPSBxdWV1ZS5pbmRleE9mKHR5cGUgKyBpZCk7XG4gICAgICBpZiAoY3VycmVudEluZGV4ID4gLTEpIHtcbiAgICAgICAgcXVldWUuc3BsaWNlKGN1cnJlbnRJbmRleCwgMSk7XG4gICAgICAgIG1hcFt0eXBlICsgaWRdID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmx1c2goKSB7XG5cbiAgICAgIHZhciBtYXhCYXRjaFNpemUgPSArR3JpZC5fbWF4UmFmQmF0Y2hTaXplIHx8IDEwMDtcbiAgICAgIHZhciBiYXRjaCA9IHF1ZXVlLnNwbGljZSgwLCBNYXRoLm1pbihtYXhCYXRjaFNpemUsIHF1ZXVlLmxlbmd0aCkpO1xuICAgICAgdmFyIGJhdGNoTWFwID0ge307XG4gICAgICB2YXIgaTtcblxuICAgICAgLy8gUmVzZXQgdGlja2VyLlxuICAgICAgbmV4dFRpY2sgPSBudWxsO1xuXG4gICAgICAvLyBDcmVhdGUgYmF0Y2ggbWFwIGFuZCBjbGVhciBtYXAgaXRlbXMuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgYmF0Y2gubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYmF0Y2hNYXBbYmF0Y2hbaV1dID0gbWFwW2JhdGNoW2ldXTtcbiAgICAgICAgbWFwW2JhdGNoW2ldXSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgLy8gUHJvY2VzcyByZWFkIGNhbGxiYWNrcy5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBiYXRjaC5sZW5ndGg7IGkrKykge1xuICAgICAgICBiYXRjaE1hcFtiYXRjaFtpXV1bMF0oKTtcbiAgICAgIH1cblxuICAgICAgLy8gUHJvY2VzcyB3cml0ZSBjYWxsYmFja3MuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgYmF0Y2gubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYmF0Y2hNYXBbYmF0Y2hbaV1dWzFdKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlc3RhcnQgdGhlIHRpY2tlciBpZiBuZWVkZWQuXG4gICAgICBpZiAoIW5leHRUaWNrICYmIHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBuZXh0VGljayA9IHJhZihmbHVzaCk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgYWRkOiBhZGQsXG4gICAgICBjYW5jZWw6IGNhbmNlbFxuICAgIH07XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXJzIC0gRE9NIHV0aWxzXG4gICAqICoqKioqKioqKioqKioqKioqKipcbiAgICovXG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybXMgYSBjYW1lbCBjYXNlIHN0eWxlIHByb3BlcnR5IHRvIGtlYmFiIGNhc2Ugc3R5bGUgcHJvcGVydHkuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAgICogQHJldHVybnMge1N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIGdldFN0eWxlTmFtZShzdHJpbmcpIHtcblxuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvKFtBLVpdKS9nLCAnLSQxJykudG9Mb3dlckNhc2UoKTtcblxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvbXB1dGVkIHZhbHVlIG9mIGFuIGVsZW1lbnQncyBzdHlsZSBwcm9wZXJ0eSBhcyBhIHN0cmluZy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3R5bGVcbiAgICogQHJldHVybnMge1N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIGdldFN0eWxlKGVsZW1lbnQsIHN0eWxlKSB7XG5cbiAgICByZXR1cm4gZ2xvYmFsLmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShzdHlsZSA9PT0gJ3RyYW5zZm9ybScgPyB0cmFuc2Zvcm0uc3R5bGVOYW1lIHx8IHN0eWxlIDogc3R5bGUpO1xuXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29tcHV0ZWQgdmFsdWUgb2YgYW4gZWxlbWVudCdzIHN0eWxlIHByb3BlcnR5IHRyYW5zZm9ybWVkIGludG9cbiAgICogYSBmbG9hdCB2YWx1ZS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0eWxlXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqL1xuICBmdW5jdGlvbiBnZXRTdHlsZUFzRmxvYXQoZWwsIHN0eWxlKSB7XG5cbiAgICByZXR1cm4gcGFyc2VGbG9hdChnZXRTdHlsZShlbCwgc3R5bGUpKSB8fCAwO1xuXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZWxlbWVudCdzIGNvbXB1dGVkIHRyYW5zbGF0ZVgvWSB2YWx1ZSBhcyBhIGZsb2F0LiBBc3N1bWVzIHRoYXRcbiAgICogdGhlIHRyYW5zbGF0ZSB2YWx1ZSBpcyBkZWZpbmVkIGFzIHBpeGVscy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICAgKiBAcGFyYW0ge1N0cmluZ30gYXhpc1xuICAgKiAgIC0gXCJ4XCIgb3IgXCJ5XCIuXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqL1xuICBmdW5jdGlvbiBnZXRUcmFuc2xhdGVBc0Zsb2F0KGVsZW1lbnQsIGF4aXMpIHtcblxuICAgIHJldHVybiBwYXJzZUZsb2F0KChnZXRTdHlsZShlbGVtZW50LCAndHJhbnNmb3JtJykgfHwgJycpLnJlcGxhY2UoJ21hdHJpeCgnLCAnJykuc3BsaXQoJywnKVtheGlzID09PSAneCcgPyA0IDogNV0pIHx8IDA7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm0gdHJhbnNsYXRlWCBhbmQgdHJhbnNsYXRlWSB2YWx1ZSBpbnRvIENTUyB0cmFuc2Zvcm0gc3R5bGVcbiAgICogcHJvcGVydHkncyB2YWx1ZS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRyYW5zbGF0ZVhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRyYW5zbGF0ZVlcbiAgICogQHJldHVybnMge1N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIGdldFRyYW5zbGF0ZVN0cmluZyh0cmFuc2xhdGVYLCB0cmFuc2xhdGVZKSB7XG5cbiAgICByZXR1cm4gJ3RyYW5zbGF0ZVgoJyArIHRyYW5zbGF0ZVggKyAncHgpIHRyYW5zbGF0ZVkoJyArIHRyYW5zbGF0ZVkgKyAncHgpJztcblxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjdXJyZW50IHZhbHVlcyBvZiB0aGUgcHJvdmlkZWQgc3R5bGVzIGRlZmluaXRpb24gb2JqZWN0LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXNcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0Q3VycmVudFN0eWxlcyhlbGVtZW50LCBzdHlsZXMpIHtcblxuICAgIHZhciBjdXJyZW50ID0ge307XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhzdHlsZXMpO1xuICAgIHZhciBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGN1cnJlbnRba2V5c1tpXV0gPSBnZXRTdHlsZShlbGVtZW50LCBnZXRTdHlsZU5hbWUoa2V5c1tpXSkpO1xuICAgIH1cblxuICAgIHJldHVybiBjdXJyZW50O1xuXG4gIH1cblxuICAvKipcbiAgICogU2V0IGlubGluZSBzdHlsZXMgdG8gYW4gZWxlbWVudC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gc3R5bGVzXG4gICAqL1xuICBmdW5jdGlvbiBzZXRTdHlsZXMoZWxlbWVudCwgc3R5bGVzKSB7XG5cbiAgICB2YXIgcHJvcHMgPSBPYmplY3Qua2V5cyhzdHlsZXMpO1xuICAgIHZhciBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBlbGVtZW50LnN0eWxlW3Byb3BzW2ldID09PSAndHJhbnNmb3JtJyAmJiB0cmFuc2Zvcm0gPyB0cmFuc2Zvcm0ucHJvcE5hbWUgOiBwcm9wc1tpXV0gPSBzdHlsZXNbcHJvcHNbaV1dO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBjbGFzcyB0byBhbiBlbGVtZW50LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIGZ1bmN0aW9uIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuXG4gICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIWVsZW1lbnRNYXRjaGVzKGVsZW1lbnQsICcuJyArIGNsYXNzTmFtZSkpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NOYW1lICs9ICcgJyArIGNsYXNzTmFtZTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgY2xhc3MgbmFtZSBmcm9tIGFuIGVsZW1lbnQuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG5cbiAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChlbGVtZW50TWF0Y2hlcyhlbGVtZW50LCAnLicgKyBjbGFzc05hbWUpKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICgnICcgKyBlbGVtZW50LmNsYXNzTmFtZSArICcgJykucmVwbGFjZSgnICcgKyBjbGFzc05hbWUgKyAnICcsICcgJykudHJpbSgpO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgbm9kZUxpc3QgdG8gYXJyYXkuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7Tm9kZUxpc3R9IG5vZGVMaXN0XG4gICAqIEByZXR1cm5zIHtIVE1MRWxlbWVudFtdfVxuICAgKi9cbiAgZnVuY3Rpb24gbm9kZUxpc3RUb0FycmF5KG5vZGVMaXN0KSB7XG5cbiAgICByZXR1cm4gW10uc2xpY2UuY2FsbChub2RlTGlzdCk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgdGhlIHN1cHBvcnRlZCBlbGVtZW50Lm1hdGNoZXMoKSBtZXRob2QgYW5kIHJldHVybnMgYSBmdW5jdGlvbiB0aGF0XG4gICAqIGNhbiBiZSB1c2VkIHRvIGNhbGwgdGhlIHN1cHBvcnRlZCBtZXRob2QuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldFN1cHBvcnRlZEVsZW1lbnRNYXRjaGVzKCkge1xuXG4gICAgdmFyIHAgPSBFbGVtZW50LnByb3RvdHlwZTtcbiAgICB2YXIgZm4gPSBwLm1hdGNoZXMgfHwgcC5tYXRjaGVzU2VsZWN0b3IgfHwgcC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgcC5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgcC5tc01hdGNoZXNTZWxlY3RvciB8fCBwLm9NYXRjaGVzU2VsZWN0b3I7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKGVsLCBzZWxlY3Rvcikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwoZWwsIHNlbGVjdG9yKTtcbiAgICB9O1xuXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc3VwcG9ydGVkIHN0eWxlIHByb3BlcnR5J3MgcHJlZml4LCBwcm9wZXJ0eSBuYW1lIGFuZCBzdHlsZSBuYW1lXG4gICAqIG9yIG51bGwgaWYgdGhlIHN0eWxlIHByb3BlcnR5IGlzIG5vdCBzdXBwb3J0ZWQuIFRoaXMgaXMgdXNlZCBmb3IgZ2V0dGluZ1xuICAgKiB0aGUgc3VwcG9ydGVkIHRyYW5zZm9ybS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0eWxlXG4gICAqIEByZXR1cm5zIHs/T2JqZWN0fVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0U3VwcG9ydGVkU3R5bGUoc3R5bGUpIHtcblxuICAgIHZhciBzdHlsZUNhcCA9IHN0eWxlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3R5bGUuc2xpY2UoMSk7XG4gICAgdmFyIHByZWZpeGVzID0gWycnLCAnV2Via2l0JywgJ01veicsICdPJywgJ21zJ107XG4gICAgdmFyIHByZWZpeDtcbiAgICB2YXIgcHJvcE5hbWU7XG4gICAgdmFyIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgcHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHByZWZpeCA9IHByZWZpeGVzW2ldO1xuICAgICAgcHJvcE5hbWUgPSBwcmVmaXggPyBwcmVmaXggKyBzdHlsZUNhcCA6IHN0eWxlO1xuICAgICAgaWYgKGRvY0VsZW0uc3R5bGVbcHJvcE5hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHJlZml4ID0gcHJlZml4LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlZml4OiBwcmVmaXgsXG4gICAgICAgICAgcHJvcE5hbWU6IHByb3BOYW1lLFxuICAgICAgICAgIHN0eWxlTmFtZTogcHJlZml4ID8gJy0nICsgcHJlZml4ICsgJy0nICsgc3R5bGUgOiBzdHlsZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuXG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBvZmZzZXQgZGlmZmVyZW5jZSB0d28gZWxlbWVudHMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1BXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1CXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2NvbXBhcmVDb250YWluaW5nQmxvY2tzPWZhbHNlXVxuICAgKiAgIC0gV2hlbiB0aGlzIGlzIHNldCB0byB0cnVlIHRoZSBjb250YWluaW5nIGJsb2NrcyBvZiB0aGUgcHJvdmlkZWQgZWxlbWVudHNcbiAgICogICAgIHdpbGwgYmUgdXNlZCBmb3IgY2FsY3VsYXRpbmcgdGhlIGRpZmZlcmVuY2UuIE90aGVyd2lzZSB0aGUgcHJvdmlkZWRcbiAgICogICAgIGVsZW1lbnRzIHdpbGwgYmUgY29tcGFyZWQgZGlyZWN0bHkuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBmdW5jdGlvbiBnZXRPZmZzZXREaWZmKGVsZW1BLCBlbGVtQiwgY29tcGFyZUNvbnRhaW5pbmdCbG9ja3MpIHtcblxuICAgIGlmIChlbGVtQSA9PT0gZWxlbUIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHRvcDogMFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoY29tcGFyZUNvbnRhaW5pbmdCbG9ja3MpIHtcbiAgICAgIGVsZW1BID0gZ2V0Q29udGFpbmluZ0Jsb2NrKGVsZW1BLCB0cnVlKTtcbiAgICAgIGVsZW1CID0gZ2V0Q29udGFpbmluZ0Jsb2NrKGVsZW1CLCB0cnVlKTtcbiAgICB9XG5cbiAgICB2YXIgYU9mZnNldCA9IGdldE9mZnNldChlbGVtQSwgdHJ1ZSk7XG4gICAgdmFyIGJPZmZzZXQgPSBnZXRPZmZzZXQoZWxlbUIsIHRydWUpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGxlZnQ6IGJPZmZzZXQubGVmdCAtIGFPZmZzZXQubGVmdCxcbiAgICAgIHRvcDogYk9mZnNldC50b3AgLSBhT2Zmc2V0LnRvcFxuICAgIH07XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBlbGVtZW50J3MgZG9jdW1lbnQgb2Zmc2V0LCB3aGljaCBpbiBwcmFjdGljZSBtZWFucyB0aGUgdmVydGljYWxcbiAgICogYW5kIGhvcml6b250YWwgZGlzdGFuY2UgYmV0d2VlbiB0aGUgZWxlbWVudCdzIG5vcnRod2VzdCBjb3JuZXIgYW5kIHRoZVxuICAgKiBkb2N1bWVudCdzIG5vcnRod2VzdCBjb3JuZXIuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7KERvY3VtZW50fEVsZW1lbnR8V2luZG93KX0gZWxlbWVudFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtleGNsdWRlRWxlbWVudEJvcmRlcnM9ZmFsc2VdXG4gICAqIEByZXR1cm5zIHtPZmZzZXR9XG4gICAqL1xuICBmdW5jdGlvbiBnZXRPZmZzZXQoZWxlbWVudCwgZXhjbHVkZUVsZW1lbnRCb3JkZXJzKSB7XG5cbiAgICB2YXIgcmVjdDtcbiAgICB2YXIgcmV0ID0ge1xuICAgICAgbGVmdDogMCxcbiAgICAgIHRvcDogMFxuICAgIH07XG5cbiAgICAvLyBEb2N1bWVudCdzIG9mZnNldHMgYXJlIGFsd2F5cyAwLlxuICAgIGlmIChlbGVtZW50ID09PSBkb2MpIHtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLy8gQWRkIHZpZXdwb3J0J3Mgc2Nyb2xsIGxlZnQvdG9wIHRvIHRoZSByZXNwZWN0aXZlIG9mZnNldHMuXG4gICAgcmV0LmxlZnQgPSBnbG9iYWwucGFnZVhPZmZzZXQgfHwgMDtcbiAgICByZXQudG9wID0gZ2xvYmFsLnBhZ2VZT2Zmc2V0IHx8IDA7XG5cbiAgICAvLyBXaW5kb3cncyBvZmZzZXRzIGFyZSB0aGUgdmlld3BvcnQncyBzY3JvbGwgbGVmdC90b3AgdmFsdWVzLlxuICAgIGlmIChlbGVtZW50LnNlbGYgPT09IGdsb2JhbC5zZWxmKSB7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIC8vIEFkZCBlbGVtZW50J3MgY2xpZW50IHJlY3RzIHRvIHRoZSBvZmZzZXRzLlxuICAgIHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldC5sZWZ0ICs9IHJlY3QubGVmdDtcbiAgICByZXQudG9wICs9IHJlY3QudG9wO1xuXG4gICAgLy8gRXhjbHVkZSBlbGVtZW50J3MgYm9yZGVycyBmcm9tIHRoZSBvZmZzZXQgaWYgbmVlZGVkLlxuICAgIGlmIChleGNsdWRlRWxlbWVudEJvcmRlcnMpIHtcbiAgICAgIHJldC5sZWZ0ICs9IGdldFN0eWxlQXNGbG9hdChlbGVtZW50LCAnYm9yZGVyLWxlZnQtd2lkdGgnKTtcbiAgICAgIHJldC50b3AgKz0gZ2V0U3R5bGVBc0Zsb2F0KGVsZW1lbnQsICdib3JkZXItdG9wLXdpZHRoJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcblxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYWFic29sdXRlIHBvc2l0aW9uZWQgZWxlbWVudCdzIGNvbnRhaW5pbmcgYmxvY2ssIHdoaWNoIGlzXG4gICAqIGNvbnNpZGVyZWQgdG8gYmUgdGhlIGNsb3Nlc3QgYW5jZXN0b3IgZWxlbWVudCB0aGF0IHRoZSB0YXJnZXQgZWxlbWVudCdzXG4gICAqIHBvc2l0aW9uaW5nIGlzIHJlbGF0aXZlIHRvLiBEaXNjbGFpbWVyOiB0aGlzIG9ubHkgd29ya3MgYXMgaW50ZW5kZWQgZm9yXG4gICAqIGFib2x1dGUgcG9zaXRpb25lZCBlbGVtZW50cy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtpc1BhcmVudD1mYWxzZV1cbiAgICogICAtIFdoZW4gdGhpcyBpcyBzZXQgdG8gdHJ1ZSB0aGUgY29udGFpbmluZyBibG9jayBjaGVja2luZyBpcyBzdGFydGVkIGZyb21cbiAgICogICAgIHRoZSBwcm92aWRlZCBlbGVtZW50LiBPdGhlcndpc2UgdGhlIGNoZWNraW5nIGlzIHN0YXJ0ZWQgZnJvbSB0aGVcbiAgICogICAgIHByb3ZpZGVkIGVsZW1lbnQncyBwYXJlbnQgZWxlbWVudC5cbiAgICogQHJldHVybnMgeyhEb2N1bWVudHxFbGVtZW50KX1cbiAgICovXG4gIGZ1bmN0aW9uIGdldENvbnRhaW5pbmdCbG9jayhlbGVtZW50LCBpc1BhcmVudCkge1xuXG4gICAgLy8gQXMgbG9uZyBhcyB0aGUgY29udGFpbmluZyBibG9jayBpcyBhbiBlbGVtZW50LCBzdGF0aWMgYW5kIG5vdFxuICAgIC8vIHRyYW5zZm9ybWVkLCB0cnkgdG8gZ2V0IHRoZSBlbGVtZW50J3MgcGFyZW50IGVsZW1lbnQgYW5kIGZhbGxiYWNrIHRvXG4gICAgLy8gZG9jdW1lbnQuIGh0dHBzOi8vZ2l0aHViLmNvbS9uaWtsYXNyYW1vL21lenIvYmxvYi8wLjYuMS9tZXpyLmpzI0wzMzlcbiAgICB2YXIgcmV0ID0gKGlzUGFyZW50ID8gZWxlbWVudCA6IGVsZW1lbnQucGFyZW50RWxlbWVudCkgfHwgZG9jO1xuICAgIHdoaWxlIChyZXQgJiYgcmV0ICE9PSBkb2MgJiYgZ2V0U3R5bGUocmV0LCAncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycgJiYgIWlzVHJhbnNmb3JtZWQocmV0KSkge1xuICAgICAgcmV0ID0gcmV0LnBhcmVudEVsZW1lbnQgfHwgZG9jO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZWxlbWVudCdzIHNjcm9sbCBwYXJlbnRzLlxuICAgKlxuICAgKiBCb3Jyb3dlZCBmcm9tIGpRdWVyeSBVSSBsaWJyYXJ5IChhbmQgaGVhdmlseSBtb2RpZmllZCk6XG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5LXVpL2Jsb2IvNjM0NDgxNDhhMjE3ZGE3ZTY0YzA0YjIxYTA0OTgyZjBkNlxuICAgKiA0YWFiYWEvdWkvc2Nyb2xsLXBhcmVudC5qc1xuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAqIEByZXR1cm5zIHtIVE1MRWxlbWVudFtdfVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0U2Nyb2xsUGFyZW50cyhlbGVtZW50KSB7XG5cbiAgICB2YXIgcmV0ID0gW107XG4gICAgdmFyIG92ZXJmbG93UmVnZXggPSAvKGF1dG98c2Nyb2xsKS87XG4gICAgdmFyIHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcblxuICAgIC8vIElmIHRyYW5zZm9ybWVkIGVsZW1lbnRzIGxlYWsgZml4ZWQgZWxlbWVudHMuXG4gICAgaWYgKHRyYW5zZm9ybUxlYWtzRml4ZWQpIHtcblxuICAgICAgLy8gSWYgdGhlIGVsZW1lbnQgaXMgZml4ZWQgaXQgY2FuIG5vdCBoYXZlIGFueSBzY3JvbGwgcGFyZW50cy5cbiAgICAgIGlmIChnZXRTdHlsZShlbGVtZW50LCAncG9zaXRpb24nKSA9PT0gJ2ZpeGVkJykge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuXG4gICAgICAvLyBGaW5kIHNjcm9sbCBwYXJlbnRzLlxuICAgICAgd2hpbGUgKHBhcmVudCAmJiBwYXJlbnQgIT09IGRvYyAmJiBwYXJlbnQgIT09IGRvY0VsZW0pIHtcbiAgICAgICAgaWYgKG92ZXJmbG93UmVnZXgudGVzdChnZXRTdHlsZShwYXJlbnQsICdvdmVyZmxvdycpICsgZ2V0U3R5bGUocGFyZW50LCAnb3ZlcmZsb3cteScpICsgZ2V0U3R5bGUocGFyZW50LCAnb3ZlcmZsb3cteCcpKSkge1xuICAgICAgICAgIHJldC5wdXNoKHBhcmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50ID0gZ2V0U3R5bGUocGFyZW50LCAncG9zaXRpb24nKSA9PT0gJ2ZpeGVkJyA/IG51bGwgOiBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgcGFyZW50IGlzIG5vdCBmaXhlZCBlbGVtZW50LCBhZGQgd2luZG93IG9iamVjdCBhcyB0aGUgbGFzdCBzY3JvbGxcbiAgICAgIC8vIHBhcmVudC5cbiAgICAgIHBhcmVudCAhPT0gbnVsbCAmJiByZXQucHVzaChnbG9iYWwpO1xuXG4gICAgfVxuICAgIC8vIElmIGZpeGVkIGVsZW1lbnRzIGJlaGF2ZSBhcyBkZWZpbmVkIGluIHRoZSBXM0Mgc3BlY2lmaWNhdGlvbi5cbiAgICBlbHNlIHtcblxuICAgICAgLy8gRmluZCBzY3JvbGwgcGFyZW50cy5cbiAgICAgIHdoaWxlIChwYXJlbnQgJiYgcGFyZW50ICE9PSBkb2MpIHtcblxuICAgICAgICAvLyBJZiB0aGUgY3VycmVudGx5IGxvb3BlZCBlbGVtZW50IGlzIGZpeGVkIGlnbm9yZSBhbGwgcGFyZW50cyB0aGF0IGFyZVxuICAgICAgICAvLyBub3QgdHJhbnNmb3JtZWQuXG4gICAgICAgIGlmIChnZXRTdHlsZShlbGVtZW50LCAncG9zaXRpb24nKSA9PT0gJ2ZpeGVkJyAmJiAhaXNUcmFuc2Zvcm1lZChwYXJlbnQpKSB7XG4gICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgdGhlIHBhcmVudCBlbGVtZW50IHRvIHJldHVybiBpdGVtcyBpZiBpdCBpcyBzY3JvbGxhYmxlLlxuICAgICAgICBpZiAob3ZlcmZsb3dSZWdleC50ZXN0KGdldFN0eWxlKHBhcmVudCwgJ292ZXJmbG93JykgKyBnZXRTdHlsZShwYXJlbnQsICdvdmVyZmxvdy15JykgKyBnZXRTdHlsZShwYXJlbnQsICdvdmVyZmxvdy14JykpKSB7XG4gICAgICAgICAgcmV0LnB1c2gocGFyZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVwZGF0ZSBlbGVtZW50IGFuZCBwYXJlbnQgcmVmZXJlbmNlcy5cbiAgICAgICAgZWxlbWVudCA9IHBhcmVudDtcbiAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG5cbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhlIGxhc3QgaXRlbSBpcyB0aGUgcm9vdCBlbGVtZW50LCByZXBsYWNlIGl0IHdpdGggdGhlIGdsb2JhbFxuICAgICAgLy8gb2JqZWN0ICh3aW5kb3cpLiBUaGUgcm9vdCBlbGVtZW50IHNjcm9sbCBpcyBwcm9wYWdhdGVkIHRvIHRoZSB3aW5kb3cuXG4gICAgICBpZiAocmV0W3JldC5sZW5ndGggLSAxXSA9PT0gZG9jRWxlbSkge1xuICAgICAgICByZXRbcmV0Lmxlbmd0aCAtIDFdID0gZ2xvYmFsO1xuICAgICAgfVxuXG4gICAgICAvLyBPdGhlcndpc2UgYWRkIGdsb2JhbCBvYmplY3QgKHdpbmRvdykgYXMgdGhlIGxhc3Qgc2Nyb2xsIHBhcmVudC5cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXQucHVzaChnbG9iYWwpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcblxuICB9XG5cbiAgLyoqXG4gICAqIERldGVjdHMgaWYgdHJhbnNmb3JtZWQgZWxlbWVudHMgbGVhayBmaXhlZCBlbGVtZW50cy4gQWNjb3JkaW5nIFczQ1xuICAgKiB0cmFuc2Zvcm0gcmVuZGVyaW5nIHNwZWMgYSB0cmFuc2Zvcm1lZCBlbGVtZW50IHNob3VsZCBjb250YWluIGV2ZW4gZml4ZWRcbiAgICogZWxlbWVudHMuIE1lYW5pbmcgdGhhdCBmaXhlZCBlbGVtZW50cyBhcmUgcG9zaXRpb25lZCByZWxhdGl2ZSB0byB0aGVcbiAgICogY2xvc2VzdCB0cmFuc2Zvcm1lZCBhbmNlc3RvciBlbGVtZW50IGluc3RlYWQgb2Ygd2luZG93LiBIb3dldmVyLCBub3QgZXZlcnlcbiAgICogYnJvd3NlciBmb2xsb3dzIHRoZSBzcGVjIChJRSBhbmQgb2xkZXIgRmlyZWZveCkuIFNvIHdlIG5lZWQgdG8gdGVzdCBpdC5cbiAgICogaHR0cHM6Ly93d3cudzMub3JnL1RSL2NzczMtMmQtdHJhbnNmb3Jtcy8jdHJhbnNmb3JtLXJlbmRlcmluZ1xuICAgKlxuICAgKiBCb3Jyb3dlZCBmcm9tIE1lenIgKHYwLjYuMSk6XG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9uaWtsYXNyYW1vL21lenIvYmxvYi8wLjYuMS9tZXpyLmpzI0w2MDdcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqICAgLSBSZXR1cm5zIHRydWUgaWYgdHJhbnNmb3JtZWQgZWxlbWVudHMgbGVhayBmaXhlZCBlbGVtZW50cywgZmFsc2VcbiAgICogICAgIG90aGVyd2lzZS5cbiAgICovXG4gIGZ1bmN0aW9uIGRvZXNUcmFuc2Zvcm1MZWFrRml4ZWQoKSB7XG5cbiAgICBpZiAoIXRyYW5zZm9ybSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGVsZW1zID0gWzAsIDFdLm1hcChmdW5jdGlvbiAoZWxlbSwgaXNJbm5lcikge1xuICAgICAgZWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHNldFN0eWxlcyhlbGVtLCB7XG4gICAgICAgIHBvc2l0aW9uOiBpc0lubmVyID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZScsXG4gICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuICAgICAgICBsZWZ0OiBpc0lubmVyID8gJzBweCcgOiAnMXB4JyxcbiAgICAgICAgdHJhbnNmb3JtOiAnbm9uZSdcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGVsZW07XG4gICAgfSk7XG4gICAgdmFyIG91dGVyID0gYm9keS5hcHBlbmRDaGlsZChlbGVtc1swXSk7XG4gICAgdmFyIGlubmVyID0gb3V0ZXIuYXBwZW5kQ2hpbGQoZWxlbXNbMV0pO1xuICAgIHZhciBsZWZ0ID0gaW5uZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICBzZXRTdHlsZXMob3V0ZXIsIHt0cmFuc2Zvcm06ICdzY2FsZSgxKSd9KTtcbiAgICB2YXIgaXNMZWFraW5nID0gbGVmdCA9PT0gaW5uZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICBib2R5LnJlbW92ZUNoaWxkKG91dGVyKTtcblxuICAgIHJldHVybiBpc0xlYWtpbmc7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgZWxlbWVudCBpcyB0cmFuc2Zvcm1lZCwgZmFsc2UgaWYgbm90LiBJbiBwcmFjdGljZSB0aGVcbiAgICogZWxlbWVudCdzIGRpc3BsYXkgdmFsdWUgbXVzdCBiZSBhbnl0aGluZyBlbHNlIHRoYW4gXCJub25lXCIgb3IgXCJpbmxpbmVcIiBhc1xuICAgKiB3ZWxsIGFzIGhhdmUgYSB2YWxpZCB0cmFuc2Zvcm0gdmFsdWUgYXBwbGllZCBpbiBvcmRlciB0byBiZSBjb3VudGVkIGFzIGFcbiAgICogdHJhbnNmb3JtZWQgZWxlbWVudC5cbiAgICpcbiAgICogQm9ycm93ZWQgZnJvbSBNZXpyICh2MC42LjEpOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vbmlrbGFzcmFtby9tZXpyL2Jsb2IvMC42LjEvbWV6ci5qcyNMNjYxXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBmdW5jdGlvbiBpc1RyYW5zZm9ybWVkKGVsZW1lbnQpIHtcblxuICAgIHZhciB0cmFuc2Zvcm0gPSBnZXRTdHlsZShlbGVtZW50LCAndHJhbnNmb3JtJyk7XG4gICAgdmFyIGRpc3BsYXkgPSBnZXRTdHlsZShlbGVtZW50LCAnZGlzcGxheScpO1xuXG4gICAgcmV0dXJuIHRyYW5zZm9ybSAhPT0gJ25vbmUnICYmIGRpc3BsYXkgIT09ICdpbmxpbmUnICYmIGRpc3BsYXkgIT09ICdub25lJztcblxuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSBob3cgbWFueSBwZXJjZW50IHRoZSBpbnRlcnNlY3Rpb24gYXJlYSBvZiB0d28gcmVjdGFuZ2xlcyBpcyBmcm9tXG4gICAqIHRoZSBtYXhpbXVtIHBvdGVudGlhbCBpbnRlcnNlY3Rpb24gYXJlYSBiZXR3ZWVuIHRoZSByZWN0YW5nbGVzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge1JlY3RhbmdsZX0gYVxuICAgKiBAcGFyYW0ge1JlY3RhbmdsZX0gYlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgKiAgIC0gQSBudW1iZXIgYmV0d2VlbiAwLTEwMC5cbiAgICovXG4gIGZ1bmN0aW9uIGdldFJlY3RPdmVybGFwU2NvcmUoYSwgYikge1xuXG4gICAgLy8gUmV0dXJuIDAgaW1tZWRpYXRlbHkgaWYgdGhlIHJlY3RhbmdsZXMgZG8gbm90IG92ZXJsYXAuXG4gICAgaWYgKCFtdXVyaUxheW91dC5kb1JlY3RzT3ZlcmxhcChhLCBiKSkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgLy8gQ2FsY3VsYXRlIGludGVyc2VjdGlvbiBhcmVhJ3Mgd2lkdGgsIGhlaWdodCwgbWF4IGhlaWdodCBhbmQgbWF4IHdpZHRoLlxuICAgIHZhciB3aWR0aCA9IE1hdGgubWluKGEubGVmdCArIGEud2lkdGgsIGIubGVmdCArIGIud2lkdGgpIC0gTWF0aC5tYXgoYS5sZWZ0LCBiLmxlZnQpO1xuICAgIHZhciBoZWlnaHQgPSBNYXRoLm1pbihhLnRvcCArIGEuaGVpZ2h0LCBiLnRvcCArIGIuaGVpZ2h0KSAtIE1hdGgubWF4KGEudG9wLCBiLnRvcCk7XG4gICAgdmFyIG1heFdpZHRoID0gTWF0aC5taW4oYS53aWR0aCwgYi53aWR0aCk7XG4gICAgdmFyIG1heEhlaWdodCA9IE1hdGgubWluKGEuaGVpZ2h0LCBiLmhlaWdodCk7XG5cbiAgICByZXR1cm4gKHdpZHRoICogaGVpZ2h0KSAvIChtYXhXaWR0aCAqIG1heEhlaWdodCkgKiAxMDA7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXJzIC0gSXRlbSBzb3J0IHV0aWxpdGllc1xuICAgKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKi9cblxuICAvKipcbiAgICogSGVscGVyIGZvciB0aGUgc29ydCBtZXRob2QgdG8gZ2VuZXJhdGUgbWFwcGVkIHZlcnNpb24gb2YgdGhlIGl0ZW1zIGFycmF5XG4gICAqIHRoYW4gY29udGFpbnMgcmVmZXJlbmNlIHRvIHRoZSBpdGVtIGluZGljZXMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7SXRlbVtdfSBpdGVtc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SXRlbUluZGV4TWFwKGl0ZW1zKSB7XG5cbiAgICB2YXIgcmV0ID0ge307XG4gICAgdmFyIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJldFtpdGVtc1tpXS5faWRdID0gaTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuXG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIGZvciB0aGUgc29ydCBtZXRob2QgdG8gY29tcGFyZSB0aGUgaW5kaWNlcyBvZiB0aGUgaXRlbXMgdG8gZW5mb3JjZVxuICAgKiBzdGFibGUgc29ydC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtJdGVtfSBpdGVtQVxuICAgKiBAcGFyYW0ge0l0ZW19IGl0ZW1CXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNEZXNjZW5kaW5nXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBpbmRleE1hcFxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgKi9cbiAgZnVuY3Rpb24gY29tcGFyZUl0ZW1JbmRpY2VzKGl0ZW1BLCBpdGVtQiwgaXNEZXNjZW5kaW5nLCBpbmRleE1hcCkge1xuXG4gICAgdmFyIGluZGV4QSA9IGluZGV4TWFwW2l0ZW1BLl9pZF07XG4gICAgdmFyIGluZGV4QiA9IGluZGV4TWFwW2l0ZW1CLl9pZF07XG4gICAgcmV0dXJuIGlzRGVzY2VuZGluZyA/IGluZGV4QiAtIGluZGV4QSA6IGluZGV4QSAtIGluZGV4QjtcblxuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciBmb3IgdGhlIHNvcnQgbWV0aG9kIHRvIGNvbXBhcmUgdGhlIGl0ZW1zIGJhc2VkIG9uIHRoZSBwcm92aWRlZFxuICAgKiBhdHRyaWJ1dGVzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0l0ZW19IGl0ZW1BXG4gICAqIEBwYXJhbSB7SXRlbX0gaXRlbUJcbiAgICogQHBhcmFtIHtCb29sZWFufSBpc0Rlc2NlbmRpbmdcbiAgICogQHBhcmFtIHtPYmplY3R9IGNyaXRlcmlhc1xuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgKi9cbiAgZnVuY3Rpb24gY29tcGFyZUl0ZW1zKGl0ZW1BLCBpdGVtQiwgaXNEZXNjZW5kaW5nLCBjcml0ZXJpYXMpIHtcblxuICAgIHZhciByZXQgPSAwO1xuICAgIHZhciBjcml0ZXJpYU5hbWU7XG4gICAgdmFyIGNyaXRlcmlhT3JkZXI7XG4gICAgdmFyIHZhbEE7XG4gICAgdmFyIHZhbEI7XG4gICAgdmFyIGk7XG5cbiAgICAvLyBMb29wIHRocm91Z2ggdGhlIGxpc3Qgb2Ygc29ydCBjcml0ZXJpYXMuXG4gICAgZm9yIChpID0gMDsgaSA8IGNyaXRlcmlhcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAvLyBHZXQgdGhlIGNyaXRlcmlhIG5hbWUsIHdoaWNoIHNob3VsZCBtYXRjaCBhbiBpdGVtJ3Mgc29ydCBkYXRhIGtleS5cbiAgICAgIGNyaXRlcmlhTmFtZSA9IGNyaXRlcmlhc1tpXVswXTtcbiAgICAgIGNyaXRlcmlhT3JkZXIgPSBjcml0ZXJpYXNbaV1bMV07XG5cbiAgICAgIC8vIEdldCBpdGVtcycgY2FjaGVkIHNvcnQgdmFsdWVzIGZvciB0aGUgY3JpdGVyaWEuIElmIHRoZSBpdGVtIGhhcyBubyBzb3J0XG4gICAgICAvLyBkYXRhIGxldCdzIHVwZGF0ZSB0aGUgaXRlbXMgc29ydCBkYXRhICh0aGlzIGlzIGEgbGF6eSBsb2FkIG1lY2hhbmlzbSkuXG4gICAgICB2YWxBID0gKGl0ZW1BLl9zb3J0RGF0YSA/IGl0ZW1BIDogaXRlbUEuX3JlZnJlc2hTb3J0RGF0YSgpKS5fc29ydERhdGFbY3JpdGVyaWFOYW1lXTtcbiAgICAgIHZhbEIgPSAoaXRlbUIuX3NvcnREYXRhID8gaXRlbUIgOiBpdGVtQi5fcmVmcmVzaFNvcnREYXRhKCkpLl9zb3J0RGF0YVtjcml0ZXJpYU5hbWVdO1xuXG4gICAgICAvLyBTb3J0IHRoZSBpdGVtcyBpbiBkZXNjZW5kaW5nIG9yZGVyIGlmIGRlZmluZWQgc28gZXhwbGljaXRseS5cbiAgICAgIGlmIChjcml0ZXJpYU9yZGVyID09PSAnZGVzYycgfHwgKCFjcml0ZXJpYU9yZGVyICYmIGlzRGVzY2VuZGluZykpIHtcbiAgICAgICAgcmV0ID0gdmFsQiA8IHZhbEEgPyAtMSA6IHZhbEIgPiB2YWxBID8gMSA6IDA7XG4gICAgICB9XG5cbiAgICAgIC8vIE90aGVyd2lzZSBzb3J0IGl0ZW1zIGluIGFzY2VuZGluZyBvcmRlci5cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXQgPSB2YWxBIDwgdmFsQiA/IC0xIDogdmFsQSA+IHZhbEIgPyAxIDogMDtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgd2UgaGF2ZSAtMSBvciAxIGFzIHRoZSByZXR1cm4gdmFsdWUsIGxldCdzIHJldHVybiBpdCBpbW1lZGlhdGVseS5cbiAgICAgIGlmIChyZXQgIT09IDApIHtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW9yZGVyIGFuIGFycmF5IG9mIGl0ZW1zIGJhc2VkIG9uIGFub3RoZXIgYXJyYXkgb2YgaXRlbXMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7SXRlbVtdfSBpdGVtc1xuICAgKiBAcGFyYW0ge0l0ZW1bXX0gcmVmSXRlbXNcbiAgICogQHJldHVybnMge0l0ZW1bXX1cbiAgICovXG4gIGZ1bmN0aW9uIHNvcnRJdGVtc0J5UmVmZXJlbmNlKGl0ZW1zLCByZWZJdGVtcykge1xuXG4gICAgdmFyIG5ld0l0ZW1zID0gW107XG4gICAgdmFyIGN1cnJlbnRJdGVtcyA9IGl0ZW1zLmNvbmNhdCgpO1xuICAgIHZhciBpdGVtO1xuICAgIHZhciBjdXJyZW50SW5kZXg7XG4gICAgdmFyIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgcmVmSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGl0ZW0gPSByZWZJdGVtc1tpXTtcbiAgICAgIGN1cnJlbnRJbmRleCA9IGN1cnJlbnRJdGVtcy5pbmRleE9mKGl0ZW0pO1xuICAgICAgaWYgKGN1cnJlbnRJbmRleCA+IC0xKSB7XG4gICAgICAgIG5ld0l0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgIGN1cnJlbnRJdGVtcy5zcGxpY2UoY3VycmVudEluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpdGVtcy5zcGxpY2UuYXBwbHkoaXRlbXMsIFswLCBpdGVtcy5sZW5ndGhdLmNvbmNhdChuZXdJdGVtcykuY29uY2F0KGN1cnJlbnRJdGVtcykpO1xuXG4gICAgcmV0dXJuIGl0ZW1zO1xuXG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSBwb2ludCAoY29vcmRpbmF0ZSkgaXMgd2l0aGluIGEgcmVjdGFuZ2xlLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge051bWJlcn0geFxuICAgKiBAcGFyYW0ge051bWJlcn0geVxuICAgKiBAcGFyYW0ge1JlY3RhbmdsZX0gcmVjdFxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgZnVuY3Rpb24gaXNQb2ludFdpdGhpblJlY3QoeCwgeSwgcmVjdCkge1xuXG4gICAgcmV0dXJuIHJlY3Qud2lkdGhcbiAgICAgICYmIHJlY3QuaGVpZ2h0XG4gICAgICAmJiB4ID49IHJlY3QubGVmdFxuICAgICAgJiYgeCA8IChyZWN0LmxlZnQgKyByZWN0LndpZHRoKVxuICAgICAgJiYgeSA+PSByZWN0LnRvcFxuICAgICAgJiYgeSA8IChyZWN0LnRvcCArIHJlY3QuaGVpZ2h0KTtcblxuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlcnMgLSBNdXVyaVxuICAgKiAqKioqKioqKioqKioqKipcbiAgICovXG5cbiAgLyoqXG4gICAqIFNob3cgb3IgaGlkZSBHcmlkIGluc3RhbmNlJ3MgaXRlbXMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7R3JpZH0gaW5zdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gICAqICAgLSBcInNob3dcIiBvciBcImhpZGVcIi5cbiAgICogQHBhcmFtIHsoR3JpZE11bHRpSXRlbVF1ZXJ5fEdyaWRJdGVtU3RhdGUpfSBpdGVtc1xuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuaW5zdGFudD1mYWxzZV1cbiAgICogQHBhcmFtIHsoU2hvd0NhbGxiYWNrfEhpZGVDYWxsYmFjayl9IFtvcHRpb25zLm9uRmluaXNoXVxuICAgKiBAcGFyYW0geyhCb29sZWFufExheW91dENhbGxiYWNrfFN0cmluZyl9IFtvcHRpb25zLmxheW91dD10cnVlXVxuICAgKiBAcmV0dXJucyB7R3JpZH1cbiAgICovXG4gIGZ1bmN0aW9uIGdyaWRTaG93SGlkZUhhbmRsZXIoaW5zdCwgbWV0aG9kLCBpdGVtcywgb3B0aW9ucykge1xuXG4gICAgdmFyIHRhcmdldEl0ZW1zID0gaW5zdC5nZXRJdGVtcyhpdGVtcyk7XG4gICAgdmFyIG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHZhciBpc0luc3RhbnQgPSBvcHRzLmluc3RhbnQgPT09IHRydWU7XG4gICAgdmFyIGNhbGxiYWNrID0gb3B0cy5vbkZpbmlzaDtcbiAgICB2YXIgbGF5b3V0ID0gb3B0cy5sYXlvdXQgPyBvcHRzLmxheW91dCA6IG9wdHMubGF5b3V0ID09PSB1bmRlZmluZWQ7XG4gICAgdmFyIGNvdW50ZXIgPSB0YXJnZXRJdGVtcy5sZW5ndGg7XG4gICAgdmFyIGlzU2hvdyA9IG1ldGhvZCA9PT0gJ3Nob3cnO1xuICAgIHZhciBzdGFydEV2ZW50ID0gaXNTaG93ID8gZXZTaG93U3RhcnQgOiBldkhpZGVTdGFydDtcbiAgICB2YXIgZW5kRXZlbnQgPSBpc1Nob3cgPyBldlNob3dFbmQgOiBldkhpZGVFbmQ7XG4gICAgdmFyIG5lZWRzTGF5b3V0ID0gZmFsc2U7XG4gICAgdmFyIGNvbXBsZXRlZEl0ZW1zID0gW107XG4gICAgdmFyIGhpZGRlbkl0ZW1zID0gW107XG4gICAgdmFyIGl0ZW07XG4gICAgdmFyIGk7XG5cbiAgICAvLyBJZiB0aGVyZSBhcmUgbm8gaXRlbXMgY2FsbCB0aGUgY2FsbGJhY2ssIGJ1dCBkb24ndCBlbWl0IGFueSBldmVudHMuXG4gICAgaWYgKCFjb3VudGVyKSB7XG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSB0eXBlRnVuY3Rpb24pIHtcbiAgICAgICAgY2FsbGJhY2sodGFyZ2V0SXRlbXMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE90aGVyd2lzZSBpZiB3ZSBoYXZlIHNvbWUgaXRlbXMgbGV0J3MgZGlnIGluLlxuICAgIGVsc2Uge1xuXG4gICAgICAvLyBFbWl0IHNob3dTdGFydC9oaWRlU3RhcnQgZXZlbnQuXG4gICAgICBpbnN0Ll9lbWl0KHN0YXJ0RXZlbnQsIHRhcmdldEl0ZW1zLmNvbmNhdCgpKTtcblxuICAgICAgLy8gU2hvdy9oaWRlIGl0ZW1zLlxuICAgICAgZm9yIChpID0gMDsgaSA8IHRhcmdldEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgaXRlbSA9IHRhcmdldEl0ZW1zW2ldO1xuXG4gICAgICAgIC8vIElmIGluYWN0aXZlIGl0ZW0gaXMgc2hvd24gb3IgYWN0aXZlIGl0ZW0gaXMgaGlkZGVuIHdlIG5lZWQgdG8gZG9cbiAgICAgICAgLy8gbGF5b3V0LlxuICAgICAgICBpZiAoKGlzU2hvdyAmJiAhaXRlbS5faXNBY3RpdmUpIHx8ICghaXNTaG93ICYmIGl0ZW0uX2lzQWN0aXZlKSkge1xuICAgICAgICAgIG5lZWRzTGF5b3V0ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIGluYWN0aXZlIGl0ZW0gaXMgc2hvd24gd2UgYWxzbyBuZWVkIHRvIGRvIHNvbWUgc3BlY2lhbCBoYWNrZXJ5IHRvXG4gICAgICAgIC8vIG1ha2UgdGhlIGl0ZW0gbm90IGFuaW1hdGUgaXQncyBuZXh0IHBvc2l0aW9uaW5nIChsYXlvdXQpLlxuICAgICAgICBpZiAoaXNTaG93ICYmICFpdGVtLl9pc0FjdGl2ZSkge1xuICAgICAgICAgIGl0ZW0uX3NraXBOZXh0TGF5b3V0QW5pbWF0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZSBhIGhpZGRlbiBpdGVtIGlzIGJlaW5nIHNob3duIHdlIG5lZWQgdG8gcmVmcmVzaCB0aGUgaXRlbSdzXG4gICAgICAgIC8vIGRpbWVuc2lvbnMuXG4gICAgICAgIGlzU2hvdyAmJiBpdGVtLl9pc0hpZGRlbiAmJiBoaWRkZW5JdGVtcy5wdXNoKGl0ZW0pO1xuXG4gICAgICAgIC8vIFNob3cvaGlkZSB0aGUgaXRlbS5cbiAgICAgICAgaXRlbVsnXycgKyBtZXRob2RdKGlzSW5zdGFudCwgZnVuY3Rpb24gKGludGVycnVwdGVkLCBpdGVtKSB7XG5cbiAgICAgICAgICAvLyBJZiB0aGUgY3VycmVudCBpdGVtJ3MgYW5pbWF0aW9uIHdhcyBub3QgaW50ZXJydXB0ZWQgYWRkIGl0IHRvIHRoZVxuICAgICAgICAgIC8vIGNvbXBsZXRlZEl0ZW1zIGFycmF5LlxuICAgICAgICAgIGlmICghaW50ZXJydXB0ZWQpIHtcbiAgICAgICAgICAgIGNvbXBsZXRlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gSWYgYWxsIGl0ZW1zIGhhdmUgZmluaXNoZWQgdGhlaXIgYW5pbWF0aW9ucyBjYWxsIHRoZSBjYWxsYmFja1xuICAgICAgICAgIC8vIGFuZCBlbWl0IHNob3dFbmQvaGlkZUVuZCBldmVudC5cbiAgICAgICAgICBpZiAoLS1jb3VudGVyIDwgMSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gdHlwZUZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKGNvbXBsZXRlZEl0ZW1zLmNvbmNhdCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc3QuX2VtaXQoZW5kRXZlbnQsIGNvbXBsZXRlZEl0ZW1zLmNvbmNhdCgpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH1cblxuICAgICAgLy8gUmVmcmVzaCBoaWRkZW4gaXRlbXMuXG4gICAgICBoaWRkZW5JdGVtcy5sZW5ndGggJiYgaW5zdC5yZWZyZXNoSXRlbXMoaGlkZGVuSXRlbXMpO1xuXG4gICAgICAvLyBMYXlvdXQgaWYgbmVlZGVkLlxuICAgICAgaWYgKG5lZWRzTGF5b3V0ICYmIGxheW91dCkge1xuICAgICAgICBpbnN0LmxheW91dChsYXlvdXQgPT09ICdpbnN0YW50JywgdHlwZW9mIGxheW91dCA9PT0gdHlwZUZ1bmN0aW9uID8gbGF5b3V0IDogdW5kZWZpbmVkKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBpbnN0O1xuXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBvYmplY3Qgd2hpY2ggY29udGFpbnMgc3RhcnQgYW5kIHN0b3AgbWV0aG9kcyBmb3IgaXRlbSdzXG4gICAqIHNob3cvaGlkZSBwcm9jZXNzLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge09iamVjdH0gc2V0dGluZ3NcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIGZ1bmN0aW9uIGdldEl0ZW1WaXNpYmlsaXR5SGFuZGxlcih0eXBlLCBzZXR0aW5ncykge1xuXG4gICAgdmFyIGlzU2hvdyA9IHR5cGUgPT09ICdzaG93JztcbiAgICB2YXIgZHVyYXRpb24gPSBwYXJzZUludChpc1Nob3cgPyBzZXR0aW5ncy5zaG93RHVyYXRpb24gOiBzZXR0aW5ncy5oaWRlRHVyYXRpb24pIHx8IDA7XG4gICAgdmFyIGVhc2luZyA9IChpc1Nob3cgPyBzZXR0aW5ncy5zaG93RWFzaW5nIDogc2V0dGluZ3MuaGlkZUVhc2luZykgfHwgJ2Vhc2UnO1xuICAgIHZhciBzdHlsZXMgPSBpc1Nob3cgPyBzZXR0aW5ncy52aXNpYmxlU3R5bGVzIDogc2V0dGluZ3MuaGlkZGVuU3R5bGVzO1xuICAgIHZhciBpc0VuYWJsZWQgPSBkdXJhdGlvbiA+IDA7XG4gICAgdmFyIGN1cnJlbnRTdHlsZXM7XG5cbiAgICBzdHlsZXMgPSBpc1BsYWluT2JqZWN0KHN0eWxlcykgPyBzdHlsZXMgOiBudWxsO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXJ0OiBmdW5jdGlvbiAoaXRlbSwgaW5zdGFudCwgb25GaW5pc2gpIHtcbiAgICAgICAgaWYgKCFzdHlsZXMpIHtcbiAgICAgICAgICBvbkZpbmlzaCAmJiBvbkZpbmlzaCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJhZkxvb3AuY2FuY2VsKHJhZlF1ZXVlVmlzaWJpbGl0eSwgaXRlbS5faWQpO1xuICAgICAgICAgIGlmICghaXNFbmFibGVkIHx8IGluc3RhbnQpIHtcbiAgICAgICAgICAgIGlmIChpdGVtLl9hbmltYXRlQ2hpbGQuaXNBbmltYXRpbmcoKSkge1xuICAgICAgICAgICAgICBpdGVtLl9hbmltYXRlQ2hpbGQuc3RvcChzdHlsZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHNldFN0eWxlcyhpdGVtLl9jaGlsZCwgc3R5bGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uRmluaXNoICYmIG9uRmluaXNoKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmFmTG9vcC5hZGQocmFmUXVldWVWaXNpYmlsaXR5LCBpdGVtLl9pZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBjdXJyZW50U3R5bGVzID0gZ2V0Q3VycmVudFN0eWxlcyhpdGVtLl9jaGlsZCwgc3R5bGVzKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgaXRlbS5fYW5pbWF0ZUNoaWxkLnN0YXJ0KGN1cnJlbnRTdHlsZXMsIHN0eWxlcywge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgICBlYXNpbmc6IGVhc2luZyxcbiAgICAgICAgICAgICAgICBvbkZpbmlzaDogb25GaW5pc2hcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzdG9wOiBmdW5jdGlvbiAoaXRlbSwgdGFyZ2V0U3R5bGVzKSB7XG4gICAgICAgIHJhZkxvb3AuY2FuY2VsKHJhZlF1ZXVlVmlzaWJpbGl0eSwgaXRlbS5faWQpO1xuICAgICAgICBpdGVtLl9hbmltYXRlQ2hpbGQuc3RvcCh0YXJnZXRTdHlsZXMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGFyZ2V0IGdyaWQgZm9yIHRoZSBkZWZhdWx0IGRyYWcgc29ydCBwcmVkaWNhdGUuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7SXRlbX0gaXRlbVxuICAgKiBAcGFyYW0ge0dyaWR9IHJvb3RHcmlkXG4gICAqIEBwYXJhbSB7UmVjdGFuZ2xlfSBpdGVtUmVjdFxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhyZXNob2xkXG4gICAqIEByZXR1cm5zIHs/R3JpZH1cbiAgICovXG4gIGZ1bmN0aW9uIGdldFRhcmdldEdyaWQoaXRlbSwgcm9vdEdyaWQsIGl0ZW1SZWN0LCB0aHJlc2hvbGQpIHtcblxuICAgIHZhciByZXQgPSBudWxsO1xuICAgIHZhciBkcmFnU29ydCA9IHJvb3RHcmlkLl9zZXR0aW5ncy5kcmFnU29ydDtcbiAgICB2YXIgZ3JpZHMgPSBkcmFnU29ydCA9PT0gdHJ1ZSA/IFtyb290R3JpZF0gOiBkcmFnU29ydC5jYWxsKHJvb3RHcmlkLCBpdGVtKTtcbiAgICB2YXIgYmVzdFNjb3JlID0gLTE7XG4gICAgdmFyIGdyaWRTY29yZTtcbiAgICB2YXIgZ3JpZDtcbiAgICB2YXIgaTtcblxuICAgIC8vIFJldHVybiBpbW1lZGlhdGVseSBpZiB0aGVyZSBhcmUgbm8gZ3JpZHMuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGdyaWRzKSkge1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICAvLyBMb29wIHRocm91Z2ggdGhlIGdyaWRzIGFuZCBnZXQgdGhlIGJlc3QgbWF0Y2guXG4gICAgZm9yIChpID0gMDsgaSA8IGdyaWRzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIGdyaWQgPSBncmlkc1tpXTtcblxuICAgICAgLy8gRmlsdGVyIG91dCBhbGwgZGVzdHJveWVkIGdyaWRzLlxuICAgICAgaWYgKGdyaWQuX2lzRGVzdHJveWVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBXZSBuZWVkIHRvIHVwZGF0ZSB0aGUgZ3JpZCdzIG9mZnNldCBzaW5jZSBpdCBtYXkgaGF2ZSBjaGFuZ2VkIGR1cmluZ1xuICAgICAgLy8gc2Nyb2xsaW5nLiBUaGlzIGNvdWxkIGJlIGxlZnQgYXMgcHJvYmxlbSBmb3IgdGhlIHVzZXJsYW5kLCBidXQgaXQnc1xuICAgICAgLy8gbXVjaCBuaWNlciB0aGlzIHdheS4gT25lIGxlc3MgaGFjayBmb3IgdGhlIHVzZXIgdG8gd29ycnkgYWJvdXQgPSlcbiAgICAgIGdyaWQuX3JlZnJlc2hEaW1lbnNpb25zKCk7XG5cbiAgICAgIC8vIENoZWNrIGhvdyBtdWNoIGRyYWdnZWQgZWxlbWVudCBvdmVybGFwcyB0aGUgY29udGFpbmVyIGVsZW1lbnQuXG4gICAgICBncmlkU2NvcmUgPSBnZXRSZWN0T3ZlcmxhcFNjb3JlKGl0ZW1SZWN0LCB7XG4gICAgICAgIHdpZHRoOiBncmlkLl93aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBncmlkLl9oZWlnaHQsXG4gICAgICAgIGxlZnQ6IGdyaWQuX2xlZnQsXG4gICAgICAgIHRvcDogZ3JpZC5fdG9wXG4gICAgICB9KTtcblxuICAgICAgLy8gQ2hlY2sgaWYgdGhpcyBncmlkIGlzIHRoZSBiZXN0IG1hdGNoIHNvIGZhci5cbiAgICAgIGlmIChncmlkU2NvcmUgPiB0aHJlc2hvbGQgJiYgZ3JpZFNjb3JlID4gYmVzdFNjb3JlKSB7XG4gICAgICAgIGJlc3RTY29yZSA9IGdyaWRTY29yZTtcbiAgICAgICAgcmV0ID0gZ3JpZDtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzIGl0ZW0ncyBjYWxsYmFjayBxdWV1ZS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBxdWV1ZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGludGVycnVwdGVkXG4gICAqIEBwYXJhbSB7SXRlbX0gaW5zdGFuY2VcbiAgICovXG4gIGZ1bmN0aW9uIHByb2Nlc3NRdWV1ZShxdWV1ZSwgaW50ZXJydXB0ZWQsIGluc3RhbmNlKSB7XG5cbiAgICB2YXIgY2FsbGJhY2tzID0gcXVldWUuc3BsaWNlKDAsIHF1ZXVlLmxlbmd0aCk7XG4gICAgdmFyIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjYWxsYmFja3NbaV0oaW50ZXJydXB0ZWQsIGluc3RhbmNlKTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBpdGVtIGlzIGluIHNwZWNpZmljIHN0YXRlLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0l0ZW19IGl0ZW1cbiAgICogQHBhcmFtIHtHcmlkSXRlbVN0YXRlfSBzdGF0ZVxuICAgKiAgLSBBY2NlcHRlZCB2YWx1ZXMgYXJlOiBcImFjdGl2ZVwiLCBcImluYWN0aXZlXCIsIFwidmlzaWJsZVwiLCBcImhpZGRlblwiLFxuICAgKiAgICBcInNob3dpbmdcIiwgXCJoaWRpbmdcIiwgXCJwb3NpdGlvbmluZ1wiLCBcImRyYWdnaW5nXCIsIFwicmVsZWFzaW5nXCIgYW5kXG4gICAqICAgIFwibWlncmF0aW5nXCIuXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgZnVuY3Rpb24gaXNJdGVtSW5TdGF0ZShpdGVtLCBzdGF0ZSkge1xuXG4gICAgdmFyIG1ldGhvZE5hbWU7XG5cbiAgICBpZiAoc3RhdGUgPT09ICdpbmFjdGl2ZScpIHtcbiAgICAgIHJldHVybiAhaXRlbS5pc0FjdGl2ZSgpO1xuICAgIH1cblxuICAgIGlmIChzdGF0ZSA9PT0gJ2hpZGRlbicpIHtcbiAgICAgIHJldHVybiAhaXRlbS5pc1Zpc2libGUoKTtcbiAgICB9XG5cbiAgICBtZXRob2ROYW1lID0gJ2lzJyArIHN0YXRlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RhdGUuc2xpY2UoMSk7XG5cbiAgICByZXR1cm4gdHlwZW9mIGl0ZW1bbWV0aG9kTmFtZV0gPT09IHR5cGVGdW5jdGlvbiA/IGl0ZW1bbWV0aG9kTmFtZV0oKSA6IGZhbHNlO1xuXG4gIH1cblxuICAvKipcbiAgICogUHJldmVudCBkZWZhdWx0LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gZVxuICAgKi9cbiAgZnVuY3Rpb24gcHJldmVudERlZmF1bHQoZSkge1xuXG4gICAgaWYgKGUucHJldmVudERlZmF1bHQpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXJnZSBkZWZhdWx0IHNldHRpbmdzIHdpdGggdXNlciBzZXR0aW5ncy4gVGhlIHJldHVybmVkIG9iamVjdCBpcyBhIG5ld1xuICAgKiBvYmplY3Qgd2l0aCBtZXJnZWQgdmFsdWVzLiBUaGUgbWVyZ2luZyBpcyBhIGRlZXAgbWVyZ2UgbWVhbmluZyB0aGF0IGFsbFxuICAgKiBvYmplY3RzIGFuZCBhcnJheXMgd2l0aGluIHRoZSBwcm92aWRlZCBzZXR0aW5ncyBvYmplY3RzIHdpbGwgYmUgYWxzbyBtZXJnZWRcbiAgICogc28gdGhhdCBtb2RpZnlpbmcgdGhlIHZhbHVlcyBvZiB0aGUgc2V0dGluZ3Mgb2JqZWN0IHdpbGwgaGF2ZSBubyBlZmZlY3Qgb25cbiAgICogdGhlIHJldHVybmVkIG9iamVjdC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRTZXR0aW5nc1xuICAgKiBAcGFyYW0ge09iamVjdH0gW3VzZXJTZXR0aW5nc11cbiAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBhIG5ldyBvYmplY3QuXG4gICAqL1xuICBmdW5jdGlvbiBtZXJnZVNldHRpbmdzKGRlZmF1bHRTZXR0aW5ncywgdXNlclNldHRpbmdzKSB7XG5cbiAgICAvLyBDcmVhdGUgYSBmcmVzaCBjb3B5IG9mIGRlZmF1bHQgc2V0dGluZ3MuXG4gICAgdmFyIHJldCA9IG1lcmdlT2JqZWN0cyh7fSwgZGVmYXVsdFNldHRpbmdzKTtcblxuICAgIC8vIE1lcmdlIHVzZXIgc2V0dGluZ3MgdG8gZGVmYXVsdCBzZXR0aW5ncy5cbiAgICByZXQgPSB1c2VyU2V0dGluZ3MgPyBtZXJnZU9iamVjdHMocmV0LCB1c2VyU2V0dGluZ3MpIDogcmV0O1xuXG4gICAgLy8gSGFuZGxlIHZpc2libGUvaGlkZGVuIHN0eWxlcyBtYW51YWxseSBzbyB0aGF0IHRoZSB3aG9sZSBvYmplY3QgaXNcbiAgICAvLyBvdmVycmlkZW4gaW5zdGVhZCBvZiB0aGUgcHJvcHMuXG4gICAgcmV0LnZpc2libGVTdHlsZXMgPSAodXNlclNldHRpbmdzIHx8IHt9KS52aXNpYmxlU3R5bGVzIHx8IChkZWZhdWx0U2V0dGluZ3MgfHwge30pLnZpc2libGVTdHlsZXM7XG4gICAgcmV0LmhpZGRlblN0eWxlcyA9ICh1c2VyU2V0dGluZ3MgfHwge30pLmhpZGRlblN0eWxlcyB8fCAoZGVmYXVsdFNldHRpbmdzIHx8IHt9KS5oaWRkZW5TdHlsZXM7XG5cbiAgICByZXR1cm4gcmV0O1xuXG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZXIgZm9yIGRlZmF1bHQgZHJhZyBzdGFydCBwcmVkaWNhdGUgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7SXRlbX0gaXRlbVxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBmdW5jdGlvbiBkcmFnU3RhcnRQcmVkaWNhdGVSZXNvbHZlKGl0ZW0sIGV2ZW50KSB7XG5cbiAgICB2YXIgcHJlZGljYXRlID0gaXRlbS5fZHJhZy5fc3RhcnRQcmVkaWNhdGVEYXRhO1xuICAgIHZhciBwb2ludGVyID0gZXZlbnQuY2hhbmdlZFBvaW50ZXJzWzBdO1xuICAgIHZhciBwYWdlWCA9IHBvaW50ZXIgJiYgcG9pbnRlci5wYWdlWCB8fCAwO1xuICAgIHZhciBwYWdlWSA9IHBvaW50ZXIgJiYgcG9pbnRlci5wYWdlWSB8fCAwO1xuICAgIHZhciBoYW5kbGVSZWN0O1xuXG4gICAgLy8gSWYgdGhlIG1vdmVkIGRpc3RhbmNlIGlzIHNtYWxsZXIgdGhhbiB0aGUgdGhyZXNob2xkIGRpc3RhbmNlIG9yIHRoZXJlIGlzXG4gICAgLy8gc29tZSBkZWxheSBsZWZ0LCBpZ25vcmUgdGhpcyBwcmVkaWNhdGUgY3ljbGUuXG4gICAgaWYgKGV2ZW50LmRpc3RhbmNlIDwgcHJlZGljYXRlLmRpc3RhbmNlIHx8IHByZWRpY2F0ZS5kZWxheSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEdldCBoYW5kbGUgcmVjdC5cbiAgICBoYW5kbGVSZWN0ID0gcHJlZGljYXRlLmhhbmRsZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAvLyBSZXNldCBwcmVkaWNhdGUgZGF0YS5cbiAgICBkcmFnU3RhcnRQcmVkaWNhdGVSZXNldChpdGVtKTtcblxuICAgIC8vIElmIHRoZSBjdXJzb3IgaXMgc3RpbGwgd2l0aGluIHRoZSBoYW5kbGUgbGV0J3Mgc3RhcnQgdGhlIGRyYWcuXG4gICAgcmV0dXJuIGlzUG9pbnRXaXRoaW5SZWN0KHBhZ2VYLCBwYWdlWSwge1xuICAgICAgd2lkdGg6IGhhbmRsZVJlY3Qud2lkdGgsXG4gICAgICBoZWlnaHQ6IGhhbmRsZVJlY3QuaGVpZ2h0LFxuICAgICAgbGVmdDogaGFuZGxlUmVjdC5sZWZ0ICsgKGdsb2JhbC5wYWdlWE9mZnNldCB8fCAwKSxcbiAgICAgIHRvcDogaGFuZGxlUmVjdC50b3AgKyAoZ2xvYmFsLnBhZ2VZT2Zmc2V0IHx8IDApXG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBmb3IgZGVmYXVsdCBkcmFnIHN0YXJ0IHByZWRpY2F0ZSBmdW5jdGlvbi5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtJdGVtfSBpdGVtXG4gICAqL1xuICBmdW5jdGlvbiBkcmFnU3RhcnRQcmVkaWNhdGVSZXNldChpdGVtKSB7XG5cbiAgICB2YXIgcHJlZGljYXRlID0gaXRlbS5fZHJhZy5fc3RhcnRQcmVkaWNhdGVEYXRhO1xuXG4gICAgaWYgKHByZWRpY2F0ZSkge1xuICAgICAgaWYgKHByZWRpY2F0ZS5kZWxheVRpbWVyKSB7XG4gICAgICAgIHByZWRpY2F0ZS5kZWxheVRpbWVyID0gZ2xvYmFsLmNsZWFyVGltZW91dChwcmVkaWNhdGUuZGVsYXlUaW1lcik7XG4gICAgICB9XG4gICAgICBpdGVtLl9kcmFnLl9zdGFydFByZWRpY2F0ZURhdGEgPSBudWxsO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgbGF5b3V0IGFsZ29yaXRobVxuICAgKiAqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICovXG5cbiAgLyohXG4gICAgKiBtdXVyaUxheW91dCB2MC41LjNcbiAgICAqIENvcHlyaWdodCAoYykgMjAxNiBOaWtsYXMgUsOkbcO2IDxpbnJhbW9AZ21haWwuY29tPlxuICAgICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gICAgKi9cblxuICAvKipcbiAgICogVGhlIGRlZmF1bHQgTXV1cmkgbGF5b3V0IGFsZ29yaXRobS4gQmFzZWQgb24gTUFYUkVDVFMgYXBwcm9hY2ggYXMgZGVzY3JpYmVkXG4gICAqIGJ5IEp1a2thIEp5bMOkbmtpIGluIGhpcyBzdXJ2ZXk6IFwiQSBUaG91c2FuZCBXYXlzIHRvIFBhY2sgdGhlIEJpbiAtIEFcbiAgICogUHJhY3RpY2FsIEFwcHJvYWNoIHRvIFR3by1EaW1lbnNpb25hbCBSZWN0YW5nbGUgQmluIFBhY2tpbmcuXCIuXG4gICAqXG4gICAqIFRoaXMgYWxnb3JpdGhtIGlzIGludGVudGlvbmFsbHkgc2VwYXJhdGVkIGZyb20gdGhlIHJlc3Qgb2YgdGhlIGNvZGViYXNlLFxuICAgKiBiZWNhdXNlIGl0IGlzIGl0J3Mgb3duIGxpYnJhcnkgd2l0aCBhIGRpZmZlcmVudCBjb3B5cmlnaHQgdGhhbiB0aGUgcmVzdCBvZlxuICAgKiB0aGUgc29mdHdhcmUuIEl0J3MgYWxzbyBNSVQgbGljZW5zZWQgc28gbm8gd29ycmllcyB0aGVyZS4gVGhpcyBpcyBpbnRlbmRlZFxuICAgKiB0byBiZSB1c2VkIGFzIE11dXJpJ3MgZGVmYXVsdCBsYXlvdXQgYWxnb3JpdGhtIGFuZCBnb2VzIGhhbmQgaW4gaGFuZCB3aXRoXG4gICAqIE11dXJpJ3MgY29yZSBkZXZlbG9wbWVudC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtJdGVtW119IGl0ZW1zXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aFxuICAgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZmlsbEdhcHM9ZmFsc2VdXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuaG9yaXpvbnRhbD1mYWxzZV1cbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5hbGlnblJpZ2h0PWZhbHNlXVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmFsaWduQm90dG9tPWZhbHNlXVxuICAgKiBAcmV0dXJucyB7TGF5b3V0RGF0YX1cbiAgICovXG4gIGZ1bmN0aW9uIG11dXJpTGF5b3V0KGl0ZW1zLCB3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKSB7XG5cbiAgICB2YXIgZmlsbEdhcHMgPSAhIW9wdGlvbnMuZmlsbEdhcHM7XG4gICAgdmFyIGlzSG9yaXpvbnRhbCA9ICEhb3B0aW9ucy5ob3Jpem9udGFsO1xuICAgIHZhciBhbGlnblJpZ2h0ID0gISFvcHRpb25zLmFsaWduUmlnaHQ7XG4gICAgdmFyIGFsaWduQm90dG9tID0gISFvcHRpb25zLmFsaWduQm90dG9tO1xuICAgIHZhciByb3VuZGluZyA9ICEhb3B0aW9ucy5yb3VuZGluZztcbiAgICB2YXIgbGF5b3V0ID0ge1xuICAgICAgc2xvdHM6IHt9LFxuICAgICAgd2lkdGg6IGlzSG9yaXpvbnRhbCA/IDAgOiAocm91bmRpbmcgPyBNYXRoLnJvdW5kKHdpZHRoKSA6IHdpZHRoKSxcbiAgICAgIGhlaWdodDogIWlzSG9yaXpvbnRhbCA/IDAgOiAocm91bmRpbmcgPyBNYXRoLnJvdW5kKGhlaWdodCkgOiBoZWlnaHQpLFxuICAgICAgc2V0V2lkdGg6IGlzSG9yaXpvbnRhbCxcbiAgICAgIHNldEhlaWdodDogIWlzSG9yaXpvbnRhbFxuICAgIH07XG4gICAgdmFyIGZyZWVTbG90cyA9IFtdO1xuICAgIHZhciBzbG90SWRzO1xuICAgIHZhciBzbG90RGF0YTtcbiAgICB2YXIgc2xvdDtcbiAgICB2YXIgaXRlbTtcbiAgICB2YXIgaXRlbVdpZHRoO1xuICAgIHZhciBpdGVtSGVpZ2h0O1xuICAgIHZhciBpO1xuXG4gICAgLy8gTm8gbmVlZCB0byBnbyBmdXJ0aGVyIGlmIGl0ZW1zIGRvIG5vdCBleGlzdC5cbiAgICBpZiAoIWl0ZW1zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGxheW91dDtcbiAgICB9XG5cbiAgICAvLyBGaW5kIHNsb3RzIGZvciBpdGVtcy5cbiAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGl0ZW0gPSBpdGVtc1tpXTtcbiAgICAgIGl0ZW1XaWR0aCA9IGl0ZW0uX3dpZHRoICsgaXRlbS5fbWFyZ2luLmxlZnQgKyBpdGVtLl9tYXJnaW4ucmlnaHQ7XG4gICAgICBpdGVtSGVpZ2h0ID0gaXRlbS5faGVpZ2h0ICsgaXRlbS5fbWFyZ2luLnRvcCArIGl0ZW0uX21hcmdpbi5ib3R0b207XG4gICAgICBpZiAocm91bmRpbmcpIHtcbiAgICAgICAgaXRlbVdpZHRoID0gTWF0aC5yb3VuZChpdGVtV2lkdGgpO1xuICAgICAgICBpdGVtSGVpZ2h0ID0gTWF0aC5yb3VuZChpdGVtSGVpZ2h0KTtcbiAgICAgIH1cbiAgICAgIHNsb3REYXRhID0gbXV1cmlMYXlvdXQuZ2V0U2xvdChsYXlvdXQsIGZyZWVTbG90cywgaXRlbVdpZHRoLCBpdGVtSGVpZ2h0LCAhaXNIb3Jpem9udGFsLCBmaWxsR2Fwcyk7XG4gICAgICBzbG90ID0gc2xvdERhdGFbMF07XG4gICAgICBmcmVlU2xvdHMgPSBzbG90RGF0YVsxXTtcbiAgICAgIGlmIChpc0hvcml6b250YWwpIHtcbiAgICAgICAgbGF5b3V0LndpZHRoID0gTWF0aC5tYXgobGF5b3V0LndpZHRoLCBzbG90LmxlZnQgKyBzbG90LndpZHRoKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsYXlvdXQuaGVpZ2h0ID0gTWF0aC5tYXgobGF5b3V0LmhlaWdodCwgc2xvdC50b3AgKyBzbG90LmhlaWdodCk7XG4gICAgICB9XG4gICAgICBsYXlvdXQuc2xvdHNbaXRlbS5faWRdID0gc2xvdDtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgYWxpZ25tZW50IGlzIHNldCB0byByaWdodCBvciBib3R0b20sIHdlIG5lZWQgdG8gYWRqdXN0IHRoZVxuICAgIC8vIHJlc3VsdHMuXG4gICAgaWYgKGFsaWduUmlnaHQgfHwgYWxpZ25Cb3R0b20pIHtcbiAgICAgIHNsb3RJZHMgPSBPYmplY3Qua2V5cyhsYXlvdXQuc2xvdHMpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IHNsb3RJZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2xvdCA9IGxheW91dC5zbG90c1tzbG90SWRzW2ldXTtcbiAgICAgICAgaWYgKGFsaWduUmlnaHQpIHtcbiAgICAgICAgICBzbG90LmxlZnQgPSBsYXlvdXQud2lkdGggLSAoc2xvdC5sZWZ0ICsgc2xvdC53aWR0aCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFsaWduQm90dG9tKSB7XG4gICAgICAgICAgc2xvdC50b3AgPSBsYXlvdXQuaGVpZ2h0IC0gKHNsb3QudG9wICsgc2xvdC5oZWlnaHQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGxheW91dDtcblxuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSBwb3NpdGlvbiBmb3IgdGhlIGxheW91dCBpdGVtLiBSZXR1cm5zIHRoZSBsZWZ0IGFuZCB0b3AgcG9zaXRpb25cbiAgICogb2YgdGhlIGl0ZW0gaW4gcGl4ZWxzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgbXV1cmlMYXlvdXRcbiAgICogQHBhcmFtIHtMYXlvdXR9IGxheW91dFxuICAgKiBAcGFyYW0ge0FycmF5fSBzbG90c1xuICAgKiBAcGFyYW0ge051bWJlcn0gaXRlbVdpZHRoXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpdGVtSGVpZ2h0XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmVydGljYWxcbiAgICogQHBhcmFtIHtCb29sZWFufSBmaWxsR2Fwc1xuICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAqL1xuICBtdXVyaUxheW91dC5nZXRTbG90ID0gZnVuY3Rpb24gKGxheW91dCwgc2xvdHMsIGl0ZW1XaWR0aCwgaXRlbUhlaWdodCwgdmVydGljYWwsIGZpbGxHYXBzKSB7XG5cbiAgICB2YXIgbGVld2F5ID0gMC4wMDE7XG4gICAgdmFyIG5ld1Nsb3RzID0gW107XG4gICAgdmFyIGl0ZW0gPSB7XG4gICAgICBsZWZ0OiBudWxsLFxuICAgICAgdG9wOiBudWxsLFxuICAgICAgd2lkdGg6IGl0ZW1XaWR0aCxcbiAgICAgIGhlaWdodDogaXRlbUhlaWdodFxuICAgIH07XG4gICAgdmFyIHNsb3Q7XG4gICAgdmFyIHBvdGVudGlhbFNsb3RzO1xuICAgIHZhciBpZ25vcmVDdXJyZW50U2xvdHM7XG4gICAgdmFyIGk7XG4gICAgdmFyIGlpO1xuXG4gICAgLy8gVHJ5IHRvIGZpbmQgYSBzbG90IGZvciB0aGUgaXRlbS5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc2xvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHNsb3QgPSBzbG90c1tpXTtcbiAgICAgIGlmIChpdGVtLndpZHRoIDw9IChzbG90LndpZHRoICsgbGVld2F5KSAmJiBpdGVtLmhlaWdodCA8PSAoc2xvdC5oZWlnaHQgKyBsZWV3YXkpKSB7XG4gICAgICAgIGl0ZW0ubGVmdCA9IHNsb3QubGVmdDtcbiAgICAgICAgaXRlbS50b3AgPSBzbG90LnRvcDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgbm8gc2xvdCB3YXMgZm91bmQgZm9yIHRoZSBpdGVtLlxuICAgIGlmIChpdGVtLmxlZnQgPT09IG51bGwpIHtcblxuICAgICAgLy8gUG9zaXRpb24gdGhlIGl0ZW0gaW4gdG8gdGhlIGJvdHRvbSBsZWZ0ICh2ZXJ0aWNhbCBtb2RlKSBvciB0b3AgcmlnaHRcbiAgICAgIC8vIChob3Jpem9udGFsIG1vZGUpIG9mIHRoZSBncmlkLlxuICAgICAgaXRlbS5sZWZ0ID0gdmVydGljYWwgPyAwIDogbGF5b3V0LndpZHRoO1xuICAgICAgaXRlbS50b3AgPSB2ZXJ0aWNhbCA/IGxheW91dC5oZWlnaHQgOiAwO1xuXG4gICAgICAvLyBJZiBnYXBzIGRvbid0IG5lZWRzIGZpbGxpbmcgZG8gbm90IGFkZCBhbnkgY3VycmVudCBzbG90cyB0byB0aGUgbmV3XG4gICAgICAvLyBzbG90cyBhcnJheS5cbiAgICAgIGlmICghZmlsbEdhcHMpIHtcbiAgICAgICAgaWdub3JlQ3VycmVudFNsb3RzID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIEluIHZlcnRpY2FsIG1vZGUsIGlmIHRoZSBpdGVtJ3MgYm90dG9tIG92ZXJsYXBzIHRoZSBncmlkJ3MgYm90dG9tLlxuICAgIGlmICh2ZXJ0aWNhbCAmJiAoaXRlbS50b3AgKyBpdGVtLmhlaWdodCkgPiBsYXlvdXQuaGVpZ2h0KSB7XG5cbiAgICAgIC8vIElmIGl0ZW0gaXMgbm90IGFsaWduZWQgdG8gdGhlIGxlZnQgZWRnZSwgY3JlYXRlIGEgbmV3IHNsb3QuXG4gICAgICBpZiAoaXRlbS5sZWZ0ID4gMCkge1xuICAgICAgICBuZXdTbG90cy5wdXNoKHtcbiAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgIHRvcDogbGF5b3V0LmhlaWdodCxcbiAgICAgICAgICB3aWR0aDogaXRlbS5sZWZ0LFxuICAgICAgICAgIGhlaWdodDogSW5maW5pdHlcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIGl0ZW0gaXMgbm90IGFsaWduZWQgdG8gdGhlIHJpZ2h0IGVkZ2UsIGNyZWF0ZSBhIG5ldyBzbG90LlxuICAgICAgaWYgKChpdGVtLmxlZnQgKyBpdGVtLndpZHRoKSA8IGxheW91dC53aWR0aCkge1xuICAgICAgICBuZXdTbG90cy5wdXNoKHtcbiAgICAgICAgICBsZWZ0OiBpdGVtLmxlZnQgKyBpdGVtLndpZHRoLFxuICAgICAgICAgIHRvcDogbGF5b3V0LmhlaWdodCxcbiAgICAgICAgICB3aWR0aDogbGF5b3V0LndpZHRoIC0gaXRlbS5sZWZ0IC0gaXRlbS53aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IEluZmluaXR5XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgZ3JpZCBoZWlnaHQuXG4gICAgICBsYXlvdXQuaGVpZ2h0ID0gaXRlbS50b3AgKyBpdGVtLmhlaWdodDtcblxuICAgIH1cblxuICAgIC8vIEluIGhvcml6b250YWwgbW9kZSwgaWYgdGhlIGl0ZW0ncyByaWdodCBvdmVybGFwcyB0aGUgZ3JpZCdzIHJpZ2h0IGVkZ2UuXG4gICAgaWYgKCF2ZXJ0aWNhbCAmJiAoaXRlbS5sZWZ0ICsgaXRlbS53aWR0aCkgPiBsYXlvdXQud2lkdGgpIHtcblxuICAgICAgLy8gSWYgaXRlbSBpcyBub3QgYWxpZ25lZCB0byB0aGUgdG9wLCBjcmVhdGUgYSBuZXcgc2xvdC5cbiAgICAgIGlmIChpdGVtLnRvcCA+IDApIHtcbiAgICAgICAgbmV3U2xvdHMucHVzaCh7XG4gICAgICAgICAgbGVmdDogbGF5b3V0LndpZHRoLFxuICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICB3aWR0aDogSW5maW5pdHksXG4gICAgICAgICAgaGVpZ2h0OiBpdGVtLnRvcFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgaXRlbSBpcyBub3QgYWxpZ25lZCB0byB0aGUgYm90dG9tLCBjcmVhdGUgYSBuZXcgc2xvdC5cbiAgICAgIGlmICgoaXRlbS50b3AgKyBpdGVtLmhlaWdodCkgPCBsYXlvdXQuaGVpZ2h0KSB7XG4gICAgICAgIG5ld1Nsb3RzLnB1c2goe1xuICAgICAgICAgIGxlZnQ6IGxheW91dC53aWR0aCxcbiAgICAgICAgICB0b3A6IGl0ZW0udG9wICsgaXRlbS5oZWlnaHQsXG4gICAgICAgICAgd2lkdGg6IEluZmluaXR5LFxuICAgICAgICAgIGhlaWdodDogbGF5b3V0LmhlaWdodCAtIGl0ZW0udG9wIC0gaXRlbS5oZWlnaHRcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSBncmlkIHdpZHRoLlxuICAgICAgbGF5b3V0LndpZHRoID0gaXRlbS5sZWZ0ICsgaXRlbS53aWR0aDtcblxuICAgIH1cblxuICAgIC8vIENsZWFuIHVwIHRoZSBjdXJyZW50IHNsb3RzIG1ha2luZyBzdXJlIHRoZXJlIGFyZSBubyBvbGQgc2xvdHMgdGhhdFxuICAgIC8vIG92ZXJsYXAgd2l0aCB0aGUgaXRlbS4gSWYgYW4gb2xkIHNsb3Qgb3ZlcmxhcHMgd2l0aCB0aGUgaXRlbSwgc3BsaXQgaXRcbiAgICAvLyBpbnRvIHNtYWxsZXIgc2xvdHMgaWYgbmVjZXNzYXJ5LlxuICAgIGZvciAoaSA9IGZpbGxHYXBzID8gMCA6IGlnbm9yZUN1cnJlbnRTbG90cyA/IHNsb3RzLmxlbmd0aCA6IGk7IGkgPCBzbG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgcG90ZW50aWFsU2xvdHMgPSBtdXVyaUxheW91dC5zcGxpdFJlY3Qoc2xvdHNbaV0sIGl0ZW0pO1xuICAgICAgZm9yIChpaSA9IDA7IGlpIDwgcG90ZW50aWFsU2xvdHMubGVuZ3RoOyBpaSsrKSB7XG4gICAgICAgIHNsb3QgPSBwb3RlbnRpYWxTbG90c1tpaV07XG4gICAgICAgIC8vIExldCdzIG1ha2Ugc3VyZSBoZXJlIHRoYXQgd2UgaGF2ZSBhIGJpZyBlbm91Z2ggc2xvdFxuICAgICAgICAvLyAod2lkdGgvaGVpZ2h0ID4gMC40OXB4KSBhbmQgYWxzbyBsZXQncyBtYWtlIHN1cmUgdGhhdCB0aGUgc2xvdCBpc1xuICAgICAgICAvLyB3aXRoaW4gdGhlIGJvdW5kYXJpZXMgb2YgdGhlIGdyaWQuXG4gICAgICAgIGlmIChzbG90LndpZHRoID4gMC40OSAmJiBzbG90LmhlaWdodCA+IDAuNDkgJiYgKCh2ZXJ0aWNhbCAmJiBzbG90LnRvcCA8IGxheW91dC5oZWlnaHQpIHx8ICghdmVydGljYWwgJiYgc2xvdC5sZWZ0IDwgbGF5b3V0LndpZHRoKSkpIHtcbiAgICAgICAgICBuZXdTbG90cy5wdXNoKHNsb3QpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2FuaXRpemUgbmV3IHNsb3RzLlxuICAgIGlmIChuZXdTbG90cy5sZW5ndGgpIHtcbiAgICAgIG5ld1Nsb3RzID0gbXV1cmlMYXlvdXQucHVyZ2VSZWN0cyhuZXdTbG90cykuc29ydCh2ZXJ0aWNhbCA/IG11dXJpTGF5b3V0LnNvcnRSZWN0c1RvcExlZnQgOiBtdXVyaUxheW91dC5zb3J0UmVjdHNMZWZ0VG9wKTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gdGhlIGl0ZW0gYW5kIHVwZGF0ZWQgc2xvdHMgZGF0YS5cbiAgICByZXR1cm4gW2l0ZW0sIG5ld1Nsb3RzXTtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBQdW5jaCBhIGhvbGUgaW50byBhIHJlY3RhbmdsZSBhbmQgc3BsaXQgdGhlIHJlbWFpbmluZyBhcmVhIGludG8gc21hbGxlclxuICAgKiByZWN0YW5nbGVzICg0IGF0IG1heCkuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7UmVjdGFuZ2xlfSByZWN0XG4gICAqIEBwYXJhbSB7UmVjdGFuZ2xlfSBob2xlXG4gICAqIHJldHVybnMge1JlY3RhbmdsZVtdfVxuICAgKi9cbiAgbXV1cmlMYXlvdXQuc3BsaXRSZWN0ID0gZnVuY3Rpb24gKHJlY3QsIGhvbGUpIHtcblxuICAgIHZhciByZXQgPSBbXTtcblxuICAgIC8vIElmIHRoZSByZWN0IGRvZXMgbm90IG92ZXJsYXAgd2l0aCB0aGUgaG9sZSBhZGQgcmVjdCB0byB0aGUgcmV0dXJuIGRhdGEgYXNcbiAgICAvLyBpcy5cbiAgICBpZiAoIW11dXJpTGF5b3V0LmRvUmVjdHNPdmVybGFwKHJlY3QsIGhvbGUpKSB7XG4gICAgICByZXR1cm4gW3tcbiAgICAgICAgbGVmdDogcmVjdC5sZWZ0LFxuICAgICAgICB0b3A6IHJlY3QudG9wLFxuICAgICAgICB3aWR0aDogcmVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiByZWN0LmhlaWdodFxuICAgICAgfV07XG4gICAgfVxuXG4gICAgLy8gTGVmdCBzcGxpdC5cbiAgICBpZiAocmVjdC5sZWZ0IDwgaG9sZS5sZWZ0KSB7XG4gICAgICByZXQucHVzaCh7XG4gICAgICAgIGxlZnQ6IHJlY3QubGVmdCxcbiAgICAgICAgdG9wOiByZWN0LnRvcCxcbiAgICAgICAgd2lkdGg6IGhvbGUubGVmdCAtIHJlY3QubGVmdCxcbiAgICAgICAgaGVpZ2h0OiByZWN0LmhlaWdodFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUmlnaHQgc3BsaXQuXG4gICAgaWYgKChyZWN0LmxlZnQgKyByZWN0LndpZHRoKSA+IChob2xlLmxlZnQgKyBob2xlLndpZHRoKSkge1xuICAgICAgcmV0LnB1c2goe1xuICAgICAgICBsZWZ0OiBob2xlLmxlZnQgKyBob2xlLndpZHRoLFxuICAgICAgICB0b3A6IHJlY3QudG9wLFxuICAgICAgICB3aWR0aDogKHJlY3QubGVmdCArIHJlY3Qud2lkdGgpIC0gKGhvbGUubGVmdCArIGhvbGUud2lkdGgpLFxuICAgICAgICBoZWlnaHQ6IHJlY3QuaGVpZ2h0XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBUb3Agc3BsaXQuXG4gICAgaWYgKHJlY3QudG9wIDwgaG9sZS50b3ApIHtcbiAgICAgIHJldC5wdXNoKHtcbiAgICAgICAgbGVmdDogcmVjdC5sZWZ0LFxuICAgICAgICB0b3A6IHJlY3QudG9wLFxuICAgICAgICB3aWR0aDogcmVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBob2xlLnRvcCAtIHJlY3QudG9wXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBCb3R0b20gc3BsaXQuXG4gICAgaWYgKChyZWN0LnRvcCArIHJlY3QuaGVpZ2h0KSA+IChob2xlLnRvcCArIGhvbGUuaGVpZ2h0KSkge1xuICAgICAgcmV0LnB1c2goe1xuICAgICAgICBsZWZ0OiByZWN0LmxlZnQsXG4gICAgICAgIHRvcDogaG9sZS50b3AgKyBob2xlLmhlaWdodCxcbiAgICAgICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogKHJlY3QudG9wICsgcmVjdC5oZWlnaHQpIC0gKGhvbGUudG9wICsgaG9sZS5oZWlnaHQpXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHR3byByZWN0YW5nbGVzIG92ZXJsYXAuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBtdXVyaUxheW91dFxuICAgKiBAcGFyYW0ge1JlY3RhbmdsZX0gYVxuICAgKiBAcGFyYW0ge1JlY3RhbmdsZX0gYlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIG11dXJpTGF5b3V0LmRvUmVjdHNPdmVybGFwID0gZnVuY3Rpb24gKGEsIGIpIHtcblxuICAgIHJldHVybiAhKChhLmxlZnQgKyBhLndpZHRoKSA8PSBiLmxlZnQgfHwgKGIubGVmdCArIGIud2lkdGgpIDw9IGEubGVmdCB8fCAoYS50b3AgKyBhLmhlaWdodCkgPD0gYi50b3AgfHwgKGIudG9wICsgYi5oZWlnaHQpIDw9IGEudG9wKTtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHJlY3RhbmdsZSBpcyBmdWxseSB3aXRoaW4gYW5vdGhlciByZWN0YW5nbGUuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBtdXVyaUxheW91dFxuICAgKiBAcGFyYW0ge1JlY3RhbmdsZX0gYVxuICAgKiBAcGFyYW0ge1JlY3RhbmdsZX0gYlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIG11dXJpTGF5b3V0LmlzUmVjdFdpdGhpblJlY3QgPSBmdW5jdGlvbiAoYSwgYikge1xuXG4gICAgcmV0dXJuIGEubGVmdCA+PSBiLmxlZnQgJiYgYS50b3AgPj0gYi50b3AgJiYgKGEubGVmdCArIGEud2lkdGgpIDw9IChiLmxlZnQgKyBiLndpZHRoKSAmJiAoYS50b3AgKyBhLmhlaWdodCkgPD0gKGIudG9wICsgYi5oZWlnaHQpO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIExvb3BzIHRocm91Z2ggYW4gYXJyYXkgb2YgcmVjdGFuZ2xlcyBhbmQgcmVtb3ZlcyBhbGwgdGhhdCBhcmUgZnVsbHkgd2l0aGluXG4gICAqIGFub3RoZXIgcmVjdGFuZ2xlIGluIHRoZSBhcnJheS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIG11dXJpTGF5b3V0XG4gICAqIEBwYXJhbSB7UmVjdGFuZ2xlW119IHJlY3RzXG4gICAqIEByZXR1cm5zIHtSZWN0YW5nbGVbXX1cbiAgICovXG4gIG11dXJpTGF5b3V0LnB1cmdlUmVjdHMgPSBmdW5jdGlvbiAocmVjdHMpIHtcblxuICAgIHZhciBpID0gcmVjdHMubGVuZ3RoO1xuICAgIHZhciBpaTtcbiAgICB2YXIgcmVjdEE7XG4gICAgdmFyIHJlY3RCO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgcmVjdEEgPSByZWN0c1tpXTtcbiAgICAgIGlpID0gcmVjdHMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGlpLS0pIHtcbiAgICAgICAgcmVjdEIgPSByZWN0c1tpaV07XG4gICAgICAgIGlmIChpICE9PSBpaSAmJiBtdXVyaUxheW91dC5pc1JlY3RXaXRoaW5SZWN0KHJlY3RBLCByZWN0QikpIHtcbiAgICAgICAgICByZWN0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVjdHM7XG5cbiAgfTtcblxuICAvKipcbiAgICogU29ydCByZWN0YW5nbGVzIHdpdGggdG9wLWxlZnQgZ3Jhdml0eS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIG11dXJpTGF5b3V0XG4gICAqIEBwYXJhbSB7UmVjdGFuZ2xlfSBhXG4gICAqIEBwYXJhbSB7UmVjdGFuZ2xlfSBiXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqL1xuICBtdXVyaUxheW91dC5zb3J0UmVjdHNUb3BMZWZ0ID0gZnVuY3Rpb24gKGEsIGIpIHtcblxuICAgIHJldHVybiBhLnRvcCAtIGIudG9wIHx8IGEubGVmdCAtIGIubGVmdDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBTb3J0IHJlY3RhbmdsZXMgd2l0aCBsZWZ0LXRvcCBncmF2aXR5LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgbXV1cmlMYXlvdXRcbiAgICogQHBhcmFtIHtSZWN0YW5nbGV9IGFcbiAgICogQHBhcmFtIHtSZWN0YW5nbGV9IGJcbiAgICogQHJldHVybnMge051bWJlcn1cbiAgICovXG4gIG11dXJpTGF5b3V0LnNvcnRSZWN0c0xlZnRUb3AgPSBmdW5jdGlvbiAoYSwgYikge1xuXG4gICAgcmV0dXJuIGEubGVmdCAtIGIubGVmdCB8fCBhLnRvcCAtIGIudG9wO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIFR5cGUgZGVmaW5pdGlvbnNcbiAgICogKioqKioqKioqKioqKioqKlxuICAgKi9cblxuICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICAvKipcbiAgICogVGhlIHZhbHVlcyBieSB3aGljaCBtdWx0aXBsZSBncmlkIGl0ZW1zIGNhbiBiZSBxdWVyaWVkLiBBbiBodG1sIGVsZW1lbnQgb3JcbiAgICogYW4gYXJyYXkgb2YgSFRNTCBlbGVtZW50cy4gSXRlbSBvciBhbiBhcnJheSBvZiBpdGVtcy4gTm9kZSBsaXN0LCBsaXZlIG9yXG4gICAqIHN0YXRpYy4gTnVtYmVyIChpbmRleCkgb3IgYSBsaXN0IG9mIG51bWJlcnMgKGluZGljZXMpLlxuICAgKlxuICAgKiBAdHlwZWRlZiB7KEhUTUxFbGVtZW50fEhUTUxFbGVtZW50W118SXRlbXxJdGVtW118Tm9kZUxpc3R8TnVtYmVyfE51bWJlcltdKX0gR3JpZE11bHRpSXRlbVF1ZXJ5XG4gICAqL1xuICAvKiBlc2xpbnQtZW5hYmxlICovXG5cbiAgLyoqXG4gICAqIFRoZSB2YWx1ZXMgYnkgd2hpY2ggYSBzaW5nbGUgZ3JpZCBpdGVtIGNhbiBiZSBxdWVyaWVkLiBBbiBodG1sIGVsZW1lbnQsIGFuXG4gICAqIGl0ZW0gaW5zdGFuY2Ugb3IgYSBudW1iZXIgKGluZGV4KS5cbiAgICpcbiAgICogQHR5cGVkZWYgeyhIVE1MRWxlbWVudHxJdGVtfE51bWJlcil9IEdyaWRTaW5nbGVJdGVtUXVlcnlcbiAgICovXG5cbiAgLyoqXG4gICAqIFRoZSBncmlkIGl0ZW0ncyBzdGF0ZSwgYSBzdHJpbmcuIEFjY2VwdGVkIHZhbHVlcyBhcmU6IFwiYWN0aXZlXCIsIFwiaW5hY3RpdmVcIixcbiAgICogXCJ2aXNpYmxlXCIsIFwiaGlkZGVuXCIsIFwic2hvd2luZ1wiLCBcImhpZGluZ1wiLCBcInBvc2l0aW9uaW5nXCIsIFwiZHJhZ2dpbmdcIixcbiAgICogXCJyZWxlYXNpbmdcIiBhbmQgXCJtaWdyYXRpbmdcIi5cbiAgICpcbiAgICogQHR5cGVkZWYge1N0cmluZ30gR3JpZEl0ZW1TdGF0ZVxuICAgKi9cblxuICAvKipcbiAgICogVGhlIGRhdGEgdGhhdCBpcyByZXF1aXJlZCB0byBvcmNoZXN0cmF0ZSBhIHNvcnQgYWN0aW9uIGR1cmluZyBkcmFnLlxuICAgKlxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBEcmFnU29ydENvbW1hbmRcbiAgICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvblxuICAgKiAgIC0gXCJtb3ZlXCIgb3IgXCJzd2FwXCIuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgKiAgIC0gdGFyZ2V0IGluZGV4LlxuICAgKiBAcGFyYW0gez9HcmlkfSBbZ3JpZD1udWxsXVxuICAgKiAgIC0gdGFyZ2V0IGdyaWQuXG4gICAqL1xuXG4gIC8qKlxuICAgKiBBIHJlY3RhbmdsZSBpcyBhbiBvYmplY3Qgd2l0aCB3aWR0aCwgaGVpZ2h0IGFuZCBvZmZzZXQgKGxlZnQgYW5kIHRvcCkgZGF0YS5cbiAgICpcbiAgICogQHR5cGVkZWYge09iamVjdH0gUmVjdGFuZ2xlXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB3aWR0aFxuICAgKiBAcHJvcGVydHkge051bWJlcn0gaGVpZ2h0XG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBsZWZ0XG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB0b3BcbiAgICovXG5cbiAgLyoqXG4gICAqIExheW91dCBkYXRhIGZvciB0aGUgbGF5b3V0IGluc3RhbmNlLlxuICAgKlxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBMYXlvdXREYXRhXG4gICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBzbG90c1xuICAgKiBAcHJvcGVydHkge051bWJlcn0gd2lkdGhcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGhlaWdodFxuICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IHNldFdpZHRoXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gc2V0SGVpZ2h0XG4gICAqL1xuXG4gIC8qKlxuICAgKiBAY2FsbGJhY2sgTGF5b3V0Q2FsbGJhY2tcbiAgICogQHBhcmFtIHtCb29sZWFufSBpc0Fib3J0ZWRcbiAgICogICAtIFdhcyB0aGUgbGF5b3V0IHByb2NlZHVyZSBhYm9ydGVkP1xuICAgKiBAcGFyYW0ge0l0ZW1bXX0gaXRlbXNcbiAgICogICAtIFRoZSBpdGVtcyB0aGF0IHdlcmUgYXR0ZW1wdGVkIHRvIGJlIHBvc2l0aW9uZWQuXG4gICAqL1xuXG4gIC8qKlxuICAgKiBAY2FsbGJhY2sgU2hvd0NhbGxiYWNrXG4gICAqIEBwYXJhbSB7SXRlbVtdfSBpdGVtc1xuICAgKiAgIC0gVGhlIGl0ZW1zIHRoYXQgd2VyZSBzdWNjZXNzZnVsbHkgc2hvd24gd2l0aG91dCBpbnRlcnJ1cHRpb25zLlxuICAgKi9cblxuICAvKipcbiAgICogQGNhbGxiYWNrIEhpZGVDYWxsYmFja1xuICAgKiBAcGFyYW0ge0l0ZW1bXX0gaXRlbXNcbiAgICogICAtIFRoZSBpdGVtcyB0aGF0IHdlcmUgc3VjY2Vzc2Z1bGx5IGhpZGRlbiB3aXRob3V0IGludGVycnVwdGlvbnMuXG4gICAqL1xuXG4gIC8qKlxuICAgKiBAY2FsbGJhY2sgRmlsdGVyQ2FsbGJhY2tcbiAgICogQHBhcmFtIHtJdGVtW119IHNob3duSXRlbXNcbiAgICogICAtIFRoZSBpdGVtcyB0aGF0IHdlcmUgc2hvd24uXG4gICAqIEBwYXJhbSB7SXRlbVtdfSBoaWRkZW5JdGVtc1xuICAgKiAgIC0gVGhlIGl0ZW1zIHRoYXQgd2VyZSBoaWRkZW4uXG4gICAqL1xuXG4gIC8qKlxuICAgKiBJbml0XG4gICAqL1xuXG4gIHJldHVybiBHcmlkO1xuXG59KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tdXVyaS9tdXVyaS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCBNdXVyaSBmcm9tICdtdXVyaSdcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgY3NyZlRva2VuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW25hbWU9XCJfY3NyZlwiXScpLmNvbnRlbnRcblxuICBjb25zdCBmaWxlSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLWZpbGV1cGxvYWQnKVxuXG4gIGZ1bmN0aW9uIHVwbG9hZEZpbGUgKGZpbGVJbnB1dCkge1xuICAgIGlmIChmaWxlSW5wdXQuZmlsZXMubGVuZ3RoID09PSAwKSByZXR1cm5cblxuICAgIGNvbnN0IHdyYXBwZXIgPSBmaWxlSW5wdXQucGFyZW50Tm9kZVxuXG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgd2luZG93LkZvcm1EYXRhKClcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlSW5wdXQuZmlsZXNbMF0pXG4gICAgZm9ybURhdGEuYXBwZW5kKCdfY3NyZicsIGNzcmZUb2tlbilcblxuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KClcbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVyblxuXG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDIwMSkge1xuICAgICAgICBjb25zdCByZXNwID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlKVxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwKVxuXG4gICAgICAgIHdyYXBwZXIucXVlcnlTZWxlY3RvcignLmpzLWltZycpLnNyYyA9IHJlc3AuZnVsbF9uYW1lXG4gICAgICAgIHdyYXBwZXIucXVlcnlTZWxlY3RvcignLmpzLWZpbGUtdGV4dCcpLnZhbHVlID0gcmVzcC5maWxlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXF1ZXN0LnJlc3BvbnNlVGV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwYmFyID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuanMtcGJhcicpXG4gICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLmNlaWwoZS5sb2FkZWQgLyBlLnRvdGFsICogMTAwKVxuICAgICAgcGJhci5zdHlsZS53aWR0aCA9IGAke3Byb2dyZXNzfSVgXG4gICAgfSwgZmFsc2UpXG4gICAgcmVxdWVzdC5vcGVuKCdwb3N0JywgZmlsZUlucHV0LmRhdGFzZXQucGF0aClcbiAgICByZXF1ZXN0LnNlbmQoZm9ybURhdGEpXG4gIH1cblxuICBmaWxlSW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4geyB1cGxvYWRGaWxlKGlucHV0KSB9KVxuICB9KVxuXG4gIC8vIGdyaWRcbiAgY29uc3QgbXNucnlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbXNucnknKVxuICBpZiAobXNucnlDb250YWluZXIpIHtcbiAgICBtc25yeUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdqcy1hY3RpdmF0ZWQnKVxuXG4gICAgY29uc3QgZyA9IG5ldyBNdXVyaSgnLm1zbnJ5Jywge1xuICAgICAgaXRlbXM6ICcubXNucnktaXRlbScsXG4gICAgICBkcmFnRW5hYmxlZDogdHJ1ZSxcbiAgICAgIGRyYWdTb3J0OiB0cnVlLFxuICAgICAgbGF5b3V0OiB7XG4gICAgICAgIGZpbGxHYXBzOiB0cnVlLFxuICAgICAgICBob3Jpem9udGFsOiBmYWxzZSxcbiAgICAgICAgYWxpZ25SaWdodDogZmFsc2UsXG4gICAgICAgIGFsaWduQm90dG9tOiBmYWxzZSxcbiAgICAgICAgcm91bmRpbmc6IGZhbHNlXG4gICAgICB9XG4gICAgfSkub24oJ2RyYWdSZWxlYXNlRW5kJywgKCkgPT4ge1xuICAgICAgZy5zeW5jaHJvbml6ZSgpXG4gICAgICBjb25zdCBpZHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tc25yeS1pdGVtJykpLm1hcChlbCA9PiBlbC5kYXRhc2V0LmlkKVxuICAgICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICB1cmw6ICcvYWRtaW4vbG9nb3MvcmVwb3NpdGlvbicsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBpZHM6IGlkcy5qb2luKCcsJyksXG4gICAgICAgICAgX2NzcmY6IGNzcmZUb2tlblxuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOiAocmVzcCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdzYXZlZCcpXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbidcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvYWRtaW4uanMiXSwic291cmNlUm9vdCI6IiJ9