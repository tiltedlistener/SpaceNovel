/**

	Scenes holds actors
	The engine loads a scene to loop through
	The scene is handed GFX and a Sound Player to run its media
	
**/
(function($, window, document) {
	"use strict"; 	

	Game.Scene= function (gfx, audio) {
		// Media
		this.gfx = gfx;
		this.audio = audio;

		// Object controllers
		this.objects = {};
		this.objectIds = [];
		this.objectLen = 0;

		// Remove control
		this.toRemoveObjs = [];
		this.activeDeletion = false;

		// Collision
		this.activeCollisionCheck = false;
	};

	Game.Scene.prototype.update = function() {
		if (!this.activeDeletion && !this.activeCollisionCheck) {
			this.gfx.ctx.clearRect(0, 0, this.gfx.width, this.gfx.height);
			for(var i = this.objectLen; i--; ) {
				var cur = this.objectIds[i];
				this.objects[cur].update(this.gfx, this.audio);
			}
			this.scheduledDeletion();
			this.checkForCollisions();
		}
	};

	Game.Scene.prototype.addObject = function(id, obj) {
		this.objects[id] = obj;
		obj.setParent(this);
		this.updateObjectCount();
		this.updateSort();	
	};

	Game.Scene.prototype.removeObject = function(id) {
		this.toRemoveObjs.push(id);
	};

	Game.Scene.prototype.scheduledDeletion = function () {
		this.activeDeletion = true;
		for (var i=this.toRemoveObjs.length; i--;) {
			var id = this.toRemoveObjs[i];
			delete this.objects[id];
			this.updateObjectCount();
		}
		this.toRemoveObjs = [];
		this.activeDeletion = false;
	};

	Game.Scene.prototype.updateObjectCount = function(first_argument) {
		this.objectIds = Object.keys(this.objects);
		this.objectLen = this.objectIds.length;
	};

	Game.Scene.prototype.updateSort = function() {
		if (this.objectLen >= 2) {
			var _t = this;
			this.objectIds.sort(function(a,b) {
				var first = _t.objects[a],
					second = _t.objects[b];
				return first.index > second.index
			});
		}
	};

	Game.Scene.prototype.checkForCollisions = function () {
		this.activeCollisionCheck = true;
		for(var i = this.objectLen; i--; ) {
			var curId = this.objectIds[i],
				current = this.objects[curId];
			for(var j = this.objectLen; j--; ){

				// Don't check the same object against itself
				if (j !== i) {

					// Get the other object
					var curId2 = this.objectIds[j],
						current2 = this.objects[curId2];

					// Don't check collisions of background
					if (!(current.type == Game.Types.BACKGROUND || current2.type == Game.Types.BACKGROUND) &&
						 (current.state == Game.States.NORMAL && current2.state == Game.States.NORMAL)) {
		
						// Because players can't be hurt by their own torpedos
						if (!((current.type == Game.Types.PLAYER && current2.type == Game.Types.PROJECTILE) ||
							  (current2.type == Game.Types.PLAYER && current.type == Game.Types.PROJECTILE)
							)) {

							// Get their boxes
							var box1 = current.box(),
								box2 = current2.box();

							// Test Collision
							if (box1.testOverlap(box2)) {

								// Run Hit!
								current.hit();
								current2.hit();
							}
						}
					}
				}
			}
		}		
		this.activeCollisionCheck = false;
	};

}(jQuery, this, this.document));