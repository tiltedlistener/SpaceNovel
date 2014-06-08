/**
	Preloads images for objects
**/
(function(window, document) {
	"use strict"; 	

	Game.ImageLibrary = (function () {

		var root = "images/",
			images = [
			"blue.png",
			"bullet.png",
			"green.png",
			"main.png",
			"planet.png",
			"red.png",
			"explosion.png",
			"space.png"
			], 
			loadedImages = {},
			imageCount = 0,
			imagesReady = 0,
			intervalCheck = null;

		function init(callback) {
			imageCount = images.length;
			startImageLoad();
			checkImageReadyStatus(callback);
		}

		function startImageLoad() {
			for(var i=0;i<imageCount;i++) {
				loadImage(images[i]);
			}
		}

		function loadImage(image) {
			var i = new Image();
			i.src = root + image;
			i.onload = function () {
				loadedImages[image] = i;
				imagesReady++;
			}
		}		

		function checkImageReadyStatus(callback) {
			intervalCheck = setInterval(function () {
				if (imagesReady == imageCount) {
					clearInterval(intervalCheck);
					callback();
				}
			}, 500);
		}		

		function getImage(img) {
			return loadedImages[img];
		}

		return {
			init: init,
			getImage: getImage
		};

	})();

}(this, this.document));