import beveragesData from '@/json/beverages.json'

import { BaseItemMethods } from './base'

import { TBeverageItem } from '@/types'

export class Beverage extends BaseItemMethods<TBeverageItem> {
  constructor() {
    super(beveragesData)
  }

  beverage_tags(args: string[]) {
    return super.tags(args, 'beverage_tags')
  }
}
