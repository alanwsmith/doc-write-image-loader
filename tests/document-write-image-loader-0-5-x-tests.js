QUnit.module("Loader Factory", {
    before: function() {
        console.log("Kickoff: " + Math.random());
    },
    beforeEach: function() {
        console.log("Creating new test object");
        this.image_loader = new ImageLoader_0_5_x();
    }
});


/************************************************************\
 * Set Defaults and Version Number 
\************************************************************/

QUnit.test("Confirm version number", function(assert) {
    var target_version = "0.5.1";
    assert.equal(target_version, this.image_loader.version_number()); 
});

///

QUnit.test("Confirm default for .dpr()", function(assert) {
    var target = 0;
    var result = this.image_loader.dpr(); 
    assert.equal(result, target);
});

QUnit.test("Confirm default for .filename()", function(assert) {
    var target = "";
    var result = this.image_loader.filename(); 
    assert.equal(result, target);
});

QUnit.test("Confirm default for .img_tag_template()", function(assert) {
    var target = '<img src="[SOURCE_URL]" width="[LOGICAL_WIDTH]" height="[LOGICAL_HEIGHT]" alt="[ALT_TEXT]">';
    var result = this.image_loader.img_tag_template(); 
    assert.equal(result, target);
});

QUnit.test("Confirm default for .percent_of_viewport_width()", function(assert) {
    var target = 94;
    var result = this.image_loader.percent_of_viewport_width(); 
    assert.equal(result, target);
});

QUnit.test("Confirm default for .raw_source_heigth()", function(assert) {
    var target = 0;
    var result = this.image_loader.raw_source_height(); 
    assert.equal(result, target);
});

QUnit.test("Confirm default for .raw_source_width()", function(assert) {
    var target = 0;
    var result = this.image_loader.raw_source_width(); 
    assert.equal(result, target);
});

QUnit.test("Confirm default for .url_template()", function(assert) {
    var target = "";
    var result = this.image_loader.url_template(); 
    assert.equal(result, target);
});

QUnit.test("Confirm default for .viewport_height()", function(assert) {
    var target = 0;
    var result = this.image_loader.viewport_height(); 
    assert.equal(result, target);
});

QUnit.test("Confirm default for .viewport_width()", function(assert) {
    var target = 0;
    var result = this.image_loader.viewport_width(); 
    assert.equal(result, target);
});


/************************************************************\
 * Integration Tests 
\************************************************************/


QUnit.test("Integration Test 1: Base functionality using the minimum setup and call", function(assert) {

    // Preflight
    var target = '<img src="//res.cloudinary.com/demo/image/upload/w_1024,h_682/horses.jpg" width="512" height="341" alt="Photo of Horses">';

    // Given 
    this.image_loader._alt_text = "Photo of Horses";
    this.image_loader._filename = "horses.jpg";
    this.image_loader._percent_of_viewport_width = 50;
    this.image_loader._raw_source_height = 1067;
    this.image_loader._raw_source_width = 1600;
    this.image_loader._url_template = '//res.cloudinary.com/demo/image/upload/w_[PHYSICAL_WIDTH],h_[PHYSICAL_HEIGHT]/[FILENAME]';

    // Force environmental variables for testing consistency
    this.image_loader._dpr = 2;
    this.image_loader._viewport_height = 680;
    this.image_loader._viewport_width = 1024;

    // When 
    var result = this.image_loader.img_tag_string();
    
    // Then
    assert.equal(target, result);

});


/************************************************************\
 * Unit Tests 
\************************************************************/

QUnit.test("Unit Test: .logical_height()", function(assert) {

});



// TODO:
// QUnit.test("Unit Test: .logical_width() - when `.raw_souce_height()` is the limiting factor instead of `.raw_souce_width()", function(assert) {
// 
// });


QUnit.test("Unit Test: .logical_width() - when .viewport_percentage_max_logical_width() is returned", function(assert) {
    // Preflight
    var target = 512;

    // Given
    this.image_loader._dpr = 2;
    this.image_loader._percent_of_viewport_width = 50;
    this.image_loader._raw_source_width = 1600;
    this.image_loader._viewport_width = 1024;

    // When
    var result = this.image_loader.logical_width(); 

    // Then
    assert.equal(result, target);
});


QUnit.test("Unit Test: .logical_width() - when .raw_source_dpr_max_logical_width() is returned", function(assert) {
    // Preflight
    var target = 400;

    // Given
    this.image_loader._dpr = 2;
    this.image_loader._percent_of_viewport_width = 100;
    this.image_loader._raw_source_width = 800;
    this.image_loader._viewport_width = 1024;
    
    // When
    var result = this.image_loader.logical_width();

    // Then
    assert.equal(result, target);
});





QUnit.test("Unit Test: .raw_source_dpr_max_logical_width()", function(assert) {
    // Preflight
    var target = 87;

    // Given
    this.image_loader._dpr = 2;
    this.image_loader._raw_source_width = 175;

    // When
    var result = this.image_loader.raw_source_dpr_max_logical_width();

    // Then
    assert.equal(result, target);
});


QUnit.test("Unit Test: .viewport_percentage_max_logical_width()", function(assert) {
    // Preflight
    var target = 819;

    // Given
    this.image_loader._percent_of_viewport_width = 80;
    this.image_loader._viewport_width = 1024;

    // When
    var result = this.image_loader.viewport_percentage_max_logical_width();

    // Then
    assert.equal(result, target);
}); 




