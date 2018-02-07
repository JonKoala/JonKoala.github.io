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

  static get spritesheet() {
    return [];
  }

  static get states() {
    return [];
  }

  constructor(position, orientation, state) {
    super();

    this.spriteIndex = 0;

    this.position = position;
    this.orientation = orientation;
    this.changeState(state);
  }


  // routine

  update() {
    this.behaviour();
  }


  // engine

  get sprite() {
    return this.constructor.spritesheet[this.spriteIndex];
  }

  move(orientation, units = 1) {
    this.orientation = orientation;
    this.position = this.predictPosition(orientation, units);
  }


  // state management

  changeState(state) {
    this.state = state;

    this.behaviour = this.nullBehaviour;
  }

  nullBehaviour() { }


  // utils

  predictPosition(orientation, units = 1) {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__inputHandler__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__duckHandler__ = __webpack_require__(8);







// start assets

var mapLength = 50;
var numDucks = 5;
var ducksMaxRespawnTurns = 100;

var map = {};
var mark = {};

var turnCount = 0;

start();


// game routine logic

function start() {

  // start the game objects
  map = new __WEBPACK_IMPORTED_MODULE_0__models_map__["a" /* default */](mapLength);
  mark = new __WEBPACK_IMPORTED_MODULE_1__models_mark__["a" /* default */](0);
  __WEBPACK_IMPORTED_MODULE_3__duckHandler__["a" /* default */].start(numDucks, mapLength, ducksMaxRespawnTurns);

  // handle user inputs
  __WEBPACK_IMPORTED_MODULE_2__inputHandler__["a" /* default */].addEventListener('move', onUserMove);
  __WEBPACK_IMPORTED_MODULE_2__inputHandler__["a" /* default */].addEventListener('shoot', onUserShoot);

  loop();
}

function loop(timeStamp) {
  turnCount++;

  // update game objects
  __WEBPACK_IMPORTED_MODULE_3__duckHandler__["a" /* default */].updateDucks(turnCount);
  mark.target = __WEBPACK_IMPORTED_MODULE_3__duckHandler__["a" /* default */].locateDuck(mark.position);
  mark.update();

  print();

  requestAnimationFrame(loop);
}

function print() {

  // reset map
  map.reset();

  // add game objects
  __WEBPACK_IMPORTED_MODULE_3__duckHandler__["a" /* default */].ducks.forEach(duck => map.addGameObject(duck));
  map.addGameObject(mark);

  // update url
  location.hash = map;
}


// handle input events

function onUserMove(e) {
  var nextPosition = mark.predictPosition(e.direction);
  if (nextPosition >= 0 && nextPosition <= mapLength)
    mark.move(e.direction);
}

function onUserShoot() {

  // won't do anything if still in cooldown
  if (mark.state === 'cooldown')
    return;

  mark.shoot();

  // kill a duck, if it's in sight
  if (mark.target)
    __WEBPACK_IMPORTED_MODULE_3__duckHandler__["a" /* default */].killDuck(mark.target);
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

  static get spritesheet() {
    return ['(  )', '(2)', '(S)', '(x)'];
  }

  static get states() {
    return ['normal', 'cooldown'];
  }

  constructor(position) {
    super(position, 0, 'normal');

    this.cooldownTurns = 20;
  }


  // state management

  changeState(state) {
    this.state = state;

    switch(state) {
      case 'normal':
        this.behaviour = this.normalBehaviour;
        break;
      case 'cooldown':
        this.cooldownTurnsCount = 0;
        this.behaviour = this.cooldownBehaviour;
        break;
    }
  }

  normalBehaviour() {
    if (this.target)
      this.spriteIndex = (this.target.orientation > 0) ? 2 : 1;
    else
      this.spriteIndex = 0;
  }

  cooldownBehaviour() {
    this.spriteIndex = 3;

    this.cooldownTurnsCount++;
    if (this.cooldownTurns <= this.cooldownTurnsCount)
      this.changeState('normal');
  }


  // events

  shoot() {
    this.changeState('cooldown');
  }

});


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

