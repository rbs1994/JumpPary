// clase Obstacle
class Obstacle {
  constructor() {
    this.x = 50;
    this.y = 20;
	this.posX = 720;
	this.posY = random(280,380);
	this.destroy = 0;
	  
	this.bala = loadAnimation('assets/bala.png');
  }
	
  move(posX){
	this.posX -= posX;   
	 
	//stroke(143, 141, 9); 
	//fill(143, 141, 9);  
	animation(this.bala, this.posX+22, this.posY+10);  
    //rect(this.posX, this.posY, this.x, this.y);  
  }	
}