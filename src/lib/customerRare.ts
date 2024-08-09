import customerRareData from '@/json/customer_rare.json'

import type { TCustomRareItem } from '@/types'

import { BaseItemMethods } from './base'

import { filter } from 'lodash'

export class CustomerRare extends BaseItemMethods<TCustomRareItem> {
  constructor() {
    super(customerRareData)
  }

  place(place: string) {
    return filter(this.collection, { place })
  }
}
