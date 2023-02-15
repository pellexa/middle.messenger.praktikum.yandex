type Indexed<T = any> = {
  [k in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  if (!lhs) {
    lhs = rhs
  }

  for (const key in rhs) {
    if (rhs[key] && typeof rhs[key] === 'object') {
      lhs[key] = merge((lhs[key] as Indexed), (rhs[key] as Indexed))
    } else {
      lhs[key] = rhs[key]
    }
  }

  return lhs
}

export function set(object: Indexed, path: string, value: any): Indexed {
  if (typeof path !== 'string') {
    throw new Error('path must be string')
  }

  if ((object as Indexed).constructor !== Object) {
    return object
  }

  const res = path.split('.').reduceRight((acc, key, index, array) => {
    if (index + 1 === array.length) {
      return { [key]: value }
    }
    return { [key]: acc }
  }, {})

  object = merge(object as Indexed, res)
  return object
}
