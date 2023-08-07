// Importing the Three.js library and the OrbitControls control
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

// Importing the texturers of the Planets, Moons, Spaceship and Asteroids
import starsurface from '../img/stars.jpg'
import sunsurface from '../img/sun.jpg'
import saturnsurface from '../img/saturn.jpg'
import saturnringsurface from '../img/saturn ring.png'
import saturnBumpMap from '../img/saturnBump.jpg'
import saturnringBumpMap from '../img/saturn ring Bump.png'
import moonsurface from '../img/moon.jpg';
import titansurface from '../img/titan.jpg';
import spaceshipsurface from '../img/alien.jpg';
import earthTexture from '../img/earth.jpg';
import earthBumpMap from '../img/earthBump.jpg';



// Creating a new WebGL renderer and setting its size
const renderer = new THREE.WebGL1Renderer();

renderer.setSize(window.innerWidth, window.innerHeight);

// Appending the renderer's DOM element to the document body
document.body.appendChild(renderer.domElement);

// Creating a new scene and a new camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Creating a new OrbitControls object and attaching it to the camera
const orbit = new OrbitControls(camera, renderer.domElement);

// Setting the camera's position and updating the OrbitControls object
camera.position.set(-90, 140, 140);
orbit.update();


// Creating a new ambient light and adding it to the scene
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// Adding stars to the background
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsurface,
    starsurface,
    starsurface,
    starsurface,
    starsurface,
    starsurface
]);

// Creating a new TextureLoader object
const textureLoader = new THREE.TextureLoader();

// Creating the Sun 
const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunsurface),
});
const sun = new THREE.Mesh(sunGeo, sunMat);

scene.add(sun);

// Creating the Asteroid Belt
const numAsteroidParticles = 2000;  // Number of asteroid dust particles in the ring
const asteroidRingRadius = 160;     // Radius of the asteroid dust ring (distance from Saturn)
const innerCircleRadius = 140;      // Inner circle radius around the sun
const asteroidMinSize = 0.1;        // Minimum size of asteroid dust particles (radius)
const asteroidMaxSize = 0.5;        // Maximum size of asteroid dust particles (radius)

function getRandomPositionOnAsteroidRing() {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * (asteroidRingRadius - innerCircleRadius) + innerCircleRadius;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    return { x, z };
}
  
for (let i = 0; i < numAsteroidParticles; i++) {
  // Generate random position for the asteroid dust particle
  const asteroidPosition = getRandomPositionOnAsteroidRing();

  // Generate random size for the asteroid dust particle
  const asteroidSize = Math.random() * (asteroidMaxSize - asteroidMinSize) + asteroidMinSize;

  // Create asteroid dust particle geometry and material
  const asteroidGeometry = new THREE.SphereGeometry(asteroidSize, 8, 8);
  const asteroidMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });

  // Create asteroid dust particle mesh and set its position
  const asteroidMesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
  asteroidMesh.position.set(asteroidPosition.x, 0, asteroidPosition.z);

  // Add the asteroid dust particle to the scene
  scene.add(asteroidMesh);
}

//Creating Saturn
const saturnGeo = new THREE.SphereGeometry(10, 30, 30);
const saturnMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(saturnsurface),
    bumpMap: textureLoader.load(saturnBumpMap),
    bumpScale: 0.2,
});

const saturnMesh = new THREE.Mesh(saturnGeo, saturnMat);
const saturnObj = new THREE.Object3D();
saturnObj.add(saturnMesh);

//Creating the rings of Saturn
const ringGeo = new THREE.RingGeometry(10, 20, 32);
const ringMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(saturnringsurface),
    bumpMap: textureLoader.load(saturnringBumpMap),
    side: THREE.DoubleSide,
});

const ringMesh = new THREE.Mesh(ringGeo, ringMat);
saturnObj.add(ringMesh);
ringMesh.position.x = 100;
ringMesh.rotation.x = 0.65 * Math.PI;

saturnMesh.position.x = 100;

const saturn = { saturnMesh, saturnObj, ringMesh };

//Create planet Earth
const earthgeo = new THREE.SphereGeometry(6, 30, 30);
const earthmat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(earthTexture),
    bumpMap: textureLoader.load(earthBumpMap),
    bumpScale: 0.5,

});

const earthmesh = new THREE.Mesh(earthgeo, earthmat);
const earthobj = new THREE.Group();
earthobj.add(earthmesh);

earthmesh.position.x = 50;

const earth =  { earthmesh, earthobj }


// Create moon for Earth 
const moonGeo = new THREE.SphereGeometry(2, 20, 20);
const moonMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(moonsurface)
});
const moonMesh = new THREE.Mesh(moonGeo, moonMat);
const moonObj = new THREE.Object3D();
moonObj.add(moonMesh);

earthobj.add(moonObj);
moonMesh.position.set(50, 0, 0);

const moon = { moonMesh, moonObj };

