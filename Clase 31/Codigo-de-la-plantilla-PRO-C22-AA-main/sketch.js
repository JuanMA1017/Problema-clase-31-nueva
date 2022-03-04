const Engine=Matter.Engine;
const World=Matter.World;
const Bodies=Matter.Bodies;
var engine;
var world;
var fondo;
var torre;
var cannonobj;
var angle;
var mbalas=[];
var mboats=[];
var piso;

function preload() {
  fondo=loadImage("assets/background.gif");
  torre=loadImage("assets/tower.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine=Engine.create();
  world=engine.world

  angleMode(DEGREES);
  angle=15;
  cannonobj=new Cannon(300, 280, 240, 160, angle);
  piso=Bodies.rectangle(0, height-1, width*2, 5, {isStatic:true});
  World.add(world, piso);
}

function draw() {
  Engine.update(engine);
  image(fondo, 0, 0, width, height);
  image(torre, width/14, height-650, width/6, height/1.8);
  rect(piso.position.x, piso.position.y, width*2, 5);
  boats();

  for(var i=0; i<mbalas.length;i++){
    shootbullets(mbalas[i], i);
    colisiones(i);
    //colisiones(i);
    //console.log("for");
    console.log("indice de balas", mbalas[i])
    console.log("indice", i)
    console.log("longitud de mbalas", mbalas.lenght)
  }
  cannonobj.display();
  //boatobj.display()
}

function keyPressed(){
  if(keyCode===DOWN_ARROW){
    var bulletobj;
    bulletobj=new Bullets(cannonobj.x, cannonobj.y);
    mbalas.push(bulletobj);
    bulletobj.trayectoria=[]
    //console.log("trayectoria.after", trayectoria.length);
    //console.log("genera bala");
    Matter.Body.setAngle(bulletobj.body, cannonobj.angle);
    
    //console.log("llenado de matriz");
  }
}

function shootbullets(ball,index){
  if(ball){
    ball.display()
    if(ball.body.position.x>=width || ball.body.position.y>=height-50){
      ball.remove(index);
    }
    //console.log("showbullets");
  }
}

function boats(){
  
  if(mboats.length>0){
    if(mboats[mboats.length-1]===undefined || mboats[mboats.length-1].body.position.x<width-300){
      var positions=[-40, -60, -70, -20]
      var posicion=random(positions);
      var boatobj=new Boat(width, height-100, 100, 100, posicion);
      mboats.push(boatobj);
    }
   
  //console.log("matriz de botes", mboats.length)
  for(var i=0; i<mboats.length;i++){
    if(mboats[i]){
      //console.log("mboats[i] ", mboats[i] );
      //console.log("entra al ciclo for");
      Matter.Body.setVelocity(mboats[i].body,{x:-1, y:0});
      mboats[i].display();
    }
  }

}
else {
  var boatobj=new Boat(width, height-100, 100, 100, -60);
      mboats.push(boatobj);
}
  
}

function keyReleased(){
  if(keyCode===DOWN_ARROW){
    mbalas[mbalas.length-1].shoot();
    //console.log("keyReleased");
  }
}

function colisiones(index){
  for(var i=0; i<mboats.length;i++){
  if(mbalas[index] !==undefined && mboats[i]!==undefined){
    console.log("indice de balas", mbalas[index]);
    console.log("indice de botes", mboats[i]);
    var colision=Matter.SAT.collides(mbalas[index].body, mboats[i].body);
    
        console.log("hubo colison", colision);

    if(colision.collided){
      mboats[i].remove(i);
      Matter.World.remove(world, mbalas[index].body)
      delete mbalas[index];
    }
  }
  }
}