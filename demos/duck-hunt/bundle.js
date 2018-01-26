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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = (class {

  constructor() {
    this._sprite = null;
  }

  get sprite() {
    return this._sprite;
  }

  toString() {
    return this.sprite.toString();
  }
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__printable__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__printable__["a" /* default */] {

  constructor(position) {
    super();

    this.position = position;

    this.state = 0;
    this.spritesheet = [];
  }

  get sprite() {
    return this.spritesheet[this.state];
  }

  move(orientation, units = 1) {
    this.orientation = orientation;
    this.position = this._getNewPosition(orientation, units);
  }

  _getNewPosition(orientation, units) {
    return this.position + (orientation * units);
  }

});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
  getRandomNumber: function(min, max) {
    return ((Math.random() * (max - min + 1)) + min) << 0
  }
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_map__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_mark__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_duck__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_js__ = __webpack_require__(2);







// start assets

var mapLength = 50;
var maxDucks = 5;

var turnCount = 0;
var map = new __WEBPACK_IMPORTED_MODULE_0__models_map__["a" /* default */](mapLength);
var ducks = [];
var mark = {};

start();


// game routine logic

function start() {

  // start the game objects
  for (let i=0; i<=maxDucks; i++) {
    let position = __WEBPACK_IMPORTED_MODULE_3__utils_js__["a" /* default */].getRandomNumber(0, mapLength-1);
    let orientation = __WEBPACK_IMPORTED_MODULE_3__utils_js__["a" /* default */].getRandomNumber(0, 1) ? 1 : -1;
    ducks.push(new __WEBPACK_IMPORTED_MODULE_2__models_duck__["a" /* default */](position, orientation));
  }
  mark = new __WEBPACK_IMPORTED_MODULE_1__models_mark__["a" /* default */](0);

  // start looking for events
  document.addEventListener('keydown', keyHandler);

  loop();
}

function loop(timeStamp) {
  turnCount++;

  // update game objects

  ducks.forEach(function(duck, index, origin) {
    var otherDucks = origin.slice(0);
    otherDucks.splice(index, 1);

    duck.update(turnCount, otherDucks, mapLength);
  });

  mark.update(ducks);

  print();

  requestAnimationFrame(loop);
}

function print() {

  // reset map
  map.reset();

  // add game objects
  ducks.forEach(duck => map.addGameObject(duck));
  map.addGameObject(mark);

  // update url
  location.hash = map;
}

function keyHandler(event) {
	if (event.key === 'ArrowRight' && mark.position < mapLength)
		mark.move(1)
	if (event.key === 'ArrowLeft' && mark.position > 0)
		mark.move(-1);
  if (event.key === ' ')
    mark.shoot(ducks);
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__printable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__floor__ = __webpack_require__(5);



/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__printable__["a" /* default */] {

  constructor(size) {
    super();

    this.size = size;
    this._default = Array.from(Array(this.size)).map(() => new __WEBPACK_IMPORTED_MODULE_1__floor__["a" /* default */]());

    this.reset();
  }

  get sprite() {
    return this.tiles.join('');
  }

  reset() {
    this.tiles = this._default.slice(0);
  }

  addGameObject(gameObject) {
    this.tiles[gameObject.position] = gameObject;
  }

});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__printable__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__printable__["a" /* default */] {

  constructor() {
    super();
    this._sprite = '  ';
  }

});


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gameObject__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__gameObject__["a" /* default */] {

  constructor(position) {
    super(position);

    this.turnsToCooldown = 20;
    this.cooldownCount = 0;

    this.spritesheet = ['(  )', '(2)', '(S)', '(x)'];
    this.state = 0;
  }

  update(ducks) {

    // won't do anything if still in cooldown
    if (this.state === 3 && this.turnsToCooldown > this.cooldownCount) {
      this.cooldownCount++;
      return;
    }

    this.target = ducks.find(duck => duck.position === this.position);
  }

  set target(target) {
    if (target)
      this.state = (target.orientation > 0) ? 2 : 1;
    else
      this.state = 0;
  }

  shoot(ducks, map) {

    // won't do anything if still in cooldown
    if (this.state === 3)
      return;

    // kill a duck, if it's in sight
    var targetIndex = ducks.findIndex(duck => duck.position === this.position);
    if (targetIndex >= 0)
      ducks.splice(targetIndex, 1);

    // start weapon cooldown
    this.state = 3;
    this.cooldownCount = 0;
  }

});


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gameObject__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(2);



/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__gameObject__["a" /* default */] {

  constructor(position, orientation) {
    super(position);

    this.turnsToMove = 30;

    this.spritesheet = ['2', 'S'];
    this.orientation = orientation;
  }

  set orientation(value) {
    this._orientation = value;
    this.state = (this.orientation > 0) ? 1 : 0;
  }

  get orientation() {
    return this._orientation;
  }

  update(turnCount, ducks, mapLength) {

    if (turnCount % this.turnsToMove === 0) {

      // define new position
      var orientation = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getRandomNumber(0, 1) ? 1 : -1;
      var moviment = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getRandomNumber(0, 1);
      var newPosition = this._getNewPosition(orientation, moviment);

      // if possible, move to new position
      if (newPosition > 0 && newPosition < mapLength) {
        var isPositionTaken = ducks.some(duck => duck.position === newPosition);
        if (!isPositionTaken)
          this.move(orientation, moviment);
      }
    }

  }

});


/***/ })
/******/ ]);