/**

	A physics actor is an object that is interactive 
	It is not only drawn but can be touched.

**/
(function($, window, document) {
	"use strict"; 	

	Game.PhysicsActor = function (image, x, y, width, height, xvec, yvec) {

		// State
		this.state = Game.States.NORMAL;

		// Sorter
		this.index = 1;
		this.id = Date.now() + parseInt(Math.random() * 100);

		// Graphics
		if (image !== undefined) {
			this.image = Game.ImageLibrary.getImage(image);
		}

		// Screen functions
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		if (xvec !== undefined) {
			this.vec = new Game.Vector(xvec, yvec);
		}

	};

	// Stubs
	Game.PhysicsActor.prototype.update = function (gfx, audio) {

		switch(this.state) {
			case Game.States.NORMAL: 
				// Degrade forces
				this.applyFriction();

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
				break;
			case Game.States.HIT: 
				this.destroy();
				break;
		}

		// Draw
		gfx.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	};

	Game.PhysicsActor.prototype.applyForce = function (vec) {
		if (this.vec.magnitude() < 50)
			this.vec.add(vec);		
	};

	Game.PhysicsActor.prototype.outlineCharacter = function (gfx) {
		gfx.ctx.beginPath();
		gfx.ctx.lineWidth="1";
		gfx.ctx.strokeStyle="red";
		gfx.ctx.rect(this.x,this.y,this.width,this.height); 
		gfx.ctx.stroke();
	}

	Game.PhysicsActor.prototype.applyFriction = function () {
		if (this.vec.x < 0) {
			var vec = new Game.Vector(1,0);
		} else if (this.vec.x > 0) {
			var vec = new Game.Vector(-1,0);
		} else if (this.vec.x == 0) {
			var vec = new Game.Vector(0,0);
		}
		this.vec.add(vec);
	};

	Game.PhysicsActor.prototype.stop = function() {
		var inv = this.vec.getInverse();
		this.vec.add(inv);
	};

	Game.PhysicsActor.prototype.setParent = function(obj) {
		this.parent = obj;
	};

	Game.PhysicsActor.prototype.box = function() {
		return new Game.Box(this.x, this.y, this.width, this.height);
	};

	Game.PhysicsActor.prototype.hit = function () {
		this.state = Game.States.HIT;
	};

	Game.PhysicsActor.prototype.destroy = function () {
		this.parent.removeObject(this.id);
	};	

}(jQuery, this, this.document));