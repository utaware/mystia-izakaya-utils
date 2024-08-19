import recipesData from '@/json/recipes.json'

import { GoodItemMethods } from './goods'

import type { TRecipeItem, TFilterRecipeOptions } from '@/types'

import filter from 'lodash/filter'
import uniq from 'lodash/uniq'
import isEmpty from 'lodash/isEmpty'

import { getMembersFilterWithMap, getFilterTupleWithItem } from '@/utils'

export class Recipes extends GoodItemMethods<TRecipeItem> {
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

  tools(filters: string[]) {
    return this.filterTools(this.collection, filters)
  }

  filterTools(collection: TRecipeItem[], filters: string[]) {
    if (isEmpty(filters)) {
      return collection
    }
    return filter(collection, ({ tool }) => filters.includes(tool))
  }

  get toolNames() {
    return uniq(this.collection.map(({ tool }) => tool))
  }

  filter(options: TFilterRecipeOptions) {
    const {
      name = '',
      dlc = [],
      level = [],
      tool = [],
      positive_tags = {},
      negative_tags = {},
      ingredients = {},
    } = options

    const methods = [
      getFilterTupleWithItem(name, this.filterNames),
      getFilterTupleWithItem(dlc, this.filterDLC),
      getFilterTupleWithItem(level, this.filterLevels),
      getFilterTupleWithItem(tool, this.filterTools),
      ...getMembersFilterWithMap(
        {
          positive_tags,
          negative_tags,
          ingredients,
        },
        this.filterMembers,
      ),
    ]
    return methods
      .map(([value, method]) => (isEmpty(value) ? null : method))
      .filter(v => typeof v === 'function')
      .reduce((result, method) => method(result), this.collection)
  }
}
