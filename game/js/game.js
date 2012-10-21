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

