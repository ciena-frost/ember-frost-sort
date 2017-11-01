import Ember from 'ember'
const {Controller, inject} = Ember
// BEGIN-SNIPPET sort-import
import {computed, readOnly} from 'ember-decorators/object'
// END-SNIPPET
import {sort} from 'ember-frost-sort'

export default Controller.extend({
  // == Dependencies ==========================================================

  notifications: inject.service('notification-messages'),

  // == Keyword Properties ====================================================

  queryParams: ['sortOrder'],

  // == Properties ============================================================

  // BEGIN-SNIPPET sort-order
  sortOrder: ['-name'],
  sortingProperties: [
    {label: 'Name', value: 'name'},
    {label: 'Value', value: 'value'}
  ],
  // END-SNIPPET

  // == Computed Properties ===================================================

  // BEGIN-SNIPPET computed-sort
  @readOnly
  @computed('model.[]', 'sortOrder.[]')
  sortedItems (model, sortOrder) {
    return sort(model, sortOrder)
  },
  // END-SNIPPET

  // == Actions ===============================================================

  actions: {
    // BEGIN-SNIPPET sort-action
    sort: function (sortOrder) {
      this.set('sortOrder', sortOrder)
      this.get('notifications').success(this.get('sortOrder'), {
        autoClear: true,
        clearDuration: 2000
      })
    }
    // END-SNIPPET
  }
})
