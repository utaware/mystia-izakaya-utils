import { Mystia, Beverage } from '@/lib'

const m = new Mystia()
const b = new Beverage()

console.log(
  m.calcWithBeverage({
    customerName: '',
    beverageName: '淇',
    demand: '高酒精',
  }),
)

console.log(b.tags(['高酒精']))
