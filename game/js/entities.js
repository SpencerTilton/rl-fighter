import {loadPlayer} from './entities/Player.js';


export function loadEntities() {
    const entityFactories = {};

    function addAs(name) {
        return factory => entityFactories[name] = factory;
    }


    return Promise.all([
        loadPlayer().then(addAs('player')),
        // loadGoomba().then(addAs('goomba')),
        // loadKoopa().then(addAs('koopa')),
    ])
    .then(() => entityFactories);
}