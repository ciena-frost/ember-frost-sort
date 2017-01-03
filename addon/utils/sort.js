/**
 * Common sorting operations
 */

import Ember from 'ember'
const { A, assert, compare, get, isArray, isEmpty } = Ember

/**
 * Sort any items that implement a compare function
 * http://emberjs.com/api/#method_compare
 *
 * Uses JSONAPI format to specify the sort order
 * http://jsonapi.org/format/#fetching-sorting
 *
 * @param {Object[]} items - the items to sort
 * @param {string[]} sortOrder - the sort order in JSONAPI format
 * @returns {Object[]} - a sorted clone of the original item array
 */
export default function (items, sortOrder) {
  assert('items must be an array', isArray(items))
  assert('sort order must be an array', isArray(sortOrder))

  const clonedItems = items.slice()

  if (isEmpty(sortOrder)) {
    return A(clonedItems)
  }

  return A(clonedItems.sort((itemA, itemB) => {
    for (let sortOrderEntry of sortOrder) {
      const descending = sortOrderEntry.startsWith('-')
      const property = descending ? sortOrderEntry.slice(1) : sortOrderEntry

      const result = compare(get(itemA, property), get(itemB, property))
      if (result !== 0) {
        // Reverse the result if the direction is descending
        return descending ? (-1 * result) : result
      }
    }

    return 0
  }))
}
