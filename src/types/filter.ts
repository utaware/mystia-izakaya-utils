export interface TFilterMemberOptions {
  include?: string[]
  exclude?: string[]
}

export type TFilterMemberFunc<T> = (
  items: T[],
  key: keyof T,
  filters: string[],
  include: boolean,
) => T[]

export interface TFilterBeverageOptions {
  name?: string
  dlc?: string[]
  level?: number[]
  beverage_tags?: TFilterMemberOptions
}

export interface TFilterRecipeOptions {
  name?: string
  dlc?: string[]
  level?: number[]
  positive_tags?: TFilterMemberOptions
  negative_tags?: TFilterMemberOptions
  ingredients?: TFilterMemberOptions
  tool?: string[]
}
