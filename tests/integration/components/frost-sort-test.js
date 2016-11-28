import Ember from 'ember'
const {run} = Ember
import {expect} from 'chai'
import {
  $hook,
  initialize as initializeHook
} from 'ember-hook'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {
  describe,
  beforeEach
} from 'mocha'
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
  maxActiveSortRules=maxActiveSortRules
  properties=data
  sortOrder=sortOrder
  onChange=onChange}}`

describeComponent(
  'frost-sort',
  'Integration: FrostSortComponent',
  {
    integration: true
  },

  function () {
    let props

    describe('when maxActiveSortRules is not set', function () {
      beforeEach(function () {
        initializeHook()

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
        expect(this.$('.frost-sort-item')).to.have.length(1)
      })

      it('has hooks for the sort, select, direction and adding filters', function () {
        expect($hook('my-component-sort').hasClass('frost-sort')).to.be.true
        expect($hook('my-component-sort-0')).to.have.length(1)
        expect($hook('my-component-sort-0-select')).to.have.length(1)
        expect($hook('my-component-sort-0-direction')).to.have.length(1)
        expect($hook('my-component-sort-add')).to.have.length(1)
      })

      it('has hooks for remove filter', function () {
        run(() => {
          $hook('my-component-sort-add').click()
        })
        expect($hook('my-component-sort-0-remove')).to.have.length(1)
      })

      it('has a default hook name', function () {
        this.render(hbs`
          {{frost-sort
            properties=data
            sortOrder=sortOrder
            onChange=onChange
          }}`
        )

        expect($hook('sort').hasClass('frost-sort')).to.be.true
        expect($hook('sort-add')).to.have.length(1)
      })

      it('renders the select dropdown  on click', function () {
        $hook('my-component-sort-0-select').find('svg').click()

        run(() => {
          expect($hook('my-component-sort-0-select').hasClass('frost-select-opened')).to.be.true
          expect($hook('my-component-sort-0-select-list').find('li')).to.have.length(3)
        })
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
            $hook('my-component-sort-2-remove').click()
          })
        })

        it('should remove only that field', function () {
          expect(($hook('my-component-sort-0-select').val())).to.eql('Name')
          expect(($hook('my-component-sort-1-select').val())).to.eql('Time')
          expect(($hook('my-component-sort-2-select').val())).to.eql('Severity')
        })

        describe('When clicking remove button for last field', function () {
          beforeEach(function () {
            run(() => {
              $hook('my-component-sort-2-remove').click()
            })
          })
          it('should remove only that field', function () {
            expect(($hook('my-component-sort-0-select').val())).to.eql('Name')
            expect(($hook('my-component-sort-1-select').val())).to.eql('Time')
          })

          describe('When clicking remove button for first field', function () {
            beforeEach(function () {
              run(() => {
                $hook('my-component-sort-0-remove').click()
              })
            })
            it('should remove only that field', function () {
              expect(($hook('my-component-sort-0-select').val())).to.eql('Time')
            })
          })
        })
      })
    })

    describe('when maxActiveSortRules is one', function () {
      beforeEach(function () {
        initializeHook()

        props = {
          hook: 'my-component-sort',
          maxActiveSortRules: 1,
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
        expect(this.$('.frost-sort-item')).to.have.length(1)
      })

      it('has hooks for the sort, select, and direction', function () {
        expect($hook('my-component-sort').hasClass('frost-sort')).to.be.true
        expect($hook('my-component-sort-0')).to.have.length(1)
        expect($hook('my-component-sort-0-select')).to.have.length(1)
        expect($hook('my-component-sort-0-direction')).to.have.length(1)
      })

      it('does not show add button', function () {
        expect($hook('my-component-sort-add')).to.have.length(0)
      })

      it('has a default hook name', function () {
        this.render(hbs`
          {{frost-sort
            properties=data
            sortOrder=sortOrder
            onChange=onChange
          }}`
        )

        expect($hook('sort').hasClass('frost-sort')).to.be.true
        expect($hook('sort-add')).to.have.length(1)
      })
    })
  }
)
