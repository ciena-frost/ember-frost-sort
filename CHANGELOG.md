# 13.0.3 (2018-09-12)

* **Fixed** Travis API key.


# 13.0.2 (2018-07-20)

* **Fixed** Travis API key.


# 13.0.1 (2018-05-30)
* **Updated** Pin `ember-cli-notifications` to version `4.2.1` to fix broken demo app

# 13.0.0 (2018-04-13)
* **Upgraded** `ember-frost-core` to `^8.0.0`
* **Installed** `ember-cli-svgstore`
* **Updated** frost-icon functionality to work with new version of `ember-frost-core`

# 12.0.0 (2018-03-22)
* **Updated** pull request template
* **Added** issue template
* **Updated** to `pr-bumper` version `3`
* **Updated** to node 8
* **Added** slack integration
* **Updated** `ember-frost-test` to `^4.0.1`
* **Updated** `ember-test-utils` to `^8.1.1`
* **Updated** `ember-cli-frost-blueprints` to `^5.0.2`
* **Updated** `ember-prop-types` to `^7.0.1`
* **Updated** `ember-frost-core` to `^7.0.0`
* **Removed** ignoring of `package-lock.json` file
* **Added** `package-lock.json` file
* **Updated** Travis CI scripts to allow non-exact node version

# 11.0.0 (2018-03-08)
* Update frost-sort to match new ux specs



# 10.0.0 (2018-01-25)
* **Added** ignoring of `package-lock` until we are ready to move to node 8
* **Removed** `.remarkrc` file since it is now provided by `ember-test-utils`
* **Removed** useLintTree ember-cli-mocha configuration from `ember-cli-build.js`
* **Updated** `ember-frost-test` to `^4.0.0`
* **Updated** `ember-test-utils` to `^8.1.0`
* **Added** `ember-browserify` @ `^1.2.0`
* **Updated** `ember-cli-code-coverage` to `0.3.12`
* **Updated** `ember-cli-frost-blueprints` to `^5.0.1`
* **Updated** `ember-cli-htmlbars-inline-precompile` to `0.3.12`
* **Updated** `ember-cli-notifications` to `^4.2.1`
* **Updated** pin `ember-code-snippet` to `1.7.0`
* **Updated** `ember-cli-babel` to `^5.1.7` to stay correct with what Ember CLI 2.12.3 sets in the blueprints
* **Updated** `ember-cli-sass` to `7.1.1`
* **Updated** `ember-computed-decorators` to `0.3.0`
* **Updated** `ember-frost-core` to `^5.1.1`
* **Updated** `ember-hook` to `1.4.2` and removed dual entries under both devDependencies and dependencies. Kept dependency entry.
* **Updated** `ember-prop-types` to `^6.0.1`
* **Updated** move code coverage config file to tests/dummy/config/ and add json-summary reporter

# 9.0.3 (2017-12-13)

* Updated icon size to match UX specs


# 9.0.2 (2017-12-13)
* Change semver range of `ember-resolver` to align with other repos

# 9.0.1 (2017-12-12)
* Change semver range of ember-export-application-global to align with other repos

# 9.0.0 (2017-12-08)
* **Updated** to version 4 of `ember-frost-core` and move to dependency
* **Updated** to version 5 of `ember-prop-types` and move to dependency
* **Updated** `ember-computed-decorators` package to dependency
* **Updated** `ember-hook` package to dependency
* **Updated** to version 4 of `ember-cli-frost-blueprints`
* **Removed** `ember-spread` package since it is not used here and is now provided by `ember-frost-core` via it's own dependencies.
* **Removed** `ember-concurrency` package since it is not used here and is now provided by `ember-frost-core` via it's own dependencies.
* **Removed** `ember-elsewhere` package since it is not used here and is now provided by `ember-frost-core` via it's own dependencies.
* **Removed** `ember-truth-helpers` since it is not used in this add-on.
* **Removed** blueprints file since it is no longer needed

# 8.0.4 (2017-11-29)

- Changed the position that the selected value appears in the list (now appears in its original position in the list rather than always at the top)


# 8.0.3 (2017-11-21)
* Fixes https://github.com/ciena-frost/ember-frost-list/issues/161: Have frost-list flex-wrap sort if it overflows



# 8.0.2 (2017-11-14)
* Refactor to remove need for `ember-simple-uuid` dependency

# 8.0.1 (2017-11-13)
* #71 - Bind context to call of this._super.included() in index.js

# 8.0.0 (2017-11-08)
* Use the latest `ember-frost-core`, with a flexible minor version (`^3.0.1`)

# 7.2.10 (2017-10-31)
* **Removed** unused `markdown-code-highlighting`
* **Removed** unneeded bower testing dependencies
* **Removed** unused `ember-cli-visual-acceptance` dependency
* **Updated** testing dependencies
* **Updated** to latest `ember-test-utils`


# 7.2.9 (2017-08-10)
* Update ember-cli 2.12.3 inter-dependencies

# 7.2.8 (2017-07-11)
* Upgrade `ember-cli` to 2.12.3


# 7.2.7 (2017-05-10)
* **Updated** the secure auth tokens in `.travis.yml`


# 7.2.6 (2017-04-27)

* **Fixed** components to stop setting the `layout` property in `getDefaultProps()` as this method is not intended for setting Ember.Component class properties directly.

# 7.2.5 (2017-04-21)
* **Added** blueprint check


# 7.2.4 (2017-04-11)
- fix(flicker): Prevent rerendering when item hasnt changed 


