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

Crafty.c("GameOver", {
	init : function() {
		this.requires("2D,DOM,Text,Keyboard");
		this.attr({
			x : CONSTANTS.WIDTH / 2 - 55,
			y : CONSTANTS.HEIGHT / 2 - 35,
			w : 150
		});
		this.text("Game Over! <br/>" + interfaz.playerScore
				+ " Points! <br/>Press Enter");
		this.textColor("#ffffff");
		this.textFont({
			family : 'Verdana',
			size : '22px',
			type : 'bold'
		})

		this.bind("KeyDown", function() {
			if (this.isDown('ENTER')) {
				Crafty.trigger("RebootGame");
			}
		});
	}
});