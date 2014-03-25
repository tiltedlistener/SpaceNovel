(function($, window, document) {
	"use strict"; 	

	Game.Engine = function () {
		// Main game objects
		this.scene = null;
		
		// Animation timekeeping
		this.timeNow = 0;
		this.lastTime = 0;
		this.elapsed = 0;
		this.playAnim = true;

		// Listener

	};

	Game.Engine.prototype.addScene = function (scene) {
		this.scene = scene;
	}

	// Animation Functions
	Game.Engine.prototype.animate = function() {
		this.timeNow = new Date().getTime();
		if (this.lastTime != 0) {
			this.elapsed = this.timeNow - this.lastTime;		
		}
		this.lastTime = this.timeNow;
	}	
    Game.Engine.prototype.tick = function() {
    	var t = this;
		if (this.playAnim) {
			requestAnimFrame(function () { t.tick(); } );
			this.animate();
			this.loop();
		} else {
			alert("TICK STOPPED");
		}
    }	

	Game.Engine.prototype.loop = function () {
		this.scene.update();
	};


}(jQuery, this, this.document));