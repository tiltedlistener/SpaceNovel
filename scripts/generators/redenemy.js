(function(window, document) {
	"use strict"; 	

	Game.RedEnemies = function (scene) {
		this.scene = scene;
		this.interval = null;
		this.screenWidth = 900;
		this.speedLimit = 7;
		this.timeInterval = 2000;
	};

	Game.RedEnemies.prototype.start = function () {
		var t = this;
		this.interval = setInterval(function () { t.generate(t) }, this.timeInterval)
	};

	Game.RedEnemies.prototype.stop = function () {
		clearInterval(this.interval);
	};

	Game.RedEnemies.prototype.generate = function(self) {
		var obj = self.createEnemy();
		self.scene.addObject(obj.id, obj);
	};

	Game.RedEnemies.prototype.createEnemy = function () {
		var xPos = parseInt(Math.random() * this.screenWidth),
			speed = parseInt(Math.random() * this.speedLimit);

		(speed > 0) ? speed = speed : speed = 9;
		speed++;	// Ensures speed is always NOT zero

		return new Game.Enemy(["red.png", "explosion.png"], xPos, 0, 89, 114, 0, speed);
	};

}(this, this.document));