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

Crafty.audio.add({
	laserBig : [ game_path + "game/audio/sounds/disparoGrande.ogg",
			game_path + "game/audio/sounds/disparoGrande.mp3",
			game_path + "game/audio/sounds/disparoGrande.wav" ],
	laserNormal : [ game_path + "game/audio/sounds/disparo.ogg",
			game_path + "game/audio/sounds/disparo.mp3",
			game_path + "game/audio/sounds/disparo.wav" ]
});

Crafty.audio.add("ambiente", [ game_path + "game/audio/music/ambiente.mp3",
		game_path + "game/audio/music/ambiente.ogg" ]);