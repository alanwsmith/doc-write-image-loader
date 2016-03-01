var imageTagBuilder = function(config) {

  var o = {};
  var attributeWidth;

  o.innerWidth = window.innerWidth;
  o.innerHeight = window.innerHeight;
  o.dpr = 'devicePixelRatio' in window ? window.devicePixelRatio : 1;

  o.attributeHeight = function() {
    return parseInt( attributeWidth * o.sourceHeight / o.sourceWidth , 10);
  };

  o.attributeWidth = function() {
  	return attributeWidth;
  };

  o.callHeight= function() {
    return o.attributeHeight() * o.dpr;
  };
  
  o.callWidth = function() {
    return o.attributeWidth() * o.dpr;
  };
  
  o.imageTag = function() {
    return '<img alt="' + o.altText + '" class="' + o.style + '" width="' + o.attributeWidth() + '" height="' + o.attributeHeight() + '" src="' + o.url() + '">';
  };

  o.init_alt = function(alt) {
    o.altText = alt;
  };

  o.init_image = function(image) {
    o.image = image;
  };

  o.init_sourceHeight = function(height) {
  	o.sourceHeight = height;
  };

  o.init_sourceWidth = function(width) {
  	o.sourceWidth = width;
  };

  o.init_style = function(style) {
    o.style = style;
  };

  o.prep = function(params) {
  	for (var param in params) {
  		o["init_" + param](params[param]);
    }
  };

  o.requestHeightViaPercentage = function(pct) {
    o.setAttributeWidth(o.innerHeight * pct / 100 * o.sourceWidth / o.sourceHeight);
  };

  o.requestWidthViaPercentage = function(pct) {
    o.setAttributeWidth(o.innerWidth * pct / 100);
  };

  o.requestWidthViaPixels = function(width) {
  	o.setAttributeWidth(width);
  };

  o.setAttributeWidth = function(width) {
    attributeWidth = parseInt(Math.min(width, (o.sourceWidth / o.dpr), o.innerWidth), 10);
  };
 
  o.url = function() {
    return config["urlTemplate"].replace("QUALITY", "85").replace("CALLWIDTH", o.callWidth()).replace("CALLHEIGHT", o.callHeight()).replace("IMAGENAME", o.image);
  }

  return o;

};

