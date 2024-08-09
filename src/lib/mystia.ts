import { Beverage } from './beverages'
import { CustomerRare } from './customerRare'

import { calcWithBeverage } from '@/utils'

import { isEmpty } from 'lodash'

export class Mystia {
  customerRare: CustomerRare
  beverage: Beverage

  constructor() {
    this.customerRare = new CustomerRare()
    this.beverage = new Beverage()
  }

  calcWithBeverage({
    customerName,
    beverageName,
    demand = '',
  }: {
    customerName: string
    beverageName: string
    demand?: string
  }) {
    const customers = this.customerRare.names(customerName)
    const beverages = this.beverage.names(beverageName)
    const hasEmpty = [customers, beverages].some(isEmpty)
    return hasEmpty ? [] : calcWithBeverage({ customers, beverages, demand })
  }
}
