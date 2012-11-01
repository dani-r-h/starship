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
	init : function() {
		this.requires("2D,DOM,Color,Collision");
		this.w = 4;
		this.h = 5;
	},

	shoot : function(x, y, speed, movement, colorHex, targetX, targetY) {
		this.x = x;
		this.y = y;
		this.color(colorHex);
		this.bind("EnterFrame", function() {
			if (this.y <= 0) {
				this.destroy();
			} else if (this.y >= CONSTANTS.HEIGHT) {
				this.destroy();
			}
			/* Calculo de dX y dY para que persiga al player */
			this.y = this.y + (movement * speed);
		});
	}

});

Crafty.c("ShootEnemy", {
	init : function() {
		this.requires("2D,DOM,Color,Collision");
		this.w = 4;
		this.h = 5;
		this.onHit("Shoot", function() {
			var arrayColliding = this.hit("Shoot");
			for ( var i = 0; i < arrayColliding.length; i++) {
				arrayColliding[i].obj.destroy();
			}
			this.destroy();

		});
	},

	shoot : function(x, y, speed, movement, colorHex, targetX, targetY) {
		this.x = x;
		this.y = y;
		this.color(colorHex);
		this.bind("EnterFrame", function() {
			if (this.y <= 0) {
				this.destroy();
			} else if (this.y >= CONSTANTS.HEIGHT) {
				this.destroy();
			}
			/* Calculo de dX y dY para que persiga al player */
			this.y = this.y + (movement * speed);
		});
	}

});

Crafty.c("ShootSmartEnemy", {
	init : function() {
		this.requires("2D,DOM,Color,Collision");
		this.w = 5;
		this.h = 6;

		this.onHit("Shoot", function() {
			var arrayColliding = this.hit("Shoot");
			for ( var i = 0; i < arrayColliding.length; i++) {
				arrayColliding[i].obj.destroy();
			}
			this.destroy();
		});
	},

	shoot : function(x, y, speed, movement, colorHex, targetX, targetY) {
		this.x = x; /* Coordenada X del disparo */
		this.y = y; /* Coordenada Y del disparo */

		this.targetX = targetX; /* Coordenada X del objetivo */
		this.targetY = targetY; /* Coordenada Y del objetivo */

		this.diffX = this.targetX - this.x /* Vector en X */
		this.diffY = this.targetY - this.y /* Vector en Y */

		this.color(colorHex);
		this.bind("EnterFrame", function() {
			/*var string = '<div class="debugRow">X: ' + this.x + '</div>';
			DEBUG.debugDiv.append(string);*/

			
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
	}
});