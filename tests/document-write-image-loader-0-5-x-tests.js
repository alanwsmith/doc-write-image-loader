QUnit.module("Loader Factory", {
    before: function() {
        console.log("Kickoff: " + Math.random());
    },
    beforeEach: function() {
        // console.log("Creating new test object");
        this.image_loader = new ImageLoader_0_5_x();
    }
});


/************************************************************\
 * Set Defaults and Version Number 
\************************************************************/

QUnit.test("Confirm version number", function(assert) {
    var target_version = "0.5.2";
    assert.equal(target_version, this.image_loader.version_number()); 
});

///

QUnit.test("Confirm default for .alt_text()", function(assert) {
    var target = "";
    var result = this.image_loader.alt_text();
    assert.equal(result, target);
});

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
    var target = '<img src="[SOURCE_URL]" width="[LOGICAL_WIDTH_FOR_ATTRIBUTE]" height="[LOGICAL_HEIGHT_FOR_ATTRIBUTE]" alt="[ALT_TEXT]">';
    var result = this.image_loader.img_tag_template(); 
    assert.equal(result, target);
});

QUnit.test("Confirm default for .max_percent_of_viewport_logical_width()", function(assert) {
    var target = 94;
    var result = this.image_loader.max_percent_of_viewport_logical_width(); 
    assert.equal(result, target);
});

QUnit.test("Confirm default for .raw_source_heigth()", function(assert) {
    var target = 0;
    var result = this.image_loader.raw_source_physical_height(); 
    assert.equal(result, target);
});

QUnit.test("Confirm default for .raw_source_physical_width()", function(assert) {
    var target = 0;
    var result = this.image_loader.raw_source_physical_width(); 
    assert.equal(result, target);
});

QUnit.test("Confirm default for .url_template()", function(assert) {
    var target = "";
    var result = this.image_loader.url_template(); 
    assert.equal(result, target);
});

QUnit.test("Confirm default for .viewport_logical_height()", function(assert) {
    var target = 0;
    var result = this.image_loader.viewport_logical_height(); 
    assert.equal(result, target);
});

QUnit.test("Confirm default for .viewport_logical_width()", function(assert) {
    var target = 0;
    var result = this.image_loader.viewport_logical_width(); 
    assert.equal(result, target);
});


/************************************************************\
 * Integration Tests 
\************************************************************/


QUnit.test ("Integration Test 1: Base functionality with minimal call", function(assert) {
    // Remember: There should be no need to test different iterations of limiting 
    // either by physical dimension or viewport percentage. All that math should be 
    // tested at the unit level. As long as a single pass through here works for 
    // the minimum set of values, the unit tests are responsible for handling 
    // everything else. (It may be worth setting up a run thru multiple just
    // as an exercise, but for dev, just use it and let that experience determine
    // if you need to add more and if so where.) 
    //
    // There should also be no need to do another version with a custom setting
    // for `max_percetage_of_viewport_logical_width`. That is already being 
    // exercies here with a value of `94` and setting a custom value would 
    // just push the new value through the exact same logic/formula. 

    // Preflight
    var target = '<img src="//res.cloudinary.com/demo/image/upload/c_fill,w_1536,h_1024/horses.jpg" width="960" height="640" alt="Photo of Horses">';

    // Force environmental variables for testing consistency
    // NOTE: the normal funcation isn't used because these values would be dynamic
    this.image_loader._dpr = 1.6;
    this.image_loader._viewport_logical_width = 1024;
    this.image_loader._viewport_logical_height = 680;

    // Given 
    this.image_loader._url_template = '//res.cloudinary.com/demo/image/upload/c_fill,w_[PHYSICAL_WIDTH_TO_CALL],h_[PHYSICAL_HEIGHT_TO_CALL]/[FILENAME]';

    // When 
    this.image_loader._alt_text = "Photo of Horses";
    this.image_loader._filename = "horses.jpg";
    this.image_loader._raw_source_physical_width = 1600;
    this.image_loader._raw_source_physical_height = 1067;

    var result = this.image_loader.img_tag_string();
    
    // Then
    assert.equal(result, target);

});



/************************************************************\
 * Unit Tests 
\************************************************************/


QUnit.test("Unit Test: .load_environment_with_url_template(STRING)", function(assert) {
    // NOTE: This function loads dynamic variables from the environment.
    // Confirmation is done by comparing the same env variables pulled
    // dynamically during testing execution. Seems like the simpelest way
    // to verify things are loaded. Not sure what would happen if testing 
    // is done in a headless environment. Will cross that bridge if it
    // becomes necessary.  

    // Given
    var target_url = '//res.cloudinary.com/demo/image/upload/c_fill,w_[PHYSICAL_WIDTH_TO_CALL],h_[PHYSICAL_HEIGHT_TO_CALL]/[FILENAME]';

    // When
    this.image_loader.load_environment_with_url_template(target_url);

    // Then
    assert.equal(this.image_loader.url_template(), target_url, "URL Template");
    assert.equal(this.image_loader.dpr(), window.devicePixelRatio, "Device Pixel Ratio");
    assert.equal(this.image_loader.viewport_logical_width(), window.innerWidth, "Viewport Width");
    assert.equal(this.image_loader.viewport_logical_height(), window.innerHeight, "Viewport Height");
});


