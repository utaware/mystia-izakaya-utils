import beveragesData from '@/json/beverages.json'

import { GoodItemMethods } from './goods'

import type { TBeverageItem, TFilterBeverageOptions } from '@/types'

import { isEmpty } from 'lodash'

export class Beverage extends GoodItemMethods<TBeverageItem> {
  constructor() {
    super(beveragesData)
  }

  filter(options: TFilterBeverageOptions) {
    const { name = '', dlc = [], beverage_tags = {}, level = [] } = options
    const { include = [], exclude = [] } = beverage_tags
    const methods = [
      [name, (items: TBeverageItem[]) => this.filterNames(items, name)],
      [dlc, (items: TBeverageItem[]) => this.filterDLC(items, dlc)],
      [level, (items: TBeverageItem[]) => this.filterLevels(items, level)],
      [
        include,
        (items: TBeverageItem[]) =>
          this.filterMembers(items, 'beverage_tags', include, true),
      ],
      [
        exclude,
        (items: TBeverageItem[]) =>
          this.filterMembers(items, 'beverage_tags', exclude, false),
      ],
    ]
    return methods
      .map(([value, method]) => (isEmpty(value) ? null : method))
      .filter(v => typeof v === 'function')
      .reduce((result, method) => method(result), this.collection)
  }
}
