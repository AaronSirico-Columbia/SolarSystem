import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';
import background from '../img/background.jpg'; // Credit: <a href="https://www.freepik.com/free-photo/abstract-flowing-neon-wave-background_15474089.htm#query=background&position=26&from_view=keyword">Image by rawpixel.com</a> on Freepik
import stars from '../img/stars.jpg'; //https://www.pxfuel.com/en/free-photo-obmtg/download

import oneDice from '../img/one.jpg';
import twoDice from '../img/two.jpg';
import threeDice from '../img/three.jpg';
import fourDice from '../img/four.jpg';
import fiveDice from '../img/five.jpg';
import sixDice from '../img/six.jpg';
import mercuryFile from '../img/mercury.jpg';
import earthFile from '../img/earth.jpg';
import moonFile from '../img/moon.jpg';
import jupiterFile from '../img/jupiter.jpg';
import marsFile from '../img/mars.jpg';
import neptuneFile from '../img/neptune.jpg';
import saturnFile from '../img/saturn.jpg';
import saturnRingFile from '../img/saturnring.png';
import sunFile from '../img/sun.jpg';
import venusFile from '../img/venus.jpg';
import uranusFile from '../img/uranus.jpg';

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
const GLStar = new URL('../assets/star.gltf', import.meta.url)

const assetLoader = new GLTFLoader();
assetLoader.load(
    GLStar.href,
    function(gltf){
        const model = gltf.scene;
        scene.add(model);
        model.position.set(0,25,0);
      
        model.rotateX(90);
        
    },
    undefined,
    function(error){
        console.error(error);
    });

 

var height = window.innerHeight;
var width = window.innerWidth;

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);



const scene = new THREE.Scene();
renderer.setClearColor(0x334455);
const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(stars);

const box2Material = [
    new THREE.MeshBasicMaterial({map: textureLoader.load(oneDice)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(twoDice)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(threeDice)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(fourDice)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(fiveDice)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(sixDice)})
];

//const cubeLoader = new THREE.CubeTextureLoader();
//scene.background = cubeLoader.load([stars,stars,stars,stars,stars,stars]);

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-300, 30, 30);
orbit.update();


const planeGeo = new THREE.PlaneGeometry(30, 30)
const planeMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeo, planeMat);
scene.add(plane);
plane.rotation.x = -.5 * Math.PI;
plane.receiveShadow = true;


//Ambient
const ambientLight = new THREE.AmbientLight(0x333333);

//PointLight
const pointLight = new THREE.PointLight(0x333333);
pointLight.castShadow = true;
pointLight.power= 500;
pointLight.decay = 0;
scene.add(pointLight);
pointLight.position.set(0,0,0);

//SunSphere
const sunTexture = textureLoader.load(sunFile);
const sunMaterial = new THREE.MeshBasicMaterial({map: sunTexture});
const SunSphereGeo = new THREE.SphereGeometry(10, 40, 40);
const SunSphereMat = new THREE.MeshStandardMaterial({ color: 0x147971, wireframe: false });
const SunSphere = new THREE.Mesh(SunSphereGeo, sunMaterial);
scene.add(SunSphere);
SunSphere.position.set(0, 10, 0);
SunSphere.castShadow = true;

//Mercury
const texture = textureLoader.load(mercuryFile);
const mercuryMaterial = new THREE.MeshStandardMaterial({map: texture});
const MercurySphereGeo = new THREE.SphereGeometry(1, 40, 40);
const MercurySphere = new THREE.Mesh(MercurySphereGeo, mercuryMaterial);


const mercuryObj = new THREE.Object3D();
mercuryObj.add(MercurySphere);
scene.add(mercuryObj);
MercurySphere.position.set(SunSphere.position.x + 15, SunSphere.position.y, SunSphere.position.z);
//Venus
const venusTexture = textureLoader.load(venusFile);
const venusMaterial = new THREE.MeshStandardMaterial({map: venusTexture});

const VenusSphereGeo = new THREE.SphereGeometry(2, 40, 40);
const VenusSphereMat = new THREE.MeshStandardMaterial({ color: 0x147971, wireframe: false });
const VenusSphere = new THREE.Mesh(VenusSphereGeo, venusMaterial);
VenusSphere.castShadow = true;
const venusObj = new THREE.Object3D();
venusObj.add(VenusSphere);
scene.add(venusObj);
VenusSphere.position.set(SunSphere.position.x + 35, SunSphere.position.y, SunSphere.position.z);
//Earth
const earthTexture = textureLoader.load(earthFile);
const earthMaterial = new THREE.MeshStandardMaterial({map: earthTexture});

