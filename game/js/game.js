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
