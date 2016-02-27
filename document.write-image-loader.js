var imageTagBuilder = function() {

	// Initialize
  var that = {};
  var attributeWidth = 0;

  // Set defaults
  that.innerWidth = window.innerWidth;
  that.innerHeight = window.innerHeight;
  that.dpr = window.devicePixelRatio;

  that.attributeWidth = function() {
  	return attributeWidth;
  };

  that.requestWidth = function(width) {
    attributeWidth = width;
  };

  //
  that.imageTag = function() {
  	return '<img alt="some horses" class="main" width="' + that.attributeWidth() + '" height="500" src="http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_1600,h_1000/horses.jpg">';
  };

  return that;
}

