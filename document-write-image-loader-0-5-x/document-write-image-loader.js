var ImageLoader_0_5_x = function() {};

// TODO: Add function that can be called one time to load 
//       environmental parameters.


/************************************************************\
 * Instance Variable Defaults 
\************************************************************/

ImageLoader_0_5_x.prototype._version_number = "0.5.2"; 

ImageLoader_0_5_x.prototype._alt_text = "";
ImageLoader_0_5_x.prototype._dpr = 0; 
ImageLoader_0_5_x.prototype._filename= ""; 
ImageLoader_0_5_x.prototype._img_tag_template = '<img src="[SOURCE_URL]" width="[LOGICAL_WIDTH_FOR_ATTRIBUTE]" height="[LOGICAL_HEIGHT_FOR_ATTRIBUTE]" alt="[ALT_TEXT]">'; 
ImageLoader_0_5_x.prototype._max_percent_of_viewport_logical_width = 94; 
ImageLoader_0_5_x.prototype._raw_source_physical_height = 0; 
ImageLoader_0_5_x.prototype._raw_source_physical_width = 0; 
ImageLoader_0_5_x.prototype._url_template = ""; 
ImageLoader_0_5_x.prototype._viewport_logical_height = 0; 
ImageLoader_0_5_x.prototype._viewport_logical_width = 0; 


/************************************************************\
 * Instance Variable Access Methods 
\************************************************************/

ImageLoader_0_5_x.prototype.version_number = function() {
    return this._version_number;
};

///

ImageLoader_0_5_x.prototype.alt_text = function() {
    return this._alt_text;
};

ImageLoader_0_5_x.prototype.dpr = function() {
    return this._dpr;
};

ImageLoader_0_5_x.prototype.filename = function() {
    return this._filename;
};

ImageLoader_0_5_x.prototype.img_tag_template = function() {
    return this._img_tag_template;
};

ImageLoader_0_5_x.prototype.max_percent_of_viewport_logical_width = function() {
    return this._max_percent_of_viewport_logical_width;
};

ImageLoader_0_5_x.prototype.raw_source_physical_height = function() {
    return this._raw_source_physical_height;
};

ImageLoader_0_5_x.prototype.raw_source_physical_width = function() {
    return this._raw_source_physical_width;
};

ImageLoader_0_5_x.prototype.url_template = function() {
    return this._url_template;
};

ImageLoader_0_5_x.prototype.viewport_logical_height = function() {
    return this._viewport_logical_height;
};

ImageLoader_0_5_x.prototype.viewport_logical_width = function() {
    return this._viewport_logical_width;
};


/************************************************************\
 * Integrated Functions
\************************************************************/

ImageLoader_0_5_x.prototype.img_tag_string = function() {
    var return_value = this.img_tag_template();
    return_value = return_value.replace('[ALT_TEXT]', this.alt_text()); 
    return_value = return_value.replace('[LOGICAL_WIDTH_FOR_ATTRIBUTE]', this.logical_width()); 
    return_value = return_value.replace('[LOGICAL_HEIGHT_FOR_ATTRIBUTE]', this.logical_height()); 
    return_value = return_value.replace('[SOURCE_URL]', this.url_string());
    return return_value;
}


/************************************************************\
 * Unit Functions
\************************************************************/


ImageLoader_0_5_x.prototype.image_tag_string_from_params = function(params) {

    return '<img src...';

};

ImageLoader_0_5_x.prototype.load_environment_with_url_template = function(url_template) {
    this._url_template = url_template;
    this._dpr = window.devicePixelRatio ? window.devicePixelRatio : 1;
    this._viewport_logical_width = window.innerWidth;
    this._viewport_logical_height = window.innerHeight;
};


ImageLoader_0_5_x.prototype.logical_height = function() {
    var return_value = Math.floor(
        this.raw_source_physical_height() * this.logical_width() / this.raw_source_physical_width()
    );
    return return_value;
};

// ImageLoader_0_5_x.prototype.logical_width = function() {
//     var return_value = Math.min(
//         this.raw_source_dpr_max_logical_width(), 
//         this.viewport_percentage_max_logical_width() 
//     );
//     return return_value;
// };

ImageLoader_0_5_x.prototype.logical_width = function() {
    var return_value = Math.min(
        this.raw_source_dpr_max_logical_width(), 
        this.viewport_percentage_max_logical_width() 
    );
    // Round down to nearest ten to reduce number of versions created
    return_value = (Math.floor(return_value / 10) * 10);
    return return_value;
};

ImageLoader_0_5_x.prototype.physical_height_to_call = function() {
    var return_value = Math.floor(
        this.logical_height() * this.dpr()
    );
    return return_value;
};

ImageLoader_0_5_x.prototype.physical_width_to_call = function() {
	var return_value = Math.floor(
        this.logical_width() * this.dpr()
    );
	return return_value;
};

ImageLoader_0_5_x.prototype.raw_source_dpr_max_logical_width = function() {
    var return_value = Math.floor(
        this.raw_source_physical_width() / this.dpr()
    );
    return return_value;
};

ImageLoader_0_5_x.prototype.url_string = function() {
    var return_value = this.url_template();
    return_value = return_value.replace('[PHYSICAL_WIDTH_TO_CALL]', this.physical_width_to_call());
    return_value = return_value.replace('[PHYSICAL_HEIGHT_TO_CALL]', this.physical_height_to_call());
    return_value = return_value.replace('[FILENAME]', this.filename());
    return return_value;
};

ImageLoader_0_5_x.prototype.viewport_percentage_max_logical_width = function() {
    var return_value = Math.floor(
        this.max_percent_of_viewport_logical_width() * .01 * this.viewport_logical_width()
    );
    return return_value;
};


