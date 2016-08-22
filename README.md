[ci-img]: https://img.shields.io/travis/ciena-frost/ember-frost-sort.svg "Travis CI Build Status"
[ci-url]: https://travis-ci.org/ciena-frost/ember-frost-sort

[cov-img]: https://img.shields.io/coveralls/ciena-frost/ember-frost-sort.svg "Coveralls Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-frost/ember-frost-sort

[npm-img]: https://img.shields.io/npm/v/ember-frost-sort.svg "Version"
[npm-url]: https://www.npmjs.com/package/ember-frost-sort

[![Travis][ci-img]][ci-url] [![Coveralls][cov-img]][cov-url] [![NPM][npm-img]][npm-url]

# ember-frost-sort
A sorting component to sort collections

 * [Installation](#installation)
 * [API](#api)
 * [Examples](#examples)
 * [Contributing](#development)

## Installation
```
ember install ember-frost-sort
```

## API
| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `sortableProperties` (Deprecated) | `array` | `[{"label: "foo", "value": "bar"}]` | Array of sortable attributes. **`sortableProperties` has been deprecated in favor of `properties`**|
| `sortParams` (Deprecated) | `array` | `[{"direction: "asc/desc", "value": <attr-name>}]` |  Array that specifies the sort order. **`sortParams` has been deprecated in favor of `sortOrder`** |
| `onChange` | `string` | `<action-name>` | The action to call when the value of the select item changes. |

## Testing with ember-hook
The sort component is accessible using ember-hook with the top level hook name or you can access the internal components as well -
* Default top level hook - `$hook('sort')`
* Add sort button hook - `$hook('<hook-name>-add')`
* Remove sort button hook - `$hook('<hook-name>-remove-<index>')`
* For each sort - `$hook('<hook-name>-<index>')'`
* Sort direction for each filter - `$hook('<hook-name>-<index>-direction')'`
* Each sort's select element - `$hook('<hook-name>-<index>-select')'`

## Examples
```handlebars
{{frost-sort sortableProperties=sortAttributes onChange=(action 'sort') sortParams=sortOrder}}
```

## Development
### Setup
```
git clone git@github.com:ciena-frost/ember-frost-sort.git
cd ember-frost-sort
npm install && bower install
```

### Development Server
A dummy application for development is available under `ember-frost-sort/tests/dummy`.
To run the server run `ember server` (or `npm start`) from the root of the repository and
visit the app at http://localhost:4200.

### Testing
Run `npm test` from the root of the project to run linting checks as well as execute the test suite
and output code coverage.
