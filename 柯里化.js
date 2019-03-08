function curry(fn, fixedParams) {
  if (!Array.isArray(fixedParams)) {fixedParams = []}

  return function() {
    let newParams = [...arguments]
    if (fixedParams.length + newParams.length < fn.length) {
      return curry(fn, [...fixedParams, ...newParams])
    }

    return fn([...fixedParams, ...newParams])
  }
}