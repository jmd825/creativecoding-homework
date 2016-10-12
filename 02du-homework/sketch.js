var mood;
var thefont; 
var img;
var foo = new p5.Speech();
//var sentence;


function preload() {
  mood = loadStrings('./data/mood_love.txt');
  thefont = loadFont('./data/font_02.ttf');
  img = loadImage('./data/love.jpg')

}

function setup() {
  createCanvas(800, 569);
  background(img);
  textFont(thefont);
  console.log(mood);

  // for(var i = 0; i<mood.length; i++){
  //   sentence = mood[i].split(","); 
  // }
  
  // var sentence = split(mood, ",")
  
  // text(sentence[0], 50, 200);
  // text(sentence[1], 50, 200);
  // text(sentence[2], 50, 200);
  // text(sentence[3], 50, 200);

  
  //text(mood, 200, 200);
  
}

function draw() {
  fill(253, 220, 144);
  stroke(183, 35, 21);
  strokeWeight(2);

  textSize(30);
  
  // text(sentence, 60, 420);
  
  // text(mood[0], 65, 100);
  // text(mood[1], 65, 200);
  // text(mood[2], 65, 300);
  // text(mood[3], 65, 400);
  // text(mood[4], 65, 500);
  // text(mood[5], 65, 600);
  
    for(i in mood){ // (for i = 0;i<phrasearray.length;i++)
      fill(random(255), random(255), random(255));
      text(mood[0], 65, 100);
      text(mood[1], 65, 200);
      text(mood[2], 65, 300);
      text(mood[3], 65, 400);
      text(mood[4], 65, 500);
      //text(mood[5], 65, 600);
  }

}
  
  

function mousePressed()
{
  foo.listVoices();
  foo.setVoice('Google 普通话（中国大陆）');
  foo.interrupt = true;
  foo.speak(mood); 
  
}