// Create moon 1 for saturn. 
const moon1Geo = new THREE.SphereGeometry(1, 20, 20);
const moon1Mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(moonsurface)
});
const moon1Mesh = new THREE.Mesh(moon1Geo, moon1Mat);
const moon1Obj = new THREE.Object3D();
moon1Obj.add(moon1Mesh);

saturnObj.add(moon1Obj);
moon1Mesh.position.set(100, -10, 0);

const moon1 = { moon1Mesh, moon1Obj };

// Create moon 2 for Saturn (Titan)
const titanGeo = new THREE.SphereGeometry(3, 20, 20);
const titanMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(titansurface)
});
const titanMesh = new THREE.Mesh(titanGeo, titanMat);
const titanObj = new THREE.Object3D();
titanObj.add(titanMesh);

saturnObj.add(titanObj);
titanMesh.position.set(100, 10, 0);

const titan = { titanMesh, titanObj };

//adding earth and saturn with an angle to their axis with their respective moons to the scene
scene.add(saturnObj);
scene.add(earthobj);
earth.earthmesh.rotation.z = 0.41;
moon.moonMesh.rotation.x = 0.41;
saturn.saturnMesh.rotation.x = 0.466;
moon1.moon1Mesh.rotation.x = 0.466;
titan.titanMesh.rotation.x = 0.466;

//Creating the Spaceship
const spaceshipLoader = new THREE.TextureLoader();
const spaceshipTexture = spaceshipLoader.load(spaceshipsurface);


const spaceshipGeometry = new THREE.SphereGeometry(5, 32, 32); 

const spaceshipMaterial = new THREE.MeshBasicMaterial({ map: spaceshipTexture });
const spaceshipMesh = new THREE.Mesh(spaceshipGeometry, spaceshipMaterial);

// Add the spaceship to the scene
scene.add(spaceshipMesh);
const spaceshipSpeed = 0.5;
spaceshipMesh.position.set(-100, 50, 50);
let spaceshipPositionX = -300;


//Adding the light to point from the sun
const pointLight = new THREE.PointLight(0xFFFFFF, 1, 500);
scene.add(pointLight);

// Creating a function to render the scene and the camera
function animate() {

    
    // Self-rotation of the Sun, Saturn and Earth
    sun.rotateY(0.002);
    saturn.saturnMesh.rotateY(0.008);
    earth.earthmesh.rotateY(0.009);

    // Around-sun rotation of Saturn and Earth
    saturn.saturnObj.rotateY(0.001);
    earth.earthobj.rotateY(0.006);

    
    

    // Moon and Titan rotation around Saturn
    const moon1OrbitSpeed = 0.002;
    const titanOrbitSpeed = 0.003;
    const moonOrbitSpeed = 0.001; 

    moon.moonMesh.rotateY(moonOrbitSpeed);
    moon1.moon1Mesh.rotateY(moon1OrbitSpeed);
    titan.titanMesh.rotateY(titanOrbitSpeed);

    // Move the spaceship across the scene
    spaceshipPositionX += spaceshipSpeed;
    if (spaceshipPositionX > 300) {
        spaceshipPositionX = -300; // Reset the position when the spaceship goes beyond a certain point
    }
    spaceshipMesh.position.x = spaceshipPositionX;

    const time = Date.now();

    // Move the moon around Earth
    const moonOrbitRadius = 10; 
    const angle = time * moonOrbitSpeed;

    // Calculate the position of the Moon relative to the Earth
    const moonX = Math.cos(angle) * moonOrbitRadius;
    const moonZ = Math.sin(angle) * moonOrbitRadius;

    moon.moonObj.position.set(earth.earthobj.position.x + moonX, 0, earth.earthobj.position.z + moonZ);

    // Move moon1 around Saturn
    const moon1OrbitRadius = 12;
    const moon1Angle = time * moon1OrbitSpeed;

    // Calculate the position of moon1 relative to Saturn
    const moon1X = Math.cos(moon1Angle) * moon1OrbitRadius;
    const moon1Z = Math.sin(moon1Angle) * moon1OrbitRadius;

    moon1.moon1Obj.position.set(saturn.saturnObj.position.x + moon1X, 0, saturn.saturnObj.position.z + moon1Z);

    // Move Titan around Saturn
    const titanOrbitRadius = 12;
    const titanAngle = time * titanOrbitSpeed;

    // Calculate the position of Titan relative to Saturn
    const titanX = Math.cos(titanAngle) * titanOrbitRadius;
    const titanZ = Math.sin(titanAngle) * titanOrbitRadius;

    titan.titanObj.position.set(saturn.saturnObj.position.x + titanX, 0, saturn.saturnObj.position.z + titanZ);

    renderer.render(scene, camera);

}

// Setting the renderer's animation loop to the animate function
renderer.setAnimationLoop(animate);

// Adding an event listener to the window's resize event
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
