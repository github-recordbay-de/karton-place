async function VideoSetup(){
    await ChangeMaterialProperties();
    await AddEvents();
}
async function AddEvents(){
    //alert("AddEvents");
    document.getElementById("vidElem").addEventListener("mousedown", (event)=>{
        //turn off valley and jungle
        Jungle_P.setEnabled(false)
        Valley_P.setEnabled(false)
        sideKarton.rotation.x = 90*(Math.PI/180);
    })

    document.getElementById("inElem").addEventListener("mousedown", (event)=>{
        CloseBox();
        Jungle_P.setEnabled(true)
        Valley_P.setEnabled(false)
        openBoxAnim.restart();
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
    CloseBox()
}

function CloseBox(){
    vidMat.alpha = 0;

    document.getElementById("alpha-vid").pause();
    document.getElementById("alpha-vid").currentTime = 0
  
    document.getElementById("tracking-vid").pause();
    document.getElementById("tracking-vid").currentTime = 0
    document.getElementById("tracking-vid").volume = 0;
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