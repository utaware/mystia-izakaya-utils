export interface TBaseItem {
  dlc: string
  name: string
  namePY: string
}

export interface TGoodsItem extends TBaseItem {
  level: number
  price: number
}

export type TToolsName = '烤架' | '料理台' | '油锅' | '蒸锅' | '煮锅'

export interface TBeverageItem extends TGoodsItem {
  id: number
  from: string[]
  beverage_tags: string[]
}

export interface TRecipeItem extends TGoodsItem {
  tool: string
  time_lv1: number
  time_lv50: number
  from: string
  ingredients: string[]
  positive_tags: string[]
  negative_tags: string[]
}

export interface TIngredientItem extends TGoodsItem {
  id: number
  type: string
  from: string[]
  ingredient_tags: string[]
}

export interface TCustomRareItem extends TBaseItem {
  place: string
  price: string
  bonus_card: string[]
  punish_card: string[]
  reward: string[]
  task: string[]
  like_tags: string[]
  hate_tags: string[]
  beverage_tags: string[]
}
