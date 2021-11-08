showDebug = true;

$(document).keyup(function (e) {
    //"m" pressed
    if (e.keyCode === 77) { handleDebugLayer(); }
});

function handleDebugLayer() {
    console.log("d pressed")
    if (scene.debugLayer.isVisible()) {
        scene.debugLayer.hide()
      } else {
        scene.debugLayer.show()
      }
}

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

//loading screen
BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {
    if (document.getElementById("customLoadingScreenDiv")) {
        document.getElementById("customLoadingScreenDiv").style.display = "initial";
        // Do not add a loading screen if there is already one
        return;
    }
};

BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = function(){
    document.getElementById("customLoadingScreenDiv").style.display = "none";
    console.log("scene is now loaded");
}