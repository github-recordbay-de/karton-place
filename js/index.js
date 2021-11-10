const modelRootURL = './'                                 // Directory where 3D model lives
const modelFile = 'tree.glb'                              // 3D model to spawn at tap
const startScale = new BABYLON.Vector3(0.01, 0.01, 0.01)  // Initial scale value for our model
const endScale = new BABYLON.Vector3(0.05, 0.05, 0.05)    // Ending scale value for our model
const animationMillis = 750                               // Animate over 0.75 seconds


let surface, engine, scene, camera, assetsManager
var music;

// Populates some object into an XR scene and sets the initial camera position.
const initXrScene = ({ scene, camera }) => {
  console.log('initXrScene')

  const ground = BABYLON.Mesh.CreatePlane('ground', 100, scene)
  ground.rotation.x = Math.PI / 2
  ground.material = new BABYLON.StandardMaterial("groundMaterial", scene)
  ground.material.alpha = 0
  surface = ground

  // music = new BABYLON.Sound("Music", "./assets/katjes_audio.mp3", scene, null, {
  //   loop: false,
  //   autoplay: false
  // });


  assetsManager = new BABYLON.AssetsManager(scene)
  LoadAssets(scene, assetsManager)

  camera.position = new BABYLON.Vector3(0, 3, -5)
}

const touchListener = (e) => {
  //var middleLabel = document.getElementById("middleLabel");

  //alert("touched")
  // console.log('touchListener')
  // Call XrController.recenter() when the canvas is tapped with two fingers. This resets the
  // AR camera to the position specified by XrController.updateCameraProjectionMatrix() above.

  // If the canvas is tapped with one finger and hits the "surface", spawn an object.
  if (e.touches.length == 1) {
    //middleLabel.innerHTML = "single touched";
    //alert("single touch")
  }

  // If the canvas is tapped with one finger and hits the "surface", spawn an object.
  if (e.touches.length == 2) {
    XR8.XrController.recenter()
    //middleLabel.innerHTML = "double touched";
    //alert("double touch")
  }

  if (e.touches.length > 2) {
    return
  }

  const pickResult = scene.pick(e.touches[0].clientX, e.touches[0].clientY)
  if (pickResult.hit && pickResult.pickedMesh == surface) {
    //startExp();
    Karton_P.setEnabled(true)
    moveScene_P.position.x = pickResult.pickedPoint.x
    moveScene_P.position.y = pickResult.pickedPoint.y
    moveScene_P.position.z = pickResult.pickedPoint.z

    // moveScene_P.rotationQuaternion = new BABYLON.Quaternion();
    // moveScene_P.rotationQuaternion.x = e.rotation.x ;
    // moveScene_P.rotationQuaternion.y = e.rotation.y;
    // moveScene_P.rotationQuaternion.z = e.rotation.z ;
    // moveScene_P.rotate(BABYLON.Axis.Y, -180*(Math.PI/180), BABYLON.Space.LOCAL)
    rot = new BABYLON.Vector3(camera.position.x, 0, camera.position.z)
    moveScene_P.lookAt(rot)
  }


}


const startScene = () => {
  const canvas = document.getElementById('renderCanvas')

  engine = new BABYLON.Engine(canvas, true, { stencil: true, preserveDrawingBuffer: true }, false)
  engine.enableOfflineSupport = false

  scene = new BABYLON.Scene(engine)
  camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, 0), scene)

  initXrScene({ scene, camera }) // Add objects to the scene and set starting camera position.

  // Connect the camera to the XR engine and show camera feed
  camera.addBehavior(XR8.Babylonjs.xrCameraBehavior(), true)

  canvas.addEventListener('touchstart', touchListener, true)  // Add touch listener.

  engine.runRenderLoop(() => {
    scene.render()
  })

  window.addEventListener('resize', () => {
    engine.resize()
  })
}

const onxrloaded = () => {
  XR8.addCameraPipelineModules([  // Add camera pipeline modules.
    XRExtras.AlmostThere.pipelineModule(),       // Detects unsupported browsers and gives hints.
    XRExtras.FullWindowCanvas.pipelineModule(),  // Modifies the canvas to fill the window.
    XRExtras.Loading.pipelineModule(),           // Manages the loading screen on startup.
    XRExtras.RuntimeError.pipelineModule(),      // Shows an error image on runtime error.
  ])

  loadVideo();
}

var vid;
var videoLoaded = false;

function loadVideo() {
  //alert("Loading video.");
  vid = document.getElementById("tracking-vid");
  vid.load();

  vid.addEventListener("canplaythrough", function () {
    if (!videoLoaded) {
      //alert('Video Loaded');
      videoLoaded = true;
      fakePlayVid();
      startScene();
      // vid.pause();
      // vid.currentTime = 0

    }
  });
  vid.addEventListener('ended', (event) => {
  });

  vid.addEventListener('playing', (event) => {
    document.getElementById("tracking-vid").loop = false;
    document.getElementById("alpha-vid").loop = false
  });
}

function fakePlayVid() {
  document.getElementById("tracking-vid").play();
  document.getElementById("tracking-vid").pause();
  document.getElementById("tracking-vid").volume = 0;
}

var firstPlay = false;
function TruePlayVid() {
  vidMat.alpha = 1;

  document.getElementById("alpha-vid").pause();
  document.getElementById("alpha-vid").currentTime = 0
  document.getElementById("alpha-vid").play();

  document.getElementById("tracking-vid").pause();
  document.getElementById("tracking-vid").currentTime = 0
  document.getElementById("tracking-vid").volume = 1;
  document.getElementById("tracking-vid").play();


  if (!firstPlay) {
    vidMat.albedoTexture = new BABYLON.VideoTexture("video", document.getElementById('tracking-vid'), scene, false, {
      autoplay: false,
      loop: false, muted: true
    });

    vidMat.opacityTexture = new BABYLON.VideoTexture("video", document.getElementById('alpha-vid'), scene, false, {
      autoplay: false,
      loop: false, muted: true
    });
    vidMat.opacityTexture.getAlphaFromRGB =true

    firtsPlay = true
  }
}
// Show loading screen before the full XR library has been loaded.
const load = () => { XRExtras.Loading.showLoading({ onxrloaded }) }
window.onload = () => { window.XRExtras ? load() : window.addEventListener('xrextrasloaded', load) }

