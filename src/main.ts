import { Mystia, Beverage, Recipes } from '@/lib'

const m = new Mystia()
const b = new Beverage()
const r = new Recipes()

console.log(
  m.calcWithBeverage({
    customerName: '莉',
    beverageName: '淇',
    demand: '高酒精',
  }),
)

console.table(b.beverage_tags(['高酒精']))

console.log(r.ingredients(['海苔']))
