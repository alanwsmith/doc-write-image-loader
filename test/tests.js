QUnit.test("Check environmental variables", function(assert) {

  // Given 
  var itb = imageTagBuilder({});

  // Then
  assert.equal(itb.innerWidth, window.innerWidth, "Load innerWidth");
  assert.equal(itb.innerHeight, window.innerHeight, "Load innerHeight");
  assert.equal(itb.dpr, window.devicePixelRatio, "Load innerHeight");
  
});


QUnit.test("Verify variable override", function(assert) {

  // Given 
  var itb = imageTagBuilder({});
  itb.innerWidth = 4000;
  itb.innerHeight = 5000;
  itb.dpr = 9;

  // Then
  assert.equal(itb.innerWidth, 4000, "Override innerWidth");
  assert.equal(itb.innerHeight, 5000, "Override innerHeight");
  assert.equal(itb.dpr, 9, "Override device pixel ratio");

});


QUnit.test("Target test", function(assert) {

  // Given 
  var itb = imageTagBuilder({
    urlTemplate: "http://res.cloudinary.com/demo/image/upload/c_fill,q_QUALITY,w_CALLWIDTH,h_CALLHEIGHT/IMAGENAME",
    styles: {
    	"basic": [
        { breakpoint: 0, imageWidth: 800, quality: 85 }
    	]
    }
  });

  // When
  itb.prep({ image: "horses.jpg", style: "basic", alt: "some horses", sourceWidth: 1600, sourceHeight: 1000}); 

  // Then
  assert.equal(itb.imageTag(),'<img alt="some horses" class="basic" width="800" height="500" src="http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_1600,h_1000/horses.jpg">', "Target `img` tag."); 

});


QUnit.test("Set attribute width via `requestWidthViaPixels`", function(assert) {
  
  // Given 
  var itb = imageTagBuilder({});

  // When
  itb.prep({ sourceWidth: 1600, sourceHeight: 1000});
  itb.requestWidthViaPixels(800);

  // Then
  assert.equal(itb.attributeWidth(), 800);

});


QUnit.test("Set source dimensions", function(assert) {
  
  // Given 
  var itb = imageTagBuilder({});

  // When
  itb.sourceWidth = 1600;
  itb.sourceHeight = 1000;

  // Then
  assert.equal(itb.sourceWidth, 1600, "Source width");
  assert.equal(itb.sourceHeight, 1000, "Source height");

});


QUnit.test("Verify attribute height", function(assert) {

  // Given 
  var itb = imageTagBuilder({});

  // When
  itb.sourceWidth = 1600;
  itb.sourceHeight = 1000;
  itb.requestWidthViaPixels(800);

  // Then 
  assert.equal(itb.attributeHeight(), 500, "attributeHeight()");

});


QUnit.test("Parse `sourceWidth` and `sourceHeight`  params", function(assert) {

  // Given 
  var itb = imageTagBuilder({});

  // When
  itb.prep({ sourceWidth: 1600, sourceHeight: 1000});

  // Then 
  assert.equal(itb.sourceWidth, 1600, "Source width");
  assert.equal(itb.sourceHeight, 1000, "Source height");

});


QUnit.test("Check call width and height", function(assert) {

  // Given 
  var itb = imageTagBuilder({});

  // When 
  itb.dpr = 2;
  itb.sourceWidth = 1600;
  itb.sourceHeight = 1200;
  itb.setAttributeWidth(800);

  // Then
  assert.equal(itb.callWidth(), 1600);
  assert.equal(itb.callHeight(), 1200);

});


QUnit.test("Make sure image isn't larger than the source", function(assert) {

  // Given 
  var itb = imageTagBuilder({});

  // When
  itb.dpr = 1;
  itb.prep({ sourceWidth: 400, sourceHeight: 400 });
  itb.requestWidthViaPixels(800);

  // Then
  assert.equal(itb.attributeWidth(), 400, "Reduced width");
  assert.equal(itb.attributeHeight(), 400, "Reduced height");

});


