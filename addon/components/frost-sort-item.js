import computed from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-sort-item'

export default Component.extend({

  // == Dependencies ==========================================================

  // == Properties ============================================================

  layout,

  propTypes: {
    hideRemove: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    selectOutlet: PropTypes.string.isRequired,
    sortOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
    sortingProperties: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })).isRequired
  },

  // == Computed properties ===================================================

  @computed('_sortOrderValues.[]', '_localProperty', 'sortingProperties')
  _availableProperties (_sortOrderValues, _localProperty, sortingProperties) {
    const remainingProperties = sortingProperties.filter(property => {
      return _sortOrderValues.indexOf(property.value) === -1
    })

    return [_localProperty].concat(remainingProperties)
  },

  @computed('sortOrder.[]', 'index')
  _descending (sortOrder, index) {
    return sortOrder[index].startsWith('-')
  },

  @computed('_descending')
  _directionChar (_descending) {
    return _descending ? '-' : ''
  },

  @computed('_sortOrderValues.[]', 'index', 'sortingProperties')
  _localProperty (_sortOrderValues, index, sortingProperties) {
    return sortingProperties.find(property => {
      return property.value === _sortOrderValues[index]
    })
  },

  @computed('_localProperty')
  _localValue (_localProperty) {
    return _localProperty.value
  },

  @computed('sortOrder.[]')
  _sortOrderValues (sortOrder) {
    return sortOrder.map(entry => {
      return entry.startsWith('-') ? entry.slice(1) : entry
    })
  },

  // == Functions =============================================================

  // == Ember Lifecycle Hooks =================================================

  // == DOM Events ============================================================

  // == Actions ===============================================================

  actions: {
    changeProperty ([value]) {
      // Reset the direction to ascending and change the sort entry value
      this.onChange(this.get('index'), `${value}`)
    },

    changeDirection () {
      // Keep the sort entry value and flip the direction char
      const direction = this.get('_descending') ? '' : '-'
      this.onChange(this.get('index'), `${direction}${this.get('_localValue')}`)
    },

    remove () {
      this.onRemove(this.get('index'))
    }
  }
})
