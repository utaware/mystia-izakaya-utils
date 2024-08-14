import { Mystia } from '@/lib'

const m = new Mystia()

console.log(
  m.matchBeverages({
    customerName: '莉格露',
    beverage: {
      level: [4],
      beverage_tags: {
        include: ['高酒精'],
        exclude: ['直饮'],
      },
    },
    demand: '高酒精',
  }),
)

console.log(
  m.matchRecipes({
    customerName: '莉格露',
    recipe: {
      dlc: ['2'],
      positive_tags: {
        include: ['和风'],
        exclude: [],
      },
      ingredients: {
        include: ['金枪鱼'],
      },
    },
  }),
)
