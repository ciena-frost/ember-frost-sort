import Ember from 'ember'

const {Controller, inject} = Ember

export default Controller.extend({
  notifications: inject.service('notification-messages'),
  sortProperties: [
    {
      value: 'name',
      label: 'Name'
    },
    {
      value: 'severity',
      label: 'Severity'
    },
    {
      value: 'version',
      label: 'Version'
    },
    {
      value: 'time',
      label: 'Time'
    }
  ],
  // BEGIN-SNIPPET sort-order
  queryParams: ['querySortOrder'],
  sortOrder: ['name:desc'],
  querySortOrder: [{value: 'name', direction: 'desc'}],
  // END-SNIPPET

  actions: {
    // BEGIN-SNIPPET sort-action
    sortRecords: function (sortItems) {
      let temp = []

      sortItems.map(function (item) {
        temp.push({
          value: item.value,
          direction: item.direction
        })
      })
      this.set('querySortOrder', temp)
      this.set('sortOrder', sortItems.map((object) => {
        return object.value + object.direction
      }))
      console.log(this.get('sortOrder'))
      this.get('notifications').success(this.get('sortOrder'), {
        autoClear: true,
        clearDuration: 2000
      })
    }
    // END-SNIPPET
  }
})
