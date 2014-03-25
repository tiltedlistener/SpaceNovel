/**

	A controlled actor is an object that is interactive and also listens for input 
	when painted in the scene.

**/
(function($, window, document) {
	"use strict"; 	

	Game.Enemy = function (image, x, y, width, height, xvec, yvec) {
		Game.PhysicsActor.call(this, image, x, y, width, height, xvec, yvec);
		this.type = Game.Types.ENEMY;
	}

	Game.Enemy.prototype = new Game.PhysicsActor();


}(jQuery, this, this.document));