/**
	
	Bullet! Space Ray!

**/
(function(window, document) {
	"use strict"; 	

	Game.Torpedo = function (x, y) {
		this.type = Game.Types.PROJECTILE;

		this.x = x;
		this.y = y;
		this.lastX = this.x;
		this.lastY = this.y;

		this.width = 21;
		this.height = 14;

		this.vec = new Game.Vector(0, -10);
		this.index = 2;
		this.id = Date.now() + parseInt(Math.random() * 100);		
		this.state = Game.States.NORMAL;

		this.sequence = new Game.Sequence("bullet.png", 2, 20, 14);
	};

	Game.Torpedo.prototype.update = function() {
		this.lastX = this.x;
		this.lastY = this.y;

		this.x += this.vec.x;
		this.y += this.vec.y;

		// If we go past the edge of the screen
		if (this.y < -100) 
			this.destroy();
	};

	Game.Torpedo.prototype.draw = function(gfx, audio, interpolation) {
		this.sequence.update();
		var x = (this.x - this.lastX) * interpolation + this.lastX;
		var y = (this.y - this.lastY) * interpolation + this.lastY;
		gfx.drawSequenceImage(this.sequence.getImage(), 0, this.sequence.getFrame(), this.sequence.framewidth, this.sequence.frameheight, x, y, this.sequence.framewidth, this.sequence.frameheight);	
	};

	Game.Torpedo.prototype.setParent = function(obj) {
		this.parent = obj;
	};	

	Game.Torpedo.prototype.destroy = function () {
		this.parent.removeObject(this.id);
	};

	Game.Torpedo.prototype.box = function() {
		return new Game.Box(this.x, this.y, this.width, this.height);
	};	

	Game.Torpedo.prototype.hit = function () {
		this.state = Game.States.HIT;
		this.destroy();
	};

}(this, this.document));