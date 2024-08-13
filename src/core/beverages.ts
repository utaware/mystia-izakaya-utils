import { intersection } from 'lodash'

import type { TCustomRareItem, TBeverageItem } from '@/types'

export interface TBeverageMatchItem {
  customer: string
  beverage: string
  match_beverage_tags: string[]
  point: number
  isMeetDemand: boolean
}

export function matchSingleBeverageTags({
  customer,
  beverage,
  demand = '',
}: {
  customer: TCustomRareItem
  beverage: TBeverageItem
  demand?: string
}): TBeverageMatchItem {
  const [customer_tags, beverage_tags] = [customer, beverage].map(
    ({ beverage_tags }) => beverage_tags,
  )
  const match_beverage_tags = intersection(customer_tags, beverage_tags)
  const point = match_beverage_tags.length
  const isMeetDemand = demand ? beverage_tags.includes(demand) : false
  return {
    customer: customer.name,
    beverage: beverage.name,
    match_beverage_tags,
    point,
    isMeetDemand,
  }
}

export function matchBeverageTags({
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
      beverages.map(beverage =>
        matchSingleBeverageTags({ customer, beverage, demand }),
      ),
    )
  }, [] as TBeverageMatchItem[])
}
