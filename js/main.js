let snake;
let s = 10;
let food;

function setup() {
    w = floor(640/s);
    h = floor(480/s);
    createCanvas(w*s, h*s);
    snake = new Snake();
    frameRate(7);
    pickLocation();
}


function draw() {
    background(40);

    if (snake.eat(food)) {
        pickLocation();
    }

    snake.death();
    snake.update();
    snake.show();

    fill(255, 0, 100);
    rect(food.x, food.y, s, s);
}

function keyPressed() {
    if (keyCode == 87) {
        snake.dir(0,-1);
    }
    else if (keyCode == 83) {
        snake.dir(0, 1);
    }
    else if (keyCode == 65) {
        snake.dir(-1, 0);
    }
    else if (keyCode == 68) {
        snake.dir(1, 0);
    }
}

function pickLocation() {
  let cols = floor(width/s);
  let rows = floor(height/s);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(s);
}




