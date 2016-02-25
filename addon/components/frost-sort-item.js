import Ember from 'ember'
import layout from '../templates/components/frost-sort-item'
import _ from 'lodash/lodash'

export default Ember.Component.extend({
  layout: layout,
  classNames: ['frost-sort-item'],
  selectedItem: Ember.computed(function () {
    return _.isEmpty(this.get('initVal')) ? '' : this.get('initVal')
  }),
  direction: Ember.computed(function () {
    return _.isEmpty(this.get('initDirection')) ? 'asc' : this.get('initDirection').replace(':', '')
  }),
  sortItemList: Ember.computed('selectedItem', 'availableOptions', 'allOptions', function () {
    let selectList = []
    this.get('availableOptions').forEach(function (item) {
      selectList.push(item)
    })
    let selectedItem = this.get('selectedItem')
    if (!Ember.isEmpty(selectedItem)) {
      selectList.push(this.get('allOptions').findBy('value', selectedItem))
    }
    return selectList
  }),
  singleSelected: 1,
  actions: {
    select (attrs) {
      this.set('selectedItem', attrs.value)
      this.get('sort-change')({
        id: attrs.id,
        direction: `:${this.get('direction')}`,
        value: attrs.value
      })
    },
    rotate (sortId) {
      let attrs = {
        id: sortId,
        value: this.get('selectedItem')
      }
      if (this.get('direction') === 'desc') {
        this.set('direction', 'asc')
      } else {
        this.set('direction', 'desc')
      }
      attrs['direction'] = ':' + this.get('direction')
      this.get('sort-change')(attrs)
    }
  }
})
