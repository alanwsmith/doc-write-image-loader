////////////////////////////////////////////////////////////////////////////////

QUnit.test("Ensure local variabes are set properly", function(assert) {
	
	//////////
	// Give

  var ip = new ImgTagBuilder({ styles: { main: { breakPoints: [ { minViewportWidth: 0, maxImageDisplayWidth: 800, quality: 85 } ] } } });


  //////////
  // Then

  assert.equal(ip._innerWidth, window.innerWidth, "_innerWidth");
  assert.equal(ip._innerHeight, window.innerHeight, "_innerHeight");
  assert.equal(ip._devicePixelRatio, window.devicePixelRatio, "_devicePixelRatio");

});


////////////////////////////////////////////////////////////////////////////////

QUnit.test("2x high-res image call", function(assert) {

  //////////
  // Given

  var ip = new ImgTagBuilder({ styles: { main: { breakPoints: [ { minViewportWidth: 0, maxImageDisplayWidth: 800, quality: 85 } ] } } });
  
  
  //////////
  // When

  ip._devicePixelRatio = 2; // Force to '2' so testing works across devices.
  ip._innerWidth = 1000; // Force for testing regardless of device. 

  ip.prep({ image: "horses.jpg", alt: "some horses",  style: "main", maxWidth: 1600, maxHeight: 1000 });


  //////////
  // Then

  // This is the key requirement. Everything else supports it.
  assert.equal(ip.imgTag(),'<img alt="some horses" class="main" width="800" height="500" src="http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_1600,h_1000/horses.jpg">', "Target `img` tag."); 

  // Verify config details are ingested.
  assert.equal(ip._alt, "some horses", "_alt");
  assert.equal(ip._image, "horses.jpg", "_image");
  assert.equal(ip._maxHeight, 1000, "_maxHeight");
  assert.equal(ip._maxWidth, 1600, "_maxWidth");
  assert.equal(ip._devicePixelRatio, 2, "_devidePixelRatio");
  assert.equal(ip._style, "main", "_style");
  
  // TODO: Figure out how to move this out so it's called dynamically.
  assert.equal(ip._config.styles['main']['breakPoints'][0]['maxImageDisplayWidth'], 800, "maxImageDisplayWidth");

  // Method verification 
  assert.equal(ip.callHeight(), 1000, "callHeight()");
  assert.equal(ip.callWidth(), 1600, "callWidth()");
  assert.equal(ip.displayHeight(), 500, "displayHeight()");
  assert.equal(ip.displayWidth(), 800, "displayWidth()");
  assert.equal(ip.url(),'http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_1600,h_1000/horses.jpg', "url()"); 
  assert.equal(ip.quality(), 85, "quality()");
  assert.equal(ip.ratio(), 0.625, "ratio()");

});


////////////////////////////////////////////////////////////////////////////////

QUnit.test("Pick the larger of two config options (in decending order) based on innerWidth", function(assert) {

  //////////
  // Given

  var breakAlpha = { minViewportWidth: 900, maxImageDisplayWidth: 800, quality: 85 };
  var breakBravo = { minViewportWidth: 0, maxImageDisplayWidth: 400, quality: 85 };

  var ip = new ImgTagBuilder({ styles: { main: { breakPoints: [ breakAlpha, breakBravo ] } } });


  //////////
  // When

  ip._devicePixelRatio = 2; // Force to '2' so testing works across devices.
  ip._innerWidth = 1000; // Force for testing regardless of device. 

  ip.prep({ image: "horses.jpg", alt: "some horses",  style: "main", maxWidth: 1600, maxHeight: 1000 });


  //////////
  // Then

  // This is the key requirement. Everything else supports it.
  assert.equal(ip.imgTag(),'<img alt="some horses" class="main" width="800" height="500" src="http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_1600,h_1000/horses.jpg">', "Target `img` tag"); 

});


////////////////////////////////////////////////////////////////////////////////

QUnit.test("Pick the smaller of two config options (in decending order) based on innerWidth", function(assert) {

  //////////
  // Given

  var breakAlpha = { minViewportWidth: 900, maxImageDisplayWidth: 800, quality: 85 };
  var breakBravo = { minViewportWidth: 0, maxImageDisplayWidth: 400, quality: 85 };

  var ip = new ImgTagBuilder({ styles: { main: { breakPoints: [ breakAlpha, breakBravo ] } } });
  

  //////////
  // When

  ip._devicePixelRatio = 2; // Force to '2' so testing works across devices.
  ip._innerWidth = 700; // Force for testing regardless of device. 

  ip.prep({ image: "horses.jpg", alt: "some horses",  style: "main", maxWidth: 1600, maxHeight: 1000 });


  //////////
  // Then

  // This is the key requirement. Everything else supports it.
  assert.equal(ip.imgTag(),'<img alt="some horses" class="main" width="400" height="250" src="http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_800,h_500/horses.jpg">', "Target `img` tag"); 

});


