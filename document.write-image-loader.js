var imageTagBuilder = function() {

  // TODO:
  // - Refactor to use `that.sourceWidth` and
  //   `that.sourceHeight` directly instead of thru functions.
  // - Minify.

	// Initialize
  var that = {};
  var attributeWidth, sourceWidth, sourceHeight;


  // Set defaults
  that.innerWidth = window.innerWidth;
  that.innerHeight = window.innerHeight;
  that.dpr = window.devicePixelRatio;


  // Define methods

  that.attributeHeight = function() {
    return parseInt( attributeWidth * that.sourceHeightPx / that.sourceWidthPx , 10);
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
    that.setAttributeWidth(that.innerHeight * pct / 100 * that.sourceWidth() / that.sourceHeight());
  }

  that.requestWidthViaPercentage = function(pct) {
    that.setAttributeWidth(that.innerWidth * pct / 100);
  }

  that.requestWidthViaPixels = function(width) {
  	that.setAttributeWidth(width);
  };

  that.setAttributeWidth= function(width) {
    // Returns the smalles of: requested with, source adjusted for dpr or the window width.
    attributeWidth = parseInt(Math.min(width, (sourceWidth / that.dpr), that.innerWidth), 10);
  };
  
  that.setSourceHeight = function(height) {
  	that.sourceHeightPx = height;
  	sourceHeight = height;
  }

  that.setSourceWidth = function(width) {
    that.sourceWidthPx = width;
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

