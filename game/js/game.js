<<<<<<< HEAD
/* Copyright 2012 Daniel Rodriguez Hernandez 

This file is part of StarShip.

    StarShip is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    StarShip is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with StarShip.  If not, see <http://www.gnu.org/licenses/>.
 */

var CONSTANTS = {
	WIDTH : 600,
	LEFT_LIMIT_LAUNCH_ENEMIES : 45,
	RIGHT_LIMIT_LAUNCH_ENEMIES : 600 - 45, // width - left_limit_launch_enemies
	HEIGHT : 600,
	PLAYER_SCORE_INIT : 0,
	PLAYER_LIFES_INIT : 3,
	ENEMY_LIFE : 10,
	SMART_ENEMY_LIFE : 30,
	SHOOT_ENEMY_SPEED : 5,
	SHOOT_ENEMY_OFFSET_HEIGHT : 2,

	MAX_ENEMIES : 7,
	MAX_SMART_ENEMIES : 3,

	SMART_ENEMY_SPEED : 0.25,
	ENEMY_SPEED : 1

};

var GAME_STATUS = {
	GAME_OVER : false,
}

var DIRECTIONS = {
	GO_DOWN : 1,
	GO_UP : -1
};

var COLOURS = {
	RED : '#ff0000',
	GREEN : '#00ff00',
	BLUE : '#0000ff',
	BLACK : '#000000',
	MIDNIGHT_BLUE : '#000033',
	VIOLET : '#4F2F4F'
};

var interfaz = {
	score : null,
	lifes : null,
	playerScore : CONSTANTS.PLAYER_SCORE_INIT,
	playerLifes : CONSTANTS.PLAYER_LIFES_INIT
};

var DEBUG = {
	DEBUG_FLAG : false,
	DEBUG_LAUNCH_ENEMIES : true,
	DEBUG_LAUNCH_SMART_ENEMIES : true,
	DEBUG_SHOOT_ENEMIES : true,
	DEBUG_SHOOT_SMART_ENEMIES : true,
	MAX_ENEMIES_DEBUG : 0,
	MAX_SMART_ENEMIES_DEBUG : 1,
	debugDiv : null,
};

var PLAYER_SHIP = {
	x : 0,
	y : 0
}

function mustShootEnemy(frame) {
	var shoot = false;
	if (DEBUG.DEBUG_FLAG == true && DEBUG.DEBUG_SHOOT_ENEMIES == true) {
		shoot = frame % 100 == 0;
	} else {
		shoot = Crafty.math.randomInt(0, 200) == 2;
	}
	return shoot;
}

function mustShootSmartEnemy(frame, shootX, shootY, playerX, playerY) {
	var shoot = false;
	if (playerY > shootY) {
		if (DEBUG.DEBUG_FLAG == true && DEBUG.DEBUG_SHOOT_SMART_ENEMIES == true) {
			shoot = frame % 50 == 0;
		} else {
			shoot = Crafty.math.randomInt(0, 100) == 2;
		}
	}
	return shoot;
}

function launchEnemy(frame, numEnemy) {
	var launch = false;
	if (DEBUG.DEBUG_FLAG == true) {
		if (DEBUG.DEBUG_LAUNCH_ENEMIES == true) {
			launch = frame % 30 == 0 && numEnemy < DEBUG.MAX_ENEMIES_DEBUG;
		}
	} else {
		launch = frame % 30 == 0 && numEnemy < CONSTANTS.MAX_ENEMIES;
	}
	return launch;
}

function launchSmartEnemy(frame, numEnemy) {
	var launch = false;
	if (DEBUG.DEBUG_FLAG == true) {
		if (DEBUG.DEBUG_LAUNCH_SMART_ENEMIES == true) {
			launch = frame % 30 == 0
					&& numEnemy < DEBUG.MAX_SMART_ENEMIES_DEBUG;
		}
	} else {
		launch = frame % 30 == 0 && numEnemy < CONSTANTS.MAX_SMART_ENEMIES;
	}
	return launch;
}

