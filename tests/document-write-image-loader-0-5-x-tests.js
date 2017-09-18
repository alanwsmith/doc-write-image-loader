// TODO:
//
// - See if there is a setup feature so the version number only has 
//   to be changed in one place. 


QUnit.test("Make sure the version number is accurate", function(assert) {

  // Given
  var required_version_number = "0.5.0";

  // When 
  var imageLoader = new ImageLoader_0_5_x(); 

  // Then
  assert.equal(imageLoader.version_number(), required_version_number); 

});


QUnit.test("Integration Test: Basic call verification", function(assert) {

    // Preflight
    var target_string = '<img alt="image description" width="640" height="436" src="http://res.cloudinary.com/demo/image/upload/w_1280,h_852/horses.jpg">';

    // Given
    var imageLoader = new ImageLoader_0_5_x(); 
    imageLoader.load_environment();
    
    // When 
    var image_params = {
        filename: "horses.jpg", 
        alt_text: "Photo of Horses",
        source_width: 1600,
        source_height: 1067
    };

    var result_string = imageLoader.image_string_from_params(image_params);

    // TODO: Add environmental param override to standardize output independent of browser.

    // Then
    assert.equal(result_string, target_string);


});



QUnit.test("Integration Test: Verify environmental parameters load", function(assert) {

    // It's a little weird to tests these params, but I 
    // want to make sure they work for integration purposes. 

    // Given
    var target_dpr = window.devicePixelRatio ? window.devicePixelRatio : 1;

    // When
    var imageLoader = new ImageLoader_0_5_x(); 
    imageLoader.load_environmental_params();

    // Then
    assert.equal(imageLoader._dpr, target_dpr);

});


QUnit.test("2x DPR Basic call stright to load_params", function(assert) {

  // Given
	var imageLoader = new ImageLoader_0_5_x(); 

  // When
  imageLoader.load_params(
    {
    	dpr: 2,
    	image_name: "horses.jpg",
      percent_of_viewport_width: 50,
      quality: 80,
      raw_height: 1067,
      raw_width: 1600,
      viewport_height: 680,
      viewport_width: 1024,
      url_template: "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]"
    }
  );

  // Then - Verify instance variables.
  assert.equal(imageLoader._dpr, 2, "Device pixel resolution"); 
  assert.equal(imageLoader._image_name, "horses.jpg", "Image name"); 
  assert.equal(imageLoader._raw_height, 1067, "Raw image height"); 
  assert.equal(imageLoader._raw_width, 1600, "Raw image width");
  assert.equal(imageLoader._percent_of_viewport_width, 50, "Percent of viewport width"); 
  assert.equal(imageLoader._quality, 80, "Quality level");
  assert.equal(imageLoader._viewport_height, 680, "Viewport height");
  assert.equal(imageLoader._viewport_width, 1024, "Viewport width");
  assert.equal(imageLoader._url_template, "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]", "URL Template");

  // And - Verify functions
  assert.equal(imageLoader.url_to_call(), "http://res.cloudinary.com/demo/image/upload/w_1024,h_682,q_80/horses.jpg", "Final URL");
  assert.equal(imageLoader.render_height(), 341, "Render height");
  assert.equal(imageLoader.render_width(), 512, "Render width");
  assert.equal(imageLoader.url_request_height(), 682, "Request height");
  assert.equal(imageLoader.url_request_width(), 1024, "Request width");
  assert.equal(imageLoader.img_tag(), '<img src="http://res.cloudinary.com/demo/image/upload/w_1024,h_682,q_80/horses.jpg" width="512" height="341">', "Image tag");

});

QUnit.test("2x DPR stright to load_params with max width enforced", function(assert) {

  // Given
  var imageLoader = new ImageLoader_0_5_x();

  // When
  imageLoader.load_params(
    {
      dpr: 2,
      image_name: "horses.jpg",
      percent_of_viewport_width: 50,
      quality: 80,
      raw_height: 1067,
      raw_width: 1600,
      max_render_width: 200,
      viewport_height: 680,
      viewport_width: 1024,
      url_template: "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]"
    }
  );

  // Then:
  assert.equal(imageLoader._max_render_width, 200, "Max render width");
  assert.equal(imageLoader.render_width(), 200, "Verify render_width == max_render_width");
  assert.equal(imageLoader.render_height(), 133, "Verify render_width == max_render_width");
  assert.equal(imageLoader.url_request_width(), 400, "Request width");
  assert.equal(imageLoader.url_request_height(), 266, "Request height");

});


QUnit.test("Verify defaults", function(assert) {

  // Given
  var imageLoader = new ImageLoader_0_5_x();

  // When
  imageLoader.load_params(
    {
      image_name: "horses.jpg",
      raw_height: 1067,
      raw_width: 1600,
      viewport_height: 680,
      viewport_width: 1024,
      url_template: "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]"
    }
  );

  // Then:
  assert.equal(imageLoader._max_render_width, 1600, "Default Max Render Width == Raw Width"); 
  assert.equal(imageLoader._dpr, 1, "Device pixel ratio default");
  assert.equal(imageLoader._percent_of_viewport_width, 100, "Percent of viewport width default");
  assert.equal(imageLoader._quality, 80, "Quality default");

});



QUnit.test("Ensure values are integers", function(assert) {
  
  // Given
  var imageLoader = new ImageLoader_0_5_x();

  // When
  imageLoader.load_params(
    {
    	dpr: 2,
      image_name: "horses.jpg",
      percent_of_viewport_width: 25,
      raw_height: 1067,
      raw_width: 1600,
      viewport_height: 680,
      viewport_width: 1021,
      url_template: "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]"
    }
  );

  // Then:
  assert.equal(imageLoader.render_height(), 170, "Render height");
  assert.equal(imageLoader.render_width(), 255, "Render width is 255 and not 255.25");
  assert.equal(imageLoader.url_request_height(), 340, "Request height");
  assert.equal(imageLoader.url_request_width(), 510, "Request width is 510 and not 510.5");

});


QUnit.test("Restrict height", function(assert) {

  // Given
  var imageLoader = new ImageLoader_0_5_x();

  // When
  imageLoader.load_params(
    {
    	dpr: 1,
      image_name: "horses.jpg",
      percent_of_viewport_height: 90,
      raw_height: 2000,
      raw_width: 2200,
      viewport_height: 1000,
      viewport_width: 1800,
      url_template: "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]"
    }
  );
  
  assert.equal(imageLoader.render_height(), 900, "Render height");
  

});


