var ImgTagBuilder = function(config) {
  this._multiplier = window.devicePixelRatio; // TODO: add check to make sure this exists. 
  this._alt = ""; 
  this._config = config;
  this._image = undefined;
  this._maxSourceWidth = undefined;
  this._ratio = undefined;
  this._style = undefined; 
};

ImgTagBuilder.prototype.displayHeight = function() {
  return this.sourceHeight() / this._multiplier;
};
ImgTagBuilder.prototype.displayWidth = function() {
  // TODO: Add check to make sure the max source image size will support this display width. Reduce it here if not.
  return this._config.styles[this._style]['breakPoints'][0]['maxImageDisplayWidth'];
};

ImgTagBuilder.prototype.url = function() {
  // TODO: Consider making this configurable. 
  return 'http://res.cloudinary.com/demo/image/upload/c_fit,q_' + this.quality() + ',w_' + this.sourceWidth() + ',h_' + this.sourceHeight() + '/' + this._image;
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
  this._ratio = params['ratio'];
  this._maxSourceWidth = params['maxSourceWidth'];
  this._style = params['style'];
  return this;
};

ImgTagBuilder.prototype.quality = function() {
  // Returns '80' for default if no quality is defined.
  return this._config.styles[this._style]['breakPoints'][0]['quality'] ? this._config.styles[this._style]['breakPoints'][0]['quality'] : 80;
}

ImgTagBuilder.prototype.sourceHeight = function() {
  return this.sourceWidth() * this._ratio;
};

ImgTagBuilder.prototype.sourceWidth = function() {
  return this.displayWidth() * this._multiplier;
};