// 实现数组的splice方法
function splice(arr, index, len, ...rest) {
  const split = arr.slice(index, index + len)
  const tail = arr.slice(index + len)
  for (let i = 0; i < rest.length; i++) {
    arr[index + i] = rest[i]
  }

  const currentLength = index + rest.length
  for (let j = 0; j < tail.length; j++) {
    arr[currentLength + j] = tail[j]
  }

  arr.length = currentLength + tail.length

  return split
}

Array.prototype.splice = function (start, deleteCount, ...items) {
  let removed = this.slice(start, start + deleteCount)
  let tail = this.slice(start + deleteCount)
  let originalLength = this.length

  // 添加新元素
  for (let i = 0; i < items.length; i++) {
    this[start + i] = items[i]
  }

  let currentLength = start + items.length

  // 添加尾巴元素
  for (let i = 0; i < tail.length; i++) {
    this[currentLength + i] = tail[i]
  }
  // 重置 length
  this.length = originalLength - deleteCount + items.length
  return removed
}