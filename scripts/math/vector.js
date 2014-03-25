(function($, window, document) {
	"use strict"; 	

	Game.Vector = function (x, y) {
		this.x = x;
		this.y = y;
	};

	Game.Vector.prototype.magnitude = function () {
		return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
	}

	Game.Vector.prototype.add = function(vec) {	
		this.x = this.x + vec.x;
		this.y = this.y + vec.y;
	}

	Game.Vector.prototype.getInverse = function () {
		return new Game.Vector(-this.x, -this.y);
	}

	Game.Vector.prototype.clone = function () {
		return new Game.Vector(this.x, this.y);
	}

}(jQuery, this, this.document));