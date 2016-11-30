var ImageLoader = function() {

};

ImageLoader.prototype.url_to_call = function() {
  return "http://res.cloudinary.com/demo/image/upload/w_" + this.url_request_width() + ",h_" + this.url_request_height() + "/horses.jpg"; 
};

ImageLoader.prototype.load_params = function(params) {
	// This is the core funciton that takes all possible inputs.
	// Convience methods will be used in production, but they will all communicate
	// load_params. 

  console.log(params); 
  this._dpr = params["dpr"];
  this._viewport_height = params["viewport_height"];
  this._viewport_width = params["viewport_width"];
  this._percent_of_viewport = params["percent_of_viewport"];
  this._raw_height = params["raw_height"];
  this._raw_width = params["raw_width"];
};

ImageLoader.prototype.render_height = function() {
	return  Math.floor(this._raw_height * this.render_width() / this._raw_width );
};

ImageLoader.prototype.render_width = function() {
  return this._percent_of_viewport * .01 * this._viewport_width;
};

ImageLoader.prototype.url_request_height = function() {
  return this.render_height(); 
};

ImageLoader.prototype.url_request_width = function() {
  return this.render_width(); 
};


/*
TODO:

- Add ability to restrict image so it's always fully visible (e.g. reduce if it would otherwise be too tall). 
- Add ability to restrict to max pixel size? (Could just use the raw_width for this, though, that's a bit of a hack)

*/
