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

  price(filters: [number, number]) {
    return this.filterPriceRange(this.collection, filters)
  }

  get maxPrice() {
    return Math.max(...this.collection.map(({ price }) => price))
  }

  get minPrice() {
    return Math.min(...this.collection.map(({ price }) => price))
  }

  get priceRange() {
    return [this.minPrice, this.maxPrice]
  }

  filterPriceRange(collection: T[], filters: [number, number]) {
    const [min, max] = filters
    return filter(collection, ({ price }) => price >= min && price <= max)
  }

  filterLevels(collection: T[], filters: number[]) {
    return filter(collection, ({ level }) => filters.includes(level))
  }
}
