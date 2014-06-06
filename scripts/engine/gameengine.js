(function($, window, document) {
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
		this.MAX_UPDATES_BEFORE_RENDER = 5;
		this.TARGET_FPS = 60;
		this.TARGET_TIME_BETWEEN_RENDERS = 1000 / this.TARGET_FPS;

		this.lastUpdateTime = 0;
		this.lastRenderTime = 0;
		this.fps = 0;
		this.frameCount = 0;
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
    	this.tick();
    }; 

    Game.Engine.prototype.stop = function () {
    	this.playAnim = false;
    };

	Game.Engine.prototype.loop = function () {
		this.lastUpdateTime = this.lastRenderTime = new Date().getTime();

		/**
		var now = new Date().getTime();
		var updateCount = 0;

		// Update!

		while(now - this.lastUpdateTime > this.TIME_BETWEEN_UPDATES && updateCount < this.MAX_UPDATES_BEFORE_RENDER) {
			this.scene.update();
			this.lastUpdateTime += this.TIME_BETWEEN_UPDATES;
			updateCount++;
			console.log("UPDATING");
		}



		/**
		if (now - this.lastUpdateTime > this.TIME_BETWEEN_UPDATES) {
           this.lastUpdateTime = now - this.TIME_BETWEEN_UPDATES;
        }

        // Draw!
        var interpolation = Math.min((now - this.lastUpdateTime) / this.TIME_BETWEEN_UPDATES);
        this.scene.draw(interpolation);
        this.gfx.updateDisplay();
        this.frameCount++;
        this.lastRenderTime = now;


			var thisSecond = this.lastUpdateTime / 1000;
        if (thisSecond > this.lastSecondTime)
        {
           this.fps = this.frameCount;
           this.frameCount = 0;
           this.lastSecondTime = thisSecond;
        }
     
        //Yield until it has been at least the target time between renders. This saves the CPU from hogging.
        while (now - this.lastRenderTime < this.TARGET_TIME_BETWEEN_RENDERS && now - this.lastUpdateTime < this.TIME_BETWEEN_UPDATES) {            
           now = new Date().getTime();
        }
        **/

	};


}(jQuery, this, this.document));