var ImageLoader = function() {

}

ImageLoader.prototype.url_to_call = function() {
  return "http://res.cloudinary.com/demo/image/upload/w_512,h_341/horses.jpg"; 
};

ImageLoader.prototype.load_params = function(params) {
  console.log(params); 
  this._window_inner_width = params["window_inner_width"];
  this._width_percentage = params["width_percentage"];
};

ImageLoader.prototype.tag_height = function() {
  return 341;
};

ImageLoader.prototype.tag_width = function() {
  return this._width_percentage * .01 * this._window_inner_width;
};
