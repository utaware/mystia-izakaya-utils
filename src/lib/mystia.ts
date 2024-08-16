import { isEmpty } from 'lodash'

import { CustomerRares } from './customerRare'
import { Beverages } from './beverages'
import { Recipes } from './recipes'
import { Ingredients } from './ingredients'

import { maxIngredientCount } from '@/constant'

import {
  matchMutipleBeverageTags,
  matchMutipleRecipeTags,
  generatorRecipeWithExtraIngredients,
} from '@/core'

import type { TFilterBeverageOptions, TFilterRecipeOptions } from '@/types'

export class Mystia {
  customerRares: CustomerRares
  beverages: Beverages
  recipes: Recipes
  ingredients: Ingredients

  constructor() {
    this.customerRares = new CustomerRares()
    this.beverages = new Beverages()
    this.recipes = new Recipes()
    this.ingredients = new Ingredients()
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
    const customers = this.customerRares.names(customerName)
    const beverages = this.beverages.filter(beverage)
    const hasEmpty = [customers, beverages].some(isEmpty)
    return hasEmpty
      ? []
      : matchMutipleBeverageTags({ customers, beverages, demand })
  }

  matchRecipes({
    customerName,
    recipe,
    demand = '',
  }: {
    customerName: string
    recipe: TFilterRecipeOptions
    demand?: string
  }) {
    const customers = this.customerRares.names(customerName)
    const recipes = this.recipes.filter(recipe)
    const hasEmpty = [customers, recipes].some(isEmpty)
    return hasEmpty
      ? []
      : matchMutipleRecipeTags({ customers, recipes, demand })
  }

  getRecipeWithExtraIngredients(recipeName: string, ingredientsName: string[]) {
    const recipe = this.recipes.name(recipeName)

    if (!recipe) {
      return null
    }

    const ingredientCount = recipe.ingredients.length
    const isFull = ingredientCount >= maxIngredientCount

    if (isFull) {
      return recipe
    }

    const emptyCount = maxIngredientCount - ingredientCount
    const extraIngredients = ingredientsName
      .slice(0, emptyCount)
      .map(name => this.ingredients.name(name))
      .filter(v => !!v)

    return generatorRecipeWithExtraIngredients(recipe, extraIngredients)
  }
}
