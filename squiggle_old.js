//Hash generator
let tokenData={};
let hashString="0x";
for (let i=0;i<64;i++){
  let val = Math.floor(Math.random().toFixed(3)*255);
  hashString = hashString + val.toString(16);
}
tokenData.hashes=[hashString];

// Start here for upload //

let numHashes = tokenData.hashes.length;

let hashPairs = [];
for (let i = 0; i<numHashes; i++){
  for (let j=0; j<32; j++){
    hashPairs.push(tokenData.hashes[i].slice(2+(j*2), 4+(j*2)));
  }
}

let decPairs = hashPairs.map(x=>{ return parseInt(x,16); });

let color;
let backgroundIndex=0;
let backgroundArray=[null,255,225,200,175,150,125,100,75,50,25,0,25,50,75,100,125,150,175,200,225];
let index=0;
let ht;
let wt=2;
let spread;
let speed=1;
let segments;
let startColor;
let reverse;
let amp = 1;
let direction = 1;
let loops=false;

function setup() {

  createCanvas(windowWidth>windowHeight*3/2?windowHeight*3/2:windowWidth, windowWidth>windowHeight*3/2?windowHeight:windowWidth*2/3);
  var el = document.getElementsByTagName("canvas")[0];
  el.addEventListener("touchstart", mouseClicked, false);
  colorMode(HSB, 255);
  segments = map(decPairs[26],0,255,12,20);
  ht = map(decPairs[27],0,255,3,4);
  spread = decPairs[28]<3?0.5:map(decPairs[28],0,255,5,50);
  startColor = decPairs[29];
  reverse = decPairs[30]<128;
  background(255);

}

function draw() {
  color=0;
 background(255); 
  let slinky = decPairs[31]<25;
  let steps = slinky?50:200;
  let hueOut;
  translate((width/2)-(width/wt/2),height/2);
  for (let j=0;j<segments-2;j++){
    for (let i=0;i<=steps;i++){
      let t = i / steps;
      let x = curvePoint(width/segments/wt*j, width/segments/wt*(j+1), width/segments/wt*(j+2), width/segments/wt*(j+3),t);
      let y = curvePoint(map(decPairs[j],0,255,-height/ht,height/ht)*amp, map(decPairs[j+1],0,255,-height/ht,height/ht)*amp, map(decPairs[j+2],0,255,-height/ht,height/ht)*amp, map(decPairs[j+3],0,255,-height/ht,height/ht)*amp, t);
      let hue = reverse?255-(((color/spread)+startColor+index)%255):(((color/spread)+startColor)+index)%255;
      hueOut=hue;
      if (slinky){
        if (i==0 || i==steps-1){
          fill(hue,255,255);
        } else {
          noFill();
        }
        stroke(hue,255,255);
      } else {
        noStroke();
        fill(hue,255,255);
      }
      circle(x,y,height/13);
      color++;
    }
  }

  loops===true?index=index+speed:index=index;

  if (keyIsDown(RIGHT_ARROW)){
    if(keyIsDown(SHIFT)){
      if (spread<49.8){
        spread=spread+0.2;
      } else {
        spread=50;
      }
    } else {
      if (spread<49.99){
        spread=spread+0.01;
      } else {
        spread=50;
      }
    }
  } else if(keyIsDown(LEFT_ARROW)){
    if(keyIsDown(SHIFT)){
      if(spread>0.2){
        spread=spread-0.2;
      } else {
        spread=0;
      }
    } else {
      if(spread>0.01){
        spread=spread-0.01;
      } else {
        spread=0;
      }
    }
  } else if(keyIsDown(UP_ARROW)){
    if(keyIsDown(SHIFT)){
      if(speed<20){
        speed++;
      } else {
        speed=20;
      }
    } else {
      if(speed<20){
        speed=speed+0.1;
      } else {
        speed=20;
      }
    }
  } else if(keyIsDown(DOWN_ARROW)){
    if(keyIsDown(SHIFT)){
      if (speed>1){
        speed--;
      } else {
        speed=0.1;
      }
    } else {
      if (speed>0.1){
        speed=speed-0.1;
      } else {
        speed=0.1;
      }
    }
  }
}

function keyPressed(){
  if (keyCode === 32) {
    if (backgroundIndex<backgroundArray.length-1){
      backgroundIndex++;
    } else {
      backgroundIndex=0;
    }
  }
}

function mouseClicked(){
  if (loops===false){
    loops=true;
  } else {
    loops=false;
  }
}
