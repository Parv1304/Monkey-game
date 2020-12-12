var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground,iGround;
var st=0;
var START=1;
var END=0;
var gamestate=START;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}
function setup()
{
  createCanvas(400,400);
  monkey=createSprite(50,300,50,50);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  ground=createSprite(200,335,400,10);
  ground.velocityX=-5;
  iGround=createSprite(50,335,50,10);
  iGround.visible=false;
  FoodGroup=new Group();
  obstacleGroup=new Group();
}
function draw()
{
  background("white");
  if(gamestate==1)
    {
      st=Math.ceil(frameCount/frameRate());
      if(ground.x<50)
    ground.x=ground.width/2;
  if(keyDown("space")&&monkey.y>=290)
    {
      monkey.velocityY=-18;
    }
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(iGround);
  if(monkey.isTouching(obstacleGroup))
    {
      ground.velocityX=0;
      obstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.destroyEach();
      gamestate=0;
    }
  fruit();
  obstacles();
    }
  textSize(20);
  fill("black");
  text("Survival Time:"+st,120,100);
  drawSprites();
}
function fruit()
{
  var r1;
  r1=Math.round(random(120,300));
  if(frameCount%80==0)
    {
      banana=createSprite(400,r1,10,10);
      banana.addImage("banana",bananaImage);
      banana.scale=0.1;
      banana.velocityX=-3;
      banana.lifetime=133;
      monkey.depth=banana.depth+1;
      FoodGroup.add(banana);
    }
}
function obstacles()
{
  if(frameCount%300==0)
    {
      obstacle=createSprite(400,315,50,50);
      obstacle.addImage("obstacle",obstacleImage);
      obstacle.velocityX=-3;
      obstacle.scale=0.1;
      obstacle.lifetime=133;
      monkey.depth=obstacle.depth+1;
      obstacleGroup.add(obstacle);
    }
}