# 7.2.3 (2017-03-20)
* **Fixed** #46 
* **Fixed** #49 
* **Modified** to align with UX specs


# 7.2.2
* **Updated** the travis.yml and package.json to run code coverage

# 7.2.1
* **Updated** to use latest pr-bumper which supports being able to set a PR to `none` when publishing a new version is not desired.

# 7.2.0

* **Added** `ember-disable-prototype-extensions` to ensure code doesn't rely on prototype extensions.
* **Removed** lodash from dependencies.
* **Updated** CI to test in Chrome as well as Firefox.


# 7.1.0

* **Added** additional builds to CI to make sure addon works with latest versions of Ember.
* **Removed** files from npm package that aren't necessary (all of the various config files).
* **Updated** dependencies to latest versions.


# 7.0.0
- onChange event sort order property format changed to align with JSONAPI spec http://jsonapi.org/format/#fetching-sorting
  - **6.x:** `[{ direction: ':asc', value: 'foo' }, { direction: ':desc', value: 'bar' }]`
  - **7.x:** `['foo', '-bar']`
- component `sortOrder` property also has the above format
- component `maxActiveSortRules` renamed to `sortOrderMax`
- component `properties` renamed to `sortingProperties`
- added a default `sort` utility `import {sort} from 'ember-frost-sort'` that handles multiple sort orders for object
properties that support `compare` (JS primitives at a minimum)
- spread support https://github.com/ciena-blueplanet/ember-spread
- updated hooks that use hook qualifiers
  - `{hook}-title`
  - `{hook}-item` & `{ index: ___ }`
  - `{hook}-item-select` & `{ index: ___ }`
  - `{hook}-item-direction` & `{ index: ___ }`
  - `{hook}-item-remove` & `{ index: ___ }`
  - `{hook}-add`
- updated class names
  - `frost-sort-title`
  - `frost-sort-item`
  - `frost-sort-item-select`
  - `frost-sort-item-direction`
  - `frost-sort-item-remove`
  - `frost-icon-frost-sort-direction` & `descending`
  - `frost-sort-add`
- updated demo
- bunches of internal cleanup
- bunches of additional tests

# 6.0.0
* **Updated** `ember-frost-core` to `^1.0.0`
* **Updated** dependencies

# 5.1.0
* Clean up icons



# 5.0.2
**Fixed** issue #41.
**Cleaned** up coverage, demo and deprecation notices.



# 5.0.1
**updated** frost-sort to use a named outlet for the select.
**updated** unit tests to work with ember-elsewhere

# 5.0.0
**add** ember-elsewhere to blueprint.
**update** tests



# 4.0.0
**update** node version and other deps.
**Add** rootURL.
**update** blueprint



# 3.1.1

* Removed unused liquid-fire dependency



# 3.1.0

* **Added** property `maxActiveSortRules` for limiting how many sort rules can be added.
* **Updated** dependencies to latest versions.



# 3.0.0
- Upgraded ember-cli and Ember to v2.8.0
- Added contributing guide, pr template, sass-lint and code-snippets

# 2.5.1
- Removed computed decorators to increase test coverage
    - it would inject code that couldn't be covered.
- Default PropTypes to both `item` and `sort`
- Styling of button
    - Transition rotate would happen on div, not the svg. Causing the padding along with the svg to rotate. Not too
    noticeable of difference, but went ahead and fixed anyways
    - `:last-of-type` on frost-sort-item so extra line won't show up.
- Fixed bug where if user edits url, more filters can be added pass the point.
    - Prevented add from adding in this situation.
- Upped test coverage to 💯

# 2.5.0
- Deprecated `sortParams` in favor of `sortOrder` and `sortableProperties` in favor of `properties`
- Fixed: https://github.com/ciena-frost/ember-frost-sort/issues/15
https://github.com/ciena-frost/ember-frost-sort/issues/13
https://github.com/ciena-frost/ember-frost-sort/issues/17
- Fixed bug introduced from the ability to remove frost-sort-items in any order

# 2.4.0

* Added a remove button for each sort item
* Minor style changes to match [UX guidelines](https://confluence.ciena.com/pages/viewpage.action?pageId=175019564)

![sort](https://cloud.githubusercontent.com/assets/8530858/17753369/6799d558-6484-11e6-900f-b22635a39461.png)



# 2.3.3

* Updated to latest version of `liquid-fire`.

# 2.3.2

* **Updated** `ember-hook` dependency and blueprint to latest version
* **Removed** unneeded configuration object for `ember-hook` since it will now work correctly in the development
environment.

<!-- Reviewable:start -->
---
This change is [<img src="https://reviewable.io/review_button.svg" height="34" align="absmiddle" alt="Reviewable"/>](https://reviewable.io/reviews/ciena-frost/ember-frost-sort/25)
<!-- Reviewable:end -->


# 2.3.1

* **Added** a default hook name for the sort component
* **Added** a test to validate the new default hook name in the sort component
* **Updated** the hook names by removing the word filter
* **Updated** the tests to reflect the modified hook names
* **Updated** README to explain usage of the hooks for the sort component

# 2.3.0

* **Added** `ember-hook` and implemented hooks in sort component
* **Added** tests to validate the new hooks in the sort component
* **Updated** README to explain usage of the new hooks for the sort component

# 2.2.0

* **Added** `ember-prop-types`.
* Upgraded to 2.6.0 Ember, Ember CLI, and Ember Data.
* Upgrade dependencies.

# 2.1.2
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 2.1.1
## Non-breaking
- Updated ember-frost-core package. Updated frost-icon usage.

# 2.1.0
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

