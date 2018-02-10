const canvas = document.getElementById('ctx');
const context = canvas.getContext('2d');
const resolution = 10;  // 20px per graphic unit
canvas.width = 110 * resolution;
canvas.height = 70 * resolution;


// used in place of key value when reading inputs
// keybinds = {
//     MOVELEFT,
//     MOVERIGHT,
//     JUMP,
//     BLOCK,
//     DASHLEFT,
//     DASHRIGHT,
//     BASICATTACK1,
//     BASICATTACK2,
//     BASICATTACK3,
//     BASICATTACK4,
//     ABILITY1,
//     ABILITY2,
//     ABILITY3,
//     ABILITY4,
//     ITEM1,
//     ITEM2,
//     ITEM3,
//     ITEM4
// }

function loadImage(url){
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        })
        image.src = url;
    });
}

// used to scale values to appropriate resolution
function rScale(scalefactor){
    return scalefactor * resolution;
}


/* -------- MAIN FUNCTION --------- */
function main(){
    //console.log(document.onkeydown());
    context.fillstyle = '#000';
    context.fillRect(0,0, canvas.width, canvas.height);
}
main();