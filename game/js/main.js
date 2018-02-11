const canvas = document.getElementById('ctx');
const context = canvas.getContext('2d');
const resolution = 10;  // 10px per graphic unit
canvas.width = 110 * resolution;
canvas.height = 70 * resolution;

// used to scale values to appropriate resolution
function rScale(scalefactor){
    return scalefactor * resolution;
}

function loadBackgroundSprites() {
    return loadImage('game/img/tmpBkg.png')
    .then(image => {
        console.log('Image loaded', image);
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.defineTile('ground', 0, 0);
        sprites.defineTile('sky', 3, 23);
        return sprites;
    });
}

function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y){
                sprites.drawTile(background.tiles, context, x, y);
            }
        }
    })
}

function draw() {
    // reset game screen
    // context.fillStyle = '#4682b4';
    // context.fillRect(0, 0, canvas.width, canvas.height);
    Promise.all([
        loadBackgroundSprites(),
        baseLevel,
    ])
    .then(([sprites, level]) => {
        console.log('Level loaded', level);
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