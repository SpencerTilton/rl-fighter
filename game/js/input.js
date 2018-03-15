import Keyboard from './KeyboardState.js';

export function setupKeyboard(player) {
    const input = new Keyboard();

    input.addMapping('KeyW', keyState => {
        if (keyState) {
            player.jump.start();
        } else {
            player.jump.cancel();
        }
    });

    input.addMapping('KeyD', keyState => {
        player.run.dir += keyState ? 1 : -1;
    });

    input.addMapping('KeyA', keyState => {
        player.run.dir += keyState ? -1 : 1;
    });

    return input;
}