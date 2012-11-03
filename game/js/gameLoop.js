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

Crafty.c("GameLoop", {
	init : function() {
		GAME_STATUS.GAME_OVER = false;
		var ship = Crafty.e("Ship");
		var points = Crafty.e("Points");
		this.requires("Keyboard");
		this.bind("EnterFrame", function(frame) {
			if (launchEnemy(frame.frame, Crafty("Enemy").length)) {
				Crafty.e("Enemy");
			}

			if (launchSmartEnemy(frame.frame, Crafty("SmartEnemy").length)) {
				Crafty.e("SmartEnemy");
			}

		});

		this.bind('KeyDown', function() {
			if (this.isDown('V')) {
				if (SOUNDS.active == true) {
					Crafty.trigger("SwitchOffSounds");
				} else if (SOUNDS.active == false) {
					Crafty.trigger("SwitchOnSounds");
				}
			}
		});
	},

	reboot : function() {
		interfaz.playerScore = CONSTANTS.PLAYER_SCORE_INIT;
		interfaz.playerLifes = CONSTANTS.PLAYER_LIFES_INIT;
		GAME_STATUS.GAME_OVER = false;
		Crafty.trigger("DestroyElements");
		var ship = Crafty.e("Ship");
		Crafty.trigger("UpdateScore");
		Crafty.trigger("UpdateLifes");
	}

});
