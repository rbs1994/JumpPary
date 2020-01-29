let person;
let object;
var interval;
var tempsActual;
var tempsAnterior;
var Obstacles = [];
var divPuntos;
let img;
let img2;

var ACTION;


let FLOOR = 1;
let JUMP = 2;
let BEND = 3;
let BENDUP = 4;

var points;

var play;
var gameOver;

var midiInterval;
var midiVel;


function preload() {
	img = loadImage('assets/floor.jpg');
	img2 = loadImage('assets/background.jpg');
	

  	jumpMusic = loadSound('assets/Jump.mp3');
	backgroundMusic = loadSound('assets/backgroundMusic.wav');


}

function setup() { 
/*Funció per inicialitzar les variables de l'audio i crear el canvas.*/
    var canvas = createCanvas (700,500);
	//canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
	canvas.parent('canvas');
	person = new Person();
	midiInterval = 2500;
	midiVel = 7;
	tempsAnterior = 0;
	ACTION = 1;
	
	backgroundMusic.play();
	
	play = false;
	gameOver = false;
	
	
	canvas.style('left','0%');
	canvas.style('top','10%');
	canvas.style('z-index','3');
	canvas.style('position','relative');
	
	
	divPuntos = createDiv();
	divPuntos.style('left','0%');
	divPuntos.style('top','0%');
	divPuntos.style('z-index','3');
	divPuntos.style('position','relative');
	divPuntos.style('font-family','DiseaseInvader');
	divPuntos.style('color','white');
	divPuntos.style('font-size', '40px');
	
	divPuntos.parent('container_info');
	
	playButton = createButton('PLAY!');
    //playButton.position(675, 500);
	playButton.style('left','10%');
	playButton.style('top','50%');
	playButton.style('position','relative');
    playButton.mousePressed(buttonPlay);
	playButton.style('font-size', '40px');
	playButton.style('font-family','DiseaseInvader');
	
	retryButton = createButton('REPLAY!');
    //retryButton.position(675, 500);
	retryButton.style('left','10%');
	retryButton.style('top','50%');
	retryButton.style('position','relative');
    retryButton.mousePressed(buttonRetry);
	retryButton.style('font-size', '40px');
	retryButton.style('visibility', 'hidden');
	retryButton.style('font-family','DiseaseInvader');
	
	playButton.parent('container_ctrl');
	retryButton.parent('container_ctrl');
	
	points = 0;
	
	
}

function draw(){
	
	image(img2, 0, 0,700,500);
	checkCollisions();
	//image(img, 0, 400,700,200);
	if(play){
		midiFunctions();
		playButton.style('visibility', 'hidden');
		retryButton.style('visibility', 'hidden');
		CrearObstacles();
		moureObstacles();
		

		if (ACTION == FLOOR){
			jumpMusic.pause();
			person.floor(10);
		}else if(ACTION == JUMP){
			jumpMusic.play();
			person.jump(10);
		}else if (ACTION == BEND){
			person.bendDown(4);
		}else if(ACTION == BENDUP){
			person.bendUp(4);
		}
	}else if(gameOver){
		retryButton.style('visibility', 'visible');
	}
	
	var text = 'Points: ';
	text = text + points;
	divPuntos.html(text);
}

function CrearObstacles(){
	tempsActual = millis();
	
	if((tempsActual - tempsAnterior) >= midiInterval){
	    Obstacles.push(new Obstacle());
		tempsAnterior = tempsActual;
	}
	
}

function moureObstacles(){
	for (var i = 0; i < Obstacles.length; i++){
		Obstacles[i].move(midiVel);
	}
}

function checkCollisions(){

	// Comprovar colisio d'Obstacle amb el Person.
	for(var i=0;i<Obstacles.length;i++){
		if(((Obstacles[i].posX <= (person.posX + person.x)) && (Obstacles[i].posX >= (person.posX))) ||
		  (((Obstacles[i].posX+Obstacles[i].x) <= (person.posX + person.x)) && ((Obstacles[i].posX+ Obstacles[i].x) >= person.posX))){
			console.log('1');
			if(((person.posY >= Obstacles[i].posY) && (person.posY <= (Obstacles[i].posY+Obstacles[i].y))) || ((Obstacles[i].posY >= person.posY) && (Obstacles[i].posY <= (person.posY+person.y)))){
			   console.log('mort');
			   gameOver = true;
			   play = false;
			   Obstacles = [];
			}
		}
		if(!gameOver){
			if((Obstacles[i].posX < 0) && (Obstacles[i].destroy == 0)){
				points += 1;
				console.log('points');
				Obstacles[i].destroy = 1;
			}
		}
	}
}


function keyReleased(){
	if(keyCode == LEFT_ARROW){
		ACTION = JUMP;
	}
	if(keyCode == RIGHT_ARROW){
		ACTION = BENDUP;
	}
}

function keyPressed(){
	if(keyCode == LEFT_ARROW){
		ACTION = FLOOR;
	}
	if(keyCode == RIGHT_ARROW){
		ACTION = BEND;
	}
}

function buttonPlay(){
	play = true;
	gameOver = false;
}

function buttonRetry(){
	play = true;
	gameOver = false;
	points = 0;
}


function midiFunctions(){
/*Funció per llegir els valors que ens entran per el MIDI.*/
	
	//Inicialitzem la variable de conexió amb el MIDI.
	inputMidi = p5.midi.onInput();
	
	//Si tenim un MIDI connectat.
  	if(inputMidi != null){
  		console.log(inputMidi.data); 
		
		// Si movem l'SLIDER 1, canviem l'strokeWeight del contorn del llop.
        if(inputMidi.data[1] == 0){
            midiVel = map(inputMidi.data[2],0,127,7,15);
        }
		// Si movem l'SLIDER 2, fem la llengua mes llarga i canviem la frequencia del so de l'Oscilador.
        if(inputMidi.data[1] == 1){
            midiInterval = map(inputMidi.data[2],0,127,2500,500);
        }
		
		
	}
	
}
	
	








