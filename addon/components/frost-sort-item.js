import Ember from 'ember'
const {
  A,
  Component,
  isEmpty
} = Ember
import PropTypesMixin, { PropTypes } from 'ember-prop-types'
import computed from 'ember-computed-decorators'
import layout from '../templates/components/frost-sort-item'
import uuid from 'ember-simple-uuid'

export default Component.extend(PropTypesMixin, {
  // == Properties ============================================================
  layout: layout,
  classNames: ['frost-sort-item'],
  targetOutlet: `frost-sort-${uuid()}`,

  // == State Properties ======================================================

  propTypes: {
    selectedItem: PropTypes.string,
    direction: PropTypes.string,
    initVal: PropTypes.string,
    availableOptions: PropTypes.array,
    allOptions: PropTypes.array
  },

  getDefaultProps () {
    return {
      availableOptions: A(),
      allOptions: A()
    }
  },

  // == Computed properties ===================================================

  @computed
  direction () {
    return isEmpty(this.get('initDirection'))
    ? 'asc'
    : this.get('initDirection').replace(':', '')
  },

  @computed
  selectedItem () {
    return isEmpty(this.get('initVal')) ? '' : this.get('initVal')
  },

  @computed('selectedItem', 'availableOptions', 'allOptions')
  sortItemList () {
    let selectedItem = this.get('selectedItem')
    let availableOptions = this.get('availableOptions')
    let allOptions = this.get('allOptions')

    let selectList = availableOptions.slice(0)
    if (!isEmpty(selectedItem)) {
      selectList.pushObject(allOptions.findBy('value', selectedItem))
    }
    return selectList.filter(e => e)
  },

  // == Actions================================================================

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

      let direction = this.get('direction') === 'desc' ? 'asc' : 'desc'
      attrs['direction'] = `:${direction}`
      this.set('direction', direction)
      this.get('sortChange')(attrs)
    },
    removeItem (id) {
      this.get('remove')(id)
    }
  }
})
