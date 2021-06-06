
var monkey , monkey_running;
var bone, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime=0;


function preload(){
  
  
  monkey_running = loadAnimation("dog 1.png","dog 2.png","dog3.png","dog 4.png","dog 5.png","dog 6.png");
  
  boneImage = loadImage("bone.png");
  obstacleImage = loadImage("obstacle.png");


 
}



function setup() {
  createCanvas (600,600)
  
  monkey = createSprite (100,500, 20, 20)
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.scale = 0.2;
  
  //obstacle = createSprite(300,500,20,20)
 
  

  
  obstacleGroup = createGroup();
  boneGroup = createGroup();
  
  
  score = 0;
  
  
}


function draw() {
  background(200, 200, 255,255);
  
  
    spawnObstacles();
    spawnBone();
  
   if(keyDown("space") && monkey.y >= 300) {
        monkey.velocityY = -12;
    }
  
  
      if (boneGroup.isTouching(monkey)){
      boneGroup.destroyEach();
      score=score+1
    }
  
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.velocityX = -6;
  
  
  
  
  drawSprites();
  
  fill("white")
 text("Score: "+ score, 500,50);
  
  fill("black")
  textSize(20)
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100,50)
}



function spawnObstacles(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(500,530,20,20);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6;
   
    //generate random obstacles
    var rand = Math.round(random(1));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.25;
    obstacle.lifetime = 500;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
  
  
  
}

function spawnBone() {
  //write code here to spawn the clouds
  if (frameCount % 160 === 0) {
    bone = createSprite(600,100,40,10);
    bone.y = Math.round(random(250,300));
    bone.addImage(boneImage);
    bone.scale = 0.2;
    bone.velocityX = -3;
    
     //assign lifetime to the variable
    bone.lifetime = 500;
    
    //adjust the depth
    bone.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding cloud to the group
   boneGroup.add(bone);
    }
     
}

