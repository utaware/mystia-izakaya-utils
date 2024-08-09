import recipesData from '@/json/recipes.json'

import { BaseItemMethods } from './base'

import { TRecipeItem } from '@/types'

export class Beverage extends BaseItemMethods<TRecipeItem> {
  constructor() {
    super(recipesData)
  }

  positive_tags(args: string[]) {
    return super.tags(args, 'positive_tags')
  }

  negative_tags(args: string[]) {
    return super.tags(args, 'negative_tags')
  }
}
