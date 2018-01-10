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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _swipejs = __webpack_require__(3);

var _swipejs2 = _interopRequireDefault(_swipejs);

var _muuri = __webpack_require__(1);

var _muuri2 = _interopRequireDefault(_muuri);

var _lazyload = __webpack_require__(5);

var _lazyload2 = _interopRequireDefault(_lazyload);

var _loadScript = __webpack_require__(6);

var _loadScript2 = _interopRequireDefault(_loadScript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: barba.js
// import Amber from 'amber'
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    // grid
    var msnryContainer = document.querySelector('.js-msnry');
    if (msnryContainer) {
      msnryContainer.classList.add('js-activated');

      new _muuri2.default('.msnry', {
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
    var gmapsEls = document.querySelectorAll('.js-gmap');
    if (gmapsEls.length) {
      // https://maps.googleapis.com/maps/api/staticmap?center=48.923564,%2024.711256&zoom=17&size=1000x500&format=jpg?&style=feature:road.local%7Celement:geometry%7Ccolor:0x00ff00&style=feature:landscape%7Celement:geometry.fill%7Ccolor:0x000000&style=element:labels%7Cinvert_lightness:true&style=feature:road.arterial%7Celement:labels%7Cinvert_lightness:false
      (0, _loadScript2.default)('http://maps.google.com/maps/api/js', function () {
        gmapsEls.forEach(function (el) {
          var mapOptions = {
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: new google.maps.LatLng(0, 0)
          };
          var map = new google.maps.Map(el, mapOptions);
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
        });
      });
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

    // fix position for contacts page
    (function () {
      var contactsText = document.querySelector('.js-contacts-text');
      if (!contactsText) return;
      var homeLink = document.querySelector('.main-nav-link.link-home');

      function fixPosition() {
        if (window.innerWidth > 1023) {
          var left = homeLink.getBoundingClientRect().x;
          contactsText.setAttribute('style', 'padding-left: ' + left + 'px');
        } else {
          contactsText.removeAttribute('style');
        }
      }
      fixPosition();

      var resizeTimer = void 0;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(fixPosition, 100);
      });
    })();

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
    (function () {
      var video = void 0;
      document.addEventListener('mouseover', function (e) {
        if (e.target && e.target.classList.contains('js-play')) {
          video = document.createElement('video');
          video.src = e.target.dataset.video;
          video.autoplay = true;
          video.loop = true;
          video.classList.add('msnry-logo-video');
          e.target.parentNode.append(video);
        }
      });
      document.addEventListener('mouseout', function (e) {
        if (e.target && e.target.classList.contains('js-play')) {
          video.remove();
        }
      });
    })();

    (function () {
      var btn = document.querySelector('.js-play-home-video');
      var video = document.querySelector('.js-home-video');
      if (video) {
        btn.addEventListener('mouseover', function (e) {
          video.currentTime = 0;
          video.play();
        });
        btn.addEventListener('mouseout', function (e) {
          video.pause();
        });
      }
    })();

    // Home mobile slider
    if (document.querySelector('.js-swipe')) {
      var video = document.querySelector('.js-home-mob-video');
      var dots = document.querySelectorAll('.js-mob-dot');
      var homeSlider = new _swipejs2.default(document.querySelector('.js-swipe'), {
        draggable: true,
        continuous: false,
        // disableScroll: true,
        // stopPropagation: true,
        // callback: function (index, element) {},
        transitionEnd: function transitionEnd(index, element) {
          dots.forEach(function (d) {
            return d.classList.remove('is-active');
          });
          dots[index].classList.add('is-active');

          if (index === 3) {
            video.play();
          } else {
            video.pause();
            video.currentTime = 0;
          }
        }
      });

      dots.forEach(function (d, index) {
        return d.addEventListener('click', function (e) {
          homeSlider.slide(index, 300);
        });
      });
    }

    new _lazyload2.default();
    new _lazyload2.default(document.querySelectorAll('.load-now')).loadAndDestroy();
  }, 0);
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Swipe 2.2.11
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
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function(){
      root.Swipe = factory();
      return root.Swipe;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
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

    function setup(opts) {
      // Overwrite options if necessary
      if (opts != null) {
        for (var prop in opts) {
          options[prop] = opts[prop];
        }
      }

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 4 */
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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*!
 * Lazy Load - JavaScript plugin for lazy loading images
 *
 * Copyright (c) 2007-2017 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   https://appelsiini.net/projects/lazyload
 *
 * Version: 2.0.0-beta.2
 *
 */

var defaults = {
  src: 'data-src',
  srcset: 'data-srcset',
  selector: '.lazyload'

  /**
  * Merge two or more objects. Returns a new object.
  * @private
  * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
  * @param {Object}   objects  The objects to merge together
  * @returns {Object}          Merged values of defaults and options
  */
};var extend = function extend() {
  var extended = {};
  var deep = false;
  var i = 0;
  var length = arguments.length;

  /* Check if a deep merge */
  if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
    deep = arguments[0];
    i++;
  }

  /* Merge the object into the extended object */
  var merge = function merge(obj) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        /* If deep merge and property is an object, merge properties */
        if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          extended[prop] = extend(true, extended[prop], obj[prop]);
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };

  /* Loop through each object and conduct a merge */
  for (; i < length; i++) {
    var obj = arguments[i];
    merge(obj);
  }

  return extended;
};

function LazyLoad(images, options) {
  this.settings = extend(defaults, options || {});
  this.images = images || document.querySelectorAll(this.settings.selector);
  this.observer = null;
  this.init();
}

LazyLoad.prototype = {
  init: function init() {
    /* Without observers load everything and bail out early. */
    if (!window.IntersectionObserver) {
      this.loadImages();
      return;
    }

    var self = this;
    var observerConfig = {
      root: null,
      rootMargin: '0px',
      threshold: [0]
    };

    this.observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.intersectionRatio > 0) {
          self.observer.unobserve(entry.target);
          var src = entry.target.getAttribute(self.settings.src);
          var srcset = entry.target.getAttribute(self.settings.srcset);
          if (entry.target.tagName.toLowerCase() === 'img' || entry.target.tagName.toLowerCase() === 'video') {
            if (src) {
              entry.target.src = src;
            }
            if (srcset) {
              entry.target.srcset = srcset;
            }
          } else {
            entry.target.style.backgroundImage = 'url(' + src + ')';
          }
        }
      });
    }, observerConfig);

    this.images.forEach(function (image) {
      self.observer.observe(image);
    });
  },

  loadAndDestroy: function loadAndDestroy() {
    if (!this.settings) {
      return;
    }
    this.loadImages();
    this.destroy();
  },

  loadImages: function loadImages() {
    if (!this.settings) {
      return;
    }

    var self = this;
    this.images.forEach(function (image) {
      var src = image.getAttribute(self.settings.src);
      var srcset = image.getAttribute(self.settings.srcset);
      if (image.tagName.toLowerCase() === 'img' || image.tagName.toLowerCase() === 'video') {
        if (src) {
          image.src = src;
        }
        if (srcset) {
          image.srcset = srcset;
        }
      } else {
        image.style.backgroundImage = 'url(' + src + ')';
      }
    });
  },

  destroy: function destroy() {
    if (!this.settings) {
      return;
    }
    this.observer.disconnect();
    this.settings = null;
  }
};

exports.default = LazyLoad;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadScript;
function loadScript(src, callback) {
  var s, r, t;
  r = false;
  s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = src;
  s.onload = s.onreadystatechange = function () {
    if (!r && (!this.readyState || this.readyState === 'complete')) {
      r = true;
      callback();
    }
  };
  t = document.getElementsByTagName('script')[0];
  t.parentNode.insertBefore(s, t);
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGRjMDdiOTI1MjkwY2JkOGNhMDAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2hhbW1lcmpzL2hhbW1lci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXV1cmkvbXV1cmkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9tYWluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zd2lwZWpzL3N3aXBlLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9sYXp5bG9hZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2xvYWRTY3JpcHQuanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwic2V0VGltZW91dCIsIm1zbnJ5Q29udGFpbmVyIiwicXVlcnlTZWxlY3RvciIsImNsYXNzTGlzdCIsImFkZCIsIml0ZW1zIiwibGF5b3V0IiwiZmlsbEdhcHMiLCJob3Jpem9udGFsIiwiYWxpZ25SaWdodCIsImFsaWduQm90dG9tIiwicm91bmRpbmciLCJnbWFwc0VscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsZW5ndGgiLCJmb3JFYWNoIiwibWFwT3B0aW9ucyIsInpvb20iLCJtYXBUeXBlSWQiLCJnb29nbGUiLCJtYXBzIiwiTWFwVHlwZUlkIiwiUk9BRE1BUCIsImNlbnRlciIsIkxhdExuZyIsIm1hcCIsIk1hcCIsImVsIiwibWFya2VyIiwiTWFya2VyIiwicG9zaXRpb24iLCJpY29uIiwicGF0aCIsImZpbGxDb2xvciIsImZpbGxPcGFjaXR5IiwiYW5jaG9yIiwiUG9pbnQiLCJzdHJva2VXZWlnaHQiLCJwYW5UbyIsImdldFBvc2l0aW9uIiwibWVudSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInJlbW92ZSIsImNvbnRhY3RzVGV4dCIsImhvbWVMaW5rIiwiZml4UG9zaXRpb24iLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwibGVmdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIngiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJyZXNpemVUaW1lciIsImNsZWFyVGltZW91dCIsIm9iamVjdCIsInNob3ciLCJsb2dvIiwiY29udGVudERvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJ2aWRlbyIsInRhcmdldCIsImNvbnRhaW5zIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsImRhdGFzZXQiLCJhdXRvcGxheSIsImxvb3AiLCJwYXJlbnROb2RlIiwiYXBwZW5kIiwiYnRuIiwiY3VycmVudFRpbWUiLCJwbGF5IiwicGF1c2UiLCJkb3RzIiwiaG9tZVNsaWRlciIsImRyYWdnYWJsZSIsImNvbnRpbnVvdXMiLCJ0cmFuc2l0aW9uRW5kIiwiaW5kZXgiLCJlbGVtZW50IiwiZCIsInNsaWRlIiwibG9hZEFuZERlc3Ryb3kiLCJkZWZhdWx0cyIsInNyY3NldCIsInNlbGVjdG9yIiwiZXh0ZW5kIiwiZXh0ZW5kZWQiLCJkZWVwIiwiaSIsImFyZ3VtZW50cyIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsIm1lcmdlIiwib2JqIiwicHJvcCIsImhhc093blByb3BlcnR5IiwiTGF6eUxvYWQiLCJpbWFnZXMiLCJvcHRpb25zIiwic2V0dGluZ3MiLCJvYnNlcnZlciIsImluaXQiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsImxvYWRJbWFnZXMiLCJzZWxmIiwib2JzZXJ2ZXJDb25maWciLCJyb290Iiwicm9vdE1hcmdpbiIsInRocmVzaG9sZCIsImVudHJpZXMiLCJlbnRyeSIsImludGVyc2VjdGlvblJhdGlvIiwidW5vYnNlcnZlIiwiZ2V0QXR0cmlidXRlIiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwic3R5bGUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJpbWFnZSIsIm9ic2VydmUiLCJkZXN0cm95IiwiZGlzY29ubmVjdCIsImxvYWRTY3JpcHQiLCJjYWxsYmFjayIsInMiLCJyIiwidCIsInR5cGUiLCJvbmxvYWQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwiaW5zZXJ0QmVmb3JlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFRO0FBQ25CLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPLEtBQUs7QUFDdkIsV0FBVyxPQUFPLEtBQUs7QUFDdkIsV0FBVyxNQUFNO0FBQ2pCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsTUFBTTtBQUNqQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxNQUFNO0FBQ2pCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxNQUFNO0FBQ2pCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBeUI7O0FBRXpCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLFVBQVU7QUFDVixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsZ0JBQWdCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsV0FBVyxZQUFZO0FBQ3ZCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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Q2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxtR0FBbUcsR0FBRztBQUN0Rzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQUE7QUFDTCxDQUFDO0FBQ0Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7O0FDbGxGRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsU0FBUztBQUN0QixlQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLFNBQVM7QUFDdEIsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxTQUFTO0FBQ3RCLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLGtCQUFrQjtBQUNqQztBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLEtBQUs7QUFDbEIsYUFBYSxZQUFZO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FB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dkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkZBQTJGOztBQUUzRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsU0FBUztBQUN0QixlQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxTQUFTO0FBQ3RCLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsU0FBUztBQUN0QixlQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxFQUFFO0FBQ2Ys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Q0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSzs7QUFFTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUU7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQixhQUFhLE9BQU87QUFDcEIsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsd0JBQXdCOztBQUV2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLHNCQUFzQjtBQUNyQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZSxzQkFBc0I7QUFDckM7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsc0RBQXNEO0FBQ2hGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDhEQUE4RDtBQUN4Rjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4QkFBOEIsdURBQXVEO0FBQ3JGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHVEQUF1RDtBQUNqRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QiwyREFBMkQ7QUFDdkY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7QUFDQSwwQkFBMEIsMkRBQTJEOztBQUVyRjtBQUNBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7QUFDQSwwQkFBMEIsMkRBQTJEOztBQUVyRjtBQUNBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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QTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxrQkFBa0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0VBQWtFLGtCQUFrQjtBQUNwRjtBQUNBLGtCQUFrQiw0QkFBNEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsVUFBVTtBQUN2QixhQUFhLFVBQVU7QUFDdkIsY0FBYztBQUNkO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNB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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQWdDLGVBQWUsRUFBRTs7QUFFakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLE9BQU87QUFDUCx1Q0FBdUM7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsbUJBQW1CO0FBQ3hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsd0RBQXdEOztBQUV4RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsaUNBQWlDO0FBQ2pDO0FBQ0E7O0FBRUEsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FB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QUFOLElBQW9CLEtBQUtBLFVBQUwsS0FBb0IsVUFBL0MsQ0FBSixFQUFnRTtBQUM5REwsVUFBSSxJQUFKO0FBQ0FGO0FBQ0Q7QUFDRixHQUxEO0FBTUFHLE1BQUlySSxTQUFTOEQsb0JBQVQsQ0FBOEIsUUFBOUIsRUFBd0MsQ0FBeEMsQ0FBSjtBQUNBdUUsSUFBRTlELFVBQUYsQ0FBYW1FLFlBQWIsQ0FBMEJQLENBQTFCLEVBQTZCRSxDQUE3QjtBQUNELEMiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdFwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGRkYzA3YjkyNTI5MGNiZDhjYTAwIiwiLyohIEhhbW1lci5KUyAtIHYyLjAuNyAtIDIwMTYtMDQtMjJcbiAqIGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE2IEpvcmlrIFRhbmdlbGRlcjtcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSAqL1xuKGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQsIGV4cG9ydE5hbWUsIHVuZGVmaW5lZCkge1xuICAndXNlIHN0cmljdCc7XG5cbnZhciBWRU5ET1JfUFJFRklYRVMgPSBbJycsICd3ZWJraXQnLCAnTW96JywgJ01TJywgJ21zJywgJ28nXTtcbnZhciBURVNUX0VMRU1FTlQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxudmFyIFRZUEVfRlVOQ1RJT04gPSAnZnVuY3Rpb24nO1xuXG52YXIgcm91bmQgPSBNYXRoLnJvdW5kO1xudmFyIGFicyA9IE1hdGguYWJzO1xudmFyIG5vdyA9IERhdGUubm93O1xuXG4vKipcbiAqIHNldCBhIHRpbWVvdXQgd2l0aCBhIGdpdmVuIHNjb3BlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVvdXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBzZXRUaW1lb3V0Q29udGV4dChmbiwgdGltZW91dCwgY29udGV4dCkge1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGJpbmRGbihmbiwgY29udGV4dCksIHRpbWVvdXQpO1xufVxuXG4vKipcbiAqIGlmIHRoZSBhcmd1bWVudCBpcyBhbiBhcnJheSwgd2Ugd2FudCB0byBleGVjdXRlIHRoZSBmbiBvbiBlYWNoIGVudHJ5XG4gKiBpZiBpdCBhaW50IGFuIGFycmF5IHdlIGRvbid0IHdhbnQgdG8gZG8gYSB0aGluZy5cbiAqIHRoaXMgaXMgdXNlZCBieSBhbGwgdGhlIG1ldGhvZHMgdGhhdCBhY2NlcHQgYSBzaW5nbGUgYW5kIGFycmF5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfEFycmF5fSBhcmdcbiAqIEBwYXJhbSB7U3RyaW5nfSBmblxuICogQHBhcmFtIHtPYmplY3R9IFtjb250ZXh0XVxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGludm9rZUFycmF5QXJnKGFyZywgZm4sIGNvbnRleHQpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG4gICAgICAgIGVhY2goYXJnLCBjb250ZXh0W2ZuXSwgY29udGV4dCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogd2FsayBvYmplY3RzIGFuZCBhcnJheXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICovXG5mdW5jdGlvbiBlYWNoKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICB2YXIgaTtcblxuICAgIGlmICghb2JqKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAob2JqLmZvckVhY2gpIHtcbiAgICAgICAgb2JqLmZvckVhY2goaXRlcmF0b3IsIGNvbnRleHQpO1xuICAgIH0gZWxzZSBpZiAob2JqLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IG9iai5sZW5ndGgpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChpIGluIG9iaikge1xuICAgICAgICAgICAgb2JqLmhhc093blByb3BlcnR5KGkpICYmIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIHdyYXAgYSBtZXRob2Qgd2l0aCBhIGRlcHJlY2F0aW9uIHdhcm5pbmcgYW5kIHN0YWNrIHRyYWNlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbiB3cmFwcGluZyB0aGUgc3VwcGxpZWQgbWV0aG9kLlxuICovXG5mdW5jdGlvbiBkZXByZWNhdGUobWV0aG9kLCBuYW1lLCBtZXNzYWdlKSB7XG4gICAgdmFyIGRlcHJlY2F0aW9uTWVzc2FnZSA9ICdERVBSRUNBVEVEIE1FVEhPRDogJyArIG5hbWUgKyAnXFxuJyArIG1lc3NhZ2UgKyAnIEFUIFxcbic7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZSA9IG5ldyBFcnJvcignZ2V0LXN0YWNrLXRyYWNlJyk7XG4gICAgICAgIHZhciBzdGFjayA9IGUgJiYgZS5zdGFjayA/IGUuc3RhY2sucmVwbGFjZSgvXlteXFwoXSs/W1xcbiRdL2dtLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eXFxzK2F0XFxzKy9nbSwgJycpXG4gICAgICAgICAgICAucmVwbGFjZSgvXk9iamVjdC48YW5vbnltb3VzPlxccypcXCgvZ20sICd7YW5vbnltb3VzfSgpQCcpIDogJ1Vua25vd24gU3RhY2sgVHJhY2UnO1xuXG4gICAgICAgIHZhciBsb2cgPSB3aW5kb3cuY29uc29sZSAmJiAod2luZG93LmNvbnNvbGUud2FybiB8fCB3aW5kb3cuY29uc29sZS5sb2cpO1xuICAgICAgICBpZiAobG9nKSB7XG4gICAgICAgICAgICBsb2cuY2FsbCh3aW5kb3cuY29uc29sZSwgZGVwcmVjYXRpb25NZXNzYWdlLCBzdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5cbi8qKlxuICogZXh0ZW5kIG9iamVjdC5cbiAqIG1lYW5zIHRoYXQgcHJvcGVydGllcyBpbiBkZXN0IHdpbGwgYmUgb3ZlcndyaXR0ZW4gYnkgdGhlIG9uZXMgaW4gc3JjLlxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICogQHBhcmFtIHsuLi5PYmplY3R9IG9iamVjdHNfdG9fYXNzaWduXG4gKiBAcmV0dXJucyB7T2JqZWN0fSB0YXJnZXRcbiAqL1xudmFyIGFzc2lnbjtcbmlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIGFzc2lnbiA9IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQpIHtcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb3V0cHV0ID0gT2JqZWN0KHRhcmdldCk7XG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcbiAgICAgICAgICAgIGlmIChzb3VyY2UgIT09IHVuZGVmaW5lZCAmJiBzb3VyY2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuZXh0S2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KG5leHRLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRbbmV4dEtleV0gPSBzb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9O1xufSBlbHNlIHtcbiAgICBhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xufVxuXG4vKipcbiAqIGV4dGVuZCBvYmplY3QuXG4gKiBtZWFucyB0aGF0IHByb3BlcnRpZXMgaW4gZGVzdCB3aWxsIGJlIG92ZXJ3cml0dGVuIGJ5IHRoZSBvbmVzIGluIHNyYy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXN0XG4gKiBAcGFyYW0ge09iamVjdH0gc3JjXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFttZXJnZT1mYWxzZV1cbiAqIEByZXR1cm5zIHtPYmplY3R9IGRlc3RcbiAqL1xudmFyIGV4dGVuZCA9IGRlcHJlY2F0ZShmdW5jdGlvbiBleHRlbmQoZGVzdCwgc3JjLCBtZXJnZSkge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoc3JjKTtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBrZXlzLmxlbmd0aCkge1xuICAgICAgICBpZiAoIW1lcmdlIHx8IChtZXJnZSAmJiBkZXN0W2tleXNbaV1dID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICBkZXN0W2tleXNbaV1dID0gc3JjW2tleXNbaV1dO1xuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIGRlc3Q7XG59LCAnZXh0ZW5kJywgJ1VzZSBgYXNzaWduYC4nKTtcblxuLyoqXG4gKiBtZXJnZSB0aGUgdmFsdWVzIGZyb20gc3JjIGluIHRoZSBkZXN0LlxuICogbWVhbnMgdGhhdCBwcm9wZXJ0aWVzIHRoYXQgZXhpc3QgaW4gZGVzdCB3aWxsIG5vdCBiZSBvdmVyd3JpdHRlbiBieSBzcmNcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXN0XG4gKiBAcGFyYW0ge09iamVjdH0gc3JjXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBkZXN0XG4gKi9cbnZhciBtZXJnZSA9IGRlcHJlY2F0ZShmdW5jdGlvbiBtZXJnZShkZXN0LCBzcmMpIHtcbiAgICByZXR1cm4gZXh0ZW5kKGRlc3QsIHNyYywgdHJ1ZSk7XG59LCAnbWVyZ2UnLCAnVXNlIGBhc3NpZ25gLicpO1xuXG4vKipcbiAqIHNpbXBsZSBjbGFzcyBpbmhlcml0YW5jZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2hpbGRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGJhc2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllc11cbiAqL1xuZnVuY3Rpb24gaW5oZXJpdChjaGlsZCwgYmFzZSwgcHJvcGVydGllcykge1xuICAgIHZhciBiYXNlUCA9IGJhc2UucHJvdG90eXBlLFxuICAgICAgICBjaGlsZFA7XG5cbiAgICBjaGlsZFAgPSBjaGlsZC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGJhc2VQKTtcbiAgICBjaGlsZFAuY29uc3RydWN0b3IgPSBjaGlsZDtcbiAgICBjaGlsZFAuX3N1cGVyID0gYmFzZVA7XG5cbiAgICBpZiAocHJvcGVydGllcykge1xuICAgICAgICBhc3NpZ24oY2hpbGRQLCBwcm9wZXJ0aWVzKTtcbiAgICB9XG59XG5cbi8qKlxuICogc2ltcGxlIGZ1bmN0aW9uIGJpbmRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBiaW5kRm4oZm4sIGNvbnRleHQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gYm91bmRGbigpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBsZXQgYSBib29sZWFuIHZhbHVlIGFsc28gYmUgYSBmdW5jdGlvbiB0aGF0IG11c3QgcmV0dXJuIGEgYm9vbGVhblxuICogdGhpcyBmaXJzdCBpdGVtIGluIGFyZ3Mgd2lsbCBiZSB1c2VkIGFzIHRoZSBjb250ZXh0XG4gKiBAcGFyYW0ge0Jvb2xlYW58RnVuY3Rpb259IHZhbFxuICogQHBhcmFtIHtBcnJheX0gW2FyZ3NdXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gYm9vbE9yRm4odmFsLCBhcmdzKSB7XG4gICAgaWYgKHR5cGVvZiB2YWwgPT0gVFlQRV9GVU5DVElPTikge1xuICAgICAgICByZXR1cm4gdmFsLmFwcGx5KGFyZ3MgPyBhcmdzWzBdIHx8IHVuZGVmaW5lZCA6IHVuZGVmaW5lZCwgYXJncyk7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG59XG5cbi8qKlxuICogdXNlIHRoZSB2YWwyIHdoZW4gdmFsMSBpcyB1bmRlZmluZWRcbiAqIEBwYXJhbSB7Kn0gdmFsMVxuICogQHBhcmFtIHsqfSB2YWwyXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gaWZVbmRlZmluZWQodmFsMSwgdmFsMikge1xuICAgIHJldHVybiAodmFsMSA9PT0gdW5kZWZpbmVkKSA/IHZhbDIgOiB2YWwxO1xufVxuXG4vKipcbiAqIGFkZEV2ZW50TGlzdGVuZXIgd2l0aCBtdWx0aXBsZSBldmVudHMgYXQgb25jZVxuICogQHBhcmFtIHtFdmVudFRhcmdldH0gdGFyZ2V0XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZXNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAqL1xuZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnModGFyZ2V0LCB0eXBlcywgaGFuZGxlcikge1xuICAgIGVhY2goc3BsaXRTdHIodHlwZXMpLCBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiByZW1vdmVFdmVudExpc3RlbmVyIHdpdGggbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2VcbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IHRhcmdldFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJzKHRhcmdldCwgdHlwZXMsIGhhbmRsZXIpIHtcbiAgICBlYWNoKHNwbGl0U3RyKHR5cGVzKSwgZnVuY3Rpb24odHlwZSkge1xuICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgfSk7XG59XG5cbi8qKlxuICogZmluZCBpZiBhIG5vZGUgaXMgaW4gdGhlIGdpdmVuIHBhcmVudFxuICogQG1ldGhvZCBoYXNQYXJlbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudFxuICogQHJldHVybiB7Qm9vbGVhbn0gZm91bmRcbiAqL1xuZnVuY3Rpb24gaGFzUGFyZW50KG5vZGUsIHBhcmVudCkge1xuICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIGlmIChub2RlID09IHBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIHNtYWxsIGluZGV4T2Ygd3JhcHBlclxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IGZpbmRcbiAqIEByZXR1cm5zIHtCb29sZWFufSBmb3VuZFxuICovXG5mdW5jdGlvbiBpblN0cihzdHIsIGZpbmQpIHtcbiAgICByZXR1cm4gc3RyLmluZGV4T2YoZmluZCkgPiAtMTtcbn1cblxuLyoqXG4gKiBzcGxpdCBzdHJpbmcgb24gd2hpdGVzcGFjZVxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge0FycmF5fSB3b3Jkc1xuICovXG5mdW5jdGlvbiBzcGxpdFN0cihzdHIpIHtcbiAgICByZXR1cm4gc3RyLnRyaW0oKS5zcGxpdCgvXFxzKy9nKTtcbn1cblxuLyoqXG4gKiBmaW5kIGlmIGEgYXJyYXkgY29udGFpbnMgdGhlIG9iamVjdCB1c2luZyBpbmRleE9mIG9yIGEgc2ltcGxlIHBvbHlGaWxsXG4gKiBAcGFyYW0ge0FycmF5fSBzcmNcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaW5kXG4gKiBAcGFyYW0ge1N0cmluZ30gW2ZpbmRCeUtleV1cbiAqIEByZXR1cm4ge0Jvb2xlYW58TnVtYmVyfSBmYWxzZSB3aGVuIG5vdCBmb3VuZCwgb3IgdGhlIGluZGV4XG4gKi9cbmZ1bmN0aW9uIGluQXJyYXkoc3JjLCBmaW5kLCBmaW5kQnlLZXkpIHtcbiAgICBpZiAoc3JjLmluZGV4T2YgJiYgIWZpbmRCeUtleSkge1xuICAgICAgICByZXR1cm4gc3JjLmluZGV4T2YoZmluZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHNyYy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICgoZmluZEJ5S2V5ICYmIHNyY1tpXVtmaW5kQnlLZXldID09IGZpbmQpIHx8ICghZmluZEJ5S2V5ICYmIHNyY1tpXSA9PT0gZmluZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxufVxuXG4vKipcbiAqIGNvbnZlcnQgYXJyYXktbGlrZSBvYmplY3RzIHRvIHJlYWwgYXJyYXlzXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXkob2JqKSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG9iaiwgMCk7XG59XG5cbi8qKlxuICogdW5pcXVlIGFycmF5IHdpdGggb2JqZWN0cyBiYXNlZCBvbiBhIGtleSAobGlrZSAnaWQnKSBvciBqdXN0IGJ5IHRoZSBhcnJheSdzIHZhbHVlXG4gKiBAcGFyYW0ge0FycmF5fSBzcmMgW3tpZDoxfSx7aWQ6Mn0se2lkOjF9XVxuICogQHBhcmFtIHtTdHJpbmd9IFtrZXldXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtzb3J0PUZhbHNlXVxuICogQHJldHVybnMge0FycmF5fSBbe2lkOjF9LHtpZDoyfV1cbiAqL1xuZnVuY3Rpb24gdW5pcXVlQXJyYXkoc3JjLCBrZXksIHNvcnQpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICB2YXIgaSA9IDA7XG5cbiAgICB3aGlsZSAoaSA8IHNyYy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIHZhbCA9IGtleSA/IHNyY1tpXVtrZXldIDogc3JjW2ldO1xuICAgICAgICBpZiAoaW5BcnJheSh2YWx1ZXMsIHZhbCkgPCAwKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goc3JjW2ldKTtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZXNbaV0gPSB2YWw7XG4gICAgICAgIGkrKztcbiAgICB9XG5cbiAgICBpZiAoc29ydCkge1xuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuc29ydCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuc29ydChmdW5jdGlvbiBzb3J0VW5pcXVlQXJyYXkoYSwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBhW2tleV0gPiBiW2tleV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xufVxuXG4vKipcbiAqIGdldCB0aGUgcHJlZml4ZWQgcHJvcGVydHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICogQHJldHVybnMge1N0cmluZ3xVbmRlZmluZWR9IHByZWZpeGVkXG4gKi9cbmZ1bmN0aW9uIHByZWZpeGVkKG9iaiwgcHJvcGVydHkpIHtcbiAgICB2YXIgcHJlZml4LCBwcm9wO1xuICAgIHZhciBjYW1lbFByb3AgPSBwcm9wZXJ0eVswXS50b1VwcGVyQ2FzZSgpICsgcHJvcGVydHkuc2xpY2UoMSk7XG5cbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBWRU5ET1JfUFJFRklYRVMubGVuZ3RoKSB7XG4gICAgICAgIHByZWZpeCA9IFZFTkRPUl9QUkVGSVhFU1tpXTtcbiAgICAgICAgcHJvcCA9IChwcmVmaXgpID8gcHJlZml4ICsgY2FtZWxQcm9wIDogcHJvcGVydHk7XG5cbiAgICAgICAgaWYgKHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcDtcbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogZ2V0IGEgdW5pcXVlIGlkXG4gKiBAcmV0dXJucyB7bnVtYmVyfSB1bmlxdWVJZFxuICovXG52YXIgX3VuaXF1ZUlkID0gMTtcbmZ1bmN0aW9uIHVuaXF1ZUlkKCkge1xuICAgIHJldHVybiBfdW5pcXVlSWQrKztcbn1cblxuLyoqXG4gKiBnZXQgdGhlIHdpbmRvdyBvYmplY3Qgb2YgYW4gZWxlbWVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybnMge0RvY3VtZW50Vmlld3xXaW5kb3d9XG4gKi9cbmZ1bmN0aW9uIGdldFdpbmRvd0ZvckVsZW1lbnQoZWxlbWVudCkge1xuICAgIHZhciBkb2MgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQgfHwgZWxlbWVudDtcbiAgICByZXR1cm4gKGRvYy5kZWZhdWx0VmlldyB8fCBkb2MucGFyZW50V2luZG93IHx8IHdpbmRvdyk7XG59XG5cbnZhciBNT0JJTEVfUkVHRVggPSAvbW9iaWxlfHRhYmxldHxpcChhZHxob25lfG9kKXxhbmRyb2lkL2k7XG5cbnZhciBTVVBQT1JUX1RPVUNIID0gKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyk7XG52YXIgU1VQUE9SVF9QT0lOVEVSX0VWRU5UUyA9IHByZWZpeGVkKHdpbmRvdywgJ1BvaW50ZXJFdmVudCcpICE9PSB1bmRlZmluZWQ7XG52YXIgU1VQUE9SVF9PTkxZX1RPVUNIID0gU1VQUE9SVF9UT1VDSCAmJiBNT0JJTEVfUkVHRVgudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxudmFyIElOUFVUX1RZUEVfVE9VQ0ggPSAndG91Y2gnO1xudmFyIElOUFVUX1RZUEVfUEVOID0gJ3Blbic7XG52YXIgSU5QVVRfVFlQRV9NT1VTRSA9ICdtb3VzZSc7XG52YXIgSU5QVVRfVFlQRV9LSU5FQ1QgPSAna2luZWN0JztcblxudmFyIENPTVBVVEVfSU5URVJWQUwgPSAyNTtcblxudmFyIElOUFVUX1NUQVJUID0gMTtcbnZhciBJTlBVVF9NT1ZFID0gMjtcbnZhciBJTlBVVF9FTkQgPSA0O1xudmFyIElOUFVUX0NBTkNFTCA9IDg7XG5cbnZhciBESVJFQ1RJT05fTk9ORSA9IDE7XG52YXIgRElSRUNUSU9OX0xFRlQgPSAyO1xudmFyIERJUkVDVElPTl9SSUdIVCA9IDQ7XG52YXIgRElSRUNUSU9OX1VQID0gODtcbnZhciBESVJFQ1RJT05fRE9XTiA9IDE2O1xuXG52YXIgRElSRUNUSU9OX0hPUklaT05UQUwgPSBESVJFQ1RJT05fTEVGVCB8IERJUkVDVElPTl9SSUdIVDtcbnZhciBESVJFQ1RJT05fVkVSVElDQUwgPSBESVJFQ1RJT05fVVAgfCBESVJFQ1RJT05fRE9XTjtcbnZhciBESVJFQ1RJT05fQUxMID0gRElSRUNUSU9OX0hPUklaT05UQUwgfCBESVJFQ1RJT05fVkVSVElDQUw7XG5cbnZhciBQUk9QU19YWSA9IFsneCcsICd5J107XG52YXIgUFJPUFNfQ0xJRU5UX1hZID0gWydjbGllbnRYJywgJ2NsaWVudFknXTtcblxuLyoqXG4gKiBjcmVhdGUgbmV3IGlucHV0IHR5cGUgbWFuYWdlclxuICogQHBhcmFtIHtNYW5hZ2VyfSBtYW5hZ2VyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0lucHV0fVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIElucHV0KG1hbmFnZXIsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMubWFuYWdlciA9IG1hbmFnZXI7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHRoaXMuZWxlbWVudCA9IG1hbmFnZXIuZWxlbWVudDtcbiAgICB0aGlzLnRhcmdldCA9IG1hbmFnZXIub3B0aW9ucy5pbnB1dFRhcmdldDtcblxuICAgIC8vIHNtYWxsZXIgd3JhcHBlciBhcm91bmQgdGhlIGhhbmRsZXIsIGZvciB0aGUgc2NvcGUgYW5kIHRoZSBlbmFibGVkIHN0YXRlIG9mIHRoZSBtYW5hZ2VyLFxuICAgIC8vIHNvIHdoZW4gZGlzYWJsZWQgdGhlIGlucHV0IGV2ZW50cyBhcmUgY29tcGxldGVseSBieXBhc3NlZC5cbiAgICB0aGlzLmRvbUhhbmRsZXIgPSBmdW5jdGlvbihldikge1xuICAgICAgICBpZiAoYm9vbE9yRm4obWFuYWdlci5vcHRpb25zLmVuYWJsZSwgW21hbmFnZXJdKSkge1xuICAgICAgICAgICAgc2VsZi5oYW5kbGVyKGV2KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmluaXQoKTtcblxufVxuXG5JbnB1dC5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogc2hvdWxkIGhhbmRsZSB0aGUgaW5wdXRFdmVudCBkYXRhIGFuZCB0cmlnZ2VyIHRoZSBjYWxsYmFja1xuICAgICAqIEB2aXJ0dWFsXG4gICAgICovXG4gICAgaGFuZGxlcjogZnVuY3Rpb24oKSB7IH0sXG5cbiAgICAvKipcbiAgICAgKiBiaW5kIHRoZSBldmVudHNcbiAgICAgKi9cbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ldkVsICYmIGFkZEV2ZW50TGlzdGVuZXJzKHRoaXMuZWxlbWVudCwgdGhpcy5ldkVsLCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgICAgICB0aGlzLmV2VGFyZ2V0ICYmIGFkZEV2ZW50TGlzdGVuZXJzKHRoaXMudGFyZ2V0LCB0aGlzLmV2VGFyZ2V0LCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgICAgICB0aGlzLmV2V2luICYmIGFkZEV2ZW50TGlzdGVuZXJzKGdldFdpbmRvd0ZvckVsZW1lbnQodGhpcy5lbGVtZW50KSwgdGhpcy5ldldpbiwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdW5iaW5kIHRoZSBldmVudHNcbiAgICAgKi9cbiAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ldkVsICYmIHJlbW92ZUV2ZW50TGlzdGVuZXJzKHRoaXMuZWxlbWVudCwgdGhpcy5ldkVsLCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgICAgICB0aGlzLmV2VGFyZ2V0ICYmIHJlbW92ZUV2ZW50TGlzdGVuZXJzKHRoaXMudGFyZ2V0LCB0aGlzLmV2VGFyZ2V0LCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgICAgICB0aGlzLmV2V2luICYmIHJlbW92ZUV2ZW50TGlzdGVuZXJzKGdldFdpbmRvd0ZvckVsZW1lbnQodGhpcy5lbGVtZW50KSwgdGhpcy5ldldpbiwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIGNyZWF0ZSBuZXcgaW5wdXQgdHlwZSBtYW5hZ2VyXG4gKiBjYWxsZWQgYnkgdGhlIE1hbmFnZXIgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7SGFtbWVyfSBtYW5hZ2VyXG4gKiBAcmV0dXJucyB7SW5wdXR9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUlucHV0SW5zdGFuY2UobWFuYWdlcikge1xuICAgIHZhciBUeXBlO1xuICAgIHZhciBpbnB1dENsYXNzID0gbWFuYWdlci5vcHRpb25zLmlucHV0Q2xhc3M7XG5cbiAgICBpZiAoaW5wdXRDbGFzcykge1xuICAgICAgICBUeXBlID0gaW5wdXRDbGFzcztcbiAgICB9IGVsc2UgaWYgKFNVUFBPUlRfUE9JTlRFUl9FVkVOVFMpIHtcbiAgICAgICAgVHlwZSA9IFBvaW50ZXJFdmVudElucHV0O1xuICAgIH0gZWxzZSBpZiAoU1VQUE9SVF9PTkxZX1RPVUNIKSB7XG4gICAgICAgIFR5cGUgPSBUb3VjaElucHV0O1xuICAgIH0gZWxzZSBpZiAoIVNVUFBPUlRfVE9VQ0gpIHtcbiAgICAgICAgVHlwZSA9IE1vdXNlSW5wdXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgVHlwZSA9IFRvdWNoTW91c2VJbnB1dDtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyAoVHlwZSkobWFuYWdlciwgaW5wdXRIYW5kbGVyKTtcbn1cblxuLyoqXG4gKiBoYW5kbGUgaW5wdXQgZXZlbnRzXG4gKiBAcGFyYW0ge01hbmFnZXJ9IG1hbmFnZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFR5cGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICovXG5mdW5jdGlvbiBpbnB1dEhhbmRsZXIobWFuYWdlciwgZXZlbnRUeXBlLCBpbnB1dCkge1xuICAgIHZhciBwb2ludGVyc0xlbiA9IGlucHV0LnBvaW50ZXJzLmxlbmd0aDtcbiAgICB2YXIgY2hhbmdlZFBvaW50ZXJzTGVuID0gaW5wdXQuY2hhbmdlZFBvaW50ZXJzLmxlbmd0aDtcbiAgICB2YXIgaXNGaXJzdCA9IChldmVudFR5cGUgJiBJTlBVVF9TVEFSVCAmJiAocG9pbnRlcnNMZW4gLSBjaGFuZ2VkUG9pbnRlcnNMZW4gPT09IDApKTtcbiAgICB2YXIgaXNGaW5hbCA9IChldmVudFR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSAmJiAocG9pbnRlcnNMZW4gLSBjaGFuZ2VkUG9pbnRlcnNMZW4gPT09IDApKTtcblxuICAgIGlucHV0LmlzRmlyc3QgPSAhIWlzRmlyc3Q7XG4gICAgaW5wdXQuaXNGaW5hbCA9ICEhaXNGaW5hbDtcblxuICAgIGlmIChpc0ZpcnN0KSB7XG4gICAgICAgIG1hbmFnZXIuc2Vzc2lvbiA9IHt9O1xuICAgIH1cblxuICAgIC8vIHNvdXJjZSBldmVudCBpcyB0aGUgbm9ybWFsaXplZCB2YWx1ZSBvZiB0aGUgZG9tRXZlbnRzXG4gICAgLy8gbGlrZSAndG91Y2hzdGFydCwgbW91c2V1cCwgcG9pbnRlcmRvd24nXG4gICAgaW5wdXQuZXZlbnRUeXBlID0gZXZlbnRUeXBlO1xuXG4gICAgLy8gY29tcHV0ZSBzY2FsZSwgcm90YXRpb24gZXRjXG4gICAgY29tcHV0ZUlucHV0RGF0YShtYW5hZ2VyLCBpbnB1dCk7XG5cbiAgICAvLyBlbWl0IHNlY3JldCBldmVudFxuICAgIG1hbmFnZXIuZW1pdCgnaGFtbWVyLmlucHV0JywgaW5wdXQpO1xuXG4gICAgbWFuYWdlci5yZWNvZ25pemUoaW5wdXQpO1xuICAgIG1hbmFnZXIuc2Vzc2lvbi5wcmV2SW5wdXQgPSBpbnB1dDtcbn1cblxuLyoqXG4gKiBleHRlbmQgdGhlIGRhdGEgd2l0aCBzb21lIHVzYWJsZSBwcm9wZXJ0aWVzIGxpa2Ugc2NhbGUsIHJvdGF0ZSwgdmVsb2NpdHkgZXRjXG4gKiBAcGFyYW0ge09iamVjdH0gbWFuYWdlclxuICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gKi9cbmZ1bmN0aW9uIGNvbXB1dGVJbnB1dERhdGEobWFuYWdlciwgaW5wdXQpIHtcbiAgICB2YXIgc2Vzc2lvbiA9IG1hbmFnZXIuc2Vzc2lvbjtcbiAgICB2YXIgcG9pbnRlcnMgPSBpbnB1dC5wb2ludGVycztcbiAgICB2YXIgcG9pbnRlcnNMZW5ndGggPSBwb2ludGVycy5sZW5ndGg7XG5cbiAgICAvLyBzdG9yZSB0aGUgZmlyc3QgaW5wdXQgdG8gY2FsY3VsYXRlIHRoZSBkaXN0YW5jZSBhbmQgZGlyZWN0aW9uXG4gICAgaWYgKCFzZXNzaW9uLmZpcnN0SW5wdXQpIHtcbiAgICAgICAgc2Vzc2lvbi5maXJzdElucHV0ID0gc2ltcGxlQ2xvbmVJbnB1dERhdGEoaW5wdXQpO1xuICAgIH1cblxuICAgIC8vIHRvIGNvbXB1dGUgc2NhbGUgYW5kIHJvdGF0aW9uIHdlIG5lZWQgdG8gc3RvcmUgdGhlIG11bHRpcGxlIHRvdWNoZXNcbiAgICBpZiAocG9pbnRlcnNMZW5ndGggPiAxICYmICFzZXNzaW9uLmZpcnN0TXVsdGlwbGUpIHtcbiAgICAgICAgc2Vzc2lvbi5maXJzdE11bHRpcGxlID0gc2ltcGxlQ2xvbmVJbnB1dERhdGEoaW5wdXQpO1xuICAgIH0gZWxzZSBpZiAocG9pbnRlcnNMZW5ndGggPT09IDEpIHtcbiAgICAgICAgc2Vzc2lvbi5maXJzdE11bHRpcGxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGZpcnN0SW5wdXQgPSBzZXNzaW9uLmZpcnN0SW5wdXQ7XG4gICAgdmFyIGZpcnN0TXVsdGlwbGUgPSBzZXNzaW9uLmZpcnN0TXVsdGlwbGU7XG4gICAgdmFyIG9mZnNldENlbnRlciA9IGZpcnN0TXVsdGlwbGUgPyBmaXJzdE11bHRpcGxlLmNlbnRlciA6IGZpcnN0SW5wdXQuY2VudGVyO1xuXG4gICAgdmFyIGNlbnRlciA9IGlucHV0LmNlbnRlciA9IGdldENlbnRlcihwb2ludGVycyk7XG4gICAgaW5wdXQudGltZVN0YW1wID0gbm93KCk7XG4gICAgaW5wdXQuZGVsdGFUaW1lID0gaW5wdXQudGltZVN0YW1wIC0gZmlyc3RJbnB1dC50aW1lU3RhbXA7XG5cbiAgICBpbnB1dC5hbmdsZSA9IGdldEFuZ2xlKG9mZnNldENlbnRlciwgY2VudGVyKTtcbiAgICBpbnB1dC5kaXN0YW5jZSA9IGdldERpc3RhbmNlKG9mZnNldENlbnRlciwgY2VudGVyKTtcblxuICAgIGNvbXB1dGVEZWx0YVhZKHNlc3Npb24sIGlucHV0KTtcbiAgICBpbnB1dC5vZmZzZXREaXJlY3Rpb24gPSBnZXREaXJlY3Rpb24oaW5wdXQuZGVsdGFYLCBpbnB1dC5kZWx0YVkpO1xuXG4gICAgdmFyIG92ZXJhbGxWZWxvY2l0eSA9IGdldFZlbG9jaXR5KGlucHV0LmRlbHRhVGltZSwgaW5wdXQuZGVsdGFYLCBpbnB1dC5kZWx0YVkpO1xuICAgIGlucHV0Lm92ZXJhbGxWZWxvY2l0eVggPSBvdmVyYWxsVmVsb2NpdHkueDtcbiAgICBpbnB1dC5vdmVyYWxsVmVsb2NpdHlZID0gb3ZlcmFsbFZlbG9jaXR5Lnk7XG4gICAgaW5wdXQub3ZlcmFsbFZlbG9jaXR5ID0gKGFicyhvdmVyYWxsVmVsb2NpdHkueCkgPiBhYnMob3ZlcmFsbFZlbG9jaXR5LnkpKSA/IG92ZXJhbGxWZWxvY2l0eS54IDogb3ZlcmFsbFZlbG9jaXR5Lnk7XG5cbiAgICBpbnB1dC5zY2FsZSA9IGZpcnN0TXVsdGlwbGUgPyBnZXRTY2FsZShmaXJzdE11bHRpcGxlLnBvaW50ZXJzLCBwb2ludGVycykgOiAxO1xuICAgIGlucHV0LnJvdGF0aW9uID0gZmlyc3RNdWx0aXBsZSA/IGdldFJvdGF0aW9uKGZpcnN0TXVsdGlwbGUucG9pbnRlcnMsIHBvaW50ZXJzKSA6IDA7XG5cbiAgICBpbnB1dC5tYXhQb2ludGVycyA9ICFzZXNzaW9uLnByZXZJbnB1dCA/IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA6ICgoaW5wdXQucG9pbnRlcnMubGVuZ3RoID5cbiAgICAgICAgc2Vzc2lvbi5wcmV2SW5wdXQubWF4UG9pbnRlcnMpID8gaW5wdXQucG9pbnRlcnMubGVuZ3RoIDogc2Vzc2lvbi5wcmV2SW5wdXQubWF4UG9pbnRlcnMpO1xuXG4gICAgY29tcHV0ZUludGVydmFsSW5wdXREYXRhKHNlc3Npb24sIGlucHV0KTtcblxuICAgIC8vIGZpbmQgdGhlIGNvcnJlY3QgdGFyZ2V0XG4gICAgdmFyIHRhcmdldCA9IG1hbmFnZXIuZWxlbWVudDtcbiAgICBpZiAoaGFzUGFyZW50KGlucHV0LnNyY0V2ZW50LnRhcmdldCwgdGFyZ2V0KSkge1xuICAgICAgICB0YXJnZXQgPSBpbnB1dC5zcmNFdmVudC50YXJnZXQ7XG4gICAgfVxuICAgIGlucHV0LnRhcmdldCA9IHRhcmdldDtcbn1cblxuZnVuY3Rpb24gY29tcHV0ZURlbHRhWFkoc2Vzc2lvbiwgaW5wdXQpIHtcbiAgICB2YXIgY2VudGVyID0gaW5wdXQuY2VudGVyO1xuICAgIHZhciBvZmZzZXQgPSBzZXNzaW9uLm9mZnNldERlbHRhIHx8IHt9O1xuICAgIHZhciBwcmV2RGVsdGEgPSBzZXNzaW9uLnByZXZEZWx0YSB8fCB7fTtcbiAgICB2YXIgcHJldklucHV0ID0gc2Vzc2lvbi5wcmV2SW5wdXQgfHwge307XG5cbiAgICBpZiAoaW5wdXQuZXZlbnRUeXBlID09PSBJTlBVVF9TVEFSVCB8fCBwcmV2SW5wdXQuZXZlbnRUeXBlID09PSBJTlBVVF9FTkQpIHtcbiAgICAgICAgcHJldkRlbHRhID0gc2Vzc2lvbi5wcmV2RGVsdGEgPSB7XG4gICAgICAgICAgICB4OiBwcmV2SW5wdXQuZGVsdGFYIHx8IDAsXG4gICAgICAgICAgICB5OiBwcmV2SW5wdXQuZGVsdGFZIHx8IDBcbiAgICAgICAgfTtcblxuICAgICAgICBvZmZzZXQgPSBzZXNzaW9uLm9mZnNldERlbHRhID0ge1xuICAgICAgICAgICAgeDogY2VudGVyLngsXG4gICAgICAgICAgICB5OiBjZW50ZXIueVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlucHV0LmRlbHRhWCA9IHByZXZEZWx0YS54ICsgKGNlbnRlci54IC0gb2Zmc2V0LngpO1xuICAgIGlucHV0LmRlbHRhWSA9IHByZXZEZWx0YS55ICsgKGNlbnRlci55IC0gb2Zmc2V0LnkpO1xufVxuXG4vKipcbiAqIHZlbG9jaXR5IGlzIGNhbGN1bGF0ZWQgZXZlcnkgeCBtc1xuICogQHBhcmFtIHtPYmplY3R9IHNlc3Npb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICovXG5mdW5jdGlvbiBjb21wdXRlSW50ZXJ2YWxJbnB1dERhdGEoc2Vzc2lvbiwgaW5wdXQpIHtcbiAgICB2YXIgbGFzdCA9IHNlc3Npb24ubGFzdEludGVydmFsIHx8IGlucHV0LFxuICAgICAgICBkZWx0YVRpbWUgPSBpbnB1dC50aW1lU3RhbXAgLSBsYXN0LnRpbWVTdGFtcCxcbiAgICAgICAgdmVsb2NpdHksIHZlbG9jaXR5WCwgdmVsb2NpdHlZLCBkaXJlY3Rpb247XG5cbiAgICBpZiAoaW5wdXQuZXZlbnRUeXBlICE9IElOUFVUX0NBTkNFTCAmJiAoZGVsdGFUaW1lID4gQ09NUFVURV9JTlRFUlZBTCB8fCBsYXN0LnZlbG9jaXR5ID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgIHZhciBkZWx0YVggPSBpbnB1dC5kZWx0YVggLSBsYXN0LmRlbHRhWDtcbiAgICAgICAgdmFyIGRlbHRhWSA9IGlucHV0LmRlbHRhWSAtIGxhc3QuZGVsdGFZO1xuXG4gICAgICAgIHZhciB2ID0gZ2V0VmVsb2NpdHkoZGVsdGFUaW1lLCBkZWx0YVgsIGRlbHRhWSk7XG4gICAgICAgIHZlbG9jaXR5WCA9IHYueDtcbiAgICAgICAgdmVsb2NpdHlZID0gdi55O1xuICAgICAgICB2ZWxvY2l0eSA9IChhYnModi54KSA+IGFicyh2LnkpKSA/IHYueCA6IHYueTtcbiAgICAgICAgZGlyZWN0aW9uID0gZ2V0RGlyZWN0aW9uKGRlbHRhWCwgZGVsdGFZKTtcblxuICAgICAgICBzZXNzaW9uLmxhc3RJbnRlcnZhbCA9IGlucHV0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHVzZSBsYXRlc3QgdmVsb2NpdHkgaW5mbyBpZiBpdCBkb2Vzbid0IG92ZXJ0YWtlIGEgbWluaW11bSBwZXJpb2RcbiAgICAgICAgdmVsb2NpdHkgPSBsYXN0LnZlbG9jaXR5O1xuICAgICAgICB2ZWxvY2l0eVggPSBsYXN0LnZlbG9jaXR5WDtcbiAgICAgICAgdmVsb2NpdHlZID0gbGFzdC52ZWxvY2l0eVk7XG4gICAgICAgIGRpcmVjdGlvbiA9IGxhc3QuZGlyZWN0aW9uO1xuICAgIH1cblxuICAgIGlucHV0LnZlbG9jaXR5ID0gdmVsb2NpdHk7XG4gICAgaW5wdXQudmVsb2NpdHlYID0gdmVsb2NpdHlYO1xuICAgIGlucHV0LnZlbG9jaXR5WSA9IHZlbG9jaXR5WTtcbiAgICBpbnB1dC5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG59XG5cbi8qKlxuICogY3JlYXRlIGEgc2ltcGxlIGNsb25lIGZyb20gdGhlIGlucHV0IHVzZWQgZm9yIHN0b3JhZ2Ugb2YgZmlyc3RJbnB1dCBhbmQgZmlyc3RNdWx0aXBsZVxuICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBjbG9uZWRJbnB1dERhdGFcbiAqL1xuZnVuY3Rpb24gc2ltcGxlQ2xvbmVJbnB1dERhdGEoaW5wdXQpIHtcbiAgICAvLyBtYWtlIGEgc2ltcGxlIGNvcHkgb2YgdGhlIHBvaW50ZXJzIGJlY2F1c2Ugd2Ugd2lsbCBnZXQgYSByZWZlcmVuY2UgaWYgd2UgZG9uJ3RcbiAgICAvLyB3ZSBvbmx5IG5lZWQgY2xpZW50WFkgZm9yIHRoZSBjYWxjdWxhdGlvbnNcbiAgICB2YXIgcG9pbnRlcnMgPSBbXTtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBpbnB1dC5wb2ludGVycy5sZW5ndGgpIHtcbiAgICAgICAgcG9pbnRlcnNbaV0gPSB7XG4gICAgICAgICAgICBjbGllbnRYOiByb3VuZChpbnB1dC5wb2ludGVyc1tpXS5jbGllbnRYKSxcbiAgICAgICAgICAgIGNsaWVudFk6IHJvdW5kKGlucHV0LnBvaW50ZXJzW2ldLmNsaWVudFkpXG4gICAgICAgIH07XG4gICAgICAgIGkrKztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0aW1lU3RhbXA6IG5vdygpLFxuICAgICAgICBwb2ludGVyczogcG9pbnRlcnMsXG4gICAgICAgIGNlbnRlcjogZ2V0Q2VudGVyKHBvaW50ZXJzKSxcbiAgICAgICAgZGVsdGFYOiBpbnB1dC5kZWx0YVgsXG4gICAgICAgIGRlbHRhWTogaW5wdXQuZGVsdGFZXG4gICAgfTtcbn1cblxuLyoqXG4gKiBnZXQgdGhlIGNlbnRlciBvZiBhbGwgdGhlIHBvaW50ZXJzXG4gKiBAcGFyYW0ge0FycmF5fSBwb2ludGVyc1xuICogQHJldHVybiB7T2JqZWN0fSBjZW50ZXIgY29udGFpbnMgYHhgIGFuZCBgeWAgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBnZXRDZW50ZXIocG9pbnRlcnMpIHtcbiAgICB2YXIgcG9pbnRlcnNMZW5ndGggPSBwb2ludGVycy5sZW5ndGg7XG5cbiAgICAvLyBubyBuZWVkIHRvIGxvb3Agd2hlbiBvbmx5IG9uZSB0b3VjaFxuICAgIGlmIChwb2ludGVyc0xlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogcm91bmQocG9pbnRlcnNbMF0uY2xpZW50WCksXG4gICAgICAgICAgICB5OiByb3VuZChwb2ludGVyc1swXS5jbGllbnRZKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciB4ID0gMCwgeSA9IDAsIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgcG9pbnRlcnNMZW5ndGgpIHtcbiAgICAgICAgeCArPSBwb2ludGVyc1tpXS5jbGllbnRYO1xuICAgICAgICB5ICs9IHBvaW50ZXJzW2ldLmNsaWVudFk7XG4gICAgICAgIGkrKztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB4OiByb3VuZCh4IC8gcG9pbnRlcnNMZW5ndGgpLFxuICAgICAgICB5OiByb3VuZCh5IC8gcG9pbnRlcnNMZW5ndGgpXG4gICAgfTtcbn1cblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIHZlbG9jaXR5IGJldHdlZW4gdHdvIHBvaW50cy4gdW5pdCBpcyBpbiBweCBwZXIgbXMuXG4gKiBAcGFyYW0ge051bWJlcn0gZGVsdGFUaW1lXG4gKiBAcGFyYW0ge051bWJlcn0geFxuICogQHBhcmFtIHtOdW1iZXJ9IHlcbiAqIEByZXR1cm4ge09iamVjdH0gdmVsb2NpdHkgYHhgIGFuZCBgeWBcbiAqL1xuZnVuY3Rpb24gZ2V0VmVsb2NpdHkoZGVsdGFUaW1lLCB4LCB5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogeCAvIGRlbHRhVGltZSB8fCAwLFxuICAgICAgICB5OiB5IC8gZGVsdGFUaW1lIHx8IDBcbiAgICB9O1xufVxuXG4vKipcbiAqIGdldCB0aGUgZGlyZWN0aW9uIGJldHdlZW4gdHdvIHBvaW50c1xuICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gKiBAcmV0dXJuIHtOdW1iZXJ9IGRpcmVjdGlvblxuICovXG5mdW5jdGlvbiBnZXREaXJlY3Rpb24oeCwgeSkge1xuICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAgIHJldHVybiBESVJFQ1RJT05fTk9ORTtcbiAgICB9XG5cbiAgICBpZiAoYWJzKHgpID49IGFicyh5KSkge1xuICAgICAgICByZXR1cm4geCA8IDAgPyBESVJFQ1RJT05fTEVGVCA6IERJUkVDVElPTl9SSUdIVDtcbiAgICB9XG4gICAgcmV0dXJuIHkgPCAwID8gRElSRUNUSU9OX1VQIDogRElSRUNUSU9OX0RPV047XG59XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSBhYnNvbHV0ZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBwb2ludHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwMSB7eCwgeX1cbiAqIEBwYXJhbSB7T2JqZWN0fSBwMiB7eCwgeX1cbiAqIEBwYXJhbSB7QXJyYXl9IFtwcm9wc10gY29udGFpbmluZyB4IGFuZCB5IGtleXNcbiAqIEByZXR1cm4ge051bWJlcn0gZGlzdGFuY2VcbiAqL1xuZnVuY3Rpb24gZ2V0RGlzdGFuY2UocDEsIHAyLCBwcm9wcykge1xuICAgIGlmICghcHJvcHMpIHtcbiAgICAgICAgcHJvcHMgPSBQUk9QU19YWTtcbiAgICB9XG4gICAgdmFyIHggPSBwMltwcm9wc1swXV0gLSBwMVtwcm9wc1swXV0sXG4gICAgICAgIHkgPSBwMltwcm9wc1sxXV0gLSBwMVtwcm9wc1sxXV07XG5cbiAgICByZXR1cm4gTWF0aC5zcXJ0KCh4ICogeCkgKyAoeSAqIHkpKTtcbn1cblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIGFuZ2xlIGJldHdlZW4gdHdvIGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcDFcbiAqIEBwYXJhbSB7T2JqZWN0fSBwMlxuICogQHBhcmFtIHtBcnJheX0gW3Byb3BzXSBjb250YWluaW5nIHggYW5kIHkga2V5c1xuICogQHJldHVybiB7TnVtYmVyfSBhbmdsZVxuICovXG5mdW5jdGlvbiBnZXRBbmdsZShwMSwgcDIsIHByb3BzKSB7XG4gICAgaWYgKCFwcm9wcykge1xuICAgICAgICBwcm9wcyA9IFBST1BTX1hZO1xuICAgIH1cbiAgICB2YXIgeCA9IHAyW3Byb3BzWzBdXSAtIHAxW3Byb3BzWzBdXSxcbiAgICAgICAgeSA9IHAyW3Byb3BzWzFdXSAtIHAxW3Byb3BzWzFdXTtcbiAgICByZXR1cm4gTWF0aC5hdGFuMih5LCB4KSAqIDE4MCAvIE1hdGguUEk7XG59XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSByb3RhdGlvbiBkZWdyZWVzIGJldHdlZW4gdHdvIHBvaW50ZXJzZXRzXG4gKiBAcGFyYW0ge0FycmF5fSBzdGFydCBhcnJheSBvZiBwb2ludGVyc1xuICogQHBhcmFtIHtBcnJheX0gZW5kIGFycmF5IG9mIHBvaW50ZXJzXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IHJvdGF0aW9uXG4gKi9cbmZ1bmN0aW9uIGdldFJvdGF0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZ2V0QW5nbGUoZW5kWzFdLCBlbmRbMF0sIFBST1BTX0NMSUVOVF9YWSkgKyBnZXRBbmdsZShzdGFydFsxXSwgc3RhcnRbMF0sIFBST1BTX0NMSUVOVF9YWSk7XG59XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSBzY2FsZSBmYWN0b3IgYmV0d2VlbiB0d28gcG9pbnRlcnNldHNcbiAqIG5vIHNjYWxlIGlzIDEsIGFuZCBnb2VzIGRvd24gdG8gMCB3aGVuIHBpbmNoZWQgdG9nZXRoZXIsIGFuZCBiaWdnZXIgd2hlbiBwaW5jaGVkIG91dFxuICogQHBhcmFtIHtBcnJheX0gc3RhcnQgYXJyYXkgb2YgcG9pbnRlcnNcbiAqIEBwYXJhbSB7QXJyYXl9IGVuZCBhcnJheSBvZiBwb2ludGVyc1xuICogQHJldHVybiB7TnVtYmVyfSBzY2FsZVxuICovXG5mdW5jdGlvbiBnZXRTY2FsZShzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGdldERpc3RhbmNlKGVuZFswXSwgZW5kWzFdLCBQUk9QU19DTElFTlRfWFkpIC8gZ2V0RGlzdGFuY2Uoc3RhcnRbMF0sIHN0YXJ0WzFdLCBQUk9QU19DTElFTlRfWFkpO1xufVxuXG52YXIgTU9VU0VfSU5QVVRfTUFQID0ge1xuICAgIG1vdXNlZG93bjogSU5QVVRfU1RBUlQsXG4gICAgbW91c2Vtb3ZlOiBJTlBVVF9NT1ZFLFxuICAgIG1vdXNldXA6IElOUFVUX0VORFxufTtcblxudmFyIE1PVVNFX0VMRU1FTlRfRVZFTlRTID0gJ21vdXNlZG93bic7XG52YXIgTU9VU0VfV0lORE9XX0VWRU5UUyA9ICdtb3VzZW1vdmUgbW91c2V1cCc7XG5cbi8qKlxuICogTW91c2UgZXZlbnRzIGlucHV0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cbmZ1bmN0aW9uIE1vdXNlSW5wdXQoKSB7XG4gICAgdGhpcy5ldkVsID0gTU9VU0VfRUxFTUVOVF9FVkVOVFM7XG4gICAgdGhpcy5ldldpbiA9IE1PVVNFX1dJTkRPV19FVkVOVFM7XG5cbiAgICB0aGlzLnByZXNzZWQgPSBmYWxzZTsgLy8gbW91c2Vkb3duIHN0YXRlXG5cbiAgICBJbnB1dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KE1vdXNlSW5wdXQsIElucHV0LCB7XG4gICAgLyoqXG4gICAgICogaGFuZGxlIG1vdXNlIGV2ZW50c1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldlxuICAgICAqL1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uIE1FaGFuZGxlcihldikge1xuICAgICAgICB2YXIgZXZlbnRUeXBlID0gTU9VU0VfSU5QVVRfTUFQW2V2LnR5cGVdO1xuXG4gICAgICAgIC8vIG9uIHN0YXJ0IHdlIHdhbnQgdG8gaGF2ZSB0aGUgbGVmdCBtb3VzZSBidXR0b24gZG93blxuICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQgJiYgZXYuYnV0dG9uID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByZXNzZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX01PVkUgJiYgZXYud2hpY2ggIT09IDEpIHtcbiAgICAgICAgICAgIGV2ZW50VHlwZSA9IElOUFVUX0VORDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1vdXNlIG11c3QgYmUgZG93blxuICAgICAgICBpZiAoIXRoaXMucHJlc3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX0VORCkge1xuICAgICAgICAgICAgdGhpcy5wcmVzc2VkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMubWFuYWdlciwgZXZlbnRUeXBlLCB7XG4gICAgICAgICAgICBwb2ludGVyczogW2V2XSxcbiAgICAgICAgICAgIGNoYW5nZWRQb2ludGVyczogW2V2XSxcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBJTlBVVF9UWVBFX01PVVNFLFxuICAgICAgICAgICAgc3JjRXZlbnQ6IGV2XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG52YXIgUE9JTlRFUl9JTlBVVF9NQVAgPSB7XG4gICAgcG9pbnRlcmRvd246IElOUFVUX1NUQVJULFxuICAgIHBvaW50ZXJtb3ZlOiBJTlBVVF9NT1ZFLFxuICAgIHBvaW50ZXJ1cDogSU5QVVRfRU5ELFxuICAgIHBvaW50ZXJjYW5jZWw6IElOUFVUX0NBTkNFTCxcbiAgICBwb2ludGVyb3V0OiBJTlBVVF9DQU5DRUxcbn07XG5cbi8vIGluIElFMTAgdGhlIHBvaW50ZXIgdHlwZXMgaXMgZGVmaW5lZCBhcyBhbiBlbnVtXG52YXIgSUUxMF9QT0lOVEVSX1RZUEVfRU5VTSA9IHtcbiAgICAyOiBJTlBVVF9UWVBFX1RPVUNILFxuICAgIDM6IElOUFVUX1RZUEVfUEVOLFxuICAgIDQ6IElOUFVUX1RZUEVfTU9VU0UsXG4gICAgNTogSU5QVVRfVFlQRV9LSU5FQ1QgLy8gc2VlIGh0dHBzOi8vdHdpdHRlci5jb20vamFjb2Jyb3NzaS9zdGF0dXMvNDgwNTk2NDM4NDg5ODkwODE2XG59O1xuXG52YXIgUE9JTlRFUl9FTEVNRU5UX0VWRU5UUyA9ICdwb2ludGVyZG93bic7XG52YXIgUE9JTlRFUl9XSU5ET1dfRVZFTlRTID0gJ3BvaW50ZXJtb3ZlIHBvaW50ZXJ1cCBwb2ludGVyY2FuY2VsJztcblxuLy8gSUUxMCBoYXMgcHJlZml4ZWQgc3VwcG9ydCwgYW5kIGNhc2Utc2Vuc2l0aXZlXG5pZiAod2luZG93Lk1TUG9pbnRlckV2ZW50ICYmICF3aW5kb3cuUG9pbnRlckV2ZW50KSB7XG4gICAgUE9JTlRFUl9FTEVNRU5UX0VWRU5UUyA9ICdNU1BvaW50ZXJEb3duJztcbiAgICBQT0lOVEVSX1dJTkRPV19FVkVOVFMgPSAnTVNQb2ludGVyTW92ZSBNU1BvaW50ZXJVcCBNU1BvaW50ZXJDYW5jZWwnO1xufVxuXG4vKipcbiAqIFBvaW50ZXIgZXZlbnRzIGlucHV0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cbmZ1bmN0aW9uIFBvaW50ZXJFdmVudElucHV0KCkge1xuICAgIHRoaXMuZXZFbCA9IFBPSU5URVJfRUxFTUVOVF9FVkVOVFM7XG4gICAgdGhpcy5ldldpbiA9IFBPSU5URVJfV0lORE9XX0VWRU5UUztcblxuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnN0b3JlID0gKHRoaXMubWFuYWdlci5zZXNzaW9uLnBvaW50ZXJFdmVudHMgPSBbXSk7XG59XG5cbmluaGVyaXQoUG9pbnRlckV2ZW50SW5wdXQsIElucHV0LCB7XG4gICAgLyoqXG4gICAgICogaGFuZGxlIG1vdXNlIGV2ZW50c1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldlxuICAgICAqL1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uIFBFaGFuZGxlcihldikge1xuICAgICAgICB2YXIgc3RvcmUgPSB0aGlzLnN0b3JlO1xuICAgICAgICB2YXIgcmVtb3ZlUG9pbnRlciA9IGZhbHNlO1xuXG4gICAgICAgIHZhciBldmVudFR5cGVOb3JtYWxpemVkID0gZXYudHlwZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJ21zJywgJycpO1xuICAgICAgICB2YXIgZXZlbnRUeXBlID0gUE9JTlRFUl9JTlBVVF9NQVBbZXZlbnRUeXBlTm9ybWFsaXplZF07XG4gICAgICAgIHZhciBwb2ludGVyVHlwZSA9IElFMTBfUE9JTlRFUl9UWVBFX0VOVU1bZXYucG9pbnRlclR5cGVdIHx8IGV2LnBvaW50ZXJUeXBlO1xuXG4gICAgICAgIHZhciBpc1RvdWNoID0gKHBvaW50ZXJUeXBlID09IElOUFVUX1RZUEVfVE9VQ0gpO1xuXG4gICAgICAgIC8vIGdldCBpbmRleCBvZiB0aGUgZXZlbnQgaW4gdGhlIHN0b3JlXG4gICAgICAgIHZhciBzdG9yZUluZGV4ID0gaW5BcnJheShzdG9yZSwgZXYucG9pbnRlcklkLCAncG9pbnRlcklkJyk7XG5cbiAgICAgICAgLy8gc3RhcnQgYW5kIG1vdXNlIG11c3QgYmUgZG93blxuICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQgJiYgKGV2LmJ1dHRvbiA9PT0gMCB8fCBpc1RvdWNoKSkge1xuICAgICAgICAgICAgaWYgKHN0b3JlSW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgc3RvcmUucHVzaChldik7XG4gICAgICAgICAgICAgICAgc3RvcmVJbmRleCA9IHN0b3JlLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRUeXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkpIHtcbiAgICAgICAgICAgIHJlbW92ZVBvaW50ZXIgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaXQgbm90IGZvdW5kLCBzbyB0aGUgcG9pbnRlciBoYXNuJ3QgYmVlbiBkb3duIChzbyBpdCdzIHByb2JhYmx5IGEgaG92ZXIpXG4gICAgICAgIGlmIChzdG9yZUluZGV4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBldmVudCBpbiB0aGUgc3RvcmVcbiAgICAgICAgc3RvcmVbc3RvcmVJbmRleF0gPSBldjtcblxuICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMubWFuYWdlciwgZXZlbnRUeXBlLCB7XG4gICAgICAgICAgICBwb2ludGVyczogc3RvcmUsXG4gICAgICAgICAgICBjaGFuZ2VkUG9pbnRlcnM6IFtldl0sXG4gICAgICAgICAgICBwb2ludGVyVHlwZTogcG9pbnRlclR5cGUsXG4gICAgICAgICAgICBzcmNFdmVudDogZXZcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlbW92ZVBvaW50ZXIpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBmcm9tIHRoZSBzdG9yZVxuICAgICAgICAgICAgc3RvcmUuc3BsaWNlKHN0b3JlSW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbnZhciBTSU5HTEVfVE9VQ0hfSU5QVVRfTUFQID0ge1xuICAgIHRvdWNoc3RhcnQ6IElOUFVUX1NUQVJULFxuICAgIHRvdWNobW92ZTogSU5QVVRfTU9WRSxcbiAgICB0b3VjaGVuZDogSU5QVVRfRU5ELFxuICAgIHRvdWNoY2FuY2VsOiBJTlBVVF9DQU5DRUxcbn07XG5cbnZhciBTSU5HTEVfVE9VQ0hfVEFSR0VUX0VWRU5UUyA9ICd0b3VjaHN0YXJ0JztcbnZhciBTSU5HTEVfVE9VQ0hfV0lORE9XX0VWRU5UUyA9ICd0b3VjaHN0YXJ0IHRvdWNobW92ZSB0b3VjaGVuZCB0b3VjaGNhbmNlbCc7XG5cbi8qKlxuICogVG91Y2ggZXZlbnRzIGlucHV0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cbmZ1bmN0aW9uIFNpbmdsZVRvdWNoSW5wdXQoKSB7XG4gICAgdGhpcy5ldlRhcmdldCA9IFNJTkdMRV9UT1VDSF9UQVJHRVRfRVZFTlRTO1xuICAgIHRoaXMuZXZXaW4gPSBTSU5HTEVfVE9VQ0hfV0lORE9XX0VWRU5UUztcbiAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcblxuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoU2luZ2xlVG91Y2hJbnB1dCwgSW5wdXQsIHtcbiAgICBoYW5kbGVyOiBmdW5jdGlvbiBURWhhbmRsZXIoZXYpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBTSU5HTEVfVE9VQ0hfSU5QVVRfTUFQW2V2LnR5cGVdO1xuXG4gICAgICAgIC8vIHNob3VsZCB3ZSBoYW5kbGUgdGhlIHRvdWNoIGV2ZW50cz9cbiAgICAgICAgaWYgKHR5cGUgPT09IElOUFVUX1NUQVJUKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b3VjaGVzID0gbm9ybWFsaXplU2luZ2xlVG91Y2hlcy5jYWxsKHRoaXMsIGV2LCB0eXBlKTtcblxuICAgICAgICAvLyB3aGVuIGRvbmUsIHJlc2V0IHRoZSBzdGFydGVkIHN0YXRlXG4gICAgICAgIGlmICh0eXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkgJiYgdG91Y2hlc1swXS5sZW5ndGggLSB0b3VjaGVzWzFdLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMubWFuYWdlciwgdHlwZSwge1xuICAgICAgICAgICAgcG9pbnRlcnM6IHRvdWNoZXNbMF0sXG4gICAgICAgICAgICBjaGFuZ2VkUG9pbnRlcnM6IHRvdWNoZXNbMV0sXG4gICAgICAgICAgICBwb2ludGVyVHlwZTogSU5QVVRfVFlQRV9UT1VDSCxcbiAgICAgICAgICAgIHNyY0V2ZW50OiBldlxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBAdGhpcyB7VG91Y2hJbnB1dH1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldlxuICogQHBhcmFtIHtOdW1iZXJ9IHR5cGUgZmxhZ1xuICogQHJldHVybnMge3VuZGVmaW5lZHxBcnJheX0gW2FsbCwgY2hhbmdlZF1cbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplU2luZ2xlVG91Y2hlcyhldiwgdHlwZSkge1xuICAgIHZhciBhbGwgPSB0b0FycmF5KGV2LnRvdWNoZXMpO1xuICAgIHZhciBjaGFuZ2VkID0gdG9BcnJheShldi5jaGFuZ2VkVG91Y2hlcyk7XG5cbiAgICBpZiAodHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpKSB7XG4gICAgICAgIGFsbCA9IHVuaXF1ZUFycmF5KGFsbC5jb25jYXQoY2hhbmdlZCksICdpZGVudGlmaWVyJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFthbGwsIGNoYW5nZWRdO1xufVxuXG52YXIgVE9VQ0hfSU5QVVRfTUFQID0ge1xuICAgIHRvdWNoc3RhcnQ6IElOUFVUX1NUQVJULFxuICAgIHRvdWNobW92ZTogSU5QVVRfTU9WRSxcbiAgICB0b3VjaGVuZDogSU5QVVRfRU5ELFxuICAgIHRvdWNoY2FuY2VsOiBJTlBVVF9DQU5DRUxcbn07XG5cbnZhciBUT1VDSF9UQVJHRVRfRVZFTlRTID0gJ3RvdWNoc3RhcnQgdG91Y2htb3ZlIHRvdWNoZW5kIHRvdWNoY2FuY2VsJztcblxuLyoqXG4gKiBNdWx0aS11c2VyIHRvdWNoIGV2ZW50cyBpbnB1dFxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5mdW5jdGlvbiBUb3VjaElucHV0KCkge1xuICAgIHRoaXMuZXZUYXJnZXQgPSBUT1VDSF9UQVJHRVRfRVZFTlRTO1xuICAgIHRoaXMudGFyZ2V0SWRzID0ge307XG5cbiAgICBJbnB1dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFRvdWNoSW5wdXQsIElucHV0LCB7XG4gICAgaGFuZGxlcjogZnVuY3Rpb24gTVRFaGFuZGxlcihldikge1xuICAgICAgICB2YXIgdHlwZSA9IFRPVUNIX0lOUFVUX01BUFtldi50eXBlXTtcbiAgICAgICAgdmFyIHRvdWNoZXMgPSBnZXRUb3VjaGVzLmNhbGwodGhpcywgZXYsIHR5cGUpO1xuICAgICAgICBpZiAoIXRvdWNoZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLCB0eXBlLCB7XG4gICAgICAgICAgICBwb2ludGVyczogdG91Y2hlc1swXSxcbiAgICAgICAgICAgIGNoYW5nZWRQb2ludGVyczogdG91Y2hlc1sxXSxcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBJTlBVVF9UWVBFX1RPVUNILFxuICAgICAgICAgICAgc3JjRXZlbnQ6IGV2XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEB0aGlzIHtUb3VjaElucHV0fVxuICogQHBhcmFtIHtPYmplY3R9IGV2XG4gKiBAcGFyYW0ge051bWJlcn0gdHlwZSBmbGFnXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfEFycmF5fSBbYWxsLCBjaGFuZ2VkXVxuICovXG5mdW5jdGlvbiBnZXRUb3VjaGVzKGV2LCB0eXBlKSB7XG4gICAgdmFyIGFsbFRvdWNoZXMgPSB0b0FycmF5KGV2LnRvdWNoZXMpO1xuICAgIHZhciB0YXJnZXRJZHMgPSB0aGlzLnRhcmdldElkcztcblxuICAgIC8vIHdoZW4gdGhlcmUgaXMgb25seSBvbmUgdG91Y2gsIHRoZSBwcm9jZXNzIGNhbiBiZSBzaW1wbGlmaWVkXG4gICAgaWYgKHR5cGUgJiAoSU5QVVRfU1RBUlQgfCBJTlBVVF9NT1ZFKSAmJiBhbGxUb3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0YXJnZXRJZHNbYWxsVG91Y2hlc1swXS5pZGVudGlmaWVyXSA9IHRydWU7XG4gICAgICAgIHJldHVybiBbYWxsVG91Y2hlcywgYWxsVG91Y2hlc107XG4gICAgfVxuXG4gICAgdmFyIGksXG4gICAgICAgIHRhcmdldFRvdWNoZXMsXG4gICAgICAgIGNoYW5nZWRUb3VjaGVzID0gdG9BcnJheShldi5jaGFuZ2VkVG91Y2hlcyksXG4gICAgICAgIGNoYW5nZWRUYXJnZXRUb3VjaGVzID0gW10sXG4gICAgICAgIHRhcmdldCA9IHRoaXMudGFyZ2V0O1xuXG4gICAgLy8gZ2V0IHRhcmdldCB0b3VjaGVzIGZyb20gdG91Y2hlc1xuICAgIHRhcmdldFRvdWNoZXMgPSBhbGxUb3VjaGVzLmZpbHRlcihmdW5jdGlvbih0b3VjaCkge1xuICAgICAgICByZXR1cm4gaGFzUGFyZW50KHRvdWNoLnRhcmdldCwgdGFyZ2V0KTtcbiAgICB9KTtcblxuICAgIC8vIGNvbGxlY3QgdG91Y2hlc1xuICAgIGlmICh0eXBlID09PSBJTlBVVF9TVEFSVCkge1xuICAgICAgICBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCB0YXJnZXRUb3VjaGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGFyZ2V0SWRzW3RhcmdldFRvdWNoZXNbaV0uaWRlbnRpZmllcl0gPSB0cnVlO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmlsdGVyIGNoYW5nZWQgdG91Y2hlcyB0byBvbmx5IGNvbnRhaW4gdG91Y2hlcyB0aGF0IGV4aXN0IGluIHRoZSBjb2xsZWN0ZWQgdGFyZ2V0IGlkc1xuICAgIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgY2hhbmdlZFRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgIGlmICh0YXJnZXRJZHNbY2hhbmdlZFRvdWNoZXNbaV0uaWRlbnRpZmllcl0pIHtcbiAgICAgICAgICAgIGNoYW5nZWRUYXJnZXRUb3VjaGVzLnB1c2goY2hhbmdlZFRvdWNoZXNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2xlYW51cCByZW1vdmVkIHRvdWNoZXNcbiAgICAgICAgaWYgKHR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSkge1xuICAgICAgICAgICAgZGVsZXRlIHRhcmdldElkc1tjaGFuZ2VkVG91Y2hlc1tpXS5pZGVudGlmaWVyXTtcbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgfVxuXG4gICAgaWYgKCFjaGFuZ2VkVGFyZ2V0VG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiBbXG4gICAgICAgIC8vIG1lcmdlIHRhcmdldFRvdWNoZXMgd2l0aCBjaGFuZ2VkVGFyZ2V0VG91Y2hlcyBzbyBpdCBjb250YWlucyBBTEwgdG91Y2hlcywgaW5jbHVkaW5nICdlbmQnIGFuZCAnY2FuY2VsJ1xuICAgICAgICB1bmlxdWVBcnJheSh0YXJnZXRUb3VjaGVzLmNvbmNhdChjaGFuZ2VkVGFyZ2V0VG91Y2hlcyksICdpZGVudGlmaWVyJywgdHJ1ZSksXG4gICAgICAgIGNoYW5nZWRUYXJnZXRUb3VjaGVzXG4gICAgXTtcbn1cblxuLyoqXG4gKiBDb21iaW5lZCB0b3VjaCBhbmQgbW91c2UgaW5wdXRcbiAqXG4gKiBUb3VjaCBoYXMgYSBoaWdoZXIgcHJpb3JpdHkgdGhlbiBtb3VzZSwgYW5kIHdoaWxlIHRvdWNoaW5nIG5vIG1vdXNlIGV2ZW50cyBhcmUgYWxsb3dlZC5cbiAqIFRoaXMgYmVjYXVzZSB0b3VjaCBkZXZpY2VzIGFsc28gZW1pdCBtb3VzZSBldmVudHMgd2hpbGUgZG9pbmcgYSB0b3VjaC5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cblxudmFyIERFRFVQX1RJTUVPVVQgPSAyNTAwO1xudmFyIERFRFVQX0RJU1RBTkNFID0gMjU7XG5cbmZ1bmN0aW9uIFRvdWNoTW91c2VJbnB1dCgpIHtcbiAgICBJbnB1dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdmFyIGhhbmRsZXIgPSBiaW5kRm4odGhpcy5oYW5kbGVyLCB0aGlzKTtcbiAgICB0aGlzLnRvdWNoID0gbmV3IFRvdWNoSW5wdXQodGhpcy5tYW5hZ2VyLCBoYW5kbGVyKTtcbiAgICB0aGlzLm1vdXNlID0gbmV3IE1vdXNlSW5wdXQodGhpcy5tYW5hZ2VyLCBoYW5kbGVyKTtcblxuICAgIHRoaXMucHJpbWFyeVRvdWNoID0gbnVsbDtcbiAgICB0aGlzLmxhc3RUb3VjaGVzID0gW107XG59XG5cbmluaGVyaXQoVG91Y2hNb3VzZUlucHV0LCBJbnB1dCwge1xuICAgIC8qKlxuICAgICAqIGhhbmRsZSBtb3VzZSBhbmQgdG91Y2ggZXZlbnRzXG4gICAgICogQHBhcmFtIHtIYW1tZXJ9IG1hbmFnZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXRFdmVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dERhdGFcbiAgICAgKi9cbiAgICBoYW5kbGVyOiBmdW5jdGlvbiBUTUVoYW5kbGVyKG1hbmFnZXIsIGlucHV0RXZlbnQsIGlucHV0RGF0YSkge1xuICAgICAgICB2YXIgaXNUb3VjaCA9IChpbnB1dERhdGEucG9pbnRlclR5cGUgPT0gSU5QVVRfVFlQRV9UT1VDSCksXG4gICAgICAgICAgICBpc01vdXNlID0gKGlucHV0RGF0YS5wb2ludGVyVHlwZSA9PSBJTlBVVF9UWVBFX01PVVNFKTtcblxuICAgICAgICBpZiAoaXNNb3VzZSAmJiBpbnB1dERhdGEuc291cmNlQ2FwYWJpbGl0aWVzICYmIGlucHV0RGF0YS5zb3VyY2VDYXBhYmlsaXRpZXMuZmlyZXNUb3VjaEV2ZW50cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gd2hlbiB3ZSdyZSBpbiBhIHRvdWNoIGV2ZW50LCByZWNvcmQgdG91Y2hlcyB0byAgZGUtZHVwZSBzeW50aGV0aWMgbW91c2UgZXZlbnRcbiAgICAgICAgaWYgKGlzVG91Y2gpIHtcbiAgICAgICAgICAgIHJlY29yZFRvdWNoZXMuY2FsbCh0aGlzLCBpbnB1dEV2ZW50LCBpbnB1dERhdGEpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzTW91c2UgJiYgaXNTeW50aGV0aWNFdmVudC5jYWxsKHRoaXMsIGlucHV0RGF0YSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sobWFuYWdlciwgaW5wdXRFdmVudCwgaW5wdXREYXRhKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmVtb3ZlIHRoZSBldmVudCBsaXN0ZW5lcnNcbiAgICAgKi9cbiAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLnRvdWNoLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5tb3VzZS5kZXN0cm95KCk7XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIHJlY29yZFRvdWNoZXMoZXZlbnRUeXBlLCBldmVudERhdGEpIHtcbiAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQpIHtcbiAgICAgICAgdGhpcy5wcmltYXJ5VG91Y2ggPSBldmVudERhdGEuY2hhbmdlZFBvaW50ZXJzWzBdLmlkZW50aWZpZXI7XG4gICAgICAgIHNldExhc3RUb3VjaC5jYWxsKHRoaXMsIGV2ZW50RGF0YSk7XG4gICAgfSBlbHNlIGlmIChldmVudFR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSkge1xuICAgICAgICBzZXRMYXN0VG91Y2guY2FsbCh0aGlzLCBldmVudERhdGEpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0TGFzdFRvdWNoKGV2ZW50RGF0YSkge1xuICAgIHZhciB0b3VjaCA9IGV2ZW50RGF0YS5jaGFuZ2VkUG9pbnRlcnNbMF07XG5cbiAgICBpZiAodG91Y2guaWRlbnRpZmllciA9PT0gdGhpcy5wcmltYXJ5VG91Y2gpIHtcbiAgICAgICAgdmFyIGxhc3RUb3VjaCA9IHt4OiB0b3VjaC5jbGllbnRYLCB5OiB0b3VjaC5jbGllbnRZfTtcbiAgICAgICAgdGhpcy5sYXN0VG91Y2hlcy5wdXNoKGxhc3RUb3VjaCk7XG4gICAgICAgIHZhciBsdHMgPSB0aGlzLmxhc3RUb3VjaGVzO1xuICAgICAgICB2YXIgcmVtb3ZlTGFzdFRvdWNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaSA9IGx0cy5pbmRleE9mKGxhc3RUb3VjaCk7XG4gICAgICAgICAgICBpZiAoaSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgbHRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2V0VGltZW91dChyZW1vdmVMYXN0VG91Y2gsIERFRFVQX1RJTUVPVVQpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNTeW50aGV0aWNFdmVudChldmVudERhdGEpIHtcbiAgICB2YXIgeCA9IGV2ZW50RGF0YS5zcmNFdmVudC5jbGllbnRYLCB5ID0gZXZlbnREYXRhLnNyY0V2ZW50LmNsaWVudFk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxhc3RUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0ID0gdGhpcy5sYXN0VG91Y2hlc1tpXTtcbiAgICAgICAgdmFyIGR4ID0gTWF0aC5hYnMoeCAtIHQueCksIGR5ID0gTWF0aC5hYnMoeSAtIHQueSk7XG4gICAgICAgIGlmIChkeCA8PSBERURVUF9ESVNUQU5DRSAmJiBkeSA8PSBERURVUF9ESVNUQU5DRSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG52YXIgUFJFRklYRURfVE9VQ0hfQUNUSU9OID0gcHJlZml4ZWQoVEVTVF9FTEVNRU5ULnN0eWxlLCAndG91Y2hBY3Rpb24nKTtcbnZhciBOQVRJVkVfVE9VQ0hfQUNUSU9OID0gUFJFRklYRURfVE9VQ0hfQUNUSU9OICE9PSB1bmRlZmluZWQ7XG5cbi8vIG1hZ2ljYWwgdG91Y2hBY3Rpb24gdmFsdWVcbnZhciBUT1VDSF9BQ1RJT05fQ09NUFVURSA9ICdjb21wdXRlJztcbnZhciBUT1VDSF9BQ1RJT05fQVVUTyA9ICdhdXRvJztcbnZhciBUT1VDSF9BQ1RJT05fTUFOSVBVTEFUSU9OID0gJ21hbmlwdWxhdGlvbic7IC8vIG5vdCBpbXBsZW1lbnRlZFxudmFyIFRPVUNIX0FDVElPTl9OT05FID0gJ25vbmUnO1xudmFyIFRPVUNIX0FDVElPTl9QQU5fWCA9ICdwYW4teCc7XG52YXIgVE9VQ0hfQUNUSU9OX1BBTl9ZID0gJ3Bhbi15JztcbnZhciBUT1VDSF9BQ1RJT05fTUFQID0gZ2V0VG91Y2hBY3Rpb25Qcm9wcygpO1xuXG4vKipcbiAqIFRvdWNoIEFjdGlvblxuICogc2V0cyB0aGUgdG91Y2hBY3Rpb24gcHJvcGVydHkgb3IgdXNlcyB0aGUganMgYWx0ZXJuYXRpdmVcbiAqIEBwYXJhbSB7TWFuYWdlcn0gbWFuYWdlclxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVG91Y2hBY3Rpb24obWFuYWdlciwgdmFsdWUpIHtcbiAgICB0aGlzLm1hbmFnZXIgPSBtYW5hZ2VyO1xuICAgIHRoaXMuc2V0KHZhbHVlKTtcbn1cblxuVG91Y2hBY3Rpb24ucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIHNldCB0aGUgdG91Y2hBY3Rpb24gdmFsdWUgb24gdGhlIGVsZW1lbnQgb3IgZW5hYmxlIHRoZSBwb2x5ZmlsbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgLy8gZmluZCBvdXQgdGhlIHRvdWNoLWFjdGlvbiBieSB0aGUgZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgaWYgKHZhbHVlID09IFRPVUNIX0FDVElPTl9DT01QVVRFKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuY29tcHV0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE5BVElWRV9UT1VDSF9BQ1RJT04gJiYgdGhpcy5tYW5hZ2VyLmVsZW1lbnQuc3R5bGUgJiYgVE9VQ0hfQUNUSU9OX01BUFt2YWx1ZV0pIHtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5lbGVtZW50LnN0eWxlW1BSRUZJWEVEX1RPVUNIX0FDVElPTl0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFjdGlvbnMgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICoganVzdCByZS1zZXQgdGhlIHRvdWNoQWN0aW9uIHZhbHVlXG4gICAgICovXG4gICAgdXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXQodGhpcy5tYW5hZ2VyLm9wdGlvbnMudG91Y2hBY3Rpb24pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjb21wdXRlIHRoZSB2YWx1ZSBmb3IgdGhlIHRvdWNoQWN0aW9uIHByb3BlcnR5IGJhc2VkIG9uIHRoZSByZWNvZ25pemVyJ3Mgc2V0dGluZ3NcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSB2YWx1ZVxuICAgICAqL1xuICAgIGNvbXB1dGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYWN0aW9ucyA9IFtdO1xuICAgICAgICBlYWNoKHRoaXMubWFuYWdlci5yZWNvZ25pemVycywgZnVuY3Rpb24ocmVjb2duaXplcikge1xuICAgICAgICAgICAgaWYgKGJvb2xPckZuKHJlY29nbml6ZXIub3B0aW9ucy5lbmFibGUsIFtyZWNvZ25pemVyXSkpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25zID0gYWN0aW9ucy5jb25jYXQocmVjb2duaXplci5nZXRUb3VjaEFjdGlvbigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjbGVhblRvdWNoQWN0aW9ucyhhY3Rpb25zLmpvaW4oJyAnKSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHRoaXMgbWV0aG9kIGlzIGNhbGxlZCBvbiBlYWNoIGlucHV0IGN5Y2xlIGFuZCBwcm92aWRlcyB0aGUgcHJldmVudGluZyBvZiB0aGUgYnJvd3NlciBiZWhhdmlvclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICAgICAqL1xuICAgIHByZXZlbnREZWZhdWx0czogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIHNyY0V2ZW50ID0gaW5wdXQuc3JjRXZlbnQ7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBpbnB1dC5vZmZzZXREaXJlY3Rpb247XG5cbiAgICAgICAgLy8gaWYgdGhlIHRvdWNoIGFjdGlvbiBkaWQgcHJldmVudGVkIG9uY2UgdGhpcyBzZXNzaW9uXG4gICAgICAgIGlmICh0aGlzLm1hbmFnZXIuc2Vzc2lvbi5wcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgIHNyY0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWN0aW9ucyA9IHRoaXMuYWN0aW9ucztcbiAgICAgICAgdmFyIGhhc05vbmUgPSBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fTk9ORSkgJiYgIVRPVUNIX0FDVElPTl9NQVBbVE9VQ0hfQUNUSU9OX05PTkVdO1xuICAgICAgICB2YXIgaGFzUGFuWSA9IGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9QQU5fWSkgJiYgIVRPVUNIX0FDVElPTl9NQVBbVE9VQ0hfQUNUSU9OX1BBTl9ZXTtcbiAgICAgICAgdmFyIGhhc1BhblggPSBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fUEFOX1gpICYmICFUT1VDSF9BQ1RJT05fTUFQW1RPVUNIX0FDVElPTl9QQU5fWF07XG5cbiAgICAgICAgaWYgKGhhc05vbmUpIHtcbiAgICAgICAgICAgIC8vZG8gbm90IHByZXZlbnQgZGVmYXVsdHMgaWYgdGhpcyBpcyBhIHRhcCBnZXN0dXJlXG5cbiAgICAgICAgICAgIHZhciBpc1RhcFBvaW50ZXIgPSBpbnB1dC5wb2ludGVycy5sZW5ndGggPT09IDE7XG4gICAgICAgICAgICB2YXIgaXNUYXBNb3ZlbWVudCA9IGlucHV0LmRpc3RhbmNlIDwgMjtcbiAgICAgICAgICAgIHZhciBpc1RhcFRvdWNoVGltZSA9IGlucHV0LmRlbHRhVGltZSA8IDI1MDtcblxuICAgICAgICAgICAgaWYgKGlzVGFwUG9pbnRlciAmJiBpc1RhcE1vdmVtZW50ICYmIGlzVGFwVG91Y2hUaW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhc1BhblggJiYgaGFzUGFuWSkge1xuICAgICAgICAgICAgLy8gYHBhbi14IHBhbi15YCBtZWFucyBicm93c2VyIGhhbmRsZXMgYWxsIHNjcm9sbGluZy9wYW5uaW5nLCBkbyBub3QgcHJldmVudFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhc05vbmUgfHxcbiAgICAgICAgICAgIChoYXNQYW5ZICYmIGRpcmVjdGlvbiAmIERJUkVDVElPTl9IT1JJWk9OVEFMKSB8fFxuICAgICAgICAgICAgKGhhc1BhblggJiYgZGlyZWN0aW9uICYgRElSRUNUSU9OX1ZFUlRJQ0FMKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJldmVudFNyYyhzcmNFdmVudCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogY2FsbCBwcmV2ZW50RGVmYXVsdCB0byBwcmV2ZW50IHRoZSBicm93c2VyJ3MgZGVmYXVsdCBiZWhhdmlvciAoc2Nyb2xsaW5nIGluIG1vc3QgY2FzZXMpXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNyY0V2ZW50XG4gICAgICovXG4gICAgcHJldmVudFNyYzogZnVuY3Rpb24oc3JjRXZlbnQpIHtcbiAgICAgICAgdGhpcy5tYW5hZ2VyLnNlc3Npb24ucHJldmVudGVkID0gdHJ1ZTtcbiAgICAgICAgc3JjRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIHdoZW4gdGhlIHRvdWNoQWN0aW9ucyBhcmUgY29sbGVjdGVkIHRoZXkgYXJlIG5vdCBhIHZhbGlkIHZhbHVlLCBzbyB3ZSBuZWVkIHRvIGNsZWFuIHRoaW5ncyB1cC4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvbnNcbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiBjbGVhblRvdWNoQWN0aW9ucyhhY3Rpb25zKSB7XG4gICAgLy8gbm9uZVxuICAgIGlmIChpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fTk9ORSkpIHtcbiAgICAgICAgcmV0dXJuIFRPVUNIX0FDVElPTl9OT05FO1xuICAgIH1cblxuICAgIHZhciBoYXNQYW5YID0gaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX1BBTl9YKTtcbiAgICB2YXIgaGFzUGFuWSA9IGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9QQU5fWSk7XG5cbiAgICAvLyBpZiBib3RoIHBhbi14IGFuZCBwYW4teSBhcmUgc2V0IChkaWZmZXJlbnQgcmVjb2duaXplcnNcbiAgICAvLyBmb3IgZGlmZmVyZW50IGRpcmVjdGlvbnMsIGUuZy4gaG9yaXpvbnRhbCBwYW4gYnV0IHZlcnRpY2FsIHN3aXBlPylcbiAgICAvLyB3ZSBuZWVkIG5vbmUgKGFzIG90aGVyd2lzZSB3aXRoIHBhbi14IHBhbi15IGNvbWJpbmVkIG5vbmUgb2YgdGhlc2VcbiAgICAvLyByZWNvZ25pemVycyB3aWxsIHdvcmssIHNpbmNlIHRoZSBicm93c2VyIHdvdWxkIGhhbmRsZSBhbGwgcGFubmluZ1xuICAgIGlmIChoYXNQYW5YICYmIGhhc1BhblkpIHtcbiAgICAgICAgcmV0dXJuIFRPVUNIX0FDVElPTl9OT05FO1xuICAgIH1cblxuICAgIC8vIHBhbi14IE9SIHBhbi15XG4gICAgaWYgKGhhc1BhblggfHwgaGFzUGFuWSkge1xuICAgICAgICByZXR1cm4gaGFzUGFuWCA/IFRPVUNIX0FDVElPTl9QQU5fWCA6IFRPVUNIX0FDVElPTl9QQU5fWTtcbiAgICB9XG5cbiAgICAvLyBtYW5pcHVsYXRpb25cbiAgICBpZiAoaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX01BTklQVUxBVElPTikpIHtcbiAgICAgICAgcmV0dXJuIFRPVUNIX0FDVElPTl9NQU5JUFVMQVRJT047XG4gICAgfVxuXG4gICAgcmV0dXJuIFRPVUNIX0FDVElPTl9BVVRPO1xufVxuXG5mdW5jdGlvbiBnZXRUb3VjaEFjdGlvblByb3BzKCkge1xuICAgIGlmICghTkFUSVZFX1RPVUNIX0FDVElPTikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciB0b3VjaE1hcCA9IHt9O1xuICAgIHZhciBjc3NTdXBwb3J0cyA9IHdpbmRvdy5DU1MgJiYgd2luZG93LkNTUy5zdXBwb3J0cztcbiAgICBbJ2F1dG8nLCAnbWFuaXB1bGF0aW9uJywgJ3Bhbi15JywgJ3Bhbi14JywgJ3Bhbi14IHBhbi15JywgJ25vbmUnXS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCkge1xuXG4gICAgICAgIC8vIElmIGNzcy5zdXBwb3J0cyBpcyBub3Qgc3VwcG9ydGVkIGJ1dCB0aGVyZSBpcyBuYXRpdmUgdG91Y2gtYWN0aW9uIGFzc3VtZSBpdCBzdXBwb3J0c1xuICAgICAgICAvLyBhbGwgdmFsdWVzLiBUaGlzIGlzIHRoZSBjYXNlIGZvciBJRSAxMCBhbmQgMTEuXG4gICAgICAgIHRvdWNoTWFwW3ZhbF0gPSBjc3NTdXBwb3J0cyA/IHdpbmRvdy5DU1Muc3VwcG9ydHMoJ3RvdWNoLWFjdGlvbicsIHZhbCkgOiB0cnVlO1xuICAgIH0pO1xuICAgIHJldHVybiB0b3VjaE1hcDtcbn1cblxuLyoqXG4gKiBSZWNvZ25pemVyIGZsb3cgZXhwbGFpbmVkOyAqXG4gKiBBbGwgcmVjb2duaXplcnMgaGF2ZSB0aGUgaW5pdGlhbCBzdGF0ZSBvZiBQT1NTSUJMRSB3aGVuIGEgaW5wdXQgc2Vzc2lvbiBzdGFydHMuXG4gKiBUaGUgZGVmaW5pdGlvbiBvZiBhIGlucHV0IHNlc3Npb24gaXMgZnJvbSB0aGUgZmlyc3QgaW5wdXQgdW50aWwgdGhlIGxhc3QgaW5wdXQsIHdpdGggYWxsIGl0J3MgbW92ZW1lbnQgaW4gaXQuICpcbiAqIEV4YW1wbGUgc2Vzc2lvbiBmb3IgbW91c2UtaW5wdXQ6IG1vdXNlZG93biAtPiBtb3VzZW1vdmUgLT4gbW91c2V1cFxuICpcbiAqIE9uIGVhY2ggcmVjb2duaXppbmcgY3ljbGUgKHNlZSBNYW5hZ2VyLnJlY29nbml6ZSkgdGhlIC5yZWNvZ25pemUoKSBtZXRob2QgaXMgZXhlY3V0ZWRcbiAqIHdoaWNoIGRldGVybWluZXMgd2l0aCBzdGF0ZSBpdCBzaG91bGQgYmUuXG4gKlxuICogSWYgdGhlIHJlY29nbml6ZXIgaGFzIHRoZSBzdGF0ZSBGQUlMRUQsIENBTkNFTExFRCBvciBSRUNPR05JWkVEIChlcXVhbHMgRU5ERUQpLCBpdCBpcyByZXNldCB0b1xuICogUE9TU0lCTEUgdG8gZ2l2ZSBpdCBhbm90aGVyIGNoYW5nZSBvbiB0aGUgbmV4dCBjeWNsZS5cbiAqXG4gKiAgICAgICAgICAgICAgIFBvc3NpYmxlXG4gKiAgICAgICAgICAgICAgICAgIHxcbiAqICAgICAgICAgICAgKy0tLS0tKy0tLS0tLS0tLS0tLS0tLStcbiAqICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgIHxcbiAqICAgICAgKy0tLS0tKy0tLS0tKyAgICAgICAgICAgICAgIHxcbiAqICAgICAgfCAgICAgICAgICAgfCAgICAgICAgICAgICAgIHxcbiAqICAgRmFpbGVkICAgICAgQ2FuY2VsbGVkICAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICArLS0tLS0tLSstLS0tLS0rXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgICAgUmVjb2duaXplZCAgICAgICBCZWdhblxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFuZ2VkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5kZWQvUmVjb2duaXplZFxuICovXG52YXIgU1RBVEVfUE9TU0lCTEUgPSAxO1xudmFyIFNUQVRFX0JFR0FOID0gMjtcbnZhciBTVEFURV9DSEFOR0VEID0gNDtcbnZhciBTVEFURV9FTkRFRCA9IDg7XG52YXIgU1RBVEVfUkVDT0dOSVpFRCA9IFNUQVRFX0VOREVEO1xudmFyIFNUQVRFX0NBTkNFTExFRCA9IDE2O1xudmFyIFNUQVRFX0ZBSUxFRCA9IDMyO1xuXG4vKipcbiAqIFJlY29nbml6ZXJcbiAqIEV2ZXJ5IHJlY29nbml6ZXIgbmVlZHMgdG8gZXh0ZW5kIGZyb20gdGhpcyBjbGFzcy5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gUmVjb2duaXplcihvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRzLCBvcHRpb25zIHx8IHt9KTtcblxuICAgIHRoaXMuaWQgPSB1bmlxdWVJZCgpO1xuXG4gICAgdGhpcy5tYW5hZ2VyID0gbnVsbDtcblxuICAgIC8vIGRlZmF1bHQgaXMgZW5hYmxlIHRydWVcbiAgICB0aGlzLm9wdGlvbnMuZW5hYmxlID0gaWZVbmRlZmluZWQodGhpcy5vcHRpb25zLmVuYWJsZSwgdHJ1ZSk7XG5cbiAgICB0aGlzLnN0YXRlID0gU1RBVEVfUE9TU0lCTEU7XG5cbiAgICB0aGlzLnNpbXVsdGFuZW91cyA9IHt9O1xuICAgIHRoaXMucmVxdWlyZUZhaWwgPSBbXTtcbn1cblxuUmVjb2duaXplci5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogQHZpcnR1YWxcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7fSxcblxuICAgIC8qKlxuICAgICAqIHNldCBvcHRpb25zXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtSZWNvZ25pemVyfVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICBhc3NpZ24odGhpcy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgICAvLyBhbHNvIHVwZGF0ZSB0aGUgdG91Y2hBY3Rpb24sIGluIGNhc2Ugc29tZXRoaW5nIGNoYW5nZWQgYWJvdXQgdGhlIGRpcmVjdGlvbnMvZW5hYmxlZCBzdGF0ZVxuICAgICAgICB0aGlzLm1hbmFnZXIgJiYgdGhpcy5tYW5hZ2VyLnRvdWNoQWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmVjb2duaXplIHNpbXVsdGFuZW91cyB3aXRoIGFuIG90aGVyIHJlY29nbml6ZXIuXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcn0gdGhpc1xuICAgICAqL1xuICAgIHJlY29nbml6ZVdpdGg6IGZ1bmN0aW9uKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcob3RoZXJSZWNvZ25pemVyLCAncmVjb2duaXplV2l0aCcsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzaW11bHRhbmVvdXMgPSB0aGlzLnNpbXVsdGFuZW91cztcbiAgICAgICAgb3RoZXJSZWNvZ25pemVyID0gZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlcihvdGhlclJlY29nbml6ZXIsIHRoaXMpO1xuICAgICAgICBpZiAoIXNpbXVsdGFuZW91c1tvdGhlclJlY29nbml6ZXIuaWRdKSB7XG4gICAgICAgICAgICBzaW11bHRhbmVvdXNbb3RoZXJSZWNvZ25pemVyLmlkXSA9IG90aGVyUmVjb2duaXplcjtcbiAgICAgICAgICAgIG90aGVyUmVjb2duaXplci5yZWNvZ25pemVXaXRoKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkcm9wIHRoZSBzaW11bHRhbmVvdXMgbGluay4gaXQgZG9lc250IHJlbW92ZSB0aGUgbGluayBvbiB0aGUgb3RoZXIgcmVjb2duaXplci5cbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfSB0aGlzXG4gICAgICovXG4gICAgZHJvcFJlY29nbml6ZVdpdGg6IGZ1bmN0aW9uKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcob3RoZXJSZWNvZ25pemVyLCAnZHJvcFJlY29nbml6ZVdpdGgnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBvdGhlclJlY29nbml6ZXIgPSBnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyKG90aGVyUmVjb2duaXplciwgdGhpcyk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnNpbXVsdGFuZW91c1tvdGhlclJlY29nbml6ZXIuaWRdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmVjb2duaXplciBjYW4gb25seSBydW4gd2hlbiBhbiBvdGhlciBpcyBmYWlsaW5nXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcn0gdGhpc1xuICAgICAqL1xuICAgIHJlcXVpcmVGYWlsdXJlOiBmdW5jdGlvbihvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKG90aGVyUmVjb2duaXplciwgJ3JlcXVpcmVGYWlsdXJlJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlcXVpcmVGYWlsID0gdGhpcy5yZXF1aXJlRmFpbDtcbiAgICAgICAgb3RoZXJSZWNvZ25pemVyID0gZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlcihvdGhlclJlY29nbml6ZXIsIHRoaXMpO1xuICAgICAgICBpZiAoaW5BcnJheShyZXF1aXJlRmFpbCwgb3RoZXJSZWNvZ25pemVyKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJlcXVpcmVGYWlsLnB1c2gob3RoZXJSZWNvZ25pemVyKTtcbiAgICAgICAgICAgIG90aGVyUmVjb2duaXplci5yZXF1aXJlRmFpbHVyZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZHJvcCB0aGUgcmVxdWlyZUZhaWx1cmUgbGluay4gaXQgZG9lcyBub3QgcmVtb3ZlIHRoZSBsaW5rIG9uIHRoZSBvdGhlciByZWNvZ25pemVyLlxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBkcm9wUmVxdWlyZUZhaWx1cmU6IGZ1bmN0aW9uKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcob3RoZXJSZWNvZ25pemVyLCAnZHJvcFJlcXVpcmVGYWlsdXJlJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgb3RoZXJSZWNvZ25pemVyID0gZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlcihvdGhlclJlY29nbml6ZXIsIHRoaXMpO1xuICAgICAgICB2YXIgaW5kZXggPSBpbkFycmF5KHRoaXMucmVxdWlyZUZhaWwsIG90aGVyUmVjb2duaXplcik7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnJlcXVpcmVGYWlsLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGhhcyByZXF1aXJlIGZhaWx1cmVzIGJvb2xlYW5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBoYXNSZXF1aXJlRmFpbHVyZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1aXJlRmFpbC5sZW5ndGggPiAwO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBpZiB0aGUgcmVjb2duaXplciBjYW4gcmVjb2duaXplIHNpbXVsdGFuZW91cyB3aXRoIGFuIG90aGVyIHJlY29nbml6ZXJcbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGNhblJlY29nbml6ZVdpdGg6IGZ1bmN0aW9uKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICByZXR1cm4gISF0aGlzLnNpbXVsdGFuZW91c1tvdGhlclJlY29nbml6ZXIuaWRdO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBZb3Ugc2hvdWxkIHVzZSBgdHJ5RW1pdGAgaW5zdGVhZCBvZiBgZW1pdGAgZGlyZWN0bHkgdG8gY2hlY2tcbiAgICAgKiB0aGF0IGFsbCB0aGUgbmVlZGVkIHJlY29nbml6ZXJzIGhhcyBmYWlsZWQgYmVmb3JlIGVtaXR0aW5nLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICAgICAqL1xuICAgIGVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBmdW5jdGlvbiBlbWl0KGV2ZW50KSB7XG4gICAgICAgICAgICBzZWxmLm1hbmFnZXIuZW1pdChldmVudCwgaW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gJ3BhbnN0YXJ0JyBhbmQgJ3Bhbm1vdmUnXG4gICAgICAgIGlmIChzdGF0ZSA8IFNUQVRFX0VOREVEKSB7XG4gICAgICAgICAgICBlbWl0KHNlbGYub3B0aW9ucy5ldmVudCArIHN0YXRlU3RyKHN0YXRlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBlbWl0KHNlbGYub3B0aW9ucy5ldmVudCk7IC8vIHNpbXBsZSAnZXZlbnROYW1lJyBldmVudHNcblxuICAgICAgICBpZiAoaW5wdXQuYWRkaXRpb25hbEV2ZW50KSB7IC8vIGFkZGl0aW9uYWwgZXZlbnQocGFubGVmdCwgcGFucmlnaHQsIHBpbmNoaW4sIHBpbmNob3V0Li4uKVxuICAgICAgICAgICAgZW1pdChpbnB1dC5hZGRpdGlvbmFsRXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcGFuZW5kIGFuZCBwYW5jYW5jZWxcbiAgICAgICAgaWYgKHN0YXRlID49IFNUQVRFX0VOREVEKSB7XG4gICAgICAgICAgICBlbWl0KHNlbGYub3B0aW9ucy5ldmVudCArIHN0YXRlU3RyKHN0YXRlKSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhhdCBhbGwgdGhlIHJlcXVpcmUgZmFpbHVyZSByZWNvZ25pemVycyBoYXMgZmFpbGVkLFxuICAgICAqIGlmIHRydWUsIGl0IGVtaXRzIGEgZ2VzdHVyZSBldmVudCxcbiAgICAgKiBvdGhlcndpc2UsIHNldHVwIHRoZSBzdGF0ZSB0byBGQUlMRUQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICovXG4gICAgdHJ5RW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuRW1pdCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbWl0KGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpdCdzIGZhaWxpbmcgYW55d2F5XG4gICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9GQUlMRUQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNhbiB3ZSBlbWl0P1xuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGNhbkVtaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgdGhpcy5yZXF1aXJlRmFpbC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICghKHRoaXMucmVxdWlyZUZhaWxbaV0uc3RhdGUgJiAoU1RBVEVfRkFJTEVEIHwgU1RBVEVfUE9TU0lCTEUpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdXBkYXRlIHRoZSByZWNvZ25pemVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0RGF0YVxuICAgICAqL1xuICAgIHJlY29nbml6ZTogZnVuY3Rpb24oaW5wdXREYXRhKSB7XG4gICAgICAgIC8vIG1ha2UgYSBuZXcgY29weSBvZiB0aGUgaW5wdXREYXRhXG4gICAgICAgIC8vIHNvIHdlIGNhbiBjaGFuZ2UgdGhlIGlucHV0RGF0YSB3aXRob3V0IG1lc3NpbmcgdXAgdGhlIG90aGVyIHJlY29nbml6ZXJzXG4gICAgICAgIHZhciBpbnB1dERhdGFDbG9uZSA9IGFzc2lnbih7fSwgaW5wdXREYXRhKTtcblxuICAgICAgICAvLyBpcyBpcyBlbmFibGVkIGFuZCBhbGxvdyByZWNvZ25pemluZz9cbiAgICAgICAgaWYgKCFib29sT3JGbih0aGlzLm9wdGlvbnMuZW5hYmxlLCBbdGhpcywgaW5wdXREYXRhQ2xvbmVdKSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX0ZBSUxFRDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlc2V0IHdoZW4gd2UndmUgcmVhY2hlZCB0aGUgZW5kXG4gICAgICAgIGlmICh0aGlzLnN0YXRlICYgKFNUQVRFX1JFQ09HTklaRUQgfCBTVEFURV9DQU5DRUxMRUQgfCBTVEFURV9GQUlMRUQpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfUE9TU0lCTEU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5wcm9jZXNzKGlucHV0RGF0YUNsb25lKTtcblxuICAgICAgICAvLyB0aGUgcmVjb2duaXplciBoYXMgcmVjb2duaXplZCBhIGdlc3R1cmVcbiAgICAgICAgLy8gc28gdHJpZ2dlciBhbiBldmVudFxuICAgICAgICBpZiAodGhpcy5zdGF0ZSAmIChTVEFURV9CRUdBTiB8IFNUQVRFX0NIQU5HRUQgfCBTVEFURV9FTkRFRCB8IFNUQVRFX0NBTkNFTExFRCkpIHtcbiAgICAgICAgICAgIHRoaXMudHJ5RW1pdChpbnB1dERhdGFDbG9uZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmV0dXJuIHRoZSBzdGF0ZSBvZiB0aGUgcmVjb2duaXplclxuICAgICAqIHRoZSBhY3R1YWwgcmVjb2duaXppbmcgaGFwcGVucyBpbiB0aGlzIG1ldGhvZFxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0RGF0YVxuICAgICAqIEByZXR1cm5zIHtDb25zdH0gU1RBVEVcbiAgICAgKi9cbiAgICBwcm9jZXNzOiBmdW5jdGlvbihpbnB1dERhdGEpIHsgfSwgLy8ganNoaW50IGlnbm9yZTpsaW5lXG5cbiAgICAvKipcbiAgICAgKiByZXR1cm4gdGhlIHByZWZlcnJlZCB0b3VjaC1hY3Rpb25cbiAgICAgKiBAdmlydHVhbFxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7IH0sXG5cbiAgICAvKipcbiAgICAgKiBjYWxsZWQgd2hlbiB0aGUgZ2VzdHVyZSBpc24ndCBhbGxvd2VkIHRvIHJlY29nbml6ZVxuICAgICAqIGxpa2Ugd2hlbiBhbm90aGVyIGlzIGJlaW5nIHJlY29nbml6ZWQgb3IgaXQgaXMgZGlzYWJsZWRcbiAgICAgKiBAdmlydHVhbFxuICAgICAqL1xuICAgIHJlc2V0OiBmdW5jdGlvbigpIHsgfVxufTtcblxuLyoqXG4gKiBnZXQgYSB1c2FibGUgc3RyaW5nLCB1c2VkIGFzIGV2ZW50IHBvc3RmaXhcbiAqIEBwYXJhbSB7Q29uc3R9IHN0YXRlXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdGF0ZVxuICovXG5mdW5jdGlvbiBzdGF0ZVN0cihzdGF0ZSkge1xuICAgIGlmIChzdGF0ZSAmIFNUQVRFX0NBTkNFTExFRCkge1xuICAgICAgICByZXR1cm4gJ2NhbmNlbCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZSAmIFNUQVRFX0VOREVEKSB7XG4gICAgICAgIHJldHVybiAnZW5kJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlICYgU1RBVEVfQ0hBTkdFRCkge1xuICAgICAgICByZXR1cm4gJ21vdmUnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUgJiBTVEFURV9CRUdBTikge1xuICAgICAgICByZXR1cm4gJ3N0YXJ0JztcbiAgICB9XG4gICAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIGRpcmVjdGlvbiBjb25zIHRvIHN0cmluZ1xuICogQHBhcmFtIHtDb25zdH0gZGlyZWN0aW9uXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBkaXJlY3Rpb25TdHIoZGlyZWN0aW9uKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT05fRE9XTikge1xuICAgICAgICByZXR1cm4gJ2Rvd24nO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTl9VUCkge1xuICAgICAgICByZXR1cm4gJ3VwJztcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT05fTEVGVCkge1xuICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTl9SSUdIVCkge1xuICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICB9XG4gICAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIGdldCBhIHJlY29nbml6ZXIgYnkgbmFtZSBpZiBpdCBpcyBib3VuZCB0byBhIG1hbmFnZXJcbiAqIEBwYXJhbSB7UmVjb2duaXplcnxTdHJpbmd9IG90aGVyUmVjb2duaXplclxuICogQHBhcmFtIHtSZWNvZ25pemVyfSByZWNvZ25pemVyXG4gKiBAcmV0dXJucyB7UmVjb2duaXplcn1cbiAqL1xuZnVuY3Rpb24gZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlcihvdGhlclJlY29nbml6ZXIsIHJlY29nbml6ZXIpIHtcbiAgICB2YXIgbWFuYWdlciA9IHJlY29nbml6ZXIubWFuYWdlcjtcbiAgICBpZiAobWFuYWdlcikge1xuICAgICAgICByZXR1cm4gbWFuYWdlci5nZXQob3RoZXJSZWNvZ25pemVyKTtcbiAgICB9XG4gICAgcmV0dXJuIG90aGVyUmVjb2duaXplcjtcbn1cblxuLyoqXG4gKiBUaGlzIHJlY29nbml6ZXIgaXMganVzdCB1c2VkIGFzIGEgYmFzZSBmb3IgdGhlIHNpbXBsZSBhdHRyaWJ1dGUgcmVjb2duaXplcnMuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIFJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gQXR0clJlY29nbml6ZXIoKSB7XG4gICAgUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KEF0dHJSZWNvZ25pemVyLCBSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBBdHRyUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZGVmYXVsdCAxXG4gICAgICAgICAqL1xuICAgICAgICBwb2ludGVyczogMVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGNoZWNrIGlmIGl0IHRoZSByZWNvZ25pemVyIHJlY2VpdmVzIHZhbGlkIGlucHV0LCBsaWtlIGlucHV0LmRpc3RhbmNlID4gMTAuXG4gICAgICogQG1lbWJlcm9mIEF0dHJSZWNvZ25pemVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IHJlY29nbml6ZWRcbiAgICAgKi9cbiAgICBhdHRyVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIG9wdGlvblBvaW50ZXJzID0gdGhpcy5vcHRpb25zLnBvaW50ZXJzO1xuICAgICAgICByZXR1cm4gb3B0aW9uUG9pbnRlcnMgPT09IDAgfHwgaW5wdXQucG9pbnRlcnMubGVuZ3RoID09PSBvcHRpb25Qb2ludGVycztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUHJvY2VzcyB0aGUgaW5wdXQgYW5kIHJldHVybiB0aGUgc3RhdGUgZm9yIHRoZSByZWNvZ25pemVyXG4gICAgICogQG1lbWJlcm9mIEF0dHJSZWNvZ25pemVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICogQHJldHVybnMgeyp9IFN0YXRlXG4gICAgICovXG4gICAgcHJvY2VzczogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgdmFyIGV2ZW50VHlwZSA9IGlucHV0LmV2ZW50VHlwZTtcblxuICAgICAgICB2YXIgaXNSZWNvZ25pemVkID0gc3RhdGUgJiAoU1RBVEVfQkVHQU4gfCBTVEFURV9DSEFOR0VEKTtcbiAgICAgICAgdmFyIGlzVmFsaWQgPSB0aGlzLmF0dHJUZXN0KGlucHV0KTtcblxuICAgICAgICAvLyBvbiBjYW5jZWwgaW5wdXQgYW5kIHdlJ3ZlIHJlY29nbml6ZWQgYmVmb3JlLCByZXR1cm4gU1RBVEVfQ0FOQ0VMTEVEXG4gICAgICAgIGlmIChpc1JlY29nbml6ZWQgJiYgKGV2ZW50VHlwZSAmIElOUFVUX0NBTkNFTCB8fCAhaXNWYWxpZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZSB8IFNUQVRFX0NBTkNFTExFRDtcbiAgICAgICAgfSBlbHNlIGlmIChpc1JlY29nbml6ZWQgfHwgaXNWYWxpZCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX0VORCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZSB8IFNUQVRFX0VOREVEO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghKHN0YXRlICYgU1RBVEVfQkVHQU4pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFNUQVRFX0JFR0FOO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlIHwgU1RBVEVfQ0hBTkdFRDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU1RBVEVfRkFJTEVEO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIFBhblxuICogUmVjb2duaXplZCB3aGVuIHRoZSBwb2ludGVyIGlzIGRvd24gYW5kIG1vdmVkIGluIHRoZSBhbGxvd2VkIGRpcmVjdGlvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgQXR0clJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gUGFuUmVjb2duaXplcigpIHtcbiAgICBBdHRyUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5wWCA9IG51bGw7XG4gICAgdGhpcy5wWSA9IG51bGw7XG59XG5cbmluaGVyaXQoUGFuUmVjb2duaXplciwgQXR0clJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFBhblJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3BhbicsXG4gICAgICAgIHRocmVzaG9sZDogMTAsXG4gICAgICAgIHBvaW50ZXJzOiAxLFxuICAgICAgICBkaXJlY3Rpb246IERJUkVDVElPTl9BTExcbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gdGhpcy5vcHRpb25zLmRpcmVjdGlvbjtcbiAgICAgICAgdmFyIGFjdGlvbnMgPSBbXTtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiAmIERJUkVDVElPTl9IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICBhY3Rpb25zLnB1c2goVE9VQ0hfQUNUSU9OX1BBTl9ZKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGlyZWN0aW9uICYgRElSRUNUSU9OX1ZFUlRJQ0FMKSB7XG4gICAgICAgICAgICBhY3Rpb25zLnB1c2goVE9VQ0hfQUNUSU9OX1BBTl9YKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWN0aW9ucztcbiAgICB9LFxuXG4gICAgZGlyZWN0aW9uVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIHZhciBoYXNNb3ZlZCA9IHRydWU7XG4gICAgICAgIHZhciBkaXN0YW5jZSA9IGlucHV0LmRpc3RhbmNlO1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gaW5wdXQuZGlyZWN0aW9uO1xuICAgICAgICB2YXIgeCA9IGlucHV0LmRlbHRhWDtcbiAgICAgICAgdmFyIHkgPSBpbnB1dC5kZWx0YVk7XG5cbiAgICAgICAgLy8gbG9jayB0byBheGlzP1xuICAgICAgICBpZiAoIShkaXJlY3Rpb24gJiBvcHRpb25zLmRpcmVjdGlvbikpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRpcmVjdGlvbiAmIERJUkVDVElPTl9IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gKHggPT09IDApID8gRElSRUNUSU9OX05PTkUgOiAoeCA8IDApID8gRElSRUNUSU9OX0xFRlQgOiBESVJFQ1RJT05fUklHSFQ7XG4gICAgICAgICAgICAgICAgaGFzTW92ZWQgPSB4ICE9IHRoaXMucFg7XG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBNYXRoLmFicyhpbnB1dC5kZWx0YVgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAoeSA9PT0gMCkgPyBESVJFQ1RJT05fTk9ORSA6ICh5IDwgMCkgPyBESVJFQ1RJT05fVVAgOiBESVJFQ1RJT05fRE9XTjtcbiAgICAgICAgICAgICAgICBoYXNNb3ZlZCA9IHkgIT0gdGhpcy5wWTtcbiAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IE1hdGguYWJzKGlucHV0LmRlbHRhWSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaW5wdXQuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICByZXR1cm4gaGFzTW92ZWQgJiYgZGlzdGFuY2UgPiBvcHRpb25zLnRocmVzaG9sZCAmJiBkaXJlY3Rpb24gJiBvcHRpb25zLmRpcmVjdGlvbjtcbiAgICB9LFxuXG4gICAgYXR0clRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBBdHRyUmVjb2duaXplci5wcm90b3R5cGUuYXR0clRlc3QuY2FsbCh0aGlzLCBpbnB1dCkgJiZcbiAgICAgICAgICAgICh0aGlzLnN0YXRlICYgU1RBVEVfQkVHQU4gfHwgKCEodGhpcy5zdGF0ZSAmIFNUQVRFX0JFR0FOKSAmJiB0aGlzLmRpcmVjdGlvblRlc3QoaW5wdXQpKSk7XG4gICAgfSxcblxuICAgIGVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG5cbiAgICAgICAgdGhpcy5wWCA9IGlucHV0LmRlbHRhWDtcbiAgICAgICAgdGhpcy5wWSA9IGlucHV0LmRlbHRhWTtcblxuICAgICAgICB2YXIgZGlyZWN0aW9uID0gZGlyZWN0aW9uU3RyKGlucHV0LmRpcmVjdGlvbik7XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgaW5wdXQuYWRkaXRpb25hbEV2ZW50ID0gdGhpcy5vcHRpb25zLmV2ZW50ICsgZGlyZWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N1cGVyLmVtaXQuY2FsbCh0aGlzLCBpbnB1dCk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogUGluY2hcbiAqIFJlY29nbml6ZWQgd2hlbiB0d28gb3IgbW9yZSBwb2ludGVycyBhcmUgbW92aW5nIHRvd2FyZCAoem9vbS1pbikgb3IgYXdheSBmcm9tIGVhY2ggb3RoZXIgKHpvb20tb3V0KS5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgQXR0clJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gUGluY2hSZWNvZ25pemVyKCkge1xuICAgIEF0dHJSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoUGluY2hSZWNvZ25pemVyLCBBdHRyUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgUGluY2hSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdwaW5jaCcsXG4gICAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgICAgcG9pbnRlcnM6IDJcbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW1RPVUNIX0FDVElPTl9OT05FXTtcbiAgICB9LFxuXG4gICAgYXR0clRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdXBlci5hdHRyVGVzdC5jYWxsKHRoaXMsIGlucHV0KSAmJlxuICAgICAgICAgICAgKE1hdGguYWJzKGlucHV0LnNjYWxlIC0gMSkgPiB0aGlzLm9wdGlvbnMudGhyZXNob2xkIHx8IHRoaXMuc3RhdGUgJiBTVEFURV9CRUdBTik7XG4gICAgfSxcblxuICAgIGVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIGlmIChpbnB1dC5zY2FsZSAhPT0gMSkge1xuICAgICAgICAgICAgdmFyIGluT3V0ID0gaW5wdXQuc2NhbGUgPCAxID8gJ2luJyA6ICdvdXQnO1xuICAgICAgICAgICAgaW5wdXQuYWRkaXRpb25hbEV2ZW50ID0gdGhpcy5vcHRpb25zLmV2ZW50ICsgaW5PdXQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3VwZXIuZW1pdC5jYWxsKHRoaXMsIGlucHV0KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBQcmVzc1xuICogUmVjb2duaXplZCB3aGVuIHRoZSBwb2ludGVyIGlzIGRvd24gZm9yIHggbXMgd2l0aG91dCBhbnkgbW92ZW1lbnQuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIFJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gUHJlc3NSZWNvZ25pemVyKCkge1xuICAgIFJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMuX3RpbWVyID0gbnVsbDtcbiAgICB0aGlzLl9pbnB1dCA9IG51bGw7XG59XG5cbmluaGVyaXQoUHJlc3NSZWNvZ25pemVyLCBSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBQcmVzc1JlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3ByZXNzJyxcbiAgICAgICAgcG9pbnRlcnM6IDEsXG4gICAgICAgIHRpbWU6IDI1MSwgLy8gbWluaW1hbCB0aW1lIG9mIHRoZSBwb2ludGVyIHRvIGJlIHByZXNzZWRcbiAgICAgICAgdGhyZXNob2xkOiA5IC8vIGEgbWluaW1hbCBtb3ZlbWVudCBpcyBvaywgYnV0IGtlZXAgaXQgbG93XG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtUT1VDSF9BQ1RJT05fQVVUT107XG4gICAgfSxcblxuICAgIHByb2Nlc3M6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICB2YXIgdmFsaWRQb2ludGVycyA9IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA9PT0gb3B0aW9ucy5wb2ludGVycztcbiAgICAgICAgdmFyIHZhbGlkTW92ZW1lbnQgPSBpbnB1dC5kaXN0YW5jZSA8IG9wdGlvbnMudGhyZXNob2xkO1xuICAgICAgICB2YXIgdmFsaWRUaW1lID0gaW5wdXQuZGVsdGFUaW1lID4gb3B0aW9ucy50aW1lO1xuXG4gICAgICAgIHRoaXMuX2lucHV0ID0gaW5wdXQ7XG5cbiAgICAgICAgLy8gd2Ugb25seSBhbGxvdyBsaXR0bGUgbW92ZW1lbnRcbiAgICAgICAgLy8gYW5kIHdlJ3ZlIHJlYWNoZWQgYW4gZW5kIGV2ZW50LCBzbyBhIHRhcCBpcyBwb3NzaWJsZVxuICAgICAgICBpZiAoIXZhbGlkTW92ZW1lbnQgfHwgIXZhbGlkUG9pbnRlcnMgfHwgKGlucHV0LmV2ZW50VHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpICYmICF2YWxpZFRpbWUpKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dENvbnRleHQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX1JFQ09HTklaRUQ7XG4gICAgICAgICAgICAgICAgdGhpcy50cnlFbWl0KCk7XG4gICAgICAgICAgICB9LCBvcHRpb25zLnRpbWUsIHRoaXMpO1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX0VORCkge1xuICAgICAgICAgICAgcmV0dXJuIFNUQVRFX1JFQ09HTklaRUQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFNUQVRFX0ZBSUxFRDtcbiAgICB9LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICAgIH0sXG5cbiAgICBlbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPT0gU1RBVEVfUkVDT0dOSVpFRCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlucHV0ICYmIChpbnB1dC5ldmVudFR5cGUgJiBJTlBVVF9FTkQpKSB7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQgKyAndXAnLCBpbnB1dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9pbnB1dC50aW1lU3RhbXAgPSBub3coKTtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCwgdGhpcy5faW5wdXQpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbi8qKlxuICogUm90YXRlXG4gKiBSZWNvZ25pemVkIHdoZW4gdHdvIG9yIG1vcmUgcG9pbnRlciBhcmUgbW92aW5nIGluIGEgY2lyY3VsYXIgbW90aW9uLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBBdHRyUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBSb3RhdGVSZWNvZ25pemVyKCkge1xuICAgIEF0dHJSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoUm90YXRlUmVjb2duaXplciwgQXR0clJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFJvdGF0ZVJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3JvdGF0ZScsXG4gICAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgICAgcG9pbnRlcnM6IDJcbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW1RPVUNIX0FDVElPTl9OT05FXTtcbiAgICB9LFxuXG4gICAgYXR0clRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdXBlci5hdHRyVGVzdC5jYWxsKHRoaXMsIGlucHV0KSAmJlxuICAgICAgICAgICAgKE1hdGguYWJzKGlucHV0LnJvdGF0aW9uKSA+IHRoaXMub3B0aW9ucy50aHJlc2hvbGQgfHwgdGhpcy5zdGF0ZSAmIFNUQVRFX0JFR0FOKTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBTd2lwZVxuICogUmVjb2duaXplZCB3aGVuIHRoZSBwb2ludGVyIGlzIG1vdmluZyBmYXN0ICh2ZWxvY2l0eSksIHdpdGggZW5vdWdoIGRpc3RhbmNlIGluIHRoZSBhbGxvd2VkIGRpcmVjdGlvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgQXR0clJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gU3dpcGVSZWNvZ25pemVyKCkge1xuICAgIEF0dHJSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoU3dpcGVSZWNvZ25pemVyLCBBdHRyUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgU3dpcGVSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdzd2lwZScsXG4gICAgICAgIHRocmVzaG9sZDogMTAsXG4gICAgICAgIHZlbG9jaXR5OiAwLjMsXG4gICAgICAgIGRpcmVjdGlvbjogRElSRUNUSU9OX0hPUklaT05UQUwgfCBESVJFQ1RJT05fVkVSVElDQUwsXG4gICAgICAgIHBvaW50ZXJzOiAxXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFBhblJlY29nbml6ZXIucHJvdG90eXBlLmdldFRvdWNoQWN0aW9uLmNhbGwodGhpcyk7XG4gICAgfSxcblxuICAgIGF0dHJUZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gdGhpcy5vcHRpb25zLmRpcmVjdGlvbjtcbiAgICAgICAgdmFyIHZlbG9jaXR5O1xuXG4gICAgICAgIGlmIChkaXJlY3Rpb24gJiAoRElSRUNUSU9OX0hPUklaT05UQUwgfCBESVJFQ1RJT05fVkVSVElDQUwpKSB7XG4gICAgICAgICAgICB2ZWxvY2l0eSA9IGlucHV0Lm92ZXJhbGxWZWxvY2l0eTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gJiBESVJFQ1RJT05fSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgdmVsb2NpdHkgPSBpbnB1dC5vdmVyYWxsVmVsb2NpdHlYO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiAmIERJUkVDVElPTl9WRVJUSUNBTCkge1xuICAgICAgICAgICAgdmVsb2NpdHkgPSBpbnB1dC5vdmVyYWxsVmVsb2NpdHlZO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1cGVyLmF0dHJUZXN0LmNhbGwodGhpcywgaW5wdXQpICYmXG4gICAgICAgICAgICBkaXJlY3Rpb24gJiBpbnB1dC5vZmZzZXREaXJlY3Rpb24gJiZcbiAgICAgICAgICAgIGlucHV0LmRpc3RhbmNlID4gdGhpcy5vcHRpb25zLnRocmVzaG9sZCAmJlxuICAgICAgICAgICAgaW5wdXQubWF4UG9pbnRlcnMgPT0gdGhpcy5vcHRpb25zLnBvaW50ZXJzICYmXG4gICAgICAgICAgICBhYnModmVsb2NpdHkpID4gdGhpcy5vcHRpb25zLnZlbG9jaXR5ICYmIGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX0VORDtcbiAgICB9LFxuXG4gICAgZW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGRpcmVjdGlvblN0cihpbnB1dC5vZmZzZXREaXJlY3Rpb24pO1xuICAgICAgICBpZiAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQgKyBkaXJlY3Rpb24sIGlucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCwgaW5wdXQpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEEgdGFwIGlzIGVjb2duaXplZCB3aGVuIHRoZSBwb2ludGVyIGlzIGRvaW5nIGEgc21hbGwgdGFwL2NsaWNrLiBNdWx0aXBsZSB0YXBzIGFyZSByZWNvZ25pemVkIGlmIHRoZXkgb2NjdXJcbiAqIGJldHdlZW4gdGhlIGdpdmVuIGludGVydmFsIGFuZCBwb3NpdGlvbi4gVGhlIGRlbGF5IG9wdGlvbiBjYW4gYmUgdXNlZCB0byByZWNvZ25pemUgbXVsdGktdGFwcyB3aXRob3V0IGZpcmluZ1xuICogYSBzaW5nbGUgdGFwLlxuICpcbiAqIFRoZSBldmVudERhdGEgZnJvbSB0aGUgZW1pdHRlZCBldmVudCBjb250YWlucyB0aGUgcHJvcGVydHkgYHRhcENvdW50YCwgd2hpY2ggY29udGFpbnMgdGhlIGFtb3VudCBvZlxuICogbXVsdGktdGFwcyBiZWluZyByZWNvZ25pemVkLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFRhcFJlY29nbml6ZXIoKSB7XG4gICAgUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgLy8gcHJldmlvdXMgdGltZSBhbmQgY2VudGVyLFxuICAgIC8vIHVzZWQgZm9yIHRhcCBjb3VudGluZ1xuICAgIHRoaXMucFRpbWUgPSBmYWxzZTtcbiAgICB0aGlzLnBDZW50ZXIgPSBmYWxzZTtcblxuICAgIHRoaXMuX3RpbWVyID0gbnVsbDtcbiAgICB0aGlzLl9pbnB1dCA9IG51bGw7XG4gICAgdGhpcy5jb3VudCA9IDA7XG59XG5cbmluaGVyaXQoVGFwUmVjb2duaXplciwgUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgUGluY2hSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICd0YXAnLFxuICAgICAgICBwb2ludGVyczogMSxcbiAgICAgICAgdGFwczogMSxcbiAgICAgICAgaW50ZXJ2YWw6IDMwMCwgLy8gbWF4IHRpbWUgYmV0d2VlbiB0aGUgbXVsdGktdGFwIHRhcHNcbiAgICAgICAgdGltZTogMjUwLCAvLyBtYXggdGltZSBvZiB0aGUgcG9pbnRlciB0byBiZSBkb3duIChsaWtlIGZpbmdlciBvbiB0aGUgc2NyZWVuKVxuICAgICAgICB0aHJlc2hvbGQ6IDksIC8vIGEgbWluaW1hbCBtb3ZlbWVudCBpcyBvaywgYnV0IGtlZXAgaXQgbG93XG4gICAgICAgIHBvc1RocmVzaG9sZDogMTAgLy8gYSBtdWx0aS10YXAgY2FuIGJlIGEgYml0IG9mZiB0aGUgaW5pdGlhbCBwb3NpdGlvblxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbVE9VQ0hfQUNUSU9OX01BTklQVUxBVElPTl07XG4gICAgfSxcblxuICAgIHByb2Nlc3M6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG4gICAgICAgIHZhciB2YWxpZFBvaW50ZXJzID0gaW5wdXQucG9pbnRlcnMubGVuZ3RoID09PSBvcHRpb25zLnBvaW50ZXJzO1xuICAgICAgICB2YXIgdmFsaWRNb3ZlbWVudCA9IGlucHV0LmRpc3RhbmNlIDwgb3B0aW9ucy50aHJlc2hvbGQ7XG4gICAgICAgIHZhciB2YWxpZFRvdWNoVGltZSA9IGlucHV0LmRlbHRhVGltZSA8IG9wdGlvbnMudGltZTtcblxuICAgICAgICB0aGlzLnJlc2V0KCk7XG5cbiAgICAgICAgaWYgKChpbnB1dC5ldmVudFR5cGUgJiBJTlBVVF9TVEFSVCkgJiYgKHRoaXMuY291bnQgPT09IDApKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mYWlsVGltZW91dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gd2Ugb25seSBhbGxvdyBsaXR0bGUgbW92ZW1lbnRcbiAgICAgICAgLy8gYW5kIHdlJ3ZlIHJlYWNoZWQgYW4gZW5kIGV2ZW50LCBzbyBhIHRhcCBpcyBwb3NzaWJsZVxuICAgICAgICBpZiAodmFsaWRNb3ZlbWVudCAmJiB2YWxpZFRvdWNoVGltZSAmJiB2YWxpZFBvaW50ZXJzKSB7XG4gICAgICAgICAgICBpZiAoaW5wdXQuZXZlbnRUeXBlICE9IElOUFVUX0VORCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZhaWxUaW1lb3V0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB2YWxpZEludGVydmFsID0gdGhpcy5wVGltZSA/IChpbnB1dC50aW1lU3RhbXAgLSB0aGlzLnBUaW1lIDwgb3B0aW9ucy5pbnRlcnZhbCkgOiB0cnVlO1xuICAgICAgICAgICAgdmFyIHZhbGlkTXVsdGlUYXAgPSAhdGhpcy5wQ2VudGVyIHx8IGdldERpc3RhbmNlKHRoaXMucENlbnRlciwgaW5wdXQuY2VudGVyKSA8IG9wdGlvbnMucG9zVGhyZXNob2xkO1xuXG4gICAgICAgICAgICB0aGlzLnBUaW1lID0gaW5wdXQudGltZVN0YW1wO1xuICAgICAgICAgICAgdGhpcy5wQ2VudGVyID0gaW5wdXQuY2VudGVyO1xuXG4gICAgICAgICAgICBpZiAoIXZhbGlkTXVsdGlUYXAgfHwgIXZhbGlkSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50ID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudCArPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9pbnB1dCA9IGlucHV0O1xuXG4gICAgICAgICAgICAvLyBpZiB0YXAgY291bnQgbWF0Y2hlcyB3ZSBoYXZlIHJlY29nbml6ZWQgaXQsXG4gICAgICAgICAgICAvLyBlbHNlIGl0IGhhcyBiZWdhbiByZWNvZ25pemluZy4uLlxuICAgICAgICAgICAgdmFyIHRhcENvdW50ID0gdGhpcy5jb3VudCAlIG9wdGlvbnMudGFwcztcbiAgICAgICAgICAgIGlmICh0YXBDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIG5vIGZhaWxpbmcgcmVxdWlyZW1lbnRzLCBpbW1lZGlhdGVseSB0cmlnZ2VyIHRoZSB0YXAgZXZlbnRcbiAgICAgICAgICAgICAgICAvLyBvciB3YWl0IGFzIGxvbmcgYXMgdGhlIG11bHRpdGFwIGludGVydmFsIHRvIHRyaWdnZXJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaGFzUmVxdWlyZUZhaWx1cmVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFNUQVRFX1JFQ09HTklaRUQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0Q29udGV4dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9SRUNPR05JWkVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlFbWl0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIG9wdGlvbnMuaW50ZXJ2YWwsIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU1RBVEVfQkVHQU47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTVEFURV9GQUlMRUQ7XG4gICAgfSxcblxuICAgIGZhaWxUaW1lb3V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0Q29udGV4dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9GQUlMRUQ7XG4gICAgICAgIH0sIHRoaXMub3B0aW9ucy5pbnRlcnZhbCwgdGhpcyk7XG4gICAgICAgIHJldHVybiBTVEFURV9GQUlMRUQ7XG4gICAgfSxcblxuICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgICB9LFxuXG4gICAgZW1pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09IFNUQVRFX1JFQ09HTklaRUQpIHtcbiAgICAgICAgICAgIHRoaXMuX2lucHV0LnRhcENvdW50ID0gdGhpcy5jb3VudDtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCwgdGhpcy5faW5wdXQpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbi8qKlxuICogU2ltcGxlIHdheSB0byBjcmVhdGUgYSBtYW5hZ2VyIHdpdGggYSBkZWZhdWx0IHNldCBvZiByZWNvZ25pemVycy5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBIYW1tZXIoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMucmVjb2duaXplcnMgPSBpZlVuZGVmaW5lZChvcHRpb25zLnJlY29nbml6ZXJzLCBIYW1tZXIuZGVmYXVsdHMucHJlc2V0KTtcbiAgICByZXR1cm4gbmV3IE1hbmFnZXIoZWxlbWVudCwgb3B0aW9ucyk7XG59XG5cbi8qKlxuICogQGNvbnN0IHtzdHJpbmd9XG4gKi9cbkhhbW1lci5WRVJTSU9OID0gJzIuMC43JztcblxuLyoqXG4gKiBkZWZhdWx0IHNldHRpbmdzXG4gKiBAbmFtZXNwYWNlXG4gKi9cbkhhbW1lci5kZWZhdWx0cyA9IHtcbiAgICAvKipcbiAgICAgKiBzZXQgaWYgRE9NIGV2ZW50cyBhcmUgYmVpbmcgdHJpZ2dlcmVkLlxuICAgICAqIEJ1dCB0aGlzIGlzIHNsb3dlciBhbmQgdW51c2VkIGJ5IHNpbXBsZSBpbXBsZW1lbnRhdGlvbnMsIHNvIGRpc2FibGVkIGJ5IGRlZmF1bHQuXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBkb21FdmVudHM6IGZhbHNlLFxuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIGZvciB0aGUgdG91Y2hBY3Rpb24gcHJvcGVydHkvZmFsbGJhY2suXG4gICAgICogV2hlbiBzZXQgdG8gYGNvbXB1dGVgIGl0IHdpbGwgbWFnaWNhbGx5IHNldCB0aGUgY29ycmVjdCB2YWx1ZSBiYXNlZCBvbiB0aGUgYWRkZWQgcmVjb2duaXplcnMuXG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKiBAZGVmYXVsdCBjb21wdXRlXG4gICAgICovXG4gICAgdG91Y2hBY3Rpb246IFRPVUNIX0FDVElPTl9DT01QVVRFLFxuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIGVuYWJsZTogdHJ1ZSxcblxuICAgIC8qKlxuICAgICAqIEVYUEVSSU1FTlRBTCBGRUFUVVJFIC0tIGNhbiBiZSByZW1vdmVkL2NoYW5nZWRcbiAgICAgKiBDaGFuZ2UgdGhlIHBhcmVudCBpbnB1dCB0YXJnZXQgZWxlbWVudC5cbiAgICAgKiBJZiBOdWxsLCB0aGVuIGl0IGlzIGJlaW5nIHNldCB0aGUgdG8gbWFpbiBlbGVtZW50LlxuICAgICAqIEB0eXBlIHtOdWxsfEV2ZW50VGFyZ2V0fVxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBpbnB1dFRhcmdldDogbnVsbCxcblxuICAgIC8qKlxuICAgICAqIGZvcmNlIGFuIGlucHV0IGNsYXNzXG4gICAgICogQHR5cGUge051bGx8RnVuY3Rpb259XG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIGlucHV0Q2xhc3M6IG51bGwsXG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IHJlY29nbml6ZXIgc2V0dXAgd2hlbiBjYWxsaW5nIGBIYW1tZXIoKWBcbiAgICAgKiBXaGVuIGNyZWF0aW5nIGEgbmV3IE1hbmFnZXIgdGhlc2Ugd2lsbCBiZSBza2lwcGVkLlxuICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgKi9cbiAgICBwcmVzZXQ6IFtcbiAgICAgICAgLy8gUmVjb2duaXplckNsYXNzLCBvcHRpb25zLCBbcmVjb2duaXplV2l0aCwgLi4uXSwgW3JlcXVpcmVGYWlsdXJlLCAuLi5dXG4gICAgICAgIFtSb3RhdGVSZWNvZ25pemVyLCB7ZW5hYmxlOiBmYWxzZX1dLFxuICAgICAgICBbUGluY2hSZWNvZ25pemVyLCB7ZW5hYmxlOiBmYWxzZX0sIFsncm90YXRlJ11dLFxuICAgICAgICBbU3dpcGVSZWNvZ25pemVyLCB7ZGlyZWN0aW9uOiBESVJFQ1RJT05fSE9SSVpPTlRBTH1dLFxuICAgICAgICBbUGFuUmVjb2duaXplciwge2RpcmVjdGlvbjogRElSRUNUSU9OX0hPUklaT05UQUx9LCBbJ3N3aXBlJ11dLFxuICAgICAgICBbVGFwUmVjb2duaXplcl0sXG4gICAgICAgIFtUYXBSZWNvZ25pemVyLCB7ZXZlbnQ6ICdkb3VibGV0YXAnLCB0YXBzOiAyfSwgWyd0YXAnXV0sXG4gICAgICAgIFtQcmVzc1JlY29nbml6ZXJdXG4gICAgXSxcblxuICAgIC8qKlxuICAgICAqIFNvbWUgQ1NTIHByb3BlcnRpZXMgY2FuIGJlIHVzZWQgdG8gaW1wcm92ZSB0aGUgd29ya2luZyBvZiBIYW1tZXIuXG4gICAgICogQWRkIHRoZW0gdG8gdGhpcyBtZXRob2QgYW5kIHRoZXkgd2lsbCBiZSBzZXQgd2hlbiBjcmVhdGluZyBhIG5ldyBNYW5hZ2VyLlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKi9cbiAgICBjc3NQcm9wczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogRGlzYWJsZXMgdGV4dCBzZWxlY3Rpb24gdG8gaW1wcm92ZSB0aGUgZHJhZ2dpbmcgZ2VzdHVyZS4gTWFpbmx5IGZvciBkZXNrdG9wIGJyb3dzZXJzLlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzYWJsZSB0aGUgV2luZG93cyBQaG9uZSBncmlwcGVycyB3aGVuIHByZXNzaW5nIGFuIGVsZW1lbnQuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgdG91Y2hTZWxlY3Q6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzYWJsZXMgdGhlIGRlZmF1bHQgY2FsbG91dCBzaG93biB3aGVuIHlvdSB0b3VjaCBhbmQgaG9sZCBhIHRvdWNoIHRhcmdldC5cbiAgICAgICAgICogT24gaU9TLCB3aGVuIHlvdSB0b3VjaCBhbmQgaG9sZCBhIHRvdWNoIHRhcmdldCBzdWNoIGFzIGEgbGluaywgU2FmYXJpIGRpc3BsYXlzXG4gICAgICAgICAqIGEgY2FsbG91dCBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IHRoZSBsaW5rLiBUaGlzIHByb3BlcnR5IGFsbG93cyB5b3UgdG8gZGlzYWJsZSB0aGF0IGNhbGxvdXQuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgdG91Y2hDYWxsb3V0OiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZmllcyB3aGV0aGVyIHpvb21pbmcgaXMgZW5hYmxlZC4gVXNlZCBieSBJRTEwPlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIGNvbnRlbnRab29taW5nOiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZmllcyB0aGF0IGFuIGVudGlyZSBlbGVtZW50IHNob3VsZCBiZSBkcmFnZ2FibGUgaW5zdGVhZCBvZiBpdHMgY29udGVudHMuIE1haW5seSBmb3IgZGVza3RvcCBicm93c2Vycy5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICB1c2VyRHJhZzogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPdmVycmlkZXMgdGhlIGhpZ2hsaWdodCBjb2xvciBzaG93biB3aGVuIHRoZSB1c2VyIHRhcHMgYSBsaW5rIG9yIGEgSmF2YVNjcmlwdFxuICAgICAgICAgKiBjbGlja2FibGUgZWxlbWVudCBpbiBpT1MuIFRoaXMgcHJvcGVydHkgb2JleXMgdGhlIGFscGhhIHZhbHVlLCBpZiBzcGVjaWZpZWQuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdyZ2JhKDAsMCwwLDApJ1xuICAgICAgICAgKi9cbiAgICAgICAgdGFwSGlnaGxpZ2h0Q29sb3I6ICdyZ2JhKDAsMCwwLDApJ1xuICAgIH1cbn07XG5cbnZhciBTVE9QID0gMTtcbnZhciBGT1JDRURfU1RPUCA9IDI7XG5cbi8qKlxuICogTWFuYWdlclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIE1hbmFnZXIoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IGFzc2lnbih7fSwgSGFtbWVyLmRlZmF1bHRzLCBvcHRpb25zIHx8IHt9KTtcblxuICAgIHRoaXMub3B0aW9ucy5pbnB1dFRhcmdldCA9IHRoaXMub3B0aW9ucy5pbnB1dFRhcmdldCB8fCBlbGVtZW50O1xuXG4gICAgdGhpcy5oYW5kbGVycyA9IHt9O1xuICAgIHRoaXMuc2Vzc2lvbiA9IHt9O1xuICAgIHRoaXMucmVjb2duaXplcnMgPSBbXTtcbiAgICB0aGlzLm9sZENzc1Byb3BzID0ge307XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuaW5wdXQgPSBjcmVhdGVJbnB1dEluc3RhbmNlKHRoaXMpO1xuICAgIHRoaXMudG91Y2hBY3Rpb24gPSBuZXcgVG91Y2hBY3Rpb24odGhpcywgdGhpcy5vcHRpb25zLnRvdWNoQWN0aW9uKTtcblxuICAgIHRvZ2dsZUNzc1Byb3BzKHRoaXMsIHRydWUpO1xuXG4gICAgZWFjaCh0aGlzLm9wdGlvbnMucmVjb2duaXplcnMsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgdmFyIHJlY29nbml6ZXIgPSB0aGlzLmFkZChuZXcgKGl0ZW1bMF0pKGl0ZW1bMV0pKTtcbiAgICAgICAgaXRlbVsyXSAmJiByZWNvZ25pemVyLnJlY29nbml6ZVdpdGgoaXRlbVsyXSk7XG4gICAgICAgIGl0ZW1bM10gJiYgcmVjb2duaXplci5yZXF1aXJlRmFpbHVyZShpdGVtWzNdKTtcbiAgICB9LCB0aGlzKTtcbn1cblxuTWFuYWdlci5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogc2V0IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtNYW5hZ2VyfVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICBhc3NpZ24odGhpcy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgICAvLyBPcHRpb25zIHRoYXQgbmVlZCBhIGxpdHRsZSBtb3JlIHNldHVwXG4gICAgICAgIGlmIChvcHRpb25zLnRvdWNoQWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRvdWNoQWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmlucHV0VGFyZ2V0KSB7XG4gICAgICAgICAgICAvLyBDbGVhbiB1cCBleGlzdGluZyBldmVudCBsaXN0ZW5lcnMgYW5kIHJlaW5pdGlhbGl6ZVxuICAgICAgICAgICAgdGhpcy5pbnB1dC5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmlucHV0LnRhcmdldCA9IG9wdGlvbnMuaW5wdXRUYXJnZXQ7XG4gICAgICAgICAgICB0aGlzLmlucHV0LmluaXQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogc3RvcCByZWNvZ25pemluZyBmb3IgdGhpcyBzZXNzaW9uLlxuICAgICAqIFRoaXMgc2Vzc2lvbiB3aWxsIGJlIGRpc2NhcmRlZCwgd2hlbiBhIG5ldyBbaW5wdXRdc3RhcnQgZXZlbnQgaXMgZmlyZWQuXG4gICAgICogV2hlbiBmb3JjZWQsIHRoZSByZWNvZ25pemVyIGN5Y2xlIGlzIHN0b3BwZWQgaW1tZWRpYXRlbHkuXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbZm9yY2VdXG4gICAgICovXG4gICAgc3RvcDogZnVuY3Rpb24oZm9yY2UpIHtcbiAgICAgICAgdGhpcy5zZXNzaW9uLnN0b3BwZWQgPSBmb3JjZSA/IEZPUkNFRF9TVE9QIDogU1RPUDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcnVuIHRoZSByZWNvZ25pemVycyFcbiAgICAgKiBjYWxsZWQgYnkgdGhlIGlucHV0SGFuZGxlciBmdW5jdGlvbiBvbiBldmVyeSBtb3ZlbWVudCBvZiB0aGUgcG9pbnRlcnMgKHRvdWNoZXMpXG4gICAgICogaXQgd2Fsa3MgdGhyb3VnaCBhbGwgdGhlIHJlY29nbml6ZXJzIGFuZCB0cmllcyB0byBkZXRlY3QgdGhlIGdlc3R1cmUgdGhhdCBpcyBiZWluZyBtYWRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0RGF0YVxuICAgICAqL1xuICAgIHJlY29nbml6ZTogZnVuY3Rpb24oaW5wdXREYXRhKSB7XG4gICAgICAgIHZhciBzZXNzaW9uID0gdGhpcy5zZXNzaW9uO1xuICAgICAgICBpZiAoc2Vzc2lvbi5zdG9wcGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBydW4gdGhlIHRvdWNoLWFjdGlvbiBwb2x5ZmlsbFxuICAgICAgICB0aGlzLnRvdWNoQWN0aW9uLnByZXZlbnREZWZhdWx0cyhpbnB1dERhdGEpO1xuXG4gICAgICAgIHZhciByZWNvZ25pemVyO1xuICAgICAgICB2YXIgcmVjb2duaXplcnMgPSB0aGlzLnJlY29nbml6ZXJzO1xuXG4gICAgICAgIC8vIHRoaXMgaG9sZHMgdGhlIHJlY29nbml6ZXIgdGhhdCBpcyBiZWluZyByZWNvZ25pemVkLlxuICAgICAgICAvLyBzbyB0aGUgcmVjb2duaXplcidzIHN0YXRlIG5lZWRzIHRvIGJlIEJFR0FOLCBDSEFOR0VELCBFTkRFRCBvciBSRUNPR05JWkVEXG4gICAgICAgIC8vIGlmIG5vIHJlY29nbml6ZXIgaXMgZGV0ZWN0aW5nIGEgdGhpbmcsIGl0IGlzIHNldCB0byBgbnVsbGBcbiAgICAgICAgdmFyIGN1clJlY29nbml6ZXIgPSBzZXNzaW9uLmN1clJlY29nbml6ZXI7XG5cbiAgICAgICAgLy8gcmVzZXQgd2hlbiB0aGUgbGFzdCByZWNvZ25pemVyIGlzIHJlY29nbml6ZWRcbiAgICAgICAgLy8gb3Igd2hlbiB3ZSdyZSBpbiBhIG5ldyBzZXNzaW9uXG4gICAgICAgIGlmICghY3VyUmVjb2duaXplciB8fCAoY3VyUmVjb2duaXplciAmJiBjdXJSZWNvZ25pemVyLnN0YXRlICYgU1RBVEVfUkVDT0dOSVpFRCkpIHtcbiAgICAgICAgICAgIGN1clJlY29nbml6ZXIgPSBzZXNzaW9uLmN1clJlY29nbml6ZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHJlY29nbml6ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVjb2duaXplciA9IHJlY29nbml6ZXJzW2ldO1xuXG4gICAgICAgICAgICAvLyBmaW5kIG91dCBpZiB3ZSBhcmUgYWxsb3dlZCB0cnkgdG8gcmVjb2duaXplIHRoZSBpbnB1dCBmb3IgdGhpcyBvbmUuXG4gICAgICAgICAgICAvLyAxLiAgIGFsbG93IGlmIHRoZSBzZXNzaW9uIGlzIE5PVCBmb3JjZWQgc3RvcHBlZCAoc2VlIHRoZSAuc3RvcCgpIG1ldGhvZClcbiAgICAgICAgICAgIC8vIDIuICAgYWxsb3cgaWYgd2Ugc3RpbGwgaGF2ZW4ndCByZWNvZ25pemVkIGEgZ2VzdHVyZSBpbiB0aGlzIHNlc3Npb24sIG9yIHRoZSB0aGlzIHJlY29nbml6ZXIgaXMgdGhlIG9uZVxuICAgICAgICAgICAgLy8gICAgICB0aGF0IGlzIGJlaW5nIHJlY29nbml6ZWQuXG4gICAgICAgICAgICAvLyAzLiAgIGFsbG93IGlmIHRoZSByZWNvZ25pemVyIGlzIGFsbG93ZWQgdG8gcnVuIHNpbXVsdGFuZW91cyB3aXRoIHRoZSBjdXJyZW50IHJlY29nbml6ZWQgcmVjb2duaXplci5cbiAgICAgICAgICAgIC8vICAgICAgdGhpcyBjYW4gYmUgc2V0dXAgd2l0aCB0aGUgYHJlY29nbml6ZVdpdGgoKWAgbWV0aG9kIG9uIHRoZSByZWNvZ25pemVyLlxuICAgICAgICAgICAgaWYgKHNlc3Npb24uc3RvcHBlZCAhPT0gRk9SQ0VEX1NUT1AgJiYgKCAvLyAxXG4gICAgICAgICAgICAgICAgICAgICFjdXJSZWNvZ25pemVyIHx8IHJlY29nbml6ZXIgPT0gY3VyUmVjb2duaXplciB8fCAvLyAyXG4gICAgICAgICAgICAgICAgICAgIHJlY29nbml6ZXIuY2FuUmVjb2duaXplV2l0aChjdXJSZWNvZ25pemVyKSkpIHsgLy8gM1xuICAgICAgICAgICAgICAgIHJlY29nbml6ZXIucmVjb2duaXplKGlucHV0RGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlY29nbml6ZXIucmVzZXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhlIHJlY29nbml6ZXIgaGFzIGJlZW4gcmVjb2duaXppbmcgdGhlIGlucHV0IGFzIGEgdmFsaWQgZ2VzdHVyZSwgd2Ugd2FudCB0byBzdG9yZSB0aGlzIG9uZSBhcyB0aGVcbiAgICAgICAgICAgIC8vIGN1cnJlbnQgYWN0aXZlIHJlY29nbml6ZXIuIGJ1dCBvbmx5IGlmIHdlIGRvbid0IGFscmVhZHkgaGF2ZSBhbiBhY3RpdmUgcmVjb2duaXplclxuICAgICAgICAgICAgaWYgKCFjdXJSZWNvZ25pemVyICYmIHJlY29nbml6ZXIuc3RhdGUgJiAoU1RBVEVfQkVHQU4gfCBTVEFURV9DSEFOR0VEIHwgU1RBVEVfRU5ERUQpKSB7XG4gICAgICAgICAgICAgICAgY3VyUmVjb2duaXplciA9IHNlc3Npb24uY3VyUmVjb2duaXplciA9IHJlY29nbml6ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZ2V0IGEgcmVjb2duaXplciBieSBpdHMgZXZlbnQgbmFtZS5cbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ8U3RyaW5nfSByZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ8TnVsbH1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uKHJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKHJlY29nbml6ZXIgaW5zdGFuY2VvZiBSZWNvZ25pemVyKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVjb2duaXplcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZWNvZ25pemVycyA9IHRoaXMucmVjb2duaXplcnM7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVjb2duaXplcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChyZWNvZ25pemVyc1tpXS5vcHRpb25zLmV2ZW50ID09IHJlY29nbml6ZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVjb2duaXplcnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGFkZCBhIHJlY29nbml6ZXIgdG8gdGhlIG1hbmFnZXJcbiAgICAgKiBleGlzdGluZyByZWNvZ25pemVycyB3aXRoIHRoZSBzYW1lIGV2ZW50IG5hbWUgd2lsbCBiZSByZW1vdmVkXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSByZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ8TWFuYWdlcn1cbiAgICAgKi9cbiAgICBhZGQ6IGZ1bmN0aW9uKHJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKHJlY29nbml6ZXIsICdhZGQnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgZXhpc3RpbmdcbiAgICAgICAgdmFyIGV4aXN0aW5nID0gdGhpcy5nZXQocmVjb2duaXplci5vcHRpb25zLmV2ZW50KTtcbiAgICAgICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZShleGlzdGluZyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlY29nbml6ZXJzLnB1c2gocmVjb2duaXplcik7XG4gICAgICAgIHJlY29nbml6ZXIubWFuYWdlciA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy50b3VjaEFjdGlvbi51cGRhdGUoKTtcbiAgICAgICAgcmV0dXJuIHJlY29nbml6ZXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJlbW92ZSBhIHJlY29nbml6ZXIgYnkgbmFtZSBvciBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcnxTdHJpbmd9IHJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7TWFuYWdlcn1cbiAgICAgKi9cbiAgICByZW1vdmU6IGZ1bmN0aW9uKHJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKHJlY29nbml6ZXIsICdyZW1vdmUnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICByZWNvZ25pemVyID0gdGhpcy5nZXQocmVjb2duaXplcik7XG5cbiAgICAgICAgLy8gbGV0J3MgbWFrZSBzdXJlIHRoaXMgcmVjb2duaXplciBleGlzdHNcbiAgICAgICAgaWYgKHJlY29nbml6ZXIpIHtcbiAgICAgICAgICAgIHZhciByZWNvZ25pemVycyA9IHRoaXMucmVjb2duaXplcnM7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBpbkFycmF5KHJlY29nbml6ZXJzLCByZWNvZ25pemVyKTtcblxuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJlY29nbml6ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy50b3VjaEFjdGlvbi51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBiaW5kIGV2ZW50XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50c1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAgICAgKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSB0aGlzXG4gICAgICovXG4gICAgb246IGZ1bmN0aW9uKGV2ZW50cywgaGFuZGxlcikge1xuICAgICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzO1xuICAgICAgICBlYWNoKHNwbGl0U3RyKGV2ZW50cyksIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBoYW5kbGVyc1tldmVudF0gPSBoYW5kbGVyc1tldmVudF0gfHwgW107XG4gICAgICAgICAgICBoYW5kbGVyc1tldmVudF0ucHVzaChoYW5kbGVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB1bmJpbmQgZXZlbnQsIGxlYXZlIGVtaXQgYmxhbmsgdG8gcmVtb3ZlIGFsbCBoYW5kbGVyc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudHNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaGFuZGxlcl1cbiAgICAgKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSB0aGlzXG4gICAgICovXG4gICAgb2ZmOiBmdW5jdGlvbihldmVudHMsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzO1xuICAgICAgICBlYWNoKHNwbGl0U3RyKGV2ZW50cyksIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgaGFuZGxlcnNbZXZlbnRdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyc1tldmVudF0gJiYgaGFuZGxlcnNbZXZlbnRdLnNwbGljZShpbkFycmF5KGhhbmRsZXJzW2V2ZW50XSwgaGFuZGxlciksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGVtaXQgZXZlbnQgdG8gdGhlIGxpc3RlbmVyc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgZW1pdDogZnVuY3Rpb24oZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgLy8gd2UgYWxzbyB3YW50IHRvIHRyaWdnZXIgZG9tIGV2ZW50c1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRvbUV2ZW50cykge1xuICAgICAgICAgICAgdHJpZ2dlckRvbUV2ZW50KGV2ZW50LCBkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vIGhhbmRsZXJzLCBzbyBza2lwIGl0IGFsbFxuICAgICAgICB2YXIgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzW2V2ZW50XSAmJiB0aGlzLmhhbmRsZXJzW2V2ZW50XS5zbGljZSgpO1xuICAgICAgICBpZiAoIWhhbmRsZXJzIHx8ICFoYW5kbGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEudHlwZSA9IGV2ZW50O1xuICAgICAgICBkYXRhLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkYXRhLnNyY0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IGhhbmRsZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgaGFuZGxlcnNbaV0oZGF0YSk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZGVzdHJveSB0aGUgbWFuYWdlciBhbmQgdW5iaW5kcyBhbGwgZXZlbnRzXG4gICAgICogaXQgZG9lc24ndCB1bmJpbmQgZG9tIGV2ZW50cywgdGhhdCBpcyB0aGUgdXNlciBvd24gcmVzcG9uc2liaWxpdHlcbiAgICAgKi9cbiAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ICYmIHRvZ2dsZUNzc1Byb3BzKHRoaXMsIGZhbHNlKTtcblxuICAgICAgICB0aGlzLmhhbmRsZXJzID0ge307XG4gICAgICAgIHRoaXMuc2Vzc2lvbiA9IHt9O1xuICAgICAgICB0aGlzLmlucHV0LmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICB9XG59O1xuXG4vKipcbiAqIGFkZC9yZW1vdmUgdGhlIGNzcyBwcm9wZXJ0aWVzIGFzIGRlZmluZWQgaW4gbWFuYWdlci5vcHRpb25zLmNzc1Byb3BzXG4gKiBAcGFyYW0ge01hbmFnZXJ9IG1hbmFnZXJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gYWRkXG4gKi9cbmZ1bmN0aW9uIHRvZ2dsZUNzc1Byb3BzKG1hbmFnZXIsIGFkZCkge1xuICAgIHZhciBlbGVtZW50ID0gbWFuYWdlci5lbGVtZW50O1xuICAgIGlmICghZWxlbWVudC5zdHlsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBwcm9wO1xuICAgIGVhY2gobWFuYWdlci5vcHRpb25zLmNzc1Byb3BzLCBmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICBwcm9wID0gcHJlZml4ZWQoZWxlbWVudC5zdHlsZSwgbmFtZSk7XG4gICAgICAgIGlmIChhZGQpIHtcbiAgICAgICAgICAgIG1hbmFnZXIub2xkQ3NzUHJvcHNbcHJvcF0gPSBlbGVtZW50LnN0eWxlW3Byb3BdO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wXSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wXSA9IG1hbmFnZXIub2xkQ3NzUHJvcHNbcHJvcF0gfHwgJyc7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIWFkZCkge1xuICAgICAgICBtYW5hZ2VyLm9sZENzc1Byb3BzID0ge307XG4gICAgfVxufVxuXG4vKipcbiAqIHRyaWdnZXIgZG9tIGV2ZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gKi9cbmZ1bmN0aW9uIHRyaWdnZXJEb21FdmVudChldmVudCwgZGF0YSkge1xuICAgIHZhciBnZXN0dXJlRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICBnZXN0dXJlRXZlbnQuaW5pdEV2ZW50KGV2ZW50LCB0cnVlLCB0cnVlKTtcbiAgICBnZXN0dXJlRXZlbnQuZ2VzdHVyZSA9IGRhdGE7XG4gICAgZGF0YS50YXJnZXQuZGlzcGF0Y2hFdmVudChnZXN0dXJlRXZlbnQpO1xufVxuXG5hc3NpZ24oSGFtbWVyLCB7XG4gICAgSU5QVVRfU1RBUlQ6IElOUFVUX1NUQVJULFxuICAgIElOUFVUX01PVkU6IElOUFVUX01PVkUsXG4gICAgSU5QVVRfRU5EOiBJTlBVVF9FTkQsXG4gICAgSU5QVVRfQ0FOQ0VMOiBJTlBVVF9DQU5DRUwsXG5cbiAgICBTVEFURV9QT1NTSUJMRTogU1RBVEVfUE9TU0lCTEUsXG4gICAgU1RBVEVfQkVHQU46IFNUQVRFX0JFR0FOLFxuICAgIFNUQVRFX0NIQU5HRUQ6IFNUQVRFX0NIQU5HRUQsXG4gICAgU1RBVEVfRU5ERUQ6IFNUQVRFX0VOREVELFxuICAgIFNUQVRFX1JFQ09HTklaRUQ6IFNUQVRFX1JFQ09HTklaRUQsXG4gICAgU1RBVEVfQ0FOQ0VMTEVEOiBTVEFURV9DQU5DRUxMRUQsXG4gICAgU1RBVEVfRkFJTEVEOiBTVEFURV9GQUlMRUQsXG5cbiAgICBESVJFQ1RJT05fTk9ORTogRElSRUNUSU9OX05PTkUsXG4gICAgRElSRUNUSU9OX0xFRlQ6IERJUkVDVElPTl9MRUZULFxuICAgIERJUkVDVElPTl9SSUdIVDogRElSRUNUSU9OX1JJR0hULFxuICAgIERJUkVDVElPTl9VUDogRElSRUNUSU9OX1VQLFxuICAgIERJUkVDVElPTl9ET1dOOiBESVJFQ1RJT05fRE9XTixcbiAgICBESVJFQ1RJT05fSE9SSVpPTlRBTDogRElSRUNUSU9OX0hPUklaT05UQUwsXG4gICAgRElSRUNUSU9OX1ZFUlRJQ0FMOiBESVJFQ1RJT05fVkVSVElDQUwsXG4gICAgRElSRUNUSU9OX0FMTDogRElSRUNUSU9OX0FMTCxcblxuICAgIE1hbmFnZXI6IE1hbmFnZXIsXG4gICAgSW5wdXQ6IElucHV0LFxuICAgIFRvdWNoQWN0aW9uOiBUb3VjaEFjdGlvbixcblxuICAgIFRvdWNoSW5wdXQ6IFRvdWNoSW5wdXQsXG4gICAgTW91c2VJbnB1dDogTW91c2VJbnB1dCxcbiAgICBQb2ludGVyRXZlbnRJbnB1dDogUG9pbnRlckV2ZW50SW5wdXQsXG4gICAgVG91Y2hNb3VzZUlucHV0OiBUb3VjaE1vdXNlSW5wdXQsXG4gICAgU2luZ2xlVG91Y2hJbnB1dDogU2luZ2xlVG91Y2hJbnB1dCxcblxuICAgIFJlY29nbml6ZXI6IFJlY29nbml6ZXIsXG4gICAgQXR0clJlY29nbml6ZXI6IEF0dHJSZWNvZ25pemVyLFxuICAgIFRhcDogVGFwUmVjb2duaXplcixcbiAgICBQYW46IFBhblJlY29nbml6ZXIsXG4gICAgU3dpcGU6IFN3aXBlUmVjb2duaXplcixcbiAgICBQaW5jaDogUGluY2hSZWNvZ25pemVyLFxuICAgIFJvdGF0ZTogUm90YXRlUmVjb2duaXplcixcbiAgICBQcmVzczogUHJlc3NSZWNvZ25pemVyLFxuXG4gICAgb246IGFkZEV2ZW50TGlzdGVuZXJzLFxuICAgIG9mZjogcmVtb3ZlRXZlbnRMaXN0ZW5lcnMsXG4gICAgZWFjaDogZWFjaCxcbiAgICBtZXJnZTogbWVyZ2UsXG4gICAgZXh0ZW5kOiBleHRlbmQsXG4gICAgYXNzaWduOiBhc3NpZ24sXG4gICAgaW5oZXJpdDogaW5oZXJpdCxcbiAgICBiaW5kRm46IGJpbmRGbixcbiAgICBwcmVmaXhlZDogcHJlZml4ZWRcbn0pO1xuXG4vLyB0aGlzIHByZXZlbnRzIGVycm9ycyB3aGVuIEhhbW1lciBpcyBsb2FkZWQgaW4gdGhlIHByZXNlbmNlIG9mIGFuIEFNRFxuLy8gIHN0eWxlIGxvYWRlciBidXQgYnkgc2NyaXB0IHRhZywgbm90IGJ5IHRoZSBsb2FkZXIuXG52YXIgZnJlZUdsb2JhbCA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6ICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDoge30pKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG5mcmVlR2xvYmFsLkhhbW1lciA9IEhhbW1lcjtcblxuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEhhbW1lcjtcbiAgICB9KTtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gSGFtbWVyO1xufSBlbHNlIHtcbiAgICB3aW5kb3dbZXhwb3J0TmFtZV0gPSBIYW1tZXI7XG59XG5cbn0pKHdpbmRvdywgZG9jdW1lbnQsICdIYW1tZXInKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2hhbW1lcmpzL2hhbW1lci5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogTXV1cmkgdjAuNS4zXG4gKiBodHRwczovL2dpdGh1Yi5jb20vaGFsdHUvbXV1cmlcbiAqIENvcHlyaWdodCAoYykgMjAxNSwgSGFsdHUgT3lcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cbiAgdmFyIG5hbWVzcGFjZSA9ICdNdXVyaSc7XG4gIHZhciBIYW1tZXI7XG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICB0cnkgeyBIYW1tZXIgPSByZXF1aXJlKCdoYW1tZXJqcycpOyB9IGNhdGNoIChlKSB7fVxuICAgIC8qIGVzbGludC1lbmFibGUgKi9cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkobmFtZXNwYWNlLCBIYW1tZXIpO1xuICB9XG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbJ2hhbW1lcmpzJ10sIGZ1bmN0aW9uIChIYW1tZXIpIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KG5hbWVzcGFjZSwgSGFtbWVyKTtcbiAgICB9KTtcbiAgfVxuICBlbHNlIHtcbiAgICBnbG9iYWxbbmFtZXNwYWNlXSA9IGZhY3RvcnkobmFtZXNwYWNlLCBnbG9iYWwuSGFtbWVyKTtcbiAgfVxuXG59KHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogdGhpcywgZnVuY3Rpb24gKG5hbWVzcGFjZSwgSGFtbWVyLCB1bmRlZmluZWQpIHtcblxuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gR2V0IHJlZmVyZW5jZXMgdG8gYWxsIHRoZSBzdHVmZiB3ZSBhcmUgdXNpbmcgZnJvbSB0aGUgZ2xvYmFsIHNjb3BlLlxuICB2YXIgZ2xvYmFsID0gd2luZG93O1xuICB2YXIgT2JqZWN0ID0gZ2xvYmFsLk9iamVjdDtcbiAgdmFyIEFycmF5ID0gZ2xvYmFsLkFycmF5O1xuICB2YXIgTWF0aCA9IGdsb2JhbC5NYXRoO1xuICB2YXIgRXJyb3IgPSBnbG9iYWwuRXJyb3I7XG4gIHZhciBFbGVtZW50ID0gZ2xvYmFsLkVsZW1lbnQ7XG4gIHZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG4gIHZhciBkb2NFbGVtID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgdmFyIGJvZHkgPSBkb2MuYm9keTtcblxuICAvLyBUeXBlcy5cbiAgdmFyIHR5cGVGdW5jdGlvbiA9ICdmdW5jdGlvbic7XG4gIHZhciB0eXBlU3RyaW5nID0gJ3N0cmluZyc7XG4gIHZhciB0eXBlTnVtYmVyID0gJ251bWJlcic7XG5cbiAgLy8gUmFmIGxvb3AgdGhhdCBjYW4gYmUgdXNlZCB0byBvcmdhbml6ZSBET00gd3JpdGUgYW5kIHJlYWQgb3BlcmF0aW9uc1xuICAvLyBvcHRpbWFsbHkgaW4gdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lLlxuICB2YXIgcmFmTG9vcCA9IGNyZWF0ZVJhZkxvb3AoKTtcblxuICAvLyBSYWYgbG9vcCBxdWV1ZSBuYW1lcy5cbiAgdmFyIHJhZlF1ZXVlTGF5b3V0ID0gJ2xheW91dCc7XG4gIHZhciByYWZRdWV1ZVZpc2liaWxpdHkgPSAndmlzaWJpbGl0eSc7XG4gIHZhciByYWZRdWV1ZU1vdmUgPSAnbW92ZSc7XG4gIHZhciByYWZRdWV1ZVNjcm9sbCA9ICdzY3JvbGwnO1xuXG4gIC8vIERyYWcgc3RhcnQgcHJlZGljYXRlIHN0YXRlcy5cbiAgdmFyIHN0YXJ0UHJlZGljYXRlSW5hY3RpdmUgPSAwO1xuICB2YXIgc3RhcnRQcmVkaWNhdGVQZW5kaW5nID0gMTtcbiAgdmFyIHN0YXJ0UHJlZGljYXRlUmVzb2x2ZWQgPSAyO1xuICB2YXIgc3RhcnRQcmVkaWNhdGVSZWplY3RlZCA9IDM7XG5cbiAgLy8gS2VlcCB0cmFjayBvZiBHcmlkIGluc3RhbmNlcy5cbiAgdmFyIGdyaWRJbnN0YW5jZXMgPSB7fTtcblxuICAvLyBLZWVwIHRyYWNrIG9mIEl0ZW0gaW5zdGFuY2VzLlxuICB2YXIgaXRlbUluc3RhbmNlcyA9IHt9O1xuXG4gIC8vIE5vIG9wZXJhdGlvbiBmdW5jdGlvbi5cbiAgdmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAvLyBVbmlxdWUgaWQgd2hpY2ggaXMgdXNlZCBmb3IgR3JpZCBpbnN0YW5jZXMgYW5kIEl0ZW0gaW5zdGFuY2VzLlxuICAvLyBTaG91bGQgYmUgaW5jcmVtZW50ZWQgZXZlcnkgdGltZSB3aGVuIHVzZWQuXG4gIHZhciB1dWlkID0gMDtcblxuICAvLyBHZXQgdGhlIHN1cHBvcnRlZCBlbGVtZW50Lm1hdGNoZXMoKS5cbiAgdmFyIGVsZW1lbnRNYXRjaGVzID0gZ2V0U3VwcG9ydGVkRWxlbWVudE1hdGNoZXMoKTtcblxuICAvLyBHZXQgdGhlIHN1cHBvcnRlZCB0cmFuc2Zvcm0gc3R5bGUgcHJvcGVydHkuXG4gIHZhciB0cmFuc2Zvcm0gPSBnZXRTdXBwb3J0ZWRTdHlsZSgndHJhbnNmb3JtJyk7XG5cbiAgLy8gVGVzdCBpZiB0cmFuc2Zvcm1lZCBlbGVtZW50cyBsZWFrIGZpeGVkIGVsZW1lbnRzLlxuICB2YXIgdHJhbnNmb3JtTGVha3NGaXhlZCA9IGJvZHkgPyBkb2VzVHJhbnNmb3JtTGVha0ZpeGVkKCkgOiBudWxsO1xuXG4gIC8vIEV2ZW50IG5hbWVzLlxuICB2YXIgZXZTeW5jaHJvbml6ZSA9ICdzeW5jaHJvbml6ZSc7XG4gIHZhciBldkxheW91dFN0YXJ0ID0gJ2xheW91dFN0YXJ0JztcbiAgdmFyIGV2TGF5b3V0RW5kID0gJ2xheW91dEVuZCc7XG4gIHZhciBldkFkZCA9ICdhZGQnO1xuICB2YXIgZXZSZW1vdmUgPSAncmVtb3ZlJztcbiAgdmFyIGV2U2hvd1N0YXJ0ID0gJ3Nob3dTdGFydCc7XG4gIHZhciBldlNob3dFbmQgPSAnc2hvd0VuZCc7XG4gIHZhciBldkhpZGVTdGFydCA9ICdoaWRlU3RhcnQnO1xuICB2YXIgZXZIaWRlRW5kID0gJ2hpZGVFbmQnO1xuICB2YXIgZXZGaWx0ZXIgPSAnZmlsdGVyJztcbiAgdmFyIGV2U29ydCA9ICdzb3J0JztcbiAgdmFyIGV2TW92ZSA9ICdtb3ZlJztcbiAgdmFyIGV2U2VuZCA9ICdzZW5kJztcbiAgdmFyIGV2QmVmb3JlU2VuZCA9ICdiZWZvcmVTZW5kJztcbiAgdmFyIGV2UmVjZWl2ZSA9ICdyZWNlaXZlJztcbiAgdmFyIGV2QmVmb3JlUmVjZWl2ZSA9ICdiZWZvcmVSZWNlaXZlJztcbiAgdmFyIGV2RHJhZ0luaXQgPSAnZHJhZ0luaXQnO1xuICB2YXIgZXZEcmFnU3RhcnQgPSAnZHJhZ1N0YXJ0JztcbiAgdmFyIGV2RHJhZ01vdmUgPSAnZHJhZ01vdmUnO1xuICB2YXIgZXZEcmFnU2Nyb2xsID0gJ2RyYWdTY3JvbGwnO1xuICB2YXIgZXZEcmFnRW5kID0gJ2RyYWdFbmQnO1xuICB2YXIgZXZEcmFnUmVsZWFzZVN0YXJ0ID0gJ2RyYWdSZWxlYXNlU3RhcnQnO1xuICB2YXIgZXZEcmFnUmVsZWFzZUVuZCA9ICdkcmFnUmVsZWFzZUVuZCc7XG4gIHZhciBldkRlc3Ryb3kgPSAnZGVzdHJveSc7XG5cbiAgLyoqXG4gICAqIEdyaWRcbiAgICogKioqKlxuICAgKi9cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBHcmlkIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjbGFzc1xuICAgKiBAcGFyYW0geyhIVE1MRWxlbWVudHxTdHJpbmcpfSBlbGVtZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICogQHBhcmFtIHsoP0hUTUxFbGVtZW50W118Tm9kZUxpc3R8U3RyaW5nKX0gW29wdGlvbnMuaXRlbXNdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5zaG93RHVyYXRpb249MzAwXVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuc2hvd0Vhc2luZz1cImVhc2VcIl1cbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLnZpc2libGVTdHlsZXNdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5oaWRlRHVyYXRpb249MzAwXVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuaGlkZUVhc2luZz1cImVhc2VcIl1cbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLmhpZGRlblN0eWxlc11cbiAgICogQHBhcmFtIHsoRnVuY3Rpb258T2JqZWN0KX0gW29wdGlvbnMubGF5b3V0XVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmxheW91dC5maWxsR2Fwcz1mYWxzZV1cbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5sYXlvdXQuaG9yaXpvbnRhbD1mYWxzZV1cbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5sYXlvdXQuYWxpZ25SaWdodD1mYWxzZV1cbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5sYXlvdXQuYWxpZ25Cb3R0b209ZmFsc2VdXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubGF5b3V0LnJvdW5kaW5nPXRydWVdXG4gICAqIEBwYXJhbSB7KEJvb2xlYW58TnVtYmVyKX0gW29wdGlvbnMubGF5b3V0T25SZXNpemU9MTAwXVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmxheW91dE9uSW5pdD10cnVlXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubGF5b3V0RHVyYXRpb249MzAwXVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMubGF5b3V0RWFzaW5nPVwiZWFzZVwiXVxuICAgKiBAcGFyYW0gez9PYmplY3R9IFtvcHRpb25zLnNvcnREYXRhPW51bGxdXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZHJhZ0VuYWJsZWQ9ZmFsc2VdXG4gICAqIEBwYXJhbSB7P0h0bWxFbGVtZW50fSBbb3B0aW9ucy5kcmFnQ29udGFpbmVyPW51bGxdXG4gICAqIEBwYXJhbSB7P0Z1bmN0aW9ufSBbb3B0aW9ucy5kcmFnU3RhcnRQcmVkaWNhdGVdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kcmFnU3RhcnRQcmVkaWNhdGUuZGlzdGFuY2U9MF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmRyYWdTdGFydFByZWRpY2F0ZS5kZWxheT0wXVxuICAgKiBAcGFyYW0geyhCb29sZWFufFN0cmluZyl9IFtvcHRpb25zLmRyYWdTdGFydFByZWRpY2F0ZS5oYW5kbGU9ZmFsc2VdXG4gICAqIEBwYXJhbSB7P1N0cmluZ30gW29wdGlvbnMuZHJhZ0F4aXNdXG4gICAqIEBwYXJhbSB7KEJvb2xlYW58RnVuY3Rpb24pfSBbb3B0aW9ucy5kcmFnU29ydD10cnVlXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZHJhZ1NvcnRJbnRlcnZhbD0xMDBdXG4gICAqIEBwYXJhbSB7KEZ1bmN0aW9ufE9iamVjdCl9IFtvcHRpb25zLmRyYWdTb3J0UHJlZGljYXRlXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZHJhZ1NvcnRQcmVkaWNhdGUudGhyZXNob2xkPTUwXVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuZHJhZ1NvcnRQcmVkaWNhdGUuYWN0aW9uPVwibW92ZVwiXVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuZHJhZ1NvcnRQcmVkaWNhdGUuZ2Fwcz10cnVlXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZHJhZ1JlbGVhc2VEdXJhdGlvbj0zMDBdXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5kcmFnUmVsZWFzZUVhc2luZz1cImVhc2VcIl1cbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLmRyYWdIYW1tZXJTZXR0aW5ncz17dG91Y2hBY3Rpb246IFwibm9uZVwifV1cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmNvbnRhaW5lckNsYXNzPVwibXV1cmlcIl1cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLml0ZW1DbGFzcz1cIm11dXJpLWl0ZW1cIl1cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLml0ZW1WaXNpYmxlQ2xhc3M9XCJtdXVyaS1pdGVtLXZpc2libGVcIl1cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLml0ZW1IaWRkZW5DbGFzcz1cIm11dXJpLWl0ZW0taGlkZGVuXCJdXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5pdGVtUG9zaXRpb25pbmdDbGFzcz1cIm11dXJpLWl0ZW0tcG9zaXRpb25pbmdcIl1cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLml0ZW1EcmFnZ2luZ0NsYXNzPVwibXV1cmktaXRlbS1kcmFnZ2luZ1wiXVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuaXRlbVJlbGVhc2luZ0NsYXNzPVwibXV1cmktaXRlbS1yZWxlYXNpbmdcIl1cbiAgICovXG4gIGZ1bmN0aW9uIEdyaWQoZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuICAgIHZhciBzZXR0aW5ncztcbiAgICB2YXIgaXRlbXM7XG4gICAgdmFyIGxheW91dE9uUmVzaXplO1xuXG4gICAgLy8gTXV1cmkgY2FuIGJlIGxvYWRlZCBpbnNpZGUgdGhlIGhlYWQgdGFnIGFsc28sIGJ1dCBpbiB0aGF0IGNhc2UgTXV1cmkgY2FuXG4gICAgLy8gbm90IGNhY2hlIGJvZHkgZWxlbWVudCBhbmQgcnVuIHRoZSBpbml0aWFsIERPTSB0ZXN0cy4gU28sIGlmIHdlIGRldGVjdFxuICAgIC8vIHRoYXQgYm9keSBlbGVtZW50IGNvdWxkIG5vdCBiZSBmZXRjaGVkIG9uIGluaXQgd2UgZG8gaXQgaGVyZSBvbmNlIGFuZFxuICAgIC8vIGFsc28gcnVuIHRoZSBET00gdGVzdHMuIElmIHRoZSBHcmlkIGlzIGluc3RhbnRpYXRlZCBiZWZvcmUgYm9keSBpcyByZWFkeVxuICAgIC8vIHlvdSBhcmUgZG9pbmcgaXQgd3JvbmcgOylcbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgdHJhbnNmb3JtTGVha3NGaXhlZCA9IGRvZXNUcmFuc2Zvcm1MZWFrRml4ZWQoKTtcbiAgICB9XG5cbiAgICAvLyBBbGxvdyBwYXNzaW5nIGVsZW1lbnQgYXMgc2VsZWN0b3Igc3RyaW5nLiBTdG9yZSBlbGVtZW50IGZvciBpbnN0YW5jZS5cbiAgICBlbGVtZW50ID0gaW5zdC5fZWxlbWVudCA9IHR5cGVvZiBlbGVtZW50ID09PSB0eXBlU3RyaW5nID8gZG9jLnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCkgOiBlbGVtZW50O1xuXG4gICAgLy8gVGhyb3cgYW4gZXJyb3IgaWYgdGhlIGNvbnRhaW5lciBlbGVtZW50IGlzIG5vdCBib2R5IGVsZW1lbnQgb3IgZG9lcyBub3RcbiAgICAvLyBleGlzdCB3aXRoaW4gdGhlIGJvZHkgZWxlbWVudC5cbiAgICBpZiAoIWJvZHkuY29udGFpbnMoZWxlbWVudCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ29udGFpbmVyIGVsZW1lbnQgbXVzdCBiZSBhbiBleGlzdGluZyBET00gZWxlbWVudCcpO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSBpbnN0YW5jZSBzZXR0aW5ncyBieSBtZXJnaW5nIHRoZSBvcHRpb25zIHdpdGggZGVmYXVsdCBvcHRpb25zLlxuICAgIHNldHRpbmdzID0gaW5zdC5fc2V0dGluZ3MgPSBtZXJnZVNldHRpbmdzKEdyaWQuZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgLy8gU2FuaXRpemUgZHJhZ1NvcnQgc2V0dGluZy5cbiAgICBpZiAodHlwZW9mIHNldHRpbmdzLmRyYWdTb3J0ICE9PSB0eXBlRnVuY3Rpb24pIHtcbiAgICAgIHNldHRpbmdzLmRyYWdTb3J0ID0gISFzZXR0aW5ncy5kcmFnU29ydDtcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgaW5zdGFuY2UgaWQgYW5kIHN0b3JlIGl0IHRvIHRoZSBncmlkIGluc3RhbmNlcyBjb2xsZWN0aW9uLlxuICAgIGdyaWRJbnN0YW5jZXNbaW5zdC5faWQgPSArK3V1aWRdID0gaW5zdDtcblxuICAgIC8vIERlc3Ryb3llZCBmbGFnLlxuICAgIGluc3QuX2lzRGVzdHJveWVkID0gZmFsc2U7XG5cbiAgICAvLyBSZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnRseSB1c2VkIExheW91dCBpbnN0YW5jZS5cbiAgICBpbnN0Ll9sYXlvdXQgPSBudWxsO1xuXG4gICAgLy8gQ3JlYXRlIHByaXZhdGUgRW1pdHRlciBpbnN0YW5jZS5cbiAgICBpbnN0Ll9lbWl0dGVyID0gbmV3IEdyaWQuRW1pdHRlcigpO1xuXG4gICAgLy8gU2V0dXAgZ3JpZCdzIHNob3cvaGlkZSBhbmltYXRpb24gaGFuZGxlciBmb3IgaXRlbXMuXG4gICAgaW5zdC5faXRlbVNob3dIYW5kbGVyID0gZ2V0SXRlbVZpc2liaWxpdHlIYW5kbGVyKCdzaG93Jywgc2V0dGluZ3MpO1xuICAgIGluc3QuX2l0ZW1IaWRlSGFuZGxlciA9IGdldEl0ZW1WaXNpYmlsaXR5SGFuZGxlcignaGlkZScsIHNldHRpbmdzKTtcblxuICAgIC8vIEFkZCBjb250YWluZXIgZWxlbWVudCdzIGNsYXNzIG5hbWUuXG4gICAgYWRkQ2xhc3MoZWxlbWVudCwgc2V0dGluZ3MuY29udGFpbmVyQ2xhc3MpO1xuXG4gICAgLy8gQ3JlYXRlIGluaXRpYWwgaXRlbXMuXG4gICAgaW5zdC5faXRlbXMgPSBbXTtcbiAgICBpdGVtcyA9IHNldHRpbmdzLml0ZW1zO1xuICAgIGlmICh0eXBlb2YgaXRlbXMgPT09IHR5cGVTdHJpbmcpIHtcbiAgICAgIG5vZGVMaXN0VG9BcnJheShpbnN0Ll9lbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtRWxlbWVudCkge1xuICAgICAgICBpZiAoaXRlbXMgPT09ICcqJyB8fCBlbGVtZW50TWF0Y2hlcyhpdGVtRWxlbWVudCwgaXRlbXMpKSB7XG4gICAgICAgICAgaW5zdC5faXRlbXMucHVzaChuZXcgR3JpZC5JdGVtKGluc3QsIGl0ZW1FbGVtZW50KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGl0ZW1zKSB8fCBpc05vZGVMaXN0KGl0ZW1zKSkge1xuICAgICAgaW5zdC5faXRlbXMgPSBub2RlTGlzdFRvQXJyYXkoaXRlbXMpLm1hcChmdW5jdGlvbiAoaXRlbUVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBHcmlkLkl0ZW0oaW5zdCwgaXRlbUVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gU2FuaXRpemUgbGF5b3V0T25SZXNpemUgb3B0aW9uIGFuZCBiaW5kIGRlYm91bmNlZCByZXNpemUgaGFuZGxlciBpZiB0aGVcbiAgICAvLyBsYXlvdXRPblJlc2l6ZSBvcHRpb24gYSB2YWxpZCBudW1iZXIuXG4gICAgbGF5b3V0T25SZXNpemUgPSBzZXR0aW5ncy5sYXlvdXRPblJlc2l6ZTtcbiAgICBsYXlvdXRPblJlc2l6ZSA9IGxheW91dE9uUmVzaXplID09PSB0cnVlID8gMCA6IHR5cGVvZiBsYXlvdXRPblJlc2l6ZSA9PT0gdHlwZU51bWJlciA/IGxheW91dE9uUmVzaXplIDogLTE7XG4gICAgaWYgKGxheW91dE9uUmVzaXplID49IDApIHtcbiAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBpbnN0Ll9yZXNpemVIYW5kbGVyID0gZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICBpbnN0LnJlZnJlc2hJdGVtcygpLmxheW91dCgpO1xuICAgICAgfSwgbGF5b3V0T25SZXNpemUpKTtcbiAgICB9XG5cbiAgICAvLyBMYXlvdXQgb24gaW5pdCBpZiBuZWNlc3NhcnkuXG4gICAgaWYgKHNldHRpbmdzLmxheW91dE9uSW5pdCkge1xuICAgICAgaW5zdC5sYXlvdXQodHJ1ZSk7XG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICogR3JpZCAtIFB1YmxpYyBwcm9wZXJ0aWVzXG4gICAqICoqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKi9cblxuICAvKipcbiAgICogQHNlZSBJdGVtXG4gICAqL1xuICBHcmlkLkl0ZW0gPSBJdGVtO1xuXG4gIC8qKlxuICAgKiBAc2VlIEl0ZW1EcmFnXG4gICAqL1xuICBHcmlkLkl0ZW1EcmFnID0gSXRlbURyYWc7XG5cbiAgLyoqXG4gICAqIEBzZWUgSXRlbVJlbGVhc2VcbiAgICovXG4gIEdyaWQuSXRlbVJlbGVhc2UgPSBJdGVtUmVsZWFzZTtcblxuICAvKipcbiAgICogQHNlZSBJdGVtTWlncmF0ZVxuICAgKi9cbiAgR3JpZC5JdGVtTWlncmF0ZSA9IEl0ZW1NaWdyYXRlO1xuXG4gIC8qKlxuICAgKiBAc2VlIEl0ZW1BbmltYXRlXG4gICAqL1xuICBHcmlkLkl0ZW1BbmltYXRlID0gSXRlbUFuaW1hdGU7XG5cbiAgLyoqXG4gICAqIEBzZWUgTGF5b3V0XG4gICAqL1xuICBHcmlkLkxheW91dCA9IExheW91dDtcblxuICAvKipcbiAgICogQHNlZSBFbWl0dGVyXG4gICAqL1xuICBHcmlkLkVtaXR0ZXIgPSBFbWl0dGVyO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IG9wdGlvbnMgZm9yIEdyaWQgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEdyaWRcbiAgICovXG4gIEdyaWQuZGVmYXVsdE9wdGlvbnMgPSB7XG5cbiAgICAvLyBJdGVtIGVsZW1lbnRzXG4gICAgaXRlbXM6ICcqJyxcblxuICAgIC8vIERlZmF1bHQgc2hvdyBhbmltYXRpb25cbiAgICBzaG93RHVyYXRpb246IDMwMCxcbiAgICBzaG93RWFzaW5nOiAnZWFzZScsXG5cbiAgICAvLyBEZWZhdWx0IGhpZGUgYW5pbWF0aW9uXG4gICAgaGlkZUR1cmF0aW9uOiAzMDAsXG4gICAgaGlkZUVhc2luZzogJ2Vhc2UnLFxuXG4gICAgLy8gSXRlbSdzIHZpc2libGUvaGlkZGVuIHN0YXRlIHN0eWxlc1xuICAgIHZpc2libGVTdHlsZXM6IHtcbiAgICAgIG9wYWNpdHk6ICcxJyxcbiAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDEpJ1xuICAgIH0sXG4gICAgaGlkZGVuU3R5bGVzOiB7XG4gICAgICBvcGFjaXR5OiAnMCcsXG4gICAgICB0cmFuc2Zvcm06ICdzY2FsZSgwLjUpJ1xuICAgIH0sXG5cbiAgICAvLyBMYXlvdXRcbiAgICBsYXlvdXQ6IHtcbiAgICAgIGZpbGxHYXBzOiBmYWxzZSxcbiAgICAgIGhvcml6b250YWw6IGZhbHNlLFxuICAgICAgYWxpZ25SaWdodDogZmFsc2UsXG4gICAgICBhbGlnbkJvdHRvbTogZmFsc2UsXG4gICAgICByb3VuZGluZzogdHJ1ZVxuICAgIH0sXG4gICAgbGF5b3V0T25SZXNpemU6IDEwMCxcbiAgICBsYXlvdXRPbkluaXQ6IHRydWUsXG4gICAgbGF5b3V0RHVyYXRpb246IDMwMCxcbiAgICBsYXlvdXRFYXNpbmc6ICdlYXNlJyxcblxuICAgIC8vIFNvcnRpbmdcbiAgICBzb3J0RGF0YTogbnVsbCxcblxuICAgIC8vIERyYWcgJiBEcm9wXG4gICAgZHJhZ0VuYWJsZWQ6IGZhbHNlLFxuICAgIGRyYWdDb250YWluZXI6IG51bGwsXG4gICAgZHJhZ1N0YXJ0UHJlZGljYXRlOiB7XG4gICAgICBkaXN0YW5jZTogMCxcbiAgICAgIGRlbGF5OiAwLFxuICAgICAgaGFuZGxlOiBmYWxzZVxuICAgIH0sXG4gICAgZHJhZ0F4aXM6IG51bGwsXG4gICAgZHJhZ1NvcnQ6IHRydWUsXG4gICAgZHJhZ1NvcnRJbnRlcnZhbDogMTAwLFxuICAgIGRyYWdTb3J0UHJlZGljYXRlOiB7XG4gICAgICB0aHJlc2hvbGQ6IDUwLFxuICAgICAgYWN0aW9uOiAnbW92ZSdcbiAgICB9LFxuICAgIGRyYWdSZWxlYXNlRHVyYXRpb246IDMwMCxcbiAgICBkcmFnUmVsZWFzZUVhc2luZzogJ2Vhc2UnLFxuICAgIGRyYWdIYW1tZXJTZXR0aW5nczoge1xuICAgICAgdG91Y2hBY3Rpb246ICdub25lJ1xuICAgIH0sXG5cbiAgICAvLyBDbGFzc25hbWVzXG4gICAgY29udGFpbmVyQ2xhc3M6ICdtdXVyaScsXG4gICAgaXRlbUNsYXNzOiAnbXV1cmktaXRlbScsXG4gICAgaXRlbVZpc2libGVDbGFzczogJ211dXJpLWl0ZW0tc2hvd24nLFxuICAgIGl0ZW1IaWRkZW5DbGFzczogJ211dXJpLWl0ZW0taGlkZGVuJyxcbiAgICBpdGVtUG9zaXRpb25pbmdDbGFzczogJ211dXJpLWl0ZW0tcG9zaXRpb25pbmcnLFxuICAgIGl0ZW1EcmFnZ2luZ0NsYXNzOiAnbXV1cmktaXRlbS1kcmFnZ2luZycsXG4gICAgaXRlbVJlbGVhc2luZ0NsYXNzOiAnbXV1cmktaXRlbS1yZWxlYXNpbmcnXG5cbiAgfTtcblxuICAvKipcbiAgICogR3JpZCAtIFByaXZhdGUgcHJvcGVydGllc1xuICAgKiAqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqL1xuXG4gIEdyaWQuX21heFJhZkJhdGNoU2l6ZSA9IDEwMDtcblxuICAvKipcbiAgICogR3JpZCAtIFB1YmxpYyBwcm90b3R5cGUgbWV0aG9kc1xuICAgKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqL1xuXG4gIC8qKlxuICAgKiBCaW5kIGFuIGV2ZW50IGxpc3RlbmVyLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBHcmlkLnByb3RvdHlwZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAgICogQHJldHVybnMge0dyaWR9XG4gICAqL1xuICBHcmlkLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuICAgIGlmICghaW5zdC5faXNEZXN0cm95ZWQpIHtcbiAgICAgIGluc3QuX2VtaXR0ZXIub24oZXZlbnQsIGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBCaW5kIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQgaXMgdHJpZ2dlcmVkIG9ubHkgb25jZS5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgR3JpZC5wcm90b3R5cGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gICAqIEByZXR1cm5zIHtHcmlkfVxuICAgKi9cbiAgR3JpZC5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuICAgIGlmICghaW5zdC5faXNEZXN0cm95ZWQpIHtcbiAgICAgIGluc3QuX2VtaXR0ZXIub25jZShldmVudCwgbGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBpbnN0O1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIFVuYmluZCBhbiBldmVudCBsaXN0ZW5lci5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgR3JpZC5wcm90b3R5cGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gICAqIEByZXR1cm5zIHtHcmlkfVxuICAgKi9cbiAgR3JpZC5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGV2ZW50LCBsaXN0ZW5lcikge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuXG4gICAgaWYgKCFpbnN0Ll9pc0Rlc3Ryb3llZCkge1xuICAgICAgaW5zdC5fZW1pdHRlci5vZmYoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNvbnRhaW5lciBlbGVtZW50LlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBHcmlkLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBHcmlkLnByb3RvdHlwZS5nZXRFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XG5cbiAgfTtcblxuICAvKipcbiAgICogR2V0IGFsbCBpdGVtcy4gT3B0aW9uYWxseSB5b3UgY2FuIHByb3ZpZGUgc3BlY2lmaWMgdGFyZ2V0cyAoZWxlbWVudHMgYW5kXG4gICAqIGluZGljZXMpIGFuZCBmaWx0ZXIgdGhlIHJlc3VsdHMgYmFzZWQgb24gdGhlIHN0YXRlIG9mIHRoZSBpdGVtcy4gTm90ZSB0aGF0XG4gICAqIHRoZSByZXR1cm5lZCBhcnJheSBpcyBub3QgdGhlIHNhbWUgb2JqZWN0IHVzZWQgYnkgdGhlIGluc3RhbmNlIHNvIG1vZGlmeWluZ1xuICAgKiBpdCB3aWxsIG5vdCBhZmZlY3QgaW5zdGFuY2UncyBpdGVtcy4gQWxsIGl0ZW1zIHRoYXQgYXJlIG5vdCBmb3VuZCBhcmVcbiAgICogb21pdHRlZCBmcm9tIHRoZSByZXR1cm5lZCBhcnJheS5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgR3JpZC5wcm90b3R5cGVcbiAgICogQHBhcmFtIHtHcmlkTXVsdGlJdGVtUXVlcnl9IFt0YXJnZXRzXVxuICAgKiBAcGFyYW0ge0dyaWRJdGVtU3RhdGV9IFtzdGF0ZV1cbiAgICogQHJldHVybnMge0l0ZW1bXX1cbiAgICovXG4gIEdyaWQucHJvdG90eXBlLmdldEl0ZW1zID0gZnVuY3Rpb24gKHRhcmdldHMsIHN0YXRlKSB7XG5cbiAgICB2YXIgaW5zdCA9IHRoaXM7XG5cbiAgICAvLyBSZXR1cm4gYW4gZW1wdHkgYXJyYXkgaW1tZWRpYXRlbHkgaWYgdGhlIGluc3RhbmNlIGlzIGRlc3Ryb3llZC5cbiAgICBpZiAoaW5zdC5faXNEZXN0cm95ZWQpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICB2YXIgaGFzVGFyZ2V0cyA9IHRhcmdldHMgPT09IDAgfHwgKHRhcmdldHMgJiYgdHlwZW9mIHRhcmdldHMgIT09IHR5cGVTdHJpbmcpO1xuICAgIHZhciB0YXJnZXRJdGVtcyA9ICFoYXNUYXJnZXRzID8gbnVsbCA6IGlzTm9kZUxpc3QodGFyZ2V0cykgPyBub2RlTGlzdFRvQXJyYXkodGFyZ2V0cykgOiBbXS5jb25jYXQodGFyZ2V0cyk7XG4gICAgdmFyIHRhcmdldFN0YXRlID0gIWhhc1RhcmdldHMgPyB0YXJnZXRzIDogc3RhdGU7XG4gICAgdmFyIHJldCA9IFtdO1xuICAgIHZhciBpdGVtO1xuICAgIHZhciBpO1xuXG4gICAgLy8gU2FuaXRpemUgdGFyZ2V0IHN0YXRlLlxuICAgIHRhcmdldFN0YXRlID0gdHlwZW9mIHRhcmdldFN0YXRlID09PSB0eXBlU3RyaW5nID8gdGFyZ2V0U3RhdGUgOiBudWxsO1xuXG4gICAgLy8gSWYgdGFyZ2V0IHN0YXRlIG9yIHRhcmdldCBpdGVtcyBhcmUgZGVmaW5lZCByZXR1cm4gZmlsdGVyZWQgcmVzdWx0cy5cbiAgICBpZiAodGFyZ2V0U3RhdGUgfHwgdGFyZ2V0SXRlbXMpIHtcbiAgICAgIHRhcmdldEl0ZW1zID0gdGFyZ2V0SXRlbXMgfHwgaW5zdC5faXRlbXM7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdGFyZ2V0SXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlbSA9IGhhc1RhcmdldHMgPyBpbnN0Ll9nZXRJdGVtKHRhcmdldEl0ZW1zW2ldKSA6IHRhcmdldEl0ZW1zW2ldO1xuICAgICAgICBpZiAoaXRlbSAmJiAoIXRhcmdldFN0YXRlIHx8IGlzSXRlbUluU3RhdGUoaXRlbSwgdGFyZ2V0U3RhdGUpKSkge1xuICAgICAgICAgIHJldC5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIC8vIE90aGVyd2lzZSByZXR1cm4gYWxsIGl0ZW1zLlxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIHJldC5jb25jYXQoaW5zdC5faXRlbXMpO1xuICAgIH1cblxuICB9O1xuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGNhY2hlZCBkaW1lbnNpb25zIG9mIHRoZSBpbnN0YW5jZSdzIGl0ZW1zLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBHcmlkLnByb3RvdHlwZVxuICAgKiBAcGFyYW0geyhHcmlkTXVsdGlJdGVtUXVlcnl8R3JpZEl0ZW1TdGF0ZSl9IFtpdGVtc11cbiAgICogQHJldHVybnMge0dyaWR9XG4gICAqL1xuICBHcmlkLnByb3RvdHlwZS5yZWZyZXNoSXRlbXMgPSBmdW5jdGlvbiAoaXRlbXMpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuICAgIGlmIChpbnN0Ll9pc0Rlc3Ryb3llZCkge1xuICAgICAgcmV0dXJuIGluc3Q7XG4gICAgfVxuXG4gICAgdmFyIHRhcmdldEl0ZW1zID0gaW5zdC5nZXRJdGVtcyhpdGVtcyB8fCAnYWN0aXZlJyk7XG4gICAgdmFyIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgdGFyZ2V0SXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRhcmdldEl0ZW1zW2ldLl9yZWZyZXNoRGltZW5zaW9ucygpO1xuICAgIH1cblxuICAgIHJldHVybiBpbnN0O1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgc29ydCBkYXRhIG9mIHRoZSBpbnN0YW5jZSdzIGl0ZW1zLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBHcmlkLnByb3RvdHlwZVxuICAgKiBAcGFyYW0geyhHcmlkTXVsdGlJdGVtUXVlcnl8R3JpZEl0ZW1TdGF0ZSl9IFtpdGVtc11cbiAgICogQHJldHVybnMge0dyaWR9XG4gICAqL1xuICBHcmlkLnByb3RvdHlwZS5yZWZyZXNoU29ydERhdGEgPSBmdW5jdGlvbiAoaXRlbXMpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuICAgIGlmIChpbnN0Ll9pc0Rlc3Ryb3llZCkge1xuICAgICAgcmV0dXJuIGluc3Q7XG4gICAgfVxuXG4gICAgdmFyIHRhcmdldEl0ZW1zID0gaW5zdC5nZXRJdGVtcyhpdGVtcyk7XG4gICAgdmFyIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgdGFyZ2V0SXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRhcmdldEl0ZW1zW2ldLl9yZWZyZXNoU29ydERhdGEoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBTeW5jaHJvbml6ZSB0aGUgaXRlbSBlbGVtZW50cyB0byBtYXRjaCB0aGUgb3JkZXIgb2YgdGhlIGl0ZW1zIGluIHRoZSBET00uXG4gICAqIFRoaXMgY29tZXMgaGFuZHkgaWYgeW91IG5lZWQgdG8ga2VlcCB0aGUgRE9NIHN0cnVjdHVyZSBtYXRjaGVkIHdpdGggdGhlXG4gICAqIG9yZGVyIG9mIHRoZSBpdGVtcy4gTm90ZSB0aGF0IGlmIGFuIGl0ZW0ncyBlbGVtZW50IGlzIG5vdCBjdXJyZW50bHkgYSBjaGlsZFxuICAgKiBvZiB0aGUgY29udGFpbmVyIGVsZW1lbnQgKGlmIGl0IGlzIGRyYWdnZWQgZm9yIGV4YW1wbGUpIGl0IGlzIGlnbm9yZWQgYW5kXG4gICAqIGxlZnQgdW50b3VjaGVkLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBHcmlkLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7R3JpZH1cbiAgICovXG4gIEdyaWQucHJvdG90eXBlLnN5bmNocm9uaXplID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuXG4gICAgaWYgKGluc3QuX2lzRGVzdHJveWVkKSB7XG4gICAgICByZXR1cm4gaW5zdDtcbiAgICB9XG5cbiAgICB2YXIgY29udGFpbmVyID0gaW5zdC5fZWxlbWVudDtcbiAgICB2YXIgaXRlbXMgPSBpbnN0Ll9pdGVtcztcbiAgICB2YXIgZnJhZ21lbnQ7XG4gICAgdmFyIGVsZW1lbnQ7XG4gICAgdmFyIGk7XG5cbiAgICAvLyBBcHBlbmQgYWxsIGVsZW1lbnRzIGluIG9yZGVyIHRvIHRoZSBjb250YWluZXIgZWxlbWVudC5cbiAgICBpZiAoaXRlbXMubGVuZ3RoKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZWxlbWVudCA9IGl0ZW1zW2ldLl9lbGVtZW50O1xuICAgICAgICBpZiAoZWxlbWVudC5wYXJlbnROb2RlID09PSBjb250YWluZXIpIHtcbiAgICAgICAgICBmcmFnbWVudCA9IGZyYWdtZW50IHx8IGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmcmFnbWVudCkge1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEVtaXQgc3luY2hyb25pemUgZXZlbnQuXG4gICAgaW5zdC5fZW1pdChldlN5bmNocm9uaXplKTtcblxuICAgIHJldHVybiBpbnN0O1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSBhbmQgYXBwbHkgaXRlbSBwb3NpdGlvbnMuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEdyaWQucHJvdG90eXBlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2luc3RhbnQ9ZmFsc2VdXG4gICAqIEBwYXJhbSB7TGF5b3V0Q2FsbGJhY2t9IFtvbkZpbmlzaF1cbiAgICogQHJldHVybnMge0dyaWR9XG4gICAqL1xuICBHcmlkLnByb3RvdHlwZS5sYXlvdXQgPSBmdW5jdGlvbiAoaW5zdGFudCwgb25GaW5pc2gpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuICAgIGlmIChpbnN0Ll9pc0Rlc3Ryb3llZCkge1xuICAgICAgcmV0dXJuIGluc3Q7XG4gICAgfVxuXG4gICAgdmFyIGNhbGxiYWNrID0gdHlwZW9mIGluc3RhbnQgPT09IHR5cGVGdW5jdGlvbiA/IGluc3RhbnQgOiBvbkZpbmlzaDtcbiAgICB2YXIgaXNJbnN0YW50ID0gaW5zdGFudCA9PT0gdHJ1ZTtcbiAgICB2YXIgaXRlbXMgPSBpbnN0LmdldEl0ZW1zKCdhY3RpdmUnKTtcbiAgICB2YXIgbGF5b3V0ID0gaW5zdC5fbGF5b3V0ID0gbmV3IEdyaWQuTGF5b3V0KGluc3QsIGl0ZW1zKTtcbiAgICB2YXIgY291bnRlciA9IGl0ZW1zLmxlbmd0aDtcbiAgICB2YXIgaXNCb3JkZXJCb3g7XG4gICAgdmFyIGNvbnRhaW5lclN0eWxlcztcbiAgICB2YXIgaXRlbTtcbiAgICB2YXIgcG9zaXRpb247XG4gICAgdmFyIGk7XG5cbiAgICAvLyBUaGUgZmluaXNoIGZ1bmN0aW9uLCB3aGljaCB3aWxsIGJlIHVzZWQgZm9yIGNoZWNraW5nIGlmIGFsbCB0aGUgaXRlbXNcbiAgICAvLyBoYXZlIGxhaWQgb3V0IHlldC4gQWZ0ZXIgYWxsIGl0ZW1zIGhhdmUgZmluaXNoZWQgdGhlaXIgYW5pbWF0aW9ucyBjYWxsXG4gICAgLy8gY2FsbGJhY2sgYW5kIGVtaXQgbGF5b3V0RW5kIGV2ZW50LiBPbmx5IGVtaXQgbGF5b3V0RW5kIGV2ZW50IGlmIHRoZXJlXG4gICAgLy8gaGFzbid0IGJlZW4gYSBuZXcgbGF5b3V0IGNhbGwgZHVyaW5nIHRoaXMgbGF5b3V0LlxuICAgIGZ1bmN0aW9uIHRyeUZpbmlzaCgpIHtcbiAgICAgIGlmICgtLWNvdW50ZXIgPD0gMCkge1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSB0eXBlRnVuY3Rpb24pIHtcbiAgICAgICAgICBjYWxsYmFjayhpbnN0Ll9sYXlvdXQgIT09IGxheW91dCwgaXRlbXMuY29uY2F0KCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnN0Ll9sYXlvdXQgPT09IGxheW91dCkge1xuICAgICAgICAgIGluc3QuX2VtaXQoZXZMYXlvdXRFbmQsIGl0ZW1zLmNvbmNhdCgpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIGdyaWQncyB3aWR0aCBvciBoZWlnaHQgd2FzIG1vZGlmaWVkLCB3ZSBuZWVkIHRvIHVwZGF0ZSBpdCdzIGNhY2hlZFxuICAgIC8vIGRpbWVuc2lvbnMuIEFsc28ga2VlcCBpbiBtaW5kIHRoYXQgZ3JpZCdzIGNhY2hlZCB3aWR0aC9oZWlnaHQgc2hvdWxkXG4gICAgLy8gYWx3YXlzIGVxdWFsIHRvIHdoYXQgZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSB3b3VsZCByZXR1cm4sIHNvXG4gICAgLy8gdGhlcmVmb3JlIHdlIG5lZWQgdG8gYWRkIHRoZSBncmlkIGVsZW1lbnQncyBib3JkZXJzIHRvIHRoZSBkaW1lbnNpb25zIGlmXG4gICAgLy8gaXQncyBib3gtc2l6aW5nIGlzIGJvcmRlci1ib3guXG4gICAgaWYgKGxheW91dC5zZXRXaWR0aCB8fCBsYXlvdXQuc2V0SGVpZ2h0KSB7XG5cbiAgICAgIGNvbnRhaW5lclN0eWxlcyA9IHt9O1xuICAgICAgaXNCb3JkZXJCb3ggPSBnZXRTdHlsZShpbnN0Ll9lbGVtZW50LCAnYm94LXNpemluZycpID09PSAnYm9yZGVyLWJveCc7XG5cbiAgICAgIGlmIChsYXlvdXQuc2V0SGVpZ2h0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgbGF5b3V0LmhlaWdodCA9PT0gdHlwZU51bWJlcikge1xuICAgICAgICAgIGNvbnRhaW5lclN0eWxlcy5oZWlnaHQgPSAoaXNCb3JkZXJCb3ggPyBsYXlvdXQuaGVpZ2h0ICsgaW5zdC5fYm9yZGVyLnRvcCArIGluc3QuX2JvcmRlci5ib3R0b20gOiBsYXlvdXQuaGVpZ2h0KSArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY29udGFpbmVyU3R5bGVzLmhlaWdodCA9IGxheW91dC5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGxheW91dC5zZXRXaWR0aCkge1xuICAgICAgICBpZiAodHlwZW9mIGxheW91dC53aWR0aCA9PT0gdHlwZU51bWJlcikge1xuICAgICAgICAgIGNvbnRhaW5lclN0eWxlcy53aWR0aCA9IChpc0JvcmRlckJveCA/IGxheW91dC53aWR0aCArIGluc3QuX2JvcmRlci5sZWZ0ICsgaW5zdC5fYm9yZGVyLnJpZ2h0IDogbGF5b3V0LndpZHRoKSArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY29udGFpbmVyU3R5bGVzLndpZHRoID0gbGF5b3V0LndpZHRoO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNldFN0eWxlcyhpbnN0Ll9lbGVtZW50LCBjb250YWluZXJTdHlsZXMpO1xuXG4gICAgfVxuXG4gICAgLy8gRW1pdCBsYXlvdXRTdGFydCBldmVudC4gTm90ZSB0aGF0IHRoaXMgaXMgaW50ZW50aW9uYWxseSBlbWl0dGVkIGFmdGVyIHRoZVxuICAgIC8vIGNvbnRhaW5lciBlbGVtZW50J3MgZGltZW5zaW9ucyBhcmUgc2V0LCBiZWNhdXNlIG90aGVyd2lzZSB0aGVyZSB3b3VsZCBiZVxuICAgIC8vIG5vIGhvb2sgZm9yIHJlYWN0aW5nIHRvIGNvbnRhaW5lciBkaW1lbnNpb24gY2hhbmdlcy5cbiAgICBpbnN0Ll9lbWl0KGV2TGF5b3V0U3RhcnQsIGl0ZW1zLmNvbmNhdCgpKTtcblxuICAgIC8vIElmIHRoZXJlIGFyZSBubyBpdGVtcyBsZXQncyBmaW5pc2ggcXVpY2tseS5cbiAgICBpZiAoIWl0ZW1zLmxlbmd0aCkge1xuICAgICAgdHJ5RmluaXNoKCk7XG4gICAgICByZXR1cm4gaW5zdDtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSBhcmUgaXRlbXMgbGV0J3MgcG9zaXRpb24gdGhlbS5cbiAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgaXRlbSA9IGl0ZW1zW2ldO1xuICAgICAgcG9zaXRpb24gPSBsYXlvdXQuc2xvdHNbaXRlbS5faWRdO1xuXG4gICAgICAvLyBVcGRhdGUgaXRlbSdzIHBvc2l0aW9uLlxuICAgICAgaXRlbS5fbGVmdCA9IHBvc2l0aW9uLmxlZnQ7XG4gICAgICBpdGVtLl90b3AgPSBwb3NpdGlvbi50b3A7XG5cbiAgICAgIC8vIExheW91dCBub24tZHJhZ2dlZCBpdGVtcy5cbiAgICAgIGlmIChpdGVtLmlzRHJhZ2dpbmcoKSkge1xuICAgICAgICB0cnlGaW5pc2godHJ1ZSwgaXRlbSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaXRlbS5fbGF5b3V0KGlzSW5zdGFudCwgdHJ5RmluaXNoKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBpbnN0O1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBuZXcgaXRlbXMgYnkgcHJvdmlkaW5nIHRoZSBlbGVtZW50cyB5b3Ugd2lzaCB0byBhZGQgdG8gdGhlIGluc3RhbmNlIGFuZFxuICAgKiBvcHRpb25hbGx5IHByb3ZpZGUgdGhlIGluZGV4IHdoZXJlIHlvdSB3YW50IHRoZSBpdGVtcyB0byBiZSBpbnNlcnRlZCBpbnRvLlxuICAgKiBBbGwgZWxlbWVudHMgdGhhdCBhcmUgbm90IGFscmVhZHkgY2hpbGRyZW4gb2YgdGhlIGNvbnRhaW5lciBlbGVtZW50IHdpbGwgYmVcbiAgICogYXV0b21hdGljYWxseSBhcHBlbmRlZCB0byB0aGUgY29udGFpbmVyIGVsZW1lbnQuIElmIGFuIGVsZW1lbnQgaGFzIGl0J3MgQ1NTXG4gICAqIGRpc3BsYXkgcHJvcGVydHkgc2V0IHRvIFwibm9uZVwiIGl0IHdpbGwgYmUgbWFya2VkIGFzIGluYWN0aXZlIGR1cmluZyB0aGVcbiAgICogaW5pdGlhdGlvbiBwcm9jZXNzLiBBcyBsb25nIGFzIHRoZSBpdGVtIGlzIGluYWN0aXZlIGl0IHdpbGwgbm90IGJlIHBhcnQgb2ZcbiAgICogdGhlIGxheW91dCwgYnV0IGl0IHdpbGwgcmV0YWluIGl0J3MgaW5kZXguIFlvdSBjYW4gYWN0aXZhdGUgaXRlbXMgYXQgYW55XG4gICAqIHBvaW50IHdpdGggZ3JpZC5zaG93KCkgbWV0aG9kLiBUaGlzIG1ldGhvZCB3aWxsIGF1dG9tYXRpY2FsbHkgY2FsbFxuICAgKiBncmlkLmxheW91dCgpIGlmIG9uZSBvciBtb3JlIG9mIHRoZSBhZGRlZCBlbGVtZW50cyBhcmUgdmlzaWJsZS4gSWYgb25seVxuICAgKiBoaWRkZW4gaXRlbXMgYXJlIGFkZGVkIG5vIGxheW91dCB3aWxsIGJlIGNhbGxlZC4gQWxsIHRoZSBuZXcgdmlzaWJsZSBpdGVtc1xuICAgKiBhcmUgcG9zaXRpb25lZCB3aXRob3V0IGFuaW1hdGlvbiBkdXJpbmcgdGhlaXIgZmlyc3QgbGF5b3V0LlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBHcmlkLnByb3RvdHlwZVxuICAgKiBAcGFyYW0geyhIVE1MRWxlbWVudHxIVE1MRWxlbWVudFtdKX0gZWxlbWVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuaW5kZXg9LTFdXG4gICAqIEBwYXJhbSB7KEJvb2xlYW58TGF5b3V0Q2FsbGJhY2t8U3RyaW5nKX0gW29wdGlvbnMubGF5b3V0PXRydWVdXG4gICAqIEByZXR1cm5zIHtJdGVtW119XG4gICAqL1xuICBHcmlkLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZWxlbWVudHMsIG9wdGlvbnMpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuICAgIGlmIChpbnN0Ll9pc0Rlc3Ryb3llZCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHZhciB0YXJnZXRFbGVtZW50cyA9IGlzTm9kZUxpc3QoZWxlbWVudHMpID8gbm9kZUxpc3RUb0FycmF5KGVsZW1lbnRzKSA6IFtdLmNvbmNhdChlbGVtZW50cyk7XG4gICAgdmFyIG5ld0l0ZW1zID0gW107XG5cbiAgICAvLyBSZXR1cm4gZWFybHkgaWYgdGhlcmUgYXJlIG5vIGl0ZW1zLlxuICAgIGlmICghdGFyZ2V0RWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbmV3SXRlbXM7XG4gICAgfVxuXG4gICAgdmFyIG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHZhciBsYXlvdXQgPSBvcHRzLmxheW91dCA/IG9wdHMubGF5b3V0IDogb3B0cy5sYXlvdXQgPT09IHVuZGVmaW5lZDtcbiAgICB2YXIgaXRlbXMgPSBpbnN0Ll9pdGVtcztcbiAgICB2YXIgbmVlZHNMYXlvdXQgPSBmYWxzZTtcbiAgICB2YXIgZWxlbWVudEluZGV4O1xuICAgIHZhciBpdGVtO1xuICAgIHZhciBpO1xuXG4gICAgLy8gRmlsdGVyIG91dCBhbGwgZWxlbWVudHMgdGhhdCBleGlzdCBhbHJlYWR5IGluIGN1cnJlbnQgaW5zdGFuY2UuXG4gICAgLy8gVE9ETzogVGhpcyBmaWx0ZXJpbmcgY2FuIGJlIG1hZGUgYSBsb3QgZmFzdGVyIGJ5IHN0b3JpbmcgaXRlbSBlbGVtZW50c1xuICAgIC8vIGluIGEgTWFwIG9yIFdlYWtNYXAuIE90aGVyIG9wdGlvbiB3b3VsZCBiZSB0byB0cmFuc2ZlciB0aGUgcmVwb25zaWJpbGl0eVxuICAgIC8vIGNvbXBsZXRlbHkgdG8gdGhlIHVzZXIgYW5kIGdldCByaWQgb2YgdGhpcyBzYW5pdHkgY2hlY2suXG4gICAgZm9yIChpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBlbGVtZW50SW5kZXggPSB0YXJnZXRFbGVtZW50cy5pbmRleE9mKGl0ZW1zW2ldLl9lbGVtZW50KTtcbiAgICAgIGlmIChlbGVtZW50SW5kZXggPiAtMSkge1xuICAgICAgICB0YXJnZXRFbGVtZW50cy5zcGxpY2UoZWxlbWVudEluZGV4LCAxKTtcbiAgICAgICAgaWYgKCF0YXJnZXRFbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gbmV3SXRlbXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgbmV3IGl0ZW1zLlxuICAgIGZvciAoaSA9IDA7IGkgPCB0YXJnZXRFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICBpdGVtID0gbmV3IEdyaWQuSXRlbShpbnN0LCB0YXJnZXRFbGVtZW50c1tpXSk7XG4gICAgICBuZXdJdGVtcy5wdXNoKGl0ZW0pO1xuXG4gICAgICAvLyBJZiB0aGUgaXRlbSB0byBiZSBhZGRlZCBpcyBhY3RpdmUsIHdlIG5lZWQgdG8gZG8gYSBsYXlvdXQuIEFsc28sIHdlXG4gICAgICAvLyBuZWVkIHRvIG1hcmsgdGhlIGl0ZW0gd2l0aCB0aGUgc2tpcE5leHRMYXlvdXRBbmltYXRpb24gZmxhZyB0byBtYWtlIGl0XG4gICAgICAvLyBwb3NpdGlvbiBpbnN0YW50bHkgKHdpdGhvdXQgYW5pbWF0aW9uKSBkdXJpbmcgdGhlIG5leHQgbGF5b3V0LiBXaXRob3V0XG4gICAgICAvLyB0aGUgaGFjayB0aGUgaXRlbSB3b3VsZCBhbmltYXRlIHRvIGl0J3MgbmV3IHBvc2l0aW9uIGZyb20gdGhlIG5vcnRod2VzdFxuICAgICAgLy8gY29ybmVyIG9mIHRoZSBncmlkLCB3aGljaCBmZWVscyBhIGJpdCBidWdneSAoaW1obykuXG4gICAgICBpZiAoaXRlbS5faXNBY3RpdmUpIHtcbiAgICAgICAgbmVlZHNMYXlvdXQgPSB0cnVlO1xuICAgICAgICBpdGVtLl9za2lwTmV4dExheW91dEFuaW1hdGlvbiA9IHRydWU7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIG5ldyBpdGVtcyB0byB0aGUgaXRlbXMgY29sbGVjdGlvbiB0byBjb3JyZWN0IGluZGV4LlxuICAgIGluc2VydEl0ZW1zVG9BcnJheShpdGVtcywgbmV3SXRlbXMsIG9wdHMuaW5kZXgpO1xuXG4gICAgLy8gRW1pdCBhZGQgZXZlbnQuXG4gICAgaW5zdC5fZW1pdChldkFkZCwgbmV3SXRlbXMuY29uY2F0KCkpO1xuXG4gICAgLy8gSWYgbGF5b3V0IGlzIG5lZWRlZC5cbiAgICBpZiAobmVlZHNMYXlvdXQgJiYgbGF5b3V0KSB7XG4gICAgICBpbnN0LmxheW91dChsYXlvdXQgPT09ICdpbnN0YW50JywgdHlwZW9mIGxheW91dCA9PT0gdHlwZUZ1bmN0aW9uID8gbGF5b3V0IDogdW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gbmV3IGl0ZW1zLlxuICAgIHJldHVybiBuZXdJdGVtcztcblxuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgaXRlbXMgZnJvbSB0aGUgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEdyaWQucHJvdG90eXBlXG4gICAqIEBwYXJhbSB7KEdyaWRNdWx0aUl0ZW1RdWVyeXxHcmlkSXRlbVN0YXRlKX0gaXRlbXNcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnJlbW92ZUVsZW1lbnRzPWZhbHNlXVxuICAgKiBAcGFyYW0geyhCb29sZWFufExheW91dENhbGxiYWNrfFN0cmluZyl9IFtvcHRpb25zLmxheW91dD10cnVlXVxuICAgKiBAcmV0dXJucyB7SXRlbVtdfVxuICAgKi9cbiAgR3JpZC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGl0ZW1zLCBvcHRpb25zKSB7XG5cbiAgICB2YXIgaW5zdCA9IHRoaXM7XG5cbiAgICBpZiAoaW5zdC5faXNEZXN0cm95ZWQpIHtcbiAgICAgIHJldHVybiBpbnN0O1xuICAgIH1cblxuICAgIHZhciBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgbGF5b3V0ID0gb3B0cy5sYXlvdXQgPyBvcHRzLmxheW91dCA6IG9wdHMubGF5b3V0ID09PSB1bmRlZmluZWQ7XG4gICAgdmFyIG5lZWRzTGF5b3V0ID0gZmFsc2U7XG4gICAgdmFyIHRhcmdldEl0ZW1zID0gaW5zdC5nZXRJdGVtcyhpdGVtcyk7XG4gICAgdmFyIGl0ZW07XG4gICAgdmFyIGk7XG5cbiAgICAvLyBSZW1vdmUgdGhlIGluZGl2aWR1YWwgaXRlbXMuXG4gICAgZm9yIChpID0gMDsgaSA8IHRhcmdldEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpdGVtID0gdGFyZ2V0SXRlbXNbaV07XG4gICAgICBpZiAoaXRlbS5faXNBY3RpdmUpIHtcbiAgICAgICAgbmVlZHNMYXlvdXQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaXRlbS5fZGVzdHJveShvcHRzLnJlbW92ZUVsZW1lbnRzKTtcbiAgICB9XG5cbiAgICAvLyBFbWl0IHJlbW92ZSBldmVudC5cbiAgICBpbnN0Ll9lbWl0KGV2UmVtb3ZlLCB0YXJnZXRJdGVtcy5jb25jYXQoKSk7XG5cbiAgICAvLyBJZiBsYXlvdXQgaXMgbmVlZGVkLlxuICAgIGlmIChuZWVkc0xheW91dCAmJiBsYXlvdXQpIHtcbiAgICAgIGluc3QubGF5b3V0KGxheW91dCA9PT0gJ2luc3RhbnQnLCB0eXBlb2YgbGF5b3V0ID09PSB0eXBlRnVuY3Rpb24gPyBsYXlvdXQgOiB1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRJdGVtcztcblxuICB9O1xuXG4gIC8qKlxuICAgKiBTaG93IGluc3RhbmNlIGl0ZW1zLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBHcmlkLnByb3RvdHlwZVxuICAgKiBAcGFyYW0geyhHcmlkTXVsdGlJdGVtUXVlcnl8R3JpZEl0ZW1TdGF0ZSl9IGl0ZW1zXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5pbnN0YW50PWZhbHNlXVxuICAgKiBAcGFyYW0ge1Nob3dDYWxsYmFja30gW29wdGlvbnMub25GaW5pc2hdXG4gICAqIEBwYXJhbSB7KEJvb2xlYW58TGF5b3V0Q2FsbGJhY2t8U3RyaW5nKX0gW29wdGlvbnMubGF5b3V0PXRydWVdXG4gICAqIEByZXR1cm5zIHtHcmlkfVxuICAgKi9cbiAgR3JpZC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uIChpdGVtcywgb3B0aW9ucykge1xuXG4gICAgcmV0dXJuIHRoaXMuX2lzRGVzdHJveWVkID8gdGhpcyA6IGdyaWRTaG93SGlkZUhhbmRsZXIodGhpcywgJ3Nob3cnLCBpdGVtcywgb3B0aW9ucyk7XG5cbiAgfTtcblxuICAvKipcbiAgICogSGlkZSBpbnN0YW5jZSBpdGVtcy5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgR3JpZC5wcm90b3R5cGVcbiAgICogQHBhcmFtIHsoR3JpZE11bHRpSXRlbVF1ZXJ5fEdyaWRJdGVtU3RhdGUpfSBpdGVtc1xuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuaW5zdGFudD1mYWxzZV1cbiAgICogQHBhcmFtIHtIaWRlQ2FsbGJhY2t9IFtvcHRpb25zLm9uRmluaXNoXVxuICAgKiBAcGFyYW0geyhCb29sZWFufExheW91dENhbGxiYWNrfFN0cmluZyl9IFtvcHRpb25zLmxheW91dD10cnVlXVxuICAgKiBAcmV0dXJucyB7R3JpZH1cbiAgICovXG4gIEdyaWQucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoaXRlbXMsIG9wdGlvbnMpIHtcblxuICAgIHJldHVybiB0aGlzLl9pc0Rlc3Ryb3llZCA/IHRoaXMgOiBncmlkU2hvd0hpZGVIYW5kbGVyKHRoaXMsICdoaWRlJywgaXRlbXMsIG9wdGlvbnMpO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEZpbHRlciBpdGVtcy4gRXhwZWN0cyBhdCBsZWFzdCBvbmUgYXJndW1lbnQsIGEgcHJlZGljYXRlLCB3aGljaCBzaG91bGQgYmVcbiAgICogZWl0aGVyIGEgZnVuY3Rpb24gb3IgYSBzdHJpbmcuIFRoZSBwcmVkaWNhdGUgY2FsbGJhY2sgaXMgZXhlY3V0ZWQgZm9yIGV2ZXJ5XG4gICAqIGl0ZW0gaW4gdGhlIGluc3RhbmNlLiBJZiB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBwcmVkaWNhdGUgaXMgdHJ1dGh5IHRoZVxuICAgKiBpdGVtIGluIHF1ZXN0aW9uIHdpbGwgYmUgc2hvd24gYW5kIG90aGVyd2lzZSBoaWRkZW4uIFRoZSBwcmVkaWNhdGUgY2FsbGJhY2tcbiAgICogcmVjZWl2ZXMgdGhlIGl0ZW0gaW5zdGFuY2UgYXMgaXQncyBhcmd1bWVudC4gSWYgdGhlIHByZWRpY2F0ZSBpcyBhIHN0cmluZ1xuICAgKiBpdCBpcyBjb25zaWRlcmVkIHRvIGJlIGEgc2VsZWN0b3IgYW5kIGl0IGlzIGNoZWNrZWQgYWdhaW5zdCBldmVyeSBpdGVtXG4gICAqIGVsZW1lbnQgaW4gdGhlIGluc3RhbmNlIHdpdGggdGhlIG5hdGl2ZSBlbGVtZW50Lm1hdGNoZXMoKSBtZXRob2QuIEFsbCB0aGVcbiAgICogbWF0Y2hpbmcgaXRlbXMgd2lsbCBiZSBzaG93biBhbmQgb3RoZXJzIGhpZGRlbi5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgR3JpZC5wcm90b3R5cGVcbiAgICogQHBhcmFtIHsoRnVuY3Rpb258U3RyaW5nKX0gcHJlZGljYXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5pbnN0YW50PWZhbHNlXVxuICAgKiBAcGFyYW0ge0ZpbHRlckNhbGxiYWNrfSBbb3B0aW9ucy5vbkZpbmlzaF1cbiAgICogQHBhcmFtIHsoQm9vbGVhbnxMYXlvdXRDYWxsYmFja3xTdHJpbmcpfSBbb3B0aW9ucy5sYXlvdXQ9dHJ1ZV1cbiAgICogQHJldHVybnMge0dyaWR9XG4gICAqL1xuICBHcmlkLnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbiAocHJlZGljYXRlLCBvcHRpb25zKSB7XG5cbiAgICB2YXIgaW5zdCA9IHRoaXM7XG5cbiAgICAvLyBSZXR1cm4gaW1tZWRpYXRlbHkgaWYgdGhlcmUgYXJlIG5vIGl0ZW1zIG9yIGlmIHRoZSBpbnN0YW5jZSBpZCBkZXN0cm95ZWQuXG4gICAgaWYgKGluc3QuX2lzRGVzdHJveWVkIHx8ICFpbnN0Ll9pdGVtcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBpbnN0O1xuICAgIH1cblxuICAgIHZhciBpdGVtcyA9IGluc3QuX2l0ZW1zO1xuICAgIHZhciBwcmVkaWNhdGVUeXBlID0gdHlwZW9mIHByZWRpY2F0ZTtcbiAgICB2YXIgaXNQcmVkaWNhdGVTdHJpbmcgPSBwcmVkaWNhdGVUeXBlID09PSB0eXBlU3RyaW5nO1xuICAgIHZhciBpc1ByZWRpY2F0ZUZuID0gcHJlZGljYXRlVHlwZSA9PT0gdHlwZUZ1bmN0aW9uO1xuICAgIHZhciBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgaXNJbnN0YW50ID0gb3B0cy5pbnN0YW50ID09PSB0cnVlO1xuICAgIHZhciBsYXlvdXQgPSBvcHRzLmxheW91dCA/IG9wdHMubGF5b3V0IDogb3B0cy5sYXlvdXQgPT09IHVuZGVmaW5lZDtcbiAgICB2YXIgb25GaW5pc2ggPSB0eXBlb2Ygb3B0cy5vbkZpbmlzaCA9PT0gdHlwZUZ1bmN0aW9uID8gb3B0cy5vbkZpbmlzaCA6IG51bGw7XG4gICAgdmFyIGl0ZW1zVG9TaG93ID0gW107XG4gICAgdmFyIGl0ZW1zVG9IaWRlID0gW107XG4gICAgdmFyIHRyeUZpbmlzaENvdW50ZXIgPSAtMTtcbiAgICB2YXIgdHJ5RmluaXNoID0gIW9uRmluaXNoID8gbm9vcCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICsrdHJ5RmluaXNoQ291bnRlciAmJiBvbkZpbmlzaChpdGVtc1RvU2hvdy5jb25jYXQoKSwgaXRlbXNUb0hpZGUuY29uY2F0KCkpO1xuICAgIH07XG4gICAgdmFyIGl0ZW07XG4gICAgdmFyIGk7XG5cbiAgICAvLyBDaGVjayB3aGljaCBpdGVtcyBuZWVkIHRvIGJlIHNob3duIGFuZCB3aGljaCBoaWRkZW4uXG4gICAgaWYgKGlzUHJlZGljYXRlRm4gfHwgaXNQcmVkaWNhdGVTdHJpbmcpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVtID0gaXRlbXNbaV07XG4gICAgICAgIGlmIChpc1ByZWRpY2F0ZUZuID8gcHJlZGljYXRlKGl0ZW0pIDogZWxlbWVudE1hdGNoZXMoaXRlbS5fZWxlbWVudCwgcHJlZGljYXRlKSkge1xuICAgICAgICAgIGl0ZW1zVG9TaG93LnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaXRlbXNUb0hpZGUucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNob3cgaXRlbXMgdGhhdCBuZWVkIHRvIGJlIHNob3duLlxuICAgIGlmIChpdGVtc1RvU2hvdy5sZW5ndGgpIHtcbiAgICAgIGluc3Quc2hvdyhpdGVtc1RvU2hvdywge1xuICAgICAgICBpbnN0YW50OiBpc0luc3RhbnQsXG4gICAgICAgIG9uRmluaXNoOiB0cnlGaW5pc2gsXG4gICAgICAgIGxheW91dDogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRyeUZpbmlzaCgpO1xuICAgIH1cblxuICAgIC8vIEhpZGUgaXRlbXMgdGhhdCBuZWVkIHRvIGJlIGhpZGRlbi5cbiAgICBpZiAoaXRlbXNUb0hpZGUubGVuZ3RoKSB7XG4gICAgICBpbnN0LmhpZGUoaXRlbXNUb0hpZGUsIHtcbiAgICAgICAgaW5zdGFudDogaXNJbnN0YW50LFxuICAgICAgICBvbkZpbmlzaDogdHJ5RmluaXNoLFxuICAgICAgICBsYXlvdXQ6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0cnlGaW5pc2goKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSBhcmUgYW55IGl0ZW1zIHRvIGZpbHRlci5cbiAgICBpZiAoaXRlbXNUb1Nob3cubGVuZ3RoIHx8IGl0ZW1zVG9IaWRlLmxlbmd0aCkge1xuXG4gICAgICAvLyBFbWl0IGZpbHRlciBldmVudC5cbiAgICAgIGluc3QuX2VtaXQoZXZGaWx0ZXIsIGl0ZW1zVG9TaG93LmNvbmNhdCgpLCBpdGVtc1RvSGlkZS5jb25jYXQoKSk7XG5cbiAgICAgIC8vIElmIGxheW91dCBpcyBuZWVkZWQuXG4gICAgICBpZiAobGF5b3V0KSB7XG4gICAgICAgIGluc3QubGF5b3V0KGxheW91dCA9PT0gJ2luc3RhbnQnLCB0eXBlb2YgbGF5b3V0ID09PSB0eXBlRnVuY3Rpb24gPyBsYXlvdXQgOiB1bmRlZmluZWQpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3Q7XG5cbiAgfTtcblxuICAvKipcbiAgICogU29ydCBpdGVtcy4gVGhlcmUgYXJlIHRocmVlIHdheXMgdG8gc29ydCB0aGUgaXRlbXMuIFRoZSBmaXJzdCBpcyBzaW1wbHkgYnlcbiAgICogcHJvdmlkaW5nIGEgZnVuY3Rpb24gYXMgdGhlIGNvbXBhcmVyIHdoaWNoIHdvcmtzIGlkZW50aWNhbGx5IHRvIG5hdGl2ZVxuICAgKiBhcnJheSBzb3J0LiBBbHRlcm5hdGl2ZWx5IHlvdSBjYW4gc29ydCBieSB0aGUgc29ydCBkYXRhIHlvdSBoYXZlIHByb3ZpZGVkXG4gICAqIGluIHRoZSBpbnN0YW5jZSdzIG9wdGlvbnMuIEp1c3QgcHJvdmlkZSB0aGUgc29ydCBkYXRhIGtleShzKSBhcyBhIHN0cmluZ1xuICAgKiAoc2VwYXJhdGVkIGJ5IHNwYWNlKSBhbmQgdGhlIGl0ZW1zIHdpbGwgYmUgc29ydGVkIGJhc2VkIG9uIHRoZSBwcm92aWRlZFxuICAgKiBzb3J0IGRhdGEga2V5cy4gTGFzdGx5IHlvdSBoYXZlIHRoZSBvcHBvcnR1bml0eSB0byBwcm92aWRlIGEgcHJlc29ydGVkXG4gICAqIGFycmF5IG9mIGl0ZW1zIHdoaWNoIHdpbGwgYmUgdXNlZCB0byBzeW5jIHRoZSBpbnRlcm5hbCBpdGVtcyBhcnJheSBpbiB0aGVcbiAgICogc2FtZSBvcmRlci5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgR3JpZC5wcm90b3R5cGVcbiAgICogQHBhcmFtIHsoRnVuY3Rpb258SXRlbVtdfFN0cmluZ3xTdHJpbmdbXSl9IGNvbXBhcmVyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kZXNjZW5kaW5nPWZhbHNlXVxuICAgKiBAcGFyYW0geyhCb29sZWFufExheW91dENhbGxiYWNrfFN0cmluZyl9IFtvcHRpb25zLmxheW91dD10cnVlXVxuICAgKiBAcmV0dXJucyB7R3JpZH1cbiAgICovXG4gIEdyaWQucHJvdG90eXBlLnNvcnQgPSBmdW5jdGlvbiAoY29tcGFyZXIsIG9wdGlvbnMpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuICAgIC8vIExldCdzIG5vdCBzb3J0IGlmIGl0IGhhcyBubyBlZmZlY3QuXG4gICAgaWYgKGluc3QuX2lzRGVzdHJveWVkIHx8IGluc3QuX2l0ZW1zLmxlbmd0aCA8IDIpIHtcbiAgICAgIHJldHVybiBpbnN0O1xuICAgIH1cblxuICAgIHZhciBpdGVtcyA9IGluc3QuX2l0ZW1zO1xuICAgIHZhciBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgaXNEZXNjZW5kaW5nID0gISFvcHRzLmRlc2NlbmRpbmc7XG4gICAgdmFyIGxheW91dCA9IG9wdHMubGF5b3V0ID8gb3B0cy5sYXlvdXQgOiBvcHRzLmxheW91dCA9PT0gdW5kZWZpbmVkO1xuICAgIHZhciBvcmlnSXRlbXMgPSBpdGVtcy5jb25jYXQoKTtcbiAgICB2YXIgaW5kZXhNYXA7XG5cbiAgICAvLyBJZiBmdW5jdGlvbiBpcyBwcm92aWRlZCBkbyBhIG5hdGl2ZSBhcnJheSBzb3J0LlxuICAgIGlmICh0eXBlb2YgY29tcGFyZXIgPT09IHR5cGVGdW5jdGlvbikge1xuICAgICAgaXRlbXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICB2YXIgcmVzdWx0ID0gY29tcGFyZXIoYSwgYik7XG4gICAgICAgIHJldHVybiAoaXNEZXNjZW5kaW5nICYmIHJlc3VsdCAhPT0gMCA/IC1yZXN1bHQgOiByZXN1bHQpIHx8IGNvbXBhcmVJdGVtSW5kaWNlcyhhLCBiLCBpc0Rlc2NlbmRpbmcsIGluZGV4TWFwIHx8IChpbmRleE1hcCA9IGdldEl0ZW1JbmRleE1hcChvcmlnSXRlbXMpKSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2UgaWYgd2UgZ290IGEgc3RyaW5nLCBsZXQncyBzb3J0IGJ5IHRoZSBzb3J0IGRhdGEgYXMgcHJvdmlkZWQgaW5cbiAgICAvLyB0aGUgaW5zdGFuY2UncyBvcHRpb25zLlxuICAgIGVsc2UgaWYgKHR5cGVvZiBjb21wYXJlciA9PT0gdHlwZVN0cmluZykge1xuICAgICAgY29tcGFyZXIgPSBjb21wYXJlci50cmltKCkuc3BsaXQoJyAnKS5tYXAoZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICByZXR1cm4gdmFsLnNwbGl0KCc6Jyk7XG4gICAgICB9KTtcbiAgICAgIGl0ZW1zLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVJdGVtcyhhLCBiLCBpc0Rlc2NlbmRpbmcsIGNvbXBhcmVyKSB8fCBjb21wYXJlSXRlbUluZGljZXMoYSwgYiwgaXNEZXNjZW5kaW5nLCBpbmRleE1hcCB8fCAoaW5kZXhNYXAgPSBnZXRJdGVtSW5kZXhNYXAob3JpZ0l0ZW1zKSkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gT3RoZXJ3aXNlIGlmIHdlIGdvdCBhbiBhcnJheSwgbGV0J3MgYXNzdW1lIGl0J3MgYSBwcmVzb3J0ZWQgYXJyYXkgb2YgdGhlXG4gICAgLy8gaXRlbXMgYW5kIG9yZGVyIHRoZSBpdGVtcyBiYXNlZCBvbiBpdC5cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNvbXBhcmVyKSkge1xuICAgICAgc29ydEl0ZW1zQnlSZWZlcmVuY2UoaXRlbXMsIGNvbXBhcmVyKTtcbiAgICAgIGlmIChpc0Rlc2NlbmRpbmcpIHtcbiAgICAgICAgaXRlbXMucmV2ZXJzZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE90aGVyd2lzZSwgbGV0J3MgZ28gaG9tZS5cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBpbnN0O1xuICAgIH1cblxuICAgIC8vIEVtaXQgc29ydCBldmVudC5cbiAgICBpbnN0Ll9lbWl0KGV2U29ydCwgaXRlbXMuY29uY2F0KCksIG9yaWdJdGVtcyk7XG5cbiAgICAvLyBJZiBsYXlvdXQgaXMgbmVlZGVkLlxuICAgIGlmIChsYXlvdXQpIHtcbiAgICAgIGluc3QubGF5b3V0KGxheW91dCA9PT0gJ2luc3RhbnQnLCB0eXBlb2YgbGF5b3V0ID09PSB0eXBlRnVuY3Rpb24gPyBsYXlvdXQgOiB1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIHJldHVybiBpbnN0O1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIE1vdmUgaXRlbSB0byBhbm90aGVyIGluZGV4IG9yIGluIHBsYWNlIG9mIGFub3RoZXIgaXRlbS5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgR3JpZC5wcm90b3R5cGVcbiAgICogQHBhcmFtIHtHcmlkU2luZ2xlSXRlbVF1ZXJ5fSBpdGVtXG4gICAqIEBwYXJhbSB7R3JpZFNpbmdsZUl0ZW1RdWVyeX0gcG9zaXRpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuYWN0aW9uPVwibW92ZVwiXVxuICAgKiAgIC0gQWNjZXB0cyBlaXRoZXIgXCJtb3ZlXCIgb3IgXCJzd2FwXCIuXG4gICAqICAgLSBcIm1vdmVcIiBtb3ZlcyB0aGUgaXRlbSBpbiBwbGFjZSBvZiB0aGUgb3RoZXIgaXRlbS5cbiAgICogICAtIFwic3dhcFwiIHN3YXBzIHRoZSBwb3NpdGlvbiBvZiB0aGUgaXRlbXMuXG4gICAqIEBwYXJhbSB7KEJvb2xlYW58TGF5b3V0Q2FsbGJhY2t8U3RyaW5nKX0gW29wdGlvbnMubGF5b3V0PXRydWVdXG4gICAqIEByZXR1cm5zIHtHcmlkfVxuICAgKi9cbiAgR3JpZC5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uIChpdGVtLCBwb3NpdGlvbiwgb3B0aW9ucykge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuXG4gICAgLy8gUmV0dXJuIGltbWVkaWF0ZWx5LCBpZiBtb3ZpbmcgYW4gaXRlbSBpcyBub3QgcG9zc2libGUuXG4gICAgaWYgKGluc3QuX2lzRGVzdHJveWVkIHx8IGluc3QuX2l0ZW1zLmxlbmd0aCA8IDIpIHtcbiAgICAgIHJldHVybiBpbnN0O1xuICAgIH1cblxuICAgIHZhciBpdGVtcyA9IGluc3QuX2l0ZW1zO1xuICAgIHZhciBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgbGF5b3V0ID0gb3B0cy5sYXlvdXQgPyBvcHRzLmxheW91dCA6IG9wdHMubGF5b3V0ID09PSB1bmRlZmluZWQ7XG4gICAgdmFyIGlzU3dhcCA9IG9wdHMuYWN0aW9uID09PSAnc3dhcCc7XG4gICAgdmFyIGFjdGlvbiA9IGlzU3dhcCA/ICdzd2FwJyA6ICdtb3ZlJztcbiAgICB2YXIgZnJvbUl0ZW0gPSBpbnN0Ll9nZXRJdGVtKGl0ZW0pO1xuICAgIHZhciB0b0l0ZW0gPSBpbnN0Ll9nZXRJdGVtKHBvc2l0aW9uKTtcbiAgICB2YXIgZnJvbUluZGV4O1xuICAgIHZhciB0b0luZGV4O1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoZSBpdGVtcyBleGlzdCBhbmQgYXJlIG5vdCB0aGUgc2FtZS5cbiAgICBpZiAoZnJvbUl0ZW0gJiYgdG9JdGVtICYmIChmcm9tSXRlbSAhPT0gdG9JdGVtKSkge1xuXG4gICAgICAvLyBHZXQgdGhlIGluZGljZXMgb2YgdGhlIGl0ZW1zLlxuICAgICAgZnJvbUluZGV4ID0gaXRlbXMuaW5kZXhPZihmcm9tSXRlbSk7XG4gICAgICB0b0luZGV4ID0gaXRlbXMuaW5kZXhPZih0b0l0ZW0pO1xuXG4gICAgICAvLyBEbyB0aGUgbW92ZS9zd2FwLlxuICAgICAgKGlzU3dhcCA/IGFycmF5U3dhcCA6IGFycmF5TW92ZSkoaXRlbXMsIGZyb21JbmRleCwgdG9JbmRleCk7XG5cbiAgICAgIC8vIEVtaXQgbW92ZSBldmVudC5cbiAgICAgIGluc3QuX2VtaXQoZXZNb3ZlLCB7XG4gICAgICAgIGl0ZW06IGZyb21JdGVtLFxuICAgICAgICBmcm9tSW5kZXg6IGZyb21JbmRleCxcbiAgICAgICAgdG9JbmRleDogdG9JbmRleCxcbiAgICAgICAgYWN0aW9uOiBhY3Rpb25cbiAgICAgIH0pO1xuXG4gICAgICAvLyBJZiBsYXlvdXQgaXMgbmVlZGVkLlxuICAgICAgaWYgKGxheW91dCkge1xuICAgICAgICBpbnN0LmxheW91dChsYXlvdXQgPT09ICdpbnN0YW50JywgdHlwZW9mIGxheW91dCA9PT0gdHlwZUZ1bmN0aW9uID8gbGF5b3V0IDogdW5kZWZpbmVkKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBpbnN0O1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIFNlbmQgaXRlbSB0byBhbm90aGVyIEdyaWQgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEdyaWQucHJvdG90eXBlXG4gICAqIEBwYXJhbSB7R3JpZFNpbmdsZUl0ZW1RdWVyeX0gaXRlbVxuICAgKiBAcGFyYW0ge0dyaWR9IGdyaWRcbiAgICogQHBhcmFtIHtHcmlkU2luZ2xlSXRlbVF1ZXJ5fSBwb3NpdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtvcHRpb25zLmFwcGVuZFRvPWRvY3VtZW50LmJvZHldXG4gICAqIEBwYXJhbSB7KEJvb2xlYW58TGF5b3V0Q2FsbGJhY2t8U3RyaW5nKX0gW29wdGlvbnMubGF5b3V0U2VuZGVyPXRydWVdXG4gICAqIEBwYXJhbSB7KEJvb2xlYW58TGF5b3V0Q2FsbGJhY2t8U3RyaW5nKX0gW29wdGlvbnMubGF5b3V0UmVjZWl2ZXI9dHJ1ZV1cbiAgICogQHJldHVybnMge0dyaWR9XG4gICAqL1xuICBHcmlkLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKGl0ZW0sIGdyaWQsIHBvc2l0aW9uLCBvcHRpb25zKSB7XG5cbiAgICB2YXIgY3VycmVudEdyaWQgPSB0aGlzO1xuXG4gICAgLy8gUmV0dXJuIGltbWVkaWF0ZWx5IGlmIGVpdGhlciBncmlkIGlzIGRlc3Ryb3llZCBvciBpZiB0aGUgZ3JpZHMgYXJlIHRoZVxuICAgIC8vIHNhbWUsIG9yIGlmIHRhcmdldCBpdGVtIHdhcyBub3QgZm91bmQuXG4gICAgaWYgKGN1cnJlbnRHcmlkLl9pc0Rlc3Ryb3llZCB8fCBncmlkLl9pc0Rlc3Ryb3llZCB8fCBjdXJyZW50R3JpZCA9PT0gZ3JpZCB8fCAhKGl0ZW0gPSBjdXJyZW50R3JpZC5fZ2V0SXRlbShpdGVtKSkpIHtcbiAgICAgIHJldHVybiBjdXJyZW50R3JpZDtcbiAgICB9XG5cbiAgICB2YXIgdGFyZ2V0R3JpZCA9IGdyaWQ7XG4gICAgdmFyIG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHZhciBjb250YWluZXIgPSBvcHRzLmFwcGVuZFRvIHx8IGJvZHk7XG4gICAgdmFyIGxheW91dFNlbmRlciA9IG9wdHMubGF5b3V0U2VuZGVyID8gb3B0cy5sYXlvdXRTZW5kZXIgOiBvcHRzLmxheW91dFNlbmRlciA9PT0gdW5kZWZpbmVkO1xuICAgIHZhciBsYXlvdXRSZWNlaXZlciA9IG9wdHMubGF5b3V0UmVjZWl2ZXIgPyBvcHRzLmxheW91dFJlY2VpdmVyIDogb3B0cy5sYXlvdXRSZWNlaXZlciA9PT0gdW5kZWZpbmVkO1xuXG4gICAgLy8gU3RhcnQgdGhlIG1pZ3JhdGlvbiBwcm9jZXNzLlxuICAgIGl0ZW0uX21pZ3JhdGUuc3RhcnQodGFyZ2V0R3JpZCwgcG9zaXRpb24sIGNvbnRhaW5lcik7XG5cbiAgICAvLyBJZiBtaWdyYXRpb24gd2FzIHN0YXJ0ZWQgc3VjY2VzZnVsbHkgYW5kIHRoZSBpdGVtIGlzIGFjdGl2ZSwgbGV0J3MgbGF5b3V0XG4gICAgLy8gdGhlIGdyaWRzLlxuICAgIGlmIChpdGVtLl9taWdyYXRlLmlzQWN0aXZlICYmIGl0ZW0uaXNBY3RpdmUoKSkge1xuICAgICAgaWYgKGxheW91dFNlbmRlcikge1xuICAgICAgICBjdXJyZW50R3JpZC5sYXlvdXQobGF5b3V0U2VuZGVyID09PSAnaW5zdGFudCcsIHR5cGVvZiBsYXlvdXRTZW5kZXIgPT09IHR5cGVGdW5jdGlvbiA/IGxheW91dFNlbmRlciA6IHVuZGVmaW5lZCk7XG4gICAgICB9XG4gICAgICBpZiAobGF5b3V0UmVjZWl2ZXIpIHtcbiAgICAgICAgdGFyZ2V0R3JpZC5sYXlvdXQobGF5b3V0UmVjZWl2ZXIgPT09ICdpbnN0YW50JywgdHlwZW9mIGxheW91dFJlY2VpdmVyID09PSB0eXBlRnVuY3Rpb24gPyBsYXlvdXRSZWNlaXZlciA6IHVuZGVmaW5lZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1cnJlbnRHcmlkO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgdGhlIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBHcmlkLnByb3RvdHlwZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtyZW1vdmVFbGVtZW50cz1mYWxzZV1cbiAgICogQHJldHVybnMge0dyaWR9XG4gICAqL1xuICBHcmlkLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKHJlbW92ZUVsZW1lbnRzKSB7XG5cbiAgICB2YXIgaW5zdCA9IHRoaXM7XG5cbiAgICBpZiAoaW5zdC5faXNEZXN0cm95ZWQpIHtcbiAgICAgIHJldHVybiBpbnN0O1xuICAgIH1cblxuICAgIHZhciBjb250YWluZXIgPSBpbnN0Ll9lbGVtZW50O1xuICAgIHZhciBpdGVtcyA9IGluc3QuX2l0ZW1zLmNvbmNhdCgpO1xuICAgIHZhciBpO1xuXG4gICAgLy8gVW5iaW5kIHdpbmRvdyByZXNpemUgZXZlbnQgbGlzdGVuZXIuXG4gICAgaWYgKGluc3QuX3Jlc2l6ZUhhbmRsZXIpIHtcbiAgICAgIGdsb2JhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBpbnN0Ll9yZXNpemVIYW5kbGVyKTtcbiAgICB9XG5cbiAgICAvLyBEZXN0cm95IGl0ZW1zLlxuICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgaXRlbXNbaV0uX2Rlc3Ryb3kocmVtb3ZlRWxlbWVudHMpO1xuICAgIH1cblxuICAgIC8vIFJlc3RvcmUgY29udGFpbmVyLlxuICAgIHJlbW92ZUNsYXNzKGNvbnRhaW5lciwgaW5zdC5fc2V0dGluZ3MuY29udGFpbmVyQ2xhc3MpO1xuICAgIHNldFN0eWxlcyhjb250YWluZXIsIHtoZWlnaHQ6ICcnfSk7XG5cbiAgICAvLyBFbWl0IGRlc3Ryb3kgZXZlbnQgYW5kIHVuYmluZCBhbGwgZXZlbnRzLlxuICAgIGluc3QuX2VtaXQoZXZEZXN0cm95KTtcbiAgICBpbnN0Ll9lbWl0dGVyLmRlc3Ryb3koKTtcblxuICAgIC8vIFJlbW92ZSByZWZlcmVuY2UgZnJvbSB0aGUgZ3JpZCBpbnN0YW5jZXMgY29sbGVjdGlvbi5cbiAgICBncmlkSW5zdGFuY2VzW2luc3QuX2lkXSA9IHVuZGVmaW5lZDtcblxuICAgIC8vIEZsYWcgaW5zdGFuY2UgYXMgZGVzdHJveWVkLlxuICAgIGluc3QuX2lzRGVzdHJveWVkID0gdHJ1ZTtcblxuICAgIHJldHVybiBpbnN0O1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEdyaWQgLSBQcm90ZWN0ZWQgcHJvdG90eXBlIG1ldGhvZHNcbiAgICogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKi9cblxuICAvKipcbiAgICogR2V0IGluc3RhbmNlJ3MgaXRlbSBieSBlbGVtZW50IG9yIGJ5IGluZGV4LiBUYXJnZXQgY2FuIGFsc28gYmUgYW4gSXRlbVxuICAgKiBpbnN0YW5jZSBpbiB3aGljaCBjYXNlIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRoZSBpdGVtIGlmIGl0IGV4aXN0cyB3aXRoaW5cbiAgICogcmVsYXRlZCBHcmlkIGluc3RhbmNlLiBJZiBub3RoaW5nIGlzIGZvdW5kIHdpdGggdGhlIHByb3ZpZGVkIHRhcmdldCwgbnVsbFxuICAgKiBpcyByZXR1cm5lZC5cbiAgICpcbiAgICogQHByb3RlY3RlZFxuICAgKiBAbWVtYmVyb2YgR3JpZC5wcm90b3R5cGVcbiAgICogQHBhcmFtIHtHcmlkU2luZ2xlSXRlbVF1ZXJ5fSBbdGFyZ2V0PTBdXG4gICAqIEByZXR1cm5zIHs/SXRlbX1cbiAgICovXG4gIEdyaWQucHJvdG90eXBlLl9nZXRJdGVtID0gZnVuY3Rpb24gKHRhcmdldCkge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuICAgIHZhciBpdGVtcyA9IGluc3QuX2l0ZW1zO1xuICAgIHZhciBpO1xuXG4gICAgLy8gSWYgbm8gdGFyZ2V0IGlzIHNwZWNpZmllZCBvciB0aGUgaW5zdGFuY2UgaXMgZGVzdHJveWVkLCByZXR1cm4gdGhlIGZpcnN0XG4gICAgLy8gaXRlbSBvciBudWxsLlxuICAgIGlmIChpbnN0Ll9pc0Rlc3Ryb3llZCB8fCAhdGFyZ2V0KSB7XG4gICAgICByZXR1cm4gaXRlbXNbMF0gfHwgbnVsbDtcbiAgICB9XG5cbiAgICAvLyBJZiB0YXJnZXQgaXMgbnVtYmVyIHJldHVybiB0aGUgaXRlbSBpbiB0aGF0IGluZGV4LiBJZiB0aGUgbnVtYmVyIGlzIGxvd2VyXG4gICAgLy8gdGhhbiB6ZXJvIGxvb2sgZm9yIHRoZSBpdGVtIHN0YXJ0aW5nIGZyb20gdGhlIGVuZCBvZiB0aGUgaXRlbXMgYXJyYXkuIEZvclxuICAgIC8vIGV4YW1wbGUgLTEgZm9yIHRoZSBsYXN0IGl0ZW0sIC0yIGZvciB0aGUgc2Vjb25kIGxhc3QgaXRlbSwgZXRjLlxuICAgIGVsc2UgaWYgKHR5cGVvZiB0YXJnZXQgPT09IHR5cGVOdW1iZXIpIHtcbiAgICAgIHJldHVybiBpdGVtc1t0YXJnZXQgPiAtMSA/IHRhcmdldCA6IGl0ZW1zLmxlbmd0aCArIHRhcmdldF0gfHwgbnVsbDtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgdGFyZ2V0IGlzIGFuIGluc3RhbmNlIG9mIEl0ZW0gcmV0dXJuIGl0IGlmIGl0IGlzIGF0dGFjaGVkIHRvIHRoaXNcbiAgICAvLyBHcmlkIGluc3RhbmNlLCBvdGhlcndpc2UgcmV0dXJuIG51bGwuXG4gICAgZWxzZSBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSXRlbSkge1xuICAgICAgcmV0dXJuIHRhcmdldC5fZ3JpZElkID09PSBpbnN0Ll9pZCA/IHRhcmdldCA6IG51bGw7XG4gICAgfVxuXG4gICAgLy8gSW4gb3RoZXIgY2FzZXMgbGV0J3MgYXNzdW1lIHRoYXQgdGhlIHRhcmdldCBpcyBhbiBlbGVtZW50LCBzbyBsZXQncyB0cnlcbiAgICAvLyB0byBmaW5kIGFuIGl0ZW0gdGhhdCBtYXRjaGVzIHRoZSBlbGVtZW50IGFuZCByZXR1cm4gaXQuIElmIGl0ZW0gaXMgbm90XG4gICAgLy8gZm91bmQgcmV0dXJuIG51bGwuXG4gICAgZWxzZSB7XG4gICAgICAvLyBUT0RPOiBUaGlzIGNvdWxkIGJlIG1hZGUgYSBsb3QgZmFzdGVyIGJ5IHVzaW5nIFdlYWtNYXAgb3IgTWFwLlxuICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpdGVtc1tpXS5fZWxlbWVudCA9PT0gdGFyZ2V0KSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW1zW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgfTtcblxuICAvKipcbiAgICogQmluZCBhbiBldmVudCBsaXN0ZW5lci5cbiAgICpcbiAgICogQHByb3RlY3RlZFxuICAgKiBAbWVtYmVyb2YgR3JpZC5wcm90b3R5cGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7Kn0gW2FyZzFdXG4gICAqIEBwYXJhbSB7Kn0gW2FyZzJdXG4gICAqIEBwYXJhbSB7Kn0gW2FyZzNdXG4gICAqIEByZXR1cm5zIHtHcmlkfVxuICAgKi9cbiAgR3JpZC5wcm90b3R5cGUuX2VtaXQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgaW5zdCA9IHRoaXM7XG5cbiAgICBpZiAoIWluc3QuX2lzRGVzdHJveWVkKSB7XG4gICAgICBpbnN0Ll9lbWl0dGVyLmVtaXQuYXBwbHkoaW5zdC5fZW1pdHRlciwgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBSZWZyZXNoIGNvbnRhaW5lcidzIGludGVybmFsIGRpbWVuc2lvbnMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBHcmlkLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7R3JpZH1cbiAgICovXG4gIEdyaWQucHJvdG90eXBlLl9yZWZyZXNoRGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcbiAgICB2YXIgZWxlbWVudCA9IGluc3QuX2VsZW1lbnQ7XG4gICAgdmFyIHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHZhciBzaWRlcyA9IFsnbGVmdCcsICdyaWdodCcsICd0b3AnLCAnYm90dG9tJ107XG4gICAgdmFyIGk7XG5cbiAgICBpbnN0Ll93aWR0aCA9IHJlY3Qud2lkdGg7XG4gICAgaW5zdC5faGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XG4gICAgaW5zdC5fbGVmdCA9IHJlY3QubGVmdDtcbiAgICBpbnN0Ll90b3AgPSByZWN0LnRvcDtcbiAgICBpbnN0Ll9ib3JkZXIgPSB7fTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBzaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaW5zdC5fYm9yZGVyW3NpZGVzW2ldXSA9IGdldFN0eWxlQXNGbG9hdChlbGVtZW50LCAnYm9yZGVyLScgKyBzaWRlc1tpXSArICctd2lkdGgnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBJdGVtXG4gICAqICoqKipcbiAgICovXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgSXRlbSBpbnN0YW5jZSBmb3IgYSBHcmlkIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjbGFzc1xuICAgKiBAcGFyYW0ge0dyaWR9IGdyaWRcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICAgKi9cbiAgZnVuY3Rpb24gSXRlbShncmlkLCBlbGVtZW50KSB7XG5cbiAgICB2YXIgaW5zdCA9IHRoaXM7XG4gICAgdmFyIHNldHRpbmdzID0gZ3JpZC5fc2V0dGluZ3M7XG4gICAgdmFyIGlzSGlkZGVuO1xuXG4gICAgLy8gQ3JlYXRlIGluc3RhbmNlIGlkIGFuZCBhZGQgaXRlbSB0byB0aGUgaXRlbUluc3RhbmNlcyBjb2xsZWN0aW9uLlxuICAgIGluc3QuX2lkID0gKyt1dWlkO1xuICAgIGl0ZW1JbnN0YW5jZXNbaW5zdC5faWRdID0gaW5zdDtcblxuICAgIC8vIERlc3Ryb3llZCBmbGFnLlxuICAgIGluc3QuX2lzRGVzdHJveWVkID0gZmFsc2U7XG5cbiAgICAvLyBJZiB0aGUgcHJvdmlkZWQgaXRlbSBlbGVtZW50IGlzIG5vdCBhIGRpcmVjdCBjaGlsZCBvZiB0aGUgZ3JpZCBjb250YWluZXJcbiAgICAvLyBlbGVtZW50LCBhcHBlbmQgaXQgdG8gdGhlIGdyaWQgY29udGFpbmVyLlxuICAgIGlmIChlbGVtZW50LnBhcmVudE5vZGUgIT09IGdyaWQuX2VsZW1lbnQpIHtcbiAgICAgIGdyaWQuX2VsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgLy8gU2V0IGl0ZW0gY2xhc3MuXG4gICAgYWRkQ2xhc3MoZWxlbWVudCwgc2V0dGluZ3MuaXRlbUNsYXNzKTtcblxuICAgIC8vIENoZWNrIGlmIHRoZSBlbGVtZW50IGlzIGhpZGRlbi5cbiAgICBpc0hpZGRlbiA9IGdldFN0eWxlKGVsZW1lbnQsICdkaXNwbGF5JykgPT09ICdub25lJztcblxuICAgIC8vIFNldCB2aXNpYmxlL2hpZGRlbiBjbGFzcy5cbiAgICBhZGRDbGFzcyhlbGVtZW50LCBpc0hpZGRlbiA/IHNldHRpbmdzLml0ZW1IaWRkZW5DbGFzcyA6IHNldHRpbmdzLml0ZW1WaXNpYmxlQ2xhc3MpO1xuXG4gICAgLy8gUmVmcmVuY2UgdG8gY29ubmVjdGVkIEdyaWQgaW5zdGFuY2UncyBpZC5cbiAgICBpbnN0Ll9ncmlkSWQgPSBncmlkLl9pZDtcblxuICAgIC8vIFRoZSBlbGVtZW50cy5cbiAgICBpbnN0Ll9lbGVtZW50ID0gZWxlbWVudDtcbiAgICBpbnN0Ll9jaGlsZCA9IGVsZW1lbnQuY2hpbGRyZW5bMF07XG5cbiAgICAvLyBJbml0aWF0ZSBpdGVtJ3MgYW5pbWF0aW9uIGNvbnRyb2xsZXJzLlxuICAgIGluc3QuX2FuaW1hdGUgPSBuZXcgR3JpZC5JdGVtQW5pbWF0ZShpbnN0LCBlbGVtZW50KTtcbiAgICBpbnN0Ll9hbmltYXRlQ2hpbGQgPSBuZXcgR3JpZC5JdGVtQW5pbWF0ZShpbnN0LCBpbnN0Ll9jaGlsZCk7XG5cbiAgICAvLyBTZXQgdXAgYWN0aXZlIHN0YXRlIChkZWZpbmVzIGlmIHRoZSBpdGVtIGlzIGNvbnNpZGVyZWQgcGFydCBvZiB0aGUgbGF5b3V0XG4gICAgLy8gb3Igbm90KS5cbiAgICBpbnN0Ll9pc0FjdGl2ZSA9IGlzSGlkZGVuID8gZmFsc2UgOiB0cnVlO1xuXG4gICAgLy8gU2V0IHVwIHBvc2l0aW9uaW5nIHN0YXRlIChkZWZpbmVzIGlmIHRoZSBpdGVtIGlzIGN1cnJlbnRseSBhbmltYXRpbmdcbiAgICAvLyBpdCdzIHBvc2l0aW9uKS5cbiAgICBpbnN0Ll9pc1Bvc2l0aW9uaW5nID0gZmFsc2U7XG5cbiAgICAvLyBTZXQgdXAgdmlzaWJpbGl0eSBzdGF0ZXMuXG4gICAgaW5zdC5faXNIaWRkZW4gPSBpc0hpZGRlbjtcbiAgICBpbnN0Ll9pc0hpZGluZyA9IGZhbHNlO1xuICAgIGluc3QuX2lzU2hvd2luZyA9IGZhbHNlO1xuXG4gICAgLy8gVmlzaWJpbGl0eSBhbmltYXRpb24gY2FsbGJhY2sgcXVldWUuIFdoZW5ldmVyIGEgY2FsbGJhY2sgaXMgcHJvdmlkZWQgZm9yXG4gICAgLy8gc2hvdy9oaWRlIG1ldGhvZHMgYW5kIGFuaW1hdGlvbiBpcyBlbmFibGVkIHRoZSBjYWxsYmFjayBpcyBzdG9yZWRcbiAgICAvLyB0ZW1wb3JhcmlseSB0byB0aGlzIGFycmF5LiBUaGUgY2FsbGJhY2tzIGFyZSBjYWxsZWQgd2l0aCB0aGUgZmlyc3RcbiAgICAvLyBhcmd1bWVudCBhcyBmYWxzZSBpZiB0aGUgYW5pbWF0aW9uIHN1Y2NlZWRlZCB3aXRob3V0IGludGVycnVwdGlvbnMgYW5kXG4gICAgLy8gd2l0aCB0aGUgZmlyc3QgYXJndW1lbnQgYXMgdHJ1ZSBpZiB0aGUgYW5pbWF0aW9uIHdhcyBpbnRlcnJ1cHRlZC5cbiAgICBpbnN0Ll92aXNpYmlsaXR5UXVldWUgPSBbXTtcblxuICAgIC8vIExheW91dCBhbmltYXRpb24gY2FsbGJhY2sgcXVldWUuIFdoZW5ldmVyIGEgY2FsbGJhY2sgaXMgcHJvdmlkZWQgZm9yXG4gICAgLy8gbGF5b3V0IG1ldGhvZCBhbmQgYW5pbWF0aW9uIGlzIGVuYWJsZWQgdGhlIGNhbGxiYWNrIGlzIHN0b3JlZCB0ZW1wb3JhcmlseVxuICAgIC8vIHRvIHRoaXMgYXJyYXkuIFRoZSBjYWxsYmFja3MgYXJlIGNhbGxlZCB3aXRoIHRoZSBmaXJzdCBhcmd1bWVudCBhcyBmYWxzZVxuICAgIC8vIGlmIHRoZSBhbmltYXRpb24gc3VjY2VlZGVkIHdpdGhvdXQgaW50ZXJydXB0aW9ucyBhbmQgd2l0aCB0aGUgZmlyc3RcbiAgICAvLyBhcmd1bWVudCBhcyB0cnVlIGlmIHRoZSBhbmltYXRpb24gd2FzIGludGVycnVwdGVkLlxuICAgIGluc3QuX2xheW91dFF1ZXVlID0gW107XG5cbiAgICAvLyBTZXQgdXAgaW5pdGlhbCBwb3NpdGlvbnMuXG4gICAgaW5zdC5fbGVmdCA9IDA7XG4gICAgaW5zdC5fdG9wID0gMDtcblxuICAgIC8vIFNldCBlbGVtZW50J3MgaW5pdGlhbCBzdHlsZXMuXG4gICAgc2V0U3R5bGVzKGVsZW1lbnQsIHtcbiAgICAgIGxlZnQ6ICcwJyxcbiAgICAgIHRvcDogJzAnLFxuICAgICAgdHJhbnNmb3JtOiBnZXRUcmFuc2xhdGVTdHJpbmcoMCwgMCksXG4gICAgICBkaXNwbGF5OiBpc0hpZGRlbiA/ICdub25lJyA6ICdibG9jaydcbiAgICB9KTtcblxuICAgIC8vIFNldCB1cCB0aGUgaW5pdGlhbCBkaW1lbnNpb25zIGFuZCBzb3J0IGRhdGEuXG4gICAgaW5zdC5fcmVmcmVzaERpbWVuc2lvbnMoKS5fcmVmcmVzaFNvcnREYXRhKCk7XG5cbiAgICAvLyBTZXQgaW5pdGlhbCBzdHlsZXMgZm9yIHRoZSBjaGlsZCBlbGVtZW50LlxuICAgIGlmIChpc0hpZGRlbikge1xuICAgICAgZ3JpZC5faXRlbUhpZGVIYW5kbGVyLnN0YXJ0KGluc3QsIHRydWUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGdyaWQuX2l0ZW1TaG93SGFuZGxlci5zdGFydChpbnN0LCB0cnVlKTtcbiAgICB9XG5cbiAgICAvLyBTZXQgdXAgbWlncmF0aW9uIGhhbmRsZXIgZGF0YS5cbiAgICBpbnN0Ll9taWdyYXRlID0gbmV3IEdyaWQuSXRlbU1pZ3JhdGUoaW5zdCk7XG5cbiAgICAvLyBTZXQgdXAgcmVsZWFzZSBoYW5kbGVyXG4gICAgaW5zdC5fcmVsZWFzZSA9IG5ldyBHcmlkLkl0ZW1SZWxlYXNlKGluc3QpO1xuXG4gICAgLy8gU2V0IHVwIGRyYWcgaGFuZGxlci5cbiAgICBpbnN0Ll9kcmFnID0gc2V0dGluZ3MuZHJhZ0VuYWJsZWQgPyBuZXcgR3JpZC5JdGVtRHJhZyhpbnN0KSA6IG51bGw7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVtIC0gUHVibGljIHByb3RvdHlwZSBtZXRob2RzXG4gICAqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICovXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaW5zdGFuY2UgZ3JpZCByZWZlcmVuY2UuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW0ucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHtHcmlkfVxuICAgKi9cbiAgSXRlbS5wcm90b3R5cGUuZ2V0R3JpZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiBncmlkSW5zdGFuY2VzW3RoaXMuX2dyaWRJZF07XG5cbiAgfTtcblxuICAvKipcbiAgICogR2V0IHRoZSBpbnN0YW5jZSBlbGVtZW50LlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBJdGVtLnByb3RvdHlwZS5nZXRFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XG5cbiAgfTtcblxuICAvKipcbiAgICogR2V0IGluc3RhbmNlIGVsZW1lbnQncyBjYWNoZWQgd2lkdGguXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW0ucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqL1xuICBJdGVtLnByb3RvdHlwZS5nZXRXaWR0aCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB0aGlzLl93aWR0aDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgaW5zdGFuY2UgZWxlbWVudCdzIGNhY2hlZCBoZWlnaHQuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW0ucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqL1xuICBJdGVtLnByb3RvdHlwZS5nZXRIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBpbnN0YW5jZSBlbGVtZW50J3MgY2FjaGVkIG1hcmdpbnMuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW0ucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqICAgLSBUaGUgcmV0dXJuZWQgb2JqZWN0IGNvbnRhaW5zIGxlZnQsIHJpZ2h0LCB0b3AgYW5kIGJvdHRvbSBwcm9wZXJ0aWVzXG4gICAqICAgICB3aGljaCBpbmRpY2F0ZSB0aGUgaXRlbSBlbGVtZW50J3MgY2FjaGVkIG1hcmdpbnMuXG4gICAqL1xuICBJdGVtLnByb3RvdHlwZS5nZXRNYXJnaW4gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbGVmdDogdGhpcy5fbWFyZ2luLmxlZnQsXG4gICAgICByaWdodDogdGhpcy5fbWFyZ2luLnJpZ2h0LFxuICAgICAgdG9wOiB0aGlzLl9tYXJnaW4udG9wLFxuICAgICAgYm90dG9tOiB0aGlzLl9tYXJnaW4uYm90dG9tXG4gICAgfTtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgaW5zdGFuY2UgZWxlbWVudCdzIGNhY2hlZCBwb3NpdGlvbi5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbS5wcm90b3R5cGVcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICogICAtIFRoZSByZXR1cm5lZCBvYmplY3QgY29udGFpbnMgbGVmdCBhbmQgdG9wIHByb3BlcnRpZXMgd2hpY2ggaW5kaWNhdGUgdGhlXG4gICAqICAgICBpdGVtIGVsZW1lbnQncyBjYWNoZWQgcG9zaXRpb24gaW4gdGhlIGdyaWQuXG4gICAqL1xuICBJdGVtLnByb3RvdHlwZS5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB7XG4gICAgICBsZWZ0OiB0aGlzLl9sZWZ0LFxuICAgICAgdG9wOiB0aGlzLl90b3BcbiAgICB9O1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIElzIHRoZSBpdGVtIGFjdGl2ZT9cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbS5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBJdGVtLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB0aGlzLl9pc0FjdGl2ZTtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBJcyB0aGUgaXRlbSB2aXNpYmxlP1xuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIEl0ZW0ucHJvdG90eXBlLmlzVmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiAhdGhpcy5faXNIaWRkZW47XG5cbiAgfTtcblxuICAvKipcbiAgICogSXMgdGhlIGl0ZW0gYmVpbmcgYW5pbWF0ZWQgdG8gdmlzaWJsZT9cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbS5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBJdGVtLnByb3RvdHlwZS5pc1Nob3dpbmcgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4gdGhpcy5faXNTaG93aW5nO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIElzIHRoZSBpdGVtIGJlaW5nIGFuaW1hdGVkIHRvIGhpZGRlbj9cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbS5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBJdGVtLnByb3RvdHlwZS5pc0hpZGluZyA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB0aGlzLl9pc0hpZGluZztcblxuICB9O1xuXG4gIC8qKlxuICAgKiBJcyB0aGUgaXRlbSBwb3NpdGlvbmluZz9cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbS5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBJdGVtLnByb3RvdHlwZS5pc1Bvc2l0aW9uaW5nID0gZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHRoaXMuX2lzUG9zaXRpb25pbmc7XG5cbiAgfTtcblxuICAvKipcbiAgICogSXMgdGhlIGl0ZW0gYmVpbmcgZHJhZ2dlZD9cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbS5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBJdGVtLnByb3RvdHlwZS5pc0RyYWdnaW5nID0gZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuICEhdGhpcy5fZHJhZyAmJiB0aGlzLl9kcmFnLl9kYXRhLmlzQWN0aXZlO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIElzIHRoZSBpdGVtIGJlaW5nIHJlbGVhc2VkP1xuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIEl0ZW0ucHJvdG90eXBlLmlzUmVsZWFzaW5nID0gZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHRoaXMuX3JlbGVhc2UuaXNBY3RpdmU7XG5cbiAgfTtcblxuICAvKipcbiAgICogSXMgdGhlIGl0ZW0gZGVzdHJveWVkP1xuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIEl0ZW0ucHJvdG90eXBlLmlzRGVzdHJveWVkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHRoaXMuX2lzRGVzdHJveWVkO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEl0ZW0gLSBQcm90ZWN0ZWQgcHJvdG90eXBlIG1ldGhvZHNcbiAgICogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKi9cblxuICAvKipcbiAgICogUmVjYWxjdWxhdGUgaXRlbSdzIGRpbWVuc2lvbnMuXG4gICAqXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQG1lbWJlcm9mIEl0ZW0ucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHtJdGVtfVxuICAgKi9cbiAgSXRlbS5wcm90b3R5cGUuX3JlZnJlc2hEaW1lbnNpb25zID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuXG4gICAgaWYgKGluc3QuX2lzRGVzdHJveWVkIHx8IGluc3QuX2lzSGlkZGVuKSB7XG4gICAgICByZXR1cm4gaW5zdDtcbiAgICB9XG5cbiAgICB2YXIgZWxlbWVudCA9IGluc3QuX2VsZW1lbnQ7XG4gICAgdmFyIHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHZhciBzaWRlcyA9IFsnbGVmdCcsICdyaWdodCcsICd0b3AnLCAnYm90dG9tJ107XG4gICAgdmFyIG1hcmdpbiA9IGluc3QuX21hcmdpbiA9IGluc3QuX21hcmdpbiB8fCB7fTtcbiAgICB2YXIgc2lkZTtcbiAgICB2YXIgaTtcblxuICAgIC8vIENhbGN1bGF0ZSB3aWR0aCBhbmQgaGVpZ2h0LlxuICAgIGluc3QuX3dpZHRoID0gcmVjdC53aWR0aDtcbiAgICBpbnN0Ll9oZWlnaHQgPSByZWN0LmhlaWdodDtcblxuICAgIC8vIENhbGN1bGF0ZSBtYXJnaW5zIChpZ25vcmUgbmVnYXRpdmUgbWFyZ2lucykuXG4gICAgZm9yIChpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgc2lkZSA9IGdldFN0eWxlQXNGbG9hdChlbGVtZW50LCAnbWFyZ2luLScgKyBzaWRlc1tpXSk7XG4gICAgICBtYXJnaW5bc2lkZXNbaV1dID0gc2lkZSA+IDAgPyBzaWRlIDogMDtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBGZXRjaCBhbmQgc3RvcmUgaXRlbSdzIHNvcnQgZGF0YS5cbiAgICpcbiAgICogQHByb3RlY3RlZFxuICAgKiBAbWVtYmVyb2YgSXRlbS5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0l0ZW19XG4gICAqL1xuICBJdGVtLnByb3RvdHlwZS5fcmVmcmVzaFNvcnREYXRhID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuXG4gICAgaWYgKGluc3QuX2lzRGVzdHJveWVkKSB7XG4gICAgICByZXR1cm4gaW5zdDtcbiAgICB9XG5cbiAgICB2YXIgc29ydERhdGEgPSB7fTtcbiAgICB2YXIgZ2V0dGVycyA9IGluc3QuZ2V0R3JpZCgpLl9zZXR0aW5ncy5zb3J0RGF0YTtcblxuICAgIC8vIEZldGNoIHNvcnQgZGF0YS5cbiAgICBpZiAoZ2V0dGVycykge1xuICAgICAgT2JqZWN0LmtleXMoZ2V0dGVycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHNvcnREYXRhW2tleV0gPSBnZXR0ZXJzW2tleV0oaW5zdCwgaW5zdC5fZWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBTdG9yZSBzb3J0IGRhdGEgdG8gdGhlIGluc3RhbmNlLlxuICAgIGluc3QuX3NvcnREYXRhID0gc29ydERhdGE7XG5cbiAgICByZXR1cm4gaW5zdDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBQb3NpdGlvbiBpdGVtIGJhc2VkIG9uIGl0J3MgY3VycmVudCBkYXRhLlxuICAgKlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBtZW1iZXJvZiBJdGVtLnByb3RvdHlwZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGluc3RhbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uRmluaXNoXVxuICAgKiBAcmV0dXJucyB7SXRlbX1cbiAgICovXG4gIEl0ZW0ucHJvdG90eXBlLl9sYXlvdXQgPSBmdW5jdGlvbiAoaW5zdGFudCwgb25GaW5pc2gpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuICAgIGlmIChpbnN0Ll9pc0Rlc3Ryb3llZCkge1xuICAgICAgcmV0dXJuIGluc3Q7XG4gICAgfVxuXG4gICAgdmFyIGVsZW1lbnQgPSBpbnN0Ll9lbGVtZW50O1xuICAgIHZhciBpc1Bvc2l0aW9uaW5nID0gaW5zdC5faXNQb3NpdGlvbmluZztcbiAgICB2YXIgbWlncmF0ZSA9IGluc3QuX21pZ3JhdGU7XG4gICAgdmFyIHJlbGVhc2UgPSBpbnN0Ll9yZWxlYXNlO1xuICAgIHZhciBpc0p1c3RSZWxlYXNlZCA9IHJlbGVhc2UuaXNBY3RpdmUgJiYgcmVsZWFzZS5pc1Bvc2l0aW9uaW5nU3RhcnRlZCA9PT0gZmFsc2U7XG4gICAgdmFyIGdyaWQgPSBpbnN0LmdldEdyaWQoKTtcbiAgICB2YXIgc2V0dGluZ3MgPSBncmlkLl9zZXR0aW5ncztcbiAgICB2YXIgYW5pbUR1cmF0aW9uID0gaXNKdXN0UmVsZWFzZWQgPyBzZXR0aW5ncy5kcmFnUmVsZWFzZUR1cmF0aW9uIDogc2V0dGluZ3MubGF5b3V0RHVyYXRpb247XG4gICAgdmFyIGFuaW1FYXNpbmcgPSBpc0p1c3RSZWxlYXNlZCA/IHNldHRpbmdzLmRyYWdSZWxlYXNlRWFzaW5nIDogc2V0dGluZ3MubGF5b3V0RWFzaW5nO1xuICAgIHZhciBhbmltRW5hYmxlZCA9ICFpbnN0YW50ICYmICFpbnN0Ll9za2lwTmV4dExheW91dEFuaW1hdGlvbiAmJiBhbmltRHVyYXRpb24gPiAwO1xuICAgIHZhciBpc0FuaW1hdGluZztcbiAgICB2YXIgb2Zmc2V0TGVmdDtcbiAgICB2YXIgb2Zmc2V0VG9wO1xuICAgIHZhciBjdXJyZW50TGVmdDtcbiAgICB2YXIgY3VycmVudFRvcDtcbiAgICB2YXIgdGFyZ2V0U3R5bGVzO1xuXG4gICAgLy8gSWYgdGhlIGl0ZW0gaXMgY3VycmVudGx5IHBvc2l0aW9uaW5nIHByb2Nlc3MgY3VycmVudCBsYXlvdXQgY2FsbGJhY2tcbiAgICAvLyBxdWV1ZSB3aXRoIGludGVycnVwdGVkIGZsYWcgb24gaWYgdGhlIGl0ZW0gaXMgY3VycmVudGx5IHBvc2l0aW9uaW5nLlxuICAgIGlmIChpc1Bvc2l0aW9uaW5nKSB7XG4gICAgICBwcm9jZXNzUXVldWUoaW5zdC5fbGF5b3V0UXVldWUsIHRydWUsIGluc3QpO1xuICAgIH1cblxuICAgIC8vIE1hcmsgcmVsZWFzZSBwb3NpdGlvbmluZyBhcyBzdGFydGVkLlxuICAgIGlmIChpc0p1c3RSZWxlYXNlZCkge1xuICAgICAgcmVsZWFzZS5pc1Bvc2l0aW9uaW5nU3RhcnRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gUHVzaCB0aGUgY2FsbGJhY2sgdG8gdGhlIGNhbGxiYWNrIHF1ZXVlLlxuICAgIGlmICh0eXBlb2Ygb25GaW5pc2ggPT09IHR5cGVGdW5jdGlvbikge1xuICAgICAgaW5zdC5fbGF5b3V0UXVldWUucHVzaChvbkZpbmlzaCk7XG4gICAgfVxuXG4gICAgLy8gR2V0IGl0ZW0gY29udGFpbmVyIG9mZnNldHMgYW5kIHRhcmdldCBzdHlsZXMuXG4gICAgb2Zmc2V0TGVmdCA9IHJlbGVhc2UuaXNBY3RpdmUgPyByZWxlYXNlLmNvbnRhaW5lckRpZmZYIDogbWlncmF0ZS5pc0FjdGl2ZSA/IG1pZ3JhdGUuY29udGFpbmVyRGlmZlggOiAwO1xuICAgIG9mZnNldFRvcCA9IHJlbGVhc2UuaXNBY3RpdmUgPyByZWxlYXNlLmNvbnRhaW5lckRpZmZZIDogbWlncmF0ZS5pc0FjdGl2ZSA/IG1pZ3JhdGUuY29udGFpbmVyRGlmZlkgOiAwO1xuICAgIHRhcmdldFN0eWxlcyA9IHt0cmFuc2Zvcm06IGdldFRyYW5zbGF0ZVN0cmluZyhpbnN0Ll9sZWZ0ICsgb2Zmc2V0TGVmdCwgaW5zdC5fdG9wICsgb2Zmc2V0VG9wKX07XG5cbiAgICAvLyBJZiBubyBhbmltYXRpb25zIGFyZSBuZWVkZWQsIGVhc3kgcGVhc3khXG4gICAgaWYgKCFhbmltRW5hYmxlZCkge1xuICAgICAgaXNQb3NpdGlvbmluZyAmJiByYWZMb29wLmNhbmNlbChyYWZRdWV1ZUxheW91dCwgaW5zdC5faWQpO1xuICAgICAgaXNBbmltYXRpbmcgPSBpbnN0Ll9hbmltYXRlLmlzQW5pbWF0aW5nKCk7XG4gICAgICBpbnN0Ll9zdG9wTGF5b3V0KGZhbHNlLCB0YXJnZXRTdHlsZXMpO1xuICAgICAgIWlzQW5pbWF0aW5nICYmIHNldFN0eWxlcyhlbGVtZW50LCB0YXJnZXRTdHlsZXMpO1xuICAgICAgaW5zdC5fc2tpcE5leHRMYXlvdXRBbmltYXRpb24gPSBmYWxzZTtcbiAgICAgIHJldHVybiBpbnN0Ll9maW5pc2hMYXlvdXQoKTtcbiAgICB9XG5cbiAgICAvLyBTZXQgaXRlbSBhcyBwb3NpdGlvbmluZy5cbiAgICBpbnN0Ll9pc1Bvc2l0aW9uaW5nID0gdHJ1ZTtcblxuICAgIC8vIEdldCB0aGUgZWxlbWVudCdzIGN1cnJlbnQgbGVmdCBhbmQgdG9wIHBvc2l0aW9uIGluIHRoZSByZWFkIGNhbGxiYWNrLlxuICAgIC8vIFRoZW4gaW4gdGhlIHdyaXRlIGNhbGxiYWNrIGRvIHRoZSBhbmltYXRpb24gaWYgbmVjZXNzYXJ5LlxuICAgIHJhZkxvb3AuYWRkKHJhZlF1ZXVlTGF5b3V0LCBpbnN0Ll9pZCwgZnVuY3Rpb24gKCkge1xuICAgICAgY3VycmVudExlZnQgPSBnZXRUcmFuc2xhdGVBc0Zsb2F0KGVsZW1lbnQsICd4JykgLSBvZmZzZXRMZWZ0O1xuICAgICAgY3VycmVudFRvcCA9IGdldFRyYW5zbGF0ZUFzRmxvYXQoZWxlbWVudCwgJ3knKSAtIG9mZnNldFRvcDtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIC8vIElmIHRoZSBpdGVtIGlzIGFscmVhZHkgaW4gY29ycmVjdCBwb3NpdGlvbiBsZXQncyBxdWl0IGVhcmx5LlxuICAgICAgaWYgKGluc3QuX2xlZnQgPT09IGN1cnJlbnRMZWZ0ICYmIGluc3QuX3RvcCA9PT0gY3VycmVudFRvcCkge1xuICAgICAgICBpc1Bvc2l0aW9uaW5nICYmIGluc3QuX3N0b3BMYXlvdXQoZmFsc2UsIHRhcmdldFN0eWxlcyk7XG4gICAgICAgIGluc3QuX2lzUG9zaXRpb25pbmcgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGluc3QuX2ZpbmlzaExheW91dCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgaXRlbSdzIHBvc2l0aW9uaW5nIGNsYXNzLlxuICAgICAgIWlzUG9zaXRpb25pbmcgJiYgYWRkQ2xhc3MoZWxlbWVudCwgc2V0dGluZ3MuaXRlbVBvc2l0aW9uaW5nQ2xhc3MpO1xuXG4gICAgICAvLyBBbmltYXRlLlxuICAgICAgaW5zdC5fYW5pbWF0ZS5zdGFydChcbiAgICAgICAge3RyYW5zZm9ybTogZ2V0VHJhbnNsYXRlU3RyaW5nKGN1cnJlbnRMZWZ0ICsgb2Zmc2V0TGVmdCwgY3VycmVudFRvcCArIG9mZnNldFRvcCl9LFxuICAgICAgICB0YXJnZXRTdHlsZXMsXG4gICAgICAgIHtcbiAgICAgICAgICBkdXJhdGlvbjogYW5pbUR1cmF0aW9uLFxuICAgICAgICAgIGVhc2luZzogYW5pbUVhc2luZyxcbiAgICAgICAgICBvbkZpbmlzaDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaW5zdC5fZmluaXNoTGF5b3V0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW5zdDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBQb3NpdGlvbiBpdGVtIGJhc2VkIG9uIGl0J3MgY3VycmVudCBkYXRhLlxuICAgKlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBtZW1iZXJvZiBJdGVtLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7SXRlbX1cbiAgICovXG4gIEl0ZW0ucHJvdG90eXBlLl9maW5pc2hMYXlvdXQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgaW5zdCA9IHRoaXM7XG5cbiAgICBpZiAoaW5zdC5faXNEZXN0cm95ZWQpIHtcbiAgICAgIHJldHVybiBpbnN0O1xuICAgIH1cblxuICAgIC8vIE1hcmsgdGhlIGl0ZW0gYXMgbm90IHBvc2l0aW9uaW5nIGFuZCByZW1vdmUgcG9zaXRpb25pbmcgY2xhc3Nlcy5cbiAgICBpZiAoaW5zdC5faXNQb3NpdGlvbmluZykge1xuICAgICAgaW5zdC5faXNQb3NpdGlvbmluZyA9IGZhbHNlO1xuICAgICAgcmVtb3ZlQ2xhc3MoaW5zdC5fZWxlbWVudCwgaW5zdC5nZXRHcmlkKCkuX3NldHRpbmdzLml0ZW1Qb3NpdGlvbmluZ0NsYXNzKTtcbiAgICB9XG5cbiAgICAvLyBGaW5pc2ggdXAgcmVsZWFzZS5cbiAgICBpZiAoaW5zdC5fcmVsZWFzZS5pc0FjdGl2ZSkge1xuICAgICAgaW5zdC5fcmVsZWFzZS5zdG9wKCk7XG4gICAgfVxuXG4gICAgLy8gRmluaXNoIHVwIG1pZ3JhdGlvbi5cbiAgICBpZiAoaW5zdC5fbWlncmF0ZS5pc0FjdGl2ZSkge1xuICAgICAgaW5zdC5fbWlncmF0ZS5zdG9wKCk7XG4gICAgfVxuXG4gICAgLy8gUHJvY2VzcyB0aGUgY2FsbGJhY2sgcXVldWUuXG4gICAgcHJvY2Vzc1F1ZXVlKGluc3QuX2xheW91dFF1ZXVlLCBmYWxzZSwgaW5zdCk7XG5cbiAgICByZXR1cm4gaW5zdDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBTdG9wIGl0ZW0ncyBwb3NpdGlvbiBhbmltYXRpb24gaWYgaXQgaXMgY3VycmVudGx5IGFuaW1hdGluZy5cbiAgICpcbiAgICogQHByb3RlY3RlZFxuICAgKiBAbWVtYmVyb2YgSXRlbS5wcm90b3R5cGVcbiAgICogQHBhcmFtIHtCb29sZWFufSBbcHJvY2Vzc0xheW91dFF1ZXVlPWZhbHNlXVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3RhcmdldFN0eWxlc11cbiAgICogQHJldHVybnMge0l0ZW19XG4gICAqL1xuICBJdGVtLnByb3RvdHlwZS5fc3RvcExheW91dCA9IGZ1bmN0aW9uIChwcm9jZXNzTGF5b3V0UXVldWUsIHRhcmdldFN0eWxlcykge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuXG4gICAgaWYgKGluc3QuX2lzRGVzdHJveWVkIHx8ICFpbnN0Ll9pc1Bvc2l0aW9uaW5nKSB7XG4gICAgICByZXR1cm4gaW5zdDtcbiAgICB9XG5cbiAgICAvLyBDYW5jZWwgYW5pbWF0aW9uIGluaXQuXG4gICAgcmFmTG9vcC5jYW5jZWwocmFmUXVldWVMYXlvdXQsIGluc3QuX2lkKTtcblxuICAgIC8vIFN0b3AgYW5pbWF0aW9uLlxuICAgIGluc3QuX2FuaW1hdGUuc3RvcCh0YXJnZXRTdHlsZXMpO1xuXG4gICAgLy8gUmVtb3ZlIHBvc2l0aW9uaW5nIGNsYXNzLlxuICAgIHJlbW92ZUNsYXNzKGluc3QuX2VsZW1lbnQsIGluc3QuZ2V0R3JpZCgpLl9zZXR0aW5ncy5pdGVtUG9zaXRpb25pbmdDbGFzcyk7XG5cbiAgICAvLyBSZXNldCBzdGF0ZS5cbiAgICBpbnN0Ll9pc1Bvc2l0aW9uaW5nID0gZmFsc2U7XG5cbiAgICAvLyBQcm9jZXNzIGNhbGxiYWNrIHF1ZXVlLlxuICAgIGlmIChwcm9jZXNzTGF5b3V0UXVldWUpIHtcbiAgICAgIHByb2Nlc3NRdWV1ZShpbnN0Ll9sYXlvdXRRdWV1ZSwgdHJ1ZSwgaW5zdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3Q7XG5cbiAgfTtcblxuICBJdGVtLnByb3RvdHlwZS5fc2hvdyA9IGZ1bmN0aW9uIChpbnN0YW50LCBvbkZpbmlzaCkge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuXG4gICAgaWYgKGluc3QuX2lzRGVzdHJveWVkKSB7XG4gICAgICByZXR1cm4gaW5zdDtcbiAgICB9XG5cbiAgICB2YXIgZWxlbWVudCA9IGluc3QuX2VsZW1lbnQ7XG4gICAgdmFyIHF1ZXVlID0gaW5zdC5fdmlzaWJpbGl0eVF1ZXVlO1xuICAgIHZhciBjYWxsYmFjayA9IHR5cGVvZiBvbkZpbmlzaCA9PT0gdHlwZUZ1bmN0aW9uID8gb25GaW5pc2ggOiBudWxsO1xuICAgIHZhciBncmlkID0gaW5zdC5nZXRHcmlkKCk7XG4gICAgdmFyIHNldHRpbmdzID0gZ3JpZC5fc2V0dGluZ3M7XG5cbiAgICAvLyBJZiBpdGVtIGlzIHZpc2libGUgY2FsbCB0aGUgY2FsbGJhY2sgYW5kIGJlIGRvbmUgd2l0aCBpdC5cbiAgICBpZiAoIWluc3QuX2lzU2hvd2luZyAmJiAhaW5zdC5faXNIaWRkZW4pIHtcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGZhbHNlLCBpbnN0KTtcbiAgICAgIHJldHVybiBpbnN0O1xuICAgIH1cblxuICAgIC8vIElmIGl0ZW0gaXMgc2hvd2luZyBhbmQgZG9lcyBub3QgbmVlZCB0byBiZSBzaG93biBpbnN0YW50bHksIGxldCdzIGp1c3RcbiAgICAvLyBwdXNoIGNhbGxiYWNrIHRvIHRoZSBjYWxsYmFjayBxdWV1ZSBhbmQgYmUgZG9uZSB3aXRoIGl0LlxuICAgIGlmIChpbnN0Ll9pc1Nob3dpbmcgJiYgIWluc3RhbnQpIHtcbiAgICAgIGNhbGxiYWNrICYmIHF1ZXVlLnB1c2goY2FsbGJhY2spO1xuICAgICAgcmV0dXJuIGluc3Q7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGl0ZW0gaXMgaGlkaW5nIG9yIGhpZGRlbiBwcm9jZXNzIHRoZSBjdXJyZW50IHZpc2liaWxpdHkgY2FsbGJhY2tcbiAgICAvLyBxdWV1ZSB3aXRoIHRoZSBpbnRlcnJ1cHRlZCBmbGFnIGFjdGl2ZSwgdXBkYXRlIGNsYXNzZXMgYW5kIHNldCBkaXNwbGF5XG4gICAgLy8gdG8gYmxvY2sgaWYgbmVjZXNzYXJ5LlxuICAgIGlmICghaW5zdC5faXNTaG93aW5nKSB7XG4gICAgICBwcm9jZXNzUXVldWUocXVldWUsIHRydWUsIGluc3QpO1xuICAgICAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgc2V0dGluZ3MuaXRlbUhpZGRlbkNsYXNzKTtcbiAgICAgIGFkZENsYXNzKGVsZW1lbnQsIHNldHRpbmdzLml0ZW1WaXNpYmxlQ2xhc3MpO1xuICAgICAgIWluc3QuX2lzSGlkaW5nICYmIHNldFN0eWxlcyhlbGVtZW50LCB7ZGlzcGxheTogJ2Jsb2NrJ30pO1xuICAgIH1cblxuICAgIC8vIFB1c2ggY2FsbGJhY2sgdG8gdGhlIGNhbGxiYWNrIHF1ZXVlLlxuICAgIGNhbGxiYWNrICYmIHF1ZXVlLnB1c2goY2FsbGJhY2spO1xuXG4gICAgLy8gVXBkYXRlIGl0ZW0ncyBpbnRlcm5hbCBzdGF0ZXMuXG4gICAgaW5zdC5faXNBY3RpdmUgPSBpbnN0Ll9pc1Nob3dpbmcgPSB0cnVlO1xuICAgIGluc3QuX2lzSGlkaW5nID0gaW5zdC5faXNIaWRkZW4gPSBmYWxzZTtcblxuICAgIC8vIElmIHdlIG5lZWQgdG8gc2hvdyBpbnN0YW50bHkuXG4gICAgaWYgKGluc3RhbnQpIHtcbiAgICAgIGdyaWQuX2l0ZW1TaG93SGFuZGxlci5zdG9wKGluc3QsIHNldHRpbmdzLnZpc2libGVTdHlsZXMpO1xuICAgICAgaW5zdC5faXNTaG93aW5nID0gZmFsc2U7XG4gICAgICBwcm9jZXNzUXVldWUocXVldWUsIGZhbHNlLCBpbnN0KTtcbiAgICB9XG5cbiAgICAvLyBJZiB3ZSBuZWVkIHRvIGFuaW1hdGUuXG4gICAgZWxzZSB7XG4gICAgICBncmlkLl9pdGVtU2hvd0hhbmRsZXIuc3RhcnQoaW5zdCwgaW5zdGFudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWluc3QuX2lzSGlkZGVuKSB7XG4gICAgICAgICAgaW5zdC5faXNTaG93aW5nID0gZmFsc2U7XG4gICAgICAgICAgcHJvY2Vzc1F1ZXVlKHF1ZXVlLCBmYWxzZSwgaW5zdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBpbnN0O1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEhpZGUgaXRlbS5cbiAgICpcbiAgICogQHByb3RlY3RlZFxuICAgKiBAbWVtYmVyb2YgSXRlbS5wcm90b3R5cGVcbiAgICogQHBhcmFtIHtCb29sZWFufSBpbnN0YW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkZpbmlzaF1cbiAgICogQHJldHVybnMge0l0ZW19XG4gICAqL1xuICBJdGVtLnByb3RvdHlwZS5faGlkZSA9IGZ1bmN0aW9uIChpbnN0YW50LCBvbkZpbmlzaCkge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuXG4gICAgLy8gUmV0dXJuIGltbWVkaWF0ZWx5IGlmIHRoZSBpbnN0YW5jZSBpcyBkZXN0cm95ZWQuXG4gICAgaWYgKGluc3QuX2lzRGVzdHJveWVkKSB7XG4gICAgICByZXR1cm4gaW5zdDtcbiAgICB9XG5cbiAgICB2YXIgZWxlbWVudCA9IGluc3QuX2VsZW1lbnQ7XG4gICAgdmFyIHF1ZXVlID0gaW5zdC5fdmlzaWJpbGl0eVF1ZXVlO1xuICAgIHZhciBjYWxsYmFjayA9IHR5cGVvZiBvbkZpbmlzaCA9PT0gdHlwZUZ1bmN0aW9uID8gb25GaW5pc2ggOiBudWxsO1xuICAgIHZhciBncmlkID0gaW5zdC5nZXRHcmlkKCk7XG4gICAgdmFyIHNldHRpbmdzID0gZ3JpZC5fc2V0dGluZ3M7XG5cbiAgICAvLyBJZiBpdGVtIGlzIGFscmVhZHkgaGlkZGVuIGNhbGwgdGhlIGNhbGxiYWNrIGFuZCBiZSBkb25lIHdpdGggaXQuXG4gICAgaWYgKCFpbnN0Ll9pc0hpZGluZyAmJiBpbnN0Ll9pc0hpZGRlbikge1xuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soZmFsc2UsIGluc3QpO1xuICAgICAgcmV0dXJuIGluc3Q7XG4gICAgfVxuXG4gICAgLy8gSWYgaXRlbSBpcyBoaWRpbmcgYW5kIGRvZXMgbm90IG5lZWQgdG8gYmUgaGlkZGVuIGluc3RhbnRseSwgbGV0J3MganVzdFxuICAgIC8vIHB1c2ggY2FsbGJhY2sgdG8gdGhlIGNhbGxiYWNrIHF1ZXVlIGFuZCBiZSBkb25lIHdpdGggaXQuXG4gICAgaWYgKGluc3QuX2lzSGlkaW5nICYmICFpbnN0YW50KSB7XG4gICAgICBjYWxsYmFjayAmJiBxdWV1ZS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiBpbnN0O1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBpdGVtIGlzIHNob3dpbmcgb3IgdmlzaWJsZSBwcm9jZXNzIHRoZSBjdXJyZW50IHZpc2liaWxpdHkgY2FsbGJhY2tcbiAgICAvLyBxdWV1ZSB3aXRoIHRoZSBpbnRlcnJ1cHRlZCBmbGFnIGFjdGl2ZSwgdXBkYXRlIGNsYXNzZXMgYW5kIHNldCBkaXNwbGF5XG4gICAgLy8gdG8gYmxvY2sgaWYgbmVjZXNzYXJ5LlxuICAgIGlmICghaW5zdC5faXNIaWRpbmcpIHtcbiAgICAgIHByb2Nlc3NRdWV1ZShxdWV1ZSwgdHJ1ZSwgaW5zdCk7XG4gICAgICBhZGRDbGFzcyhlbGVtZW50LCBzZXR0aW5ncy5pdGVtSGlkZGVuQ2xhc3MpO1xuICAgICAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgc2V0dGluZ3MuaXRlbVZpc2libGVDbGFzcyk7XG4gICAgfVxuXG4gICAgLy8gUHVzaCBjYWxsYmFjayB0byB0aGUgY2FsbGJhY2sgcXVldWUuXG4gICAgY2FsbGJhY2sgJiYgcXVldWUucHVzaChjYWxsYmFjayk7XG5cbiAgICAvLyBVcGRhdGUgaXRlbSdzIGludGVybmFsIHN0YXRlcy5cbiAgICBpbnN0Ll9pc0hpZGRlbiA9IGluc3QuX2lzSGlkaW5nID0gdHJ1ZTtcbiAgICBpbnN0Ll9pc0FjdGl2ZSA9IGluc3QuX2lzU2hvd2luZyA9IGZhbHNlO1xuXG4gICAgLy8gSWYgd2UgbmVlZCB0byBoaWRlIGluc3RhbnRseS5cbiAgICBpZiAoaW5zdGFudCkge1xuICAgICAgZ3JpZC5faXRlbUhpZGVIYW5kbGVyLnN0b3AoaW5zdCwgc2V0dGluZ3MuaGlkZGVuU3R5bGVzKTtcbiAgICAgIGluc3QuX2lzSGlkaW5nID0gZmFsc2U7XG4gICAgICBpbnN0Ll9zdG9wTGF5b3V0KHRydWUsIHt0cmFuc2Zvcm06IGdldFRyYW5zbGF0ZVN0cmluZygwLCAwKX0pO1xuICAgICAgc2V0U3R5bGVzKGVsZW1lbnQsIHtkaXNwbGF5OiAnbm9uZSd9KTtcbiAgICAgIHByb2Nlc3NRdWV1ZShxdWV1ZSwgZmFsc2UsIGluc3QpO1xuICAgIH1cblxuICAgIC8vIElmIHdlIG5lZWQgdG8gYW5pbWF0ZS5cbiAgICBlbHNlIHtcbiAgICAgIGdyaWQuX2l0ZW1IaWRlSGFuZGxlci5zdGFydChpbnN0LCBpbnN0YW50LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpbnN0Ll9pc0hpZGRlbikge1xuICAgICAgICAgIGluc3QuX2lzSGlkaW5nID0gZmFsc2U7XG4gICAgICAgICAgaW5zdC5fc3RvcExheW91dCh0cnVlLCB7dHJhbnNmb3JtOiBnZXRUcmFuc2xhdGVTdHJpbmcoMCwgMCl9KTtcbiAgICAgICAgICBzZXRTdHlsZXMoZWxlbWVudCwge2Rpc3BsYXk6ICdub25lJ30pO1xuICAgICAgICAgIHByb2Nlc3NRdWV1ZShxdWV1ZSwgZmFsc2UsIGluc3QpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBEZXN0cm95IGl0ZW0gaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQG1lbWJlcm9mIEl0ZW0ucHJvdG90eXBlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3JlbW92ZUVsZW1lbnQ9ZmFsc2VdXG4gICAqIEByZXR1cm5zIHtJdGVtfVxuICAgKi9cbiAgSXRlbS5wcm90b3R5cGUuX2Rlc3Ryb3kgPSBmdW5jdGlvbiAocmVtb3ZlRWxlbWVudCkge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuXG4gICAgaWYgKGluc3QuX2lzRGVzdHJveWVkKSB7XG4gICAgICByZXR1cm4gaW5zdDtcbiAgICB9XG5cbiAgICB2YXIgZWxlbWVudCA9IGluc3QuX2VsZW1lbnQ7XG4gICAgdmFyIGdyaWQgPSBpbnN0LmdldEdyaWQoKTtcbiAgICB2YXIgc2V0dGluZ3MgPSBncmlkLl9zZXR0aW5ncztcbiAgICB2YXIgaW5kZXggPSBncmlkLl9pdGVtcy5pbmRleE9mKGluc3QpO1xuXG4gICAgLy8gRGVzdHJveSByZWxlYXNlIGFuZCBtaWdyYXRpb24uXG4gICAgaW5zdC5fcmVsZWFzZS5kZXN0cm95KCk7XG4gICAgaW5zdC5fbWlncmF0ZS5kZXN0cm95KCk7XG5cbiAgICAvLyBTdG9wIGFuaW1hdGlvbnMuXG4gICAgaW5zdC5fc3RvcExheW91dCh0cnVlLCB7fSk7XG4gICAgZ3JpZC5faXRlbVNob3dIYW5kbGVyLnN0b3AoaW5zdCwge30pO1xuICAgIGdyaWQuX2l0ZW1IaWRlSGFuZGxlci5zdG9wKGluc3QsIHt9KTtcblxuICAgIC8vIERlc3Ryb3kgZHJhZy5cbiAgICBpbnN0Ll9kcmFnICYmIGluc3QuX2RyYWcuZGVzdHJveSgpO1xuXG4gICAgLy8gRGVzdHJveSBhbmltYXRpb24gaGFuZGxlcnMuXG4gICAgaW5zdC5fYW5pbWF0ZS5kZXN0cm95KCk7XG4gICAgaW5zdC5fYW5pbWF0ZUNoaWxkLmRlc3Ryb3koKTtcblxuICAgIC8vIEhhbmRsZSB2aXNpYmlsaXR5IGNhbGxiYWNrIHF1ZXVlLCBmaXJlIGFsbCB1bmNvbXBsZXRlZCBjYWxsYmFja3Mgd2l0aFxuICAgIC8vIGludGVycnVwdGVkIGZsYWcuXG4gICAgcHJvY2Vzc1F1ZXVlKGluc3QuX3Zpc2liaWxpdHlRdWV1ZSwgdHJ1ZSwgaW5zdCk7XG5cbiAgICAvLyBSZW1vdmUgYWxsIGlubGluZSBzdHlsZXMuXG4gICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgaW5zdC5fY2hpbGQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuXG4gICAgLy8gUmVtb3ZlIGNsYXNzZXMuXG4gICAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgc2V0dGluZ3MuaXRlbVBvc2l0aW9uaW5nQ2xhc3MpO1xuICAgIHJlbW92ZUNsYXNzKGVsZW1lbnQsIHNldHRpbmdzLml0ZW1EcmFnZ2luZ0NsYXNzKTtcbiAgICByZW1vdmVDbGFzcyhlbGVtZW50LCBzZXR0aW5ncy5pdGVtUmVsZWFzaW5nQ2xhc3MpO1xuICAgIHJlbW92ZUNsYXNzKGVsZW1lbnQsIHNldHRpbmdzLml0ZW1DbGFzcyk7XG4gICAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgc2V0dGluZ3MuaXRlbVZpc2libGVDbGFzcyk7XG4gICAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgc2V0dGluZ3MuaXRlbUhpZGRlbkNsYXNzKTtcblxuICAgIC8vIFJlbW92ZSBpdGVtIGZyb20gR3JpZCBpbnN0YW5jZSBpZiBpdCBzdGlsbCBleGlzdHMgdGhlcmUuXG4gICAgaW5kZXggPiAtMSAmJiBncmlkLl9pdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgLy8gUmVtb3ZlIGVsZW1lbnQgZnJvbSBET00uXG4gICAgcmVtb3ZlRWxlbWVudCAmJiBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG5cbiAgICAvLyBSZW1vdmUgaXRlbSBpbnN0YW5jZSBmcm9tIHRoZSBpdGVtIGluc3RhbmNlcyBjb2xsZWN0aW9uLlxuICAgIGl0ZW1JbnN0YW5jZXNbaW5zdC5faWRdID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gVXBkYXRlIGl0ZW0gc3RhdGVzIChtb3N0bHkganVzdCBmb3IgZ29vZCBtZWFzdXJlKS5cbiAgICBpbnN0Ll9pc0FjdGl2ZSA9IGluc3QuX2lzUG9zaXRpb25pbmcgPSBpbnN0Ll9pc0hpZGluZyA9IGluc3QuX2lzU2hvd2luZyA9IGZhbHNlO1xuICAgIGluc3QuX2lzRGVzdHJveWVkID0gaW5zdC5faXNIaWRkZW4gPSB0cnVlO1xuXG4gICAgcmV0dXJuIGluc3Q7XG5cbiAgfTtcblxuICAvKipcbiAgICogTGF5b3V0XG4gICAqICoqKioqKlxuICAgKi9cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBMYXlvdXQgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNsYXNzXG4gICAqIEBwYXJhbSB7R3JpZH0gZ3JpZFxuICAgKiBAcGFyYW0ge0l0ZW1bXX0gaXRlbXNcbiAgICovXG4gIGZ1bmN0aW9uIExheW91dChncmlkLCBpdGVtcykge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuICAgIHZhciBsYXlvdXRTZXR0aW5ncyA9IGdyaWQuX3NldHRpbmdzLmxheW91dDtcblxuICAgIC8vIENsb25lIGl0ZW1zLlxuICAgIGl0ZW1zID0gaXRlbXMuY29uY2F0KCk7XG5cbiAgICAvLyBMZXQncyBtYWtlIHN1cmUgd2UgaGF2ZSB0aGUgY29ycmVjdCBjb250YWluZXIgZGltZW5zaW9ucyBiZWZvcmUgZ29pbmdcbiAgICAvLyBmdXJ0aGVyLlxuICAgIGdyaWQuX3JlZnJlc2hEaW1lbnNpb25zKCk7XG5cbiAgICB2YXIgd2lkdGggPSBncmlkLl93aWR0aCAtIGdyaWQuX2JvcmRlci5sZWZ0IC0gZ3JpZC5fYm9yZGVyLnJpZ2h0O1xuICAgIHZhciBoZWlnaHQgPSBncmlkLl9oZWlnaHQgLSBncmlkLl9ib3JkZXIudG9wIC0gZ3JpZC5fYm9yZGVyLmJvdHRvbTtcbiAgICB2YXIgaXNDdXN0b21MYXlvdXQgPSB0eXBlb2YgbGF5b3V0U2V0dGluZ3MgPT09IHR5cGVGdW5jdGlvbjtcbiAgICB2YXIgbGF5b3V0ID0gaXNDdXN0b21MYXlvdXQgPyBsYXlvdXRTZXR0aW5ncyhpdGVtcywgd2lkdGgsIGhlaWdodCkgOlxuICAgICAgbXV1cmlMYXlvdXQoaXRlbXMsIHdpZHRoLCBoZWlnaHQsIGlzUGxhaW5PYmplY3QobGF5b3V0U2V0dGluZ3MpID8gbGF5b3V0U2V0dGluZ3MgOiB7fSk7XG5cbiAgICAvLyBTZXQgaW5zdGFuY2UgZGF0YSBiYXNlZCBvbiBsYXlvdXQgZGF0YS5cbiAgICBpbnN0LnNsb3RzID0gbGF5b3V0LnNsb3RzO1xuICAgIGluc3Quc2V0V2lkdGggPSBsYXlvdXQuc2V0V2lkdGggfHwgZmFsc2U7XG4gICAgaW5zdC5zZXRIZWlnaHQgPSBsYXlvdXQuc2V0SGVpZ2h0IHx8IGZhbHNlO1xuICAgIGluc3Qud2lkdGggPSBsYXlvdXQud2lkdGg7XG4gICAgaW5zdC5oZWlnaHQgPSBsYXlvdXQuaGVpZ2h0O1xuXG4gIH1cblxuICAvKipcbiAgICogRW1pdHRlclxuICAgKiAqKioqKioqXG4gICAqL1xuXG4gIC8qKlxuICAgKiBFdmVudCBlbWl0dGVyIGNvbnN0cnVjdG9yLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjbGFzc1xuICAgKi9cbiAgZnVuY3Rpb24gRW1pdHRlcigpIHtcblxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHRoaXMuX2lzRGVzdHJveWVkID0gZmFsc2U7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0dGVyIC0gUHVibGljIHByb3RvdHlwZSBtZXRob2RzXG4gICAqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICovXG5cbiAgLyoqXG4gICAqIEJpbmQgYW4gZXZlbnQgbGlzdGVuZXIuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEVtaXR0ZXIucHJvdG90eXBlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgKiBAcmV0dXJucyB7RW1pdHRlcn1cbiAgICovXG4gIEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50LCBsaXN0ZW5lcikge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuXG4gICAgaWYgKGluc3QuX2lzRGVzdHJveWVkKSB7XG4gICAgICByZXR1cm4gaW5zdDtcbiAgICB9XG5cbiAgICB2YXIgbGlzdGVuZXJzID0gaW5zdC5fZXZlbnRzW2V2ZW50XSB8fCBbXTtcbiAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgaW5zdC5fZXZlbnRzW2V2ZW50XSA9IGxpc3RlbmVycztcblxuICAgIHJldHVybiBpbnN0O1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEJpbmQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCBpcyB0cmlnZ2VyZWQgb25seSBvbmNlLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBFbWl0dGVyLnByb3RvdHlwZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAgICogQHJldHVybnMge0VtaXR0ZXJ9XG4gICAqL1xuICBFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gKGV2ZW50LCBsaXN0ZW5lcikge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuICAgIHJldHVybiB0aGlzLm9uKGV2ZW50LCBmdW5jdGlvbiBjYWxsYmFjaygpIHtcbiAgICAgIGluc3Qub2ZmKGV2ZW50LCBjYWxsYmFjayk7XG4gICAgICBsaXN0ZW5lci5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH0pO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIFVuYmluZCBhbGwgZXZlbnQgbGlzdGVuZXJzIHRoYXQgbWF0Y2ggdGhlIHByb3ZpZGVkIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBFbWl0dGVyLnByb3RvdHlwZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAgICogQHJldHVybnMge0VtaXR0ZXJ9XG4gICAqL1xuICBFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XG5cbiAgICB2YXIgaW5zdCA9IHRoaXM7XG5cbiAgICBpZiAoaW5zdC5faXNEZXN0cm95ZWQpIHtcbiAgICAgIHJldHVybiBpbnN0O1xuICAgIH1cblxuICAgIHZhciBsaXN0ZW5lcnMgPSBpbnN0Ll9ldmVudHNbZXZlbnRdIHx8IFtdO1xuICAgIHZhciBpID0gbGlzdGVuZXJzLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlmIChsaXN0ZW5lciA9PT0gbGlzdGVuZXJzW2ldKSB7XG4gICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3Q7XG5cbiAgfTtcblxuICAvKipcbiAgICogRW1pdCBhbGwgbGlzdGVuZXJzIGluIGEgc3BlY2lmaWVkIGV2ZW50IHdpdGggdGhlIHByb3ZpZGVkIGFyZ3VtZW50cy5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgRW1pdHRlci5wcm90b3R5cGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7Kn0gW2FyZzFdXG4gICAqIEBwYXJhbSB7Kn0gW2FyZzJdXG4gICAqIEBwYXJhbSB7Kn0gW2FyZzNdXG4gICAqIEByZXR1cm5zIHtFbWl0dGVyfVxuICAgKi9cbiAgRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChldmVudCwgYXJnMSwgYXJnMiwgYXJnMykge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuXG4gICAgaWYgKGluc3QuX2lzRGVzdHJveWVkKSB7XG4gICAgICByZXR1cm4gaW5zdDtcbiAgICB9XG5cbiAgICB2YXIgbGlzdGVuZXJzID0gaW5zdC5fZXZlbnRzW2V2ZW50XSB8fCBbXTtcbiAgICB2YXIgbGlzdGVuZXJzTGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICB2YXIgYXJnc0xlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuICAgIHZhciBpO1xuXG4gICAgaWYgKGxpc3RlbmVyc0xlbmd0aCkge1xuICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLmNvbmNhdCgpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxpc3RlbmVyc0xlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFyZ3NMZW5ndGggPT09IDAgPyBsaXN0ZW5lcnNbaV0oKSA6XG4gICAgICAgIGFyZ3NMZW5ndGggPT09IDEgPyBsaXN0ZW5lcnNbaV0oYXJnMSkgOlxuICAgICAgICBhcmdzTGVuZ3RoID09PSAyID8gbGlzdGVuZXJzW2ldKGFyZzEsIGFyZzIpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnNbaV0oYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3Q7XG5cbiAgfTtcblxuICAvKipcbiAgICogRGVzdHJveSBlbWl0dGVyIGluc3RhbmNlLiBCYXNpY2FsbHkganVzdCByZW1vdmVzIGFsbCBib3VuZCBsaXN0ZW5lcnMuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEVtaXR0ZXIucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHtFbWl0dGVyfVxuICAgKi9cbiAgRW1pdHRlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuICAgIGlmIChpbnN0Ll9pc0Rlc3Ryb3llZCkge1xuICAgICAgcmV0dXJuIGluc3Q7XG4gICAgfVxuXG4gICAgdmFyIGV2ZW50TmFtZXMgPSBPYmplY3Qua2V5cyhpbnN0Ll9ldmVudHMpO1xuICAgIHZhciBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGV2ZW50TmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGluc3QuX2V2ZW50c1tldmVudE5hbWVzW2ldXSA9IG51bGw7XG4gICAgfVxuXG4gICAgaW5zdC5faXNEZXN0cm95ZWQgPSB0cnVlO1xuXG4gICAgcmV0dXJuIGluc3Q7XG5cbiAgfTtcblxuICAvKipcbiAgICogSXRlbUFuaW1hdGVcbiAgICogKioqKioqKioqKipcbiAgICovXG5cbiAgLyoqXG4gICAqIE11dXJpJ3MgaW50ZXJuYWwgYW5pbWF0aW9uIGVuZ2luZS4gVXNlcyBXZWIgQW5pbWF0aW9ucyBBUEkuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNsYXNzXG4gICAqIEBwYXJhbSB7SXRlbX0gaXRlbVxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAqL1xuICBmdW5jdGlvbiBJdGVtQW5pbWF0ZShpdGVtLCBlbGVtZW50KSB7XG5cbiAgICB2YXIgaW5zdCA9IHRoaXM7XG4gICAgaW5zdC5faXRlbSA9IGl0ZW07XG4gICAgaW5zdC5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgaW5zdC5fYW5pbWF0aW9uID0gbnVsbDtcbiAgICBpbnN0Ll9wcm9wc1RvID0gbnVsbDtcbiAgICBpbnN0Ll9pc0Rlc3Ryb3llZCA9IGZhbHNlO1xuXG4gIH1cblxuICAvKipcbiAgICogSXRlbUFuaW1hdGUgLSBQdWJsaWMgcHJvdG90eXBlIG1ldGhvZHNcbiAgICogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICovXG5cbiAgLyoqXG4gICAqIFN0YXJ0IGluc3RhbmNlJ3MgYW5pbWF0aW9uLiBBdXRvbWF0aWNhbGx5IHN0b3BzIGN1cnJlbnQgYW5pbWF0aW9uIGlmIGl0IGlzXG4gICAqIHJ1bm5pbmcuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW1BbmltYXRlLnByb3RvdHlwZVxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHNGcm9tXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wc1RvXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmR1cmF0aW9uPTMwMF1cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmVhc2luZz0nZWFzZSddXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLm9uRmluaXNoXVxuICAgKi9cbiAgSXRlbUFuaW1hdGUucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKHByb3BzRnJvbSwgcHJvcHNUbywgb3B0aW9ucykge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuXG4gICAgaWYgKGluc3QuX2lzRGVzdHJveWVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHZhciBjYWxsYmFjayA9IHR5cGVvZiBvcHRzLm9uRmluaXNoID09PSB0eXBlRnVuY3Rpb24gPyBvcHRzLm9uRmluaXNoIDogbnVsbDtcbiAgICB2YXIgc2hvdWxkU3RvcDtcblxuICAgIC8vIElmIGl0ZW0gaXMgYmVpbmcgYW5pbWF0ZSBjaGVjayBpZiB0aGUgdGFyZ2V0IGFuaW1hdGlvbiBwcm9wZXJ0aWVzIGVxdWFsXG4gICAgLy8gdG8gdGhlIHByb3BlcnRpZXMgaW4gdGhlIGN1cnJlbnQgYW5pbWF0aW9uLiBJZiB0aGV5IG1hdGNoIHdlIGNhbiBqdXN0IGxldFxuICAgIC8vIHRoZSBhbmltYXRpb24gY29udGludWUgYW5kIGJlIGRvbmUgd2l0aCBpdCAoYW5kIG9mIGNvdXJzZSBjaGFuZ2UgdGhlXG4gICAgLy8gY2FjaGVkIGNhbGxiYWNrKS4gSWYgdGhlIGFuaW1hdGlvbiBwcm9wZXJ0aWVzIGRvIG5vdCBtYXRjaCB3ZSBuZWVkIHRvXG4gICAgLy8gc3RvcCB0aGUgb25nb2luZyBhbmltYXRpb24uXG4gICAgaWYgKGluc3QuX2FuaW1hdGlvbikge1xuICAgICAgc2hvdWxkU3RvcCA9IE9iamVjdC5rZXlzKHByb3BzVG8pLnNvbWUoZnVuY3Rpb24gKHByb3BOYW1lKSB7XG4gICAgICAgIHJldHVybiBwcm9wc1RvW3Byb3BOYW1lXSAhPT0gaW5zdC5fcHJvcHNUb1twcm9wTmFtZV07XG4gICAgICB9KTtcbiAgICAgIGlmIChzaG91bGRTdG9wKSB7XG4gICAgICAgIGluc3QuX2FuaW1hdGlvbi5jYW5jZWwoKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpbnN0Ll9hbmltYXRpb24ub25maW5pc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaW5zdC5fYW5pbWF0aW9uID0gaW5zdC5fcHJvcHNUbyA9IG51bGw7XG4gICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENhY2hlIHRhcmdldCBwcm9wcy5cbiAgICBpbnN0Ll9wcm9wc1RvID0gcHJvcHNUbztcblxuICAgIC8vIFN0YXJ0IHRoZSBhbmltYXRpb24uXG4gICAgaW5zdC5fYW5pbWF0aW9uID0gaW5zdC5fZWxlbWVudC5hbmltYXRlKFtwcm9wc0Zyb20sIHByb3BzVG9dLCB7XG4gICAgICBkdXJhdGlvbjogb3B0cy5kdXJhdGlvbiB8fCAzMDAsXG4gICAgICBlYXNpbmc6IG9wdHMuZWFzaW5nIHx8ICdlYXNlJ1xuICAgIH0pO1xuXG4gICAgLy8gQmluZCBhbmltYXRpb24gZmluaXNoIGNhbGxiYWNrLlxuICAgIGluc3QuX2FuaW1hdGlvbi5vbmZpbmlzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGluc3QuX2FuaW1hdGlvbiA9IGluc3QuX3Byb3BzVG8gPSBudWxsO1xuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICB9O1xuXG4gICAgLy8gU2V0IHRoZSBlbmQgc3R5bGVzLlxuICAgIHNldFN0eWxlcyhpbnN0Ll9lbGVtZW50LCBwcm9wc1RvKTtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBTdG9wIGluc3RhbmNlJ3MgY3VycmVudCBhbmltYXRpb24gaWYgcnVubmluZy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIEl0ZW1BbmltYXRlLnByb3RvdHlwZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW2N1cnJlbnRQcm9wc11cbiAgICovXG4gIEl0ZW1BbmltYXRlLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKGN1cnJlbnRQcm9wcykge1xuXG4gICAgdmFyIGluc3QgPSB0aGlzO1xuXG4gICAgaWYgKCFpbnN0Ll9pc0Rlc3Ryb3llZCAmJiBpbnN0Ll9hbmltYXRpb24pIHtcbiAgICAgIHNldFN0eWxlcyhpbnN0Ll9lbGVtZW50LCBjdXJyZW50UHJvcHMgfHwgZ2V0Q3VycmVudFN0eWxlcyhpbnN0Ll9lbGVtZW50LCBpbnN0Ll9wcm9wc1RvKSk7XG4gICAgICBpbnN0Ll9hbmltYXRpb24uY2FuY2VsKCk7XG4gICAgICBpbnN0Ll9hbmltYXRpb24gPSBpbnN0Ll9wcm9wc1RvID0gbnVsbDtcbiAgICB9XG5cbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIGl0ZW0gaXMgYmVpbmcgYW5pbWF0ZWQgY3VycmVudGx5LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgSXRlbUFuaW1hdGUucHJvdG90eXBlXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuICBJdGVtQW5pbWF0ZS5wcm90b3R5cGUuaXNBbmltYXRpbmcgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4gISF0aGlzLl9hbmltYXRpb247XG5cbiAgfTtcblxuICAvKipcbiAgICogRGVzdHJveSB0aGUgaW5zdGFuY2UgYW5kIHN0b3AgY3VycmVudCBhbmltYXRpb24gaWYgaXQgaXMgcnVubmluZy5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbUFuaW1hdGUucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgSXRlbUFuaW1hdGUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgaW5zdCA9IHRoaXM7XG5cbiAgICBpZiAoIWluc3QuX2lzRGVzdHJveWVkKSB7XG4gICAgICBpbnN0LnN0b3AoKTtcbiAgICAgIGluc3QuX2l0ZW0gPSBpbnN0Ll9lbGVtZW50ID0gbnVsbDtcbiAgICAgIGluc3QuX2lzRGVzdHJveWVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgfTtcblxuICAvKipcbiAgICogSXRlbU1pZ3JhdGVcbiAgICogKioqKioqKioqKipcbiAgICovXG5cbiAgLyoqXG4gICAqIFRoZSBtaWdyYXRlIHByb2Nlc3MgaGFuZGxlciBjb25zdHJ1Y3Rvci5cbiAgICpcbiAgICogQGNsYXNzXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7SXRlbX0gaXRlbVxuICAgKi9cbiAgZnVuY3Rpb24gSXRlbU1pZ3JhdGUoaXRlbSkge1xuXG4gICAgdmFyIG1pZ3JhdGUgPSB0aGlzO1xuXG4gICAgLy8gUHJpdmF0ZSBwcm9wcy5cbiAgICBtaWdyYXRlLl9pdGVtSWQgPSBpdGVtLl9pZDtcbiAgICBtaWdyYXRlLl9pc0Rlc3Ryb3llZCA9IGZhbHNlO1xuXG4gICAgLy8gUHVibGljIHByb3BzLlxuICAgIG1pZ3JhdGUuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICBtaWdyYXRlLmNvbnRhaW5lciA9IGZhbHNlO1xuICAgIG1pZ3JhdGUuY29udGFpbmVyRGlmZlggPSAwO1xuICAgIG1pZ3JhdGUuY29udGFpbmVyRGlmZlkgPSAwO1xuXG4gIH1cblxuICAvKipcbiAgICogSXRlbU1pZ3JhdGUgLSBQdWJsaWMgcHJvdG90eXBlIG1ldGhvZHNcbiAgICogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICovXG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW1NaWdyYXRlLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7SXRlbU1pZ3JhdGV9XG4gICAqL1xuICBJdGVtTWlncmF0ZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBtaWdyYXRlID0gdGhpcztcblxuICAgIGlmICghbWlncmF0ZS5faXNEZXN0cm95ZWQpIHtcbiAgICAgIG1pZ3JhdGUuc3RvcCh0cnVlKTtcbiAgICAgIG1pZ3JhdGUuX2lzRGVzdHJveWVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWlncmF0ZTtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgSXRlbSBpbnN0YW5jZS5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbU1pZ3JhdGUucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHs/SXRlbX1cbiAgICovXG4gIEl0ZW1NaWdyYXRlLnByb3RvdHlwZS5nZXRJdGVtID0gZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIGl0ZW1JbnN0YW5jZXNbdGhpcy5faXRlbUlkXSB8fCBudWxsO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIFN0YXJ0IHRoZSBtaWdyYXRlIHByb2Nlc3Mgb2YgYW4gaXRlbS5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbU1pZ3JhdGUucHJvdG90eXBlXG4gICAqIEBwYXJhbSB7R3JpZH0gdGFyZ2V0R3JpZFxuICAgKiBAcGFyYW0ge0dyaWRTaW5nbGVJdGVtUXVlcnl9IHBvc2l0aW9uXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtjb250YWluZXJdXG4gICAqIEByZXR1cm5zIHtJdGVtTWlncmF0ZX1cbiAgICovXG4gIEl0ZW1NaWdyYXRlLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICh0YXJnZXRHcmlkLCBwb3NpdGlvbiwgY29udGFpbmVyKSB7XG5cbiAgICB2YXIgbWlncmF0ZSA9IHRoaXM7XG5cbiAgICBpZiAobWlncmF0ZS5faXNEZXN0cm95ZWQpIHtcbiAgICAgIHJldHVybiBtaWdyYXRlO1xuICAgIH1cblxuICAgIHZhciBpdGVtID0gbWlncmF0ZS5nZXRJdGVtKCk7XG4gICAgdmFyIGl0ZW1FbGVtZW50ID0gaXRlbS5fZWxlbWVudDtcbiAgICB2YXIgaXNJdGVtVmlzaWJsZSA9IGl0ZW0uaXNWaXNpYmxlKCk7XG4gICAgdmFyIGN1cnJlbnRHcmlkID0gaXRlbS5nZXRHcmlkKCk7XG4gICAgdmFyIGN1cnJlbnRHcmlkU3RuID0gY3VycmVudEdyaWQuX3NldHRpbmdzO1xuICAgIHZhciB0YXJnZXRHcmlkU3RuID0gdGFyZ2V0R3JpZC5fc2V0dGluZ3M7XG4gICAgdmFyIHRhcmdldEdyaWRFbGVtZW50ID0gdGFyZ2V0R3JpZC5fZWxlbWVudDtcbiAgICB2YXIgY3VycmVudEluZGV4ID0gY3VycmVudEdyaWQuX2l0ZW1zLmluZGV4T2YoaXRlbSk7XG4gICAgdmFyIHRhcmdldEluZGV4ID0gdHlwZW9mIHBvc2l0aW9uID09PSB0eXBlTnVtYmVyID8gcG9zaXRpb24gOiB0YXJnZXRHcmlkLl9pdGVtcy5pbmRleE9mKHRhcmdldEdyaWQuX2dldEl0ZW0ocG9zaXRpb24pKTtcbiAgICB2YXIgdGFyZ2V0Q29udGFpbmVyID0gY29udGFpbmVyIHx8IGJvZHk7XG4gICAgdmFyIGN1cnJlbnRDb250YWluZXI7XG4gICAgdmFyIG9mZnNldERpZmY7XG4gICAgdmFyIGNvbnRhaW5lckRpZmY7XG4gICAgdmFyIHRyYW5zbGF0ZVg7XG4gICAgdmFyIHRyYW5zbGF0ZVk7XG5cbiAgICAvLyBJZiB3ZSBoYXZlIGludmFsaWQgbmV3IGluZGV4LCBsZXQncyByZXR1cm4gaW1tZWRpYXRlbHkuXG4gICAgaWYgKHRhcmdldEluZGV4ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbWlncmF0ZTtcbiAgICB9XG5cbiAgICAvLyBOb3JtYWxpemUgdGFyZ2V0IGluZGV4IChmb3IgZXZlbnQgZGF0YSkuXG4gICAgdGFyZ2V0SW5kZXggPSBub3JtYWxpemVBcnJheUluZGV4KHRhcmdldEdyaWQuX2l0ZW1zLCB0YXJnZXRJbmRleCwgdHJ1ZSk7XG5cbiAgICAvLyBHZXQgY3VycmVudCB0cmFuc2xhdGVYIGFuZCB0cmFuc2xhdGVZIHZhbHVlcyBpZiBuZWVkZWQuXG4gICAgaWYgKGl0ZW0uaXNQb3NpdGlvbmluZygpIHx8IG1pZ3JhdGUuaXNBY3RpdmUgfHwgaXRlbS5pc1JlbGVhc2luZygpKSB7XG4gICAgICB0cmFuc2xhdGVYID0gZ2V0VHJhbnNsYXRlQXNGbG9hdChpdGVtRWxlbWVudCwgJ3gnKTtcbiAgICAgIHRyYW5zbGF0ZVkgPSBnZXRUcmFuc2xhdGVBc0Zsb2F0KGl0ZW1FbGVtZW50LCAneScpO1xuICAgIH1cblxuICAgIC8vIEFib3J0IGN1cnJlbnQgcG9zaXRpb25pbmcuXG4gICAgaWYgKGl0ZW0uaXNQb3NpdGlvbmluZygpKSB7XG4gICAgICBpdGVtLl9zdG9wTGF5b3V0KHRydWUsIHt0cmFuc2Zvcm06IGdldFRyYW5zbGF0ZVN0cmluZyh0cmFuc2xhdGVYLCB0cmFuc2xhdGVZKX0pO1xuICAgIH1cblxuICAgIC8vIEFib3J0IGN1cnJlbnQgbWlncmF0aW9uLlxuICAgIGlmIChtaWdyYXRlLmlzQWN0aXZlKSB7XG4gICAgICB0cmFuc2xhdGVYIC09IG1pZ3JhdGUuY29udGFpbmVyRGlmZlg7XG4gICAgICB0cmFuc2xhdGVZIC09IG1pZ3JhdGUuY29udGFpbmVyRGlmZlk7XG4gICAgICBtaWdyYXRlLnN0b3AodHJ1ZSwge3RyYW5zZm9ybTogZ2V0VHJhbnNsYXRlU3RyaW5nKHRyYW5zbGF0ZVgsIHRyYW5zbGF0ZVkpfSk7XG4gICAgfVxuXG4gICAgLy8gQWJvcnQgY3VycmVudCByZWxlYXNlLlxuICAgIGlmIChpdGVtLmlzUmVsZWFzaW5nKCkpIHtcbiAgICAgIHRyYW5zbGF0ZVggLT0gaXRlbS5fcmVsZWFzZS5jb250YWluZXJEaWZmWDtcbiAgICAgIHRyYW5zbGF0ZVkgLT0gaXRlbS5fcmVsZWFzZS5jb250YWluZXJEaWZmWTtcbiAgICAgIGl0ZW0uX3JlbGVhc2Uuc3RvcCh0cnVlLCB7dHJhbnNmb3JtOiBnZXRUcmFuc2xhdGVTdHJpbmcodHJhbnNsYXRlWCwgdHJhbnNsYXRlWSl9KTtcbiAgICB9XG5cbiAgICAvLyBTdG9wIGN1cnJlbnQgdmlzaWJpbGl0eSBhbmltYXRpb25zLlxuICAgIC8vIFRPRE86IFRoaXMgY2F1c2VzIHBvdGVudGlhbGx5IGxheW91dCB0aHJhc2hpbmcsIGJlY2F1c2Ugd2UgYXJlIG5vdFxuICAgIC8vIGZlZWRpbmcgYW55IHN0eWxlcyB0byB0aGUgc3RvcCBoYW5kbGVycy5cbiAgICBjdXJyZW50R3JpZC5faXRlbVNob3dIYW5kbGVyLnN0b3AoaXRlbSk7XG4gICAgY3VycmVudEdyaWQuX2l0ZW1IaWRlSGFuZGxlci5zdG9wKGl0ZW0pO1xuXG4gICAgLy8gRGVzdHJveSBjdXJyZW50IGRyYWcuXG4gICAgaWYgKGl0ZW0uX2RyYWcpIHtcbiAgICAgIGl0ZW0uX2RyYWcuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIC8vIERlc3Ryb3kgY3VycmVudCBhbmltYXRpb24gaGFuZGxlcnMuXG4gICAgaXRlbS5fYW5pbWF0ZS5kZXN0cm95KCk7XG4gICAgaXRlbS5fYW5pbWF0ZUNoaWxkLmRlc3Ryb3koKTtcblxuICAgIC8vIFByb2Nlc3MgY3VycmVudCB2aXNpYmlsaXR5IGFuaW1hdGlvbiBxdWV1ZS5cbiAgICBwcm9jZXNzUXVldWUoaXRlbS5fdmlzaWJpbGl0eVF1ZXVlLCB0cnVlLCBpdGVtKTtcblxuICAgIC8vIEVtaXQgYmVmb3JlU2VuZCBldmVudC5cbiAgICBjdXJyZW50R3JpZC5fZW1pdChldkJlZm9yZVNlbmQsIHtcbiAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICBmcm9tR3JpZDogY3VycmVudEdyaWQsXG4gICAgICBmcm9tSW5kZXg6IGN1cnJlbnRJbmRleCxcbiAgICAgIHRvR3JpZDogdGFyZ2V0R3JpZCxcbiAgICAgIHRvSW5kZXg6IHRhcmdldEluZGV4XG4gICAgfSk7XG5cbiAgICAvLyBFbWl0IGJlZm9yZVJlY2VpdmUgZXZlbnQuXG4gICAgdGFyZ2V0R3JpZC5fZW1pdChldkJlZm9yZVJlY2VpdmUsIHtcbiAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICBmcm9tR3JpZDogY3VycmVudEdyaWQsXG4gICAgICBmcm9tSW5kZXg6IGN1cnJlbnRJbmRleCxcbiAgICAgIHRvR3JpZDogdGFyZ2V0R3JpZCxcbiAgICAgIHRvSW5kZXg6IHRhcmdldEluZGV4XG4gICAgfSk7XG5cbiAgICAvLyBSZW1vdmUgY3VycmVudCBjbGFzc25hbWVzLlxuICAgIHJlbW92ZUNsYXNzKGl0ZW1FbGVtZW50LCBjdXJyZW50R3JpZFN0bi5pdGVtQ2xhc3MpO1xuICAgIHJlbW92ZUNsYXNzKGl0ZW1FbGVtZW50LCBjdXJyZW50R3JpZFN0bi5pdGVtVmlzaWJsZUNsYXNzKTtcbiAgICByZW1vdmVDbGFzcyhpdGVtRWxlbWVudCwgY3VycmVudEdyaWRTdG4uaXRlbUhpZGRlbkNsYXNzKTtcblxuICAgIC8vIEFkZCBuZXcgY2xhc3NuYW1lcy5cbiAgICBhZGRDbGFzcyhpdGVtRWxlbWVudCwgdGFyZ2V0R3JpZFN0bi5pdGVtQ2xhc3MpO1xuICAgIGFkZENsYXNzKGl0ZW1FbGVtZW50LCBpc0l0ZW1WaXNpYmxlID8gdGFyZ2V0R3JpZFN0bi5pdGVtVmlzaWJsZUNsYXNzIDogdGFyZ2V0R3JpZFN0bi5pdGVtSGlkZGVuQ2xhc3MpO1xuXG4gICAgLy8gTW92ZSBpdGVtIGluc3RhbmNlIGZyb20gY3VycmVudCBncmlkIHRvIHRhcmdldCBncmlkLlxuICAgIGN1cnJlbnRHcmlkLl9pdGVtcy5zcGxpY2UoY3VycmVudEluZGV4LCAxKTtcbiAgICBpbnNlcnRJdGVtc1RvQXJyYXkodGFyZ2V0R3JpZC5faXRlbXMsIGl0ZW0sIHRhcmdldEluZGV4KTtcblxuICAgIC8vIFVwZGF0ZSBpdGVtJ3MgZ3JpZCBpZCByZWZlcmVuY2UuXG4gICAgaXRlbS5fZ3JpZElkID0gdGFyZ2V0R3JpZC5faWQ7XG5cbiAgICAvLyBJbnN0YW50aWF0ZSBuZXcgYW5pbWF0aW9uIGNvbnRyb2xsZXJzLlxuICAgIGl0ZW0uX2FuaW1hdGUgPSBuZXcgR3JpZC5JdGVtQW5pbWF0ZShpdGVtLCBpdGVtRWxlbWVudCk7XG4gICAgaXRlbS5fYW5pbWF0ZUNoaWxkID0gbmV3IEdyaWQuSXRlbUFuaW1hdGUoaXRlbSwgaXRlbS5fY2hpbGQpO1xuXG4gICAgLy8gR2V0IGN1cnJlbnQgY29udGFpbmVyXG4gICAgY3VycmVudENvbnRhaW5lciA9IGl0ZW1FbGVtZW50LnBhcmVudE5vZGU7XG5cbiAgICAvLyBNb3ZlIHRoZSBpdGVtIGluc2lkZSB0aGUgdGFyZ2V0IGNvbnRhaW5lciBpZiBpdCdzIGRpZmZlcmVudCB0aGFuIHRoZVxuICAgIC8vIGN1cnJlbnQgY29udGFpbmVyLlxuICAgIGlmICh0YXJnZXRDb250YWluZXIgIT09IGN1cnJlbnRDb250YWluZXIpIHtcbiAgICAgIHRhcmdldENvbnRhaW5lci5hcHBlbmRDaGlsZChpdGVtRWxlbWVudCk7XG4gICAgICBvZmZzZXREaWZmID0gZ2V0T2Zmc2V0RGlmZih0YXJnZXRDb250YWluZXIsIGN1cnJlbnRDb250YWluZXIsIHRydWUpO1xuICAgICAgaWYgKHRyYW5zbGF0ZVggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0cmFuc2xhdGVYID0gZ2V0VHJhbnNsYXRlQXNGbG9hdChpdGVtRWxlbWVudCwgJ3gnKTtcbiAgICAgICAgdHJhbnNsYXRlWSA9IGdldFRyYW5zbGF0ZUFzRmxvYXQoaXRlbUVsZW1lbnQsICd5Jyk7XG4gICAgICB9XG4gICAgICBzZXRTdHlsZXMoaXRlbUVsZW1lbnQsIHt0cmFuc2Zvcm06IGdldFRyYW5zbGF0ZVN0cmluZyh0cmFuc2xhdGVYICsgb2Zmc2V0RGlmZi5sZWZ0LCB0cmFuc2xhdGVZICsgb2Zmc2V0RGlmZi50b3ApfSk7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIGNoaWxkIGVsZW1lbnQncyBzdHlsZXMgdG8gcmVmbGVjdCB0aGUgY3VycmVudCB2aXNpYmlsaXR5IHN0YXRlLlxuICAgIGl0ZW0uX2NoaWxkLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICBpZiAoaXNJdGVtVmlzaWJsZSkge1xuICAgICAgdGFyZ2V0R3JpZC5faXRlbVNob3dIYW5kbGVyLnN0YXJ0KGl0ZW0sIHRydWUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRhcmdldEdyaWQuX2l0ZW1IaWRlSGFuZGxlci5zdGFydChpdGVtLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgZGlzcGxheSBzdHlsZXMuXG4gICAgc2V0U3R5bGVzKGl0ZW1FbGVtZW50LCB7XG4gICAgICBkaXNwbGF5OiBpc0l0ZW1WaXNpYmxlID8gJ2Jsb2NrJyA6ICdoaWRkZW4nXG4gICAgfSk7XG5cbiAgICAvLyBHZXQgb2Zmc2V0IGRpZmYgZm9yIHRoZSBtaWdyYXRpb24gZGF0YS5cbiAgICBjb250YWluZXJEaWZmID0gZ2V0T2Zmc2V0RGlmZih0YXJnZXRDb250YWluZXIsIHRhcmdldEdyaWRFbGVtZW50LCB0cnVlKTtcblxuICAgIC8vIFVwZGF0ZSBpdGVtJ3MgY2FjaGVkIGRpbWVuc2lvbnMgYW5kIHNvcnQgZGF0YS5cbiAgICBpdGVtLl9yZWZyZXNoRGltZW5zaW9ucygpLl9yZWZyZXNoU29ydERhdGEoKTtcblxuICAgIC8vIENyZWF0ZSBuZXcgZHJhZyBoYW5kbGVyLlxuICAgIGl0ZW0uX2RyYWcgPSB0YXJnZXRHcmlkU3RuLmRyYWdFbmFibGVkID8gbmV3IEdyaWQuSXRlbURyYWcoaXRlbSkgOiBudWxsO1xuXG4gICAgLy8gU2V0dXAgbWlncmF0aW9uIGRhdGEuXG4gICAgbWlncmF0ZS5pc0FjdGl2ZSA9IHRydWU7XG4gICAgbWlncmF0ZS5jb250YWluZXIgPSB0YXJnZXRDb250YWluZXI7XG4gICAgbWlncmF0ZS5jb250YWluZXJEaWZmWCA9IGNvbnRhaW5lckRpZmYubGVmdDtcbiAgICBtaWdyYXRlLmNvbnRhaW5lckRpZmZZID0gY29udGFpbmVyRGlmZi50b3A7XG5cbiAgICAvLyBFbWl0IHNlbmQgZXZlbnQuXG4gICAgY3VycmVudEdyaWQuX2VtaXQoZXZTZW5kLCB7XG4gICAgICBpdGVtOiBpdGVtLFxuICAgICAgZnJvbUdyaWQ6IGN1cnJlbnRHcmlkLFxuICAgICAgZnJvbUluZGV4OiBjdXJyZW50SW5kZXgsXG4gICAgICB0b0dyaWQ6IHRhcmdldEdyaWQsXG4gICAgICB0b0luZGV4OiB0YXJnZXRJbmRleFxuICAgIH0pO1xuXG4gICAgLy8gRW1pdCByZWNlaXZlIGV2ZW50LlxuICAgIHRhcmdldEdyaWQuX2VtaXQoZXZSZWNlaXZlLCB7XG4gICAgICBpdGVtOiBpdGVtLFxuICAgICAgZnJvbUdyaWQ6IGN1cnJlbnRHcmlkLFxuICAgICAgZnJvbUluZGV4OiBjdXJyZW50SW5kZXgsXG4gICAgICB0b0dyaWQ6IHRhcmdldEdyaWQsXG4gICAgICB0b0luZGV4OiB0YXJnZXRJbmRleFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1pZ3JhdGU7XG5cbiAgfTtcblxuICAvKipcbiAgICogRW5kIHRoZSBtaWdyYXRlIHByb2Nlc3Mgb2YgYW4gaXRlbS4gVGhpcyBtZXRob2QgY2FuIGJlIHVzZWQgdG8gYWJvcnQgYW5cbiAgICogb25nb2luZyBtaWdyYXRlIHByb2Nlc3MgKGFuaW1hdGlvbikgb3IgZmluaXNoIHRoZSBtaWdyYXRlIHByb2Nlc3MuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW1NaWdyYXRlLnByb3RvdHlwZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFthYm9ydD1mYWxzZV1cbiAgICogIC0gU2hvdWxkIHRoZSBtaWdyYXRpb24gYmUgYWJvcnRlZD9cbiAgICogQHBhcmFtIHtPYmplY3R9IFtjdXJyZW50U3R5bGVzXVxuICAgKiAgLSBPcHRpb25hbCBjdXJyZW50IHRyYW5zbGF0ZVggYW5kIHRyYW5zbGF0ZVkgc3R5bGVzLlxuICAgKiBAcmV0dXJucyB7SXRlbU1pZ3JhdGV9XG4gICAqL1xuICBJdGVtTWlncmF0ZS5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uIChhYm9ydCwgY3VycmVudFN0eWxlcykge1xuXG4gICAgdmFyIG1pZ3JhdGUgPSB0aGlzO1xuXG4gICAgaWYgKG1pZ3JhdGUuX2lzRGVzdHJveWVkIHx8ICFtaWdyYXRlLmlzQWN0aXZlKSB7XG4gICAgICByZXR1cm4gbWlncmF0ZTtcbiAgICB9XG5cbiAgICB2YXIgaXRlbSA9IG1pZ3JhdGUuZ2V0SXRlbSgpO1xuICAgIHZhciBlbGVtZW50ID0gaXRlbS5fZWxlbWVudDtcbiAgICB2YXIgZ3JpZCA9IGl0ZW0uZ2V0R3JpZCgpO1xuICAgIHZhciBncmlkRWxlbWVudCA9IGdyaWQuX2VsZW1lbnQ7XG4gICAgdmFyIHRyYW5zbGF0ZVg7XG4gICAgdmFyIHRyYW5zbGF0ZVk7XG5cbiAgICBpZiAobWlncmF0ZS5jb250YWluZXIgIT09IGdyaWRFbGVtZW50KSB7XG4gICAgICBpZiAoIWN1cnJlbnRTdHlsZXMpIHtcbiAgICAgICAgdHJhbnNsYXRlWCA9IGFib3J0ID8gZ2V0VHJhbnNsYXRlQXNGbG9hdChlbGVtZW50LCAneCcpIC0gbWlncmF0ZS5jb250YWluZXJEaWZmWCA6IGl0ZW0uX2xlZnQ7XG4gICAgICAgIHRyYW5zbGF0ZVkgPSBhYm9ydCA/IGdldFRyYW5zbGF0ZUFzRmxvYXQoZWxlbWVudCwgJ3knKSAtIG1pZ3JhdGUuY29udGFpbmVyRGlmZlkgOiBpdGVtLl90b3A7XG4gICAgICAgIGN1cnJlbnRTdHlsZXMgPSB7dHJhbnNmb3JtOiBnZXRUcmFuc2xhdGVTdHJpbmcodHJhbnNsYXRlWCwgdHJhbnNsYXRlWSl9O1xuICAgICAgfVxuICAgICAgZ3JpZEVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICBzZXRTdHlsZXMoZWxlbWVudCwgY3VycmVudFN0eWxlcyk7XG4gICAgfVxuXG4gICAgbWlncmF0ZS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgIG1pZ3JhdGUuY29udGFpbmVyID0gbnVsbDtcbiAgICBtaWdyYXRlLmNvbnRhaW5lckRpZmZYID0gMDtcbiAgICBtaWdyYXRlLmNvbnRhaW5lckRpZmZZID0gMDtcblxuICAgIHJldHVybiBtaWdyYXRlO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEl0ZW1SZWxlYXNlXG4gICAqICoqKioqKioqKioqXG4gICAqL1xuXG4gIC8qKlxuICAgKiBUaGUgcmVsZWFzZSBwcm9jZXNzIGhhbmRsZXIgY29uc3RydWN0b3IuIEFsdGhvdWdoIHRoaXMgbWlnaHQgc2VlbSBhcyBwcm9wZXJcbiAgICogZml0IGZvciB0aGUgZHJhZyBwcm9jZXNzIHRoaXMgbmVlZHMgdG8gYmUgc2VwYXJhdGVkIGludG8gaXQncyBvd24gbG9naWNcbiAgICogYmVjYXVzZSB0aGVyZSBtaWdodCBiZSBhIHNjZW5hcmlvIHdoZXJlIGRyYWcgaXMgZGlzYWJsZWQsIGJ1dCB0aGUgcmVsZWFzZVxuICAgKiBwcm9jZXNzIHN0aWxsIG5lZWRzIHRvIGJlIGltcGxlbWVudGVkIChkcmFnZ2luZyBmcm9tIGEgZ3JpZCB0byBhbm90aGVyKS5cbiAgICpcbiAgICogQGNsYXNzXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7SXRlbX0gaXRlbVxuICAgKi9cbiAgZnVuY3Rpb24gSXRlbVJlbGVhc2UoaXRlbSkge1xuXG4gICAgdmFyIHJlbGVhc2UgPSB0aGlzO1xuXG4gICAgLy8gUHJpdmF0ZSBwcm9wcy5cbiAgICByZWxlYXNlLl9pdGVtSWQgPSBpdGVtLl9pZDtcbiAgICByZWxlYXNlLl9pc0Rlc3Ryb3llZCA9IGZhbHNlO1xuXG4gICAgLy8gUHVibGljIHByb3BzLlxuICAgIHJlbGVhc2UuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICByZWxlYXNlLmlzUG9zaXRpb25pbmdTdGFydGVkID0gZmFsc2U7XG4gICAgcmVsZWFzZS5jb250YWluZXJEaWZmWCA9IDA7XG4gICAgcmVsZWFzZS5jb250YWluZXJEaWZmWSA9IDA7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVtUmVsZWFzZSAtIFB1YmxpYyBwcm90b3R5cGUgbWV0aG9kc1xuICAgKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKi9cblxuICAvKipcbiAgICogRGVzdHJveSBpbnN0YW5jZS5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbVJlbGVhc2UucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHtJdGVtUmVsZWFzZX1cbiAgICovXG4gIEl0ZW1SZWxlYXNlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHJlbGVhc2UgPSB0aGlzO1xuXG4gICAgaWYgKCFyZWxlYXNlLl9pc0Rlc3Ryb3llZCkge1xuICAgICAgcmVsZWFzZS5zdG9wKHRydWUpO1xuICAgICAgcmVsZWFzZS5faXNEZXN0cm95ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiByZWxlYXNlO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBJdGVtIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtUmVsZWFzZS5wcm90b3R5cGVcbiAgICogQHJldHVybnMgez9JdGVtfVxuICAgKi9cbiAgSXRlbVJlbGVhc2UucHJvdG90eXBlLmdldEl0ZW0gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4gaXRlbUluc3RhbmNlc1t0aGlzLl9pdGVtSWRdIHx8IG51bGw7XG5cbiAgfTtcblxuICAvKipcbiAgICogUmVzZXQgcHVibGljIGRhdGEgYW5kIHJlbW92ZSByZWxlYXNpbmcgY2xhc3MuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW1SZWxlYXNlLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7SXRlbVJlbGVhc2V9XG4gICAqL1xuICBJdGVtUmVsZWFzZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgcmVsZWFzZSA9IHRoaXM7XG5cbiAgICBpZiAocmVsZWFzZS5faXNEZXN0cm95ZWQpIHtcbiAgICAgIHJldHVybiByZWxlYXNlO1xuICAgIH1cblxuICAgIHZhciBpdGVtID0gcmVsZWFzZS5nZXRJdGVtKCk7XG4gICAgcmVsZWFzZS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgIHJlbGVhc2UuaXNQb3NpdGlvbmluZ1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICByZWxlYXNlLmNvbnRhaW5lckRpZmZYID0gMDtcbiAgICByZWxlYXNlLmNvbnRhaW5lckRpZmZZID0gMDtcbiAgICByZW1vdmVDbGFzcyhpdGVtLl9lbGVtZW50LCBpdGVtLmdldEdyaWQoKS5fc2V0dGluZ3MuaXRlbVJlbGVhc2luZ0NsYXNzKTtcblxuICAgIHJldHVybiByZWxlYXNlO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIFN0YXJ0IHRoZSByZWxlYXNlIHByb2Nlc3Mgb2YgYW4gaXRlbS5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbVJlbGVhc2UucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHtJdGVtUmVsZWFzZX1cbiAgICovXG4gIEl0ZW1SZWxlYXNlLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciByZWxlYXNlID0gdGhpcztcblxuICAgIGlmIChyZWxlYXNlLl9pc0Rlc3Ryb3llZCB8fCByZWxlYXNlLmlzQWN0aXZlKSB7XG4gICAgICByZXR1cm4gcmVsZWFzZTtcbiAgICB9XG5cbiAgICB2YXIgaXRlbSA9IHJlbGVhc2UuZ2V0SXRlbSgpO1xuICAgIHZhciBncmlkID0gaXRlbS5nZXRHcmlkKCk7XG5cbiAgICAvLyBGbGFnIHJlbGVhc2UgYXMgYWN0aXZlLlxuICAgIHJlbGVhc2UuaXNBY3RpdmUgPSB0cnVlO1xuXG4gICAgLy8gQWRkIHJlbGVhc2UgY2xhc3NuYW1lIHRvIHRoZSByZWxlYXNlZCBlbGVtZW50LlxuICAgIGFkZENsYXNzKGl0ZW0uX2VsZW1lbnQsIGdyaWQuX3NldHRpbmdzLml0ZW1SZWxlYXNpbmdDbGFzcyk7XG5cbiAgICAvLyBFbWl0IGRyYWdSZWxlYXNlU3RhcnQgZXZlbnQuXG4gICAgZ3JpZC5fZW1pdChldkRyYWdSZWxlYXNlU3RhcnQsIGl0ZW0pO1xuXG4gICAgLy8gUG9zaXRpb24gdGhlIHJlbGVhc2VkIGl0ZW0uXG4gICAgaXRlbS5fbGF5b3V0KGZhbHNlKTtcblxuICAgIHJldHVybiByZWxlYXNlO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEVuZCB0aGUgcmVsZWFzZSBwcm9jZXNzIG9mIGFuIGl0ZW0uIFRoaXMgbWV0aG9kIGNhbiBiZSB1c2VkIHRvIGFib3J0IGFuXG4gICAqIG9uZ29pbmcgcmVsZWFzZSBwcm9jZXNzIChhbmltYXRpb24pIG9yIGZpbmlzaCB0aGUgcmVsZWFzZSBwcm9jZXNzLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtUmVsZWFzZS5wcm90b3R5cGVcbiAgICogQHBhcmFtIHtCb29sZWFufSBbYWJvcnQ9ZmFsc2VdXG4gICAqICAtIFNob3VsZCB0aGUgcmVsZWFzZSBiZSBhYm9ydGVkPyBXaGVuIHRydWUsIHRoZSByZWxlYXNlIGVuZCBldmVudCB3b24ndCBiZVxuICAgKiAgICBlbWl0dGVkLiBTZXQgdG8gdHJ1ZSBvbmx5IHdoZW4geW91IG5lZWQgdG8gYWJvcnQgdGhlIHJlbGVhc2UgcHJvY2Vzc1xuICAgKiAgICB3aGlsZSB0aGUgaXRlbSBpcyBhbmltYXRpbmcgdG8gaXQncyBwb3NpdGlvbi5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtjdXJyZW50U3R5bGVzXVxuICAgKiAgLSBPcHRpb25hbCBjdXJyZW50IHRyYW5zbGF0ZVggYW5kIHRyYW5zbGF0ZVkgc3R5bGVzLlxuICAgKiBAcmV0dXJucyB7SXRlbVJlbGVhc2V9XG4gICAqL1xuICBJdGVtUmVsZWFzZS5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uIChhYm9ydCwgY3VycmVudFN0eWxlcykge1xuXG4gICAgdmFyIHJlbGVhc2UgPSB0aGlzO1xuXG4gICAgaWYgKHJlbGVhc2UuX2lzRGVzdHJveWVkIHx8ICFyZWxlYXNlLmlzQWN0aXZlKSB7XG4gICAgICByZXR1cm4gcmVsZWFzZTtcbiAgICB9XG5cbiAgICB2YXIgaXRlbSA9IHJlbGVhc2UuZ2V0SXRlbSgpO1xuICAgIHZhciBlbGVtZW50ID0gaXRlbS5fZWxlbWVudDtcbiAgICB2YXIgZ3JpZCA9IGl0ZW0uZ2V0R3JpZCgpO1xuICAgIHZhciBjb250YWluZXIgPSBncmlkLl9lbGVtZW50O1xuICAgIHZhciBjb250YWluZXJEaWZmWCA9IHJlbGVhc2UuY29udGFpbmVyRGlmZlg7XG4gICAgdmFyIGNvbnRhaW5lckRpZmZZID0gcmVsZWFzZS5jb250YWluZXJEaWZmWTtcbiAgICB2YXIgdHJhbnNsYXRlWDtcbiAgICB2YXIgdHJhbnNsYXRlWTtcblxuICAgIC8vIFJlc2V0IGRhdGEgYW5kIHJlbW92ZSByZWxlYXNpbmcgY2xhc3NuYW1lIGZyb20gdGhlIGVsZW1lbnQuXG4gICAgcmVsZWFzZS5yZXNldCgpO1xuXG4gICAgLy8gSWYgdGhlIHJlbGVhc2VkIGVsZW1lbnQgaXMgb3V0c2lkZSB0aGUgZ3JpZCdzIGNvbnRhaW5lciBlbGVtZW50IHB1dCBpdFxuICAgIC8vIGJhY2sgdGhlcmUgYW5kIGFkanVzdCBwb3NpdGlvbiBhY2NvcmRpbmdseS5cbiAgICBpZiAoZWxlbWVudC5wYXJlbnROb2RlICE9PSBjb250YWluZXIpIHtcbiAgICAgIGlmICghY3VycmVudFN0eWxlcykge1xuICAgICAgICB0cmFuc2xhdGVYID0gYWJvcnQgPyBnZXRUcmFuc2xhdGVBc0Zsb2F0KGVsZW1lbnQsICd4JykgLSBjb250YWluZXJEaWZmWCA6IGl0ZW0uX2xlZnQ7XG4gICAgICAgIHRyYW5zbGF0ZVkgPSBhYm9ydCA/IGdldFRyYW5zbGF0ZUFzRmxvYXQoZWxlbWVudCwgJ3knKSAtIGNvbnRhaW5lckRpZmZZIDogaXRlbS5fdG9wO1xuICAgICAgICBjdXJyZW50U3R5bGVzID0ge3RyYW5zZm9ybTogZ2V0VHJhbnNsYXRlU3RyaW5nKHRyYW5zbGF0ZVgsIHRyYW5zbGF0ZVkpfTtcbiAgICAgIH1cbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgIHNldFN0eWxlcyhlbGVtZW50LCBjdXJyZW50U3R5bGVzKTtcbiAgICB9XG5cbiAgICAvLyBFbWl0IGRyYWdSZWxlYXNlRW5kIGV2ZW50LlxuICAgIGlmICghYWJvcnQpIHtcbiAgICAgIGdyaWQuX2VtaXQoZXZEcmFnUmVsZWFzZUVuZCwgaXRlbSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbGVhc2U7XG5cbiAgfTtcblxuICAvKipcbiAgICogSXRlbURyYWdcbiAgICogKioqKioqKipcbiAgICovXG5cbiAgLyoqXG4gICAqIEJpbmQgSGFtbWVyIHRvdWNoIGludGVyYWN0aW9uIHRvIGFuIGl0ZW0uXG4gICAqXG4gICAqIEBjbGFzc1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0l0ZW19IGl0ZW1cbiAgICovXG4gIGZ1bmN0aW9uIEl0ZW1EcmFnKGl0ZW0pIHtcblxuICAgIGlmICghSGFtbWVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1snICsgbmFtZXNwYWNlICsgJ10gcmVxdWlyZWQgZGVwZW5kZW5jeSBIYW1tZXIgaXMgbm90IGRlZmluZWQuJyk7XG4gICAgfVxuXG4gICAgdmFyIGRyYWcgPSB0aGlzO1xuICAgIHZhciBlbGVtZW50ID0gaXRlbS5fZWxlbWVudDtcbiAgICB2YXIgZ3JpZCA9IGl0ZW0uZ2V0R3JpZCgpO1xuICAgIHZhciBzZXR0aW5ncyA9IGdyaWQuX3NldHRpbmdzO1xuICAgIHZhciBoYW1tZXI7XG5cbiAgICAvLyBTdGFydCBwcmVkaWNhdGUuXG4gICAgdmFyIHN0YXJ0UHJlZGljYXRlID0gdHlwZW9mIHNldHRpbmdzLmRyYWdTdGFydFByZWRpY2F0ZSA9PT0gdHlwZUZ1bmN0aW9uID9cbiAgICAgIHNldHRpbmdzLmRyYWdTdGFydFByZWRpY2F0ZSA6IEl0ZW1EcmFnLmRlZmF1bHRTdGFydFByZWRpY2F0ZTtcbiAgICB2YXIgc3RhcnRQcmVkaWNhdGVTdGF0ZSA9IHN0YXJ0UHJlZGljYXRlSW5hY3RpdmU7XG4gICAgdmFyIHN0YXJ0UHJlZGljYXRlUmVzdWx0O1xuXG4gICAgLy8gUHJvdGVjdGVkIGRhdGEuXG4gICAgZHJhZy5faXRlbUlkID0gaXRlbS5faWQ7XG4gICAgZHJhZy5fZ3JpZElkID0gZ3JpZC5faWQ7XG4gICAgZHJhZy5faGFtbWVyID0gaGFtbWVyID0gbmV3IEhhbW1lci5NYW5hZ2VyKGVsZW1lbnQpO1xuICAgIGRyYWcuX2lzRGVzdHJveWVkID0gZmFsc2U7XG4gICAgZHJhZy5faXNNaWdyYXRpbmcgPSBmYWxzZTtcbiAgICBkcmFnLl9kYXRhID0ge307XG5cbiAgICAvLyBDcmVhdGUgYSBwcml2YXRlIGRyYWcgc3RhcnQgcmVzb2x2ZXIgdGhhdCBjYW4gYmUgdXNlZCB0byByZXNvbHZlIHRoZSBkcmFnXG4gICAgLy8gc3RhcnQgcHJlZGljYXRlIGFzeW5jaHJvbm91c2x5LlxuICAgIGRyYWcuX3Jlc29sdmVTdGFydFByZWRpY2F0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKCFkcmFnLl9pc0Rlc3Ryb3llZCAmJiBzdGFydFByZWRpY2F0ZVN0YXRlID09PSBzdGFydFByZWRpY2F0ZVBlbmRpbmcpIHtcbiAgICAgICAgc3RhcnRQcmVkaWNhdGVTdGF0ZSA9IHN0YXJ0UHJlZGljYXRlUmVzb2x2ZWQ7XG4gICAgICAgIGRyYWcub25TdGFydChldmVudCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIENyZWF0ZSBzY3JvbGwgbGlzdGVuZXIuXG4gICAgZHJhZy5fc2Nyb2xsTGlzdGVuZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgZHJhZy5vblNjcm9sbChlKTtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYXRlIG92ZXJsYXAgY2hlY2tlciBmdW5jdGlvbi5cbiAgICBkcmFnLl9jaGVja1NvcnRPdmVybGFwID0gZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgICAgZHJhZy5fZGF0YS5pc0FjdGl2ZSAmJiBkcmFnLmNoZWNrT3ZlcmxhcCgpO1xuICAgIH0sIHNldHRpbmdzLmRyYWdTb3J0SW50ZXJ2YWwpO1xuXG4gICAgLy8gQ3JlYXRlIHNvcnQgcHJlZGljYXRlLlxuICAgIGRyYWcuX3NvcnRQcmVkaWNhdGUgPSB0eXBlb2Ygc2V0dGluZ3MuZHJhZ1NvcnRQcmVkaWNhdGUgPT09IHR5cGVGdW5jdGlvbiA/XG4gICAgICBzZXR0aW5ncy5kcmFnU29ydFByZWRpY2F0ZSA6IEl0ZW1EcmFnLmRlZmF1bHRTb3J0UHJlZGljYXRlO1xuXG4gICAgLy8gU2V0dXAgaXRlbSdzIGluaXRpYWwgZHJhZyBkYXRhLlxuICAgIGRyYWcucmVzZXQoKTtcblxuICAgIC8vIEFkZCBkcmFnIHJlY29nbml6ZXIgdG8gaGFtbWVyLlxuICAgIGhhbW1lci5hZGQobmV3IEhhbW1lci5QYW4oe1xuICAgICAgZXZlbnQ6ICdkcmFnJyxcbiAgICAgIHBvaW50ZXJzOiAxLFxuICAgICAgdGhyZXNob2xkOiAwLFxuICAgICAgZGlyZWN0aW9uOiBIYW1tZXIuRElSRUNUSU9OX0FMTFxuICAgIH0pKTtcblxuICAgIC8vIEFkZCBkcmFnaW5pdCByZWNvZ25pemVyIHRvIGhhbW1lci5cbiAgICBoYW1tZXIuYWRkKG5ldyBIYW1tZXIuUHJlc3Moe1xuICAgICAgZXZlbnQ6ICdkcmFnaW5pdCcsXG4gICAgICBwb2ludGVyczogMSxcbiAgICAgIHRocmVzaG9sZDogMTAwMCxcbiAgICAgIHRpbWU6IDBcbiAgICB9KSk7XG5cbiAgICAvLyBDb25maWd1cmUgdGhlIGhhbW1lciBpbnN0YW5jZS5cbiAgICBpZiAoaXNQbGFpbk9iamVjdChzZXR0aW5ncy5kcmFnSGFtbWVyU2V0dGluZ3MpKSB7XG4gICAgICBoYW1tZXIuc2V0KHNldHRpbmdzLmRyYWdIYW1tZXJTZXR0aW5ncyk7XG4gICAgfVxuXG4gICAgLy8gQmluZCBkcmFnIGV2ZW50cy5cbiAgICBoYW1tZXJcbiAgICAub24oJ2RyYWdpbml0IGRyYWdzdGFydCBkcmFnbW92ZScsIGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgIC8vIExldCdzIGFjdGl2YXRlIGRyYWcgc3RhcnQgcHJlZGljYXRlIHN0YXRlLlxuICAgICAgaWYgKHN0YXJ0UHJlZGljYXRlU3RhdGUgPT09IHN0YXJ0UHJlZGljYXRlSW5hY3RpdmUpIHtcbiAgICAgICAgc3RhcnRQcmVkaWNhdGVTdGF0ZSA9IHN0YXJ0UHJlZGljYXRlUGVuZGluZztcbiAgICAgIH1cblxuICAgICAgLy8gSWYgcHJlZGljYXRlIGlzIHBlbmRpbmcgdHJ5IHRvIHJlc29sdmUgaXQuXG4gICAgICBpZiAoc3RhcnRQcmVkaWNhdGVTdGF0ZSA9PT0gc3RhcnRQcmVkaWNhdGVQZW5kaW5nKSB7XG4gICAgICAgIHN0YXJ0UHJlZGljYXRlUmVzdWx0ID0gc3RhcnRQcmVkaWNhdGUoZHJhZy5nZXRJdGVtKCksIGUpO1xuICAgICAgICBpZiAoc3RhcnRQcmVkaWNhdGVSZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgICBzdGFydFByZWRpY2F0ZVN0YXRlID0gc3RhcnRQcmVkaWNhdGVSZXNvbHZlZDtcbiAgICAgICAgICBkcmFnLm9uU3RhcnQoZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3RhcnRQcmVkaWNhdGVSZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgc3RhcnRQcmVkaWNhdGVTdGF0ZSA9IHN0YXJ0UHJlZGljYXRlUmVqZWN0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gT3RoZXJ3aXNlIGlmIHByZWRpY2F0ZSBpcyByZXNvbHZlZCBhbmQgZHJhZyBpcyBhY3RpdmUsIG1vdmUgdGhlIGl0ZW0uXG4gICAgICBlbHNlIGlmIChzdGFydFByZWRpY2F0ZVN0YXRlID09PSBzdGFydFByZWRpY2F0ZVJlc29sdmVkICYmIGRyYWcuX2RhdGEuaXNBY3RpdmUpIHtcbiAgICAgICAgZHJhZy5vbk1vdmUoZSk7XG4gICAgICB9XG5cbiAgICB9KVxuICAgIC5vbignZHJhZ2VuZCBkcmFnY2FuY2VsIGRyYWdpbml0dXAnLCBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAvLyBDaGVjayBpZiB0aGUgc3RhcnQgcHJlZGljYXRlIHdhcyByZXNvbHZlZCBkdXJpbmcgZHJhZy5cbiAgICAgIHZhciBpc1Jlc29sdmVkID0gc3RhcnRQcmVkaWNhdGVTdGF0ZSA9PT0gc3RhcnRQcmVkaWNhdGVSZXNvbHZlZDtcblxuICAgICAgLy8gRG8gZmluYWwgcHJlZGljYXRlIGNoZWNrIHRvIGFsbG93IHVzZXIgdG8gdW5iaW5kIHN0dWZmIGZvciB0aGUgY3VycmVudFxuICAgICAgLy8gZHJhZyBwcm9jZWR1cmUgd2l0aGluIHRoZSBwcmVkaWNhdGUgY2FsbGJhY2suIFRoZSByZXR1cm4gdmFsdWUgb2YgdGhpc1xuICAgICAgLy8gY2hlY2sgd2lsbCBoYXZlIG5vIGVmZmVjdCB0byB0aGUgc3RhdGUgb2YgdGhlIHByZWRpY2F0ZS5cbiAgICAgIHN0YXJ0UHJlZGljYXRlKGRyYWcuZ2V0SXRlbSgpLCBlKTtcblxuICAgICAgLy8gUmVzZXQgc3RhcnQgcHJlZGljYXRlIHN0YXRlLlxuICAgICAgc3RhcnRQcmVkaWNhdGVTdGF0ZSA9IHN0YXJ0UHJlZGljYXRlSW5hY3RpdmU7XG5cbiAgICAgIC8vIElmIHByZWRpY2F0ZSBpcyByZXNvbHZlZCBhbmQgZHJhZ2dpbmcgaXMgYWN0aXZlLCBjYWxsIHRoZSBlbmQgaGFuZGxlci5cbiAgICAgIGlmIChpc1Jlc29sdmVkICYmIGRyYWcuX2RhdGEuaXNBY3RpdmUpIHtcbiAgICAgICAgZHJhZy5vbkVuZChlKTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgLy8gUHJldmVudCBuYXRpdmUgbGluay9pbWFnZSBkcmFnZ2luZyBmb3IgdGhlIGl0ZW0gYW5kIGl0J3MgYW5jZXN0b3JzLlxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgcHJldmVudERlZmF1bHQsIGZhbHNlKTtcblxuICB9XG5cbiAgLyoqXG4gICAqIEl0ZW1EcmFnIC0gUHVibGljIG1ldGhvZHNcbiAgICogKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKi9cblxuICAvKipcbiAgICogRGVmYXVsdCBkcmFnIHN0YXJ0IHByZWRpY2F0ZSBoYW5kbGVyIHRoYXQgaGFuZGxlcyBhbmNob3IgZWxlbWVudHNcbiAgICogZ3JhY2VmdWxseS4gVGhlIHJldHVybiB2YWx1ZSBvZiB0aGlzIGZ1bmN0aW9uIGRlZmluZXMgaWYgdGhlIGRyYWcgaXNcbiAgICogc3RhcnRlZCwgcmVqZWN0ZWQgb3IgcGVuZGluZy4gV2hlbiB0cnVlIGlzIHJldHVybmVkIHRoZSBkcmFnZ2luZyBpcyBzdGFydGVkXG4gICAqIGFuZCB3aGVuIGZhbHNlIGlzIHJldHVybmVkIHRoZSBkcmFnZ2luZyBpcyByZWplY3RlZC4gSWYgbm90aGluZyBpcyByZXR1cm5lZFxuICAgKiB0aGUgcHJlZGljYXRlIHdpbGwgYmUgY2FsbGVkIGFnYWluIG9uIHRoZSBuZXh0IGRyYWcgbW92ZW1lbnQuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW1EcmFnXG4gICAqIEBwYXJhbSB7SXRlbX0gaXRlbVxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgKiAgIC0gQW4gb3B0aW9uYWwgb3B0aW9ucyBvYmplY3Qgd2hpY2ggY2FuIGJlIHVzZWQgdG8gcGFzcyB0aGUgcHJlZGljYXRlXG4gICAqICAgICBpdCdzIG9wdGlvbnMgbWFudWFsbHkuIEJ5IGRlZmF1bHQgdGhlIHByZWRpY2F0ZSByZXRyaWV2ZXMgdGhlIG9wdGlvbnNcbiAgICogICAgIGZyb20gdGhlIGdyaWQncyBzZXR0aW5ncy5cbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBJdGVtRHJhZy5kZWZhdWx0U3RhcnRQcmVkaWNhdGUgPSBmdW5jdGlvbiAoaXRlbSwgZXZlbnQsIG9wdGlvbnMpIHtcblxuICAgIHZhciBlbGVtZW50ID0gaXRlbS5fZWxlbWVudDtcbiAgICB2YXIgcHJlZGljYXRlID0gaXRlbS5fZHJhZy5fc3RhcnRQcmVkaWNhdGVEYXRhO1xuICAgIHZhciBjb25maWc7XG4gICAgdmFyIGlzQW5jaG9yO1xuICAgIHZhciBocmVmO1xuICAgIHZhciB0YXJnZXQ7XG5cbiAgICAvLyBTZXR1cCBkYXRhIGlmIGl0IGlzIG5vdCBzZXQgdXAgeWV0LlxuICAgIGlmICghcHJlZGljYXRlKSB7XG4gICAgICBjb25maWcgPSBvcHRpb25zIHx8IGl0ZW0uX2RyYWcuZ2V0R3JpZCgpLl9zZXR0aW5ncy5kcmFnU3RhcnRQcmVkaWNhdGU7XG4gICAgICBjb25maWcgPSBpc1BsYWluT2JqZWN0KGNvbmZpZykgPyBjb25maWcgOiB7fTtcbiAgICAgIHByZWRpY2F0ZSA9IGl0ZW0uX2RyYWcuX3N0YXJ0UHJlZGljYXRlRGF0YSA9IHtcbiAgICAgICAgZGlzdGFuY2U6IE1hdGguYWJzKGNvbmZpZy5kaXN0YW5jZSkgfHwgMCxcbiAgICAgICAgZGVsYXk6IE1hdGgubWF4KGNvbmZpZy5kZWxheSwgMCkgfHwgMCxcbiAgICAgICAgaGFuZGxlOiB0eXBlb2YgY29uZmlnLmhhbmRsZSA9PT0gJ3N0cmluZycgPyBjb25maWcuaGFuZGxlIDogZmFsc2VcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gRmluYWwgZXZlbnQgbG9naWMuIEF0IHRoaXMgc3RhZ2UgcmV0dXJuIHZhbHVlIGRvZXMgbm90IG1hdHRlciBhbnltb3JlLFxuICAgIC8vIHRoZSBwcmVkaWNhdGUgaXMgZWl0aGVyIHJlc29sdmVkIG9yIGl0J3Mgbm90IGFuZCB0aGVyZSdzIG5vdGhpbmcgdG8gZG9cbiAgICAvLyBhYm91dCBpdC4gSGVyZSB3ZSBqdXN0IHJlc2V0IGRhdGEgYW5kIGlmIHRoZSBpdGVtIGVsZW1lbnQgaXMgYSBsaW5rXG4gICAgLy8gd2UgZm9sbG93IGl0IChpZiB0aGVyZSBoYXMgb25seSBiZWVuIHNsaWdodCBtb3ZlbWVudCkuXG4gICAgaWYgKGV2ZW50LmlzRmluYWwpIHtcbiAgICAgIGlzQW5jaG9yID0gZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdhJztcbiAgICAgIGhyZWYgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgdGFyZ2V0ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3RhcmdldCcpO1xuICAgICAgZHJhZ1N0YXJ0UHJlZGljYXRlUmVzZXQoaXRlbSk7XG4gICAgICBpZiAoaXNBbmNob3IgJiYgaHJlZiAmJiBNYXRoLmFicyhldmVudC5kZWx0YVgpIDwgMiAmJiBNYXRoLmFicyhldmVudC5kZWx0YVkpIDwgMiAmJiBldmVudC5kZWx0YVRpbWUgPCAyMDApIHtcbiAgICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQgIT09ICdfc2VsZicpIHtcbiAgICAgICAgICBnbG9iYWwub3BlbihocmVmLCB0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGdsb2JhbC5sb2NhdGlvbi5ocmVmID0gaHJlZjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEZpbmQgYW5kIHN0b3JlIHRoZSBoYW5kbGUgZWxlbWVudCBzbyB3ZSBjYW4gY2hlY2sgbGF0ZXIgb24gaWYgdGhlXG4gICAgLy8gY3Vyc29yIGlzIHdpdGhpbiB0aGUgaGFuZGxlLiBJZiB3ZSBoYXZlIGEgaGFuZGxlIHNlbGVjdG9yIGxldCdzIGZpbmRcbiAgICAvLyB0aGUgY29ycmVzcG9uZGluZyBlbGVtZW50LiBPdGhlcndpc2UgbGV0J3MgdXNlIHRoZSBpdGVtIGVsZW1lbnQgYXMgdGhlXG4gICAgLy8gaGFuZGxlLlxuICAgIGlmICghcHJlZGljYXRlLmhhbmRsZUVsZW1lbnQpIHtcbiAgICAgIGlmIChwcmVkaWNhdGUuaGFuZGxlKSB7XG4gICAgICAgIHByZWRpY2F0ZS5oYW5kbGVFbGVtZW50ID0gKGV2ZW50LmNoYW5nZWRQb2ludGVyc1swXSB8fCB7fSkudGFyZ2V0O1xuICAgICAgICB3aGlsZSAocHJlZGljYXRlLmhhbmRsZUVsZW1lbnQgJiYgIWVsZW1lbnRNYXRjaGVzKHByZWRpY2F0ZS5oYW5kbGVFbGVtZW50LCBwcmVkaWNhdGUuaGFuZGxlKSkge1xuICAgICAgICAgIHByZWRpY2F0ZS5oYW5kbGVFbGVtZW50ID0gcHJlZGljYXRlLmhhbmRsZUVsZW1lbnQgIT09IGVsZW1lbnQgPyBwcmVkaWNhdGUuaGFuZGxlRWxlbWVudC5wYXJlbnRFbGVtZW50IDogbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXByZWRpY2F0ZS5oYW5kbGVFbGVtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcHJlZGljYXRlLmhhbmRsZUVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIGRlbGF5IGlzIGRlZmluZWQgbGV0J3Mga2VlcCB0cmFjayBvZiB0aGUgbGF0ZXN0IGV2ZW50IGFuZCBpbml0aWF0ZVxuICAgIC8vIGRlbGF5IGlmIGl0IGhhcyBub3QgYmVlbiBkb25lIHlldC5cbiAgICBpZiAocHJlZGljYXRlLmRlbGF5KSB7XG4gICAgICBwcmVkaWNhdGUuZXZlbnQgPSBldmVudDtcbiAgICAgIGlmICghcHJlZGljYXRlLmRlbGF5VGltZXIpIHtcbiAgICAgICAgcHJlZGljYXRlLmRlbGF5VGltZXIgPSBnbG9iYWwuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcHJlZGljYXRlLmRlbGF5ID0gMDtcbiAgICAgICAgICBpZiAoZHJhZ1N0YXJ0UHJlZGljYXRlUmVzb2x2ZShpdGVtLCBwcmVkaWNhdGUuZXZlbnQpKSB7XG4gICAgICAgICAgICBpdGVtLl9kcmFnLl9yZXNvbHZlU3RhcnRQcmVkaWNhdGUocHJlZGljYXRlLmV2ZW50KTtcbiAgICAgICAgICAgIGRyYWdTdGFydFByZWRpY2F0ZVJlc2V0KGl0ZW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgcHJlZGljYXRlLmRlbGF5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ1N0YXJ0UHJlZGljYXRlUmVzb2x2ZShpdGVtLCBldmVudCk7XG5cbiAgfTtcblxuICAvKipcbiAgICogRGVmYXVsdCBkcmFnIHNvcnQgcHJlZGljYXRlLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtRHJhZ1xuICAgKiBAcGFyYW0ge0l0ZW19IGl0ZW1cbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAqIEByZXR1cm5zIHsoQm9vbGVhbnxEcmFnU29ydENvbW1hbmQpfVxuICAgKiAgIC0gUmV0dXJucyBmYWxzZSBpZiBubyB2YWxpZCBpbmRleCB3YXMgZm91bmQuIE90aGVyd2lzZSByZXR1cm5zIGRyYWcgc29ydFxuICAgKiAgICAgY29tbWFuZC5cbiAgICovXG4gIEl0ZW1EcmFnLmRlZmF1bHRTb3J0UHJlZGljYXRlID0gZnVuY3Rpb24gKGl0ZW0pIHtcblxuICAgIHZhciBkcmFnID0gaXRlbS5fZHJhZztcbiAgICB2YXIgZHJhZ0RhdGEgPSBkcmFnLl9kYXRhO1xuICAgIHZhciByb290R3JpZCA9IGRyYWcuZ2V0R3JpZCgpO1xuICAgIHZhciBzZXR0aW5ncyA9IHJvb3RHcmlkLl9zZXR0aW5ncztcbiAgICB2YXIgY29uZmlnID0gc2V0dGluZ3MuZHJhZ1NvcnRQcmVkaWNhdGUgfHwge307XG4gICAgdmFyIHNvcnRUaHJlc2hvbGQgPSBjb25maWcudGhyZXNob2xkIHx8IDUwO1xuICAgIHZhciBzb3J0QWN0aW9uID0gY29uZmlnLmFjdGlvbiB8fCAnbW92ZSc7XG4gICAgdmFyIGl0ZW1SZWN0ID0ge1xuICAgICAgd2lkdGg6IGl0ZW0uX3dpZHRoLFxuICAgICAgaGVpZ2h0OiBpdGVtLl9oZWlnaHQsXG4gICAgICBsZWZ0OiBkcmFnRGF0YS5lbGVtZW50Q2xpZW50WCxcbiAgICAgIHRvcDogZHJhZ0RhdGEuZWxlbWVudENsaWVudFlcbiAgICB9O1xuICAgIHZhciBncmlkID0gZ2V0VGFyZ2V0R3JpZChpdGVtLCByb290R3JpZCwgaXRlbVJlY3QsIHNvcnRUaHJlc2hvbGQpO1xuICAgIHZhciBncmlkT2Zmc2V0TGVmdCA9IDA7XG4gICAgdmFyIGdyaWRPZmZzZXRUb3AgPSAwO1xuICAgIHZhciBtYXRjaFNjb3JlID0gLTE7XG4gICAgdmFyIG1hdGNoSW5kZXg7XG4gICAgdmFyIGhhc1ZhbGlkVGFyZ2V0cztcbiAgICB2YXIgdGFyZ2V0O1xuICAgIHZhciBzY29yZTtcbiAgICB2YXIgaTtcblxuICAgIC8vIFJldHVybiBlYXJseSBpZiB3ZSBmb3VuZCBubyBncmlkIGNvbnRhaW5lciBlbGVtZW50IHRoYXQgb3ZlcmxhcHMgdGhlXG4gICAgLy8gZHJhZ2dlZCBpdGVtIGVub3VnaC5cbiAgICBpZiAoIWdyaWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBJZiBpdGVtIGlzIG1vdmVkIHdpdGhpbiBpdCdzIG9yaWdpbmF0aW5nIGdyaWQgYWRqdXN0IGl0ZW0ncyBsZWZ0IGFuZCB0b3BcbiAgICAvLyBwcm9wcy4gT3RoZXJ3aXNlIGlmIGl0ZW0gaXMgbW92ZWQgdG8vd2l0aGluIGFub3RoZXIgZ3JpZCBnZXQgdGhlXG4gICAgLy8gY29udGFpbmVyIGVsZW1lbnQncyBvZmZzZXQgKGZyb20gdGhlIGVsZW1lbnQncyBjb250ZW50IGVkZ2UpLlxuICAgIGlmIChncmlkID09PSByb290R3JpZCkge1xuICAgICAgaXRlbVJlY3QubGVmdCA9IGRyYWdEYXRhLmdyaWRYICsgaXRlbS5fbWFyZ2luLmxlZnQ7XG4gICAgICBpdGVtUmVjdC50b3AgPSBkcmFnRGF0YS5ncmlkWSArIGl0ZW0uX21hcmdpbi50b3A7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZ3JpZE9mZnNldExlZnQgPSBncmlkLl9sZWZ0ICsgZ3JpZC5fYm9yZGVyLmxlZnQ7XG4gICAgICBncmlkT2Zmc2V0VG9wID0gZ3JpZC5fdG9wICsgZ3JpZC5fYm9yZGVyLnRvcDtcbiAgICB9XG5cbiAgICAvLyBMb29wIHRocm91Z2ggdGhlIHRhcmdldCBncmlkIGl0ZW1zIGFuZCB0cnkgdG8gZmluZCB0aGUgYmVzdCBtYXRjaC5cbiAgICBmb3IgKGkgPSAwOyBpIDwgZ3JpZC5faXRlbXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgdGFyZ2V0ID0gZ3JpZC5faXRlbXNbaV07XG5cbiAgICAgIC8vIElmIHRoZSB0YXJnZXQgaXRlbSBpcyBub3QgYWN0aXZlIG9yIHRoZSB0YXJnZXQgaXRlbSBpcyB0aGUgZHJhZ2dlZCBpdGVtXG4gICAgICAvLyBsZXQncyBza2lwIHRvIHRoZSBuZXh0IGl0ZW0uXG4gICAgICBpZiAoIXRhcmdldC5faXNBY3RpdmUgfHwgdGFyZ2V0ID09PSBpdGVtKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBNYXJrIHRoZSBncmlkIGFzIGhhdmluZyB2YWxpZCB0YXJnZXQgaXRlbXMuXG4gICAgICBoYXNWYWxpZFRhcmdldHMgPSB0cnVlO1xuXG4gICAgICAvLyBDYWxjdWxhdGUgdGhlIHRhcmdldCdzIG92ZXJsYXAgc2NvcmUgd2l0aCB0aGUgZHJhZ2dlZCBpdGVtLlxuICAgICAgc2NvcmUgPSBnZXRSZWN0T3ZlcmxhcFNjb3JlKGl0ZW1SZWN0LCB7XG4gICAgICAgIHdpZHRoOiB0YXJnZXQuX3dpZHRoLFxuICAgICAgICBoZWlnaHQ6IHRhcmdldC5faGVpZ2h0LFxuICAgICAgICBsZWZ0OiB0YXJnZXQuX2xlZnQgKyB0YXJnZXQuX21hcmdpbi5sZWZ0ICsgZ3JpZE9mZnNldExlZnQsXG4gICAgICAgIHRvcDogdGFyZ2V0Ll90b3AgKyB0YXJnZXQuX21hcmdpbi50b3AgKyBncmlkT2Zmc2V0VG9wXG4gICAgICB9KTtcblxuICAgICAgLy8gVXBkYXRlIGJlc3QgbWF0Y2ggaW5kZXggYW5kIHNjb3JlIGlmIHRoZSB0YXJnZXQncyBvdmVybGFwIHNjb3JlIHdpdGhcbiAgICAgIC8vIHRoZSBkcmFnZ2VkIGl0ZW0gaXMgaGlnaGVyIHRoYW4gdGhlIGN1cnJlbnQgYmVzdCBtYXRjaCBzY29yZS5cbiAgICAgIGlmIChzY29yZSA+IG1hdGNoU2NvcmUpIHtcbiAgICAgICAgbWF0Y2hJbmRleCA9IGk7XG4gICAgICAgIG1hdGNoU2NvcmUgPSBzY29yZTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIElmIHRoZXJlIGlzIG5vIHZhbGlkIG1hdGNoIGFuZCB0aGUgaXRlbSBpcyBiZWluZyBtb3ZlZCBpbnRvIGFub3RoZXIgZ3JpZC5cbiAgICBpZiAobWF0Y2hTY29yZSA8IHNvcnRUaHJlc2hvbGQgJiYgaXRlbS5nZXRHcmlkKCkgIT09IGdyaWQpIHtcbiAgICAgIG1hdGNoSW5kZXggPSBoYXNWYWxpZFRhcmdldHMgPyAtMSA6IDA7XG4gICAgICBtYXRjaFNjb3JlID0gSW5maW5pdHk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgdGhlIGJlc3QgbWF0Y2ggb3ZlcmxhcHMgZW5vdWdoIHRvIGp1c3RpZnkgYSBwbGFjZW1lbnQgc3dpdGNoLlxuICAgIGlmIChtYXRjaFNjb3JlID49IHNvcnRUaHJlc2hvbGQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdyaWQ6IGdyaWQsXG4gICAgICAgIGluZGV4OiBtYXRjaEluZGV4LFxuICAgICAgICBhY3Rpb246IHNvcnRBY3Rpb25cbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEl0ZW1EcmFnIC0gUHVibGljIHByb3RvdHlwZSBtZXRob2RzXG4gICAqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqL1xuXG4gIC8qKlxuICAgKiBEZXN0cm95IGluc3RhbmNlLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtRHJhZy5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0l0ZW1EcmFnfVxuICAgKi9cbiAgSXRlbURyYWcucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgZHJhZyA9IHRoaXM7XG5cbiAgICBpZiAoIWRyYWcuX2lzRGVzdHJveWVkKSB7XG4gICAgICBkcmFnLnN0b3AoKTtcbiAgICAgIGRyYWcuX2hhbW1lci5kZXN0cm95KCk7XG4gICAgICBkcmFnLmdldEl0ZW0oKS5fZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBwcmV2ZW50RGVmYXVsdCwgZmFsc2UpO1xuICAgICAgZHJhZy5faXNEZXN0cm95ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBkcmFnO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBJdGVtIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtRHJhZy5wcm90b3R5cGVcbiAgICogQHJldHVybnMgez9JdGVtfVxuICAgKi9cbiAgSXRlbURyYWcucHJvdG90eXBlLmdldEl0ZW0gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4gaXRlbUluc3RhbmNlc1t0aGlzLl9pdGVtSWRdIHx8IG51bGw7XG5cbiAgfTtcblxuICAvKipcbiAgICogR2V0IEdyaWQgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW1EcmFnLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7P0dyaWR9XG4gICAqL1xuICBJdGVtRHJhZy5wcm90b3R5cGUuZ2V0R3JpZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiBncmlkSW5zdGFuY2VzW3RoaXMuX2dyaWRJZF0gfHwgbnVsbDtcblxuICB9O1xuXG4gIC8qKlxuICAgKiBTZXR1cC9yZXNldCBkcmFnIGRhdGEuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW1EcmFnLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7SXRlbURyYWd9XG4gICAqL1xuICBJdGVtRHJhZy5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgZHJhZyA9IHRoaXM7XG4gICAgdmFyIGRyYWdEYXRhID0gZHJhZy5fZGF0YTtcblxuICAgIC8vIElzIGl0ZW0gYmVpbmcgZHJhZ2dlZD9cbiAgICBkcmFnRGF0YS5pc0FjdGl2ZSA9IGZhbHNlO1xuXG4gICAgLy8gVGhlIGRyYWdnZWQgaXRlbSdzIGNvbnRhaW5lciBlbGVtZW50LlxuICAgIGRyYWdEYXRhLmNvbnRhaW5lciA9IG51bGw7XG5cbiAgICAvLyBUaGUgZHJhZ2dlZCBpdGVtJ3MgY29udGFpbmluZyBibG9jay5cbiAgICBkcmFnRGF0YS5jb250YWluaW5nQmxvY2sgPSBudWxsO1xuXG4gICAgLy8gSGFtbWVyIGV2ZW50IGRhdGEuXG4gICAgZHJhZ0RhdGEuc3RhcnRFdmVudCA9IG51bGw7XG4gICAgZHJhZ0RhdGEuY3VycmVudEV2ZW50ID0gbnVsbDtcblxuICAgIC8vIEFsbCB0aGUgZWxlbWVudHMgd2hpY2ggbmVlZCB0byBiZSBsaXN0ZW5lZCBmb3Igc2Nyb2xsIGV2ZW50cyBkdXJpbmdcbiAgICAvLyBkcmFnZ2luZy5cbiAgICBkcmFnRGF0YS5zY3JvbGxlcnMgPSBbXTtcblxuICAgIC8vIFRoZSBjdXJyZW50IHRyYW5zbGF0ZVgvdHJhbnNsYXRlWSBwb3NpdGlvbi5cbiAgICBkcmFnRGF0YS5sZWZ0ID0gMDtcbiAgICBkcmFnRGF0YS50b3AgPSAwO1xuXG4gICAgLy8gRHJhZ2dlZCBlbGVtZW50J3MgY3VycmVudCBwb3NpdGlvbiB3aXRoaW4gdGhlIGdyaWQuXG4gICAgZHJhZ0RhdGEuZ3JpZFggPSAwO1xuICAgIGRyYWdEYXRhLmdyaWRZID0gMDtcblxuICAgIC8vIERyYWdnZWQgZWxlbWVudCdzIGN1cnJlbnQgb2Zmc2V0IGZyb20gd2luZG93J3Mgbm9ydGh3ZXN0IGNvcm5lci4gRG9lc1xuICAgIC8vIG5vdCBhY2NvdW50IGZvciBlbGVtZW50J3MgbWFyZ2lucy5cbiAgICBkcmFnRGF0YS5lbGVtZW50Q2xpZW50WCA9IDA7XG4gICAgZHJhZ0RhdGEuZWxlbWVudENsaWVudFkgPSAwO1xuXG4gICAgLy8gT2Zmc2V0IGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgZHJhZ2dlZCBlbGVtZW50J3MgdGVtcG9yYXJ5IGRyYWdcbiAgICAvLyBjb250YWluZXIgYW5kIGl0J3Mgb3JpZ2luYWwgY29udGFpbmVyLlxuICAgIGRyYWdEYXRhLmNvbnRhaW5lckRpZmZYID0gMDtcbiAgICBkcmFnRGF0YS5jb250YWluZXJEaWZmWSA9IDA7XG5cbiAgICByZXR1cm4gZHJhZztcblxuICB9O1xuXG4gIC8qKlxuICAgKiBCaW5kIGRyYWcgc2Nyb2xsIGhhbmRsZXJzIHRvIGFsbCBzY3JvbGxhYmxlIGFuY2VzdG9yIGVsZW1lbnRzIG9mIHRoZVxuICAgKiBkcmFnZ2VkIGVsZW1lbnQgYW5kIHRoZSBkcmFnIGNvbnRhaW5lciBlbGVtZW50LlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtRHJhZy5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0l0ZW1EcmFnfVxuICAgKi9cbiAgSXRlbURyYWcucHJvdG90eXBlLmJpbmRTY3JvbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgZHJhZyA9IHRoaXM7XG4gICAgdmFyIGdyaWRDb250YWluZXIgPSBkcmFnLmdldEdyaWQoKS5fZWxlbWVudDtcbiAgICB2YXIgZHJhZ0NvbnRhaW5lciA9IGRyYWcuX2RhdGEuY29udGFpbmVyO1xuICAgIHZhciBzY3JvbGxlcnMgPSBnZXRTY3JvbGxQYXJlbnRzKGRyYWcuZ2V0SXRlbSgpLl9lbGVtZW50KTtcbiAgICB2YXIgaTtcblxuICAgIC8vIElmIGRyYWcgY29udGFpbmVyIGlzIGRlZmluZWQgYW5kIGl0J3Mgbm90IHRoZSBzYW1lIGVsZW1lbnQgYXMgZ3JpZFxuICAgIC8vIGNvbnRhaW5lciB0aGVuIHdlIG5lZWQgdG8gYWRkIHRoZSBncmlkIGNvbnRhaW5lciBhbmQgaXQncyBzY3JvbGwgcGFyZW50c1xuICAgIC8vIHRvIHRoZSBlbGVtZW50cyB3aGljaCBhcmUgZ29pbmcgdG8gYmUgbGlzdGVuZXIgZm9yIHNjcm9sbCBldmVudHMuXG4gICAgaWYgKGRyYWdDb250YWluZXIgIT09IGdyaWRDb250YWluZXIpIHtcbiAgICAgIHNjcm9sbGVycyA9IGFycmF5VW5pcXVlKHNjcm9sbGVycy5jb25jYXQoZ3JpZENvbnRhaW5lcikuY29uY2F0KGdldFNjcm9sbFBhcmVudHMoZ3JpZENvbnRhaW5lcikpKTtcbiAgICB9XG5cbiAgICAvLyBCaW5kIHNjcm9sbCBsaXN0ZW5lcnMuXG4gICAgZm9yIChpID0gMDsgaSA8IHNjcm9sbGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgc2Nyb2xsZXJzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGRyYWcuX3Njcm9sbExpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBTYXZlIHNjcm9sbGVycyB0byBkcmFnIGRhdGEuXG4gICAgZHJhZy5fZGF0YS5zY3JvbGxlcnMgPSBzY3JvbGxlcnM7XG5cbiAgICByZXR1cm4gZHJhZztcblxuICB9O1xuXG4gIC8qKlxuICAgKiBVbmJpbmQgY3VycmVudGx5IGJvdW5kIGRyYWcgc2Nyb2xsIGhhbmRsZXJzIGZyb20gYWxsIHNjcm9sbGFibGUgYW5jZXN0b3JcbiAgICogZWxlbWVudHMgb2YgdGhlIGRyYWdnZWQgZWxlbWVudCBhbmQgdGhlIGRyYWcgY29udGFpbmVyIGVsZW1lbnQuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW1EcmFnLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7SXRlbURyYWd9XG4gICAqL1xuICBJdGVtRHJhZy5wcm90b3R5cGUudW5iaW5kU2Nyb2xsTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGRyYWcgPSB0aGlzO1xuICAgIHZhciBkcmFnRGF0YSA9IGRyYWcuX2RhdGE7XG4gICAgdmFyIHNjcm9sbGVycyA9IGRyYWdEYXRhLnNjcm9sbGVycztcbiAgICB2YXIgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBzY3JvbGxlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHNjcm9sbGVyc1tpXS5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBkcmFnLl9zY3JvbGxMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgZHJhZ0RhdGEuc2Nyb2xsZXJzID0gW107XG5cbiAgICByZXR1cm4gZHJhZztcblxuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVjayAoZHVyaW5nIGRyYWcpIGlmIGFuIGl0ZW0gaXMgb3ZlcmxhcHBpbmcgb3RoZXIgaXRlbXMgYW5kIGJhc2VkIG9uXG4gICAqIHRoZSBjb25maWd1cmF0aW9uIGxheW91dCB0aGUgaXRlbXMuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW1EcmFnLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7SXRlbURyYWd9XG4gICAqL1xuICBJdGVtRHJhZy5wcm90b3R5cGUuY2hlY2tPdmVybGFwID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGRyYWcgPSB0aGlzO1xuICAgIHZhciBpdGVtID0gZHJhZy5nZXRJdGVtKCk7XG4gICAgdmFyIHJlc3VsdCA9IGRyYWcuX3NvcnRQcmVkaWNhdGUoaXRlbSwgZHJhZy5fZGF0YS5jdXJyZW50RXZlbnQpO1xuICAgIHZhciBjdXJyZW50R3JpZDtcbiAgICB2YXIgY3VycmVudEluZGV4O1xuICAgIHZhciB0YXJnZXRHcmlkO1xuICAgIHZhciB0YXJnZXRJbmRleDtcbiAgICB2YXIgc29ydEFjdGlvbjtcbiAgICB2YXIgaXNNaWdyYXRpb247XG5cbiAgICAvLyBMZXQncyBtYWtlIHN1cmUgdGhlIHJlc3VsdCBvYmplY3QgaGFzIGEgdmFsaWQgaW5kZXggYmVmb3JlIGdvaW5nIGZ1cnRoZXIuXG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KHJlc3VsdCkgfHwgdHlwZW9mIHJlc3VsdC5pbmRleCAhPT0gdHlwZU51bWJlcikge1xuICAgICAgcmV0dXJuIGRyYWc7XG4gICAgfVxuXG4gICAgY3VycmVudEdyaWQgPSBpdGVtLmdldEdyaWQoKTtcbiAgICB0YXJnZXRHcmlkID0gcmVzdWx0LmdyaWQgfHwgY3VycmVudEdyaWQ7XG4gICAgaXNNaWdyYXRpb24gPSBjdXJyZW50R3JpZCAhPT0gdGFyZ2V0R3JpZDtcbiAgICBjdXJyZW50SW5kZXggPSBjdXJyZW50R3JpZC5faXRlbXMuaW5kZXhPZihpdGVtKTtcbiAgICB0YXJnZXRJbmRleCA9IG5vcm1hbGl6ZUFycmF5SW5kZXgodGFyZ2V0R3JpZC5faXRlbXMsIHJlc3VsdC5pbmRleCwgaXNNaWdyYXRpb24pO1xuICAgIHNvcnRBY3Rpb24gPSByZXN1bHQuYWN0aW9uID09PSAnc3dhcCcgPyAnc3dhcCcgOiAnbW92ZSc7XG5cbiAgICAvLyBJZiB0aGUgaXRlbSB3YXMgbW92ZWQgd2l0aGluIGl0J3MgY3VycmVudCBncmlkLlxuICAgIGlmICghaXNNaWdyYXRpb24pIHtcblxuICAgICAgLy8gTWFrZSBzdXJlIHRoZSB0YXJnZXQgaW5kZXggaXMgbm90IHRoZSBjdXJyZW50IGluZGV4LlxuICAgICAgaWYgKGN1cnJlbnRJbmRleCAhPT0gdGFyZ2V0SW5kZXgpIHtcblxuICAgICAgICAvLyBEbyB0aGUgc29ydC5cbiAgICAgICAgKHNvcnRBY3Rpb24gPT09ICdzd2FwJyA/IGFycmF5U3dhcCA6IGFycmF5TW92ZSkoY3VycmVudEdyaWQuX2l0ZW1zLCBjdXJyZW50SW5kZXgsIHRhcmdldEluZGV4KTtcblxuICAgICAgICAvLyBFbWl0IG1vdmUgZXZlbnQuXG4gICAgICAgIGN1cnJlbnRHcmlkLl9lbWl0KGV2TW92ZSwge1xuICAgICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgICAgZnJvbUluZGV4OiBjdXJyZW50SW5kZXgsXG4gICAgICAgICAgdG9JbmRleDogdGFyZ2V0SW5kZXgsXG4gICAgICAgICAgYWN0aW9uOiBzb3J0QWN0aW9uXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExheW91dCB0aGUgZ3JpZC5cbiAgICAgICAgY3VycmVudEdyaWQubGF5b3V0KCk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIElmIHRoZSBpdGVtIHdhcyBtb3ZlZCB0byBhbm90aGVyIGdyaWQuXG4gICAgZWxzZSB7XG5cbiAgICAgIC8vIEVtaXQgYmVmb3JlU2VuZCBldmVudC5cbiAgICAgIGN1cnJlbnRHcmlkLl9lbWl0KGV2QmVmb3JlU2VuZCwge1xuICAgICAgICBpdGVtOiBpdGVtLFxuICAgICAgICBmcm9tR3JpZDogY3VycmVudEdyaWQsXG4gICAgICAgIGZyb21JbmRleDogY3VycmVudEluZGV4LFxuICAgICAgICB0b0dyaWQ6IHRhcmdldEdyaWQsXG4gICAgICAgIHRvSW5kZXg6IHRhcmdldEluZGV4XG4gICAgICB9KTtcblxuICAgICAgLy8gRW1pdCBiZWZvcmVSZWNlaXZlIGV2ZW50LlxuICAgICAgdGFyZ2V0R3JpZC5fZW1pdChldkJlZm9yZVJlY2VpdmUsIHtcbiAgICAgICAgaXRlbTogaXRlbSxcbiAgICAgICAgZnJvbUdyaWQ6IGN1cnJlbnRHcmlkLFxuICAgICAgICBmcm9tSW5kZXg6IGN1cnJlbnRJbmRleCxcbiAgICAgICAgdG9HcmlkOiB0YXJnZXRHcmlkLFxuICAgICAgICB0b0luZGV4OiB0YXJnZXRJbmRleFxuICAgICAgfSk7XG5cbiAgICAgIC8vIFVwZGF0ZSBpdGVtJ3MgZ3JpZCBpZCByZWZlcmVuY2UuXG4gICAgICBpdGVtLl9ncmlkSWQgPSB0YXJnZXRHcmlkLl9pZDtcblxuICAgICAgLy8gVXBkYXRlIGRyYWcgaW5zdGFuY2VzJ3MgbWlncmF0aW5nIGluZGljYXRvci5cbiAgICAgIGRyYWcuX2lzTWlncmF0aW5nID0gaXRlbS5fZ3JpZElkICE9PSBkcmFnLl9ncmlkSWQ7XG5cbiAgICAgIC8vIE1vdmUgaXRlbSBpbnN0YW5jZSBmcm9tIGN1cnJlbnQgZ3JpZCB0byB0YXJnZXQgZ3JpZC5cbiAgICAgIGN1cnJlbnRHcmlkLl9pdGVtcy5zcGxpY2UoY3VycmVudEluZGV4LCAxKTtcbiAgICAgIGluc2VydEl0ZW1zVG9BcnJheSh0YXJnZXRHcmlkLl9pdGVtcywgaXRlbSwgdGFyZ2V0SW5kZXgpO1xuXG4gICAgICAvLyBTZXQgc29ydCBkYXRhIGFzIG51bGwsIHdoaWNoIGlzIGFuIGluZGljYXRvciBmb3IgdGhlIGl0ZW0gY29tcGFyaXNvblxuICAgICAgLy8gZnVuY3Rpb24gdGhhdCB0aGUgc29ydCBkYXRhIG9mIHRoaXMgc3BlY2lmaWMgaXRlbSBzaG91bGQgYmUgZmV0Y2hlZFxuICAgICAgLy8gbGF6aWx5LlxuICAgICAgaXRlbS5fc29ydERhdGEgPSBudWxsO1xuXG4gICAgICAvLyBFbWl0IHNlbmQgZXZlbnQuXG4gICAgICBjdXJyZW50R3JpZC5fZW1pdChldlNlbmQsIHtcbiAgICAgICAgaXRlbTogaXRlbSxcbiAgICAgICAgZnJvbUdyaWQ6IGN1cnJlbnRHcmlkLFxuICAgICAgICBmcm9tSW5kZXg6IGN1cnJlbnRJbmRleCxcbiAgICAgICAgdG9HcmlkOiB0YXJnZXRHcmlkLFxuICAgICAgICB0b0luZGV4OiB0YXJnZXRJbmRleFxuICAgICAgfSk7XG5cbiAgICAgIC8vIEVtaXQgcmVjZWl2ZSBldmVudC5cbiAgICAgIHRhcmdldEdyaWQuX2VtaXQoZXZSZWNlaXZlLCB7XG4gICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgIGZyb21HcmlkOiBjdXJyZW50R3JpZCxcbiAgICAgICAgZnJvbUluZGV4OiBjdXJyZW50SW5kZXgsXG4gICAgICAgIHRvR3JpZDogdGFyZ2V0R3JpZCxcbiAgICAgICAgdG9JbmRleDogdGFyZ2V0SW5kZXhcbiAgICAgIH0pO1xuXG4gICAgICAvLyBMYXlvdXQgYm90aCBncmlkcy5cbiAgICAgIGN1cnJlbnRHcmlkLmxheW91dCgpO1xuICAgICAgdGFyZ2V0R3JpZC5sYXlvdXQoKTtcblxuICAgIH1cblxuICAgIHJldHVybiBkcmFnO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIElmIGl0ZW0gaXMgZHJhZ2dlZCBpbnRvIGFub3RoZXIgZ3JpZCwgZmluaXNoIHRoZSBtaWdyYXRpb24gcHJvY2Vzc1xuICAgKiBncmFjZWZ1bGx5LlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtRHJhZy5wcm90b3R5cGVcbiAgICogQHJldHVybnMge0l0ZW1EcmFnfVxuICAgKi9cbiAgSXRlbURyYWcucHJvdG90eXBlLmZpbmlzaE1pZ3JhdGlvbiA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBkcmFnID0gdGhpcztcbiAgICB2YXIgaXRlbSA9IGRyYWcuZ2V0SXRlbSgpO1xuICAgIHZhciByZWxlYXNlID0gaXRlbS5fcmVsZWFzZTtcbiAgICB2YXIgZWxlbWVudCA9IGl0ZW0uX2VsZW1lbnQ7XG4gICAgdmFyIHRhcmdldEdyaWQgPSBpdGVtLmdldEdyaWQoKTtcbiAgICB2YXIgdGFyZ2V0R3JpZEVsZW1lbnQgPSB0YXJnZXRHcmlkLl9lbGVtZW50O1xuICAgIHZhciB0YXJnZXRTZXR0aW5ncyA9IHRhcmdldEdyaWQuX3NldHRpbmdzO1xuICAgIHZhciB0YXJnZXRDb250YWluZXIgPSB0YXJnZXRTZXR0aW5ncy5kcmFnQ29udGFpbmVyIHx8IHRhcmdldEdyaWRFbGVtZW50O1xuICAgIHZhciBjdXJyZW50U2V0dGluZ3MgPSBkcmFnLmdldEdyaWQoKS5fc2V0dGluZ3M7XG4gICAgdmFyIGN1cnJlbnRDb250YWluZXIgPSBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgdmFyIHRyYW5zbGF0ZVg7XG4gICAgdmFyIHRyYW5zbGF0ZVk7XG4gICAgdmFyIG9mZnNldERpZmY7XG5cbiAgICAvLyBEZXN0cm95IGN1cnJlbnQgZHJhZy4gTm90ZSB0aGF0IHdlIG5lZWQgdG8gc2V0IHRoZSBtaWdyYXRpbmcgZmxhZyB0b1xuICAgIC8vIGZhbHNlIGZpcnN0LCBiZWNhdXNlIG90aGVyd2lzZSB3ZSBjcmVhdGUgYW4gaW5maW5pdGUgbG9vcCBiZXR3ZWVuIHRoaXNcbiAgICAvLyBhbmQgdGhlIGRyYWcuc3RvcCgpIG1ldGhvZC5cbiAgICBkcmFnLl9pc01pZ3JhdGluZyA9IGZhbHNlO1xuICAgIGRyYWcuZGVzdHJveSgpO1xuXG4gICAgLy8gRGVzdHJveSBjdXJyZW50IGFuaW1hdGlvbiBoYW5kbGVycy5cbiAgICBpdGVtLl9hbmltYXRlLmRlc3Ryb3koKTtcbiAgICBpdGVtLl9hbmltYXRlQ2hpbGQuZGVzdHJveSgpO1xuXG4gICAgLy8gUmVtb3ZlIGN1cnJlbnQgY2xhc3NuYW1lcy5cbiAgICByZW1vdmVDbGFzcyhlbGVtZW50LCBjdXJyZW50U2V0dGluZ3MuaXRlbUNsYXNzKTtcbiAgICByZW1vdmVDbGFzcyhlbGVtZW50LCBjdXJyZW50U2V0dGluZ3MuaXRlbVZpc2libGVDbGFzcyk7XG4gICAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY3VycmVudFNldHRpbmdzLml0ZW1IaWRkZW5DbGFzcyk7XG5cbiAgICAvLyBBZGQgbmV3IGNsYXNzbmFtZXMuXG4gICAgYWRkQ2xhc3MoZWxlbWVudCwgdGFyZ2V0U2V0dGluZ3MuaXRlbUNsYXNzKTtcbiAgICBhZGRDbGFzcyhlbGVtZW50LCB0YXJnZXRTZXR0aW5ncy5pdGVtVmlzaWJsZUNsYXNzKTtcblxuICAgIC8vIEluc3RhbnRpYXRlIG5ldyBhbmltYXRpb24gY29udHJvbGxlcnMuXG4gICAgaXRlbS5fYW5pbWF0ZSA9IG5ldyBHcmlkLkl0ZW1BbmltYXRlKGl0ZW0sIGVsZW1lbnQpO1xuICAgIGl0ZW0uX2FuaW1hdGVDaGlsZCA9IG5ldyBHcmlkLkl0ZW1BbmltYXRlKGl0ZW0sIGl0ZW0uX2NoaWxkKTtcblxuICAgIC8vIE1vdmUgdGhlIGl0ZW0gaW5zaWRlIHRoZSB0YXJnZXQgY29udGFpbmVyIGlmIGl0J3MgZGlmZmVyZW50IHRoYW4gdGhlXG4gICAgLy8gY3VycmVudCBjb250YWluZXIuXG4gICAgaWYgKHRhcmdldENvbnRhaW5lciAhPT0gY3VycmVudENvbnRhaW5lcikge1xuICAgICAgdGFyZ2V0Q29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgb2Zmc2V0RGlmZiA9IGdldE9mZnNldERpZmYoY3VycmVudENvbnRhaW5lciwgdGFyZ2V0Q29udGFpbmVyLCB0cnVlKTtcbiAgICAgIHRyYW5zbGF0ZVggPSBnZXRUcmFuc2xhdGVBc0Zsb2F0KGVsZW1lbnQsICd4JykgLSBvZmZzZXREaWZmLmxlZnQ7XG4gICAgICB0cmFuc2xhdGVZID0gZ2V0VHJhbnNsYXRlQXNGbG9hdChlbGVtZW50LCAneScpIC0gb2Zmc2V0RGlmZi50b3A7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIGl0ZW0ncyBjYWNoZWQgZGltZW5zaW9ucyBhbmQgc29ydCBkYXRhLlxuICAgIGl0ZW0uX3JlZnJlc2hEaW1lbnNpb25zKCkuX3JlZnJlc2hTb3J0RGF0YSgpO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBvZmZzZXQgZGlmZmVyZW5jZSBiZXR3ZWVuIHRhcmdldCdzIGRyYWcgY29udGFpbmVyIChpZiBhbnkpXG4gICAgLy8gYW5kIGFjdHVhbCBncmlkIGNvbnRhaW5lciBlbGVtZW50LiBXZSBzYXZlIGl0IGxhdGVyIGZvciB0aGUgcmVsZWFzZVxuICAgIC8vIHByb2Nlc3MuXG4gICAgb2Zmc2V0RGlmZiA9IGdldE9mZnNldERpZmYodGFyZ2V0Q29udGFpbmVyLCB0YXJnZXRHcmlkRWxlbWVudCwgdHJ1ZSk7XG4gICAgcmVsZWFzZS5jb250YWluZXJEaWZmWCA9IG9mZnNldERpZmYubGVmdDtcbiAgICByZWxlYXNlLmNvbnRhaW5lckRpZmZZID0gb2Zmc2V0RGlmZi50b3A7XG5cbiAgICAvLyBSZWNyZWF0ZSBpdGVtJ3MgZHJhZyBoYW5kbGVyLlxuICAgIGl0ZW0uX2RyYWcgPSB0YXJnZXRTZXR0aW5ncy5kcmFnRW5hYmxlZCA/IG5ldyBHcmlkLkl0ZW1EcmFnKGl0ZW0pIDogbnVsbDtcblxuICAgIC8vIEFkanVzdCB0aGUgcG9zaXRpb24gb2YgdGhlIGl0ZW0gZWxlbWVudCBpZiBpdCB3YXMgbW92ZWQgZnJvbSBhIGNvbnRhaW5lclxuICAgIC8vIHRvIGFub3RoZXIuXG4gICAgaWYgKHRhcmdldENvbnRhaW5lciAhPT0gY3VycmVudENvbnRhaW5lcikge1xuICAgICAgc2V0U3R5bGVzKGVsZW1lbnQsIHt0cmFuc2Zvcm06IGdldFRyYW5zbGF0ZVN0cmluZyh0cmFuc2xhdGVYLCB0cmFuc2xhdGVZKX0pO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSBjaGlsZCBlbGVtZW50J3Mgc3R5bGVzIHRvIHJlZmxlY3QgdGhlIGN1cnJlbnQgdmlzaWJpbGl0eSBzdGF0ZS5cbiAgICBpdGVtLl9jaGlsZC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgdGFyZ2V0R3JpZC5faXRlbVNob3dIYW5kbGVyLnN0YXJ0KGl0ZW0sIHRydWUpO1xuXG4gICAgLy8gU3RhcnQgdGhlIHJlbGVhc2UuXG4gICAgcmVsZWFzZS5zdGFydCgpO1xuXG4gICAgcmV0dXJuIGRyYWc7XG5cbiAgfTtcblxuICAvKipcbiAgICogY2FuY2VsIG1vdmUvc2Nyb2xsIGV2ZW50IHJhZiBsb29wIGFjdGlvbi5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbURyYWcucHJvdG90eXBlXG4gICAqIEByZXR1cm5zIHtJdGVtRHJhZ31cbiAgICovXG4gIEl0ZW1EcmFnLnByb3RvdHlwZS5jYW5jZWxSYWZMb29wID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGlkID0gdGhpcy5nZXRJdGVtKCkuX2lkO1xuXG4gICAgcmFmTG9vcC5jYW5jZWwocmFmUXVldWVTY3JvbGwsIGlkKTtcbiAgICByYWZMb29wLmNhbmNlbChyYWZRdWV1ZU1vdmUsIGlkKTtcblxuICAgIHJldHVybiB0aGlzO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEFib3J0IGRyYWdnaW5nIGFuZCByZXNldCBkcmFnIGRhdGEuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW1EcmFnLnByb3RvdHlwZVxuICAgKiBAcmV0dXJucyB7SXRlbURyYWd9XG4gICAqL1xuICBJdGVtRHJhZy5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBkcmFnID0gdGhpcztcbiAgICB2YXIgZHJhZ0RhdGEgPSBkcmFnLl9kYXRhO1xuICAgIHZhciBpdGVtID0gZHJhZy5nZXRJdGVtKCk7XG4gICAgdmFyIGVsZW1lbnQgPSBpdGVtLl9lbGVtZW50O1xuICAgIHZhciBncmlkID0gZHJhZy5nZXRHcmlkKCk7XG5cbiAgICBpZiAoIWRyYWdEYXRhLmlzQWN0aXZlKSB7XG4gICAgICByZXR1cm4gZHJhZztcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgaXRlbSBpcyBiZWluZyBkcm9wcGVkIGludG8gYW5vdGhlciBncmlkLCBmaW5pc2ggaXQgdXAgYW5kIHJldHVyblxuICAgIC8vIGltbWVkaWF0ZWx5LlxuICAgIGlmIChkcmFnLl9pc01pZ3JhdGluZykge1xuICAgICAgcmV0dXJuIGRyYWcuZmluaXNoTWlncmF0aW9uKGRyYWdEYXRhLmN1cnJlbnRFdmVudCk7XG4gICAgfVxuXG4gICAgLy8gQ2FuY2VsIHJhZiBsb29wIGFjdGlvbnMuXG4gICAgZHJhZy5jYW5jZWxSYWZMb29wKCk7XG5cbiAgICAvLyBSZW1vdmUgc2Nyb2xsIGxpc3RlbmVycy5cbiAgICBkcmFnLnVuYmluZFNjcm9sbExpc3RlbmVycygpO1xuXG4gICAgLy8gQ2FuY2VsIG92ZXJsYXAgY2hlY2suXG4gICAgZHJhZy5fY2hlY2tTb3J0T3ZlcmxhcCgnY2FuY2VsJyk7XG5cbiAgICAvLyBBcHBlbmQgaXRlbSBlbGVtZW50IHRvIHRoZSBjb250YWluZXIgaWYgaXQncyBub3QgaXQncyBjaGlsZC4gQWxzbyBtYWtlXG4gICAgLy8gc3VyZSB0aGUgdHJhbnNsYXRlIHZhbHVlcyBhcmUgYWRqdXN0ZWQgdG8gYWNjb3VudCBmb3IgdGhlIERPTSBzaGlmdC5cbiAgICBpZiAoZWxlbWVudC5wYXJlbnROb2RlICE9PSBncmlkLl9lbGVtZW50KSB7XG4gICAgICBncmlkLl9lbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgc2V0U3R5bGVzKGVsZW1lbnQsIHt0cmFuc2Zvcm06IGdldFRyYW5zbGF0ZVN0cmluZyhkcmFnRGF0YS5ncmlkWCwgZHJhZ0RhdGEuZ3JpZFkpfSk7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGRyYWdnaW5nIGNsYXNzLlxuICAgIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGdyaWQuX3NldHRpbmdzLml0ZW1EcmFnZ2luZ0NsYXNzKTtcblxuICAgIC8vIFJlc2V0IGRyYWcgZGF0YS5cbiAgICBkcmFnLnJlc2V0KCk7XG5cbiAgICByZXR1cm4gZHJhZztcblxuICB9O1xuXG4gIC8qKlxuICAgKiBEcmFnIHN0YXJ0IGhhbmRsZXIuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEl0ZW1EcmFnLnByb3RvdHlwZVxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICogQHJldHVybnMge0l0ZW1EcmFnfVxuICAgKi9cbiAgSXRlbURyYWcucHJvdG90eXBlLm9uU3RhcnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgIHZhciBkcmFnID0gdGhpcztcbiAgICB2YXIgaXRlbSA9IGRyYWcuZ2V0SXRlbSgpO1xuXG4gICAgLy8gSWYgaXRlbSBpcyBub3QgYWN0aXZlLCBkb24ndCBzdGFydCB0aGUgZHJhZy5cbiAgICBpZiAoIWl0ZW0uX2lzQWN0aXZlKSB7XG4gICAgICByZXR1cm4gZHJhZztcbiAgICB9XG5cbiAgICB2YXIgZWxlbWVudCA9IGl0ZW0uX2VsZW1lbnQ7XG4gICAgdmFyIGdyaWQgPSBkcmFnLmdldEdyaWQoKTtcbiAgICB2YXIgc2V0dGluZ3MgPSBncmlkLl9zZXR0aW5ncztcbiAgICB2YXIgZHJhZ0RhdGEgPSBkcmFnLl9kYXRhO1xuICAgIHZhciByZWxlYXNlID0gaXRlbS5fcmVsZWFzZTtcbiAgICB2YXIgbWlncmF0ZSA9IGl0ZW0uX21pZ3JhdGU7XG4gICAgdmFyIGdyaWRDb250YWluZXIgPSBncmlkLl9lbGVtZW50O1xuICAgIHZhciBkcmFnQ29udGFpbmVyID0gc2V0dGluZ3MuZHJhZ0NvbnRhaW5lciB8fCBncmlkQ29udGFpbmVyO1xuICAgIHZhciBjb250YWluaW5nQmxvY2sgPSBnZXRDb250YWluaW5nQmxvY2soZHJhZ0NvbnRhaW5lciwgdHJ1ZSk7XG4gICAgdmFyIG9mZnNldERpZmYgPSBkcmFnQ29udGFpbmVyICE9PSBncmlkQ29udGFpbmVyID8gZ2V0T2Zmc2V0RGlmZihjb250YWluaW5nQmxvY2ssIGdyaWRDb250YWluZXIpIDogMDtcbiAgICB2YXIgY3VycmVudExlZnQgPSBnZXRUcmFuc2xhdGVBc0Zsb2F0KGVsZW1lbnQsICd4Jyk7XG4gICAgdmFyIGN1cnJlbnRUb3AgPSBnZXRUcmFuc2xhdGVBc0Zsb2F0KGVsZW1lbnQsICd5Jyk7XG4gICAgdmFyIGVsZW1lbnRSZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vIFN0b3AgY3VycmVudCBwb3NpdGlvbmluZyBhbmltYXRpb24uXG4gICAgaWYgKGl0ZW0uaXNQb3NpdGlvbmluZygpKSB7XG4gICAgICBpdGVtLl9zdG9wTGF5b3V0KHRydWUsIHt0cmFuc2Zvcm06IGdldFRyYW5zbGF0ZVN0cmluZyhjdXJyZW50TGVmdCwgY3VycmVudFRvcCl9KTtcbiAgICB9XG5cbiAgICAvLyBTdG9wIGN1cnJlbnQgbWlncmF0aW9uIGFuaW1hdGlvbi5cbiAgICBpZiAobWlncmF0ZS5pc0FjdGl2ZSkge1xuICAgICAgY3VycmVudExlZnQgLT0gbWlncmF0ZS5jb250YWluZXJEaWZmWDtcbiAgICAgIGN1cnJlbnRUb3AgLT0gbWlncmF0ZS5jb250YWluZXJEaWZmWTtcbiAgICAgIG1pZ3JhdGUuc3RvcCh0cnVlLCB7dHJhbnNmb3JtOiBnZXRUcmFuc2xhdGVTdHJpbmcoY3VycmVudExlZnQsIGN1cnJlbnRUb3ApfSk7XG4gICAgfVxuXG4gICAgLy8gSWYgaXRlbSBpcyBiZWluZyByZWxlYXNlZCByZXNldCByZWxlYXNlIGRhdGEuXG4gICAgaWYgKGl0ZW0uaXNSZWxlYXNpbmcoKSkge1xuICAgICAgcmVsZWFzZS5yZXNldCgpO1xuICAgIH1cblxuICAgIC8vIFNldHVwIGRyYWcgZGF0YS5cbiAgICBkcmFnRGF0YS5pc0FjdGl2ZSA9IHRydWU7XG4gICAgZHJhZ0RhdGEuc3RhcnRFdmVudCA9IGRyYWdEYXRhLmN1cnJlbnRFdmVudCA9IGV2ZW50O1xuICAgIGRyYWdEYXRhLmNvbnRhaW5lciA9IGRyYWdDb250YWluZXI7XG4gICAgZHJhZ0RhdGEuY29udGFpbmluZ0Jsb2NrID0gY29udGFpbmluZ0Jsb2NrO1xuICAgIGRyYWdEYXRhLmVsZW1lbnRDbGllbnRYID0gZWxlbWVudFJlY3QubGVmdDtcbiAgICBkcmFnRGF0YS5lbGVtZW50Q2xpZW50WSA9IGVsZW1lbnRSZWN0LnRvcDtcbiAgICBkcmFnRGF0YS5sZWZ0ID0gZHJhZ0RhdGEuZ3JpZFggPSBjdXJyZW50TGVmdDtcbiAgICBkcmFnRGF0YS50b3AgPSBkcmFnRGF0YS5ncmlkWSA9IGN1cnJlbnRUb3A7XG5cbiAgICAvLyBFbWl0IGRyYWdJbml0IGV2ZW50LlxuICAgIGdyaWQuX2VtaXQoZXZEcmFnSW5pdCwgaXRlbSwgZXZlbnQpO1xuXG4gICAgLy8gSWYgYSBzcGVjaWZpYyBkcmFnIGNvbnRhaW5lciBpcyBzZXQgYW5kIGl0IGlzIGRpZmZlcmVudCBmcm9tIHRoZVxuICAgIC8vIGdyaWQncyBjb250YWluZXIgZWxlbWVudCB3ZSBuZWVkIHRvIGNhc3Qgc29tZSBleHRyYSBzcGVsbHMuXG4gICAgaWYgKGRyYWdDb250YWluZXIgIT09IGdyaWRDb250YWluZXIpIHtcblxuICAgICAgLy8gU3RvcmUgdGhlIGNvbnRhaW5lciBvZmZzZXQgZGlmZnMgdG8gZHJhZyBkYXRhLlxuICAgICAgZHJhZ0RhdGEuY29udGFpbmVyRGlmZlggPSBvZmZzZXREaWZmLmxlZnQ7XG4gICAgICBkcmFnRGF0YS5jb250YWluZXJEaWZmWSA9IG9mZnNldERpZmYudG9wO1xuXG4gICAgICAvLyBJZiB0aGUgZHJhZ2dlZCBlbGVtZW50IGlzIGEgY2hpbGQgb2YgdGhlIGRyYWcgY29udGFpbmVyIGFsbCB3ZSBuZWVkIHRvXG4gICAgICAvLyBkbyBpcyBzZXR1cCB0aGUgcmVsYXRpdmUgZHJhZyBwb3NpdGlvbiBkYXRhLlxuICAgICAgaWYgKGVsZW1lbnQucGFyZW50Tm9kZSA9PT0gZHJhZ0NvbnRhaW5lcikge1xuICAgICAgICBkcmFnRGF0YS5ncmlkWCA9IGN1cnJlbnRMZWZ0IC0gZHJhZ0RhdGEuY29udGFpbmVyRGlmZlg7XG4gICAgICAgIGRyYWdEYXRhLmdyaWRZID0gY3VycmVudFRvcCAtIGRyYWdEYXRhLmNvbnRhaW5lckRpZmZZO1xuICAgICAgfVxuXG4gICAgICAvLyBPdGhlcndpc2Ugd2UgbmVlZCB0byBhcHBlbmQgdGhlIGVsZW1lbnQgaW5zaWRlIHRoZSBjb3JyZWN0IGNvbnRhaW5lcixcbiAgICAgIC8vIHNldHVwIHRoZSBhY3R1YWwgZHJhZyBwb3NpdGlvbiBkYXRhIGFuZCBhZGp1c3QgdGhlIGVsZW1lbnQncyB0cmFuc2xhdGVcbiAgICAgIC8vIHZhbHVlcyB0byBhY2NvdW50IGZvciB0aGUgRE9NIHBvc2l0aW9uIHNoaWZ0LlxuICAgICAgZWxzZSB7XG4gICAgICAgIGRyYWdEYXRhLmxlZnQgPSBjdXJyZW50TGVmdCArIGRyYWdEYXRhLmNvbnRhaW5lckRpZmZYO1xuICAgICAgICBkcmFnRGF0YS50b3AgPSBjdXJyZW50VG9wICsgZHJhZ0RhdGEuY29udGFpbmVyRGlmZlk7XG4gICAgICAgIGRyYWdDb250YWluZXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIHNldFN0eWxlcyhlbGVtZW50LCB7dHJhbnNmb3JtOiBnZXRUcmFuc2xhdGVTdHJpbmcoZHJhZ0RhdGEubGVmdCwgZHJhZ0RhdGEudG9wKX0pO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gU2V0IGRyYWcgY2xhc3MgYW5kIGJpbmQgc2Nyb2xsZXJzLlxuICAgIGFkZENsYXNzKGVsZW1lbnQsIHNldHRpbmdzLml0ZW1EcmFnZ2luZ0NsYXNzKTtcbiAgICBkcmFnLmJpbmRTY3JvbGxMaXN0ZW5lcnMoKTtcblxuICAgIC8vIEVtaXQgZHJhZ1N0YXJ0IGV2ZW50LlxuICAgIGdyaWQuX2VtaXQoZXZEcmFnU3RhcnQsIGl0ZW0sIGV2ZW50KTtcblxuICAgIHJldHVybiBkcmFnO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIERyYWcgbW92ZSBoYW5kbGVyLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtRHJhZy5wcm90b3R5cGVcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAqIEByZXR1cm5zIHtJdGVtRHJhZ31cbiAgICovXG4gIEl0ZW1EcmFnLnByb3RvdHlwZS5vbk1vdmUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgIHZhciBkcmFnID0gdGhpcztcbiAgICB2YXIgaXRlbSA9IGRyYWcuZ2V0SXRlbSgpO1xuXG4gICAgLy8gSWYgaXRlbSBpcyBub3QgYWN0aXZlLCByZXNldCBkcmFnLlxuICAgIGlmICghaXRlbS5faXNBY3RpdmUpIHtcbiAgICAgIHJldHVybiBkcmFnLnN0b3AoKTtcbiAgICB9XG5cbiAgICB2YXIgZWxlbWVudCA9IGl0ZW0uX2VsZW1lbnQ7XG4gICAgdmFyIGdyaWQgPSBkcmFnLmdldEdyaWQoKTtcbiAgICB2YXIgc2V0dGluZ3MgPSBncmlkLl9zZXR0aW5ncztcbiAgICB2YXIgZHJhZ0RhdGEgPSBkcmFnLl9kYXRhO1xuICAgIHZhciBheGlzID0gc2V0dGluZ3MuZHJhZ0F4aXM7XG4gICAgdmFyIHhEaWZmID0gZXZlbnQuZGVsdGFYIC0gZHJhZ0RhdGEuY3VycmVudEV2ZW50LmRlbHRhWDtcbiAgICB2YXIgeURpZmYgPSBldmVudC5kZWx0YVkgLSBkcmFnRGF0YS5jdXJyZW50RXZlbnQuZGVsdGFZO1xuXG4gICAgcmFmTG9vcC5hZGQocmFmUXVldWVNb3ZlLCBpdGVtLl9pZCwgZnVuY3Rpb24gKCkge1xuXG4gICAgICAvLyBVcGRhdGUgY3VycmVudCBldmVudC5cbiAgICAgIGRyYWdEYXRhLmN1cnJlbnRFdmVudCA9IGV2ZW50O1xuXG4gICAgICAvLyBVcGRhdGUgaG9yaXpvbnRhbCBwb3NpdGlvbiBkYXRhLlxuICAgICAgaWYgKGF4aXMgIT09ICd5Jykge1xuICAgICAgICBkcmFnRGF0YS5sZWZ0ICs9IHhEaWZmO1xuICAgICAgICBkcmFnRGF0YS5ncmlkWCArPSB4RGlmZjtcbiAgICAgICAgZHJhZ0RhdGEuZWxlbWVudENsaWVudFggKz0geERpZmY7XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSB2ZXJ0aWNhbCBwb3NpdGlvbiBkYXRhLlxuICAgICAgaWYgKGF4aXMgIT09ICd4Jykge1xuICAgICAgICBkcmFnRGF0YS50b3AgKz0geURpZmY7XG4gICAgICAgIGRyYWdEYXRhLmdyaWRZICs9IHlEaWZmO1xuICAgICAgICBkcmFnRGF0YS5lbGVtZW50Q2xpZW50WSArPSB5RGlmZjtcbiAgICAgIH1cblxuICAgICAgLy8gT3ZlcmxhcCBoYW5kbGluZy5cbiAgICAgIHNldHRpbmdzLmRyYWdTb3J0ICYmIGRyYWcuX2NoZWNrU29ydE92ZXJsYXAoKTtcblxuICAgIH0sIGZ1bmN0aW9uICgpIHtcblxuICAgICAgLy8gVXBkYXRlIGVsZW1lbnQncyB0cmFuc2xhdGVYL1kgdmFsdWVzLlxuICAgICAgc2V0U3R5bGVzKGVsZW1lbnQsIHt0cmFuc2Zvcm06IGdldFRyYW5zbGF0ZVN0cmluZyhkcmFnRGF0YS5sZWZ0LCBkcmFnRGF0YS50b3ApfSk7XG5cbiAgICAgIC8vIEVtaXQgZHJhZ01vdmUgZXZlbnQuXG4gICAgICBncmlkLl9lbWl0KGV2RHJhZ01vdmUsIGl0ZW0sIGV2ZW50KTtcblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRyYWc7XG5cbiAgfTtcblxuICAvKipcbiAgICogRHJhZyBzY3JvbGwgaGFuZGxlci5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgSXRlbURyYWcucHJvdG90eXBlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgKiBAcmV0dXJucyB7SXRlbURyYWd9XG4gICAqL1xuICBJdGVtRHJhZy5wcm90b3R5cGUub25TY3JvbGwgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgIHZhciBkcmFnID0gdGhpcztcbiAgICB2YXIgaXRlbSA9IGRyYWcuZ2V0SXRlbSgpO1xuICAgIHZhciBlbGVtZW50ID0gaXRlbS5fZWxlbWVudDtcbiAgICB2YXIgZ3JpZCA9IGRyYWcuZ2V0R3JpZCgpO1xuICAgIHZhciBzZXR0aW5ncyA9IGdyaWQuX3NldHRpbmdzO1xuICAgIHZhciBheGlzID0gc2V0dGluZ3MuZHJhZ0F4aXM7XG4gICAgdmFyIGRyYWdEYXRhID0gZHJhZy5fZGF0YTtcbiAgICB2YXIgZ3JpZENvbnRhaW5lciA9IGdyaWQuX2VsZW1lbnQ7XG4gICAgdmFyIGVsZW1lbnRSZWN0O1xuICAgIHZhciB4RGlmZjtcbiAgICB2YXIgeURpZmY7XG4gICAgdmFyIG9mZnNldERpZmY7XG5cbiAgICByYWZMb29wLmFkZChyYWZRdWV1ZVNjcm9sbCwgaXRlbS5faWQsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgLy8gQ2FsY3VsYXRlIGVsZW1lbnQncyByZWN0IGFuZCB4L3kgZGlmZi5cbiAgICAgIGVsZW1lbnRSZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHhEaWZmID0gZHJhZ0RhdGEuZWxlbWVudENsaWVudFggLSBlbGVtZW50UmVjdC5sZWZ0O1xuICAgICAgeURpZmYgPSBkcmFnRGF0YS5lbGVtZW50Q2xpZW50WSAtIGVsZW1lbnRSZWN0LnRvcDtcblxuICAgICAgLy8gVXBkYXRlIGNvbnRhaW5lciBkaWZmLlxuICAgICAgaWYgKGRyYWdEYXRhLmNvbnRhaW5lciAhPT0gZ3JpZENvbnRhaW5lcikge1xuICAgICAgICBvZmZzZXREaWZmID0gZ2V0T2Zmc2V0RGlmZihkcmFnRGF0YS5jb250YWluaW5nQmxvY2ssIGdyaWRDb250YWluZXIpO1xuICAgICAgICBkcmFnRGF0YS5jb250YWluZXJEaWZmWCA9IG9mZnNldERpZmYubGVmdDtcbiAgICAgICAgZHJhZ0RhdGEuY29udGFpbmVyRGlmZlkgPSBvZmZzZXREaWZmLnRvcDtcbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIGhvcml6b250YWwgcG9zaXRpb24gZGF0YS5cbiAgICAgIGlmIChheGlzICE9PSAneScpIHtcbiAgICAgICAgZHJhZ0RhdGEubGVmdCArPSB4RGlmZjtcbiAgICAgICAgZHJhZ0RhdGEuZ3JpZFggPSBkcmFnRGF0YS5sZWZ0IC0gZHJhZ0RhdGEuY29udGFpbmVyRGlmZlg7XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSB2ZXJ0aWNhbCBwb3NpdGlvbiBkYXRhLlxuICAgICAgaWYgKGF4aXMgIT09ICd4Jykge1xuICAgICAgICBkcmFnRGF0YS50b3AgKz0geURpZmY7XG4gICAgICAgIGRyYWdEYXRhLmdyaWRZID0gZHJhZ0RhdGEudG9wIC0gZHJhZ0RhdGEuY29udGFpbmVyRGlmZlk7XG4gICAgICB9XG5cbiAgICAgIC8vIE92ZXJsYXAgaGFuZGxpbmcuXG4gICAgICBzZXR0aW5ncy5kcmFnU29ydCAmJiBkcmFnLl9jaGVja1NvcnRPdmVybGFwKCk7XG5cbiAgICB9LCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIC8vIFVwZGF0ZSBlbGVtZW50J3MgdHJhbnNsYXRlWC9ZIHZhbHVlcy5cbiAgICAgIHNldFN0eWxlcyhlbGVtZW50LCB7dHJhbnNmb3JtOiBnZXRUcmFuc2xhdGVTdHJpbmcoZHJhZ0RhdGEubGVmdCwgZHJhZ0RhdGEudG9wKX0pO1xuXG4gICAgICAvLyBFbWl0IGRyYWdTY3JvbGwgZXZlbnQuXG4gICAgICBncmlkLl9lbWl0KGV2RHJhZ1Njcm9sbCwgaXRlbSwgZXZlbnQpO1xuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gZHJhZztcblxuICB9O1xuXG4gIC8qKlxuICAgKiBEcmFnIGVuZCBoYW5kbGVyLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBJdGVtRHJhZy5wcm90b3R5cGVcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAqIEByZXR1cm5zIHtJdGVtRHJhZ31cbiAgICovXG4gIEl0ZW1EcmFnLnByb3RvdHlwZS5vbkVuZCA9IGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgdmFyIGRyYWcgPSB0aGlzO1xuICAgIHZhciBpdGVtID0gZHJhZy5nZXRJdGVtKCk7XG4gICAgdmFyIGVsZW1lbnQgPSBpdGVtLl9lbGVtZW50O1xuICAgIHZhciBncmlkID0gZHJhZy5nZXRHcmlkKCk7XG4gICAgdmFyIHNldHRpbmdzID0gZ3JpZC5fc2V0dGluZ3M7XG4gICAgdmFyIGRyYWdEYXRhID0gZHJhZy5fZGF0YTtcbiAgICB2YXIgcmVsZWFzZSA9IGl0ZW0uX3JlbGVhc2U7XG5cbiAgICAvLyBJZiBpdGVtIGlzIG5vdCBhY3RpdmUsIHJlc2V0IGRyYWcuXG4gICAgaWYgKCFpdGVtLl9pc0FjdGl2ZSkge1xuICAgICAgcmV0dXJuIGRyYWcuc3RvcCgpO1xuICAgIH1cblxuICAgIC8vIENhbmNlbCByYWYgbG9vcCBhY3Rpb25zLlxuICAgIGRyYWcuY2FuY2VsUmFmTG9vcCgpO1xuXG4gICAgLy8gRmluaXNoIGN1cnJlbnRseSBxdWV1ZWQgb3ZlcmxhcCBjaGVjay5cbiAgICBzZXR0aW5ncy5kcmFnU29ydCAmJiBkcmFnLl9jaGVja1NvcnRPdmVybGFwKCdmaW5pc2gnKTtcblxuICAgIC8vIFJlbW92ZSBzY3JvbGwgbGlzdGVuZXJzLlxuICAgIGRyYWcudW5iaW5kU2Nyb2xsTGlzdGVuZXJzKCk7XG5cbiAgICAvLyBTZXR1cCByZWxlYXNlIGRhdGEuXG4gICAgcmVsZWFzZS5jb250YWluZXJEaWZmWCA9IGRyYWdEYXRhLmNvbnRhaW5lckRpZmZYO1xuICAgIHJlbGVhc2UuY29udGFpbmVyRGlmZlkgPSBkcmFnRGF0YS5jb250YWluZXJEaWZmWTtcblxuICAgIC8vIFJlc2V0IGRyYWcgZGF0YS5cbiAgICBkcmFnLnJlc2V0KCk7XG5cbiAgICAvLyBSZW1vdmUgZHJhZyBjbGFzc25hbWUgZnJvbSBlbGVtZW50LlxuICAgIHJlbW92ZUNsYXNzKGVsZW1lbnQsIHNldHRpbmdzLml0ZW1EcmFnZ2luZ0NsYXNzKTtcblxuICAgIC8vIEVtaXQgZHJhZ0VuZCBldmVudC5cbiAgICBncmlkLl9lbWl0KGV2RHJhZ0VuZCwgaXRlbSwgZXZlbnQpO1xuXG4gICAgLy8gRmluaXNoIHVwIHRoZSBtaWdyYXRpb24gcHJvY2VzcyBvciBzdGFydCB0aGUgcmVsZWFzZSBwcm9jZXNzLlxuICAgIGRyYWcuX2lzTWlncmF0aW5nID8gZHJhZy5maW5pc2hNaWdyYXRpb24oKSA6IHJlbGVhc2Uuc3RhcnQoKTtcblxuICAgIHJldHVybiBkcmFnO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIEhlbHBlcnMgLSBHZW5lcmljXG4gICAqICoqKioqKioqKioqKioqKioqXG4gICAqL1xuXG4gIC8qKlxuICAgKiBOb3JtYWxpemUgYXJyYXkgaW5kZXguIEJhc2ljYWxseSB0aGlzIGZ1bmN0aW9uIG1ha2VzIHN1cmUgdGhhdCB0aGUgcHJvdmlkZWRcbiAgICogYXJyYXkgaW5kZXggaXMgd2l0aGluIHRoZSBib3VuZHMgb2YgdGhlIHByb3ZpZGVkIGFycmF5IGFuZCBhbHNvIHRyYW5zZm9ybXNcbiAgICogbmVnYXRpdmUgaW5kZXggdG8gdGhlIG1hdGNoaW5nIHBvc2l0aXZlIGluZGV4LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheVxuICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICogQHBhcmFtIHtCb29sZWFufSBpc01pZ3JhdGlvblxuICAgKi9cbiAgZnVuY3Rpb24gbm9ybWFsaXplQXJyYXlJbmRleChhcnJheSwgaW5kZXgsIGlzTWlncmF0aW9uKSB7XG5cbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIHZhciBtYXhJbmRleCA9IE1hdGgubWF4KDAsIGlzTWlncmF0aW9uID8gbGVuZ3RoIDogbGVuZ3RoIC0gMSk7XG5cbiAgICByZXR1cm4gaW5kZXggPiBtYXhJbmRleCA/IG1heEluZGV4IDpcbiAgICAgIGluZGV4IDwgMCA/IE1hdGgubWF4KG1heEluZGV4ICsgaW5kZXggKyAxLCAwKSA6XG4gICAgICBpbmRleDtcblxuICB9XG5cbiAgLyoqXG4gICAqIFN3YXAgYXJyYXkgaXRlbXMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgKiAgIC0gSW5kZXggKHBvc2l0aXZlIG9yIG5lZ2F0aXZlKSBvZiB0aGUgaXRlbSB0aGF0IHdpbGwgYmUgc3dhcHBlZC5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHdpdGhJbmRleFxuICAgKiAgIC0gSW5kZXggKHBvc2l0aXZlIG9yIG5lZ2F0aXZlKSBvZiB0aGUgb3RoZXIgaXRlbSB0aGF0IHdpbGwgYmUgc3dhcHBlZC5cbiAgICovXG4gIGZ1bmN0aW9uIGFycmF5U3dhcChhcnJheSwgaW5kZXgsIHdpdGhJbmRleCkge1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoZSBhcnJheSBoYXMgdHdvIG9yIG1vcmUgaXRlbXMuXG4gICAgaWYgKGFycmF5Lmxlbmd0aCA8IDIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBOb3JtYWxpemUgdGhlIGluZGljZXMuXG4gICAgdmFyIGluZGV4QSA9IG5vcm1hbGl6ZUFycmF5SW5kZXgoYXJyYXksIGluZGV4KTtcbiAgICB2YXIgaW5kZXhCID0gbm9ybWFsaXplQXJyYXlJbmRleChhcnJheSwgd2l0aEluZGV4KTtcbiAgICB2YXIgdGVtcDtcblxuICAgIC8vIFN3YXAgdGhlIGl0ZW1zLlxuICAgIGlmIChpbmRleEEgIT09IGluZGV4Qikge1xuICAgICAgdGVtcCA9IGFycmF5W2luZGV4QV07XG4gICAgICBhcnJheVtpbmRleEFdID0gYXJyYXlbaW5kZXhCXTtcbiAgICAgIGFycmF5W2luZGV4Ql0gPSB0ZW1wO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqIE1vdmUgYXJyYXkgaXRlbSB0byBhbm90aGVyIGluZGV4LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheVxuICAgKiBAcGFyYW0ge051bWJlcn0gZnJvbUluZGV4XG4gICAqICAgLSBJbmRleCAocG9zaXRpdmUgb3IgbmVnYXRpdmUpIG9mIHRoZSBpdGVtIHRoYXQgd2lsbCBiZSBtb3ZlZC5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRvSW5kZXhcbiAgICogICAtIEluZGV4IChwb3NpdGl2ZSBvciBuZWdhdGl2ZSkgd2hlcmUgdGhlIGl0ZW0gc2hvdWxkIGJlIG1vdmVkIHRvLlxuICAgKi9cbiAgZnVuY3Rpb24gYXJyYXlNb3ZlKGFycmF5LCBmcm9tSW5kZXgsIHRvSW5kZXgpIHtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGUgYXJyYXkgaGFzIHR3byBvciBtb3JlIGl0ZW1zLlxuICAgIGlmIChhcnJheS5sZW5ndGggPCAyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gTm9ybWFsaXplIHRoZSBpbmRpY2VzLlxuICAgIHZhciBmcm9tID0gbm9ybWFsaXplQXJyYXlJbmRleChhcnJheSwgZnJvbUluZGV4KTtcbiAgICB2YXIgdG8gPSBub3JtYWxpemVBcnJheUluZGV4KGFycmF5LCB0b0luZGV4KTtcblxuICAgIC8vIEFkZCB0YXJnZXQgaXRlbSB0byB0aGUgbmV3IHBvc2l0aW9uLlxuICAgIGlmIChmcm9tICE9PSB0bykge1xuICAgICAgYXJyYXkuc3BsaWNlKHRvLCAwLCBhcnJheS5zcGxpY2UoZnJvbSwgMSlbMF0pO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBuZXcgZHVwbGljYXRlIGZyZWUgdmVyc2lvbiBvZiB0aGUgcHJvdmlkZWQgYXJyYXkuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5XG4gICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICovXG4gIGZ1bmN0aW9uIGFycmF5VW5pcXVlKGFycmF5KSB7XG5cbiAgICB2YXIgcmV0ID0gW107XG4gICAgdmFyIGxlbiA9IGFycmF5Lmxlbmd0aDtcbiAgICB2YXIgaTtcblxuICAgIGlmIChsZW4pIHtcbiAgICAgIHJldFswXSA9IGFycmF5WzBdO1xuICAgICAgZm9yIChpID0gMTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChyZXQuaW5kZXhPZihhcnJheVtpXSkgPCAwKSB7XG4gICAgICAgICAgcmV0LnB1c2goYXJyYXlbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcblxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBvYmplY3QuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7Kn0gdmFsXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWwpIHtcblxuICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHZhbHVlIGlzIGEgbm9kZSBsaXN0XG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7Kn0gdmFsXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgZnVuY3Rpb24gaXNOb2RlTGlzdCh2YWwpIHtcblxuICAgIHZhciB0eXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCk7XG4gICAgcmV0dXJuIHR5cGUgPT09ICdbb2JqZWN0IEhUTUxDb2xsZWN0aW9uXScgfHwgdHlwZSA9PT0gJ1tvYmplY3QgTm9kZUxpc3RdJztcblxuICB9XG5cbiAgLyoqXG4gICAqIE1lcmdlIHR3byBvYmplY3RzIHJlY3Vyc2l2ZWx5IChkZWVwIG1lcmdlKS4gVGhlIHNvdXJjZSBvYmplY3QncyBwcm9wZXJ0aWVzXG4gICAqIGFyZSBtZXJnZWQgdG8gdGhlIHRhcmdldCBvYmplY3QuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAgICogICAtIFRoZSB0YXJnZXQgb2JqZWN0LlxuICAgKiBAcGFyYW0ge09iamVjdH0gc291cmNlXG4gICAqICAgLSBUaGUgc291cmNlIG9iamVjdC5cbiAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgdGFyZ2V0IG9iamVjdC5cbiAgICovXG4gIGZ1bmN0aW9uIG1lcmdlT2JqZWN0cyh0YXJnZXQsIHNvdXJjZSkge1xuXG4gICAgLy8gTG9vcCB0aHJvdWdoIHRoZSBzdXJjZSBvYmplY3QncyBwcm9wcy5cbiAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKHByb3BOYW1lKSB7XG5cbiAgICAgIHZhciBpc09iamVjdCA9IGlzUGxhaW5PYmplY3Qoc291cmNlW3Byb3BOYW1lXSk7XG5cbiAgICAgIC8vIElmIHRhcmdldCBhbmQgc291cmNlIHZhbHVlcyBhcmUgYm90aCBvYmplY3RzLCBtZXJnZSB0aGUgb2JqZWN0cyBhbmRcbiAgICAgIC8vIGFzc2lnbiB0aGUgbWVyZ2VkIHZhbHVlIHRvIHRoZSB0YXJnZXQgcHJvcGVydHkuXG4gICAgICBpZiAoaXNQbGFpbk9iamVjdCh0YXJnZXRbcHJvcE5hbWVdKSAmJiBpc09iamVjdCkge1xuICAgICAgICB0YXJnZXRbcHJvcE5hbWVdID0gbWVyZ2VPYmplY3RzKHt9LCB0YXJnZXRbcHJvcE5hbWVdKTtcbiAgICAgICAgdGFyZ2V0W3Byb3BOYW1lXSA9IG1lcmdlT2JqZWN0cyh0YXJnZXRbcHJvcE5hbWVdLCBzb3VyY2VbcHJvcE5hbWVdKTtcbiAgICAgIH1cblxuICAgICAgLy8gT3RoZXJ3aXNlIHNldCB0aGUgc291cmNlIG9iamVjdCdzIHZhbHVlIHRvIHRhcmdldCBvYmplY3QgYW5kIG1ha2Ugc3VyZVxuICAgICAgLy8gdGhhdCBvYmplY3QgYW5kIGFycmF5IHZhbHVlcyBhcmUgY2xvbmVkIGFuZCBkaXJlY3RseSBhc3NpZ25lZC5cbiAgICAgIGVsc2Uge1xuICAgICAgICB0YXJnZXRbcHJvcE5hbWVdID0gaXNPYmplY3QgPyBtZXJnZU9iamVjdHMoe30sIHNvdXJjZVtwcm9wTmFtZV0pIDpcbiAgICAgICAgICBBcnJheS5pc0FycmF5KHNvdXJjZVtwcm9wTmFtZV0pID8gc291cmNlW3Byb3BOYW1lXS5jb25jYXQoKSA6XG4gICAgICAgICAgc291cmNlW3Byb3BOYW1lXTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRhcmdldDtcblxuICB9XG5cbiAgLyoqXG4gICAqIEluc2VydCBhbiBpdGVtIG9yIGFuIGFycmF5IG9mIGl0ZW1zIHRvIGFycmF5IHRvIGEgc3BlY2lmaWVkIGluZGV4LiBNdXRhdGVzXG4gICAqIHRoZSBhcnJheS4gVGhlIGluZGV4IGNhbiBiZSBuZWdhdGl2ZSBpbiB3aGljaCBjYXNlIHRoZSBpdGVtcyB3aWxsIGJlIGFkZGVkXG4gICAqIHRvIHRoZSBlbmQgb2YgdGhlIGFycmF5LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheVxuICAgKiBAcGFyYW0geyp9IGl0ZW1zXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbaW5kZXg9LTFdXG4gICAqL1xuICBmdW5jdGlvbiBpbnNlcnRJdGVtc1RvQXJyYXkoYXJyYXksIGl0ZW1zLCBpbmRleCkge1xuXG4gICAgdmFyIHRhcmdldEluZGV4ID0gdHlwZW9mIGluZGV4ID09PSB0eXBlTnVtYmVyID8gaW5kZXggOiAtMTtcbiAgICBhcnJheS5zcGxpY2UuYXBwbHkoYXJyYXksIFt0YXJnZXRJbmRleCA8IDAgPyBhcnJheS5sZW5ndGggLSB0YXJnZXRJbmRleCArIDEgOiB0YXJnZXRJbmRleCwgMF0uY29uY2F0KGl0ZW1zKSk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG4gICAqIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3JcbiAgICogTiBtaWxsaXNlY29uZHMuIFRoZSByZXR1cm5lZCBmdW5jdGlvbiBhY2NlcHRzIG9uZSBhcmd1bWVudCB3aGljaCwgd2hlblxuICAgKiBiZWluZyBcImZpbmlzaFwiLCBjYWxscyB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIGltbWVkaWF0ZWx5IGlmIGl0IGlzIGN1cnJlbnRseVxuICAgKiB3YWl0aW5nIHRvIGJlIGNhbGxlZCwgYW5kIHdoZW4gYmVpbmcgXCJjYW5jZWxcIiBjYW5jZWxzIHRoZSBjdXJyZW50bHkgcXVldWVkXG4gICAqIGZ1bmN0aW9uIGNhbGwuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB3YWl0XG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIGRlYm91bmNlKGZuLCB3YWl0KSB7XG5cbiAgICB2YXIgdGltZW91dDtcbiAgICB2YXIgYWN0aW9uQ2FuY2VsID0gJ2NhbmNlbCc7XG4gICAgdmFyIGFjdGlvbkZpbmlzaCA9ICdmaW5pc2gnO1xuXG4gICAgcmV0dXJuIHdhaXQgPiAwID8gZnVuY3Rpb24gKGFjdGlvbikge1xuXG4gICAgICBpZiAodGltZW91dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRpbWVvdXQgPSBnbG9iYWwuY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICBpZiAoYWN0aW9uID09PSBhY3Rpb25GaW5pc2gpIHtcbiAgICAgICAgICBmbigpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChhY3Rpb24gIT09IGFjdGlvbkNhbmNlbCAmJiBhY3Rpb24gIT09IGFjdGlvbkZpbmlzaCkge1xuICAgICAgICB0aW1lb3V0ID0gZ2xvYmFsLnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgZm4oKTtcbiAgICAgICAgfSwgd2FpdCk7XG4gICAgICB9XG5cbiAgICB9IDogZnVuY3Rpb24gKGFjdGlvbikge1xuXG4gICAgICBpZiAoYWN0aW9uICE9PSBhY3Rpb25DYW5jZWwpIHtcbiAgICAgICAgZm4oKTtcbiAgICAgIH1cblxuICAgIH07XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgcmFmIGxvb3AgcXVldWUgc3lzdGVtIHRoYXQgYWxsb3dzIHB1c2hpbmcgY2FsbGJhY2tzIHRvIGVpdGhlclxuICAgKiB0aGUgcmVhZCBxdWV1ZSBvciB0aGUgd3JpdGUgcXVldWUuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVSYWZMb29wKCkge1xuXG4gICAgdmFyIG5leHRUaWNrID0gbnVsbDtcbiAgICB2YXIgcXVldWUgPSBbXTtcbiAgICB2YXIgbWFwID0ge307XG4gICAgdmFyIHJhZiA9IChnbG9iYWwucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICB8fCBnbG9iYWwud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICB8fCBnbG9iYWwubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICB8fCBnbG9iYWwubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgIHx8IGZ1bmN0aW9uIChjYikge1xuICAgICAgICByZXR1cm4gZ2xvYmFsLnNldFRpbWVvdXQoY2IsIDE2KTtcbiAgICAgIH1cbiAgICApLmJpbmQoZ2xvYmFsKTtcblxuICAgIGZ1bmN0aW9uIGFkZCh0eXBlLCBpZCwgcmVhZENhbGxiYWNrLCB3cml0ZUNhbGxiYWNrKSB7XG5cbiAgICAgIC8vIEZpcnN0LCBsZXQncyBjaGVjayBpZiBhbiBpdGVtIGhhcyBiZWVuIGFkZGVkIHRvIHRoZSBxdWV1ZXMgd2l0aCB0aGVcbiAgICAgIC8vIHNhbWUgaWQgYW5kIHJlbW92ZSBpdC5cbiAgICAgIHZhciBjdXJyZW50SW5kZXggPSBxdWV1ZS5pbmRleE9mKHR5cGUgKyBpZCk7XG4gICAgICBpZiAoY3VycmVudEluZGV4ID4gLTEpIHtcbiAgICAgICAgcXVldWUuc3BsaWNlKGN1cnJlbnRJbmRleCwgMSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBhbGwgbW92ZS9zY3JvbGwgZXZlbnQgY2FsbGJhY2tzIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHF1ZXVlXG4gICAgICAvLyBhbmQgb3RoZXIgY2FsbGJhY2tzIHRvIHRoZSBlbmQgb2YgdGhlIHF1ZXVlLlxuICAgICAgdHlwZSA9PT0gcmFmUXVldWVNb3ZlIHx8IHR5cGUgPT09IHJhZlF1ZXVlU2Nyb2xsID8gcXVldWUudW5zaGlmdCh0eXBlICsgaWQpIDogcXVldWUucHVzaCh0eXBlICsgaWQpO1xuICAgICAgbWFwW3R5cGUgKyBpZF0gPSBbcmVhZENhbGxiYWNrLCB3cml0ZUNhbGxiYWNrXTtcblxuICAgICAgLy8gRmluYWxseSwgbGV0J3Mga2lja3N0YXJ0IHRoZSBuZXh0IHRpY2sgaWYgaXQgaXMgbm90IHJ1bm5pbmcgeWV0LlxuICAgICAgIW5leHRUaWNrICYmIChuZXh0VGljayA9IHJhZihmbHVzaCkpO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuY2VsKHR5cGUsIGlkKSB7XG5cbiAgICAgIC8vIExldCdzIGNoZWNrIGlmIGFuIGl0ZW0gaGFzIGJlZW4gYWRkZWQgdG8gdGhlIHF1ZXVlIHdpdGggdGhlIGlkIGFuZFxuICAgICAgLy8gaWYgc28gLT4gcmVtb3ZlIGl0LlxuICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IHF1ZXVlLmluZGV4T2YodHlwZSArIGlkKTtcbiAgICAgIGlmIChjdXJyZW50SW5kZXggPiAtMSkge1xuICAgICAgICBxdWV1ZS5zcGxpY2UoY3VycmVudEluZGV4LCAxKTtcbiAgICAgICAgbWFwW3R5cGUgKyBpZF0gPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmbHVzaCgpIHtcblxuICAgICAgdmFyIG1heEJhdGNoU2l6ZSA9ICtHcmlkLl9tYXhSYWZCYXRjaFNpemUgfHwgMTAwO1xuICAgICAgdmFyIGJhdGNoID0gcXVldWUuc3BsaWNlKDAsIE1hdGgubWluKG1heEJhdGNoU2l6ZSwgcXVldWUubGVuZ3RoKSk7XG4gICAgICB2YXIgYmF0Y2hNYXAgPSB7fTtcbiAgICAgIHZhciBpO1xuXG4gICAgICAvLyBSZXNldCB0aWNrZXIuXG4gICAgICBuZXh0VGljayA9IG51bGw7XG5cbiAgICAgIC8vIENyZWF0ZSBiYXRjaCBtYXAgYW5kIGNsZWFyIG1hcCBpdGVtcy5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBiYXRjaC5sZW5ndGg7IGkrKykge1xuICAgICAgICBiYXRjaE1hcFtiYXRjaFtpXV0gPSBtYXBbYmF0Y2hbaV1dO1xuICAgICAgICBtYXBbYmF0Y2hbaV1dID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICAvLyBQcm9jZXNzIHJlYWQgY2FsbGJhY2tzLlxuICAgICAgZm9yIChpID0gMDsgaSA8IGJhdGNoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGJhdGNoTWFwW2JhdGNoW2ldXVswXSgpO1xuICAgICAgfVxuXG4gICAgICAvLyBQcm9jZXNzIHdyaXRlIGNhbGxiYWNrcy5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBiYXRjaC5sZW5ndGg7IGkrKykge1xuICAgICAgICBiYXRjaE1hcFtiYXRjaFtpXV1bMV0oKTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVzdGFydCB0aGUgdGlja2VyIGlmIG5lZWRlZC5cbiAgICAgIGlmICghbmV4dFRpY2sgJiYgcXVldWUubGVuZ3RoKSB7XG4gICAgICAgIG5leHRUaWNrID0gcmFmKGZsdXNoKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBhZGQ6IGFkZCxcbiAgICAgIGNhbmNlbDogY2FuY2VsXG4gICAgfTtcblxuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlcnMgLSBET00gdXRpbHNcbiAgICogKioqKioqKioqKioqKioqKioqKlxuICAgKi9cblxuICAvKipcbiAgICogVHJhbnNmb3JtcyBhIGNhbWVsIGNhc2Ugc3R5bGUgcHJvcGVydHkgdG8ga2ViYWIgY2FzZSBzdHlsZSBwcm9wZXJ0eS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0U3R5bGVOYW1lKHN0cmluZykge1xuXG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oW0EtWl0pL2csICctJDEnKS50b0xvd2VyQ2FzZSgpO1xuXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29tcHV0ZWQgdmFsdWUgb2YgYW4gZWxlbWVudCdzIHN0eWxlIHByb3BlcnR5IGFzIGEgc3RyaW5nLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdHlsZVxuICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0U3R5bGUoZWxlbWVudCwgc3R5bGUpIHtcblxuICAgIHJldHVybiBnbG9iYWwuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHN0eWxlID09PSAndHJhbnNmb3JtJyA/IHRyYW5zZm9ybS5zdHlsZU5hbWUgfHwgc3R5bGUgOiBzdHlsZSk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb21wdXRlZCB2YWx1ZSBvZiBhbiBlbGVtZW50J3Mgc3R5bGUgcHJvcGVydHkgdHJhbnNmb3JtZWQgaW50b1xuICAgKiBhIGZsb2F0IHZhbHVlLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3R5bGVcbiAgICogQHJldHVybnMge051bWJlcn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldFN0eWxlQXNGbG9hdChlbCwgc3R5bGUpIHtcblxuICAgIHJldHVybiBwYXJzZUZsb2F0KGdldFN0eWxlKGVsLCBzdHlsZSkpIHx8IDA7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBlbGVtZW50J3MgY29tcHV0ZWQgdHJhbnNsYXRlWC9ZIHZhbHVlIGFzIGEgZmxvYXQuIEFzc3VtZXMgdGhhdFxuICAgKiB0aGUgdHJhbnNsYXRlIHZhbHVlIGlzIGRlZmluZWQgYXMgcGl4ZWxzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBheGlzXG4gICAqICAgLSBcInhcIiBvciBcInlcIi5cbiAgICogQHJldHVybnMge051bWJlcn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldFRyYW5zbGF0ZUFzRmxvYXQoZWxlbWVudCwgYXhpcykge1xuXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoKGdldFN0eWxlKGVsZW1lbnQsICd0cmFuc2Zvcm0nKSB8fCAnJykucmVwbGFjZSgnbWF0cml4KCcsICcnKS5zcGxpdCgnLCcpW2F4aXMgPT09ICd4JyA/IDQgOiA1XSkgfHwgMDtcblxuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybSB0cmFuc2xhdGVYIGFuZCB0cmFuc2xhdGVZIHZhbHVlIGludG8gQ1NTIHRyYW5zZm9ybSBzdHlsZVxuICAgKiBwcm9wZXJ0eSdzIHZhbHVlLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdHJhbnNsYXRlWFxuICAgKiBAcGFyYW0ge051bWJlcn0gdHJhbnNsYXRlWVxuICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0VHJhbnNsYXRlU3RyaW5nKHRyYW5zbGF0ZVgsIHRyYW5zbGF0ZVkpIHtcblxuICAgIHJldHVybiAndHJhbnNsYXRlWCgnICsgdHJhbnNsYXRlWCArICdweCkgdHJhbnNsYXRlWSgnICsgdHJhbnNsYXRlWSArICdweCknO1xuXG4gIH1cblxuICAvKipcbiAgICogR2V0IGN1cnJlbnQgdmFsdWVzIG9mIHRoZSBwcm92aWRlZCBzdHlsZXMgZGVmaW5pdGlvbiBvYmplY3QuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0eWxlc1xuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBmdW5jdGlvbiBnZXRDdXJyZW50U3R5bGVzKGVsZW1lbnQsIHN0eWxlcykge1xuXG4gICAgdmFyIGN1cnJlbnQgPSB7fTtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHN0eWxlcyk7XG4gICAgdmFyIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgY3VycmVudFtrZXlzW2ldXSA9IGdldFN0eWxlKGVsZW1lbnQsIGdldFN0eWxlTmFtZShrZXlzW2ldKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1cnJlbnQ7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgaW5saW5lIHN0eWxlcyB0byBhbiBlbGVtZW50LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXNcbiAgICovXG4gIGZ1bmN0aW9uIHNldFN0eWxlcyhlbGVtZW50LCBzdHlsZXMpIHtcblxuICAgIHZhciBwcm9wcyA9IE9iamVjdC5rZXlzKHN0eWxlcyk7XG4gICAgdmFyIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcHNbaV0gPT09ICd0cmFuc2Zvcm0nICYmIHRyYW5zZm9ybSA/IHRyYW5zZm9ybS5wcm9wTmFtZSA6IHByb3BzW2ldXSA9IHN0eWxlc1twcm9wc1tpXV07XG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICogQWRkIGNsYXNzIHRvIGFuIGVsZW1lbnQuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG5cbiAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIH1cbiAgICBlbHNlIGlmICghZWxlbWVudE1hdGNoZXMoZWxlbWVudCwgJy4nICsgY2xhc3NOYW1lKSkge1xuICAgICAgZWxlbWVudC5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjbGFzcyBuYW1lIGZyb20gYW4gZWxlbWVudC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICAgKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICBmdW5jdGlvbiByZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcblxuICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnRNYXRjaGVzKGVsZW1lbnQsICcuJyArIGNsYXNzTmFtZSkpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gKCcgJyArIGVsZW1lbnQuY2xhc3NOYW1lICsgJyAnKS5yZXBsYWNlKCcgJyArIGNsYXNzTmFtZSArICcgJywgJyAnKS50cmltKCk7XG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBub2RlTGlzdCB0byBhcnJheS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtOb2RlTGlzdH0gbm9kZUxpc3RcbiAgICogQHJldHVybnMge0hUTUxFbGVtZW50W119XG4gICAqL1xuICBmdW5jdGlvbiBub2RlTGlzdFRvQXJyYXkobm9kZUxpc3QpIHtcblxuICAgIHJldHVybiBbXS5zbGljZS5jYWxsKG5vZGVMaXN0KTtcblxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB0aGUgc3VwcG9ydGVkIGVsZW1lbnQubWF0Y2hlcygpIG1ldGhvZCBhbmQgcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXRcbiAgICogY2FuIGJlIHVzZWQgdG8gY2FsbCB0aGUgc3VwcG9ydGVkIG1ldGhvZC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybnMge0Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0U3VwcG9ydGVkRWxlbWVudE1hdGNoZXMoKSB7XG5cbiAgICB2YXIgcCA9IEVsZW1lbnQucHJvdG90eXBlO1xuICAgIHZhciBmbiA9IHAubWF0Y2hlcyB8fCBwLm1hdGNoZXNTZWxlY3RvciB8fCBwLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBwLm1vek1hdGNoZXNTZWxlY3RvciB8fCBwLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IHAub01hdGNoZXNTZWxlY3RvcjtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoZWwsIHNlbGVjdG9yKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbChlbCwgc2VsZWN0b3IpO1xuICAgIH07XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBzdXBwb3J0ZWQgc3R5bGUgcHJvcGVydHkncyBwcmVmaXgsIHByb3BlcnR5IG5hbWUgYW5kIHN0eWxlIG5hbWVcbiAgICogb3IgbnVsbCBpZiB0aGUgc3R5bGUgcHJvcGVydHkgaXMgbm90IHN1cHBvcnRlZC4gVGhpcyBpcyB1c2VkIGZvciBnZXR0aW5nXG4gICAqIHRoZSBzdXBwb3J0ZWQgdHJhbnNmb3JtLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3R5bGVcbiAgICogQHJldHVybnMgez9PYmplY3R9XG4gICAqL1xuICBmdW5jdGlvbiBnZXRTdXBwb3J0ZWRTdHlsZShzdHlsZSkge1xuXG4gICAgdmFyIHN0eWxlQ2FwID0gc3R5bGUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHlsZS5zbGljZSgxKTtcbiAgICB2YXIgcHJlZml4ZXMgPSBbJycsICdXZWJraXQnLCAnTW96JywgJ08nLCAnbXMnXTtcbiAgICB2YXIgcHJlZml4O1xuICAgIHZhciBwcm9wTmFtZTtcbiAgICB2YXIgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBwcmVmaXhlcy5sZW5ndGg7IGkrKykge1xuICAgICAgcHJlZml4ID0gcHJlZml4ZXNbaV07XG4gICAgICBwcm9wTmFtZSA9IHByZWZpeCA/IHByZWZpeCArIHN0eWxlQ2FwIDogc3R5bGU7XG4gICAgICBpZiAoZG9jRWxlbS5zdHlsZVtwcm9wTmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwcmVmaXggPSBwcmVmaXgudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmVmaXg6IHByZWZpeCxcbiAgICAgICAgICBwcm9wTmFtZTogcHJvcE5hbWUsXG4gICAgICAgICAgc3R5bGVOYW1lOiBwcmVmaXggPyAnLScgKyBwcmVmaXggKyAnLScgKyBzdHlsZSA6IHN0eWxlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIG9mZnNldCBkaWZmZXJlbmNlIHR3byBlbGVtZW50cy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbUFcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbUJcbiAgICogQHBhcmFtIHtCb29sZWFufSBbY29tcGFyZUNvbnRhaW5pbmdCbG9ja3M9ZmFsc2VdXG4gICAqICAgLSBXaGVuIHRoaXMgaXMgc2V0IHRvIHRydWUgdGhlIGNvbnRhaW5pbmcgYmxvY2tzIG9mIHRoZSBwcm92aWRlZCBlbGVtZW50c1xuICAgKiAgICAgd2lsbCBiZSB1c2VkIGZvciBjYWxjdWxhdGluZyB0aGUgZGlmZmVyZW5jZS4gT3RoZXJ3aXNlIHRoZSBwcm92aWRlZFxuICAgKiAgICAgZWxlbWVudHMgd2lsbCBiZSBjb21wYXJlZCBkaXJlY3RseS5cbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIGZ1bmN0aW9uIGdldE9mZnNldERpZmYoZWxlbUEsIGVsZW1CLCBjb21wYXJlQ29udGFpbmluZ0Jsb2Nrcykge1xuXG4gICAgaWYgKGVsZW1BID09PSBlbGVtQikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgdG9wOiAwXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChjb21wYXJlQ29udGFpbmluZ0Jsb2Nrcykge1xuICAgICAgZWxlbUEgPSBnZXRDb250YWluaW5nQmxvY2soZWxlbUEsIHRydWUpO1xuICAgICAgZWxlbUIgPSBnZXRDb250YWluaW5nQmxvY2soZWxlbUIsIHRydWUpO1xuICAgIH1cblxuICAgIHZhciBhT2Zmc2V0ID0gZ2V0T2Zmc2V0KGVsZW1BLCB0cnVlKTtcbiAgICB2YXIgYk9mZnNldCA9IGdldE9mZnNldChlbGVtQiwgdHJ1ZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbGVmdDogYk9mZnNldC5sZWZ0IC0gYU9mZnNldC5sZWZ0LFxuICAgICAgdG9wOiBiT2Zmc2V0LnRvcCAtIGFPZmZzZXQudG9wXG4gICAgfTtcblxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGVsZW1lbnQncyBkb2N1bWVudCBvZmZzZXQsIHdoaWNoIGluIHByYWN0aWNlIG1lYW5zIHRoZSB2ZXJ0aWNhbFxuICAgKiBhbmQgaG9yaXpvbnRhbCBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBlbGVtZW50J3Mgbm9ydGh3ZXN0IGNvcm5lciBhbmQgdGhlXG4gICAqIGRvY3VtZW50J3Mgbm9ydGh3ZXN0IGNvcm5lci5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHsoRG9jdW1lbnR8RWxlbWVudHxXaW5kb3cpfSBlbGVtZW50XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2V4Y2x1ZGVFbGVtZW50Qm9yZGVycz1mYWxzZV1cbiAgICogQHJldHVybnMge09mZnNldH1cbiAgICovXG4gIGZ1bmN0aW9uIGdldE9mZnNldChlbGVtZW50LCBleGNsdWRlRWxlbWVudEJvcmRlcnMpIHtcblxuICAgIHZhciByZWN0O1xuICAgIHZhciByZXQgPSB7XG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwXG4gICAgfTtcblxuICAgIC8vIERvY3VtZW50J3Mgb2Zmc2V0cyBhcmUgYWx3YXlzIDAuXG4gICAgaWYgKGVsZW1lbnQgPT09IGRvYykge1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICAvLyBBZGQgdmlld3BvcnQncyBzY3JvbGwgbGVmdC90b3AgdG8gdGhlIHJlc3BlY3RpdmUgb2Zmc2V0cy5cbiAgICByZXQubGVmdCA9IGdsb2JhbC5wYWdlWE9mZnNldCB8fCAwO1xuICAgIHJldC50b3AgPSBnbG9iYWwucGFnZVlPZmZzZXQgfHwgMDtcblxuICAgIC8vIFdpbmRvdydzIG9mZnNldHMgYXJlIHRoZSB2aWV3cG9ydCdzIHNjcm9sbCBsZWZ0L3RvcCB2YWx1ZXMuXG4gICAgaWYgKGVsZW1lbnQuc2VsZiA9PT0gZ2xvYmFsLnNlbGYpIHtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLy8gQWRkIGVsZW1lbnQncyBjbGllbnQgcmVjdHMgdG8gdGhlIG9mZnNldHMuXG4gICAgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0LmxlZnQgKz0gcmVjdC5sZWZ0O1xuICAgIHJldC50b3AgKz0gcmVjdC50b3A7XG5cbiAgICAvLyBFeGNsdWRlIGVsZW1lbnQncyBib3JkZXJzIGZyb20gdGhlIG9mZnNldCBpZiBuZWVkZWQuXG4gICAgaWYgKGV4Y2x1ZGVFbGVtZW50Qm9yZGVycykge1xuICAgICAgcmV0LmxlZnQgKz0gZ2V0U3R5bGVBc0Zsb2F0KGVsZW1lbnQsICdib3JkZXItbGVmdC13aWR0aCcpO1xuICAgICAgcmV0LnRvcCArPSBnZXRTdHlsZUFzRmxvYXQoZWxlbWVudCwgJ2JvcmRlci10b3Atd2lkdGgnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBhYWJzb2x1dGUgcG9zaXRpb25lZCBlbGVtZW50J3MgY29udGFpbmluZyBibG9jaywgd2hpY2ggaXNcbiAgICogY29uc2lkZXJlZCB0byBiZSB0aGUgY2xvc2VzdCBhbmNlc3RvciBlbGVtZW50IHRoYXQgdGhlIHRhcmdldCBlbGVtZW50J3NcbiAgICogcG9zaXRpb25pbmcgaXMgcmVsYXRpdmUgdG8uIERpc2NsYWltZXI6IHRoaXMgb25seSB3b3JrcyBhcyBpbnRlbmRlZCBmb3JcbiAgICogYWJvbHV0ZSBwb3NpdGlvbmVkIGVsZW1lbnRzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2lzUGFyZW50PWZhbHNlXVxuICAgKiAgIC0gV2hlbiB0aGlzIGlzIHNldCB0byB0cnVlIHRoZSBjb250YWluaW5nIGJsb2NrIGNoZWNraW5nIGlzIHN0YXJ0ZWQgZnJvbVxuICAgKiAgICAgdGhlIHByb3ZpZGVkIGVsZW1lbnQuIE90aGVyd2lzZSB0aGUgY2hlY2tpbmcgaXMgc3RhcnRlZCBmcm9tIHRoZVxuICAgKiAgICAgcHJvdmlkZWQgZWxlbWVudCdzIHBhcmVudCBlbGVtZW50LlxuICAgKiBAcmV0dXJucyB7KERvY3VtZW50fEVsZW1lbnQpfVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0Q29udGFpbmluZ0Jsb2NrKGVsZW1lbnQsIGlzUGFyZW50KSB7XG5cbiAgICAvLyBBcyBsb25nIGFzIHRoZSBjb250YWluaW5nIGJsb2NrIGlzIGFuIGVsZW1lbnQsIHN0YXRpYyBhbmQgbm90XG4gICAgLy8gdHJhbnNmb3JtZWQsIHRyeSB0byBnZXQgdGhlIGVsZW1lbnQncyBwYXJlbnQgZWxlbWVudCBhbmQgZmFsbGJhY2sgdG9cbiAgICAvLyBkb2N1bWVudC4gaHR0cHM6Ly9naXRodWIuY29tL25pa2xhc3JhbW8vbWV6ci9ibG9iLzAuNi4xL21lenIuanMjTDMzOVxuICAgIHZhciByZXQgPSAoaXNQYXJlbnQgPyBlbGVtZW50IDogZWxlbWVudC5wYXJlbnRFbGVtZW50KSB8fCBkb2M7XG4gICAgd2hpbGUgKHJldCAmJiByZXQgIT09IGRvYyAmJiBnZXRTdHlsZShyZXQsICdwb3NpdGlvbicpID09PSAnc3RhdGljJyAmJiAhaXNUcmFuc2Zvcm1lZChyZXQpKSB7XG4gICAgICByZXQgPSByZXQucGFyZW50RWxlbWVudCB8fCBkb2M7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcblxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBlbGVtZW50J3Mgc2Nyb2xsIHBhcmVudHMuXG4gICAqXG4gICAqIEJvcnJvd2VkIGZyb20galF1ZXJ5IFVJIGxpYnJhcnkgKGFuZCBoZWF2aWx5IG1vZGlmaWVkKTpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnktdWkvYmxvYi82MzQ0ODE0OGEyMTdkYTdlNjRjMDRiMjFhMDQ5ODJmMGQ2XG4gICAqIDRhYWJhYS91aS9zY3JvbGwtcGFyZW50LmpzXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAgICogQHJldHVybnMge0hUTUxFbGVtZW50W119XG4gICAqL1xuICBmdW5jdGlvbiBnZXRTY3JvbGxQYXJlbnRzKGVsZW1lbnQpIHtcblxuICAgIHZhciByZXQgPSBbXTtcbiAgICB2YXIgb3ZlcmZsb3dSZWdleCA9IC8oYXV0b3xzY3JvbGwpLztcbiAgICB2YXIgcGFyZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuXG4gICAgLy8gSWYgdHJhbnNmb3JtZWQgZWxlbWVudHMgbGVhayBmaXhlZCBlbGVtZW50cy5cbiAgICBpZiAodHJhbnNmb3JtTGVha3NGaXhlZCkge1xuXG4gICAgICAvLyBJZiB0aGUgZWxlbWVudCBpcyBmaXhlZCBpdCBjYW4gbm90IGhhdmUgYW55IHNjcm9sbCBwYXJlbnRzLlxuICAgICAgaWYgKGdldFN0eWxlKGVsZW1lbnQsICdwb3NpdGlvbicpID09PSAnZml4ZWQnKSB7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG5cbiAgICAgIC8vIEZpbmQgc2Nyb2xsIHBhcmVudHMuXG4gICAgICB3aGlsZSAocGFyZW50ICYmIHBhcmVudCAhPT0gZG9jICYmIHBhcmVudCAhPT0gZG9jRWxlbSkge1xuICAgICAgICBpZiAob3ZlcmZsb3dSZWdleC50ZXN0KGdldFN0eWxlKHBhcmVudCwgJ292ZXJmbG93JykgKyBnZXRTdHlsZShwYXJlbnQsICdvdmVyZmxvdy15JykgKyBnZXRTdHlsZShwYXJlbnQsICdvdmVyZmxvdy14JykpKSB7XG4gICAgICAgICAgcmV0LnB1c2gocGFyZW50KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnQgPSBnZXRTdHlsZShwYXJlbnQsICdwb3NpdGlvbicpID09PSAnZml4ZWQnID8gbnVsbCA6IHBhcmVudC5wYXJlbnROb2RlO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBwYXJlbnQgaXMgbm90IGZpeGVkIGVsZW1lbnQsIGFkZCB3aW5kb3cgb2JqZWN0IGFzIHRoZSBsYXN0IHNjcm9sbFxuICAgICAgLy8gcGFyZW50LlxuICAgICAgcGFyZW50ICE9PSBudWxsICYmIHJldC5wdXNoKGdsb2JhbCk7XG5cbiAgICB9XG4gICAgLy8gSWYgZml4ZWQgZWxlbWVudHMgYmVoYXZlIGFzIGRlZmluZWQgaW4gdGhlIFczQyBzcGVjaWZpY2F0aW9uLlxuICAgIGVsc2Uge1xuXG4gICAgICAvLyBGaW5kIHNjcm9sbCBwYXJlbnRzLlxuICAgICAgd2hpbGUgKHBhcmVudCAmJiBwYXJlbnQgIT09IGRvYykge1xuXG4gICAgICAgIC8vIElmIHRoZSBjdXJyZW50bHkgbG9vcGVkIGVsZW1lbnQgaXMgZml4ZWQgaWdub3JlIGFsbCBwYXJlbnRzIHRoYXQgYXJlXG4gICAgICAgIC8vIG5vdCB0cmFuc2Zvcm1lZC5cbiAgICAgICAgaWYgKGdldFN0eWxlKGVsZW1lbnQsICdwb3NpdGlvbicpID09PSAnZml4ZWQnICYmICFpc1RyYW5zZm9ybWVkKHBhcmVudCkpIHtcbiAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCB0aGUgcGFyZW50IGVsZW1lbnQgdG8gcmV0dXJuIGl0ZW1zIGlmIGl0IGlzIHNjcm9sbGFibGUuXG4gICAgICAgIGlmIChvdmVyZmxvd1JlZ2V4LnRlc3QoZ2V0U3R5bGUocGFyZW50LCAnb3ZlcmZsb3cnKSArIGdldFN0eWxlKHBhcmVudCwgJ292ZXJmbG93LXknKSArIGdldFN0eWxlKHBhcmVudCwgJ292ZXJmbG93LXgnKSkpIHtcbiAgICAgICAgICByZXQucHVzaChwYXJlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXBkYXRlIGVsZW1lbnQgYW5kIHBhcmVudCByZWZlcmVuY2VzLlxuICAgICAgICBlbGVtZW50ID0gcGFyZW50O1xuICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcblxuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGUgbGFzdCBpdGVtIGlzIHRoZSByb290IGVsZW1lbnQsIHJlcGxhY2UgaXQgd2l0aCB0aGUgZ2xvYmFsXG4gICAgICAvLyBvYmplY3QgKHdpbmRvdykuIFRoZSByb290IGVsZW1lbnQgc2Nyb2xsIGlzIHByb3BhZ2F0ZWQgdG8gdGhlIHdpbmRvdy5cbiAgICAgIGlmIChyZXRbcmV0Lmxlbmd0aCAtIDFdID09PSBkb2NFbGVtKSB7XG4gICAgICAgIHJldFtyZXQubGVuZ3RoIC0gMV0gPSBnbG9iYWw7XG4gICAgICB9XG5cbiAgICAgIC8vIE90aGVyd2lzZSBhZGQgZ2xvYmFsIG9iamVjdCAod2luZG93KSBhcyB0aGUgbGFzdCBzY3JvbGwgcGFyZW50LlxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldC5wdXNoKGdsb2JhbCk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuXG4gIH1cblxuICAvKipcbiAgICogRGV0ZWN0cyBpZiB0cmFuc2Zvcm1lZCBlbGVtZW50cyBsZWFrIGZpeGVkIGVsZW1lbnRzLiBBY2NvcmRpbmcgVzNDXG4gICAqIHRyYW5zZm9ybSByZW5kZXJpbmcgc3BlYyBhIHRyYW5zZm9ybWVkIGVsZW1lbnQgc2hvdWxkIGNvbnRhaW4gZXZlbiBmaXhlZFxuICAgKiBlbGVtZW50cy4gTWVhbmluZyB0aGF0IGZpeGVkIGVsZW1lbnRzIGFyZSBwb3NpdGlvbmVkIHJlbGF0aXZlIHRvIHRoZVxuICAgKiBjbG9zZXN0IHRyYW5zZm9ybWVkIGFuY2VzdG9yIGVsZW1lbnQgaW5zdGVhZCBvZiB3aW5kb3cuIEhvd2V2ZXIsIG5vdCBldmVyeVxuICAgKiBicm93c2VyIGZvbGxvd3MgdGhlIHNwZWMgKElFIGFuZCBvbGRlciBGaXJlZm94KS4gU28gd2UgbmVlZCB0byB0ZXN0IGl0LlxuICAgKiBodHRwczovL3d3dy53My5vcmcvVFIvY3NzMy0yZC10cmFuc2Zvcm1zLyN0cmFuc2Zvcm0tcmVuZGVyaW5nXG4gICAqXG4gICAqIEJvcnJvd2VkIGZyb20gTWV6ciAodjAuNi4xKTpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL25pa2xhc3JhbW8vbWV6ci9ibG9iLzAuNi4xL21lenIuanMjTDYwN1xuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICogICAtIFJldHVybnMgdHJ1ZSBpZiB0cmFuc2Zvcm1lZCBlbGVtZW50cyBsZWFrIGZpeGVkIGVsZW1lbnRzLCBmYWxzZVxuICAgKiAgICAgb3RoZXJ3aXNlLlxuICAgKi9cbiAgZnVuY3Rpb24gZG9lc1RyYW5zZm9ybUxlYWtGaXhlZCgpIHtcblxuICAgIGlmICghdHJhbnNmb3JtKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgZWxlbXMgPSBbMCwgMV0ubWFwKGZ1bmN0aW9uIChlbGVtLCBpc0lubmVyKSB7XG4gICAgICBlbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgc2V0U3R5bGVzKGVsZW0sIHtcbiAgICAgICAgcG9zaXRpb246IGlzSW5uZXIgPyAnZml4ZWQnIDogJ2Fic29sdXRlJyxcbiAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gICAgICAgIGxlZnQ6IGlzSW5uZXIgPyAnMHB4JyA6ICcxcHgnLFxuICAgICAgICB0cmFuc2Zvcm06ICdub25lJ1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9KTtcbiAgICB2YXIgb3V0ZXIgPSBib2R5LmFwcGVuZENoaWxkKGVsZW1zWzBdKTtcbiAgICB2YXIgaW5uZXIgPSBvdXRlci5hcHBlbmRDaGlsZChlbGVtc1sxXSk7XG4gICAgdmFyIGxlZnQgPSBpbm5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgIHNldFN0eWxlcyhvdXRlciwge3RyYW5zZm9ybTogJ3NjYWxlKDEpJ30pO1xuICAgIHZhciBpc0xlYWtpbmcgPSBsZWZ0ID09PSBpbm5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgIGJvZHkucmVtb3ZlQ2hpbGQob3V0ZXIpO1xuXG4gICAgcmV0dXJuIGlzTGVha2luZztcblxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBlbGVtZW50IGlzIHRyYW5zZm9ybWVkLCBmYWxzZSBpZiBub3QuIEluIHByYWN0aWNlIHRoZVxuICAgKiBlbGVtZW50J3MgZGlzcGxheSB2YWx1ZSBtdXN0IGJlIGFueXRoaW5nIGVsc2UgdGhhbiBcIm5vbmVcIiBvciBcImlubGluZVwiIGFzXG4gICAqIHdlbGwgYXMgaGF2ZSBhIHZhbGlkIHRyYW5zZm9ybSB2YWx1ZSBhcHBsaWVkIGluIG9yZGVyIHRvIGJlIGNvdW50ZWQgYXMgYVxuICAgKiB0cmFuc2Zvcm1lZCBlbGVtZW50LlxuICAgKlxuICAgKiBCb3Jyb3dlZCBmcm9tIE1lenIgKHYwLjYuMSk6XG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9uaWtsYXNyYW1vL21lenIvYmxvYi8wLjYuMS9tZXpyLmpzI0w2NjFcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGZ1bmN0aW9uIGlzVHJhbnNmb3JtZWQoZWxlbWVudCkge1xuXG4gICAgdmFyIHRyYW5zZm9ybSA9IGdldFN0eWxlKGVsZW1lbnQsICd0cmFuc2Zvcm0nKTtcbiAgICB2YXIgZGlzcGxheSA9IGdldFN0eWxlKGVsZW1lbnQsICdkaXNwbGF5Jyk7XG5cbiAgICByZXR1cm4gdHJhbnNmb3JtICE9PSAnbm9uZScgJiYgZGlzcGxheSAhPT0gJ2lubGluZScgJiYgZGlzcGxheSAhPT0gJ25vbmUnO1xuXG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIGhvdyBtYW55IHBlcmNlbnQgdGhlIGludGVyc2VjdGlvbiBhcmVhIG9mIHR3byByZWN0YW5nbGVzIGlzIGZyb21cbiAgICogdGhlIG1heGltdW0gcG90ZW50aWFsIGludGVyc2VjdGlvbiBhcmVhIGJldHdlZW4gdGhlIHJlY3RhbmdsZXMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7UmVjdGFuZ2xlfSBhXG4gICAqIEBwYXJhbSB7UmVjdGFuZ2xlfSBiXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqICAgLSBBIG51bWJlciBiZXR3ZWVuIDAtMTAwLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0UmVjdE92ZXJsYXBTY29yZShhLCBiKSB7XG5cbiAgICAvLyBSZXR1cm4gMCBpbW1lZGlhdGVseSBpZiB0aGUgcmVjdGFuZ2xlcyBkbyBub3Qgb3ZlcmxhcC5cbiAgICBpZiAoIW11dXJpTGF5b3V0LmRvUmVjdHNPdmVybGFwKGEsIGIpKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICAvLyBDYWxjdWxhdGUgaW50ZXJzZWN0aW9uIGFyZWEncyB3aWR0aCwgaGVpZ2h0LCBtYXggaGVpZ2h0IGFuZCBtYXggd2lkdGguXG4gICAgdmFyIHdpZHRoID0gTWF0aC5taW4oYS5sZWZ0ICsgYS53aWR0aCwgYi5sZWZ0ICsgYi53aWR0aCkgLSBNYXRoLm1heChhLmxlZnQsIGIubGVmdCk7XG4gICAgdmFyIGhlaWdodCA9IE1hdGgubWluKGEudG9wICsgYS5oZWlnaHQsIGIudG9wICsgYi5oZWlnaHQpIC0gTWF0aC5tYXgoYS50b3AsIGIudG9wKTtcbiAgICB2YXIgbWF4V2lkdGggPSBNYXRoLm1pbihhLndpZHRoLCBiLndpZHRoKTtcbiAgICB2YXIgbWF4SGVpZ2h0ID0gTWF0aC5taW4oYS5oZWlnaHQsIGIuaGVpZ2h0KTtcblxuICAgIHJldHVybiAod2lkdGggKiBoZWlnaHQpIC8gKG1heFdpZHRoICogbWF4SGVpZ2h0KSAqIDEwMDtcblxuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlcnMgLSBJdGVtIHNvcnQgdXRpbGl0aWVzXG4gICAqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqL1xuXG4gIC8qKlxuICAgKiBIZWxwZXIgZm9yIHRoZSBzb3J0IG1ldGhvZCB0byBnZW5lcmF0ZSBtYXBwZWQgdmVyc2lvbiBvZiB0aGUgaXRlbXMgYXJyYXlcbiAgICogdGhhbiBjb250YWlucyByZWZlcmVuY2UgdG8gdGhlIGl0ZW0gaW5kaWNlcy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtJdGVtW119IGl0ZW1zXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBmdW5jdGlvbiBnZXRJdGVtSW5kZXhNYXAoaXRlbXMpIHtcblxuICAgIHZhciByZXQgPSB7fTtcbiAgICB2YXIgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgcmV0W2l0ZW1zW2ldLl9pZF0gPSBpO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgZm9yIHRoZSBzb3J0IG1ldGhvZCB0byBjb21wYXJlIHRoZSBpbmRpY2VzIG9mIHRoZSBpdGVtcyB0byBlbmZvcmNlXG4gICAqIHN0YWJsZSBzb3J0LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0l0ZW19IGl0ZW1BXG4gICAqIEBwYXJhbSB7SXRlbX0gaXRlbUJcbiAgICogQHBhcmFtIHtCb29sZWFufSBpc0Rlc2NlbmRpbmdcbiAgICogQHBhcmFtIHtPYmplY3R9IGluZGV4TWFwXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqL1xuICBmdW5jdGlvbiBjb21wYXJlSXRlbUluZGljZXMoaXRlbUEsIGl0ZW1CLCBpc0Rlc2NlbmRpbmcsIGluZGV4TWFwKSB7XG5cbiAgICB2YXIgaW5kZXhBID0gaW5kZXhNYXBbaXRlbUEuX2lkXTtcbiAgICB2YXIgaW5kZXhCID0gaW5kZXhNYXBbaXRlbUIuX2lkXTtcbiAgICByZXR1cm4gaXNEZXNjZW5kaW5nID8gaW5kZXhCIC0gaW5kZXhBIDogaW5kZXhBIC0gaW5kZXhCO1xuXG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIGZvciB0aGUgc29ydCBtZXRob2QgdG8gY29tcGFyZSB0aGUgaXRlbXMgYmFzZWQgb24gdGhlIHByb3ZpZGVkXG4gICAqIGF0dHJpYnV0ZXMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7SXRlbX0gaXRlbUFcbiAgICogQHBhcmFtIHtJdGVtfSBpdGVtQlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGlzRGVzY2VuZGluZ1xuICAgKiBAcGFyYW0ge09iamVjdH0gY3JpdGVyaWFzXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqL1xuICBmdW5jdGlvbiBjb21wYXJlSXRlbXMoaXRlbUEsIGl0ZW1CLCBpc0Rlc2NlbmRpbmcsIGNyaXRlcmlhcykge1xuXG4gICAgdmFyIHJldCA9IDA7XG4gICAgdmFyIGNyaXRlcmlhTmFtZTtcbiAgICB2YXIgY3JpdGVyaWFPcmRlcjtcbiAgICB2YXIgdmFsQTtcbiAgICB2YXIgdmFsQjtcbiAgICB2YXIgaTtcblxuICAgIC8vIExvb3AgdGhyb3VnaCB0aGUgbGlzdCBvZiBzb3J0IGNyaXRlcmlhcy5cbiAgICBmb3IgKGkgPSAwOyBpIDwgY3JpdGVyaWFzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIC8vIEdldCB0aGUgY3JpdGVyaWEgbmFtZSwgd2hpY2ggc2hvdWxkIG1hdGNoIGFuIGl0ZW0ncyBzb3J0IGRhdGEga2V5LlxuICAgICAgY3JpdGVyaWFOYW1lID0gY3JpdGVyaWFzW2ldWzBdO1xuICAgICAgY3JpdGVyaWFPcmRlciA9IGNyaXRlcmlhc1tpXVsxXTtcblxuICAgICAgLy8gR2V0IGl0ZW1zJyBjYWNoZWQgc29ydCB2YWx1ZXMgZm9yIHRoZSBjcml0ZXJpYS4gSWYgdGhlIGl0ZW0gaGFzIG5vIHNvcnRcbiAgICAgIC8vIGRhdGEgbGV0J3MgdXBkYXRlIHRoZSBpdGVtcyBzb3J0IGRhdGEgKHRoaXMgaXMgYSBsYXp5IGxvYWQgbWVjaGFuaXNtKS5cbiAgICAgIHZhbEEgPSAoaXRlbUEuX3NvcnREYXRhID8gaXRlbUEgOiBpdGVtQS5fcmVmcmVzaFNvcnREYXRhKCkpLl9zb3J0RGF0YVtjcml0ZXJpYU5hbWVdO1xuICAgICAgdmFsQiA9IChpdGVtQi5fc29ydERhdGEgPyBpdGVtQiA6IGl0ZW1CLl9yZWZyZXNoU29ydERhdGEoKSkuX3NvcnREYXRhW2NyaXRlcmlhTmFtZV07XG5cbiAgICAgIC8vIFNvcnQgdGhlIGl0ZW1zIGluIGRlc2NlbmRpbmcgb3JkZXIgaWYgZGVmaW5lZCBzbyBleHBsaWNpdGx5LlxuICAgICAgaWYgKGNyaXRlcmlhT3JkZXIgPT09ICdkZXNjJyB8fCAoIWNyaXRlcmlhT3JkZXIgJiYgaXNEZXNjZW5kaW5nKSkge1xuICAgICAgICByZXQgPSB2YWxCIDwgdmFsQSA/IC0xIDogdmFsQiA+IHZhbEEgPyAxIDogMDtcbiAgICAgIH1cblxuICAgICAgLy8gT3RoZXJ3aXNlIHNvcnQgaXRlbXMgaW4gYXNjZW5kaW5nIG9yZGVyLlxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldCA9IHZhbEEgPCB2YWxCID8gLTEgOiB2YWxBID4gdmFsQiA/IDEgOiAwO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB3ZSBoYXZlIC0xIG9yIDEgYXMgdGhlIHJldHVybiB2YWx1ZSwgbGV0J3MgcmV0dXJuIGl0IGltbWVkaWF0ZWx5LlxuICAgICAgaWYgKHJldCAhPT0gMCkge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcblxuICB9XG5cbiAgLyoqXG4gICAqIFJlb3JkZXIgYW4gYXJyYXkgb2YgaXRlbXMgYmFzZWQgb24gYW5vdGhlciBhcnJheSBvZiBpdGVtcy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtJdGVtW119IGl0ZW1zXG4gICAqIEBwYXJhbSB7SXRlbVtdfSByZWZJdGVtc1xuICAgKiBAcmV0dXJucyB7SXRlbVtdfVxuICAgKi9cbiAgZnVuY3Rpb24gc29ydEl0ZW1zQnlSZWZlcmVuY2UoaXRlbXMsIHJlZkl0ZW1zKSB7XG5cbiAgICB2YXIgbmV3SXRlbXMgPSBbXTtcbiAgICB2YXIgY3VycmVudEl0ZW1zID0gaXRlbXMuY29uY2F0KCk7XG4gICAgdmFyIGl0ZW07XG4gICAgdmFyIGN1cnJlbnRJbmRleDtcbiAgICB2YXIgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCByZWZJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgaXRlbSA9IHJlZkl0ZW1zW2ldO1xuICAgICAgY3VycmVudEluZGV4ID0gY3VycmVudEl0ZW1zLmluZGV4T2YoaXRlbSk7XG4gICAgICBpZiAoY3VycmVudEluZGV4ID4gLTEpIHtcbiAgICAgICAgbmV3SXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgY3VycmVudEl0ZW1zLnNwbGljZShjdXJyZW50SW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGl0ZW1zLnNwbGljZS5hcHBseShpdGVtcywgWzAsIGl0ZW1zLmxlbmd0aF0uY29uY2F0KG5ld0l0ZW1zKS5jb25jYXQoY3VycmVudEl0ZW1zKSk7XG5cbiAgICByZXR1cm4gaXRlbXM7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHBvaW50IChjb29yZGluYXRlKSBpcyB3aXRoaW4gYSByZWN0YW5nbGUuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gICAqIEBwYXJhbSB7UmVjdGFuZ2xlfSByZWN0XG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuICBmdW5jdGlvbiBpc1BvaW50V2l0aGluUmVjdCh4LCB5LCByZWN0KSB7XG5cbiAgICByZXR1cm4gcmVjdC53aWR0aFxuICAgICAgJiYgcmVjdC5oZWlnaHRcbiAgICAgICYmIHggPj0gcmVjdC5sZWZ0XG4gICAgICAmJiB4IDwgKHJlY3QubGVmdCArIHJlY3Qud2lkdGgpXG4gICAgICAmJiB5ID49IHJlY3QudG9wXG4gICAgICAmJiB5IDwgKHJlY3QudG9wICsgcmVjdC5oZWlnaHQpO1xuXG4gIH1cblxuICAvKipcbiAgICogSGVscGVycyAtIE11dXJpXG4gICAqICoqKioqKioqKioqKioqKlxuICAgKi9cblxuICAvKipcbiAgICogU2hvdyBvciBoaWRlIEdyaWQgaW5zdGFuY2UncyBpdGVtcy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtHcmlkfSBpbnN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAgICogICAtIFwic2hvd1wiIG9yIFwiaGlkZVwiLlxuICAgKiBAcGFyYW0geyhHcmlkTXVsdGlJdGVtUXVlcnl8R3JpZEl0ZW1TdGF0ZSl9IGl0ZW1zXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5pbnN0YW50PWZhbHNlXVxuICAgKiBAcGFyYW0geyhTaG93Q2FsbGJhY2t8SGlkZUNhbGxiYWNrKX0gW29wdGlvbnMub25GaW5pc2hdXG4gICAqIEBwYXJhbSB7KEJvb2xlYW58TGF5b3V0Q2FsbGJhY2t8U3RyaW5nKX0gW29wdGlvbnMubGF5b3V0PXRydWVdXG4gICAqIEByZXR1cm5zIHtHcmlkfVxuICAgKi9cbiAgZnVuY3Rpb24gZ3JpZFNob3dIaWRlSGFuZGxlcihpbnN0LCBtZXRob2QsIGl0ZW1zLCBvcHRpb25zKSB7XG5cbiAgICB2YXIgdGFyZ2V0SXRlbXMgPSBpbnN0LmdldEl0ZW1zKGl0ZW1zKTtcbiAgICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gICAgdmFyIGlzSW5zdGFudCA9IG9wdHMuaW5zdGFudCA9PT0gdHJ1ZTtcbiAgICB2YXIgY2FsbGJhY2sgPSBvcHRzLm9uRmluaXNoO1xuICAgIHZhciBsYXlvdXQgPSBvcHRzLmxheW91dCA/IG9wdHMubGF5b3V0IDogb3B0cy5sYXlvdXQgPT09IHVuZGVmaW5lZDtcbiAgICB2YXIgY291bnRlciA9IHRhcmdldEl0ZW1zLmxlbmd0aDtcbiAgICB2YXIgaXNTaG93ID0gbWV0aG9kID09PSAnc2hvdyc7XG4gICAgdmFyIHN0YXJ0RXZlbnQgPSBpc1Nob3cgPyBldlNob3dTdGFydCA6IGV2SGlkZVN0YXJ0O1xuICAgIHZhciBlbmRFdmVudCA9IGlzU2hvdyA/IGV2U2hvd0VuZCA6IGV2SGlkZUVuZDtcbiAgICB2YXIgbmVlZHNMYXlvdXQgPSBmYWxzZTtcbiAgICB2YXIgY29tcGxldGVkSXRlbXMgPSBbXTtcbiAgICB2YXIgaGlkZGVuSXRlbXMgPSBbXTtcbiAgICB2YXIgaXRlbTtcbiAgICB2YXIgaTtcblxuICAgIC8vIElmIHRoZXJlIGFyZSBubyBpdGVtcyBjYWxsIHRoZSBjYWxsYmFjaywgYnV0IGRvbid0IGVtaXQgYW55IGV2ZW50cy5cbiAgICBpZiAoIWNvdW50ZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IHR5cGVGdW5jdGlvbikge1xuICAgICAgICBjYWxsYmFjayh0YXJnZXRJdGVtcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gT3RoZXJ3aXNlIGlmIHdlIGhhdmUgc29tZSBpdGVtcyBsZXQncyBkaWcgaW4uXG4gICAgZWxzZSB7XG5cbiAgICAgIC8vIEVtaXQgc2hvd1N0YXJ0L2hpZGVTdGFydCBldmVudC5cbiAgICAgIGluc3QuX2VtaXQoc3RhcnRFdmVudCwgdGFyZ2V0SXRlbXMuY29uY2F0KCkpO1xuXG4gICAgICAvLyBTaG93L2hpZGUgaXRlbXMuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdGFyZ2V0SXRlbXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBpdGVtID0gdGFyZ2V0SXRlbXNbaV07XG5cbiAgICAgICAgLy8gSWYgaW5hY3RpdmUgaXRlbSBpcyBzaG93biBvciBhY3RpdmUgaXRlbSBpcyBoaWRkZW4gd2UgbmVlZCB0byBkb1xuICAgICAgICAvLyBsYXlvdXQuXG4gICAgICAgIGlmICgoaXNTaG93ICYmICFpdGVtLl9pc0FjdGl2ZSkgfHwgKCFpc1Nob3cgJiYgaXRlbS5faXNBY3RpdmUpKSB7XG4gICAgICAgICAgbmVlZHNMYXlvdXQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgaW5hY3RpdmUgaXRlbSBpcyBzaG93biB3ZSBhbHNvIG5lZWQgdG8gZG8gc29tZSBzcGVjaWFsIGhhY2tlcnkgdG9cbiAgICAgICAgLy8gbWFrZSB0aGUgaXRlbSBub3QgYW5pbWF0ZSBpdCdzIG5leHQgcG9zaXRpb25pbmcgKGxheW91dCkuXG4gICAgICAgIGlmIChpc1Nob3cgJiYgIWl0ZW0uX2lzQWN0aXZlKSB7XG4gICAgICAgICAgaXRlbS5fc2tpcE5leHRMYXlvdXRBbmltYXRpb24gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlIGEgaGlkZGVuIGl0ZW0gaXMgYmVpbmcgc2hvd24gd2UgbmVlZCB0byByZWZyZXNoIHRoZSBpdGVtJ3NcbiAgICAgICAgLy8gZGltZW5zaW9ucy5cbiAgICAgICAgaXNTaG93ICYmIGl0ZW0uX2lzSGlkZGVuICYmIGhpZGRlbkl0ZW1zLnB1c2goaXRlbSk7XG5cbiAgICAgICAgLy8gU2hvdy9oaWRlIHRoZSBpdGVtLlxuICAgICAgICBpdGVtWydfJyArIG1ldGhvZF0oaXNJbnN0YW50LCBmdW5jdGlvbiAoaW50ZXJydXB0ZWQsIGl0ZW0pIHtcblxuICAgICAgICAgIC8vIElmIHRoZSBjdXJyZW50IGl0ZW0ncyBhbmltYXRpb24gd2FzIG5vdCBpbnRlcnJ1cHRlZCBhZGQgaXQgdG8gdGhlXG4gICAgICAgICAgLy8gY29tcGxldGVkSXRlbXMgYXJyYXkuXG4gICAgICAgICAgaWYgKCFpbnRlcnJ1cHRlZCkge1xuICAgICAgICAgICAgY29tcGxldGVkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBJZiBhbGwgaXRlbXMgaGF2ZSBmaW5pc2hlZCB0aGVpciBhbmltYXRpb25zIGNhbGwgdGhlIGNhbGxiYWNrXG4gICAgICAgICAgLy8gYW5kIGVtaXQgc2hvd0VuZC9oaWRlRW5kIGV2ZW50LlxuICAgICAgICAgIGlmICgtLWNvdW50ZXIgPCAxKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSB0eXBlRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soY29tcGxldGVkSXRlbXMuY29uY2F0KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5zdC5fZW1pdChlbmRFdmVudCwgY29tcGxldGVkSXRlbXMuY29uY2F0KCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgfVxuXG4gICAgICAvLyBSZWZyZXNoIGhpZGRlbiBpdGVtcy5cbiAgICAgIGhpZGRlbkl0ZW1zLmxlbmd0aCAmJiBpbnN0LnJlZnJlc2hJdGVtcyhoaWRkZW5JdGVtcyk7XG5cbiAgICAgIC8vIExheW91dCBpZiBuZWVkZWQuXG4gICAgICBpZiAobmVlZHNMYXlvdXQgJiYgbGF5b3V0KSB7XG4gICAgICAgIGluc3QubGF5b3V0KGxheW91dCA9PT0gJ2luc3RhbnQnLCB0eXBlb2YgbGF5b3V0ID09PSB0eXBlRnVuY3Rpb24gPyBsYXlvdXQgOiB1bmRlZmluZWQpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3Q7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9iamVjdCB3aGljaCBjb250YWlucyBzdGFydCBhbmQgc3RvcCBtZXRob2RzIGZvciBpdGVtJ3NcbiAgICogc2hvdy9oaWRlIHByb2Nlc3MuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzZXR0aW5nc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SXRlbVZpc2liaWxpdHlIYW5kbGVyKHR5cGUsIHNldHRpbmdzKSB7XG5cbiAgICB2YXIgaXNTaG93ID0gdHlwZSA9PT0gJ3Nob3cnO1xuICAgIHZhciBkdXJhdGlvbiA9IHBhcnNlSW50KGlzU2hvdyA/IHNldHRpbmdzLnNob3dEdXJhdGlvbiA6IHNldHRpbmdzLmhpZGVEdXJhdGlvbikgfHwgMDtcbiAgICB2YXIgZWFzaW5nID0gKGlzU2hvdyA/IHNldHRpbmdzLnNob3dFYXNpbmcgOiBzZXR0aW5ncy5oaWRlRWFzaW5nKSB8fCAnZWFzZSc7XG4gICAgdmFyIHN0eWxlcyA9IGlzU2hvdyA/IHNldHRpbmdzLnZpc2libGVTdHlsZXMgOiBzZXR0aW5ncy5oaWRkZW5TdHlsZXM7XG4gICAgdmFyIGlzRW5hYmxlZCA9IGR1cmF0aW9uID4gMDtcbiAgICB2YXIgY3VycmVudFN0eWxlcztcblxuICAgIHN0eWxlcyA9IGlzUGxhaW5PYmplY3Qoc3R5bGVzKSA/IHN0eWxlcyA6IG51bGw7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3RhcnQ6IGZ1bmN0aW9uIChpdGVtLCBpbnN0YW50LCBvbkZpbmlzaCkge1xuICAgICAgICBpZiAoIXN0eWxlcykge1xuICAgICAgICAgIG9uRmluaXNoICYmIG9uRmluaXNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmFmTG9vcC5jYW5jZWwocmFmUXVldWVWaXNpYmlsaXR5LCBpdGVtLl9pZCk7XG4gICAgICAgICAgaWYgKCFpc0VuYWJsZWQgfHwgaW5zdGFudCkge1xuICAgICAgICAgICAgaWYgKGl0ZW0uX2FuaW1hdGVDaGlsZC5pc0FuaW1hdGluZygpKSB7XG4gICAgICAgICAgICAgIGl0ZW0uX2FuaW1hdGVDaGlsZC5zdG9wKHN0eWxlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgc2V0U3R5bGVzKGl0ZW0uX2NoaWxkLCBzdHlsZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb25GaW5pc2ggJiYgb25GaW5pc2goKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByYWZMb29wLmFkZChyYWZRdWV1ZVZpc2liaWxpdHksIGl0ZW0uX2lkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRTdHlsZXMgPSBnZXRDdXJyZW50U3R5bGVzKGl0ZW0uX2NoaWxkLCBzdHlsZXMpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpdGVtLl9hbmltYXRlQ2hpbGQuc3RhcnQoY3VycmVudFN0eWxlcywgc3R5bGVzLCB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICAgIGVhc2luZzogZWFzaW5nLFxuICAgICAgICAgICAgICAgIG9uRmluaXNoOiBvbkZpbmlzaFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHN0b3A6IGZ1bmN0aW9uIChpdGVtLCB0YXJnZXRTdHlsZXMpIHtcbiAgICAgICAgcmFmTG9vcC5jYW5jZWwocmFmUXVldWVWaXNpYmlsaXR5LCBpdGVtLl9pZCk7XG4gICAgICAgIGl0ZW0uX2FuaW1hdGVDaGlsZC5zdG9wKHRhcmdldFN0eWxlcyk7XG4gICAgICB9XG4gICAgfTtcblxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0YXJnZXQgZ3JpZCBmb3IgdGhlIGRlZmF1bHQgZHJhZyBzb3J0IHByZWRpY2F0ZS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtJdGVtfSBpdGVtXG4gICAqIEBwYXJhbSB7R3JpZH0gcm9vdEdyaWRcbiAgICogQHBhcmFtIHtSZWN0YW5nbGV9IGl0ZW1SZWN0XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aHJlc2hvbGRcbiAgICogQHJldHVybnMgez9HcmlkfVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0VGFyZ2V0R3JpZChpdGVtLCByb290R3JpZCwgaXRlbVJlY3QsIHRocmVzaG9sZCkge1xuXG4gICAgdmFyIHJldCA9IG51bGw7XG4gICAgdmFyIGRyYWdTb3J0ID0gcm9vdEdyaWQuX3NldHRpbmdzLmRyYWdTb3J0O1xuICAgIHZhciBncmlkcyA9IGRyYWdTb3J0ID09PSB0cnVlID8gW3Jvb3RHcmlkXSA6IGRyYWdTb3J0LmNhbGwocm9vdEdyaWQsIGl0ZW0pO1xuICAgIHZhciBiZXN0U2NvcmUgPSAtMTtcbiAgICB2YXIgZ3JpZFNjb3JlO1xuICAgIHZhciBncmlkO1xuICAgIHZhciBpO1xuXG4gICAgLy8gUmV0dXJuIGltbWVkaWF0ZWx5IGlmIHRoZXJlIGFyZSBubyBncmlkcy5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZ3JpZHMpKSB7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIC8vIExvb3AgdGhyb3VnaCB0aGUgZ3JpZHMgYW5kIGdldCB0aGUgYmVzdCBtYXRjaC5cbiAgICBmb3IgKGkgPSAwOyBpIDwgZ3JpZHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgZ3JpZCA9IGdyaWRzW2ldO1xuXG4gICAgICAvLyBGaWx0ZXIgb3V0IGFsbCBkZXN0cm95ZWQgZ3JpZHMuXG4gICAgICBpZiAoZ3JpZC5faXNEZXN0cm95ZWQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIFdlIG5lZWQgdG8gdXBkYXRlIHRoZSBncmlkJ3Mgb2Zmc2V0IHNpbmNlIGl0IG1heSBoYXZlIGNoYW5nZWQgZHVyaW5nXG4gICAgICAvLyBzY3JvbGxpbmcuIFRoaXMgY291bGQgYmUgbGVmdCBhcyBwcm9ibGVtIGZvciB0aGUgdXNlcmxhbmQsIGJ1dCBpdCdzXG4gICAgICAvLyBtdWNoIG5pY2VyIHRoaXMgd2F5LiBPbmUgbGVzcyBoYWNrIGZvciB0aGUgdXNlciB0byB3b3JyeSBhYm91dCA9KVxuICAgICAgZ3JpZC5fcmVmcmVzaERpbWVuc2lvbnMoKTtcblxuICAgICAgLy8gQ2hlY2sgaG93IG11Y2ggZHJhZ2dlZCBlbGVtZW50IG92ZXJsYXBzIHRoZSBjb250YWluZXIgZWxlbWVudC5cbiAgICAgIGdyaWRTY29yZSA9IGdldFJlY3RPdmVybGFwU2NvcmUoaXRlbVJlY3QsIHtcbiAgICAgICAgd2lkdGg6IGdyaWQuX3dpZHRoLFxuICAgICAgICBoZWlnaHQ6IGdyaWQuX2hlaWdodCxcbiAgICAgICAgbGVmdDogZ3JpZC5fbGVmdCxcbiAgICAgICAgdG9wOiBncmlkLl90b3BcbiAgICAgIH0pO1xuXG4gICAgICAvLyBDaGVjayBpZiB0aGlzIGdyaWQgaXMgdGhlIGJlc3QgbWF0Y2ggc28gZmFyLlxuICAgICAgaWYgKGdyaWRTY29yZSA+IHRocmVzaG9sZCAmJiBncmlkU2NvcmUgPiBiZXN0U2NvcmUpIHtcbiAgICAgICAgYmVzdFNjb3JlID0gZ3JpZFNjb3JlO1xuICAgICAgICByZXQgPSBncmlkO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcblxuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3MgaXRlbSdzIGNhbGxiYWNrIHF1ZXVlLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9uW119IHF1ZXVlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaW50ZXJydXB0ZWRcbiAgICogQHBhcmFtIHtJdGVtfSBpbnN0YW5jZVxuICAgKi9cbiAgZnVuY3Rpb24gcHJvY2Vzc1F1ZXVlKHF1ZXVlLCBpbnRlcnJ1cHRlZCwgaW5zdGFuY2UpIHtcblxuICAgIHZhciBjYWxsYmFja3MgPSBxdWV1ZS5zcGxpY2UoMCwgcXVldWUubGVuZ3RoKTtcbiAgICB2YXIgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNhbGxiYWNrc1tpXShpbnRlcnJ1cHRlZCwgaW5zdGFuY2UpO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGl0ZW0gaXMgaW4gc3BlY2lmaWMgc3RhdGUuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7SXRlbX0gaXRlbVxuICAgKiBAcGFyYW0ge0dyaWRJdGVtU3RhdGV9IHN0YXRlXG4gICAqICAtIEFjY2VwdGVkIHZhbHVlcyBhcmU6IFwiYWN0aXZlXCIsIFwiaW5hY3RpdmVcIiwgXCJ2aXNpYmxlXCIsIFwiaGlkZGVuXCIsXG4gICAqICAgIFwic2hvd2luZ1wiLCBcImhpZGluZ1wiLCBcInBvc2l0aW9uaW5nXCIsIFwiZHJhZ2dpbmdcIiwgXCJyZWxlYXNpbmdcIiBhbmRcbiAgICogICAgXCJtaWdyYXRpbmdcIi5cbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBmdW5jdGlvbiBpc0l0ZW1JblN0YXRlKGl0ZW0sIHN0YXRlKSB7XG5cbiAgICB2YXIgbWV0aG9kTmFtZTtcblxuICAgIGlmIChzdGF0ZSA9PT0gJ2luYWN0aXZlJykge1xuICAgICAgcmV0dXJuICFpdGVtLmlzQWN0aXZlKCk7XG4gICAgfVxuXG4gICAgaWYgKHN0YXRlID09PSAnaGlkZGVuJykge1xuICAgICAgcmV0dXJuICFpdGVtLmlzVmlzaWJsZSgpO1xuICAgIH1cblxuICAgIG1ldGhvZE5hbWUgPSAnaXMnICsgc3RhdGUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdGF0ZS5zbGljZSgxKTtcblxuICAgIHJldHVybiB0eXBlb2YgaXRlbVttZXRob2ROYW1lXSA9PT0gdHlwZUZ1bmN0aW9uID8gaXRlbVttZXRob2ROYW1lXSgpIDogZmFsc2U7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBQcmV2ZW50IGRlZmF1bHQuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlXG4gICAqL1xuICBmdW5jdGlvbiBwcmV2ZW50RGVmYXVsdChlKSB7XG5cbiAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqIE1lcmdlIGRlZmF1bHQgc2V0dGluZ3Mgd2l0aCB1c2VyIHNldHRpbmdzLiBUaGUgcmV0dXJuZWQgb2JqZWN0IGlzIGEgbmV3XG4gICAqIG9iamVjdCB3aXRoIG1lcmdlZCB2YWx1ZXMuIFRoZSBtZXJnaW5nIGlzIGEgZGVlcCBtZXJnZSBtZWFuaW5nIHRoYXQgYWxsXG4gICAqIG9iamVjdHMgYW5kIGFycmF5cyB3aXRoaW4gdGhlIHByb3ZpZGVkIHNldHRpbmdzIG9iamVjdHMgd2lsbCBiZSBhbHNvIG1lcmdlZFxuICAgKiBzbyB0aGF0IG1vZGlmeWluZyB0aGUgdmFsdWVzIG9mIHRoZSBzZXR0aW5ncyBvYmplY3Qgd2lsbCBoYXZlIG5vIGVmZmVjdCBvblxuICAgKiB0aGUgcmV0dXJuZWQgb2JqZWN0LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdFNldHRpbmdzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbdXNlclNldHRpbmdzXVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGEgbmV3IG9iamVjdC5cbiAgICovXG4gIGZ1bmN0aW9uIG1lcmdlU2V0dGluZ3MoZGVmYXVsdFNldHRpbmdzLCB1c2VyU2V0dGluZ3MpIHtcblxuICAgIC8vIENyZWF0ZSBhIGZyZXNoIGNvcHkgb2YgZGVmYXVsdCBzZXR0aW5ncy5cbiAgICB2YXIgcmV0ID0gbWVyZ2VPYmplY3RzKHt9LCBkZWZhdWx0U2V0dGluZ3MpO1xuXG4gICAgLy8gTWVyZ2UgdXNlciBzZXR0aW5ncyB0byBkZWZhdWx0IHNldHRpbmdzLlxuICAgIHJldCA9IHVzZXJTZXR0aW5ncyA/IG1lcmdlT2JqZWN0cyhyZXQsIHVzZXJTZXR0aW5ncykgOiByZXQ7XG5cbiAgICAvLyBIYW5kbGUgdmlzaWJsZS9oaWRkZW4gc3R5bGVzIG1hbnVhbGx5IHNvIHRoYXQgdGhlIHdob2xlIG9iamVjdCBpc1xuICAgIC8vIG92ZXJyaWRlbiBpbnN0ZWFkIG9mIHRoZSBwcm9wcy5cbiAgICByZXQudmlzaWJsZVN0eWxlcyA9ICh1c2VyU2V0dGluZ3MgfHwge30pLnZpc2libGVTdHlsZXMgfHwgKGRlZmF1bHRTZXR0aW5ncyB8fCB7fSkudmlzaWJsZVN0eWxlcztcbiAgICByZXQuaGlkZGVuU3R5bGVzID0gKHVzZXJTZXR0aW5ncyB8fCB7fSkuaGlkZGVuU3R5bGVzIHx8IChkZWZhdWx0U2V0dGluZ3MgfHwge30pLmhpZGRlblN0eWxlcztcblxuICAgIHJldHVybiByZXQ7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlciBmb3IgZGVmYXVsdCBkcmFnIHN0YXJ0IHByZWRpY2F0ZSBmdW5jdGlvbi5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtJdGVtfSBpdGVtXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGZ1bmN0aW9uIGRyYWdTdGFydFByZWRpY2F0ZVJlc29sdmUoaXRlbSwgZXZlbnQpIHtcblxuICAgIHZhciBwcmVkaWNhdGUgPSBpdGVtLl9kcmFnLl9zdGFydFByZWRpY2F0ZURhdGE7XG4gICAgdmFyIHBvaW50ZXIgPSBldmVudC5jaGFuZ2VkUG9pbnRlcnNbMF07XG4gICAgdmFyIHBhZ2VYID0gcG9pbnRlciAmJiBwb2ludGVyLnBhZ2VYIHx8IDA7XG4gICAgdmFyIHBhZ2VZID0gcG9pbnRlciAmJiBwb2ludGVyLnBhZ2VZIHx8IDA7XG4gICAgdmFyIGhhbmRsZVJlY3Q7XG5cbiAgICAvLyBJZiB0aGUgbW92ZWQgZGlzdGFuY2UgaXMgc21hbGxlciB0aGFuIHRoZSB0aHJlc2hvbGQgZGlzdGFuY2Ugb3IgdGhlcmUgaXNcbiAgICAvLyBzb21lIGRlbGF5IGxlZnQsIGlnbm9yZSB0aGlzIHByZWRpY2F0ZSBjeWNsZS5cbiAgICBpZiAoZXZlbnQuZGlzdGFuY2UgPCBwcmVkaWNhdGUuZGlzdGFuY2UgfHwgcHJlZGljYXRlLmRlbGF5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gR2V0IGhhbmRsZSByZWN0LlxuICAgIGhhbmRsZVJlY3QgPSBwcmVkaWNhdGUuaGFuZGxlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vIFJlc2V0IHByZWRpY2F0ZSBkYXRhLlxuICAgIGRyYWdTdGFydFByZWRpY2F0ZVJlc2V0KGl0ZW0pO1xuXG4gICAgLy8gSWYgdGhlIGN1cnNvciBpcyBzdGlsbCB3aXRoaW4gdGhlIGhhbmRsZSBsZXQncyBzdGFydCB0aGUgZHJhZy5cbiAgICByZXR1cm4gaXNQb2ludFdpdGhpblJlY3QocGFnZVgsIHBhZ2VZLCB7XG4gICAgICB3aWR0aDogaGFuZGxlUmVjdC53aWR0aCxcbiAgICAgIGhlaWdodDogaGFuZGxlUmVjdC5oZWlnaHQsXG4gICAgICBsZWZ0OiBoYW5kbGVSZWN0LmxlZnQgKyAoZ2xvYmFsLnBhZ2VYT2Zmc2V0IHx8IDApLFxuICAgICAgdG9wOiBoYW5kbGVSZWN0LnRvcCArIChnbG9iYWwucGFnZVlPZmZzZXQgfHwgMClcbiAgICB9KTtcblxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IGZvciBkZWZhdWx0IGRyYWcgc3RhcnQgcHJlZGljYXRlIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0l0ZW19IGl0ZW1cbiAgICovXG4gIGZ1bmN0aW9uIGRyYWdTdGFydFByZWRpY2F0ZVJlc2V0KGl0ZW0pIHtcblxuICAgIHZhciBwcmVkaWNhdGUgPSBpdGVtLl9kcmFnLl9zdGFydFByZWRpY2F0ZURhdGE7XG5cbiAgICBpZiAocHJlZGljYXRlKSB7XG4gICAgICBpZiAocHJlZGljYXRlLmRlbGF5VGltZXIpIHtcbiAgICAgICAgcHJlZGljYXRlLmRlbGF5VGltZXIgPSBnbG9iYWwuY2xlYXJUaW1lb3V0KHByZWRpY2F0ZS5kZWxheVRpbWVyKTtcbiAgICAgIH1cbiAgICAgIGl0ZW0uX2RyYWcuX3N0YXJ0UHJlZGljYXRlRGF0YSA9IG51bGw7XG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICogRGVmYXVsdCBsYXlvdXQgYWxnb3JpdGhtXG4gICAqICoqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKi9cblxuICAvKiFcbiAgICAqIG11dXJpTGF5b3V0IHYwLjUuM1xuICAgICogQ29weXJpZ2h0IChjKSAyMDE2IE5pa2xhcyBSw6Rtw7YgPGlucmFtb0BnbWFpbC5jb20+XG4gICAgKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAgICAqL1xuXG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCBNdXVyaSBsYXlvdXQgYWxnb3JpdGhtLiBCYXNlZCBvbiBNQVhSRUNUUyBhcHByb2FjaCBhcyBkZXNjcmliZWRcbiAgICogYnkgSnVra2EgSnlsw6Rua2kgaW4gaGlzIHN1cnZleTogXCJBIFRob3VzYW5kIFdheXMgdG8gUGFjayB0aGUgQmluIC0gQVxuICAgKiBQcmFjdGljYWwgQXBwcm9hY2ggdG8gVHdvLURpbWVuc2lvbmFsIFJlY3RhbmdsZSBCaW4gUGFja2luZy5cIi5cbiAgICpcbiAgICogVGhpcyBhbGdvcml0aG0gaXMgaW50ZW50aW9uYWxseSBzZXBhcmF0ZWQgZnJvbSB0aGUgcmVzdCBvZiB0aGUgY29kZWJhc2UsXG4gICAqIGJlY2F1c2UgaXQgaXMgaXQncyBvd24gbGlicmFyeSB3aXRoIGEgZGlmZmVyZW50IGNvcHlyaWdodCB0aGFuIHRoZSByZXN0IG9mXG4gICAqIHRoZSBzb2Z0d2FyZS4gSXQncyBhbHNvIE1JVCBsaWNlbnNlZCBzbyBubyB3b3JyaWVzIHRoZXJlLiBUaGlzIGlzIGludGVuZGVkXG4gICAqIHRvIGJlIHVzZWQgYXMgTXV1cmkncyBkZWZhdWx0IGxheW91dCBhbGdvcml0aG0gYW5kIGdvZXMgaGFuZCBpbiBoYW5kIHdpdGhcbiAgICogTXV1cmkncyBjb3JlIGRldmVsb3BtZW50LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0l0ZW1bXX0gaXRlbXNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHRcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5maWxsR2Fwcz1mYWxzZV1cbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5ob3Jpem9udGFsPWZhbHNlXVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmFsaWduUmlnaHQ9ZmFsc2VdXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYWxpZ25Cb3R0b209ZmFsc2VdXG4gICAqIEByZXR1cm5zIHtMYXlvdXREYXRhfVxuICAgKi9cbiAgZnVuY3Rpb24gbXV1cmlMYXlvdXQoaXRlbXMsIHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMpIHtcblxuICAgIHZhciBmaWxsR2FwcyA9ICEhb3B0aW9ucy5maWxsR2FwcztcbiAgICB2YXIgaXNIb3Jpem9udGFsID0gISFvcHRpb25zLmhvcml6b250YWw7XG4gICAgdmFyIGFsaWduUmlnaHQgPSAhIW9wdGlvbnMuYWxpZ25SaWdodDtcbiAgICB2YXIgYWxpZ25Cb3R0b20gPSAhIW9wdGlvbnMuYWxpZ25Cb3R0b207XG4gICAgdmFyIHJvdW5kaW5nID0gISFvcHRpb25zLnJvdW5kaW5nO1xuICAgIHZhciBsYXlvdXQgPSB7XG4gICAgICBzbG90czoge30sXG4gICAgICB3aWR0aDogaXNIb3Jpem9udGFsID8gMCA6IChyb3VuZGluZyA/IE1hdGgucm91bmQod2lkdGgpIDogd2lkdGgpLFxuICAgICAgaGVpZ2h0OiAhaXNIb3Jpem9udGFsID8gMCA6IChyb3VuZGluZyA/IE1hdGgucm91bmQoaGVpZ2h0KSA6IGhlaWdodCksXG4gICAgICBzZXRXaWR0aDogaXNIb3Jpem9udGFsLFxuICAgICAgc2V0SGVpZ2h0OiAhaXNIb3Jpem9udGFsXG4gICAgfTtcbiAgICB2YXIgZnJlZVNsb3RzID0gW107XG4gICAgdmFyIHNsb3RJZHM7XG4gICAgdmFyIHNsb3REYXRhO1xuICAgIHZhciBzbG90O1xuICAgIHZhciBpdGVtO1xuICAgIHZhciBpdGVtV2lkdGg7XG4gICAgdmFyIGl0ZW1IZWlnaHQ7XG4gICAgdmFyIGk7XG5cbiAgICAvLyBObyBuZWVkIHRvIGdvIGZ1cnRoZXIgaWYgaXRlbXMgZG8gbm90IGV4aXN0LlxuICAgIGlmICghaXRlbXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbGF5b3V0O1xuICAgIH1cblxuICAgIC8vIEZpbmQgc2xvdHMgZm9yIGl0ZW1zLlxuICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgaXRlbSA9IGl0ZW1zW2ldO1xuICAgICAgaXRlbVdpZHRoID0gaXRlbS5fd2lkdGggKyBpdGVtLl9tYXJnaW4ubGVmdCArIGl0ZW0uX21hcmdpbi5yaWdodDtcbiAgICAgIGl0ZW1IZWlnaHQgPSBpdGVtLl9oZWlnaHQgKyBpdGVtLl9tYXJnaW4udG9wICsgaXRlbS5fbWFyZ2luLmJvdHRvbTtcbiAgICAgIGlmIChyb3VuZGluZykge1xuICAgICAgICBpdGVtV2lkdGggPSBNYXRoLnJvdW5kKGl0ZW1XaWR0aCk7XG4gICAgICAgIGl0ZW1IZWlnaHQgPSBNYXRoLnJvdW5kKGl0ZW1IZWlnaHQpO1xuICAgICAgfVxuICAgICAgc2xvdERhdGEgPSBtdXVyaUxheW91dC5nZXRTbG90KGxheW91dCwgZnJlZVNsb3RzLCBpdGVtV2lkdGgsIGl0ZW1IZWlnaHQsICFpc0hvcml6b250YWwsIGZpbGxHYXBzKTtcbiAgICAgIHNsb3QgPSBzbG90RGF0YVswXTtcbiAgICAgIGZyZWVTbG90cyA9IHNsb3REYXRhWzFdO1xuICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xuICAgICAgICBsYXlvdXQud2lkdGggPSBNYXRoLm1heChsYXlvdXQud2lkdGgsIHNsb3QubGVmdCArIHNsb3Qud2lkdGgpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGxheW91dC5oZWlnaHQgPSBNYXRoLm1heChsYXlvdXQuaGVpZ2h0LCBzbG90LnRvcCArIHNsb3QuaGVpZ2h0KTtcbiAgICAgIH1cbiAgICAgIGxheW91dC5zbG90c1tpdGVtLl9pZF0gPSBzbG90O1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBhbGlnbm1lbnQgaXMgc2V0IHRvIHJpZ2h0IG9yIGJvdHRvbSwgd2UgbmVlZCB0byBhZGp1c3QgdGhlXG4gICAgLy8gcmVzdWx0cy5cbiAgICBpZiAoYWxpZ25SaWdodCB8fCBhbGlnbkJvdHRvbSkge1xuICAgICAgc2xvdElkcyA9IE9iamVjdC5rZXlzKGxheW91dC5zbG90cyk7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgc2xvdElkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzbG90ID0gbGF5b3V0LnNsb3RzW3Nsb3RJZHNbaV1dO1xuICAgICAgICBpZiAoYWxpZ25SaWdodCkge1xuICAgICAgICAgIHNsb3QubGVmdCA9IGxheW91dC53aWR0aCAtIChzbG90LmxlZnQgKyBzbG90LndpZHRoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWxpZ25Cb3R0b20pIHtcbiAgICAgICAgICBzbG90LnRvcCA9IGxheW91dC5oZWlnaHQgLSAoc2xvdC50b3AgKyBzbG90LmhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGF5b3V0O1xuXG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHBvc2l0aW9uIGZvciB0aGUgbGF5b3V0IGl0ZW0uIFJldHVybnMgdGhlIGxlZnQgYW5kIHRvcCBwb3NpdGlvblxuICAgKiBvZiB0aGUgaXRlbSBpbiBwaXhlbHMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBtdXVyaUxheW91dFxuICAgKiBAcGFyYW0ge0xheW91dH0gbGF5b3V0XG4gICAqIEBwYXJhbSB7QXJyYXl9IHNsb3RzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpdGVtV2lkdGhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGl0ZW1IZWlnaHRcbiAgICogQHBhcmFtIHtCb29sZWFufSB2ZXJ0aWNhbFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZpbGxHYXBzXG4gICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICovXG4gIG11dXJpTGF5b3V0LmdldFNsb3QgPSBmdW5jdGlvbiAobGF5b3V0LCBzbG90cywgaXRlbVdpZHRoLCBpdGVtSGVpZ2h0LCB2ZXJ0aWNhbCwgZmlsbEdhcHMpIHtcblxuICAgIHZhciBsZWV3YXkgPSAwLjAwMTtcbiAgICB2YXIgbmV3U2xvdHMgPSBbXTtcbiAgICB2YXIgaXRlbSA9IHtcbiAgICAgIGxlZnQ6IG51bGwsXG4gICAgICB0b3A6IG51bGwsXG4gICAgICB3aWR0aDogaXRlbVdpZHRoLFxuICAgICAgaGVpZ2h0OiBpdGVtSGVpZ2h0XG4gICAgfTtcbiAgICB2YXIgc2xvdDtcbiAgICB2YXIgcG90ZW50aWFsU2xvdHM7XG4gICAgdmFyIGlnbm9yZUN1cnJlbnRTbG90cztcbiAgICB2YXIgaTtcbiAgICB2YXIgaWk7XG5cbiAgICAvLyBUcnkgdG8gZmluZCBhIHNsb3QgZm9yIHRoZSBpdGVtLlxuICAgIGZvciAoaSA9IDA7IGkgPCBzbG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgc2xvdCA9IHNsb3RzW2ldO1xuICAgICAgaWYgKGl0ZW0ud2lkdGggPD0gKHNsb3Qud2lkdGggKyBsZWV3YXkpICYmIGl0ZW0uaGVpZ2h0IDw9IChzbG90LmhlaWdodCArIGxlZXdheSkpIHtcbiAgICAgICAgaXRlbS5sZWZ0ID0gc2xvdC5sZWZ0O1xuICAgICAgICBpdGVtLnRvcCA9IHNsb3QudG9wO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiBubyBzbG90IHdhcyBmb3VuZCBmb3IgdGhlIGl0ZW0uXG4gICAgaWYgKGl0ZW0ubGVmdCA9PT0gbnVsbCkge1xuXG4gICAgICAvLyBQb3NpdGlvbiB0aGUgaXRlbSBpbiB0byB0aGUgYm90dG9tIGxlZnQgKHZlcnRpY2FsIG1vZGUpIG9yIHRvcCByaWdodFxuICAgICAgLy8gKGhvcml6b250YWwgbW9kZSkgb2YgdGhlIGdyaWQuXG4gICAgICBpdGVtLmxlZnQgPSB2ZXJ0aWNhbCA/IDAgOiBsYXlvdXQud2lkdGg7XG4gICAgICBpdGVtLnRvcCA9IHZlcnRpY2FsID8gbGF5b3V0LmhlaWdodCA6IDA7XG5cbiAgICAgIC8vIElmIGdhcHMgZG9uJ3QgbmVlZHMgZmlsbGluZyBkbyBub3QgYWRkIGFueSBjdXJyZW50IHNsb3RzIHRvIHRoZSBuZXdcbiAgICAgIC8vIHNsb3RzIGFycmF5LlxuICAgICAgaWYgKCFmaWxsR2Fwcykge1xuICAgICAgICBpZ25vcmVDdXJyZW50U2xvdHMgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gSW4gdmVydGljYWwgbW9kZSwgaWYgdGhlIGl0ZW0ncyBib3R0b20gb3ZlcmxhcHMgdGhlIGdyaWQncyBib3R0b20uXG4gICAgaWYgKHZlcnRpY2FsICYmIChpdGVtLnRvcCArIGl0ZW0uaGVpZ2h0KSA+IGxheW91dC5oZWlnaHQpIHtcblxuICAgICAgLy8gSWYgaXRlbSBpcyBub3QgYWxpZ25lZCB0byB0aGUgbGVmdCBlZGdlLCBjcmVhdGUgYSBuZXcgc2xvdC5cbiAgICAgIGlmIChpdGVtLmxlZnQgPiAwKSB7XG4gICAgICAgIG5ld1Nsb3RzLnB1c2goe1xuICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgdG9wOiBsYXlvdXQuaGVpZ2h0LFxuICAgICAgICAgIHdpZHRoOiBpdGVtLmxlZnQsXG4gICAgICAgICAgaGVpZ2h0OiBJbmZpbml0eVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgaXRlbSBpcyBub3QgYWxpZ25lZCB0byB0aGUgcmlnaHQgZWRnZSwgY3JlYXRlIGEgbmV3IHNsb3QuXG4gICAgICBpZiAoKGl0ZW0ubGVmdCArIGl0ZW0ud2lkdGgpIDwgbGF5b3V0LndpZHRoKSB7XG4gICAgICAgIG5ld1Nsb3RzLnB1c2goe1xuICAgICAgICAgIGxlZnQ6IGl0ZW0ubGVmdCArIGl0ZW0ud2lkdGgsXG4gICAgICAgICAgdG9wOiBsYXlvdXQuaGVpZ2h0LFxuICAgICAgICAgIHdpZHRoOiBsYXlvdXQud2lkdGggLSBpdGVtLmxlZnQgLSBpdGVtLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogSW5maW5pdHlcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSBncmlkIGhlaWdodC5cbiAgICAgIGxheW91dC5oZWlnaHQgPSBpdGVtLnRvcCArIGl0ZW0uaGVpZ2h0O1xuXG4gICAgfVxuXG4gICAgLy8gSW4gaG9yaXpvbnRhbCBtb2RlLCBpZiB0aGUgaXRlbSdzIHJpZ2h0IG92ZXJsYXBzIHRoZSBncmlkJ3MgcmlnaHQgZWRnZS5cbiAgICBpZiAoIXZlcnRpY2FsICYmIChpdGVtLmxlZnQgKyBpdGVtLndpZHRoKSA+IGxheW91dC53aWR0aCkge1xuXG4gICAgICAvLyBJZiBpdGVtIGlzIG5vdCBhbGlnbmVkIHRvIHRoZSB0b3AsIGNyZWF0ZSBhIG5ldyBzbG90LlxuICAgICAgaWYgKGl0ZW0udG9wID4gMCkge1xuICAgICAgICBuZXdTbG90cy5wdXNoKHtcbiAgICAgICAgICBsZWZ0OiBsYXlvdXQud2lkdGgsXG4gICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgIHdpZHRoOiBJbmZpbml0eSxcbiAgICAgICAgICBoZWlnaHQ6IGl0ZW0udG9wXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBpdGVtIGlzIG5vdCBhbGlnbmVkIHRvIHRoZSBib3R0b20sIGNyZWF0ZSBhIG5ldyBzbG90LlxuICAgICAgaWYgKChpdGVtLnRvcCArIGl0ZW0uaGVpZ2h0KSA8IGxheW91dC5oZWlnaHQpIHtcbiAgICAgICAgbmV3U2xvdHMucHVzaCh7XG4gICAgICAgICAgbGVmdDogbGF5b3V0LndpZHRoLFxuICAgICAgICAgIHRvcDogaXRlbS50b3AgKyBpdGVtLmhlaWdodCxcbiAgICAgICAgICB3aWR0aDogSW5maW5pdHksXG4gICAgICAgICAgaGVpZ2h0OiBsYXlvdXQuaGVpZ2h0IC0gaXRlbS50b3AgLSBpdGVtLmhlaWdodFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIGdyaWQgd2lkdGguXG4gICAgICBsYXlvdXQud2lkdGggPSBpdGVtLmxlZnQgKyBpdGVtLndpZHRoO1xuXG4gICAgfVxuXG4gICAgLy8gQ2xlYW4gdXAgdGhlIGN1cnJlbnQgc2xvdHMgbWFraW5nIHN1cmUgdGhlcmUgYXJlIG5vIG9sZCBzbG90cyB0aGF0XG4gICAgLy8gb3ZlcmxhcCB3aXRoIHRoZSBpdGVtLiBJZiBhbiBvbGQgc2xvdCBvdmVybGFwcyB3aXRoIHRoZSBpdGVtLCBzcGxpdCBpdFxuICAgIC8vIGludG8gc21hbGxlciBzbG90cyBpZiBuZWNlc3NhcnkuXG4gICAgZm9yIChpID0gZmlsbEdhcHMgPyAwIDogaWdub3JlQ3VycmVudFNsb3RzID8gc2xvdHMubGVuZ3RoIDogaTsgaSA8IHNsb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwb3RlbnRpYWxTbG90cyA9IG11dXJpTGF5b3V0LnNwbGl0UmVjdChzbG90c1tpXSwgaXRlbSk7XG4gICAgICBmb3IgKGlpID0gMDsgaWkgPCBwb3RlbnRpYWxTbG90cy5sZW5ndGg7IGlpKyspIHtcbiAgICAgICAgc2xvdCA9IHBvdGVudGlhbFNsb3RzW2lpXTtcbiAgICAgICAgLy8gTGV0J3MgbWFrZSBzdXJlIGhlcmUgdGhhdCB3ZSBoYXZlIGEgYmlnIGVub3VnaCBzbG90XG4gICAgICAgIC8vICh3aWR0aC9oZWlnaHQgPiAwLjQ5cHgpIGFuZCBhbHNvIGxldCdzIG1ha2Ugc3VyZSB0aGF0IHRoZSBzbG90IGlzXG4gICAgICAgIC8vIHdpdGhpbiB0aGUgYm91bmRhcmllcyBvZiB0aGUgZ3JpZC5cbiAgICAgICAgaWYgKHNsb3Qud2lkdGggPiAwLjQ5ICYmIHNsb3QuaGVpZ2h0ID4gMC40OSAmJiAoKHZlcnRpY2FsICYmIHNsb3QudG9wIDwgbGF5b3V0LmhlaWdodCkgfHwgKCF2ZXJ0aWNhbCAmJiBzbG90LmxlZnQgPCBsYXlvdXQud2lkdGgpKSkge1xuICAgICAgICAgIG5ld1Nsb3RzLnB1c2goc2xvdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTYW5pdGl6ZSBuZXcgc2xvdHMuXG4gICAgaWYgKG5ld1Nsb3RzLmxlbmd0aCkge1xuICAgICAgbmV3U2xvdHMgPSBtdXVyaUxheW91dC5wdXJnZVJlY3RzKG5ld1Nsb3RzKS5zb3J0KHZlcnRpY2FsID8gbXV1cmlMYXlvdXQuc29ydFJlY3RzVG9wTGVmdCA6IG11dXJpTGF5b3V0LnNvcnRSZWN0c0xlZnRUb3ApO1xuICAgIH1cblxuICAgIC8vIFJldHVybiB0aGUgaXRlbSBhbmQgdXBkYXRlZCBzbG90cyBkYXRhLlxuICAgIHJldHVybiBbaXRlbSwgbmV3U2xvdHNdO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIFB1bmNoIGEgaG9sZSBpbnRvIGEgcmVjdGFuZ2xlIGFuZCBzcGxpdCB0aGUgcmVtYWluaW5nIGFyZWEgaW50byBzbWFsbGVyXG4gICAqIHJlY3RhbmdsZXMgKDQgYXQgbWF4KS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtSZWN0YW5nbGV9IHJlY3RcbiAgICogQHBhcmFtIHtSZWN0YW5nbGV9IGhvbGVcbiAgICogcmV0dXJucyB7UmVjdGFuZ2xlW119XG4gICAqL1xuICBtdXVyaUxheW91dC5zcGxpdFJlY3QgPSBmdW5jdGlvbiAocmVjdCwgaG9sZSkge1xuXG4gICAgdmFyIHJldCA9IFtdO1xuXG4gICAgLy8gSWYgdGhlIHJlY3QgZG9lcyBub3Qgb3ZlcmxhcCB3aXRoIHRoZSBob2xlIGFkZCByZWN0IHRvIHRoZSByZXR1cm4gZGF0YSBhc1xuICAgIC8vIGlzLlxuICAgIGlmICghbXV1cmlMYXlvdXQuZG9SZWN0c092ZXJsYXAocmVjdCwgaG9sZSkpIHtcbiAgICAgIHJldHVybiBbe1xuICAgICAgICBsZWZ0OiByZWN0LmxlZnQsXG4gICAgICAgIHRvcDogcmVjdC50b3AsXG4gICAgICAgIHdpZHRoOiByZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IHJlY3QuaGVpZ2h0XG4gICAgICB9XTtcbiAgICB9XG5cbiAgICAvLyBMZWZ0IHNwbGl0LlxuICAgIGlmIChyZWN0LmxlZnQgPCBob2xlLmxlZnQpIHtcbiAgICAgIHJldC5wdXNoKHtcbiAgICAgICAgbGVmdDogcmVjdC5sZWZ0LFxuICAgICAgICB0b3A6IHJlY3QudG9wLFxuICAgICAgICB3aWR0aDogaG9sZS5sZWZ0IC0gcmVjdC5sZWZ0LFxuICAgICAgICBoZWlnaHQ6IHJlY3QuaGVpZ2h0XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBSaWdodCBzcGxpdC5cbiAgICBpZiAoKHJlY3QubGVmdCArIHJlY3Qud2lkdGgpID4gKGhvbGUubGVmdCArIGhvbGUud2lkdGgpKSB7XG4gICAgICByZXQucHVzaCh7XG4gICAgICAgIGxlZnQ6IGhvbGUubGVmdCArIGhvbGUud2lkdGgsXG4gICAgICAgIHRvcDogcmVjdC50b3AsXG4gICAgICAgIHdpZHRoOiAocmVjdC5sZWZ0ICsgcmVjdC53aWR0aCkgLSAoaG9sZS5sZWZ0ICsgaG9sZS53aWR0aCksXG4gICAgICAgIGhlaWdodDogcmVjdC5oZWlnaHRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFRvcCBzcGxpdC5cbiAgICBpZiAocmVjdC50b3AgPCBob2xlLnRvcCkge1xuICAgICAgcmV0LnB1c2goe1xuICAgICAgICBsZWZ0OiByZWN0LmxlZnQsXG4gICAgICAgIHRvcDogcmVjdC50b3AsXG4gICAgICAgIHdpZHRoOiByZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IGhvbGUudG9wIC0gcmVjdC50b3BcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEJvdHRvbSBzcGxpdC5cbiAgICBpZiAoKHJlY3QudG9wICsgcmVjdC5oZWlnaHQpID4gKGhvbGUudG9wICsgaG9sZS5oZWlnaHQpKSB7XG4gICAgICByZXQucHVzaCh7XG4gICAgICAgIGxlZnQ6IHJlY3QubGVmdCxcbiAgICAgICAgdG9wOiBob2xlLnRvcCArIGhvbGUuaGVpZ2h0LFxuICAgICAgICB3aWR0aDogcmVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiAocmVjdC50b3AgKyByZWN0LmhlaWdodCkgLSAoaG9sZS50b3AgKyBob2xlLmhlaWdodClcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG5cbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgdHdvIHJlY3RhbmdsZXMgb3ZlcmxhcC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIG11dXJpTGF5b3V0XG4gICAqIEBwYXJhbSB7UmVjdGFuZ2xlfSBhXG4gICAqIEBwYXJhbSB7UmVjdGFuZ2xlfSBiXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgbXV1cmlMYXlvdXQuZG9SZWN0c092ZXJsYXAgPSBmdW5jdGlvbiAoYSwgYikge1xuXG4gICAgcmV0dXJuICEoKGEubGVmdCArIGEud2lkdGgpIDw9IGIubGVmdCB8fCAoYi5sZWZ0ICsgYi53aWR0aCkgPD0gYS5sZWZ0IHx8IChhLnRvcCArIGEuaGVpZ2h0KSA8PSBiLnRvcCB8fCAoYi50b3AgKyBiLmhlaWdodCkgPD0gYS50b3ApO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgcmVjdGFuZ2xlIGlzIGZ1bGx5IHdpdGhpbiBhbm90aGVyIHJlY3RhbmdsZS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIG11dXJpTGF5b3V0XG4gICAqIEBwYXJhbSB7UmVjdGFuZ2xlfSBhXG4gICAqIEBwYXJhbSB7UmVjdGFuZ2xlfSBiXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgbXV1cmlMYXlvdXQuaXNSZWN0V2l0aGluUmVjdCA9IGZ1bmN0aW9uIChhLCBiKSB7XG5cbiAgICByZXR1cm4gYS5sZWZ0ID49IGIubGVmdCAmJiBhLnRvcCA+PSBiLnRvcCAmJiAoYS5sZWZ0ICsgYS53aWR0aCkgPD0gKGIubGVmdCArIGIud2lkdGgpICYmIChhLnRvcCArIGEuaGVpZ2h0KSA8PSAoYi50b3AgKyBiLmhlaWdodCk7XG5cbiAgfTtcblxuICAvKipcbiAgICogTG9vcHMgdGhyb3VnaCBhbiBhcnJheSBvZiByZWN0YW5nbGVzIGFuZCByZW1vdmVzIGFsbCB0aGF0IGFyZSBmdWxseSB3aXRoaW5cbiAgICogYW5vdGhlciByZWN0YW5nbGUgaW4gdGhlIGFycmF5LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgbXV1cmlMYXlvdXRcbiAgICogQHBhcmFtIHtSZWN0YW5nbGVbXX0gcmVjdHNcbiAgICogQHJldHVybnMge1JlY3RhbmdsZVtdfVxuICAgKi9cbiAgbXV1cmlMYXlvdXQucHVyZ2VSZWN0cyA9IGZ1bmN0aW9uIChyZWN0cykge1xuXG4gICAgdmFyIGkgPSByZWN0cy5sZW5ndGg7XG4gICAgdmFyIGlpO1xuICAgIHZhciByZWN0QTtcbiAgICB2YXIgcmVjdEI7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICByZWN0QSA9IHJlY3RzW2ldO1xuICAgICAgaWkgPSByZWN0cy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaWktLSkge1xuICAgICAgICByZWN0QiA9IHJlY3RzW2lpXTtcbiAgICAgICAgaWYgKGkgIT09IGlpICYmIG11dXJpTGF5b3V0LmlzUmVjdFdpdGhpblJlY3QocmVjdEEsIHJlY3RCKSkge1xuICAgICAgICAgIHJlY3RzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZWN0cztcblxuICB9O1xuXG4gIC8qKlxuICAgKiBTb3J0IHJlY3RhbmdsZXMgd2l0aCB0b3AtbGVmdCBncmF2aXR5LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgbXV1cmlMYXlvdXRcbiAgICogQHBhcmFtIHtSZWN0YW5nbGV9IGFcbiAgICogQHBhcmFtIHtSZWN0YW5nbGV9IGJcbiAgICogQHJldHVybnMge051bWJlcn1cbiAgICovXG4gIG11dXJpTGF5b3V0LnNvcnRSZWN0c1RvcExlZnQgPSBmdW5jdGlvbiAoYSwgYikge1xuXG4gICAgcmV0dXJuIGEudG9wIC0gYi50b3AgfHwgYS5sZWZ0IC0gYi5sZWZ0O1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIFNvcnQgcmVjdGFuZ2xlcyB3aXRoIGxlZnQtdG9wIGdyYXZpdHkuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBtdXVyaUxheW91dFxuICAgKiBAcGFyYW0ge1JlY3RhbmdsZX0gYVxuICAgKiBAcGFyYW0ge1JlY3RhbmdsZX0gYlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgKi9cbiAgbXV1cmlMYXlvdXQuc29ydFJlY3RzTGVmdFRvcCA9IGZ1bmN0aW9uIChhLCBiKSB7XG5cbiAgICByZXR1cm4gYS5sZWZ0IC0gYi5sZWZ0IHx8IGEudG9wIC0gYi50b3A7XG5cbiAgfTtcblxuICAvKipcbiAgICogVHlwZSBkZWZpbml0aW9uc1xuICAgKiAqKioqKioqKioqKioqKioqXG4gICAqL1xuXG4gIC8qIGVzbGludC1kaXNhYmxlICovXG4gIC8qKlxuICAgKiBUaGUgdmFsdWVzIGJ5IHdoaWNoIG11bHRpcGxlIGdyaWQgaXRlbXMgY2FuIGJlIHF1ZXJpZWQuIEFuIGh0bWwgZWxlbWVudCBvclxuICAgKiBhbiBhcnJheSBvZiBIVE1MIGVsZW1lbnRzLiBJdGVtIG9yIGFuIGFycmF5IG9mIGl0ZW1zLiBOb2RlIGxpc3QsIGxpdmUgb3JcbiAgICogc3RhdGljLiBOdW1iZXIgKGluZGV4KSBvciBhIGxpc3Qgb2YgbnVtYmVycyAoaW5kaWNlcykuXG4gICAqXG4gICAqIEB0eXBlZGVmIHsoSFRNTEVsZW1lbnR8SFRNTEVsZW1lbnRbXXxJdGVtfEl0ZW1bXXxOb2RlTGlzdHxOdW1iZXJ8TnVtYmVyW10pfSBHcmlkTXVsdGlJdGVtUXVlcnlcbiAgICovXG4gIC8qIGVzbGludC1lbmFibGUgKi9cblxuICAvKipcbiAgICogVGhlIHZhbHVlcyBieSB3aGljaCBhIHNpbmdsZSBncmlkIGl0ZW0gY2FuIGJlIHF1ZXJpZWQuIEFuIGh0bWwgZWxlbWVudCwgYW5cbiAgICogaXRlbSBpbnN0YW5jZSBvciBhIG51bWJlciAoaW5kZXgpLlxuICAgKlxuICAgKiBAdHlwZWRlZiB7KEhUTUxFbGVtZW50fEl0ZW18TnVtYmVyKX0gR3JpZFNpbmdsZUl0ZW1RdWVyeVxuICAgKi9cblxuICAvKipcbiAgICogVGhlIGdyaWQgaXRlbSdzIHN0YXRlLCBhIHN0cmluZy4gQWNjZXB0ZWQgdmFsdWVzIGFyZTogXCJhY3RpdmVcIiwgXCJpbmFjdGl2ZVwiLFxuICAgKiBcInZpc2libGVcIiwgXCJoaWRkZW5cIiwgXCJzaG93aW5nXCIsIFwiaGlkaW5nXCIsIFwicG9zaXRpb25pbmdcIiwgXCJkcmFnZ2luZ1wiLFxuICAgKiBcInJlbGVhc2luZ1wiIGFuZCBcIm1pZ3JhdGluZ1wiLlxuICAgKlxuICAgKiBAdHlwZWRlZiB7U3RyaW5nfSBHcmlkSXRlbVN0YXRlXG4gICAqL1xuXG4gIC8qKlxuICAgKiBUaGUgZGF0YSB0aGF0IGlzIHJlcXVpcmVkIHRvIG9yY2hlc3RyYXRlIGEgc29ydCBhY3Rpb24gZHVyaW5nIGRyYWcuXG4gICAqXG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IERyYWdTb3J0Q29tbWFuZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gYWN0aW9uXG4gICAqICAgLSBcIm1vdmVcIiBvciBcInN3YXBcIi5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAqICAgLSB0YXJnZXQgaW5kZXguXG4gICAqIEBwYXJhbSB7P0dyaWR9IFtncmlkPW51bGxdXG4gICAqICAgLSB0YXJnZXQgZ3JpZC5cbiAgICovXG5cbiAgLyoqXG4gICAqIEEgcmVjdGFuZ2xlIGlzIGFuIG9iamVjdCB3aXRoIHdpZHRoLCBoZWlnaHQgYW5kIG9mZnNldCAobGVmdCBhbmQgdG9wKSBkYXRhLlxuICAgKlxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBSZWN0YW5nbGVcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHdpZHRoXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBoZWlnaHRcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGxlZnRcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRvcFxuICAgKi9cblxuICAvKipcbiAgICogTGF5b3V0IGRhdGEgZm9yIHRoZSBsYXlvdXQgaW5zdGFuY2UuXG4gICAqXG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IExheW91dERhdGFcbiAgICogQHByb3BlcnR5IHtPYmplY3R9IHNsb3RzXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB3aWR0aFxuICAgKiBAcHJvcGVydHkge051bWJlcn0gaGVpZ2h0XG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gc2V0V2lkdGhcbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBzZXRIZWlnaHRcbiAgICovXG5cbiAgLyoqXG4gICAqIEBjYWxsYmFjayBMYXlvdXRDYWxsYmFja1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGlzQWJvcnRlZFxuICAgKiAgIC0gV2FzIHRoZSBsYXlvdXQgcHJvY2VkdXJlIGFib3J0ZWQ/XG4gICAqIEBwYXJhbSB7SXRlbVtdfSBpdGVtc1xuICAgKiAgIC0gVGhlIGl0ZW1zIHRoYXQgd2VyZSBhdHRlbXB0ZWQgdG8gYmUgcG9zaXRpb25lZC5cbiAgICovXG5cbiAgLyoqXG4gICAqIEBjYWxsYmFjayBTaG93Q2FsbGJhY2tcbiAgICogQHBhcmFtIHtJdGVtW119IGl0ZW1zXG4gICAqICAgLSBUaGUgaXRlbXMgdGhhdCB3ZXJlIHN1Y2Nlc3NmdWxseSBzaG93biB3aXRob3V0IGludGVycnVwdGlvbnMuXG4gICAqL1xuXG4gIC8qKlxuICAgKiBAY2FsbGJhY2sgSGlkZUNhbGxiYWNrXG4gICAqIEBwYXJhbSB7SXRlbVtdfSBpdGVtc1xuICAgKiAgIC0gVGhlIGl0ZW1zIHRoYXQgd2VyZSBzdWNjZXNzZnVsbHkgaGlkZGVuIHdpdGhvdXQgaW50ZXJydXB0aW9ucy5cbiAgICovXG5cbiAgLyoqXG4gICAqIEBjYWxsYmFjayBGaWx0ZXJDYWxsYmFja1xuICAgKiBAcGFyYW0ge0l0ZW1bXX0gc2hvd25JdGVtc1xuICAgKiAgIC0gVGhlIGl0ZW1zIHRoYXQgd2VyZSBzaG93bi5cbiAgICogQHBhcmFtIHtJdGVtW119IGhpZGRlbkl0ZW1zXG4gICAqICAgLSBUaGUgaXRlbXMgdGhhdCB3ZXJlIGhpZGRlbi5cbiAgICovXG5cbiAgLyoqXG4gICAqIEluaXRcbiAgICovXG5cbiAgcmV0dXJuIEdyaWQ7XG5cbn0pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL211dXJpL211dXJpLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gaW1wb3J0IEFtYmVyIGZyb20gJ2FtYmVyJ1xuaW1wb3J0IFN3aXBlanMgZnJvbSAnc3dpcGVqcydcbmltcG9ydCBNdXVyaSBmcm9tICdtdXVyaSdcbi8vIFRPRE86IGJhcmJhLmpzXG5pbXBvcnQgTGF6eUxvYWQgZnJvbSAnLi9sYXp5bG9hZC5qcydcbmltcG9ydCBsb2FkU2NyaXB0IGZyb20gJy4vbG9hZFNjcmlwdC5qcydcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHsgc2V0VGltZW91dCgoKSA9PiB7XG4gIC8vIGdyaWRcbiAgY29uc3QgbXNucnlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbXNucnknKVxuICBpZiAobXNucnlDb250YWluZXIpIHtcbiAgICBtc25yeUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdqcy1hY3RpdmF0ZWQnKVxuXG4gICAgbmV3IE11dXJpKCcubXNucnknLCB7XG4gICAgICBpdGVtczogJy5tc25yeS1pdGVtJyxcbiAgICAgIGxheW91dDoge1xuICAgICAgICBmaWxsR2FwczogdHJ1ZSxcbiAgICAgICAgaG9yaXpvbnRhbDogZmFsc2UsXG4gICAgICAgIGFsaWduUmlnaHQ6IGZhbHNlLFxuICAgICAgICBhbGlnbkJvdHRvbTogZmFsc2UsXG4gICAgICAgIHJvdW5kaW5nOiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyBHTUFQXG4gIGNvbnN0IGdtYXBzRWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLWdtYXAnKVxuICBpZiAoZ21hcHNFbHMubGVuZ3RoKSB7XG4gICAgLy8gaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL3N0YXRpY21hcD9jZW50ZXI9NDguOTIzNTY0LCUyMDI0LjcxMTI1NiZ6b29tPTE3JnNpemU9MTAwMHg1MDAmZm9ybWF0PWpwZz8mc3R5bGU9ZmVhdHVyZTpyb2FkLmxvY2FsJTdDZWxlbWVudDpnZW9tZXRyeSU3Q2NvbG9yOjB4MDBmZjAwJnN0eWxlPWZlYXR1cmU6bGFuZHNjYXBlJTdDZWxlbWVudDpnZW9tZXRyeS5maWxsJTdDY29sb3I6MHgwMDAwMDAmc3R5bGU9ZWxlbWVudDpsYWJlbHMlN0NpbnZlcnRfbGlnaHRuZXNzOnRydWUmc3R5bGU9ZmVhdHVyZTpyb2FkLmFydGVyaWFsJTdDZWxlbWVudDpsYWJlbHMlN0NpbnZlcnRfbGlnaHRuZXNzOmZhbHNlXG4gICAgbG9hZFNjcmlwdCgnaHR0cDovL21hcHMuZ29vZ2xlLmNvbS9tYXBzL2FwaS9qcycsICgpID0+IHtcbiAgICAgIGdtYXBzRWxzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICB2YXIgbWFwT3B0aW9ucyA9IHtcbiAgICAgICAgICB6b29tOiAxNyxcbiAgICAgICAgICBtYXBUeXBlSWQ6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQLFxuICAgICAgICAgIGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZygwLCAwKVxuICAgICAgICB9XG4gICAgICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGVsLCBtYXBPcHRpb25zKVxuICAgICAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICAgICAgcG9zaXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNDguOTIzNTY0LCAyNC43MTEyNTYpLFxuICAgICAgICAgIGljb246IHtcbiAgICAgICAgICAgIHBhdGg6ICdNMjEuMjE2LjAxNEMxMC4yNi4zOTcgMS4xNTYgOC45MjQuMTA2IDE5LjgwNC0uMTEgMjEuOTgyLjAxMyAyNC4wOS4zOTggMjYuMTFjMCAwIC4wMzMuMjM1LjE0Ni42ODcuMzQgMS41MS44NDggMi45NzcgMS40OCA0LjM1MiAyLjIwNiA1LjIxIDcuMzA2IDEzLjkyNiAxOC43NSAyMy40MS43LjU4NyAxLjczLjU4NyAyLjQ0IDAgMTEuNDQ0LTkuNDcyIDE2LjU0NC0xOC4xOSAxOC43Ni0yMy40MjIuNjQ0LTEuMzc2IDEuMTQyLTIuODMgMS40OC00LjM1My4xMDMtLjQ0LjE0OC0uNjg4LjE0OC0uNjg4LjI2LTEuMzUzLjM5Ni0yLjc0LjM5Ni00LjE2QzQ0IDkuNTUzIDMzLjcyMi0uNDI3IDIxLjIxNi4wMTN6TTIyIDM0Yy02LjA3NiAwLTExLTQuOTI0LTExLTExczQuOTI0LTExIDExLTExIDExIDQuOTI0IDExIDExLTQuOTI0IDExLTExIDExeicsXG4gICAgICAgICAgICBmaWxsQ29sb3I6ICcjRkYwRDM1JyxcbiAgICAgICAgICAgIGZpbGxPcGFjaXR5OiAxLFxuICAgICAgICAgICAgYW5jaG9yOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMjIsIDU1KSxcbiAgICAgICAgICAgIHN0cm9rZVdlaWdodDogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgbWFwOiBtYXBcbiAgICAgICAgfSlcbiAgICAgICAgbWFwLnBhblRvKG1hcmtlci5nZXRQb3NpdGlvbigpKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLy8gTUVOVVxuICB2YXIgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1tZW51JylcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW9wZW4tbWVudScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBtZW51LmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpXG4gIH0pXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1jbG9zZS1tZW51JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIG1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJylcbiAgfSk7XG5cbiAgLy8gZml4IHBvc2l0aW9uIGZvciBjb250YWN0cyBwYWdlXG4gICgoKSA9PiB7XG4gICAgdmFyIGNvbnRhY3RzVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1jb250YWN0cy10ZXh0JylcbiAgICBpZiAoIWNvbnRhY3RzVGV4dCkgcmV0dXJuXG4gICAgY29uc3QgaG9tZUxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1uYXYtbGluay5saW5rLWhvbWUnKVxuXG4gICAgZnVuY3Rpb24gZml4UG9zaXRpb24gKCkge1xuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gMTAyMykge1xuICAgICAgICBjb25zdCBsZWZ0ID0gaG9tZUxpbmsuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueFxuICAgICAgICBjb250YWN0c1RleHQuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBwYWRkaW5nLWxlZnQ6ICR7bGVmdH1weGApXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250YWN0c1RleHQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpXG4gICAgICB9XG4gICAgfVxuICAgIGZpeFBvc2l0aW9uKClcblxuICAgIGxldCByZXNpemVUaW1lclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQocmVzaXplVGltZXIpXG4gICAgICByZXNpemVUaW1lciA9IHNldFRpbWVvdXQoZml4UG9zaXRpb24sIDEwMClcbiAgICB9KVxuICB9KSgpO1xuXG4gIC8vIEZJWCBsb2dvIGNvbG9yXG4gICgoKSA9PiB7XG4gICAgdmFyIG9iamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtaG9tZS1sb2dvJylcbiAgICBpZiAoIW9iamVjdCkgcmV0dXJuXG4gICAgZnVuY3Rpb24gc2hvdyAoKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdmFyIGxvZ28gPSBvYmplY3QuY29udGVudERvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwYXRoJylbMF1cbiAgICAgICAgbG9nby5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnIzEzMTMxMycpXG4gICAgICB9LCA1MClcbiAgICB9XG4gICAgaWYgKG9iamVjdC5jb250ZW50RG9jdW1lbnQpIHNob3coKVxuICAgIG9iamVjdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgc2hvdywgZmFsc2UpXG4gIH0pKCk7XG5cbiAgLy8gZ2lmcyBwbGF5ZXIgb24gbG9nb3MgcGFnZVxuICAoKCkgPT4ge1xuICAgIGxldCB2aWRlb1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZS50YXJnZXQgJiYgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1wbGF5JykpIHtcbiAgICAgICAgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXG4gICAgICAgIHZpZGVvLnNyYyA9IGUudGFyZ2V0LmRhdGFzZXQudmlkZW9cbiAgICAgICAgdmlkZW8uYXV0b3BsYXkgPSB0cnVlXG4gICAgICAgIHZpZGVvLmxvb3AgPSB0cnVlXG4gICAgICAgIHZpZGVvLmNsYXNzTGlzdC5hZGQoJ21zbnJ5LWxvZ28tdmlkZW8nKVxuICAgICAgICBlLnRhcmdldC5wYXJlbnROb2RlLmFwcGVuZCh2aWRlbylcbiAgICAgIH1cbiAgICB9KVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChlLnRhcmdldCAmJiBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2pzLXBsYXknKSkge1xuICAgICAgICB2aWRlby5yZW1vdmUoKVxuICAgICAgfVxuICAgIH0pXG4gIH0pKCk7XG5cbiAgKCgpID0+IHtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtcGxheS1ob21lLXZpZGVvJylcbiAgICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1ob21lLXZpZGVvJylcbiAgICBpZiAodmlkZW8pIHtcbiAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2aWRlby5jdXJyZW50VGltZSA9IDBcbiAgICAgICAgdmlkZW8ucGxheSgpXG4gICAgICB9KVxuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmlkZW8ucGF1c2UoKVxuICAgICAgfSlcbiAgICB9XG4gIH0pKClcblxuICAvLyBIb21lIG1vYmlsZSBzbGlkZXJcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1zd2lwZScpKSB7XG4gICAgY29uc3QgdmlkZW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtaG9tZS1tb2ItdmlkZW8nKVxuICAgIGNvbnN0IGRvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtbW9iLWRvdCcpXG4gICAgY29uc3QgaG9tZVNsaWRlciA9IG5ldyBTd2lwZWpzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1zd2lwZScpLCB7XG4gICAgICBkcmFnZ2FibGU6IHRydWUsXG4gICAgICBjb250aW51b3VzOiBmYWxzZSxcbiAgICAgIC8vIGRpc2FibGVTY3JvbGw6IHRydWUsXG4gICAgICAvLyBzdG9wUHJvcGFnYXRpb246IHRydWUsXG4gICAgICAvLyBjYWxsYmFjazogZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7fSxcbiAgICAgIHRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xuICAgICAgICBkb3RzLmZvckVhY2goZCA9PiBkLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpKVxuICAgICAgICBkb3RzW2luZGV4XS5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKVxuXG4gICAgICAgIGlmIChpbmRleCA9PT0gMykge1xuICAgICAgICAgIHZpZGVvLnBsYXkoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZpZGVvLnBhdXNlKClcbiAgICAgICAgICB2aWRlby5jdXJyZW50VGltZSA9IDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBkb3RzLmZvckVhY2goKGQsIGluZGV4KSA9PiBkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGhvbWVTbGlkZXIuc2xpZGUoaW5kZXgsIDMwMClcbiAgICB9KSlcbiAgfVxuXG4gIG5ldyBMYXp5TG9hZCgpXG4gIG5ldyBMYXp5TG9hZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubG9hZC1ub3cnKSkubG9hZEFuZERlc3Ryb3koKVxufSwgMCkgfSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvbWFpbi5qcyIsIi8qIVxuICogU3dpcGUgMi4yLjExXG4gKlxuICogQnJhZCBCaXJkc2FsbFxuICogQ29weXJpZ2h0IDIwMTMsIE1JVCBMaWNlbnNlXG4gKlxuKi9cblxuLy8gaWYgdGhlIG1vZHVsZSBoYXMgbm8gZGVwZW5kZW5jaWVzLCB0aGUgYWJvdmUgcGF0dGVybiBjYW4gYmUgc2ltcGxpZmllZCB0b1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWV4dHJhLXNlbWlcbjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgZGVmaW5lKFtdLCBmdW5jdGlvbigpe1xuICAgICAgcm9vdC5Td2lwZSA9IGZhY3RvcnkoKTtcbiAgICAgIHJldHVybiByb290LlN3aXBlO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgLy8gTm9kZS4gRG9lcyBub3Qgd29yayB3aXRoIHN0cmljdCBDb21tb25KUywgYnV0XG4gICAgLy8gb25seSBDb21tb25KUy1saWtlIGVudmlyb25tZW50cyB0aGF0IHN1cHBvcnQgbW9kdWxlLmV4cG9ydHMsXG4gICAgLy8gbGlrZSBOb2RlLlxuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgIHJvb3QuU3dpcGUgPSBmYWN0b3J5KCk7XG4gIH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuICAvLyBFc3RhYmxpc2ggdGhlIHJvb3Qgb2JqZWN0LCBgd2luZG93YCAoYHNlbGZgKSBpbiB0aGUgYnJvd3NlciwgYGdsb2JhbGBcbiAgLy8gb24gdGhlIHNlcnZlciwgb3IgYHRoaXNgIGluIHNvbWUgdmlydHVhbCBtYWNoaW5lcy4gV2UgdXNlIGBzZWxmYFxuICAvLyBpbnN0ZWFkIG9mIGB3aW5kb3dgIGZvciBgV2ViV29ya2VyYCBzdXBwb3J0LlxuICB2YXIgcm9vdCA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYuc2VsZiA9PT0gc2VsZiAmJiBzZWxmIHx8XG4gICAgICAgICAgICAgdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwuZ2xvYmFsID09PSBnbG9iYWwgJiYgZ2xvYmFsIHx8XG4gICAgICAgICAgICAgdGhpcztcblxuICB2YXIgX2RvY3VtZW50ID0gcm9vdC5kb2N1bWVudDtcblxuICBmdW5jdGlvbiBTd2lwZShjb250YWluZXIsIG9wdGlvbnMpIHtcblxuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgLy8gc2V0dXAgaW5pdGlhbCB2YXJzXG4gICAgdmFyIHN0YXJ0ID0ge307XG4gICAgdmFyIGRlbHRhID0ge307XG4gICAgdmFyIGlzU2Nyb2xsaW5nO1xuXG4gICAgLy8gc2V0dXAgYXV0byBzbGlkZXNob3dcbiAgICB2YXIgZGVsYXkgPSBvcHRpb25zLmF1dG8gfHwgMDtcbiAgICB2YXIgaW50ZXJ2YWw7XG5cbiAgICB2YXIgZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIC8vIHV0aWxpdGllc1xuICAgIC8vIHNpbXBsZSBubyBvcGVyYXRpb24gZnVuY3Rpb25cbiAgICB2YXIgbm9vcCA9IGZ1bmN0aW9uKCkge307XG4gICAgLy8gb2ZmbG9hZCBhIGZ1bmN0aW9ucyBleGVjdXRpb25cbiAgICB2YXIgb2ZmbG9hZEZuID0gZnVuY3Rpb24oZm4pIHsgc2V0VGltZW91dChmbiB8fCBub29wLCAwKTsgfTtcbiAgICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG4gICAgLy8gYmUgdHJpZ2dlcmVkLlxuICAgIHZhciB0aHJvdHRsZSA9IGZ1bmN0aW9uIChmbiwgdGhyZXNoaG9sZCkge1xuICAgICAgdGhyZXNoaG9sZCA9IHRocmVzaGhvbGQgfHwgMTAwO1xuICAgICAgdmFyIHRpbWVvdXQgPSBudWxsO1xuXG4gICAgICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aW1lb3V0KSBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHRocm90dGxlZEZuKCkge1xuICAgICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICBjYW5jZWwoKTtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIH0sIHRocmVzaGhvbGQpO1xuICAgICAgfVxuXG4gICAgICAvLyBhbGxvdyByZW1vdmUgdGhyb3R0bGVkIHRpbWVvdXRcbiAgICAgIHRocm90dGxlZEZuLmNhbmNlbCA9IGNhbmNlbDtcblxuICAgICAgcmV0dXJuIHRocm90dGxlZEZuO1xuICAgIH07XG5cbiAgICAvLyBjaGVjayBicm93c2VyIGNhcGFiaWxpdGllc1xuICAgIHZhciBicm93c2VyID0ge1xuICAgICAgYWRkRXZlbnRMaXN0ZW5lcjogISFyb290LmFkZEV2ZW50TGlzdGVuZXIsXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICAgIHRvdWNoOiAoJ29udG91Y2hzdGFydCcgaW4gcm9vdCkgfHwgcm9vdC5Eb2N1bWVudFRvdWNoICYmIF9kb2N1bWVudCBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2gsXG4gICAgICB0cmFuc2l0aW9uczogKGZ1bmN0aW9uKHRlbXApIHtcbiAgICAgICAgdmFyIHByb3BzID0gWyd0cmFuc2l0aW9uUHJvcGVydHknLCAnV2Via2l0VHJhbnNpdGlvbicsICdNb3pUcmFuc2l0aW9uJywgJ09UcmFuc2l0aW9uJywgJ21zVHJhbnNpdGlvbiddO1xuICAgICAgICBmb3IgKCB2YXIgaSBpbiBwcm9wcyApIHtcbiAgICAgICAgICBpZiAodGVtcC5zdHlsZVsgcHJvcHNbaV0gXSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KShfZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3dpcGUnKSlcbiAgICB9O1xuXG4gICAgLy8gcXVpdCBpZiBubyByb290IGVsZW1lbnRcbiAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgdmFyIGVsZW1lbnQgPSBjb250YWluZXIuY2hpbGRyZW5bMF07XG4gICAgdmFyIHNsaWRlcywgc2xpZGVQb3MsIHdpZHRoLCBsZW5ndGg7XG4gICAgdmFyIGluZGV4ID0gcGFyc2VJbnQob3B0aW9ucy5zdGFydFNsaWRlLCAxMCkgfHwgMDtcbiAgICB2YXIgc3BlZWQgPSBvcHRpb25zLnNwZWVkIHx8IDMwMDtcbiAgICBvcHRpb25zLmNvbnRpbnVvdXMgPSBvcHRpb25zLmNvbnRpbnVvdXMgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY29udGludW91cyA6IHRydWU7XG5cbiAgICAvLyBBdXRvUmVzdGFydCBvcHRpb246IGF1dG8gcmVzdGFydCBzbGlkZXNob3cgYWZ0ZXIgdXNlcidzIHRvdWNoIGV2ZW50XG4gICAgb3B0aW9ucy5hdXRvUmVzdGFydCA9IG9wdGlvbnMuYXV0b1Jlc3RhcnQgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuYXV0b1Jlc3RhcnQgOiBmYWxzZTtcblxuICAgIC8vIHRocm90dGxlZCBzZXR1cFxuICAgIHZhciB0aHJvdHRsZWRTZXR1cCA9IHRocm90dGxlKHNldHVwKTtcblxuICAgIC8vIHNldHVwIGV2ZW50IGNhcHR1cmluZ1xuICAgIHZhciBldmVudHMgPSB7XG5cbiAgICAgIGhhbmRsZUV2ZW50OiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICBjYXNlICdtb3VzZWRvd24nOlxuICAgICAgICAgIGNhc2UgJ3RvdWNoc3RhcnQnOiB0aGlzLnN0YXJ0KGV2ZW50KTsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbW91c2Vtb3ZlJzpcbiAgICAgICAgICBjYXNlICd0b3VjaG1vdmUnOiB0aGlzLm1vdmUoZXZlbnQpOyBicmVhaztcbiAgICAgICAgICBjYXNlICdtb3VzZXVwJzpcbiAgICAgICAgICBjYXNlICdtb3VzZWxlYXZlJzpcbiAgICAgICAgICBjYXNlICd0b3VjaGVuZCc6IHRoaXMuZW5kKGV2ZW50KTsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnd2Via2l0VHJhbnNpdGlvbkVuZCc6XG4gICAgICAgICAgY2FzZSAnbXNUcmFuc2l0aW9uRW5kJzpcbiAgICAgICAgICBjYXNlICdvVHJhbnNpdGlvbkVuZCc6XG4gICAgICAgICAgY2FzZSAnb3RyYW5zaXRpb25lbmQnOlxuICAgICAgICAgIGNhc2UgJ3RyYW5zaXRpb25lbmQnOiB0aGlzLnRyYW5zaXRpb25FbmQoZXZlbnQpOyBicmVhaztcbiAgICAgICAgICBjYXNlICdyZXNpemUnOiB0aHJvdHRsZWRTZXR1cCgpOyBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLnN0b3BQcm9wYWdhdGlvbikge1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBzdGFydDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIHRvdWNoZXM7XG5cbiAgICAgICAgaWYgKGlzTW91c2VFdmVudChldmVudCkpIHtcbiAgICAgICAgICB0b3VjaGVzID0gZXZlbnQ7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gRm9yIGRlc2t0b3AgU2FmYXJpIGRyYWdcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b3VjaGVzID0gZXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1lYXN1cmUgc3RhcnQgdmFsdWVzXG4gICAgICAgIHN0YXJ0ID0ge1xuXG4gICAgICAgICAgLy8gZ2V0IGluaXRpYWwgdG91Y2ggY29vcmRzXG4gICAgICAgICAgeDogdG91Y2hlcy5wYWdlWCxcbiAgICAgICAgICB5OiB0b3VjaGVzLnBhZ2VZLFxuXG4gICAgICAgICAgLy8gc3RvcmUgdGltZSB0byBkZXRlcm1pbmUgdG91Y2ggZHVyYXRpb25cbiAgICAgICAgICB0aW1lOiArbmV3IERhdGUoKVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gdXNlZCBmb3IgdGVzdGluZyBmaXJzdCBtb3ZlIGV2ZW50XG4gICAgICAgIGlzU2Nyb2xsaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIHJlc2V0IGRlbHRhIGFuZCBlbmQgbWVhc3VyZW1lbnRzXG4gICAgICAgIGRlbHRhID0ge307XG5cbiAgICAgICAgLy8gYXR0YWNoIHRvdWNobW92ZSBhbmQgdG91Y2hlbmQgbGlzdGVuZXJzXG4gICAgICAgIGlmIChpc01vdXNlRXZlbnQoZXZlbnQpKSB7XG4gICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLCBmYWxzZSk7XG4gICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcywgZmFsc2UpO1xuICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMsIGZhbHNlKTtcbiAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcywgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgIH0sXG5cbiAgICAgIG1vdmU6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciB0b3VjaGVzO1xuXG4gICAgICAgIGlmIChpc01vdXNlRXZlbnQoZXZlbnQpKSB7XG4gICAgICAgICAgdG91Y2hlcyA9IGV2ZW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGVuc3VyZSBzd2lwaW5nIHdpdGggb25lIHRvdWNoIGFuZCBub3QgcGluY2hpbmdcbiAgICAgICAgICBpZiAoIGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMSB8fCBldmVudC5zY2FsZSAmJiBldmVudC5zY2FsZSAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChvcHRpb25zLmRpc2FibGVTY3JvbGwpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdG91Y2hlcyA9IGV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtZWFzdXJlIGNoYW5nZSBpbiB4IGFuZCB5XG4gICAgICAgIGRlbHRhID0ge1xuICAgICAgICAgIHg6IHRvdWNoZXMucGFnZVggLSBzdGFydC54LFxuICAgICAgICAgIHk6IHRvdWNoZXMucGFnZVkgLSBzdGFydC55XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIGlmIHNjcm9sbGluZyB0ZXN0IGhhcyBydW4gLSBvbmUgdGltZSB0ZXN0XG4gICAgICAgIGlmICggdHlwZW9mIGlzU2Nyb2xsaW5nID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlzU2Nyb2xsaW5nID0gISEoIGlzU2Nyb2xsaW5nIHx8IE1hdGguYWJzKGRlbHRhLngpIDwgTWF0aC5hYnMoZGVsdGEueSkgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHVzZXIgaXMgbm90IHRyeWluZyB0byBzY3JvbGwgdmVydGljYWxseVxuICAgICAgICBpZiAoIWlzU2Nyb2xsaW5nKSB7XG5cbiAgICAgICAgICAvLyBwcmV2ZW50IG5hdGl2ZSBzY3JvbGxpbmdcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgLy8gc3RvcCBzbGlkZXNob3dcbiAgICAgICAgICBzdG9wKCk7XG5cbiAgICAgICAgICAvLyBpbmNyZWFzZSByZXNpc3RhbmNlIGlmIGZpcnN0IG9yIGxhc3Qgc2xpZGVcbiAgICAgICAgICBpZiAob3B0aW9ucy5jb250aW51b3VzKSB7IC8vIHdlIGRvbid0IGFkZCByZXNpc3RhbmNlIGF0IHRoZSBlbmRcblxuICAgICAgICAgICAgdHJhbnNsYXRlKGNpcmNsZShpbmRleC0xKSwgZGVsdGEueCArIHNsaWRlUG9zW2NpcmNsZShpbmRleC0xKV0sIDApO1xuICAgICAgICAgICAgdHJhbnNsYXRlKGluZGV4LCBkZWx0YS54ICsgc2xpZGVQb3NbaW5kZXhdLCAwKTtcbiAgICAgICAgICAgIHRyYW5zbGF0ZShjaXJjbGUoaW5kZXgrMSksIGRlbHRhLnggKyBzbGlkZVBvc1tjaXJjbGUoaW5kZXgrMSldLCAwKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGRlbHRhLnggPVxuICAgICAgICAgICAgICBkZWx0YS54IC9cbiAgICAgICAgICAgICAgKCAoIWluZGV4ICYmIGRlbHRhLnggPiAwIHx8ICAgICAgICAgICAgIC8vIGlmIGZpcnN0IHNsaWRlIGFuZCBzbGlkaW5nIGxlZnRcbiAgICAgICAgICAgICAgICAgaW5kZXggPT09IHNsaWRlcy5sZW5ndGggLSAxICYmICAgICAgICAvLyBvciBpZiBsYXN0IHNsaWRlIGFuZCBzbGlkaW5nIHJpZ2h0XG4gICAgICAgICAgICAgICAgIGRlbHRhLnggPCAwICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYW5kIGlmIHNsaWRpbmcgYXQgYWxsXG4gICAgICAgICAgICAgICAgKSA/XG4gICAgICAgICAgICAgICAoIE1hdGguYWJzKGRlbHRhLngpIC8gd2lkdGggKyAxICkgICAgICAvLyBkZXRlcm1pbmUgcmVzaXN0YW5jZSBsZXZlbFxuICAgICAgICAgICAgICAgOiAxICk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm8gcmVzaXN0YW5jZSBpZiBmYWxzZVxuXG4gICAgICAgICAgICAvLyB0cmFuc2xhdGUgMToxXG4gICAgICAgICAgICB0cmFuc2xhdGUoaW5kZXgtMSwgZGVsdGEueCArIHNsaWRlUG9zW2luZGV4LTFdLCAwKTtcbiAgICAgICAgICAgIHRyYW5zbGF0ZShpbmRleCwgZGVsdGEueCArIHNsaWRlUG9zW2luZGV4XSwgMCk7XG4gICAgICAgICAgICB0cmFuc2xhdGUoaW5kZXgrMSwgZGVsdGEueCArIHNsaWRlUG9zW2luZGV4KzFdLCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGVuZDogZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAvLyBtZWFzdXJlIGR1cmF0aW9uXG4gICAgICAgIHZhciBkdXJhdGlvbiA9ICtuZXcgRGF0ZSgpIC0gc3RhcnQudGltZTtcblxuICAgICAgICAvLyBkZXRlcm1pbmUgaWYgc2xpZGUgYXR0ZW1wdCB0cmlnZ2VycyBuZXh0L3ByZXYgc2xpZGVcbiAgICAgICAgdmFyIGlzVmFsaWRTbGlkZSA9XG4gICAgICAgICAgICBOdW1iZXIoZHVyYXRpb24pIDwgMjUwICYmICAgICAgICAgLy8gaWYgc2xpZGUgZHVyYXRpb24gaXMgbGVzcyB0aGFuIDI1MG1zXG4gICAgICAgICAgICBNYXRoLmFicyhkZWx0YS54KSA+IDIwIHx8ICAgICAgICAgLy8gYW5kIGlmIHNsaWRlIGFtdCBpcyBncmVhdGVyIHRoYW4gMjBweFxuICAgICAgICAgICAgTWF0aC5hYnMoZGVsdGEueCkgPiB3aWR0aC8yOyAgICAgIC8vIG9yIGlmIHNsaWRlIGFtdCBpcyBncmVhdGVyIHRoYW4gaGFsZiB0aGUgd2lkdGhcblxuICAgICAgICAvLyBkZXRlcm1pbmUgaWYgc2xpZGUgYXR0ZW1wdCBpcyBwYXN0IHN0YXJ0IGFuZCBlbmRcbiAgICAgICAgdmFyIGlzUGFzdEJvdW5kcyA9XG4gICAgICAgICAgICAhaW5kZXggJiYgZGVsdGEueCA+IDAgfHwgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgZmlyc3Qgc2xpZGUgYW5kIHNsaWRlIGFtdCBpcyBncmVhdGVyIHRoYW4gMFxuICAgICAgICAgICAgaW5kZXggPT09IHNsaWRlcy5sZW5ndGggLSAxICYmIGRlbHRhLnggPCAwOyAgIC8vIG9yIGlmIGxhc3Qgc2xpZGUgYW5kIHNsaWRlIGFtdCBpcyBsZXNzIHRoYW4gMFxuXG4gICAgICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMpIHtcbiAgICAgICAgICBpc1Bhc3RCb3VuZHMgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE9MRCBkZXRlcm1pbmUgZGlyZWN0aW9uIG9mIHN3aXBlICh0cnVlOnJpZ2h0LCBmYWxzZTpsZWZ0KVxuICAgICAgICAvLyBkZXRlcm1pbmUgZGlyZWN0aW9uIG9mIHN3aXBlICgxOiBiYWNrd2FyZCwgLTE6IGZvcndhcmQpXG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBNYXRoLmFicyhkZWx0YS54KSAvIGRlbHRhLng7XG5cbiAgICAgICAgLy8gaWYgbm90IHNjcm9sbGluZyB2ZXJ0aWNhbGx5XG4gICAgICAgIGlmICghaXNTY3JvbGxpbmcpIHtcblxuICAgICAgICAgIGlmIChpc1ZhbGlkU2xpZGUgJiYgIWlzUGFzdEJvdW5kcykge1xuXG4gICAgICAgICAgICAvLyBpZiB3ZSdyZSBtb3ZpbmcgcmlnaHRcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPCAwKSB7XG5cbiAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuY29udGludW91cykgeyAvLyB3ZSBuZWVkIHRvIGdldCB0aGUgbmV4dCBpbiB0aGlzIGRpcmVjdGlvbiBpbiBwbGFjZVxuXG4gICAgICAgICAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgtMSksIC13aWR0aCwgMCk7XG4gICAgICAgICAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgrMiksIHdpZHRoLCAwKTtcblxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1vdmUoaW5kZXgtMSwgLXdpZHRoLCAwKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIG1vdmUoaW5kZXgsIHNsaWRlUG9zW2luZGV4XS13aWR0aCwgc3BlZWQpO1xuICAgICAgICAgICAgICBtb3ZlKGNpcmNsZShpbmRleCsxKSwgc2xpZGVQb3NbY2lyY2xlKGluZGV4KzEpXS13aWR0aCwgc3BlZWQpO1xuICAgICAgICAgICAgICBpbmRleCA9IGNpcmNsZShpbmRleCsxKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuY29udGludW91cykgeyAvLyB3ZSBuZWVkIHRvIGdldCB0aGUgbmV4dCBpbiB0aGlzIGRpcmVjdGlvbiBpbiBwbGFjZVxuXG4gICAgICAgICAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgrMSksIHdpZHRoLCAwKTtcbiAgICAgICAgICAgICAgICBtb3ZlKGNpcmNsZShpbmRleC0yKSwgLXdpZHRoLCAwKTtcblxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1vdmUoaW5kZXgrMSwgd2lkdGgsIDApO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgbW92ZShpbmRleCwgc2xpZGVQb3NbaW5kZXhdK3dpZHRoLCBzcGVlZCk7XG4gICAgICAgICAgICAgIG1vdmUoY2lyY2xlKGluZGV4LTEpLCBzbGlkZVBvc1tjaXJjbGUoaW5kZXgtMSldK3dpZHRoLCBzcGVlZCk7XG4gICAgICAgICAgICAgIGluZGV4ID0gY2lyY2xlKGluZGV4LTEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBydW5DYWxsYmFjayhnZXRQb3MoKSwgc2xpZGVzW2luZGV4XSwgZGlyZWN0aW9uKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMpIHtcblxuICAgICAgICAgICAgICBtb3ZlKGNpcmNsZShpbmRleC0xKSwgLXdpZHRoLCBzcGVlZCk7XG4gICAgICAgICAgICAgIG1vdmUoaW5kZXgsIDAsIHNwZWVkKTtcbiAgICAgICAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgrMSksIHdpZHRoLCBzcGVlZCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgbW92ZShpbmRleC0xLCAtd2lkdGgsIHNwZWVkKTtcbiAgICAgICAgICAgICAgbW92ZShpbmRleCwgMCwgc3BlZWQpO1xuICAgICAgICAgICAgICBtb3ZlKGluZGV4KzEsIHdpZHRoLCBzcGVlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8ga2lsbCB0b3VjaG1vdmUgYW5kIHRvdWNoZW5kIGV2ZW50IGxpc3RlbmVycyB1bnRpbCB0b3VjaHN0YXJ0IGNhbGxlZCBhZ2FpblxuICAgICAgICBpZiAoaXNNb3VzZUV2ZW50KGV2ZW50KSkge1xuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBldmVudHMsIGZhbHNlKTtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgfSxcblxuICAgICAgdHJhbnNpdGlvbkVuZDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICBpZiAoY3VycmVudEluZGV4ID09PSBpbmRleCkge1xuICAgICAgICAgIGlmIChkZWxheSB8fCBvcHRpb25zLmF1dG9SZXN0YXJ0KSByZXN0YXJ0KCk7XG5cbiAgICAgICAgICBydW5UcmFuc2l0aW9uRW5kKGdldFBvcygpLCBzbGlkZXNbaW5kZXhdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyB0cmlnZ2VyIHNldHVwXG4gICAgc2V0dXAoKTtcblxuICAgIC8vIHN0YXJ0IGF1dG8gc2xpZGVzaG93IGlmIGFwcGxpY2FibGVcbiAgICBiZWdpbigpO1xuXG4gICAgLy8gRXhwb3NlIHRoZSBTd2lwZSBBUElcbiAgICByZXR1cm4ge1xuICAgICAgLy8gaW5pdGlhbGl6ZVxuICAgICAgc2V0dXA6IHNldHVwLFxuXG4gICAgICAvLyBnbyB0byBzbGlkZVxuICAgICAgc2xpZGU6IGZ1bmN0aW9uKHRvLCBzcGVlZCkge1xuICAgICAgICBzdG9wKCk7XG4gICAgICAgIHNsaWRlKHRvLCBzcGVlZCk7XG4gICAgICB9LFxuXG4gICAgICAvLyBtb3ZlIHRvIHByZXZpb3VzXG4gICAgICBwcmV2OiBmdW5jdGlvbigpIHtcbiAgICAgICAgc3RvcCgpO1xuICAgICAgICBwcmV2KCk7XG4gICAgICB9LFxuXG4gICAgICAvLyBtb3ZlIHRvIG5leHRcbiAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBzdG9wKCk7XG4gICAgICAgIG5leHQoKTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIFJlc3RhcnQgc2xpZGVzaG93XG4gICAgICByZXN0YXJ0OiByZXN0YXJ0LFxuXG4gICAgICAvLyBjYW5jZWwgc2xpZGVzaG93XG4gICAgICBzdG9wOiBzdG9wLFxuXG4gICAgICAvLyByZXR1cm4gY3VycmVudCBpbmRleCBwb3NpdGlvblxuICAgICAgZ2V0UG9zOiBnZXRQb3MsXG5cbiAgICAgIC8vIGRpc2FibGUgc2xpZGVzaG93XG4gICAgICBkaXNhYmxlOiBkaXNhYmxlLFxuXG4gICAgICAvLyBlbmFibGUgc2xpZGVzaG93XG4gICAgICBlbmFibGU6IGVuYWJsZSxcblxuICAgICAgLy8gcmV0dXJuIHRvdGFsIG51bWJlciBvZiBzbGlkZXNcbiAgICAgIGdldE51bVNsaWRlczogZnVuY3Rpb24oKSB7IHJldHVybiBsZW5ndGg7IH0sXG5cbiAgICAgIC8vIGNvbXBsZXRlbHkgcmVtb3ZlIHN3aXBlXG4gICAgICBraWxsOiBraWxsXG4gICAgfTtcblxuICAgIC8vIHJlbW92ZSBhbGwgZXZlbnQgbGlzdGVuZXJzXG4gICAgZnVuY3Rpb24gZGV0YWNoRXZlbnRzKCkge1xuICAgICAgaWYgKGJyb3dzZXIuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAvLyByZW1vdmUgY3VycmVudCBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21zVHJhbnNpdGlvbkVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29UcmFuc2l0aW9uRW5kJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3RyYW5zaXRpb25lbmQnLCBldmVudHMsIGZhbHNlKTtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgIHJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb290Lm9ucmVzaXplID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXJzXG4gICAgZnVuY3Rpb24gYXR0YWNoRXZlbnRzKCkge1xuICAgICAgaWYgKGJyb3dzZXIuYWRkRXZlbnRMaXN0ZW5lcikge1xuXG4gICAgICAgIC8vIHNldCB0b3VjaHN0YXJ0IGV2ZW50IG9uIGVsZW1lbnRcbiAgICAgICAgaWYgKGJyb3dzZXIudG91Y2gpIHtcbiAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBldmVudHMsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLmRyYWdnYWJsZSkge1xuICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYnJvd3Nlci50cmFuc2l0aW9ucykge1xuICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbXNUcmFuc2l0aW9uRW5kJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdvVHJhbnNpdGlvbkVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignb3RyYW5zaXRpb25lbmQnLCBldmVudHMsIGZhbHNlKTtcbiAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBldmVudHMsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldCByZXNpemUgZXZlbnQgb24gd2luZG93XG4gICAgICAgIHJvb3QuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZXZlbnRzLCBmYWxzZSk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3Qub25yZXNpemUgPSB0aHJvdHRsZWRTZXR1cDsgLy8gdG8gcGxheSBuaWNlIHdpdGggb2xkIElFXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY2xvbmUgbm9kZXMgd2hlbiB0aGVyZSBpcyBvbmx5IHR3byBzbGlkZXNcbiAgICBmdW5jdGlvbiBjbG9uZU5vZGUoZWwpIHtcbiAgICAgIHZhciBjbG9uZSA9IGVsLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2xvbmUpO1xuXG4gICAgICAvLyB0YWcgdGhlc2Ugc2xpZGVzIGFzIGNsb25lcyAodG8gcmVtb3ZlIHRoZW0gb24ga2lsbClcbiAgICAgIGNsb25lLnNldEF0dHJpYnV0ZSgnZGF0YS1jbG9uZWQnLCB0cnVlKTtcblxuICAgICAgLy8gUmVtb3ZlIGlkIGZyb20gZWxlbWVudFxuICAgICAgY2xvbmUucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHVwKG9wdHMpIHtcbiAgICAgIC8vIE92ZXJ3cml0ZSBvcHRpb25zIGlmIG5lY2Vzc2FyeVxuICAgICAgaWYgKG9wdHMgIT0gbnVsbCkge1xuICAgICAgICBmb3IgKHZhciBwcm9wIGluIG9wdHMpIHtcbiAgICAgICAgICBvcHRpb25zW3Byb3BdID0gb3B0c1twcm9wXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBjYWNoZSBzbGlkZXNcbiAgICAgIHNsaWRlcyA9IGVsZW1lbnQuY2hpbGRyZW47XG4gICAgICBsZW5ndGggPSBzbGlkZXMubGVuZ3RoO1xuXG4gICAgICAvLyBzbGlkZXMgbGVuZ3RoIGNvcnJlY3Rpb24sIG1pbnVzIGNsb25lZCBzbGlkZXNcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzbGlkZXNbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWNsb25lZCcpKSBsZW5ndGgtLTtcbiAgICAgIH1cblxuICAgICAgLy8gc2V0IGNvbnRpbnVvdXMgdG8gZmFsc2UgaWYgb25seSBvbmUgc2xpZGVcbiAgICAgIGlmIChzbGlkZXMubGVuZ3RoIDwgMikge1xuICAgICAgICBvcHRpb25zLmNvbnRpbnVvdXMgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gc3BlY2lhbCBjYXNlIGlmIHR3byBzbGlkZXNcbiAgICAgIGlmIChicm93c2VyLnRyYW5zaXRpb25zICYmIG9wdGlvbnMuY29udGludW91cyAmJiBzbGlkZXMubGVuZ3RoIDwgMykge1xuICAgICAgICBjbG9uZU5vZGUoc2xpZGVzWzBdKTtcbiAgICAgICAgY2xvbmVOb2RlKHNsaWRlc1sxXSk7XG5cbiAgICAgICAgc2xpZGVzID0gZWxlbWVudC5jaGlsZHJlbjtcbiAgICAgIH1cblxuICAgICAgLy8gY3JlYXRlIGFuIGFycmF5IHRvIHN0b3JlIGN1cnJlbnQgcG9zaXRpb25zIG9mIGVhY2ggc2xpZGVcbiAgICAgIHNsaWRlUG9zID0gbmV3IEFycmF5KHNsaWRlcy5sZW5ndGgpO1xuXG4gICAgICAvLyBkZXRlcm1pbmUgd2lkdGggb2YgZWFjaCBzbGlkZVxuICAgICAgd2lkdGggPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggfHwgY29udGFpbmVyLm9mZnNldFdpZHRoO1xuXG4gICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gKHNsaWRlcy5sZW5ndGggKiB3aWR0aCAqIDIpICsgJ3B4JztcblxuICAgICAgLy8gc3RhY2sgZWxlbWVudHNcbiAgICAgIHZhciBwb3MgPSBzbGlkZXMubGVuZ3RoO1xuICAgICAgd2hpbGUocG9zLS0pIHtcbiAgICAgICAgdmFyIHNsaWRlID0gc2xpZGVzW3Bvc107XG5cbiAgICAgICAgc2xpZGUuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgICAgIHNsaWRlLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIHBvcyk7XG5cbiAgICAgICAgaWYgKGJyb3dzZXIudHJhbnNpdGlvbnMpIHtcbiAgICAgICAgICBzbGlkZS5zdHlsZS5sZWZ0ID0gKHBvcyAqIC13aWR0aCkgKyAncHgnO1xuICAgICAgICAgIG1vdmUocG9zLCBpbmRleCA+IHBvcyA/IC13aWR0aCA6IChpbmRleCA8IHBvcyA/IHdpZHRoIDogMCksIDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHJlcG9zaXRpb24gZWxlbWVudHMgYmVmb3JlIGFuZCBhZnRlciBpbmRleFxuICAgICAgaWYgKG9wdGlvbnMuY29udGludW91cyAmJiBicm93c2VyLnRyYW5zaXRpb25zKSB7XG4gICAgICAgIG1vdmUoY2lyY2xlKGluZGV4LTEpLCAtd2lkdGgsIDApO1xuICAgICAgICBtb3ZlKGNpcmNsZShpbmRleCsxKSwgd2lkdGgsIDApO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWJyb3dzZXIudHJhbnNpdGlvbnMpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gKGluZGV4ICogLXdpZHRoKSArICdweCc7XG4gICAgICB9XG5cbiAgICAgIGNvbnRhaW5lci5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuXG4gICAgICAvLyByZWluaXRpYWxpemUgZXZlbnRzXG4gICAgICBkZXRhY2hFdmVudHMoKTtcbiAgICAgIGF0dGFjaEV2ZW50cygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZXYoKSB7XG4gICAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcblxuICAgICAgaWYgKG9wdGlvbnMuY29udGludW91cykge1xuICAgICAgICBzbGlkZShpbmRleC0xKTtcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXgpIHtcbiAgICAgICAgc2xpZGUoaW5kZXgtMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuO1xuXG4gICAgICBpZiAob3B0aW9ucy5jb250aW51b3VzKSB7XG4gICAgICAgIHNsaWRlKGluZGV4KzEpO1xuICAgICAgfSBlbHNlIGlmIChpbmRleCA8IHNsaWRlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgIHNsaWRlKGluZGV4KzEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bkNhbGxiYWNrKHBvcywgaW5kZXgsIGRpcikge1xuICAgICAgaWYgKG9wdGlvbnMuY2FsbGJhY2spIHtcbiAgICAgICAgb3B0aW9ucy5jYWxsYmFjayhwb3MsIGluZGV4LCBkaXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1blRyYW5zaXRpb25FbmQocG9zLCBpbmRleCkge1xuICAgICAgaWYgKG9wdGlvbnMudHJhbnNpdGlvbkVuZCkge1xuICAgICAgICBvcHRpb25zLnRyYW5zaXRpb25FbmQocG9zLCBpbmRleCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2lyY2xlKGluZGV4KSB7XG5cbiAgICAgIC8vIGEgc2ltcGxlIHBvc2l0aXZlIG1vZHVsbyB1c2luZyBzbGlkZXMubGVuZ3RoXG4gICAgICByZXR1cm4gKHNsaWRlcy5sZW5ndGggKyAoaW5kZXggJSBzbGlkZXMubGVuZ3RoKSkgJSBzbGlkZXMubGVuZ3RoO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFBvcygpIHtcbiAgICAgIC8vIEZpeCBmb3IgdGhlIGNsb25lIGlzc3VlIGluIHRoZSBldmVudCBvZiAyIHNsaWRlc1xuICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IGluZGV4O1xuXG4gICAgICBpZiAoY3VycmVudEluZGV4ID49IGxlbmd0aCkge1xuICAgICAgICBjdXJyZW50SW5kZXggPSBjdXJyZW50SW5kZXggLSBsZW5ndGg7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjdXJyZW50SW5kZXg7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2xpZGUodG8sIHNsaWRlU3BlZWQpIHtcblxuICAgICAgLy8gZW5zdXJlIHRvIGlzIG9mIHR5cGUgJ251bWJlcidcbiAgICAgIHRvID0gdHlwZW9mIHRvICE9PSAnbnVtYmVyJyA/IHBhcnNlSW50KHRvLCAxMCkgOiB0bztcblxuICAgICAgLy8gZG8gbm90aGluZyBpZiBhbHJlYWR5IG9uIHJlcXVlc3RlZCBzbGlkZVxuICAgICAgaWYgKGluZGV4ID09PSB0bykgcmV0dXJuO1xuXG4gICAgICBpZiAoYnJvd3Nlci50cmFuc2l0aW9ucykge1xuXG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBNYXRoLmFicyhpbmRleC10bykgLyAoaW5kZXgtdG8pOyAvLyAxOiBiYWNrd2FyZCwgLTE6IGZvcndhcmRcblxuICAgICAgICAvLyBnZXQgdGhlIGFjdHVhbCBwb3NpdGlvbiBvZiB0aGUgc2xpZGVcbiAgICAgICAgaWYgKG9wdGlvbnMuY29udGludW91cykge1xuICAgICAgICAgIHZhciBuYXR1cmFsX2RpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgICBkaXJlY3Rpb24gPSAtc2xpZGVQb3NbY2lyY2xlKHRvKV0gLyB3aWR0aDtcblxuICAgICAgICAgIC8vIGlmIGdvaW5nIGZvcndhcmQgYnV0IHRvIDwgaW5kZXgsIHVzZSB0byA9IHNsaWRlcy5sZW5ndGggKyB0b1xuICAgICAgICAgIC8vIGlmIGdvaW5nIGJhY2t3YXJkIGJ1dCB0byA+IGluZGV4LCB1c2UgdG8gPSAtc2xpZGVzLmxlbmd0aCArIHRvXG4gICAgICAgICAgaWYgKGRpcmVjdGlvbiAhPT0gbmF0dXJhbF9kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIHRvID0gLWRpcmVjdGlvbiAqIHNsaWRlcy5sZW5ndGggKyB0bztcbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkaWZmID0gTWF0aC5hYnMoaW5kZXgtdG8pIC0gMTtcblxuICAgICAgICAvLyBtb3ZlIGFsbCB0aGUgc2xpZGVzIGJldHdlZW4gaW5kZXggYW5kIHRvIGluIHRoZSByaWdodCBkaXJlY3Rpb25cbiAgICAgICAgd2hpbGUgKGRpZmYtLSkge1xuICAgICAgICAgIG1vdmUoIGNpcmNsZSgodG8gPiBpbmRleCA/IHRvIDogaW5kZXgpIC0gZGlmZiAtIDEpLCB3aWR0aCAqIGRpcmVjdGlvbiwgMCk7XG4gICAgICAgIH1cblxuICAgICAgICB0byA9IGNpcmNsZSh0byk7XG5cbiAgICAgICAgbW92ZShpbmRleCwgd2lkdGggKiBkaXJlY3Rpb24sIHNsaWRlU3BlZWQgfHwgc3BlZWQpO1xuICAgICAgICBtb3ZlKHRvLCAwLCBzbGlkZVNwZWVkIHx8IHNwZWVkKTtcblxuICAgICAgICBpZiAob3B0aW9ucy5jb250aW51b3VzKSB7IC8vIHdlIG5lZWQgdG8gZ2V0IHRoZSBuZXh0IGluIHBsYWNlXG4gICAgICAgICAgbW92ZShjaXJjbGUodG8gLSBkaXJlY3Rpb24pLCAtKHdpZHRoICogZGlyZWN0aW9uKSwgMCk7XG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICB0byA9IGNpcmNsZSh0byk7XG4gICAgICAgIGFuaW1hdGUoaW5kZXggKiAtd2lkdGgsIHRvICogLXdpZHRoLCBzbGlkZVNwZWVkIHx8IHNwZWVkKTtcbiAgICAgICAgLy8gbm8gZmFsbGJhY2sgZm9yIGEgY2lyY3VsYXIgY29udGludW91cyBpZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBhY2NlcHQgdHJhbnNpdGlvbnNcbiAgICAgIH1cblxuICAgICAgaW5kZXggPSB0bztcbiAgICAgIG9mZmxvYWRGbihmdW5jdGlvbigpIHtcbiAgICAgICAgcnVuQ2FsbGJhY2soZ2V0UG9zKCksIHNsaWRlc1tpbmRleF0sIGRpcmVjdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3ZlKGluZGV4LCBkaXN0LCBzcGVlZCkge1xuICAgICAgdHJhbnNsYXRlKGluZGV4LCBkaXN0LCBzcGVlZCk7XG4gICAgICBzbGlkZVBvc1tpbmRleF0gPSBkaXN0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZShpbmRleCwgZGlzdCwgc3BlZWQpIHtcblxuICAgICAgdmFyIHNsaWRlID0gc2xpZGVzW2luZGV4XTtcbiAgICAgIHZhciBzdHlsZSA9IHNsaWRlICYmIHNsaWRlLnN0eWxlO1xuXG4gICAgICBpZiAoIXN0eWxlKSByZXR1cm47XG5cbiAgICAgIHN0eWxlLndlYmtpdFRyYW5zaXRpb25EdXJhdGlvbiA9XG4gICAgICAgIHN0eWxlLk1velRyYW5zaXRpb25EdXJhdGlvbiA9XG4gICAgICAgIHN0eWxlLm1zVHJhbnNpdGlvbkR1cmF0aW9uID1cbiAgICAgICAgc3R5bGUuT1RyYW5zaXRpb25EdXJhdGlvbiA9XG4gICAgICAgIHN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IHNwZWVkICsgJ21zJztcblxuICAgICAgc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgZGlzdCArICdweCwwKScgKyAndHJhbnNsYXRlWigwKSc7XG4gICAgICBzdHlsZS5tc1RyYW5zZm9ybSA9XG4gICAgICAgIHN0eWxlLk1velRyYW5zZm9ybSA9XG4gICAgICAgIHN0eWxlLk9UcmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgZGlzdCArICdweCknO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYW5pbWF0ZShmcm9tLCB0bywgc3BlZWQpIHtcblxuICAgICAgLy8gaWYgbm90IGFuIGFuaW1hdGlvbiwganVzdCByZXBvc2l0aW9uXG4gICAgICBpZiAoIXNwZWVkKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHRvICsgJ3B4JztcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgc3RhcnQgPSArbmV3IERhdGUoKTtcblxuICAgICAgdmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0aW1lRWxhcCA9ICtuZXcgRGF0ZSgpIC0gc3RhcnQ7XG5cbiAgICAgICAgaWYgKHRpbWVFbGFwID4gc3BlZWQpIHtcblxuICAgICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHRvICsgJ3B4JztcblxuICAgICAgICAgIGlmIChkZWxheSB8fCBvcHRpb25zLmF1dG9SZXN0YXJ0KSByZXN0YXJ0KCk7XG5cbiAgICAgICAgICBydW5UcmFuc2l0aW9uRW5kKGdldFBvcygpLCBzbGlkZXNbaW5kZXhdKTtcblxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gKCggKHRvIC0gZnJvbSkgKiAoTWF0aC5mbG9vcigodGltZUVsYXAgLyBzcGVlZCkgKiAxMDApIC8gMTAwKSApICsgZnJvbSkgKyAncHgnO1xuICAgICAgfSwgNCk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBiZWdpbigpIHtcbiAgICAgIGRlbGF5ID0gb3B0aW9ucy5hdXRvIHx8IDA7XG4gICAgICBpZiAoZGVsYXkpIGludGVydmFsID0gc2V0VGltZW91dChuZXh0LCBkZWxheSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgIGRlbGF5ID0gMDtcbiAgICAgIGNsZWFyVGltZW91dChpbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzdGFydCgpIHtcbiAgICAgIHN0b3AoKTtcbiAgICAgIGJlZ2luKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgIHN0b3AoKTtcbiAgICAgIGRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICBkaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgcmVzdGFydCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzTW91c2VFdmVudChlKSB7XG4gICAgICByZXR1cm4gL15tb3VzZS8udGVzdChlLnR5cGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGtpbGwoKSB7XG4gICAgICAvLyBjYW5jZWwgc2xpZGVzaG93XG4gICAgICBzdG9wKCk7XG5cbiAgICAgIC8vIHJlbW92ZSBpbmxpbmUgc3R5bGVzXG4gICAgICBjb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9ICcnO1xuXG4gICAgICAvLyByZXNldCBlbGVtZW50XG4gICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gJyc7XG4gICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSAnJztcblxuICAgICAgLy8gcmVzZXQgc2xpZGVzXG4gICAgICB2YXIgcG9zID0gc2xpZGVzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChwb3MtLSkge1xuXG4gICAgICAgIGlmIChicm93c2VyLnRyYW5zaXRpb25zKSB7XG4gICAgICAgICAgdHJhbnNsYXRlKHBvcywgMCwgMCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2xpZGUgPSBzbGlkZXNbcG9zXTtcblxuICAgICAgICAvLyBpZiB0aGUgc2xpZGUgaXMgdGFnZ2VkIGFzIGNsb25lLCByZW1vdmUgaXRcbiAgICAgICAgaWYgKHNsaWRlLmdldEF0dHJpYnV0ZSgnZGF0YS1jbG9uZWQnKSkge1xuICAgICAgICAgIHZhciBfcGFyZW50ID0gc2xpZGUucGFyZW50RWxlbWVudDtcbiAgICAgICAgICBfcGFyZW50LnJlbW92ZUNoaWxkKHNsaWRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSBzdHlsZXNcbiAgICAgICAgc2xpZGUuc3R5bGUud2lkdGggPSAnJztcbiAgICAgICAgc2xpZGUuc3R5bGUubGVmdCA9ICcnO1xuXG4gICAgICAgIHNsaWRlLnN0eWxlLndlYmtpdFRyYW5zaXRpb25EdXJhdGlvbiA9XG4gICAgICAgICAgc2xpZGUuc3R5bGUuTW96VHJhbnNpdGlvbkR1cmF0aW9uID1cbiAgICAgICAgICBzbGlkZS5zdHlsZS5tc1RyYW5zaXRpb25EdXJhdGlvbiA9XG4gICAgICAgICAgc2xpZGUuc3R5bGUuT1RyYW5zaXRpb25EdXJhdGlvbiA9XG4gICAgICAgICAgc2xpZGUuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gJyc7XG5cbiAgICAgICAgc2xpZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtID1cbiAgICAgICAgICBzbGlkZS5zdHlsZS5tc1RyYW5zZm9ybSA9XG4gICAgICAgICAgc2xpZGUuc3R5bGUuTW96VHJhbnNmb3JtID1cbiAgICAgICAgICBzbGlkZS5zdHlsZS5PVHJhbnNmb3JtID0gJyc7XG5cbiAgICAgICAgLy8gcmVtb3ZlIGN1c3RvbSBhdHRyaWJ1dGVzICg/KVxuICAgICAgICAvLyBzbGlkZS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVtb3ZlIGFsbCBldmVudHNcbiAgICAgIGRldGFjaEV2ZW50cygpO1xuXG4gICAgICAvLyByZW1vdmUgdGhyb3R0bGVkIGZ1bmN0aW9uIHRpbWVvdXRcbiAgICAgIHRocm90dGxlZFNldHVwLmNhbmNlbCgpO1xuICAgIH1cbiAgfVxuXG4gIGlmICggcm9vdC5qUXVlcnkgfHwgcm9vdC5aZXB0byApIHtcbiAgICAoZnVuY3Rpb24oJCkge1xuICAgICAgJC5mbi5Td2lwZSA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQodGhpcykuZGF0YSgnU3dpcGUnLCBuZXcgU3dpcGUoJCh0aGlzKVswXSwgcGFyYW1zKSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KSggcm9vdC5qUXVlcnkgfHwgcm9vdC5aZXB0byApO1xuICB9XG5cbiAgcmV0dXJuIFN3aXBlO1xufSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3dpcGVqcy9zd2lwZS5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBMYXp5IExvYWQgLSBKYXZhU2NyaXB0IHBsdWdpbiBmb3IgbGF6eSBsb2FkaW5nIGltYWdlc1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAwNy0yMDE3IE1pa2EgVHV1cG9sYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZTpcbiAqICAgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAqXG4gKiBQcm9qZWN0IGhvbWU6XG4gKiAgIGh0dHBzOi8vYXBwZWxzaWluaS5uZXQvcHJvamVjdHMvbGF6eWxvYWRcbiAqXG4gKiBWZXJzaW9uOiAyLjAuMC1iZXRhLjJcbiAqXG4gKi9cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIHNyYzogJ2RhdGEtc3JjJyxcbiAgc3Jjc2V0OiAnZGF0YS1zcmNzZXQnLFxuICBzZWxlY3RvcjogJy5sYXp5bG9hZCdcbn1cblxuLyoqXG4qIE1lcmdlIHR3byBvciBtb3JlIG9iamVjdHMuIFJldHVybnMgYSBuZXcgb2JqZWN0LlxuKiBAcHJpdmF0ZVxuKiBAcGFyYW0ge0Jvb2xlYW59ICBkZWVwICAgICBJZiB0cnVlLCBkbyBhIGRlZXAgKG9yIHJlY3Vyc2l2ZSkgbWVyZ2UgW29wdGlvbmFsXVxuKiBAcGFyYW0ge09iamVjdH0gICBvYmplY3RzICBUaGUgb2JqZWN0cyB0byBtZXJnZSB0b2dldGhlclxuKiBAcmV0dXJucyB7T2JqZWN0fSAgICAgICAgICBNZXJnZWQgdmFsdWVzIG9mIGRlZmF1bHRzIGFuZCBvcHRpb25zXG4qL1xuY29uc3QgZXh0ZW5kID0gZnVuY3Rpb24gKCkge1xuICBsZXQgZXh0ZW5kZWQgPSB7fVxuICBsZXQgZGVlcCA9IGZhbHNlXG4gIGxldCBpID0gMFxuICBsZXQgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aFxuXG4gICAgLyogQ2hlY2sgaWYgYSBkZWVwIG1lcmdlICovXG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnRzWzBdKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nKSB7XG4gICAgZGVlcCA9IGFyZ3VtZW50c1swXVxuICAgIGkrK1xuICB9XG5cbiAgICAvKiBNZXJnZSB0aGUgb2JqZWN0IGludG8gdGhlIGV4dGVuZGVkIG9iamVjdCAqL1xuICBsZXQgbWVyZ2UgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgZm9yIChsZXQgcHJvcCBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkge1xuICAgICAgICAvKiBJZiBkZWVwIG1lcmdlIGFuZCBwcm9wZXJ0eSBpcyBhbiBvYmplY3QsIG1lcmdlIHByb3BlcnRpZXMgKi9cbiAgICAgICAgaWYgKGRlZXAgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9ialtwcm9wXSkgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBleHRlbmQodHJ1ZSwgZXh0ZW5kZWRbcHJvcF0sIG9ialtwcm9wXSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IG9ialtwcm9wXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyogTG9vcCB0aHJvdWdoIGVhY2ggb2JqZWN0IGFuZCBjb25kdWN0IGEgbWVyZ2UgKi9cbiAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGxldCBvYmogPSBhcmd1bWVudHNbaV1cbiAgICBtZXJnZShvYmopXG4gIH1cblxuICByZXR1cm4gZXh0ZW5kZWRcbn1cblxuZnVuY3Rpb24gTGF6eUxvYWQgKGltYWdlcywgb3B0aW9ucykge1xuICB0aGlzLnNldHRpbmdzID0gZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9KVxuICB0aGlzLmltYWdlcyA9IGltYWdlcyB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuc2V0dGluZ3Muc2VsZWN0b3IpXG4gIHRoaXMub2JzZXJ2ZXIgPSBudWxsXG4gIHRoaXMuaW5pdCgpXG59XG5cbkxhenlMb2FkLnByb3RvdHlwZSA9IHtcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgIC8qIFdpdGhvdXQgb2JzZXJ2ZXJzIGxvYWQgZXZlcnl0aGluZyBhbmQgYmFpbCBvdXQgZWFybHkuICovXG4gICAgaWYgKCF3aW5kb3cuSW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMubG9hZEltYWdlcygpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICBsZXQgb2JzZXJ2ZXJDb25maWcgPSB7XG4gICAgICByb290OiBudWxsLFxuICAgICAgcm9vdE1hcmdpbjogJzBweCcsXG4gICAgICB0aHJlc2hvbGQ6IFswXVxuICAgIH1cblxuICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKGVudHJpZXMpIHtcbiAgICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgICAgaWYgKGVudHJ5LmludGVyc2VjdGlvblJhdGlvID4gMCkge1xuICAgICAgICAgIHNlbGYub2JzZXJ2ZXIudW5vYnNlcnZlKGVudHJ5LnRhcmdldClcbiAgICAgICAgICBsZXQgc3JjID0gZW50cnkudGFyZ2V0LmdldEF0dHJpYnV0ZShzZWxmLnNldHRpbmdzLnNyYylcbiAgICAgICAgICBsZXQgc3Jjc2V0ID0gZW50cnkudGFyZ2V0LmdldEF0dHJpYnV0ZShzZWxmLnNldHRpbmdzLnNyY3NldClcbiAgICAgICAgICBpZiAoZW50cnkudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2ltZycgfHwgZW50cnkudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgICAgaWYgKHNyYykge1xuICAgICAgICAgICAgICBlbnRyeS50YXJnZXQuc3JjID0gc3JjXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3Jjc2V0KSB7XG4gICAgICAgICAgICAgIGVudHJ5LnRhcmdldC5zcmNzZXQgPSBzcmNzZXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW50cnkudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoJyArIHNyYyArICcpJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LCBvYnNlcnZlckNvbmZpZylcblxuICAgIHRoaXMuaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24gKGltYWdlKSB7XG4gICAgICBzZWxmLm9ic2VydmVyLm9ic2VydmUoaW1hZ2UpXG4gICAgfSlcbiAgfSxcblxuICBsb2FkQW5kRGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5zZXR0aW5ncykgeyByZXR1cm4gfVxuICAgIHRoaXMubG9hZEltYWdlcygpXG4gICAgdGhpcy5kZXN0cm95KClcbiAgfSxcblxuICBsb2FkSW1hZ2VzOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzKSB7IHJldHVybiB9XG5cbiAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICB0aGlzLmltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChpbWFnZSkge1xuICAgICAgbGV0IHNyYyA9IGltYWdlLmdldEF0dHJpYnV0ZShzZWxmLnNldHRpbmdzLnNyYylcbiAgICAgIGxldCBzcmNzZXQgPSBpbWFnZS5nZXRBdHRyaWJ1dGUoc2VsZi5zZXR0aW5ncy5zcmNzZXQpXG4gICAgICBpZiAoaW1hZ2UudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW1nJyB8fCBpbWFnZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd2aWRlbycpIHtcbiAgICAgICAgaWYgKHNyYykge1xuICAgICAgICAgIGltYWdlLnNyYyA9IHNyY1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcmNzZXQpIHtcbiAgICAgICAgICBpbWFnZS5zcmNzZXQgPSBzcmNzZXRcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW1hZ2Uuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCgnICsgc3JjICsgJyknXG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzKSB7IHJldHVybiB9XG4gICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICB0aGlzLnNldHRpbmdzID0gbnVsbFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExhenlMb2FkXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2xhenlsb2FkLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZFNjcmlwdCAoc3JjLCBjYWxsYmFjaykge1xuICB2YXIgcyxcbiAgICByLFxuICAgIHRcbiAgciA9IGZhbHNlXG4gIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxuICBzLnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0J1xuICBzLnNyYyA9IHNyY1xuICBzLm9ubG9hZCA9IHMub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghciAmJiAoIXRoaXMucmVhZHlTdGF0ZSB8fCB0aGlzLnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpKSB7XG4gICAgICByID0gdHJ1ZVxuICAgICAgY2FsbGJhY2soKVxuICAgIH1cbiAgfVxuICB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdXG4gIHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocywgdClcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvbG9hZFNjcmlwdC5qcyJdLCJzb3VyY2VSb290IjoiIn0=