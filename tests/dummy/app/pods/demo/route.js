import Ember from 'ember'
const {Route} = Ember

export default Route.extend({
  queryParams: {
    sortOrder: {
      replace: true
    }
  },

  // BEGIN-SNIPPET model
  model () {
    return [
      {
        name: 'a',
        value: 1
      },
      {
        name: 'd',
        value: 2
      },
      {
        name: 'c',
        value: 2
      },
      {
        name: 'b',
        value: 1
      }
    ]
  }
  // END-SNIPPET
})
