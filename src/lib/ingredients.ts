import ingredientsData from '@/json/ingredients.json'

import { BaseItemMethods } from './base'

import { TIngredientItem } from '@/types'

import { uniq } from 'lodash'

export class Ingredient extends BaseItemMethods<TIngredientItem> {
  constructor() {
    super(ingredientsData)
  }

  ingredient_tags(filters: string[], include: boolean) {
    return this.members(filters, 'ingredient_tags', include)
  }

  get typeNames() {
    return uniq(this.collection.map(({ type }) => type))
  }
}
