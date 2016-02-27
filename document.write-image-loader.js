var imageTagBuilder = function() {

	// Initialize
  var that = {};
  var attributeWidth, sourceWidth, sourceHeight;


  // Set defaults
  that.innerWidth = window.innerWidth;
  that.innerHeight = window.innerHeight;
  that.dpr = window.devicePixelRatio;


  // Define methods

  that.attributeHeight = function() {
    return attributeWidth * that.sourceHeight() / that.sourceWidth();
  };

  that.attributeWidth = function() {
  	return attributeWidth;
  };

  that.callHeight= function() {
    return that.attributeHeight() * that.dpr;
  };
  
  that.callWidth = function() {
    return that.attributeWidth() * that.dpr;
  };
  
  that.imageTag = function() {
    return '<img alt="some horses" class="basic" width="' + that.attributeWidth() + '" height="' + that.attributeHeight() + '" src="http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_' + that.callWidth() + ',h_' + that.callHeight() +'/horses.jpg">';
  };

  that.prep = function(params) {
   	that.setSourceWidth(params["sourceWidth"]);
   	that.setSourceHeight(params["sourceHeight"]);
  };

  that.requestWidth = function(width) {
  	that.setAttributeWidth(Math.min(width, sourceWidth));
  };

  that.setAttributeWidth= function(width) {
    attributeWidth = width;
  };
  
  that.setSourceHeight = function(height) {
  	sourceHeight = height;
  }

  that.setSourceWidth = function(width) {
    sourceWidth = width;
  }

  that.sourceHeight = function() {
  	return sourceHeight;
  }

  that.sourceWidth = function() {
    return sourceWidth ;
  }

  return that;
}

