import Ember from 'ember'
import computed from 'ember-computed-decorators'
import layout from '../templates/components/frost-sort-item'
import _ from 'lodash/lodash'

export default Ember.Component.extend({
  layout: layout,
  classNames: ['frost-sort-item'],

  @computed
  direction () {
    return _.isEmpty(this.get('initDirection')) ? 'asc' : this.get('initDirection').replace(':', '')
  },

  @computed
  selectedItem () {
    return _.isEmpty(this.get('initVal')) ? '' : this.get('initVal')
  },

  @computed('selectedItem', 'availableOptions', 'allOptions')
  sortItemList (selectedItem, availableOptions, allOptions) {
    let selectList = []
    availableOptions.forEach(function (item) {
      selectList.push(item)
    })
    if (!Ember.isEmpty(selectedItem)) {
      selectList.push(allOptions.findBy('value', selectedItem))
    }
    return selectList
  },

  actions: {
    select (attrs) {
      this.set('selectedItem', attrs[0])
      this.get('sort-change')({
        id: this.get('sortId'),
        direction: `:${this.get('direction')}`,
        value: attrs[0]
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
