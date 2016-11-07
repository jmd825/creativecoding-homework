// SPIROGRAPH
// http://en.wikipedia.org/wiki/Spirograph
// also (for inspiration):
// http://ensign.editme.com/t43dances
//
// this p5 sketch uses simple transformations to create a
// Spirograph-like effect with interlocking circles (called sines).  
// press the spacebar to switch between tracing and
// showing the underlying geometry.
//
// your tasks:
// (1) tweak the code to change the simulation so that it draws something you like.
// hint: you can change the underlying system, the way it gets traced when you hit the space bar,
// or both.  try to change *both*.  :)
// (2) use p5.sound or tone.js to make the simulation MAKE SOUND.
// hint: the websites for p5.sound and tone.js have lots of examples.
// try and adapt them.
// another hint: javascript isn't super efficient with a large number of audio playing at once.
// see if there's a simple way to get an effective sound, or limit the number of shapes
// you're working with.

var NUMSINES = 10; // how many of these things can we do at once?
var sines = new Array(NUMSINES); // an array to hold all the current angles
var rad; // an initial radius value for the central sine
var i; // a counter variable

// play with these to get a sense of what's going on:
var fund = 0.005; // the speed of the central sine
var ratio = 0.6; // what multiplier for speed is each additional sine?
var alpha = 50; // how opaque is the tracing system

var trace = false; // are we tracing?

var osc1, echo1;
//var sequence = [62, 62, 64, 62, 67, 66, 62, 62, 64, 62, 69, 67, 62, 62, 74, 71, 67, 66, 64, 72, 72, 71, 67, 69, 67]; // MIDI
var sequence = [56, 61, 64, 56, 61, 64, 56, 61, 64, 56, 61, 64, 57, 61, 64, 57, 61, 64, 57, 62, 66,
  57, 62, 66, 56, 60, 64, 56, 61, 64, 56, 61, 63, 53, 60, 63
]; // MIDI

var step = 0; // which note am i playing out of 'sequence'

var thechain = []; // Markov Chain Array

var thecurrentnote;

function setup() {
  createCanvas(800, 600); // OpenGL mode

  rad = height / 3; // compute radius for central circle
  background(255); // clear the screen

  for (i = 0; i < sines.length; i++) {
    sines[i] = PI; // start EVERYBODY facing NORTH
  }

  osc1 = new p5.Oscillator();
  osc1.setType('square');
  osc1.freq(240);
  osc1.amp(0);
  osc1.start();

  echo1 = new p5.Delay();
  // what to echo, time (s), feedback (0-1), damping (freq)
  echo1.process(osc1, 0.25, 0.5, 3000);

  domarkov();
  thecurrentnote = sequence[floor(random(sequence.length))];
}

function draw() {
  if (!trace) {
    //music.play();
    background(0, 0, 0, 10); // clear screen if showing geometry
    stroke(random(255), random(0), random(0), random(255)); //random
    strokeWeight(2);
    noFill(); // don't fill
    //fill(random(200, random(0), random(200), random(200)));

    // add the note to the octave and convert
    osc1.amp(0.2);
    osc1.freq(midiToFreq(thecurrentnote));

    if (frameCount % 15 == 0) {
      var which = picknote(thecurrentnote);
      thecurrentnote = which;
    }
  }

  // MAIN ACTION
  push(); // start a transformation matrix
  translate(width / 2, height / 2); // move to middle of screen

  for (i = 0; i < sines.length; i++) // go through all the sines
  {
    var erad = 0; // radius for small "point" within circle... this is the 'pen' when tracing
    // setup for tracing
    if (trace) {
      stroke(0, 0, 255 * (float(i) / sines.length), alpha); // blue
      fill(0, 0, 255, alpha / 2); // also, um, blue
      erad = 5.0 * (1.0 - float(i) / sines.length); // pen width will be related to which sine
    }
    var radius = rad / (i + 1); // radius for circle itself
    rotate(sines[i]); // rotate circle
    if (!trace) ellipse(0, 0, radius * 2, radius * 2); // if we're simulating, draw the sine
    push(); // go up one level
    translate(0, radius); // move to sine edge
    if (!trace) ellipse(0, 0, 5, 5); // draw a little circle
    if (trace) ellipse(0, 0, erad, erad); // draw with erad if tracing
    pop(); // go down one level
    translate(0, radius); // move into position for next sine
    sines[i] = (sines[i] + (fund + (fund * i * ratio))) % TWO_PI; // update angle based on fundamental
  }

  pop(); // pop down final transformation

}

function keyReleased() {
  if (key == ' ') {
    trace = !trace;
    background(255);
  }
}

function picknote(note) {
  var pick = floor(random(thechain[note].length));
  console.log("chain length is " + thechain[note].length + " for note " + note);
  return (thechain[note][pick]);
}

function domarkov() {
  for (var i = 0; i < sequence.length; i++) {
    var current = sequence[i]; // current note in melody
    var next = sequence[(i + 1) % sequence.length]; // next note in melody
    if (!thechain[current]) // first time we're seeing this note
    {
      thechain[current] = []; // make an array for it in the chain
    }
    // add the next note to the chain
    thechain[current].push(next);
  }
}