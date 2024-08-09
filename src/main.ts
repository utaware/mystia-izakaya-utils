import { Mystia, Beverage } from '@/lib'

const m = new Mystia()
const b = new Beverage()

console.log(
  m.calcWithBeverage({
    customerName: '莉',
    beverageName: '淇',
    demand: '高酒精',
  }),
)

console.table(b.beverage_tags(['高酒精']))
