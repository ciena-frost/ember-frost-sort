import Ember from 'ember'
import computed from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-sort'
import _ from 'lodash/lodash'

const {Component, A, isEmpty} = Ember

export default Component.extend(PropTypeMixin, {
  layout: layout,
  classNames: ['frost-sort'],

  propTypes: {
    sortParams: PropTypes.array,
    sortableProperties: PropTypes.array
  },

  getDefaultProps () {
    return {}
  },

  @computed
  filterArray () {
    if (_.isEmpty(this.get('sortParams'))) {
      return A()
    } else {
      let tempFilterArray = A()
      this.get('sortParams').map((param) => {
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
      this.get('sortableProperties').length) ? 'button-hide' : ''
  },

  @computed('filterArray.[]')
  isRemoveVisible (filterArray) {
    return filterArray.length !== 0
  },

  @computed('filterArray.@each.value')
  unselected (filterArray) {
    if (isEmpty(filterArray)) {
      return this.get('sortableProperties')
    }

    let selectedProperties = filterArray.mapBy('value')
    return this.get('sortableProperties').filter(function (sortListItem) {
      return !_.includes(selectedProperties, sortListItem.value)
    })
  },

  actions: {
    addFilter () {
      if (this.get('filterArray').length >= (this.get('sortableProperties').length) - 1) {
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
      if (this.get('filterArray').length < this.get('sortableProperties').length) {
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
