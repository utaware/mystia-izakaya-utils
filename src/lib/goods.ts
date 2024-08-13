import { BaseItemMethods } from './base'

import { TGoodsItem } from '@/types'

import { filter } from 'lodash'

export class GoodItemMethods<T extends TGoodsItem> extends BaseItemMethods<T> {
  constructor(collection: T[]) {
    super(collection)
  }

  levels(filters: number[]) {
    return this.filterLevels(this.collection, filters)
  }

  filterLevels(collection: T[], filters: number[]) {
    return filter(collection, ({ level }) => filters.includes(level))
  }
}
