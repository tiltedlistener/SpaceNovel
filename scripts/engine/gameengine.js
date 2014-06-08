(function(window, document) {
	"use strict"; 	

	Game.Engine = function (gfx) {
		// Main game objects
		this.scene = null;
		this.gfx = gfx;
		
		// Animation timekeeping
		this.timeNow = 0;
		this.lastTime = 0;
		this.elapsed = 0;
		this.playAnim = false;
		
		// Frame update controllers
		this.TARGET_HRZ = 80;
		this.TIME_BETWEEN_UPDATES = 1000 / this.TARGET_HRZ;
		this.MAX_UPDATES_BEFORE_RENDER = 5;

		this.lastUpdateTime = 0;
		this.lastRenderTime = 0;
		this.fps = 0;
		this.frameCount = 0;
		this.lastSecondTime  = 0;

		this.loopComplete = true;
	};

	Game.Engine.prototype.addScene = function (scene) {
		this.scene = scene;
	};

	// Animation Functions
    Game.Engine.prototype.tick = function() {
     	var t = this;
 		if (this.playAnim) {
 			requestAnimFrame(function () { t.tick(); } );
 			this.loop();
 		} else {
			alert("TICK STOPPED");
 		}
   }
    Game.Engine.prototype.start = function () {
    	this.playAnim = true;
    	this.lastUpdateTime = this.lastRenderTime = new Date().getTime();
    	this.tick();
    }; 

    Game.Engine.prototype.stop = function () {
    	this.playAnim = false;
    	this.gfx.clearDisplay();
    };

	Game.Engine.prototype.loop = function () {
		if (this.loopComplete) {
			this.loopComplete = false;
			var now = new Date().getTime();
			var updateCount = 0;

			// Update!
			while(now - this.lastUpdateTime > this.TIME_BETWEEN_UPDATES && updateCount < this.MAX_UPDATES_BEFORE_RENDER) {
				this.scene.update();
				this.lastUpdateTime += this.TIME_BETWEEN_UPDATES;
				updateCount++;
			}

	        // Draw!
	        var interpolation = Math.min((now - this.lastUpdateTime) / this.TIME_BETWEEN_UPDATES);
	        this.scene.draw(interpolation);
	        this.gfx.updateDisplay();
	        this.frameCount++;
	        this.lastRenderTime = now;

	        // Fetch the FPS rate
			var thisSecond = this.lastUpdateTime / 1000;
	        if (thisSecond > this.lastSecondTime) {
	           this.fps = this.frameCount;
	           this.frameCount = 0;
	           this.lastSecondTime = thisSecond;
	        } 
        	this.loopComplete = true;
        }

	};


}(this, this.document));