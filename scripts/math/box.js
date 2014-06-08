(function(window, document) {
	"use strict"; 	

	Game.Box = function (x, y, width, height) {
		this.minx = x;
		this.miny = y;

		this.maxx = x + width;
		this.maxy = y + height;
	};

	Game.Box.prototype.testOverlap = function(box) {
		if (this.maxx < box.minx) return false; 
		if (this.minx > box.maxx) return false; 
		if (this.maxy < box.miny) return false; 
		if (this.miny > box.maxy) return false; 
		return true; 
	};

}(this, this.document));