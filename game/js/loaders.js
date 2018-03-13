//import base from '../levels/base.js'

export function loadImage(url){
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        })
        image.src = url;
    });
}

export function loadLevel(name) {
    return fetch(`../levels/${name}.json`)
    .then(r => {
        return r.json();
    })
    .then(r => { 
        console.log(r);
        console.log("Level loaded");
        return r;
    });
}



