/**

	A controlled actor is an object that is interactive and also listens for input 
	when painted in the scene.

**/
(function(window, document) {
	"use strict"; 	

	Game.Enemy = function (images, x, y, width, height, xvec, yvec) {
		Game.PhysicsActor.call(this, images, x, y, width, height, xvec, yvec);
		this.type = Game.Types.ENEMY;
	}

	Game.Enemy.prototype = new Game.PhysicsActor();

	// Stubs
	Game.Enemy.prototype.update = function () {
		switch(this.state) {
			case Game.States.NORMAL: 
				// Degrade forces
				this.applyFriction();

				// REMEMBER!
				this.lastX = this.x;
				this.lastY = this.y;

				// Apply any force
				this.x += this.vec.x;
				this.y += this.vec.y;

				// Screen Bounds
				if (this.x > 900) {
					this.x = 900;
					this.stop();
				} else if (this.x < 20) {
					this.x = 20;
					this.stop();
				}

				if (this.y > 640) {
					this.parent.currentLevel.incrementShipCount();
					this.destroy();
				}

				break;
			case Game.States.HIT:
				// Interpolation is causing explosion images to get gittery. I like the effect for the moment. 
				break;
		}
	}

}(this, this.document));