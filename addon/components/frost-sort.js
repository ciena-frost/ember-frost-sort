/* globals sortOrder properties */
import Ember from 'ember'
import PropTypesMixin, { PropTypes } from 'ember-prop-types'
import computed, { oneWay } from 'ember-computed-decorators'
import layout from '../templates/components/frost-sort'

const {
  A,
  Component,
  deprecate,
  isEmpty,
  run
} = Ember

const {
  scheduleOnce
} = run

export default Component.extend(PropTypesMixin, {
  layout: layout,
  classNames: ['frost-sort'],
  propTypes: {
    hook: PropTypes.string,
    sortOrder: PropTypes.array,
    properties: PropTypes.array
  },
  init () {
    this._super(...arguments)
    deprecate(
      'sortParams has been deprecated in favor of sortOrder',
      !this.get('sortParams'),
      {
        id: 'frost-sort.deprecate-sort-params',
        until: '3.0.0'
      }
    )
    deprecate(
      'sortableProperties has been deprecated in favor of properties.',
      !this.get('sortableProperties'),
      {
        id: 'frost-sort.deprecate-sortable-properties',
        until: '3.0.0'
      }
    )
    scheduleOnce('afterRender', this, function () {
      let props = this.get('properties')
      let order = this.get('sortOrder')
      if (isEmpty(order) && props.get('firstObject')) {
        this.send('addFilter')
        this.send('sortArrayChange', {
          id: 1,
          direction: ':asc',
          value: props.get('firstObject.value')
        })
      }
    })
  },
  getDefaultProps () {
    return {
      hook: 'sort',
      properties: A(),
      sortOrder: A()
    }
  },

  @oneWay('sortParams') sortOrder,
  @oneWay('sortableProperties') properties,

  @computed('filterArray.@each.value')
  hideRemoveButton () {
    return this.get('filterArray').length > 1
  },
  @computed('filterArray.@each.value')
  hideAddButton () {
    return !(this.get('filterArray').length === this.get('properties').length)
  },
  @computed
  filterArray () {
    let sortOrder = this.get('sortOrder')
    if (isEmpty(sortOrder)) {
      return sortOrder
    } else {
      return sortOrder.map((param, i) => {
        let id = this.get('elementId')
        return Ember.Object.create({
          id: `${id}_${i + 1}`,
          value: param.value,
          direction: param.direction
        })
      })
    }
  },
  @computed('filterArray.@each.value')
  unselected () {
    if (isEmpty(this.get('filterArray'))) {
      return this.get('properties')
    }

    let selectedProperties = this.get('filterArray').mapBy('value')
    return this.get('properties').filter((sortListItem) => {
      return !selectedProperties.includes(sortListItem.value)
    })
  },

  actions: {
    addFilter () {
      if (this.get('filterArray').length > this.get('properties').length) {
        return
      }
      this.get('filterArray').addObject(Ember.Object.create({
        id: this.get('filterArray').length + 1,
        value: '',
        direction: ':asc'
      }))
    },

    removeFilter (sortItemId) {
      let filterArray = this.get('filterArray')
      if (filterArray.length > 1) {
        let newFilter = filterArray
          .filter(obj => obj.id !== sortItemId)
          .map((item, index) => {
            item.set('id', index)
            return item
          })
        this.set('filterArray', newFilter)
        this.get('onChange')(this.get('filterArray'))
      }
    },

    sortArrayChange (attrs) {
      let filterArray = this.get('filterArray')
      filterArray.findBy('id', attrs.id).setProperties({
        value: attrs.value,
        direction: attrs.direction
      })
      this.get('onChange')(filterArray)
    }
  }
})
