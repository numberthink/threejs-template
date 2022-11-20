import './style.css';
import * as THREE from 'three';

// create canvas element where scene will be rendered
const canvas = document.querySelector('canvas.webgl');

// set up renderer
const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio( window.devicePixelRatio );

// set white background color
renderer.setClearColor(0xffffff, 1);

// set up camera
const camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, .5, 100);
camera.position.set(0 , 0 , 5 );

// create scene
const scene  = new THREE.Scene();

// create box and add to scene
let boxGeo = new THREE.BoxGeometry(1, 1, 1);
let boxMat = new THREE.MeshPhongMaterial();
let boxMesh = new THREE.Mesh(boxGeo, boxMat);

scene.add(boxMesh);

// render
renderer.render(scene, camera);



// adjust camera/renderer sizes when window is resized
const onWindowResize = () => {

  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize( width, height );


}

window.addEventListener( 'resize', onWindowResize );


const clock = new THREE.Clock(); // initialize the ThreeJS Clock object
clock.start(); // "start" it by calling the start() method on it
let elapsedTime = clock.getElapsedTime(); // get an initial value for elapsedTime

let rotSpeed = .1*(Math.PI*2); // set the rotation speed for the box.

// set up "tick" function that will run animation
const tick = () => {

    elapsedTime = clock.getElapsedTime(); // get the elapsed time at each frame
		
		let xRot = elapsedTime*rotSpeed; // multiply the elapsed time by rotation speed to get the new rotation value
		let yRot = elapsedTime*(rotSpeed*.75); // same except reduce speed by 25%
		let zRot = elapsedTime*(rotSpeed*.75); // same except reduce speed by 25%

		boxMesh.rotation.set(xRot, yRot, zRot); // set the new rotation values on the box mesh

		renderer.render(scene, camera); // render the scene with the updated box in it. 



	  window.requestAnimationFrame(tick); // request next frame from browser when its ready

}

tick(); // call tick function to start the animation

