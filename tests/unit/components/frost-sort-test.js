import Ember from 'ember'
import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import {
  beforeEach
} from 'mocha'

const {
  A
} = Ember

describeComponent(
  'frost-sort',
  'FrostSortComponent',
  {
    needs: [
      'component:frost-sort-item',
      'component:frost-select',
      'component:frost-select-li',
      'component:frost-button',
      'component:frost-icon',
      'helper:eq',
      'helper:hook'
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
    it('computed filterArray sortOrder without failing', function () {
      let v = 'name'
      let obj = Ember.Object.create({
        label: v,
        value: v
      })
      component.setProperties({
        sortOrder: A([
          Ember.Object.create({
            direction: ':asc',
            value: v
          })
        ]),
        properties: A([
          obj
        ])
      })
      this.render()
      let result = component.get('filterArray.firstObject.value')
      expect(result).to.equal(obj.value)
    })
    it('will filter out null or falsey values from filterArray', function () {
      let obj = Ember.Object.create({
        label: '_test',
        value: '_test'
      })
      component.setProperties({
        sortOrder: A([
          Ember.Object.create({
            direction: ':asc',
            value: 'test'
          })
        ]),
        properties: A([
          obj
        ])
      })
      this.render()
      let r = component.get('filterArray.firstObject.value')
      expect(r).to.not.equal(obj.value)
    })

    it('computes unselected to return properties when no filter', function () {
      let properties = A([1, 2, 3])

      component.setProperties({
        sortOrder: A(),
        properties
      })

      this.render()
      let r = component.get('unselected')
      expect(r).to.equal(properties)
    })
  }
)
