

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;

var ground;
var wall1, wall2;
var enemy, enemy2, enemyImg, enemy2Img, speedChoice, strengthChoice, laserChoice, speedImg, speed;
var user, userImg, enemyBulletG, enemy2BulletG;
var bullet, bulletG, enemyLives = 3, enemy2Lives = 3, userLives = 3;
var enemyBulletTouch = false;
var enemy2BulletTouch = false;

var userBulletTouch = false;
var powerupDropped = false;
var speedActivated = false;
var gameOver = false;
var iinterval;
var enemyIsDestroyed = false;
var enemy2IsDestroyed = false;
var explosionSound;
var victoryText = false;
var lost = false;
function preload()
{
enemy2Img = loadImage("enemy2.png");
userImg = loadAnimation("user.png");
enemyImg = loadAnimation("enemys.png");
speedImg = loadImage("speed powerup.png");
explosionSound = loadSound("ExplosionSound.mp3");
}

function setup() {
  createCanvas(500,800);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  bulletG = new Group();
  enemyBulletG = new Group();
  enemy2BulletG = new Group();

  james();
  


  
  ground = new Ground(250,795,2000,5);
  wall1 = new Ground(0,400,20,5000);
  wall2 = new Ground(500,400,20,5000);

  enemy = createSprite(200,20);
  enemy.addAnimation("Enemy", enemyImg);
  enemy.scale = 0.07;
  enemy.velocityX = 2;

   enemy2 = createSprite(-100000000000000000000000000,40);
   enemy2.addAnimation("Enemy2", enemy2Img);
   enemy2.scale = 0.5;
   enemy2.visible = true;
   enemy2.velocityX = 0;
  

  
   textSize(50);
  user = createSprite(250,730);
  user.addAnimation("User", userImg);
  user.scale = 0.4;

  ellipseMode(RADIUS);
}

function draw() {

  background(51);
  Engine.update(engine);

  push();
  imageMode(CENTER);
  if(speed!=null){
    image(speedImg,speed.position.x,speed.position.y,70,70);
  }
  pop();

  if(victoryText == true){
    fill("white");
  textSize(50);
  text("VICTORY", 140,200);
  }
  if(lost == true){
    if(keyDown("space")){
      location.reload();
    }
  }

  if(collide(speed,user,40) == true){
    World.remove(engine.world,speed);
    speed = null;
    speedActivated = true;
    speedUse();
  }

  
  
  if(enemy.x >= 475 ){
    enemy.velocityX = -2;
  }
  if(enemy.x <= 20 ){
    enemy.velocityX = 2;
  }
  if(enemy2.x >= 475 ){
    enemy2.velocityX = -2;
  }
  if(enemy2.x <= 20 ){
    enemy2.velocityX = 2;
  }
 
  if(keyDown(LEFT_ARROW) && user.x >= 20 && gameOver == false){
    user.x = user.x - 5;
  }
  if(keyDown(RIGHT_ARROW) && user.x <= 480 && gameOver == false){
    user.x = user.x + 5;
  }
  
    if(bulletG.isTouching(enemy)){
    if(!enemyBulletTouch){
      enemyLives -= 1;
      enemyBulletTouch = true;
    }
    console.log("enemy lives - " + enemyLives);
    setTimeout(() => {
      enemyBulletTouch = false;
    }, 1000);
  }
    if(enemyBulletG.isTouching(user)){
      if(!userBulletTouch){
        userLives -= 1;
        userBulletTouch = true;
      }
    
    console.log("user lives - " + userLives);
    setTimeout(() => {
      userBulletTouch = false;
    }, 1000);
  }
  if(bulletG.isTouching(enemy2)){
    if(!enemy2BulletTouch){
      enemy2Lives -= 1;
      enemy2BulletTouch = true;
    }
    console.log("enemy 2 lives - " + enemy2Lives);
    setTimeout(() => {
      enemy2BulletTouch = false;
    }, 1000);
  }
    if(enemy2BulletG.isTouching(user)){
      if(!userBulletTouch){
        userLives -= 1;
        userBulletTouch = true;
      }
    
    console.log("user lives - " + userLives);
    setTimeout(() => {
      userBulletTouch = false;
    }, 1000);
  }
    
  if(enemyLives <= 0){
    powerupDrop();
    enemy2Create();
   button = createImg('download (5).png');
   button.position(enemy.x,enemy.y);
   button.size(100,100);
   enemyIsDestroyed = true;
   enemyLives = 100;
   setTimeout(() => {
    button.remove();
  }, 1000);
   explosionSound.play();
   enemy.destroy();
  

  }
  if(enemy2Lives <= 0){
   button2 = createImg('download (5).png');
   button2.position(enemy2.x,enemy2.y);
   button2.size(100,100);
   enemy2IsDestroyed = true;
   enemy2Lives = 100;
   setTimeout(() => {
    button2.remove();
  }, 1000);
   explosionSound.play();
   enemy2.destroy();
  win();

  }
  if(userLives <= 0){
    lose();

  }
  

  



  
  
  
  


  ground.show();
  wall1.show();
  wall2.show();


  

  drawSprites();

}
function createBullet() {
  var bullet= createSprite(100, 100, 60, 10);
  bullet.x = user.x;
  bullet.y=user.y;
  bullet.velocityY = -4;
  bullet.lifetime = 200;
  bullet.scale = 0.3;
  bulletG.add(bullet);
   
}
function enemy2Create(){
   enemy2.visible = true;
   enemy2.velocityX = 2;
   enemy2.x = 200;
   
   
}
function createEnemyBullet() {
  if(enemyIsDestroyed == false){
    var enemyBullet= createSprite(100, 100, 60, 10);
  enemyBullet.x = enemy.x;
  enemyBullet.y=enemy.y;
  enemyBullet.velocityY = 4;
  enemyBullet.lifetime = 200;
  enemyBullet.scale = 0.3;
  enemyBulletG.add(enemyBullet);
  }
}
function createEnemy2Bullet() {
  if(enemy2IsDestroyed == false){
    var enemy2Bullet= createSprite(100, 100, 60, 10);
  enemy2Bullet.x = enemy2.x;
  enemy2Bullet.y=enemy2.y;
  enemy2Bullet.velocityY = 4;
  enemy2Bullet.lifetime = 200;
  enemy2Bullet.scale = 0.3;
  enemy2BulletG.add(enemy2Bullet);
  }
  
   
}
function keyReleased() {
  if (keyCode === 32 && gameOver != true) {
    createBullet();
     

  }
}
function lose(){
  fill("#FFFF");
  textSize(50);
  text("GAME OVER", 100, 200);
  user.destroy();
  textSize(25);
  text("press 'space' to retry", 130,240);
  lost = true;

}
function james(){
  
    var i = setInterval(function(){
      if(gameOver != true){
      createEnemyBullet();
      }
      if(enemy2.visible == true){
        createEnemy2Bullet();
        }
    }, 2000);
  
  
}
function powerupDrop(){
  if(powerupDropped == false){
    speed = Bodies.circle(enemy.x,enemy.y,15);
    World.add(world,speed);
    powerupDropped = true;
  }
  

}
function win(){
  victoryText = true;
  gameOver = true;
}



function speedUse(){
  if(speedActivated == true){
    iinterval = setInterval(function(){
      createBullet();
      }, 100); //repeat every 2s.

      setTimeout(() => {
        clearSpeed();
      }, 2000);

  }
  




}
function clearSpeed(){
  clearInterval(iinterval);
}







function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              
               return true; 
            }
            else{
              return false;
            }
         }
}


