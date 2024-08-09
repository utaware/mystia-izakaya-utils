import { intersection } from 'lodash'

import type { TCustomRareItem, TBeverageItem } from '@/types'

export interface TBeverageCalcItem {
  customer: string
  beverage: string
  tags: string[]
  point: number
  isMeetDemand: boolean
}

export function calcWithBeverage({
  customers,
  beverages,
  demand = '',
}: {
  customers: TCustomRareItem[]
  beverages: TBeverageItem[]
  demand?: string
}) {
  return customers.reduce((total, customer) => {
    return total.concat(
      beverages.reduce((item, beverage) => {
        const [customer_tags, beverage_tags] = [customer, beverage].map(
          ({ beverage_tags }) => beverage_tags,
        )
        const tags = intersection(customer_tags, beverage_tags)
        const isMeetDemand = demand ? beverage_tags.includes(demand) : false
        return Object.assign(item, {
          customer: customer.name,
          beverage: beverage.name,
          tags: tags,
          point: tags.length,
          isMeetDemand,
        })
      }, {} as TBeverageCalcItem),
    )
  }, [] as TBeverageCalcItem[])
}
