function Snake(brain) {
    this.x = 300;
    this.y = 250;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];

    this.score = 0;
    this.fitness = 0;
    if(brain) {
        this.brain = brain.copy();
    }else {
        this.brain = new NeuralNetwork(4, 4, 8);
    }


    this.dir = function (x, y) {
        this.score++;
        this.xspeed = x;
        this.yspeed = y;
    }

    this.eat = function(pos) {
        this.score += 5;
        let d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    };

    this.death = function() {
        for (let i = 0; i < this.tail.length; i++) {
            let pos = this.tail[i];
            let d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                this.total = 0;
                this.tail = [];
            }
        }

    };

    this.think = function(food){

        let inputs = [];
        inputs[0] = this.x / width;
        inputs[1] = this.y / height;
        inputs[2] = food.x / width;
        inputs[3] = food.y / height;

        //console.log(inputs);

        let output = this.brain.predict(inputs);
        if(output[0] > output[4]){
            this.dir(0, -1);
        } 
        if(output[1] > output[5]){
            this.dir(0, 1);
        }
        if(output[2] > output[6]){
            this.dir(-1, 0);
        }
        if(output[3] > output[7]){
            this.dir(1, 0);
        }

        //console.log(output)
    }

    this.mutate = function(){
        this.brain.mutate(0.1);
    }

    this.update = function() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        if (this.total >= 1) {
            this.tail[this.total - 1] = createVector(this.x, this.y);
        }
        this.x = this.x + this.xspeed*s;
        this.y = this.y + this.yspeed*s;

        //this.x = constrain(this.x, 0, width-s);
        //this.y = constrain(this.y, 0, height-s);
    }

    this.show = function() {
        fill(124, 252, 0);
        for (let i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, s, s);
        }
        rect(this.x, this.y, s, s)
    }
}