QUnit.test("Request width via pixel checks", function(assert) {

  // Given
  var itb = imageTagBuilder({});

  var testSets = [

    // TESTS TO ADD
    // - make sure 'attributeWidth' at 1.3 DPR is in integer. 
    // - make sure 'attributeHeight' at 1.3 DPR is in integer. 
    // - make sure 'callWidth' at 1.3 DPR is in integer. 
    // - make sure 'callHeight' at 1.3 DPR is in integer. 
    // - make sure 'reqeustWidth' is converted to integer with 1.3 DPR.

        // srcW | srcH | innerW | innerH | dpr | reqW | attW | attH | callW | callH 

        // Basic 1 DPR tests
          "1600 | 1200 | 1024   | 768    | 1   | 800    | 800  | 600  | 800   | 600   ",
          "1600 | 1200 | 1024   | 768    | 1   | 400    | 400  | 300  | 400   | 300   ",

        // Dowsize image if request is too big.
          "400  | 300  | 1024   | 768    | 1   | 800    | 400  | 300  | 400   | 300   ",
          
        // 1 DPR Make sure height stays an integer
          "1600 | 1200 | 1024   | 768    | 1   | 350    | 350  | 262  | 350   | 262   ",

        // Basic 2 DPR tests
          "1600 | 1200 | 1024   | 768    | 2   | 800    | 800  | 600  | 1600  | 1200  ",
          "1600 | 1200 | 1024   | 768    | 2   | 400    | 400  | 300  | 800   | 600   ",

        // 2 DPR Downsize
          "800  | 600  | 1024   | 768    | 2   | 800    | 400  | 300  | 800   | 600  ", 
    
        // 2 DPR Make sure height stays an integer. 
          "1600 | 1200 | 1024   | 768    | 2   | 350    | 350  | 262  | 700   | 524  ",
        
        ];

  for (var testIndex = 0, lastIndex = testSets.length; testIndex < lastIndex; testIndex = testIndex +1) {

  	var params = testSets[testIndex].split(/ \| /);
    
    // When
    itb.prep({ sourceWidth: params[0], sourceHeight: parseInt(params[1], 10)});
    itb.innerWidth = parseInt(params[2], 10);
    itb.innerHeight = parseInt(params[3], 10);
    itb.dpr = parseInt(params[4], 10);

    itb.requestWidthViaPixels(params[5]);
    
    assert.equal(itb.attributeWidth(), parseInt(params[6], 10), "attributeWidth");
    assert.equal(itb.attributeHeight(), parseInt(params[7], 10), "attributeHeight");
    assert.equal(itb.callWidth(), parseInt(params[8], 10), "callWidth");
    assert.equal(itb.callHeight(), parseInt(params[9], 10), "callHeight");
  }

});


QUnit.test("Set attribute width via `requestWidthViaPercentage`", function(assert) {
  
  // Given 
  var itb = imageTagBuilder({});

  // When
  itb.innerWidth = 1000;
  itb.innerHeight = 800;
  itb.prep({ sourceWidth: 2000, sourceHeight: 1000});
  itb.requestWidthViaPercentage(50);

  // Then
  assert.equal(itb.attributeWidth(), 500);

});


QUnit.test("Request width via percentage checks", function(assert) {

  // Given
  var itb = imageTagBuilder({});

  var testSets = [

    // srcW | srcH | innerW | innerH | dpr | reqPctW | attW | attH | callW | callH 

    // Basic 1 DPR via % of innerWidth
      "1600 | 1200 | 1024   | 768    | 1   | 50      | 512  | 384  | 512   | 384   ",
    
    //  2 DPR Basic via %
      "1600 | 1200 | 1024   | 768    | 2   | 50      | 512  | 384  | 1024  | 768   ",

    //  Request via % and ensure integers
      "1600 | 1200 | 1024   | 768    | 1   | 51      | 522  | 391  | 522   | 391   ",
      "1600 | 1200 | 1024   | 768    | 2   | 51      | 522  | 391  | 1044  | 782   ",

    // Make sure down sizing works 
      "400  | 300  | 1024   | 768    | 1   | 50      | 400  | 300  | 400   | 300   ",
      "800  | 600  | 1024   | 768    | 2   | 50      | 400  | 300  | 800   | 600   ",

  ];

  for (var testIndex = 0, lastIndex = testSets.length; testIndex < lastIndex; testIndex = testIndex +1) {

  	var params = testSets[testIndex].split(/ \| /);
    
    // When
    itb.prep({ sourceWidth: params[0], sourceHeight: parseInt(params[1], 10)});
    itb.innerWidth = parseInt(params[2], 10);
    itb.innerHeight = parseInt(params[3], 10);
    itb.dpr = parseInt(params[4], 10);

    itb.requestWidthViaPercentage(params[5]);
    
    assert.equal(itb.attributeWidth(), parseInt(params[6], 10), "attributeWidth");
    assert.equal(itb.attributeHeight(), parseInt(params[7], 10), "attributeHeight");
    assert.equal(itb.callWidth(), parseInt(params[8], 10), "callWidth");
    assert.equal(itb.callHeight(), parseInt(params[9], 10), "callHeight");
  }

});
//////////