var handler = {

  get availableEvents() {
    return ['move', 'shoot'];
  },

  _start() {
    this.events = {};
    this.availableEvents.forEach(eventName => {
      this.events[eventName] = [];
    });

    document.addEventListener('keydown', handler.onKeydown.bind(handler));
  },

  _dispatchEvent(eventName, obj) {
    this.events[eventName].forEach(callback => {
      setTimeout(callback.bind(this, obj), 0);
    });
  },

  addEventListener(eventName, callback) {
    if (eventName in this.events)
      this.events[eventName].push(callback);
  },

  onKeydown(e) {
    if (event.key === 'ArrowRight')
      this._dispatchEvent('move', {direction: 1});
    if (event.key === 'ArrowLeft')
      this._dispatchEvent('move', {direction: -1});
    if (event.key === ' ')
      this._dispatchEvent('shoot');
  }
}

handler._start();

/* harmony default export */ __webpack_exports__["a"] = (handler);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_duck__ = __webpack_require__(9);



/* harmony default export */ __webpack_exports__["a"] = ({

  start(numDucks, mapLength, duckRespawnTurns) {

    this.mapLength = mapLength;
    this.numDucks = numDucks;
    this.maxRespawnTurns = duckRespawnTurns;

    // start ducks
    this.ducks = [];
    for (let i=0; i<this.numDucks; i++)
      this.addDuck();
  },

  addDuck() {
    var newDuck = new __WEBPACK_IMPORTED_MODULE_1__models_duck__["a" /* default */](this.getUnocupiedMapPosition(), this.getRandomOrientation(), this.getRandomState());
    this.ducks.push(newDuck);
  },

  killDuck(duck) {
    var index = this.ducks.indexOf(duck);
    this.ducks.splice(index, 1);
  },

  updateDucks(turnCount) {

    // ducks collision and pseudo AI logic
    this.ducks.forEach(duck => {
      if (duck.state === 'walking') {

        // define duck's next moviment
        let nextOrientation = this.getRandomOrientation();
        let nextMoviment = this.getRandomMoviment();
        let nextPosition = duck.predictPosition(nextOrientation, nextMoviment);

        // change moviment, if it's going to collide with another duck
        if (nextPosition < 0 || nextPosition > this.mapLength || this.checkCollision(nextPosition))
          nextMoviment = 0;

        duck.move(nextOrientation, nextMoviment);
      }
      duck.update();
    });

    // respawn logic
    if (this.ducks.length < this.numDucks && !(turnCount % this.maxRespawnTurns))
      this.addDuck();
  },


  // utils

  locateDuck(position) {
    return this.ducks.find(duck => duck.position === position);
  },

  checkCollision(position) {
    return Boolean(this.locateDuck(position));
  },

  getUnocupiedMapPosition() {
    if (this.mapLength <= this.numDucks)
      throw 'Too many ducks!';

    var randPosition;
    do {
       randPosition = this.getRandomMapPosition();
     } while(this.checkCollision(randPosition));

     return randPosition;
  },


  // rng

  getRandomMapPosition() {
    return __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getRandomNumber(0, this.mapLength-1);
  },

  getRandomOrientation() {
    return __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getRandomNumber(0, 1) ? 1 : -1;
  },

  getRandomMoviment() {
    return __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getRandomNumber(0, 1);
  },

  getRandomState() {
    var randIndex = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getRandomNumber(0, __WEBPACK_IMPORTED_MODULE_1__models_duck__["a" /* default */].states.length-1);
    return __WEBPACK_IMPORTED_MODULE_1__models_duck__["a" /* default */].states[randIndex];
  }

});


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gameObject__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(2);



/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__gameObject__["a" /* default */] {


  static get spritesheet() {
    return ['2', 'S'];
  }

  static get states() {
    return ['idle', 'walking'];
  }

  constructor(position, orientation, state) {
    super(position, orientation, state);

    this.idleTurns = 30;
  }


  // routine

  update() {
    super.update();
    this.spriteIndex = (this.orientation > 0) ? 1 : 0;
  }


  // state management

  changeState(state) {
    super.changeState(state);

    switch(state) {
      case 'idle':
        this.idleTurnsCount = 0;
        this.behaviour = this.idleBehaviour;
        break;
      case 'walking':
        this.behaviour = this.walkBehaviour;
        break;
    }
  }

  idleBehaviour() {
    this.idleTurnsCount++;
    if (this.idleTurns <= this.idleTurnsCount)
      this.changeState('walking');
  }

  walkBehaviour() {
    this.changeState('idle');
  }

});


/***/ })
/******/ ]);