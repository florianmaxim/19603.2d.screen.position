import {WebGLRenderer,
        Mesh,
        MeshBasicMaterial,
        PerspectiveCamera,
        Scene,
        CubeGeometry,
        SphereGeometry,
        ConeGeometry,
        Vector3,
        Matrix4,
        Vector2,
        Raycaster,
        PlaneGeometry} from '../lib/three/three.modules';

var renderer, camera, scene;
var geometry,material,mesh,mesh2, mesh3, mesh4, mesh5;
var mouse = new Vector2();
var raycaster = new Raycaster();
var helpplane;
var rotate=false;

console.log('intersects');

function init(){
  document.body.style.margin = 0;

  renderer = new WebGLRenderer({antialias:true});
  renderer.setSize(innerWidth,innerHeight);
  document.body.appendChild(renderer.domElement);

  scene = new Scene();

  camera = new PerspectiveCamera(75, innerWidth/innerHeight,0.01,1000);
  scene.add(camera);

  geometry = new CubeGeometry( 10, 10, 10 );
  material = new MeshBasicMaterial( { color: 0xff0000, wireframe: true} );

  mesh = new Mesh( geometry, material );
  mesh.position.set(0,0,-20)
  scene.add( mesh );

  geometry = new CubeGeometry( 1, 1, 1 );
  material = new MeshBasicMaterial( { color: 0x0000ff, wireframe: true} );

  mesh2 = new Mesh( geometry, material );

  camera.add( mesh2 );

  geometry = new SphereGeometry( .5, 8, 8 );
  material = new MeshBasicMaterial( { color: 0x0000ff, wireframe: true} );

  mesh3 = new Mesh( geometry, material );

  camera.add( mesh3 );

  geometry = new ConeGeometry( .5, 1, 8 );
  material = new MeshBasicMaterial( { color: 0x0000ff, wireframe: true} );

  mesh4 = new Mesh( geometry, material );

  camera.add( mesh4 );

  geometry = new ConeGeometry( .5, 1, 8 );
  material = new MeshBasicMaterial( { color: 0x00ff00, wireframe: true} );

  mesh5 = new Mesh( geometry, material );

  camera.add( mesh5 );

  //clue
  var xAxis = new Vector3(1,0,0)
  var yAxis = new Vector3(0,1,0)
  var zAxis = new Vector3(0,0,0)

  var newMatrix = new Matrix4().makeBasis ( xAxis, yAxis, zAxis );

  mesh2.geometry.applyMatrix(  newMatrix  );
  mesh3.geometry.applyMatrix(  newMatrix  );
  mesh4.geometry.applyMatrix(  newMatrix  );
  mesh5.geometry.applyMatrix(  newMatrix  );


  //position on screen

  geometry = new PlaneGeometry( 1000, 1000, 10, 10 );
  material = new MeshBasicMaterial( { color: 0xff0000, wireframe: false, transparent:true, opacity:.2} );

  helpplane = new Mesh( geometry, material );
  helpplane.position.set(0,0,-20)
  helpplane.name = 'helpplane'
  scene.add( helpplane );

  //mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  //mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  function positionOnScreen(vector, object){
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( vector, camera );

    var intersects = raycaster.intersectObject(helpplane);

    if(intersects.length>0){
      object.position.copy(intersects[0].point);
      console.log(intersects[0].point)
    }
  }

  addEventListener('load', function(){
    positionOnScreen(new Vector2(.8,.8), mesh4);
    positionOnScreen(new Vector2(-.8,.8), mesh3);
    positionOnScreen(new Vector2(-.8,-.8), mesh2);
    positionOnScreen(new Vector2(.8,-.8), mesh5);
  });
  addEventListener('resize', function(){
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(devicePixelRatio);
    positionOnScreen(new Vector2(.8,.8), mesh4)
    positionOnScreen(new Vector2(-.8,.8), mesh3);
    positionOnScreen(new Vector2(-.8,-.8), mesh2);
    positionOnScreen(new Vector2(.8,-.8), mesh5);
  });
  addEventListener('mousedown', function(){
    rotate=true;
  })
  addEventListener('mouseup', function(){
    rotate=false;
  })
}


function render(){
  requestAnimationFrame( render );
  renderer.render(scene, camera);

  if(rotate)
    mesh4.rotation.y+=0.01;
}

init();
render();
