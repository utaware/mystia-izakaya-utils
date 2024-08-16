import { cloneDeep, difference, isEmpty } from 'lodash'

import { isSomeDuplicates } from '@/utils'

import type { TIngredientItem, TRecipeItem } from '@/types'

export const recipeOverwriteTagOptions = [
  ['大份', '小巧'],
  ['灼热', '凉爽'],
  ['重油', '清淡'],
  ['饱腹', '下酒'],
  ['肉', '素'],
]

export function composeRecipeAndIngredientTags({
  recipe_ingredients_name,
  recipe_ingredients_tags,
  extra_ingredients_name,
  extra_ingredients_tags,
}: {
  recipe_ingredients_name: string[]
  recipe_ingredients_tags: string[]
  extra_ingredients_name: string[]
  extra_ingredients_tags: string[]
}) {
  const union_tags = new Set([
    ...recipe_ingredients_tags,
    ...extra_ingredients_tags,
  ])

  const ingredients_count = [
    ...recipe_ingredients_name,
    ...extra_ingredients_name,
  ].length

  if (ingredients_count >= 5) {
    union_tags.add('大份')
  }

  return Array.from(
    recipeOverwriteTagOptions.reduce((total, current) => {
      const [prefix, suffix] = current
      if (total.has(prefix)) {
        total.delete(suffix)
      }
      return total
    }, union_tags),
  )
}

export function isDarkCooking(
  recipe: TRecipeItem,
  ingredient: TIngredientItem,
) {
  const { negative_tags } = recipe
  const { ingredient_tags } = ingredient
  return isSomeDuplicates(ingredient_tags, negative_tags)
}

export function generatorRecipeWithExtraIngredients(
  recipe: TRecipeItem,
  ingredients: TIngredientItem[],
) {
  if (isEmpty(ingredients)) {
    return recipe
  }

  const { positive_tags, ingredients: recipe_ingredients_name } = recipe
  const extra_ingredients_name = ingredients.map(({ name }) => name)
  const extra_ingredients_tags = ingredients.reduce<string[]>(
    (total, { ingredient_tags }) => total.concat(ingredient_tags),
    [],
  )
  const compose_tags = composeRecipeAndIngredientTags({
    recipe_ingredients_name,
    recipe_ingredients_tags: positive_tags,
    extra_ingredients_name,
    extra_ingredients_tags,
  })
  const cloneRecipe = cloneDeep(recipe)
  cloneRecipe.ingredients = [
    ...recipe_ingredients_name,
    ...extra_ingredients_name,
  ]
  cloneRecipe.positive_tags = compose_tags
  return cloneRecipe
}

export function compareRecipeTagsChange(
  previousRecipe: TRecipeItem,
  nextRecipe: TRecipeItem,
) {
  const { positive_tags: previous_tags } = previousRecipe
  const { positive_tags: next_tags } = nextRecipe
  const decrease_tags = difference(previous_tags, next_tags)
  const increase_tags = difference(next_tags, previous_tags)
  return { increase_tags, decrease_tags }
}
