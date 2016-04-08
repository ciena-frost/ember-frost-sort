import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import { beforeEach } from 'mocha'
import sinon from 'sinon'

const testTemplate = hbs`{{frost-sort
  sortableProperties=data
  sortParams=sortOrder
  onChange=onChange}}`

describeComponent(
  'frost-sort',
  'Integration: FrostSortComponent',
  {
    integration: true
  },

  function () {
    let props
    beforeEach(function () {
      props = {
        onChange: sinon.spy(),
        sortOrder: [],
        data: [
          {
            value: 'name',
            label: 'Name'
          },
          {
            value: 'startTime',
            label: 'Time'
          },
          {
            value: 'version',
            label: 'Version'
          }
        ]
      }
      this.setProperties(props)
      this.render(testTemplate)
    })

    it('renders', function () {
      expect(this.$('.frost-sort')).to.have.length(1)
    })
  }
)
