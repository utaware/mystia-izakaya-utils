import ingredientsData from '@/json/ingredients.json'

import { GoodItemMethods } from './goods'

import type { TIngredientItem } from '@/types'

import uniq from 'lodash/uniq'

export class Ingredients extends GoodItemMethods<TIngredientItem> {
  constructor(dlc?: string[]) {
    super({ collection: ingredientsData, dlc })
  }

  ingredient_tags(filters: string[], include: boolean) {
    return this.members(filters, 'ingredient_tags', include)
  }

  get typeNames() {
    return uniq(this.collection.map(({ type }) => type))
  }
}
