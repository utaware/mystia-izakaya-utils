import { filter, find, isEmpty, difference } from 'lodash'

import { TBaseItem } from '@/types'

export class BaseItemMethods<T extends TBaseItem> {
  collection: T[]

  constructor(collection: T[]) {
    this.collection = collection
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

  tags<K extends keyof T>(args: string[], key: K) {
    return filter(this.collection, item => {
      const target = item[key]
      const isArray = Array.isArray(target)
      return isArray ? isEmpty(difference(args, target)) : false
    })
  }
}
