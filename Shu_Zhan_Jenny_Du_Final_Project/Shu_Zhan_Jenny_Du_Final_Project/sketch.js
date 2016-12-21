var cam;
var friends;
var fontTitle, font;
var music, sound;

var wallTop, wallLeft, wallRight;
var bgimage;

var newjenny, newdavid, newteresa, newmichelle, newmarry;

var start;
var gameOver;

var score;
var finalscore;
var firstframeofendinggame = true;

var timestamp = 0;
var now = 0;

var MAX_SPEED = 5;

var capture; // this is the camera
var picture;


///////////////////////PRELOAD//////////////////////////////////
function preload() {
  fontTitle = loadFont('./data/font5.ttf');
  font = loadFont('./data/font8.ttf');
  music = loadSound('./data/music.mp3');
  sound = loadSound('./data/bounce.wav');
  bgimage = loadImage('./img/bg_new.jpg');
  picture = loadImage('./data/picture2.png');
}

///////////////////////SETUP////////////////////////////////////
function setup() {
  timestamp = millis();
  music.setVolume(0.1);
  music.play();

  createCanvas(800, 600);
  capture = createCapture(VIDEO);
  friends = new Group();
  var bd = 2.5;

  cam = createSprite(random(0, width), random(0, height));
  cam.addImage(picture);

  cam.setCollider("circle", 0, 0, cam.width / bd, cam.height / bd);

  ///////////////////////IMMOVABLE WALLS///////////////////////
  //TOP WALLS
  wallTop = createSprite(width / 2, 0, width, 30);
  wallTop.immovable = true; // don't move

  //LEFT WALLS
  wallLeft = createSprite(0, height / 2, 30, height);
  wallLeft.immovable = true; // don't move

  //RIGHT WALLS
  wallRight = createSprite(width, height / 2, 30, height);
  wallRight.immovable = true; // don't move

  //DAVID SPRITE
  newdavid = createSprite(random(0, width), random(0, height), 75, 75);
  newdavid.addAnimation("floating", "./img/david.png");
  newdavid.rotationSpeed = -1;
  newdavid.setSpeed(random(2, 3), random(0, 360));
  newdavid.scale = random(1, 1.5);
  newdavid.mass = newdavid.scale;
  newdavid.setCollider("circle", 0, 0, newdavid.width / bd, newdavid.height / bd);
  newdavid.addToGroup(friends);

  //JENNY SPRITE
  newjenny = createSprite(random(0, width), random(0, height), 75, 75);
  newjenny.addAnimation("floating", "./img/jenny.png");
  newjenny.rotationSpeed = -1;
  newjenny.setSpeed(random(2, 3), random(0, 360));
  newjenny.scale = random(1, 1.5);
  newjenny.mass = newjenny.scale;
  newjenny.setCollider("circle", 0, 0, newjenny.width / bd, newjenny.height / bd);
  newjenny.addToGroup(friends);

  //MICHELLE SPRITE
  newmichelle = createSprite(random(0, width), random(0, height), 75, 75);
  newmichelle.addAnimation("floating", "./img/michelle.png");
  newmichelle.rotationSpeed = -2;
  newmichelle.setCollider("circle", -2, 2, 55);
  newmichelle.setSpeed(random(4, 5), random(0, 360));
  newmichelle.scale = random(1, 1.5);
  newmichelle.mass = newmichelle.scale;
  newmichelle.setCollider("circle", 0, 0, newmichelle.width / bd, newmichelle.height / bd);
  newmichelle.addToGroup(friends);

  //TERESA SPRITE
  newteresa = createSprite(random(0, width), random(0, height), 75, 75);
  newteresa.addAnimation("floating", "./img/teresa.png");
  newteresa.rotationSpeed = -2;
  newteresa.setSpeed(random(2, 3), random(0, 360));
  newteresa.scale = random(1, 1.5);
  newteresa.mass = newteresa.scale;
  newteresa.setCollider("circle", 0, 0, newteresa.width / bd, newteresa.height / bd);
  newteresa.addToGroup(friends);

  //MARRY SPRITE
  newmarry = createSprite(random(0, width), random(0, height), 75, 75);
  newmarry.addAnimation("floating", "./img/marry.png");
  newmarry.rotationSpeed = -2;
  newmarry.setSpeed(random(2, 3), random(0, 360));
  newmarry.scale = random(1, 1.5);
  newmarry.mass = newmarry.scale;
  newmarry.setCollider("circle", 0, 0, newmarry.width / bd, newmarry.height / bd);
  newmarry.addToGroup(friends);

  capture.remove();


  ///////////////////////TEST WHETHER THE GAME ENDS///////////////////////
  // firstframeofendinggame = true;

}

