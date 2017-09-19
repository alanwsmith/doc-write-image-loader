Changelog
=========

Version: 0.5.0
--------------

- This is effectively the start of a rewrite. 
- All prior test code has been commented out. 
- New tests will be added for a new set of functions that will rely on parameters being passed instead of direct use of instance vairables.
- When the refactor is copmlete, the lack of tests for a function will indicate that it's not in the mix which will make them easier to identify for remaval.
- Setup `.image_string_from_params()` method as core integration point. 
- Added a `beforeEach` call in `QUnit.module` to setup each test with an object automatcially. 
- Added `.set_url_template()` 



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

