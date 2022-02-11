var jet, jetImage;
var earth, earthImage;
var asteroid, astImage;
var bullets, bulletsImage;
var missile, missileImage;
var space, backgroundImage;
var ufo, ufoImage;
var ss, ssImage;
var go, goImage;
var gm, gmImage;
var mf, mfSound;
var mf2, mfSound2;
var airM, airMImg;
var alienSS, alienSSImg;
var mip, mipImg;
var alert1, alertImage;
var mp;
var je2;
var next, nextButton;
var space2, spaceBg;
var enter, enterImg;
var START = 1;
var INFO = 2;
var PLAY = 3;
var WON = 4;
var END = 0;
var gameState = START ; 
var score=0;

function preload(){
  spaceBg = loadImage("images/space2.png");
  enterImg = loadImage("images/enter.png");
  nextButton = loadImage("images/next.png");
  je2 = loadImage("images/jet2.png");
  mp = loadSound("sound/mission_passed.mp3");
  mfSound = loadSound("sound/fail.mp3");
  alertImage = loadImage("images/alert.png");
  mipImg = loadImage("images/mp.png");
  alienSSImg = loadImage("images/alien.png");
  airMImg = loadImage("images/air-missile.png");
  mfSound2 = loadSound("sound/mission_failed.mp3");
  earthImage = loadImage("images/earth2.png"); 
  ssImage = loadImage("images/ufo1.png");
  missileImage = loadImage("images/missile.png");
  jetImage = loadImage("images/JetImage.png");
  bulletsImage = loadImage("images/missile4.png")
  backgroundImage = loadImage("images/spaceBg.png");
  astImage = loadImage("images/missile2.png");
  ufoImage = loadImage("images/spaceship.png");
  aImage = loadImage("images/a_in_p.png");
  goImage = loadImage("images/restart.png");
  gmImage = loadImage("images/mf.png");
  mf2 = loadSound("sound/laser_realistic.mp3");
}

function setup() {
  createCanvas(1300,400);
  space = createSprite(650,200,20,20);
  space.addImage(backgroundImage);
  space.scale = 1.1; 
  earth = createSprite(-95, 200, 50, 50);
  earth.scale = 0.8;
  earth.addImage(earthImage);
  earth.debug = false;
  earth.setCollider("circle",0,0,150)
  jet = createSprite(170, 200, 50, 50);
  jet.scale = .1;
  jet.addImage("jet",jetImage);
  jet.addImage("jet2",je2);
  ufo = createSprite(1220,200,50,50);
  ufo.addImage(ufoImage);
  ufo.scale = 0.8;
  go = createSprite(650,250,50,50);
  go.addImage(goImage);
  go.scale = .5;
  go.debug = false;
  go.setCollider("rectangle",10,10,355,350);
  gm = createSprite(700,100,50,50);
  gm.addImage(gmImage);
  alienSS = createSprite(51270,200,50,50);
  alienSS.addImage(alienSSImg);
  mip = createSprite(650,100,50,50);
  mip.addImage(mipImg);
  alert1 = createSprite(50070,200,50,50);
  alert1.addImage(alertImage);
  alert1.scale = 0.08
  next = createSprite(1180,350,50,50);
  next.addImage(nextButton);
  next.scale = 0.5;
  next.debug = false;
  next.setCollider("rectangle",0,0,450,100)
  space2 = createSprite(650,200,50,50);
  space2.addImage(spaceBg);
  space2.scale = 0.4
  enter = createSprite(650,360,50,50);
  enter.addImage(enterImg);
  enter.debug = false;
  enter.scale = 0.6;
  enter.setCollider("rectangle",50,-50,350,100)
  bulletsGroup= new Group();
  missileGroup = new Group();
  asteroidGroup = new Group();
  ufoGroup = new Group();
  mGroup = new Group();
  edges = createEdgeSprites();
}

