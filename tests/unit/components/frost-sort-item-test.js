
import Ember from 'ember'
import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import {
  beforeEach,
  describe
} from 'mocha'
import sinon from 'sinon'
const {
  run
} = Ember
const {
  next
} = run

describeComponent(
  'frost-sort-item',
  'FrostSortItemComponent',
  {
    // Specify the other units that are required for this test
    needs: [
      'component:frost-select',
      'component:frost-select-li',
      'component:frost-select-outlet',
      'component:from-elsewhere',
      'component:frost-button',
      'component:frost-icon',
      'helper:hook',
      'helper:eq'
    ],
    unit: true
  },
  function () {
    let component
    beforeEach(function () {
      component = this.subject()
    })
    it('renders', function () {
      this.render()
      expect(component).to.be.ok
      expect(this.$()).to.have.length(1)
    })
    describe('actions', function () {
      let sortChange
      beforeEach(function () {
        sortChange = sinon.spy()
        component.setProperties({
          sortChange,
          direction: 'asc'
        })
        this.render()
      })
      it('sortChange to be called on select', function (done) {
        next(function () {
          component.send('select', ['test'])
          expect(sortChange.called).to.be.true
          done()
        })
      })

      it('sortChange fires correctly on rotate', function (done) {
        next(function () {
          component.send('rotate', 'sort_id')
          expect(sortChange.called).to.be.true
          expect(component.get('direction')).to.equal('desc')
          done()
        })
      })
    })
  }
)
