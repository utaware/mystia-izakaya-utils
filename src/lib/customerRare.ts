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

  like_tags(filters: string[], include: boolean) {
    return this.members(filters, 'like_tags', include)
  }

  hate_tags(filters: string[], include: boolean) {
    return this.members(filters, 'hate_tags', include)
  }

  beverage_tags(filters: string[], include: boolean) {
    return this.members(filters, 'beverage_tags', include)
  }
}
