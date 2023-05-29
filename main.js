import './style.css'
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const start = [-1, -5, 0];
// const one=[-1, -5, 10.8];
// const two=[4, -5, 8];
// const three=[3, -4, 4];
// const four=[0, -2, 8];
// const positions = [one, two, three, four];

const scene = new THREE.Scene();
var model;
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});


const Loader = new GLTFLoader()
Loader.load(
    'Models/Comp/source/Computers.glb',
    function(gltf) {
        model = gltf.scene;
        model.position.set(-1, -5, 0);
        //model.rotation.z(90);
        console.log(gltf);
        scene.add(gltf.scene);
        
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    function (error) {
        console.log(error)
    }

)
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(7);


// const geometry = new THREE.TorusGeometry(10, 2, 100, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
// const torus = new THREE.Mesh(geometry, material);
// scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20, 0, 0);

const ambientLight = new THREE.PointLight(0xffffff)

scene.add(pointLight, ambientLight)

//const lightHelper = new THREE.PointLightHelper(pointLight)
//scene.add(lightHelper)


const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;

function addStar() {


  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}


function animate() {
  requestAnimationFrame(animate);
  //torus.rotation.y += 0.001;
  controls.update();
  renderer.render(scene, camera);
}



function moveCamera(){

 const t = document.body.getBoundingClientRect().top;
 camera.position.y = t * -0.003;

}



document.body.onscroll = moveCamera;




const bg = new THREE.TextureLoader().load("space.jpg");
scene.background = bg;

Array(200).fill().forEach(addStar);
animate();
