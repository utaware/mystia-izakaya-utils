import filter from 'lodash/filter'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import uniq from 'lodash/uniq'

import type { TBaseItem } from '@/types'

import { isAllDuplicates, isAllNoDuplicates } from '@/utils'

export class BaseItemMethods<T extends TBaseItem> {
  collection: T[]
  nameRange: string[]
  dlcRange: string[]

  constructor(collection: T[]) {
    this.collection = collection
    this.nameRange = uniq(collection.map(({ name }) => name))
    this.dlcRange = uniq(collection.map(({ dlc }) => dlc))
  }

  dlc(args: string[]) {
    return this.filterDLC(this.collection, args)
  }

  name(arg?: string) {
    return arg
      ? find(this.collection, ({ name }) => name.includes(arg))
      : void 0
  }

  names(arg: string) {
    return this.filterNames(this.collection, arg)
  }

  filterNames(collection: T[], arg: string) {
    return filter(collection, ({ name }) => name.includes(arg))
  }

  filterDLC(collection: T[], args: string[]) {
    if (isEmpty(args)) {
      return this.collection
    }
    return filter(collection, ({ dlc }) => args.some(v => dlc.includes(v)))
  }

  filterMembers(
    collection: T[],
    key: keyof T,
    filters: string[],
    include: boolean = true,
  ) {
    return filter(collection, item => {
      const target = item[key]
      return Array.isArray(target)
        ? include
          ? isAllDuplicates(filters, target)
          : isAllNoDuplicates(filters, target)
        : false
    })
  }

  validateName(name: string) {
    return this.nameRange.includes(name)
  }

  members<K extends keyof T>(
    filters: string[],
    key: K,
    include: boolean = true,
  ) {
    return this.filterMembers(this.collection, key, filters, include)
  }
}
