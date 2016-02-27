var imageTagBuilder = function() {

	// Initialize
  var that = {};

  // Set defaults
  that.innerWidth = window.innerWidth;
  that.innerHeight = window.innerHeight;
  that.dpr = window.devicePixelRatio;


  //
  that.imageTag = function() {
  	return '<img alt="some horses" class="main" width="800" height="500" src="http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_1600,h_1000/horses.jpg">';
  };

  return that;
}

