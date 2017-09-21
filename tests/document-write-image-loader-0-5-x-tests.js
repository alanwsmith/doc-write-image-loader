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
    var target_version = "0.5.1";
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


QUnit.test("Integration Test 1: Base functionality using the minimum setup and call", function(assert) {

    // Preflight
    var target = '<img src="//res.cloudinary.com/demo/image/upload/w_1024,h_682/horses.jpg" width="512" height="341" alt="Photo of Horses">';

    // Given 
    this.image_loader._alt_text = "Photo of Horses";
    this.image_loader._filename = "horses.jpg";
    // TODO: Remove this since there is a default set so it's not required for the minimal call. 
    this.image_loader._max_percent_of_viewport_logical_width = 50;
    this.image_loader._raw_source_physical_height = 1067;
    this.image_loader._raw_source_physical_width = 1600;
    this.image_loader._url_template = '//res.cloudinary.com/demo/image/upload/w_[PHYSICAL_WIDTH_TO_CALL],h_[PHYSICAL_HEIGHT_TO_CALL]/[FILENAME]';

    // Force environmental variables for testing consistency
    this.image_loader._dpr = 2;
    this.image_loader._viewport_logical_height = 680;
    this.image_loader._viewport_logical_width = 1024;

    // When 
    var result = this.image_loader.img_tag_string();
    
    // Then
    assert.equal(target, result);

});



/************************************************************\
 * Unit Tests 
\************************************************************/

QUnit.test("Unit Test: .logical_height()", function(assert) {
    // Preflight
    var target = 341;

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
    // Preflight
    var target = 512;

    // Given
    this.image_loader._dpr = 2;
    this.image_loader._max_percent_of_viewport_logical_width = 50;
    this.image_loader._raw_source_physical_height = 1067;
    this.image_loader._raw_source_physical_width = 1600;
    this.image_loader._viewport_logical_width = 1024;

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
    var target = '//res.cloudinary.com/demo/image/upload/w_1024,h_682/horses.jpg';

    // Given
    // this.image_loader._alt_text = "Photo of Horses";
    this.image_loader._filename = "horses.jpg";
    this.image_loader._max_percent_of_viewport_logical_width = 50;
    this.image_loader._raw_source_physical_height = 1067;
    this.image_loader._raw_source_physical_width = 1600;
    this.image_loader._url_template = '//res.cloudinary.com/demo/image/upload/w_[PHYSICAL_WIDTH_TO_CALL],h_[PHYSICAL_HEIGHT_TO_CALL]/[FILENAME]';

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

