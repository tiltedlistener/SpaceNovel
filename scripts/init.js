// JavaScript Document
window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
})();

// Set the Game into the window namespace
(function($, window, document) {
	"use strict"; 	

	window.Game = {};

}(jQuery, this, this.document));