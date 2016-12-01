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
    - Transition rotate would happen on div, not the svg. Causing the padding along with the svg to rotate. Not too noticeable of difference, but went ahead and fixed anyways
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
* **Removed** unneeded configuration object for `ember-hook` since it will now work correctly in the development environment.

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

