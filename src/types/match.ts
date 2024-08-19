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

export interface TRecipeAndBeverageMatchItem {
  customer?: TCustomRareItem
  recipe?: TRecipeItem
  beverage?: TBeverageItem
  match_beverage_tags: string[]
  match_like_tags: string[]
  match_hate_tags: string[]
  isMeetDemand: {
    beverage: boolean
    recipe: boolean
  }
  point: {
    beverage: number
    recipe: number
  }
  isMeetAllDemand: boolean
  totalPoint: number
  evaluationLevel: number
}