jQuery(document).ready(function() {
	interfaz.score = jQuery(".score");
	interfaz.lifes = jQuery(".lifes");
	DEBUG.debugDiv = jQuery("#debugCoords");
	Crafty.init(CONSTANTS.WIDTH, CONSTANTS.HEIGHT);
	Crafty.background('#858585');
	Crafty.scene("GameScene");
	Crafty.e("GameLoop");
});
=======
/* *********************************** */
var width=600;
var height=300;
var playerScore = 0;
var playerLifes = 3;

Crafty.init(width,height);
Crafty.background('#858585');

Crafty.c("GameOver",{
	init:function(){
		this.requires("2D,DOM,Text");
		this.attr({x:width/2-35,y:height/2, w:200});
		this.text("Game Over!");
		this.textColor("#ff0000");
		this.textFont({family:'Trebuchet MS', size:'22px'})
	}
});

Crafty.c("Shoot",{
	init:function(){
		this.requires("2D,DOM,Color,Collision");
		this.color("rgb(255,0,0)");
		this.w=2;
		this.h=5;
		this.dX=0;
		this.dY=-2;
	},

	shoot:function(x,y){
		this.x=x;
		this.y=y;
		this.bind("EnterFrame",function(){
			if(this.y==0){
				this.destroy();
			}
			this.x=this.x+this.dX;
			this.y=this.y+this.dY;
		});

	}
});

Crafty.c("Enemy",{
	init:function(){
		this.requires("2D,DOM,Color,Collision");
		this.color("#000000");
		this.attr({x:Crafty.math.randomInt(45,width-45), y:0, w:15, h:15, dX:0, dY:2});

		this.bind("EnterFrame",function(){
			if(this.y==height){
				this.destroy();
				Crafty.trigger("KillLife");
			}

			this.x=this.x+this.dX;
			this.y=this.y+this.dY;
		});

		this.onHit("Shoot",function(){
			var arrayColliding = this.hit("Shoot");
			for(var i=0;i<arrayColliding.length;i++){
				arrayColliding[i].obj.destroy();
			}
			this.destroy();
			Crafty.trigger("GrowScore");
		});

		this.onHit("Ship",function(){
			Crafty.trigger("KillLife");
			this.destroy();
		});
	}
});



Crafty.c("Ship",{
	shipSpeed: 8,
	init:function(){
		this.requires("2D,DOM,Color,Multiway,Keyboard");
		this.color('#00ff33');
		this.attr({x:width/2, y:height-30, w:45, h:15});
		this.multiway(this.shipSpeed,{LEFT_ARROW:180, RIGHT_ARROW:0});
		this.bind('KeyDown',function(){
			if(this.isDown('SPACE')){
				Crafty.e("Shoot").shoot(this.x+this.w/2,this.y);
			}
		});

		this.bind('EnterFrame',function(frame){
			if(this.x<0){
				this.x=0;
			}else if(this.x+this.w>width){
				this.x=width-this.w;
			}

			if(frame.frame%8==0 && this.isDown('SPACE')){
				Crafty.e("Shoot").shoot(this.x+this.w/2,this.y);
			}
		});

	}
});


Crafty.c("GameLoop",{
	init:function(){
		var ship = Crafty.e("Ship");
		var points = Crafty.e("Points");
		this.bind("EnterFrame",function(frame) {
			if(frame.frame%75==0 && Crafty("Enemy").length<8){
				Crafty.e("Enemy");
			}
		});
	}
});



Crafty.scene("GameScene",function(){
	var score = jQuery(".score");
	var lifes = jQuery(".lifes");
	score.text("Score: "+playerScore);
	lifes.text("Lifes: "+playerLifes);

	Crafty.bind("GameOver",function(){
		Crafty("Ship").destroy();
		Crafty.e("GameOver");
	});

	Crafty.bind("GrowScore",function(){
		playerScore+=10;
		score.text("Score: "+playerScore);
	});

	Crafty.bind("KillLife",function(){
		playerLifes-=1;
		if(playerLifes==0){
			Crafty.trigger("GameOver");
		}
		if(playerLifes>=0){
			lifes.text("Lifes: "+playerLifes);
		}
	});
});


Crafty.scene("GameScene");
Crafty.e("GameLoop");

>>>>>>> a848ef431893a5fa59c6372068c987bf55cac5d2
