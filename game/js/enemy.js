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

Crafty.c("Enemy", {
	armor : 0,
	init : function() {
		this.armor = CONSTANTS.ENEMY_LIFE;
		this.requires("2D,DOM,Color,Collision");
		this.color(COLOURS.BLACK);
		this.attr({
			x : Crafty.math.randomInt(CONSTANTS.LEFT_LIMIT_LAUNCH_ENEMIES,
					CONSTANTS.RIGHT_LIMIT_LAUNCH_ENEMIES),
			y : 0,
			w : 15,
			h : 15,
			dX : 0,
			dY : CONSTANTS.ENEMY_SPEED
		});

		this.bind("EnterFrame",
				function(frame) {
					if (this.y == CONSTANTS.HEIGHT) {
						this.destroy();

						if (DEBUG.DEBUG_FLAG != true
								&& GAME_STATUS.GAME_OVER == false) {
							Crafty.trigger("DownScore", CONSTANTS.ENEMY_LIFE);
						}

					}
					this.x = this.x + this.dX;
					this.y = this.y + this.dY;

					if (mustShootEnemy(frame.frame)) {
						Crafty.e("ShootEnemy").shoot(
								this.x + this.w / 2,
								this.y + this.h
										+ CONSTANTS.SHOOT_ENEMY_OFFSET_HEIGHT,
								CONSTANTS.SHOOT_ENEMY_SPEED,
								DIRECTIONS.GO_DOWN, COLOURS.BLUE);
					}
				});

		this.onHit("Shoot", function() {
			var arrayColliding = this.hit("Shoot");
			for ( var i = 0; i < arrayColliding.length; i++) {
				arrayColliding[i].obj.destroy();
			}

			this.armor -= 10;
			if (this.armor <= 0) {
				this.destroy();
				Crafty.trigger("GrowScore", CONSTANTS.ENEMY_LIFE);
			}

		});

		this.onHit("Ship", function() {
			if (DEBUG.DEBUG_FLAG != true) {
				Crafty.trigger("KillLife");
			}
			this.destroy();
		});
	}
});

Crafty.c("SmartEnemy", {
	armor : 0,
	init : function() {
		this.armor = CONSTANTS.SMART_ENEMY_LIFE;
		this.requires("2D,DOM,Color,Collision");
		this.color(COLOURS.VIOLET);
		this.attr({
			x : Crafty.math.randomInt(CONSTANTS.LEFT_LIMIT_LAUNCH_ENEMIES,
					CONSTANTS.RIGHT_LIMIT_LAUNCH_ENEMIES),
			y : 0,
			w : 25,
			h : 25,
			dX : 0,
			dY : CONSTANTS.SMART_ENEMY_SPEED
		});

		this.bind("EnterFrame",
				function(frame) {
					var shootX = this.x + this.w / 2;
					var shootY = this.y + this.h
							+ CONSTANTS.SHOOT_ENEMY_OFFSET_HEIGHT;

					if (this.y >= CONSTANTS.HEIGHT) {
						this.destroy();

						if (DEBUG.DEBUG_FLAG != true
								&& GAME_STATUS.GAME_OVER == false) {
							Crafty.trigger("DownScore",
									CONSTANTS.SMART_ENEMY_LIFE);
						}
					}

					this.x = this.x + this.dX;
					this.y = this.y + this.dY;

					if (mustShootSmartEnemy(frame.frame, shootX, shootY,
							PLAYER_SHIP.X, PLAYER_SHIP.Y)) {
						Crafty.e("ShootSmartEnemy").shoot(shootX, shootY,
								CONSTANTS.SHOOT_ENEMY_SPEED,
								DIRECTIONS.GO_DOWN, COLOURS.BLUE,
								PLAYER_SHIP.X, PLAYER_SHIP.Y);
					}

				});

		this.onHit("Shoot", function() {
			var arrayColliding = this.hit("Shoot");
			for ( var i = 0; i < arrayColliding.length; i++) {
				arrayColliding[i].obj.destroy();
			}

			this.armor -= 10;
			if (this.armor <= 0) {
				this.destroy();
				Crafty.trigger("GrowScore", CONSTANTS.SMART_ENEMY_LIFE);
			}

		});

		this.onHit("Ship", function() {
			if (DEBUG.DEBUG_FLAG != true) {
				Crafty.trigger("KillLife");
			}
			this.destroy();
		});
	}
});
