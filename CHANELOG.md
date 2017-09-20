Changelog
=========

Version: 0.5.0
--------------

- This is effectively the start of a rewrite
- All prior test code has been commented out
- Removed `0.4.0` from the live repo
- Created a new set of tests for the new code
- Switched to using `logical_` and `physical_` prefaces for dimensions (logical being the perceived display, physical being what's used for the URL call).
- Added cache buster to both the main and test script calls attempting to make Live Reload work properly every time.
- Added a `before` call that prints a random number to the console to make it easy to tell with multiple passing test runs trigger.
- Added a `beforeEach` call in `QUnit.module` to setup each test with an object automatically
- Added default template for `<img>` output string
- Added default for `_max_width_of_window_percentage`
- Setup `.image_string_from_params()` method as core integration point
- Added `.calculate_logical_width()`
- Added `.calculate_logical_height()`
- Added `.assembled_url()` which takes `_url_template` and applies all the replacements to it.



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

