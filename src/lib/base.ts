import { filter, find, isEmpty, difference, uniq } from 'lodash'

import { TBaseItem } from '@/types'

export class BaseItemMethods<T extends TBaseItem> {
  collection: T[]
  nameRange: string[]
  dlcRange: string[]

  constructor(collection: T[]) {
    this.collection = collection
    this.nameRange = uniq(collection.map(({ name }) => name))
    this.dlcRange = uniq(collection.map(({ dlc }) => dlc))
  }

  dlc(...args: string[] | number[]) {
    if (isEmpty(args)) {
      return this.collection
    }
    return filter(this.collection, ({ dlc }) =>
      args.some(v => dlc.includes(v.toString())),
    )
  }

  name(arg: string = '') {
    const result = find(this.collection, ({ name }) => name.includes(arg))
    return result
  }

  names(arg: string) {
    return filter(this.collection, ({ name }) => name.includes(arg))
  }

  validateName(name: string) {
    return this.nameRange.includes(name)
  }

  tags<K extends keyof T>(args: string[], key: K) {
    return filter(this.collection, item => {
      const target = item[key]
      const isArray = Array.isArray(target)
      return isArray ? isEmpty(difference(args, target)) : false
    })
  }
}
