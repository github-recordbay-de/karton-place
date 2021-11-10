var hdrTexture, Screen
var moveScene_P

let All_AR, Karton_P, Valley_P, Jungle_P;

var scaleFactor = 0.05;
function LoadAssets(scene, assetsManager) {
    //CanyonEnvTask
    CanyonEnvTask = assetsManager.addCubeTextureTask("CanyonEnvTask", "./assets/environment.dds");

    CanyonEnvTask.onSuccess = function (task) {
        hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData(task.texture.name, scene);
        //hdrTexture = task.texture
        hdrTexture.rotationY = 180 * (Math.PI / 180);
        hdrTexture.level = 1

        hdrSkyboxMaterial = new BABYLON.PBRMaterial("hdrSkyBox", scene);
        hdrSkyboxMaterial.backFaceCulling = false;
        hdrSkyboxMaterial.reflectionTexture = hdrTexture.clone();
        hdrSkyboxMaterial.reflectionTexture.level = 0.1
        hdrSkyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        hdrSkyboxMaterial.microSurface = 1.0;
        hdrSkyboxMaterial.disableLighting = false;
        // Create Skybox
        hdrSkybox = BABYLON.Mesh.CreateBox("hdrSkyBox", 1000.0, scene);
        hdrSkybox.visibility = 0
        hdrSkybox.material = hdrSkyboxMaterial;
        hdrSkybox.infiniteDistance = false;

    }
    CanyonEnvTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }

    Karton_P = new BABYLON.TransformNode("Karton_P");
    KartonLoaderTask = assetsManager.addMeshTask("", "", "./assets/" + "karton" + ".glb")
    KartonLoaderTask.onSuccess = function (task) {
        task.loadedMeshes[0].parent = Karton_P
        Karton_P.scaling = new BABYLON.Vector3(scaleFactor, scaleFactor,scaleFactor)
        // Karton_P.position.x = 1
        // sideKarton = task.loadedMeshes[0]._children[0]._children[2]
    }
    KartonLoaderTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }

    Valley_P = new BABYLON.TransformNode("Valley_P");
    ValleyLoaderTask = assetsManager.addMeshTask("", "", "./assets/" + "bergen" + ".glb")
    ValleyLoaderTask.onSuccess = function (task) {
        task.loadedMeshes[0].parent = Valley_P
        Valley_P.scaling = new BABYLON.Vector3(scaleFactor, scaleFactor,scaleFactor)
    }
    ValleyLoaderTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }

    Jungle_P = new BABYLON.TransformNode("Jungle_P");
    JungleLoaderTask = assetsManager.addMeshTask("", "", "./assets/" + "forest" + ".glb")
    JungleLoaderTask.onSuccess = function (task) {
        task.loadedMeshes[0].parent = Jungle_P
        Jungle_P.position.y = 0.02;
        Jungle_P.scaling = new BABYLON.Vector3(scaleFactor, scaleFactor, scaleFactor)
    }
    JungleLoaderTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }

    // AudioLoaderTask = assetsManager.addBinaryFileTask("", "", "./assets/katjes_audio.wav")
    // AudioLoaderTask.onSuccess = function (task) {
    //     music = new BABYLON.Sound("music", task.data, scene, { loop: true, autoplay: true});
    //     alert("audio loaded")
    // }
    // AudioLoaderTask.onError = function (task, message, exception) {
    //     console.log(message, exception);
    // }

    assetsManager.onFinish = function (task) {
        //ChangeMaterialProperties();
        moveScene_P = new BABYLON.TransformNode("moveScene_P", scene)
        //create screen
        // Screen = new BABYLON.MeshBuilder.CreateBox("Screen", { width: 6*scaleFactor, height: 2.5*scaleFactor, depth: 4*scaleFactor }, scene)
        // Screen.position.y =  (2.5*scaleFactor)/2;
        // const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2*scaleFactor }, scene);
        // sphere.position.z = 1


        // Screen.parent = moveScene_P;
        // sphere.parent = moveScene_P
        Karton_P.parent = moveScene_P;
        Jungle_P.parent = moveScene_P;
        Valley_P.parent = moveScene_P;

        Karton_P.setEnabled(false)
        Jungle_P.setEnabled(false)
        Valley_P.setEnabled(false)

        CreateAnimations()
        VideoSetup();
    }
    //Asset Manager check
    assetsManager.onProgress = function (remainingCount, totalCount, lastFinishedTask) {
        engine.loadingUIText = 'We are loading the scene. ' + remainingCount + ' out of ' + totalCount + ' items still need to be loaded.';
        document.getElementsByClassName("text-progress")[0].innerHTML = 100 - remainingCount / totalCount * 100 + "%"
    };

    assetsManager.load();
}



