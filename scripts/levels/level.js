/**
 * Levels contain the number of ships that can fly passed before losing. 
 */
(function(window, document) {
	"use strict"; 	

	Game.Level = function (shipCountLimit, parent, hero, killCountLimit) {
		// Lose variables
		this.shipCount = 0;
		this.shipCountLimit = shipCountLimit;
		
		// References
		this.parent = parent;
		this.hero = hero; 

		// Win variables
		this.killCountLimit = killCountLimit;
		this.killCount = 0;
	};

	Game.Level.prototype.incrementShipCount = function () {
		this.shipCount++;
		if (this.shipCount > this.shipCountLimit) {		
			this.hero.hit();
			this.parent.endLevel();
		}
	};

}(this, this.document));