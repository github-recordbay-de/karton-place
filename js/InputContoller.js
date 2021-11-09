function AddEvents(){
document.addEventListener('keypress', (e)=>{
    if(e.code=="KeyO"){
        //change to video material
        playJungleVid();
    }
    else if(e.code=="KeyU"){
        CloseBox();
    }
})
document.getElementById("vidElem").addEventListener("mousedown", (event)=>{
    //turn off valley and jungle
    Jungle_P.setEnabled(false)
    Valley_P.setEnabled(false)
    sideKarton.rotation.x = 90*(Math.PI/180);
    playJungleVid();
})

document.getElementById("inElem").addEventListener("mousedown", (event)=>{
    CloseBox();
    Jungle_P.setEnabled(true)
    Valley_P.setEnabled(false)
    openBoxAnim.restart()
})

document.getElementById("outElem").addEventListener("mousedown", (event)=>{
    CloseBox();
    Jungle_P.setEnabled(false)
    Valley_P.setEnabled(true)
    openBoxAnim.restart()
    window.setTimeout(function(){openValleyAnim.restart()}, 100)
    ;
})
}


//interaction functions
function playJungleVid(){
    alert("i should play:" +  vid.currentSrc)
    vid.play();
    // jungleVidAlpha.video.play();
}

function CloseBox(){
    vid.pause();
    vid.currentTime = 0
    // jungleVidAlpha.video.pause();
    // jungleVidAlpha.video.currentTime = 0
}

let openBoxAnim = gsap.timeline({paused: true})
let openValleyAnim = gsap.timeline({paused: true})
async function CreateAnimations(){
    await GetMeshesToAnimate();
    await BufferAnimations();
}
var sideKarton;
function GetMeshesToAnimate(){

    sideKarton = Karton_P.getChildTransformNodes(false).filter( node => node.name === 'SideToOpen')[0];
    sideKarton.rotationQuaternion = null
}

function BufferAnimations(){
    openBoxAnim.fromTo(sideKarton.rotation,{x: 90*(Math.PI/180)}, { x:210*(Math.PI/180), duration: 1, ease: Bounce.easeOut });
    openValleyAnim.fromTo(Valley_P.scaling,{z: 0}, { z:scaleFactor, duration: 1, ease: Bounce.easeOut });
}