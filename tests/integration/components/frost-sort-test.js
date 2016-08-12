import Ember from 'ember'
const {run} = Ember
import {expect} from 'chai'
import {$hook, initialize} from 'ember-hook'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import { beforeEach } from 'mocha'
import sinon from 'sinon'

const testTemplate = hbs`{{frost-sort
  hook=hook
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
      initialize()
      props = {
        hook: 'my-component-sort',
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

    it('has hooks for the sort and adding filters', function () {
      expect($hook('my-component-sort').hasClass('frost-sort')).to.be.true

      expect($hook('my-component-sort-add')).to.have.length(1)
    })

    it('has hooks for add/remove filters and sort direction', function () {
      run(() => {
        $hook('my-component-sort-add').click()
      })

      expect($hook('my-component-sort-0')).to.have.length(1)

      expect($hook('my-component-sort-remove')).to.have.length(1)

      expect($hook('my-component-sort-0-select')).to.have.length(1)

      expect($hook('my-component-sort-0-direction')).to.have.length(1)
    })

    it('has a default hook name', function () {
      this.render(hbs`
        {{frost-sort
          sortableProperties=data
          sortParams=sortOrder
          onChange=onChange
        }}`
      )

      expect($hook('sort').hasClass('frost-sort')).to.be.true

      expect($hook('sort-add')).to.have.length(1)
    })
  }
)
