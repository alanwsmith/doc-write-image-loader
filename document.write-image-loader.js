var ImageLoader = function() {

};

ImageLoader.prototype.url_to_call = function() {
	
	  return this._url_template.replace('[WIDTH]', this.url_request_width()).replace('[HEIGHT]', this.url_request_height()).replace('[QUALITY]', this._quality).replace('[IMAGE_NAME]', this._image_name) 
	
//   return "http://res.cloudinary.com/demo/image/upload/w_" + this.url_request_width() + ",h_" + this.url_request_height() + ",q_80/horses.jpg"; 
};

ImageLoader.prototype.load_params = function(params) {
	// This is the core funciton that takes all possible inputs.
	// Convience methods will be used in production, but they will all communicate
	// load_params. 

  console.log(params); 
  this._dpr = params["dpr"];
  this._image_name = params["image_name"];
  this._viewport_height = params["viewport_height"];
  this._viewport_width = params["viewport_width"];
  this._percent_of_viewport_width = params["percent_of_viewport_width"];
  this._quality = params["quality"];
  this._raw_height = params["raw_height"];
  this._raw_width = params["raw_width"];
  this._url_template = params["url_template"];
};

ImageLoader.prototype.render_height = function() {
	return  Math.floor(this._raw_height * this.render_width() / this._raw_width );
};

ImageLoader.prototype.render_width = function() {
  return this._percent_of_viewport_width * .01 * this._viewport_width;
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
- Maybe set default dpr to 1 if no value is avaialble.  

*/
