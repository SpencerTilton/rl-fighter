export default class Levels {

    constructor() {
        this.levels = new Array();
    }

    addLevel(level){
        this.level.push(level);
    }

    loadLevel(name){
        return new Promise(resolve => {
            const f = this.level.find(name);
            f.addEventListener('load', () => {
                resolve(f);
            })
        });
    }

}