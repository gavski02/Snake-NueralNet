function nextGeneration(food) {
	calculateFitness(food);

	for (let i = 0; i < TOTAL; i++) {
		snakes[i] = pickOne() 
	}

	savedSnakes = [];
	console.log('NEXT GEN')
}

function pickOne() {
	let index = 0;
	let r = random(1);

	while (r > 0) {
		r = r - savedSnakes[index].fitness;
		index++
	}
	index--

	let snake = savedSnakes[index];
	let child = new Snake(snake.brain);
	//child.mutate();
	return child
}

function calculateFitness(pos) {
	let sum = 0;
	for (let snake of savedSnakes) {
		sum += snake.score;
	}
	for (let snake of savedSnakes) {
		let d = 0;
		let closest;
		for (let i = 0; i < savedSnakes.length; i++){
			d = int(dist(savedSnakes[i].x, savedSnakes[i].y, pos.x, pos.y))
			if(this.d > d){
				closest = savedSnakes[i];
			}
		}
		snake.fitness = snake.score / sum;
	}
}