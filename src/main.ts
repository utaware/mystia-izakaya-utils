import { Mystia, CustomerRare, Beverage, Recipe, Ingredient } from '@/lib'

const m = new Mystia()
const c = new CustomerRare()
const b = new Beverage()
const r = new Recipe()
const i = new Ingredient()

console.log(
  m.calcWithBeverage({
    customerName: '莉',
    beverageName: '淇',
    demand: '高酒精',
  }),
)

console.log(c.placeRange)
console.log(c.dlcRange)

console.log(c.place('人间之里'))

console.table(b.beverage_tags(['高酒精']))

console.log(r.ingredients(['海苔']))

console.log(i.typeNames)
