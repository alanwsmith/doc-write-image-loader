var ImageLoader_0_5_x = function() {};

// TODO: Add function that can be called one time to load 
//       environmental parameters.


/************************************************************\
 * Instance Variable Defaults 
\************************************************************/

ImageLoader_0_5_x.prototype._version_number = "0.5.1"; 

ImageLoader_0_5_x.prototype._dpr = 0; 
ImageLoader_0_5_x.prototype._filename= ""; 
ImageLoader_0_5_x.prototype._img_tag_template = '<img src="[SOURCE_URL]" width="[LOGICAL_WIDTH]" height="[LOGICAL_HEIGHT]" alt="[ALT_TEXT]">'; 
ImageLoader_0_5_x.prototype._percent_of_viewport_width = 94; 
ImageLoader_0_5_x.prototype._raw_source_height = 0; 
ImageLoader_0_5_x.prototype._raw_source_width = 0; 
ImageLoader_0_5_x.prototype._url_template = ""; 
ImageLoader_0_5_x.prototype._viewport_height = 0; 
ImageLoader_0_5_x.prototype._viewport_width = 0; 


/************************************************************\
 * Instance Variable Access Methods 
\************************************************************/

ImageLoader_0_5_x.prototype.version_number = function() {
    return this._version_number;
};

///

ImageLoader_0_5_x.prototype.dpr= function() {
    return this._dpr;
};

ImageLoader_0_5_x.prototype.filename = function() {
    return this._filename;
};

ImageLoader_0_5_x.prototype.img_tag_template = function() {
    return this._img_tag_template;
};

ImageLoader_0_5_x.prototype.percent_of_viewport_width = function() {
    return this._percent_of_viewport_width;
};

ImageLoader_0_5_x.prototype.raw_source_height = function() {
    return this._raw_source_height;
};

ImageLoader_0_5_x.prototype.raw_source_width = function() {
    return this._raw_source_width;
};

ImageLoader_0_5_x.prototype.url_template = function() {
    return this._url_template;
};

ImageLoader_0_5_x.prototype.viewport_height = function() {
    return this._viewport_height;
};

ImageLoader_0_5_x.prototype.viewport_width = function() {
    return this._viewport_width;
};



/************************************************************\
 * Integrated Functions
\************************************************************/

ImageLoader_0_5_x.prototype.img_tag_string = function() {

    var source_url = this.url_template();
    source_url = source_url.replace('[FILENAME]', this.filename());
    source_url = source_url.replace('[PHYSICAL_WIDTH]', 1024);
    source_url = source_url.replace('[PHYSICAL_HEIGHT]', 682);

    var return_value = this.img_tag_template();
    return_value = return_value.replace('[ALT_TEXT]', "Photo of Horses"); 
    return_value = return_value.replace('[LOGICAL_WIDTH]', this.logical_width()); 
    return_value = return_value.replace('[LOGICAL_HEIGHT]', 341); 
    return_value = return_value.replace('[SOURCE_URL]', source_url);

    return return_value;
}


/************************************************************\
 * Unit Functions
\************************************************************/

ImageLoader_0_5_x.prototype.logical_width = function() {
    var return_value = Math.min(
        this.raw_source_dpr_max_logical_width(), 
        this.viewport_percentage_max_logical_width() 
    );
    return return_value;
};

ImageLoader_0_5_x.prototype.raw_source_dpr_max_logical_width = function() {
    // `Math.floor` ensures result is an integer that doesn't enlarge.
    var return_value = Math.floor(
        this.raw_source_width() / this.dpr()
    );
    return return_value;
};

ImageLoader_0_5_x.prototype.viewport_percentage_max_logical_width = function() {
    // `Math.floor` ensures result is an integer that doesn't enlarge.
    var return_value = Math.floor(
        this.percent_of_viewport_width() * .01 * this.viewport_width()
    );
    return return_value;
};



/************************************************************\
 * Prior logic

prior: 

ImageLoader_0_5_x.prototype.calculate_logical_width = function(params) {
	// TODO: This can probably be moved to its own function (which should make sure it returns an integer) 
	var viewport_based_max = params['percent_of_viewport_width'] * .01 * params['viewport_width'] ;

	// TODO: Make sure this value is an integer before returning it. 
	return_value = Math.floor(Math.min(params['max_physical_width'], viewport_based_max));

    return return_value;
};

ImageLoader_0_5_x.prototype.render_height = function() {
	return  Math.floor(this._raw_height * this.render_width() / this._raw_width );
	// Math.floor([source_file_height] * [logical_width] / [source_file_width]);
};

ImageLoader_0_5_x.prototype.url_request_height = function() {
  return this.render_height() * this._dpr; 
};

ImageLoader_0_5_x.prototype.url_request_width = function() {
  return this.render_width() * this._dpr; 
};
\************************************************************/








/**********************************************************\
 * NOTE
 *
 * The functions below are deprecated and no longer tested
 * they will be removed when this refactor is complete.
 *
\**********************************************************/


// TODO: Delete this funciton and move its contents into `load_environment`
ImageLoader_0_5_x.prototype.load_environmental_params = function() {
    this._dpr = window.devicePixelRatio ? window.devicePixelRatio : 1;
};



// TODO: Migrate calls from `.url_to_call()` to `.assembled_url`.
ImageLoader_0_5_x.prototype.url_to_call = function() {
	return this._url_template.replace('[WIDTH]', this.url_request_width()).replace('[HEIGHT]', this.url_request_height()).replace('[QUALITY]', this._quality).replace('[IMAGE_NAME]', this._image_name) 
};

ImageLoader_0_5_x.prototype.img_tag = function() {
	return '<img src="' + this.url_to_call() + '" width="' + this.render_width() + '" height="' + this.render_height() + '">'
};

ImageLoader_0_5_x.prototype.load_params = function(params) {
	// This is the core funciton that takes all possible inputs.
	// Convience methods will be used in production, but they will all communicate
	// load_params. 

  // Required
  this._image_name = params["image_name"];
  this._viewport_height = params["viewport_height"];
  this._viewport_width = params["viewport_width"];
  this._raw_height = params["raw_height"];
  this._raw_width = params["raw_width"];
  this._url_template = params["url_template"];

  // Optional 
  this._dpr = params["dpr"] ? params["dpr"] : 1;
  this._max_render_width = params["max_render_width"] ? params["max_render_width"] : params["raw_width"];
  this._percent_of_viewport_width = params["percent_of_viewport_width"] ? params["percent_of_viewport_width"] : 100;
  this._quality = params["quality"] ? params["quality"] : 80;
  
  // If `percent_of_viewport_height` is called, translate it into `_percent_of_viewport_width`.
  if("percent_of_viewport_height" in params) {
    this._percent_of_viewport_width = Math.floor(this._viewport_height * params["percent_of_viewport_height"] * this._raw_width / this._raw_height / this._viewport_width);
  }
  
};

ImageLoader_0_5_x.prototype.render_height = function() {
	return  Math.floor(this._raw_height * this.render_width() / this._raw_width );
};

ImageLoader_0_5_x.prototype.render_width = function() {
	return Math.floor(Math.min(this._max_render_width, (this._percent_of_viewport_width * .01 * this._viewport_width)));
};

ImageLoader_0_5_x.prototype.url_request_height = function() {
  return this.render_height() * this._dpr; 
};

ImageLoader_0_5_x.prototype.url_request_width = function() {
  return this.render_width() * this._dpr; 
};


