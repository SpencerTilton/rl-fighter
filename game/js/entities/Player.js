import Entity from '../Entity.js';
import Go from '../traits/Go.js';
import Jump from '../traits/Jump.js';
import Killable from '../traits/Killable.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import Stomper from '../traits/Stomper.js';
import {loadSpriteSheet} from '../loaders.js';


export function loadPlayer() {
    return loadSpriteSheet('player')
    .then(createPlayerFactory);
}

function createPlayerFactory(sprite) {
    const runAnim = sprite.animations.get('run');

    function routeFrame(player) {
        if (player.jump.falling) {
            return 'jump';
        }

        if (player.go.distance > 0) {
            if ((player.vel.x > 0 && player.go.dir < 0) || (player.vel.x < 0 && player.go.dir > 0)) {
                return 'break';
            }

            return runAnim(player.go.distance);
        }

        return 'idle';
    }


    function drawPlayer(context) {
        sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
    }

    return function createPlayer() {
        const player = new Entity();
        player.size.set(14, 16);

        player.addTrait(new Physics());
        player.addTrait(new Solid());
        player.addTrait(new Go());
        player.addTrait(new Jump());
        player.addTrait(new Killable());

        player.killable.removeAfter = 0;

        player.draw = drawPlayer;

        return player;
    }
}