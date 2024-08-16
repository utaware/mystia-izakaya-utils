import { intersection } from 'lodash'

import type { TCustomRareItem, TBeverageItem, TRecipeItem } from '@/types'

export interface TBeverageMatchItem {
  customer?: TCustomRareItem
  beverage?: TBeverageItem
  match_beverage_tags: string[]
  point: number
  isMeetDemand: boolean
}

export interface TRecipeMatchItem {
  customer?: TCustomRareItem
  recipe?: TRecipeItem
  match_like_tags: string[]
  match_hate_tags: string[]
  point: number
  isMeetDemand: boolean
}

export function matchSingleBeverageTags({
  customer,
  beverage,
  demand = '',
}: {
  customer?: TCustomRareItem
  beverage?: TBeverageItem
  demand?: string
}): TBeverageMatchItem {
  const defaultResult: TBeverageMatchItem = {
    match_beverage_tags: [],
    point: 0,
    isMeetDemand: false,
  }
  if (!customer || !beverage) {
    return defaultResult
  }
  const [customer_tags, beverage_tags] = [customer, beverage].map(
    ({ beverage_tags }) => beverage_tags,
  )
  const match_beverage_tags = intersection(customer_tags, beverage_tags)
  const point = match_beverage_tags.length
  const isMeetDemand = demand ? beverage_tags.includes(demand) : false
  return {
    customer,
    beverage,
    match_beverage_tags,
    point,
    isMeetDemand,
  }
}

export function matchMutipleBeverageTags({
  customers,
  beverages,
  demand = '',
}: {
  customers: TCustomRareItem[]
  beverages: TBeverageItem[]
  demand?: string
}) {
  return customers.reduce<TBeverageMatchItem[]>((total, customer) => {
    return total.concat(
      beverages.map(beverage =>
        matchSingleBeverageTags({ customer, beverage, demand }),
      ),
    )
  }, [])
}

export function matchSingleRecipeTags({
  customer,
  recipe,
  demand = '',
}: {
  customer?: TCustomRareItem
  recipe?: TRecipeItem
  demand?: string
}): TRecipeMatchItem {
  const defaultResult: TRecipeMatchItem = {
    match_like_tags: [],
    match_hate_tags: [],
    point: 0,
    isMeetDemand: false,
  }
  if (!customer || !recipe) {
    return defaultResult
  }
  const { like_tags, hate_tags } = customer
  const { positive_tags } = recipe
  const match_like_tags = intersection(like_tags, positive_tags)
  const match_hate_tags = intersection(hate_tags, positive_tags)
  const point = [match_like_tags, match_hate_tags]
    .map((item, index) => item.length * (index % 2 === 0 ? 1 : -1))
    .reduce((t, c) => (t += c), 0)
  const isMeetDemand = demand ? positive_tags.includes(demand) : false
  return {
    customer,
    recipe,
    match_like_tags,
    match_hate_tags,
    point,
    isMeetDemand,
  }
}

export function matchMutipleRecipeTags({
  customers,
  recipes,
  demand = '',
}: {
  customers: TCustomRareItem[]
  recipes: TRecipeItem[]
  demand?: string
}) {
  return customers.reduce<TRecipeMatchItem[]>((total, customer) => {
    return total.concat(
      recipes.map(recipe =>
        matchSingleRecipeTags({ customer, recipe, demand }),
      ),
    )
  }, [])
}

export function getCustomerEvaluationLevel({
  isMeetBeverageDemand,
  isMeetRecipeDemand,
  beveragePoint,
  recipePoint,
}: {
  isMeetBeverageDemand: boolean
  isMeetRecipeDemand: boolean
  beveragePoint: number
  recipePoint: number
}) {
  const baseDemandPoint = 2
  const demandPoint = [isMeetBeverageDemand, isMeetRecipeDemand].reduce(
    (t, c) => (t += Number(c)),
    baseDemandPoint,
  )
  const totalPoint = beveragePoint + recipePoint
  return Math.min(demandPoint, totalPoint)
}

export function matchBeverageAndRecipe({
  customer,
  beverage,
  recipe,
  demandBeverageTag = '',
  demandRecipeTag = '',
}: {
  customer?: TCustomRareItem
  beverage?: TBeverageItem
  recipe?: TRecipeItem
  demandBeverageTag: string
  demandRecipeTag: string
}) {
  const {
    isMeetDemand: isMeetBeverageDemand,
    point: beveragePoint,
    match_beverage_tags,
  } = matchSingleBeverageTags({ customer, beverage, demand: demandBeverageTag })
  const {
    isMeetDemand: isMeetRecipeDemand,
    point: recipePoint,
    match_like_tags,
    match_hate_tags,
  } = matchSingleRecipeTags({
    customer,
    recipe,
    demand: demandRecipeTag,
  })
  const isMeetAllDemand = isMeetBeverageDemand && isMeetRecipeDemand
  const totalPoint = beveragePoint + recipePoint
  const evaluationLevel = getCustomerEvaluationLevel({
    isMeetBeverageDemand,
    isMeetRecipeDemand,
    beveragePoint,
    recipePoint,
  })
  return {
    customer,
    recipe,
    beverage,
    match_beverage_tags,
    match_like_tags,
    match_hate_tags,
    isMeetDemand: {
      beverage: isMeetBeverageDemand,
      recipe: isMeetRecipeDemand,
    },
    point: {
      beverage: beveragePoint,
      recipe: recipePoint,
    },
    isMeetAllDemand,
    totalPoint,
    evaluationLevel,
  }
}
