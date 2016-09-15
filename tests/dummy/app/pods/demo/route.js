import Ember from 'ember'

export default Ember.Route.extend({
  queryParams: {
    querySortOrder: {
      refreshModel: true
    }
  }
})
