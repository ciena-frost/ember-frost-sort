import Ember from 'ember'

const {Controller} = Ember

export default Controller.extend({

  tableSortList: [
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
  queryParams: ['querySortOrder'],
  sortOrder: ['name:asc'],
  querySortOrder: [{value:'name', direction:'asc'}],

  actions: {
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
        return object.value + object.direction;
      }))
      this.notifications.addNotification({
        message: this.get('sortOrder'),
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    }
  }
})
