var PLAY = 1;
var END = 0;
var gameState = PLAY;

var enemy,enemy1,enemygroup;
var fruit,fruit1,fruit2,fruit3,fruit4,fruitgroup;
var sword,swordimage,gameover,oversound;
var swoosh;
var score = 0;

function preload(){
  swordimage = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  enemy1 = loadAnimation("alien1.png","alien2.png");
  gameover = loadImage("gameover.png");
  oversound = loadSound("gameover.mp3");
  swoosh = loadSound("knifeSwooshSound.mp3");
  
}

function setup() {
  createCanvas(400, 400);
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordimage);
  sword.scale = 0.7;
  
  fruitgroup = new Group();
  enemygroup = new Group();
  
}

function draw() {
  background("lightblue");
  
  if(gameState === PLAY){
    
    sword.x = World.mouseX;
    sword.y = World.mouseY;
    
    if(fruitgroup.isTouching(sword)){
      fruitgroup.destroyEach();
      swoosh.play();
      score = score + 2;
      }
    
    if(enemygroup.isTouching(sword)){
        gameState = END;
        oversound.play();
        
        fruitgroup.destroyEach();
        fruitgroup.setVelocityXEach(0);
      
        enemygroup.destroyEach();
        enemygroup.setVelocityXEach(0);
        
        sword.addImage(gameover);
        sword.x = 200;
        sword.y = 200;
        sword.scale = 1.5;
       }
    
    fruits();
    enemies();
  }
  
  drawSprites();
  
  text("score : " + score,300,50);
}

function fruits(){
  if(frameCount % 80 ===0){
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    
    r = Math.round(random(1,4));
    if (r === 1){
      fruit.addImage(fruit1);
    } else if(r === 2){
      fruit.addImage(fruit2);
    } else if(r ===  3){
      fruit.addImage(fruit3);
    } else if(r === 4){
      fruit.addImage(fruit4);
    }
    
    p = Math.round(random(1,2));
    
    if(p === 1){
      fruit.x = 400;
      fruit.velocityX = -(7 + score / 4);
    } else if(p === 2){
      fruit.x = 0;
      fruit.velocityX = (7 + score / 4);
    }
    
    fruit.y = Math.round(random(50,340));
    fruit.lifetime = 100; 
    fruitgroup.add(fruit);
  }
}

function enemies(){
  if(frameCount % 200 === 0){
    enemy = createSprite(400,200,20,20);
    enemy.addAnimation("animation",enemy1);
    enemy.y = Math.round(random(100,300));
    enemy.velocityX = -(8 + score / 10);
    enemy.lifetime = 50;
  
    enemygroup.add(enemy);
  }
}