///////////////////////DRAW//////////////////////////////////////////////
function draw() {
  now = millis() - timestamp;

  image(bgimage, 0, 0, width, height);

  startGame();

  //background(255,255,255); 
  cam.position.x = mouseX;
  cam.position.y = mouseY;

  //WALL BOUNCE
  friends.bounce(wallTop);
  //friends.bounce(wallBottom);
  friends.bounce(wallLeft);
  friends.bounce(wallRight);

  // if(wallTop.bounce(friends)){
  //       sound.setVolume(5);
  //       sound.play();
  // }
  //PEOPLE BOUNCE
  friends.bounce(friends);
  friends.bounce(cam);

  //DAVID BOUNCE
  if (newdavid.bounce(cam)) {
    //var swing = (newdavid.position.x-cam.position.x)/3;
    newdavid.setSpeed(MAX_SPEED, cam.getDirection());
    sound.setVolume(5);
    sound.play();
  }

  //MICHELLE BOUNCE
  if (newmichelle.bounce(cam)) {
    //  var swing1 = (newmichelle.position.x-cam.position.x)/3;
    newmichelle.setSpeed(MAX_SPEED, cam.getDirection());
    sound.setVolume(5);
    sound.play();
  }

  //TERESA BOUNCE
  if (newteresa.bounce(cam)) {
    //  var swing2 = (newteresa.position.x-cam.position.x)/3;
    newteresa.setSpeed(MAX_SPEED, cam.getDirection());
    sound.setVolume(5);
    sound.play();
  }

  //MARRY BOUNCE
  if (newmarry.bounce(cam)) {
    //  var swing3 = (newmarry.position.x-cam.position.x)/3;
    newmarry.setSpeed(MAX_SPEED, cam.getDirection());
    sound.setVolume(5);
    sound.play();
  }


  //JENNY BOUNCE
  if (newjenny.bounce(cam)) {
    //  var swing4 = (newjenny.position.x-cam.position.x)/3;
    newjenny.setSpeed(MAX_SPEED, cam.getDirection());
    sound.setVolume(5);
    sound.play();
  }


  ///////////////////////TO LET THE BALLS BOUNCE IN OTHER WAYS ///////////////////////

  //DAVID BOUNCE AGAINST FRIENDS  
  // if (newdavid.bounce(newmichelle)) {
  //   sound.setVolume(5);
  //   sound.play();
  // }

  // if (newdavid.bounce(newteresa)) {
  //   sound.setVolume(5);
  //   sound.play();
  // }

  // if (newdavid.bounce(newjenny)) {
  //   sound.setVolume(5);
  //   sound.play();
  // }

  // if (newdavid.bounce(newmarry)) {
  //   sound.setVolume(5);
  //   sound.play();
  // }

  // //JENNY BOUNCE
  // if (newjenny.bounce(cam)) {
  //   //  var swing4 = (newjenny.position.x-cam.position.x)/3;
  //   newjenny.setSpeed(MAX_SPEED, cam.getDirection());
  //   sound.setVolume(5);
  //   sound.play();
  // }

  // //MICHELLE BOUNCE
  // if (newmichelle.bounce(cam)) {
  //   //  var swing1 = (newmichelle.position.x-cam.position.x)/3;
  //   newmichelle.setSpeed(MAX_SPEED, cam.getDirection());
  //   sound.setVolume(5);
  //   sound.play();
  // }

  //MICHELLE BOUNCE AGAINST FRIENDS  
  // if (newmichelle.bounce(newdavid)) {
  //   sound.setVolume(5);
  //   sound.play();
  // }

  // if (newmichelle.bounce(newteresa)) {
  //   sound.setVolume(5);
  //   sound.play();
  // }

  // if (newmichelle.bounce(newjenny)) {
  //   sound.setVolume(5);
  //   sound.play();
  // }

  // if (newmichelle.bounce(newmarry)) {
  //   sound.setVolume(5);
  //   sound.play();
  // }

  // //TERESA BOUNCE
  // if (newteresa.bounce(cam)) {
  //   //  var swing2 = (newteresa.position.x-cam.position.x)/3;
  //   newteresa.setSpeed(MAX_SPEED, cam.getDirection());
  //   sound.setVolume(5);
  //   sound.play();
  // }

  //TERESA BOUNCE AGAINST FRIENDS  
  // if (newteresa.bounce(newdavid)) {
  //   sound.setVolume(5);
  //   sound.play();
  // }

  // if (newteresa.bounce(newmichelle)) {
  //   sound.setVolume(5);
  //   sound.play();
  // }

  // if (newteresa.bounce(newjenny)) {
  //   sound.setVolume(5);
  //   sound.play();
  // }

  // if (newteresa.bounce(newmarry)) {
  //   sound.setVolume(5);
  //   sound.play();
  // }

  // //MARRY BOUNCE
  // if (newmarry.bounce(cam)) {
  //   //  var swing3 = (newmarry.position.x-cam.position.x)/3;
  //   newmarry.setSpeed(MAX_SPEED, cam.getDirection());
  //   sound.setVolume(5);
  //   sound.play();
  // }

  //MARRY BOUNCE AGAINST FRIENDS  
  // if (newmarry.bounce(newdavid)) {
  //   sound.setVolume(5);
  //   sound.play();
  // }

  // if (newmarry.bounce(newmichelle)) {
  //   sound.setVolume(5);
  //   sound.play();
  // }

  // if (newmarry.bounce(newteresa)) {
  //   sound.setVolume(5);
  //   sound.play();
  // }

  // if (newmarry.bounce(newjenny)) {
  //   sound.setVolume(5);
  //   sound.play();
  // }

  // //JENNY BOUNCE
  // if (newjenny.bounce(cam)) {
  //   //  var swing4 = (newjenny.position.x-cam.position.x)/3;
  //   newjenny.setSpeed(MAX_SPEED, cam.getDirection());
  //   sound.setVolume(5);
  //   sound.play();
  // }

  //JENNY BOUNCE AGAINST FRIENDS  
  // if (newjenny.bounce(newdavid)) {
  //   sound.setVolume(5);
  //   sound.play();
  // }

  // if (newjenny.bounce(newmichelle)) {
  //   sound.setVolume(5);
  //   sound.play();
  // }

  // if (newjenny.bounce(newteresa)) {
  //   sound.setVolume(5);
  //   sound.play();
  // }

  // if (newjenny.bounce(newmarry)) {
  //   sound.setVolume(5);
  //   sound.play();
  // }
  
  
  /////////////////////////////////////////////////////////////////////////////////

  //SHOW LIVES LEFT  
  fill(255);
  textSize(30);
  textFont(fontTitle);
  text("Lives: " + (friends.length - 3), 70, 70);


  ///////////////////////TIMER///////////////////////////////////////////
  score = parseInt(now / 1000);
  text("Score: " + score, 725, 70);

  // console.log(score);///this is the score////

  ///////////////////////HOW TO END THE GAME/////////////////////////////////////////
  for (var i = 0; i < friends.length; i++) {
    if (friends[i].position.x > width) friends[i].position.x = width;
    if (friends[i].position.x < 0) friends[i].position.x = 0;
    if (friends[i].position.y < 0) friends[i].position.y = 0;
    if (friends[i].position.y > height) {

      // kill the friend here
      friends[i].remove();
    }
  }

  //END GAME 
  if (friends.length < 4) {
    endGame();
  }

  drawSprites();

  if (capture) {
    var x = cam.position.x;
    var y = cam.position.y;
    var w = cam.width;
    var h = cam.height;
    image(capture, (x - w / 3) - 10, (y - h / 3) - 7, w / 1.2, h / 1.2);
  }
}


