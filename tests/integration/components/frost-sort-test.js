import Ember from 'ember'
const {run} = Ember
import {expect} from 'chai'
import {$hook, initialize} from 'ember-hook'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {describe, beforeEach} from 'mocha'
import sinon from 'sinon'

/* Fill in sort item given index and value
* @param {Number} index - the index of the sort field
* @param {String} value - the name of the field
*/
function fillInSortItem (index, value) {
  $hook(`my-component-sort-${index}-select`).val(value)
}

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

      expect($hook('my-component-sort-remove-0')).to.have.length(1)

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

    describe('When clicking remove button for third field', function () {
      beforeEach(function () {
        run(() => {
          $hook('my-component-sort-add').click()
          $hook('my-component-sort-add').click()
          $hook('my-component-sort-add').click()
          $hook('my-component-sort-add').click()
        })
        fillInSortItem(0, 'Name')
        fillInSortItem(1, 'Time')
        fillInSortItem(2, 'Version')
        fillInSortItem(3, 'Severity')
        run(() => {
          $hook('my-component-sort-remove-2').click()
        })
      })

      it('should remove only that field', function () {
        expect(($hook('my-component-sort-0-select').val())).to.eql('Name')
        expect(($hook('my-component-sort-1-select').val())).to.eql('Time')
        expect(($hook('my-component-sort-2-select').val())).to.eql('Severity')
      })

      describe('When adding a fourth field back and then clicking its remove button', function () {
        beforeEach(function () {
          run(() => {
            $hook('my-component-sort-add').click()
          })
          fillInSortItem(3, 'Version')
          run(() => {
            $hook('my-component-sort-remove-3').click()
          })
        })

        it('should remove only that field', function () {
          expect(($hook('my-component-sort-0-select').val())).to.eql('Name')
          expect(($hook('my-component-sort-1-select').val())).to.eql('Time')
          expect(($hook('my-component-sort-2-select').val())).to.eql('Severity')
        })
      })

      describe('When clicking remove button for last field', function () {
        beforeEach(function () {
          run(() => {
            $hook('my-component-sort-remove-2').click()
          })
        })
        it('should remove only that field', function () {
          expect(($hook('my-component-sort-0-select').val())).to.eql('Name')
          expect(($hook('my-component-sort-1-select').val())).to.eql('Time')
        })

        describe('When clicking remove button for first field', function () {
          beforeEach(function () {
            run(() => {
              $hook('my-component-sort-remove-0').click()
            })
          })
          it('should remove only that field', function () {
            expect(($hook('my-component-sort-0-select').val())).to.eql('Time')
          })
        })
      })
    })
  }
)
