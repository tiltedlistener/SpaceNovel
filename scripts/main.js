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
				obj = new Game.ControlledActor(["blue.png", "explosion.png"], 100, 600, 80, 63, 0, 0),
				bg = new Game.Background("space.png", 0, 0, 1000, 750);
			
			scene.addObject(obj.id, obj);
			scene.addObject(bg.id, bg);
			engine.addScene(scene);

			var generator = new Game.RedEnemies(scene);
			// generator.start();

			engine.start();
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