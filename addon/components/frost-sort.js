/* globals sortOrder properties */

import Ember from 'ember'
import computed, {oneWay} from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-sort'
import _ from 'lodash/lodash'

const {Component, A, isEmpty} = Ember

export default Component.extend(PropTypeMixin, {
  layout: layout,
  classNames: ['frost-sort'],

  init () {
    this._super()
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
    Ember.run.schedule('afterRender', this, function () {
      if (_.isEmpty(this.get('sortOrder'))) {
        this.send('addFilter')
        this.send('sortArrayChange', {
          id: 1,
          direction: ':asc',
          value: this.get('properties')[0].value
        })
      }
    })
  },

  propTypes: {
    hook: PropTypes.string,
    sortOrder: PropTypes.array,
    properties: PropTypes.array
  },

  getDefaultProps () {
    return {
      hook: 'sort'
    }
  },

  @oneWay('sortParams') sortOrder,

  @oneWay('sortableProperties') properties,

  @computed
  filterArray () {
    if (_.isEmpty(this.get('sortOrder'))) {
      return A()
    } else {
      let tempFilterArray = A()
      this.get('sortOrder').map((param) => {
        tempFilterArray.addObject(Ember.Object.create({
          id: `${this.get('elementId')}_${tempFilterArray.length + 1}`,
          value: param.value,
          direction: param.direction
        }))
      })
      return tempFilterArray
    }
  },

  @computed
  hideClass () {
    return _.isEqual(this.get('filterArray').length,
      this.get('properties').length) ? 'button-hide' : ''
  },

  @computed('filterArray.[]')
  isRemoveVisible (filterArray) {
    return filterArray.length !== 0
  },

  @computed('filterArray.@each.value')
  unselected (filterArray) {
    if (isEmpty(filterArray)) {
      return this.get('properties')
    }

    let selectedProperties = filterArray.mapBy('value')
    return this.get('properties').filter(function (sortListItem) {
      return !_.includes(selectedProperties, sortListItem.value)
    })
  },

  actions: {
    addFilter () {
      if (this.get('filterArray').length >= (this.get('properties').length) - 1) {
        this.set('hideClass', 'button-hide')
      }
      this.get('filterArray').addObject(Ember.Object.create({
        id: this.get('filterArray').length + 1,
        value: '',
        direction: ':asc'
      }))
    },

    removeFilter () {
      this.get('filterArray').popObject()
      this.get('onChange')(this.get('filterArray'))
      if (this.get('filterArray').length < this.get('properties').length) {
        this.set('hideClass', '')
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
