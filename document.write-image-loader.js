var ImgTagBuilder = function(config) {
  this._config = config;

  this._alt = ""; 
  this._devicePixelRatio = window.devicePixelRatio; 
  this._image = undefined;
  this._innerWidth = window.innerWidth;
  this._innerHeight = window.innerHeight;
  this._maxHeight= undefined;
  this._maxWidth = undefined;
  this._style = undefined; 
};

ImgTagBuilder.prototype.callHeight = function() {
  return Math.floor(this.callWidth() * this.ratio());
};

ImgTagBuilder.prototype.callWidth = function() {
  return this.displayWidth() * this._devicePixelRatio;
};

ImgTagBuilder.prototype.displayHeight = function() {
  return Math.floor(this.callHeight() / this._devicePixelRatio);
};
ImgTagBuilder.prototype.displayWidth = function() {
  // TODO: Add check to make sure the max source image size will support this display width. Reduce it here if not.

  // TODO: Move this sort and the loop out so it's only called once after you get it working.
  // Sort the breakpoints into decending order.
  this._config.styles[this._style]['breakPoints'].sort(function(a,b) {
    if (a.maxImageDisplayWidth > b.maxImageDisplayWidth) { return -1; }
    if (a.maxImageDisplayWidth < b.maxImageDisplayWidth) { return 1; }
    return 0; // In case they are equal.
  });

  for (var breakIndex = 0, breakCount = this._config.styles[this._style]['breakPoints'].length; breakIndex < breakCount; breakIndex++) {
  	if (this._innerWidth > this._config.styles[this._style]['breakPoints'][breakIndex]['minViewportWidth']) {
      return this._config.styles[this._style]['breakPoints'][breakIndex]['maxImageDisplayWidth'];
      break;
    }
  }

};

ImgTagBuilder.prototype.imgTag = function() {
  return '<img alt="' + this._alt + '" class="' + this._style + '" width="' + this.displayWidth() + '" height="' + this.displayHeight() + '" src="' + this.url() + '">';
};

ImgTagBuilder.prototype.place = function() {
  document.write(this.imgTag());
};

ImgTagBuilder.prototype.prep = function(params) {
  this._alt = params['alt']; 
  this._image = params['image'];
  this._maxHeight= params['maxHeight'];
  this._maxWidth = params['maxWidth'];
  this._style = params['style'];
  return this;
};

ImgTagBuilder.prototype.quality = function() {
  // Returns '80' for default if no quality is defined.
  return this._config.styles[this._style]['breakPoints'][0]['quality'] ? this._config.styles[this._style]['breakPoints'][0]['quality'] : 80;
}

ImgTagBuilder.prototype.ratio= function() {
  return this._maxHeight / this._maxWidth;
};

ImgTagBuilder.prototype.url = function() {
  // TODO: Make this configurable via a template. 
  return 'http://res.cloudinary.com/demo/image/upload/c_fill,q_' + this.quality() + ',w_' + this.callWidth() + ',h_' + this.callHeight() + '/' + this._image;
};

