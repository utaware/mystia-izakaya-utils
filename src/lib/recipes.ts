import recipesData from '@/json/recipes.json'

import { BaseItemMethods } from './base'

import { TRecipeItem } from '@/types'

import { filter } from 'lodash'

export class Recipes extends BaseItemMethods<TRecipeItem> {
  constructor() {
    super(recipesData)
  }

  positive_tags(args: string[]) {
    return super.tags(args, 'positive_tags')
  }

  negative_tags(args: string[]) {
    return super.tags(args, 'negative_tags')
  }

  ingredients(args: string[]) {
    return super.tags(args, 'ingredients')
  }

  tools(args: string[]) {
    return filter(this.collection, ({ tool }) => args.includes(tool))
  }
}