QUnit.test("Unit Test: .logical_height()", function(assert) {
    // Preflight
    var target = 340;

    // Given
    this.image_loader._dpr = 2;
    this.image_loader._max_percent_of_viewport_logical_width = 50;
    this.image_loader._raw_source_physical_height = 1067;
    this.image_loader._raw_source_physical_width = 1600;
    this.image_loader._viewport_logical_width = 1024;
     
    // When
    var result = this.image_loader.logical_height();

    // Then
    assert.equal(result, target);
});

QUnit.test("Unit Test: .logical_width() - when .viewport_percentage_max_logical_width() is returned", function(assert) {

    // NOTE: Without rounding, the value would be `527`, but it's rounded down to `520`. 

    // Preflight
    var target = 520;

    // Given
    this.image_loader._dpr = 2;
    this.image_loader._max_percent_of_viewport_logical_width = 51;
    this.image_loader._raw_source_physical_height = 1067;
    this.image_loader._raw_source_physical_width = 1600;
    this.image_loader._viewport_logical_width = 1035;

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
    this.image_loader._max_percent_of_viewport_logical_width = 100;
    this.image_loader._raw_source_physical_height = 600;
    this.image_loader._raw_source_physical_width = 800;
    this.image_loader._viewport_logical_width = 1024;
    
    // When
    var result = this.image_loader.logical_width();

    // Then
    assert.equal(result, target);
});


QUnit.test("Unit Test: .physical_height_to_call()", function(assert) {
    // Preflight
    var target = 600;

    // Given
    this.image_loader._dpr = 2;
    this.image_loader._max_percent_of_viewport_logical_width = 100;
    this.image_loader._raw_source_physical_height = 600;
    this.image_loader._raw_source_physical_width = 800;
    this.image_loader._viewport_logical_width = 1024;

    // When
    var result = this.image_loader.physical_height_to_call();

    // Then
    assert.equal(result, target);
});


QUnit.test("Unit Test: .physical_width_to_call()", function(assert) {
    // NOTE: This test doesn't exercise the `Math.floor` portion
    // of the function. I'm not sure if it's necessary for the funciton, 
    // but it's been added for safety. TODO: look into this to see
    // if it's necessary and if so, design a test to verify it. 
    

    // Preflight
    var target = 800;

    // Given
    this.image_loader._dpr = 2;
    this.image_loader._max_percent_of_viewport_logical_width = 100;
    this.image_loader._raw_source_physical_height = 600;
    this.image_loader._raw_source_physical_width = 800;
    this.image_loader._viewport_logical_width = 1024;

    // When
    var result = this.image_loader.physical_width_to_call();

    // Then
    assert.equal(result, target);
});



QUnit.test("Unit Test: .raw_source_dpr_max_logical_width()", function(assert) {
    // Preflight
    var target = 87;

    // Given
    this.image_loader._dpr = 2;
    this.image_loader._raw_source_physical_width = 175;

    // When
    var result = this.image_loader.raw_source_dpr_max_logical_width();

    // Then
    assert.equal(result, target);
});

QUnit.test("Unit Test: .url_string()", function(assert) {
    // Preflight
    var target = '//res.cloudinary.com/demo/image/upload/c_fill,w_1020,h_680/horses.jpg';

    // Given
    // this.image_loader._alt_text = "Photo of Horses";
    this.image_loader._filename = "horses.jpg";
    this.image_loader._max_percent_of_viewport_logical_width = 50;
    this.image_loader._raw_source_physical_height = 1067;
    this.image_loader._raw_source_physical_width = 1600;
    this.image_loader._url_template = '//res.cloudinary.com/demo/image/upload/c_fill,w_[PHYSICAL_WIDTH_TO_CALL],h_[PHYSICAL_HEIGHT_TO_CALL]/[FILENAME]';

    // Force environmental variables for testing consistency
    this.image_loader._dpr = 2;
    this.image_loader._viewport_logical_height = 680;
    this.image_loader._viewport_logical_width = 1024;
    
    // When
    var result = this.image_loader.url_string();

    // Then
    assert.equal(result, target);

});

QUnit.test("Unit Test: .viewport_percentage_max_logical_width()", function(assert) {
    // Preflight
    var target = 819;

    // Given
    this.image_loader._max_percent_of_viewport_logical_width = 80;
    this.image_loader._viewport_logical_width = 1024;

    // When
    var result = this.image_loader.viewport_percentage_max_logical_width();

    // Then
    assert.equal(result, target);
}); 

