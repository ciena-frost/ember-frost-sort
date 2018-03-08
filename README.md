[ci-img]: https://img.shields.io/travis/ciena-frost/ember-frost-sort.svg "Travis CI Build Status"
[ci-url]: https://travis-ci.org/ciena-frost/ember-frost-sort

[cov-img]: https://img.shields.io/coveralls/ciena-frost/ember-frost-sort.svg "Coveralls Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-frost/ember-frost-sort

[npm-img]: https://img.shields.io/npm/v/ember-frost-sort.svg "Version"
[npm-url]: https://www.npmjs.com/package/ember-frost-sort

[ember-observer-badge]: http://emberobserver.com/badges/ember-frost-sort.svg "Ember Observer score"
[ember-observer-badge-url]: http://emberobserver.com/addons/ember-frost-sort

[bithound-img]: https://www.bithound.io/github/ciena-blueplanet/ember-frost-sort/badges/score.svg "bitHound"
[bithound-url]: https://www.bithound.io/github/ciena-blueplanet/ember-frost-sort

[ember-img]: https://img.shields.io/badge/ember-1.12.2+-orange.svg "Ember 1.12.2+"

# ember-frost-sort

###### Dependencies
![Ember][ember-img]
[![NPM][npm-img]][npm-url]

###### Health

[![Travis][ci-img]][ci-url]
[![Coveralls][cov-img]][cov-url]

###### Security

[![bitHound][bithound-img]][bithound-url]

###### Ember Observer score
[![EmberObserver][ember-observer-badge]][ember-observer-badge-url]

A sorting component to sort collections

## Installation
```
ember install ember-frost-sort
```

## Usage
### Controller
```js
sortOrder: ['name', '-value'],
sortingProperties: [{ label: Name, value: name }, { label: Value, value: value }],

actions: {
  onChange (sortOrder) {
    this.set('sortOrder', sortOrder)
  }
}
```

### Component
```hbs
{{frost-sort
  hook='myHook'
  sortOrder=sortOrder
  sortOrderMax=2
  sortingProperties=sortingProperties
  onChange=(action 'sort')
}}
```
Also supports [spread](https://github.com/ciena-blueplanet/ember-spread) format 

### Sort utility (optional)
```js
import {sort} from 'ember-frost-sort'

@readOnly
@computed('model.[]', 'sortOrder.[]')
sortedItems (model, sortOrder) {
  return sort(model, sortOrder)
}
```

## Event formats
- onChange : {string[]} sortOrder - the sort order in [JSONAPI](http://jsonapi.org/format/#fetching-sorting) format
  - e.g. ['name', '-value'] would sort by name ascending first, value descending second

## Hooks
- `{hook}-title`
- `{hook}-item` & `{ index: ___ }`
- `{hook}-item-select` & `{ index: ___ }`
- `{hook}-item-direction` & `{ index: ___ }`
- `{hook}-item-direction-icon` & `{ index: ___ }`
- `{hook}-item-remove` & `{ index: ___ }`
- `{hook}-add`

## Class names
- `frost-sort-title`
- `frost-sort-item`
- `frost-sort-item-select`
- `frost-sort-item-direction` & `descending`
- `frost-sort-item-remove`
- `frost-icon-frost-sort-direction`
- `frost-sort-add`
