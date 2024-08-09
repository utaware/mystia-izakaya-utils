import beveragesData from '@/json/beverages.json'

import { BaseItemMethods } from './base'

import { TBeverageItem } from '@/types'

import { filter, difference, isEmpty } from 'lodash'

export class Beverage extends BaseItemMethods<TBeverageItem> {
  constructor() {
    super(beveragesData)
  }

  tags(args: string[]) {
    return filter(this.collection, ({ beverage_tags }) =>
      isEmpty(difference(args, beverage_tags)),
    )
  }
}
