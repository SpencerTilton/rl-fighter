import base from '../levels/base'

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
    return fetch(`/levels/${name}`)
    .then(r => {
        r.json();
    })
    .then(r => { console.log(r);});
    console.log("Level loaded");
}



