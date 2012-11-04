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

Crafty.scene("Loading", function() {
	var toLoad = [];
	toLoad.push(game_path + "game/images/bg.png");
	toLoad.push(game_path + "game/images/enemy.png");
	toLoad.push(game_path + "game/images/ship.png");
	toLoad.push(game_path + "game/images/smartEnemy.png");
	toLoad.push(game_path + "game/images/disparo1.png");
	toLoad.push(game_path + "game/images/disparo2.png");
	toLoad.push(game_path + "game/images/disparo3.png");

	Crafty.load(toLoad, function() {
		// Everything is loaded
		Crafty.scene("GameScene");
		Crafty.e("GameLoop");
	}, function(e) {
		// Update progress
	}, function(e) {
		// uh oh, error loading
	});

});

Crafty.scene("GameScene", function() {
	Crafty.background("url(" + game_path + "/game/images/bg.png)");

	Crafty.bind("EnterFrame", function(frame) {
		// Setup Background position
		Crafty.stage.elem.style.backgroundPosition = "0px " + frame.frame
				* (0.5) + "px";
	});

	Crafty.bind("UpdateScore", function(color) {
		interfaz.score.text("Score: " + interfaz.playerScore);
		if (color != null) {
			interfaz.score.css('color', color);
		}
	});

	Crafty.bind("UpdateLifes", function(color) {
		interfaz.lifes.text("Lifes: " + interfaz.playerLifes);
		if (color != null) {
			interfaz.lifes.css('color', color);
		}
	});

	Crafty.bind("GameOver", function() {
		Crafty("Ship").destroy();
		Crafty.e("GameOver");
		GAME_STATUS.GAME_OVER = true;
	});

	Crafty.bind("GrowScore", function(points) {
		interfaz.playerScore += points;
		Crafty.trigger("UpdateScore", COLOURS.GREEN);
	});

	Crafty.bind("DownScore", function(points) {
		if (interfaz.playerScore > 0) {
			interfaz.playerScore -= points;
			Crafty.trigger("UpdateScore", COLOURS.RED);
		}
	});

	Crafty.bind("KillLife", function() {
		interfaz.playerLifes -= 1;
		if (interfaz.playerLifes == 0) {
			Crafty.trigger("GameOver");
		}
		if (interfaz.playerLifes >= 0) {
			Crafty.trigger("UpdateLifes");
		}
	});

	Crafty.bind("RebootGame", function() {
		Crafty("GameLoop").reboot();
	});

	Crafty.bind("DestroyElements", function() {
		Crafty("GameOver").destroy();
		Crafty("Enemy").destroy();
		Crafty("SmartEnemy").destroy();
		Crafty("ShootEnemy").destroy();
		Crafty("ShootSmartEnemy").destroy();
	});

	Crafty.bind("PlaySound", function(soundName) {
		Crafty.audio.play(soundName, 1, 0.3);
	});

	Crafty.bind("SwitchOnSounds", function() {
		SOUNDS.active = true;
		interfaz.soundsOnOff.text("On");
		SOUNDS.obj = Crafty.audio.play("ambiente", -1, 0.8);
	});

	Crafty.bind("SwitchOffSounds", function() {
		SOUNDS.active = false;
		interfaz.soundsOnOff.text("Off");
		Crafty.audio.stop();

	});

	Crafty.trigger("UpdateScore");
	Crafty.trigger("UpdateLifes");

	Crafty.trigger("SwitchOnSounds");
});
