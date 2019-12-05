const TOTAL = 100;
let snakes = [];
let savedSnakes = [];
let s = 10;
let food;

function setup() {
    w = floor(640/s);
    h = floor(480/s);
    createCanvas(w*s, h*s);
    for (let i = 0; i < TOTAL; i++){
        snakes[i] = new Snake();
    }
    frameRate(20);
    pickLocation();
}


function draw() {
    background(40);

    for (let snake of snakes) {
        snake.death();
        snake.think(food);
        snake.update();
        snake.show();

        if(snake.x > w-1 || snake.x < 0 || snake.y > h-1 || snake.y < 0) {
            savedSnakes.push(snakes.splice(snakes.indexOf(snake), 1)[0]);
        } 

        if (snake.eat(food)) {
            pickLocation();
        }
    }

    if (snakes.length == 0){
        nextGeneration(food);
        pickLocation();
    }

    fill(255, 0, 100);
    rect(food.x, food.y, s, s);
}

//function keyPressed() {
//    if (keyCode == 87) {
//        snake.dir(0,-1);
//    }
//    else if (keyCode == 83) {
//        snake.dir(0, 1);
//    }
//    else if (keyCode == 65) {
//        snake.dir(-1, 0);
//    }
//    else if (keyCode == 68) {
//        snake.dir(1, 0);
//    }
//}

function pickLocation() {
  let cols = floor(width/s);
  let rows = floor(height/s);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(s);
}