////////////////////////////////////////////////////////////////////////////////

QUnit.test("Make sure order of breakpoints in config doesn't matter", function(assert) {

  //////////
  // Given

  var breakAlpha = { minViewportWidth: 900, maxImageDisplayWidth: 800, quality: 85 };
  var breakBravo = { minViewportWidth: 0, maxImageDisplayWidth: 400, quality: 85 };

  var ip = new ImgTagBuilder({ styles: { main: { breakPoints: [ breakBravo, breakAlpha] } } });


  //////////
  // When

  ip._devicePixelRatio = 2; // Force to '2' so testing works across devices.
  ip._innerWidth = 1000; // Force for testing regardless of device. 

  ip.prep({ image: "horses.jpg", alt: "some horses",  style: "main", maxWidth: 1600, maxHeight: 1000 });


  //////////
  // Then

  // This is the key requirement. Everything else supports it.
  assert.equal(ip.imgTag(),'<img alt="some horses" class="main" width="800" height="500" src="http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_1600,h_1000/horses.jpg">', "Target `img` tag"); 

});


////////////////////////////////////////////////////////////////////////////////

QUnit.test("Run lots of variaitions for QA", function(assert) {

  //////////
  // Given

  var ip = new ImgTagBuilder( { 
    styles: { 
      main: { 
        breakPoints: [ 
          { minViewportWidth: 0, maxImageDisplayWidth: 200, quality: 85 },
          { minViewportWidth: 500, maxImageDisplayWidth: 300, quality: 85 }, 
          { minViewportWidth: 900, maxImageDisplayWidth: 400, quality: 85 }
        ] 
      } 
    } 
  }); 

  var testSets = [
    {
    	description: "Basline test",
      prepStyle: "main", prepImage: "horses.jpg", prepAlt: "some horses",
      _devicePixelRatio: 2, finalUrlQuality: 85,
      
      _innerWidth:     1024,   _innerHeight:      768,
      prepMaxWidth:    1600,   prepMaxHeight:    1000,
      finalAttWidth:    400,   finalAttHeight:    250,
      finalUrlWidth:    800,   finalUrlHeight:    500
    },

    {
    	description: "1x device pixel ratio",
      prepStyle: "main", prepImage: "horses.jpg", prepAlt: "some horses",
      _devicePixelRatio: 1, finalUrlQuality: 85,
      
      _innerWidth:     1024,   _innerHeight:      768,
      prepMaxWidth:    1600,   prepMaxHeight:    1000,
      finalAttWidth:    400,   finalAttHeight:    250,
      finalUrlWidth:    400,   finalUrlHeight:    250
    },

/*   {
    	description: "2x device pixel ratio that results in odd height and fraction dimension.",
      prepStyle: "main", prepImage: "horses.jpg", prepAlt: "some horses",
      _devicePixelRatio: 2, finalUrlQuality: 85,
      
      _innerWidth:      800,   _innerHeight:      600,
      prepMaxWidth:    1600,   prepMaxHeight:    1000,
      finalAttWidth:    400,   finalAttHeight:    250,
      finalUrlWidth:    800,   finalUrlHeight:    500 
    },
*/
  ];


  //////////
  // When

  for (var testIndex = 0, lastIndex = testSets.length; testIndex < lastIndex; testIndex = testIndex +1) {
  	var testData = testSets[testIndex];
    ip._devicePixelRatio = testData._devicePixelRatio;
    ip._innerWidth = testData._innerWidth; 
    ip._innerHeight = testData._innerHeight; 
    ip.prep({ image: testData.prepImage, alt: testData.prepAlt,  style: testData.prepStyle, maxWidth: testData.prepMaxWidth, maxHeight: testData.prepMaxHeight });
 
 
    //////////
    // Then

    var imageString  = '<img alt="prepAlt" class="prepStyle" ';
        imageString += 'width="finalAttWidth" height="finalAttHeight" ';
        imageString += 'src="http://res.cloudinary.com/demo/image/upload/c_fill,q_finalUrlQuality,w_finalUrlWidth,h_finalUrlHeight/prepImage">';  

        imageString = imageString.replace(/prepAlt/, testData.prepAlt);
        imageString = imageString.replace(/prepStyle/, testData.prepStyle);
        imageString = imageString.replace(/prepImage/, testData.prepImage);
        imageString = imageString.replace(/finalAttWidth/, testData.finalAttWidth);
        imageString = imageString.replace(/finalAttHeight/, testData.finalAttHeight);
        imageString = imageString.replace(/finalUrlQuality/, testData.finalUrlQuality);
        imageString = imageString.replace(/finalUrlWidth/, testData.finalUrlWidth);
        imageString = imageString.replace(/finalUrlHeight/, testData.finalUrlHeight);

    assert.equal(ip.imgTag(), imageString, testData.description); 

  }

});

