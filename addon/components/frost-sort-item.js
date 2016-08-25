import Ember from 'ember'
import layout from '../templates/components/frost-sort-item'
import PropTypesMixin, { PropTypes } from 'ember-prop-types'

const {
  A,
  computed,
  Component,
  isEmpty
} = Ember

export default Component.extend(PropTypesMixin, {
  layout: layout,
  classNames: ['frost-sort-item'],

  propTypes: {
    selectedItem: PropTypes.string,
    direction: PropTypes.string,
    initVal: PropTypes.string,
    availableOptions: PropTypes.array,
    allOptions: PropTypes.array
  },
  direction: computed(function () {
    return isEmpty(this.get('initDirection'))
    ? 'asc'
    : this.get('initDirection').replace(':', '')
  }),

  selectedItem: computed(function () {
    return isEmpty(this.get('initVal')) ? '' : this.get('initVal')
  }),

  sortItemList: computed(
    'selectedItem',
    'availableOptions',
    'allOptions',
    function () {
      let selectedItem = this.get('selectedItem')
      let availableOptions = this.get('availableOptions')
      let allOptions = this.get('allOptions')

      let selectList = availableOptions.slice(0)
      if (!isEmpty(selectedItem)) {
        selectList.pushObject(allOptions.findBy('value', selectedItem))
      }
      return selectList.filter(e => e)
    }
  ),
  getDefaultProps () {
    return {
      direction: 'asc',
      availableOptions: A(),
      allOptions: A()
    }
  },
  actions: {
    select (attrs) {
      this.set('selectedItem', attrs[0])
      this.get('sortChange')({
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

      let direction = this.get('direction') === 'desc'
      ? 'asc'
      : 'desc'
      attrs['direction'] = `:${direction}`
      this.set('direction', direction)
      this.get('sortChange')(attrs)
    },
    removeItem (id) {
      this.get('remove')(id)
    }
  }
})
