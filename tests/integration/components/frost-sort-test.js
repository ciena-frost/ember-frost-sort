import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-sort',
  'Integration: EmberFrostSortComponent',
  {
    integration: true
  },
  function () {
    it('renders', function () {
      // Set any properties with this.set('myProperty', 'value')
      // Handle any actions with this.on('myAction', function (val) { ... })
      // Template block usage:
      // this.render(hbs`
      //   {{#frost-sort}}
      //     template content
      //   {{/frost-sort}}
      // `)

      this.render(hbs`{{frost-sort}}`)
      expect(this.$()).to.have.length(1)
    })
  }
)
