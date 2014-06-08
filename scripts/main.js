(function(window, document) {
	"use strict"; 	

	Game.Main = (function () {

		var startPage,
			endPage;

		function init() {
			startPage = document.getElementById("start-page");
			endPage = document.getElementById("end-page")
			startPage.addEventListener('click', gameStart, false);
		}

		function gameStart() {		
			startPage.style.opacity = 0;

			// Start the game tech
			var gfx = new Game.GraphicsCanvas(),
				audioStream = new Game.AudioStream(),
				engine = new Game.Engine(gfx, audioStream);

			// Boiler plate scene generation
			var scene = new Game.Scene(gfx, audioStream),
				obj = new Game.ControlledActor(["blue.png", "explosion.png"], 460, 550, 80, 63, 0, 0),
				level = new Game.Level(10, scene, obj);

			scene.addObject(obj.id, obj);
			scene.addLevel(level);
			engine.addScene(scene);

			var generator = new Game.RedEnemies(scene);
			generator.start();

			engine.start();
		}

		function gameEnd() {
			endPage.style.opacity = 1;
			startPage.removeEventListener('click', gameStart);
		}

		return {
			init: init,
			gameEnd: gameEnd
		};

	})();

	// Start up 
	window.onload = function () {
		Game.ImageLibrary.init(Game.Main.init);
	};

}(this, this.document));