/////////////////////////////START GAME////////////////////////////////////
function startGame() {
  gameOver = false;
  //start = true;
  // console.log("START GAME IS RUNNING");// to test whether the game is running 

  textAlign(CENTER);
  textFont(fontTitle);
  textSize(70);
  fill(255);
  text("Don't Let Your Friends Die!", camera.position.x, camera.position.y - 150);
  textSize(30);
  fill(255);
  text("Press Any Key to Restart at Anytime", camera.position.x, camera.position.y - 100);

}


///////////////////////END GAME/////////////////////////////////////////
function endGame() {
  if (firstframeofendinggame) {
    finalscore = score;
    firstframeofendinggame = false;
  }
  gameOver = true;

  background(0);
  fill(255);
  textAlign(CENTER);
  textSize(120);
  textFont(fontTitle);
  text("GAME OVER", camera.position.x, camera.position.y);
  textFont(fontTitle);
  textSize(50);
  fill(255);
  text("Click Anywhere to Restart the Game", camera.position.x, camera.position.y + 60);
  textSize(40);
  text("Score: " + finalscore, camera.position.x, camera.position.y + 105);

}

///////////////////////MOUSECLICK - RESTART/////////////////////////////////
function mouseClicked() {
  if (gameOver) {
    friends.removeSprites();
    cam.remove();

    music.stop();
    music.play();

    //gameOver = false;
    setup();
    //timestamp = millis();
  }
}


///////////////////////ANY KEY PRESSED - RESTART/////////////////////////////////
function keyPressed() {
  friends.removeSprites();
  cam.remove();

  music.stop();
  music.play();

  gameOver = false;
  setup();
}

function print() {

}