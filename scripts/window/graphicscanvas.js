(function($, window, document) {
	"use strict"; 	

	Game.GraphicsCanvas = function () {
		this.c =  document.getElementById('c');
		this.ctx = c.getContext("2d");
		this.width = c.width;
		this.height = c.height;
	};

	Game.GraphicsCanvas.prototype.drawImage = function(src,x,y,width,height) {
		this.ctx.drawImage(src, x, y, width, height);
	};

}(jQuery, this, this.document));