const EarthSphereGeo = new THREE.SphereGeometry(3, 40, 40);
const EarthSphereMat = new THREE.MeshStandardMaterial({ color: 0x147971, wireframe: false });
const EarthSphere = new THREE.Mesh(EarthSphereGeo, earthMaterial);
EarthSphere.castShadow = true;
const EarthObj = new THREE.Object3D();
EarthObj.add(EarthSphere);
scene.add(EarthObj);
EarthSphere.position.set(SunSphere.position.x + 55, SunSphere.position.y, SunSphere.position.z);
//Moon
const MoonLight = new THREE.PointLight(0x333333);
MoonLight.castShadow = true;
MoonLight.power= 200;
MoonLight.decay = 0;
scene.add(MoonLight);
MoonLight.position.set(SunSphere.position.x + 55, SunSphere.position.y, SunSphere.position.z);

const moonTexture = textureLoader.load(moonFile);
const moonMaterial = new THREE.MeshStandardMaterial({map: moonTexture});
const MoonGeo = new THREE.SphereGeometry(3);
const MoonSphere = new THREE.Mesh(MoonGeo, moonMaterial);
MoonSphere.position.set(EarthSphere.position.x, EarthSphere.position.y + 10, EarthSphere.position.z);

MoonSphere.castShadow = true;
const MoonObj = new THREE.Object3D();
MoonObj.add(MoonSphere);
scene.add(MoonObj);




//Mars
const marsTexture = textureLoader.load(marsFile);
const marsMaterial = new THREE.MeshStandardMaterial({map: marsTexture});

const MarsSphereGeo = new THREE.SphereGeometry(1.5, 40, 40);
const MarsSphereMat = new THREE.MeshStandardMaterial({ color: 0x147971, wireframe: false });
const MarsSphere = new THREE.Mesh(MarsSphereGeo, marsMaterial);
MarsSphere.castShadow = true;
const MarsObj = new THREE.Object3D();
MarsObj.add(MarsSphere);
scene.add(MarsObj);
MarsSphere.position.set(SunSphere.position.x + 75, SunSphere.position.y, SunSphere.position.z);
//Jupiter
const jupiterTexture = textureLoader.load(jupiterFile);
const jupiterMaterial = new THREE.MeshStandardMaterial({map: jupiterTexture});

const JupiterSphereGeo = new THREE.SphereGeometry(6, 40, 40);
const JupiterSphereMat = new THREE.MeshStandardMaterial({ color: 0x147971, wireframe: false });
const JupiterSphere = new THREE.Mesh(JupiterSphereGeo, jupiterMaterial);
JupiterSphere.castShadow = true;
const JupiterObj = new THREE.Object3D();
JupiterObj.add(JupiterSphere);
scene.add(JupiterObj);
JupiterSphere.position.set(SunSphere.position.x + 90, SunSphere.position.y, SunSphere.position.z);
//Saturn
const saturnTexture = textureLoader.load(saturnFile);
const saturnMaterial = new THREE.MeshStandardMaterial({map: saturnTexture});

const SaturnSphereGeo = new THREE.SphereGeometry(4, 40, 40);
const SaturnSphereMat = new THREE.MeshStandardMaterial({ color: 0x147971, wireframe: false });
const SaturnSphere = new THREE.Mesh(SaturnSphereGeo, saturnMaterial);
SaturnSphere.castShadow = true;
const SaturnObj = new THREE.Object3D();
SaturnObj.add(SaturnSphere);
scene.add(SaturnObj);
SaturnSphere.position.set(SunSphere.position.x + 130, SunSphere.position.y, SunSphere.position.z);
//Saturn Rings
const saturnRingTexture = textureLoader.load(saturnRingFile);
const saturnRingMaterial = new THREE.MeshStandardMaterial({map: saturnRingTexture});

