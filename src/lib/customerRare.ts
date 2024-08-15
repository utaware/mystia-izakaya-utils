import customerRareData from '@/json/customer_rare.json'

import type { TCustomRareItem } from '@/types'

import { BaseItemMethods } from './base'

import { filter, uniq, isEmpty } from 'lodash'

export class CustomerRare extends BaseItemMethods<TCustomRareItem> {
  placeNames: string[]

  constructor() {
    super(customerRareData)
    this.placeNames = uniq(customerRareData.map(({ place }) => place))
  }

  place(filters: string[]) {
    return isEmpty(filters)
      ? this.collection
      : filter(this.collection, ({ place }) => filters.includes(place))
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
