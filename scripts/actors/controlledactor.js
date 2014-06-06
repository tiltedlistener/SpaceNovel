/**

	A controlled actor is an object that is interactive and also listens for input 
	when painted in the scene.

**/
(function($, window, document) {
	"use strict"; 	

	Game.ControlledActor = function (images, x, y, width, height, xvec, yvec) {
		Game.PhysicsActor.call(this, images, x, y, width, height, xvec, yvec);
		this.type = Game.Types.PLAYER;

		var t = this;
		document.addEventListener('keydown', function (event){
			t.getInput(event, t);
		}, false);

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
		if (obj.state == Game.States.NORMAL) {
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
		}
	};

	Game.ControlledActor.prototype.shoot = function () {
		var projectile = new Game.Torpedo(this.x+this.bulletOffsetX, this.y+this.bulletOffsetY);
		this.parent.addObject(projectile.id, projectile);
	};

	Game.ControlledActor.prototype.destroy = function () {
		this.parent.removeObject(this.id);
		document.removeEventListener('keydown');
	};		

}(jQuery, this, this.document));