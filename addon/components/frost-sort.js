import Ember from 'ember'
const {assert, get} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'
import uuid from 'ember-simple-uuid'

import layout from '../templates/components/frost-sort'

export default Component.extend({

  // == Dependencies ==========================================================

  // == Properties ============================================================

  propTypes: {
    sortOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
    sortOrderMax: PropTypes.number,
    sortingProperties: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })).isRequired,

    onChange: PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      // Keywords
      layout

      // Options
    }
  },

  // == Compouted properties ==================================================

  @readOnly
  @computed('sortOrder.[]', 'sortOrderMax', 'sortingProperties.[]')
  _hideAdd (sortOrder, sortOrderMax, sortingProperties) {
    return sortingProperties.length === sortOrder.length ||
      sortOrder.length >= sortOrderMax
  },

  @readOnly
  @computed('sortOrder.[]')
  _hideRemove (sortOrder) {
    return sortOrder.length === 1
  },

  @readOnly
  @computed
  _selectOutlet (sortId) {
    return `frost-sort-${uuid()}`
  },

  // == Functions =============================================================

  // == Ember Lifecycle Hooks =================================================

  init () {
    this._super(...arguments)

    assert("At least one sortOrder entry is required: e.g. ['foo']", this.get('sortOrder.length') >= 1)
  },

  // == DOM Events ============================================================

  // == Actions ===============================================================

  actions: {
    add () {
      const sortOrderValues = this.get('sortOrder').map(entry => {
        return entry.startsWith('-') ? entry.slice(1) : entry
      })

      const availableProperties = this.get('sortingProperties').filter(property => {
        return sortOrderValues.indexOf(property.value) === -1
      })

      const clonedSortOrder = this.get('sortOrder').slice()
      clonedSortOrder.push(get(availableProperties, '0.value'))
      this.onChange(clonedSortOrder)
    },

    change (index, value) {
      const clonedSortOrder = this.get('sortOrder').slice()
      clonedSortOrder[index] = value
      this.onChange(clonedSortOrder)
    },

    remove (index) {
      const sortOrder = this.get('sortOrder')
      this.onChange(sortOrder.slice(0, index).concat(sortOrder.slice(index + 1)))
    }
  }
})
