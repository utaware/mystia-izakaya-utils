import { Mystia } from '../src/lib'

import './extend/arrayIsEqual'

const m = new Mystia()

describe('菜谱添加食材', () => {
  test('不添加食材: 无参数', () => {
    const recipe = m.recipe('温暖饭团')
    expect(recipe).not.toBeNull()
    expect(recipe?.ingredients).toEqual(['鳟鱼', '洋葱'])
    expect(recipe?.positive_tags).toEqual([
      '水产',
      '素',
      '家常',
      '饱腹',
      '和风',
      '灼热',
    ])
  })

  test('不添加食材: 空数组', () => {
    const recipe = m.recipe('温暖饭团', [])
    expect(recipe).not.toBeNull()
    expect(recipe?.ingredients).toEqual(['鳟鱼', '洋葱'])
    expect(recipe?.positive_tags).toEqual([
      '水产',
      '素',
      '家常',
      '饱腹',
      '和风',
      '灼热',
    ])
  })

  test('添加食材不超过数量限制, tag覆盖', () => {
    const recipe = m.recipe('温暖饭团', ['牛肉'])
    expect(recipe).not.toBeNull()
    expect(recipe?.ingredients).toEqual(['鳟鱼', '洋葱', '牛肉'])
    expect(recipe?.positive_tags).toEqual([
      '水产',
      '肉',
      '家常',
      '饱腹',
      '和风',
      '灼热',
    ])
  })

  test('添加食材超过数量限制, 添加大份', () => {
    const recipe = m.recipe('温暖饭团', [
      '猪肉',
      '蜂蜜',
      '露水',
      '蝉蜕',
      '番茄',
    ])
    expect(recipe).not.toBeNull()
    expect(recipe?.ingredients).toEqual([
      '鳟鱼',
      '洋葱',
      '猪肉',
      '蜂蜜',
      '露水',
    ])
    expect(recipe?.positive_tags).toEqual([
      '水产',
      '家常',
      '饱腹',
      '和风',
      '灼热',
      '肉',
      '甜',
      '清淡',
      '大份',
    ])
  })
})

describe('顾客评价', () => {
  test('all √', () => {
    expect(
      m.match({
        customerName: '莉格露',
        recipeName: '幻昙花糕',
        beverageName: '淇',
        ingredientsName: ['蝉蜕'],
        demandBeverageTag: '可加冰',
        demandRecipeTag: '甜',
      }).evaluationLevel,
    ).toBe(4)
  })

  test('x: 食物需求', () => {
    expect(
      m.match({
        customerName: '莉格露',
        recipeName: '幻昙花糕',
        beverageName: '淇',
        ingredientsName: ['蝉蜕'],
        demandBeverageTag: '可加冰',
        demandRecipeTag: '',
      }).evaluationLevel,
    ).toBe(3)
  })

  test('x: 需求', () => {
    expect(
      m.match({
        customerName: '莉格露',
        recipeName: '幻昙花糕',
        beverageName: '淇',
        ingredientsName: ['蝉蜕'],
        demandBeverageTag: '',
        demandRecipeTag: '甜',
      }).evaluationLevel,
    ).toBe(3)
  })

  test('x: 需求', () => {
    expect(
      m.match({
        customerName: '莉格露',
        recipeName: '幻昙花糕',
        beverageName: '淇',
        ingredientsName: ['蝉蜕'],
        demandBeverageTag: '',
        demandRecipeTag: '',
      }).evaluationLevel,
    ).toBe(2)
  })

  test('x: 需求&食材', () => {
    expect(
      m.match({
        customerName: '莉格露',
        recipeName: '幻昙花糕',
        beverageName: '淇',
      }).evaluationLevel,
    ).toBe(2)
  })

  test('x: 需求', () => {
    expect(
      m.match({
        customerName: '莉格露',
        recipeName: '幻昙花糕',
        beverageName: '淇',
        ingredientsName: ['竹笋'],
      }).evaluationLevel,
    ).toBe(1)
  })
})
