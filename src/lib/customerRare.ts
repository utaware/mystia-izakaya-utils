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

  like_tags(args: string[]) {
    return super.tags(args, 'like_tags')
  }

  hate_tags(args: string[]) {
    return super.tags(args, 'hate_tags')
  }

  beverage_tags(args: string[]) {
    return super.tags(args, 'beverage_tags')
  }
}
