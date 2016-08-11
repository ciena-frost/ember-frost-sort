import Ember from 'ember'

const {A, Controller} = Ember

export default Controller.extend({

  tableSortList: A([
    {
      value: 'Name',
      label: 'Name'
    },
    {
      value: 'Severity',
      label: 'Severity'
    },
    {
      value: 'Version',
      label: 'Version'
    },
    {
      value: 'Time',
      label: 'Time'
    }
  ]),
  queryParams: ['sortOrder'],
  sortOrder: [],

  actions: {
    sortRecords: function (sortItems) {
      let temp = []
      sortItems.map(function (item) {
        temp.push({
          value: item.value,
          direction: item.direction
        })
      })
      this.set('sortOrder', temp)
      if (sortItems.length > 0) {
        let message = sortItems.reduce(function (message, sortItem) {
          if (message === '') {
            return sortItem.get('value') + sortItem.get('direction')
          }
          return message + ', ' + sortItem.get('value') + sortItem.get('direction')
        }, '')
        this.notifications.addNotification({
          message: message,
          type: 'success',
          autoClear: true,
          clearDuration: 2000
        })
      }
    }
  }
})
