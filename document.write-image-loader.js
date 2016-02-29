var imageTagBuilder = function() {

  var that = {};
  var attributeWidth;

  that.innerWidth = window.innerWidth;
  that.innerHeight = window.innerHeight;
  that.dpr = window.devicePixelRatio;

  that.attributeHeight = function() {
    return parseInt( attributeWidth * that.sourceHeight / that.sourceWidth , 10);
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
    that.setAttributeWidth(that.innerHeight * pct / 100 * that.sourceWidth / that.sourceHeight);
  };

  that.requestWidthViaPercentage = function(pct) {
    that.setAttributeWidth(that.innerWidth * pct / 100);
  };

  that.requestWidthViaPixels = function(width) {
  	that.setAttributeWidth(width);
  };

  that.setAttributeWidth= function(width) {
    attributeWidth = parseInt(Math.min(width, (that.sourceWidth / that.dpr), that.innerWidth), 10);
  };
  
  that.setSourceHeight = function(height) {
  	that.sourceHeight = height;
  };

  that.setSourceWidth = function(width) {
    that.sourceWidth = width;
  };

  return that;

};

