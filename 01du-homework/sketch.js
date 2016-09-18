var x = 0; 
var y = 0; 

var r, g, b;

//var slider;

function setup() {
  createCanvas(800, 600);
  background(0);
  x = random(width);
  y = random(height);
  
  r=random(255);
  g=random(255);
  b=random(255);
  
  //colorMode(HSB, 255);
  //slider = createSlider(0, 255, 100);
}

function draw() {
  //stroke(slider.value(), 255, 255);
  //fill(slider.value(), 255, 255, 127);
  //ellipse(360, 200, 200, 200);
  
  strokeWeight(random(1, 200));
  //stroke(random(255, 255), random(100, 255), random(100, 255));
  stroke(r, g, b);
  fill(r, g, b, 255);
  ellipse(x, y, 5, 5);
  
  
  // brownian motion - drunk behavior
  var dx = mouseX-x;
  var dy = mouseY-y;
  x = x + random(0, 0.2)*dx + random(-10, 10);
  y = y + random(0, 0.2)*dy + random(-10, 10);
  
  if(x>width) 
    x = 0;
  if(y>height) 
    y = 0;
  if(x<0) 
    x=width;
  if(y<0) 
    y=height;
}


function mousePressed()
{
  background(0);
  x = random(width);
  y = random(height);
}

function keyPressed(){
  var d = dist(mouseX, mouseY, x, y);
    if (d < x) {
    // Pick new random color values
      r = random(255);
      g = random(255);
      b = random(255);
}
}





