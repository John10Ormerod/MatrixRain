var symbolSize = 20;
var streams = [] ;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  var x = 0;
  var y = -symbolSize;

  for (var i = 0; i <= width/symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-1000, -symbolSize));
    streams.push(stream);
    x += symbolSize;
  }
  textSize(symbolSize);
}

function draw() {
  //background(0, 255);    //opacity to get blurry effect
  background('rgba(0%,0%,0%,0.4)')
  streams.forEach(function(stream) {
    stream.render();
  });
}

function S_ymbol(x, y, speed, first) {
  this.x = x;
  this.y = y;
  this.value = "";
  this.speed = speed;
  this.switchInterval = round(random(2, 20));
  this.first = first;

  this.setToRandomSymbol = function () {
    if (frameCount % this.switchInterval == 0) {
      this.value = String.fromCharCode(0x30a0 + round(random(0, 96)));
    }
  }; //Katakana

  this.rain = function() {
    if (this.y >= height+symbolSize) {
      this.y = -symbolSize; 
    } else {this.y += this.speed;}
  }
    
}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 30));
  this.speed = random(5, 10);
  
  this.generateSymbols = function (x, y) {
    var first = round(random(0, 4)) == 1; //20 percent
    for (var i = 0; i <= this.totalSymbols; i++) {
      symbol = new S_ymbol(x, y, this.speed, first);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;    // put next symbol one height above the last
      first = false;
    }
  }

  this.render = function () {
    this.symbols.forEach(function(symbol) {    //anonymous function...?
      if (symbol.first) {
        fill(220, 255, 220);
      } else {
        fill(0, 255, 70);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  };


}