QUnit.test("Set attribute width via `requestHeightViaPercentage`", function(assert) {
  
  // Given 
  var itb = imageTagBuilder({});

  // When
  itb.innerWidth = 1000;
  itb.innerHeight = 400;
  itb.prep({ sourceWidth: 2000, sourceHeight: 1000});
  itb.requestHeightViaPercentage(50);

  // Then
  assert.equal(itb.attributeHeight(), 200);
  assert.equal(itb.attributeWidth(), 400);

});


QUnit.test("Request via percentage of innerHeight", function(assert) {

  // Given
  var itb = imageTagBuilder({});

  var testSets = [

    // srcW | srcH | innerW | innerH | dpr | reqPctH | attW | attH | callW | callH 

    // 1 DPR via height %
      "1600 | 1200 | 1024   | 768    | 1   | 50      | 512  | 384  | 512   | 384   ",
      "1000 | 4000 | 800    | 800    | 1   | 50      | 100  | 400  | 100   | 400   ",

    // 1 DPR via height % and downsized   
      "100  | 200  | 800    | 800    | 1   | 50      | 100  | 200  | 100   | 200   ",

    // 2 DPR via height %
      "1600 | 1200 | 1024   | 768    | 2   | 50      | 512  | 384  | 1024  | 768   ",
      "1000 | 4000 | 800    | 800    | 2   | 50      | 100  | 400  | 200   | 800   ",

    // 2 DPR via height % and downsized   
      "100  | 200  | 800    | 800    | 2   | 50      | 50   | 100  | 100   | 200   ",

    // 1 DPR via height % that reduces because of viewport width
      "1000 | 1000 | 500    | 1000   | 1   | 100     | 500  | 500  | 500   | 500   ",

    // 2 DPR via height % that reduces because of viewport width
      "1000 | 1000 | 500    | 1000  | 2    | 100     | 500  | 500  | 1000  | 1000  ",

  ];

  for (var testIndex = 0, lastIndex = testSets.length; testIndex < lastIndex; testIndex = testIndex +1) {

  	var params = testSets[testIndex].split(/ \| /);
    
    // When
    itb.prep({ sourceWidth: params[0], sourceHeight: parseInt(params[1], 10)});
    itb.innerWidth = parseInt(params[2], 10);
    itb.innerHeight = parseInt(params[3], 10);
    itb.dpr = parseInt(params[4], 10);

    itb.requestHeightViaPercentage(params[5]);
    
    assert.equal(itb.attributeWidth(), parseInt(params[6], 10), "attributeWidth");
    assert.equal(itb.attributeHeight(), parseInt(params[7], 10), "attributeHeight");
    assert.equal(itb.callWidth(), parseInt(params[8], 10), "callWidth");
    assert.equal(itb.callHeight(), parseInt(params[9], 10), "callHeight");
  }

});


QUnit.test("Target test", function(assert) {

  // Given 
  var itb = imageTagBuilder({
  	
  });


  // When
  itb.prep({ image: "horses.jpg", style: "basic", alt: "some horses", sourceWidth: 1600, sourceHeight: 1000}); 

  // Then
  expect(0);
});

