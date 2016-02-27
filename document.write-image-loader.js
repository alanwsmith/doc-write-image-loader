var imageTagBuilder = function() {

	// Initialize
  var that = {};
  var attributeWidth;

  // Set defaults
  that.innerWidth = window.innerWidth;
  that.innerHeight = window.innerHeight;
  that.dpr = window.devicePixelRatio;

  // Define methods
  that.attributeWidth = function() {
  	return attributeWidth;
  };

  that.imageTag = function() {
  	return '<img alt="some horses" class="main" width="' + that.attributeWidth() + '" height="500" src="http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_1600,h_1000/horses.jpg">';
  };

  that.prep = function(params) {
    that.requestWidth(800); 
  };

  that.requestWidth = function(width) {
    attributeWidth = width;
  };

  return that;
}

