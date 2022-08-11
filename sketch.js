
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var bg, bgImg

var monster_1Group
var monster_1, monster_1Img
var monster_2Group
var monster_2, monster_2Img

var hero, heroImg

var bulletGroup
var bullet,bulletImg

var score = 0;

function preload(){
	bgImg = loadImage("/assets/forest.png");
	monster_1Img = loadImage("/assets/monster_1.png");
	monster_2Img = loadImage("/assets/monster_2.png");

	heroImg = loadImage("/assets/Hero.png")

	bulletImg = loadImage("/assets/bullet.png")
}

function setup() {
	createCanvas(windowWidth,windowHeight);
	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	bg = createSprite(displayWidth/2,displayHeight/2-40,20,2)
	bg.scale = 2.1;
	bg.addImage(bgImg);

	hero = createSprite(displayWidth-1150,displayHeight-300,50,50);
	hero.addImage(heroImg);
	hero.scale = 0.4;
	hero.debug = true;
    hero.setCollider("rectangle",0,0,260,260);



	monster_1Group = new Group();
	monster_2Group = new Group();

	bulletGroup = new Group();


	Engine.run(engine);
}


function draw() {
  rectMode(CENTER);
  background(0);

if(keyDown("UP_ARROW")){
	hero.y = hero.y - 20;
}
if(keyDown("DOWN_ARROW")){
	hero.y = hero.y + 20;
}
if(keyDown("RIGHT_ARROW")){
	hero.x = hero.x + 20;
}
if(keyDown("LEFT_ARROW")){
	hero.x = hero.x - 20;
}


if(keyWentDown("SPACE")){
	bullet = createSprite(hero.x+65,hero.y-30,20,10);
	bullet.addImage(bulletImg);
	bullet.scale = 0.2;
	bullet.velocityX = 20;
	bulletGroup.add(bullet);
	//bullet = bullet-1;


	//hero.depth = bullet.depth;
	//hero.depth = hero.depth+2;

	//hero.addImage(heroImg);
}
if(keyWentUp("SPACE")){
	hero.addImage(heroImg);
}


if(monster_1Group.isTouching(bulletGroup)){
	for(m=0;m<monster_1Group.length;m++){
		if(monster_1Group[m].isTouching(bulletGroup)){
			monster_1Group[m].destroy();
			bulletGroup.destroyEach();

			score = score+2;
		}
		//if(monster_2Group[i].isTouching(bulletGroup)){
			//monster_2Group[i].destroy();
			//bulletGroup.destroyEach();

			//score = score+5;
		//}
	}
}



	monsters();

  drawSprites();
}

function monsters(){
	if(frameCount%50 == 0){
        monster_1 = createSprite(random(900,1500),random(300,700),40,40);
        monster_1.addImage(monster_1Img);
        monster_1.scale = 0.40;
        monster_1.velocityX = -5;
        monster_1Group.add(monster_1);
        monster_1.lifetime = 400;

        monster_1.debug = true;
        monster_1.setCollider("rectangle",0,0,160,140);
    }
}