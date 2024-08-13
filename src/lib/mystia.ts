import { isEmpty } from 'lodash'

import { CustomerRare } from './customerRare'
import { Beverage } from './beverages'
import { Recipe } from './recipes'

import { matchBeverageTags, matchRecipeTags } from '@/core'

import type { TFilterBeverageOptions } from '@/types'

export class Mystia {
  customerRare: CustomerRare
  beverage: Beverage
  recipe: Recipe

  constructor() {
    this.customerRare = new CustomerRare()
    this.beverage = new Beverage()
    this.recipe = new Recipe()
  }

  matchBeverages({
    customerName,
    beverage,
    demand = '',
  }: {
    customerName: string
    beverage: TFilterBeverageOptions
    demand?: string
  }) {
    const customers = this.customerRare.names(customerName)
    const beverages = this.beverage.filter(beverage)
    const hasEmpty = [customers, beverages].some(isEmpty)
    return hasEmpty ? [] : matchBeverageTags({ customers, beverages, demand })
  }

  matchRecipesWithName({
    customerName,
    recipeName,
    demand = '',
  }: {
    customerName: string
    recipeName: string
    demand?: string
  }) {
    const customers = this.customerRare.names(customerName)
    const recipes = this.recipe.names(recipeName)
    const hasEmpty = [customers, recipes].some(isEmpty)
    return hasEmpty ? [] : matchRecipeTags({ customers, recipes, demand })
  }
}
