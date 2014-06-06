(function($, window, document) {
	"use strict"; 	

	Game.GraphicsCanvas = function () {
		this.c =  document.getElementById('c');
		this.backbuffer = document.getElementById('backbuffer');
		this.backbufferCtx = this.backbuffer.getContext("2d");
		this.ctx = c.getContext("2d");
		this.width = c.width;
		this.height = c.height;
	};

	Game.GraphicsCanvas.prototype.drawImage = function(src,x,y,width,height) {
		this.backbufferCtx.drawImage(src, x, y, width, height);
	};

	Game.GraphicsCanvas.prototype.updateDisplay = function() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.drawImage(this.backbuffer, 0, 0);
		this.backbufferCtx.clearRect(0, 0, this.width, this.height);
	};

}(jQuery, this, this.document));