(function(window, document) {
	"use strict"; 	

	Game.Sequence = function (img, count, framewidth, frameheight) {
		// Establish animation sequence bounds
		this.image = Game.ImageLibrary.getImage(img);	
		this.frames = count;
		this.framewidth = framewidth;
		this.frameheight = frameheight;

		// Counter utilities to progress through animation
		this.frameCount = 0;
		this.currentFrame = 0;
		this.frameSpeedLimit = 15;
	};

	// Update methods
	Game.Sequence.prototype.update = function () {
		this.frameUpdate();
	};	

	Game.Sequence.prototype.frameUpdate = function () {
		this.frameCount++;
		if (this.frameCount >= this.frameSpeedLimit) {
			this.frameCount = 0;
			this.currentFrame++;
			if (this.currentFrame == this.frames) {
				this.currentFrame = 0;
			}
		}
	};	

	// Get Value methods
	Game.Sequence.prototype.getImage = function () {
		return this.image;
	};

	Game.Sequence.prototype.getFrame = function () {
		// We assume that the image sequence is vertically aligned
		return this.frameheight * this.currentFrame;
	};

}(this, this.document));