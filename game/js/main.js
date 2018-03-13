import Compositor from './compositor.js';
import {loadLevel} from './loaders.js';
import {loadPlayerSprite, loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer} from './layers.js';


export const canvas = document.getElementById('ctx');
const context = canvas.getContext('2d');
const resolution = 10;  // 10px per graphic unit
canvas.width = 110 * resolution;
canvas.height = 70 * resolution;

// used to scale values to appropriate resolution
function rScale(scalefactor){
    return scalefactor * resolution;
}

function createSpriteLayer(sprite, pos) {
    return function drawSpriteLayer(context) {
        sprite.draw('idle', context, pos.x, pos.y);
    };
}


Promise.all([
    loadPlayerSprite(),
    loadBackgroundSprites(),
    loadLevel('base'),
])
.then(([playerSprite, backgroundSprites, level]) => {
    console.log('Level loader', level);

    const comp = new Compositor();
    comp.layers.push(createBackgroundLayer(level.backgrounds, backgroundSprites));

    const pos = {
        x: 64,
        y: 64,
    };

    comp.layers.push(createSpriteLayer(playerSprite, pos));

    function update() {
        comp.draw(context);
        requestAnimationFrame(update);
    }

    update();
});

// let lastTime = 0;
// function update(time = 0) {
//     const deltaTime = time - lastTime;
//     lastTime = time;

//     requestAnimationFrame(update);
// }

// // update();
