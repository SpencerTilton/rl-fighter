// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({4:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class SpriteSheet {
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
    }

    define(name, x, y, width, height) {
        const buffer = document.createElement('canvas');
        buffer.width = this.width;
        buffer.height = this.height;
        buffer.getContext('2d').drawImage(this.image, x, y, width, height, 0, 0, width, height);
        this.tiles.set(name, buffer);
    }

    defineTile(name, x, y) {
        this.define(name, x * this.width, y * this.height, this.width, this.height);
    }

    draw(name, context, x, y) {
        const buffer = this.tiles.get(name);
        context.drawImage(buffer, x, y);
    }

    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }
}
exports.default = SpriteSheet;
},{}],7:[function(require,module,exports) {
module.exports = {
    "backgrounds": [
        {
            "tile": "sky",
            "ranges": [
                [
                    0, 25,
                    0, 14
                ]
            ]
        },
        {
            "tile": "ground",
            "ranges": [
                [
                    0, 25,
                    12, 14
                ]
            ]
        }
    ]
};
},{}],5:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadImage = loadImage;
exports.loadLevel = loadLevel;

var _base = require('../levels/base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

function loadLevel(name) {
    return fetch(`/levels/${name}`).then(r => {
        r.json();
    }).then(r => {
        console.log(r);
    });
    console.log("Level loaded");
}
},{"../levels/base":7}],2:[function(require,module,exports) {
'use strict';

var _spritesheet = require('./spritesheet');

var _loaders = require('./loaders');

const canvas = document.getElementById('ctx');
const context = canvas.getContext('2d');
const resolution = 10; // 10px per graphic unit
canvas.width = 110 * resolution;
canvas.height = 70 * resolution;

// used to scale values to appropriate resolution
function rScale(scalefactor) {
    return scalefactor * resolution;
}

function loadBackgroundSprites() {
    return (0, _loaders.loadImage)('game/img/tmpBkg.png').then(image => {
        console.log('Image loaded', image);
        const sprites = new _spritesheet.SpriteSheet(image, 16, 16);
        sprites.defineTile('ground', 0, 0);
        sprites.defineTile('sky', 3, 23);
        return sprites;
    });
}

function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                sprites.drawTile(background.tiles, context, x, y);
            }
        }
    });
}

// const levels = new Levels();
// function init() {

//     levels.addLevel(fetch(`/levels/${name}`)
//         .then(r => {
//             r.json();
//         })
//     );
// }

function draw() {
    // reset game screen
    // context.fillStyle = '#4682b4';
    // context.fillRect(0, 0, canvas.width, canvas.height);
    Promise.all([loadBackgroundSprites(), (0, _loaders.loadLevel)('base')]).then(([sprites, level]) => {
        level.backgrounds.forEach(background => {
            drawBackground(background, context, sprites);
        });
    });
}

let lastTime = 0;
function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    draw();
    requestAnimationFrame(update);
}

// update();
draw();
},{"./spritesheet":4,"./loaders":5}],9:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var ws = new WebSocket('ws://' + hostname + ':' + '38431' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[9,2])
//# sourceMappingURL=/dist/9549da0a8d43ed0e8277de32fc887010.map