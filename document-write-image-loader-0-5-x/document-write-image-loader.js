var ImageLoader_0_5_x = function() {};

// TODO: Add function that can be called one time to load 
//       environmental parameters.

ImageLoader_0_5_x.prototype.version_number = function() {
    return "0.5.0";
};


/************************************************************\
 * Defaults 
\************************************************************/

ImageLoader_0_5_x.prototype._max_width_of_window_percentage = 94; 


/************************************************************\
 * Integrated Functions
\************************************************************/

ImageLoader_0_5_x.prototype.image_string_from_params = function(params) {
    
    // TODO: Migrate to using non-stubbed values. 
    var _logical_width = this.calculate_logical_width({
        max_physical_width: 640,
        percent_of_viewport_width: 94,
        viewport_width: 1028
	}); 

    // TODO: Make a function to build the display height 
    var _logical_height = 436;

    // TODO: Make a function to build the URL call width
    var _physical_width = 1280;

    // TODO: Make a function to build the URL call height
    var _physical_height = 852; 


    // TODO: Move URL string creation to its own function.
    var output_url = this._url_template;
    output_url = output_url.replace('[PHYSICAL_WIDTH]', _physical_width);
    output_url = output_url.replace('[PHYSICAL_HEIGHT]', _physical_height);
    output_url = output_url.replace('[FILENAME]', params['filename']); 


    // Define the template for the output string. 
    // TODO: Move this to its own function.
    var output_string = '<img alt="[ALT_TEXT]" width="[LOGICAL_WIDTH]" height="[LOGICAL_HEIGHT]" src="[URL]">';
    output_string = output_string.replace('[ALT_TEXT]', params['alt_text']);
    output_string = output_string.replace('[LOGICAL_WIDTH]', _logical_width);
    output_string = output_string.replace('[LOGICAL_HEIGHT]', _logical_height);
    output_string = output_string.replace('[URL]', output_url);

    return output_string;
};


/************************************************************\
 * Instance Variable Functions
\************************************************************/

ImageLoader_0_5_x.prototype._set_source_file_width = function(integer) {
    this._instance_source_file_width = integer;
};

ImageLoader_0_5_x.prototype._source_file_width = function() {
    return this._instance_source_file_width;
};




/************************************************************\
 * Unit Functions
\************************************************************/


/************************************************************\
 * Prior logic
ImageLoader_0_5_x.prototype.render_height = function() {
	return  Math.floor(this._raw_height * this.render_width() / this._raw_width );
};

ImageLoader_0_5_x.prototype.url_request_height = function() {
  return this.render_height() * this._dpr; 
};

ImageLoader_0_5_x.prototype.url_request_width = function() {
  return this.render_width() * this._dpr; 
};
\************************************************************/


ImageLoader_0_5_x.prototype.calculate_logical_height = function() {

    // Prior logic
	// Math.floor([source_file_height] * [logical_width] / [source_file_width]);


    // TKTKTKTKTK - Pick back up here.
    var return_value = this._source_file_width();
        // return_value = this._logical_width();


    // SAFETY VALVE - To get back to green quickly if necessary
    // return_value = 436;

    return return_value;

};

ImageLoader_0_5_x.prototype.calculate_logical_width = function(params) {
	// TODO: This can probably be moved to its own function (which should make sure it returns an integer) 
	var viewport_based_max = params['percent_of_viewport_width'] * .01 * params['viewport_width'] ;

	// TODO: Make sure this value is an integer before returning it. 
	return_value = Math.floor(Math.min(params['max_physical_width'], viewport_based_max));

    return return_value;
};


ImageLoader_0_5_x.prototype.set_url_template= function(url_template) {
    // TODO: Add check to make sure first two characters are `//` so `http` or `https` is used automatically
    this._url_template = url_template;
};


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


