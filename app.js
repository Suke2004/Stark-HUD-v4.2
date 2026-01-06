// ================== JARVIS CONFIG ==================
const COLORS = {
    CYAN: "#00f0ff",
    RED: "#ff0033",
    GOLD: "#ffd700",
    WHITE: "#ffffff"
};

const MESSAGES = {
    BOOT: "IMPORTING PREFERENCES...",
    READY: "J.A.R.V.I.S. ONLINE",
    SCAN: "SCANNING BIOMETRICS...",
    GRAB: "REPULSOR LOCK: ENGAGED",
    BUILD_WAIT: "FABRICATION: SYNCING...",
    BUILD_ACT: "FABRICATION: ACTIVE",
    ERASE_WAIT: "TARGETING SYSTEMS...",
    ERASE_ACT: "DESTRUCT MODE: ENGAGED",
    RESET_WAIT: "PROTOCOL: CLEAN SLATE?",
    RESET_DONE: "WORKSPACE CLEARED",
    ROT_WAIT: "GYROSCOPIC SYNC...",
    ROT_ACT: "MANIPULATION MODE"
};

// ================== DOM ==================
const videoElement = document.getElementById("input_video");
const bioCanvas = document.getElementById("biometric_canvas");
const threeCanvas = document.getElementById("three_canvas");
const bioCtx = bioCanvas.getContext("2d");
const modeEl = document.getElementById("mode");
const countEl = document.getElementById("count");

// ================== THREE.JS ==================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: threeCanvas,
    antialias: true,
    alpha: true
});

const voxelGroup = new THREE.Group();
scene.add(voxelGroup);

const currentSketch = new THREE.Group();
voxelGroup.add(currentSketch);

const gridSize = 1.2;
const placedVoxels = new Map();

// Crosshair
const crosshair = new THREE.Mesh(
    new THREE.BoxGeometry(gridSize, gridSize, gridSize),
    new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    })
);
scene.add(crosshair);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const sun = new THREE.PointLight(0x00f0ff, 1.5, 100);
sun.position.set(10, 10, 10);
scene.add(sun);

const CAM_DIST = 20;
camera.position.z = CAM_DIST;

// ================== STATE ==================
let visibleWidth = 10;
let visibleHeight = 10;
let smoothedLandmarks = { Left: [], Right: [] };

let isGrabbing = false;
let grabTimer = 0;
let isBuilding = false;
let buildTimer = 0;
let isErasing = false;
let eraseTimer = 0;
let resetTimer = 0;
let rotateTimer = 0;

const HOLD_THRESH = 500;
const RESET_THRESH = 1200;
const pinchThreshold = 0.05;

// ================== RESIZE ==================
function onWindowResize() {
    const vidW = videoElement.videoWidth || 1280;
    const vidH = videoElement.videoHeight || 720;
    const aspect = vidW / vidH;

    const w = window.innerWidth;
    const h = window.innerHeight;

    let renderW, renderH;
    if (w / h > aspect) {
        renderH = h;
        renderW = h * aspect;
    } else {
        renderW = w;
        renderH = w / aspect;
    }

    [videoElement, bioCanvas, threeCanvas].forEach(el => {
        el.style.width = `${renderW}px`;
        el.style.height = `${renderH}px`;
    });

    bioCanvas.width = vidW;
    bioCanvas.height = vidH;

    renderer.setSize(renderW, renderH, false);
    camera.aspect = aspect;
    camera.updateProjectionMatrix();

    const vFOV = THREE.MathUtils.degToRad(camera.fov);
    visibleHeight = 2 * Math.tan(vFOV / 2) * CAM_DIST;
    visibleWidth = visibleHeight * camera.aspect;
}

window.addEventListener("resize", onWindowResize);
videoElement.addEventListener("loadedmetadata", onWindowResize);

// ================== HELPERS ==================
function getDist(p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

// ================== MEDIAPIPE ==================
const hands = new Hands({
    locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`
});

hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.8,
    minTrackingConfidence: 0.8
});

hands.onResults(onResults);

const cam = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({ image: videoElement });
    },
    width: 1280,
    height: 720
});

cam.start();

// ================== MAIN LOOP ==================
function onResults(results) {
    bioCtx.clearRect(0, 0, bioCanvas.width, bioCanvas.height);
    crosshair.visible = false;

    if (!results.multiHandLandmarks) {
        modeEl.innerText = MESSAGES.READY;
        return;
    }

}

// ================== RENDER LOOP ==================
function animate() {
    requestAnimationFrame(animate);

    if (placedVoxels.size > 0 && !isGrabbing && !isBuilding) {
        voxelGroup.position.y += Math.sin(Date.now() * 0.001) * 0.005;
    }

    renderer.render(scene, camera);
}

animate();
