import { Mystia } from '../src/lib'

import './extend/arrayIsEqual'

const m = new Mystia()

describe('菜谱添加食材', () => {
  test('不添加食材', () => {
    const recipe = m.getRecipeWithExtraIngredients('温暖饭团', [])
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
    const recipe = m.getRecipeWithExtraIngredients('温暖饭团', ['牛肉'])
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
    const recipe = m.getRecipeWithExtraIngredients('温暖饭团', [
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
