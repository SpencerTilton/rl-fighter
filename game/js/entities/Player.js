import Entity from '../Entity.js';
import Run from '../traits/Run.js';
import Jump from '../traits/Jump.js';
import Killable from '../traits/Killable.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import {loadSpriteSheet} from '../loaders.js';


export function loadPlayer() {
    return loadSpriteSheet('player')
    .then(createPlayerFactory);
}

function createPlayerFactory(sprite) {
    //const runAnim = sprite.animations.get('run');

    function routeFrame(player) {
        if (player.jump.falling) {
            //return 'jump';
        }

        // if (player.run.distance > 0) {
        //     if ((player.vel.x > 0 && player.run.dir < 0) || (player.vel.x < 0 && player.run.dir > 0)) {
        //         return 'break';
        //     }

        //     return runAnim(player.run.distance);
        // }

        return 'idle';
    }


    function drawPlayer(context) {
        sprite.draw(routeFrame(this), context, 0, 0, this.run.heading < 0);
    }

    return function createPlayer() {
        const player = new Entity();
        player.size.set(60, 160);

        player.addTrait(new Physics());
        player.addTrait(new Solid());
        player.addTrait(new Run());
        player.addTrait(new Jump());
        player.addTrait(new Killable());

        player.killable.removeAfter = 0;

        player.draw = drawPlayer;

        return player;
    }
}