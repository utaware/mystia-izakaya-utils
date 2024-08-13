import { intersection } from 'lodash'

import type { TCustomRareItem, TRecipeItem } from '@/types'

interface TRecipeMatchItem {
  customer: string
  recipe: string
  match_like_tags: string[]
  match_hate_tags: string[]
  point: number
  isMeetDemand: boolean
}

export function matchSingleRecipeTags({
  customer,
  recipe,
  demand = '',
}: {
  customer: TCustomRareItem
  recipe: TRecipeItem
  demand?: string
}): TRecipeMatchItem {
  const { like_tags, hate_tags } = customer
  const { positive_tags } = recipe
  const match_like_tags = intersection(like_tags, positive_tags)
  const match_hate_tags = intersection(hate_tags, positive_tags)
  const point = [match_like_tags, match_hate_tags]
    .map((item, index) => item.length * (index % 2 === 0 ? 1 : -1))
    .reduce((t, c) => (t += c), 0)
  const isMeetDemand = demand ? positive_tags.includes(demand) : false
  return {
    customer: customer.name,
    recipe: recipe.name,
    match_like_tags,
    match_hate_tags,
    point,
    isMeetDemand,
  }
}

export function matchRecipeTags({
  customers,
  recipes,
  demand = '',
}: {
  customers: TCustomRareItem[]
  recipes: TRecipeItem[]
  demand?: string
}) {
  return customers.reduce((total, customer) => {
    return total.concat(
      recipes.map(recipe =>
        matchSingleRecipeTags({ customer, recipe, demand }),
      ),
    )
  }, [] as TRecipeMatchItem[])
}
