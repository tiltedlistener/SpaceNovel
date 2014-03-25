(function($, window, document) {
	"use strict"; 	

	Game.Main = (function () {

		function init() {
			
			// Start the game tech
			var gfx = new Game.GraphicsCanvas(),
				audioStream = new Game.AudioStream(),
				engine = new Game.Engine(gfx, audioStream);

			// Boiler plate scene generation
			var scene = new Game.Scene(gfx, audioStream),
				obj = new Game.ControlledActor("blue.png", 100, 600, 80, 63, 0, 0),
				bg = new Game.Background("planet.png", 0, 624, 980, 126),
				enemy = new Game.Enemy("red.png",100, 100,89, 114, 0, 1);
			

			scene.addObject(obj.id, obj);
			scene.addObject(bg.id, bg);
			engine.addScene(scene);

			var generator = new Game.RedEnemies(scene);
			generator.start();

			// Game Start (probably will have controls here to actually start a game scene)
			engine.tick();
		}

		return {
			init: init
		};

	})();


	// Start up 
	$(document).ready(function () {
		Game.ImageLibrary.init(Game.Main.init);
	});

}(jQuery, this, this.document));