const saturnRingGeo1 = new THREE.TorusGeometry(5, .3, 3, 33);
const saturnRingGeo2 = new THREE.TorusGeometry(7, .3, 3, 33);
const saturnRingGeo3 = new THREE.TorusGeometry(9, .3, 3, 33);
const SaturnRingTorus1 = new THREE.Mesh(saturnRingGeo1, saturnRingMaterial);
SaturnRingTorus1.castShadow = true;
const SaturnRingTorus2 = new THREE.Mesh(saturnRingGeo2, saturnRingMaterial);
SaturnRingTorus2.castShadow = true;
const SaturnRingTorus3 = new THREE.Mesh(saturnRingGeo3, saturnRingMaterial);
SaturnRingTorus3.castShadow = true;
scene.add(SaturnRingTorus1);
scene.add(SaturnRingTorus2);
scene.add(SaturnRingTorus3);
SaturnRingTorus1.position.set(SaturnSphere.position.x, SaturnSphere.position.y, SaturnSphere.position.z);
SaturnRingTorus1.rotateX(10);
SaturnRingTorus1.rotateY(30);
SaturnRingTorus2.position.set(SaturnSphere.position.x, SaturnSphere.position.y, SaturnSphere.position.z);
SaturnRingTorus2.rotateX(10);
SaturnRingTorus2.rotateY(30);
SaturnRingTorus3.position.set(SaturnSphere.position.x, SaturnSphere.position.y, SaturnSphere.position.z);
SaturnRingTorus3.rotateX(10);
SaturnRingTorus3.rotateY(30);

const RingObj1 = new THREE.Object3D();
RingObj1.add(SaturnRingTorus1);
scene.add(RingObj1);
const RingObj2 = new THREE.Object3D();
RingObj2.add(SaturnRingTorus2);
scene.add(RingObj2);
const RingObj3 = new THREE.Object3D();
RingObj3.add(SaturnRingTorus3);
scene.add(RingObj3);

//Uranus
const uranusTexture = textureLoader.load(uranusFile);
const uranusMaterial = new THREE.MeshStandardMaterial({map: uranusTexture});

const UranusSphereGeo = new THREE.SphereGeometry(3, 40, 40);
const UranusSphereMat = new THREE.MeshStandardMaterial({ color: 0x147971, wireframe: false });
const UranusSphere = new THREE.Mesh(UranusSphereGeo, uranusMaterial);
UranusSphere.castShadow = true;
const UranusObj = new THREE.Object3D();
UranusObj.add(UranusSphere);
scene.add(UranusObj);
UranusSphere.position.set(SunSphere.position.x + 150, SunSphere.position.y, SunSphere.position.z);
//Neptune
const neptuneTexture = textureLoader.load(neptuneFile);
const neptuneMaterial = new THREE.MeshStandardMaterial({map: neptuneTexture});

const NeptuneSphereGeo = new THREE.SphereGeometry(3.5, 40, 40);
const NeptuneSphereMat = new THREE.MeshStandardMaterial({ color: 0x147971, wireframe: false });
const NeptuneSphere = new THREE.Mesh(NeptuneSphereGeo, neptuneMaterial);
NeptuneSphere.castShadow = true;
const NeptuneObj = new THREE.Object3D();
NeptuneObj.add(NeptuneSphere);
scene.add(NeptuneObj);
NeptuneSphere.position.set(SunSphere.position.x + 200, SunSphere.position.y, SunSphere.position.z);

function animate(time) {

    SunSphere.rotateY(0.01);
    //Rotates Around
    mercuryObj.rotateY(.01 * .4);
    venusObj.rotateY(.03* .3);
    MarsObj.rotateY(.06* .2);
    EarthObj.rotateY(.001* .5);
    MoonObj.rotateY(.001* .5);
    NeptuneObj.rotateY(.009 * .4);
    SaturnObj.rotateY(.005 * .4);
    RingObj1.rotateY(.005* .4);
    RingObj2.rotateY(.005* .4);
    RingObj3.rotateY(.005* .4);
    UranusObj.rotateY(.03* .2);
    JupiterObj.rotateY(.07* .2);

    //Rotates Itself
    MercurySphere.rotateY(.1);
    VenusSphere.rotateY(.02);
    MarsSphere.rotateY(.05);
    EarthSphere.rotateY(.003);
    NeptuneSphere.rotateY(.01);
    SaturnSphere.rotateY(.011);
    SaturnRingTorus1.rotateY(.011);
    SaturnRingTorus2.rotateY(.011);
    SaturnRingTorus3.rotateY(.011);
    UranusSphere.rotateY(.032);
    JupiterSphere.rotateY(.11);

    const arrayLength = SunSphere.geometry.attributes.position.array.length;
    
    for (i = 0; i <= 10; i++)
    {
    SunSphere.geometry.attributes.position.array[i] = 10 * Math.random();
    
    }
    const lastZPos = SunSphere.geometry.attributes.position.array.length-1;
    SunSphere.geometry.attributes.position.array[lastZPos] = 10 * Math.random();

    SunSphere.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

renderer.render(scene, camera);