function draw() {
  background("black");
  if(gameState == START){
    mip.visible = false;
    gm.visible = false;
    go.visible = false;
    earth.visible = false;
    jet.visible = false;
    ufo.visible = false;
    space.visible = false;
    space2.visible = true;
    next.visible = false;
    enter.visible = true;
    if(mousePressedOver(enter)){
      gameState = INFO;
    }
  }
  if(gameState == INFO){
    fill("white")
    textSize(30);
    text("Game Controls - ", 50, 50);
    textSize(20)
    text("Press space bar to deploy missiles.", 50, 90);
    text("Press right arrow to deploy explosive missiles.", 50, 120);
    text("Press left arrow to deploy explosive rockets.", 50, 150);
    text("(REMEMBER THE ALIEN SPACESHIP WILL FIRE MISSILES, SEND THIER UFO TO US AND THEN AT LAST THEY WILL SEND THEIR", 50, 180);
    text("MOST POWERFULL UFO. THEIR MISSILES CAN ONLY BE KILLED BY DEPLOYING OUR MISSILES. THEIR UFOs CAN ONLY BE",50, 210);
    text("DESTROYED BY EXPLOSIVE MISSILE. THEIR MOST POWERFULL UFO CAN ONLY BE DESTROYED BY OUR ROCKETS.", 50, 240)
    textSize(25);
    text("We have got a mission and we have to complete it to save earth from aliens",400,50);
    textSize(30);
    text("So be sure to deploy them right at their targates.", 50, 300)

    mip.visible = false;
    enter.visible = false;
    gm.visible = false;
    go.visible = false;
    earth.visible = false;
    jet.visible = false;
    ufo.visible = false;
    space.visible = false;
    next.visible = true;
    space2.visible = false;
    
    if(mousePressedOver(next)){
      gameState = PLAY;
    }

  }
  if(gameState==PLAY){
    enter.visible = false;
    space2.visible = false;
    space.visible = true;
    next.visible = false;
    alienSS.velocityX = -30;
    alert1.velocityX = -30;
    mip.visible = false;
    gm.visible = false;
    go.visible = false;
    earth.visible = true;
    jet.visible = true;
    ufo.visible = true;
    asteroid1();
    ufo2();
    if(mGroup.isTouching(alienSS)){
      alienSS.destroy();
      alienSS.velocityX = 0;
      gameState = WON;
      fill("white");
      text("Mission Passed - WE SAVED EARTH", 650, 200);
    }
    if(gameState === WON){
      enter.visible = false
      space2.visible = false;
      mp.play();
      mip.visible = true;
      mGroup.setVelocityEach(0);
      mGroup.destroyEach();
      asteroidGroup.setVelocityEach(0);
      asteroidGroup.destroyEach();
      ufoGroup.setVelocityEach(0);
      ufoGroup.destroyEach();
      jet.visible = true;
      earth.visible = true;
      ufo.velocityX = 5;
      jet.velocityX = -3;
      jet.changeImage("jet2",je2);
      jet.lifetime = 50;
    }
    if(bulletsGroup.isTouching(asteroidGroup)){
        asteroidGroup.destroyEach();
        bulletsGroup.destroyEach();
        score = score+5;
    }
    if(missileGroup.isTouching(ufoGroup)){
        missileGroup.destroyEach();
        ufoGroup.destroyEach();
        score = score+10;
  }
    if(keyDown("up_arrow")){
        jet.y += -(25 + score/100);
    }  
    if(keyDown("down_arrow")){
        jet.y -= -(25 + score/100);
    }
    if(keyDown("space") && !bulletsGroup[0]){
      mf2.play();
      createBullets();
    }
    if(keyDown("right_arrow") && !missileGroup[0]){
      mf2.play();
      createMissiles();
    }
    if(keyDown("left_arrow")){
    createAirMissile();
    }
    if(alienSS > 1500){
      asteroidGroup.setVelocityEach(0);
      asteroidGroup.visible = false;
      ufoGroup.setVelocityEach(0);
      ufoGroup.visible = false;
    }
    
    fill("white");
    text("Score: "+ score, 650,50);
  }
    if(asteroidGroup.isTouching(earth) || ufoGroup.isTouching(earth)){
      gameState = END;
      mfSound.play();
      mfSound2.play();
    }
    if(gameState === END){
      enter.visible = false
      space2.visible = false;
      gm.visible = true;
      go.visible = true;
      asteroidGroup.setVelocityEach(0);
      asteroidGroup.destroyEach();
      ufoGroup.setVelocityEach(0);
      ufoGroup.destroyEach();
      jet.visible = false;
      earth.visible = false;
      ufo.visible = false;
      if(mousePressedOver(go)){
        reset();
      }
    }
    jet.collide(edges);
    drawSprites();
}
function createBullets() {
  var bullets= createSprite(100, 100, 60, 10);
  bullets.addImage(bulletsImage);
  bullets.x = 200;
  bullets.y=jet.y;
  bullets.velocityX = 20;
  bullets.lifetime = 100;
  bullets.scale = .11;
  // bullets.debug = true
  // bullets.setCollider("rectangle",0,0,100,10)
  bulletsGroup.add(bullets);
  
}
function createMissiles() {
  var missile= createSprite(100, 100, 60, 10);
  missile.addImage(missileImage);
  missile.x = 200;
  missile.y=jet.y;
  missile.velocityX = 20;
  missile.lifetime = 100;
  missile.scale = .08;
  missileGroup.add(missile);
  missile.debug = false;
}
function asteroid1(){
  if (frameCount % 30 ==0 ){
    asteroid = createSprite(1100,random(20,380),40,40);
    asteroid.addImage(astImage);
    asteroid.debug = false;
    asteroid.velocityX = -(15 + score/30);
    asteroid.scale = 0.2;
    asteroidGroup.add(asteroid);
  }
}
function ufo2(){
  if (frameCount % 130 ==0 ){
    ss = createSprite(1100,random(20,380),40,40);
    ss.addImage(ssImage);
    ss.debug = false;
    ss.velocityX = -(20  + score/100);;
    ss.scale = 0.3;
    ss.depth +=5 ;

    ufoGroup.add(ss);
  }
}
function reset(){
  gameState = PLAY;
  score=0;
  alert1.x = 50270;
  alienSS.x = 51270;
 }
function createAirMissile(){
  airM = createSprite(100,100,60,60);
  airM.addImage(airMImg);
  airM.x = 200;
  airM.y = jet.y;
  airM.velocityX = 10;
  airM.lifetime = 100;
  airM.scale = .4;
  mGroup.add(airM);
}