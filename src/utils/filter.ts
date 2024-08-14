import type { TFilterMemberOptions, TFilterMemberFunc } from '@/types'

/**
 * @description 生成关于members filter方法的所需内容
 * @param method TFilterMemberFunc<T>
 * @param options TFilterMemberOptions
 * @param key keyof T
 * @returns T[]
 */
export function getMembersFilter<T>(
  method: TFilterMemberFunc<T>,
  { include = [], exclude = [] }: TFilterMemberOptions,
  key: keyof T,
) {
  return [
    [include, (items: T[]) => method(items, key, include, true)],
    [exclude, (items: T[]) => method(items, key, exclude, false)],
  ]
}

export function getFilterTupleWithItem<T, U>(
  filters: U,
  method: (items: T[], filters: U) => T[],
) {
  return [filters, (items: T[]) => method(items, filters)]
}

export function getMembersFilterWithMap<T>(
  filterMap: { [P in keyof T]?: TFilterMemberOptions },
  filterMethod: TFilterMemberFunc<T>,
) {
  return Object.entries(filterMap)
    .map(([key, options]) =>
      getMembersFilter(
        filterMethod,
        options as TFilterMemberOptions,
        key as keyof T,
      ),
    )
    .flat()
}
