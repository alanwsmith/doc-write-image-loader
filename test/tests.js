////////////////////////////////////////////////////////////////////////////////

QUnit.test("Basic test with 2x high-res image call.", function(assert) {

  //////////
  // Given

  var ip = new ImgTagBuilder({ styles: { main: { breakPoints: [ { maxImageDisplayWidth: 800, quality: 85 } ] } } });
  
  //////////
  // When

  ip._multiplier = 2; // Force to '2' so testing works across devices.
  ip.innerWidth = 1000; // Force for testing regardless of device. 

  ip.prep({ image: "horses.jpg", alt: "some horses",  style: "main", maxWidth: 1600, maxHeight: 1000 });


  //////////
  // Then

  // This is the key requirement. Everything else supports it.
  assert.equal(ip.imgTag(),'<img alt="some horses" class="main" width="800" height="500" src="http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_1600,h_1000/horses.jpg">'); 

  // Verify config details are ingested.
  assert.equal(ip._alt, "some horses");
  assert.equal(ip._image, "horses.jpg");
  assert.equal(ip._maxHeight, 1000);
  assert.equal(ip._maxWidth, 1600);
  assert.equal(ip._multiplier, 2);
  assert.equal(ip._style, "main");
  
  // TODO: Figure out how to move this out so it's called dynamically.
  assert.equal(ip._config.styles['main']['breakPoints'][0]['maxImageDisplayWidth'], 800);

  // Method verification 
  assert.equal(ip.callHeight(), 1000);
  assert.equal(ip.callWidth(), 1600);
  assert.equal(ip.displayHeight(), 500);
  assert.equal(ip.displayWidth(), 800);
  assert.equal(ip.url(),'http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_1600,h_1000/horses.jpg'); 
  assert.equal(ip.quality(), 85);
  assert.equal(ip.ratio(), 0.625);

});

////////////////////////////////////////////////////////////////////////////////

QUnit.test("Verify window.devicePixelRatio is pulled in", function(assert) {

	// The other tests force an override to ensure the math works regardless of 
	// the browser being tested. This one just makes sure the data is loaded 
	// normally. 

  
  ///////////
  // Given

  var ip = new ImgTagBuilder({});

  //////////
  // Then

  assert.equal(ip._multiplier, window.devicePixelRatio);

});


////////////////////////////////////////////////////////////////////////////////

// TODO: Duplicate this test setup but target the larger viewport.  

QUnit.test("Test against multiple size options and use the second one.", function(assert) {

  //////////
  // Given

  var breakAlpha = { minViewportWidth: 0, maxImageDisplayWidth: 400, quality: 85 };
  var breakBeta  = { minViewportWidth: 900, maxImageDisplayWidth: 800, quality: 85 };

  var ip = new ImgTagBuilder({ styles: { main: { breakPoints: [ breakBeta, breakAlpha, breakBeta ] } } });

  //////////
  // When

  ip._multiplier = 2; // Force to '2' so testing works across devices.
  ip.innerWidth = 1000; // Force for testing regardless of device. 

  ip.prep({ image: "horses.jpg", alt: "some horses",  style: "main", maxWidth: 1600, maxHeight: 1000 });


  //////////
  // Then

  // This is the key requirement. Everything else supports it.
  assert.equal(ip.imgTag(),'<img alt="some horses" class="main" width="800" height="500" src="http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_1600,h_1000/horses.jpg">'); 


});



