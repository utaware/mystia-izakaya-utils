import { CustomerRare } from '../src/lib'

const c = new CustomerRare()

describe('customer_rare class', () => {
  test("name(''): collection[0]", () => {
    expect(c.name('')).toEqual(c.collection[0])
  })
  test("name('橙'): 橙", () => {
    expect(c.name('橙')?.name).toEqual('橙')
  })
  test("name('橙子'): void(0)", () => {
    expect(c.name('橙子')).toBeUndefined()
  })
  test("names(''): collection", () => {
    expect(c.names('')).toEqual(c.collection)
  })
  test("names('莉'): 莉格露, 帕秋莉, 蕾米莉亚", () => {
    expect(c.names('莉').map(({ name }) => name)).toEqual([
      '莉格露',
      '帕秋莉',
      '蕾米莉亚',
    ])
  })
  test("names('莉莉'): []", () => {
    expect(c.names('莉莉')).toEqual([])
  })
  test('dlc([]): collection[58]', () => {
    expect(c.dlc([])).toEqual(c.collection)
    expect(c.dlc([])).toHaveLength(58)
  })

  test('dlc(allDLC): collection[58]', () => {
    const allDLC = ['0', '1', '2', '3', '4', '5']
    expect(c.dlc(allDLC)).toEqual(c.collection)
    expect(c.dlc(allDLC)).toHaveLength(58)
  })
  test("dlc(['?']): collection", () => {
    expect(c.dlc(['0'])).toHaveLength(23)
    expect(c.dlc(['1'])).toHaveLength(7)
    expect(c.dlc(['2'])).toHaveLength(7)
    expect(c.dlc(['3'])).toHaveLength(7)
    expect(c.dlc(['4'])).toHaveLength(7)
    expect(c.dlc(['5'])).toHaveLength(7)
    expect(c.dlc(['0', '1'])).toHaveLength(30)
  })
})
