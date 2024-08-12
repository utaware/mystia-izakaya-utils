import customerRareData from '@/json/customer_rare.json'

import type { TCustomRareItem } from '@/types'

import { BaseItemMethods } from './base'

import { filter, uniq } from 'lodash'

export class CustomerRare extends BaseItemMethods<TCustomRareItem> {
  placeRange: string[]

  constructor() {
    super(customerRareData)
    this.placeRange = uniq(customerRareData.map(({ place }) => place))
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
