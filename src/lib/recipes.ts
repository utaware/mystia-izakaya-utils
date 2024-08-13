import recipesData from '@/json/recipes.json'

import { BaseItemMethods } from './base'

import { TRecipeItem } from '@/types'

import { filter, uniq } from 'lodash'

export class Recipe extends BaseItemMethods<TRecipeItem> {
  constructor() {
    super(recipesData)
  }

  positive_tags(filters: string[], include: boolean) {
    return this.members(filters, 'positive_tags', include)
  }

  negative_tags(filters: string[], include: boolean) {
    return this.members(filters, 'negative_tags', include)
  }

  ingredients(filters: string[], include: boolean) {
    return this.members(filters, 'ingredients', include)
  }

  tools(args: string[]) {
    return filter(this.collection, ({ tool }) => args.includes(tool))
  }

  get toolNames() {
    return uniq(this.collection.map(({ tool }) => tool))
  }
}
