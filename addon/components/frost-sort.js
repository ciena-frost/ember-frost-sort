import Ember from 'ember'
import PropTypesMixin, { PropTypes } from 'ember-prop-types'
import layout from '../templates/components/frost-sort'

const {
  Component,
  A,
  isEmpty,
  computed,
  run
} = Ember

const {
  oneWay
} = computed

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
    if (this.get('sortParams')) {
      Ember.deprecate(
        'sortParams has been deprecated in favor of sortOrder',
        false,
        {
          id: 'frost-sort.deprecate-sort-params',
          until: '3.0.0'
        }
      )
    }
    if (this.get('sortableProperties')) {
      Ember.deprecate(
        'sortableProperties has been deprecated in favor of properties.',
        false,
        {
          id: 'frost-sort.deprecate-sortable-properties',
          until: '3.0.0'
        }
      )
    }
    scheduleOnce('afterRender', this, function () {
      if (isEmpty(this.get('sortOrder'))) {
        this.send('addFilter')
        this.send('sortArrayChange', {
          id: 1,
          direction: ':asc',
          value: this.get('properties')[0].value
        })
      }
    })
  },
  getDefaultProps () {
    return {
      hook: 'sort'
    }
  },
  sortOrder: oneWay('sortParams'),

  properties: oneWay('sortableProperties'),

  hideRemoveButton: computed('filterArray.@each.value', function () {
    return this.get('filterArray').length > 1
  }),
  hideAddButton: computed('filterArray.@each.value', function () {
    return !(this.get('filterArray').length === this.get('properties').length)
  }),
  filterArray: computed(function () {
    if (isEmpty(this.get('sortOrder'))) {
      return A()
    } else {
      return this.get('sortOrder').map((param, i) => {
        return Ember.Object.create({
          id: `${this.get('elementId')}_${i+1}`,
          value: param.value,
          direction: param.direction
        })
      })
    }
  }),
  isRemoveVisible: computed('filterArray.[]', function () {
    return this.get('filterArray').length !== 0
  }),

  unselected: computed('filterArray.@each.value', function () {
    if (isEmpty(this.get('filterArray'))) {
      return this.get('properties')
    }

    let selectedProperties = this.get('filterArray').mapBy('value')
    return this.get('properties').filter((sortListItem) => {
      return !selectedProperties.includes(sortListItem.value)
    })
  }),

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
      if (this.get('filterArray').length > 1) {
        const newFilter = this.get('filterArray').filter(object => object.id !== sortItemId)
        newFilter.map((item, index) => {
          Ember.set(item, 'id', index)
          return item
        })
        this.set('filterArray', newFilter)
        this.get('onChange')(this.get('filterArray'))
      }
    },

    sortArrayChange (attrs) {
      this.get('filterArray').findBy('id', attrs.id).setProperties({
        value: attrs.value,
        direction: attrs.direction
      })
      this.get('onChange')(this.get('filterArray'))
    }
  }
})
