import { Mystia } from '../src/lib'

const m = new Mystia()

describe('mysita class', () => {
  test('温暖饭团添加', () => {
    const recipe = m.getRecipeWithExtraIngredients('温暖饭团', [
      '猪肉',
      '蜂蜜',
      '露水',
      '蝉蜕',
    ])
    const isExist = recipe === null
    expect(isExist).toBe(false)
    expect(recipe?.ingredients).toEqual([
      '鳟鱼',
      '洋葱',
      '猪肉',
      '蜂蜜',
      '露水',
    ])
  })
})
