import customerRareData from '@/json/customer_rare.json'

import type { TCustomRareItem } from '@/types'

import { BaseItemMethods } from './base'

import filter from 'lodash/filter'
import uniq from 'lodash/uniq'
import isEmpty from 'lodash/isEmpty'

export class CustomerRares extends BaseItemMethods<TCustomRareItem> {
  placeRange: string[]

  constructor(dlc?: string[]) {
    super({ collection: customerRareData, dlc })
    this.placeRange = uniq(this.collection.map(({ place }) => place))
  }

  place(filters?: string[]) {
    return isEmpty<string[]>(filters)
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
