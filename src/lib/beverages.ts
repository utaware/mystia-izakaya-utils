import beveragesData from '@/json/beverages.json'

import { GoodItemMethods } from './goods'

import type { TBeverageItem, TFilterBeverageOptions } from '@/types'

import isEmpty from 'lodash/isEmpty'

import { getMembersFilterWithMap } from '@/utils'

export class Beverages extends GoodItemMethods<TBeverageItem> {
  constructor(dlc?: string[]) {
    super({ collection: beveragesData, dlc })
  }

  beverage_tags(filters: string[], include: boolean) {
    return this.members(filters, 'beverage_tags', include)
  }

  filter(options: TFilterBeverageOptions) {
    const { name = '', dlc = [], beverage_tags = {}, level = [] } = options
    const methods = [
      [name, (items: TBeverageItem[]) => this.filterNames(items, name)],
      [dlc, (items: TBeverageItem[]) => this.filterDLC(items, dlc)],
      [level, (items: TBeverageItem[]) => this.filterLevels(items, level)],
      ...getMembersFilterWithMap({ beverage_tags }, this.filterMembers),
    ]
    return methods
      .map(([value, method]) => (isEmpty(value) ? null : method))
      .filter(v => typeof v === 'function')
      .reduce((result, method) => method(result), this.collection)
  }
}
