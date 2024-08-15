import { filter } from 'lodash'

import { CustomerRare } from '../src/lib'

const c = new CustomerRare()

const total = c.collection.length

describe('customer_rare class', () => {
  test("name(''): collection[0]", () => {
    expect(c.name('')).toEqual(c.collection[0])
  })

  test("name('橙'): 橙", () => {
    expect(c.name('橙')?.name).toBe('橙')
  })

  test("name('橙子'): void(0)", () => {
    expect(c.name('橙子')).toBeUndefined()
  })

  test("names(''): collection", () => {
    expect(c.names('')).toEqual(c.collection)
  })

  test("names('莉'): 莉格露, 帕秋莉, 蕾米莉亚", () => {
    const names = ['莉格露', '帕秋莉', '蕾米莉亚']
    expect(c.names('莉').every(({ name }) => names.includes(name))).toBe(true)
  })

  test("names('莉莉'): []", () => {
    expect(c.names('莉莉')).toEqual([])
  })

  test('dlc([]): collection[total]', () => {
    expect(c.dlc([])).toEqual(c.collection)
    expect(c.dlc([])).toHaveLength(total)
  })

  test('dlc(allDLC): collection[total]', () => {
    const allDLC = ['0', '1', '2', '3', '4', '5']
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

  test('place([]): collection', () => {
    expect(c.place([])).toEqual(c.collection)
  })

  test('place(args): collection', () => {
    const args = ['人间之里']
    const result = filter(c.collection, ({ place }) => args.includes(place))
    expect(c.place(args)).toEqual(result)
  })
})
