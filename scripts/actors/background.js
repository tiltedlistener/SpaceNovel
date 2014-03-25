/**

	A background is a purely drawn object
	It may go wherever within a scene's position index

**/
(function($, window, document) {
	"use strict"; 	

	Game.Background = function (image, x, y, width, height) {
		this.type = Game.Types.BACKGROUND;

		// Graphics
		if (image !== undefined) {
			this.image = Game.ImageLibrary.getImage(image);
		}

		// Screen functions
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.index = 99;
		this.id = Date.now() + parseInt(Math.random() * 100);	



	};

	Game.Background.prototype.update = function(gfx, audio) {
		gfx.drawImage(this.image, this.x, this.y, this.width, this.height);		
	};

	Game.Background.prototype.setParent = function(obj) {
		this.parent = obj;
	};	

}(jQuery, this, this.document));