import Ember from 'ember'
import layout from '../templates/components/frost-sort'
import _ from 'lodash/lodash'

export default Ember.Component.extend({
  layout: layout,
  classNames: ['frost-sort'],
  isRemoveVisible: Ember.computed('filterArray.[]', function () {
    return this.get('filterArray').length !== 0
  }),
  initialValue: Ember.computed(function () {

  }),
  unselected: Ember.computed('filterArray.@each.value', function () {
    if (Ember.isEmpty(this.get('filterArray'))) {
      return this.get('sortableProperties')
    }

    let selectedProperties = this.get('filterArray').mapBy('value')
    return this.get('sortableProperties').filter(function (sortListItem) {
      return !_.includes(selectedProperties, sortListItem.value)
    })
  }),
  filterArray: Ember.computed(function () {
    if (_.isEmpty(this.get('sortParams'))) {
      return Ember.A()
    } else {
      let tempFilterArray = Ember.A()
      this.get('sortParams').map(function (param) {
        tempFilterArray.addObject(Ember.Object.create({
          id: tempFilterArray.length + 1,
          value: param.value,
          direction: param.direction
        }))
      })
      return tempFilterArray
    }
  }),
  hideClass: Ember.computed(function () {
    return _.isEqual(this.get('filterArray').length,
      this.get('sortableProperties').length) ? 'button-hide' : ''
  }),
  actions: {
    addFilter () {
      if (this.get('filterArray').length >= (this.get('sortableProperties').length) - 1) {
        this.set('hideClass', 'button-hide')
      }
      let filter = this.get('filterArray').addObject(Ember.Object.create({
        id: this.get('filterArray').length + 1,
        value: '',
        direction: ':asc'
      }))
      this.get('on-change')(filter)
    },
    sortArrayChange (attrs) {
      this.get('filterArray').findBy('id', attrs.id).setProperties({
        value: attrs.value,
        direction: attrs.direction
      })
      this.get('on-change')(this.get('filterArray'))
    },
    removeFilter () {
      this.get('filterArray').popObject()
      this.get('on-change')(this.get('filterArray'))
      if (this.get('filterArray').length < this.get('sortableProperties').length) {
        this.set('hideClass', '')
      }
    }
  }
})
