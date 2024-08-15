import { expect } from '@jest/globals'

import { isEmpty, xor } from 'lodash'

function arrayIsEqual(arr1: unknown[], arr2: unknown[]) {
  const isArray = [arr1, arr2].every(v => Array.isArray(v))
  if (!isArray) {
    return false
  } else {
    return isEmpty(xor(arr1, arr2))
  }
}

expect.addEqualityTesters([arrayIsEqual])
