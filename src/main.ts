import { Mystia } from '@/lib'

const { customerRares } = new Mystia(['DLC5'])

console.log(customerRares.nameRange)
console.log(customerRares.placeRange)
