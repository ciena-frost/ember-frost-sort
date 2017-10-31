import {expect} from 'chai'
import Ember from 'ember'
const {$, Test, run} = Ember
import {keyCodes} from 'ember-frost-core/utils'
const {DOWN_ARROW, ENTER, SPACE} = keyCodes
import {$hook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

// Hack to fix test failing when using `throw` - @jerbrown 2017.06.27
// Issue introduced by https://github.com/emberjs/ember.js/pull/14898
Test.adapter = Test.MochaAdapter.extend({
  exception (error) {
    throw error
  }
}).create()

const test = integration('frost-sort')

describe(test.label, function () {
  test.setup()

  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()

    this.setProperties({
      onChange () {}
    })
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should throw an error when sortOrder is not provided', function () {
    expect(() => {
      this.render(hbs`
        {{frost-sort
          hook='mySort'
          onChange=onChange
          sortingProperties=(array)
        }}`)
    }).to.throw()
  })

  it('should throw an error when sortingProperties is not provided', function () {
    expect(() => {
      this.render(hbs`
        {{frost-sort
          hook='mySort'
          onChange=onChange
          sortOrder=(array 'name')
        }}`)
    }).to.throw()
  })

  it('should throw an error when onChange is not provided', function () {
    expect(() => {
      this.render(hbs`
        {{frost-sort
          hook='mySort'
          sortOrder=(array 'name')
          sortingProperties=(array)
        }}`)
    }).to.throw()
  })

  describe('when an empty sortOrder is provided', function () {
    let message

    beforeEach(function () {
      this.setProperties({
        sortOrder: [],
        sortingProperties: [
          {label: 'Name', value: 'name'},
          {label: 'Value', value: 'value'}
        ]
      })

      try {
        this.render(hbs`
          {{frost-sort
            hook='mySort'
            onChange=onChange
            sortOrder=sortOrder
            sortingProperties=sortingProperties
          }}
        `)
      } catch (error) {
        message = error.message
      }
    })

    // FIXME prop-types should throw an error if a minimum number of array values isn't provided
    it('should assert that a least one sortOrder entry is required', function () {
      expect(message).to.equal("Assertion Failed: At least one sortOrder entry is required: e.g. ['foo']")
    })
  })

  // FIXME invalid format doesn't error out, so the component explodes due to lack of true protection
  // describe('when the sortOrder is an invalid format', function () {
  //   const warningMessages = []

  //   beforeEach(function () {
  //     sandbox.stub(Logger, 'warn', (message) => {
  //       warningMessages.push(message)
  //     })

  //     this.setProperties({
  //       sortOrder: [1],
  //       sortingProperties: [
  //         { label: 'Name', value: 'name' },
  //         { label: 'Value', value: 'value' }
  //       ]
  //     })

  //     this.render(hbs`
  //       {{frost-sort
  //         sortOrder=sortOrder
  //         sortingProperties=sortingProperties
  //       }}
  //     `)
  //   })

  //   it('should warn that sortOrder entries must be strings', function () {
  //     expect(warningMessages.find((message) => {
  //       return message.includes('foo') // TODO message should come from a prop-types utility
  //     })).to.not.equal(undefined, 'No warning when sortOrder is an invalid format')
  //   })
  // })

  // FIXME invalid format doesn't error out, so the component explodes due to lack of true protection
  // describe('when the sort properties are an invalid format', function () {})

  describe('when a single sort order and sorting property are provided', function () {
    let onChange

    beforeEach(function () {
      onChange = sandbox.spy()

      this.setProperties({
        sortOrder: ['name'],
        sortingProperties: [
          {label: 'Name', value: 'name'}
        ],
        onChange
      })

      this.render(hbs`
        {{frost-sort
          hook='test'
          sortOrder=sortOrder
          sortingProperties=sortingProperties
          onChange=onChange
        }}
      `)
    })

    it('should render one select', function () {
      expect($hook('test-item-select', {index: 0})).to.have.length(1)
    })

    it('should select the sortOrder property', function () {
      expect($hook('test-item-select', {index: 0}).text().trim()).to.equal('Name')
    })

    it('should render the direction as ascending', function () {
      expect($hook('test-item-direction-icon', {index: 0}).attr('class')).to.not.include('descending')
    })

    it('should render without a remove', function () {
      expect($hook('test-item-remove', {index: 0})).to.have.length(0)
    })

    it('should render without an add', function () {
      expect($hook('test-add')).to.have.length(0)
    })
  })

  describe('when multiple sort properties are provided', function () {
    let onChange

    beforeEach(function () {
      onChange = sandbox.spy()

      this.setProperties({
        sortOrder: ['name'],
        sortingProperties: [
          {label: 'Name', value: 'name'},
          {label: 'Gender', value: 'gender'},
          {label: 'Age', value: 'age'},
          {label: 'Height', value: 'height'}
        ],
        onChange
      })

      this.render(hbs`
        {{frost-sort
          hook='test'
          sortOrder=sortOrder
          sortingProperties=sortingProperties
          onChange=onChange
        }}
      `)
    })

    describe('and a single sort order is provided', function () {
      beforeEach(function () {
        this.setProperties({
          sortOrder: ['name']
        })
      })

      it('should render one select', function () {
        expect($hook('test-item-select', {index: 0})).to.have.length(1)
      })

      it('should select the sort order property', function () {
        expect($hook('test-item-select', {index: 0}).text().trim()).to.equal('Name')
      })

      it('should render the direction as ascending', function () {
        expect($hook('test-item-direction-icon', {index: 0}).attr('class')).to.not.include('descending')
      })

      it('should hide the sort entry remove', function () {
        expect($hook('test-item-remove', {index: 0})).to.have.length(0)
      })

      it('should show the add', function () {
        expect($hook('test-add')).to.have.length(1)
      })
    })

    describe('and multiple sort orders are provided', function () {
      beforeEach(function () {
        this.setProperties({
          sortOrder: ['name', '-gender', 'age']
        })
      })

      it('should have expected hooks', function () {
        ;[
          $hook('test-title'),
          $hook('test-item', {index: 0}),
          $hook('test-item-select', {index: 0}),
          $hook('test-item-direction', {index: 0}),
          $hook('test-item-remove', {index: 0}),
          $hook('test-item-select', {index: 1}),
          $hook('test-item-direction', {index: 1}),
          $hook('test-item-remove', {index: 1}),
          $hook('test-item-select', {index: 2}),
          $hook('test-item-direction', {index: 2}),
          $hook('test-item-remove', {index: 2}),
          $hook('test-add')
        ].forEach(hook => {
          expect(hook).to.have.length(1)
        })
      })

      it('should have expected class names', function () {
        ;[
          {hook: $hook('test-title'), classNames: ['frost-sort-title']},
          {hook: $hook('test-item', {index: 0}), classNames: ['frost-sort-item']},
          {hook: $hook('test-item-select', {index: 0}), classNames: ['frost-sort-item-select']},
          {hook: $hook('test-item-direction', {index: 0}), classNames: ['frost-sort-item-direction']},
          {hook: $hook('test-item-remove', {index: 0}), classNames: ['frost-sort-item-remove']},
          {
            hook: $hook('test-item-direction-icon', {index: 1}),
            classNames: ['frost-icon-frost-sort-direction', 'descending'],
            isSVG: true
          },
          {hook: $hook('test-add'), classNames: ['frost-sort-add']}
        ].forEach(({hook, classNames, isSVG}) => {
          classNames.forEach(className => {
            if (isSVG) {
              expect(hook.attr('class')).to.include(className)
            } else {
              expect(hook).to.have.class(className)
            }
          })
        })
      })

      it('should render a select per sort order', function () {
        expect($hook('test-item-select')).to.have.length(3)
      })

      it('should select each sort order property in sequence', function () {
        expect($hook('test-item-select', {index: 0}).text().trim()).to.equal('Name')
        expect($hook('test-item-select', {index: 1}).text().trim()).to.equal('Gender')
        expect($hook('test-item-select', {index: 2}).text().trim()).to.equal('Age')
      })

      it('should render sort order directions', function () {
        expect($hook('test-item-direction-icon', {index: 0}).attr('class')).to.not.include('descending')
        expect($hook('test-item-direction-icon', {index: 1}).attr('class')).to.include('descending')
        expect($hook('test-item-direction-icon', {index: 2}).attr('class')).to.not.include('descending')
      })

      it('should render each sort order with a remove', function () {
        expect($hook('test-item-remove', {index: 0})).to.have.length(1)
        expect($hook('test-item-remove', {index: 1})).to.have.length(1)
        expect($hook('test-item-remove', {index: 2})).to.have.length(1)
      })

      it('should render with an add', function () {
        expect($hook('test-add')).to.have.length(1)
      })

      // FIXME index from the sort hook is being overridden by the index from the select hook
      describe('and the select for a sort order entry is clicked', function () {
        beforeEach(function () {
          $hook('test-item-select', {index: 0}).focusin()[0].focus()
          $hook('test-item-select', {index: 0})
            .trigger(
              $.Event('keypress', {
                keyCode: SPACE
              })
            )
          return wait()
        })

        it('should contain the sort order property for that index and unselected sort order properties', function () {
          const selectItems = $hook('test-item-select-item')
          expect(selectItems).to.have.length(2)

          const labels = []
          for (let index = 0; index < selectItems.length; index++) {
            labels.push(
              selectItems.eq(index).find('.frost-select-list-item-text').data('text').trim()
            )
          }

          expect(labels).to.eql(['Name', 'Height'])
        })

        describe('and a new sort order property is selected', function () {
          beforeEach(function (done) {
            $(document).trigger(
              $.Event('keydown', {
                keyCode: DOWN_ARROW
              })
            )

            $(document).trigger(
              $.Event('keydown', {
                keyCode: ENTER
              })
            )

            run.next(() => {
              done()
            })
          })

          it('should fire an event with the updated sort order', function () {
            expect(onChange.lastCall.args[0]).to.eql(['height', '-gender', 'age'])
          })
        })
      })

      describe('and a sort order entry changes directions', function () {
        beforeEach(function () {
          $hook('test-item-direction', {index: 0}).click()
        })

        it('should fire an event with the updated sort order', function () {
          expect(onChange.lastCall.args[0]).to.eql(['-name', '-gender', 'age'])
        })
      })

      describe('and a sort order entry is added (so the sort order includes all sort properties)', function () {
        beforeEach(function () {
          this.setProperties({
            onChange: function (sortOrder) {
              this.set('sortOrder', sortOrder)
            }
          })
          $hook('test-add').click()
        })

        it('should not rerender an unchanged component', function (done) {
          const oldId = $hook('test-item', {index: 0}).attr('id')
          $hook('test-item-direction', {index: 0}).click()
          return wait()
            .then(() => {
              const currentId = $hook('test-item', {index: 0}).attr('id')
              expect(currentId).to.equal(oldId)
              done()
            })
        })

        it('should render a new select order entry', function () {
          expect($hook('test-item-select')).to.have.length(4)
        })

        it('should select the next sort order property for the new sort order entry', function () {
          expect($hook('test-item-select', {index: 3}).text().trim()).to.equal('Height')
        })

        it('should render the new sort order entry as ascending', function () {
          expect($hook('test-item-direction-icon', {index: 3}).attr('class')).to.not.include('descending')
        })

        it('should render the new sort order entry with a remove', function () {
          expect($hook('test-item-remove', {index: 3})).to.have.length(1)
        })

        it('should fire an event with the updated sort order', function () {
          expect(this.get('sortOrder')).to.eql(['name', '-gender', 'age', 'height'])
        })

        it('should hide the add', function () {
          expect($hook('test-add')).to.have.length(0)
        })

        describe('and a sort order entry is removed', function () {
          beforeEach(function () {
            $hook('test-item-remove', {index: 0}).click()
          })

          it('should shift the remaining sort order entries', function () {
            expect($hook('test-item-select', {index: 0}).text().trim()).to.equal('Gender')
            expect($hook('test-item-select', {index: 1}).text().trim()).to.equal('Age')
            expect($hook('test-item-select', {index: 2}).text().trim()).to.equal('Height')
          })

          it('should retain the remaining sort order directions', function () {
            expect($hook('test-item-direction-icon', {index: 0}).attr('class')).to.include('descending')
            expect($hook('test-item-direction-icon', {index: 1}).attr('class')).to.not.include('descending')
            expect($hook('test-item-direction-icon', {index: 2}).attr('class')).to.not.include('descending')
          })

          it('should show the add', function () {
            expect($hook('test-add')).to.have.length(1)
          })

          it('should fire an event with the updated sort order', function () {
            expect(this.get('sortOrder')).to.eql(['-gender', 'age', 'height'])
          })
        })

        describe('and the select for an existing sort order entry is clicked', function () {
          beforeEach(function () {
            $hook('test-item-select', {index: 0}).focusin()[0].focus()
            $hook('test-item-select', {index: 0})
              .trigger(
                $.Event('keypress', {
                  keyCode: SPACE
                })
              )
            return wait()
          })

          it('should no longer contains the property used in the new sort order entry', function () {
            const selectItems = $hook('test-item-select-item')
            expect(selectItems).to.have.length(1)

            const labels = []
            for (let index = 0; index < selectItems.length; index++) {
              labels.push(
                selectItems.eq(index).find('.frost-select-list-item-text').data('text').trim()
              )
            }

            expect(labels).to.eql(['Name'])
          })
        })
      })
    })
  })

  describe('when the maximum active sort rules is provided', function () {
    let onChange

    beforeEach(function () {
      onChange = sandbox.spy()

      this.setProperties({
        sortOrder: ['name'],
        sortingProperties: [
          {label: 'Name', value: 'name'},
          {label: 'Gender', value: 'gender'},
          {label: 'Age', value: 'age'},
          {label: 'Height', value: 'height'}
        ],
        onChange
      })

      this.render(hbs`
        {{frost-sort
          hook='test'
          sortOrder=sortOrder
          sortOrderMax=2
          sortingProperties=sortingProperties
          onChange=onChange
        }}
      `)
    })

    describe('and the number of sort order entries is below the maximum', function () {
      it('should show the add button', function () {
        expect($hook('test-add')).to.have.length(1)
      })
    })

    describe('and the number of sort order entries reaches the maximum', function () {
      beforeEach(function () {
        this.setProperties({
          sortOrder: ['name', 'gender']
        })
      })

      it('should hide the add button', function () {
        expect($hook('test-add')).to.have.length(0)
      })
    })
  })
})
