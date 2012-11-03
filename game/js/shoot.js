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

Crafty.c("Shoot", {
	shootSprite : 'disparo2',
	init : function() {
		this.requires("2D,Canvas," + this.shootSprite + ",Collision");
		this.w = 6;
		this.h = 11;
	},

	shoot : function(x, y, speed, movement, colorHex, targetX, targetY) {
		this.x = x;
		this.y = y;
		this.bind("EnterFrame", function() {
			if (this.y <= 0) {
				this.destroy();
			} else if (this.y >= CONSTANTS.HEIGHT) {
				this.destroy();
			}
			/* Calculo de dX y dY para que persiga al player */
			this.y = this.y + (movement * speed);
		});

		if (SOUNDS.active == true) {
			Crafty.trigger("PlaySound", "laserNormal");
		}
	}

});

Crafty.c("ShootEnemy", {
	shootSprite : 'disparo3',
	init : function() {
		this.requires("2D,Canvas," + this.shootSprite + ",Collision");
		this.w = 6;
		this.h = 11;
		/*
		 * this.onHit("Shoot", function() { var arrayColliding =
		 * this.hit("Shoot"); for ( var i = 0; i < arrayColliding.length; i++) {
		 * arrayColliding[i].obj.destroy(); } this.destroy();
		 * 
		 * });
		 */
	},

	shoot : function(x, y, speed, movement, colorHex, targetX, targetY) {
		this.x = x;
		this.y = y;
		this.bind("EnterFrame", function() {
			if (this.y <= 0) {
				this.destroy();
			} else if (this.y >= CONSTANTS.HEIGHT) {
				this.destroy();
			}
			/* Calculo de dX y dY para que persiga al player */
			this.y = this.y + (movement * speed);
		});
		if (SOUNDS.active == true) {
			Crafty.audio.play("laserNormal", 1, 0.8);
		}
	}

});

Crafty.c("ShootSmartEnemy", {
	shootSprite : 'disparo1',
	init : function() {
		this.requires("2D,Canvas," + this.shootSprite + ",Collision");
		this.w = 9;
		this.h = 16;

		/*
		 * this.onHit("Shoot", function() { var arrayColliding =
		 * this.hit("Shoot"); for ( var i = 0; i < arrayColliding.length; i++) {
		 * arrayColliding[i].obj.destroy(); } this.destroy(); });
		 */
	},

	shoot : function(x, y, speed, movement, colorHex, targetX, targetY) {
		this.x = x; /* Coordenada X del disparo */
		this.y = y; /* Coordenada Y del disparo */

		this.targetX = targetX; /* Coordenada X del objetivo */
		this.targetY = targetY; /* Coordenada Y del objetivo */

		this.diffX = this.targetX - this.x /* Vector en X */
		this.diffY = this.targetY - this.y /* Vector en Y */

		this.bind("EnterFrame", function() {
			/*
			 * var string = '<div class="debugRow">X: ' + this.x + '</div>';
			 * DEBUG.debugDiv.append(string);
			 */

			/*
			 * Vector de la longitud que tiene que recorrer el disparo para
			 * alcanzar al objetivo
			 */
			this.length = Math.sqrt(this.diffX * this.diffX + this.diffY
					* this.diffY);

			/*
			 * Coordenadas del vector en X normalizado
			 */
			this.normalizedX = this.diffX / this.length;
			/*
			 * Coordenadas del vector en Y normalizado
			 */
			this.normalizedY = this.diffY / this.length;

			this.normalizedX = this.x + this.normalizedX * speed;
			this.normalizedY = this.y + this.normalizedY * speed;

			this.x = this.normalizedX;
			this.y = this.normalizedY;

			if (this.x >= CONSTANTS.WIDTH || this.x <= 0
					|| this.y >= CONSTANTS.HEIGHT || this.y <= 0) {
				this.destroy();
			}

		});

		if (SOUNDS.active == true) {
			Crafty.audio.play("laserBig", 1, 0.8);
		}
	}
});