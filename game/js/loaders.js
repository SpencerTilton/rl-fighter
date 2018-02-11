function loadImage(url){
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        })
        image.src = url;
    });
}

// may need something like this in the future
// function loadLevel(name) {
//     return fetch(`/levels/${name}.json`)
//     .then(r => r.json());
// }