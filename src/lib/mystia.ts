import { isEmpty } from 'lodash'

import { CustomerRare } from './customerRare'
import { Beverage } from './beverages'
import { Recipe } from './recipes'
import { Ingredient } from './ingredients'

import {
  matchBeverageTags,
  matchRecipeTags,
  generatorRecipeWithExtraIngredient,
} from '@/core'

import type { TFilterBeverageOptions, TFilterRecipeOptions } from '@/types'

export class Mystia {
  customerRare: CustomerRare
  beverage: Beverage
  recipe: Recipe
  ingredient: Ingredient

  constructor() {
    this.customerRare = new CustomerRare()
    this.beverage = new Beverage()
    this.recipe = new Recipe()
    this.ingredient = new Ingredient()
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

  matchRecipes({
    customerName,
    recipe,
    demand = '',
  }: {
    customerName: string
    recipe: TFilterRecipeOptions
    demand?: string
  }) {
    const customers = this.customerRare.names(customerName)
    const recipes = this.recipe.filter(recipe)
    const hasEmpty = [customers, recipes].some(isEmpty)
    return hasEmpty ? [] : matchRecipeTags({ customers, recipes, demand })
  }

  getRecipeWithExtraIngredients(recipeName: string, ingredientsName: string[]) {
    const recipe = this.recipe.name(recipeName)

    if (!recipe) {
      return null
    }

    const ingredientCount = recipe.ingredients.length
    const isFull = ingredientCount >= 5

    if (isFull) {
      return recipe
    }

    const emptyCount = 5 - ingredientCount
    const extraIngredients = ingredientsName.slice(0, emptyCount)

    return extraIngredients.reduce((result, name) => {
      const ingredient = this.ingredient.name(name)
      return ingredient
        ? generatorRecipeWithExtraIngredient(recipe, ingredient)
        : result
    }, recipe)
  }
}
