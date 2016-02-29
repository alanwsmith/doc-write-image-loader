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
    return parseInt( attributeWidth * that.sourceHeight() / that.sourceWidth() , 10);
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

  that.requestHeightViaPercentage = function(pct) {
    that.setAttributeWidth(400);
  }

  that.requestWidthViaPercentage = function(pct) {
    that.setAttributeWidth(that.innerWidth * pct / 100);
  }

  that.requestWidthViaPixels = function(width) {
  	that.setAttributeWidth(width);
  };

  that.setAttributeWidth= function(width) {
    attributeWidth = parseInt(Math.min(width, (sourceWidth / that.dpr)), 10);
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

