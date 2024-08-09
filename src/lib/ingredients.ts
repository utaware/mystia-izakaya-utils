import ingredientsData from '@/json/ingredients.json'

import { BaseItemMethods } from './base'

import { TIngredientItem } from '@/types'

import { uniq } from 'lodash'

export class Ingredient extends BaseItemMethods<TIngredientItem> {
  constructor() {
    super(ingredientsData)
  }

  ingredient_tags(args: string[]) {
    return super.tags(args, 'ingredient_tags')
  }

  get typeNames() {
    return uniq(this.collection.map(({ type }) => type))
  }
}
