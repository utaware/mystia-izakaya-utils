import { filter } from 'lodash'

import { CustomerRares } from '../src/lib'

import {
  customerRarePlaceNames,
  customerRarePlaceComparisonTable,
} from './lib/customer_rare'

const c = new CustomerRares()

const total = c.collection.length

describe('customer_rare: name', () => {
  test('name(emptyValue): void', () => {
    expect(c.name()).toBeUndefined()
    expect(c.name('')).toBeUndefined()
  })

  test("name('橙'): 橙", () => {
    expect(c.name('橙')?.name).toBe('橙')
  })

  test("name('橙子'): void", () => {
    expect(c.name('橙子')).toBeUndefined()
  })

  test("names('莉'): 莉格露, 帕秋莉, 蕾米莉亚", () => {
    const names = ['莉格露', '帕秋莉', '蕾米莉亚']
    expect(c.names('莉').every(({ name }) => names.includes(name))).toBe(true)
  })

  test("names('莉莉'): []", () => {
    expect(c.names('莉莉')).toEqual([])
  })
})

describe('customer_rare: DLC', () => {
  test('dlc(all): collection[total]', () => {
    const allDLC = ['0', '1', '2', '3', '4', '5']
    expect(c.dlc([])).toEqual(c.collection)
    expect(c.dlc([])).toHaveLength(total)
    expect(c.dlc(allDLC)).toEqual(c.collection)
    expect(c.dlc(allDLC)).toHaveLength(total)
  })

  test('dlc(args): collection', () => {
    const allDLCCount = [23, 7, 7, 7, 7, 7]
    allDLCCount.forEach((item, index) => {
      const idx = index.toString()
      expect(c.dlc([idx])).toEqual(
        filter(c.collection, ({ dlc }) => dlc.includes(idx)),
      )
      expect(c.dlc([idx])).toHaveLength(item)
    })
    expect(c.dlc(['0', '1'])).toHaveLength(30)
  })
})

describe('customer_rare: place', () => {
  test('placeNames', () => {
    expect(c.placeNames).toEqual(customerRarePlaceNames)
  })

  test('place(): collection', () => {
    expect(c.place()).toEqual(c.collection)
    expect(c.place([])).toEqual(c.collection)
  })

  test('place(args): collection', () => {
    customerRarePlaceComparisonTable.forEach(([place, customers]) => {
      expect(c.place([place]).map(({ name }) => name)).toEqual(customers)
    })
  })
})