/******************************************************\
 * DEPRECATED TESTS
 *
 * The tests below are for the prior versoin. They 
 * are being kept temporarirly to make sure new 
 * versions testing the same things are completed 
 * before they are removed. 
 *
/******************************************************/

// QUnit.test("2x DPR Basic call stright to load_params", function(assert) {
// 
//   // Given
// 	var imageLoader = new ImageLoader_0_5_x(); 
// 
//   // When
//   imageLoader.load_params(
//     {
//     	dpr: 2,
//     	image_name: "horses.jpg",
//       percent_of_viewport_width: 50,
//       quality: 80,
//       raw_height: 1067,
//       raw_width: 1600,
//       viewport_height: 680,
//       viewport_width: 1024,
//       url_template: "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]"
//     }
//   );
// 
//   // Then - Verify instance variables.
//   assert.equal(imageLoader._dpr, 2, "Device pixel resolution"); 
//   assert.equal(imageLoader._image_name, "horses.jpg", "Image name"); 
//   assert.equal(imageLoader._raw_height, 1067, "Raw image height"); 
//   assert.equal(imageLoader._raw_width, 1600, "Raw image width");
//   assert.equal(imageLoader._percent_of_viewport_width, 50, "Percent of viewport width"); 
//   assert.equal(imageLoader._quality, 80, "Quality level");
//   assert.equal(imageLoader._viewport_height, 680, "Viewport height");
//   assert.equal(imageLoader._viewport_width, 1024, "Viewport width");
//   assert.equal(imageLoader._url_template, "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]", "URL Template");
// 
//   // And - Verify functions
//   assert.equal(imageLoader.url_to_call(), "http://res.cloudinary.com/demo/image/upload/w_1024,h_682,q_80/horses.jpg", "Final URL");
//   assert.equal(imageLoader.render_height(), 341, "Render height");
//   assert.equal(imageLoader.render_width(), 512, "Render width");
//   assert.equal(imageLoader.url_request_height(), 682, "Request height");
//   assert.equal(imageLoader.url_request_width(), 1024, "Request width");
//   assert.equal(imageLoader.img_tag(), '<img src="http://res.cloudinary.com/demo/image/upload/w_1024,h_682,q_80/horses.jpg" width="512" height="341">', "Image tag");
// 
// });
// 
// QUnit.test("2x DPR stright to load_params with max width enforced", function(assert) {
// 
//   // Given
//   var imageLoader = new ImageLoader_0_5_x();
// 
//   // When
//   imageLoader.load_params(
//     {
//       dpr: 2,
//       image_name: "horses.jpg",
//       percent_of_viewport_width: 50,
//       quality: 80,
//       raw_height: 1067,
//       raw_width: 1600,
//       max_render_width: 200,
//       viewport_height: 680,
//       viewport_width: 1024,
//       url_template: "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]"
//     }
//   );
// 
//   // Then:
//   assert.equal(imageLoader._max_render_width, 200, "Max render width");
//   assert.equal(imageLoader.render_width(), 200, "Verify render_width == max_render_width");
//   assert.equal(imageLoader.render_height(), 133, "Verify render_width == max_render_width");
//   assert.equal(imageLoader.url_request_width(), 400, "Request width");
//   assert.equal(imageLoader.url_request_height(), 266, "Request height");
// 
// });
// 
// 
// QUnit.test("Verify defaults", function(assert) {
// 
//   // Given
//   var imageLoader = new ImageLoader_0_5_x();
// 
//   // When
//   imageLoader.load_params(
//     {
//       image_name: "horses.jpg",
//       raw_height: 1067,
//       raw_width: 1600,
//       viewport_height: 680,
//       viewport_width: 1024,
//       url_template: "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]"
//     }
//   );
// 
//   // Then:
//   assert.equal(imageLoader._max_render_width, 1600, "Default Max Render Width == Raw Width"); 
//   assert.equal(imageLoader._dpr, 1, "Device pixel ratio default");
//   assert.equal(imageLoader._percent_of_viewport_width, 100, "Percent of viewport width default");
//   assert.equal(imageLoader._quality, 80, "Quality default");
// 
// });
// 
// 
// 
// QUnit.test("Ensure values are integers", function(assert) {
//   
//   // Given
//   var imageLoader = new ImageLoader_0_5_x();
// 
//   // When
//   imageLoader.load_params(
//     {
//     	dpr: 2,
//       image_name: "horses.jpg",
//       percent_of_viewport_width: 25,
//       raw_height: 1067,
//       raw_width: 1600,
//       viewport_height: 680,
//       viewport_width: 1021,
//       url_template: "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]"
//     }
//   );
// 
//   // Then:
//   assert.equal(imageLoader.render_height(), 170, "Render height");
//   assert.equal(imageLoader.render_width(), 255, "Render width is 255 and not 255.25");
//   assert.equal(imageLoader.url_request_height(), 340, "Request height");
//   assert.equal(imageLoader.url_request_width(), 510, "Request width is 510 and not 510.5");
// 
// });
// 
// 
// QUnit.test("Restrict height", function(assert) {
// 
//   // Given
//   var imageLoader = new ImageLoader_0_5_x();
// 
//   // When
//   imageLoader.load_params(
//     {
//     	dpr: 1,
//       image_name: "horses.jpg",
//       percent_of_viewport_height: 90,
//       raw_height: 2000,
//       raw_width: 2200,
//       viewport_height: 1000,
//       viewport_width: 1800,
//       url_template: "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]"
//     }
//   );
//   
//   assert.equal(imageLoader.render_height(), 900, "Render height");
//   
// 
// });
// 
// 
