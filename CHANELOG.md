Changelog
=========

Version: 0.5.2
--------------

- Update `index.html` sample to put script calls in `<head>`
- Added `.load_environment()`
- Added `.image_tag_string_from_params(params)`
- Added `.write_image(params)`
- Setup to allow optional `{ url_template: "" }` to be passed at initialization



Version: 0.5.1
--------------

- Added `.logical_height_for_attribute()`
- Added `._alt_text` and `.alt_text() tests
- Added `.physical_height_to_call()`
- Added `.physical_width_to_call()`
- Added `.url_string()`
- Put example output on test page for experimentation
- Rounding value returned by `.logical_width()` down to the nearest `10`. (e.g. `519` becomes `510`)
- Added `c_fill` to the URL examples to prevent one pixel difference resizing.


Version: 0.5.0
--------------

- This is effectively the start of a rewrite
- All prior test code has been commented out and is in the process of being removed
- Removed `0.4.0` from the live repo
- Created a new set of tests for the new code
- Switched to using `logical_` and `physical_` prefaces for dimensions (logical being the perceived display, physical being what's used for the URL call)
- Added cache buster to both the main and test script calls attempting to make Live Reload work properly every time
- Added a `before` call that prints a random number to the console to make it easy to tell with multiple passing test runs trigger
- Added a `beforeEach` call in `QUnit.module` to initialize the objected under test automatically
- Added default placeholders for instance variables and verified their getter methods
- Set explicit default for `.img_tag_template()`
- Set explicit default of `94` for `.percent_of_viewport_width()`
- Stubbed the primary `.img_tag_string()` method that is the main integration point.
- Added `.logical_width()`
- Added `.raw_source_dpr_max_logical_width()`
- Added `.viewport_percentage_max_logical_width()`


Version: 0.4.1 
--------------

- Added documentation usage example in the README. 
- Moved primary TODO list into the README file.


Version: 0.4.0 
--------------

- Added note on versioning checkout procedures to the README.
- Created the first in a series of version specific directories to ease deployment. 
- Changed base filename to `document-write-image-loader.js`.
- Renamaed `test` directory to `tests`.
- Setup so there's a specific test file for each version.
- Moved version number in the test file into a variable to make it easier to see/change.


Version: 0.3.0
--------------

- Removed the version number from the `.js` file name since the class name change is all that's needed to line things up.


Version: 0.2.0 
--------------

- Changed class name so it includes a major/minor version number with `x` patch level. 
- Chaned the `.js` filename to include the version number.


Version: 0.1.0 
--------------

- Added `.version_number()` method/function.
- Added this Changelog.


Version: Pre-History 
--------------------

- Unforunately, no Changelog notes were kept prior to this point.

    You'll have to look at the Git logs and parse thru those to see specific changes.  
