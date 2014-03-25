/**

	A controlled actor is an object that is interactive and also listens for input 
	when painted in the scene.

**/
(function($, window, document) {
	"use strict"; 	

	Game.ControlledActor = function (image, x, y, width, height, xvec, yvec) {
		Game.PhysicsActor.call(this, image, x, y, width, height, xvec, yvec);
		this.type = Game.Types.PLAYER;

		var t = this;
		document.onkeydown = function (event){
			t.getInput(event, t);
		}

		this.bulletOffsetX = 29;
		this.bulletOffsetY = 10;
	}

	Game.ControlledActor.prototype = new Game.PhysicsActor();

	Game.ControlledActor.prototype.getInput = function (evt, obj) {
		/**
			left = 37
			up = 38
			right = 39
			down = 40
			spacebar = 32
		**/

		switch(evt.keyCode) {
			case 37: 
				var vec = new Game.Vector(-20, 0);
				obj.applyForce(vec);
				break;
			case 39: 
				var vec = new Game.Vector(20, 0);
				obj.applyForce(vec);
				break;
			case 32: 
				obj.shoot();
				break;
		}
	};

	Game.ControlledActor.prototype.shoot = function () {
		var projectile = new Game.Torpedo(this.x+this.bulletOffsetX, this.y+this.bulletOffsetY)
		this.parent.addObject(projectile.id, projectile);
	};

}(jQuery, this, this.document));