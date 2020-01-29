// clase Person


class Person {

	
  constructor() {
    this.x = 50;
    this.y = 120;
	this.posX = 100;
	this.posY = 300;  
	  
	this.walk = loadAnimation('assets/1.png','assets/2.png');
	this.bend = loadAnimation('assets/3.png');
	  
	this.walk.frameDelay = 20;
	this.bend.frameDelay = 20;  
  }

	
  jump(posY){
	if(this.posY > 0){
		this.posY -= posY; 
	}
	animation(this.walk, this.posX+20, this.posY+50);
	//fill('green');
	//rect(this.posX, this.posY, this.x, this.y);
	
  }	
	
  floor(posY){ 
	if(this.posY < 300){
		this.posY += posY; 
	}
	animation(this.walk, this.posX+20, this.posY+50);
	//fill('green');
	//rect(this.posX, this.posY, this.x, this.y);
  }

  bendDown(y){
	if(this.y > 80){
	 this.y -= y;
	} 
	this.posY = 340;
	this.walk.visible = false; 
	animation(this.bend, this.posX+45, this.posY+25);
	//fill('green');
	//rect(this.posX, this.posY, this.x, this.y);
  }	
	
  bendUp(y){
	if(this.y < 120){
	 this.y += y;
	}
	this.posY = 300;
	this.walk.visible = true;
	animation(this.walk, this.posX+20, this.posY+50);
	//fill('green');
	//rect(this.posX, this.posY, this.x, this.y);
  }	
	
	
}