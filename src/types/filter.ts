export interface TFilterMemberOptions {
  include?: string[]
  exclude?: string[]
}

export interface TFilterBeverageOptions {
  name?: string
  dlc?: string[]
  level?: number[]
  beverage_tags?: TFilterMemberOptions
}
