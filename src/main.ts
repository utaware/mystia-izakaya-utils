import { Mystia } from '@/lib'

const m = new Mystia()

console.log(
  m.matchBeverages({
    customerName: '莉',
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
