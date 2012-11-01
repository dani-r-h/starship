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

Crafty.c("Ship", {
	shipSpeed : 5,
	ship : "playerShip",
	init : function() {
		this
				.requires("2D,Canvas," + this.ship
						+ ",Multiway,Keyboard,Collision");
		this.attr({
			x : CONSTANTS.WIDTH / 2,
			y : CONSTANTS.HEIGHT - 30,
			w : 17,
			h : 17
		});

		this.multiway(this.shipSpeed, {
			LEFT_ARROW : 180,
			RIGHT_ARROW : 0,
			UP_ARROW : -90,
			DOWN_ARROW : 90
		});
		this.bind('KeyDown', function() {
			if (this.isDown('SPACE')) {
				Crafty.e("Shoot").shoot(this.x + this.w / 2, this.y, 8,
						DIRECTIONS.GO_UP, COLOURS.RED);
			}
		});

		this.bind('EnterFrame', function(frame) {
			PLAYER_SHIP.X = this.x;
			PLAYER_SHIP.Y = this.y;

			/* Corners */
			if (this.x < 0 && this.y < 0) {
				this.x = 0;
				this.y = 0;

			} else if (this.x + this.w > CONSTANTS.WIDTH && this.y < 0) {
				this.x = width - this.w;
				this.y = 0;

			} else if (this.x < 0 && this.y > CONSTANTS.HEIGHT - this.h) {
				this.x = 0;
				this.y = CONSTANTS.HEIGHT - this.h;

			} else if (this.x + this.w > CONSTANTS.WIDTH
					&& this.y > CONSTANTS.HEIGHT - this.h) {
				this.x = CONSTANTS.WIDTH - this.w;
				this.y = CONSTANTS.HEIGHT - this.h;

			}

			if (this.x < 0) {
				this.x = 0;

			} else if (this.x + this.w > CONSTANTS.WIDTH) {
				this.x = CONSTANTS.WIDTH - this.w;

			} else if (this.y < 0) {
				this.y = 0;

			} else if (this.y > CONSTANTS.HEIGHT - this.h) {
				this.y = CONSTANTS.HEIGHT - this.h;

			}

			if (frame.frame % 8 == 0 && this.isDown('SPACE')) {
				Crafty.e("Shoot").shoot(this.x + this.w / 2, this.y, 8,
						DIRECTIONS.GO_UP, "#ff0000");
			}

		});

		this.onHit("ShootEnemy", function() {
			var arrayColliding = this.hit("ShootEnemy");
			for ( var i = 0; i < arrayColliding.length; i++) {
				arrayColliding[i].obj.destroy();
			}
			if (DEBUG.DEBUG_FLAG != true) {
				Crafty.trigger("KillLife");
			}
		});
		
		this.onHit("ShootSmartEnemy", function() {
			var arrayColliding = this.hit("ShootSmartEnemy");
			for ( var i = 0; i < arrayColliding.length; i++) {
				arrayColliding[i].obj.destroy();
			}
			if (DEBUG.DEBUG_FLAG != true) {
				Crafty.trigger("KillLife");
			}
		});

	}
});