/*
 * Copyright 2012 Daniel Rodriguez Hernandez
 * 
 * This file is part of StarShip.
 * 
 * StarShip is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 * 
 * StarShip is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along with
 * StarShip. If not, see <http://www.gnu.org/licenses/>.
 */

Crafty.c("PowerUpDoubleShoot", {
	init : function() {
		this.requires("2D,DOM,Color,Collision");
		this.color(COLOURS.PINK);
		this.attr({
			w : 10,
			h : 10
		});

		/* Coordenada X de salida del PowerUp */
		this.x = selectBetweenNumber(0, CONSTANTS.WIDTH - this.w);

		/* Coordenada Y de salida del PowerUp */
		this.y = Crafty.math.randomInt(CONSTANTS.HEIGHT / 2,
				3 * CONSTANTS.HEIGHT / 4);

		/* Coordenada X del objetivo del PowerUp */
		this.targetX = Crafty.math.randomInt(CONSTANTS.WIDTH / 4,
				3 * CONSTANTS.WIDTH / 4);

		/* Coordenada Y del objetivo del PowerUp */
		this.targetY = Crafty.math.randomInt(CONSTANTS.HEIGHT / 4,
				3 * CONSTANTS.HEIGHT / 4);

		this.bind("EnterFrame",
				function(frame) {

					this.diffX = this.targetX - this.x; /* Vector en X */
					this.diffY = this.targetY - this.y; /* Vector en Y */

					if (this.diffX != 0 && this.diffY != 0) {
						/*
						 * Vector de la longitud que tiene que recorrer el
						 * disparo para alcanzar al objetivo
						 */
						this.length = Math.sqrt(this.diffX * this.diffX
								+ this.diffY * this.diffY);

						/*
						 * Coordenadas del vector en X normalizado
						 */
						this.normalizedX = this.diffX / this.length;
						/*
						 * Coordenadas del vector en Y normalizado
						 */
						this.normalizedY = this.diffY / this.length;

						this.normalizedX = this.x + this.normalizedX
								* CONSTANTS.POWERUP_SPEED;
						this.normalizedY = this.y + this.normalizedY
								* CONSTANTS.POWERUP_SPEED;

						if (hasTargetReached(this.x, this.targetX,
								this.normalizedX)) {
							this.normalizedX = this.targetX;
						}

						if (hasTargetReached(this.y, this.targetY,
								this.normalizedY)) {
							this.normalizedY = this.targetY;
						}

						this.x = this.normalizedX;
						this.y = this.normalizedY;

					}

					/* Timer para el powerup */
					if (this.diffX == 0 && this.diffY == 0) {
						this.frameActual = frame.frame;
						if (this.frameObjetivo == null) {
							this.frameObjetivo = frame.frame
									+ CONSTANTS.TIMER_POWERUPS;
						}

						if (this.frameObjetivo - this.frameActual <= 0) {
							this.destroy();
						}
					}

					if (this.x >= CONSTANTS.WIDTH || this.x <= 0
							|| this.y >= CONSTANTS.HEIGHT || this.y <= 0) {
						this.destroy();
					}

				});

	}
})